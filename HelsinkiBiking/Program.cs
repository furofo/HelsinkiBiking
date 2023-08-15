using HelsinkiBiking.Database;
using MySql.Data.MySqlClient;
string connectionString = "Server=localhost;Port=3306;Database=testhelsinkidatabase;Uid=root;Pwd=";
try
{
    DatabaseManager dbManager = new DatabaseManager(connectionString);
    List<Station> stations = dbManager.GetStations();

    foreach (Station station in stations)
    {
        Console.WriteLine($"FID: {station.FID}, ID: {station.ID}, Nimi: {station.Nimi}");
        // You can access other properties of the Station object here
    }
}
catch (Exception ex)
{
    Console.WriteLine("An error occurred: " + ex.Message);
}
        

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
//meh
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
