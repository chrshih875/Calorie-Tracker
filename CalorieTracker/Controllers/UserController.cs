using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.Models;

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
        var newuser = new User {
            UserId = user.UserId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Password = user.Password,
            ConfirmPassword = user.ConfirmPassword
        };

        // now we hash our passwords
        PasswordHasher<User> hashBrowns = new PasswordHasher<User>();
        newuser.Password = hashBrowns.HashPassword(newuser, newuser.Password);
        newuser.ConfirmPassword = hashBrowns.HashPassword(newuser, newuser.ConfirmPassword);

        _context.Users.Add(newuser);
        await _context.SaveChangesAsync();

        // now that we've run SaveChanges() we have access to the UserId from our SQL db
        // HttpContext.Session.SetInt32("UUID", newUser.UserId);
        // HttpContext.Session.SetString("Name", newUser.FullName());
        return CreatedAtAction(nameof(GetUserOne), MakeUser(newuser));

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

}
