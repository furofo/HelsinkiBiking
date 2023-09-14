import React, { Component, useState, useEffect } from 'react';
import leftBike from './images/leftBike.png';
import rightBike from './images/rightBike.png';
function JourneyListContent() {
    const [journeys, setJourneys] = useState([]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    useEffect(() => {
        fetch(`http://localhost:7148/api/journeys/${currentPage}`)
            .then(response => {
                console.log("firs use effect executing here");
                return response.json()
            })
            .then(data => {
                console.log("API Data:", data);
                setJourneys(data);
                fetch('http://localhost:7148/api/totaljourneys')
                    .then(response => response.json())
                    .then(data => {
                        console.log("data for journey count is ", data);
                        const max = Math.ceil(data / 10); // Assuming 10 items per page
                        setMaxPage(max);
                    });
            });
    }, [currentPage]);


    /*fetch('http://localhost:7148/api/totaljourneys')
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
                        <div key={journey.id /* assuming there's an id property on journey */} className = "journey-list">
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
                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Back</button>
                        {
                            [...Array(maxPage).keys()].slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 2, maxPage))
                                .map((_, index, arr) => {
                                    console.log("mapping agin!!");
                                    const pageNum = arr[0] + index + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            disabled={pageNum === currentPage}
                                            onClick={() => setCurrentPage(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })
                        }
                        <button disabled={currentPage === maxPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </div>

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
