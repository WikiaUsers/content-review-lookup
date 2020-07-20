/* Any JavaScript here will be loaded for all users on every page load. */
jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})

jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=51969956920&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);

importScriptPage('ShowHide/code.js', 'dev')

// ============================================================
// UserNameReplace
// ============================================================
 
function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* Code for cycling through Template:FeaturedExternalBlogs */
function cycleToNextItem(clickedEl){
    var list = $(clickedEl).parents('div.cycleMe').find('ul');
    var items = $(list).children();
    var numItems = items.length;
    var currIndex = -1;
    items.each(function(i, el){
        if($(el).is(':visible')){
            currIndex = i;
        }
    });
    var nextIndex = (currIndex + 1) % numItems;
    $(items.get(currIndex)).fadeOut('slow', function(){
        $(items.get(nextIndex)).fadeIn()
    });
}
$(function(){
    $('div.cycleMe small a').unbind('click').click(function(ev){
        cycleToNextItem(this);
        ev.preventDefault();
    });
});


/* track incontent share fb button */
$(function(){
    $("#incontent_share").click(function(){
        WET.byStr("articleAction/incontent_share/" + wgPageName);
    });
});

 
$(document).ready(function(){
	if( $('#control_form_edit').length )
	{
		$('#control_edit').remove();
	}
});