import React, { Component, useState, useEffect } from 'react';
import xMarksSpot from './images/xmarkspotwithoutbackground.png';
import locationMap from './images/locatiomapnobackground.png';
import bicycleWheel from './images/bicycleWheelNoBackground.png';
import PaginationList from './PaginationList';






function StationListContent({ selectedStation, setSelectedStation }) {
    const [stations, setStations] = useState([]);  
    const [departureStationCount, setDepartureStationCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const fetchDepartureStationTotal = (id) => {
        fetch(`/api/DepartureStationCount/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log("resonpse is now" + response);
                return response.json()
            })
            .then(retrievedCounts => {
                console.log("retriecCounts is", retrievedCounts);
                console.log("dpearure count is", retrievedCounts.departureCount);
                setDepartureStationCount(retrievedCounts);
                // Do something with the count, maybe set it in the state.
            }).catch(error => {
                console.error("Fetch failed:", error);
            });
    };
    useEffect(() => {
        // Define a function to fetch data
        const fetchData = async () => {
            let url = `/api/stations/${currentPage}`;
            let data;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
            } catch (error) {
                // If the fetch fails, switch to the local URL
                url = `https://localhost:44447/api/stations/${currentPage}`;
                console.log('url is now:', url);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
            }

            // Update state with fetched data
            setStations(data);

            // Fetch total journeys
            const response = await fetch('/api/totaljourneys');
            const totalJourneys = await response.json();
            const max = Math.ceil(totalJourneys / 10); // Assuming 10 items per page
            setMaxPage(max);
            setIsLoading(false);
        };

        // Call the fetch function
        fetchData();
    }, [currentPage]);

    const handleStationClick = (station) => {
        setSelectedStation(station);
    };
    useEffect(() => {
        // Fetch the station totals only when selectedStation changes
        if (selectedStation) {
            fetchDepartureStationTotal(selectedStation.id);
        }
    }, [selectedStation]);

    if (selectedStation) {
        return (               
            <div >
                <div className="station_details_container">
                    <h1> Station Details</h1>
                    <div className="overlay">
                </div>
                </div>
                <div className="all-stations-list station-details">
                    <div className="wheel-image-wrapper">
                        <img src={bicycleWheel} alt="Bicycle Wheel" className="bicycle-wheel" /> 
                    </div>
                    <div className="details-wrapper">
                        <h1 className="details-header"> Station Name: </h1>
                    </div>
                    <div className="selected-station-name-wrapper">
                        <p>{selectedStation.name}</p>
                    </div>
                   
                   
                </div>
                <div className="all-stations-list station-details">
                    <div className="details-wrapper">
                        <h1 className="details-header"> Address: </h1>
                    </div>
                    <div className="selected-station-name-wrapper">
                        <p>{selectedStation.adress}</p>
                    </div>
                </div>
                <div className="all-stations-list station-details">
                    <div className="details-wrapper">
                        <h1 className="details-header"> Total Departures To Station: </h1>
                    </div>
                    <div className="selected-station-name-wrapper">
                        <p className="orange-text">{departureStationCount?.departureCount || 'Loading...'}</p>
                    </div>
                </div> 
                <div className="all-stations-list station-details">
                    <div className="details-wrapper">
                        <h1 className="details-header" > Total Departures From Station: </h1>
                    </div>
                    <div className="selected-station-name-wrapper">
                        <p className="orange-text details-p">{departureStationCount?.returnCount || 'Loading...'}</p>
                    </div>
                </div>
                <div className="all-stations-list station-details">
                    <button className = "selected-station-button" onClick={() => setSelectedStation(null)}>Back to list</button>

                </div>


                    
                  
                  
               <div className="bike-parts-background-container "> </div>   
            </div>
         
        );
    }
    else {
        return (
            <div>
                {stations.map((station, index) => (
                    <div key={`Station${index}`} >
                    <div className = "all-stations-list">
                        <h1>{station.name}</h1>
                            <img src={xMarksSpot} alt="X Marks the Spot" className="x-marks-the-spot" /> 
                        </div>
                        <div className="all-stations-list">
                            <div className="orange-line"> </div>
                            <div className="black-line"> </div>
                            
                 
                        </div>
                        <div className="all-stations-list" onClick={() => handleStationClick(station)}>

                            <div className="map-and-text-wrapper">
                            <img src={locationMap} alt="Location Map" className="location-map" />
                            <p className = "clickable">
                                {station.adress}
                                </p>
                            </div>
                        </div>
                        <div className="all-stations-list">
                            <button className="station-details-button" onClick={() => handleStationClick(station)}>
More Details                                </button>
                        </div>
                        <div className="map-background-container "> </div>
                       
                    </div>
                ))}
                {!isLoading && (
                    <PaginationList
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        maxPage={maxPage}
                    />
                )}
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
             
              <StationListContent
                  selectedStation={selectedStation}
                  setSelectedStation={this.setSelectedStation} />
          </div>
      );
  }

}
