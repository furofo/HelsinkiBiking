using HelsinkiBiking.Database;
using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);
DotNetEnv.Env.Load();
string connectionString = System.Environment.GetEnvironmentVariable("ConnectionStrings__HelsinkiDatabase");
try
{
    DatabaseManager dbManager = new DatabaseManager(connectionString);
   List <Journey> allJourneys = dbManager.GetAllJourneys();
    for(int i = 0; i < allJourneys.Count; i++)
    {
        Console.WriteLine($"Journey name is {allJourneys[i].ReturnStationName}");
        Console.WriteLine($"Count of departure station Abraham Wetterin tie is { dbManager.GetStationTotals("Abraham Wetterin tie").DepartureCount}");
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
