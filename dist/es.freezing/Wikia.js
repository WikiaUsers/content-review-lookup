/*Flag extra en el Masthead */
    (function () {
        "use strict";
        var userRightsList = {
            "Usui Uzumaki": ["Limiter"],
 
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());

// Sistema de Nivel
if ($("#UserProfileMasthead").size()) {
    editRanks = {
		1: "1", 10: "2", 20: "3", 32: "4", 47: "5", 66: "6", 90: "7", 120: "8", 157: "9", 202: "10", 256: "11", 320: "12", 395: "13", 482: "14", 582: "15", 696: "16", 825: "17", 970: "18", 1132: "19", 1312: "20", 1511: "21", 1730: "22", 1970: "23", 2232: "24", 2517: "25", 2826: "26", 3160: "27", 3520: "28", 3907: "29", 4322: "30", 4766: "31", 5240: "32", 5745: "33", 6282: "34", 6852: "35", 7456: "36", 8095: "37", 8770: "38", 9482: "39", 10232: "40", 11021: "41", 11850: "42", 12720: "43", 13632: "44", 14590: "45", 15590: "46", 16590: "47", 17590: "48", 18590: "49", 19690: "50", 20790: "51", 21890: "52", 22990: "53", 24190: "54", 25390: "55", 26590: "56", 27790: "57", 29090: "58", 30390: "59", 31690: "60", 32990: "61", 34390: "62", 35790: "63", 37190: "64", 38590: "65", 39990: "66", 41490: "67", 42990: "68", 44490: "69", 45990: "70", 47490: "71", 49090: "72", 50690: "73", 52290: "74", 53890: "75", 55490: "76", 57190: "77", 58890: "78", 60590: "79", 62290: "80", 63990: "81", 65790: "82", 67590: "83", 69390: "84", 71190: "85", 72990: "86", 74890: "87", 76790: "88", 78690: "89", 80590: "90", 82490: "91", 84390: "92", 86340: "93", 88290: "94", 90240: "95", 92190: "96", 94140: "97", 96090: "98", 98040: "99", 100000: "100"
	};
    editCount = $("#UserProfileMasthead .tally em").html().replace(",","");
    if (editCount) {
		for(i in editRanks) if (editCount >= parseInt(i)) editRank = editRanks[i];
		$("hgroup").prepend('<span style="float: right; background: rgba(0, 0, 0, 0.14); padding: 5px 10px; font-size: 16px; margin: 4px -13px; border-radius: 3px;">Nl. ' + editRank + '</span>');
    }
}

$('#userlvl').text(editRank);