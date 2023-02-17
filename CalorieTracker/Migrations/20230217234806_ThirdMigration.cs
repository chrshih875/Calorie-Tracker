using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CalorieTracker.Migrations
{
    public partial class ThirdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodInputs_Users_UserId",
                table: "FoodInputs");

            migrationBuilder.DropIndex(
                name: "IX_FoodInputs_UserId",
                table: "FoodInputs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_FoodInputs_UserId",
                table: "FoodInputs",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodInputs_Users_UserId",
                table: "FoodInputs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
