

//locks old comments
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 240;


/* From https://fictional-googology.fandom.com/wiki/MediaWiki:Common.js, it is completely fine, it's for a template we need
 mmw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
});*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Selector.js'
    ]
});

// 1. Explicitly protect and wait for the MediaWiki utility and jQuery to load
mw.loader.using(['mw.util', 'jquery'], function () {
    
    // 2. Corrected the typo from mmw to mw
    mw.hook("wikipage.content").add(function ($content) {
        
        // 3. Performance boost: Only scan inside the newly loaded content area ($content)
        $content.find("span.import-css").each(function () {
            var $this = $(this);
            var cssText = $this.attr("data-css");
            
            // 4. Safety check to make sure CSS text actually exists
            if (cssText) {
                var css = mw.util.addCSS(cssText);
                
                // 5. Corrected context bug using $this instead of a global selector
                if (css && css.ownerNode) {
                    $(css.ownerNode)
                        .addClass("import-css")
                        .attr("data-css-hash", $this.attr("data-css-hash"))
                        .attr("data-from", $this.attr("data-from"));
                }
            }
        });
    });
});