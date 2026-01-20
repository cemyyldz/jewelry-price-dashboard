using Microsoft.AspNetCore.Mvc;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Threading;

namespace AltinProxyService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AltinController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var options = new ChromeOptions();
            options.AddArgument("--headless"); // Tarayıcıyı gizle
            options.AddArgument("--disable-gpu");
            options.AddArgument("--no-sandbox");
            options.AddArgument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
            
            // Logları kapat
            options.AddArgument("--log-level=3"); 

            using (var driver = new ChromeDriver(options))
            {
                try
                {
                    // 1. DİREKT ANA SAYFAYA GİDİYORUZ (JSON LİNKİNE DEĞİL)
                    driver.Navigate().GoToUrl("https://canlipiyasalar.haremaltin.com/");
                    
                    // 2. Sayfanın ve tablonun yüklenmesi için biraz bekle (Önemli!)
                    Thread.Sleep(3000); 

                    // 3. Tablo satırlarını bul (Genelde 'tr' etiketi olur)
                    // Harem'in yapısında satırlar genelde tablo içindedir.
                    var satirlar = driver.FindElements(By.CssSelector("table tbody tr"));

                    // Kendi JSON yapımızı kuralım
                    var veriListesi = new Dictionary<string, object>();
                    
                    foreach (var satir in satirlar)
                    {
                        try 
                        {
                            // Satırın içindeki hücreleri (td) al
                            var hucreler = satir.FindElements(By.TagName("td"));
                            
                            // Eğer yeterli veri varsa (İsim, Alış, Satış vb.)
                            if (hucreler.Count >= 3)
                            {
                                // Örnek: 1. hücre İsim, 2. hücre Alış, 3. hücre Satış
                                string isim = hucreler[0].Text.Trim(); 
                                string alis = hucreler[1].Text.Trim();
                                string satis = hucreler[2].Text.Trim();

                                // Türkçe karakterleri ve boşlukları temizleyip KOD yapalım (Örn: Çeyrek Altın -> CEYREK_ALTIN)
                                string kod = Temizle(isim);

                                if (!string.IsNullOrEmpty(kod))
                                {
                                    veriListesi[kod] = new 
                                    {
                                        code = kod,
                                        alis = alis,
                                        satis = satis,
                                        isim = isim
                                    };
                                }
                            }
                        }
                        catch { /* Boş satır varsa atla */ }
                    }

                    // 4. Sonucu senin formatında paketle
                    var sonuc = new 
                    {
                        meta = new { time = DateTimeOffset.Now.ToUnixTimeSeconds() },
                        data = veriListesi
                    };

                    // JSON'a çevirip gönder (Newtonsoft.Json veya System.Text.Json kullanabilirsin, burada manuel döneceğiz)
                    return Ok(sonuc);
                }
                catch (Exception ex)
                {
                    return BadRequest("Hata: " + ex.Message);
                }
                finally
                {
                    driver.Quit();
                }
            }
        }

        // İsimleri temizleyip KOD haline getiren yardımcı fonksiyon
        private string Temizle(string text)
        {
            if (string.IsNullOrEmpty(text)) return "";
            return text.ToUpper()
                       .Replace(" ", "_")
                       .Replace("İ", "I")
                       .Replace("Ğ", "G")
                       .Replace("Ü", "U")
                       .Replace("Ş", "S")
                       .Replace("Ö", "O")
                       .Replace("Ç", "C");
        }
    }
}