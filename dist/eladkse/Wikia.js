importScriptPage('MediaWiki:RelatedDiscussionsModule.js', 'eladkse');
importScriptPage('Countdown/code.js', 'dev');


/* Collapsible SMW Factbox */
function SMWFacts() {
	$('.WikiaArticleFooter .smwrdflink').after('<a class="showfacts" onclick="showFacts()">(Show)</a>');
	$('.WikiaArticleFooter .smwfacttable').css('display', 'none');
}
SMWFacts();

function showFacts() {
	$('.WikiaArticleFooter .smwfacttable').css('display', 'block');
	$('.WikiaArticleFooter .showfacts').replaceWith('<a class="hidefacts" onclick="hideFacts()">(Hide)</a>');
};
function hideFacts() {
	$('.WikiaArticleFooter .smwfacttable').css('display', 'none');
	$('.WikiaArticleFooter .hidefacts').replaceWith('<a class="showfacts" onclick="showFacts()">(Show)</a>');
};