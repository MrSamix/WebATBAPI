using Core.Interfaces;
using Core.Services;
using Domain;
using Microsoft.EntityFrameworkCore;
using WebApiATB;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Db")));

// ImageService
builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();

// swagger
builder.Services.AddSwaggerGen();

builder.Services.AddCors();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(app => 
app.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

var dirName = "images";

var dir = Path.Combine(Directory.GetCurrentDirectory(), dirName);
Directory.CreateDirectory(dir);

// allow access directory for images
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(dir),
    RequestPath = $"/{dirName}"
});


app.UseAuthorization();

app.MapControllers();

await app.SeedData();

app.Run();
