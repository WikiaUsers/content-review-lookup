 // **************************************************
 // Experimental javascript countdown timer (Splarka)
 // Version 0.0.2
 // **************************************************
 // Embed with a span class="countdowntimer", eg:
 // <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span>
 // default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>
 
 function updatetimer(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
      return;
   }
 
   // catch negative dates
   if(diff<0) {
     diff = -diff;
     var left = ' ago since';
   } else {
     var left = ' until';
   }
 
   // calcuate the diff
   left = (diff%60) + ' seconds ' + left;
     diff=Math.floor(diff/60);
   if(diff > 0) left = (diff%60) + ' minutes ' + left;
     diff=Math.floor(diff/60);
   if(diff > 0) left = (diff%24) + ' hours ' + left;
     diff=Math.floor(diff/24);
   if(diff > 0) left = diff + ' days ' + left
   timers[i].firstChild.nodeValue = left;
 
   // a setInterval() is more efficient, but calling setTimeout()
   // makes errors break the script rather than infinitely recurse
   tim[i] = setTimeout('updatetimer(' + i + ')',1000);
 }
 
 function checktimers() {
   var untimers = getElementsByClassName(document, 'span', 'notimer');
   for(var i=0;i < untimers.length; i++) {
     untimers[i].style.display = 'none';    
   }
   timers = getElementsByClassName(document, 'span', 'countdowntimer');  //global
   tim = new Array(); // generic holder for the timeouts, global
   if(timers.length == 0) return;
   for(var i=0;i < timers.length; i++) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     timers[i].firstChild.nodeValue = '0 days 0 hours 0 minutes 0 seconds';
     timers[i].style.display = 'inline';
     updatetimer(i);  //start it up
   }
 }
 addOnloadHook(checktimers)
 
 // **************************************************
 //  - end -  Experimental javascript countdown timer
 // **************************************************

 /** Deletion reasons *****************************************************
  * Adds drop down box to delete page for choosing pre-made deletion reasons called
  * from [[Template:Stdreasons]] 
  * By [[User:Sikon|Sikon]]
  */
 var xhrReasons;
 
 addOnloadHook(fillDeleteReasons, false);
 
 function fillDeleteReasons()
 {
    var label = document.getElementById("wpReason");
 
    if(label == null)
    {
        return;
    }
 
    label = document.getElementById("contentSub");
 
    if(label == null)
    {
        return;
    }
 
    if (window.location.href.indexOf("action=delete") == -1)
    {
        return;
    }
 
    if(typeof(disableDeletionReasons) != 'undefined' && disableDeletionReasons)
    {
         return;
    }
 
    var comboString = "<br /><select id='stdReasons' onchange='onStdReasonChange()'>";
    comboString += "</select>";
    label.innerHTML += comboString;
 
    var request = getRequest();
    xhrReasons = request;
    request.open("GET", "http://illogicopedia.wikia.com/index.php?title=Template:Stdreasons&action=raw&ctype=text/plain");
    request.onreadystatechange = onRSCReasons;
    request.send(null);
 }
 
 function onStdReasonChange()
 {
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;
 
    if(value != "")
        document.getElementById("wpReason").value = value;
 }
 
 function getRequest()
 {
    var agt = navigator.userAgent.toLowerCase();
 
    if (agt.indexOf('msie')!=-1 && agt.indexOf('msie 7')==-1 && document.all && agt.indexOf('opera')==-1 && agt.indexOf('mac')==-1)
        return new ActiveXObject("Msxml2.XMLHTTP");
 
   var request = new XMLHttpRequest();
   return request;
 }
 
 function onRSCReasons()
 {
     fillCombo(xhrReasons, 'stdReasons');
 }
 
 function fillCombo(request, comboid)
    {
        if(request.readyState == 4)
        {
            var combo = document.getElementById(comboid);
            var lines = request.responseText.split("\n");
 
            for(var i = 0; i < lines.length; i++)
            {
                var value = lines[i].indexOf("-- ") == 0 ? lines[i].substring(3) : "";
                //combo.innerHTML += "<option value='" + value + "'>" + lines[i] + "</option>";
                var option = document.createElement('option');
                option.setAttribute('value', value);
                option.appendChild(document.createTextNode(lines[i]));
                combo.appendChild(option);
            }
        }
    }
function nextFullMoonTime(){
//Authored by: JaeSharp (http://furry.wikia.com/wiki/User:JSharp)
//this function calculates the date/time of the next full moon using the current date/time and moon cycle
//this is evil, evil, evil... watch for interactions with script load order and dynamic updating of countdowntimer from Splarka's script.

time = getElementsByClassName(document.getElementById('bodyContent'), 'span', 'countdowntimer'); //get all timer spans on page (an array)
if (time.length == 0) return; //no timers on page, nothing to do.

for each (timedisplay in time) {
  currentMoonScaledPhase = parseFloat(timedisplay.nextSibling.firstChild.nodeValue);//grab current moon scaled cycle position
  var t;
  if (currentMoonScaledPhase > 2.0) {
    t = 6.0-currentMoonScaledPhase; }
  else {
    t = 2.0-currentMoonScaledPhase; }
  //t is scaled time remaining until next full moon
  daysRemaining = 7.382647 * t; //scale back to actual days
  timedisplay.eventdate = new Date((new Date()).getTime()+ daysRemaining*24*60*60*1000);
 }
}
addOnloadHook(nextFullMoonTime);


// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================

addOnloadHook(foldingTabsMulti);
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return

  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

    if(ftsets[i].links.length < ftsets[i].boxen.length) {
      len = ftsets[i].boxen.length;
    } else {
      len = ftsets[i].links.length;
    }

    for(var j=0;j<len;j++) {
      ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
      ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}

function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
      ftsets[set].boxen[j].style.display = 'block';
    } else {
      ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
      ftsets[set].links[j].className = 'selected';
      ftsets[set].links[j].blur();
    } else {
      ftsets[set].links[j].className = '';
    }
  }
}

// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================