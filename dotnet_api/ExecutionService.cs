using dotnet_api;

public interface IExecutionService
{
    Task ExecuteAction(Func<RequestInfoDataRequest, Task> action, RequestInfoDataRequest data);
}

public class ExecutionService : IExecutionService
{
    private readonly ILogger<RequestInfoDataRequest> _logger;

    public ExecutionService(ILogger<RequestInfoDataRequest> logger)
    {
        this._logger = logger;
    }

    public async Task ExecuteAction(Func<RequestInfoDataRequest, Task> action, RequestInfoDataRequest data)
    {
        await action(data);
    }
}