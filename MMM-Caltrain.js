/* Magic Mirror
 * Module: Caltrain
 * 
 * By Zac Henney - zachenney.com
 * MIT Licensed
 */

Module.register("MMM-Caltrain", {

    defaults: {
        stop_codes: [
            northbound_id = null,
            southbound_id = null
        ],
        timeFormat: config.timeFormat,
        depatureTime: false,
        station: null,
        url: "http://api.511.org/transit/StopMonitoring?",
        api_key: null
    },

    //requiresVersion: "2.1.0",
    
    start: function() {
        if(!this.config.api_key) {
            Log.log("no api key found!")
        }
        
        this.info = this.getDepartureTimes()
        //update departure times
        var self = this
        setInterval(()=>{
            self.getDepartureTimes()}, 60000)
    },

    /*
    getScripts: function() {
        //add any scripts
       //return null
    },

    getStyles: function() {
        //return css files
    },
    */

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = this.station_info;
        return wrapper;
    },

    getHeader: function() {
        //return this.station
        return "Caltrain Departures"
    },


    

    getDepartureTimes: function() {
        console.log(this.config)
        this.sendSocketNotification("DEPARTURE_REQUEST", this.config)
    },

    socketNotificationReceived: function(notification, payload) {
        if(notification == "DEPARTURE_INFO") {
            console.log("returned payload" + JSON.stringify(payload))
            this.station_info = payload
            this.updateDom()
        }    
    }




});