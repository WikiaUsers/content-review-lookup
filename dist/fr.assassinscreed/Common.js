/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */


window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.UserTagsJS = {
	modules: {},
	tags: {
		peredelasagesse: { u:'Père de la Sagesse', f:'Mère de la Sagesse'},
		recrue: { u:'Recrue' },
		maitre: { u:'Maître Assassin' },
		legende: { u:'Légende' },
	}
};

UserTagsJS.modules.custom = {
	'Touloir': ['peredelasagesse'],
};


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
 
window.updatetimer = function(i) {
	var now = new Date(),
		then = timers[i].eventdate,
		diff = Math.floor((then.getTime()-now.getTime())/1000),
		count = diff,
		tpm = ' ';
 
	// catch bad date strings
	if(isNaN(diff)) { 
		timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
		return;
	}
 
	// determine plus/minus
	if(diff < 0) {
		diff = -diff;
		tpm = ' ';
	} else {
		tpm = ' ';
	}
 
	// calcuate the diff
	var left = (diff%60) + ' sec';
	
	diff=Math.floor(diff/60);
	
	if(diff > 0) left = (diff%60) + ' min ' + left;
	
	diff = Math.floor(diff/60);
		
	if(diff > 0) left = (diff%24) + ' h ' + left;
	
	diff = Math.floor(diff/24);
	
	if(diff > 0) left = diff + ' d ' + left;

	timers[i].firstChild.nodeValue = tpm + left;
 
	// a setInterval() is more efficient, but calling setTimeout()
	// makes errors break the script rather than infinitely recurse
	timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
	//hide 'nocountdown' and show 'countdown'
	var nocountdowns = document.getElementsByClassName('nocountdown');
	for(var i = 0, noCdLen = nocountdowns.length; i < noCdLen; i++) {
		nocountdowns[i].style.display = 'none';
	}
	var countdowns = document.getElementsByClassName('countdown');
	for(var j = 0, cdLen = countdowns.length; j < cdLen; j++) {
		countdowns[j].style.display = 'inline';
	}
 
	//set up global objects timers and timeouts.
	timers = document.getElementsByClassName('countdowndate');  //global
	timeouts = []; // generic holder for the timeouts, global
	if(timers.length === 0) return;

	for(var k = 0, timersLen = timers.length; k < timersLen; k++) {
		timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
		updatetimer(i);  //start it up
	}
}
//addOnloadHook(checktimers);	//deprecated
$(document).ready(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
 
/********************************************************************************/
/* sliders using jquery by Dragon Age wiki User:Tierrie . All credit goes to him*/
/********************************************************************************/
 
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://uncharted.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
	$(document).ready(function() {
		var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
		$("[class^=portal_sliderlink]").click(function() { // bind click event to link
			$tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
			return false;
		});
		$('#portal_next').click(function() {
			$tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
			return false;
		});
		$('#portal_prev').click(function() { // bind click event to link
			$tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
			return false;
		});
	});
});