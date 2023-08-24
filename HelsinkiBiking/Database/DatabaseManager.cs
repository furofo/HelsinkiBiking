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

                string query = "SELECT * FROM `alljourneys` LIMIT 5";

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

     
        public virtual int GetDepartureStationTotal(string stationName)
        {
            int count = 0;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT Count(*) AS DepartureStationCount FROM `alljourneys` WHERE Departure_station_name = @stationName";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@stationName", stationName);

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
        public virtual string[] GetAllTableNames()
        {
            List<string> tableNames = new List<string>();
        
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SHOW TABLES FROM testhelsinkidatabase";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Assuming the table name is in the first column of the result set
                            tableNames.Add(reader.GetString(0));
                        }
                    }
                }
                connection.Close();
            }

            return tableNames.ToArray();
        }

        public List<string> returnTableNamesThatAreNotStationList(string[] tableNames)
        {
            List<string> tableNamesThatAreNotStationList = new List<string>();
            for(int i = 0; i < tableNames.Length; i++)
            {
                if (!tableNames[i].Equals("stationslist"))
                {
                    tableNamesThatAreNotStationList.Add(tableNames[i]);
                }
            }
            return tableNamesThatAreNotStationList;
        }
        public virtual void GetAllJourneyDates()
        {
            List<Journey> AllJourneys = new List<Journey>();
            string[] allTableNames = GetAllTableNames();
            List<string> tableNamesNotStationList = returnTableNamesThatAreNotStationList(allTableNames);
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                for(int i = 0; i < tableNamesNotStationList.Count; i++)
                {
                    Console.WriteLine($"Table names in this query are {tableNamesNotStationList[i]}");
                }
                string query = "SHOW TABLES FROM testhelsinkidatabase";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Assuming the table name is in the first column of the result set
                            
                        }
                    }
                }
                connection.Close();
            }

           
        }
        public List<Journey> GetAllJourneys(List<string> tableNames)
        {
            List<Journey> allJourneys = new List<Journey>();

            // We'll construct a list of subqueries, each selecting from one of the table names.
            List<string> subqueries = new List<string>();

            foreach (var tableName in tableNames)
            {
                // For each table name, create a SELECT statement
                string subquery = $"SELECT * FROM `{tableName}`";
                subqueries.Add(subquery);
            }

            // Join the subqueries using UNION ALL and limit the result
            string query = string.Join(" UNION ALL ", subqueries) + " LIMIT 10";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

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

                            allJourneys.Add(journey);
                        }
                    }
                }
                connection.Close();
            }

            return allJourneys;
        }

    }




}
