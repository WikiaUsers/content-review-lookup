/*jshint smarttabs:true curly:false jquery:true browser:true */
/*global mediaWiki */

/**
 * Anti-Unicruft Automatic Script Sanitiser
 * Author: [[User:Lunarity]]
 * License: CC0 (https://creativecommons.org/publicdomain/zero/1.0/)
 *
 * Unicode provides several invisible control characters that affect the way the
 * surrounding text is rendered. These include zero-width spaces and Right-Left
 * Marks. These can be somewhat useful when working with text but cause nasty,
 * hard to trace bugs in source code; they can cause 2 visually identical strings
 * to fail in an equality test, or to accidentally define a new variable with the
 * invisible character causing the name to be different even though it looks
 * identical, etc. If you've ever stared at some code and been unable to figure out
 * why it isn't working, only to rewrite the section exactly the same as it already
 * was and have it magically start working, this is why.
 *
 * This script attaches to the Edit page's submission process so that it can
 * automatically scrub the article of obviously wrong invisible nonsense, thus
 * freeing you from hours of head scratching debugging. It will only run on script
 * (JS/CSS) pages so it won't harm regular articles that use the control characters
 * intentionally, though you should prefer HTML Entities for these things to
 * make it easier to modify.
 *
 * NOTE: The algorithm SHOULD handle Right-Left languages safely. Report if it
 *	doesn't.
 * TODO: Wikia is disabling User+Wiki scripts on Edit pages for Wikia/Common/etc.js.
 *	I can work around that by checking for $.inArray('sysop', wgGroups) whenever
 *	someone opens the admin dashboard then doing an AJAX to fetch the Common.js, etc
 *	pages, scan them and if there is a problem, use Edit API to rewrite them.
 *	This isn't very pleasant though, both for the random AJAX and the fact that the
 *	page could become broken which would break us before we can fix it.
 */
if (({edit:1,editredlink:1,submit:1})[mediaWiki.config.get('wgAction')] === 1) // Edit pages only
(function($, mwcfg, console) {
	"use strict";

	var log = $.noop, apply = Function.prototype.apply;
	if (console) log = function() {
		var args = [].slice.call(arguments);
		args.unshift('ANTI-UNICRUFT:');
		return apply.call(console.log, console, args);
	};

	// We're only going to do this for Wiki code pages (.js/.css)
	if (!(/\.(?:js|css)$/i).test(mwcfg.get('wgPageName'))) {
	    if (mwcfg.get('debug')) {
		    log('No JS/CSS file extension. Not running.');
	    }
	    return;
	}

	$(function($) {
		var $saveform = $('#wpSave').closest('form');

		// If the script runs twice somehow, don't glue to it a 2nd time
		if ($saveform.data('AntiUnicruft')) return;

		// Hook the form submission event to apply our filter.
		$saveform.data('AntiUnicruft', true).on('submit', function () {
			var $box, text;
			if (mwcfg.get('skin') === 'oasis') {
				$box = $('textarea.cke_source'); // CKE Source mode
			}
			if (!$box || !$box.length) {
				$box = $('#wpTextbox1'); // Monobook Editing / Oasis Raw Source mode
			}
			text = $box.val();

			// Codes: 200E=Set mode Left-Right, 200F=Set mode Right-Left
			// Other Codes: 200B=Zero-Width Space (for invisible wordbreaks)
			//	FEFF=Unicode byte order mark, also used as Zero-Width NBSP (pointless, AFAICT)
			// Algo: These are "Strong" characters that are used to help the BiDi
			//	algorithm decide text direction; however, they are pointless
			//	unless the character immediately before it is of the opposite
			//	directionality. (An LRM mark for a LR character is pointless)
			//	Contrary to what would make sense, LRM/RLM affects the PREVIOUS
			//	character, not the following one.
			var i, m, li = 0, result = '', regex = /[\uFEFF\u200B\u200E\u200F]/g,
			    // https://www.unicode.org/Public/UNIDATA/extracted/DerivedBidiClass.txt
			    // This regex matches all characters with AL and R BiDi class
			    // JavaScript only supports UCS-2, great... Welcome to implementing UTF-16 manually.
			    // Surrogates Formula: CodePoint - 0x10000, H = 0xD800 + Residue/0x400, L = 0xDC00 + Residue % 0x400 ------------- \U00010800-\U00010FFF ------- \U0001E800     ---    \U0001EDFF ---------- \U0001EE00-\U0001EEFF \U0001EF00-\U0001EFFF
			    rtl = /[\u0600-\u07BF\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF\u0590-\u05FF\u07C0-\u089F\uFB1D-\uFB4F]$|[\uD802\uD803][\uDC00-\uDFFF]|\uD83A[\uDC00-\uDFFF]|\uD83B[\uDC00-\uDDFF]|\uD83B[\uDE00-\uDEFF]|\uD83B[\uDF00-\uDFFF]/
			    ;
			while ((m = regex.exec(text))) {
				i = m.index;

				if (m[0] !== '\u200B' && m[0] !== '\uFEFF') { // Zero-Width Word-break / NBSP
					// Check the character type of the affected character, if the mark is
					// actually accomplishing something then we'll keep it, otherwise
					// we'll throw it away.
					if (rtl.test(text.substring(i - 2, i))) { // The previous character is RTL
						if (m[0] !== '\u200F') ++i; // RLM is redundant, other is fine
					} else { // The next character is LTR
						if (m[0] !== '\u200E') ++i; // LRM is redundant, other is fine
					}
				}

				// Concatenate clean section (substring(1,2) === substr(1,1), one char)
				result += text.substring(li, i);
				li = m.index + 1;
			}
			// Done, concatenate overflow and set
			if (result) $box.val(result + text.substr(li));
		});

		// WARNING: We are playing around if jQuery's undocumented internals
		//	here as it is the simplest way to accomplish what we need (the
		//	'safe' way involves unbinding all event handlers [ick] and replacing
		//	all of them which is dumb). Basically, we are installing our own
		//	event handler then shifting it to the HEAD of the queue instead of
		//	the end which ensures that it will run before all of Wikia's ones.
		//
		// jQuery's events framework is a map of event names to arrays of event
		// handler descriptors (objects). We just get the event array, pop the
		// last one off (the one we just added above) and unshift it on to the
		// front of the array instead of the end.
		var jEvents = $._data($saveform[0], 'events').submit;
		jEvents.unshift(jEvents.pop());

		if (mwcfg.get('debug')) {
		    log('Active');
		}
		jEvents = $saveform = null;
	});
})(jQuery, mediaWiki.config, window.console);