/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');
function importScriptPage (page, server) { var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript'; if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url; return importScriptURI(url); }
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

importScriptPage('ShowHide/code.js', 'dev');

function importScriptPage (page, server) { var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript'; if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url; return importScriptURI(url); }

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

//Insert Name
$(function() {
	$('#firstHeading').addClass('page-header__title');
	$('#bodyContent').addClass('page-content');

	if ($("table.classnav").length) classNav();
	if ($("#ptabs").length) doPortalTabs();

	tooltipsInit($(article));
	addAjaxDisplayLink();
	timeInit();

	handleAutocollapse($(article));
	$("td.collapse-next-row").each(function() {if ($(this).parent().next().height()>300) $(this).append("<span style='float:right;'>[<a>show</a>]</span>").children("span").children("a").click(function(){$(this).text($(this).text()=="hide"?"show":"hide").parent().parent().parent().next().slideToggle();}).parent().parent().parent().next().hide();});
	requireImageLicense();
	if (mw.config.get("wgUserName") !== null) $("span.insertusername").html(mw.config.get("wgUserName"));
	$(article+" .quote").prepend("<span class='quotemark' style='float:right;'>&#8221;</span><span class='quotemark' style='float:left;'>&#8220;</span>").css("max-width","75%").after("<br clear='left' />");
	$(".mw-mpt-link").html("<a href='/Special:WhatLinksHere/"+$(".page-header__title").text().replace("Move ","").replace(/'/g,"%27")+"'>Links to the old page title</a>");
	$(".coords-link").each(function() {
		if ($(this).next().find("a.new").length)
			$(this).addClass('broken');
	});

	if (!(window.location.hash && window.location.hash.match(/!noversions/))) {
		versionsInit();
		inlineVersionsInit();
	}
});