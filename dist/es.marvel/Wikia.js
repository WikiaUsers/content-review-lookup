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
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
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


/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario:'+ encodeURIComponent(wgUserName) +'/wikia.css" title="Tu apariencia personal">Mi apariencia</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
 
function showEras(className) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv == null || titleDiv == undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}


// END JavaScript title rewrite //

/* Spoilers */
SpoilerAlert = {
    question: 'Este artículo contiene spoilers. ¿Deseas continuar?',
    yes: 'Si, acepto',
    no: 'No, mejor no',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

// Add click tracking to the Curso básico:Daredevil page
if(mw.config.get('wgPageName') === "Curso_básico:Daredevil") {
	var countryCode = Geo.getCountryCode(),
		timestamp = Date.now(),
		click_tracker,
		pixel_tracker,
		pass = true;
		
	switch(countryCode) {
		case "AR": 
			click_tracker = 'https://ad.doubleclick.net/ddm/trackclk/N186801.143372WIKIAINC/B9521716.130139311;dc_trk_aid=303015354;dc_trk_cid=69760672;u=mqso:90439394;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=';
			pixel_tracker = 'https://ad.doubleclick.net/ddm/trackimp/N186801.143372WIKIAINC/B9521716.130139311;dc_trk_aid=303015354;dc_trk_cid=69760672;u=mqso:90439394;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?';
			break;
		case "PE": 
			click_tracker = 'https://ad.doubleclick.net/ddm/trackclk/N186801.143372WIKIAINC/B9522151.130278007;dc_trk_aid=303123847;dc_trk_cid=69818302;u=mqso:90439399;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=';
			pixel_tracker = 'https://ad.doubleclick.net/ddm/trackimp/N186801.143372WIKIAINC/B9522151.130278007;dc_trk_aid=303123847;dc_trk_cid=69818302;u=mqso:90439399;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?';
			break;
		case "CL": 
			click_tracker = 'https://ad.doubleclick.net/ddm/trackclk/N186801.143372WIKIAINC/B9526489.130271261;dc_trk_aid=303123914;dc_trk_cid=69816553;u=mqso:90439396;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=';
			pixel_tracker = 'https://ad.doubleclick.net/ddm/trackimp/N186801.143372WIKIAINC/B9526489.130271261;dc_trk_aid=303123914;dc_trk_cid=69816553;u=mqso:90439396;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?';
			break;
		case "CO": 
			click_tracker = 'https://ad.doubleclick.net/ddm/trackclk/N186801.143372WIKIAINC/B9530520.130145471;dc_trk_aid=303014885;dc_trk_cid=69759880;u=mqso:90439391;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=';
			pixel_tracker = 'https://ad.doubleclick.net/ddm/trackimp/N186801.143372WIKIAINC/B9530520.130145471;dc_trk_aid=303014885;dc_trk_cid=69759880;u=mqso:90439391;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?';
			break;
		default:
			pass = false;
			break;
	}
	if(pass === true) {
		$('.banner a').attr('href', click_tracker);
		$('body').append('<img src="' + pixel_tracker + '" border=0 width=1 height=1 alt="Advertisement">');
	}
}