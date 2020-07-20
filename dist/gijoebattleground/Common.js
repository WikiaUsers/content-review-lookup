/* Any JavaScript here will be loaded for all users on every page load. */

$(function(){
    importArticles({
      type: "script",
      articles: [
        "w:c:dev:BackToTopButton/code.js",
        "w:c:dev:FixWantedFiles/code.js",
        "w:c:dev:ListAdmins/code.js",
        "w:c:dev:AjaxRC/code.js",
        "w:c:dev:DisplayTimer/code.js",
        "w:c:dev:SpoilerAlert/code.js",
        "w:c:dev:InactiveUsers/code.js",
        "w:c:dev:LockOldBlogs/code.js",
        "w:c:dev:VisualSpellCheck/code.js",
        "w:c:dev:SearchSuggest/code.js",
        "w:c:dev:WallGreetingButton/code.js",
        "u:zh.pad.wikia.com:MediaWiki:CountDown.js",
    ]
    }, {
      type: "style",
      articles: [
        "u:zh.pad.wikia.com:MediaWiki:CountDown.css"
    ]
    });
});

/* Flag Counter */
$(function($) {
	$(document.body).append('<div id="counter"><img src="http://s04.flagcounter.com/mini/ecmL/bg_000000/txt_DEDEDE/border_000000/flags_0/" alt="" border="0" width="1" height="1"></div>');
});