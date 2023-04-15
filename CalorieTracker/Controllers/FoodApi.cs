using Newtonsoft.Json;
using CalorieTracker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace CalorieTracker.Controllers;

public class FoodInputApi : Controller
{
    [HttpPost("/create/foodapi"), Authorize]
    public async Task<ActionResult<FoodInput>?> PostFoodApi(string food)
    {
        try
        {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query={food}&sort=calories&sortDirection=asc&minCarbs=10&maxCarbs=100&minProtein=10&maxProtein=100&minCalories=50&maxCalories=800&minFat=10&maxFat=100"),
            Headers = {
		{ "X-RapidAPI-Key", "ce488d6175mshd2b44358611a4acp18b00ejsne323d1f14bf7" },
		{ "X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com" },
	},
        };

            using (var response = await client.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            return CreatedAtAction(nameof(PostFoodApi), body);
        }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
