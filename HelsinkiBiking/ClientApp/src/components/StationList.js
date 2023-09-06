import React, { Component, useState, useEffect } from 'react';
import backgroundBikes from './images/bikestationbackground.png';
import xMarksSpot from './images/xmarkspotwithoutbackground.png';


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
                <div className="station_details_container">
                    <h1> Station Details</h1>
                    <div className="overlay">
                </div>
                </div>
                    
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
            <div>
                {stations.map(station => (
                    <div>
                    <div className = "all-stations-list">
                        <h1>{station.name}</h1>
                            <img src={xMarksSpot} alt="X Marks the Spot" className="x-marks-the-spot" /> 
                        </div>
                        <div className="all-stations-list">
                            <div className="orange-line"> </div>
                            <div className = "black-line"> </div>

</div>
                    <li
                        key={station.fid}
                        onClick={() => handleStationClick(station)}>
                         - {station.adress}
                        </li>
                       
                    </div>
                ))}
            </div>);

    }


}

export class StationList extends Component {
  static displayName = "StationList"

    constructor(props) {
        super(props);
        this.state = {
            selectedStation: null,
            slideLeft: false
        };
    }

    setSelectedStation = (station) => {
        this.setState({
            selectedStation: station,
            slideLeft: station === null
        });
    };


  
  render() {
      const { selectedStation } = this.state;

      return (
          <div>
              {selectedStation ? null : (
                  <div>
                      <div className={`background_station_list_container ${this.state.slideLeft ? 'apply-slide-left' : ''}`}>
                          <h1> Station List</h1>
                          <div className="overlay">
                          </div>
                      </div>        
                  </div>
              )}
              <div className = "map-background-container "> </div>
              <StationListContent
                  selectedStation={selectedStation}
                  setSelectedStation={this.setSelectedStation} />
          </div>
      );
  }

}
