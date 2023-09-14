import React, { Component, useState, useEffect } from 'react';
import leftBike from './images/leftBike.png';
import rightBike from './images/rightBike.png';
function JourneyListContent() {
    const [journeys, setJourneys] = useState([]);
    const [journeyCount, setJourneyCount] = useState([]);
    const getJourneysByPageNumber = (pageNumber) => {
        fetch(`http://localhost:7148/api/journeys/${pageNumber}`)
            .then(response => response.json())
            .then(retrievdJourneys => {
                
              
            });
    };
    useEffect(() => {
        // Assuming your API runs on the same server & port as your React app
        fetch('http://localhost:7148/api/journeys/1')
            .then(response => {
                console.log("rist response is ", response);
               return response.json();

            })
               
            .then(data => {
                console.log("API Data:", data);
                setJourneys(data);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:7148/api/totaljourneys')
            .then(response => { return response.json(); })
            .then(data => {
                console.log("data for jounrey count is ", data);
                setJourneyCount(data)

            })

    }, []);// Note the empty dependency array here.

    return (
        <div>
            <div className="journey-alternating-border ">
                <div className="journey-list-header-image">
                    <img src={leftBike} alt = "left bike" className = "left-bike"></img>
                    <h1>List of Journeys</h1>
                    <img src={rightBike} alt = "right - bike" className = "right-bike"></img>
                </div>
                
            </div>
        <div>
         
            <div>
                {journeys.map((journey, index )=> {
                    let durationMinutes = Math.floor(journey.duration / 60);
                   //  let distanceKilometers = Math.round(journey.duration * 100 / 1000) / 100;
                    let distanceKilometers = Math.round(journey.coveredDistance * 100 / 1000) / 100;
                    let count = index + 1;
                    let date = new Date(journey.departure);
                    let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                 

                    return (
                        <div key={journey.id /* assuming there's an id property on journey */} className = "journey-list">
                            <h1>  Journey# {count} {formattedDate}</h1>
                            <p>
                                <span className="lobster-label">Departure Station Name:</span> {journey.departureStationName} <br />
                                <span className="lobster-label">Return Station Name:</span> {journey.returnStationName} <br />
                                <span className="lobster-label">Duration (Minutes):</span> {durationMinutes} Minutes <br />
                                <span className="lobster-label">Covered Distance (Kilometers):</span> {distanceKilometers} Kilometers
                            </p>
                        </div>
                    );
                }
                )}
            </div>
            </div>
</div>
    );
}

export class JourneyList extends Component {
    static displayName = "JourneyList";

    constructor(props) {
        super(props);
    }

    render() {
     

        return (
            <div>
                
                <JourneyListContent />
              
            </div>
        );
    }
}
