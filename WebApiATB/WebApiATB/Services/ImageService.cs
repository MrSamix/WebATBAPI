using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using WebApiATB.Interfaces;

namespace WebApiATB.Services
{
    public class ImageService : IImageService
    {
        public async Task<string> SaveImageAsync(IFormFile file)
        {
            using MemoryStream ms = new();
            await file.CopyToAsync(ms);
            var bytes = ms.ToArray();

            var imageName = await SaveImageAsync(bytes);
            return imageName;
        }

        private async Task<string> SaveImageAsync(byte[] bytes)
        {
            string imageName = Guid.NewGuid().ToString() + ".webp";
            List<int> sizes = null!; // тимчасово
            if (sizes == null || sizes.Count == 0)
            {
                sizes = new List<int> { 256, 512, 1024 };
            }
            Task[] tasks = sizes
                .AsParallel()
                .Select(s => SaveImageAsync(bytes, imageName, s))
                .ToArray();
            await Task.WhenAll(tasks);
            return imageName;

        }

        private async Task SaveImageAsync(Byte[] bytes, string name, int size)
        {
            var dirName = "images";
            var baseDir = Path.Combine(Directory.GetCurrentDirectory(), dirName);
            Directory.CreateDirectory(baseDir);
            var path = Path.Combine(baseDir, $"{size}_{name}");
            using var image = Image.Load(bytes);
            image.Mutate(imgContext => {
                imgContext.Resize(new ResizeOptions
                {
                    Size = new Size(size, size),
                    Mode = ResizeMode.Max
                });
            });
            await image.SaveAsWebpAsync(path);
        }

        public async Task DeleteImageAsync(string name)
        {
            var dirName = "images";
            List<int> sizes = null!;
            var dir = Path.Combine(Directory.GetCurrentDirectory(), dirName);
            //var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>();
            //var dir = Path.Combine(Directory.GetCurrentDirectory(), configuration["ImagesDir"]!);

            if (sizes == null || sizes.Count == 0)
            {
                sizes = new List<int> { 256, 512, 1024 };
            }

            Task[] tasks = sizes
                .AsParallel()
                .Select(size =>
                {
                    return Task.Run(() =>
                    {
                        var path = Path.Combine(dir, $"{size}_{name}");
                        if (File.Exists(path))
                        {
                            File.Delete(path);
                        }
                    });
                })
                .ToArray();

            await Task.WhenAll(tasks);
        }
    }
}
