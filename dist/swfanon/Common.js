/** New and improved, downsized version 
 * Reports of functionality loss or bugs should go to User talk:TK-999
 * Active from 2012-04-25 (April 25, 2012)
 **/

window.AddRailModule = ['Template:RailModule', 'Template:RailModule2'];
importArticles(
    {
    	type: "script",
    	articles: [
    		"w:dev:AjaxRC/code.js",
    		"w:dev:ShowHide/code.js",
    		'w:dev:DiscussionsLink/code.js',
    		//Runescape Wiki code
    		// ============================================================
    		// Standard edit summaries
    		// Source Editor - Original with slight label change
    		// Visual Editor - Modified by Casualty Wiki from here
    		// with slight label change
    		// ============================================================
    		"w:runescape:MediaWiki:Gadget-Summaries.js"
    	]
    },
    {
        type: "style",
        articles: [
            "w:runescape:MediaWiki:Gadget-Summaries.css"
        ]
    }
);
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log"];

require(['mw'], function (mw) {
	'use strict';
	
	var config = mw.config;
		
	/**
	* Adds Template:Information to the information box on Special:Upload
	* @author Jack Phoenix <jack@countervandalism.net>
	* @date June 7, 2010
	**/
 
	if ( config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
		document.getElementById('wpUploadDescription').value = '\=\=Summary\=\=\n';
	}
 

	Array.prototype.forEach.call(document.getElementsByClassName('insertusername'),
	    function(elem){
        	elem.textContent = mw.user.name();
        	document.title = document.title.replace(/<insert name here>/, mw.user.name());
        }
    );
	
	// Support for user-defined infobox colorization
	var dataElement = document.getElementById('custom-infobox-colors');
	if (dataElement) {
        var titleBg = dataElement.getAttribute('data-title-background'),
            headingBg = dataElement.getAttribute('data-heading-background'),
            titleText = dataElement.getAttribute('data-title-text'),
            headingText = dataElement.getAttribute('data-heading-text');
        
        // Portable Infobox - styling for new class names
        // (changes to be announced soon)
        var infoboxTitle = document.querySelector('.pi-title');
        if (infoboxTitle) {
            infoboxTitle.style.background = titleBg;
            infoboxTitle.style.color = titleText;
        }
 
        Array.prototype.forEach.call(document.getElementsByClassName('pi-header'),
            function(subHeading) {
                subHeading.style.background = headingBg;
                subHeading.style.color = headingText;
            }
        );
        
        document.querySelector('.portable-infobox').style["border-bottom"] = '24px solid ' + dataElement.getAttribute('data-title-background');
        
        // handle images
        var width = (dataElement.getAttribute('data-image-width') === 'px' ? 'auto' : dataElement.getAttribute('data-image-width')),
            height = (dataElement.getAttribute('data-image-height') === 'px' ? 'auto' : dataElement.getAttribute('data-image-width'));
        if (height !== 'auto' || width !== 'auto') {
            try {
                // Portable Infobox - styling for new class names
                // (changes to be announced soon)
                var image = document.querySelector('.pi-image-thumbnail');
                image.style.width = width;
                image.style.height = height;
            } catch (e) {}
        }
	}
});