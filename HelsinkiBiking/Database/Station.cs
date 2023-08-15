namespace HelsinkiBiking.Database
{
    public class Station
    {
        public int FID { get; set; }
        public int ID { get; set; }
        public string Nimi { get; set; }
        public string Namn { get; set; }
        public string Name { get; set; }
        public string Osoite { get; set; }
        public string Adress { get; set; }
        public string Kaupunki { get; set; }
        public string Stad { get; set; }
        public string Operaattor { get; set; }
        public int Kapasiteet { get; set; }
        public decimal x { get; set; }
        public decimal y { get; set; }

        public Station(int fid, int id, string nimi, string namn, string name, string osoite, string adress, string kaupunki,
                       string stad, string operaattor, int kapasiteet, decimal x, decimal y)
        {
            FID = fid;
            ID = id;
            Nimi = nimi;
            Namn = namn;
            Name = name;
            Osoite = osoite;
            Adress = adress;
            Kaupunki = kaupunki;
            Stad = stad;
            Operaattor = operaattor;
            Kapasiteet = kapasiteet;
            this.x = x;
            this.y = y;
        }
    }

}
