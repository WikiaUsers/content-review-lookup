// ============================================================
// Modifies area above Wiki Header buttons
// ============================================================

$(document).ready(function() {
	$('#WikiHeader').before('<marquee behavior="scroll" direction="left" scrollamount="5">WE ARE IN THE PROCESS OF GETTING A BANNER!</marquee>');});

if(wgMainpage == wgPageName) {window.location = 'http://www.google.com';}