/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
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
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
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
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );
 
importScriptPage('AjaxRC/code.js', 'dev');
 
// Credits go to the Transformers Wiki http://transformers.wikia.com/ for this function 
if ( skin == 'monobook' ) {
function loadsearchstuff() {
  // If you're reading this, I'm sorry. Messy code lies ahead.
 
  if (document.implementation && document.implementation.createDocument)
       xmlDoc=document.implementation.createDocument("","",null);
  else 
       xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
 
  xmlDoc.async=false;
  xmlDoc.load("/index.php?title=Template:Searchicons&action=raw");
 
  // Establishing the various fragments of the search box.
  var randindex = Math.floor(Math.random()*xmlDoc.getElementsByTagName("item").length);
  var searchicon = "<img src='" + xmlDoc.getElementsByTagName("url")[randindex].childNodes[0].nodeValue + "' style='margin-left: -15px; margin-top:-6px;' /></a>";
  var searchbox = document.getElementById('searchBody');
 
  // Throwing all the various fragments together.
  var searchfieldentry = document.getElementById('searchInput').value;
  searchbox.innerHTML = searchicon + searchbox.innerHTML;
  document.getElementById('searchInput').value = searchfieldentry;
 
  // Finally, removing the redundant "search" title at the top.
  searchbox.parentNode.removeChild(searchbox.parentNode.getElementsByTagName("h5")[0]);
 
  // Sets focus on the search bar ...
  // document.getElementById('searchInput').focus();
}
 
addOnloadHook(loadsearchstuff);
}
 
 /** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by [[wikia:User:Splarka|Splarka]]
  * New version by [[User:Spang|Spang]]
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);
 
function ts_makeSortable(table){
	var firstRow;
	if(table.rows&&table.rows.length>0){
		if(table.tHead&&table.tHead.rows.length>0){
			firstRow=table.tHead.rows[table.tHead.rows.length-1];
		}else{
			firstRow=table.rows[0];
		}
	}
	if(!firstRow)
		return;
	for(var i=0;i<firstRow.cells.length;i++){
		var cell=firstRow.cells[i];
		if((" "+cell.className+" ").indexOf(" unsortable ")==-1){
			cell.innerHTML+=' '
					+'<a href="#" class="sortheader" '
					+'onclick="ts_resortTable(this);return false;">'
					+'<span class="sortarrow">'
					+'<img src="'
					+ts_image_path
					+ts_image_none
					+'" alt="↓"/></span></a>';
		}
	}
	if(ts_alternate_row_colors){
		ts_alternate(table);
	}
}
/* Paypal button for main page */
function onloadhookcustom() {
  var replace = document.getElementById("AdolasPayPal");
  if (null != replace) {
    replace.innerHTML='<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----"><input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>';
  }
}
addOnloadHook(onloadhookcustom)
 
/* Census Data Test Functions */
// exacmple function for getting the data
function loadItemJSON(item_ids, onSuccess) {
	// item_ids = comma-separated list of item ids (or a single id)
	// onSuccess = function which does something with the retreived data
	$.ajax({
		url: "http://census.daybreakgames.com/s:dcuowiki/get/dcuo:v1/item?item_id=" + item_ids + "&callback=exampleCb",
		dataType: "jsonp",
		jsonpCallback: "exampleCb",
		success: function(data) {
			if (typeof onSuccess == "function") {
				onSuccess(data);
			}
		}
	});
}

// example thing do do with the data
//loadItemJSON("1625094", function(data) {
//	for (var i in data.item_list) {
//		var a = data.item_list[i];
//		console.log("Item: " + a.code_name + ", ID: " + a.item_id + ", Image URL: http://census.soe.com" + a.image_path);
//	}
//});

function itemToTable(node, data) {
	console.info("itemToTable for node:");
	console.log(node);
	var tbl = [];
	for (var i in data.item_list) {
		var a = data.item_list[i];
		tbl.push(
			'<tr>' +
				'<td>' + a.item_id + '</td>' +
				'<td>' + a.name.en + '</td>' +
				'<td><a href="census.daybreakgames.com' + a.image_path + '">' + a.image_path.match(/\d+\.[^\.]+$/i)[0] + '</a></td>' +
			'</tr>'
		);
	}
	var thead = "<thead><tr><th>ID</th><th>Name</th><th>Icon</th></tr></thead>",
		tbody = "<tbody>" + tbl.join("\n") + "</tbody>";
	console.info("Replacing node:");
	console.log(node);
	$(node).replaceWith('<table class="wikitable">' + thead + tbody + '</table>');
}

function itemGetStats(node, data) {
	console.info("itemGetStats for node:");
	console.log(node);
	var itemstats = [];
	var wlon = '<a href="http://dcuniverseonline.wikia.com/wiki/';
	var wlclose = '">'
	var wloff = '</a>'
	for (var i in data.item_list) {
        var a = data.item_list[i];
        // Unless DPS is 0.0 format it for display
        if (a.dps != "0.0") {
                itemstats.push('<strong>' + a.dps + ' ' + wlon + 'DPS">DPS</a>' + '</strong><br />\n');
        }
        // Unless Defense is 0 format it for display
		if (a.stat_mitigation != "0") {
            itemstats.push('<strong>' + a.stat_mitigation + ' ' + wlon + 'Defense">Defense</a>' + '</strong><br />\n');
		}
		// Unless Toughness is 0 format it for display
		if (a.stat_resilience != "0") {
            itemstats.push('<strong>' + a.stat_resilience + ' ' + wlon + 'Toughness">Toughness</a>' + '</strong><br />\n');
		}
		// Unless Health is 0 format it for display
		if (a.stat_health_pool != "0") {
            itemstats.push('<strong>' + a.stat_health_pool + ' ' + wlon + 'Health">Health</a>' + '</strong><br />\n');
		}
		// Unless Power is 0 format it for display
		if (a.stat_fatigue_pool != "0") {
            itemstats.push('<strong>' + a.stat_fatigue_pool + ' ' + wlon + 'Power">Power</a>' + '</strong><br />\n');
		}
		// Unless Precision is 0 format it for display
		if (a.stat_basic_attack != "0") {
            itemstats.push('<strong>' + a.stat_basic_attack + ' ' + wlon + 'Precision">Precision</a>' + '</strong><br />\n');
		}
		// Unless Might is 0 format it for display
		if (a.stat_finisher_attack != "0") {
            itemstats.push('<strong>' + a.stat_finisher_attack + ' ' + wlon + 'Might">Might</a>' + '</strong><br />\n');
		}
		// Unless Restoration is 0 format it for display
		if (a.stat_heal != "0") {
            itemstats.push('<strong>' + a.stat_heal + ' ' + wlon + 'Restoration">Restoration</a>' + '</strong><br />\n');
        }
		// Unless Vitalization is 0 format it for display
		if (a.stat_power_heal != "0") {
            itemstats.push('<strong>' + a.stat_power_heal + ' ' + wlon + 'Vitalization">Vitalization</a>' + '</strong><br />\n');
		}
		// Unless Dominance is 0 format it for display
		if (a.stat_dominance != "0") {
            itemstats.push('<strong>' + a.stat_dominance + ' ' + wlon + 'Dominance">Dominance</a>' + '</strong><br />\n');
        }
	}
	var beforestats = "",
		statsbody = "" + itemstats.join("") + "";
	console.info("Replacing node:");
	console.log(node);
	$(node).replaceWith('' + beforestats + statsbody + '');
}

$("span.itemstats").each(function() {
	var currNode = this;
	console.info("currNode:");
	console.info(currNode);
	loadItemJSON($(currNode).attr("data-ids").replace(/[^\d\,]/g, ""), function(data) {
		itemGetStats(currNode, data);
	});
});