using Microsoft.AspNetCore.Identity;
using RealTimeLogistics.Api.Models;
using RealTimeLogistics.Api.Models.Enums;

namespace RealTimeLogistics.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<AppDbContext>();
        var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        await context.Database.EnsureCreatedAsync();

        // Seed roles
        string[] roles = ["Admin", "Dispatcher", "Driver"];
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        // Seed admin user
        if (await userManager.FindByEmailAsync("admin@logistics.com") == null)
        {
            var admin = new IdentityUser
            {
                UserName = "admin@logistics.com",
                Email = "admin@logistics.com",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(admin, "Admin@123");
            await userManager.AddToRoleAsync(admin, "Admin");
        }

        // Seed dispatcher user
        if (await userManager.FindByEmailAsync("dispatcher@logistics.com") == null)
        {
            var dispatcher = new IdentityUser
            {
                UserName = "dispatcher@logistics.com",
                Email = "dispatcher@logistics.com",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(dispatcher, "Dispatch@123");
            await userManager.AddToRoleAsync(dispatcher, "Dispatcher");
        }

        // Seed driver user
        if (await userManager.FindByEmailAsync("driver@logistics.com") == null)
        {
            var driverUser = new IdentityUser
            {
                UserName = "driver@logistics.com",
                Email = "driver@logistics.com",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(driverUser, "Driver@123");
            await userManager.AddToRoleAsync(driverUser, "Driver");
        }

        // Seed drivers
        if (!context.Drivers.Any())
        {
            var drivers = new List<Driver>
            {
                new() { Name = "Ravi Kumar", Phone = "+91-9876543210", VehicleType = VehicleType.Van, IsActive = true, CurrentLat = 12.9716, CurrentLng = 77.5946 },
                new() { Name = "Priya Sharma", Phone = "+91-9876543211", VehicleType = VehicleType.Bike, IsActive = true, CurrentLat = 13.0827, CurrentLng = 80.2707 },
                new() { Name = "Amit Patel", Phone = "+91-9876543212", VehicleType = VehicleType.Truck, IsActive = true, CurrentLat = 19.0760, CurrentLng = 72.8777 },
                new() { Name = "Sneha Reddy", Phone = "+91-9876543213", VehicleType = VehicleType.Car, IsActive = false, CurrentLat = 17.3850, CurrentLng = 78.4867 },
            };
            context.Drivers.AddRange(drivers);
            await context.SaveChangesAsync();
        }

        // Seed 10 orders across all statuses
        if (!context.Orders.Any())
        {
            var now = DateTime.UtcNow;
            var orders = new List<Order>
            {
                // 2 Created
                new() { CustomerId = "CUST-001", Status = OrderStatus.Created, PickupAddress = "123 MG Road, Bangalore", DeliveryAddress = "456 Brigade Road, Bangalore", CreatedAt = now.AddHours(-1), EstimatedDelivery = now.AddHours(4) },
                new() { CustomerId = "CUST-002", Status = OrderStatus.Created, PickupAddress = "789 Anna Salai, Chennai", DeliveryAddress = "101 Mount Road, Chennai", CreatedAt = now.AddMinutes(-30), EstimatedDelivery = now.AddHours(5) },

                // 2 Assigned
                new() { CustomerId = "CUST-003", Status = OrderStatus.Assigned, AssignedDriverId = 1, PickupAddress = "22 Park Street, Kolkata", DeliveryAddress = "55 Salt Lake, Kolkata", CreatedAt = now.AddHours(-2), EstimatedDelivery = now.AddHours(3) },
                new() { CustomerId = "CUST-004", Status = OrderStatus.Assigned, AssignedDriverId = 2, PickupAddress = "10 Connaught Place, Delhi", DeliveryAddress = "20 Karol Bagh, Delhi", CreatedAt = now.AddHours(-2), EstimatedDelivery = now.AddHours(4) },

                // 2 PickedUp
                new() { CustomerId = "CUST-005", Status = OrderStatus.PickedUp, AssignedDriverId = 1, PickupAddress = "33 Linking Road, Mumbai", DeliveryAddress = "77 Andheri West, Mumbai", CreatedAt = now.AddHours(-3), EstimatedDelivery = now.AddHours(2) },
                new() { CustomerId = "CUST-006", Status = OrderStatus.PickedUp, AssignedDriverId = 3, PickupAddress = "44 FC Road, Pune", DeliveryAddress = "88 Hinjewadi, Pune", CreatedAt = now.AddHours(-3), EstimatedDelivery = now.AddHours(2) },

                // 2 InTransit
                new() { CustomerId = "CUST-007", Status = OrderStatus.InTransit, AssignedDriverId = 2, PickupAddress = "55 Residency Road, Bangalore", DeliveryAddress = "99 Electronic City, Bangalore", CreatedAt = now.AddHours(-4), EstimatedDelivery = now.AddHours(1) },
                new() { CustomerId = "CUST-008", Status = OrderStatus.InTransit, AssignedDriverId = 3, PickupAddress = "66 Jubilee Hills, Hyderabad", DeliveryAddress = "11 Gachibowli, Hyderabad", CreatedAt = now.AddHours(-4), EstimatedDelivery = now.AddHours(1) },

                // 2 Delivered
                new() { CustomerId = "CUST-009", Status = OrderStatus.Delivered, AssignedDriverId = 1, PickupAddress = "77 Indiranagar, Bangalore", DeliveryAddress = "22 Whitefield, Bangalore", CreatedAt = now.AddHours(-6), EstimatedDelivery = now.AddHours(-1), ActualDelivery = now.AddHours(-1.5) },
                new() { CustomerId = "CUST-010", Status = OrderStatus.Delivered, AssignedDriverId = 4, PickupAddress = "88 Banjara Hills, Hyderabad", DeliveryAddress = "33 Madhapur, Hyderabad", CreatedAt = now.AddHours(-8), EstimatedDelivery = now.AddHours(-3), ActualDelivery = now.AddHours(-2) },
            };
            context.Orders.AddRange(orders);
            await context.SaveChangesAsync();

            // Seed some location history for active drivers
            var locationHistories = new List<LocationHistory>
            {
                new() { DriverId = 1, Latitude = 12.9716, Longitude = 77.5946, Timestamp = now.AddHours(-3) },
                new() { DriverId = 1, Latitude = 12.9750, Longitude = 77.5980, Timestamp = now.AddHours(-2) },
                new() { DriverId = 1, Latitude = 12.9800, Longitude = 77.6020, Timestamp = now.AddHours(-1) },
                new() { DriverId = 2, Latitude = 13.0827, Longitude = 80.2707, Timestamp = now.AddHours(-2) },
                new() { DriverId = 2, Latitude = 13.0850, Longitude = 80.2750, Timestamp = now.AddHours(-1) },
                new() { DriverId = 3, Latitude = 19.0760, Longitude = 72.8777, Timestamp = now.AddHours(-2) },
                new() { DriverId = 3, Latitude = 19.0800, Longitude = 72.8800, Timestamp = now.AddHours(-1) },
            };
            context.LocationHistories.AddRange(locationHistories);

            // Seed alerts
            var alerts = new List<Alert>
            {
                new() { Type = AlertType.Delay, OrderId = 7, TriggeredAt = now.AddMinutes(-30), Resolved = false, Message = "Order running 15 min behind schedule" },
                new() { Type = AlertType.SLABreach, OrderId = 8, TriggeredAt = now.AddMinutes(-15), Resolved = false, Message = "SLA breach: delivery past estimated time" },
                new() { Type = AlertType.Deviation, OrderId = 5, TriggeredAt = now.AddHours(-1), Resolved = true, Message = "Driver deviated from planned route" },
            };
            context.Alerts.AddRange(alerts);
            await context.SaveChangesAsync();
        }
    }
}
