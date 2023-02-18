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

    [HttpGet("/getall/foodinput/react")]
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
            // FoodInputCreator = GetUserOne(foodinput.UserId)
        };

    [HttpGet("/getone/foodinput")]
    public async Task<ActionResult<FoodInput>>GetFoodInputOne(int id)
    {
        var input = await _context.FoodInputs.FindAsync(id);

        if (input == null)
        {
            return NotFound();
        }
        return input;
    }

    [ HttpPost( "/create/foodinput" ) ]
    public async Task<ActionResult<FoodInput>>PostFoodInput(FoodInput newFoodInput)
    {
        var newFood = new FoodInput {
            FoodInputId = newFoodInput.FoodInputId,
            FoodName = newFoodInput.FoodName,
            Calorie = newFoodInput.Calorie,
            Protein = newFoodInput.Protein,
            Carb = newFoodInput.Carb,
            Fat = newFoodInput.Fat,
            Servings = newFoodInput.Servings,
            MealTime = newFoodInput.MealTime,
            DateInput = newFoodInput.DateInput,
            UserId = newFoodInput.UserId
        };
        _context.FoodInputs.Add( newFood );
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetFoodInputs), MakeFoodInput(newFood));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditFootInput(int id, FoodInput food)
    {
        if (id != food.FoodInputId)
        {
            return BadRequest();
        }

        _context.Entry(food).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FoodInputExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    private bool FoodInputExists(int id)
    {
        return _context.FoodInputs.Any(e => e.FoodInputId == id);
    }

    private static FoodInput MakeFoodInput(FoodInput food) =>
    new FoodInput
    {
            FoodInputId = food.FoodInputId,
            FoodName = food.FoodName,
            Calorie = food.Calorie,
            Protein = food.Protein,
            Carb = food.Carb,
            Fat = food.Fat,
            Servings = food.Servings,
            MealTime = food.MealTime,
            DateInput = food.DateInput,
            UserId = food.UserId,
    };

}