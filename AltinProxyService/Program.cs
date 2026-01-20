using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// 1. Controller'ları (AltinController.cs) sisteme tanıtıyoruz
builder.Services.AddControllers();

// 2. CORS İzni (Senin siten erişebilsin diye)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// 3. CORS'u Aktif Et
app.UseCors("AllowAll");

// 4. KRİTİK NOKTA: Rotayı Haritala (Burası eksikse 404 verir!)
app.MapControllers();

app.Run();