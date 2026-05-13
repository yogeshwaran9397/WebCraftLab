using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RealTimeLogistics.Api.Models;

namespace RealTimeLogistics.Api.Data;

public class AppDbContext : IdentityDbContext<IdentityUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Order> Orders => Set<Order>();
    public DbSet<Driver> Drivers => Set<Driver>();
    public DbSet<Models.Route> Routes => Set<Models.Route>();
    public DbSet<LocationHistory> LocationHistories => Set<LocationHistory>();
    public DbSet<Alert> Alerts => Set<Alert>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Order>(e =>
        {
            e.HasIndex(o => o.Status);
            e.HasIndex(o => o.CustomerId);
            e.HasOne(o => o.AssignedDriver)
                .WithMany(d => d.Orders)
                .HasForeignKey(o => o.AssignedDriverId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        builder.Entity<Models.Route>(e =>
        {
            e.HasOne(r => r.Order)
                .WithOne(o => o.Route)
                .HasForeignKey<Models.Route>(r => r.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<LocationHistory>(e =>
        {
            e.HasIndex(l => new { l.DriverId, l.Timestamp });
            e.HasOne(l => l.Driver)
                .WithMany(d => d.LocationHistories)
                .HasForeignKey(l => l.DriverId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Alert>(e =>
        {
            e.HasIndex(a => a.OrderId);
            e.HasOne(a => a.Order)
                .WithMany(o => o.Alerts)
                .HasForeignKey(a => a.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Order>().Property(o => o.Status)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Entity<Alert>().Property(a => a.Type)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Entity<Driver>().Property(d => d.VehicleType)
            .HasConversion<string>()
            .HasMaxLength(20);
    }
}
