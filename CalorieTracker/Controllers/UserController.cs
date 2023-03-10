using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.Models;
using BC = BCrypt.Net.BCrypt;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace CalorieTracker.Controllers;

public class UserController : Controller
{
    // db is just a variable name, can be called anything (e.g. DATABASE, db, _db, etc)
    private CalorieTrackerContext _context;
    private readonly IConfiguration _configuration;
    public UserController(CalorieTrackerContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [Authorize]
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

    [Authorize]
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
        try
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
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

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
    public async Task<IActionResult> userLogin([FromBody] LoginUsers user)
    {
        try
        {
        var findUser = _context.Users.Where(u => u.Email == user.Email).FirstOrDefault();
        if (findUser == null || !BC.Verify(user.Password, findUser.Password))
        {
            return BadRequest("Email or password is incorrect");
        }
        List<Claim> authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, findUser.Email),
            new Claim("UserId", findUser.UserId.ToString()),
            new Claim("FirstName", findUser.FirstName.ToString()),
            new Claim("LastName", findUser.LastName.ToString()),

        };

        var token = this.getToken(authClaims);

        return Ok(new{
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = token.ValidTo
        });
        // return Ok(findUser);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private JwtSecurityToken getToken(List<Claim> authClaim)
    {
        var authSignInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(24),
            claims: authClaim,
            signingCredentials: new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256)
            );
        return token;
    }
}
