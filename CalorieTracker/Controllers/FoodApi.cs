using System.Net;
using System.Net.Http;
using Newtonsoft.Json;

namespace CalorieTracker.Controllers;

public interface IFoodApi
{
    Task<List<FoodInput>> GetFood(string food);
}
public class FoodInput : IFoodApi
{
    private static readonly HttpClient client;

    static Ho
}
