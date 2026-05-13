namespace RealTimeLogistics.Api.Models;

public class Route
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string StartAddress { get; set; } = string.Empty;
    public string EndAddress { get; set; } = string.Empty;
    public double DistanceKm { get; set; }
    public int EstimatedMinutes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public Order Order { get; set; } = null!;
}
