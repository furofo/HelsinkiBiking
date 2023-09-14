using HelsinkiBiking.Database;
using HelsinkiBiking.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class TotalStationsController : ControllerBase
{
    // This could be injected using Dependency Injection
    private readonly DatabaseManager _dbManager;

    public TotalStationsController(DatabaseManager dbManager)
    {
        _dbManager = dbManager;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Journey>> Get()
    {
        return Ok(_dbManager.GetTotalStationsCount());
    }
}
