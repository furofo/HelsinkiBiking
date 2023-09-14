using HelsinkiBiking.Database;
using HelsinkiBiking.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class TotalJourneysController : ControllerBase
{
    // This could be injected using Dependency Injection
    private readonly DatabaseManager _dbManager;

    public TotalJourneysController(DatabaseManager dbManager)
    {
        _dbManager = dbManager;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Journey>> Get()
    {
        return Ok(_dbManager.GetTotalJourneysCount());
    }
}
