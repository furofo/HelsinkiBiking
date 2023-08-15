using MySql.Data.MySqlClient;
string connectionString = "Server=localhost;Port=3306;Database=testhelsinkidatabase;Uid=root;Pwd=";
try
{
    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        connection.Open();

        // Execute a SELECT queryd
        string query = "SELECT * FROM StationsList";
        using (MySqlCommand command = new MySqlCommand(query, connection))
        {
            using (MySqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    // Access data using reader["column_name"] or reader[index]
                    int fid = reader.GetInt32("FID");
                    int id = reader.GetInt32("ID");
                    string nimi = reader.GetString("Nimi");
                    // ... and so on

                    // Process the retrieved data
                    Console.WriteLine($"FID: {fid}, ID: {id}, Nimi: {nimi}");
                }
            }
        }
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
