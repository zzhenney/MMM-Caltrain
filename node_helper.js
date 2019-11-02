/*
 * Perform Caltrain API call 
 */


const fetch = require('node-fetch');
const moment = require('moment');
const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    start: function() {
        console.log("helper start")
        
    },

    socketNotificationReceived: function(notification, payload) {
        if(notification == "DEPARTURE_REQUEST") {
            this.api_key = payload.api_key
            this.url = payload.url
            let departure_info = []

            payload.stop_codes.forEach(stop => {
                if(stop != null) {
                    departure_info.push(this.getDepartureInfo(stop))
                }               
            });
            
            Promise.all(departure_info)
                .then((departure_info)=> {
                    console.log("SEND INFO: " + departure_info)
                    this.sendSocketNotification("DEPARTURE_INFO", departure_info)
                })          
        }
    },

    getDepartureInfo: function(stop_code) {
        let url = this.url
        url += ("format=JSON")
        url += ("&api_key=" + this.api_key)
        url += ("&agency=CT")
        url += ("&stopcode=" + stop_code)
        console.log("URL: " + url )
        //fetch data
        return fetch(url, {method: "GET", headers: {"Accept-Encoding":"gzip"}})
            .then(response => this.checkResponseCode(response))
                .then(response => response.text())
                //remove invalid JSON character
                .then(response => JSON.parse(response.substring(1)))
                .then(response => { 
                    //console.log("info: \n" + this.formatResponse(response))
                    
                    return this.formatResponse(response)
                })
            .catch(error => {
                return error.message
            })

    },

    formatResponse: function(response) {
        let departure_info = []
        response_string = 
            response.
            ServiceDelivery.
            StopMonitoringDelivery.
            MonitoredStopVisit
       
        response_string.forEach(train => {
            let utc_depart_time = train.
                MonitoredVehicleJourney.
                MonitoredCall.
                ExpectedDepartureTime

            let local_time = this.convertToLocalTime(utc_depart_time)
            departure_info.push(local_time)

        })
       if(departure_info.length == 0) {
           return "No trains"
       }
       return departure_info
        
    },



    convertToLocalTime: function(utc_time) {
        let utc_moment = moment.utc(utc_time).toDate()
        let local_time = moment(utc_moment).local().format("hh:mm")
        return local_time
    },
  
    checkResponseCode: function(response) {
        if(response.ok) {
            return response
        }
        else if(response.status == 500) {
            return Promise.reject(new Error("511.org Server Error"))
        }
        else if(response.status == 401) {
            return Promise.reject(new Error("Invalid API Key"))
        }
        else{
            return Promise.reject(new Error("Error: Please try again"))
        }
    }
});