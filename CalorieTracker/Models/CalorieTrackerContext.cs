#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
using System;
using Microsoft.EntityFrameworkCore;
namespace CalorieTracker.Models;

public class CalorieTrackerContext : DbContext
{

    public CalorieTrackerContext(DbContextOptions<CalorieTrackerContext> options ) : base( options ) {}


    public DbSet<User> Users { get; set; }
    public DbSet<FoodInput> FoodInputs { get; set; }
    public DbSet<UserDietGoal> UserDietGoals { get; set; }


}
