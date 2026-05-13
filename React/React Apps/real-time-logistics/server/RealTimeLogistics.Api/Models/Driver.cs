using RealTimeLogistics.Api.Models.Enums;

namespace RealTimeLogistics.Api.Models;

public class Driver
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public VehicleType VehicleType { get; set; }
    public bool IsActive { get; set; } = true;
    public double CurrentLat { get; set; }
    public double CurrentLng { get; set; }
    public DateTime? LastLocationUpdate { get; set; }

    // Navigation properties
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<LocationHistory> LocationHistories { get; set; } = new List<LocationHistory>();
}
