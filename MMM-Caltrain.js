/* Magic Mirror
 * Module: Caltrain
 * 
 * By Zac Henney - zachenney.com
 * MIT Licensed
 */

Module.register("MMM-Caltrain", {

    defaults: {
        southbound: true,
        northbound: true,
        twelveHour: true,
        minutes: false,
        station: null,
        api_key: "796681ed-86f6-4a65-8ca3-0a0d284109a2"
    },

    requiresVersion: "2.1.0",

    start: function() {
        this.getDepartureTimes(this.config.api_key)
        //set interval for update
    },

    getScripts: function() {
        //add any scripts
        return null
    },

    getStyles: function() {
        //return css files
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = "caltrain times";
        return wrapper;
    },

    getDepartureTimes: function(api_key) {
        this.sendSocketNotification("DEPARTURE_TIMES", this.config)
    },

    socketNotificationReceived: function(notification, payload) {
        if(notification == "DEPARTURE_TIMES") {
            this.station_info = payload
            this.updateDom()
        }    
    }




});