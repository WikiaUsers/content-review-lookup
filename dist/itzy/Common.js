/* Any JavaScript here will be loaded for all users on every page load. */
//LockForums config
window.LockForums = {
    expiryDays: 14,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
};
 
//ArchiveBoards config
window.ArchiveBoards = {
    post: true,
    threads: false,
    boards: ['Wikia Updates']
};

// Add [[ Category: Images]] @ images aytomatically
 
if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
};
 
//TZclock config
window.TZclockSimpleFormat = true;
 
//Rollback config
window.RollbackWikiDisable = true;
 
//AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Recent_posts'];
window.ajaxSpecialPages = ['WikiActivity', 'Recentchanges', 'Watchlist', 'Log'];

//RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Change color of infoboxes title and headers 
depending of background color */
function piColor() {
	var rgb = $('.pi-title').css('backgroundColor');
	var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	
	var r = colors[1];
	var g = colors[2];
	var b = colors[3];
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	
	if (yiq >= 128) {
		/* Dark text */
		$('.pi-title').css('color', '#fff');
		$('.pi-header').css('color', '#fff');
	} else {
		/* Light text */
		$('.pi-title').css('color', '#fff');
		$('.pi-header').css('color', '#fff');
	}
}

/* Update for color editor like DevTools (works only for title) */
setInterval(piColor, 200);

//Template:USERNAME
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
 
/* Allows for the embedding of videos from vlive.tv (Base Code - KockaAdmiralac) */
mw.hook('wikipage.content').add(function($content) {
    var current = 0;
    $content.find('.Vlive:not(.loaded)').each(function() {
        var el = document.getElementsByClassName("Vlive")[current];
        var video_id = "https://www.vlive.tv/embed/" + el.getAttribute("data-id") + "?autoPlay=false";
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: el.getAttribute("data-height"),
                scrolling: 'no',
                src: video_id,
                width: el.getAttribute("data-width"),
                allow: "fullscreen",
            })
        ).addClass('loaded');
        current += 1;
    });
});