using Microsoft.AspNetCore.Mvc;

namespace dotnet_api.Controllers;

[ApiController]
[Route("performance-test")]
public class PerformanceTestController : ControllerBase
{
    
    private readonly IConfigService _configService;
    private readonly IExecutionService _executionService;

    public PerformanceTestController(IExecutionService executionService, IConfigService configService)
    {
        this._executionService = executionService;
        this._configService = configService;
    }

    [HttpPost("first")]
    public async Task<IActionResult> First(RequestInfoDataRequest request)
    {
        await this._executionService.ExecuteAction(this._configService.First, request);
        return Ok();
    }

    [HttpPost("second")]
    public async Task<IActionResult> Second(RequestInfoDataRequest request)
    {
        await this._executionService.ExecuteAction(this._configService.Second, request);
        return Ok();
    }

    [HttpPost("third")]
    public async Task<IActionResult> Third(RequestInfoDataRequest request)
    {
        await this._executionService.ExecuteAction(this._configService.Third, request);
        return Ok();
    }
}
