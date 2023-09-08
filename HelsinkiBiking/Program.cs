using HelsinkiBiking.Database;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using HelsinkiBiking.Database;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        DotNetEnv.Env.Load();
        string connectionString = System.Environment.GetEnvironmentVariable("ConnectionStrings__HelsinkiDatabase");

        builder.Services.AddSingleton(connectionString);
        builder.Services.AddSingleton<DatabaseManager>();

        // Add services to the container.
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp", builder =>   // Named policy "AllowReactApp"
            {
                builder.WithOrigins(
                    "http://localhost:8080",  // React app on port 8080
            "https://localhost:44446") // React app on port 44446// Replace with your React app's domain/port if different
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        builder.Services.AddControllersWithViews();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        // Use the named CORS policy
        app.UseCors("AllowReactApp");

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers(); // Make sure controllers are mapped
        });

        app.MapFallbackToFile("index.html");

        app.Run();
    }
}
