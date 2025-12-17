using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System;

namespace AltinProxyService.Controllers // Namespace önemli
{
    [Route("api/[controller]")] 
    [ApiController]
    public class AltinController : ControllerBase
    {

        private static readonly CookieContainer _cookieContainer = new CookieContainer();

        [HttpGet] 
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

                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
                client.DefaultRequestHeaders.Add("Referer", "https://canlipiyasalar.haremaltin.com/");
                client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");

                try
                {
                    
                    if (_cookieContainer.Count == 0)
                    {
                        await client.GetAsync("https://canlipiyasalar.haremaltin.com/");
                    }

       
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
