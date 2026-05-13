using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealTimeLogistics.Api.Data;
using RealTimeLogistics.Api.DTOs;
using RealTimeLogistics.Api.Models;
using RealTimeLogistics.Api.Models.Enums;

namespace RealTimeLogistics.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DriversController : ControllerBase
{
    private readonly AppDbContext _context;

    public DriversController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DriverDto>>> GetDrivers([FromQuery] bool? active = null)
    {
        var query = _context.Drivers.AsQueryable();

        if (active.HasValue)
            query = query.Where(d => d.IsActive == active.Value);

        var drivers = await query
            .Select(d => new DriverDto
            {
                Id = d.Id,
                Name = d.Name,
                Phone = d.Phone,
                VehicleType = d.VehicleType.ToString(),
                IsActive = d.IsActive,
                CurrentLat = d.CurrentLat,
                CurrentLng = d.CurrentLng,
                LastLocationUpdate = d.LastLocationUpdate,
                ActiveOrderCount = d.Orders.Count(o => o.Status != OrderStatus.Delivered)
            })
            .ToListAsync();

        return Ok(drivers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DriverDto>> GetDriver(int id)
    {
        var driver = await _context.Drivers
            .Where(d => d.Id == id)
            .Select(d => new DriverDto
            {
                Id = d.Id,
                Name = d.Name,
                Phone = d.Phone,
                VehicleType = d.VehicleType.ToString(),
                IsActive = d.IsActive,
                CurrentLat = d.CurrentLat,
                CurrentLng = d.CurrentLng,
                LastLocationUpdate = d.LastLocationUpdate,
                ActiveOrderCount = d.Orders.Count(o => o.Status != OrderStatus.Delivered)
            })
            .FirstOrDefaultAsync();

        if (driver == null)
            return NotFound();

        return Ok(driver);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<DriverDto>> CreateDriver(CreateDriverRequest request)
    {
        if (!Enum.TryParse<VehicleType>(request.VehicleType, true, out var vehicleType))
            return BadRequest(new { message = $"Invalid vehicle type. Valid values: {string.Join(", ", Enum.GetNames<VehicleType>())}" });

        var driver = new Driver
        {
            Name = request.Name,
            Phone = request.Phone,
            VehicleType = vehicleType,
            IsActive = true
        };

        _context.Drivers.Add(driver);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDriver), new { id = driver.Id }, new DriverDto
        {
            Id = driver.Id,
            Name = driver.Name,
            Phone = driver.Phone,
            VehicleType = driver.VehicleType.ToString(),
            IsActive = driver.IsActive
        });
    }

    [HttpPut("{id}/location")]
    [Authorize(Roles = "Admin,Dispatcher,Driver")]
    public async Task<ActionResult<DriverDto>> UpdateLocation(int id, UpdateDriverLocationRequest request)
    {
        var driver = await _context.Drivers.FindAsync(id);
        if (driver == null)
            return NotFound();

        driver.CurrentLat = request.Latitude;
        driver.CurrentLng = request.Longitude;
        driver.LastLocationUpdate = DateTime.UtcNow;

        // Add to location history
        _context.LocationHistories.Add(new LocationHistory
        {
            DriverId = id,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            Timestamp = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        return Ok(new DriverDto
        {
            Id = driver.Id,
            Name = driver.Name,
            Phone = driver.Phone,
            VehicleType = driver.VehicleType.ToString(),
            IsActive = driver.IsActive,
            CurrentLat = driver.CurrentLat,
            CurrentLng = driver.CurrentLng,
            LastLocationUpdate = driver.LastLocationUpdate
        });
    }

    [HttpGet("{id}/location-history")]
    public async Task<ActionResult> GetLocationHistory(int id, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
    {
        var query = _context.LocationHistories
            .Where(l => l.DriverId == id);

        if (from.HasValue)
            query = query.Where(l => l.Timestamp >= from.Value);
        if (to.HasValue)
            query = query.Where(l => l.Timestamp <= to.Value);

        var history = await query
            .OrderBy(l => l.Timestamp)
            .Select(l => new
            {
                l.Latitude,
                l.Longitude,
                l.Timestamp
            })
            .ToListAsync();

        return Ok(history);
    }
}
