# Module: Caltrain Departure Times
The `Caltrain` module provides estimated times of departure (etd) for the selected station. The module can display etd in minutes or 12 hour format. Northbound and Southbound times can be displayed or hidden.


## Adding Caltrain Departure Times to Your Magic Mirror
1. Navigate to the modules folder in your Magic Mirror project
1. Clone the Caltrain module by running `git clone https://github.com/zzhenney/MMM-Caltrain`
2. Run `npm install`
3. Optain 511.org API Key. 511.org/api_key
4. Optain Station Id (see Station ID table)
5. Update your Magic Mirror config.js file to include the following:
```javascript
{
  module: "MMM-Caltrain",
  position: "top_right",
  disabled: false,
  config: {
    stop_codes: [
      southbound_id = "70022",

    ],
    api_key: "766666ef-8687-4a65-8ca3-0a0d777107a2",
    countdown: true
    
  }
}
```
## Station IDs

| Station Name | ID (Northbound, Southbound) |
| --- | --- |
| 22nd Street Caltrain | [70021, 70022] |
| Atherton Caltrain | [70151, 70152] |
| Bayshore Caltrain | [70031, 70032] |
| Belmont Caltrain | [70121, 70122] |
| Blossom Hill Caltrain | [70291, 70292] |
| Broadway Caltrain | [70071, 70072] |
| Burlingame Caltrain | [70081, 70082] |
| California Ave Caltrain | [70191, 70192] |
| Capitol Caltrain | [70281, 70282] |
| College Park Caltrain | [70251, 70252] |
| Gilroy Caltrain | [70321, 70322] |
| Hayward Park Caltrain | [70101, 70102] |
| Hillsdale Caltrain | [70111, 70112] |
| Lawrence Caltrain | [70231, 70232] |
| Menlo Park Caltrain | [70161, 70162] |
| Millbrae Caltrain | [70061, 70062] |
| Morgan Hill Caltrain | [70301, 70302] |
| Mountain View Caltrain | [70211, 70212] |
| Palo Alto Caltrain | [70171, 70172] |
| Redwood City Caltrain | [70141, 70142] |
| San Antonio Caltrain | [70201, 70202] |
| San Bruno Caltrain | [70051, 70052] |
| San Carlos Caltrain | [70131, 70132] |
| San Francisco Caltrain | [70011, 70012] |
| San Jose Caltrain Station | [777402] |
| San Jose Diridon Caltrain | [70261, 70262] |
| San Martin Caltrain | [70311, 70312] |
| San Mateo Caltrain | [70091, 70092] |
| Santa Clara Caltrain | [70241, 70242] |
| South San Francisco Caltrain | [70041, 70042] |
| Stanford Caltrain | [2537740] |
| Sunnyvale Caltrain | [70221, 70222] |
| Tamien Caltrain | [70271, 70272] |
| Tamien Caltrain Station | [777403] |




## Configuration Options

| Option | Description |
| --- | --- |
| `northbound_id` | Station ID for North bound trains. Stop IDs can be obtained here: https://511.org/transit/agencies/stop-id |
| `southbound_id` | Station ID for South bound trains |
| `countdown` | Set this to true to display minutes until departure. Set to false to show the time of departure |
| `api_key` | The API key can be obtained here: https://511.org/open-data/token |
