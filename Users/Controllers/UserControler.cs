using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Models;

namespace Users.Controllers;

public class UserController : Controller
{
    // db is just a variable name, can be called anything (e.g. DATABASE, db, _db, etc)
    private UsersContext _context;

    public UserController(UsersContext context)
    {
        _context = context;
    }

    [HttpGet("/users")]
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
            Email = user.Email
        };

    [HttpPost("/users/create")]
    public IActionResult CreateUser(User user)
    {

        _context.Users.Add(user);
        _context.SaveChanges();

        return RedirectToAction("Dashboard");
    }
}
