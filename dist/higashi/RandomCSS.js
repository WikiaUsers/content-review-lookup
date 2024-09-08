// Random CSS for specific pages
// Date A Live
if (mediaWiki.config.get('wgPageName') === 'Date_A_Live') {
    var link = [];
    link[0] = "http://higashi.wikia.com/index.php?title=MediaWiki:Date_A_Live.css/DAL_00.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[1] = "http://higashi.wikia.com/index.php?title=MediaWiki:Date_A_Live.css/DAL_01.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[2] = "http://higashi.wikia.com/index.php?title=MediaWiki:Date_A_Live.css/DAL_02.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    $(function() {
        var style = link[Math.floor(Math.random() * link.length)];
        if (document.createStyleSheet) {
            document.createStyleSheet(style);
        } else {
            $('<link />', {
                rel: 'stylesheet',
                type: 'text/css',
                href: style
            }).appendTo('head');
        }
    });
}
// Fate/Zero
if (mediaWiki.config.get('wgPageName') === 'Fate/Zero') {
    var link = [];
    link[0] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_00.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[1] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_01.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[2] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_02.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[3] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_03.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[4] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_04.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[5] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_05.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[6] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_06.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[7] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_07.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[8] = "http://higashi.wikia.com/index.php?title=MediaWiki:Fate_Zero.css/Fate_08.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    $(function() {
        var style = link[Math.floor(Math.random() * link.length)];
        if (document.createStyleSheet) {
            document.createStyleSheet(style);
        } else {
            $('<link />', {
                rel: 'stylesheet',
                type: 'text/css',
                href: style
            }).appendTo('head');
        }
    });
}
// Steins;Gate
if (mediaWiki.config.get('wgPageName') === 'Steins;Gate') {
    var link = [];
    link[0] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_00.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[1] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_01.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[2] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_02.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[3] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_03.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[4] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_04.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[5] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_05.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[6] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_06.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[7] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_07.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[8] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_08.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[9] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_09.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[10] = "http://higashi.wikia.com/index.php?title=MediaWiki:Steins_Gate.css/Steins_10.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    $(function() {
        var style = link[Math.floor(Math.random() * link.length)];
        if (document.createStyleSheet) {
            document.createStyleSheet(style);
        } else {
            $('<link />', {
                rel: 'stylesheet',
                type: 'text/css',
                href: style
            }).appendTo('head');
        }
    });
}
// Mainpage
if (mediaWiki.config.get('wgPageName') === 'Sonako_Light_Novel') {
    var link = [];
    link[0] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_00.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[1] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_01.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[2] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_02.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[3] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_03.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[4] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_04.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[5] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_05.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[6] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_06.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[7] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_07.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[8] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_08.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[9] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_09.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[10] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_10.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[11] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_11.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[12] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_12.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[13] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_13.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[14] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_14.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[15] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_15.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[16] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_16.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[17] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_17.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[18] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_18.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[19] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_19.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[20] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_20.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[21] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_21.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[22] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_22.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[23] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_23.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[24] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_24.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[25] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_25.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[26] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_26.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[27] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_27.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[28] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_28.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[29] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_29.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[30] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_30.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[31] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_31.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[32] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_32.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[33] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_33.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[34] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_34.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[35] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_35.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[36] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_36.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[37] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_37.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[38] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_38.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[39] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_39.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[40] = "http://higashi.wikia.com/index.php?title=MediaWiki:Mainpage.css/Main_40.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    $(function() {
        var style = link[Math.floor(Math.random() * link.length)];
        if (document.createStyleSheet) {
            document.createStyleSheet(style);
        } else {
            $('<link />', {
                rel: 'stylesheet',
                type: 'text/css',
                href: style
            }).appendTo('head');
        }
    });
}
// WikiActivity
if ( mediaWiki.config.get( 'wgCanonicalSpecialPageName' ) === 'WikiActivity') {
    var link = [];
    link[0] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_00.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[1] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_01.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[2] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_02.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[3] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_03.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[4] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_04.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[5] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_05.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[6] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_06.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[7] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_07.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[8] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_08.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[9] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_09.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[10] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_10.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[11] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_11.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[12] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_12.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[13] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_13.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[14] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_14.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[15] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_15.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[16] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_16.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[17] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_17.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[18] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_18.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[19] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_19.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[20] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_20.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[21] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_21.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[22] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_22.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[23] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_23.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[24] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_24.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[25] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_25.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[26] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_26.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[27] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_27.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[28] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_28.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[29] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_29.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[30] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_30.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[31] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_31.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[32] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_32.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[33] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_33.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[34] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_34.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[35] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_35.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[36] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_36.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[37] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_37.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[38] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_38.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[39] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_39.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[40] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_40.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[41] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_41.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[42] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_42.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[43] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_43.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[44] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_44.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[45] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_45.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[46] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_46.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[47] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_47.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[48] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_48.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[49] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_49.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[50] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_50.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[51] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_51.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[52] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_52.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[53] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_53.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[54] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_54.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[55] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_55.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[56] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_56.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[57] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_57.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[58] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_58.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[59] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_59.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[60] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_60.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[61] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_61.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[62] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_62.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[63] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_63.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[64] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_64.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[65] = "http://higashio.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_65.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[66] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_66.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[67] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_67.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[68] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_68.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[69] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_69.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[70] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_70.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[70] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_70.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[71] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_71.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[72] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_72.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[73] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_73.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[74] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_74.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[75] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_75.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[76] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_76.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[77] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_77.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[78] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_78.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[79] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_79.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[80] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_80.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[81] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_81.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[82] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_82.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[83] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_83.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[84] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_84.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[85] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_85.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[86] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_86.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[87] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_87.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[88] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_88.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[89] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_89.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[90] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_90.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[91] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_91.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[92] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_92.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[93] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_93.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[94] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_94.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[95] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_95.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[96] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_96.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[97] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_97.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[98] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_98.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[99] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_99.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[100] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_100.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[101] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_101.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[102] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_102.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[103] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_103.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[104] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_104.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[105] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_105.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[106] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_106.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[107] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_107.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[108] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_108.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[109] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_109.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[110] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_110.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[111] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_111.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[112] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_112.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[113] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_113.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[114] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_114.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[115] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_115.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[116] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_116.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[117] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_117.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[118] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_118.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[119] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_119.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[120] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_120.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[121] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_121.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[122] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_122.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[123] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_123.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[124] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_124.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[125] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_125.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[126] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_126.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[127] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_127.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[128] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_128.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[129] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_129.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[130] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_130.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[131] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_131.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[132] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_132.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[133] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_133.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[134] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_134.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[135] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_135.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[136] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_136.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[137] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_137.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[138] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_138.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[139] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_139.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[140] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_140.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[141] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_141.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[142] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_142.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[143] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_143.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[144] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_144.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[145] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_145.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[146] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_146.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[147] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_147.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[148] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_148.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[149] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_149.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[150] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_150.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[151] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_151.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[152] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_152.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[153] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_153.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[154] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_154.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[155] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_155.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[156] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_156.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[157] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_157.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[158] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_158.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[159] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_159.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[160] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_160.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[161] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_161.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[162] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_162.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[163] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_163.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[164] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_164.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[165] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_165.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[166] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_166.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[167] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_167.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[168] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_168.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[169] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_169.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[170] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_170.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[171] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_171.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[172] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_172.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[173] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_173.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[174] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_174.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[175] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_175.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[176] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_176.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[177] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_177.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[178] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_178.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[179] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_179.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[180] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_180.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[181] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_181.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[182] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_182.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[183] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_183.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[184] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_184.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[185] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_185.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[186] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_186.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[187] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_187.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[188] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_188.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[189] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_189.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[190] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_190.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[191] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_191.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[192] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_192.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[193] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_193.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[194] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_194.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[195] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_195.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[196] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_196.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[197] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_197.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[198] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_198.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[199] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_199.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[200] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_200.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[201] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_201.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[202] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_202.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[203] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_203.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[204] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_204.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[205] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_205.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[206] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_206.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[207] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_207.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[208] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_208.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[209] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_209.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[210] = "http://higashi.wikia.com/index.php?title=MediaWiki:Activity.css/Activity_210.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    $(function() {
        var style = link[Math.floor(Math.random() * link.length)];
        if (document.createStyleSheet) {
            document.createStyleSheet(style);
        } else {
            $('<link />', {
                rel: 'stylesheet',
                type: 'text/css',
                href: style
            }).appendTo('head');
        }
    });
}
// Danh sách project
if (mediaWiki.config.get('wgPageName') === 'Danh_sách_các_project') {
    var link = [];
    link[0] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_00.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[1] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_01.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[2] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_02.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[3] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_03.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[4] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_04.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[5] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_05.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[6] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_06.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[7] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_07.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[8] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_08.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[9] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_09.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[10] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_10.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[11] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_11.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[12] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_12.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[13] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_13.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[14] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_14.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[15] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_15.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[16] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_16.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[17] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_17.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[18] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_18.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[19] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_19.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[20] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_20.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[21] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_21.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[22] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_22.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[23] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_23.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[24] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_24.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[25] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_25.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[26] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_26.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[27] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_27.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[28] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_28.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[29] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_29.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[30] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_30.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[31] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_31.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[32] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_32.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[33] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_33.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[34] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_34.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[35] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_35.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[36] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_36.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[37] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_37.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[38] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_38.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[39] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_39.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[40] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_40.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[41] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_41.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[42] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_42.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[43] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_43.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[44] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_44.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[45] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_45.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[46] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_46.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[47] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_47.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[48] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_48.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[49] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_49.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[50] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_50.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[51] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_51.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[52] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_52.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[53] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_53.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[54] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_54.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[55] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_55.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[56] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_56.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[57] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_57.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[58] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_58.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[59] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_59.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[60] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_60.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[61] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_61.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[62] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_62.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[63] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_63.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[64] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_64.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[65] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_65.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[66] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_66.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[67] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_67.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[68] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_68.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[69] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_69.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[70] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_70.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[71] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_71.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[72] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_72.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[73] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_73.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[74] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_74.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[75] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_75.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[76] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_76.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[77] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_77.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[78] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_78.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[79] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_79.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[80] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_80.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[81] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_81.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[82] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_82.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[83] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_83.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[84] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_84.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[85] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_85.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[86] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_86.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[87] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_87.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[88] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_88.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[89] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_89.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[90] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_90.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[91] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_91.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[92] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_92.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[93] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_93.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[94] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_94.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[95] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_95.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[96] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_96.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[97] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_97.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[98] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_98.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[99] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_99.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[100] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_100.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[101] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_101.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[102] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_102.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[103] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_103.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[104] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_104.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[105] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_105.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[106] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_106.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[107] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_107.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[108] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_108.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[109] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_109.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[110] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_110.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[111] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_111.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    link[112] = "http://higashi.wikia.com/index.php?title=MediaWiki:Project.css/Project_112.css&action=raw&ctype=text/css&maxage=0&smaxage=0";
    $(function() {
        var style = link[Math.floor(Math.random() * link.length)];
        if (document.createStyleSheet) {
            document.createStyleSheet(style);
        } else {
            $('<link />', {
                rel: 'stylesheet',
                type: 'text/css',
                href: style
            }).appendTo('head');
        }
    });
}