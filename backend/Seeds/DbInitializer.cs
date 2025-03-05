using backend.Classes;
using backend.Data;

namespace backend.Seeds
{
    public static class DbInitializer
    {
        public static void Initialize(ContactSchedulerDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Contacts.Any())
                return; // DB already seeded

            var contacts = new Contact[]
            {
                new Contact
                {
                    Name = "John Doe",
                    Email = "john@example.com",
                    CellPhone = "11999998888",
                    Phone = "1133334444",
                    IsFavorite = true,
                    //IsActive = true,
                },
                new Contact
                {
                    Name = "Jane Smith",
                    Email = "jane@example.com",
                    CellPhone = "11999997777",
                    Phone = "1133335555",
                    IsFavorite = false,
                    //IsActive = true,
                }
            };

            context.Contacts.AddRange(contacts);
            context.SaveChanges();
        }
    }
}