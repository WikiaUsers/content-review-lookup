//April fools' joke. Only use this script on April 1st.
//This script shows a message "File:RunescapePASSKeylogger_V3.9.Model-Wiki32[84]" is downloading, with a progress bar below.
//It links to Cabbage as cancel button

if ( wgNamespaceNumber == 0 && wgPageName != "Cabbage" ) {
        addOnloadHook( addToolbarLinks );
}
var ToolbarLinksLoad = true; // prevent duplication
 
function addToolbarLinks () {
    $('<ul id="WikiaNotifications" style="position:fixed;left:150px;bottom:30px;z-index:9001;margin:0;"><li style="padding:4px 4px 0;"><div style="border-radius:4px;-moz-border-radius: 4px;-box-shadow:0 0 5px black;-moz-box-shadow: 0 0 5px black;margin:0;padding: 10px 20px;position: relative;white-space:nowrap;max-width:none;color:#000;background-color:#FFF;background-image:-webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(35%, #FFF), color-stop(65%, #CCC));background-image:-moz-linear-gradient(top, #FFF 35%, #CCC 65%);">Downloading File:RunescapePASSKeylogger_V3.9.Model-Wiki32[84]<br/>Progress: <img src="http://i.imgur.com/n5fBX.gif" style="cursor:auto;float:none;background-image:url(http://i.imgur.com/9qt2V.gif);"/><form action="/index.php"><input type="hidden" name="title" value="Cabbage"/><input type="submit" value="Cancel download" class="link" style="background-color:transparent;background-image:none;border:none;"/></form></a>)</span></div></li></ul>').appendTo('ul.tools');
}