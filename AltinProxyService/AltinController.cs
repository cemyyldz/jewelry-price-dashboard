using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System;

namespace AltinProxyService.Controllers // Namespace önemli
{
    [Route("api/[controller]")] // Bu satır adresi "/api/altin" yapar
    [ApiController]
    public class AltinController : ControllerBase
    {
        // ... (Kodun geri kalanı aynı)
        private static readonly CookieContainer _cookieContainer = new CookieContainer();

        [HttpGet] // Bu "GET" isteklerini karşılar
        public async Task<IActionResult> Get()
        {
            var handler = new HttpClientHandler
            {
                CookieContainer = _cookieContainer,
                UseCookies = true,
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };

            using (var client = new HttpClient(handler))
            {
                // Tarayıcı taklidi yapan başlıklar
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
                client.DefaultRequestHeaders.Add("Referer", "https://canlipiyasalar.haremaltin.com/");
                client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");

                try
                {
                    // Önce ana sayfaya git (Cookie için)
                    if (_cookieContainer.Count == 0)
                    {
                        await client.GetAsync("https://canlipiyasalar.haremaltin.com/");
                    }

                    // Veriyi çek
                    var response = await client.GetAsync("https://canlipiyasalar.haremaltin.com/tmp/altin.json?dil_kodu=tr");

                    if (response.IsSuccessStatusCode)
                    {
                        var json = await response.Content.ReadAsStringAsync();
                        return Content(json, "application/json");
                    }
                    else
                    {
                        return StatusCode((int)response.StatusCode, "Harem engelledi.");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest("Hata: " + ex.Message);
                }
            }
        }
    }
}