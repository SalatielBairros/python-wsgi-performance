
using dotnet_api;

public interface IRepository
{
    Task ExecuteFunction(RequestInfoDataRequest data, List<string> nameList);
}

public class Repository : IRepository
{
    private readonly ILogger<RequestInfoDataRequest> _logger;
    public Repository(ILogger<RequestInfoDataRequest> logger)
    {
        this._logger = logger;
    }

    public async Task ExecuteFunction(RequestInfoDataRequest data, List<string> nameList)
    {
        var joinedName = string.Join(",", nameList);
        this._logger.LogInformation($"Executing {joinedName} with data: {data.Info.Sequence}");
        await Task.Delay(2000);
        this._logger.LogInformation($"Executed {joinedName} with data: {data.Info.Sequence}");
    }
}