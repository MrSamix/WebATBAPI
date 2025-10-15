using Domain;
using Microsoft.EntityFrameworkCore;
using WebApiATB;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Db")));

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

app.UseAuthorization();

app.MapControllers();

await app.SeedData();

app.Run();
