#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
using System;
using Microsoft.EntityFrameworkCore;
namespace Users.Models;

public class UsersContext : DbContext
{

    public UsersContext(DbContextOptions<UsersContext> options ) : base( options ) {}
  // public virtual DbSet<User> Users { get; set; }
    public DbSet<User> Users { get; set; }


}
