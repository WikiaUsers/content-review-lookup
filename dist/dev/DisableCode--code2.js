/** 
 * @file		DisableCode.js
 * @author		Parkour2906
 * @version		1.0
 * @desc		Adds a button to tools for disabling all CSS and JS by using ?safemode
**/
$(function() {
    'use strict';
    const pageName = mw.config.get("wgPageName");
    mw.hook('dev.placement').add(function(placement) {
        window.dev.placement.loader.util({
            script: 'DisableCode',
            element: 'tools',
            type: 'prepend',
            content: $('<li>').append(
                $('<a>', {
                    id: 't-dc',
                    text: 'Disable Code',
                    href: "/wiki/" + pageName + getSafeModeLink()
                })
            )
        });
    });
    
    function getSafeModeLink() {
	    if (window.location.search.length > 0) {
	    	return (window.location.search + "&safemode=true");
	    } else {
	    	return "?safemode=true";
	    }
    }

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Placement.js'
    });
});