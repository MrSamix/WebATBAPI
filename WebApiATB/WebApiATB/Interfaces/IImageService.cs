namespace WebApiATB.Interfaces;

public interface IImageService
{
    Task<string> SaveImageAsync(string base64);
}
