//<!--
//Custom implementation of combined Purge and Null Edit options

if (typeof debug452 == "function") debug452("start of PageRefresh");

$(function() {
  if (mw.config.get("wgNamespaceNumber") < 0) return;

  function PageRefreshStart(method) {
    $("#mw-content-text").fadeOut(254);
    SRWpopup("PageRefreshPopup", method, "Refreshing page via "+method, "success");
    $("#mw-content-text").before($('<div id="throbber" class="throbber"></div>'));
    PageRefresh(method);
  }

  function PageRefresh(method) {
	new mw.Api().post(method == "Purge"?{
	  'format': 'json',
	  'action': 'purge',
	  'titles': mw.config.get("wgPageName"),
	  'forcelinkupdate':1
	}:{
	  'format': 'json',
	  'action': 'edit',
	  'title': mw.config.get("wgPageName"),
	  'token': mw.user.tokens.get("editToken"),
	  'prependtext': '',
	  'nocreate': '1'
	})
	.done(function(result) {
	  PageRefreshReload(method);
	})
	.fail(function(code, failed) {
	  console.log(failed);
	  SRWpopup("PageRefreshPopup", method, "Failed! Retrying...", "error");
	  if(code == "badtoken") {
		console.log("Getting new token...");
		new mw.Api().get({
		  'format': 'json',
		  'action': 'query',
		  'titles': '452',
		  'prop': 'info',
		  'intoken': 'edit',
		})
		.done(function(result) {
		  console.log("Got new token.");
		  mw.user.tokens.set("editToken", result.query.pages[Object.keys(result.query.pages)].edittoken);
		  setTimeout(function(){ PageRefresh(method); }, 452);
		});
	  } else {
		setTimeout(function(){ PageRefresh(method); }, 904);
	  }
	});
  }

  function PageRefreshReload(method, silent) {
    if (!silent) SRWpopup("PageRefreshPopup", method, "Successful, loading page...", "success");
    var pagelocation = window.location.pathname+window.location.search;
    $("#mw-content-text").load(pagelocation +(pagelocation.indexOf("?") == -1 ?"?":"&")+"action=render", function () {
	$("#throbber").remove();

	if ($("video, audio").length && typeof $("video, audio").embedPlayer == "function")
	  $("video, audio").embedPlayer();

	if ($(".mw-collapsible").length && typeof $(".mw-collapsible").makeCollapsible == "function")
	  $(".mw-collapsible").makeCollapsible();

	if ($("table.sortable").length && typeof $("table.sortable").tablesorter == "function")
	  $("table.sortable").tablesorter();

	if ($(".tabber").length && typeof tabberAutomatic == "function")
	  tabberAutomatic(tabberOptions);

	if (typeof WikiaPhotoGallerySlideshow != "undefined")
	  $(".wikia-slideshow").each(function() { WikiaPhotoGallerySlideshow.init({ 'id':$(this).prop("id") }); });

	if (typeof tablePopoutInit == "function") tablePopoutInit();

	if (typeof initReferences == "function") initReferences();

	$("head").append("<style>.wikia-gallery-item .thumb .gallery-image-wrapper { width: auto !important; }</style>");
	$("#mw-content-text").fadeIn(254);
	if (!silent) SRWpopup("PageRefreshPopup", method, "Complete!", "success");
    });
  }

  $("#ca-purge").remove();
  $("#PurgeLink").remove();
  $("#ca-null-edit").remove();
  $("#NullEditLink").remove();
  $("#ca-history").closest("ul").append($("<li>").append($("<a>", { "id":"PurgeLink", "title":"Purge page", "html":"Refresh"}).click(function(){ PageRefreshStart("Purge"); }) )).append($("<li>").append($("<a>", { "id":"NullEditLink", "title":"Null Edit page", "html":"Null Edit"}).click(function(){ PageRefreshStart("Null Edit"); }) ));

  if (($(".ns-2").length && !$("#ca-edit").length && $("#mw-content-text").text().indexOf("This user has not filled out their profile page yet.") != -1)) PageRefreshReload("Purge", 1)

});