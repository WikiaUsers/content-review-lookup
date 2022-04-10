/* Any JavaScript here will be loaded for all users on every page load. */

/******************************/
/* Mediaplayer     */
/******************************/

var mediaReplacer = mw.config.get('wgTimedMediaHandler');
mediaReplacer['EmbedPlayer.RewriteSelector'] = 
    mediaReplacer['EmbedPlayer.RewriteSelector'].replace('audio,', '');

/******************************/
/* Expand All Collapsible     */
/******************************/
function expandAllHandler(e, $el) {
    // Forked from MW collapsibles handler
    if (e) {
        if (e.type === 'click' &&
            e.target.nodeName.toLowerCase() === 'a' &&
            $(e.target).attr('href')) {
                    return;
        } else if (e.type === 'keypress' &&
            e.which !== 13 &&
            e.which !== 32) {
                    return;
        } else {
            e.preventDefault();
            e.stopPropagation();
            $el.find('.mw-collapsible-toggle-collapsed').click();
        }
    }
}

function expandAll_Buttons($el) {
    $el.find('.mw-expandall:not(.mw-expandall-handled)').each(function() {
        var $this = $(this),
            $contents = $this.contents();

        $this.attr('role', 'button');
        if (!$this.attr('tabindex')) $this.attr('tabindex', '0');
        $('<a' + '>').prependTo($this).append($contents)
            .on('click', function(e) { expandAllHandler(e, $el); })
            .on('keypress', function(e) { expandAllHandler(e, $el); });
        $this.addClass('mw-expandall-handled');
    })
}

mw.loader.using('mediawiki.util').then(function () {
    mw.util.addCSS('.mw-expandall-handled { cursor: pointer; }');
});

mw.hook('wikipage.content').add(expandAll_Buttons);
expandAll_Buttons($('#content'));
window.lastEdited = {
	size: false,
	diff: false,
	position: {
		element: document.getElementById('mw-content-text'),
		method: 'prepend'
	},    

}

/*******************/
/* LastEdit     */
/*******************/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LastEdited/code.js',
    ]
});

/*******************/
/* Tooltip     */
/*******************/

window.tooltips_list = [
	{
		classname: 'advanced-tooltip',
		delay: 1000
	}
];