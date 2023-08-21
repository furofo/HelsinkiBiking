using HelsinkiBiking.Database;
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

    [HttpGet]
    public ActionResult<IEnumerable<Journey>> Get()
    {
        return Ok(_dbManager.GetStations());
    }
}
