/******************************************************************************/
/***************Шаблон "Песни", подстройка под разрешение экрана***************/
/******************************************************************************/
$(document).ready(function() {
    var tss1 = $("#tempsongs td").eq(1).html();
    if (typeof tss1 == "undefined") return;
    var tss2 = $("#tempsongs td").eq(3).html();
    if (typeof tss2 == "undefined") return;
    var tss3 = $("#tempsongs td").eq(5).html();
    if (typeof tss3 == "undefined") return;
    var tss1a = tss1.split('•');
    var tss2a = tss2.split('•');
    var tss3a = tss3.split('•');
    var swidth = screen.width;
    if (swidth < 1600) {         
        $("#tempsongs td").eq(1).html(tss1a[0]+'•'+tss1a[1]+'•'+tss1a[2]+'•'+tss1a[3]+'<br />'+tss1a[4]+'•'+tss1a[5]+'•'+tss1a[6]+'•'+tss1a[7]+'<br />'+tss1a[8]+'•'+tss1a[9]+'•'+tss1a[10]+'<br />'+tss1a[11]+'•'+tss1a[12]+'•'+tss1a[13]+'<br />'+tss1a[14]+'•'+tss1a[15]+'•'+tss1a[16]);
        $("#tempsongs td").eq(3).html(tss2a[0]+'•'+tss2a[1]+'•'+tss2a[2]+'<br />'+tss2a[3]+'•'+tss2a[4]+'•'+tss2a[5]+'<br />'+tss2a[6]+'•'+tss2a[7]+'•'+tss2a[8]+'•'+tss2a[9]+'<br />'+tss2a[10]+'•'+tss2a[11]+'•'+tss2a[12]+'•'+tss2a[13]);
        $("#tempsongs td").eq(5).html(tss3a[0]+'•'+tss3a[1]+'•'+tss3a[2]+'<br />'+tss3a[3]+'•'+tss3a[4]+'•'+tss3a[5]+'•'+tss3a[6]+'<br />'+tss3a[7]+'•'+tss3a[8]+'•'+tss3a[9]+'<br />'+tss3a[10]+'•'+tss3a[11]);
    }
    else if (swidth >= 1600 && swidth < 1900) {         
        $("#tempsongs td").eq(1).html(tss1a[0]+'•'+tss1a[1]+'•'+tss1a[2]+'•'+tss1a[3]+'•'+tss1a[4]+'•'+tss1a[5]+'<br />'+tss1a[6]+'•'+tss1a[7]+'•'+tss1a[8]+'•'+tss1a[9]+'•'+tss1a[10]+'<br />'+tss1a[11]+'•'+tss1a[12]+'•'+tss1a[13]+'<br />'+tss1a[14]+'•'+tss1a[15]+'•'+tss1a[16]);
        $("#tempsongs td").eq(3).html(tss2a[0]+'•'+tss2a[1]+'•'+tss2a[2]+'•'+tss2a[3]+'•'+tss2a[4]+'<br />'+tss2a[5]+'•'+tss2a[6]+'•'+tss2a[7]+'•'+tss2a[8]+'•'+tss2a[9]+'<br />'+tss2a[10]+'•'+tss2a[11]+'•'+tss2a[12]+'•'+tss2a[13]);
        $("#tempsongs td").eq(5).html(tss3a[0]+'•'+tss3a[1]+'•'+tss3a[2]+'•'+tss3a[3]+'•'+tss3a[4]+'•'+tss3a[5]+'<br />'+tss3a[6]+'•'+tss3a[7]+'•'+tss3a[8]+'•'+tss3a[9]+'<br />'+tss3a[10]+'•'+tss3a[11]);
    }
    else {         
        $("#tempsongs td").eq(1).html(tss1a[0]+'•'+tss1a[1]+'•'+tss1a[2]+'•'+tss1a[3]+'•'+tss1a[4]+'•'+tss1a[5]+'•'+tss1a[6]+'•'+tss1a[7]+'•'+tss1a[8]+'<br />'+tss1a[9]+'•'+tss1a[10]+'•'+tss1a[11]+'•'+tss1a[12]+'•'+tss1a[13]+'•'+tss1a[14]+'<br />'+tss1a[15]+'•'+tss1a[16]);
        $("#tempsongs td").eq(3).html(tss2a[0]+'•'+tss2a[1]+'•'+tss2a[2]+'•'+tss2a[3]+'•'+tss2a[4]+'•'+tss2a[5]+'•'+tss2a[6]+'<br />'+tss2a[7]+'•'+tss2a[8]+'•'+tss2a[9]+'•'+tss2a[10]+'•'+tss2a[11]+'•'+tss2a[12]+'•'+tss2a[13]);
        $("#tempsongs td").eq(5).html(tss3a[0]+'•'+tss3a[1]+'•'+tss3a[2]+'•'+tss3a[3]+'•'+tss3a[4]+'•'+tss3a[5]+'•'+tss3a[6]+'•'+tss3a[7]+'<br />'+tss3a[8]+'•'+tss3a[9]+'•'+tss3a[10]+'•'+tss3a[11]);
    }
});