using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.Models;
using BC = BCrypt.Net.BCrypt;
namespace CalorieTracker.Controllers;

public class UserController : Controller
{
    // db is just a variable name, can be called anything (e.g. DATABASE, db, _db, etc)
    private CalorieTrackerContext _context;

    public UserController(CalorieTrackerContext context)
    {
        _context = context;
    }

    [HttpGet("/getall/users")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users
            .Select(x => AllUsers(x))
            .ToListAsync();
    }

    private static User AllUsers(User user) =>
        new User
        {
            UserId = user.UserId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Password =user.Password,
            ConfirmPassword = user.ConfirmPassword
        };

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserOne(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }
        return user;
    }

    [HttpPost("/register")]
    public async Task<ActionResult<User>> PostUser(User user)
    {
        var dbUser = _context.Users.Where( u => u.Email == user.Email).FirstOrDefault();
        if (dbUser != null)
        {
            return BadRequest("Account already exists");
        }

        // PasswordHasher<User> hashBrowns = new PasswordHasher<User>();
        // user.Password = hashBrowns.HashPassword(user, user.Password);
        // user.ConfirmPassword = hashBrowns.HashPassword(user, user.ConfirmPassword);
        user.Password  = BC.HashPassword(user.Password);
        user.ConfirmPassword  = BC.HashPassword(user.ConfirmPassword);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserOne), MakeUser(user));

    }
    private static User MakeUser(User users) =>
    new User
    {
        UserId = users.UserId,
        FirstName = users.FirstName,
        LastName = users.LastName,
        Email = users.Email,
        Password = users.Password,
        ConfirmPassword = users.ConfirmPassword
    };

    [HttpPost("/login")]
    public async Task<IActionResult> userLogin([FromBody] User user)
    {
        var findUser = _context.Users.Where(u => u.Email == user.Email).FirstOrDefault();
        if (findUser == null || !BC.Verify(user.Password, findUser.Password))
        {
            return BadRequest("Email or password is incorrect");
        }
        return Ok(findUser);
    }
}
