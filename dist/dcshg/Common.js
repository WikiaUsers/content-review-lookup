/* Any JavaScript here will be loaded for all users on every page load. */

 // generate a scroll event to lazy-load images in a parser function in a portable infobox tab
$('#mw-content-text').on('click', '.pi-section-tab', function(){$(window).trigger('scroll')});