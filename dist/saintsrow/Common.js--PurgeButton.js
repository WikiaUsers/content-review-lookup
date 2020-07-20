//originally from https://dev.wikia.com/wiki/PurgeButton
//contains additions from https://dev.wikia.com/wiki/NullEditButton
//rewritten by 452
//__NOWYSIWYG__
(function($,mw) {
  if ( mw.config.get( 'wgNamespaceNumber' ) < 0 ||  $("#ca-purge").length ) return;

  function showResult(message, result) { //from NullEditButton
    if (typeof window.purgeNotify != "undefined") window.purgeNotify.hide();
    window.purgeNotify = new BannerNotification("Purge"+": "+message, result).show();
  }

  function start() {
    $("#mw-content-text").fadeOut(200);
    showResult("Purging page...", "confirm");
    $("#mw-content-text").before($( '<div id="purge-throbber" style="background: url(\'/skins/common/images/ajax.gif\') no-repeat center 1em white; height: 100%; left: 0; opacity: 0.50; position: absolute; top: 0; width: 100%; z-index: 5000000;"></div>'));
    purge();
  }

  function purge() {
	$.ajax({
		'type': 'POST',
		'dataType': 'text',
		'url': '/api.php',
		'data': {
		  'format':'json',
		  'action': 'purge',
		  'titles': mw.config.get('wgPageName'),
		  'forcelinkupdate':1

		},
		'error': function() {
		  showResult("Failed! Retrying...", "error");
		  purge();
		},
		'success': function() {
		  getPage();
		}
	});
  }

  function getPage() {
    showResult("Successful, loading page...", "confirm");
    var pagelocation = window.location.pathname+window.location.search;
    $("#mw-content-text").load(pagelocation +(pagelocation.indexOf("?") == -1 ?'?':'&')+"action=render", function () {
	$("#purge-throbber").remove();

	if ($("#mw-content-text").find(".mw-collapsible").length)
	  $("#mw-content-text").find(".mw-collapsible").makeCollapsible(); //re-init collapsibles
	if ($("#mw-content-text").find("table.sortable").length
	  && typeof $("#mw-content-text").find("table.sortable").tablesorter == "function")
	  $("#mw-content-text").find("table.sortable").tablesorter();  //re-init sortables
	if ($("#mw-content-text").find(".tabber").length)
	  tabberAutomatic(tabberOptions); //re-init tabbers

	tablePopoutInit(); //re-init popout tablets
	initReferences(); //re-init references
	$(".wikia-slideshow").each(function() { WikiaPhotoGallerySlideshow.init({'id':$(this).prop("id") }); }); //re-init slideshows
	$('head').append('<style>.wikia-gallery-item .thumb .gallery-image-wrapper { width: auto !important; }</style>');
	$("#mw-content-text").fadeIn(200); // Fade-in the page
	showResult("Complete!", "confirm"); // Success notification
    });
  }
  $(function () {
    $("#ca-history").closest("ul").append($("<li>").append($("<a>", { "id":"ca-purge", "title":"Purge page", "html":"Refresh"}).click(start) ));
  });
}(jQuery, mediaWiki));