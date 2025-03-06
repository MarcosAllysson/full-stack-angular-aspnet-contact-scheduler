using backend.Extensions;
using backend.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.ConfigureDatabase(builder.Configuration);

// Identity (Authentication)
builder.Services.AddIdentityConfiguration(builder.Configuration);

// JWT
builder.Services.AddJwtAuthentication(builder.Configuration);

// Dependency Injection: Services
builder.Services.AddScoped<ITokenService, TokenService>();

// Add API versioning
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
});

// Add CORS
builder.Services.ConfigureCors();

// SWAGGER
builder.Services.AddSwaggerConfiguration(builder.Configuration);

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // SWAGGER
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Contact Scheduler v1");
        options.DocumentTitle = "Contact Scheduler API Doc";
    });
}

// app.UseHttpsRedirection();

app.UseCors("AllowAngularDevServer");

// JWT
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// Apply migrations automatically
app.ApplyDatabaseMigrations();

// Seed data
// app.CreateSeedData();

app.Run();
