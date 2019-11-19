# Module: Caltrain Departure Times
The `Caltrain` Magic Mirror module provides departure times or estimated times of departure (etd) for the selected Caltrain station. Northbound and Southbound times can be displayed or hidden. Caltrain data is obtained via API calls to 511.org

Departure Times

![departure times preview](https://github.com/zzhenney/MMM-Caltrain/blob/master/departure_times.png)

Estimated Time to Departure (etd)

![etd preview](https://github.com/zzhenney/MMM-Caltrain/blob/master/etd.png)


## Adding Caltrain Departure Times to Your Magic Mirror
1. Navigate to the modules folder in your Magic Mirror project
1. Clone the Caltrain module by running `git clone https://github.com/zzhenney/MMM-Caltrain`
2. Run `npm install`
3. Optain 511.org api_key. 511.org/api_key
4. Optain station_id (see [Station ID](#station-ids) table below)
5. Update your Magic Mirror config.js file to include your api_key and station_id:

Example: User wants only southbound departure times at 22nd Street Station

```javascript
{
  module: "MMM-Caltrain",
  position: "top_right",
  disabled: false,
  config: {
    station_id: [
      southbound_id = "70022"

    ],
    api_key: "7y66r6ef-8687-4a65-8ca3-0a0d777107a2",
    etd: false
    
  }
}
```
Example: User wants both northbound and southbound estimated time to departure at 22nd Street Station

```javascript
{
  module: "MMM-Caltrain",
  position: "top_right",
  disabled: false,
  config: {
    station_id: [
      northbound_id = "70021",
      southbound_id = "70022"
      

    ],
    api_key: "7y66r6ef-8687-4a65-8ca3-0a0d777107a2",
    etd: true
    
  }
}
```


## Configuration Options

| Option | Description |
| --- | --- |
| `northbound_id` | Station ID for North bound trains. Stop IDs can be obtained here: https://511.org/transit/agencies/stop-id |
| `southbound_id` | Station ID for South bound trains |
| `countdown` | Set this to true to display minutes until departure. Set to false to show the time of departure |
| `api_key` | The API key can be obtained here: https://511.org/open-data/token |


## Station IDs

| Station Name | Northbound ID | Southbound ID |
| :--- | :---: | :---: |
| 22nd Street | 70021 | 70022 | 
| Atherton | 70151 | 70152 | 
| Bayshore | 70031 | 70032 | 
| Belmont | 70121 | 70122 | 
| Blossom Hill | 70291 | 70292 | 
| Broadway | 70071 | 70072 | 
| Burlingame | 70081 | 70082 | 
| California Ave | 70191 | 70192 | 
| Capitol | 70281 | 70282 | 
| College Park | 70251 | 70252 | 
| Gilroy | 70321 | 70322 | 
| Hayward Park | 70101 | 70102 | 
| Hillsdale | 70111 | 70112 | 
| Lawrence | 70231 | 70232 | 
| Menlo Park | 70161 | 70162 | 
| Millbrae | 70061 | 70062 | 
| Morgan Hill | 70301 | 70302 | 
| Mountain View | 70211 | 70212 | 
| Palo Alto | 70171 | 70172 | 
| Redwood City | 70141 | 70142 | 
| San Antonio | 70201 | 70202 | 
| San Bruno | 70051 | 70052 | 
| San Carlos | 70131 | 70132 | 
| San Francisco | 70011 | 70012 | 
| San Jose Diridon | 70261 | 70262 | 
| San Martin | 70311 | 70312 | 
| San Mateo | 70091 | 70092 | 
| Santa Clara | 70241 | 70242 | 
| South San Francisco | 70041 | 70042 | 
| Sunnyvale | 70221 | 70222 | 
| Tamien | 777403 | 70272 | 


## External Dependencies

Moment.js - https://momentjs.com/

node-fetch - https://www.npmjs.com/package/node-fetch
