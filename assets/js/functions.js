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
