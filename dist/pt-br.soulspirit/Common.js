/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
/* Auto-refreshing recent changes */
ajaxPages = ["Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
/*
* Test if an element has a certain class
* Description: Uses regular expressions and caching for better performance.
* Taken from Wikipedia's Common.js.
*/

var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();


/*
* Collapsible tables
* Description: Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]].
* Taken from Wikipedia's Common.js.
*/
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(tableIndex) {
	var Button = document.getElementById("collapseButton" + tableIndex);
	var Table = document.getElementById("collapsibleTable" + tableIndex);
	if(!Table || !Button)
		return false;
	var Rows = Table.rows;
	if(Button.firstChild.data == collapseCaption) {
		for (var i = 1; i < Rows.length; i++)
			Rows[i].style.display = "none";
		Button.firstChild.data = expandCaption;
	} else {
		for(var i = 1; i < Rows.length; i++)
			Rows[i].style.display = Rows[0].style.display;
		Button.firstChild.data = collapseCaption;
	}
}

function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( "table" );
	for(var i = 0; i < Tables.length; i++)
		if(hasClass( Tables[i], "collapsible")) {
			var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
			if(!HeaderRow)
				continue;
			var Header = HeaderRow.getElementsByTagName("th")[0];
			if(!Header)
				continue;
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
			var Button = document.createElement("span");
			var ButtonLink = document.createElement("a");
			var ButtonText = document.createTextNode(collapseCaption);
			Button.style.styleFloat = "right";
			Button.style.cssFloat = "right";
			Button.style.fontWeight = "normal";
			Button.style.textAlign = "right";
			Button.style.width = "6em";
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
			ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
			ButtonLink.appendChild(ButtonText );
			Button.appendChild(document.createTextNode("["));
			Button.appendChild(ButtonLink);
			Button.appendChild(document.createTextNode("]"));
			Header.insertBefore(Button, Header.childNodes[0]);
			tableIndex++;
		}
	for(var i = 0; i < tableIndex; i++)
		if(hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse")))
			collapseTable(i);
}
$(createCollapseButtons);


/* ############################################# */
/* ##          CUSTOM EDIT BUTTONS            ## */
/* ############################################# */
/* NOT CURRENTLY SUPPORTED ON NEW PLATFORM 

if ((wgAction == "edit" || wgAction == "submit") && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/pokemon/images/4/42/Accent_Button.png",
		"speedTip": "Insert Pokémon",
		"tagOpen": "Pokémon",
		"tagClose": "",
		"sampleText": ""
    };
}
 
if(mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };
}
 
/* ############################################# */
/* ##       END CUSTOM EDIT BUTTONS           ## */
/* ############################################# */
 
/* Fill the block expiry time with a default value */
var wgDefaultExpiryBlock = '3 days';

if(wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Blockip' )
	$(function() {
		if(($('#wpBlockExpiry').val() == '' || $('#wpBlockExpiry').val() == 'other') && $('#mw-bi-other').val() == '')
			$('#wpBlockExpiry').val('3 days').trigger('change');
	});

$(function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=202448143133369&amp;connections=8" align="top" frameborder="0" width="275" height="250" scrolling="no" />');
});
 
/* track incontent share fb button */
$(function(){
	$("#incontent_share").click(function(){
		WET.byStr("articleAction/incontent_share/" + wgPageName);
	});
});