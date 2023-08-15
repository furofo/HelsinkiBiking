namespace HelsinkiBiking.Database
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

        public List<Station> GetStations()
        {
            List<Station> stations = new List<Station>();

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM StationsList";

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
            }

            return stations;
        }
    }

}
