/*jshint jquery:true browser:true smarttabs:true laxbreak:true laxcomma:true */
/*global mediaWiki */

// Avoid running if we can heuristically determine that we aren't going to do anything
if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'Wantedfiles'
 || mediaWiki.config.get('wgNamespaceIds').file === mediaWiki.config.get('wgNamespaceNumber')
   ) {
mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
function fixUploadLinks() {
	var $ = jQuery, mw = mediaWiki
	  , decodeURI = window.decodeURIComponent
	  , upload = mw.util.wikiGetlink('Special:Upload') + '?wpDestFile='
	  ;
	// Sets an anchor to a new destination
	// Requires link node (DOM, not jQuery), file name (Url encoded),
	// A hover title, and an [optional] replacement face text for the link.
	// Face text replacement will be skipped if that parameter is falsy
	function fixFileLink(link, name, title, text) {
		link.href = upload + name;
		link.title = title + ' ' + decodeURI(name).replace(/_/g, ' ');
		if (text) {
			// This is because .text() will kill the pencil icon in Oasis
			var $link = $(link);
			$link.contents().filter(function() {
				return this.nodeType === 3; // Text nodes
			}).remove();
			$link.append(' ' + text);
		}
	}
	// Wanted files has a heap of bad links that need fixing
	if (mw.config.get('wgCanonicalSpecialPageName') === 'Wantedfiles') {
		var indexPhp = mw.config.get('wgScript') + ''
		  , articleParts = (mw.config.get('wgArticlePath') + '').split('$1')
		  ;
		$('ol.special a.new').not('[href*="wpDestFile="]').each(function() {
			// Pretty URLs
			var href = this.href + ''
			  , index = href.indexOf(articleParts[0])
			  , lastIndex = href.lastIndexOf(articleParts[1])
			  , name
			  , match
			  ;
			if (index !== -1 && lastIndex !== -1) {
				name = href.substring(index + articleParts[0].length, lastIndex);
				match = (/^[^:]*:([^\?&]+)/).exec(name);
				name = match && match[1];
			} else {
				// Non-pretty URL, look for index.php
				index = href.indexOf(indexPhp);
				if (index !== -1) {
					index += indexPhp.length;
					match = (/(?:^\?|&)title=[^:]*:([^&]+)/).exec(href.substr(index));
					name = match && match[1];
				}
			}
			if (name) {
				fixFileLink(this, name, mw.msg('destfilename'));
			}
		});
	} else if (/*Namespace test at TOP*/document.getElementById('mw-imagepage-nofile')) {
		// Pages in the file namespace without files feature a "Create" button that edits
		// instead of uploads. This changes it to say "Upload photo" and fixes the link.
		// NOTE: Monobook sticks the #ID on the LI instead of the link itself
		var filePage = mw.util.wikiUrlencode(mw.config.get('wgTitle'));
		$('a[data-id="edit"][href*="action=edit"], #ca-edit > a').each(function() {
			fixFileLink(
				this,
				filePage,
				mw.msg('destfilename'),
				mw.msg('upload')
			);
		});
	}
}
// Loader to check and fetch the necessary i18n messages
(function($, mw) {
	var needs = ['upload', 'destfilename'];
	
	// Filter the ones we have
	var i = needs.length;
	while (i--) {
		if (mw.messages.exists(needs[i])) {
			needs.splice(i, 1);
		}
	}
	
	// If we don't actually need to fetch anything then stop
	if (needs.length === 0) {
		return $.Deferred().resolve();
	}
	
	// Fetch the messages from the server
	return $.ajax({
		url: mw.util.wikiScript('api'),
		data: {
			action: 'query',
			format: 'json',
			meta: 'allmessages',
			ammessages: needs.join('|')
		},
		dataType: 'json'
	})
	.done(function(json) {
		json = json && json.query;
		json = json && json.allmessages;
		if (!$.isArray(json)) {
			return;
		}
		for (var i = 0, len = json.length ; i < len ; ++i) {
			if (json[i].missing !== void 0) {
				continue;
			}
			mw.messages.set(json[i].name, json[i]['*']);
		}
	})
	;
})(jQuery, mediaWiki)
.done(function() {
	// When the data is ready, we can run as soon as the DOM is ready
	jQuery(fixUploadLinks);
});
});
}