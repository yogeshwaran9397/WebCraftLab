using RealTimeLogistics.Api.Models.Enums;

namespace RealTimeLogistics.Api.Models;

public class Alert
{
    public int Id { get; set; }
    public AlertType Type { get; set; }
    public int OrderId { get; set; }
    public DateTime TriggeredAt { get; set; } = DateTime.UtcNow;
    public bool Resolved { get; set; }
    public string? Message { get; set; }

    // Navigation property
    public Order Order { get; set; } = null!;
}
