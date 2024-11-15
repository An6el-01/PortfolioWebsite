using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Models;

namespace PortfolioAPI.Data
{
    public class PortfolioDbContext : DbContext{
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options) { }

        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TechStack> TechStacks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Project>()
            .HasIndex(p => new { p.Name, p.RepositoryUrl })
            .IsUnique();

            modelBuilder.Entity<Experience>()
            .HasIndex(p => new { p.Name, p.Date })
            .IsUnique();

            modelBuilder.Entity<TechStack>()
            .HasIndex(p => new { p.Name })
            .IsUnique();
        }
    }
}