using HelsinkiBiking.Database;
using HelsinkiBiking.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class JourneysController : ControllerBase
{
    // This could be injected using Dependency Injection
    private readonly DatabaseManager _dbManager;

    public JourneysController(DatabaseManager dbManager)
    {
        _dbManager = dbManager;
    }

    [HttpGet("{pageNumber}")]
    public ActionResult<IEnumerable<Journey>> Get(string pageNumber)
    {
        int pageNumberToInt = int.Parse(pageNumber);
        return Ok(_dbManager.GetJourneysByPage(pageNumberToInt));
    }
}
