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
            Email = user.Email,
            Password =user.Password
        };

    [HttpPost("/users/create")]
    public IActionResult CreateUser(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
        return RedirectToAction("Dashboard");
    }


    [HttpPost("/register")]
    public IActionResult Register(User newUser)
    {
        if (ModelState.IsValid)
        {
            if (_context.Users.Any(user => user.Email == newUser.Email))
            {
                ModelState.AddModelError("Email", "is taken");
            }
        }

        // if (ModelState.IsValid == false)
        // {
        //     return Index();
        // }

        // now we hash our passwords
        PasswordHasher<User> hashBrowns = new PasswordHasher<User>();
        newUser.Password = hashBrowns.HashPassword(newUser, newUser.Password);

        _context.Users.Add(newUser);
        _context.SaveChanges();

        // now that we've run SaveChanges() we have access to the UserId from our SQL db
        // HttpContext.Session.SetInt32("UUID", newUser.UserId);
        // HttpContext.Session.SetString("Name", newUser.FullName());
        return RedirectToAction( "Dashboard" );

    }

}
