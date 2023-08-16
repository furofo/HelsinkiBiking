using static System.Collections.Specialized.BitVector32;
using System.Collections.Generic;
using System;
using HelsinkiBiking.Database;
using Moq;
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

            // ... add more mock stations as necessary
        };

            mockDbManager.Setup(db => db.GetStations()).Returns(expectedStations);

            // Act
            var stations = mockDbManager.Object.GetStations();

            // Assert
            Assert.NotNull(stations);
            Assert.Equal(expectedStations.Count, stations.Count);
            // Add more assertions as necessary
        }
    }
  


    
}