import React, { Component, useState, useEffect } from 'react';




function StationListContent() {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [departureStationCount, setDepartureStationCount] = useState(null);
    const fetchDepartureStationTotal = (stationName) => {
        fetch(`https://localhost:7148/api/DepartureStationCount/${stationName}`)
            .then(response => response.json())
            .then(count => {
                console.log(`Total departures for ${stationName}: ${count}`);
                setDepartureStationCount(count);
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
    if (selectedStation) {
        fetchDepartureStationTotal(selectedStation.name);
        return (
            <div>
                <h1> Station Details</h1>
                <p> Departure Station Name:  {selectedStation.name} -
               Address:  {selectedStation.adress} -  Total Departures From Station: {departureStationCount} </p>
                <button onClick={() => setSelectedStation(null)}>Back to list</button>
            </div>
        );
    } else {
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
  }

  
  render() {
 

    return (
      <div>
       <h1> Station List</h1>
        <p>Select a station below:</p>
       <StationListContent />
      </div>
    );
  }

}
