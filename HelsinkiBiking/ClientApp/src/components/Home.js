import React, { Component } from 'react';


export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div id="custom-container">
                <div className="background-bike-container">
                  {/*  <img
                        src={require('./images/backgrounbike2.png')} // Adjust the path accordingly
                        alt="Background Bike"
                        className = "background-bike-image"
                    />*/}
                </div>
               
                <p className="index-styling">
                    View your journeys and stations traveled. And log your future
                    adventures!!
                </p>
            </div>
        );
    }
}
