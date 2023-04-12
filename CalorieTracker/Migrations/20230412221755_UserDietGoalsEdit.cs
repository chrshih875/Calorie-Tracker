using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CalorieTracker.Migrations
{
    public partial class UserDietGoalsEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmPassword",
                table: "UserDietGoals");

            migrationBuilder.RenameColumn(
                name: "Fats",
                table: "UserDietGoals",
                newName: "Fat");

            migrationBuilder.RenameColumn(
                name: "Carbs",
                table: "UserDietGoals",
                newName: "Carb");

            migrationBuilder.RenameColumn(
                name: "Calories",
                table: "UserDietGoals",
                newName: "Calorie");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Fat",
                table: "UserDietGoals",
                newName: "Fats");

            migrationBuilder.RenameColumn(
                name: "Carb",
                table: "UserDietGoals",
                newName: "Carbs");

            migrationBuilder.RenameColumn(
                name: "Calorie",
                table: "UserDietGoals",
                newName: "Calories");

            migrationBuilder.AddColumn<string>(
                name: "ConfirmPassword",
                table: "UserDietGoals",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
