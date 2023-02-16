#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CalorieTracker.Models;

public class FoodInput
{
    [ Key ]
    public int FoodInputId { get; set; }
    public string FoodName { get; set; }
    public string Calorie { get; set; }
    public string Protein { get; set; }
    public string Carb { get; set; }
    public string Fat { get; set; }
    public string Servings { get; set; }
    public string MealTime { get; set; }    // choices : (Breakfast, Lunch, Dinner, Snacks)
    public DateTime DateInput { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public int UserId { get; set; }
    public User? FoodInputCreator { get; set; }
}