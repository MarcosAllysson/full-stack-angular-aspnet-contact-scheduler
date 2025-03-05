using backend.Classes;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ContactSchedulerDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Contact> Contacts => Set<Contact>();

        public ContactSchedulerDbContext(DbContextOptions<ContactSchedulerDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(255);
                entity.Property(e => e.CellPhone).HasMaxLength(11).IsRequired();
                entity.Property(e => e.Phone).HasMaxLength(10);
                entity.HasIndex(e => e.CellPhone).IsUnique();
            });

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    // Id="1",
                    Id=Guid.NewGuid().ToString(),
                    Name = "Admin",
                    NormalizedName="ADMIN"
                },

                new IdentityRole
                {
                    // Id="2",
                    Id=Guid.NewGuid().ToString(),
                    Name="User",
                    NormalizedName="USER"
                }
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
