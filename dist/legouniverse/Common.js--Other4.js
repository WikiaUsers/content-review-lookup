// *************************************************
    // Pagetitle rewrite
    //
    // Rewrites the page's title, used by Template:Title
    // *************************************************
 
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

/* Replace */

function printerFriendly(){
$('.wikiaRss a[href^="http://universe.lego.com/en-US/Community/NewsNetwork/Story.aspx"]').each(function() {
    var story = $(this).attr("href");
    printerfriendly = story.replace("Story.aspx", "PrinterFriendly.aspx");
    $(this).attr('href', printerfriendly);
});
}

function pFtimeout(){
window.setTimeout(printerFriendly, 1000);
}

$('.wikiaRss a[href^="http://universe.lego.com/en-US/Community/NewsNetwork/Story.aspx"]').ready(pFtimeout);