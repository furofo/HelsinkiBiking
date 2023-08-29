namespace HelsinkiBiking.Models
{
    public class Journey
    {
        public DateTime Departure { get; set; }
        public DateTime ReturnDate { get; set; }
        public int DepartureStationId { get; set; }
        public string DepartureStationName { get; set; }
        public int ReturnStationId { get; set; }
        public string ReturnStationName { get; set; }
        public int CoveredDistance { get; set; }
        public string Duration { get; set; }

        public Journey(DateTime departure, DateTime returnDate, int departureStationId, string departureStationName,
                       int returnStationId, string returnStationName, int coveredDistance, string duration)
        {
            Departure = departure;
            ReturnDate = returnDate;
            DepartureStationId = departureStationId;
            DepartureStationName = departureStationName;
            ReturnStationId = returnStationId;
            ReturnStationName = returnStationName;
            CoveredDistance = coveredDistance;
            Duration = duration;
        }
    }
}