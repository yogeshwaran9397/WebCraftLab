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
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders(
        [FromQuery] string? status = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.Orders
            .Include(o => o.AssignedDriver)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status) && Enum.TryParse<OrderStatus>(status, true, out var parsedStatus))
            query = query.Where(o => o.Status == parsedStatus);

        var totalCount = await query.CountAsync();

        var orders = await query
            .OrderByDescending(o => o.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new OrderDto
            {
                Id = o.Id,
                CustomerId = o.CustomerId,
                Status = o.Status.ToString(),
                AssignedDriverId = o.AssignedDriverId,
                AssignedDriverName = o.AssignedDriver != null ? o.AssignedDriver.Name : null,
                PickupAddress = o.PickupAddress,
                DeliveryAddress = o.DeliveryAddress,
                CreatedAt = o.CreatedAt,
                EstimatedDelivery = o.EstimatedDelivery,
                ActualDelivery = o.ActualDelivery
            })
            .ToListAsync();

        Response.Headers.Append("X-Total-Count", totalCount.ToString());
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.AssignedDriver)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound();

        return Ok(new OrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            Status = order.Status.ToString(),
            AssignedDriverId = order.AssignedDriverId,
            AssignedDriverName = order.AssignedDriver?.Name,
            PickupAddress = order.PickupAddress,
            DeliveryAddress = order.DeliveryAddress,
            CreatedAt = order.CreatedAt,
            EstimatedDelivery = order.EstimatedDelivery,
            ActualDelivery = order.ActualDelivery
        });
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Dispatcher")]
    public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderRequest request)
    {
        var order = new Order
        {
            CustomerId = request.CustomerId,
            PickupAddress = request.PickupAddress,
            DeliveryAddress = request.DeliveryAddress,
            EstimatedDelivery = request.EstimatedDelivery,
            Status = OrderStatus.Created,
            CreatedAt = DateTime.UtcNow
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, new OrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            Status = order.Status.ToString(),
            PickupAddress = order.PickupAddress,
            DeliveryAddress = order.DeliveryAddress,
            CreatedAt = order.CreatedAt,
            EstimatedDelivery = order.EstimatedDelivery
        });
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin,Dispatcher,Driver")]
    public async Task<ActionResult<OrderDto>> UpdateOrderStatus(int id, UpdateOrderStatusRequest request)
    {
        var order = await _context.Orders
            .Include(o => o.AssignedDriver)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound();

        if (!Enum.TryParse<OrderStatus>(request.Status, true, out var newStatus))
            return BadRequest(new { message = $"Invalid status. Valid values: {string.Join(", ", Enum.GetNames<OrderStatus>())}" });

        order.Status = newStatus;

        if (newStatus == OrderStatus.Delivered)
            order.ActualDelivery = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new OrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            Status = order.Status.ToString(),
            AssignedDriverId = order.AssignedDriverId,
            AssignedDriverName = order.AssignedDriver?.Name,
            PickupAddress = order.PickupAddress,
            DeliveryAddress = order.DeliveryAddress,
            CreatedAt = order.CreatedAt,
            EstimatedDelivery = order.EstimatedDelivery,
            ActualDelivery = order.ActualDelivery
        });
    }

    [HttpPut("{id}/assign/{driverId}")]
    [Authorize(Roles = "Admin,Dispatcher")]
    public async Task<ActionResult<OrderDto>> AssignDriver(int id, int driverId)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
            return NotFound(new { message = "Order not found" });

        var driver = await _context.Drivers.FindAsync(driverId);
        if (driver == null)
            return NotFound(new { message = "Driver not found" });

        order.AssignedDriverId = driverId;
        if (order.Status == OrderStatus.Created)
            order.Status = OrderStatus.Assigned;

        await _context.SaveChangesAsync();

        return Ok(new OrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            Status = order.Status.ToString(),
            AssignedDriverId = order.AssignedDriverId,
            AssignedDriverName = driver.Name,
            PickupAddress = order.PickupAddress,
            DeliveryAddress = order.DeliveryAddress,
            CreatedAt = order.CreatedAt,
            EstimatedDelivery = order.EstimatedDelivery,
            ActualDelivery = order.ActualDelivery
        });
    }
}
