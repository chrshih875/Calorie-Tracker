#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CalorieTracker.Models;

public class UserDietGoal
{
    [Key]
    public int UserDietGoalId { get; set; }
    public int Calorie { get; set; }
    public int Carb { get; set; }
    public int Fat { get; set; }
    public int Protein { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    public int UserId { get; set; }
}