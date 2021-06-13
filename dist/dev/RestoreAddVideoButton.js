/**Restoring the add video button on Special:NewImages**/
 
$(function () {
    if (window.addVideoPatch || mw.config.get("skin") !== "fandomdesktop"
        || mw.config.get("wgCanonicalSpecialPageName") !== "Newimages") return;
    window.addVideoPatch = true;
    
    mw.loader.using("mediawiki.api").then(function () {
        (new mw.Api()).getMessages("videos-add-video").then(function (msg_data) {
	        $('<a>', {
	        	class: 'wds-button addVideo',
	        	text: msg_data["videos-add-video"],
	        	href: '#',
	        	click: function() {
	        		$('.special-videos__upload').removeClass('is-hidden');
	        	},
	        	appendTo: $('.page-header__actions')
	        });
        });
    });
});