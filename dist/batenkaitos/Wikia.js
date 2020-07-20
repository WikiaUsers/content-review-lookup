// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});

importScriptPage('RelatedDiscussionsModule/code.js', 'dev');
 
// create raw textarea list of pages on Special:WantedPages courtesy of Mathmagician
if (mw.config.get('wgCanonicalSpecialPageName') === 'Wantedpages') {
	$(function ($) {
		var str = "";
		$('ol.special li a:first-child').each(function () {
			str += this.textContent + "\n";
		});
		var $textarea = $('<textarea id="wantedpages-textarea">');
		$textarea.val(str);
		$textarea.css({ width: '95%', height: '150px' });
		$('#wantedpages-textarea').remove();
		$('#mw-content-text').prepend($textarea);
	});
}