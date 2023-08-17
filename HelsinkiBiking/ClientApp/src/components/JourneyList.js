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
            <h2>List of Journeys</h2>
            <ul>
                {journeys.map(journey => (
                    <li key={journey.departureStationId}>
                        {journey.departureStationName} - {journey.returnStationName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export class JourneyList extends Component {
    static displayName = "JourneyList";

    constructor(props) {
        super(props);
    }

    render() {
        console.log("testing if this ran journeys list");

        return (
            <div>
                <h1>JourneyList</h1>
                <JourneyListContent />
                <p>This is a simple example of a React component.</p>
            </div>
        );
    }
}
