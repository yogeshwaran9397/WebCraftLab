namespace RealTimeLogistics.Api.DTOs;

public class DriverDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string VehicleType { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public double CurrentLat { get; set; }
    public double CurrentLng { get; set; }
    public DateTime? LastLocationUpdate { get; set; }
    public int ActiveOrderCount { get; set; }
}

public class CreateDriverRequest
{
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string VehicleType { get; set; } = "Van";
}

public class UpdateDriverLocationRequest
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
