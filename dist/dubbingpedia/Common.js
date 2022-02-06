var language = window.navigator.systemLanguage || window.navigator.userLanguage || window.navigator.language;
var langregion = {'aa':'ET', 'ab':'GE', 'ae':'IN', 'af':'ZA', 'ak':'GH', 'am':'ET', 'an':'ES', 'ar':'EG', 'as':'IN', 'av':'RU', 'ay':'BO', 'ba':'RU', 'be':'BY', 'bh':'IN', 'bi':'VU', 'bm':'ML', 'bn':'BD', 'bo':'IN', 'br':'FR', 'bs':'BA', 'ca':'ES', 'ce':'RU', 'ch':'GU', 'co':'IT', 'cr':'CA', 'cs':'CZ', 'cu':'BG', 'cv':'RU', 'cy':'GB', 'da':'DK', 'dv':'MV', 'dz':'BT', 'ee':'GH', 'el':'GR', 'en':'GB', 'eo':'ES', 'et':'EE', 'eu':'ES', 'fa':'IR', 'ff':'NG', 'fy':'NL', 'ga':'IE', 'gd':'GB', 'gl':'ES', 'gn':'PY', 'gu':'IN', 'gv':'IM', 'ha':'NE', 'he':'IL', 'hi':'IN', 'ho':'PG', 'hy':'AM', 'hz':'NA', 'ia':'US', 'ie':'RU', 'ig':'NG', 'ii':'CN', 'ik':'CA', 'io':'FR', 'iu':'CA', 'ja':'JP', 'jv':'ID', 'ka':'GE', 'kg':'CD', 'ki':'KE', 'kj':'NA', 'kk':'KZ', 'kl':'GL', 'km':'KH', 'kn':'IN', 'ko':'KR', 'kr':'NG', 'ks':'IN', 'ku':'IQ', 'kv':'RU', 'kw':'GB', 'ky':'KG', 'la':'IT', 'lb':'LU', 'lg':'UG', 'li':'NL', 'ln':'CD', 'lo':'LA', 'lu':'CD', 'mi':'NZ', 'ml':'IN', 'mr':'IN', 'ms':'MY', 'my':'MM', 'na':'NR', 'nb':'NO', 'nd':'ZW', 'ne':'NP', 'ng':'NA', 'nn':'NO', 'nr':'ZA', 'nv':'US', 'ny':'MW', 'oc':'ES', 'oj':'CA', 'om':'ET', 'or':'IN', 'os':'RU', 'pa':'IN', 'pi':'IN', 'ps':'AF', 'pt':'BR', 'qu':'BO', 'rm':'CH', 'rn':'BI', 'sa':'IN', 'sc':'IT', 'sd':'AF', 'se':'NO', 'sg':'CF', 'si':'LK', 'sl':'SI', 'sm':'WS', 'sn':'ZW', 'sq':'AL', 'sr':'RS', 'ss':'SZ', 'st':'LS', 'su':'ID', 'sv':'SE', 'sw':'TZ', 'ta':'IN', 'te':'IN', 'tg':'TJ', 'ti':'ER', 'tk':'TM', 'tl':'PH', 'tn':'BW', 'ts':'ZA', 'tt':'RU', 'tw':'GH', 'ty':'PF', 'ug':'CN', 'uk':'UA', 'ur':'PK', 've':'ZA', 'vi':'VN', 'vo':'DE', 'wa':'BE', 'wo':'SN', 'xh':'ZA', 'yi':'DE', 'yo':'NG', 'za':'CN', 'zh':'CN', 'zu':'ZA'}
if (!language) {
    language = "en-GB";
}
var array = language.split('-');
lang = array[0].toLowerCase();
if (array.length > 1) {
    reg = array[1].toUpperCase();
} else {
    reg = langregion[lang];
    if(!reg) {
        reg = lang.toUpperCase();
    }
}
language_code = lang+"-"+reg;
 
window.onload = function() {
    /* UNESCAPE TITLE */
    var title_format = document.getElementsByTagName('h1');
    /*for (var i = 0; i < title_format.length; i++) {*/
    if (title_format.length >= 1) { // check if there's least one h1
        title_format[0].innerHTML = title_format[0].innerHTML.replace(/&lt;(\/?)(br|rp|rt|ruby|span)&gt;/g,"<$1$2>")
        i = 0; // article title is the first element
        var title_parts = title_format[i].innerHTML.split(" | ");
        title_format[i].innerHTML = "";
        for (var j = 0; j < title_parts.length; j++) {
            if (title_parts[j].substr(title_parts[j].length-5,5) == '󠁓​󠁒') {
                title_format[i].innerHTML += "<span class=\"serbian\">"+title_parts[j].substr(0,title_parts[j].length-5)+"</span><br>";
            } else if (title_parts[j].substr(title_parts[j].length-5,5) == '󠁁​󠁚') {
                title_format[i].innerHTML += "<span class=\"azeri\">"+title_parts[j].substr(0,title_parts[j].length-5)+"</span><br>";
            } else if (title_parts[j].substr(title_parts[j].length-5,5) == '󠁚​󠁈') {
                title_format[i].innerHTML += "<span class=\"ar_phonetic title_phonetic\">"+title_parts[j].substr(0,title_parts[j].length-5)+"</span><br>";
            } else if (title_parts[j].substr(title_parts[j].length-5,5) == '󠁁​󠁚') {
                title_format[i].innerHTML += "<span class=\"zh_phonetic title_phonetic\">"+title_parts[j].substr(0,title_parts[j].length-5)+"</span><br>";
            } else if (title_parts[j].substr(title_parts[j].length-5,5) == '󠁈​󠁋') {
                title_format[i].innerHTML += "<span class=\"hk_phonetic title_phonetic\">"+title_parts[j].substr(0,title_parts[j].length-5)+"</span><br>";
            } else if (title_parts[j].substr(title_parts[j].length-5,5) == '󠁚​󠁚') {
                title_format[i].innerHTML += "<span class=\"title_phonetic\">"+title_parts[j].substr(0,title_parts[j].length-5)+"</span><br>";
            } else if (title_parts[j].substr(title_parts[j].length-6,6).toLowerCase() == '[link]') {
                title_format[i].innerHTML += "<a class=\"title_link\" href=\"\/wiki\/"+title_parts[j].substr(0,title_parts[j].length-6)+"\">"+title_parts[j].substr(0,title_parts[j].length-6)+"</a><br>";
            } else {
                title_format[i].innerHTML += title_parts[j]+"<br>";
            }
        }
    }
 
    /* DATE FORMAT */
    var month_names = [
        ['??','1','2','3','4','5','6','7','8','9','10','11','12'],
        ['??','01','02','03','04','05','06','07','08','09','10','11','12'],
        ['??????','January','February','March','April','May','June','July','August','September','October','November','December'],
        ['???','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        ['??','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
    ];
    var date_datums = Array.prototype.slice.call(document.getElementsByClassName('date_datum')).concat(Array.prototype.slice.call(document.getElementsByClassName('date_datum_short')));
    var date_datum_s = document.getElementsByClassName('date_datum').length;
    for (var i = 0; i < date_datums.length; i++) {
        var itemA = date_datums[i];
        var date_links = itemA.children;
        var DM_div = " ";
        var MY_div = " ";
        var DY_div = " ";
        var D_lead = 0;
        var M_type = 2;
        var M_end = 1;
        var Y_end = 1;
        var D_ext = "";
        var M_ext = "";
        var Y_ext = "";
        var Y_off = 0;
 
        if (i < date_datum_s) { // long date format
            if (reg == 'AF' || reg == 'BT' || reg == 'CN' || reg == 'IR' || reg == 'JP' || reg == 'KZ' || reg == 'KP' || reg == 'KR' || reg == 'MN' || reg == 'SG' || reg == 'ZA' || reg == 'TW') { // Afghanistan, Bhutan, China, Iran, Japan, Kazakhstan, Mongolia, North Korea, Singapore, South Africa, South Korea, Taiwan - 2017 August 1
                M_end = 0;
                Y_end = 0;
            } else if (reg == 'HU') { // Hungary - 2017. August 1.
                D_ext = ".";
                Y_ext = ".";
                M_end = 0;
                Y_end = 0;
            } else if (reg == 'AS' || language_code == 'en-CA' || reg == 'FM' || reg == 'GU' || reg == 'MP' || reg == 'PH' || reg == 'PR' || reg == 'SO' || reg == 'UM' || reg == 'US' || reg == 'VI') { // American Samoa, Canada (English), Micronesia, Guam, Northern Mariana Islands, Philippines, Puerto Rico, Somalia, United States Minor Outlying Islands, United States, United States Virgin Islands - August 1, 2017
                DY_div = ", ";
                M_end = 0;
            } else if (reg == 'TM') { // Turkmenistan - 2017 1 August
                Y_end = 0;
            } else if (reg == 'AT' || reg == 'CZ' || reg == 'EE' || reg == 'FI' || reg == 'DE' || reg == 'GL' || reg == 'CH') { // Austria, Czechia, Estonia, Finnish, Germany, Greenland, Switzerland - 1. August 2017
                D_ext = ".";
            } else if (reg == 'SI') { // Slovenia - 01. August 2017
                D_lead = 1;
                D_ext = ".";
            } else if (reg == 'BA' || reg == 'HR' || reg == 'DK' || reg == 'RS') { // Bosnia, Croatia, Denmark, Serbia - 1. August 2017.
                D_ext = ".";
                Y_ext = ".";
            } else if (reg == 'ET') { // Ethiopia - 01 August 2017
                D_lead = 1;
            } else if (reg == 'LT') { // Lithuania - 2017. 1. August
                Y_end = 0;
                D_ext = ".";
                Y_ext = ".";
            } else if (reg == 'TH') { // Thailand - 1 August 2560 B.E.
                Y_ext = " B.E.";
                Y_off = 543;
            } else { // all other - 1 August 2017
            }
        } else { // short date format
            if (reg == 'AF' || reg == 'CM' || reg == 'CY' || reg == 'GR' || reg == 'HK' || reg == 'NG' || reg == 'VN') { // Afghanistan, Cameroon, Cyprus, Greece, Hong Kong, Nigeria, Vietnam - 1/8/2017
                DM_div = "/";
                MY_div = "/";
                M_type = 0;
            } else if (reg == 'AX' || (reg == 'CA' && language_code != 'en-CA') || reg == 'MN' || reg == 'ZA' || (reg == 'LK' && language_code != 'ta-LK') || reg == 'CN' || reg == 'JP' || reg == 'SG' || reg == 'TW' || reg == 'KP' || reg == 'KR') { // Åland Island, Canada, Mongolia, South Africa, Sri Lanka, China, Japanese, Singapore, Taiwan, North Korea, South Korea - 2017-08-01
                DM_div = "-";
                MY_div = "-";
                D_lead = 1;
                M_type = 1;
                M_end = 0;
                Y_end = 0;
            } else if (reg == 'AL' || reg == 'DZ' || reg == 'BW' || reg == 'BR' || reg == 'DJ' || reg == 'GQ' || reg == 'ER' || reg == 'ET' || reg == 'FR' || reg == 'GH' || reg == 'GN' || reg == 'IQ' || reg == 'IT' || reg == 'KE' || reg == 'LS' || reg == 'PK' || reg == 'PS' || reg == 'PT' || reg == 'RW' || reg == 'SA' || reg == 'SO' || (reg == 'ES' && language_code != 'eu-ES') || reg == 'TG' || reg == 'GB' || reg == 'UK') { // Albania, Algeria, Botswana, Brazil, Djibouti, Eritrea, Ethiopia, France, Ghana, Guinea, Iraq, Italy, Kenya, Lesotho, Pakistan, Palestine, Portugal, Rwanda, Saudi Arabia, Somalia, Spanish, Togo, United Kingdom - 01/08/2017
                DM_div = "/";
                MY_div = "/";
                D_lead = 1;
                M_type = 1;
            } else if (reg == 'UZ') { // Uzbekistan - 01/08 2017
                DM_div = "/";
                MY_div = " ";
                D_lead = 1;
                M_type = 1;
            } else if (reg == 'AM' || reg == 'AZ' || reg == 'BY' || reg == 'BE' || reg == 'BG' || reg == 'IS' || reg == 'LI' || reg == 'RO' || reg == 'RU' || reg == 'SK' || reg == 'CH' || reg == 'TR' || reg == 'TM' || reg == 'UA') { // Armenia, Azerbaijan, Belarus, Belgium, Bulgaria, Iceland, Liechtenstein, Romania, Russia, Slovakia, Switzerland, Turkey, Turkmenistan, Ukraine - 01.08.2017
                DM_div = ".";
                MY_div = ".";
                D_lead = 1;
                M_type = 1;
            } else if (reg == 'NO' || reg == 'SE') { // Norway, Sweden - 1/8-2017
                DM_div = "/";
                MY_div = "-";
                M_type = 0;
            } else if (reg == 'PL') { // Poland - 1.08.2017
                DM_div = ".";
                MY_div = ".";
                M_type = 1;
            } else if (reg == 'AS' || reg == 'MP' || reg == 'PH' || reg == 'PR' || reg == 'UM' || reg == 'US' || reg == 'VI') { // American Samoa, Northern Mariana Islands, Philippines, Puerto Rico, United States Minor Outlying Islands, United States, United States Virgin Islands - 8/1/2017
                DM_div = "/";
                MY_div = "/";
                DY_div = "/";
                M_type = 0;
                M_end = 0;
            } else if (reg == 'PA') { // Panama - 08/01/2017
                DM_div = "/";
                MY_div = "/";
                DY_div = "/";
                D_lead = 1;
                M_type = 1;
                M_end = 0;
            } else if (reg == 'AT' || reg == 'EE' || reg == 'GE' || reg == 'IL' || reg == 'ME' || reg == 'RS') { // Austria, Estonia, Georgia, Israel, Montenegro, Serbia - 1.8.2017
                DM_div = ".";
                MY_div = ".";
                M_type = 0;
            } else if (reg == 'BD' || reg == 'DK' || reg == 'IN' || reg == 'IE' || reg == 'NP' || reg == 'NL') { // Bangladesh, Denmark, India, Ireland, Nepal, Netherlands - 01-08-2017
                DM_div = "-";
                MY_div = "-";
                D_lead = 1;
                M_type = 1;
            } else if (language_code == 'ta-LK') { //  - 1-8-2017
                DM_div = "-";
                MY_div = "-";
                M_type = 0;
            } else if (reg == 'BA' || reg == 'HR') { // Bosnia, Croatia - 1. 8. 2017.
                DM_div = ". ";
                MY_div = ". ";
                M_type = 0;
                Y_ext = ".";
            } else if (reg == 'SI') { // Slovenia - 1. 08. 2017
                DM_div = ". ";
                MY_div = ". ";
                M_type = 1;
            } else if (language_code == 'en-CA') { // Canada - Aug/1/2017
                DM_div = "/";
                MY_div = "/";
                DY_div = "/";
                M_end = 0;
                M_type = 3;
            } else if (reg == 'CZ') { // Czechia - 1. 8. 2017
                DM_div = ". ";
                MY_div = ". ";
                M_type = 0;
            } else if (reg == 'DE' || reg == 'KG' || reg == 'LV' || reg == 'MK' || reg == 'TJ') { // Germany, Kyrgyzstan, Latvia, Macedonia, Tajikistan - 01.08.2017
                DM_div = ".";
                MY_div = ".";
                D_lead = 1;
                M_type = 1;
            } else if (reg == 'FM' || reg == 'GU') { // Micronesia, Guam - 08/01/2017
                DM_div = "/";
                MY_div = "/";
                DY_div = "/";
                D_lead = 1;
                M_type = 1;
                M_end = 0;
            } else if (reg == 'HU') { // Hungary - 01. VIII. 2017.
                DM_div = " ";
                MY_div = " ";
                M_end = 0;
                Y_end = 0;
                D_lead = 1;
                M_type = 4;
                D_ext = ".";
                M_ext = ".";
                Y_ext = ".";
            } else if (reg == 'IR' || reg == 'MV' || language_code == 'eu-ES') { // Iran, Maldives  - 2017/08/01
                DM_div = "/";
                MY_div = "/";
                D_lead = 1;
                M_type = 1;
                M_end = 0;
                Y_end = 0;
            } else if (reg == 'KZ') { // Kazakhstan - 2017.08.01
                DM_div = ".";
                MY_div = ".";
                D_lead = 1;
                M_type = 1;
                M_end = 0;
                Y_end = 0;
            } else if (reg == 'TH') { // Thailand - 1/8/2560
                DM_div = "/";
                MY_div = "/";
                D_lead = 1;
                M_type = 0;
                Y_off = 543;
            } else { // all other - 1 Aug 2017
                M_type = 2;
            }
        }
 
        if (date_links.length == 2) { // date and year
            D_inc = 1;
            var array = date_links[1].innerHTML.split('-');
            if (array[1] == '??') {
                array[1] = 0;
            }
            if (array.length == 3) {
                if (M_end) {
                    date_links[1].innerHTML = leadzero(Number(array[2]),D_lead)+D_ext+DM_div+month_names[M_type][Number(array[1])]+M_ext;
                } else {
                    date_links[1].innerHTML = month_names[M_type][Number(array[1])]+M_ext+DM_div+leadzero(Number(array[2]),D_lead)+D_ext;
                }
            } else {
                date_links[1].innerHTML = month_names[M_type][Number(array[1])]+M_ext;
                D_inc = 0;
            }
            date_links[0].innerHTML = (parseInt(date_links[0].innerHTML,10)+Y_off) + Y_ext;
 
            if (Y_end) { // Y-xx
                if (M_end || !D_inc) { // Y-M-D
                    date_links[1].innerHTML = date_links[1].innerHTML+MY_div
                } else { // Y-D-M
                    date_links[1].innerHTML = date_links[1].innerHTML+DY_div
                }
                date_links[0].parentNode.insertBefore(date_links[1],date_links[0]);
            } else { // xx-Y
                if (M_end && D_inc) { // M-D-Y
                    date_links[1].innerHTML = DY_div+date_links[1].innerHTML
                } else { // D-M-Y
                    date_links[1].innerHTML = MY_div+date_links[1].innerHTML
                }
            }
        } else if (date_links.length == 1) { // only date or year
            if (date_links[0].innerHTML.indexOf('-') > -1) { // date only
                var array = date_links[0].innerHTML.split('-');
                if (array[0] == '??') {
                    array[0] = 0;
                }
                if (M_end) {
                    date_links[0].innerHTML = leadzero(Number(array[1]),D_lead)+D_ext+DM_div+month_names[M_type][Number(array[0])]+M_ext;
                } else {
                    date_links[0].innerHTML = month_names[M_type][Number(array[0])]+M_ext+DM_div+leadzero(Number(array[1]),D_lead)+D_ext;
                }
            } else { // year only
                var array = Number(date_links[0].innerHTML);
                date_links[0].innerHTML = parseInt(array+Y_off,10) + Y_ext;
            }
        }
 
    }
    /* TIME FORMAT */
    var time_format = document.getElementsByClassName('time_format');
    for (var i = 0; i < time_format.length; i++) {
        time_format[i].innerHTML = format_time(time_format[i].innerHTML);
    }
    /* TIME ZONE */
    var time_format = document.getElementsByClassName('time_zone_format');
    for (var i = 0; i < time_format.length; i++) {
    }
    var time_format = document.getElementsByClassName('time_zone_format');
    var time_zones = [['GMT','WET','CET','EET'],
                      [ 0,    0,    1,    2]];
    var hrs_offset = -(new Date().getTimezoneOffset()/60);
    for (var i = 0; i < time_format.length; i++) {
        var times = time_format[i].innerHTML.split(" ");
        var time_numbr = times[times.length-2].split(":");
        zone_offset = 0;
        for (var j = 0; j < time_zones[0].length; j++) {
           if (time_zones[0][j] == times[2]) {
               var zone_offset = time_zones[1][j];
               break;
           }
        }
        /*var week_offset = 0;
        time_numbr[0] = parseInt(time_numbr[0],10)+parseInt(hrs_offset-zone_offset,10);
        time_numbr[1] = parseInt(time_numbr[1],10)+parseInt(((hrs_offset-zone_offset)-Math.floor(hrs_offset-zone_offset))*60,10);
        if (time_numbr[1] >= 60) {
            time_numbr[1] -= 60;
            time_numbr[0] += 1;
        } else if (time_numbr[1] < 0) {
            time_numbr[1] += 60;
            time_numbr[0] -= 1;
        }
        if (time_numbr[0] >= 24) {
            time_numbr[0] -= 24;
            week_offset += 1;
        } else if (time_numbr[0] < 0) {
            time_numbr[0] += 24;
            week_offset -= 1;
        }*/
        times[times.length-2] = format_time(time_numbr[0]+":"+time_numbr[1]);
        time_format[i].innerHTML = "";
        for (var j = 0; j < times.length; j++) {
            time_format[i].innerHTML += times[j];
            if (j < times.length-1) {
                time_format[i].innerHTML += " ";
            }
        }
    }
    /* WEIGHT FORMAT */
    var format_weight = document.getElementsByClassName('format_weight');
    for (var i = 0; i < format_weight.length; i++) {
        value = parseFloat(format_weight[i].innerHTML);
        multi = 1;
        unit = " kg";
 
        if (reg == 'US') { // United States - 51 lbs
            if (value < 0.045359237) { // 0–699 gr
                multi = 15432.35834;
                unit = " gr";
            } else if (value < 1016.04691) { // 0.1–2239 lbs
                multi = 2.20462262;
                unit = " lbs";
            } else { // 1+ tons
                multi = 0.0009842065;
                unit = " tons";
            }
        } else { // Non-listed/Other - 23 kg
            if (value < 0.001) { // 0–999 µg
                multi = 1000000;
                unit = " µg";
            } else if (value < 1) { // 1–999 g
                multi = 1000;
                unit = " g";
            } else if (value < 1000) { // 1–999 kg
                // no change
            } else { // 1+ t
                multi = 0.001;
                unit = " t";
            }
        }
        format_weight[i].innerHTML = format_number(Math.round(value*multi*10)/10) + unit;
    }
    /* HEIGHT FORMAT */
    var format_height = document.getElementsByClassName('format_height');
    for (var i = 0; i < format_height.length; i++) {
        value = parseFloat(format_height[i].innerHTML);
        multi = 1;
        unit = " m";
        override = "";
 
        if (reg == 'US') { // United States - 75 feet
            if (value < 0.00254) { // 0–100 thous
                multi = 39370.07874;
                unit = " thous";
            } else if (value < 1) { // 0.1–39.37 inch
                multi = 39.3700787;
                unit = " inches";
            } else if (value < 2) { // 3' 3" – 6' 7"
                override = Math.floor(value*3.2808399)+"' "+Math.floor(((value*3.2808399)-Math.floor(value*3.2808399))*12)+"\"";
            } else if (value < 1609.344) { // 6.56–5279 feet
                multi = 3.2808399;
                unit = " feet";
            } else { // 1+ miles
                multi = 0.0006213712;
                unit = " miles";
            }
        } else { // Non-listed/Other - 23 m
            if (value < 0.00001) {
                multi = 1000000;
                unit = " µm";
            } else if (value < 0.01) {
                multi = 1000;
                unit = " mm";
            } else if (value < 2) {
                multi = 100;
                unit = " cm";
            } else if (value < 1000) {
                // no change
            } else {
                multi = 0.001;
                unit = " km";
            }
        }
        if (override.length > 0) {
            format_height[i].innerHTML = override;
        } else {
            format_height[i].innerHTML = format_number(Math.round(value*multi*10)/10) + unit;
        }
    }
    /* NUMBER FORMAT */
    var format_numbers = document.getElementsByClassName('format_number');
    for (var i = 0; i < format_numbers.length; i++) {
        format_numbers[i].innerHTML = format_number(format_numbers[i].innerHTML);
    }
    /* REGIONAL WORDS */
    var regional_replace = [
    ["ize","ize","en-US","ise"],
    ["ized","ized","en-US","ised"],
    ["izing","izing","en-US","ising"],
    ["ization","ization","en-US","isation"],
    /* BRITISH SPELLING */
    ["season","series","en-GB,en-AU","season"],
    ["seasons","series","en-GB,en-AU","seasons"],
    ["while","whilst","en-GB,en-AU","while"],
    ["bucks","quid","en-GB,en-AU","bucks"],
    ["meter","metre","en-GB,en-AU","meter"],
    ["cookie","biscuit","en-GB,en-AU","cookie"],
    /* AMERICAN SPELLING */
    ["show","series","en-US","show"],
    ["shows","series","en-US","shows"],
    ["show's","series'","en-US","show's"],
    ["shows'","series'","en-US","shows'"],
    ["color","color","en-US","colour"],
    ["favorite","favorite","en-US","favourite"],
    ["film","movie","en-US","film"],
    ["movie","movie","en-US","film"],
    ["realize","realize","en-US","realise"],
    ["localized","localized","en-US","localised"],
    ["localization","localization","en-US","localisation"],
    /* OTHER */
    ["association football","soccer","en-US,af,ja","football"],
    ["an association football","a soccer","en-US,af,ja","a football"],
    ["american football","football","en-US","american football"],
    ["an american football","a football","en-US","an american football"],
    ["official localized logo","official localized logo","en-US","official localised logo"],
    ["program","programme","en-GB,en-AU,nl,de,el,it,ru","program"],
    ["programs","programmes","en-GB,en-AU,nl,de,el,it,ru","programs"],
    ["metro","subway","en-US,zh","underground","en-GB,ko","metro"],
    ["subway","subway","en-US,zh","underground","en-GB,ko","metro"],
    ["lift","elevator","en-US,da,sw","lift"],
    ["elevator","elevator","en-US,da,sw","lift"],
    ["couch","sofa","en-GB,en-AU,da,de,es,fi,fr,he,is,it,ms,nl,no,pt,sv,zh","chesterfield","en-CA","couch"],
    ["couches","sofas","en-GB,en-AU,da,de,es,fi,fr,he,is,it,ms,nl,no,pt,sv,zh","chesterfields","en-CA","couches"],
    ["griffin","gryphon","be,cz,el","griffon","bg,nl,eo,fr,gl,he,ga,it,jp,lt,mk,pt,ro,ru,sr,es,tr","griffin"]];
    var regional_words = document.getElementsByClassName('regional_words');
    for (i = 0; i < regional_words.length; i++) {
        for (j = 0; j < regional_replace.length; j++) {
            if (regional_words[i].innerHTML.toLowerCase() == regional_replace[j][0]) {
                upper = 0;
                if (regional_words[i].innerHTML.charAt(0) == regional_words[i].innerHTML.charAt(0).toUpperCase()) {
                    upper = 1;
                }
                regional_words[i].innerHTML = regional_replace[j][regional_replace[j].length-1];
                for (k = 0; k < (regional_replace[j].length-2)/2; k++) {
                    if (regional_replace[j][(k*2)+1+1].indexOf(language_code) != -1) {
                        regional_words[i].innerHTML = regional_replace[j][(k*2)+1];
                    }
                }
                if (upper) {
                    regional_words[i].innerHTML = regional_words[i].innerHTML.charAt(0).toUpperCase() + regional_words[i].innerHTML.substr(1,regional_words[i].innerHTML.length-1)
                };
                j = regional_replace.length;
            }
        }
    }
    /* IPA for LATIN */
    var text_latin = document.getElementsByClassName('ipa_latin');
    if (text_latin.length > 0) {
        if (getCookie('latin_close') != "true") {
            phonetic_module('LatinPhonetic','Latin','Latin Phonetic Display','','la',[],[]);
        }
 
        if (getCookie('latin') != "") {
            findScript("Latin",getCookie('latin'),0);
        }
    }
    /* IPA for GEORGIAN */
    var text_georgian = document.getElementsByClassName('ipa_georgian');
    if (text_georgian.length > 0) {
        if (getCookie('georgian_close') != "true") {
            phonetic_module('GeorgianPhonetic','Georgian','Georgian Phonetic Display','','ka',['Romanised'],['Romanised']);
        }
 
        if (getCookie('georgian') != "") {
            findScript("Georgian",getCookie('georgian'),0);
        }
    }
    /* IPA for JAPANESE */
    var text_japanese = document.getElementsByClassName('ipa_japanese');
    if (text_japanese.length > 0) {
        if (getCookie('japanese_close') != "true") {
            phonetic_module('JapanesePhonetic','Japanese','Japanese Phonetic Display','','ja',['Rōmaji'],['Romaji']);
        }
 
        if (getCookie('japanese') != "") {
            findScript("Japanese",getCookie('japanese'),0);
        }
    }
    /* IPA for KOREAN */
    var text_japanese = document.getElementsByClassName('ipa_hangul');
    if (text_japanese.length > 0) {
        if (getCookie('korean_close') != "true") {
            phonetic_module('KoreanPhonetic','Korean','Korean Phonetic Display','','ko',['RR','McC-Rsr','Yale'],['RR','McC-Rsr','Yale']);
        }
 
        if (getCookie('korean') != "") {
            findScript("Korean",getCookie('korean'),0);
        }
    }
    /* IPA for RUSSIAN */
    var text_russian = document.getElementsByClassName('ipa_russian');
    if (text_russian.length > 0) {
        if (getCookie('russian_close') != "true") {
            phonetic_module('RussianPhonetic','Russian','Russian Phonetic Display','','ru',['Romanised'],['Romanised']);
        }
 
        if (getCookie('russian') != "") {
            findScript("Russian",getCookie('russian'),0);
        }
    }
    /* IPA for CANTONESE */
    var text_cantonese = document.getElementsByClassName('ipa_cantonese');
    if (text_cantonese.length > 0) {
        if (getCookie('cantonese_close') != "true") {
            phonetic_module('CantonesePhonetic','Cantonese','Cantonese Phonetic Display','','hk',['Jyutping','Yale','Pinyin','Guangdong','Barnett–Chao'],['Jyutping','Yale','Pinyin','Guangdong','BarnettChao']);
        }
 
        if (getCookie('cantonese') != "") {
            findScript("Cantonese",getCookie('cantonese'),0);
        }
    }
    /* IPA for MANDARIN */
    var text_mandarin = document.getElementsByClassName('ipa_mandarin');
    if (text_mandarin.length > 0) {
        if (getCookie('mandarin_close') != "true") {
            phonetic_module('Mandarinhonetic','Mandarin','Mandarin Phonetic Display','','zh',['Pinyin','Zhuyin','Wade-Giles','Gwoyeu'],['Pinyin','Zhuyin','WadeGiles','Gwoyeu']);
        }
 
        if (getCookie('mandarin') != "") {
            findScript("Mandarin",getCookie('mandarin'),0);
        }
    }
 
    /* SERBIAN */
    var text_serbian = document.getElementsByClassName('serbian');
    var text_serbian_reverse = document.getElementsByClassName('serbian-reverse');
    if (text_serbian.length > 0 || text_serbian_reverse.length > 0) {
        if (getCookie('serbian_close') != "true") {
            var iDiv = document.createElement('section');
            iDiv.id = 'SerbianScript';
            iDiv.className = 'ScriptModule module';
            var iClose = document.createElement('a');
            iClose.style.float = 'right';
            iClose.style.fontSize = '160%';
            iClose.style.textDecoration = 'none';
            iClose.innerHTML = '×';
            iClose.href = 'javascript:closeModul("Serbian")';
            iDiv.appendChild(iClose);
            var iHead = document.createElement('h2');
            iHead.style.margin = '0';
            iHead.innerHTML = 'Serbian Script';
            iDiv.appendChild(iHead);
            var iDesc = document.createElement('p');
            iDesc.style.marginBottom = '25px';
            iDesc.innerHTML = 'Display Serbian text with Latin or Cyrillic script';
            iDiv.appendChild(iDesc);
            var iUL = document.createElement('ul');
            var iA1 = document.createElement('a');
            iA1.id = 'rsDefault';
            iA1.className = 'link_active';
            iA1.style.float = 'left';
            iA1.innerHTML = 'Default';
            iA1.href = 'javascript:findScript("Serbian","Default",1)';
            var iA2 = document.createElement('a');
            iA2.id = 'rsCyrillic';
            iA2.style.float = 'left';
            iA2.innerHTML = 'Ћирилица';
            iA2.href = 'javascript:findScript("Serbian","Cyrillic",0)';
            var iA3 = document.createElement('a');
            iA3.id = 'rsLatin';
            iA3.style.float = 'left';
            iA3.innerHTML = 'Latin';
            iA3.href = 'javascript:findScript("Serbian","Latin",0)';
            iUL.appendChild(iA1);
            iUL.appendChild(iA2);
            iUL.appendChild(iA3);
            iDiv.appendChild(iUL);
            var w_rail = document.getElementsByClassName('wikia-rail-inner');
            w_rail[0].prepend(iDiv,w_rail[0].childNodes[0]);
        }
 
        if (getCookie('serbian') != "") {
            findScript("Serbian",getCookie('serbian'),0);
        }
    }
    /* AZERBAIJAN */
    var text_azeri = document.getElementsByClassName('azeri');
    var text_azeri_reverse = document.getElementsByClassName('azeri-reverse');
    if (text_azeri.length > 0 || text_azeri_reverse.length > 0) {
        if (getCookie('azeri_close') != "true") {
            var iDiv = document.createElement('section');
            iDiv.id = 'AzeriScript';
            iDiv.className = 'ScriptModule module';
            var iClose = document.createElement('a');
            iClose.style.float = 'right';
            iClose.style.fontSize = '160%';
            iClose.style.textDecoration = 'none';
            iClose.innerHTML = '×';
            iClose.href = 'javascript:closeModul("Azeri")';
            iDiv.appendChild(iClose);
            var iHead = document.createElement('h2');
            iHead.style.margin = '0';
            iHead.innerHTML = 'Azerbaijan Script';
            iDiv.appendChild(iHead);
            var iDesc = document.createElement('p');
            iDesc.style.marginBottom = '25px';
            iDesc.innerHTML = 'Display Azerbaijani text with Latin, Cyrillic or Arabic script';
            iDiv.appendChild(iDesc);
            var iUL = document.createElement('ul');
            var iA1 = document.createElement('a');
            iA1.id = 'azDefault';
            iA1.className = 'link_active';
            iA1.style.float = 'left';
            iA1.innerHTML = 'Default';
            iA1.href = 'javascript:findScript("Azeri","Default",1)';
            var iA2 = document.createElement('a');
            iA2.id = 'azLatin';
            iA2.style.float = 'left';
            iA2.innerHTML = 'Latın';
            iA2.href = 'javascript:findScript("Azeri","Latin",1)';
            var iA3 = document.createElement('a');
            iA3.id = 'azCyrillic';
            iA3.style.float = 'left';
            iA3.innerHTML = 'Кирил';
            iA3.href = 'javascript:findScript("Azeri","Cyrillic",1)';
            var iA4 = document.createElement('a');
            iA4.id = 'azArabic';
            iA4.style.float = 'left';
            iA4.innerHTML = 'عربی';
            iA4.href = 'javascript:findScript("Azeri","Arabic",0)';
            iUL.appendChild(iA1);
            iUL.appendChild(iA2);
            iUL.appendChild(iA3);
            iUL.appendChild(iA4);
            iDiv.appendChild(iUL);
            var w_rail = document.getElementsByClassName('wikia-rail-inner');
            w_rail[0].prepend(iDiv,w_rail[0].childNodes[0]);
        }
 
        if (getCookie('azeri') != "") {
            findScript("Azeri",getCookie('azeri'),0);
        }
    }
    /* KAZAKH */
    var text_kazakh = document.getElementsByClassName('kazakh');
    var text_kazakh_reverse = document.getElementsByClassName('kazakh-reverse');
    if (text_kazakh.length > 0 || text_kazakh_reverse.length > 0) {
        if (getCookie('kazakh_close') != "true") {
            var iDiv = document.createElement('section');
            iDiv.id = 'KazakhScript';
            iDiv.className = 'ScriptModule module';
            var iClose = document.createElement('a');
            iClose.style.float = 'right';
            iClose.style.fontSize = '160%';
            iClose.style.textDecoration = 'none';
            iClose.innerHTML = '×';
            iClose.href = 'javascript:closeModul("Kazakh")';
            iDiv.appendChild(iClose);
            var iHead = document.createElement('h2');
            iHead.style.margin = '0';
            iHead.innerHTML = 'Kazakh Script';
            iDiv.appendChild(iHead);
            var iDesc = document.createElement('p');
            iDesc.style.marginBottom = '25px';
            iDesc.innerHTML = 'Display Kazakh text with Latin or Cyrillic script';
            iDiv.appendChild(iDesc);
            var iUL = document.createElement('ul');
            var iA1 = document.createElement('a');
            iA1.id = 'rsDefault';
            iA1.className = 'link_active';
            iA1.style.float = 'left';
            iA1.innerHTML = 'Default';
            iA1.href = 'javascript:findScript("Kazakh","Default",1)';
            var iA2 = document.createElement('a');
            iA2.id = 'rsCyrillic';
            iA2.style.float = 'left';
            iA2.innerHTML = 'Кирил';
            iA2.href = 'javascript:findScript("Kazakh","Cyrillic",0)';
            var iA3 = document.createElement('a');
            iA3.id = 'rsLatin';
            iA3.style.float = 'left';
            iA3.innerHTML = 'Latin';
            iA3.href = 'javascript:findScript("Kazakh","Latin",0)';
            iUL.appendChild(iA1);
            iUL.appendChild(iA2);
            iUL.appendChild(iA3);
            iDiv.appendChild(iUL);
            var w_rail = document.getElementsByClassName('wikia-rail-inner');
            w_rail[0].prepend(iDiv,w_rail[0].childNodes[0]);
        }
 
        if (getCookie('kazakh') != "") {
            findScript("Kazakh",getCookie('kazakh'),0);
        }
    }
    /* ARABIC */
    var text_arabic = document.getElementsByClassName('ar_phonetic');
    if (text_arabic.length > 0) {
        if (getCookie('arabic_close') != "true") {
            var iDiv = document.createElement('section');
            iDiv.id = 'ArabicPhonetic';
            iDiv.className = 'ScriptModule module';
            var iClose = document.createElement('a');
            iClose.style.float = 'right';
            iClose.style.fontSize = '160%';
            iClose.style.textDecoration = 'none';
            iClose.innerHTML = '×';
            iClose.href = 'javascript:closeModul("Arabic")';
            iDiv.appendChild(iClose);
            var iHead = document.createElement('h2');
            iHead.style.margin = '0';
            iHead.innerHTML = 'Arabic Romanization';
            iDiv.appendChild(iHead);
            var iDesc = document.createElement('p');
            iDesc.style.marginBottom = '25px';
            iDesc.innerHTML = 'Display Arabic romanizations with different phonetic system';
            iDiv.appendChild(iDesc);
            var iUL = document.createElement('ul');
            var iA1 = document.createElement('a');
            iA1.id = 'arISO233';
            iA1.className = 'link_active';
            iA1.style.float = 'left';
            iA1.innerHTML = 'ISO 233';
            iA1.href = 'javascript:findScript("Arabic","ISO 233",1)';
            var iA2 = document.createElement('a');
            iA2.id = 'arALA-LC';
            iA2.style.float = 'left';
            iA2.innerHTML = 'ALA-LC';
            iA2.href = 'javascript:findScript("Arabic","ALA-LC",1)';
            var iA3 = document.createElement('a');
            iA3.id = 'arWehr';
            iA3.style.float = 'left';
            iA3.innerHTML = 'Wehr';
            iA3.href = 'javascript:findScript("Arabic","Wehr",1)';
            var iA4 = document.createElement('a');
            iA4.id = 'arDIN';
            iA4.style.float = 'left';
            iA4.innerHTML = 'DIN';
            iA4.href = 'javascript:findScript("Arabic","DIN",1)';
            var iA5 = document.createElement('a');
            iA5.id = 'arUNGEGN';
            iA5.style.float = 'left';
            iA5.innerHTML = 'UNGEGN';
            iA5.href = 'javascript:findScript("Arabic","UNGEGN",1)';
            var iA6 = document.createElement('a');
            iA6.id = 'arSAS';
            iA6.style.float = 'left';
            iA6.innerHTML = 'SAS';
            iA6.href = 'javascript:findScript("Arabic","SAS",1)';
            var iA7 = document.createElement('a');
            iA7.id = 'arBATR';
            iA7.style.float = 'left';
            iA7.innerHTML = 'BATR';
            iA7.href = 'javascript:findScript("Arabic","BATR",1)';
            var iA8 = document.createElement('a');
            iA8.id = 'arGoogle';
            iA8.style.float = 'left';
            iA8.innerHTML = 'Google';
            iA8.href = 'javascript:findScript("Arabic","Google",1)';
            iUL.appendChild(iA1);
            iUL.appendChild(iA2);
            iUL.appendChild(iA3);
            iUL.appendChild(iA4);
            iUL.appendChild(iA5);
            iUL.appendChild(iA6);
            iUL.appendChild(iA7);
            iUL.appendChild(iA8);
            iDiv.appendChild(iUL);
            var w_rail = document.getElementsByClassName('wikia-rail-inner');
            w_rail[0].prepend(iDiv,w_rail[0].childNodes[0]);
        }
 
        if (getCookie('arabic') != "") {
            findScript("Arabic",getCookie('arabic'),0);
        }
    }
 
    /* NUMBERS ON PAGE */
    var onPageNumbers = document.getElementsByClassName('wds-community-header__counter-value');
    for (var i = 0; i < onPageNumbers.length; i++) {
        onPageNumbers[i].innerHTML = format_number(parseFloat(onPageNumbers[i].innerHTML.replace(/,/g, '')));
    }
} // end: on load
function phonetic_module(mID,lng,title,desc,lcode,tcode,tsafe) {
    var iDiv = document.createElement('section');
    iDiv.id = mID;
    iDiv.className = 'ScriptModule module';
    var iClose = document.createElement('a');
    iClose.style.float = 'right';
    iClose.style.fontSize = '160%';
    iClose.style.textDecoration = 'none';
    iClose.innerHTML = '×';
    iClose.href = 'javascript:closeModul("'+lng+'")';
    iDiv.appendChild(iClose);
    var iHead = document.createElement('h2');
    iHead.style.margin = '0';
    iHead.innerHTML = title;
    iDiv.appendChild(iHead);
    var iDesc = document.createElement('p');
    iDesc.style.marginBottom = '25px';
    iDesc.innerHTML = desc;
    iDiv.appendChild(iDesc);
    var iUL = document.createElement('ul');
 
    /* IPA */
    var iA = document.createElement('a');
    iA.id = lcode+'IPA';
    iA.className = 'wikia-button active ipa-button';
    iA.style.float = 'left';
    iA.innerHTML = '[ˈɪ.p̪ɑː]';
    iA.href = 'javascript:findScript("'+lng+'","IPA",1)';
    iUL.appendChild(iA);
    var iA = document.createElement('a');
    iA.id = lcode+'IPAs';
    iA.className = 'wikia-button secondary ipa-button';
    iA.style.float = 'left';
    iA.innerHTML = '/ipaː/';
    iA.href = 'javascript:findScript("'+lng+'","IPAs",1)';
    iUL.appendChild(iA);
    /* IEP */
    if (lang == 'de' || lang == 'hu' || lang == 'sv') {
        var iA = document.createElement('a');
        iA.id = lcode+'IEP2';
        iA.className = 'wikia-button secondary ipa-button';
        iA.style.float = 'left';
        iA.innerHTML = 'IEP<sub><sub> '+lang.toUpperCase()+'</sub></sub>';
        iA.href = 'javascript:findScript("'+lng+'","IEP2",1)';
        iUL.appendChild(iA);
        var iA = document.createElement('a');
        iA.id = lcode+'IEP';
        iA.className = 'wikia-button secondary ipa-button';
        iA.style.float = 'left';
        iA.innerHTML = 'IEP<sub><sub> EN</sub></sub>';
        iA.href = 'javascript:findScript("'+lng+'","IEP",1)';
        iUL.appendChild(iA);
    } else {
        var iA = document.createElement('a');
        iA.id = lcode+'IEP';
        iA.className = 'wikia-button secondary ipa-button';
        iA.style.float = 'left';
        iA.innerHTML = 'IEP';
        iA.href = 'javascript:findScript("'+lng+'","IEP",1)';
        iUL.appendChild(iA);
    }
 
    for(i=0;i<tcode.length;i+=1) {
        var iA = document.createElement('a');
        iA.id = lcode+tsafe[i];
        iA.className = 'wikia-button secondary ipa-button';
        iA.style.float = 'left';
        iA.innerHTML = tcode[i];
        iA.href = 'javascript:findScript("'+lng+'","'+tsafe[i]+'",1)';
        iUL.appendChild(iA);
    }
    iDiv.appendChild(iUL);
    var w_rail = document.getElementsByClassName('wikia-rail-inner');
    w_rail[0].prepend(iDiv,w_rail[0].childNodes[0]);
}
function format_time(s_time) {
    times = s_time.split(":");
    hours = 24;
    h_lead = 1;
    seprt = ":";
    ext = "";
    ext2 = 1;
    ampm = ["",""];
    var result = "";
    if (reg == 'US' || reg == 'VI' || reg == 'AU' || reg == 'NZ' || reg == 'CA' || reg == 'PK' || reg == 'AM' || reg == 'ZA' || reg == 'PS' || reg == 'DJ' || reg == 'ER' || reg == 'IL' || reg == 'KM' || reg == 'MR' || reg == 'SO' || reg == 'SD' || reg == 'SS' || reg == 'TD' || reg == 'SG' || reg == 'TW' || lang == 'ur' || lang == 'sw' || lang == 'zu') {
        hours = 12;
        h_lead = 0;
        ampm = [" AM"," PM"];
    } else if (reg == 'BN' || reg == 'FI' || reg == 'ID' || reg == 'NO' || reg == 'RS') {
        seprt = ".";
    } else if (reg == 'BA' || reg == 'BG' || reg == 'DZ' || reg == 'MA' || reg == 'TN') {
        h_lead = 0;
    } else if (reg == 'AR' || reg == 'BO' || reg == 'CO' || reg == 'CR' || reg == 'DO' || reg == 'SV' || reg== 'GT' || reg == 'HN' || reg == 'CU' || reg == 'NI' || reg == 'PA' || reg == 'PY' || reg == 'PE' || reg == 'PR' || reg == 'VE') {
        hours = 12;
        h_lead = 0;
        ampm = [" a. m."," p. m."];
    } else if (reg == 'MX') {
        hours = 12;
        h_lead = 1;
        ampm = [" a. m."," p. m."];
    }
    if (hours == 12) {
        if (times[0] > 12) {
            times[0] -= 12;
            ext = ampm[1];
        } else {
            ext = ampm[0];
        }
        if (times[0] == 0) {
            times[0] = 12;
        }
    }
    for (j = 0; j < times.length; j++) {
        result += leadzero(parseInt(times[j],10),h_lead+j);
        if (j+1 < times.length) {
            result += seprt;
        }
    }
    if (ext2) {
        return result+ext;
    } else {
        return ext+result;
    }
}
function format_number(s_number) {
    var value = String(parseFloat(s_number)).split('.');
    sepP = " ";
    sepS = " ";
    dec = ",";
    sizeP = 3;
    sizeS = 3;
 
    if (reg == 'US' || reg == 'GB' || lang == 'ar' || reg == 'BA' || reg == 'GR'  || reg == 'TH' || reg == 'bs' || reg == 'el'  || reg == 'th') { // 1,000,000.00
        sepP = ",";
        sepS = ",";
        dec = ".";
    } else if (reg == 'CA') { // Canada - 1 000 000.00
        dec = ".";
    } else if (reg == 'DE' || reg == 'de') { // German - 1 000.000,00
        sepP = ".";
    } else if (reg == 'DK' || reg == 'ID' || reg == 'IS' || reg == 'IT' || reg == 'NO' || reg == 'ES' || reg == 'da' || reg == 'id' || reg == 'is' || reg == 'it' || reg == 'no' || reg == 'es') { // 1.000.000,00
        sepP = ".";
        sepS = ".";
    } else if (reg == 'JA' || reg == 'HI' || reg == 'ja' || lang == 'zh' || reg == 'hi') { // China/Japan - 10,00,000.00
        sepP = ",";
        sepS = ",";
        dec = ".";
        sizeS = 2;
    } else { // Non-listed/Other - 1 000 000,00
        // no change
    }
 
    output = "";
    for(j=0;j<value[0].length;j++) {
        if (j != 0) {
        if (value[0].length-j == sizeP) {
            output = output+sepP;
        } else if ((value[0].length-j-sizeP)%sizeS == 0 && value[0].length-j-sizeP > 0) {
            output = output+sepS;
        }
        }
        output = output+value[0].substr(j,1);
    }
    if (value.length > 1) {
        output = output+dec+value[1];
    }
    return output;
}
function getCookie(cname) { /* GET COOKIE, w3schools */
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function leadzero(m,t) {
    if (parseInt(m,10) < 10 && t) {
        return "0"+m;
    } else {
        return ""+m;
    }
}
function closeModul(lng) {
    if (lng == "Latin") {
        document.cookie="latin_close=true";
        document.getElementById('LatinPhonetic').style.display='none'
    } else if (lng == "Georgian") {
        document.cookie="georgian_close=true";
        document.getElementById('GeorgianPhonetic').style.display='none'
    } else if (lng == "Japanese") {
        document.cookie="japanese_close=true";
        document.getElementById('JapanesePhonetic').style.display='none'
    } else if (lng == "Korean") {
        document.cookie="korean_close=true";
        document.getElementById('KoreanPhonetic').style.display='none'
    } else if (lng == "Russian") {
        document.cookie="russian_close=true";
        document.getElementById('RussianPhonetic').style.display='none'
    }  else if (lng == "Cantonese") {
        document.cookie="cantonese_close=true";
        document.getElementById('CantonesePhonetic').style.display='none'
    } else if (lng == "Mandarin") {
        document.cookie="mandarin_close=true";
        document.getElementById('MandarinPhonetic').style.display='none'
    } else if (lng == "Serbian") {
        document.cookie="serbian_close=true";
        document.getElementById('SerbianScript').style.display='none'
    } else if (lng == "Azeri") {
        document.cookie="azeri_close=true";
        document.getElementById('AzeriScript').style.display='none'
    } else if (lng == "Kazakh") {
        document.cookie="kazakh_close=true";
        document.getElementById('KazakhScript').style.display='none'
    } else if (lng == "Arabic") {
        document.cookie="arabic_close=true";
        document.getElementById('ArabicPhonetic').style.display='none'
    }
}
function findScript(lng,scpt,updt) {
    if (lng == "Latin") {
        if (scpt != "IPA") {
            document.cookie="latin="+scpt;
            if (!updt) {
                var textt = document.getElementsByClassName('ipa_latin');
                for (var i = 0; i < textt.length; i++) {
                    textt[i].innerHTML = swapScript(textt[i].innerHTML,"Latin",scpt,"title");
                }
            }
            document.getElementById('laIPA').className = 'wikia-button secondary ipa-button';
            if (scpt == "IPAs") {
                document.getElementById('laIPAs').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP") {
                document.getElementById('laIEP').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP2") {
                document.getElementById('laIEP2').className = 'wikia-button active ipa-button';
            }
        } else {
            document.cookie="latin=";
        }
    } else if (lng == "Georgian") {
        if (scpt != "IPA") {
            document.cookie="georgian="+scpt;
            if (!updt) {
                var textt = document.getElementsByClassName('ipa_georgian');
                for (var i = 0; i < textt.length; i++) {
                    if (textt[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.className == "portable-infobox pi-background pi-theme-lyrics pi-layout-default") {
                        tpe = "text";
                    } else {
                        tpe = "title";
                    }
                    textt[i].innerHTML = swapScript(textt[i].innerHTML,"Georgian",scpt,tpe);
                }
            }
            document.getElementById('kaIPA').className = 'wikia-button secondary ipa-button';
            if (scpt == "IPAs") {
                document.getElementById('kaIPAs').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP") {
                document.getElementById('kaIEP').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP2") {
                document.getElementById('kaIEP2').className = 'wikia-button active ipa-button';
            } else  if (scpt == "Romanised") {
                document.getElementById('kaRomanised').className = 'wikia-button active ipa-button';
            }
        } else {
            document.cookie="georgian=";
        }
    } else if (lng == "Japanese") {
        if (scpt != "IPA") {
            document.cookie="japanese="+scpt;
            if (!updt) {
                var textt = document.getElementsByClassName('ipa_japanese');
                for (var i = 0; i < textt.length; i++) {
                    if (textt[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.className == "portable-infobox pi-background pi-theme-lyrics pi-layout-default") {
                        tpe = "text";
                    } else {
                        tpe = "title";
                    }
                    textt[i].innerHTML = swapScript(textt[i].innerHTML,"Japanese",scpt,tpe);
                }
            }
            document.getElementById('jaIPA').className = 'wikia-button secondary ipa-button';
            if (scpt == "IPAs") {
                document.getElementById('jaIPAs').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP") {
                document.getElementById('jaIEP').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP2") {
                document.getElementById('jaIEP2').className = 'wikia-button active ipa-button';
            } else  if (scpt == "Romaji") {
                document.getElementById('jaRomaji').className = 'wikia-button active ipa-button';
            }
        } else {
            document.cookie="japanese=";
        }
    } else if (lng == "Korean") {
        if (scpt != "IPA") {
            document.cookie="korean="+scpt;
            if (!updt) {
                var textt = document.getElementsByClassName('ipa_hangul');
                for (var i = 0; i < textt.length; i++) {
                    textt[i].innerHTML = swapScript(textt[i].innerHTML,"Korean",scpt,"title");
                }
            }
            document.getElementById('koIPA').className = 'wikia-button secondary ipa-button';
            if (scpt == "IPAs") {
                document.getElementById('koIPAs').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP") {
                document.getElementById('koIEP').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP2") {
                document.getElementById('koIEP2').className = 'wikia-button active ipa-button';
            } else if (scpt == "RR") {
                document.getElementById('koRR').className = 'wikia-button active ipa-button';
            } else if (scpt == "McC-Rsr") {
                document.getElementById('koMcC-Rsr').className = 'wikia-button active ipa-button';
            } else if (scpt == "Yale") {
                document.getElementById('koYale').className = 'wikia-button active ipa-button';
            }
        } else {
            document.cookie="korean=";
        }
    } else if (lng == "Russian") {
        if (scpt != "IPA") {
            document.cookie="russian="+scpt;
            if (!updt) {
                var textt = document.getElementsByClassName('ipa_russian');
                for (var i = 0; i < textt.length; i++) {
                    if (textt[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.className == "portable-infobox pi-background pi-theme-lyrics pi-layout-default") {
                        tpe = "text";
                    } else {
                        tpe = "title";
                    }
                    textt[i].innerHTML = swapScript(textt[i].innerHTML,"Russian",scpt,tpe);
                }
            }
            document.getElementById('ruIPA').className = 'wikia-button secondary ipa-button';
            if (scpt == "IPAs") {
                document.getElementById('ruIPAs').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP") {
                document.getElementById('ruIEP').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP2") {
                document.getElementById('ruIEP2').className = 'wikia-button active ipa-button';
            } else  if (scpt == "Romanised") {
                document.getElementById('ruRomanised').className = 'wikia-button active ipa-button';
            }
        } else {
            document.cookie="russian=";
        }
    } else if (lng == "Cantonese") {
        if (scpt != "IPA") {
            document.cookie="cantonese="+scpt;
            if (!updt) {
                var textt = document.getElementsByClassName('ipa_cantonese');
                for (var i = 0; i < textt.length; i++) {
                    textt[i].innerHTML = swapScript(textt[i].innerHTML,"Cantonese",scpt,"title");
                }
            }
            document.getElementById('hkIPA').className = 'wikia-button secondary ipa-button';
            if (scpt == "IPAs") {
                document.getElementById('hkIPAs').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP") {
                document.getElementById('hkIEP').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP2") {
                document.getElementById('hkIEP2').className = 'wikia-button active ipa-button';
            } else if (scpt == "Jyutping") {
                document.getElementById('hkJyutping').className = 'wikia-button active ipa-button';
            } else if (scpt == "Yale") {
                document.getElementById('hkYale').className = 'wikia-button active ipa-button';
            } else if (scpt == "Pinyin") {
                document.getElementById('hkPinyin').className = 'wikia-button active ipa-button';
            } else if (scpt == "Guangdong") {
                document.getElementById('hkGuangdong').className = 'wikia-button active ipa-button';
            } else if (scpt == "BarnettChao") {
                document.getElementById('hkBarnettChao').className = 'wikia-button active ipa-button';
            }
        } else {
            document.cookie="cantonese=";
        }
    } else if (lng == "Mandarin") {
        if (scpt != "IPA") {
            document.cookie="mandarin="+scpt;
            if (!updt) {
                var textt = document.getElementsByClassName('ipa_mandarin');
                for (var i = 0; i < textt.length; i++) {
                    textt[i].innerHTML = swapScript(textt[i].innerHTML,"Mandarin",scpt,"title");
                }
            }
            document.getElementById('zhIPA').className = 'wikia-button secondary ipa-button';
            if (scpt == "IPAs") {
                document.getElementById('zhIPAs').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP") {
                document.getElementById('zhIEP').className = 'wikia-button active ipa-button';
            } else if (scpt == "IEP2") {
                document.getElementById('zhIEP2').className = 'wikia-button active ipa-button';
            } else if (scpt == "Pinyin") {
                document.getElementById('zhPinyin').className = 'wikia-button active ipa-button';
            } else if (scpt == "Zhuyin") {
                document.getElementById('zhZhuyin').className = 'wikia-button active ipa-button';
            } else if (scpt == "WadeGiles") {
                document.getElementById('zhWadeGiles').className = 'wikia-button active ipa-button';
            } else if (scpt == "Gwoyeu") {
                document.getElementById('zhGwoyeu').className = 'wikia-button active ipa-button';
            }
        } else {
            document.cookie="mandarin=";
        }
    } else if (lng == "Serbian") {
        if (scpt != "Default") {
            document.cookie="serbian="+scpt;
            if (!updt) {
                var text_serbian = document.getElementsByClassName('serbian');
                for (var i = 0; i < text_serbian.length; i++) {
                    text_serbian[i].innerHTML = swapScript(text_serbian[i].innerHTML,"Serbian",scpt);
                }
                var text_serbian_reverse = document.getElementsByClassName('serbian-reverse');
                for (var i = 0; i < text_serbian_reverse.length; i++) {
                    if (scpt == "Cyrillic") {
                        text_serbian_reverse[i].innerHTML = swapScript(text_serbian[i].innerHTML,"Serbian","Latin","title");
                    } else {
                        text_serbian_reverse[i].innerHTML = swapScript(text_serbian[i].innerHTML,"Serbian","Cyrillic","title");
                    }
                }
                if (scpt == "Cyrillic") {
                    document.getElementById('rsDefault').className = '';
                    document.getElementById('rsLatin').className = '';
                    document.getElementById('rsCyrillic').className = 'link_active';
                } else if (scpt == "Latin") {
                    document.getElementById('rsDefault').className = '';
                    document.getElementById('rsLatin').className = 'link_active';
                    document.getElementById('rsCyrillic').className = '';
                }
            }
        } else {
            document.cookie="serbian=";
        }
    } else if (lng == "Azeri") {
        if (scpt != "Default") {
            document.cookie="azeri="+scpt;
            if (!updt) {
                var text_azeri = document.getElementsByClassName('azeri');
                for (var i = 0; i < text_azeri.length; i++) {
                    text_azeri[i].innerHTML = swapScript(text_azeri[i].innerHTML,"Azeri",scpt);
                }
                var text_azeri_reverse = document.getElementsByClassName('azeri-reverse');
                for (var i = 0; i < text_azeri_reverse.length; i++) {
                    if (scpt == "Cyrillic" || scpt == "Arabic") {
                        text_azeri_reverse[i].innerHTML = swapScript(text_serbian[i].innerHTML,"Azeri","Latin","title");
                    } else {
                        text_azeri_reverse[i].innerHTML = swapScript(text_serbian[i].innerHTML,"Azeri","Cyrillic","title");
                    }
                }
                if (scpt == "Latin") {
                    document.getElementById('azDefault').className = '';
                    document.getElementById('azLatin').className = 'link_active';
                    document.getElementById('azCyrillic').className = '';
                    document.getElementById('azArabic').className = '';
                } else if (scpt == "Cyrillic") {
                    document.getElementById('azDefault').className = '';
                    document.getElementById('azLatin').className = '';
                    document.getElementById('azCyrillic').className = 'link_active';
                    document.getElementById('azArabic').className = '';
                } else if (scpt == "Arabic") {
                    document.getElementById('azDefault').className = '';
                    document.getElementById('azLatin').className = '';
                    document.getElementById('azCyrillic').className = '';
                    document.getElementById('azArabic').className = 'link_active';
                }
            }
        } else {
            document.cookie="azeri=";
        }
    } else if (lng == "Kazakh") {
        if (scpt != "Default") {
            document.cookie="kazakh="+scpt;
            if (!updt) {
                var text_kazakh = document.getElementsByClassName('kazakh');
                for (var i = 0; i < text_kazakh.length; i++) {
                    text_kazakh[i].innerHTML = swapScript(text_kazakh[i].innerHTML,"Kazakh",scpt);
                }
                var text_kazakh_reverse = document.getElementsByClassName('kazakh-reverse');
                for (var i = 0; i < text_kazakh_reverse.length; i++) {
                    if (scpt == "Cyrillic") {
                        text_kazakh_reverse[i].innerHTML = swapScript(text_kazakh[i].innerHTML,"Kazakh","Latin","title");
                    } else {
                        text_kazakh_reverse[i].innerHTML = swapScript(text_kazakh[i].innerHTML,"Kazakh","Cyrillic","title");
                    }
                }
                if (scpt == "Cyrillic") {
                    document.getElementById('rsDefault').className = '';
                    document.getElementById('rsLatin').className = '';
                    document.getElementById('rsCyrillic').className = 'link_active';
                } else if (scpt == "Latin") {
                    document.getElementById('rsDefault').className = '';
                    document.getElementById('rsLatin').className = 'link_active';
                    document.getElementById('rsCyrillic').className = '';
                }
            }
        } else {
            document.cookie="kazakh=";
        }
    } else if (lng == "Arabic") {
        if (scpt != "ISO 233") {
            document.cookie="arabic="+scpt;
            if (!updt) {
                var text_arabic = document.getElementsByClassName('ar_phonetic');
                for (var i = 0; i < text_arabic.length; i++) {
                    text_arabic[i].innerHTML = swapScript(text_arabic[i].innerHTML,"Arabic",scpt,"title");
                }
                if (!updt) {
                    document.getElementById('arISO233').className = '';
                    if (scpt == "ALA-LC") {
                        document.getElementById('arALA-LC').className = 'link_active';
                    } else if (scpt == "Wehr") {
                        document.getElementById('arWehr').className = 'link_active';
                    } else if (scpt == "DIN") {
                        document.getElementById('arDIN').className = 'link_active';
                    } else if (scpt == "UNGEGN") {
                        document.getElementById('arUNGEGN').className = 'link_active';
                    } else if (scpt == "SAS") {
                        document.getElementById('arSAS').className = 'link_active';
                    } else if (scpt == "BATR") {
                        document.getElementById('arBATR').className = 'link_active';
                    } else if (scpt == "Google") {
                        document.getElementById('arGoogle').className = 'link_active';
                    }
                }
            }
        } else {
            document.cookie="arabic=";
        }
    }
    if (updt) {
        location.reload();
    }
}
function swapScript(inpt,lng,scpt,tpe) {
    if (scpt != "IPA" || scpt != "IPAs") {
        inpt = inpt.replace(/ɡ/g, 'g');
    }
    if (scpt == "IPAs") {
        /* replace brackets */
        inpt = inpt.replace(/[\u0028\u0029]/g, '')
            .replace(/[\u005B\u005D]/g, '/')
            .replace(/[\u002E\u0300\u0301\u0302\u030C\u0316\u0317\u032C\u032D\u0340\u0341\u1DC4\u1DC5\u1DC6\u1DC7\u1DC8\u1DC9]/g, '')
            .replace(/ˑ/g, 'ː')
            .replace(/[áàâäã]/g, 'a')
            .replace(/[éèêëẽ]/g, 'e')
            .replace(/[íìîïĩ]/g, 'i')
            .replace(/[óòôöõ]/g, 'o')
            .replace(/[úùûüũ]/g, 'u')
            .replace(/[ýỳŷÿ]/g, 'y')
            .replace(/(ɯ̽|ω)/g, 'ʊ')
            .replace(/(ɯᵝ|ɯ)/g, 'u')
            .replace(/ɚ/g, 'ər')
            .replace(/ɝ/g, 'ɜr')
            .replace(/l̩/g, 'əl')
            .replace(/m̩/g, 'əm')
            .replace(/n̩/g, 'ən')
            .replace(/r̩/g, 'ər')
.replace(/[ˈˌ˥˦˧˨˩↗↘ʰʲʷᵝᵞˀˁ⁰¹²³⁴⁵⁶⁻\u0303\u0304\u0306\u0308\u030B\u030D\u030F\u0311\u0318\u0319\u031A\u031C\u031D\u031E\u031F\u0320\u0324\u0329\u032A\u032B\u032E\u032F\u0330\u0331\u0339\u033A\u033B\u033C\u033D\u033E\u0342\u0346\u0347\u0348\u0349\u034A\u034B\u034C\u034D\u034E\u0350\u0351\u0353\u0354\u0355\u0356\u0357\u035C\u035D\u035E\u035F\u0360\u0361\u0362\u1DC0\u1DC1\u1DC2\u1DC3\u1DCA\u1DFE\u1DFF]/g, '')
            .replace(/ɪ/g, 'i')
            .replace(/ɴ/g, 'ŋ')
            .replace(/ɢ/g, 'g')
            .replace(/q/g, 'k')
            .replace(/[ⱱʋ]/g, 'v')
            .replace(/ʈ/g, 't')
            .replace(/ɖ/g, 'd')
            .replace(/ɱ/g, 'm')
            .replace(/[ʂɕ]/g, 'ʃ')
            .replace(/[ʐʑ]/g, 'ʒ')
            .replace(/[ɹɺɽɻ]/g, 'r')
            .replace(/[ʟɭ]/g, 'l')
            .replace(/q/g, 'k')
            .replace(/χ/g, 'x')
            .replace(/[ɟʝ]/g, 'j')
            .replace(/[ʁɰ]/g, 'ɣ')
            .replace(/ɸ/g, 'f')
            .replace(/[ʙβ]/g, 'b');
        return inpt;
    } else if (scpt == "IEP" || scpt == "IEP2") {
        /* remove brackets */
        inpt = inpt.replace(/[\u0028\u0029\u005B\u005D]/g, '');
        /* full words */
        if (scpt == "IEP2" && lang == 'de') {
            inpt = inpt.replace(/(^|\s)[dð][iɨïɪ]($|\s)/g, function(txt){return txt.replace(/[dð][iɨïɪ]/,'die');});
        } else if (scpt == "IEP2" && lang == 'hu') {
 
        } else if (scpt == "IEP2" && lang == 'sv') {
            inpt = inpt.replace(/(^|\s)(o̞|ɔ|ɔ̝)k($|\s)/g, function(txt){return txt.replace(/(o̞|ɔ|ɔ̝)k/,'och');});
        } else {
            inpt = inpt.replace(/(^|\s)[θð][iɨïɪə]($|\s)/g, function(txt){return txt.replace(/[θð][iɨïɪə]/,'the');});
        }
        /* vowel replacement */
        if (scpt == "IEP2" && lang == 'de') {
            inpt = inpt.replace(/(i|ĩ|ɨ|ï|ɯ̈|ɪ|i̽|ɪ̈|ɨ̞)/g, 'i')
            .replace(/[aeiou]i̯/g, function(txt){return txt.replace(/i̯/,'j');})
            .replace(/(ɒ̈|ɶ̈|ɶ̠|ɑ|ɒ|a|ã|ɐ|æ̈|ɜ̞|ɐ̹|ɞ̞|ɔ̞̈|ä|a̠|ɑ̈|ɐ̞)/g, 'a')
            .replace(/[e|ẽ|ɜ]/g, 'e')
            .replace(/(ɛ|æ|ɛ̈)/g, 'ä')
            .replace(/[ɝɚ]/g, 'ör')
            .replace(/(ə|ø|œ|ɶ|ɘ|ë|ɤ̈|ö|ɞ|ɔ̈|ʌ)/g, 'ö')
            .replace(/(o|õ|o̞|ɔ|ɔ̝)/g, 'o')
            .replace(/(ɯ|u|ũ|ʊ|u̽|ɯ̽|ɯ̞̈|ʊ̜|ω)/g, 'u')
            .replace(/(ʉ|ü|ʊ̈|ɵ|ʉ̞|ɵ̞|ə̹|ɞ̝|ɤ|ɤ̞|ʌ̝|ʏ|y̽|y)/g, 'ü');
        } else if (scpt == "IEP2" && lang == 'hu') {
            inpt = inpt.replace(/(i|ĩ|ɨ|ï|ɯ̈|ɪ|i̽|ɪ̈|ɨ̞)ː/g, 'í')
            .replace(/(i|ĩ|ɨ|ï|ɯ̈|ɪ|i̽|ɪ̈|ɨ̞)/g, 'i')
            .replace(/[aeiou]i̯/g, function(txt){return txt.replace(/i̯/,'j');})
            .replace(/(a|ã|ɐ|æ̈|ɜ̞|ɐ̹|ɞ̞|ɔ̞̈|ä|a̠|ɑ̈|ɐ̞)/g, 'á')
            .replace(/(ɒ̈|ɶ̈|ɶ̠|ɑ|ɒ)/g, 'a')
            .replace(/(e|ẽ)/g, 'é')
            .replace(/(ɛ|æ|ɜ|ɛ̈)/g, 'e')
            .replace(/[ɝɚ]/g, 'ör')
            .replace(/(ə|ø|œ|ɶ|ɘ|ë|ɤ̈|ö|ɞ|ɔ̈|ʌ)ː/g, 'ő')
            .replace(/(ə|ø|œ|ɶ|ɘ|ë|ɤ̈|ö|ɞ|ɔ̈|ʌ)/g, 'ö')
            .replace(/(o|õ|o̞|ɔ|ɔ̝|ʊ|u̽|ɯ̽|ɯ̞̈|ʊ̜|ω)ː/g, 'ó')
            .replace(/(o|õ|o̞|ɔ|ɔ̝|ʊ|u̽|ɯ̽|ɯ̞̈|ʊ̜|ω)/g, 'o')
            .replace(/(ɯ|u|ũ)ː/g, 'ú')
            .replace(/(ɯ|u|ũ)/g, 'u')
            .replace(/(ʉ|ü|ʊ̈|ɵ|ʉ̞|ɵ̞|ə̹|ɞ̝|ɤ|ɤ̞|ʌ̝|ʏ|y̽|y)ː/g, 'ű')
            .replace(/(ʉ|ü|ʊ̈|ɵ|ʉ̞|ɵ̞|ə̹|ɞ̝|ɤ|ɤ̞|ʌ̝|ʏ|y̽|y)/g, 'ü')
            .replace(/ii/g, 'í')
            .replace(/öö/g, 'ő')
            .replace(/oo/g, 'ó')
            .replace(/üü/g, 'ű')
            .replace(/uu/g, 'ú');
        } else if (scpt == "IEP2" && lang == 'sv') {
            inpt = inpt.replace(/(i|ĩ|ɨ|ï|ɯ̈)/g, 'i')
            .replace(/(ɪ|i̽|ɪ̈|ɨ̞)/g, 'ï')
            .replace(/[aeiou]i̯/g, function(txt){return txt.replace(/i̯/,'j');})
            .replace(/(a|ã|ɐ|æ̈|ɜ̞|ɐ̹|ɞ̞|ɔ̞̈|ä|a̠|ɑ̈|ɐ̞|ʌ)/g, 'ȧ') // short a
            .replace(/(ɒ̈|ɶ̈|ɶ̠|ɑ)/g, 'a') // long a
            .replace(/(e|ẽ)/g, 'é') // long e
            .replace(/(ɛ|æ|ɜ|ɛ̈)ː/g, 'ä') // long ä
            .replace(/(^|\s)ɛ($|\s)/g, function(txt){return txt.replace(/ɛ/,'ä');}) // short e (solo)
            .replace(/ɛ/g, 'ė') // short e
            .replace(/(æ|ɜ|ɛ̈)/g, 'â') // short ä
            .replace(/[ɝɚ]/g, 'ör')
            .replace(/(ə|ø|œ|ɶ|ɘ|ë|ɤ̈|ö|ɞ|ɔ̈)/g, 'ö')
            .replace(/(ɒ|ɔ)/g, 'ã') // short å
            .replace(/(o|õ|o̞|ɔ̝)/g, 'å') // long å
            .replace(/(ʊ|u̽|ɯ̽|ɯ̞̈|ʊ̜|ω)/g, 'ȯ') // short o
            .replace(/(ɯ|u|ũ)/g, 'o') // long o
            .replace(/(ʉ|ü|ʊ̈|ʉ̞|ɤː|ɤ̞ː|ʌ̝ː)/g, 'u') // long u
            .replace(/(ɵ|ɵ̞|ə̹|ɞ̝|ɤ|ɤ̞|ʌ̝)/g, 'ú') // short u
            .replace(/(ʏ|y̽)/g, 'ẏ')
            .replace(/[öåã]ȯ/g, 'ã')
            .replace(/[öåã]o/g, 'å');
        } else {
            inpt = inpt.replace(/ãä/g, 'a').replace(/ẽ/g, 'e').replace(/ĩ/g, 'i').replace(/õ/g, 'o').replace(/ũ/g, 'u')
            .replace(/[iɨïɪ]ː/g, 'ee')
            .replace(/[iɨïɪ]/g, 'i')
            .replace(/[dɖhħɦʜ]aʊ/g, function(txt){return txt.replace(/aʊ/,'ow');})
            .replace(/aʊ/g, 'o7')
            .replace(/oʊ\S($|\s)/g, function(txt){return txt.replace(/oʊ/,'o')+'e';})
            .replace(/oʊ/g, 'o')
            .replace(/əʊ/g, 'o')
            .replace(/ei/g, 'ej')
            .replace(/(^|\s)ə/g, function(txt){return txt.replace(/ə/,'a');})
            .replace(/ə($|\s)/g, function(txt){return txt.replace(/ə/,'a');})
            .replace(/ə[sz]($|\s)/g, function(txt){return txt.replace(/ə/,'a');})
            .replace(/(ɜ|ə|ɛ)/g, 'e')
            .replace(/[ωɤʊ]/g, 'oo')
            .replace(/uː/g, 'oo')
            .replace(/(ɝ|ɚ)/g, 'er')
            .replace(/(ø|ɛ̈|ɘ|ë|ɤ̈|ɵ|ö)/g, 'œ')
            .replace(/[ɐæ]/g, 'a')
            .replace(/[ɞʌɯ]/g, 'y')
            .replace(/ɔ[rɾɽɹɻɺ]($|\s)/g, function(txt){return txt.replace(/ɔ[rɾɽɹɻɺ]/,'ore');})
            .replace(/ɔ/g, 'ou')
            .replace(/[ɒɑ]/g, 'o')
            .replace(/[ʉüyʏ]/g, 'ü')
 
            .replace(/7/g, 'u')
 
            .replace(/(ɞ̝|æ̈|ɜ̞|ɞ̞|ɔ̞̈|æ̞|ɶ̈|ɶ̠)/g, 'a')
            .replace(/ʌ̝/g, 'oo')
            .replace(/ɔ̝/g, 'o')
            .replace(/ɔ̈/g, 'u')
            .replace(/[aeiou]i̯/g, function(txt){return txt.replace(/i̯/,'j');})
            .replace(/[aeiou]ʊ̯/g, function(txt){return txt.replace(/ʊ̯/,'w');});
        }
        /* diacritics shifting sounds */
        inpt = inpt.replace(/ʔ̞/g, 'h')
            .replace(/ɢ̆/g, 'gh')
            .replace(/ɭ̆/g, 'r')
            .replace(/ʎ̮/g, 'y') // j
            .replace(/ʟ̆/g, 'w')
            .replace(/r̝̊/g, 'sh')
            .replace(/ɡ̊/g, 'k')
            .replace(/w̥/g, 'hw')
            .replace(/u̯/g, 'w')
            .replace(/kʷ/g, 'g');
        /* remove diacritics and superscript characters */
        inpt = inpt.replace(/[¹²³⁴⁵⁶⁰ʰʲʷᵝᵞˀˁːˈˌ⁻ʼ\u02DE\u02E5\u02E6\u02E7\u02E8\u02E9\u0303\u0308\u030A\u031A\u031C\u031D\u031E\u031F\u0320\u0325\u0329\u032A\u032C\u032F\u0339\u033C\u033D\u0361]/g, '');
        /* character combinations */
        if (scpt == "IEP2" && lang == 'de') {
            inpt = inpt.replace(/\Sts/g, function(txt){return txt.replace(/ts/,'tz');})
            .replace(/ts/g, 'z')
            .replace(/(ɟʝ|[ɟʄ])/g, 'gj')
            .replace(/(cç|[cȶ])/g, 'ch')
            .replace(/[ʃʂɕç]/g, 'sch')
            .replace(/[xχɧ]/g, 'ch')
            .replace(/[ʒʐʑʝ]/g, 'j')
            .replace(/θ/g, 'f')
            .replace(/ð/g, 'd')
            .replace(/z/g, 's')
            .replace(/ʈ/g, 't')
            .replace(/ɖ/g, 'd')
            .replace(/ɳ/g, 'n')
            .replace(/ɭ/g, 'l')
            .replace(/ɲ/g, 'nj')
            .replace(/[βⱱʙʋɰɥ]/g, 'v')
            .replace(/ks/g, 'x');
        } else if (scpt == "IEP2" && lang == 'hu') {
            inpt = inpt.replace(/s/g, 'sz')
            .replace(/[ʃʂɕç]/g, 's')
            .replace(/[xχɧ]/g, 'hh')
            .replace(/[ʒʐʑʝ]/g, 'zs')
            .replace(/θ/g, 'f')
            .replace(/ð/g, 'd')
            .replace(/ʈ/g, 't')
            .replace(/ɖ/g, 'd')
            .replace(/ɳ/g, 'n')
            .replace(/ɭ/g, 'l')
            .replace(/ɲ/g, 'ny')
            .replace(/(ɟʝ|[ɟʄ])/g, 'gy')
            .replace(/(cç|[cȶ])/g, 'ty')
            .replace(/ts/g, 'cs')
            .replace(/[βⱱʙʋɰɥ]/g, 'v');
        } else if (scpt == "IEP2" && lang == 'sv') {
            inpt = inpt.replace(/(ɟʝ|[ɟʄ])/g, 'gj')
            .replace(/(cç|[cȶ])/g, 'tj')
            .replace(/[ʃʂɕç]/g, 'sch')
            .replace(/[xχɧ]/g, 'sk')
            .replace(/[ʒʐʑʝ]/g, 'j')
            .replace(/θ/g, 'f')
            .replace(/ð/g, 'd')
            .replace(/z/g, 's')
            .replace(/\Sʈ/g, function(txt){return txt.replace(/ʈ/,'rt');})
            .replace(/ʈ/g, 't')
            .replace(/\Sɖ/g, function(txt){return txt.replace(/ɖ/,'rd');})
            .replace(/ɖ/g, 'd')
            .replace(/\Sɳ/g, function(txt){return txt.replace(/ɳ/,'rn');})
            .replace(/ɳ/g, 'n')
            .replace(/\Sɭ/g, function(txt){return txt.replace(/ɭ/,'rl');})
            .replace(/ɭ/g, 'l')
            .replace(/ɲ/g, 'nj')
            .replace(/[βⱱʙʋɰɥ]/g, 'v');
        } else {
            inpt = inpt.replace(/j\S/g, function(txt){return txt.replace(/j/,'y');})
            .replace(/(ɟʝ|[ɟʄ])/g, 'dj')
            .replace(/(cç|[cȶ])/g, 'ch')
            .replace(/\S[cȶtʈ][ʃʂɕç]/g, function(txt){return txt.replace(/[cȶtʈ][ʃʂɕç]/,'tch');})
            .replace(/[cȶtʈ][ʃʂɕç]/g, 'ch')
            .replace(/[dɖ][ʒʐʑʝ]/g, 'j')
            .replace(/[θð]/g, 'th')
            .replace(/[ʃʂɕç]/g, 'sh')
            .replace(/[xχɧ]/g, 'kh')
            .replace(/[ʒʐʑʝ]/g, 'zj')
            .replace(/ʈ/g, 't')
            .replace(/ɖ/g, 'd')
            .replace(/ɳ/g, 'n')
            .replace(/ɭ/g, 'l')
            .replace(/ɲ/g, 'nj')
            .replace(/[βⱱʙ]/g, 'v')
            .replace(/[ʋɰɥ]/g, 'w')
            .replace(/ks\S/g, function(txt){return txt.replace(/ks/,'x');})
        }
        inpt = inpt.replace(/[rɾɽɹɻɺ][rɾɽɹɻɺ]/g, 'r')
            .replace(/ʡ[ħʕ]/g, '\'')
            .replace(/ʔh/g, 'h')
            .replace(/[cȶ]ʎ/g, 'chl')
            .replace(/ʘqχ/g, '!')
            .replace(/ʘq/g, '!');
        /* single character */
        inpt = inpt.replace(/ɱ/g, 'm')
            .replace(/[ŋɴ]/g, 'ng')
            .replace(/[ɗᶑ]/g, 'd')
            .replace(/q/g, 'k')
            .replace(/[ɢɠʛ]/g, 'g')
            .replace(/[ʡʔʢ]/g, '\'')
            .replace(/ɸ/g, 'f')
            .replace(/[ɾɽɹɻɺʁ]/g, 'r')
            .replace(/[ɣ]/g, 'gh')
            .replace(/[ħɦʜ]/g, 'h')
            .replace(/[ɬɮʟɫ]/g, 'l')
            .replace(/ʎ/g, 'lj')
            .replace(/ɓ/g, 'b')
            .replace(/[ʘǀǂǁǃ¡ʞ]/g, '!')
            .replace(/ʍ/g, 'hw');
        if (scpt == "IEP2" && (lang == 'de' || lang == 'hu' || lang == 'sv')) {
            inpt = inpt.replace(/[bdgkpt]l/g, function(txt){return txt.replace(/l/,'el');});
        }
        if (scpt == "IEP2" && lang == 'sv') {
            inpt = inpt.replace(/ȧ[bdfghklmnpst]([^bcdgjkmqvwx]|\b)/g, function(txt){return txt.substr(0,2).replace(/ȧ/,'a')+txt.substr(1,1)+txt.substr(2,1);})
            .replace(/ȧ/g, 'a')
            .replace(/ė[bdfghklmnpst]([^bcdgjkmqvwx]|\b)/g, function(txt){return txt.substr(0,2).replace(/ė/,'e')+txt.substr(1,1)+txt.substr(2,1);})
            .replace(/ė/g, 'e')
            .replace(/ï[bdfghklmnpst]([^bcdgjkmqvwx]|\b)/g, function(txt){return txt.substr(0,2).replace(/ï/,'i')+txt.substr(1,1)+txt.substr(2,1);})
            .replace(/ï/g, 'i')
            .replace(/ȯ[bdfghklmnpst]([^bcdgjkmqvwx]|\b)/g, function(txt){return txt.substr(0,2).replace(/ȯ/,'o')+txt.substr(1,1)+txt.substr(2,1);})
            .replace(/ȯ/g, 'o')
            .replace(/ú[bdfghklmnpst]([^bcdgjkmqvwx]|\b)/g, function(txt){return txt.substr(0,2).replace(/ú/,'u')+txt.substr(1,1)+txt.substr(2,1);})
            .replace(/ú/g, 'u')
            .replace(/ẏ[bdfghklmnpst]([^bcdgjkmqvwx]|\b)/g, function(txt){return txt.substr(0,2).replace(/ẏ/,'y')+txt.substr(1,1)+txt.substr(2,1);})
            .replace(/ẏ/g, 'y')
            .replace(/â[bdfghklmnpst]([^bcdgjkmqvwx]|\b)/g, function(txt){return txt.substr(0,2).replace(/â/,'ä')+txt.substr(1,1)+txt.substr(2,1);})
            .replace(/â/g, 'ä')
            .replace(/ã[bdfghklmnpst]([^bcdgjkmqvwx]|\b)/g, function(txt){return txt.substr(0,2).replace(/ã/,'å')+txt.substr(1,1)+txt.substr(2,1);})
            .replace(/ã/g, 'å')
            .replace(/kk/g, 'ck')
            .replace(/[^c]ks/g, function(txt){return txt.replace(/ks/,'x');});
        } else {
            inpt = inpt.replace(/chh/g, 'ch');
        }
        inpt = inpt.replace(/\./g, '');
        return inpt;
    } else if (lng == "Georgian") {
        if (scpt == "Romanised") {
            /* remove brackets */
            inpt = inpt.replace(/[\u0028\u0029\u005B\u005D]/g, '');
            /* remove special characters */
            inpt = inpt.replace(/\u0361/g, '');
            /* romanise */
            inpt = inpt.replace(/ɑ/g, 'a')
                .replace(/ɛ/g, 'e')
                .replace(/ɪ/g, 'i')
                .replace(/ɔ/g, 'o')
                .replace(/w/g, 'v')
                .replace(/ts/g, 'c')
                .replace(/tʃ/g, 'ch')
                .replace(/dʒ/g, 'j')
                .replace(/ʁ/g, 'gh')
                .replace(/χ/g, 'x')
                .replace(/ʒ/g, 'zh')
                .replace(/ʼ/g, '\'')
                .replace(/ʰ/g, '');
            return inpt;
        }
    } else if (lng == "Japanese") {
        if (scpt == "Romaji") {
            /* full words */
            inpt = inpt.replace(/no̞ːkɯᵝ/g, 'no oku')
                 .replace(/kʲimiːɺ̠õ̞/g, 'kimi iro')
                 .replace(/niːta̠[iĩ]/g, 'ni itai')
                 .replace(/kõ̞no̞ːmo̞i/g, 'kono omoi')
                 .replace(/ɕima̠na̠kʲa̠/g, 'shimanakya')
                 .replace(/nã̠m/g, 'nani');
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/(^|[\s-])e̞ː/g, function(txt){return txt.replace(/e̞ː/,'ei');})
                .replace(/dʲɨᵝ/, 'de~yu')
                .replace(/(^|\s)d͡z/, '$1z')
                .replace(/[¹²³⁴⁵⁶⁰ʰʲʷᵞˀˁˈ⁻ʼ\u02DE\u02E5\u02E6\u02E7\u02E8\u02E9\u0303\u0308\u030A\u031A\u031C\u031D\u031E\u031F\u0320\u0325\u0329\u032A\u032C\u032F\u0339\u033C\u033D\u0361]/g, '');
            /* character replacement */
            inpt = inpt.replace(/iɕo/g, 'issho')
                .replace(/ɸ/g, 'f')
                .replace(/ɡ/g, 'g')
                .replace(/ã/g, 'a')
                .replace(/ẽ/g, 'e')
                .replace(/õ/g, 'o')
                .replace(/ũ/g, 'u')
                .replace(/j/g, 'y')
                .replace(/(dʑ|ʑ)/g, 'j')
                .replace(/[ɴɲ]/g, 'n')
                .replace(/oɯᵝ?/g, 'ō')
                .replace(/ɯɯ/g, 'ū')
                .replace(/(ɨᵝ|ɯᵝ|ɯ)/g, 'u')
                .replace(/(ĩ|ɨ)/g, 'i')
                .replace(/(ɰᵝ|ɰ)/g, 'w')
                .replace(/aː/g, 'ā')
                .replace(/eː/g, 'ē')
                .replace(/iː/g, 'ī')
                .replace(/oː/g, 'ō')
                .replace(/uː/g, 'ū')
                .replace(/nː/g, 'n\'n')
                .replace(/pː/g, 'pp')
                .replace(/tː/g, 'tt')
                .replace(/ŋg/g, 'ng')
                .replace(/ŋ/g, 'ng')
                .replace(/[ɾɺ]/g, 'r')
                .replace(/ɕː/g, 'ssh')
                .replace(/ritɕi/g, 'ritchi')
                .replace(/tɕ/g, 'ch')
                .replace(/ɕ/g, 'sh')
                .replace(/ç(?=i)/g, 'h')
                .replace(/ç/g, 'hy');
            /* mark honorifics */
            inpt = inpt.replace(/(san$|san\s)/g, function(txt){return txt.replace(/san/,'-san');})
            if (tpe == "text") {
                /* uppercase the start of the text */
                inpt = inpt.replace(/^[\wāēīōū]/g, function(txt){return txt.toUpperCase();});
            } else if (tpe == "title") {
                /* uppercase the start of each word */
                inpt = inpt.replace(/(^|[\s-])[\wāēīōū]/g, function(txt){return txt.toUpperCase();});
                /* lowercase specific words */
                inpt = inpt.replace(/\s(De|Ga|Ha|He|Ka|Kara|Kedo|Maa|Made|Mo|Na|Nara|Naru|Ne|Ni|No|To|Toka|Wa|Wo|Ya|Yo|Ze|Zo|Anou|E|O)\s/g, function(txt){return txt.toLowerCase();});
                inpt = inpt.replace(/(-San|-Sama|-Chan|-Kun|-Bō|-Shi)\s/g, function(txt){return txt.toLowerCase();});
                inpt = inpt.replace(/\s(O-|Go-)/g, function(txt){return txt.toLowerCase();});
            }
            return inpt;
        }
    } else if (lng == "Korean") {
        if (scpt == "RR") {
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[¹²³⁴⁵⁶⁰ʲʷᵝᵞˀˁːˈ⁻ʼ\u02DE\u02E5\u02E6\u02E7\u02E8\u02E9\u0303\u0308\u030A\u031C\u031D\u031E\u031F\u0320\u0325\u0329\u032A\u032C\u032F\u0339\u033C\u033D\u0361]/g, '');
            /* character replacement */
            inpt = inpt.replace(/kx/g, '3')
                .replace(/kç/g, '3')
                .replace(/[t][ø]m/g, function(txt){return txt.replace(/m/,'b');})
                .replace(/ə/g, 'o')
                .replace(/ʌ/g, 'eo')
                .replace(/ɛ/g, 'ae')
                .replace(/ø/g, 'oe')
                .replace(/ɯ/g, 'eu')
                .replace(/y/g, 'i')
                .replace(/j/g, 'y')
                .replace(/ɾ/g, 'r')
                .replace(/[ɭʎ]/g, 'l')
                .replace(/ɥ/g, 'w')
                .replace(/[ɦβɸ]/g, 'h')
                .replace(/ɲ/g, 'n')
                .replace(/n[gk]/g, 'n-g')
                .replace(/ŋ[aeiou]/g, function(txt){return txt.replace(/ŋ/,'ng-');})
                .replace(/ŋ/g, 'ng')
                .replace(/t͈ɕ/g, 'j')
                .replace(/tɕʰ/g, 'ch')
                .replace(/tɕ/g, 'j')
                .replace(/ɕ/g, 's')
                .replace(/dʑ/g, 'j')
                .replace(/(tʰ|t̚)/g, '7')
                .replace(/t͈/g, '77')
                .replace(/t/g, 'd')
                .replace(/(kʰ|k̚)/g, '3')
                .replace(/k͈/g, '33')
                .replace(/k/g, 'g')
                .replace(/(pʰ|p̚|p͈)/g, '9')
                .replace(/(pg|pd|pb|ps|pj|pch|pk|pt|ph)/g, function(txt){return txt.replace(/p/,'9');})
                .replace(/(pn|pr|pl)/g, 'mn')
                .replace(/p/g, 'b')
                .replace(/[ʰ\u031A\u0348]/g, '')
                .replace(/7/g, 't')
                .replace(/3/g, 'k')
                .replace(/9/g, 'p');
            /* uppercase the start the sentence */
            inpt = inpt.replace(/(\u005B\w)/g, function(txt){return txt.toUpperCase();});
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            return inpt;
        } else if (scpt == "McC-Rsr") {
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[¹²³⁴⁵⁶⁰ʲʷᵝᵞˀˁːˈ⁻ʼ\u02DE\u02E5\u02E6\u02E7\u02E8\u02E9\u0303\u0308\u030A\u031C\u031D\u031E\u031F\u0320\u0325\u0329\u032A\u032C\u032F\u0339\u033C\u033D\u0361]/g, '');
            /* character replacement */
            inpt = inpt.replace(/ɕʰy/g, 'shwi')
                .replace(/pɛ/g, function(txt){return txt.replace(/p/,'9');})
                .replace(/n[g][ɯ]/g, function(txt){return txt.replace(/n/,'n\'');})
                .replace(/[əʌ]/g, 'ŏ')
                .replace(/ɛ/g, 'ae')
                .replace(/ø/g, 'oe')
                .replace(/ɯ/g, 'ŭ')
                .replace(/y/g, 'i')
                .replace(/j/g, 'y')
                .replace(/ɾ/g, 'r')
                .replace(/[ɭʎ]/g, 'l')
                .replace(/ɥ/g, 'w')
                .replace(/[ɦβɸ]/g, 'h')
                .replace(/ɲ/g, 'n')
                .replace(/n[gk]/g, 'n\'8')
                .replace(/ŋ/g, 'n8')
                .replace(/t͈ɕ/g, 'ch')
                .replace(/tɕʰ/g, 'ch\'')
                .replace(/(^|\s)tɕ/g, function(txt){return txt.replace(/tɕ/,'ch');})
                .replace(/tɕ/g, 'j')
                .replace(/ɕ/g, 's')
                .replace(/dʑ/g, 'j')
                .replace(/k̚/g, '3')
                .replace(/k͈/g, '33')
                .replace(/kʰ[i]/g, function(txt){return txt.replace(/kʰ/,'3');})
                .replace(/(kʰ|kx|kç)/g, '3\'')
                .replace(/(^|\s)k/g, function(txt){return txt.replace(/k/,'3');})
                .replace(/t̚/g, '7')
                .replace(/t͈/g, '77')
                .replace(/tʰ/g, '7\'')
                .replace(/(^|\s)t/g, function(txt){return txt.replace(/t/,'7');})
                .replace(/p̚/g, '9')
                .replace(/pʰ/g, '9\'')
                .replace(/(^|\s)p/g, function(txt){return txt.replace(/p/,'9');})
                .replace(/t[^bcdghjklmnprstw]/g, function(txt){return txt.replace(/t/,'d');})
                .replace(/p[^bcdghjklmnprstw]/g, function(txt){return txt.replace(/p/,'b');})
                .replace(/k[^bcdghjklmnprstw]/g, function(txt){return txt.replace(/k/,'g');})
                .replace(/[ʰ\u031A\u0348]/g, '')
                .replace(/7/g, 't')
                .replace(/3/g, 'k')
                .replace(/9/g, 'p')
                .replace(/8/g, 'g');
            /* uppercase the start the sentence */
            inpt = inpt.replace(/(\u005B[\wŏŭ])/g, function(txt){return txt.toUpperCase();});
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            return inpt;
        } else if (scpt == "Yale") {
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[¹²³⁴⁵⁶⁰ʲʷᵝᵞˀˁˈ⁻ʼ\u02DE\u02E5\u02E6\u02E7\u02E8\u02E9\u0303\u0308\u030A\u031C\u031D\u031E\u031F\u0320\u0325\u0329\u032A\u032C\u032F\u0339\u033C\u033D\u0361]/g, '');
            /* character replacement */
            inpt = inpt.replace(/[t][ø]m/g, function(txt){return txt.replace(/m/,'9');})
                .replace(/[a]k̚/g, function(txt){return txt.replace(/k̚/,'kk');})
                .replace(/[o]tʰ[a]/g, function(txt){return txt.replace(/tʰ/,'sh');})
                .replace(/(yː|iː)/g, 'ī')
                .replace(/y/g, 'i')
                .replace(/[^jɾ]uː/g, function(txt){return txt.replace(/u$/,'wū');})
                .replace(/[^jɾ]u/g, function(txt){return txt.replace(/u$/,'wu');})
                .replace(/aː/g, 'ā')
                .replace(/eː/g, 'ēy')
                .replace(/e/g, 'ey')
                .replace(/əː/g, 'ē')
                .replace(/ə/g, 'e')
                .replace(/ʌː/g, 'ē')
                .replace(/ʌ/g, 'e')
                .replace(/ɛː/g, 'āy')
                .replace(/ɛ/g, 'ay')
                .replace(/øː/g, 'ōy')
                .replace(/ø/g, 'oy')
                .replace(/ɯ/g, 'u')
                .replace(/j/g, 'y')
                .replace(/ɾ/g, 'l')
                .replace(/[ɭʎ]/g, 'l')
                .replace(/ɥ/g, 'w')
                .replace(/[ɦβɸ]/g, 'h')
                .replace(/ɲ/g, 'n')
                .replace(/ŋ[aāeēiīoōuū]/g, function(txt){return txt.replace(/ŋ/,'n8.');})
                .replace(/ŋ/g, 'n8')
                .replace(/t͈ɕ/g, '9c')
                .replace(/tɕʰ/g, 'ch')
                .replace(/tɕ/g, 'c')
                .replace(/ɕ/g, 's')
                .replace(/dʑ/g, 'c')
                .replace(/k͈/g, 'kk')
                .replace(/(kʰ|kx|kç)/g, 'kh')
                .replace(/t͈/g, 'tt')
                .replace(/t̚/g, 's')
                .replace(/tʰ/g, 'th')
                .replace(/pʰ/g, '9h')
                .replace(/p[bcdghjklmnprstw]/g, function(txt){return txt.replace(/p/,'9q');})
                .replace(/b/g, '9')
                .replace(/g/g, 'k')
                .replace(/d/g, 't')
                .replace(/[ʰ\u031A\u0348]/g, '')
                .replace(/9/g, 'p')
                .replace(/8/g, 'g');
            /* uppercase the start the sentence */
            inpt = inpt.replace(/(\u005B[\wāēī])/g, function(txt){return txt.toUpperCase();});
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            return inpt;
        }
    } else if (lng == "Russian") {
        if (scpt == "Romanised") {
            /* remove brackets */
            inpt = inpt.replace(/[\u0028\u0029\u005B\u005D]/g, '');
            /* remove special characters */
            inpt = inpt.replace(/[ˈ\u0361]/g, '');
            /* romanise */
            inpt = inpt.replace(/jə/g, 'ya')
                .replace(/æ/g, 'a')
                .replace(/ə(?=(y|rʲ|$|\s|-))/g, 'a')
                .replace(/ɐ(?=(rʲ|$|\s|-))/g, 'a')
                .replace(/ə/g, 'o')
                .replace(/ʊ/g, 'u')
                .replace(/(ɪ|ʲ)(j|\(j\))ɪ/g, function(txt){return txt.replace(/(j|\(j\))ɪ/, 'ya');})
                .replace(/(j|\(j\))ɪ/g, 'e')
                .replace(/ʲɪ$/g, 'i')
                .replace(/(l|n)ʲɪ/g, function(txt){return txt.replace(/ʲɪ/, 'e');})
                .replace(/ʲɪ/g, 'i')
                .replace(/ʲi/g, 'i')
                .replace(/tɕ/g, 'ch')
                .replace(/nəʂ/g, function(txt){return txt.replace(/ʂ/, 'zh');})
                .replace(/ʂ/g, 'sh')
                .replace(/ʐ/g, 'zh')
                .replace(/x/g, 'kh')
                .replace(/vː/g, 'vv')
                .replace(/f/g, 'v')
                .replace(/ɡ/g, 'g')
                .replace(/[ɨj]/g, 'y')
                .replace(/ʲ/g, '\'');
            return inpt;
        }
    } else if (lng == "Cantonese") {
        if (scpt == "Jyutping") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/\u032F/g, '');
            /* character replacement */
            inpt = inpt.replace(/ɑ/g, 'aa')
                .replace(/ɐ/g, 'a')
                .replace(/[eɛ]/g, 'e')
                .replace(/(ɪ|y̯)/g, 'i')
                .replace(/y/g, 'yu')
                .replace(/ɔ/g, 'o')
                .replace(/ʊ/g, 'u')
                .replace(/œ/g, 'oe')
                .replace(/ɵ/g, 'eo')
                .replace(/(t͡[ɕs]ʰ)/g, 'c')
                .replace(/t͡[ɕs]/g, 'z')
                .replace(/ɕ/g, 's')
                .replace(/kʷʰ/g, 'kw')
                .replace(/kʷ/g, 'gw')
                .replace(/ŋ/g, 'ng')
                .replace(/ɬ/g, 'lh')
                .replace(/ʒ/g, 'y')
                .replace(/t[^̚ʰ]/g, function(txt){return txt.replace(/t/,'d');})
                .replace(/k[^̚ʰ]/g, function(txt){return txt.replace(/k/,'g');})
                .replace(/p[^̚ʰ]/g, function(txt){return txt.replace(/p/,'b');})
                .replace(/[̚ʰː]/g, '');
            /* tonal replacement */
            inpt = inpt.replace(/(²³⁵|³⁵)/g, '<sup>2</sup>')
                .replace(/(¹³|³²)/g, '<sup>5</sup>')
                .replace(/(²¹|¹¹)/g, '<sup>4</sup>')
                .replace(/(²²|²)/g, '<sup>6</sup>')
                .replace(/(³³|³)/g, '<sup>3</sup>')
                .replace(/(⁵⁵|⁵³|⁵)/g, '<sup>1</sup>')
                .replace(/⁻/g, '<sup>-</sup>');
            return inpt;
        } else if (scpt == "Yale") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[ː\u032F]/g, '');
            /* split into syllables */
            var groups = inpt.match(/([^¹²³⁵⁻]+[¹²³⁵⁻]+)/g);
            var end_space = 0;
            if (inpt.slice(-1) == " ") {end_space = 1;}
            inpt = "";
            for(i=0;i<groups.length;i++) {
                /* character replacement */
                groups[i] = groups[i].replace(/ɑ[^¹²³⁵]+/, function(txt){return txt.replace(/ɑ/,'aa');})
                    .replace(/[ɑɐ]/, 'a')
                    .replace(/[eɛ]/, 'e')
                    .replace(/(ɪ|y̯)/, 'i')
                    .replace(/ɵy/, 'eui')
                    .replace(/jy/, 'yu')
                    .replace(/y/, 'yu')
                    .replace(/ɔ/, 'o')
                    .replace(/ʊ/, 'u')
                    .replace(/[œɵ]/, 'eu')
                    .replace(/[jʒ]/, 'y')
                    .replace(/(t͡[ɕs]ʰ)/, 'ch')
                    .replace(/t͡[ɕs]/, 'j')
                    .replace(/ɕ/, 's')
                    .replace(/kʷʰ/, 'kw')
                    .replace(/kʷ/, 'gw')
                    .replace(/ŋ/, 'ng')
                    .replace(/ɬ/, 'lh')
                    .replace(/ɬ/, 'lh')
                    .replace(/t[^̚ʰ]/, function(txt){return txt.replace(/t/,'d');})
                    .replace(/k[^̚ʰ]/, function(txt){return txt.replace(/k/,'g');})
                    .replace(/p[^̚ʰ]/, function(txt){return txt.replace(/p/,'b');})
                    .replace(/[̚ʰ]/g, '');
                /* tonal replacement */
                groups[i] = groups[i].replace(/[^¹²³⁵⁻]+(¹³⁻³⁵|²¹⁻³⁵|²²⁻³⁵|³³⁻³⁵|²³⁵|³⁵|³²)/, function(txt){return txt.replace(/(¹³⁻³⁵|²¹⁻³⁵|²²⁻³⁵|³³⁻³⁵|²³⁵|³⁵|³²)/, '').replace(/(yu|eu|aa|a|e|i|o|u)/,function(txt){return addAccent(txt,"´","Cantonese");});})
                    .replace(/[^¹²³⁵⁻]+(¹³)/, function(txt){return txt.replace(/(¹³)/, '').replace(/[aeiou]+/,function(txt){return txt+"h";}).replace(/(yu|eu|aa|a|e|i|o|u)/,function(txt){return addAccent(txt,"´","Cantonese");});})
                    .replace(/[^¹²³⁵⁻]+(²¹⁻⁵⁵|²²⁻⁵⁵|⁵⁵|⁵³|⁵)/, function(txt){return txt.replace(/(²¹⁻⁵⁵|²²⁻⁵⁵|⁵⁵|⁵³|⁵)/, '').replace(/(yu|eu|aa|a|e|i|o|u)/,function(txt){return addAccent(txt,"¯","Cantonese");});})
                    .replace(/[^¹²³⁵⁻]+(¹¹)/, function(txt){return txt.replace(/(²¹|¹¹)/, '').replace(/(yu|eu|aa|a|e|i|o|u)/,function(txt){return addAccent(txt,"`","Cantonese");});})
                    .replace(/[^¹²³⁵⁻]+(²¹)/, function(txt){return txt.replace(/(²¹|¹¹)/, '').replace(/[aeiou]+/,function(txt){return txt+"h";}).replace(/(yu|eu|aa|a|e|i|o|u)/,function(txt){return addAccent(txt,"`","Cantonese");});})
                    .replace(/[^¹²³⁵⁻]+(²²|²)/, function(txt){return txt.replace(/(²²|²)/, '').replace(/[aeiou]+/,function(txt){return txt+"h";});})
                    .replace(/(³³|³|⁻)/, '');
                inpt += groups[i];
            }
            if (end_space) {inpt += " ";}
            return inpt;
        } else if (scpt == "Pinyin") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/\u032F/g, '');
            /* character replacement */
            inpt = inpt.replace(/ɑ/g, 'aa')
                .replace(/ɐ/g, 'a')
                .replace(/[eɛ]/g, 'e')
                .replace(/(ɪ|y̯)/g, 'i')
                .replace(/ɔ/g, 'o')
                .replace(/ʊ/g, 'u')
                .replace(/[œɵ]/g, 'oe')
                .replace(/(t͡[ɕs]ʰ)/g, 'ts')
                .replace(/t͡[ɕs]/g, 'dz')
                .replace(/ɕ/g, 's')
                .replace(/kʷʰ/g, 'kw')
                .replace(/kʷ/g, 'gw')
                .replace(/ŋ/g, 'ng')
                .replace(/ɬ/g, 'lh')
                .replace(/ʒ/g, 'y')
                .replace(/t[^̚ʰ]/g, function(txt){return txt.replace(/t/,'d');})
                .replace(/k[^̚ʰ]/g, function(txt){return txt.replace(/k/,'g');})
                .replace(/p[^̚ʰ]/g, function(txt){return txt.replace(/p/,'b');})
                .replace(/[̚ʰː]/g, '');
            /* tonal replacement */
            inpt = inpt.replace(/(²³⁵|³⁵)/g, '<sup>2</sup>')
                .replace(/(¹³|³²)/g, '<sup>5</sup>')
                .replace(/(²¹|¹¹)/g, '<sup>4</sup>')
                .replace(/²²/g, '<sup>6</sup>')
                .replace(/²/g, '<sup>9</sup>')
                .replace(/³³/g, '<sup>3</sup>')
                .replace(/³/g, '<sup>8</sup>')
                .replace(/(⁵⁵|⁵³)/g, '<sup>1</sup>')
                .replace(/⁵/g, '<sup>7</sup>')
                .replace(/⁻/g, '<sup>-</sup>');
            return inpt;
        } else if (scpt == "Guangdong") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[\u032F\u031A]/g, '');
            /* character replacement */
            inpt = inpt.replace(/ɑ/g, 'a')
                .replace(/[eɛ]/g, 'é')
                .replace(/[ɐ]/g, 'e')
                .replace(/y/g, 'ü')
                .replace(/(ɪ|y̯)/g, 'i')
                .replace(/ɔ/g, 'o')
                .replace(/ʊ/g, 'u')
                .replace(/[œɵ]/g, 'ê')
                .replace(/[jʒ]/g, 'y')
                .replace(/(t͡ɕʰ)/g, 'q')
                .replace(/t͡ɕ/g, 'j')
                .replace(/(t͡sʰ)/g, 'c')
                .replace(/t͡s/g, 'z')
                .replace(/t/g, 'd')
                .replace(/ɕ/g, 'x')
                .replace(/p/g, 'b')
                .replace(/kʷʰ/g, 'kw')
                .replace(/kʷ/g, 'gw')
                .replace(/k/g, 'g')
                .replace(/ŋ/g, 'ng')
                .replace(/ɬ/g, 'lh')
                .replace(/[ʰː]/g, '')
                .replace(/^i/g, 'y')
                .replace(/^u/g, 'w')
                .replace(/^ü/g, 'y')
                .replace(/[jqx]ü/g, 'u');
            /* tonal replacement */
            inpt = inpt.replace(/(²³⁵|³⁵)/g, '<sup>2</sup>')
                .replace(/(¹³|³²)/g, '<sup>5</sup>')
                .replace(/(²¹|¹¹)/g, '<sup>4</sup>')
                .replace(/²²/g, '<sup>6</sup>')
                .replace(/²/g, '<sup>9</sup>')
                .replace(/³³/g, '<sup>3</sup>')
                .replace(/³/g, '<sup>8</sup>')
                .replace(/(⁵⁵|⁵³)/g, '<sup>1</sup>')
                .replace(/⁵/g, '<sup>7</sup>')
                .replace(/⁻/g, '<sup>-</sup>');
            return inpt;
        } else if (scpt == "BarnettChao") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/\u032F/g, '');
            /* split into syllables */
            var groups = inpt.match(/([^¹²³⁵⁻]+[¹²³⁵⁻]+)/g);
            var end_space = 0;
            if (inpt.slice(-1) == " ") {end_space = 1;}
            inpt = "";
            for(i=0;i<groups.length;i++) {
                /* character replacement */
                groups[i] = groups[i].replace(/ɑ/g, 'aa')
                    .replace(/ɐ/, 'a')
                    .replace(/ɛ/, 'ea')
                    .replace(/(ɪ|y̯)/, 'i')
                    .replace(/u/, 'uu')
                    .replace(/[ʊo]/, 'u')
                    .replace(/ɔ/, 'o')
                    .replace(/[œɵ]/, 'eo')
                    .replace(/(t͡[ɕs]ʰ)/, 'c')
                    .replace(/t͡[ɕs]/, 'z')
                    .replace(/ɕ/, 's')
                    .replace(/kʷʰ/, 'kw')
                    .replace(/kʷ/, 'gw')
                    .replace(/ŋ/, 'ng')
                    .replace(/h/, 'x')
                    .replace(/ʔ/, 'q')
                    .replace(/ɬ/, 'lh')
                    .replace(/ʒ/, 'y')
                    .replace(/t[^̚ʰ]/g, function(txt){return txt.replace(/t/,'d');})
                    .replace(/k[^̚ʰ]/g, function(txt){return txt.replace(/k/,'g');})
                    .replace(/p[^̚ʰ]/g, function(txt){return txt.replace(/p/,'b');})
                    .replace(/[̚ʰː]/g, '');
            /* tonal replacement */
                groups[i] = groups[i].replace(/[^¹²³⁵⁻]+(²¹⁻⁵⁵|²²⁻⁵⁵|⁵⁵)/, function(txt){return txt.replace(/(²¹⁻⁵⁵|²²⁻⁵⁵|⁵⁵)/, '').replace(/(yu|eu|aa|a|e|i|o|u)[^a-z]/,function(txt){return "h"+txt+"hx";}).replace(/(yu|eu|aa|a|e|i|o|u)[a-z]+/,function(txt){return "h"+addAccent(txt,"high","BarnettChao")+"x";});})
                    .replace(/[^¹²³⁵⁻]+(²¹⁻³⁵|²²⁻³⁵|³³⁻³⁵|³²)/, function(txt){return txt.replace(/(²¹⁻³⁵|²²⁻³⁵|³³⁻³⁵|³²)/, '').replace(/(yu|eu|aa|a|e|i|o|u)[^a-z]/,function(txt){return "h"+txt+"hv";}).replace(/(yu|eu|aa|a|e|i|o|u)[a-z]+/,function(txt){return "h"+addAccent(txt,"high","BarnettChao")+"v";});})
                    .replace(/[^¹²³⁵⁻]+⁵³/, function(txt){return txt.replace(/⁵³/, '').replace(/(yu|eu|aa|a|e|i|o|u)[^a-z]/,function(txt){return "h"+txt+"h";}).replace(/(yu|eu|aa|a|e|i|o|u)[a-z]+/,function(txt){return "h"+addAccent(txt,"high","BarnettChao");});})
                    .replace(/[^¹²³⁵⁻]+(²³⁵|³⁵)/, function(txt){return txt.replace(/(²³⁵|³⁵)/, '').replace(/(yu|eu|aa|a|e|i|o|u)[^a-z]/,function(txt){return txt+"r";}).replace(/(yu|eu|aa|a|e|i|o|u)[a-z]+/,function(txt){return addAccent(txt,"low","BarnettChao");});})
                    .replace(/[^¹²³⁵⁻]+(²¹|¹¹)/, function(txt){return txt.replace(/(²¹|¹¹)/, '').replace(/(yu|eu|aa|a|e|i|o|u)[^a-z]/,function(txt){return "r"+txt+"h";}).replace(/(yu|eu|aa|a|e|i|o|u)[a-z]+/,function(txt){return "r"+addAccent(txt,"high","BarnettChao");});})
                    .replace(/[^¹²³⁵⁻]+¹³/, function(txt){return txt.replace(/¹³/, '').replace(/(yu|eu|aa|a|e|i|o|u)[^a-z]/,function(txt){return "r"+txt+"r";}).replace(/(yu|eu|aa|a|e|i|o|u)[a-z]+/,function(txt){return "r"+addAccent(txt,"low","BarnettChao");});})
                    .replace(/[^¹²³⁵⁻]+(²²|²)/, function(txt){return txt.replace(/(²²|²)/, '').replace(/(yu|eu|aa|a|e|i|o|u)/,function(txt){return "r"+txt;});})
                    .replace(/[^¹²³⁵⁻]+⁵/, function(txt){return txt.replace(/⁵/, '').replace(/(yu|eu|aa|a|e|i|o|u)/,function(txt){return "h"+txt;});})
                    .replace(/(³³|³|⁻)/, '');
                inpt += groups[i];
            }
            if (end_space) {inpt += " ";}
            return inpt;
        }
    } else if (lng == "Mandarin") {
        if (scpt == "Pinyin") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* add apostrophe */
            inpt = inpt.replace(/([¹²³⁴⁵⁰]ˀ)/g, function(txt){return txt.replace(/ˀ/,'\'');});
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[ʷˀ\u0303\u0320\u0325\u0329\u032F\u0331]/g, '');
            /* split into syllables */
            var groups = inpt.match(/([^¹²³⁴⁵⁰⁻]+[¹²³⁴⁵⁰⁻]+)/g);
            var end_space = 0;
            if (inpt.slice(-1) == " ") {end_space = 1;}
            inpt = "";
            for(i=0;i<groups.length;i++) {
                /* character replacement */
                alrt = groups[i];
                groups[i] = groups[i].replace(/jɤʊɻ/, 'iur')
                    .replace(/jəɻ/, 'ir')
                    .replace(/wəɻ/, 'uir')
                    .replace(/jɑɻ/, 'ianr')
                    .replace(/wɑɻ/, 'uanr')
                    .replace(/ɑɻ/, 'angr')
                    .replace(/jɤɻ/, 'ingr')
                    .replace(/ɑ/, 'a')
                    .replace(/^ueɪ/, 'we1')
                    .replace(/[¹²³⁴⁵⁰⁻\s]ueɪ/, function(txt){return txt.replace(/ueɪ/,'we1');})
                    .replace(/ueɪ/, 'u1')
                    .replace(/ɛn/, 'an')
                    .replace(/[ɛəɤ]/, 'e')
                    .replace(/^i[¹²³⁴⁵⁰⁻]/, function(txt){return txt.replace(/i/,'71');})
                    .replace(/[¹²³⁴⁵⁰⁻\s]i[¹²³⁴⁵⁰⁻]/, function(txt){return txt.replace(/i/,'71');})
                    .replace(/^u[¹²³⁴⁵⁰⁻]/, function(txt){return txt.replace(/u/,'wu');})
                    .replace(/[¹²³⁴⁵⁰⁻\s]u[¹²³⁴⁵⁰⁻]/, function(txt){return txt.replace(/u/,'wu');})
                    .replace(/^y/, function(txt){return txt.replace(/y/,'7u');})
                    .replace(/[¹²³⁴⁵⁰⁻\s]y/, function(txt){return txt.replace(/y/,'7u');})
                    .replace(/y/, 'ü')
                    .replace(/^i/, 'y')
                    .replace(/[¹²³⁴⁵⁰⁻\s]i/, function(txt){return txt.replace(/i/,'y');})
                    .replace(/muɔ/, 'mo')
                    .replace(/ɪ/, 'i')
                    .replace(/1/, 'i')
                    .replace(/7/, 'y')
                    .replace(/^oʊ/, 'ou')
                    .replace(/[¹²³⁴⁵⁰⁻\s]oʊ/, function(txt){return txt.replace(/oʊ/,'ou');})
                    .replace(/ioʊ/, 'iu')
                    .replace(/oʊ/, 'ou')
                    .replace(/[ʊɔ]/, 'o')
                    .replace(/^u/, 'w')
                    .replace(/[¹²³⁴⁵⁰⁻\s]u/, function(txt){return txt.replace(/u/,'w');})
                    .replace(/x/, 'h')
                    .replace(/ɥœ/, 'ue')
                    .replace(/œ/, 'e')
                    .replace(/ŋ/, 'ng')
                    .replace(/t͡ɕʰü/, 'qu')
                    .replace(/t͡ɕʰ/, 'q')
                    .replace(/t͡ɕü/, 'ju')
                    .replace(/t͡ɕ/, 'j')
                    .replace(/ɕ/, 'x')
                    .replace(/t͡sʰ/, 'c')
                    .replace(/t͡sz/, 'zi')
                    .replace(/t͡s/, 'z')
                    .replace(/ʈ͡ʂʰ/, 'ch')
                    .replace(/ʈ͡ʂ/, 'zh')
                    .replace(/ʂ/, 'sh')
                    .replace(/k[^ʰ]/, function(txt){return txt.replace(/k/,'g');})
                    .replace(/p[^ʰ]/, function(txt){return txt.replace(/p/,'b');})
                    .replace(/t[^ʰ]/, function(txt){return txt.replace(/t/,'d');})
                    .replace(/^ʐ/, 'r')
                    .replace(/[¹²³⁴⁵⁰⁻\s]ʐ/, function(txt){return txt.replace(/ʐ/,'r');})
                    .replace(/ʐ/, 'i')
                    .replace(/sz/, 'si')
                    .replace(/d͡zz/, 'zi')
                    .replace(/d͡ʐ̥/, 'zh')
                    .replace(/ɻ/, 'r')
                    .replace(/[̚ʰʷ]/g, '');
                /* tonal replacement */
                groups[i] = groups[i].replace(/[^¹²³⁴⁵⁰⁻]+(²¹⁴⁻²¹¹|²¹⁴)/, function(txt){return txt.replace(/(²¹⁴⁻²¹¹|²¹⁴)/, '').replace(/(iao|ia|ie|iu|ua|ue|ui|a|e|o|u|i|ü)/,function(txt){return addAccent(txt,"ˇ","Mandarin");});})
                    .replace(/[^¹²³⁴⁵⁰⁻]+³⁵/, function(txt){return txt.replace(/³⁵/, '').replace(/(iao|ia|ie|iu|ua|ue|ui|a|e|o|u|i|ü)/,function(txt){return addAccent(txt,"´","Mandarin");});})
                    .replace(/[^¹²³⁴⁵⁰⁻]+(⁵¹⁻⁵³|⁵¹)/, function(txt){return txt.replace(/(⁵¹⁻⁵³|⁵¹)/, '').replace(/(iao|ia|ie|iu|ua|ue|ui|a|e|o|u|i|ü)/,function(txt){return addAccent(txt,"`","Mandarin");});})
                    .replace(/[^¹²³⁴⁵⁰⁻]+⁵⁵/, function(txt){return txt.replace(/⁵⁵/, '').replace(/(iao|ia|ie|iu|ua|ue|ui|a|e|o|u|i|ü)/,function(txt){return addAccent(txt,"¯","Mandarin");});})
                    .replace(/[⁰³⁴]/, '');
                inpt += groups[i];
            }
            if (end_space) {inpt += " ";}
            return inpt;
        } else if (scpt == "Zhuyin") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[ʷˀ\u0303\u0320\u0325\u0329\u032F\u0331]/g, '');
            /* character replacement */
            inpt = inpt.replace(/jɤɻ[¹²³⁴⁵⁰⁻]+/g, function(txt){return txt.replace(/jɤɻ/,'ㄧㄥ')+"ㄦ";})
                .replace(/jɑɻ[¹²³⁴⁵⁰⁻]+/g, function(txt){return txt.replace(/jɑɻ/,'ㄧㄢ')+"ㄦ";})
                .replace(/wɑɻ[¹²³⁴⁵⁰⁻]+/g, function(txt){return txt.replace(/wɑɻ/,'ㄨㄢ')+"ㄦ";})
                .replace(/ɑɻ[¹²³⁴⁵⁰⁻]+/g, function(txt){return txt.replace(/ɑɻ/,'ㄤ')+"ㄦ";})
                .replace(/ɑŋ/g, 'ㄤ')
                .replace(/ɑʊ/g, 'ㄠ')
                .replace(/aɪ/g, 'ㄞ')
                .replace(/an/g, 'ㄢ')
                .replace(/a/g, 'ㄚ')
                .replace(/ɛn/g, 'ㄢ')
                .replace(/ɛ/g, 'ㄝ')
                .replace(/ən/g, 'ㄣ')
                .replace(/(ɥœ|œ)/g, 'ㄝ')
                .replace(/(iʊ|ɥ|y)/g, 'ㄩ')
                .replace(/(iə|j|i)/g, 'ㄧ')
                .replace(/(eɪ|ə)/g, 'ㄟ')
                .replace(/ɤʊ/g, 'ㄡ')
                .replace(/oʊ/g, 'ㄡ')
                .replace(/[ʊuw]/g, 'ㄨ')
                .replace(/f/g, 'ㄈ')
                .replace(/kʰ/g, 'ㄎ')
                .replace(/[gk]/g, 'ㄍ')
                .replace(/l/g, 'ㄌ')
                .replace(/m/g, 'ㄇ')
                .replace(/^n/g, 'ㄋ')
                .replace(/n/g, 'ㄣ')
                .replace(/pʰ/g, 'ㄆ')
                .replace(/[bp]/g, 'ㄅ')
                .replace(/t͡sʰ/g, 'ㄘ')
                .replace(/(t͡sz|t͡s)/g, 'ㄗ')
                .replace(/s/g, 'ㄙ')
                .replace(/tʰ/g, 'ㄊ')
                .replace(/x/g, 'ㄏ')
                .replace(/(ɤŋ|ŋ)/g, 'ㄥ')
                .replace(/^ɤɻ/g, 'ㄦ')
                .replace(/[ɤɔ]/g, 'ㄜ')
                .replace(/t͡ɕʰ/g, 'ㄑ')
                .replace(/t͡ɕ/g, 'ㄐ')
                .replace(/ʈ͡ʂʰ/g, 'ㄔ')
                .replace(/(ʈ͡ʂʐ|ʈ͡ʂ)/g, 'ㄓ')
                .replace(/[dt]/g, 'ㄉ')
                .replace(/ɕ/g, 'ㄒ')
                .replace(/(ʂʐ|ʂ)/g, 'ㄕ')
                .replace(/ɻ[¹²³⁴⁵⁰⁻]+/g, function(txt){return txt.replace(/ɻ/,'')+"ㄦ";});
                /* tonal replacement */
            inpt = inpt.replace(/(²¹⁴⁻²¹¹|²¹⁴)/g, 'ˇ')
                .replace(/³⁵/g, 'ˊ')
                .replace(/(⁵¹⁻⁵³|⁵¹)/g, 'ˋ')
                .replace(/⁵⁵/g, '')
                .replace(/[⁰³⁴]/g, '˙');
            return inpt;
        } else if (scpt == "WadeGiles") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[ʷˀ\u0303\u0320\u0325\u0329\u032F\u0331\u0361]/g, '');
            /* character replacement */
            inpt = inpt.replace(/jɤ/g, '1ng')
                .replace(/ɑ/g, 'a')
                .replace(/ɛ/g, 'e')
                .replace(/[ˀx]ɤ[ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/ɤ/,'o');})
                .replace(/[əɤ]/g, 'ê')
                .replace(/[ɻ¹²³⁴⁵⁰⁻\s][uʊ][ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/[uʊ]/,'wu');})
                .replace(/^[uʊ][ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/[uʊ]/,'wu');})
                .replace(/[ɻ¹²³⁴⁵⁰⁻\s][uʊ]/g, function(txt){return txt.replace(/[uʊ]/,'w');})
                .replace(/^[uʊ]/g, 'w')
                .replace(/^ioʊ/g, function(txt){return txt.replace(/ioʊ/,'yu');})
                .replace(/[ɻ¹²³⁴⁵⁰⁻\s]ioʊ/g, function(txt){return txt.replace(/ioʊ/,'yu');})
                .replace(/ioʊ/g, 'yu')
                .replace(/ueɪ/g, 'u1')
                .replace(/ɪ/g, '1')
                .replace(/oʊ/g, 'ou')
                .replace(/[lnsʂʰ]uɔ/g, function(txt){return txt.replace(/ɔ/,'o');})
                .replace(/uɔ/g, 'o')
                .replace(/ʊ[ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/ʊ/,'o');})
                .replace(/ʊ/g, 'o')
                .replace(/œ/g, 'eh')
                .replace(/[ɻ¹²³⁴⁵⁰⁻\s]i[ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/i/,'1');})
                .replace(/^i[ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/i/,'1');})
                .replace(/i[ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/i/,'ih');})
                .replace(/[ɻ¹²³⁴⁵⁰⁻\s]i[aeu]/g, function(txt){return txt.replace(/i/,'')+"y";})
                .replace(/^i[aeu]/g, function(txt){return txt.replace(/i/,'')+"y";})
                .replace(/[ɻ¹²³⁴⁵⁰⁻\s]i[^ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/i/,'')+"yi";})
                .replace(/^i[^ɻ¹²³⁴⁵⁰⁻]/g, function(txt){return txt.replace(/i/,'')+"yi";})
                .replace(/1/g, 'i')
                .replace(/[ɻ¹²³⁴⁵⁰⁻\s]y/g, function(txt){return txt.replace(/y/,'yü');})
                .replace(/^y/g, 'yü')
                .replace(/ɥ/g, 'ü')
                .replace(/b/g, 'p')
                .replace(/g/g, 'k')
                .replace(/x/g, 'h')
                .replace(/ŋ/g, 'ng')
                .replace(/(tɕ|ʈʂ)/g, 'ch')
                .replace(/ɕ/g, 'hs')
                .replace(/ʂ/g, 'sh')
                .replace(/ɻ/g, 'rh')
                .replace(/ɖʐ/g, 'ch')
                .replace(/dzz/g, 'tzu')
                .replace(/[ɻ¹²³⁴⁵⁰⁻\s]ʐ/g, function(txt){return txt.replace(/ʐ/,'j');})
                .replace(/^ʐ/g, 'j')
                .replace(/ʐ/g, 'ih')
                .replace(/z/g, 'zu')
                .replace(/ʰ/g, '\'');
                /* tonal replacement */
            inpt = inpt.replace(/(²¹⁴⁻²¹¹|²¹⁴)/g, '<sup>3</sup>')
                .replace(/³⁵/g, '<sup>2</sup>')
                .replace(/(⁵¹⁻⁵³|⁵¹)/g, '<sup>4</sup>')
                .replace(/⁵⁵/g, '<sup>1</sup>')
                .replace(/[⁰³⁴]/g, '<sup>5</sup>');
            return inpt;
        } else if (scpt == "Gwoyeu") {
            /* remove brackets */
            inpt = inpt.replace(/[\u005B\u005D]/g, '')
            /* remove diacritics and superscript characters */
            inpt = inpt.replace(/[ʷˀ\u0320\u0325\u0329\u032F\u0331]/g, '');
            /* split into syllables */
            var groups = inpt.match(/([^¹²³⁴⁵⁰⁻]+[¹²³⁴⁵⁰⁻]+)/g);
            var end_space = 0;
            if (inpt.slice(-1) == " ") {end_space = 1;}
            inpt = "";
            for(i=0;i<groups.length;i++) {
                /* character replacement */
                groups[i] = groups[i].replace(/\u0303/, 'ng')
                    .replace(/d͡zz/, 'tzy')
                    .replace(/ɑ/, 'a')
                    .replace(/[^y]ən²¹⁴/, function(txt){return txt.replace(/ən²¹⁴/,'een');})
                    .replace(/[əɤ]/, 'e')
                    .replace(/ɛn²¹⁴/, 'ean')
                    .replace(/ɛn/, 'an')
                    .replace(/^i²¹⁴/, 'yii')
                    .replace(/i²¹⁴/, 'ii')
                    .replace(/ɪ/, 'i')
                    .replace(/^u[¹²³⁴⁵⁰⁻]/, function(txt){return txt.replace(/u/,'wu');})
                    .replace(/^u/, 'w')
                    .replace(/iaʊ[¹²³⁴⁵⁰⁻]/, function(txt){return txt.replace(/iaʊ/,'iau');})
                    .replace(/ioʊ[¹²³⁴⁵⁰⁻]/, function(txt){return txt.replace(/ioʊ/,'iou');})
                    .replace(/oʊ/, 'ou')
                    .replace(/[ʊɔ]/, 'o')
                    .replace(/j/, 'i')
                    .replace(/^l[^¹²³⁴⁵⁰⁻](⁰|⁵⁵)/, function(txt){return txt.replace(/l/,'lh');})
                    .replace(/^m/, 'mh')
                    .replace(/[yɥ]œ/, '7ue')
                    .replace(/^[yɥ]/, '7iu')
                    .replace(/[yɥ]/, 'iu')
                    .replace(/7/, 'y')
                    .replace(/œ/, 'ue')
                    .replace(/x/, 'h')
                    .replace(/ŋ³⁵/, 'ng')
                    .replace(/ŋ/, 'ng')
                    .replace(/t͡sʰ/, '7s')
                    .replace(/t͡s/, '7z')
                    .replace(/(ʈ͡ʂ|t͡ɕ)ʰ/, 'ch')
                    .replace(/(ʈ͡ʂ|t͡ɕ)/, 'j')
                    .replace(/[ɕʂ]/, 'sh')
                    .replace(/k[^ʰ]/, function(txt){return txt.replace(/k/,'g');})
                    .replace(/p[^ʰ]/, function(txt){return txt.replace(/p/,'b');})
                    .replace(/t[^ʰ]/, function(txt){return txt.replace(/t/,'d');})
                    .replace(/7/, 't')
                    .replace(/kʰ/, 'kw')
                    .replace(/ɖ͡ʐ/, 'j')
                    .replace(/ʐ/, 'y')
                    .replace(/ɻ/, 'l')
                    .replace(/ʰ/, '');
                /* tonal replacement */
                groups[i] = groups[i].replace(/[^¹²³⁴⁵⁰⁻]+(²¹⁴⁻²¹¹|²¹⁴)/, function(txt){return addAccent(txt.replace(/(²¹⁴⁻²¹¹|²¹⁴)/, ''),'3',"Gwoyeu");})
                    .replace(/[^¹²³⁴⁵⁰⁻]+³⁵/, function(txt){return addAccent(txt.replace(/³⁵/, ''),'2',"Gwoyeu");})
                    .replace(/[^¹²³⁴⁵⁰⁻]+(⁵¹⁻⁵³|⁵¹)/, function(txt){return addAccent(txt.replace(/(⁵¹⁻⁵³|⁵¹)/, ''),'4',"Gwoyeu");})
                    .replace(/[^¹²³⁴⁵⁰⁻]+[⁰³⁴]/, function(txt){return "."+txt.replace(/[⁴⁰]/, '');})
                    .replace(/⁵⁵/, '');
                inpt += groups[i];
            }
            if (end_space) {inpt += " ";}
            return inpt;
        }
    } else if (lng == "Serbian") {
        if (scpt == "Cyrillic") {
            return inpt.replace(/LJ/g, 'Љ')
                .replace(/NJ/g, 'Њ')
                .replace(/DŽ/g, 'Џ')
                .replace(/Lj/g, 'Љ')
                .replace(/Nj/g, 'Њ')
                .replace(/Dž/g, 'Џ')
                .replace(/lj/g, 'љ')
                .replace(/nj/g, 'њ')
                .replace(/dž/g, 'џ')
                .replace(/A/g, 'А')
                .replace(/B/g, 'Б')
                .replace(/V/g, 'В')
                .replace(/G/g, 'Г')
                .replace(/D/g, 'Д')
                .replace(/Đ/g, 'Ђ')
                .replace(/E/g, 'Е')
                .replace(/Ž/g, 'Ж')
                .replace(/Z/g, 'З')
                .replace(/I/g, 'И')
                .replace(/J/g, 'Ј')
                .replace(/K/g, 'К')
                .replace(/L/g, 'Л')
                .replace(/M/g, 'М')
                .replace(/N/g, 'Н')
                .replace(/O/g, 'О')
                .replace(/P/g, 'П')
                .replace(/R/g, 'Р')
                .replace(/S/g, 'С')
                .replace(/T/g, 'Т')
                .replace(/Ć/g, 'Ћ')
                .replace(/U/g, 'У')
                .replace(/F/g, 'Ф')
                .replace(/H/g, 'Х')
                .replace(/C/g, 'Ц')
                .replace(/Č/g, 'Ч')
                .replace(/Š/g, 'Ш')
                .replace(/a/g, 'а')
                .replace(/b/g, 'б')
                .replace(/v/g, 'в')
                .replace(/g/g, 'г')
                .replace(/d/g, 'д')
                .replace(/đ/g, 'ђ')
                .replace(/e/g, 'е')
                .replace(/ž/g, 'ж')
                .replace(/z/g, 'з')
                .replace(/i/g, 'и')
                .replace(/j/g, 'ј')
                .replace(/k/g, 'к')
                .replace(/l/g, 'л')
                .replace(/m/g, 'м')
                .replace(/n/g, 'н')
                .replace(/o/g, 'о')
                .replace(/p/g, 'п')
                .replace(/r/g, 'р')
                .replace(/s/g, 'с')
                .replace(/t/g, 'т')
                .replace(/ć/g, 'ћ')
                .replace(/u/g, 'у')
                .replace(/f/g, 'ф')
                .replace(/h/g, 'х')
                .replace(/c/g, 'ц')
                .replace(/č/g, 'ч')
                .replace(/š/g, 'ш');
        } else if (scpt == "Latin") {
            return inpt.replace(/Љ(?=[Ѐ-Я])/g, 'LJ')
                .replace(/Њ(?=[Ѐ-Я])/g, 'NJ')
                .replace(/Џ(?=[Ѐ-Я])/g, 'DŽ')
                .replace(/Љ/g, 'Lj')
                .replace(/Њ/g, 'Nj')
                .replace(/Џ/g, 'Dž')
                .replace(/љ/g, 'lj')
                .replace(/њ/g, 'nj')
                .replace(/џ/g, 'dž')
                .replace(/А/g, 'A')
                .replace(/Б/g, 'B')
                .replace(/В/g, 'V')
                .replace(/Г/g, 'G')
                .replace(/Д/g, 'D')
                .replace(/Ђ/g, 'Đ')
                .replace(/Е/g, 'E')
                .replace(/Ж/g, 'Ž')
                .replace(/З/g, 'Z')
                .replace(/И/g, 'I')
                .replace(/Ј/g, 'J')
                .replace(/К/g, 'K')
                .replace(/Л/g, 'L')
                .replace(/М/g, 'M')
                .replace(/Н/g, 'N')
                .replace(/О/g, 'O')
                .replace(/П/g, 'P')
                .replace(/Р/g, 'R')
                .replace(/С/g, 'S')
                .replace(/Т/g, 'T')
                .replace(/Ћ/g, 'Ć')
                .replace(/У/g, 'U')
                .replace(/Ф/g, 'F')
                .replace(/Х/g, 'H')
                .replace(/Ц/g, 'C')
                .replace(/Ч/g, 'Č')
                .replace(/Ш/g, 'Š')
                .replace(/а/g, 'a')
                .replace(/б/g, 'b')
                .replace(/в/g, 'v')
                .replace(/г/g, 'g')
                .replace(/д/g, 'd')
                .replace(/ђ/g, 'đ')
                .replace(/е/g, 'e')
                .replace(/ж/g, 'ž')
                .replace(/з/g, 'z')
                .replace(/и/g, 'i')
                .replace(/ј/g, 'j')
                .replace(/к/g, 'k')
                .replace(/л/g, 'l')
                .replace(/м/g, 'm')
                .replace(/н/g, 'n')
                .replace(/о/g, 'o')
                .replace(/п/g, 'p')
                .replace(/р/g, 'r')
                .replace(/с/g, 's')
                .replace(/т/g, 't')
                .replace(/ћ/g, 'ć')
                .replace(/у/g, 'u')
                .replace(/ф/g, 'f')
                .replace(/х/g, 'h')
                .replace(/ц/g, 'c')
                .replace(/ч/g, 'č')
                .replace(/ш/g, 'š');
        }
    } if (lng == "Azeri") {
        if (scpt == "Cyrillic") {
            return inpt.replace(/Ya/g, 'Ја')
                .replace(/Ye/g, 'Је')
                .replace(/Yo/g, 'Јо')
                .replace(/Yu/g, 'Ју')
                .replace(/ya/g, 'ја')
                .replace(/ye/g, 'је')
                .replace(/yo/g, 'јо')
                .replace(/yu/g, 'ју')
                .replace(/A/g, 'А')
                .replace(/B/g, 'Б')
                .replace(/C/g, 'Ҹ')
                .replace(/Ç/g, 'Ч')
                .replace(/D/g, 'Д')
                .replace(/E/g, 'Е')
                .replace(/Ə/g, 'Ә')
                .replace(/F/g, 'Ф')
                .replace(/Ğ/g, 'Ғ')
                .replace(/G/g, 'Ҝ')
                .replace(/H/g, 'Һ')
                .replace(/İ/g, 'И')
                .replace(/I/g, 'Ы')
                .replace(/J/g, 'Ж')
                .replace(/K/g, 'К')
                .replace(/L/g, 'Л')
                .replace(/M/g, 'М')
                .replace(/N/g, 'Н')
                .replace(/O/g, 'О')
                .replace(/Ö/g, 'Ө')
                .replace(/P/g, 'П')
                .replace(/Q/g, 'Г')
                .replace(/R/g, 'Р')
                .replace(/S/g, 'С')
                .replace(/Ş/g, 'Ш')
                .replace(/T/g, 'Т')
                .replace(/U/g, 'У')
                .replace(/Ü/g, 'Ү')
                .replace(/V/g, 'В')
                .replace(/X/g, 'Х')
                .replace(/Y/g, 'Ј')
                .replace(/Z/g, 'З')
                .replace(/a/g, 'а')
                .replace(/b/g, 'б')
                .replace(/c/g, 'ҹ')
                .replace(/ç/g, 'ч')
                .replace(/d/g, 'д')
                .replace(/e/g, 'е')
                .replace(/ə/g, 'ә')
                .replace(/f/g, 'ф')
                .replace(/ğ/g, 'ғ')
                .replace(/g/g, 'ҝ')
                .replace(/h/g, 'һ')
                .replace(/i/g, 'и')
                .replace(/ı/g, 'ы')
                .replace(/j/g, 'ж')
                .replace(/k/g, 'к')
                .replace(/l/g, 'л')
                .replace(/m/g, 'м')
                .replace(/n/g, 'н')
                .replace(/o/g, 'о')
                .replace(/ö/g, 'ө')
                .replace(/p/g, 'п')
                .replace(/q/g, 'г')
                .replace(/r/g, 'р')
                .replace(/s/g, 'с')
                .replace(/ş/g, 'ш')
                .replace(/t/g, 'т')
                .replace(/u/g, 'у')
                .replace(/ü/g, 'ү')
                .replace(/v/g, 'в')
                .replace(/x/g, 'х')
                .replace(/y/g, 'ј')
                .replace(/z/g, 'з');
        } else if (scpt == "Latin") {
            return inpt.replace(/Ја/g, 'Ya')
                .replace(/Је/g, 'Ye')
                .replace(/Јо/g, 'Yo')
                .replace(/Ју/g, 'Yu')
                .replace(/ја/g, 'ya')
                .replace(/је/g, 'ye')
                .replace(/јо/g, 'yo')
                .replace(/ју/g, 'yu')
                .replace(/А/g, 'A')
                .replace(/Б/g, 'B')
                .replace(/Ҹ/g, 'C')
                .replace(/Ч/g, 'Ç')
                .replace(/Д/g, 'D')
                .replace(/Е/g, 'E')
                .replace(/Ә/g, 'Ə')
                .replace(/Ф/g, 'F')
                .replace(/Ғ/g, 'Ğ')
                .replace(/Ҝ/g, 'G')
                .replace(/Һ/g, 'H')
                .replace(/И/g, 'İ')
                .replace(/Ы/g, 'I')
                .replace(/Ж/g, 'J')
                .replace(/К/g, 'K')
                .replace(/Л/g, 'L')
                .replace(/М/g, 'M')
                .replace(/Н/g, 'N')
                .replace(/О/g, 'O')
                .replace(/Ө/g, 'Ö')
                .replace(/П/g, 'P')
                .replace(/Г/g, 'Q')
                .replace(/Р/g, 'R')
                .replace(/С/g, 'S')
                .replace(/Ш/g, 'Ş')
                .replace(/Т/g, 'T')
                .replace(/У/g, 'U')
                .replace(/Ү/g, 'Ü')
                .replace(/В/g, 'V')
                .replace(/Х/g, 'X')
                .replace(/Ј/g, 'Y')
                .replace(/З/g, 'Z')
                .replace(/а/g, 'a')
                .replace(/б/g, 'b')
                .replace(/ҹ/g, 'c')
                .replace(/ч/g, 'ç')
                .replace(/д/g, 'd')
                .replace(/е/g, 'e')
                .replace(/ә/g, 'ə')
                .replace(/ф/g, 'f')
                .replace(/ғ/g, 'ğ')
                .replace(/ҝ/g, 'g')
                .replace(/һ/g, 'h')
                .replace(/и/g, 'i')
                .replace(/ы/g, 'ı')
                .replace(/ж/g, 'j')
                .replace(/к/g, 'k')
                .replace(/л/g, 'l')
                .replace(/м/g, 'm')
                .replace(/н/g, 'n')
                .replace(/о/g, 'o')
                .replace(/ө/g, 'ö')
                .replace(/п/g, 'p')
                .replace(/г/g, 'q')
                .replace(/р/g, 'r')
                .replace(/с/g, 's')
                .replace(/ш/g, 'ş')
                .replace(/т/g, 't')
                .replace(/у/g, 'u')
                .replace(/ү/g, 'ü')
                .replace(/в/g, 'v')
                .replace(/х/g, 'x')
                .replace(/ј/g, 'y')
                .replace(/з/g, 'z');
        } else if (scpt == "Arabic") {
            return inpt.replace(/[ЈjYy][AаАа]/g, 'یَ')
                .replace(/[ЈjYy][EeЕе]/g, 'یێ')
                .replace(/[ЈjYy][OoОо]/g, 'یۆ')
                .replace(/[ЈjYy][UuУу]/g, 'یُ')
                .replace(/[AaАа]/g, 'ﺍ')
                .replace(/[BbБб]/g, 'ب')
                .replace(/[CcҸҹ]/g, 'ﺝ')
                .replace(/[ÇçЧч]/g, 'چ')
                .replace(/[DdДд]/g, 'ﺩ')
                .replace(/[EeЕе]/g, 'ێ')
                .replace(/[ƏəӘә]/g, 'ع')
                .replace(/[FfФф]/g, 'ﻑ')
                .replace(/[ĞğҒғ]/g, 'ﻍ')
                .replace(/[GgҜҝ]/g, 'گ')
                .replace(/[HhҺһ]/g, 'ﻩ')
                .replace(/[İiИи]/g, 'ی')
                .replace(/[IıЫы]/g, 'ی')
                .replace(/[JjЖж]/g, 'ژ')
                .replace(/[KkКк]/g, 'ک')
                .replace(/[LlЛл]/g, 'ﻝ')
                .replace(/[MmМм]/g, 'ﻡ')
                .replace(/[NnНн]/g, 'ﻥ')
                .replace(/[OoОо]/g, 'ۆ')
                .replace(/[ÖöӨө]/g, 'ﻭ')
                .replace(/[PpПп]/g, 'پ')
                .replace(/[QqГг]/g, 'ﻕ')
                .replace(/[RrРр]/g, 'ﺭ')
                .replace(/[SsСс]/g, 'س')
                .replace(/[ŞşШш]/g, 'ﺵ')
                .replace(/[TtТт]/g, 'ت')
                .replace(/[UuУу]/g, 'ﻭ')
                .replace(/[ÜüҮү]/g, 'ﻭ')
                .replace(/[VvВв]/g, 'ڤ')
                .replace(/[XxХх]/g, 'ﺥ')
                .replace(/[YyЈј]/g, 'ی')
                .replace(/[ZzЗз]/g, 'ز');
        }
    } else if (lng == "Kazakh") {
        if (scpt == "Cyrillic") {
            return inpt.replace(/IO/g, 'Ё')
                .replace(/TS/g, 'Ц')
                .replace(/CH/g, 'Ч')
                .replace(/SH/g, 'Ш')
                .replace(/IÝ/g, 'Ю')
                .replace(/IA/g, 'Я')
                .replace(/Io/g, 'Ё')
                .replace(/Ts/g, 'Ц')
                .replace(/Ch/g, 'Ч')
                .replace(/Sh/g, 'Ш')
                .replace(/Iý/g, 'Ю')
                .replace(/Ia/g, 'Я')
                .replace(/io/g, 'ё')
                .replace(/ts/g, 'ц')
                .replace(/ch/g, 'ч')
                .replace(/sh/g, 'ш')
                .replace(/iý/g, 'ю')
                .replace(/ia/g, 'я')
                .replace(/A/g, 'А')
                .replace(/Á/g, 'Ә')
                .replace(/B/g, 'Б')
                .replace(/V/g, 'В')
                .replace(/G/g, 'Г')
                .replace(/Ǵ/g, 'Ғ')
                .replace(/D/g, 'Д')
                .replace(/E/g, 'Е')
                .replace(/J/g, 'Ж')
                .replace(/Z/g, 'З')
                .replace(/I/g, 'И') /* also Й */
                .replace(/K/g, 'К')
                .replace(/Q/g, 'Қ')
                .replace(/L/g, 'Л')
                .replace(/M/g, 'М')
                .replace(/N/g, 'Н')
                .replace(/Ń/g, 'Ң')
                .replace(/O/g, 'О')
                .replace(/Ó/g, 'Ө')
                .replace(/P/g, 'П')
                .replace(/R/g, 'Р')
                .replace(/S/g, 'С')
                .replace(/T/g, 'Т')
                .replace(/Ý/g, 'У')
                .replace(/U/g, 'Ұ')
                .replace(/Ú/g, 'Ү')
                .replace(/F/g, 'Ф')
                .replace(/H/g, 'Х') /* also Һ */
                .replace(/Y/g, 'Ы')
                .replace(/I/g, 'І')
                .replace(/a/g, 'а')
                .replace(/á/g, 'ә')
                .replace(/b/g, 'б')
                .replace(/v/g, 'в')
                .replace(/g/g, 'г')
                .replace(/ǵ/g, 'ғ')
                .replace(/d/g, 'д')
                .replace(/e/g, 'е')
                .replace(/j/g, 'ж')
                .replace(/z/g, 'з')
                .replace(/ı/g, 'и') /* also й */
                .replace(/k/g, 'к')
                .replace(/q/g, 'қ')
                .replace(/l/g, 'л')
                .replace(/m/g, 'м')
                .replace(/n/g, 'н')
                .replace(/ń/g, 'ң')
                .replace(/o/g, 'о')
                .replace(/ó/g, 'ө')
                .replace(/p/g, 'п')
                .replace(/r/g, 'р')
                .replace(/s/g, 'с')
                .replace(/t/g, 'т')
                .replace(/ý/g, 'у')
                .replace(/u/g, 'ұ')
                .replace(/ú/g, 'ү')
                .replace(/f/g, 'ф')
                .replace(/h/g, 'х') /* also һ */
                .replace(/y/g, 'ы')
                .replace(/i/g, 'і');
        } else if (scpt == "Latin") {
            return inpt.replace(/Ё(?=[Ѐ-Я])/g, 'IO')
                .replace(/Ц(?=[Ѐ-Я])/g, 'TS')
                .replace(/Ч(?=[Ѐ-Я])/g, 'CH')
                .replace(/Ш(?=[Ѐ-Я])/g, 'SH')
                .replace(/Ю(?=[Ѐ-Я])/g, 'IÝ')
                .replace(/Я(?=[Ѐ-Я])/g, 'IA')
                .replace(/Ё/g, 'Io')
                .replace(/Ц/g, 'Ts')
                .replace(/Ч/g, 'Ch')
                .replace(/Ш/g, 'Sh')
                .replace(/Ю/g, 'Iý')
                .replace(/Я/g, 'Ia')
                .replace(/ё/g, 'io')
                .replace(/ц/g, 'ts')
                .replace(/ч/g, 'ch')
                .replace(/ш/g, 'sh')
                .replace(/ю/g, 'iý')
                .replace(/я/g, 'ia')
                .replace(/А/g, 'A')
                .replace(/Ә/g, 'Á')
                .replace(/Б/g, 'B')
                .replace(/В/g, 'V')
                .replace(/Г/g, 'G')
                .replace(/Ғ/g, 'Ǵ')
                .replace(/Д/g, 'D')
                .replace(/Е/g, 'E')
                .replace(/Ж/g, 'J')
                .replace(/З/g, 'Z')
                .replace(/И/g, 'I')
                .replace(/Й/g, 'I')
                .replace(/К/g, 'K')
                .replace(/Қ/g, 'Q')
                .replace(/Л/g, 'L')
                .replace(/М/g, 'M')
                .replace(/Н/g, 'N')
                .replace(/Ң/g, 'Ń')
                .replace(/О/g, 'O')
                .replace(/Ө/g, 'Ó')
                .replace(/П/g, 'P')
                .replace(/Р/g, 'R')
                .replace(/С/g, 'S')
                .replace(/Т/g, 'T')
                .replace(/У/g, 'Ý')
                .replace(/Ұ/g, 'U')
                .replace(/Ү/g, 'Ú')
                .replace(/Ф/g, 'F')
                .replace(/Х/g, 'H')
                .replace(/Һ/g, 'H')
                .replace(/Ы/g, 'Y')
                .replace(/І/g, 'I')
                .replace(/а/g, 'a')
                .replace(/ә/g, 'á')
                .replace(/б/g, 'b')
                .replace(/в/g, 'v')
                .replace(/г/g, 'g')
                .replace(/ғ/g, 'ǵ')
                .replace(/д/g, 'd')
                .replace(/е/g, 'e')
                .replace(/ж/g, 'j')
                .replace(/з/g, 'z')
                .replace(/и/g, 'ı')
                .replace(/й/g, 'ı')
                .replace(/к/g, 'k')
                .replace(/қ/g, 'q')
                .replace(/л/g, 'l')
                .replace(/м/g, 'm')
                .replace(/н/g, 'n')
                .replace(/ң/g, 'ń')
                .replace(/о/g, 'o')
                .replace(/ө/g, 'ó')
                .replace(/п/g, 'p')
                .replace(/р/g, 'r')
                .replace(/с/g, 's')
                .replace(/т/g, 't')
                .replace(/у/g, 'ý')
                .replace(/ұ/g, 'u')
                .replace(/ү/g, 'ú')
                .replace(/ф/g, 'f')
                .replace(/х/g, 'h')
                .replace(/һ/g, 'h')
                .replace(/ы/g, 'y')
                .replace(/і/g, 'i');
        }
    } else if (lng == "Arabic") {
        inpt = inpt.toLowerCase();
        if (scpt == "ALA-LC") {
            inpt = inpt.replace(/ʾal/g, 'al-')
            .replace(/al-/g, 'al-')
            .replace(/['ˈ,ˌ]/g, 'ʼ')
            .replace(/aa/g, 'ā')
            .replace(/ʾâ/g, 'ā')
            .replace(/[ʾā]/g, 'ā')
            .replace(/'aa/g, 'ā')
            .replace(/[ẗŧ]/g, 't')
            .replace(/[ỳà]/g, 'á')
            .replace(/ṯ/g, 'th')
            .replace(/[ǧj]/g, 'j')
            .replace(/ḥ/g, 'ḥ')
            .replace(/[ẖx]/g, 'kh')
            .replace(/[ḏđ]/g, 'dh')
            .replace(/š/g, 'sh')
            .replace(/ṣ/g, 'ṣ')
            .replace(/ḍ/g, 'ḍ')
            .replace(/ṭ/g, 'ṭ')
            .replace(/[ẓđ̣]/g, 'ẓ')
            .replace(/[ʿř]/g, 'ʻ')
            .replace(/[ġg]/g, 'gh')
            .replace(/w/g, 'w')
            .replace(/[ūoō]/g, 'ū')
            .replace(/y/g, 'y')
            .replace(/[īe]/g, 'ī');
            inpt = inpt.replace(/(^|[ ʼʻ-])([\wāáḍḥīŧṭūṣẓ])/g, function(txt){return txt.toUpperCase();});
            inpt = inpt.replace(/Al-/, 'al-');
            return inpt;
        } else if (scpt == "Wehr") {
            return inpt.replace(/ʾal-/g, 'al-')
            .replace(/al/g, 'al-')
            .replace(/['ˈ,ˌ]/g, 'ʼ')
            .replace(/aa/g, 'ā')
            .replace(/ʾâ/g, 'ā')
            .replace(/[ʾā]/g, 'ā')
            .replace(/'aa/g, 'ā')
            .replace(/[ẗŧ]/g, 't')
            .replace(/[ỳà]/g, 'ā')
            .replace(/ṯ/g, 'ṯ')
            .replace(/[ǧj]/g, 'j')
            .replace(/ḥ/g, 'ḥ')
            .replace(/[ẖx]/g, 'ḵ')
            .replace(/[ḏđ]/g, 'ḏ')
            .replace(/š/g, 'š')
            .replace(/ṣ/g, 'ṣ')
            .replace(/ḍ/g, 'ḍ')
            .replace(/ṭ/g, 'ṭ')
            .replace(/[ẓđ̣]/g, 'ẓ')
            .replace(/[ʿř]/g, 'ʻ')
            .replace(/[ġg]/g, 'ḡ')
            .replace(/w/g, 'w')
            .replace(/[ūoō]/g, 'ū')
            .replace(/y/g, 'y')
            .replace(/[īe]/g, 'ī');
        } else if (scpt == "DIN") {
            inpt = inpt.replace(/ʾal-/g, 'al-')
            .replace(/al/g, 'al-')
            .replace(/aa/g, 'ā')
            .replace(/['ˈ,ˌ]/g, 'ʾ')
            .replace(/ʾâ/g, 'ā')
            .replace(/[ʾā]/g, 'ā')
            .replace(/'aa/g, 'ā')
            .replace(/[ẗŧ]/g, 't')
            .replace(/[ỳà]/g, 'ā')
            .replace(/ṯ/g, 'ṯ')
            .replace(/[ǧj]/g, 'ǧ')
            .replace(/ḥ/g, 'ḥ')
            .replace(/[ẖx]/g, 'ḫ')
            .replace(/[ḏđ]/g, 'ḏ')
            .replace(/š/g, 'š')
            .replace(/ṣ/g, 'ṣ')
            .replace(/ḍ/g, 'ḍ')
            .replace(/ṭ/g, 'ṭ')
            .replace(/[ẓđ̣]/g, 'ẓ')
            .replace(/[ʿř]/g, 'ʿ')
            .replace(/[ġg]/g, 'ġ')
            .replace(/w/g, 'w')
            .replace(/[ūoō]/g, 'ū')
            .replace(/y/g, 'y')
            .replace(/[īe]/g, 'ī');
            inpt = inpt.replace(/(^|[ ʾʿ-])([\wāḍḏġǧḥḫīšṣtṭṯūwyẓ])/g, function(txt){return txt.toUpperCase();});
            inpt = inpt.replace(/Al-/, 'al-');
            return inpt;
        } else if (scpt == "UNGEGN") {
            inpt = inpt.replace(/al-/g, 'ʾal-')
            .replace(/al/g, 'al-')
            .replace(/['ˈ,ˌ]/g, 'ʼ')
            .replace(/aa/g, 'ā')
            .replace(/ʾâ/g, 'ā')
            .replace(/[ʾā]/g, 'ā')
            .replace(/'aa/g, 'ā')
            .replace(/[ẗŧ]/g, 't')
            .replace(/[ỳà]/g, 'y')
            .replace(/ṯ/g, 'th')
            .replace(/[ǧj]/g, 'j')
            .replace(/ḥ/g, 'ḩ')
            .replace(/[ẖx]/g, 'kh')
            .replace(/[ḏđ]/g, 'dh')
            .replace(/š/g, 'sh')
            .replace(/ṣ/g, 'ş')
            .replace(/ḍ/g, 'ḑ')
            .replace(/ṭ/g, 'ţ')
            .replace(/[ẓđ̣]/g, 'z̧')
            .replace(/[ʿř]/g, 'ʻ')
            .replace(/[ġg]/g, 'gh')
            .replace(/w/g, 'w')
            .replace(/[ūoō]/g, 'w')
            .replace(/y/g, 'y')
            .replace(/[īe]/g, 'y');
            inpt = inpt.replace(/(^|[ ʼʻ-])([\wāḑḩşţz̧])/g, function(txt){return txt.toUpperCase();});
            inpt = inpt.replace(/Al-/, 'al-');
            return inpt;
        } else if (scpt == "SAS") {
            inpt = inpt.replace(/ʾal-/g, 'al-')
            .replace(/al/g, 'al-')
            .replace(/aa/g, 'ā')
            .replace(/['ˈ,ˌ]/g, 'ʾ')
            .replace(/ʾâ/g, 'ā')
            .replace(/[ʾā]/g, 'ā')
            .replace(/'aa/g, 'ā')
            .replace(/[ẗŧ]/g, 't')
            .replace(/[ỳà]/g, 'à')
            .replace(/ṯ/g, 'ç')
            .replace(/[ǧj]/g, 'ŷ')
            .replace(/ḥ/g, 'ḥ')
            .replace(/[ẖx]/g, 'j')
            .replace(/[ḏđ]/g, 'ḏ')
            .replace(/š/g, 'š')
            .replace(/ṣ/g, 'ṣ')
            .replace(/ḍ/g, 'ḍ')
            .replace(/ṭ/g, 'ṭ')
            .replace(/[ẓđ̣]/g, 'ẓ')
            .replace(/[ʿř]/g, 'ʿ')
            .replace(/[ġg]/g, 'ğ')
            .replace(/w/g, 'w')
            .replace(/[ūoō]/g, 'ū')
            .replace(/y/g, 'y')
            .replace(/[īe]/g, 'ī');
            inpt = inpt.replace(/(^|[ ʾʿ-])([\wàāçḍḏğḥīšṣṭūŷẓ])/g, function(txt){return txt.toUpperCase();});
            inpt = inpt.replace(/Al-/, 'al-');
            return inpt;
        } else if (scpt == "BATR") {
            inpt = inpt.replace(/ʾal-/g, 'Al-')
            .replace(/al/g, 'Al-')
            .replace(/['ˈ,ˌ]/g, 'e')
            .replace(/aa/g, 'A')
            .replace(/ʾâ/g, 'eaa')
            .replace(/[ʾā]/g, 'A')
            .replace(/'aa/g, 'eaa')
            .replace(/[ẗŧ]/g, 't')
            .replace(/[ỳà]/g, 'aaa')
            .replace(/ṯ/g, 'c')
            .replace(/[ǧj]/g, 'j')
            .replace(/ḥ/g, 'H')
            .replace(/[ẖx]/g, 'K')
            .replace(/[ḏđ]/g, 'z')
            .replace(/š/g, 'x')
            .replace(/ṣ/g, 'S')
            .replace(/ḍ/g, 'D')
            .replace(/ṭ/g, 'T')
            .replace(/[ẓđ̣]/g, 'Z')
            .replace(/[ʿř]/g, 'E')
            .replace(/[ġg]/g, 'g')
            .replace(/w/g, 'w')
            .replace(/[ūoō]/g, 'uu')
            .replace(/y/g, 'y')
            .replace(/[īe]/g, 'ii');
            return inpt;
        } else if (scpt == "Google") {
            inpt = inpt+"_"
            inpt = inpt.replace(/ʾal-/g, 'al')
            .replace(/al-/g, 'al')
            .replace(/['ˈʾ,ˌ]/g, '\'')
            .replace(/aa/g, 'aa')
            .replace(/bsā/g, 'bsa')
            .replace(/iyā/g, 'ia')
            .replace(/[r]ā[ :_!]/g, function(txt){return txt.replace(/ā/, 'aan');})
            .replace(/ā/g, 'a')
            .replace(/ʾâ/g, 'a')
            .replace(/'aa/g, 'a')
            .replace(/'[ :_!]/g, function(txt){return txt.replace(/'/, '\'a');})
            .replace(/wa-al/g, 'wal')
            .replace(/wal'a/g, 'wal\'u')
            .replace(/fla/g, 'fila')
            .replace(/rē/g, 'ri')
            .replace(/[k]ē/g, function(txt){return txt.replace(/ē/, 'i');})
            .replace(/ē/g, 'ay')
            .replace(/bi/g, 'bay')
            .replace(/ti/g, 'ta')
            .replace(/ŧ/g, 't')
            .replace(/ẗ_/g, '')
            .replace(/ẗ/g, 't')
            .replace(/[ỳà]/g, 'aa')
            .replace(/ṯ/g, 'th')
            .replace(/[ǧj]/g, 'j')
            .replace(/bsẖ/g, 'bish')
            .replace(/sẖ/g, 'sh')
            .replace(/dẖ/g, 'dhi')
            .replace(/[ẖx]/g, 'kh')
            .replace(/[ḏđ]/g, 'dh')
            .replace(/bh/g, 'bih')
            .replace(/ḥ/g, 'h')
            .replace(/š/g, 'sh')
            .replace(/ṣ/g, 's')
            .replace(/ḍ/g, 'd')
            .replace(/ṭ/g, 't')
            .replace(/w/g, 'w')
            .replace(/[ūo]/g, 'u')
            .replace(/dō/g, 'daw')
            .replace(/[ẓđ̣]/g, 'z')
            .replace(/ʿamm/g, 'eumm')
            .replace(/[ʿř]/g, 'e')
            .replace(/[ġg]/g, 'gh')
            .replace(/[lt]īs/g, function(txt){return txt.replace(/ī/, 'ays');})
            .replace(/[ln]ī/g, function(txt){return txt.replace(/ī/, 'y');})
            .replace(/shī/g, 'shy')
            .replace(/ī/g, 'i')
            .replace(/ghī/g, 'ghi')
            .replace(/ōr/g, 'uwr')
            .replace(/ō/g, 'u')
            .replace(/y/g, 'y')
            .replace(/enj/g, 'anj')
            .replace(/-/g, '')
 
            .replace(/dins/g, 'dans')
            .replace(/swit/g, 'suayat')
            .replace(/ayk/g, 'ayik')
            .replace(/tar/g, 'ttir')
            .replace(/rkal/g, 'rikil');
            return inpt.substr(0,inpt.length-1);
        }
    }
}
function addAccent(vowels,accent,lang) {
    if (lang == "Cantonese") {
        if (accent == '´') {
            return vowels.replace(/yu/, 'yú')
            .replace(/eu/, 'éu')
            .replace(/aa/, 'áa')
            .replace(/^a/, 'á')
            .replace(/e/, 'é')
            .replace(/i/, 'í')
            .replace(/o/, 'ó')
            .replace(/^u/, 'ú');
        } else if (accent == '`') {
            return vowels.replace(/yu/, 'yù')
            .replace(/eu/, 'èu')
            .replace(/aa/, 'àa')
            .replace(/^a/, 'à')
            .replace(/e/, 'è')
            .replace(/i/, 'ì')
            .replace(/o/, 'ò')
            .replace(/^u/, 'ù');
        } else if (accent == '¯') {
            return vowels.replace(/yu/, 'yū')
            .replace(/eu/, 'ēu')
            .replace(/aa/, 'āa')
            .replace(/^a/, 'ā')
            .replace(/e/, 'ē')
            .replace(/i/, 'ī')
            .replace(/o/, 'ō')
            .replace(/^u/, 'ū');
        }
    } else if (lang == "BarnettChao") {
        if (accent == 'high') {
            vowels += "h";
            return vowels.replace(/ih$/, 'y')
            .replace(/uuh$/, 'ww')
            .replace(/uh$/, 'w')
            .replace(/ngh$/, 'nq')
            .replace(/nh$/, 'nn')
            .replace(/mh$/, 'mm');
        } else if (accent == 'low') {
            vowels += "r";
            return vowels.replace(/ir$/, 'e')
            .replace(/uur$/, 'oo')
            .replace(/ur$/, 'o');
        }
    } else if (lang == "Mandarin") {
        if (accent == 'ˇ') {
            return vowels.replace(/^ia/, 'iǎ')
            .replace(/^ie/, 'iě')
            .replace(/^iu/, 'iǔ')
            .replace(/^ua/, 'uǎ')
            .replace(/^ui/, 'uǐ')
            .replace(/^ue/, 'uě')
            .replace(/^a/, 'ǎ')
            .replace(/^e/, 'ě')
            .replace(/^o/, 'ǒ')
            .replace(/^u$/, 'ǔ')
            .replace(/^i$/, 'ǐ')
            .replace(/^ü/, 'ǚ');
        } else if (accent == '´') {
            return vowels.replace(/^ia/, 'iá')
            .replace(/^ie/, 'ié')
            .replace(/^iu/, 'iú')
            .replace(/^ua/, 'uá')
            .replace(/^ui/, 'uí')
            .replace(/^ue/, 'ué')
            .replace(/^a/, 'á')
            .replace(/^e/, 'é')
            .replace(/^o/, 'ó')
            .replace(/^u$/, 'ú')
            .replace(/^i$/, 'í')
            .replace(/^ü/, 'ǘ');
        } else if (accent == '`') {
            return vowels.replace(/^ia/, 'ià')
            .replace(/^ie/, 'iè')
            .replace(/^iu/, 'iù')
            .replace(/^ua/, 'uà')
            .replace(/^ui/, 'uì')
            .replace(/^ue/, 'uè')
            .replace(/^a/, 'à')
            .replace(/^e/, 'è')
            .replace(/^o/, 'ò')
            .replace(/^u$/, 'ù')
            .replace(/^i$/, 'ì')
            .replace(/^ü/, 'ǜ');
        } else if (accent == '¯') {
            return vowels.replace(/^ia/, 'iā')
            .replace(/^ie/, 'iē')
            .replace(/^iu/, 'iū')
            .replace(/^ua/, 'uā')
            .replace(/^ui/, 'uī')
            .replace(/^ue/, 'uē')
            .replace(/^a/, 'ā')
            .replace(/^e/, 'ē')
            .replace(/^o/, 'ō')
            .replace(/^u$/, 'ū')
            .replace(/^i$/, 'ī')
            .replace(/^ü/, 'ǖ');
        }
    } else if (lang == "Gwoyeu") {
        if (accent == '2') {
            vowels += "r";
            return vowels.replace(/^[aemn]ir/, function(txt){return txt.replace(/r/, '');})
            .replace(/[lmw][aemn]ir/, function(txt){return txt.replace(/r/, '');})
            .replace(/^pi$/, 'pyi')
            .replace(/^pi/, 'py')
            .replace(/ir/, 'yi')
            .replace(/ia[bcdfghjklmnprstz]+r/, function(txt){return txt.replace(/i/, 'y').replace(/r/, '');})
            .replace(/ie[bcdfghjklmnprstz]+r/, function(txt){return txt.replace(/i/, 'y').replace(/r/, '');})
            .replace(/io[bcdfghjklmnprstz]+r/, function(txt){return txt.replace(/i/, 'y').replace(/r/, '');})
            .replace(/^(r|y|ch|n|m|l|k|tw|sh)[a-z]+r/, function(txt){return txt.replace(/[glnoru]r/, function(txt){return txt.replace(/r/, '');});});
        } else if (accent == '3') {
            return vowels.replace(/a$/, 'aa')
            .replace(/an/, 'aan')
            .replace(/e$/, 'ee')
            .replace(/el$/, 'eel')
            .replace(/uei$/, 'oe1')
            .replace(/ing$/, 'iing')
            .replace(/i/, 'e')
            .replace(/^ou/, 'oou')
            .replace(/[^e]ou/, function(txt){return txt.replace(/o/, 'oo');})
            .replace(/on/, 'oon')
            .replace(/y$/, 'yy')
            .replace(/1/, 'i');
        } else if (accent == '4') {
            vowels += "h";
            return vowels.replace(/aih/, 'ay')
            .replace(/eih/, 'ey')
            .replace(/auh/, 'aw')
            .replace(/iuh/, 'iw')
            .replace(/ouh/, 'ow')
            .replace(/buh/, 'bu')
            .replace(/suh/, 'su')
            .replace(/ngh/, 'nq')
            .replace(/nh/, 'nn')
            .replace(/lh/, 'll');
        }
    }
}
 
$(window).on("scroll", function() {
    for (i=0;i<($(".ns-0 .youtube-placeholderlink").size());i++) {
        currentItem = $(".youtube-placeholderlink")[i];
        if (isScrolledIntoView(currentItem)) {
            embeedId = $(currentItem).attr("data-id");
            $(currentItem).replaceWith('<iframe width="427" height="240" src="http://www.youtube.com/embed/'+embeedId+'"frameborder="0" allowfullscreen style="margin: 0 1px;"></iframe>');
        }
    }
    for (i=0;i<($(".ns-0 .spotify-placeholderlink").size());i++) {
        currentItem = $(".spotify-placeholderlink")[i];
        if (isScrolledIntoView(currentItem)) {
            embeedId = $(currentItem).attr("data-id");
            $(currentItem).replaceWith('<iframe width="640" height="80" src="https://embed.spotify.com/?uri=spotify:track:'+embeedId+'"frameborder="0" allowtransparency="true" style="margin: 0 1px;"></iframe>');
        }
    }
});
 
function isScrolledIntoView(elem)
{
    var $elem = $(elem);
    var $window = $(window);
 
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();
 
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();
 
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}