using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.Models;
using Microsoft.AspNetCore.Authorization;

namespace CalorieTracker.Controllers;

public class UserDietGoalController : Controller
{
    private CalorieTrackerContext _context;

    public UserDietGoalController(CalorieTrackerContext context)
    {
        _context = context;
    }

    [HttpGet("/getall/userdietgoal"), Authorize]
    public async Task<ActionResult<IEnumerable<UserDietGoal>>> GetUserDietGoals()
    {
        return await _context.UserDietGoals
            .Select(x => AllUserDietGoals(x))
            .ToListAsync();
    }

    private static UserDietGoal AllUserDietGoals(UserDietGoal userdietgoal) =>
        new UserDietGoal
        {
            UserDietGoalId = userdietgoal.UserDietGoalId,
            Calorie = userdietgoal.Calorie,
            Carb = userdietgoal.Carb,
            Fat = userdietgoal.Fat,
            Protein = userdietgoal.Protein,
            UserId = userdietgoal.UserId
        };

    [HttpGet("/getone/userdietgoal")]
    public async Task<ActionResult<UserDietGoal>>GetUserDietGoal(int id)
    {
        var input = await _context.UserDietGoals.FindAsync(id);

        if (input == null)
        {
            return NotFound();
        }
        return input;
    }

    [ HttpPost( "/create/userdietgoal" ) ]
    public async Task<ActionResult<UserDietGoal>>PostUserDietGoal(UserDietGoal newUserDietGoal)
    {
        var newGoal = new UserDietGoal {
            UserDietGoalId = newUserDietGoal.UserId,
            Calorie = newUserDietGoal.Calorie,
            Carb = newUserDietGoal.Carb,
            Fat = newUserDietGoal.Fat,
            Protein = newUserDietGoal.Protein,
            UserId = newUserDietGoal.UserId
        };
        _context.UserDietGoals.Add( newGoal );
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(PostUserDietGoal), newGoal);
    }

    [HttpPut("/edit/userdietgoal/{id}")]
    public async Task<IActionResult> EditUserDietGoal(int id, UserDietGoal goal)
    {
        if (id != goal.UserDietGoalId)
        {
            return BadRequest();
        }

        _context.Entry(goal).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserDietGoalExists(id))
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

    private bool UserDietGoalExists(int id)
    {
        return _context.UserDietGoals.Any(e => e.UserDietGoalId == id);
    }


};