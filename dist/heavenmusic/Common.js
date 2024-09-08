/* Any JavaScript here will be loaded for all users on every page load. */
importScript('User:Darth_Stabro/stub.js');
/*****************************/
/*****Require Edit Summary****/
/*****************************/




function addForceSummary(){
    if(!/&action=edit/.test(window.location.href)) return;
    if(/&section=new/.test(window.location.href)) return;
    if(!document.forms.editform) return;
    document.forms.editform.wpSave.onclick = forceSummary;
}

function forceSummary(){
    if(!document.forms.editform.wpSummary.value.replace(/(^ +)|( +$)/g,'').replace(/^\/\*.*\*\/ */,'')){
      var r = prompt('Please add an edit summary below.',document.forms.editform.wpSummary.value);
      if(r == null) return;
      document.forms.editform.wpSummary.value = r;
    }
    return true;
}

if (window.addEventListener) window.addEventListener("load",addForceSummary,false);
else if (window.attachEvent) window.attachEvent("onload",addForceSummary);




/****************/
/***GENRE TAGS***/

function loadTitleDivs()
{
  loadTitleDiv('title-genres');
  loadTitleDiv('title-shortcut');
}
addOnloadHook(loadTitleDivs);

// Adapted from Wookieepedia
function loadTitleDiv(className)
{
  var genreDiv = document.getElementById(className);

  if (genreDiv == null || genreDiv == undefined) return;

  var cloneNode = genreDiv.cloneNode(true);

  var firstHeading;
  var h1Tags = document.getElementsByTagName('h1');
  for (i = 0; i < h1Tags.length; i++)
  {
    if (h1Tags[i].getAttribute('class') == 'firstHeading')
    {
      firstHeading = h1Tags[i];
      break;
    }
  }

  if (firstHeading == null || firstHeading == undefined) return;

  firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
  cloneNode.style.display = "block";
}


/***END GENRE TAGS***/
/********************/



/** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by [[wikia:User:Splarka|Splarka]]
  * New version by [[User:Spang|Spang]]
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent'));
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);


/************************************/
/** Countdown **/


// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// ***************************************
//  - end -  Experimental javascript timer
// ***************************************


/*********************/
/* CUSTOM EDIT BUTTONS */

 if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
     "speedTip": "Hidden Comment",
     "tagOpen": "<" + "!-- ",
     "tagClose": " --" + ">",
     "sampleText": "Insert comment here"}
  }

 if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "REdirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Article Name"}
  }

 if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/92/Nuvola-Multimedia01.png",
     "speedTip": "OGG Media",
     "tagOpen": "[[Image:",
     "tagClose": "]]",
     "sampleText": "sample.ogg"}
  }
 if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images3.wikia.nocookie.net/__cb20090417025539/central/images/a/a7/ButtonYouTube.png",
     "speedTip": "Youtube",
     "tagOpen": "<youtube>",
     "tagClose": "</youtube>",
     "sampleText": "Youtube Code"}
  }
 if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b0/Button_note.png",
     "speedTip": "Media from Youtube",
     "tagOpen": "{{" + "Media|",
     "tagClose": "}}",
     "sampleText": "Youtube Code"}


       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "http://images3.wikia.nocookie.net/central/images/4/4a/Button_table.png",
         "speedTip": "Insert a table",
         "tagOpen": '{| class="wikitable"\n|-\n',
         "tagClose": "\n|}",
         "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};

  }


 if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_bombe.png",
     "speedTip": "Countdown",
     "tagOpen": "{{" + "Countdown",
     "tagClose": "}}",
     "sampleText": "|October 19 2009 15:50:00 CST"}
  }



// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log");

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
var rcRefresh = 60000;
function preloadAJAXRC() {
if (skin == "monaco") {
s = 1;
} else {
s = 0;
}
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
document.getElementsByTagName("h1")[0].innerHTML += ' <span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">Auto-refresh:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
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
document.getElementById("bodyContent").innerHTML = updatedText;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}

for (x in ajaxPages) {
if (wgPageName == ajaxPages[x]) addOnloadHook(preloadAJAXRC);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH




// If FriendlyConfig aint exist.
if( typeof( FriendlyConfig ) == 'undefined' ) {
	FriendlyConfig = {};
}
 
/**
 FriendlyConfig.enableClock ( boolean )
 */
if( typeof( FriendlyConfig.enableClock ) == 'undefined' ) {
	FriendlyConfig.enableClock = true;
}
 
/**
 FriendlyConfig.clockStyle ( String )
 */
if( typeof( FriendlyConfig.clockStyle ) == 'undefined' ) {
	FriendlyConfig.clockStyle = 'dynamic';
}
 
friendlyclock = {
	showClock: function() {
		var query = {
			'action': 'purge',
			'title': wgPageName
		};
		friendlyclock.clockNode = addPortletLink( 'p-personal', wgServer + wgScriptPath + '/index.php?' + QueryString.create( query ), '--:--:-- UTC', 'friendly-clock', 'Purge this page', '' );
		friendlyclock.clockNode.style.fontSize = 'normal';
		friendlyclock.clockNode.style.fontWeight = 'bold';
		friendlyclock.clockNode.style.textTransform = 'uppercase';
 
		friendlyclock.updateTime();
		if( FriendlyConfig.clockStyle != 'static' ) {
			friendlyclock.intervalId = window.setInterval(friendlyclock.updateTime, 1000);
		}
	},
	updateTime: function() {
		if( !friendlyclock.clockNode ) {
			return;
		}
		var now = new Date();
		var hh = now.getUTCHours();
		var mm = now.getUTCMinutes();
		var ss = now.getUTCSeconds();
		var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss) + ' UTC';
		friendlyclock.clockNode.firstChild.innerHTML = time;
	}
}
 
addOnloadHook( function() {
		if( FriendlyConfig.enableClock ) {
			friendlyclock.showClock();
		}
	}
);

$(document).ready(function(){
	$("#mp3-navlink").find("a").slice(0, 1).attr("href", "javascript:void(0)");

	$("#mp3-navlink").click(function()
	{
		$("#mp3-nav").slideToggle('slow');
	});
});

function addHideButtons() {
	var hidables = getElementsByClass('hidable');

	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');

		if( button != null && button.length > 0 ) {
			button = button[0];

			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );

			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}

function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;

	if( content != null && content.length > 0 ) {
		content = content[0];

		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}

		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;

			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}

			if( item == -1 ) {
				return;
			}

			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}