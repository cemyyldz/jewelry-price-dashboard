function ajax_fiyat_oku(url, callback1, callback2) {
    $.ajax({
        "url": url,
        success: function (rec_data) {
            var data = rec_data.data;

            for (var code in data) {

                if (callback1 != undefined) {

                    callback1(data[code]);
                }

            }
            if (callback2 != undefined) {
                callback2(rec_data);
            }
        },
        error: function () {

        }

    });
}

function intToDateString(i, get_saat) {
    let d = new Date(i);
    let g = d.getDate();
    let a = d.getMonth() + 1;
    let saat = d.getHours();
    let dk = d.getMinutes();
    let sn = d.getSeconds();

    if (g < 10) g = '0' + g;
    if (a < 10) a = '0' + a;
    if (saat < 10) saat = '0' + saat;
    if (dk < 10) dk = '0' + dk;
    if (sn < 10) sn = '0' + sn;
    if (get_saat == true) {
        return saat + ':' + dk + ':' + sn;
    }
    else {
        return g + '-' + a + '-' + d.getFullYear() + ' ' + saat + ':' + dk + ':' + sn;
    }

}

$(window).on("resize", function (e) {
    if (!is_mobile && $(window).width() < 900) {
        window.location.href = "?size=500"
    } else if (is_mobile && $(window).width() > 900) {
        window.location.href = "?size=1000"
    }
});
window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-75XW173RRR');
var socket;
var ajax_timer;
var ajax_interval = 1000;

var prices = {};


function fark(satis, kapanis) {


    let tmp = Math.abs(((kapanis - satis) / kapanis) * 100);
    if (tmp === Infinity) {
        return "%0.00";
    } else {
        return "<span class=xyuzde>%</span>" + tmp.toFixed(2);
    }

}
var guncel_fiyat = {
    "data": {}
};
ajax_fiyat_oku('https://canlipiyasalar.haremaltin.com/tmp/altin.json?dil_kodu=tr',
    function (single_data) {
        fiyat_isle(single_data);
    },
    function (data) {
        ajax_interval = data.meta.fiyat_guncelleme;

        let z = intToDateString(data.meta.time, true);
        $('#fiyat_zaman_doviz').html(z);
        $('#fiyat_zaman_altin').html(z);
        guncel_fiyat = data;
    }
);
function updateTime() {
    const now = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const date = now.toLocaleDateString('tr-TR', options);
    const time = now.toLocaleTimeString('tr-TR');
    document.getElementById("lastUpdate").textContent = `${date} | ${time}`;
}


updateTime();


setInterval(updateTime, 1000);


function connect_ajax() {

    clearInterval(ajax_timer);
    if (ajax_interval < 100 || ajax_interval == undefined) {
        ajax_interval = 1000;
    }
    ajax_timer = setInterval(() => {

        ajax_fiyat_oku('http://localhost:5000/api/altin?v=',
            function (single_data) {
                fiyat_isle(single_data);

            },
            function (data) {
                ajax_interval = data.meta.fiyat_guncelleme;
                connect_ajax();

                let z = intToDateString(data.meta.time, true);

                $('.zaman').html(z);
            }
        );
    }, ajax_interval);
}

let store = {}
const urunler = [
    'CEYREK_ESKI',
    'CEYREK_YENI',
    'YARIM_ESKI',
    'YARIM_YENI',
    'TEK_ESKI',
    'TEK_YENI',
    'ATA_ESKI',
    'ATA_YENI',
    'GREMESE_ESKI',
    'GREMESE_YENI',
    'ATA5_ESKI',
    'ATA5_YENI'
];
function hesaplaAjda() {

    let alisGenel = parseFloat($("#alis__genel__ALTIN").text().replace(/\./g, "").replace(",", "."));
    let satisGenel = parseFloat($("#satis__genel__ALTIN").text().replace(/\./g, "").replace(",", "."));


    if (!isNaN(alisGenel) && !isNaN(satisGenel)) {
        let ajdaAlis = alisGenel * 0.910;
        let ajdaSatis = satisGenel * 0.940;

        ajdaAlis = parseFloat(ajdaAlis.toFixed(2));
        ajdaSatis = parseFloat(ajdaSatis.toFixed(2));


        $("#alis__ajda").text(_formatNumber(ajdaAlis));
        $("#satis__ajda").text(_formatNumber(ajdaSatis));
    }
}
function hesaplaAta() {
    let alisGenel = parseFloat($("#alis__genel__ALTIN").text().replace(/\./g, "").replace(",", "."));
    let satisGenel = parseFloat($("#satis__genel__ALTIN").text().replace(/\./g, "").replace(",", "."));

    if (!isNaN(alisGenel) && !isNaN(satisGenel)) {
        let ataAlis = alisGenel * 6.62;
        let ataSatis = satisGenel * 6.71;

        ataAlis = parseFloat(ataAlis.toFixed(2));
        ataSatis = parseFloat(ataSatis.toFixed(2));


        $("#alis__ata").text(_formatNumber(ataAlis));
        $("#satis__ata").text(_formatNumber(ataSatis));
    }
}
function hesaplayyarim() {

    let alisGenel = parseFloat($("#alis__CEYREK_YENI").text().replace(/\./g, "").replace(",", "."));
    let satisGenel = parseFloat($("#satis__CEYREK_YENI").text().replace(/\./g, "").replace(",", "."));

    if (!isNaN(alisGenel) && !isNaN(satisGenel)) {

        let yyarimAlis = alisGenel * 2;

        let yyarimSatis = satisGenel * 2;
        $("#alis__yyarim").text(_formatNumber(yyarimAlis));
        $("#satis__yyarim").text(_formatNumber(yyarimSatis));
    }

}
function hesaplaeyarim() {

    let alisGenel = parseFloat($("#alis__CEYREK_ESKI").text().replace(/\./g, "").replace(",", "."));
    let satisGenel = parseFloat($("#satis__CEYREK_ESKI").text().replace(/\./g, "").replace(",", "."));

    if (!isNaN(alisGenel) && !isNaN(satisGenel)) {

        let eyarimAlis = alisGenel * 2;

        let eyarimSatis = satisGenel * 2;
        $("#alis__eyarim").text(_formatNumber(eyarimAlis));
        $("#satis__eyarim").text(_formatNumber(eyarimSatis));
    }

}
function hesaplaytam() {

    let alisGenel = parseFloat($("#alis__CEYREK_YENI").text().replace(/\./g, "").replace(",", "."));
    let satisGenel = parseFloat($("#satis__CEYREK_YENI").text().replace(/\./g, "").replace(",", "."));

    if (!isNaN(alisGenel) && !isNaN(satisGenel)) {

        let ytamAlis = alisGenel * 4;

        let ytamSatis = satisGenel * 4;
        $("#alis__ytam").text(_formatNumber(ytamAlis));
        $("#satis__ytam").text(_formatNumber(ytamSatis));
    }

}
function hesaplaetam() {

    let alisGenel = parseFloat($("#alis__CEYREK_ESKI").text().replace(/\./g, "").replace(",", "."));
    let satisGenel = parseFloat($("#satis__CEYREK_ESKI").text().replace(/\./g, "").replace(",", "."));

    if (!isNaN(alisGenel) && !isNaN(satisGenel)) {

        let etamAlis = alisGenel * 4;

        let etamSatis = satisGenel * 4;

        $("#alis__etam").text(_formatNumber(etamAlis));
        $("#satis__etam").text(_formatNumber(etamSatis));
    }

}
function hesaplaygremese() {

    let alisGenel = parseFloat($("#alis__CEYREK_YENI").text().replace(/\./g, "").replace(",", "."));
    let satisGenel = parseFloat($("#satis__CEYREK_YENI").text().replace(/\./g, "").replace(",", "."));

    if (!isNaN(alisGenel) && !isNaN(satisGenel)) {

        let ygremeseAlis = alisGenel * 10;

        let ygremeseSatis = satisGenel * 10;
        $("#alis__ygremese").text(_formatNumber(ygremeseAlis));
        $("#satis__ygremese").text(_formatNumber(ygremeseSatis));
    }

}
function hesaplaegremese() {

    let alisGenel = parseFloat($("#alis__CEYREK_ESKI").text().replace(/\./g, "").replace(",", "."));
    let satisGenel = parseFloat($("#satis__CEYREK_ESKI").text().replace(/\./g, "").replace(",", "."));

    if (!isNaN(alisGenel) && !isNaN(satisGenel)) {

        let egremeseAlis = alisGenel * 10;

        let egremeseSatis = satisGenel * 10;

        $("#alis__egremese").text(_formatNumber(egremeseAlis));
        $("#satis__egremese").text(_formatNumber(egremeseSatis));
    }

}


var fiyat_isle = function (data) {

    let code = data["code"];
    if (!code) return;

    let zaman = data['tarih'].split(' ');
    let x = defs_map[data.code];
    let tanim = defs[x];

    let elmX = $('[data-node="' + code + '"]');

    if (elmX.length == 0) {
        elmX = $('[data-node-x="' + code + '"]');
        if (elmX.length == 0) {
            return;
        }
    }

    if (urunler.includes(code)) {
        let stored_alis = parseFloat(localStorage.getItem(`${code}_alis`) || 0);
        let alis_deger = parseFloat(data["alis"]) || 0;

        if (isNaN(stored_alis)) stored_alis = 0;
        if (isNaN(alis_deger)) alis_deger = 0;

        let yeni_alis_fiyat = stored_alis + alis_deger;
        elmX.find('#alis__' + code).html(_formatNumber(yeni_alis_fiyat));

        let stored_satis = parseFloat(localStorage.getItem(`${code}_satis`) || 0);
        let satis_deger = parseFloat(data["satis"]) || 0;
        if (isNaN(stored_satis)) stored_satis = 0;
        if (isNaN(satis_deger)) satis_deger = 0;

        let yeni_satis_fiyat = stored_satis + satis_deger;

        elmX.find('#satis__' + code).html(_formatNumber(yeni_satis_fiyat));
        elmX.find('#fark__' + code).html(fark(yeni_satis_fiyat, data["kapanis"]));
    } else {
        elmX.find('#alis__' + code).html(_formatNumber(data["alis"]));
        elmX.find('#satis__' + code).html(_formatNumber(data["satis"]));
        elmX.find('#fark__' + code).html(fark(data["satis"], data["kapanis"]));
    }

    elmX.find('#alis__genel__' + code).html(_formatNumber(data["alis"]));
    elmX.find('#satis__genel__' + code).html(_formatNumber(data["satis"]));
    elmX.find('#fark__genel__' + code).html(fark(data["satis"], data["kapanis"]));

    elmX.find('#alis__altin__' + code).html(_formatNumber(data["alis"]));
    elmX.find('#satis__altin__' + code).html(_formatNumber(data["satis"]));
    elmX.find('#satis__altin__fark' + code).html(fark(data["satis"], data["kapanis"]));

    if ($('[data-node="' + code + '"][data-tip]').length == 0) {

        if (data.dir.alis_dir == "up") {
            elmX.removeClass("down").addClass("up");
            store[code] = ["up", 3];
            elmX.find(".pricex").removeClass("upx downx");
        } else if (data.dir.alis_dir == "down") {
            elmX.removeClass("up").addClass("down");
            store[code] = ["down", 3];
            elmX.find(".pricex").removeClass("upx downx");
        } else {
            elmX.removeClass("down up");
            if (typeof store[code] != "undefined") {
                if (store[code][0] == "up") {
                    if (store[code][1]-- >= 0 || 1) {
                        elmX.find(".pricex").removeClass("downx").addClass("upx");
                    } else {
                        delete store[code];
                        elmX.find(".pricex").removeClass("upx downx");
                    }
                } else {
                    if (store[code][1]-- >= 0 || 1) {
                        elmX.find(".pricex").removeClass("upx").addClass("downx");
                    } else {
                        delete store[code];
                        elmX.find(".pricex").removeClass("upx downx");
                    }
                }
            }
        }

        let kapanis = parseFloat(data["kapanis"]);
        let alis = parseFloat(data["alis"]);
        let yuzde = 0;
        if (kapanis > 0) {
            yuzde = 100 * (alis - kapanis) / kapanis;
        }

        if (data["satis"] > data["kapanis"]) {
            elmX.find(".fark").addClass("up").removeClass("down");
        } else if (data["satis"] < data["kapanis"]) {
            elmX.find(".fark").addClass("down").removeClass("up");
        } else {
            elmX.find(".fark").removeClass("down up");
        }

    }

    hesaplaAjda();
    hesaplaAta();
    hesaplayyarim();
    hesaplaeyarim();
    hesaplaetam();
    hesaplaytam();
    hesaplaygremese();
    hesaplaegremese();
}
var defs = {};
var defs_map = {};
defs["ALTINTRY"] = { "kod": "ALTIN", "isim": "HAS ALTIN", "isim_en": "ALTIN", "kod1": "ALTIN", "kod2": "TRY" };
defs_map["ALTIN"] = "ALTINTRY"
defs["KULCEALTINTRY"] = { "kod": "KULCEALTIN", "isim": "GRKULCEALTIN", "isim_en": "KULCEALTIN", "kod1": "KULCEALTIN", "kod2": "TRY" };
defs_map["KULCEALTIN"] = "KULCEALTINTRY"
defs["ALTINKGUSD"] = { "kod": "USDKG", "isim": "USD/KG", "isim_en": "USD KG", "kod1": "ALTINKG", "kod2": "USD" };
defs_map["USDKG"] = "ALTINKGUSD"
defs["ALTINKGEUR"] = { "kod": "EURKG", "isim": "EUR/KG", "isim_en": "EUR KG", "kod1": "ALTINKG", "kod2": "EUR" };
defs_map["EURKG"] = "ALTINKGEUR"
defs["GUMUSTRYTRY"] = { "kod": "GUMUSTRY", "isim": "GÜMÜŞ/TL", "isim_en": "SILVER TL", "kod1": "GUMUSTRY", "kod2": "TRY" };
defs_map["GUMUSTRY"] = "GUMUSTRYTRY"
defs["ALTIN14TRY"] = { "kod": "AYAR14", "isim": "14 AYAR", "isim_en": "14 AYAR", "kod1": "ALTIN14", "kod2": "TRY" };
defs_map["AYAR14"] = "ALTIN14TRY"
defs["ALTIN14TRY"] = { "kod": "AYAR22", "isim": "22 AYAR", "isim_en": "22 AYAR", "kod1": "ALTIN14", "kod2": "TRY" };
defs_map["AYAR22"] = "ALTIN14TRY"
defs["CEYREK_YENITRY"] = { "kod": "CEYREK_YENI", "isim": "ÇEYREK ", "isim_en": "", "kod1": "CEYREK_YENI", "kod2": "TRY" };
defs_map["CEYREK_YENI"] = "CEYREK_YENITRY"
defs["CEYREK_ESKITRY"] = { "kod": "CEYREK_ESKI", "isim": "ÇEYREK ESKİ", "isim_en": "ESKİ ÇEYREK", "kod1": "CEYREK_ESKI", "kod2": "TRY" };
defs_map["CEYREK_ESKI"] = "CEYREK_ESKITRY"
defs["YARIM_YENITRY"] = { "kod": "YARIM_YENI", "isim": "YARIM ", "isim_en": "YENİ YARIM", "kod1": "YARIM_YENI", "kod2": "TRY" };
defs_map["YARIM_YENI"] = "YARIM_YENITRY"
defs["YARIM_ESKITRY"] = { "kod": "YARIM_ESKI", "isim": "YARIM ESKİ", "isim_en": "ESKİ YARIM", "kod1": "YARIM_ESKI", "kod2": "TRY" };
defs_map["YARIM_ESKI"] = "YARIM_ESKITRY"
defs["TEK_YENITRY"] = { "kod": "TEK_YENI", "isim": "TAM ", "isim_en": "YENİ TAM", "kod1": "TEK_YENI", "kod2": "TRY" };
defs_map["TEK_YENI"] = "TEK_YENITRY"
defs["TEK_ESKITRY"] = { "kod": "TEK_ESKI", "isim": "TAM ESKİ", "isim_en": "ESKİ TAM", "kod1": "TEK_ESKI", "kod2": "TRY" };
defs_map["TEK_ESKI"] = "TEK_ESKITRY"
defs["ATA_YENITRY"] = { "kod": "ATA_YENI", "isim": "ATA ", "isim_en": "YENİ ATA", "kod1": "ATA_YENI", "kod2": "TRY" };
defs_map["ATA_YENI"] = "ATA_YENITRY"
defs["ATA_ESKITRY"] = { "kod": "ATA_ESKI", "isim": "ATA ESKİ", "isim_en": "ESKİ ATA", "kod1": "ATA_ESKI", "kod2": "TRY" };
defs_map["ATA_ESKI"] = "ATA_ESKITRY"
defs["GREMESE_YENITRY"] = { "kod": "GREMESE_YENI", "isim": "GREMSE", "isim_en": "YENİ GREMESE", "kod1": "GREMESE_YENI", "kod2": "TRY" };
defs_map["GREMESE_YENI"] = "GREMESE_YENITRY"
defs["GREMESE_ESKITRY"] = { "kod": "GREMESE_ESKI", "isim": "ESKİ GREMSE", "isim_en": "ESKİ GREMESE", "kod1": "GREMESE_ESKI", "kod2": "TRY" };
defs_map["GREMESE_ESKI"] = "GREMESE_ESKITRY"
defs["ATA5_YENITRY"] = { "kod": "ATA5_YENI", "isim": "ATA 5'Lİ ", "isim_en": "YENİ ATA5", "kod1": "ATA5_YENI", "kod2": "TRY" };
defs_map["ATA5_YENI"] = "ATA5_YENITRY"
defs["ATA5_ESKITRY"] = { "kod": "ATA5_ESKI", "isim": "ATA 5'Lİ ESKİ", "isim_en": "YENİ ATA5", "kod1": "ATA5_ESKI", "kod2": "TRY" };
defs_map["ATA5_ESKI"] = "ATA5_ESKITRY"

connect_ajax();