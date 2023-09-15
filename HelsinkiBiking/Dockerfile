# Use the official ASP.NET Core runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Copy the certificate
COPY ./aspnetapp.pfx /https/aspnetapp.pfx

# Set environment variables for the certificate
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="hello12"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path="/https/aspnetapp.pfx"

# Copy the published app to the container
COPY ./ /app/

# Set the entry point of the application
ENTRYPOINT ["dotnet", "HelsinkiBiking.dll"]