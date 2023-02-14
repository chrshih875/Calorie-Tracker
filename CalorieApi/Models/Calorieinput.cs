using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CalorieApi.Models;

public class CalorieInput
{
    [Key]
    public int id { get; set; }
    public string Food_Name { get; set; }
    public int Quantity { get; set; }
    public int Fat_input { get; set; }
    public int carb_input { get; set; }
    public int protein_input { get; set; }
    public int calorie_input { get; set; }
}
