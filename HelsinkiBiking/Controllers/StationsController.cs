using HelsinkiBiking.Database;
using HelsinkiBiking.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class StationsController : ControllerBase
{
    // This could be injected using Dependency Injection
    private readonly DatabaseManager _dbManager;

    public StationsController(DatabaseManager dbManager)
    {
        _dbManager = dbManager;
    }

    [HttpGet("{pageNumber}")]
    public ActionResult<IEnumerable<Journey>> Get(string pageNumber)
    {

        int pageNumberToInt = int.Parse(pageNumber);
        return Ok(_dbManager.GetStationsByPage(pageNumberToInt));
    }
}
