using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RealTimeLogistics.Api.DTOs.Auth;
using RealTimeLogistics.Api.Services;

namespace RealTimeLogistics.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly TokenService _tokenService;

    public AuthController(UserManager<IdentityUser> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            return Unauthorized(new { message = "Invalid email or password" });

        var token = await _tokenService.GenerateTokenAsync(user);
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new AuthResponse
        {
            Token = token,
            Email = user.Email!,
            Roles = roles,
            Expiration = DateTime.UtcNow.AddHours(8)
        });
    }

    [HttpPost("register")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        string[] validRoles = ["Admin", "Dispatcher", "Driver"];
        if (!validRoles.Contains(request.Role))
            return BadRequest(new { message = $"Invalid role. Must be one of: {string.Join(", ", validRoles)}" });

        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
            return Conflict(new { message = "User with this email already exists" });

        var user = new IdentityUser
        {
            UserName = request.Email,
            Email = request.Email,
            EmailConfirmed = true
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            return BadRequest(new { message = "Registration failed", errors = result.Errors.Select(e => e.Description) });

        await _userManager.AddToRoleAsync(user, request.Role);

        var token = await _tokenService.GenerateTokenAsync(user);
        var roles = await _userManager.GetRolesAsync(user);

        return CreatedAtAction(nameof(Login), new AuthResponse
        {
            Token = token,
            Email = user.Email,
            Roles = roles,
            Expiration = DateTime.UtcNow.AddHours(8)
        });
    }
}
