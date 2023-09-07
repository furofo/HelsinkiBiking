using static System.Collections.Specialized.BitVector32;
using System.Collections.Generic;
using System;
using HelsinkiBiking.Database;
using Moq;
using HelsinkiBiking.Models;

namespace HelsinkiBiking.Test
{
    public class UnitTest1
    {
        [Fact]
        public void GetStations_ReturnsExpectedStations()
        {
            // Arrange
            var mockDbManager = new Mock<DatabaseManager>(It.IsAny<string>());

            var expectedStations = new List<Station>
        {
          new Station(
            fid: 1,
            id: 1,
            nimi: "Station1",
            namn: "NamnValue",
            name: "NameValue",
            osoite: "OsoiteValue",
            adress: "AdressValue",
            kaupunki: "KaupunkiValue",
            stad: "StadValue",
            operaattor: "OperaattorValue",
            kapasiteet: 10,
            x: 0m,
            y: 0m
            )

           
        };

            mockDbManager.Setup(db => db.GetStations()).Returns(expectedStations);

            // Act
            var stations = mockDbManager.Object.GetStations();

            // Assert
            Assert.NotNull(stations);
            Assert.Equal(expectedStations.Count, stations.Count);
            // Add more assertions as necessary
        }
        [Fact]
        public void GetAllJourneys_ReturnsExpectedJourneys()
        {
            // Arrange
            var mockDbManager = new Mock<DatabaseManager>(It.IsAny<string>());

            var expectedJourneys = new List<Journey>
    {
        new Journey(DateTime.Now, DateTime.Now.AddHours(1), 1, "Station1", 2, "Station2", 10, "1 hour")
    };

            mockDbManager.Setup(db => db.GetAllJourneys()).Returns(expectedJourneys);

            // Act
            var journeys = mockDbManager.Object.GetAllJourneys();

            // Assert
            Assert.NotNull(journeys);
            Assert.Equal(expectedJourneys.Count, journeys.Count);
        }
        [Fact]
        public void GetStations_ReturnsEmptyList_WhenNoStationsAvailable()
        {
            // Arrange
            var mockDbManager = new Mock<DatabaseManager>(It.IsAny<string>());

            var expectedStations = new List<Station>();
            mockDbManager.Setup(db => db.GetStations()).Returns(expectedStations);

            // Act
            var stations = mockDbManager.Object.GetStations();

            // Assert
            Assert.NotNull(stations);
            Assert.Empty(stations);
        }
    }
  


    
}