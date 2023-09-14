
using HelsinkiBiking.Database;
using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class DepartureStationCountController:ControllerBase
    {
        // This could be injected using Dependency Injection
        private readonly DatabaseManager _dbManager;

        public DepartureStationCountController(DatabaseManager dbManager)
        {
            _dbManager = dbManager;
        }

    [HttpGet("{id}")]
    public ActionResult<StationTotals> GetDepartureStationTotal(string id)
    {
        // Convert id and fid to integers
        int parsedId;
        int parsedFid;

        try
        {
            parsedId = int.Parse(id);

        }
        catch (FormatException)
        {
            // Handle the case where parsing fails (e.g., invalid input)
            return BadRequest("Invalid id or fid");
        }

        // Now you can use parsedId and parsedFid inside this method.
        var stationTotals = _dbManager.GetStationTotals(parsedId);
        Console.WriteLine(stationTotals.DepartureCount);
        
        return Ok(stationTotals);
    }



}
