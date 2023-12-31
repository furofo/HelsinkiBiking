﻿namespace HelsinkiBiking.Database
{
    using HelsinkiBiking.Models;
    using Microsoft.AspNetCore.Mvc.RazorPages;
    using MySql.Data.MySqlClient;
    using static System.Collections.Specialized.BitVector32;

    public class DatabaseManager
    {
        private readonly string _connectionString;

        public DatabaseManager(string connectionString)
        {
            _connectionString = connectionString;
        }

        public virtual List<Station> GetStationsByPage(int page)
        {
            List<Station> stations = new List<Station>();

            // Calculate the offset based on the page number and the number of records per page (e.g., 5 per page)
            int recordsPerPage = 10;
            int offset = (page - 1) * recordsPerPage;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                // Use the LIMIT and OFFSET clauses to implement pagination
                string query = $"SELECT * FROM stationslist ORDER BY Name LIMIT {recordsPerPage} OFFSET {offset}";

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
                        }
                    }
                }
                connection.Close();
            }

            return stations;
        }


        public virtual List<Journey> GetJourneysByPage(int page)
        {
            List<Journey> journeys = new List<Journey>();

            // Calculate the offset based on the page number and the number of records per page (e.g., 10 per page)
            int recordsPerPage = 10;
            int offset = (page - 1) * recordsPerPage;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                // Use the LIMIT and OFFSET clauses to implement pagination
                string query = $"SELECT * FROM `alljourneys` ORDER BY Departure DESC LIMIT {recordsPerPage} OFFSET {offset}";

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



        public virtual StationTotals GetStationTotals(int id)
        {
            int departureCount = 0;
            int returnCount = 0;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string query = @"
        SELECT 
            (SELECT Count(*) FROM `alljourneys` WHERE Departure_station_id = @id) AS DepartureCount,
            (SELECT Count(*) FROM `alljourneys` WHERE Return_station_id = @id) AS ReturnCount";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    // Use MySqlParameter to safely pass the id and fid values
                    command.Parameters.Add(new MySqlParameter("@id", MySqlDbType.Int32) { Value = id });
                    command.Parameters.Add(new MySqlParameter("@fid", MySqlDbType.Int32) { Value = id });

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            departureCount = reader.GetInt32("DepartureCount");
                            returnCount = reader.GetInt32("ReturnCount");
                        }
                    }
                }
                connection.Close();
            }

            return new StationTotals
            {
                DepartureCount = departureCount,
                ReturnCount = returnCount
            };
        }




        public virtual int GetTotalJourneysCount()
        {
            int totalJourneysCount = 0;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                // Use the COUNT(*) query to get the total number of journeys
                string query = "SELECT COUNT(*) FROM `alljourneys`";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    totalJourneysCount = Convert.ToInt32(command.ExecuteScalar());
                }

                connection.Close();
            }

            return totalJourneysCount;
        }
        public virtual int GetTotalStationsCount()
        {
            int totalStationsCount = 0;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();


                // Use the COUNT(*) query to get the total number of journeys
                string query = "SELECT COUNT(*) FROM `stationslist`";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    totalStationsCount = Convert.ToInt32(command.ExecuteScalar());
                }

                connection.Close();
            }

            return totalStationsCount;
        }


    }




}
