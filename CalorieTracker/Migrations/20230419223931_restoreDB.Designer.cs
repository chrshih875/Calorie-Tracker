﻿// <auto-generated />
using System;
using CalorieTracker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CalorieTracker.Migrations
{
    [DbContext(typeof(CalorieTrackerContext))]
    [Migration("20230419223931_restoreDB")]
    partial class restoreDB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CalorieTracker.Models.FoodInput", b =>
                {
                    b.Property<int>("FoodInputId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Calorie")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Carb")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateInput")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Fat")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FoodName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MealTime")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Protein")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Servings")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("FoodInputId");

                    b.ToTable("FoodInputs");
                });

            modelBuilder.Entity("CalorieTracker.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ConfirmPassword")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CalorieTracker.Models.UserDietGoal", b =>
                {
                    b.Property<int>("UserDietGoalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Calorie")
                        .HasColumnType("int");

                    b.Property<int>("Carb")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Fat")
                        .HasColumnType("int");

                    b.Property<int>("Protein")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("UserDietGoalId");

                    b.ToTable("UserDietGoals");
                });
#pragma warning restore 612, 618
        }
    }
}
