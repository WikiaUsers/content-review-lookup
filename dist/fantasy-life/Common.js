/* Any JavaScript here will be loaded for all users on every page load. */
if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = '/w/index.php?title=User:KidProdigy/CollapsibleTables.js&action=raw&ctype=text/javascript&smaxage=18000&action=raw&maxage=18000';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  addOnloadHook(function () { new CollapsibleTables(); });
}

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

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************


if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = '/w/index.php?title=User:Poke/CollapsibleTables.js&action=raw&ctype=text/javascript&smaxage=18000&action=raw&maxage=18000';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  addOnloadHook(function () { new CollapsibleTables(); });
}

function formatDate(t)
{
	var month = new Array();
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';
	
	y = t.getUTCFullYear();
	M = t.getUTCMonth();
	D = t.getUTCDate();
	h = t.getUTCHours();
	m = t.getUTCMinutes();
	s = t.getUTCSeconds();
	
	if (h > 0 || m > 0 || s > 0)
	{
		hms = '';
		
		if (s > 10)
			hms = ':' + s;
		else if (s > 0)
			hms = ':0' + s;
		
		if (m > 10)
			hms = ':' + m + hms;
		else if (m > 0)
			hms = ':0' + m + hms;
			
		if (h > 12)
			hms = (h - 12) + hms + ' PM';
		else if (h > 0)
			hms = h + hms + ' AM';
		else
			hms = '12' + hms + ' AM';
		
		return hms + ', ' + month[M] + ' ' + D + ', ' + y;
	} else {
		return month[M] + ' ' + D + ', ' + y;
	}
}

function formatTime(h, m, s)
{
	var o = '';
	
	if (h != 1)
	{
		o = h + ' hours ';
	} else {
		o = '1 hour ';
	}
	
	if (m != 1)
	{
		o += m + ' minutes ';
	} else {
		o += '1 minute ';
	}
	
	if (s != 1)
	{
		o += s + ' seconds';
	} else {
		o += '1 second';
	}
	
	return o;
}

function updateClocks()
{
	var t = new Date();

	setTimeout(updateClocks, 1000);
	
	D = t.getUTCDate();
	M = t.getUTCMonth();
	y = t.getUTCFullYear();
	h = t.getUTCHours();
	m = t.getUTCMinutes();
	s = t.getUTCSeconds();

	t = Date.UTC(y, M, D, h, m, s);

	t = (T - t) / 1000;
	
	if (t < 0 && t > -86400 && (h > 0 || m > 0 || s > 0))
	{
		document.getElementById('countdown-big').innerHTML = 'Today';
		document.getElementById('countdown-small').innerHTML = '';
		document.getElementById('countdown-target').innerHTML = 'is ' + formatDate(new Date(T + tzOffset)) + ' ' + tz;
		
		return;
	} else if (t < 0) {
		document.getElementById('countdown-big').innerHTML = 'Past';
		document.getElementById('countdown-target').innerHTML = formatDate(new Date(T + tzOffset)) + ' ' + tz;	
		
		return;
	}
	
	D = Math.floor(t / 86400.0);
	h = Math.floor(t % 86400.0 / 3600.0);
	m = Math.floor(t % 3600.0 / 60.0);
	s = Math.floor(t % 60.0)

	if (D == 1)
	{
		document.getElementById('countdown-big').innerHTML = '1 day';
	} else if (D == 0) {
		document.getElementById('countdown-big').innerHTML = '';
	} else {
		document.getElementById('countdown-big').innerHTML = D + ' days';
	}
	
	document.getElementById('countdown-small').innerHTML = formatTime(h, m, s);
}

function startCountdown()
{
	document.getElementById('countdown-target').innerHTML = 'to ' + formatDate(new Date(T + tzOffset)) + ' ' + tz;
	document.getElementById('countdown').style.display = 'block';
	updateClocks();
}

// Webmaster staff icons
addOnloadHook(function () {
 if(
 window.location.href.indexOf("/wiki/User:") == -1
 ) {
 if(
  window.location.href.indexOf("/wiki/User_talk:") == -1
  ) {
 return;
  }
 };

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="stafflink-WM" style="float:right; display:none;"><a href="/wiki/Bulbapedia:Webmasters" title="This user is a Webmaster of Bulbagarden."><img src="http://cdn.bulbagarden.net/media/upload/0/01/IconBPWebmaster.png"></a></div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});

// Editorial Board staff icons
addOnloadHook(function () {
 if(
 window.location.href.indexOf("/wiki/User:") == -1
 ) {
 if(
  window.location.href.indexOf("/wiki/User_talk:") == -1
  ) {
 return;
  }
 };

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="stafflink-EB" style="float:right; display:none;"><a href="/wiki/Bulbapedia:Editorial_Board" title="This user is a member of the Bulbapedia Editorial Board."><img src="http://cdn.bulbagarden.net/media/upload/3/3d/IconBPEditorialBoard.png"></a></div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});

// Bureaucrat staff icons
addOnloadHook(function () {
 if(
 window.location.href.indexOf("/wiki/User:") == -1
 ) {
 if(
  window.location.href.indexOf("/wiki/User_talk:") == -1
  ) {
 return;
  }
 };

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="stafflink-BC" style="float:right; display:none;"><a href="/wiki/Bulbapedia:Bureaucrats" title="This user is a Bulbapedia Bureaucrat."><img src="http://cdn.bulbagarden.net/media/upload/1/18/IconBPBureaucrat.png"></a></div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});

// Senior Administrator staff icons
addOnloadHook(function () {
 if(
 window.location.href.indexOf("/wiki/User:") == -1
 ) {
 if(
  window.location.href.indexOf("/wiki/User_talk:") == -1
  ) {
 return;
  }
 };

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="stafflink-SA" style="float:right; display:none;"><a href="/wiki/Bulbapedia:Senior_Administrators" title="This user is a Bulbapedia Senior Administrator."><img src="http://cdn.bulbagarden.net/media/upload/d/d5/IconBPSeniorAdministrator.png"></a></div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});

// Administrator staff icons
addOnloadHook(function () {
 if(
 window.location.href.indexOf("/wiki/User:") == -1
 ) {
 if(
  window.location.href.indexOf("/wiki/User_talk:") == -1
  ) {
 return;
  }
 };

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="stafflink-AD" style="float:right; display:none;"><a href="/wiki/Bulbapedia:Administrators" title="This user is a Bulbapedia Administrator."><img src="http://cdn.bulbagarden.net/media/upload/8/81/IconBPAdministrator.png"></a></div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});

// Junior Administrator staff icons
addOnloadHook(function () {
 if(
 window.location.href.indexOf("/wiki/User:") == -1
 ) {
 if(
  window.location.href.indexOf("/wiki/User_talk:") == -1
  ) {
 return;
  }
 };

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="stafflink-JA" style="float:right; display:none;"><a href="/wiki/Bulbapedia:Junior_Administrators" title="This user is a Bulbapedia Junior Administrator."><img src="http://cdn.bulbagarden.net/media/upload/5/5f/IconBPJuniorAdministrator.png"></a></div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});

// Inactive staff icons
addOnloadHook(function () {
 if(
 window.location.href.indexOf("/wiki/User:") == -1
 ) {
 if(
  window.location.href.indexOf("/wiki/User_talk:") == -1
  ) {
 return;
  }
 };

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="stafflink-IN" style="float:right; display:none;"><a href="/wiki/Bulbapedia:Inactive_Staff" title="This user is an inactive Bulbapedia staff member. Please direct your inquiries to an active staff member."><img src="http://cdn.bulbagarden.net/media/upload/8/8d/IconBPInactive.png"></a></div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});

// This will add an [edit] link at the top of all pages except preview pages and the main page
// by User:Pile0nades (blatantly stolen from Wikipedia by User:The dark lord trombonator

// Add an [edit] link to pages
addOnloadHook(function () {
 // if this is preview page or generated page, stop
 if(
 document.getElementById("wikiPreview") ||
 document.getElementById("histlegend‎") ||
 document.getElementById("difference‎") ||
 document.getElementById("watchdetails") ||
 document.getElementById("ca-viewsource") ||
 window.location.href.indexOf("/wiki/Special:") != -1
 ) {
 if(window.location.href.indexOf("&action=edit&section=0") != -1) {
 document.getElementById("wpSummary").value = "/* Intro */ ";
 }
 return;
 };

 // get the page title
 var pageTitle = wgPageName;

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="editsection">[<a href="/w/index.php?title='+escape(pageTitle)+'&action=edit&section=0" title="Edit first section: '+pageTitle+'">edit top of page</a>]</div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});

// This will add an [+] (new section) link at the top of all pages except preview pages and the main page... because some people are having trouble finding it or something
// Roughly edited from the above section by User:The dark lord trombonator

// Add an [+] link to pages
addOnloadHook(function () {
 // if this is preview page or generated page, stop
 if(
 document.getElementById("wikiPreview") ||
 document.getElementById("histlegend‎") ||
 document.getElementById("difference‎") ||
 document.getElementById("watchdetails") ||
 document.getElementById("ca-viewsource") ||
 document.getElementById("article") ||
 window.location.href.indexOf("/wiki/Special:") != -1
 ) {
 if(window.location.href.indexOf("&action=edit&section=0") != -1) {
 document.getElementById("wpSummary").value = "/* Intro */ ";
 }
 return;
 };

 // get the page title
 var pageTitle = wgPageName;

 // create div and set innerHTML to link
 var divContainer = document.createElement("div");
 divContainer.innerHTML = '<div class="editsectionnew">[<a href="/w/index.php?title='+escape(pageTitle)+'&action=edit&section=new" title="Start new section: '+pageTitle+'">+</a>]</div>';

 // insert divContainer into the DOM below the h1
 if(window.location.href.indexOf("&action=edit") == -1) {
 document.getElementById("content").insertBefore(divContainer, document.getElementsByTagName("h1")[0]);
 }

});
/* </pre> */