/*jshint browser:true, jquery:true, smarttabs:true */
/*global importArticle */

/* Load the script loader */
(function(w) {
	'use strict';
	var dev = w.dev = w.dev || {};
	if (jQuery.isFunction(dev.define) && dev.define.amd) {
		return;
	}
	dev.requireList = [];
	function makeQueueAction(what) {
		return function() {
			dev.requireList.push([what, arguments]);
		};
	}
	var require = makeQueueAction('require'),
	    define = makeQueueAction('define');
	require.define = define;
	require.checkStateOf = function() {
		return 'undefined';
	};
	define.require = require;
	define.alias = makeQueueAction('alias');
	define.configure = makeQueueAction('configure');
	define.amd = {
		jQuery: true,
		MediaWiki: true,
		recorder: true
	};

	dev.require = require;
	dev.define = define;

	importArticle({ type: 'script', article: 'User:Lunarity/loader.js' });
})(this);
/*global dev */

dev.require(['jquery'], function($) {
    'use strict';
    var list = [];
    $('.metawsl-loader-run-scripts').each(function() {
        $(this).text().split(/\s+/g).forEach(function(here) {
            here = here.trim();
            if (here) {
                list[list.length] = 'page!' + here;
            }
        });
    });
    if (list.length) {
        dev.require(list);
    }
});