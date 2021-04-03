/* Courtesy of the RuneScape Players Wiki and Smithing, not to mention Joey's coding. */ $('#ChatHeader').append('<form style="display:inline-block;position:absolute;top:7px;right:190px;z-index:9001;" id="searchform" action="/index.php" target="_blank"><input type="hidden" name="title" value="Special:Search"><input id="searchInput" title="Search the Nezzy Wiki" accesskey="f" placeholder="Search" type="search" name="search" autocomplete="on"><input type="submit" name="go" class="searchButton" id="searchGoButton" value="Go" title="Go to a page with this exact name if exists"></form>')
 
importScriptPage('User:Joeytje50/tabinsert.js', 'runescape');
 
/* Creating /me command (courtesy RuneScape Wiki) */
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me') {
			this.value = '* '+wgUserName;
		}
	}
}

importScriptPage('User:Bluefire2/cake.js', 'runescape');