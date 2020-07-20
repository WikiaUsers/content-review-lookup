/* Any JavaScript here will be loaded for all users on every page load. */

/* Pop-up character portal */
$(function() {
    $('.popup-wrapper').each(function(i){
        $(this).attr('id', 'popup-wrapper-' + i);
    }).mouseleave(function(){
        var i = $(this).attr('id').substring(14);
        $('#popup-box-' + i).css('display', 'none');
        $(this).css('display', 'inline');
    });
    $('.popup-link').each(function(i){
        $(this).attr('id', 'popup-link-' + i);
    }).mouseenter(function(){
        var i = $(this).attr('id').substring(11);
        $('#popup-box-' + i).css({
            'display': 'block',
            'position': 'absolute',
            'z-index': 50,
            'top': $(this).position().top + $(this).css('line-height'),
            'left': $(this).position().left
        });
    });
    $('.popup-box').each(function(i){
        $(this).attr('id', 'popup-box-' + i);
    });
});

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
 
 
// END JavaScript title rewrite

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
addOnloadHook(rewriteTitle);

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

//Forum highlight From Mazerunner wiki.
window.MessageWallUserTags = {
    tagColor: 'black',
    glow: true,
    glowSize: '15px',
    glowColor: '#00FFEF',
    users: {
        'username': 'usergroup',
        'TimeShade': 'Administrator'
    }
};

window.importArticles( {
    type: 'script',
    articles: [
'u:dev:MessageWallUserTags/code.js'
]
} );