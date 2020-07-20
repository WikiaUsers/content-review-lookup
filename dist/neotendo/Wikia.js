//Collapsible Tables
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

// <source lang="JavaScript">  
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS  
 
function addMastheadTags() { 
var rights = {};
 
// BEGIN List of Accounts Given Extra User Rights Icons
 
 
rights["Arend"] = ["Administrator"];
rights["Brochi"] = ["Administrator"];
rights["Dk64rules"] = ["Administrator"];
rights["Qyzxf"] = ["Administrator"];
rights["ShadowElise"] = ["Bureaucrat"];
rights["Yami no Tenshi"] = ["Administrator"];
rights["Cobweb"] = ["Bureaucrat"];
rights["Heartphilia"] = ["Bureaucrat"];
rights["JesseRoo"] = ["Bureaucrat"];
rights["Shroobario"] = ["Bureaucrat"];
rights["YoshiEgg"] = ["Bureaucrat"];
rights["Lumoshi"] = ["Administrator"];
rights["PabloDePablo"] = ["Adminstrator"];
rights["The Soupistan"] = ["Adminstrator"];
rights["1337doom"] = ["Administrator"];
rights["T0M.V.12"] = ["Adminstrator"];
rights["Fandraxono"] = ["Rollback", "Chat Moderator"];
rights["NepetaLast"] = ["Rollback", "Chat Moderator"];
rights["Stelios7"] = ["Rollback"];
rights["Monstermanchego"] = ["Chat Moderator"];
rights["Team-Eva"] = ["Chat Moderator"];
rights["DohIMissed"] = ["Chat Moderator"];
 
// END List of Accounts Given Extra User Rights Icons
 
// BEGIN Script to Remove Old Rights Icons & Insert New  
 
if (wgCanonicalSpecialPageName == "Contributions") { 
var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
 } else { var user = wgTitle; }
 
if (typeof rights[user] != "undefined") {  
 
// remove old rights
 
$('.UserProfileMasthead .masthead-info span.tag').remove();
 
for( var i=0, len=rights[user].length; i < len; i++) {
 
// add new rights 
$('<span class="tag" span style="margin-left: 10px !important">' + 
rights[user][i] + '</span>').appendTo('.masthead-info hgroup'); 
} 
}  
 
// END Script to Remove Old Rights Icons & Insert New
 
 
};  
 
$(function() { 
if ($('#UserProfileMasthead')) { 
addMastheadTags(); 
} 
});

 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
 
// </source>End

/* autorefresh */
/*** AJAX Auto-refresh on wiki activity ****************************/
 
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Automatically refresh this page',
	refreshHover = 'Enable auto-refreshing page loads',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges', 'Special:WikiActivity', 'Special:Log', 'Special:NewFiles' );
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}