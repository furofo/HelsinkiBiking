
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

    [HttpGet("{stationName}")]  // This defines a route parameter
    public ActionResult<(int departureCount, int returnCount)> GetDepartureStationTotal(string stationName)
    {
        return Ok(_dbManager.GetStationTotals(stationName));
    }


}
