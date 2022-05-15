/*!
 * @fileOverview PortableCSSPad [ Released 7 December 2012 ]
 *
 * Testing / developer tool
 *
 * Creates a tiny pad in which you can write/paste CSS rules.
 *     Similar to Firebug, but better support for raw text and w/ some extra features such as
 *     Beautify, Minify, Adding/removing !important
 *
 * The main script provides a simple API:
 *
 * Pad.init(opt)
 *     the (optional) opt object contains properties left, top, width, height
 *     which are positive integers specifying where to create the pad and how large it should be
 * Pad.open()
 * Pad.close()
 *
 * A separate loader script is required to utilize the API. In this case, the loader script
 * is here in the same file (at the bottom of this page) for performance reasons. The loader script
 * must make sure that jQuery, jQuery UI Resizable and jQuery UI Draggable are installed before
 * attempting to load the main script. The loader should also provide an on/off button for the pad.
 *
 * @author Copyright (c) Jeff Bradford [[User:Mathmagician]]
 */

/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:false, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mediaWiki */

(function ($, mw, window, console) {
	"use strict";

	// private properties
	var options,
		lastSetTimeout,
		$liveStyle,
		$textarea,
		Pad;
		
	var config = mw.config.get([
		'wgUserLanguage',
		'wgPageName',
		'wgServer',
		'wgNamespaceNumber',
		'wgScriptPath'
    ]);
	/**
	 * Private helper function to insert \t into #PortableCSSPad-textarea on keydown
	 * Inserts the given text into a textarea element where the mouse cursor / caret is
	 * https://stackoverflow.com/q/1064089
	 * @param {HTMLTextAreaElement} element A textarea field to insert the text into
	 * @param {String} text The text to be inserted
	 */
	function insertAtCaret(element, text) {
		if (document.selection) {
			// Internet Explorer
			element.focus();
			var sel = document.selection.createRange();
			sel.text = text;
			element.focus();
		} else if (element.selectionStart || element.selectionStart === 0) {
			// Firefox and WebKit-based browsers
			var startPos = element.selectionStart;
			var endPos = element.selectionEnd;
			var scrollTop = element.scrollTop;
			element.value = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length);
			element.focus();
			element.selectionStart = startPos + text.length;
			element.selectionEnd = startPos + text.length;
			element.scrollTop = scrollTop;
		}
	}

	// [private] updates the live style (pass in the css rules as a string parameter)
	function updateStyle(css) {
		if ('string' !== typeof css) {
			css = $textarea.val();
		}
		$liveStyle.text(css);
	}

	// [private] the keyup event of #PortableCSSPad-textarea
	function textareaKeyup() {
		window.clearTimeout(lastSetTimeout);
		lastSetTimeout = window.setTimeout(updateStyle, 500);
	}

	// [private] event to make browser show warning when leaving page while pad is in use
	function windowBeforeUnload(event) {
		if ($textarea.val().length !== 0) {
			return event.returnValue = ''; //jshint ignore:line
		}
	}

	// [private] reveal the pad
	function open() {
		var $container = $('#PortableCSSPad-container'),
			style = $container[0].style,
			left = window.parseInt(style.left),
			top = window.parseInt(style.top),
			$window = $(window),
			windowWidth = $window.width(),
			windowHeight = $window.height();

		$container.removeClass('PortableCSSPad-pad-disabled');
		$window.on('beforeunload', windowBeforeUnload);

		// spawn the pad in the upper-left corner if it's offscreen (necessary precaution)
		if (left > windowWidth || top > windowHeight) {
			$container.css({ left: 0, top: 0 });
		}
	}

	// [private] hides the pad
	function close() {
		$('#PortableCSSPad-container').addClass('PortableCSSPad-pad-disabled');
		$(window).off('beforeunload', windowBeforeUnload);
	}

	// [private] Initializes Portable CSS Pad when called
	function init(opt) {
		// setup default options
		options = $.extend({
			width: 400,
			height: 250,
			left: 0,
			top: 0,
			stylesheetURL: '/load.php?mode=articles&articles=u:dev:MediaWiki:PortableCSSPad/stylesheet.css&only=styles',
			prettyDiffURL: 'https://mathmagician.fandom.com/load.php?mode=articles&articles=MediaWiki:Prettydiff.js&only=scripts'
		}, opt);

		// insert prettydiff, stylesheet and live-style tag into the document
		$('#PortableCSSPad-pretty-diff-script, #PortableCSSPad-stylesheet, #PortableCSSPad-live-style').remove();
		$(document.head).append('<script id="PortableCSSPad-pretty-diff-script" type="text/javascript" src="' + options.prettyDiffURL + '"></script><link rel="stylesheet" type="text/css" href="' + options.stylesheetURL + '" /><style id="PortableCSSPad-live-style" type="text/css"></style>');

		// HTML base for the whole pad
		var padHTML = '<div id="PortableCSSPad-container" class="PortableCSSPad-pad-disabled"><div id="PortableCSSPad-menu"><a id="PortableCSSPad-title" title="w:c:dev:PortableCSSPad" href="https://dev.fandom.com/wiki/PortableCSSPad">PortableCSSPad</a><div id="PortableCSSPad-buttons"><div id="PortableCSSPad-important-button" class="PortableCSSPad-button" title="Adds !important to all CSS properties"></div><div id="PortableCSSPad-unimportant-button" class="PortableCSSPad-button" title="Removes !important from all CSS properties"></div><div id="PortableCSSPad-beautify-button" class="PortableCSSPad-button" title="Beautifies (nicely formats) all CSS in the textarea"></div><div id="PortableCSSPad-minify-button" class="PortableCSSPad-button" title="Minifies (removes comments and whitespace) CSS to reduce file size"></div><div class="PortableCSSPad-vertical-bar"></div><div id="PortableCSSPad-validate-button" class="PortableCSSPad-button" title="Opens the W3C CSS3 validation service in a new tab, you can copy/paste the contents of the textarea into the new tab to validate the CSS"></div><div class="PortableCSSPad-vertical-bar"></div><div id="PortableCSSPad-onoff-button" class="PortableCSSPad-button" title="Toggles the live-update feature on and off. While off, CSS rules in the pad are ignored"></div><div id="PortableCSSPad-close-button" class="PortableCSSPad-button" title="Closes the pad"></div></div></div><textarea id="PortableCSSPad-textarea" placeholder="Type or copy/paste CSS into this box to test it out on this page"></textarea></div>';

		// insert HTML base into document
		$('#PortableCSSPad-container').remove();
		$(document.body).after(padHTML);

		// initialize private properties
		$liveStyle = $('#PortableCSSPad-live-style');
		$textarea = $('#PortableCSSPad-textarea');

		// set up draggable widget, resizable widget, default style for container
		// requires draggable and resizable from jQuery UI, will log error if not available
		var containerStyle, $container;
		try {
			$container = $('#PortableCSSPad-container');

			$container
			.draggable({
				containment: 'window',
				scroll: false,
				stop: function () {
					containerStyle = this.style;
					containerStyle = {
						left: containerStyle.left,
						top: containerStyle.top
					};
				}
			})
			.resizable({
				containment: 'parent',
				minWidth: 400,  // strongly desired this matches value in stylesheet
				minHeight: 250, // strongly desired this matches value in stylesheet
				handles: 'se',
				alsoResize: '#PortableCSSPad-textarea',
				start: function () {
					// patch bug where pad randomly teleports during/after resizing
					$(document.head).append('<style id="PortableCSSPad-teleportbugfix">#PortableCSSPad-container{left:' + containerStyle.left + ' !important;top:' + containerStyle.top + ' !important}</style>');
				},
				stop: function () {
					// patch bug where pad randomly teleports during/after resizing
					$('#PortableCSSPad-teleportbugfix').remove();
					$(this).css(containerStyle);

					// if textarea is bigger than container, make it fit inside the container
					// patches a minor resize bug when trying to resize the container outside of the window
					if ($textarea.width() + 30 > $container.width()) {
						$textarea.css('width', $container.width() - 30 + 'px');
					}
					if ($textarea.height() + 60 > $container.height()) {
						$textarea.css('height', $container.height() - 60 + 'px');
					}
				}
			})
			.attr('style', 'position: fixed; left: ' + options.left + 'px; top: ' + options.top + 'px; width: ' + options.width + 'px; height: ' + options.height + 'px;');

			containerStyle = $container[0].style;
			containerStyle = {
				left: containerStyle.left,
				top: containerStyle.top
			};
		} catch (e) {
			if (typeof console.error === 'function') {
				console.error(e, ' -- please make sure jQuery UI resizable and draggable are installed');
			}
		}

		// textarea keydown: insert \t character when pressing tab instead of switching focus
		// textarea keyup:   apply style changes when the textarea contents change
		$textarea
		.keydown(function (event) {
			if (9 === event.which) {
				insertAtCaret(this, '\t');
				return false;
			}
		})
		.on('keyup', textareaKeyup);

		// beautify event
		$('#PortableCSSPad-beautify-button').click(function () {
			var text = $textarea.val();

			if (text.length !== 0) {
				var prettyDiffSettings = {
					comments: "indent",
					content: false,
					context: "",
					csvchar: ",",
					diff: "",
					difflabel: "base",
					diffview: "sidebyside",
					force_indent: false,
					html: false,
					inchar: "\t",
					indent: "",
					insize: 1,
					lang: "css",
					mode: "beautify",
					quote: false,
					semicolon: false,
					source: text,
					sourcelabel: "base",
					style: "indent",
					topcoms: false
				};

				var css = window.prettydiff(prettyDiffSettings)[0];

				// fix prettydiff's "opacity: 0px" bug
				css = css.replace(/ 0px/g, ' 0').replace(/:0px/g, ': 0');

				$textarea.val(css);
			}
		});

		// minify event
		$('#PortableCSSPad-minify-button').click(function () {
			var text = $textarea.val();

			if (text.length !== 0) {
				var prettyDiffSettings = {
					comments: "indent",
					content: false,
					context: "",
					csvchar: ",",
					diff: "",
					difflabel: "base",
					diffview: "sidebyside",
					force_indent: false,
					html: false,
					inchar: "\t",
					indent: "",
					insize: 1,
					lang: "css",
					mode: "minify",
					quote: false,
					semicolon: false,
					source: text,
					sourcelabel: "base",
					style: "indent",
					topcoms: false
				};

				var css = window.prettydiff(prettyDiffSettings)[0];

				$textarea.val(css);
			}
		});

		// important event
		$('#PortableCSSPad-important-button').click(function () {
			var text = $textarea.val();

			if (text.length !== 0) {
				// remove all !importants
				text = text.replace(/[\s]*(!important)+/g, '');
				// add !important to any word boundary which is followed by ; or }
				text = text.replace(/\b(?=[\s]*(;|\}))/g, ' !important');
				$textarea.val(text);
				updateStyle(text);
			}
		});

		// unimportant event
		$('#PortableCSSPad-unimportant-button').click(function () {
			var text = $textarea.val();

			if (text.length !== 0) {
				// remove all !importants
				text = text.replace(/[\s]*(!important)+/g, '');
				$textarea.val(text);
				updateStyle(text);
			}
		});

		// validate event
		$('#PortableCSSPad-validate-button').click(function () {
			window.open('https://jigsaw.w3.org/css-validator/validator?text=' + window.encodeURIComponent($liveStyle.text()) + '&profile=css3&usermedium=all&warning=1&vextwarning=&lang=' + config.wgUserLanguage);
		});

		// on & off events
		$('#PortableCSSPad-onoff-button').click(function () {
			var $this = $(this);

			if ($this.hasClass('PortableCSSPad-onoff-button-state-off')) {
				$this.removeClass('PortableCSSPad-onoff-button-state-off');
				$textarea.on('keyup', textareaKeyup);
				updateStyle();
			} else {
				$this.addClass('PortableCSSPad-onoff-button-state-off');
				$textarea.off('keyup', textareaKeyup);
				updateStyle('');
			}
		});

		// close event
		$('#PortableCSSPad-close-button').click(Pad.close);
	}

	// [private] Pad object
	Pad = {
		open: open,
		close: close,
		init: init
	};



	/**
	 * PortableCSSPad loader, specific to fandom.com and wikia.org wikis
	 */
	$(function ($) {
		var $link = $('<a id="PortableCSSPad-wikialoader-link" style="cursor: pointer;">PortableCSSPad</a>'),
			$listItem = $('<li></li>').append($link);

		$('#PortableCSSPad-wikialoader-link').parent().remove();

			// add link to toolbar
			$('#WikiaBar .toolbar .tools').append($listItem);

		// attach init handler to $link
		$link = $('#PortableCSSPad-wikialoader-link');
		$link.one('click', function (event) {
			event.stopPropagation();

			var is137Wiki = mw.config.get('wgVersion') !== '1.33.3';
			// install draggable and resizable from MediaWiki's version of jQuery UI
			mw.loader.using(is137Wiki ? ['jquery.ui'] : ['jquery.ui.draggable', 'jquery.ui.resizable'], function () {
				var $window = $(window);

				// initialize the pad
				Pad.init({
					left: (($window.width() / 2) - 200) | 0, // ORing with 0 is same as Math.floor
					top: (($window.height() / 2) - 125) | 0
				});

				// open or close the pad when clicking $link
				$link.click(function (event) {
					event.stopPropagation();
					Pad.open();
				});

				// open pad
				Pad.open();
			});
		});
	});



	// Validation button for CSS articles (this is mostly separate from PortableCSSPad architecturally,
	// it's more of a small related feature that is hard to justify being a standalone script)
	if (/\.css$/.test(config.wgPageName) && config.wgNamespaceNumber % 2 === 0) {
		$(function () {
			var stylesheetURL = config.wgServer + config.wgScriptPath + '?title=' + config.wgPageName + '&action=raw&ctype=text/css&maxage=0&smaxage=0';
			var validatorURL = 'https://jigsaw.w3.org/css-validator/validator?uri=' + window.encodeURIComponent(stylesheetURL) + '&profile=css3&usermedium=all&warning=1&vextwarning=&lang=' + config.wgUserLanguage;
			var $button = $('<li>').append(
				$('<a>').text('Validate CSS').attr({
					href: validatorURL,
					id: 'w3-validator-button',
					target: '_blank',
					title: 'Validate this stylesheet with the W3C validation service'
				})
			);

			$('.page-header__contribution-buttons .wds-list').append($button);
		});
	}
}(jQuery, mediaWiki, window, window.console));