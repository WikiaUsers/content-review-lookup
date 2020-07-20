bubblebgcolor = "#4169E1";
bubbletextcolor = "white";

$("body").append('<div style="color: ' + bubbletextcolor + '; background-color: ' + bubblebgcolor + ';" class="help-balloon" onClick="openHelpWindow();">?</div>');
$("head").append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:TestHelpBubble.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="help-balloon-style-sheet"/>');

function openHelpWindow() {
    $("body").prepend('<div id="bgcover"></div><div id="help-box"><h1>Help</h1><div id="help-box-content"><p>Help text</p></div><div id="close-button-wrapper"><a id="help-box-close" class="wikia-button" onClick="closeHelpWindow();">Close</a></div>');
}

function closeHelpWindow(){
    $("#bgcover").remove();
    $("#help-box").remove();
}