$('#login_button').on('click touch', function () {
    var form_data = "user=" + $('#login_username').val() + "&passwd=" + $('#login_password').val();
    $.ajax({
        url: "/ajax/login",
        method: "POST",
        data: form_data,
        success: function (data) {
            if (data.login != undefined && data.login == true) {
                location.href = data.redirect;
           
            }
            else {
                window.alert('Kullanıcı Adı Şifrenizi kontrol ediniz');
            }
        },
        error: function (err) {
            window.alert('Hata');
        }
    });
});




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

function intToDateString2(i, get_saat) {
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
        return d.getFullYear() + '-' + a + '-' + g + ' ' + saat + ':' + dk + ':' + sn;
    }

}

function caprazFiyatHesapla(kod1, kod2, fiyatlar) {
    let tmp;
    if (kod1 == kod2) {
        return {
            'alis': 1,
            'satis': 1
        };
    }
    if (fiyatlar[(kod1 + kod2)] != undefined) {

        return {
            'alis': fiyatlar[(kod1 + kod2)]['alis'],
            'satis': fiyatlar[(kod1 + kod2)]['satis']
        };
    }

    if (fiyatlar[kod2 + kod1]) {
  
        return tersIslem(kod2 + kod1, fiyatlar);
    }
    r1 = kodBul(kod1, fiyatlar);

    if (r1[0] == 'yok') {
        return null;
    }
    r2 = kodBul(kod2, fiyatlar);

    if (r2[0] == 'yok') {
        return null;
    }
    result = { 'alis': 0, 'satis': 0 };

    if (r1[0] == 'duz' && r2[0] == 'duz') {
        al1 = fiyatlar[r1[1]]['alis'];
        sat1 = fiyatlar[r1[1]]['satis'];
        al2 = fiyatlar[r2[1]]['alis'];
        sat2 = fiyatlar[r2[1]]['satis'];

        result['alis'] = al1 / sat2;
        result['satis'] = sat1 / al2;
    }
    if (r1[0] == 'duz' && r2[0] == 'ters') {
        al1 = fiyatlar[r1[1]]['alis'];
        sat1 = fiyatlar[r1[1]]['satis'];
        tmp = tersIslem(r2[1], fiyatlar);
        al2 = tmp['alis'];
        sat2 = tmp['satis'];
        result['alis'] = al1 * al2;
        result['satis'] = sat1 * sat2;

    }
    if (r1[0] == 'ters' && r2[0] == 'duz') {

        tmp = tersIslem(r1[1], fiyatlar);
        al1 = $tmp['alis'];
        sat1 = $tmp['satis'];

        al2 = fiyatlar[r2[1]]['alis'];
        sat2 = fiyatlar[r2[1]]['satis'];

        result['alis'] = (1 / sat1) * (1 / sat2);
        result['satis'] = (1 / al1) * (1 / al2);

    }
    if (r1[0] == 'ters' && r2[0] == 'ters') {
        tmp = tersIslem(r1[1], fiyatlar);
        al1 = tmp['alis'];
        sat1 = tmp['satis'];
        tmp = tersIslem(r2[1], fiyatlar);
        al2 = tmp['alis'];
        sat2 = tmp['satis'];

        result['alis'] = sat2 / al1;
        result['satis'] = al2 / sat1;

    }
    return result;
}

function kodBul(code1, fiyatlar) {
    tip = '';

    code = '';
    if (fiyatlar[code1 + 'TRY'] != undefined) {
        tip = 'duz';
        code = code1 + 'TRY';
    }
    else {
        tip = 'yok';
    }

    if (fiyatlar[code1 + 'TRY'] != undefined) {
        tip = 'duz';
        code = code1 + 'TRY';
    }
    else if (fiyatlar['TRY' + code1] != undefined) {
        tip = 'ters';
        code = 'TRY' + code1;
    }
    

    return [tip, code];
}

function tersIslem(code, fiyatlar) {
    console.log(code);
    al = 1 / fiyatlar[code]['satis'];
    sat = 1 / fiyatlar[code]['alis'];
    return { 'alis': al, 'satis': sat };
}

function _isnumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

function _formatNumber(number) {
    if (isNaN(number)) return "0";

    var temp = number.toString().replace(",", ".");
    var tmp = temp.split(".");


    let tamKisim = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");


    if (typeof tmp[1] != "undefined" && tmp[1] !== "") {
        let ondalik = tmp[1].substring(0, 2); 
        return tamKisim + "," + ondalik;
    } else {
        return tamKisim;
    }
}


function ekranaSayiFormatla(s, yuvarla) {

    if (yuvarla == undefined) {
        yuvarla = 3;
    }
    let parts = parseFloat(s).toFixed(yuvarla).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}


$(window).on("resize",function(e){
    if ( !is_mobile && $(window).width()<900) {
        window.location.href="?size=500"
    } else if ( is_mobile && $(window).width()>900 ) {
        window.location.href="?size=1000"
    }
});