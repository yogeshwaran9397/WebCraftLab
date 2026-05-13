namespace RealTimeLogistics.Api.Models;

public class LocationHistory
{
    public int Id { get; set; }
    public int DriverId { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    // Navigation property
    public Driver Driver { get; set; } = null!;
}
