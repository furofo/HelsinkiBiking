import React, { Component, useState, useEffect } from 'react';
import leftBike from './images/leftBike.png';
import rightBike from './images/rightBike.png';
import PaginationList from './PaginationList';

function JourneyListContent() {
    const [journeys, setJourneys] = useState([]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [maxPage, setMaxPage] = useState(1);
    useEffect(() => {
        fetch(`https://localhost:7149/api/journeys/${currentPage}`)
            .then(response => {
                console.log("firs use effect executing here");
                return response.json()
            })
            .then(data => {
                console.log("API Data:", data);
                setJourneys(data);
                fetch('https://localhost:7149/api/totaljourneys')
                    .then(response => response.json())
                    .then(data => {
                        console.log("data for journey count is ", data);
                        const max = Math.ceil(data / 10); // Assuming 10 items per page
                        setMaxPage(max);
                        setIsLoading(false);
                    });
            });
    }, [currentPage]);


    /*fetch('https://localhost:7149/api/totaljourneys')
        .then(response => response.json())
        .then(data => {
            console.log("data for journey count is ", data);
            const max = Math.ceil(data / 10); // Assuming 10 items per page
            setMaxPage(max);
        });
*/
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
                    let startingJourneyNumber = (currentPage - 1) * 10;
                    let journeyNumber = startingJourneyNumber + index + 1;
                    let date = new Date(journey.departure);
                    let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                 

                    return (
                        <div key={`Journey${index}`/* assuming there's an id property on journey */} className = "journey-list">
                            <h1>  Journey#{journeyNumber} {formattedDate}</h1>
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
                    {/* Only show PaginationList if not loading */}
                    {!isLoading && (
                        <PaginationList
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            maxPage={maxPage}
                        />
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
