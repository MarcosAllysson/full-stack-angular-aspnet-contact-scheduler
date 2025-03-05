using backend.Data;
using backend.Seeds;

namespace backend.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static void CreateSeedData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var context = services.GetRequiredService<ContactSchedulerDbContext>();
                    DbInitializer.Initialize(context);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<IApplicationBuilder>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }
        }
    }
}
