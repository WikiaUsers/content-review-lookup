(function($, mw) {
 
    /*
    **  Configuration of clocks module, clocks module can generate multiple clocks.
    **      clocksModuleLabels: an array who define the name of clocks
    **      clocksModuleTimezones: an array who define timezones of clocks
    **      clocksModuleFormat: an array who define the output of date format.
    */
    var clocksModuleLabels = window.clocksModuleLabels || ["UTC"];
    var clocksModuleTimezones = window.clocksModuleTimezones || ["UTC"];
    var clocksModuleFormat = window.clocksModuleFormat || [{local : "en", format : "%H:%M:%S %a\n%m/%d/%Y"}];

/*
var j = new Array( "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" );
var d = new Date();

if ((j[d.getDay() - 1]) == "Lundi") {
    var url = "https://vignette.wikia.nocookie.net/sword-art-online-memory-defrag/images/d/dc/BannièreExclusiveLundi.png/revision/latest?cb=20180120123049&path-prefix=fr";
  }
  if ((j[d.getDay() - 1]) == "Mardi") {
    var url = "https://vignette.wikia.nocookie.net/sword-art-online-memory-defrag/images/c/cb/BannièreExclusiveMardi.png/revision/latest?cb=20180120123106&path-prefix=fr";
  }
  if ((j[d.getDay() - 1]) == "Mercredi") {
    var url = "https://vignette.wikia.nocookie.net/sword-art-online-memory-defrag/images/7/71/BannièreExclusiveMercredi.png/revision/latest?cb=20180120123130&path-prefix=fr";
  }
  if ((j[d.getDay() - 1]) == "Jeudi") {
    var url = "https://vignette.wikia.nocookie.net/sword-art-online-memory-defrag/images/2/23/BannièreExclusiveJeudi.png/revision/latest?cb=20180120123409&path-prefix=fr";
  }
  if ((j[d.getDay() - 1]) == "Vendredi") {
    var url = "https://vignette.wikia.nocookie.net/sword-art-online-memory-defrag/images/9/99/BannièreExclusiveVendredi.png/revision/latest?cb=20180120123428&path-prefix=fr";
  }
  if ((j[d.getDay() - 1]) == "Samedi") {
    var url = "https://vignette.wikia.nocookie.net/sword-art-online-memory-defrag/images/2/2e/BannièreExclusiveSamedi.png/revision/latest?cb=20180120113717&path-prefix=fr";
  }
  if ((j[d.getDay() - 1]) == "Dimanche") {
    var url = "https://vignette.wikia.nocookie.net/sword-art-online-memory-defrag/images/9/9d/BannièreExclusiveDimanche.png/revision/latest?cb=20180120123459&path-prefix=fr";
  }
    */
  
  
    /*
    **  Function for generate html code of clocks on all pages and launch clock
    */
    function initClocks() {
        var $rail = $('#WikiaRail');
 
        if ($rail.length === 0)
            return;
 
        var htmlClocksContainer = '<section id="wiki-custom-clockModule" class="module">';
        for (i = 0; i < clocksModuleLabels.length; ++i) {
            htmlClocksContainer = htmlClocksContainer + 
                '<div class="clocksModule ' + clocksModuleLabels[i] + '">'+
                    '<b style="font-weight: bold; letter-spacing: 0.75px; line-height: 16px; text-decoration: none; text-transform: uppercase; font-family: Roboto-Regular, HelveticaNeue, Arial, sans-serif">' + clocksModuleLabels[i] + '</b> <br/>' +
                    '<span style="font-size: 16px; letter-spacing: 0.75px; text-decoration: none; font-family: Roboto-Regular, HelveticaNeue, Arial, sans-serif;" id="clock'+ clocksModuleLabels[i] + '">' + 
                    '</span>'+
                '</div>'
                /*'<img src="' + url + '" style="width: 100%;"/>'+
                '<span><img src="https://vignette.wikia.nocookie.net/sword-art-online-memory-defrag/images/f/f8/UrgentQuest-S-Class_Ingredient_Drops_Banner.png/revision/latest?cb=20180120120356&path-prefix=fr" style="width: 100%;"/></span>'*/
                ;
        }
 
        htmlClocksContainer = htmlClocksContainer + '</section>';
        $(htmlClocksContainer).appendTo($rail);
 
        setInterval( function () {
            refreshClock();
            }, 1000
        );
    }
 
    function dateSplitByLocal(date, local) {
        var locals = {
            "en" : {delimiter : "[/, :]", format : "%m%d%Y%H%M%S%a"},
            "be" : {delimiter : "[., :]", format : "%d%m%Y%H%M%S"},
            "bg" : {delimiter : "[.г, :]", format : "%d%m%Y%H%M%S"},
            "bs" : {delimiter : "[. :]", format : "%d%m%Y%H%M%S"},
            "ca" : {delimiter : "[/, :]", format : "%d%m%Y%H%M%S"},
            "cs" : {delimiter : "[. :]", format : "%d%m%Y%H%M%S"},
            "da" : {delimiter : "[/ .]", format : "%d%m%Y%H%M%S"},
            "de" : {delimiter : "[., :]", format : "%d%m%Y%H%M%S"},
            "el" : {delimiter : "[/, :]", format : "%d%m%Y%H%M%S%a"},
            "eo" : {delimiter : "[- :]", format : "%Y%m%d%H%M%S"},
            "es" : {delimiter : "[/ :]", format : "%d%m%Y%H%M%S"},
            "eu" : {delimiter : "[/ :]", format : "%Y%m%d%H%M%S"},
            "fr" : {delimiter : "[/ à:]", format : "%d%m%Y%H%M%S"},
            "fy" : {delimiter : "[- :]", format : "%d%m%Y%H%M%S"},
            "ga" : {delimiter : "[/ :]", format : "%d%m%Y%H%M%S"},
            "gl" : {delimiter : "[:, /]", format : "%H%M%S%d%m%Y"},
            "hr" : {delimiter : "[. :]", format : "%d%m%Y%H%M%S"},
            "it" : {delimiter : "[/, :]", format : "%d%m%Y%H%M%S"},
            "ja" : {delimiter : "[/ :]", format : "%Y%m%d%H%M%S"},
            "ko" : {delimiter : "[. :]", format : "%Y%m%d%a%H%M%S"},
            "mo" : {delimiter : "[., :]", format : "%d%m%Y%H%M%S"},
            "nl" : {delimiter : "[- :]", format : "%d%m%Y%H%M%S"},
            "nl-informal" : {delimiter : "[- :]", format : "%d%m%Y%H%M%S"},
            "pl" : {delimiter : "[., :]", format : "%d%m%Y%H%M%S"},
            "pt" : {delimiter : "[/ :]", format : "%d%m%Y%H%M%S"},
            "pt-br" : {delimiter : "[/ :]", format : "%d%m%Y%H%M%S"},
            "ro" : {delimiter : "[., :]", format : "%d%m%Y%H%M%S"},
            "ru" : {delimiter : "[., :]", format : "%d%m%Y%H%M%S"},
            "sr" : {delimiter : "[. :]", format : "%d%m%Y%H%M%S"},
            "sv" : {delimiter : "[- :]", format : "%Y%m%d%H%M%S"},
            "tr" : {delimiter : "[. :]", format : "%d%m%Y%H%M%S"},
            "uk" : {delimiter : "[., :]", format : "%d%m%Y%H%M%S"},
            "zh" : {delimiter : "[/ :]", format : "%Y%m%d%H%M%S"},
            "zh-hant" : {delimiter : "[/ :]", format : "%Y%m%d%H%M%S"}
            };
 
        var values = date.split(new RegExp(locals[local].delimiter)).filter(String);
        var keys = locals[local].format.split("%").filter(String);
 
        var result = {};
        for (var i = 0; i < keys.length; i++)
            result[keys[i]] = values[i];
 
        return result;
    }
 
    function getStringFormat(arrayDate, format) {
        var result = format;
 
        result = result.replace("\n", "<br/>");
        result = result.replace("%d", arrayDate.d);
        result = result.replace("%m", arrayDate.m);
        result = result.replace("%Y", arrayDate.Y);
        result = result.replace("%H", arrayDate.H);
        result = result.replace("%M", arrayDate.M);
        result = result.replace("%S", arrayDate.S);
        if (result.match(new RegExp("%a"))) {
            result = result.replace("%a", arrayDate.a);
        }
 
        return result;
    }
 
    /*
    ** Function for refresh date in html's element create before
    */
    function refreshClock()
    {
        for (i = 0; i < clocksModuleLabels.length; ++i) {
            var local = clocksModuleFormat.hasOwnProperty(i) ? clocksModuleFormat[i].local : "en";
            var tz = clocksModuleTimezones.hasOwnProperty(i) ? clocksModuleTimezones[i] : "UTC";
            var format = clocksModuleFormat.hasOwnProperty(i) ? clocksModuleFormat[i].format : "%H:%M:%S %a\n%m%d%Y";
            var date = new Date().toLocaleString(local, { timeZone: tz });
 
            var arrayDate = dateSplitByLocal(date, local);
            document.getElementById("clock" + clocksModuleLabels[i]).innerHTML = getStringFormat(arrayDate, format);
        }
 
        return true;
    }
 
    /*
    **  Load script on any page
    */
    $(function() {
        initClocks();
    });
 
}(jQuery, mediaWiki));

    /*
    ** Script originel de Matt2905 [http://dev.wikia.com/wiki/User_talk:Matt2905]; 
    ** Prior approval of script at http://fr.dokkanbattlefr.wikia.com/wiki/MediaWiki:ClocksModule.js
    */