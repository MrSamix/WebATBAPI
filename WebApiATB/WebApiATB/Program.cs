using Domain;
using Microsoft.EntityFrameworkCore;
using WebApiATB;
using WebApiATB.Interfaces;
using WebApiATB.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// ImageService
builder.Services.AddScoped<IImageService, ImageService>();

// swagger
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(opt => 
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Db")));

var app = builder.Build();

// Configure the HTTP request pipeline.

// swagger
app.UseSwagger();
app.UseSwaggerUI();

// Allow Cors
app.UseCors(builder =>
    builder.WithOrigins("http://localhost:5173")
           .AllowAnyHeader()
           .AllowAnyMethod());




var dirName = "images";

var dir = Path.Combine(Directory.GetCurrentDirectory(), dirName);
Directory.CreateDirectory(dir);

// ?????????? ?????? ?? ?????? ? ????? images ?? ????? /images
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(dir),
    RequestPath = $"/{dirName}"
});

app.UseAuthorization();

app.MapControllers();

await app.SeedData();

app.Run();
