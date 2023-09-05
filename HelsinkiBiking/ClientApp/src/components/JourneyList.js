import React, { Component, useState, useEffect } from 'react';

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
                <h1>List of Journeys</h1>
            </div>
        <div>
         
            <div>
                {journeys.map(journey => {
                    let durationMinutes = Math.floor(journey.duration / 60);
                   //  let distanceKilometers = Math.round(journey.duration * 100 / 1000) / 100;
                    let distanceKilometers = Math.round(journey.coveredDistance * 100 / 1000) / 100;
                    let count = 1;
                    count++;


                    return (
                        <div key={journey.id /* assuming there's an id property on journey */}>
                            <p>
                                Journey# {count} {journey.departure}
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
