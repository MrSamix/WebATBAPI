using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace Core.Services;

public class ImageService(IConfiguration configuration) : IImageService // Сервіс роботи із зображеннями; Реалізовує інтерфейс IImageService
{
    public async Task DeleteImageAsync(string name) // Видаляє всі варіанти зображення за ім'ям (для всіх сконфігурованих розмірів)
    {
        var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>(); // Зчитує з конфігурації список цілих розмірів, за якими зберігаються файли
        var dir = Path.Combine(Directory.GetCurrentDirectory(), configuration["ImagesDir"]!); // Формує абсолютний шлях до директорії зображень

        Task[] tasks = sizes // Створює набір задач для паралельного видалення файлів
            .AsParallel() // Дозволяє паралельну обробку колекції розмірів
            .Select(size => // Для кожного розміру створює окрему задачу
            {
                return Task.Run(() => // Виконує операцію видалення у фоновому потоці
                {
                    var path = Path.Combine(dir, $"{size}_{name}"); // Префіксує ім'я файлу розміром і формує повний шлях
                    if (File.Exists(path)) // Перевіряє, чи існує файл
                    {
                        File.Delete(path); // Видаляє файл, якщо він існує
                    }
                });
            })
            .ToArray(); // Перетворює послідовність задач у масив

        await Task.WhenAll(tasks); // Очікує завершення всіх задач видалення
    }

    public async Task<string> SaveImageFromUrlAsync(string imageUrl) // Завантажує зображення за URL та зберігає його у встановлених розмірах; повертає базове ім'я
    {
        using var httpClient = new HttpClient(); // Створює короткоживучий HttpClient для завантаження байтів
        var imageBytes = await httpClient.GetByteArrayAsync(imageUrl); // Завантажує вміст зображення як масив байтів
        return await SaveImageAsync(imageBytes); // Делегує збереження у спільний метод із байтовим вхідним масивом
    }

    public async Task<string> SaveImageAsync(IFormFile file) // Зберігає зображення, надане як IFormFile(з форми); повертає базове ім'я
    {
        using MemoryStream ms = new(); // Створює буфер пам'яті для читання файлу
        await file.CopyToAsync(ms); // Асинхронно копіює вміст завантаженого файлу у буфер
        var bytes = ms.ToArray(); // Отримує масив байтів з буфера пам’яті

        var imageName = await SaveImageAsync(bytes); // Викликає внутрішній метод збереження для створення файлів різних розмірів
        return imageName; // Повертає згенероване базове ім'я зображення
    }

    private async Task<string> SaveImageAsync(byte[] bytes) // Внутрішній метод: приймає байти і створює варіанти зображення у різних розмірах; повертає ім'я
    {
        string imageName = $"{Path.GetRandomFileName()}.webp"; // Генерує випадкове базове ім'я та додає розширення .webp
        var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>(); // Зчитує перелік цільових розмірів з конфігурації

        Task[] tasks = sizes // Готує паралельні операції збереження
            .AsParallel() // Вмикає паралельну обробку для підвищення продуктивності
            .Select(s => SaveImageAsync(bytes, imageName, s)) // Для кожного розміру створює задачу збереження
            .ToArray(); // Збирає задачі у масив

        await Task.WhenAll(tasks); // Очікує завершення всіх задач збереження

        return imageName; // Повертає базове ім'я, спільне для всіх збережених файлів
    }

    public async Task<string> SaveImageFromBase64Async(string input) // Декодує Base64-рядок і зберігає зображення; повертає базове ім'я
    {
        var base64Data = input.Contains(",") // Перевіряє наявність data URI префікса (наприклад, "data:image/png;base64,")
           ? input.Substring(input.IndexOf(",") + 1) // Відкидає префікс, залишаючи лише частину з Base64
           : input; // Якщо префіксу немає — використовує рядок як є

        byte[] imageBytes = Convert.FromBase64String(base64Data); // Перетворює Base64 у масив байтів

        return await SaveImageAsync(imageBytes); // Зберігає зображення та повертає базове ім'я
    }

    private async Task SaveImageAsync(byte[] bytes, string name, int size) // Зберігає окремий варіант зображення з указаним розміром
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), configuration["ImagesDir"]!, // Формує базовий шлях до директорії зображень
            $"{size}_{name}"); // Додає до назви префікс розміру та формує кінцевий шлях
        using var image = Image.Load(bytes); // Завантажує зображення з байтів у об’єкт Image
        image.Mutate(imgConext => // Модифікує зображення (ресайз); Mutate очікує синхронну дію (без async)
        {
            imgConext.Resize(new ResizeOptions // Вказує параметри зміни розміру
            {
                Size = new Size(size, size), // Цільові габарити (максимальна ширина/висота)
                Mode = ResizeMode.Max // Зберігати пропорції, не обрізаючи зображення
            });
        });
        await image.SaveAsync(path, new WebpEncoder()); // Асинхронно зберігає результат у форматі WebP за вказаним шляхом
    }
}