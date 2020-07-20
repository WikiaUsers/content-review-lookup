/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
//================================================================================
//*** Dynamic Navigation Bars
 
// set up the words in your language
var NavigationBarHide = 'Inklappen';
var NavigationBarShow = 'Uitklappen';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
if (typeof NavigationBarShowDefault == 'undefined' ) {
    var NavigationBarShowDefault = 0;
}
 
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
           if (NavChild.className == 'NavPic') {
               NavChild.style.display = 'none';
           }
           if (NavChild.className == 'NavContent') {
               NavChild.style.display = 'none';
           }
           if (NavChild.className == 'NavToggle') {
               NavChild.firstChild.data = NavigationBarShow;
           }
       }
 
   // if hidden now
   } else if (NavToggle.firstChild.data == NavigationBarShow) {
       for (
               var NavChild = NavFrame.firstChild;
               NavChild != null;
               NavChild = NavChild.nextSibling
           ) {
           if (NavChild.className == 'NavPic') {
               NavChild.style.display = 'block';
           }
           if (NavChild.className == 'NavContent') {
               NavChild.style.display = 'block';
           }
           if (NavChild.className == 'NavToggle') {
               NavChild.firstChild.data = NavigationBarHide;
           }
       }
   }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
   var indexNavigationBar = 0;
   // iterate over all < div >-elements
   var divs = document.getElementsByTagName("div");
   for (var i=0;  i<divs.length; i++) {
       var NavFrame = divs[i];
       // if found a navigation bar
       if (NavFrame.className == "NavFrame") {
 
           indexNavigationBar++;
           var NavToggle = document.createElement("a");
           NavToggle.className = 'NavToggle';
           NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
           NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
           var NavToggleText = document.createTextNode(NavigationBarHide);
           NavToggle.appendChild(NavToggleText);
 
           // add NavToggle-Button as first div-element 
           // in < div class="NavFrame" >
           NavFrame.insertBefore(
               NavToggle,
               NavFrame.firstChild
           );
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
 
addOnloadHook(createNavigationBarToggleButton);

 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Doorverwijzing",
     "tagOpen": "#Doorverwijzing [[",
     "tagClose": "]]",
     "sampleText": "Artikelnaam"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Durchstreichen",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Durchgestrichener Text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Absatz",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/lostpedia/de/images/7/79/Button_reflink.png",
     "speedTip": "Referenz erstellen",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "URL hier einfügen"}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/lostpedia/de/images/7/70/MW-anf%C3%BChrungszeichen.png",
     "speedTip": "Anführungszeichen einfügen",
     "tagOpen": "„",
     "tagClose": "“",
     "sampleText": "Zitat"}
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

ajaxPages = new Array("Speciaal:RecenteWijzigingen", "Speciaal:Following", "Speciaal:Logboeken");

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
document.getElementsByTagName("h1")[0].innerHTML += ' <span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">Automatically refresh:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
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
    var tpm = '';
  } else {
    var tpm = '';
  }

  // calcuate the diff
  var left = (diff%60) + ' Sekunden';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' Minuten ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' Stunden ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' Tage ' + left
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

////**** IRC Embedding ****////
function onloadhookcustom() {
  var replace = document.getElementById("JRChatReplace");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=wikia-nl" width="550" height="600"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("JRChatReplace").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

//Het hebben van een IRC box op paginas
 
$(function() {
	var nick = (wgUserName == null) ? ('RSW-Bezoeker-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=nlharrypotter&prompt=false" width="680" height="700" style="border:0;background-color:#483821;"></iframe>');
	$('#IRCReplaceWide').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=nlharrypotter&prompt=false" width="980" height="700" style="border:0;background-color:#483821;"></iframe>');
});


// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

//Ajax autorefresh door "pcj" van WoWwiki
var ajaxPages = [":Wikia discussies", "Speciaal:Volglijst", "Speciaal:Logboeken", "Speciaal:Bijdragen", "Speciaal:RecenteWijzigingen", "Forum:Index"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev'); 

////**** Protection ****////
function protectionTemplates() {
    if (wgPageName == wgMainPageTitle || wgCanonicalNamespace == "Special") {
        // The current page is the main page or a special page. So quit.
        return false;
    }
 
    var content = document.getElementById('content');   
    if (content == null || document.getElementsByTagName('h1')[0] == null) {
        // There is no 'content' element and/or no h1 element. So quit.
        return false;
    }
 
    // Determine template.
    if (wgRestrictionEdit[0] != null && wgRestrictionEdit[0] == 'sysop') {
        // Editing is limited to sysops.
        var templateTitle = 'Beveiligd';
        var nodeId = 'templ_Beveiligd';
    } else if (wgRestrictionEdit[0] != null && wgRestrictionEdit[0] == 'autoconfirmed') {
        // Editing is limited to autoconfirmed users. Effectief nutteloos op deze wiki, dus geen sjabloon
        return false;
    } else if (wgRestrictionMove[0] != null) {
        // Moving the page is limited.
        var templateTitle = 'TitelBeveiligd';
        var nodeId = 'templ_TitelBeveiligd';
    } else {
        // The page is not protected.
        return false;
    }
 
    // Get template from API.
    var request = sajax_init_object ();      
    request.open('GET', wgServer + wgScriptPath + '/api.php?format=json&action=parse&text={{' + encodeURIComponent(templateTitle) + '}}&title=' + encodeURIComponent(wgPageName), true);
    request.onreadystatechange =
    function () {
        if (request.readyState != 4) return;
        if (request.status == 200 && request.responseText && request.responseText.charAt(0) == '{') {
            var json = eval ('(' + request.responseText + ')');
            if (json.parse.text['*']) {
                var divContent = json.parse.text['*'];
            }
        }
 
        if (divContent != null) {
            // We retrieved the template. Add it to the page.
            var divNode = document.createElement('div');
            divNode.id = nodeId;
            divNode.className = 'Titel_item3';
            divNode.innerHTML = divContent;
            content.insertBefore(divNode, document.getElementsByTagName('h1')[0]);
        }
    };
    request.setRequestHeader ('Pragma', 'cache=yes');
    request.setRequestHeader ('Cache-Control', 'no-transform');
    request.send (null); 
}
 
addOnloadHook(protectionTemplates);

//Voeg automatisch beschrijvingsjabloon in op [[Speciaal:Upload]]
jQuery( document ).ready( function( $ ) {
  if($('#wpDestFile').val() == "") {
    $('#wpUploadDescription').val('{{Afbeelding|\n|Wat staat er precies op de afbeelding?=\n|Waar heb je de afbeelding vandaan?=\n|Schrijf de complete link van de vindplaats op=\n|Wie heeft de afbeelding gemaakt?=\n|Heb je toestemming om de afbeelding te uploaden?=\n|Welke licentie?=\n}}');
  }

} );