import React, { Component, useState, useEffect } from 'react';

const fetchStationInfo = (stationId) => {
    setIsLoading(true);
    fetch(`https://localhost:7148/api/stationinfo/Kustaankatu`) // assuming the ID is part of the URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setStationInfo(data);
            setIsLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setIsLoading(false);
        });
};


function StationListContent() {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        // Assuming your API runs on the same server & port as your React app
        fetch('https://localhost:7148/api/stations')
            .then(response => {
                console.log("rist response is ", response);
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
        return (
            <div>
                <h1> Station Details</h1>
                {selectedStation.name} - {selectedStation.adress}
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
