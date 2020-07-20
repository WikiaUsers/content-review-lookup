//Shamelessly adapted from https://github.com/Wikia/app/blob/dev/extensions/wikia/EditPageLayout/js/plugins/Preloads.js
//Restores the preload expand collapse function for the Oasis skin's Ace Editor when loaded in MediaWiki:Wikia.js
(function($) {

    "use strict";

    $(document).ready(function() {

        if (window.WikiaEditor && !window.WikiaEditor.instanceCount) {

            console.log('MediaWiki:PreloadFix.js');

            var preload_fix = {
        		MIN_HEIGHT: 80,
        		EXPANDED_CLASS: 'expanded',
        
        		preloads: [],
        
        		// find and setup preload areas
        		init: function() {
        			this.preloads = $('.editpage-intro');
        			console.log(this.preloads);
        			this.preloads.each($.proxy(this.setupPreloadArea, this));
        		},
        
        		// bind events to a given preload area
        		setupPreloadArea: function(i, area) {
        			area = $(area);
        			area.data('expanded', false);
        
        			var content = area.find('.editpage-intro-wrapper > div'),
        				contentHeight = content.height(),
        				expandLink = area.children('.expand');
        			console.log(contentHeight);
        
        			if (contentHeight > this.MIN_HEIGHT) {
        				expandLink.
        					bind('click', $.proxy(this.expand, this)).
        					show();
        			}
        		},
        
        		// expand / collapse given preload area
        		expand: function(ev) {
        			var expandLink = $(ev.target).closest('.expand'), 
        				area = expandLink.parent(),
        				isExpanded = !!area.data('expanded');
        
        			area.
        				toggleClass(this.EXPANDED_CLASS).
        				data('expanded', !isExpanded);
        
        			// resize edit window
        			$(window).trigger('resize');
        
        			// update expand link
        			expandLink.children('label').
        				text($.msg('editpagelayout-' + (!isExpanded ? 'less' : 'more')));
        
        			expandLink.children('span').
        				text(!isExpanded ? '-' : '+');
        		}
            };
            preload_fix.init();
        }
    });
}(jQuery));