
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
    public ActionResult<int> GetDepartureStationTotal(string stationName)  // Use the name of the parameter here
    {
        return Ok(_dbManager.GetDepartureStationTotal(stationName));
    }

}
