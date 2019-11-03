# Module: Caltrain Departure Times
The `Caltrain` module provides estimated times of departure (etd) for the selected station. The module can display etd in minutes or 12 hour format. Northbound and Southbound times can be displayed or hidden.


## Adding Caltrain Departure Times to Your Magic Mirror
1. Navigate to the modules folder in your Magic Mirror project
1. Clone the Caltrain module by running `git clone https://github.com/zzhenney/MMM-Caltrain`
2. Run `npm install`
3. Update your Magic Mirror config.js file to include the following:
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


## Configuration Options

| Option | Description |
| --- | --- |
| `northbound_id` | Station ID for North bound trains. Stop IDs can be obtained here: https://511.org/transit/agencies/stop-id |
| `southbound_id` | Station ID for South bound trains |
| `countdown` | Set this to true to display minutes until departure. Set to false to show the time of departure |
| `api_key` | The API key can be obtained here: https://511.org/open-data/token |
