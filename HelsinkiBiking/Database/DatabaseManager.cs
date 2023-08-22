﻿namespace HelsinkiBiking.Database
{
    using MySql.Data.MySqlClient;
    using static System.Collections.Specialized.BitVector32;

    public class DatabaseManager
    {
        private readonly string _connectionString;

        public DatabaseManager(string connectionString)
        {
            _connectionString = connectionString;
        }

        public virtual List<Station> GetStations()
        {
            List<Station> stations = new List<Station>();

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM StationsList LIMIT 5";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                       Station station = new Station(
                       reader.GetInt32("FID"),
                       reader.GetInt32("ID"),
                       reader.GetString("Nimi"),
                       reader.GetString("Namn"),
                       reader.GetString("Name"),
                       reader.GetString("Osoite"),
                       reader.GetString("Adress"),
                       reader.GetString("Kaupunki"),
                       reader.GetString("Stad"),
                       reader.GetString("Operaattor"),
                       reader.GetInt32("Kapasiteet"),
                       reader.GetDecimal("x"),
                       reader.GetDecimal("y")
                   );

                            stations.Add(station);
                            Console.Write("stations list length is on next line:");
                            Console.WriteLine(stations.Count);
                        }
                    }
                }
                connection.Close();
            }
           
            return stations;
        }

        public virtual List<Journey> GetJourneys()
        {
            List<Journey> journeys = new List<Journey>();

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM `2021-06` LIMIT 5";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Journey journey = new Journey(
                                reader.GetDateTime("Departure"),
                                reader.GetDateTime("ReturnDate"),
                                reader.GetInt32("Departure_station_id"),
                                reader.GetString("Departure_station_name"),
                                reader.GetInt32("Return_station_id"),
                                reader.GetString("Return_station_name"),
                                reader.GetInt32("Covered_distance"),
                                reader.GetString("Duration")
                            );

                            journeys.Add(journey);
                        }
                    }
                }
                connection.Close();
            }

            return journeys;
        }

        public virtual int GetDepartureStationTotal()
        {
            int count = 0;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT Count(*) AS DepartureStationCount FROM `2021-07` WHERE Departure_station_name = @stationName";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@stationName", "Kustaankatu");

                    object result = command.ExecuteScalar();
                    if (result != null)
                    {
                        count = Convert.ToInt32(result);
                    }
                }
                connection.Close();
            }

            return count;
        }

    }


}
