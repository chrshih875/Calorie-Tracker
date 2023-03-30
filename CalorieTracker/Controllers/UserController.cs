using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.Models;
using BC = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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

    [HttpGet("/getall/users")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users
            .Select(x => MakeUser(x))
            .ToListAsync();
    }

    [HttpGet("{id}"), Authorize]
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
    public async Task<ActionResult<User>> PostUser([FromBody] User user)
    {
        try {
        var dbUser = _context.Users.Where( u => u.Email == user.Email).FirstOrDefault();
        if (dbUser != null)
        {
            return BadRequest("Account already exists");
        }
        user.Password  = BC.HashPassword(user.Password);
        user.ConfirmPassword  = BC.HashPassword(user.ConfirmPassword);
        var newUser = MakeUser(user);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(JWTgenerator(newUser));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
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
        return Ok(JWTgenerator(findUser));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    public dynamic JWTgenerator(User user)
    {
        List<Claim> authClaims = new List<Claim>
        {
            // new Claim(ClaimTypes.Email, findUser.Email),
            new Claim("Email", user.Email.ToString()),
            new Claim("UserId", user.UserId.ToString()),
            new Claim("FirstName", user.FirstName.ToString()),
            new Claim("LastName", user.LastName.ToString()),

        };
        var token = this.getToken(authClaims);
        var EncryptedToken = new JwtSecurityTokenHandler().WriteToken(token);
        HttpContext.Response.Cookies.Append("token", EncryptedToken,
            new CookieOptions
            {
                Expires = DateTime.Now.AddDays(7),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None
            });
        return new {
            token = EncryptedToken,
            expiration = token.ValidTo,
            userDetail = user
        };
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
