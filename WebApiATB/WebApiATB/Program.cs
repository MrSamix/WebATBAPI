using Core.Interfaces;
using Core.Services;
using Domain;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApiATB;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Db")));

// ImageService
builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Identity
builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

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
