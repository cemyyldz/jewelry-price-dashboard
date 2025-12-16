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

$(window).on("resize",function(e){
    if ( !is_mobile && $(window).width()<900) {
        window.location.href="?size=500"
    } else if ( is_mobile && $(window).width()>900 ) {
        window.location.href="?size=1000"
    }
});
