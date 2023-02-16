using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.Models;

namespace CalorieTracker.Controllers;

public class FoodInputController : Controller
{
    // db is just a variable name, can be called anything (e.g. DATABASE, db, _db, etc)
    private CalorieTrackerContext _context;

    public FoodInputController(CalorieTrackerContext context)
    {
        _context = context;
    }

    [ HttpGet( "/getall/foodinput" ) ]
    public IActionResult GetAllFoodInputs()
    {
        List<FoodInput> AllFoodInputs = _context.FoodInputs
        .Include( foodInput => foodInput.FoodInputCreator )
        .ToList();

        return View("Dashboard", AllFoodInputs);
    }

    [HttpGet("/getall/foodinputs")]
    public async Task<ActionResult<IEnumerable<FoodInput>>> GetFoodInputs()
    {
        return await _context.FoodInputs
            .Select(x => AllFoodInputs(x))
            .ToListAsync();
    }

    private static FoodInput AllFoodInputs(FoodInput foodinput) =>
        new FoodInput
        {
            FoodInputId = foodinput.FoodInputId,
            FoodName = foodinput.FoodName,
            Calorie = foodinput.Calorie,
            Protein = foodinput.Protein,
            Carb = foodinput.Carb,
            Fat = foodinput.Fat,
            Servings = foodinput.Servings,
            MealTime = foodinput.MealTime,
            DateInput = foodinput.DateInput,
            UserId = foodinput.UserId,
            FoodInputCreator = foodinput.FoodInputCreator
        };
    
    [ HttpPost( "/create/foodinput" ) ]
    public IActionResult CreateFoodInput( FoodInput newFoodInput )
    {
        _context.FoodInputs.Add( newFoodInput );
        _context.SaveChanges();

        return RedirectToAction("Dashboard");

    }

}