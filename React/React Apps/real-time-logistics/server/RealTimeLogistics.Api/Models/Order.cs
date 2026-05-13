using RealTimeLogistics.Api.Models.Enums;

namespace RealTimeLogistics.Api.Models;

public class Order
{
    public int Id { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public OrderStatus Status { get; set; } = OrderStatus.Created;
    public int? AssignedDriverId { get; set; }
    public string PickupAddress { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? EstimatedDelivery { get; set; }
    public DateTime? ActualDelivery { get; set; }

    // Navigation properties
    public Driver? AssignedDriver { get; set; }
    public Route? Route { get; set; }
    public ICollection<Alert> Alerts { get; set; } = new List<Alert>();
}
