
// ADVANCED AUTO REFRESHING RECENT CHANGES AND WATCHLIST
// Code courtesy of "pcj" of WoWWiki.
 
// WHAT IT DOES
// The code adds a checkbox at the top of Special:RecentChanges and Special:Watchlist, next to the header.
// Ticking this sets a cookie (specific to each wiki) and starts updating the list.
// This occurs silently every 60 seconds without a full page reload occurring.
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
ajaxPages="Special:RecentChanges,Special:Watchlist,";
 
function setCookie(c_name,value,expiredays) {
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
 
function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1) { 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}
 
function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcRefresh = 30000;
function preloadAJAXRC() {
if (skin == "monaco") {
s = 1;
} else {
s = 0;
}
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
document.getElementsByTagName("h1")[0].innerHTML += '&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
document.getElementById("ajaxRCtoggle").checked = ajaxRCCookie;
if (getCookie("ajaxload-"+wgPageName)=="on") loadRCData();
}
 
function toggleRC() {
if (document.getElementById("ajaxRCtoggle").checked == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
loadRCData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
clearTimeout(rcTimer);
}
}
 
function loadRCData() {
if (getRCDataRO.readyState == 4 || getRCDataRO.readyState == 0) {
if (location.href.indexOf("/wiki/")) {
rcURL = "http://" + location.hostname + "/wiki/" + wgPageName + location.search;
} else {
rcURL = "http://" + location.hostname + "/" + wgPageName + location.search;
}
 
//rcURL = 'http://disneyparks.wikia.com/index.php?title=Special:RecentChanges&from=20080930151557&days=30&limit=500&hideminor=0';
 
getRCDataRO.open("GET", rcURL, true);
getRCDataRO.onreadystatechange = parseRCdata;
getRCDataRO.send(null);
}
}
 
function parseRCdata() {
if (getRCDataRO.readyState == 4) {
textFilter = new RegExp('<div id="bodyContent">.*?</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "i");
rawRCdata = getRCDataRO.responseText.replace(cr, "").replace(lf, "");
filteredRCdata = textFilter.exec(rawRCdata);
updatedText = filteredRCdata[0].replace('<div id="bodyContent">', "").replace(endText, "");
document.getElementById("bodyContent").innerHTML = updatedText + document.getElementById("bodyContent").innerHTML;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}
 
if (ajaxPages.indexOf(wgPageName)!=-1) { addOnloadHook(preloadAJAXRC); }

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );

window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: {u:'Editor měsíce'},
		featured: 'Featured',
                founder: {u:'Zakladatel', title:'Zakladatel české MicroWiki.', link: 'w:c:micronations:User:Monsterfurby' },
                founder2: {u:'Zakladatel', title:'Zakladatel anglické MicroWiki.' },
                inactivebureaucrat: {u:'Neaktivní byrokrat' },
                inactivesysop: {u:'Neaktivní administrátor' },
                mwstaff: {u:'MicroWiki tým', title:'Tento uživatel je součástí týmu anglické a české MicroWiki', order:-1/0  },
                bot: {u:'Bot', title: 'Uživatel je bot spravovaný jedním z administátorů.' },
                amazing: {u:'Editor of the Month', title:'This user is amazing, because he helped around the Wiki and participated in several projects!'},
                veteran: {u:'Veteran', title:'This user was decided to be a part of the veteran user group.'},
                gumpc: {u:'GUM Peacekeeper', title:'This user was awarded the GUM peacekeeper award.', link:'MicroWiki:GUM'}
	}
};

UserTagsJS.modules.implode = {
	'inactivebureaucrat': ['bureaucrat', 'inactive'],
	'inactivesysop': ['sysop', 'inactive'],
};

UserTagsJS.modules.custom = {
	'LurkSAR': ['mwstaff', 'founder'],
	'Monsterfurby': ['founder2'],
    'Mekniy':['montheditor']
};

var messageWallUserTags = {
    'LurkSAR': 'Administrator',
};

window.messageWallTagColor = 'red';
importArticles({
    type: 'script',
    articles: [
        'u:dev:WallGreetingButton/code.js',
        'u:dev:UserTags/code.js',
	'MediaWiki:Logo.js'
    ]
});