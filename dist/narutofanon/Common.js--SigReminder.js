// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true curly:false bitwise:false laxbreak:true laxcomma:true smarttabs:true */
/*global mediaWiki confirm */

// Non-standard feature that should exist but doesn't
if (!RegExp.escape) (function(RegExp) {
	"use strict";
	var r = /[\.\?\*\+\[\]\(\)\{\}\\\-\|\^\$]/g;
	RegExp.escape = function(str) {
		return (str + '').replace(r, '\\$&');
	};
})(RegExp);


// Only run if enabled, or not set
if (window.SignatureCheckJS || window.SignatureCheckJS === void 0)
(function(window, $, mw, config) {
	"use strict";
	var haveForum = false, sectionEdit, sectionNum;

	// Edit pages only (WARN: Message Walls will pass this test!)
	if (({edit:1, editredlink:1, submit:1})[mw.config.get('wgAction')] !== 1) return;

	// Forum and talk pages only
	// Odd namespaces are talk pages, even ones are not [standard]
	// Wikia's ones aren't standard so need to be handled separately
	var namespace = mw.config.get('wgNamespaceNumber');
	if ((namespace & 1) !== 1) {
		if (namespace !== mw.config.get('wgNamespaceIds').forum) return;
		haveForum = true;
	}

	// Watch out for Message Walls and other weirdness (Blogs and such)
	if (namespace >= 200) return;

	// Don't do anything for undo actions
	if ((/(?:^\?|&)undo=/).test(window.location.search)) return;

	// Look for a section edit since we don't want to prompt for the forumheader when editing any section
	// Other than zero. MediaWiki behaviours:
	// * garbage = Section 0
	// * leading number + garbage = new section
	// * "new" = New section
	// * number = Section X
	sectionEdit = (/(?:^\?|&)section=([^&]+)(?:&|$)/).exec(window.location.search);
	sectionNum = sectionEdit && +sectionEdit[1];
	if (sectionEdit) {
		if (sectionNum !== sectionNum) { // Not-a-Number
			// Check for a leading number or the "new" magic word
			sectionNum = ((/^(?:\d|new$)/).test(sectionEdit[1]) ? 'new' : 0);
		}
	}

	// We're going to run, so we need to process the configuration and go
	var log = (window.console && function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('SIGNATURECHECK:');
		return window.console.log.apply(window.console, args);
	}) || $.noop;

	config = $.extend({
		// Parts of the confirm prompt
		preamble: 'There are a few potential problems with your edit:\n\n',
		epilogue: '\nAre you sure you want to post this anyway?\n[Violating policy may incur a warning]',
		noForumheader: '!! There is no forum header on this forum page. You should not create forum pages without the header since they will not actually show up in the forum list.\n',
		noSignature: '?? It looks like you forgot to sign your reply. Use ~~~~ to sign.\n',

		// Other stuff
		forumheader: 'Forumheader', // Can be falsy to disable
		checkSignature: true
	}, config);
	if (typeof(config.forumheader) !== 'string' && config.forumheader) {
		config.forumheader = false;
		log('Forumheader is not a string');
	}

	// Need the first char to accept both upper and lowercase variants
	function escapeWikiTitleForRegex(str) {
		str += '';
		// WARN: Only works on BMP. UTF-16 surrogates will choke
		var u = str.charAt(0).toUpperCase(), l = u.toLowerCase();
		// Special characters are ASCII symbols so we don't need to escape these
		if (u !== l) {
			u = '[' + u + l + ']';
			str = str.substr(1);
		} else {
			u = '';
		}
		return u + RegExp.escape(str);
	}

	// We need to wait for the onDOMReady before proceeding now (Monobook)
	// Or for the WikiaEditor to fully initialise (Oasis)
	var start;
	if (({wikia:1, oasis:1})[mw.config.get('skin')] === 1) {
		start = function(f) {
			function callback() {
				// Deregister to avoid uncollectable garbage accumulation
				window.GlobalTriggers.unbind('WikiaEditorReady', callback);

				// Try to find the WikiaEditor instance
				var editor = window.WikiaEditor && window.WikiaEditor.getInstance('wpTextbox1')
				  , getState
				  ;
				// Look for the Visual Editor ([F]CKEditor)
				if (editor && editor.ck) {
					getState = function() {
						var $VE = null, text;
						if (editor.ck.document) { // Visual Editor IFRAME (iframe.contentDocument)
							$VE = $(editor.ck.document.$.body);
							// We need to exclude PRE tags since they don't count for the signature
							// check. This is crazily inefficient but otherwise we'd have to walk the
							// tree manually without jQuery support.
							if ($VE.find('pre').length) {
								text = $VE.clone();
								text.find('pre').remove();
								text = text.text();
							} else {
								text = $VE.text();
							}
						} else if (editor.ck.textarea) { // Source editor maybe?
							text = $(editor.ck.textarea.$).val();
						}

						// Fail safe
						if (text === void 0) {
							log('Failsafe tripped. WikiaEditor is not behaving correctly? This may not work properly.');
							text = $('#wpTextbox1').val();
						}

						return { $VE: $VE, text: text };
					};
				} else {
					log('Cannot connect to WikiaEditor. Will try standard MediaWiki instead.');
					getState = function() { return { $VE: null, text: $('#wpTextbox1').val() }; };
				}

				// Done
				try {
					f(getState);
				} catch(e) {
					log('Internal Crash:', e, e.stack);
				}
			}
			window.GlobalTriggers.bind('WikiaEditorReady', callback);
		};
	} else {
		start = function(f) {
			$(function($) {
				try {
					// Monobook uses normal MediaWiki form
					return f(function() { return { $VE: null, text: $('#wpTextbox1').val() }; });
				} catch(e) {
					log('Internal Crash:', e, e.stack);
				}
			});
		};
	}

	// DOM Ready / Editor Ready
	start(function(getState) {
		// Install handler on the form submit. This is the most reliable way to do this since
		// everything needs to go through the form submit but NOT everything needs to go
		// through the save button.
		var $form = $('#wpSave').closest('form');
		$form.on('submit.CheckSignature', function(evt) {
			var problems = config.preamble
			  , haveProblems = false
			  ;

			// Remove nowiki and HTML comments from the source code view.
			// NOTE: <nowiki> is XML compatible so can have attributes and trailing whitespace,
			//	we aren't handling attributes since that requires a mini-parser.
			// NOTE: dot operator (.) does not match \n, JS has no multi-line flag.
			var $VE = getState(), text = $VE.text;
			$VE = $VE.$VE;
			if (!$VE) {
				// WARN: MediaWiki supports nested and RECURSIVE comments (<<!---->!--This won't show-->)
				text = text.replace(/<nowiki\s*>(?:.|\n)*?<\/nowiki\s*>|<!--(?:.|\n)*?-->/g, '');
				// Remove implicit PRE tags (a space at line start = implict PRE)
				text = text.replace(/^ .*$/gm, ''); // m is multiline mode for ^/$
			}

			// Check for a forumheader template
			if (haveForum && (!sectionEdit || sectionNum === 0) && typeof(config.forumheader) === 'string' && config.forumheader) {
				var headerMissing = false;
				// Text editor is easy, although not accurate (real parser is needed to be accurate
				// but that is impractical since MediaWiki has a terrible context-sensitive grammar.
				// [See Parsoid project])
				if (!$VE) {
					headerMissing = !(new RegExp(
						  '\\{\\{\\s*'
						+ escapeWikiTitleForRegex(config.forumheader)
						+ '\\s*\\|(?:.|\\n)*?\\}\\}'
					).test(text));
				} else {
					// HTML inspection. We need to walk all template placeholders (puzzle icons) and look
					// for the header template. This is more accurate than the regex but a bigger pain.
					var scannerRegex = new RegExp('^' + escapeWikiTitleForRegex(config.forumheader) + '$');
					headerMissing = $VE.find('.placeholder.placeholder-double-brackets').filter(function() {
						// Trick is a data-rte-meta attribute holding an URL encoded JSON block
						// The JSON block has type, lineStart, title and wikitext fields.
						// Title (for type === 'double-brackets') will be the template name.
						return scannerRegex.test(
							JSON.parse(
								window.decodeURIComponent(
									this.getAttribute('data-rte-meta')
								)
							).title
						);
					}).length === 0;
				}
				if (headerMissing) {
					problems += config.noForumheader;
					haveProblems = true;
				}
			}

			// If it's not signed then we have a problem (unless it's a minor edit)
			if (config.checkSignature && !$form.find('#wpMinoredit').prop('checked') && text.indexOf('~~~') === -1) {
				problems += config.noSignature;
				haveProblems = true;
			}

			// Something inappropriate?
			if (haveProblems) {
				problems += config.epilogue;
				if (!confirm(problems)) {
					// Prevent the form from submitting AND prevent Wikia's AJAX code from submitting it anyway
					evt.preventDefault();
					evt.stopImmediatePropagation();
				}
			}
		});

		// Event handler must run first to avoid Wikia's AJAX from POSTing immediately
		// [This is not officially permitted so needs to be checked whenever jQuery is updated]
		var events = $._data($form[0], 'events').submit;
		events.unshift(events.pop());
		events = null;
	});
})(window, jQuery, mediaWiki, window.SignatureCheckJS);

// </syntaxhighlight>