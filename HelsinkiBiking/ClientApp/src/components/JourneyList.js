import React, { Component, useState, useEffect } from 'react';
import leftBike from './images/leftBike.png';
import rightBike from './images/rightBike.png';
function JourneyListContent() {
    const [journeys, setJourneys] = useState([]);

    useEffect(() => {
        // Assuming your API runs on the same server & port as your React app
        fetch('https://localhost:7148/api/journeys')
            .then(response => {
                console.log("rist response is ", response);
               return response.json();

            })
               
            .then(data => {
                console.log("API Data:", data);
                setJourneys(data);
            });
    }, []); // Note the empty dependency array here.

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
                           
                                Departure Station Name: {journey.departureStationName} <br />
                                Return Station Name: {journey.returnStationName} <br />
                                Duration (Minutes): {durationMinutes} Minutes <br />
                                Covered Distance (Kilometers): {distanceKilometers} Kilometers
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
