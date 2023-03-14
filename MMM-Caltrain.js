/* Magic Mirror
 * Module: Caltrain
 * 
 * By Zac Henney - zachenney.com
 * MIT Licensed
 */

Module.register("MMM-Caltrain", {

    defaults: {
        station_name: "Caltrain Departures",
        station_id: [
            northbound_id = null,
            southbound_id = null
        ],
        time_format: config.timeFormat,
        depatureTime: false,
        station: null,
        url: "http://api.511.org/transit/StopMonitoring?",
        api_key: null
    },

    requiresVersion: "2.1.0",
    
    start: function() {
        if(!this.config.api_key) {
            Log.log("no api key found!")
        }
        Log.log(this.config.timeFormat)
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
    */
    getStyles: function() {
        return ["MMM-Caltrain.css"]
    },
    

    getDom: function() {
        if(!this.station_info) {
            let display = document.createElement("div");
            display.innerHTML = "Loading Times"
            return display
        }

        const wrapper = document.createElement("table");
        const header_row = this.createTableHeader()
        wrapper.appendChild(header_row)

        let row = null
        console.log(this.config.time_format)
        this.station_info.forEach(direction => {
            direction.forEach(departure => {
                row = this.createTableRow(departure.destination_name, departure.local_time)
                wrapper.appendChild(row)
            })
        });

        return wrapper;
    },

    getHeader: function() {
        return "Caltrain: " + this.config.station_name
    },

    createTableHeader: function() {
        let header_row = document.createElement('tr')
        header_row.className = "align-left regular xsmall dimmed"
        
        let header_destination = document.createElement('td')
        let header_time = document.createElement('td')
        
        header_destination.innerText = "Destination"
        header_time.innerText = "Departs"
        
        header_row.appendChild(header_destination)
        header_row.appendChild(header_time)
        return header_row
    },

    createTableRow: function(destination_name, local_time) {
        let row = document.createElement('tr')
        row.className = "align-left small normal"
        
        let destination = document.createElement('td')
        let time = document.createElement('td')

        destination.innerText = destination_name
        time.innerText = local_time
        
        if(this.config.etd) {
            //let etd = this.convertToMinutes(local_time)
            let etd = local_time
            time.innerText = etd + " mins"
            if(etd == 0) {
                time.innerText = "now"
            }
        }
        
        row.appendChild(destination)
        row.appendChild(time)
        return row

    },
    

    getDepartureTimes: function() {
        this.sendSocketNotification("DEPARTURE_REQUEST", this.config)
    },



    socketNotificationReceived: function(notification, payload) {
        if(notification == "DEPARTURE_INFO") {
            this.station_info = payload
            this.updateDom()
        }    
    }

});