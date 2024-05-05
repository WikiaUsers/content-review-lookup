SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('MediaWiki:Common.js/SpoilerPop.js', 'tgama.teenagedreams');

importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});

/* Dev Wiki imports */
importArticles({
    type: "script",
    articles: [
        "w:dev:BackToTopButton/code.js",
        "w:dev:DisplayClock/code.js",
        "w:dev:VisualSpellCheck/code.js",
        "w:dev:SignatureCheck/code.js"
      ] 
});

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
 
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/fanonmodule.js", /* Create WikiaRail element to advertise the fanon portal */
               
	]
});