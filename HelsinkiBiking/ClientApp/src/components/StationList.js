import React, { Component, useState, useEffect } from 'react';
import backgroundBikes from './images/bikestationbackground.png';



function StationListContent({ selectedStation, setSelectedStation }) {
    const [stations, setStations] = useState([]);
    
    const [departureStationCount, setDepartureStationCount] = useState(null);
    const fetchDepartureStationTotal = (stationName) => {
        fetch(`https://localhost:7148/api/DepartureStationCount/${stationName}`)
            .then(response => response.json())
            .then(retrievedCounts => {
                console.log(`Retrieved Count Values are ${retrievedCounts}`)
                console.log(`Total departures for ${stationName}: ${retrievedCounts.departureCount}`);
                console.log(`Total returns  for ${stationName}: ${retrievedCounts.returnCount}`);
                setDepartureStationCount(retrievedCounts);
                // Do something with the count, maybe set it in the state.
            });
    };
    useEffect(() => {
        // Assuming your API runs on the same server & port as your React app
        fetch('https://localhost:7148/api/stations')
            .then(response => {
                return response.json();
            })

            .then(data => {         
                setStations(data);
            });
    }, []); // Note the empty dependency array here.
    const handleStationClick = (station) => {
        setSelectedStation(station);
    };
    useEffect(() => {
        // Fetch the station totals only when selectedStation changes
        if (selectedStation) {
            fetchDepartureStationTotal(selectedStation.name);
        }
    }, [selectedStation]);

    if (selectedStation) {
        return (               
                <div>
                    <h1>Station Details</h1>
                    <p>Departure Station Name: {selectedStation.name}</p>
                    <p>Address: {selectedStation.adress}</p>
                    <p>Total Departures Tos Station: {departureStationCount?.departureCount || 'Loading...'}</p>
                    <p>Total Returns From Station: {departureStationCount?.returnCount || 'Loading...'}</p>
                    <button onClick={() => setSelectedStation(null)}>Back to list</button>
                </div>
       
         
        );
    }
    else {
        return (
            <ul>
                {stations.map(station => (
                    <li
                        key={station.fid}
                        onClick={() => handleStationClick(station)}>
                        {station.name} - {station.adress}
                    </li>
                ))}
            </ul>);

    }


}

export class StationList extends Component {
  static displayName = "StationList"

    constructor(props) {
        super(props);
        this.state = {
            selectedStation: null
        };
    }

    setSelectedStation = (station) => {
        this.setState({ selectedStation: station });
    };


  
  render() {
      const { selectedStation } = this.state;

      return (
          <div>
              {selectedStation ? null : (
                  <div>
                      <div className="background_station_list_container">
                          <div className="background-station-list-overlay">
                          </div>"
                      </div>

                      
                      
                      <h1> Station List</h1>
                      <p>Select a station below:</p>
                  </div>
              )}
              <StationListContent
                  selectedStation={selectedStation}
                  setSelectedStation={this.setSelectedStation} />
          </div>
      );
  }

}
