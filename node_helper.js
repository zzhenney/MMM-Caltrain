/*
 * Perform Caltrain API call 
 */

//node-modules
const fetch = require('node-fetch');
const moment = require('moment');
const NodeHelper = require("node_helper");

//Definitions
const TIME_12H = "hh:mm a"
const TIME_24H = "HH:mm"

module.exports = NodeHelper.create({
    start: function() {
        
    },

    socketNotificationReceived: function(notification, payload) {
        if(notification == "DEPARTURE_REQUEST") {
            this.api_key = payload.api_key
            this.url = payload.url
            this.etd = payload.etd
            this.time_format = payload.time_format
            let departure_info = []
            console.log(this.time_format)
            payload.station_id.forEach(stop_code => {
                if(stop_code != null) {
                    departure_info.push(this.getDepartureInfo(stop_code))
                }               
            });
            
            Promise.all(departure_info)
                .then((departure_info)=> {
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
        //console.log("URL: " + url )
        //fetch data
        return fetch(url, {method: "GET", headers: {"Accept-Encoding":"gzip"}})
            .then(response => this.checkResponseCode(response))
                .then(response => response.text())
                //remove invalid JSON character
                .then(response => JSON.parse(response.substring(1)))
                .then(response => {                    
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
            let utc_depart_time = 
                train.
                MonitoredVehicleJourney.
                MonitoredCall.
                ExpectedDepartureTime
            
            let destination_name = 
                train.
                MonitoredVehicleJourney.
                DestinationName

            //remove "Caltrain Station" for smaller ui
            let words = destination_name.split(" ")
            for(let i = 0; i< words.length; i += 1) {
                if(words[i] == "Caltrain") {
                    destination_name = words.slice(0, i).toString()
                    destination_name = destination_name.replace(/[,]+/g, " ")
                    break
                }
            
            }
            //let local_time = utc_depart_time
            let local_time = this.convertToLocalTime(utc_depart_time)
            if(this.etd) {
                local_time = this.convertToMinutes(local_time)
            }
            
            departure_info.push({destination_name, local_time})
            //departure_info.push({destination_name, utc_depart_time})

        })
       
       return departure_info
        
    },

    convertToLocalTime: function(utc_time) {
        let utc_moment = moment.utc(utc_time).toDate()
        let local_time = moment(utc_moment).local().format(TIME_12H)
        
        if(this.time_format == 24) {
            local_time = moment(utc_moment).local().format(TIME_24H)
        }
        
        if(this.etd) {
            local_time = moment(utc_moment).local().format(TIME_24H)
            
        }
        return local_time
    },

    convertToMinutes: function(time) {
        let now = new Date()
        let hours = now.getHours() * 60
        //when time is 00:00 or 12am
        if(hours == 0) {
            hours == 12 * 60
        }
        let minutes = now.getMinutes()    
        now = hours + minutes
        console.log(time)
        hours = parseInt(time.slice(0, 2)) * 60
        minutes = parseInt(time.slice(3,5))
        let departure_mins = hours + minutes
        
        //special case for 00:00 / 12 am
        if(now > departure_mins){
            return now - departure_mins
        }
        let etd = departure_mins - now
        return etd

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
            return Promise.reject(new Error("Error " + response.status + " : Please try again"))
        }
    }
});