using HelsinkiBiking.Database;
using MySql.Data.MySqlClient;


var builder = WebApplication.CreateBuilder(args);
// string connectionString = builder.Configuration.GetConnectionString("HelsinkiDatabase");
DotNetEnv.Env.Load();
string connectionString = System.Environment.GetEnvironmentVariable("ConnectionStrings__HelsinkiDatabase");
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

try
{
    DatabaseManager dbManager = new DatabaseManager(connectionString);
    List<Journey> journeys = dbManager.GetJourneys();

    foreach (Journey journey in journeys)
    {
        Console.WriteLine($"Departure: {journey.Departure}, ReturnDate: {journey.ReturnDate}, Departure Station: {journey.DepartureStationName}");
        // You can access other properties of the Journey object here
    }
}
catch (Exception ex)
{
    Console.WriteLine("An error occurred: " + ex.Message);
}
builder.Services.AddSingleton(connectionString);

builder.Services.AddSingleton<DatabaseManager>();
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://localhost:44446")  // Replace with your React app's domain/port
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// ...




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
app.UseCors();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Make sure controllers are mapped
});



app.MapFallbackToFile("index.html");

app.Run();
