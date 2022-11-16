using dotnet_api;

public interface IConfigService
{
    Task First(RequestInfoDataRequest data);
    Task Second(RequestInfoDataRequest data);
    Task Third(RequestInfoDataRequest data);
}

public class ConfigService : IConfigService
{
    private readonly IRepository _repository;

    public ConfigService(IRepository repository)
    {
        this._repository = repository;
    }

    public async Task First(RequestInfoDataRequest data)
    {
        var name_list = new List<string> { "first_first", "first_second" };
        await this._repository.ExecuteFunction(data, name_list);
    }

    public async Task Second(RequestInfoDataRequest data)
    {
        var name_list = new List<string> { "second_first", "second_second" };
        await this._repository.ExecuteFunction(data, name_list);
    }

    public async Task Third(RequestInfoDataRequest data)
    {
        var name_list = new List<string> { "third_first", "third_second" };
        await this._repository.ExecuteFunction(data, name_list);
    }
}