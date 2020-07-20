/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
	Requires copying Template:USERNAME. */
 
importArticles({
    type: "script",
    articles: [
        'u:dev:GalleryButtonCustomText/code.js'
    ]
});

function UserNameReplace() {
	if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
	$("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Hide poll answers */

$(function() {
  $('.ajax-poll .pollAnswerVotes').hide();
  $('.ajax-poll [type="submit"]').on('click', function() {
    $('.ajax-poll .pollAnswerVotes').show();
  });
});