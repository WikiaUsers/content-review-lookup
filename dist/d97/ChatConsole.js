importScriptPage("User:Dragonfree97/Japanese.js","d97");
importScriptPage("User:Dragonfree97/Korean.js","d97");

siteUrl = wgServer.slice(7,-10);

searchBox = '<div class="console-box" id="Search"><table style="width:100%"><tbody><tr><td colspan="2" style="text-align:center;">Search Wikia</td></tr><tr><td>Search for</td><td><input id="search-term-field" name="search-term-field" type="text" style="width:97%;"></td></tr><tr><td>on wiki:</td><td><input id="search-term-wiki" name="search-term-wiki" type="text" style="width:97%;" value="'+siteUrl+'"></td></tr><tr><td colspan=2 style="text-align:center;"><input type="button" id="search-console-button" class="wikia-button" value="Search" onClick="consoleSearch();"></td></tr></tbody></table></div>';

$("#search-console-button").click(function() {consoleSearch()});

function consoleSearch() {
    var searchTermPre = $("#search-term-field").val();
    var searchTermReady = searchTermPre.replace(" ", "+");
    var searchWikiPre = $("#search-term-wiki").val();
    var searchWikiReady = searchWikiPre.replace(" ", "-");
    console.log("Searching for "+searchTermReady+" on "+searchWikiReady+".");
    if (searchWikiReady=="") {
        window.open("http://www.wikia.com/wiki/Special:Search?search="+searchTermReady,'_blank');
        console.log("Searching for "+searchTermReady+" on Wikia Central.");
    } else {
        window.open("http://"+searchWikiReady+".wikia.com/wiki/Special:Search?search="+searchTermReady,'_blank');
        console.log("Searching for "+searchTermReady+" on "+searchWikiReady+".");
    }
}

japaneseBox = '<div class="console-box" id="Japanese" style="left: 311px; position: relative; top: -134px;"><form id="JapaneseForm" name="Japanese" onsubmit="return false;"><table><tbody><tr><td colspan="2" style="text-align:center;">Japanese alphabet converter</td></tr><tr><td>Romaji:</td><td><input id="romaji" name="romaji" type="text" size="60" onkeyup="performConversion();"></td></tr><tr><td>Hiragana:</td><td><input id="hiragana" name="hiragana" type="text" size="60" readonly=""></td></tr><tr><td>Katakana:</td><td><input id="katakana" name="katakana" type="text" size="60" readonly=""></td></tr></tbody></table></form></div>';

koreanBox = '<div class="console-box" id="Korean" style="left: 622px; position: relative; top: -268px;"><form id="KoreanForm" name="Korean" onsubmit="return false;"><table><tbody><tr><td colspan="2" style="text-align:center;">Korean alphabet converter</td></tr><tr><td>Romaja:</td><td><input id="romanized" name="romanized" type="text" size="60" onkeyup="performKConversion();"></td></tr><tr><td>Hangul:</td><td><input id="hangul" name="hangul" type="text" size="60" readonly=""></td></tr></tbody></table></form></div>';

$('body').append('<section id="console" style="display:none;">'+searchBox+japaneseBox+koreanBox+'<iframe width="854" height="510" src="//www.youtube.com/embed/TCYVqcup_L8" frameborder="0" allowfullscreen></iframe></section>');

enabledConsole = 0;

function consoleToggle() {
    if(enabledConsole==1) {
       $( "#console" ).css( "display", "none" );
       $('#consoleCSS').remove();
       enabledConsole = 0;
    } else if(enabledConsole==0) {
        $( "#console" ).css( "display", "block" );
        $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:ConsoleCSS.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="consoleCSS"/>');
        enabledConsole = 1;
    }
}

$('#Rail').prepend('<div class="console-div" onclick="consoleToggle()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="circle-button wikia-button"> Console </a></div>');