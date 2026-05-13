namespace RealTimeLogistics.Api.DTOs;

public class OrderDto
{
    public int Id { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int? AssignedDriverId { get; set; }
    public string? AssignedDriverName { get; set; }
    public string PickupAddress { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? EstimatedDelivery { get; set; }
    public DateTime? ActualDelivery { get; set; }
}

public class CreateOrderRequest
{
    public string CustomerId { get; set; } = string.Empty;
    public string PickupAddress { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public DateTime? EstimatedDelivery { get; set; }
}

public class UpdateOrderStatusRequest
{
    public string Status { get; set; } = string.Empty;
}
