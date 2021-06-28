/*
 * smartLinking.js
 * Ver. 2014-05-02
 *
 * A tool for linking articles and previewing the linked pages
 * while source-editing Wikipedia/MediaWiki articles.
 *
 * Home: http://en.wikipedia.org/wiki/User:V111P/js/Smart_Linking
 *
 * requires: msgDisplay.js and wikiParserV.js,
 * both of which are auto loaded from this script and can also be
 * found here: http://en.wikipedia.org/wiki/User:V111P/js
 *
 * CC0 Public Domain Dedication:
 * http://creativecommons.org/publicdomain/zero/1.0/
 * If you use large parts of this code, please let me know.
 * You should also let others know where the code originates:
 * http://en.wikipedia.org/wiki/User:V111P/js/smartLinking.js
 * Thanks.
 */

window.smartLinking = (function ($) {
	"use strict";

	var articleNamesCapitalized = true; // always true for Wikipedia, but not for Wiktionary
	var whitelistedTags = 'sup, sub, i, b, br, em, strong, tt, kbd'; // del, ins, u, mark, s, strike
	var maxAgeSeconds = {
		forArticles: 5, sForArticles: 1,
		forOtherMeanings: 300, sForOtherMeanings: 60
	};
	var allPossibleOtherMeaningTemplates = false; // for testing - for checking for other templates
	var linkFocusTimeoutId; // used in the function focusFn
	var msgs = {
		scriptName: 'Smart Linking',
		noValidLink: 'No valid link was selected or focused.',
		error: 'Error',
		help: 'Help',
		openInNewWin: 'Open in a new window',
		editInNewWin: 'Edit in a new window',
		editIntro: 'Edit the introduction',
		history: 'History',
		talk: 'Talk',
		watch: 'Watch',
		unwatch: 'Unwatch',
		disambigPage: 'Disambiguation page',
		nonExistingPage: 'Non-existing page',
		errorLoadingScript: 'Error loading required script {required script}.',
		backTo: 'Back to [[%1]]', // Back to [[<the previous page's title>]]
		relatedArticles: 'Related articles',
		tableOfContents: 'Table of contents',
		tocAndOtherAndMainArticles: 'ToC and other meanings and main articles:',
		backToTop: 'Back to top',
		focusTextarea: 'Focus the textarea', // title attr of the button that collapses the display
		close: 'Close',
		toggleSectionLinks: 'Toggle displaying the section links',
		aSpecialNSLink: 'A link to a page in the Special namespace.',
		aLinkToSecInCurrEdPg: 'A link to a section in the page you are currently editing.',
		errorOnLoading: 'Could not load page. Check your Internet connection.',
		unsupportedBrowser: 'Unsupported browser'
	};

	var locale = {
		helpUrl: '//en.wikipedia.org/wiki/User:V111P/js/Smart_Linking',
		// en.wikipedia.org/wiki/Category:Disambiguation_and_redirection_templates
		otherMeaningTemplateNames: ['about', 'hatnote', 'rellink', 'other uses(\\d| of)?',
			'(two|three) other uses', 'see', 'see also\\d?', 'also', 'main( list)?', 'details\\d',
			'for\\d?', 'redirect(-synonym|text|-distinguish)?\\d?\\d?', 'further\\d?',
			'consider disambiguation', 'other people\\d?', 'other places\\d?', 'other hurricanes',
			'other ships', 'distinguish\\d?', 'elect',
			'year dab', 'more information'],
		// not needed if disambig pages/templates have the __DISAMBIG__ magic word:
		// disambigTemplateNames: ['dab', 'disamb(ig)?'],
		disambigPgSuffix: ' (disambiguation)', // used to give link to that page
			// in case other-meanings template is used on page
		anchorTemplateNames: ['anchor']
	};

	var requiredScripts = [{
			objLocation: mediaWiki.libs,
			objName: 'msgDisplay', // [[User:V111P/js/msgDisplay.js]]
			url: '//en.wikipedia.org/w/index.php?title='
				+ 'User:V111P/js/msgDisplay.js&action=raw'
				+ '&ctype=text/javascript&smaxage=3600&maxage=3600'
		}, {
			objLocation: mediaWiki.libs,
			objName: 'wikiParserV', // [[User:V111P/js/wikiParserV.js]]
			url: '//en.wikipedia.org/w/index.php?title='
				+ 'User:V111P/js/wikiParserV.js&action=raw'
				+ '&ctype=text/javascript&smaxage=3600&maxage=3600'
	}];
	
	var commonsUrl = '//upload.wikimedia.org/wikipedia/commons/';
	var buttonIconUrl = commonsUrl + '9/96/Interpage_icon.png';
	var buttonIconUrlClassic = commonsUrl + '5/5a/Interpage_button.png';
	var imageProps = { // text messages updated in init()
		attentionImg: {
			src: commonsUrl + 'thumb/b/ba/Symbol_opinion_vote.svg/30px-Symbol_opinion_vote.svg.png',
			alt: '!',
			width: 15,
			height: 15,
			css: {width: '1.2em', height: '1.2em'}
		},
		editImg: {
			src: commonsUrl + '3/31/WG.Icon.edit.png',
			width: 13,
			height: 13,
			css: {width: '1em', height: '1em'}
		},
		anchorImg: { // not currently used
			src: commonsUrl + 'thumb/6/62/Anchor_pictogram.svg/26px-Anchor_pictogram.svg.png',
			width: 12,
			height: 12,
			alt: '@',
			css: {width: '1em', height: '1em'}
		},
		newWinImg: {
			src: commonsUrl
				+ '/thumb/c/c1/Inkscape_icons_window_new.svg/26px-Inkscape_icons_window_new.svg.png',
			width: 12,
			height: 12,
			alt: 'new window',
			css: {width: '1em', height: '1em'}
		},
		externalLinkImg: { // not currently used
			src: commonsUrl + 'thumb/4/44/Icon_External_Link.svg/26px-Icon_External_Link.svg.png',
			width: 12,
			height: 12,
			css: {width: '1em', height: '1em'}
		},
		relatedImg: {
			src: commonsUrl + '7/72/OSM_relation.png',
			width: 12,
			height: 12,
			css: {width: '1em', height: '1em'}
		},
		tocImg: {
			src: commonsUrl + 'f/f7/Plan.png',
			width: 12,
			height: 12,
			css: {width: '1em', height: '1em'}
		},
		upImg: {
			src: commonsUrl + '5/56/Icon_Arrow_Up_26x26.png',
			width: 12,
			height: 12,
			css: {width: '1em', height: '1em'}
		},
		okImg: {
			src: commonsUrl + 'thumb/a/ac/Approve_icon.svg/26px-Approve_icon.svg.png',
			width: 12,
			height: 12,
			alt: '[_]',
			css: {width: '1em', height: '1em'}
		}
	};

	var images = {}; // set in setup() and init()

	var toolbarButton = {
		id: 'smartLinkingButton',
		tooltip: msgs.scriptName, // text messages updated in init()
		section: 'main',
		group: 'insert',
		callback: smartLinkingFn,
		iconUrl: buttonIconUrl // updated in init()
	};

	var miscStyle = {
		noDataReceivedLinkColor: '#900', // the link at the beginning that opens the article in a new window
		visitedPgLinkColor: '#9370db',
		notExistingPgLinkColor: '#f08080',
		normalPgLinkColor: 'blue'
	};

	var re = {
		// en:Wikipedia:Page_name#Invalid_page_names :
		// ASCII 0–31 (dec), the del char 127, the Unicode replacement character U+FFFD
		wikiLinkIllegalChars: /[\[\]{}<>|\u0000-\u001f\u007f\ufffd]/,
		// "." or "..", or beginning "./" or "../", or containing "/./" or "/../" or "[[User:V111P|V111P]] ([[User talk:V111P|talk]])",
		// or ending "/." or "/..", or exceeding 255 bytes in length (at least for ANSI names)
		wikiLinkIllegalNames:
			/^(\.\.?\/|\s|_|.{256,})|^(\.\.?|:)$|(\/\.\.?\/|[[User:V111P|V111P]] ([[User talk:V111P|talk]]))|(\s|\_|\/\.\.?)$/,
		trimBracketsG: /^\[\[|]]$/g,
		addrSectionPart: /#.*/, // includes the #   // re.addrTitlePart = /(?:(?!#).)*/;
		titleDisabigPart: /\s\([^)]+\)$/,
		redirect: /^(#[^\[]{1,25}\[\[)([^|\]]+)(\|.*|\]\][\S\s]*)/,
		textBeforeFirstBullet: /\n\*[\S\s]*/,
		oneOrMoreEmptyLinesG: /([^\S\n]*\n){2,}/g,
		divideSectionHeading: /^(=+)([\S\s]+)\1$/,
		otherMeaningNoTemplG: /(^|=|})([^\S\n]*\n)+:[^\n]+\n/g,
		otherMeaningNoTemplTrimG: /(^|\n):\s*('')?|('')?\s*$/g,
		wikiLinkAddrAndLabelG: /\[\[([^\]|]+)\|?([^\]]*)]]/g, // linkifyText
		wikiLinkAddr: /^\[\[([^|\]]*)/, // insertLink()
		linkAddrsIn$1G: /\[\[([^|\]]+)\|[^\]]*\]\]/g,
		wikiLinkRemoveOpeningBracketsAndUpToAndInclPipe: /^\[\[(.+?\|)?/, // insertLink(),
		possibleOtherMeaningTemplatesG: /^\{\{[^}|\n]+\|[^}\n]+}}[^\S\n]*$/gm,
		splitTemplateParamsG: /(?:[^|[{}]|\[[^\]]*]|\{\{[^}]*}}|\{[^{]|}[^}])+|(?=\|\|)/g,
		pipeTemplateToEndOfParam: /{{!}}[^|}]+/,
		nAsteriskG: /\n\*/g, nHashSymbolG: /\n#/g, nSemicolonG: /\n;/g, nColonG: /\n:/g, nG: /\n/g
	};

	// time to wait for a required script to load before error msg:
	var moduleLoadingTimeout = 15000;
	var wikiParser; // = wikiParser - loaded in another .js file
	var display; // = msgDisplay - loaded in another .js file
	var visitedPages = {}; // '+' for visited/loaded pages, '' for visited non-existing pages
	var pgHistory = []; // page pgHistory for the << button
	var lastLinkAddr = ''; // last inserted or found addr in the textarea.
	var linkStartPos = -1; // need to save it for IE, and also if user clicks outside of link
		// in the textarea and then wants to continue browsing
	var sectIdPrefix = 'smrtL_section_' + Math.ceil(Math.random() * 9999) + '_'; // not really needed
		// unless in the future two smartLinking windows can exist at the same time on the page
	var textarea;

	// prints a message to the console, and if it's an error message, to the display too
	function prt(msg, isErrorMsg) {
		if (typeof msg != 'object') {
			msg = (isErrorMsg ? msgs.error + ': ' : '') + msg;
			if (isErrorMsg && display) {
				if (images.attention)
					display.append(images.attention.clone().attr('title', msgs.error));
				display.appendTextWrite(' ' + msg);
			}
			msg = msgs.scriptName + ': ' + msg;
		}
		if (isErrorMsg && window.console && console.error)
			console.error(msg);
		else if (window.console && console.log)
			console.log(msg);
	} // prt


	function setup() {
		images.attention = $('<img/>', imageProps.attentionImg);
		images.edit = $('<img/>', imageProps.editImg);
		images.open = $('<img/>', imageProps.newWinImg);
		images.related = $('<img/>', imageProps.relatedImg);
		images.toc = $('<img/>', imageProps.tocImg);
		images.up = $('<img/>', imageProps.upImg);
		images.ok = $('<img/>', imageProps.okImg);

		var c = window.smartLinkingConfig || {};
		$.extend(msgs, c.msgs || {});

		// save the Special namespace names
		locale.specialNsPrefixes = [];
		$.each(mw.config.get('wgNamespaceIds'), function (key, val) {
			if (val == '-1') { // 'special'
				if ($.inArray(key, locale.specialNsPrefixes) == -1)
					locale.specialNsPrefixes.push(key);
			}
		});

		init();
	} // setup


	// public function, to be called after updating the config object
	function init() {
		var c = window.smartLinkingConfig;
		if (c) {
			$.extend(locale, c.locale || {});
			$.extend(msgs, c.msgs || {});

			allPossibleOtherMeaningTemplates = c.allPossibleOtherMeaningTemplates
				|| allPossibleOtherMeaningTemplates;
		}

		if (locale.disambigTemplateNames)
			locale.disambigTemplateNameRegEx
				= new RegExp('\\{\\{\\s*(' + locale.disambigTemplateNames.join('|')
					+ ')\\s*(\\||})', 'i');
		locale.otherMeaningTemplateNamesRegExG
			= new RegExp('\\{\\{\\s*(' + locale.otherMeaningTemplateNames.join('|')
				+ ')\\s*(\\|[^}{]*|([^}{]*\\{\\{[^}]+}}[^}{]*)*)}}', 'gi');
		locale.anchorTemplateRegExG = new RegExp('\\{\\{((?:'
			+ locale.anchorTemplateNames.join('|') + ')\\|[\\S\\s]+?)}}', 'gi');
	} // init


	// get and set the text and selection in the textarea
	function valParts($el, textBefore, selText, textAfter) {
		if (typeof textBefore == 'string') {
			$el.val(textBefore + selText + textAfter);
			var beforeLen = textBefore.length;
			$el.textSelection('setSelection', {
				'start': beforeLen,
				'end': beforeLen + selText.length
			});

			return;
		}
		else {
			var s = $el.textSelection('getCaretPosition', {startAndEnd: true} );
			var text = $el.val().replace(/\r/g, '');

			return [text.slice(0, s[0]), text.slice(s[0], s[1]), text.slice(s[1])];
		}
	}; // valParts


	function correctLinking(justLoadScripts) {

		function allLoaded() {
			// check for regexp support
			if ('<a><bd</e></b>'.replace(/<(?!\/?(a|b)>)/g, '&lt;') != '<a>&lt;bd&lt;/e></b>') {
				correctLinking = function () { prt('** ' + msg.unsupportedBrowser + ' **', true); }
				return;
			}

			textarea = $('#wpTextbox1');
			textarea.off('focus.smartLinking');
			textarea.on('focus.smartLinking', function () {
				display && display.collapse();
			});
			display = display || mediaWiki.libs.msgDisplay('edit');
			display.config(window.smartLinkingConfig);
			correctLinking = correctLinkingNow;
			wikiParser = wikiParser || mediaWiki.libs.wikiParserV;
			if (!justLoadScripts)
				correctLinking();
		}

		function waitToExecute(again) {
			var TimeoutToExecute = 250; // milliseconds
			var notExecuted = null;
			$.each(requiredScripts, function (index, val) {
				if (!val.objLocation[val.objName]) {
					// script not executed yet?
					notExecuted = val.objName;
					return false; // break
				}
			});
			if (notExecuted) {
				if (!again) {
					errorOnLoadingModule(notExecuted);
					return;
				}
				setTimeout(function () {
						waitToExecute(again - 1);
					},
					TimeoutToExecute);
			}
			else
				allLoaded();
		}

		function errorOnLoadingModule(scriptName) {
			var msg = msgs.errorLoadingScript.replace('{required script}', scriptName);
			prt(msg, true);
		}

		function loadNext(n) {
			var callback;
			if (n == requiredScripts.length - 1) {
				callback = waitToExecute;
			}
			else
				callback = function () { loadNext(n + 1); };
			var reqScr = requiredScripts[n];
			if (reqScr.objLocation[reqScr.objName])
				callback(); // this one already loaded
			else {
				$.ajax({
					url: reqScr.url,
					dataType: 'script',
					cache: true,
					success: callback
				});
				setTimeout(function () {
					if (!reqScr.objLocation[reqScr.objName])
						errorOnLoadingModule(reqScr.objName);
				}, moduleLoadingTimeout); // jQuery's fail callback is not called
				//  for cross-domain scripts, so can't use it.
			}
		}

		if (!window.wikEd || !wikEd.useWikEd) {
			// hopefully it was already loaded or will download while downloading the other scripts:
			mw.loader.using('jquery.textSelection');
		}
		else if (wikEd.config && wikEd.config.offHook
				 && typeof wikEd.config.offHook.push == 'function') {
			wikEd.config.offHook.push(function () {
				mw.loader.using('jquery.textSelection');
			});
		}

		if (requiredScripts.length > 0)
			loadNext(0);
		else
			allLoaded();
	} // correctLinking


	// points to correctLinking after the required scripts are loaded
	function correctLinkingNow() {
		if (window.wikEd && wikEd.useWikEd) {
			wikEdCorrectLinking();
			return;
		}
		var before, linkText, after;
		var parts = valParts(textarea);
		var focusLink = wikiParser.focusedSegment(parts, 'wikilink');
		linkStartPos = -1;
		if (focusLink) {
			before = focusLink[0];
			linkText = focusLink[1];
			after = focusLink[2];
			linkStartPos = before.length;
		}
		else {
			linkText = parts[1];
			// if some text was selected and it does not contain illegal chars:
			if (linkText) {
				// separate the beginning and ending spaces
				before = parts[0];
				after = parts[2];
				var spaces = linkText.match(/^\s*/)[0];
				before += spaces;
				linkText = linkText.slice(spaces.length);
				spaces = linkText.match(/\s*$/)[0];
				after = spaces + after;
				(spaces.length > 0) && (linkText = linkText.slice(0, -spaces.length));
				linkText = '[[' + linkText + ']]';
				linkStartPos = before.length;
			}
		}

		focusTextarea();
		var page = linkText.split('|')[0].replace(re.trimBracketsG, ''); // ^\[\[|]]$/g

		if (page && !re.wikiLinkIllegalChars.test(page)
				&& !re.wikiLinkIllegalNames.test(page)) {
			valParts(textarea, before + linkText, '', after);
			var histL = pgHistory.length;
			if (pgHistory[histL - 1] === page)
				pgHistory.length = histL - 1;
			else
				pgHistory = []; // clear the back button pgHistory
			lastLinkAddr = page;
			loadAndDisplay(page);
			linkStartPos = before.length;
		}
		else
			noValidLinkError();
	} // correctLinkingNow


	function noValidLinkError() {
		clearDisplay();
		display.append(images.attention.attr('title', msgs.noValidLink))
		.appendText(' ' + msgs.noValidLink).write();
	}


	function wikEdCorrectLinking() {
		var sel = wikEd.frameWindow.getSelection().getRangeAt(0).toString();
		var before = sel.match(/^\s*/)[0];
		var after = sel.match(/\s*$/)[0];
		var hasTextAfterTheBar = false;
		var page = sel = $.trim(sel);
		var hasBracketsBefore = /^\[\[/.test(sel);
		var hasBracketsAfter = /\]\]$/.test(sel);
		if (hasBracketsBefore && hasBracketsAfter) {
			sel = sel.slice(2, -2);
			before += '[[';
			after = ']]' + after;
			var barLen = (sel.match(/\|.*/) || [''])[0].length;
			page = (barLen > 0) ? sel.slice(0, -barLen) : sel;
		}

		if (page && !re.wikiLinkIllegalChars.test(page)
			&& !re.wikiLinkIllegalNames.test(page))
		{
			//if (!hasBracketsBefore)
			//	wikEd.FrameExecCommand('inserthtml',
			//		before + '[[' + page + ']]' + after);
			var histL = pgHistory.length;
			if (pgHistory[histL - 1] === page)
				pgHistory.length = histL - 1;
			else
				pgHistory = []; // clear the back button pgHistory
			lastLinkAddr = page;
			loadAndDisplay(page);

			wikEd.frameWindow.focus();
		}
		else
			noValidLinkError();

		wikEd.frameWindow.focus();
	} // wikEdCorrectLinking


	function clearDisplay() {
		display.show().keypress(keyPressed).helpUrl(locale.helpUrl)
		.onCloseOnUserAction(function () {
			textarea.off('focus.smartLinking');
		});
	}


	function loadAndDisplay(articleTitle, noRedir) {
		// is it a link to a section in the currently displayed page?
		if (articleTitle.charAt(0) == '#') {
			clearDisplay();
			addBackLink();
			display.appendTextWrite(articleTitle + ' - ' + msgs.aLinkToSecInCurrEdPg);
			return;
		}

		// is it a link to a special page?
		var pgNs = articleTitle.split(':')[0];
		if (pgNs != articleTitle && $.inArray(pgNs.toLowerCase(), locale.specialNsPrefixes) > -1) {
			clearDisplay();
			addBackLink();
			display.appendTextWrite(articleTitle + ' - ' + msgs.aSpecialNSLink);
			return;
		}

		$.ajax({
			url: '/w/api.php?action=query&prop=revisions|pageprops&rvprop=content'
				+ '&ppprop=disambiguation&format=json&smaxage=' + maxAgeSeconds.sForArticles
				+ '&maxage=' + maxAgeSeconds.forArticles
				+ '&titles=' + encodeURIComponent(articleTitle),
			dataType: 'json',
			success: function (result) {
				receiveArticle(result, articleTitle, noRedir);
			},
			error: function () {
				clearDisplay();
				prt(msgs.errorOnLoading, true);
			}
		});
	} // loadAndDisplay


	function receiveArticle(result, articleTitle, noRedir) {
		var data, isDisambig;

		var section = (articleTitle.match(re.addrSectionPart) || [''])[0]; // #.*
		var norm = result.query.normalized;
		if (norm &&  norm[0].from == articleTitle)
			articleTitle = norm[0].to + section;
		var pageN, p, pages = result.query.pages;
		if (typeof pages == 'undefined') {
			clearDisplay();
			addBackLink();
			return;
		}
		else if (pages[-1]) {
			data = '';
		}
		else {
			for (p in pages)
				(pages.hasOwnProperty(p)) && (pageN = p);

			var page = pages[pageN];
			var data = page.revisions[0]['*'];
			isDisambig = page.pageprops && page.pageprops.disambiguation === '';
		}

		processAndDisplayArticle(data, articleTitle, noRedir, isDisambig);
	} // receiveArticle


	function addBackLink(currArticleTitle) {
		var histL = pgHistory.length;
		if (histL == 0)
			return;
		var prevArticleTitle = pgHistory[histL - 1];
		if (typeof currArticleTitle != 'undefined'
			&& prevArticleTitle === currArticleTitle) {
			if (histL == 1)
				return;
			else
				prevArticleTitle = pgHistory[histL - 2];
		}

		var bkLinkTitle = msgs.backTo.replace(/%1/, prevArticleTitle);
		var bkLink = $('<a/>', {
			text: '<<',
			href: '#   ' + bkLinkTitle,
			tabindex: 0,
			css: {cursor: 'pointer'},
			title: bkLinkTitle,
			click: function (e) {
				e.preventDefault();
				// if curr pg is not in arr, prev pg is removed, but it will be re-added
				pgHistory.length = histL - 1;
				insertLink(prevArticleTitle);
				loadAndDisplay(prevArticleTitle, true);
			},
			keypress: keyPressed
		});
		display.appendText('(')
		.append(bkLink)
		.appendText(') ')
		.write();
		display.focus(bkLink);
	} // addBackLink


	function processAndDisplayArticle(data, articleTitle, noRedir, isDisambigPg) {
		var maxTextLength = 2000;
		var formatUrl = wikiParser.formatUrl;
		var fullText = true; // whether to show the whole article or only maxTextLength chars of it
		var otherMeaningTemplates = [];
		var otherMeaningPages = [];
		var articleUrl; //  = formatUrl(articleTitle);
		var disambigLinks;
		var redir; // is the page a redirect?
		var section; // the part after # in articleTitle
		var sectionHeadingIdsNoPrefix = [];
		var sections = [];
		var noData = (data.length == 0); // article does not exist
		var $topMenu; // the menu span with the buttons after the article title at the beginning

		function shorten(text, proportionOfMax) {
			var origText = text;
			text = text.slice(0, maxTextLength * (proportionOfMax || 1));
			var lastLinkStart = text.lastIndexOf('[[');
			if (lastLinkStart > text.lastIndexOf(']]'))
				text = text.slice(0, lastLinkStart);
			var lastSpace = text.lastIndexOf(' ');
			if (text.length < origText.length && lastSpace > text.length - 20)
				text = text.slice(0, lastSpace);
			(text.length < origText.length) && (text = text + ' ...');
			return text;
		} // shorten


		function addTocAndOtherMeaningLinks(otherMeaningTemplates, sectionHeadingIds, articleTitle) {
			var sectionHeadingsNum = sectionHeadingIds.length;
			var $mainDiv = $('<div/>', {'class': 'smrtL_tocAndOtherDiv'});
			var $div1;
			var $div = $div1 = $('<div/>');
			$mainDiv.append('<br/><br/>')
			.append($('<span/>', {
				text: msgs.tocAndOtherAndMainArticles,
				css: {color: '#050', fontWeight: 'bold', textDecoration: 'underline'}
			}));

			// back-to-top button
			$mainDiv.append($('<a/>', {
				href: '#   ' + msgs.backToTop,
				'class': 'smrtL_tocHeadingLink',
				title: msgs.backToTop,
				css: {margin: '0 2px'},
				click: function (e) {
					e.preventDefault();
					var target = display.find('.smrtL_topTocLink');
					if (target.length == 0)
						target = display.find('.smrtL_otherAndMainArticlesLink');
					display.scrollTo(target, true);
				},
				keypress: keyPressed
			})
			.append(images.up));

			// show/hide the section links button
			if (sectionHeadingIds.length > 0) {
				$mainDiv.append($('<a/>', {
					href: '#   ' + msgs.toggleSectionLinks,
					title: msgs.toggleSectionLinks,
					css: {margin: '0 2px'},
					click: function (e) {
						e.preventDefault();
						$('.smrtL_tocAndOtherDiv div.smrtL_tocLinkDiv').toggle();
						display.scrollTo('.smrtL_tocHeadingLink', false);
					},
					keypress: keyPressed
				})
				.append(images.toc.clone()));
			}

			$mainDiv.append('<br/>');

			var text = function (str) { return document.createTextNode(str); }
			var pgsArr = [];
			var $div_;
			var $span;
			for (var j = 0; j < otherMeaningTemplates.length; j++) {
				if (otherMeaningTemplates[j] == '----') {
					$div_ = $div;
					$div = $('<div/>', {css: {'background-color': 'gray'}});
					continue;
				}
				if (otherMeaningTemplates[j] == '----/') {
					$div_.append($div);
					$div = $div_;
					continue;
				}
				if (otherMeaningTemplates[j].charAt(0) == '=') {
					var tocLinkId = sectionHeadingIds.shift();
					$div.append('<div class="smrtL_tocLinkDiv">'
						+ '<a href="#" id="' + sectIdPrefix + tocLinkId
						+ 'Link" class="smrtL_tocLink smrtL_' + tocLinkId + 'Link" '
						+ 'style="color:green; font-weight:bold;">'
						+ otherMeaningTemplates[j] + '</a></div>');
					continue;
				}

				var spl = otherMeaningTemplates[j].slice(2, -2)
					.match(re.splitTemplateParamsG); // split on |, except within links & templates:
				    // (?:[^|[{}]|\[[^\]]*]|\{\{[^}]*}}|\{[^{]|}[^}])+|(?=\|\|)/g

				$span = $('<span/>', {'class': 'smrtL_otherMeaningOrMainTempl'});
				$span.append(text('{{' + spl[0]));
				for (var k = 1; k < spl.length; k++) {
					var param = $.trim(spl[k]);
					$span.append(text(' | '));
					if (param === '')
						continue;
					if (param.indexOf('[[') > -1) {
						param = param.replace(re.linkAddrsIn$1G, '[[$1]]'); // \[\[([^|\]]+)\|[^\]]*\]\]/g
						param = wikiParser.removeElements(param, 'bold/italic');
						var linkifyObj = linkifyText(param, articleTitle, true);
						pgsArr.push.apply(pgsArr, linkifyObj.pageNames);
						$span.append(linkifyObj.$collection);
					}
					else {
						var p = param.split('=');
						if (p.length > 1) {
							$span.append(text($.trim(p[0]) + ' = '));
						}
						var paramVal = p[1] || param;
						if (paramVal !== articleTitle) {
							pgsArr.push(paramVal);
							$span.append(browsableLink(paramVal));
						}
						else
							$span.append(paramVal);
					}
				}
				$span.append(text('}}')).append('<br/>');
				$div.append($span);
			}

			// check for some additional titles, but only if at least some other-meaning
			// templates exist on the page (some such templates auto-add a link to a disambig page)
			if (otherMeaningTemplates.length - sectionHeadingsNum > 0) {
				var altPages = [];

				// auto add link to the same page name without text in parentheses at the end
				var titleNoDisamb = articleTitle.replace(re.titleDisabigPart, ''); // \s\([^)]+\)$
				if (titleNoDisamb != articleTitle) {
					altPages.push(titleNoDisamb);
				}
	
				// auto add link to the title with disambig suffix
				// or, if this page already has that suffix, add the title without it:
				if (locale.disambigPgSuffix !== '') {
					var suff = locale.disambigPgSuffix;
					var suffIndex = articleTitle.indexOf(suff);
		
					// only if this page does not itself have the disambig suffix:
					if (suffIndex == -1 // doesn't have it
						|| suffIndex != articleTitle.length - suff.length) // doesn't have it at the end
							altPages.push(articleTitle + suff);
					else { // remove the disamb suffix from end
						var withoutDisambSuffix = articleTitle.slice(0, -suff.length);
						if (withoutDisambSuffix != titleNoDisamb)
							altPages.push(withoutDisambSuffix);
					}
				}
	
				$.each(altPages, function (i, val) {
					if ($.inArray(val, pgsArr) == -1) {
						$div1.prepend(
							$('<span/>', {'class': 'smrtL_otherMeaningOrMainTempl'})
								.append(browsableLink(val)).append('<br/>')
						);
						pgsArr.push(val);
					}
				});
			}
			$mainDiv.append($div1).append($div).append('<hr/>');
			display.append($mainDiv);

			return pgsArr;
		} // addTocAndOtherMeaningLinks


		function processStr(str) {
			str = $.trim(str);
			str = wikiParser.escCharsForNowikiTags(str);
			str = str.replace(locale.anchorTemplateRegExG, '<$1>'); // {{(anchor\|[\S\s]+?)}}/g
			str = wikiParser.removeElements(str,
			          'tables, files, references, templates, behavior switches, others');
			// wikiCode bold and italic to html ('' to <i>, ''' to <b>):
			str = str.replace(/<(anchor\|[\S\s]+?)>/g, '{{$1}}');
			str = wikiParser.boldAndItalicToHtml(str);
			// rem all tags except the whitelisted ones:
			try {str = wikiParser.sanitizeHtml(str, whitelistedTags);}
			catch (e) {
				if (typeof e != 'number') throw e;
				prt('Error while html-sanitizing the page. Error code: ' + e, true);
				return '';
			}

			return $.trim(str);
		} // processStr


		section = (articleTitle.match(re.addrSectionPart) || [''])[0]; // #.*
		if (section !== '') {
			articleTitle = articleTitle.slice(0, -section.length);
			// remove the # and encode to be used to scroll to that section at the end of this function:
			section = wikiParser.encodeSectionNameForId(section.slice(1));
		}
		articleUrl = formatUrl(articleTitle);

		visitedPages[articleTitle] = (noData ? '' : '+');
		clearDisplay();
		addBackLink(articleTitle);
		if (!(pgHistory.length > 0 && pgHistory[pgHistory.length - 1] === articleTitle))
			pgHistory.push(articleTitle);

		data = $.trim(wikiParser.removeElements(data, 'comments'));

		if (!isDisambigPg && locale.disambigTemplateNameRegEx)
			isDisambigPg = (locale.disambigTemplateNameRegEx.test(data));
		// redir[1] is "#Redirect", redir[2] is the link addr, redir[3] is the rest:
		redir = data.match(re.redirect); // ^(#[^\[]{1,25}\[\[)([^|\]]+)(\|.*|\]\][\S\s]*)

		if (noData)
			display.append(images.attention.attr('title', msgs.nonExistingPage)).appendText(' ');
		if (isDisambigPg) {
			display.append(images.attention.attr('title', msgs.disambigPage)).appendText(' ');
		}

		display.append($('<strong/>', {
			text: articleTitle,
			css: {color: (noData ? miscStyle.noDataReceivedLinkColor : 'green')}
		}));

		$topMenu = $('<span/>', {
			'class': 'smrtL_topMenu'
		})
		.append($('<a/>', { // Open in new window
			href: articleUrl,
			title: articleTitle + ': ' + msgs.openInNewWin,
			target: '_blank',
			css: {margin: '0 2px'}
		}).keypress(keyPressed).append(images.open))
		.append($('<a/>', { // Edit in new window
			href: formatUrl(articleTitle, false, true),
			title: articleTitle + ': ' + msgs.editInNewWin,
			target: '_blank',
			css: {margin: '0 2px'}
		}).keypress(keyPressed).append(images.edit));

		if (isDisambigPg)
			$topMenu.append($('<a/>', { // OK / Return focus to the textarea
				'class': 'smrtL_topMenuOkButton',
				href: '#   ' + msgs.focusTextarea,
				title: msgs.focusTextarea,
				css: {margin: '0 2px'},
				click: function (e) {
					e.preventDefault();
					$(this).remove();
					display.collapse();
					focusTextarea();
				},
				keypress: keyPressed
			}).append(images.ok));

		display.appendWrite($topMenu);

		if (data.length == 0)
			;
		else if (!wikiParser.checkRegexSupport()) {
			prt(msgs.error + ': ' + 'Unsupported browser. (No regex support)', true);
			data = '';
		}
		else if (!redir) {

			// keep only the text before the start of the first section title
			if (!fullText) {
				data = wikiParser.beforeTheFirstSection(data);
				data = processStr(data); // sanitize, etc.
				data = shorten(data);
			}

			sections = wikiParser.divideSections(data);

			display.appendText(' ');

			var emptyLineDiv = '<div style="font-size:50%;"><br/></div>';
			var sectionNames = {}; // two or more sections can have the same heading
			var sectionUrls = [];
			$.each(sections, function (i, val) {
				var unsafeContents = val.contents;
				var unsafeHeading = val.heading;
				var eq = val.eq; // the equal signs before (and after) the heading in the wiki code
				var safeHeading;

				if (eq !== '') {
					var h = wikiParser.removeElements(unsafeHeading, 'comments, references, templates');
					h = wikiParser.boldAndItalicToHtml(h); // convert '' and ''' to <i> and <b>
					try {h = wikiParser.sanitizeHtml(h, '', true);} catch (e) {return;} // remove all html tags
					h = wikiParser.unlink(h); // remove wiki links
					h = wikiParser.unescapeCharEntities(h);
					h = $.trim(h);
					if (h === '')
						h = '?';

					var headingId = wikiParser.encodeSectionNameForId(h);
					var sectionUrl = wikiParser.encodeSectionNameForUrl(h);
					var nOfSectionsWithThatName = sectionNames[sectionUrl];

					if (typeof nOfSectionsWithThatName == 'undefined')
						sectionNames[sectionUrl] = 1;
					else {
						nOfSectionsWithThatName++;
						sectionNames[sectionUrl] = nOfSectionsWithThatName;
						sectionUrl += '_' + nOfSectionsWithThatName;
						headingId += '_' + nOfSectionsWithThatName;
					}
					sectionHeadingIdsNoPrefix.push(headingId);
					sectionUrls.push(sectionUrl);
					safeHeading = processStr(unsafeHeading) || '?';
					otherMeaningTemplates.push(eq + safeHeading);
				}

				var othr = getOtherMeaningTemplates(unsafeContents, processStr);
				var otherMeaningTemplatesInThisSection = othr.templates;
				var safeContents = processStr(othr.str);
				otherMeaningTemplates.push.apply(otherMeaningTemplates, otherMeaningTemplatesInThisSection);

				var sectionHtmlCode = (eq !== '' ? '<span class="smrtL_sectionHeading'
					+ (otherMeaningTemplatesInThisSection.length > 0
						? ' smrtL_hasOtherMeaningOrMain' : '')
					+ '"><b>' + eq + safeHeading + eq + '</b></span> ' : '')
					+ (safeContents.replace(re.oneOrMoreEmptyLinesG, emptyLineDiv) // ([^\S\n]*\n){2,}/g
						.replace(re.nAsteriskG, '<br/>*') // \n\*/g
						.replace(re.nHashSymbolG, '<br/>#') // \n#/g
						.replace(re.nSemicolonG, '<br/>;') // \n;/g
						.replace(re.nColonG, '<br/>:') // \n:/g
						.replace(re.nG, ' ')) // \n/g
					+ emptyLineDiv;
				display.append(linkifyText(sectionHtmlCode, articleTitle, false).$collection);
			});

			var sectionHeadingIdsNoPrefixTemp = sectionHeadingIdsNoPrefix.slice();
			var totalSections = sectionHeadingIdsNoPrefix.length;
			display.find('.smrtL_sectionHeading').each(function (i, el) {
				var $span = $(el);
				var otherMeaningOrMainTemplInSection = $span.hasClass('smrtL_hasOtherMeaningOrMain');
				var headingId = sectionHeadingIdsNoPrefixTemp.shift();
				var sectionUrl = sectionUrls.shift();
				$span.append($('<a/>', {
						href: articleUrl + '#' + sectionUrl,
						target: '_blank',
						title: msgs.openInNewWin,
						css: {margin: '0 2px'}
					}).append(images.open.clone())
				).append($('<a/>', {
						href: formatUrl(articleTitle, false, true)
							+ '&section=' + (totalSections - sectionHeadingIdsNoPrefixTemp.length),
						target: '_blank',
						title: msgs.editInNewWin,
						css: {margin: '0 2px'}
					}).append(images.edit.clone())
				).append($('<a/>', {
						href: '#',
						id: sectIdPrefix + headingId,
						'class': 'smrtL_headingAnchor smrtL_section_' + headingId,
						title: msgs.tableOfContents,
						css: {margin: '0 2px'}
					}).append((otherMeaningOrMainTemplInSection ? images.related.clone() : images.toc.clone()))
				);
			});

			// add the ToC icon-link at the top
			if (sectionHeadingIdsNoPrefix.length > 0) {
				$topMenu
				.append($('<a/>', { // Table of contents
					'class': 'smrtL_topTocLink',
					href: '#   ' + msgs.tableOfContents,
					title: msgs.tableOfContents,
					css: {margin: '0 2px'},
					click: function f (e) {
						e.preventDefault();
						display.find('.smrtL_tocAndOtherDiv div.smrtL_tocLinkDiv').toggle(true);
						display.expand();
						display.scrollTo('.smrtL_tocHeadingLink', true);
					},
					keypress: keyPressed
				}).append(images.toc))
			}

			if (otherMeaningTemplates.length > 0 || sectionHeadingIdsNoPrefix.length > 0) {
				otherMeaningPages = addTocAndOtherMeaningLinks(otherMeaningTemplates,
					sectionHeadingIdsNoPrefix, articleTitle);
				display.write();
				if (otherMeaningPages.length > 0) {

					// add the OtherMeanings icon-link at the top
					$topMenu.append($('<a/>', { // Related articles
						'class': 'smrtL_otherAndMainArticlesLink',
						title: msgs.relatedArticles,
						css: {margin: '0 2px'},
						href: '#   ' + msgs.relatedArticles,
						click: function f (e) {
							e.preventDefault();
							display.find('.smrtL_tocAndOtherDiv div.smrtL_tocLinkDiv')
							.toggle(false);
							display.expand();
							display.scrollTo('.smrtL_tocHeadingLink', true);
						},
						keypress: keyPressed
					}).append(images.related));

					// check for articles in the other-meaning template arguments
					otherMeaningCheckLinks(otherMeaningPages);
				}
			}

		} // if (data && !redir)
		else { // REDIRECTING PAGE

			// don't auto redirect to sections because section title may change, etc.
			// don't redirect back to the previous page either
			if (!noRedir && redir[2].indexOf('#') == -1
			    && !(pgHistory.length > 1 && pgHistory[pgHistory.length - 2] === redir[2])) {
				insertLink(redir[2]);
				loadAndDisplay(redir[2], true); // don't redir next time to avoid infinite loops
				return;
			}

			display.appendText(': ' + redir[1]);
			var $lnk = browsableLink(redir[2], redir[2]);
			display.append($lnk);
			$lnk[0].focus();
			display.appendText(shorten(redir[3]));

		} // else if (redir)

		display.write();

		// attach events to some links:

		display.find('.smrtL_headingAnchor').click(function (e) {
			e.preventDefault();
			display.find('.smrtL_tocAndOtherDiv div.smrtL_tocLinkDiv').toggle(true);
			display.expand();
			display.scrollTo('#' + this.id + 'Link', true);
		})
		.keypress(keyPressed);
		display.find('a.smrtL_tocHeadingLink').click(function (e) {
			e.preventDefault();
			display.scrollTo('.smrtL_topTocLink' + this.id.slice(0, -4), true);
		})
		display.find('a.smrtL_tocLink').click(function (e) {
			e.preventDefault();
			display.scrollTo('#' + this.id.slice(0, -4), true);
		})
		.keypress(keyPressed);

		if (isDisambigPg) {
			display.expand(true);
			display.focus('.smrtL_topMenuOkButton');
		}

		if (section !== '') {
			var s = $('#' + sectIdPrefix + section).after($('<a/>', {
				href: '#   ' + msgs.backToTop,
				title: msgs.backToTop,
				css: {margin: '0 2px'},
				click: function (e) {
					e.preventDefault();
					var target = display.find('.smrtL_topTocLink');
					if (target.length == 0)
						target = display.find('.smrtL_otherAndMainArticlesLink');
					display.scrollTo(target, true);
				},
				keypress: keyPressed
			}).append(images.up.clone()));
			display.scrollTo(s);
		}

	} // processAndDisplayArticle


	function getOtherMeaningTemplates(unsafeStr, processStrFn) {
		var templates = [];
		var tempArr;

		if (!allPossibleOtherMeaningTemplates) {
			while (tempArr = locale.otherMeaningTemplateNamesRegExG.exec(unsafeStr)) {
				templates.push('{{'
					+ processStrFn(tempArr[0].slice(2)
						.replace(re.pipeTemplateToEndOfParam, '')) // {{!}}[^|}]+
				);
			}
		}
		else { // need to check for all other possible templates later, so need to remove these
			unsafeStr = unsafeStr.replace(locale.otherMeaningTemplateNamesRegExG,
				function (match) {
					templates.push('{{'
						+ processStrFn(match.slice(2)
							.replace(re.pipeTemplateToEndOfParam, '')) // {{!}}[^|}]+
					);
					return '';
				});
		}

		if (unsafeStr.charAt(0) == ':')
			unsafeStr = '\n' + unsafeStr; // for the regex
		// (^|=|})([^\S\n]*\n)+:[^\n]+\n/g
		unsafeStr = unsafeStr.replace(re.otherMeaningNoTemplG, function(match, $1) {
			if ($1)
				match = match.slice(2);
			templates.push('{{:|'
				+ processStrFn(
					match.replace(re.otherMeaningNoTemplTrimG, '') // (^|\n):\s*('')?|''\s*$/g
				) + '}}');
			return $1;
		});

		// other possible other-meaning templates (one-line templates with at least one parameter)
		if (allPossibleOtherMeaningTemplates) {
			templates.push('----');
			while (tempArr = re.possibleOtherMeaningTemplatesG.exec(unsafeStr)) {
				// ^\{\{[^}|\n]+\|[^}\n]+}}[^\S\n]*$/gm
				templates.push('{{'
					+ processStrFn(tempArr[0].slice(2)
						.replace(re.pipeTemplateToEndOfParam, '')) // {{!}}[^|}]+
				);
			}

			var l = templates.length;
			if (templates[l - 1] == '----')
					templates.length = l - 1;
			else
				templates.push('----/');
		}

		return {templates: templates, str: unsafeStr};
	} // getOtherMeaningTemplates


	function otherMeaningCheckLinks(otherMeaningPages) {
		for (var i = otherMeaningPages.length; i--; ) {
			otherMeaningPages[i] = encodeURIComponent(otherMeaningPages[i]);
		}

		var requestStr = '/w/api.php?action=query&titles='
			+ otherMeaningPages.join('|') + '&prop=pageprops&ppprop=disambig&format=json'
			+ '&smaxage=' + maxAgeSeconds.sForOtherMeanings + '&maxage='
			+ maxAgeSeconds.forOtherMeanings;
		// prop=info&format=json' also works

		$.ajax({
			url: requestStr,
			dataType: 'json',
			success: function (result) {
				otherMeaningCheckLinksReceiveAnswer(result);
			}
		});

		function otherMeaningCheckLinksReceiveAnswer(result) {
			var pages = result.query.pages;
			var norm = result.query.normalized || [];
			var denormMap = {};

			for (var i = norm.length - 1; i >= 0; i--) {
				denormMap[norm[i].to] = norm[i].from;
			}

			var missing = [], p;
			for (var i = -1; p = pages[i]; i--)
				missing.push( denormMap[p.title] || p.title );

			// replace all links to non-existing pages with plain text
			var $links = display.find('.smrtL_tocAndOtherDiv '
				+ 'span.smrtL_otherMeaningOrMainTempl a');
			$links.each(function (i, l) {
				var $l = $(this);
				var text = $l.text();
				if ($.inArray(text, missing) > -1) {
					$l.after(text);
					$l.remove();
				}
			});

			// remove all templates without links
			display.find('.smrtL_tocAndOtherDiv '
				+ 'span.smrtL_otherMeaningOrMainTempl:not(:has(a))').remove();

			// if no templates remain, remove top button
			if (display.find('.smrtL_tocAndOtherDiv '
				+ 'span.smrtL_otherMeaningOrMainTempl').length == 0) {
				display.find('.smrtL_otherAndMainArticlesLink').remove();
				var $div = display.find('.smrtL_tocAndOtherDiv');
				if ($div.text().indexOf('=') == -1) {
					$div.remove();
				}
			}
		}

	} // otherMeaningCheckLinks


	function linkifyText(text, currArticle, insertLinkAddr) {
		var pageNames = [];
		var linkEventFns = [];
		var html = text.replace(re.wikiLinkAddrAndLabelG, // \[\[([^\]|]+)\|?([^\]]*)]]/g
			function (match, prePipe, postPipe) {
				var link = browsableLinkAndEventFns(prePipe, postPipe, currArticle, insertLinkAddr);
				pageNames.push(prePipe);
				linkEventFns.push(link.eventHandlers);
				return link.$link[0].outerHTML;
			});
		var $span = $('<span/>');
		$span[0].innerHTML = html;
		// attach the event handlers to all the links in the intro
		$span.find('a.browsableLink').each(function (i, el) {
			var e = linkEventFns[i];
			$(el).keypress(keyPressed)
			.click(e.clickFn).focus(e.focusFn).blur(e.blurFn);
		});
		return {$collection: $span.contents(), pageNames: pageNames};
	} // linkifyText


	// returns a jQuery anchor element with a link that can be opened in the display
	// Used by DisambigMenu and OtherMeanings
	function browsableLink(linkAddr, linkText, currArticle) {
		if (!linkText && linkAddr.indexOf('|') > -1) {
			var arr = linkAddr.split('|');
			linkAddr = arr[0];
			linkText = arr[1];
		}
		var lnk = browsableLinkAndEventFns(linkAddr, linkText, currArticle, true);
		var e = lnk.eventHandlers;
		lnk.$link.click(e.clickFn)
		.focus(e.focusFn).blur(e.blurFn).keypress(keyPressed);
		return lnk.$link;
	} // browsableLink


	// used within the article intro and in a few other places
	// linkText is printed as html and must be a presanitized sting
	// insertLinkAddr - insert into the textarea, or only follow the link in the msgDisplay?
	function browsableLinkAndEventFns(linkAddr, linkText, currArticle, insertLinkAddr) {
		insertLinkAddr = true; // ignore this for now, always insert it
		linkText = $.trim(linkText);
		if (!linkAddr && !linkText)
			return null;
		var linkAddrNormalized = (articleNamesCapitalized
			? linkAddr.charAt(0).toUpperCase() + linkAddr.slice(1)
			: linkAddr);
		var visited = visitedPages[linkAddrNormalized];
		var linkColor = (visited
			? miscStyle.visitedPgLinkColor
			: (visited === ''
				? miscStyle.notExistingPgLinkColor
				: miscStyle.normalPgLinkColor));
		linkText = linkText || linkAddr;

		var unescapedLinkAddr = wikiParser.unescapeCharEntities(linkAddr);
		var $link = $('<a/>', {
			html: linkText,
			title: unescapedLinkAddr,
			href: '#   ' + unescapedLinkAddr,
			tabindex: 0,
			css: {color: linkColor, cursor: 'pointer'},
			'class': 'browsableLink'
		});

		var clickFn = function (event) {
			event.preventDefault();
			if (linkAddr.charAt(0) == '#') {
				display.scrollTo('#' + sectIdPrefix
					+ wikiParser.encodeSectionNameForId(linkAddr.slice(1)), true);
			}
			else {
				if (insertLinkAddr)
					insertLink(linkAddr);
				else
					lastLinkAddr = ''; // don't insert links in textarea until next smartLinking() call
				loadAndDisplay(linkAddr);
			}
		};

		var focusFn = function () {
			$('#smrtL_linkFocusHint').remove();
			if (linkAddr != linkText) { // add a tooltip at the bottom right corner of the screen
				$(document.body).append($('<div/>', {
					text: unescapedLinkAddr,
					id: 'smrtL_linkFocusHint',
					css: {
						position: 'fixed',
						bottom: 0,
						right: 0,
						border: '1px solid silver',
						background: '#dddddd',
						fontSize: 'small'
					},
					click: function () { $(this).remove(); }
				}));
				clearTimeout(linkFocusTimeoutId);
				linkFocusTimeoutId = setTimeout(function () {
					$('#smrtL_linkFocusHint').remove();
				}, 7000);
			}
		};

		var blurFn = function () {
			$('#smrtL_linkFocusHint').remove();
		};

		return {
			$link: $link,
			eventHandlers: {clickFn: clickFn, focusFn: focusFn, blurFn: blurFn}
		};
	} // browsableLinkAndEventsFn


	function keyPressed(event) {
		var charCode = event.charCode || event.keyCode;
		//var character = String.fromCharCode(charCode);

		if (charCode == 13) { // Enter
			event.preventDefault(); // don't follow the link (in IE)
			// - but that also cancels the onclick event
			$(this).trigger('click');
			$('#smrtL_linkFocusHint').remove();
		}
	} // keyPressed


	function focusTextarea() {
		if (window.wikEd && wikEd.useWikEd)
			wikEd.frameWindow.focus();
		else {
			var scroll = $(window).scrollTop();
			textarea.focus();
			$(window).scrollTop(scroll); // focus() causes IE to scroll the page
		}
	}


	function insertLink(addr) {
		if (window.wikEd && wikEd.useWikEd) {
			return;
		}

		// Internet Explorer loses the cursor position on onclick.
		function restoreCursorPos() {
			var currSel = textarea.textSelection( 'getCaretPosition', { startAndEnd: true } );
			if (currSel[0] == currSel[1]) // no selection - put cursor at start of link (+ 2)
				textarea.textSelection( 'setSelection', { start: linkStartPos + 2 } );
		}

		if (lastLinkAddr === '')
			return;
		restoreCursorPos();
		var ar = wikiParser.focusedSegment(valParts(textarea), 'wikilink');
		if (!ar)
			return;
		var link = ar[1];
		var oldAddr = ( link.match(re.wikiLinkAddr) || ['', ''] )[1]; // ^\[\[([^|\]]*)

		if (oldAddr.toLowerCase() !== lastLinkAddr.toLowerCase())
			return; // if a different link is at this position - abort
		link = link.replace(re.wikiLinkRemoveOpeningBracketsAndUpToAndInclPipe, ''); // ^\[\[(.+?\|)?
		if (addr) {
			var addrCapitalized = addr.charAt(0).toUpperCase() + addr.slice(1);
			var linkCapitalized = link.charAt(0).toUpperCase() + link.slice(1);
			if (addr && addrCapitalized + ']]' !=  linkCapitalized)
				link = addr + '|' + link;
		}
		lastLinkAddr = addr || link.slice(0, -2);
		link = '[[' + link;
		valParts(textarea, ar[0] + link, '', ar[2]);
	} // insertLink


	// the function/object exposed to the outside world
	function smartLinkingFn() {
		correctLinking();
	}

	// add the function for updating the messages and locale data:
	smartLinkingFn.init = init;

	setup();

	return smartLinkingFn;
})(jQuery);

window.smartLinking.version = 1000;

/* smartLinkingLoader.js
 * v. 2013-11-02
 *
 * This script adds a toolbar button which, when pressed, loads smartLinking.js and calls window.smartLinking().
 *
 * Smart Linking home: http://en.wikipedia.org/wiki/User:V111P/js/Smart_Linking
 */
 
mw.libs.smartLinkingLoader = mw.libs.smartLinkingLoader || {};
mw.libs.smartLinkingLoader.version = 1000;

mw.libs.smartLinkingLoader.smartLinking = function () {
	"use strict";
	if (window.smartLinking) {
		window.smartLinking();
	}
	else {
		$.ajax({
			url: '//en.wikipedia.org/w/index.php?title=User:V111P/js/smartLinking.js'
					+ '&action=raw&ctype=text/javascript&smaxage=0&maxage=0',
			dataType: 'script',
			cache: true,
			success: function () {
				if (window.smartLinking)
					window.smartLinking();
				else
					setTimeout(function () {
						if (window.smartLinking)
							window.smartLinking();
					}, 500);
			}
		});
	}
};

mw.libs.smartLinkingLoader.addButton = function () {
	"use strict";
	var buttonId = 'smartLinkingButton';

	if ( $.inArray( mw.config.get( 'wgAction' ), ['edit', 'submit'] ) == -1
		  || $('#' + buttonId).size() > 0 )
		return;

	var addToolbarButtons_scriptUrl = '//en.wikipedia.org/w/index.php?title='
		+ 'User:V111P/js/addToolbarButtons.js&action=raw'
		+ '&ctype=text/javascript&smaxage=0&maxage=0';
	var c = ( window.smartLinkingConfig || {} );
	var toolbarButtonProps = {
		id: buttonId,
		tooltip: (c.msgs && c.msgs.scriptName) || 'Smart Linking',
		section: 'main',
		group: 'insert',
		callback: mw.libs.smartLinkingLoader.smartLinking,
		iconUrl: '//upload.wikimedia.org/wikipedia/commons/9/96/Interpage_icon.png',
		iconUrlClassic: '//upload.wikimedia.org/wikipedia/commons/5/5a/Interpage_button.png'
	};

	if (mediaWiki.libs.addToolbarButtons)
		mediaWiki.libs.addToolbarButtons(toolbarButtonProps);
	else {
		var tbs = window.toolbarButtonsToAdd = window.toolbarButtonsToAdd || [];
		tbs.push(toolbarButtonProps);
		$.ajax({
			url: addToolbarButtons_scriptUrl,
			dataType: 'script',
			cache: true
		});
	}

};

if ((window.smartLinkingConfig || {}).addButton !== false)
	mediaWiki.libs.smartLinkingLoader.addButton();

/* valSel.js
 * ver. 2013-10
 *
 * A cross-browser textarea and text input value and selection manipulation
 * library plug-in for jQuery
 * Home: http://en.wikipedia.org/wiki/User:V111P/js/valSel
 *
 * This script contains code from Rangy Text Inputs (Version from 5 November 2010),
 * Copyright 2010, Tim Down, licensed under the MIT license.
 * http://code.google.com/p/rangyinputs/
 *
 * You can use the code not from Rangy Text Inputs under the CC0 license
 */

(function($) {
	var UNDEF = "undefined";
	var getSelection, setSelection, collapseSelection;
	var inited; // whether init() has already been called or not
	var rReG = /\r/g;

	// Trio of isHost* functions taken from Peter Michaux's article:
	// http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
	function isHostMethod(object, property) {
		var t = typeof object[property];
		return t === "function" || (!!(t == "object" && object[property])) || t == "unknown";
	}

	function isHostProperty(object, property) {
		return typeof(object[property]) != UNDEF;
	}

	function isHostObject(object, property) {
		return !!(typeof(object[property]) == "object" && object[property]);
	}

	function fail(reason) {
		if (window.console && window.console.error) {
			window.console.error("valSel.js: Unsupported browser: " + reason);
		}
	}

	function adjustOffsets(el, start, end) {
		var len = el.value.replace(rReG, '').length;
		start = (start > 0 ? start : 0);
		start = (start < len ? start : len);
		if (typeof end == UNDEF)
			end = start;
		else {
			end = (end > 0 ? end : 0);
			end = (end < len ? end : len);
		}
		if (end < start) {
			var t = start;
			start = end;
			end = t;
		}
		return { start: start, end: end };
	}

	function makeSelection(normalizedValue, start, end) {
		return {
			start: start,
			end: end,
			length: end - start,
			text: normalizedValue.slice(start, end)
		};
	}

	function getBody() {
		return isHostObject(document, "body") ? document.body : document.getElementsByTagName("body")[0];
	}

	function init() {
		if (inited)
			return;
		var testTextArea = document.createElement("textarea");

		getBody().appendChild(testTextArea);

		if (isHostProperty(testTextArea, "selectionStart") && isHostProperty(testTextArea, "selectionEnd")) {
			getSelection = function(el) {
				var start = el.selectionStart, end = el.selectionEnd;
				return makeSelection(el.value.replace(rReG, ''), start, end);
			};

			setSelection = function(el, startOffset, endOffset) {
				var offsets = adjustOffsets(el, startOffset, endOffset);
				el.selectionStart = offsets.start;
				el.selectionEnd = offsets.end;
			};

			collapseSelection = function(el, toStart) {
				if (toStart) {
					el.selectionEnd = el.selectionStart;
				} else {
					el.selectionStart = el.selectionEnd;
				}
			};
		} else if (isHostMethod(testTextArea, "createTextRange") && isHostObject(document, "selection")
		           && isHostMethod(document.selection, "createRange")) {

			getSelection = function(el) {
				var start = 0, end = 0, range, normalizedValue = '', textInputRange, len, endRange;

				el.focus();
				range = document.selection.createRange();
				if (range && range.parentElement() == el) {
					len = el.value.length;
					normalizedValue = el.value.replace(rReG, "");
					textInputRange = el.createTextRange();
					textInputRange.moveToBookmark(range.getBookmark());
					endRange = el.createTextRange();
					endRange.collapse(false);
					if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
						start = end = len;
					} else {
						start = -textInputRange.moveStart("character", -len);
						if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
							end = len;
						} else {
							end = -textInputRange.moveEnd("character", -len);
						}
					}
				}

				return makeSelection(normalizedValue, start, end);
			};

			// Moving across a line break only counts as moving one character in a TextRange,
			// whereas a line break in the textarea value is two characters.
			// This function corrects for that by converting a text offset into a range character offset
			// by subtracting one character for every line break in the textarea prior to the offset
			var offsetToRangeCharacterMove = function(el, offset) {
				return offset;// - (el.value.slice(0, offset).split("\r\n").length - 1);
			};

			setSelection = function(el, startOffset, endOffset) {
				var offsets = adjustOffsets(el, startOffset, endOffset);
				var range = el.createTextRange();
				var startCharMove = offsetToRangeCharacterMove(el, offsets.start);
				range.collapse(true);
				if (offsets.start == offsets.end) {
					range.move("character", startCharMove);
				} else {
					range.moveEnd("character", offsetToRangeCharacterMove(el, offsets.end));
					range.moveStart("character", startCharMove);
				}
				range.select();
			};

			collapseSelection = function(el, toStart) {
				var range = document.selection.createRange();
				range.collapse(toStart);
				range.select();
			};
		} else {
			getBody().removeChild(testTextArea);
			fail("No means of finding text input caret position");
			return;
		}

		// Clean up
		getBody().removeChild(testTextArea);
		inited = true;
	} // init


	// the functions always automatically return this
	// if they don't otherwise return a result
	function jQuerify(func) {
		return function() {
			var el = this.jquery ? this[0] : this;
			var nodeName = el.nodeName.toLowerCase();

			if (el.nodeType == 1 && (nodeName == "textarea"
			    || (nodeName == "input" && el.type == "text"))) {
				if (!inited) init(); // because $(init) won't work after an error from another script
				var args = [el].concat(Array.prototype.slice.call(arguments));
				var result = func.apply(this, args);
				if (typeof result != 'undefined') {
					return result;
				}
			}
			return this;
		};
	}


	/* Rangy Text Inputs code ends */


	function getValue(el) {
		return el.value.replace(rReG, ''); // remove \r
	}


	function setValue(el, val) {
		var scrollPosObj = scrollPos(el);
		el.value = val;
		scrollPos(el, scrollPosObj);
	}


	function scrollPos(el, scrollPosObj) {
		if (scrollPosObj) {
			el.scrollTop = scrollPosObj.top;
			el.scrollLeft = scrollPosObj.left;
		}
		else {
			return {
				top: el.scrollTop,
				left: el.scrollLeft
			};
		}
	}


	var valParts = function (el, arg1, selText, textAfter) {
		var parts;
		var setValParts = function (el, parts) {
			setValue(el, parts.join(''));
			var beforeLen = parts[0].length;
			setSelection(el, beforeLen, beforeLen + parts[1].length);
		}

		if (typeof arg1 == 'object') {
			parts = arg1;
		}
		else if (typeof arg1 == 'function') {
			
		}
		else if (typeof arg1 == 'string') {
			parts = [arg1, selText, textAfter];
		}
		if (parts) {
			setValParts(el, parts);
			return;
		}
		else {
			var s = getSelection(el);
			var text = getValue(el);

			parts = [text.slice(0, s.start), s.text, text.slice(s.end)];

			if (typeof arg1 == 'function') {
				var parts = arg1(parts[0], parts[1], parts[2], text.length);
				if (parts)
					setValParts(el, parts);
				return;
			}

			return parts;
		}
	} // valParts


	var sel = function (el, arg1, arg2) {
		var sel;
		var setSel = function (sel) {
			if (typeof sel.start == 'number') {
				if (typeof sel.end != 'number')
					sel.end = sel.start;
				if (typeof sel.text == 'string')
					setValue(sel.text);
				setSelection(el, sel.start, sel.end);
			}
			else if (typeof sel.text == 'string') {
				valParts(el, function (pre, currSel, post) {
					var replacementSel = sel.text;
					if (collapse < 0) {
						post = replacementSel + post;
						replacementSel = '';
					}
					else if (collapse > 0) {
						post += replacementSel;
						replacementSel = '';
					}

					return [pre, replacementSel, post];
				});
			}
		}

		if (typeof arg1 == 'undefined') {
			return getSelection(el);
		}
		switch (typeof arg1) {
		case 'function':
			var selObj = getSelection(el);
			sel = arg1(selObj.text, selObj.start, selObj.end, selObj.length);
			if (typeof sel == 'string')
				sel = {text: sel};
			if (typeof sel == 'object')
				setSel(sel);
			break;
		case 'string':
			var collapse = (typeof arg2 == 'number' ? arg2 : 0);
			setSel({text: arg1, collapse: arg2});
			break;
		case 'number':
			var start = arg1, end = arg2;
			setSelection(el, start, end);
			break;
		}
	} // sel


	var aroundSel = function (el) {
		var a = arguments;
		var before = a[1];
		var after, include, collapse;
		var excludedBefore = '', excludedAfter = '';

		if (typeof before != 'string')
			return this; // error - do nothing
		if (typeof a[2] != 'string') {
			// aroundSel(string surround, [bool include, [int collapse]])
			after = before;
			include = a[2];
			collapse = a[3];
		}
		else if (typeof a[3] != 'string') {
			// aroundSel(string before, string after, [bool include, [int collapse]])
			after = a[2];
			include = a[3];
			collapse = a[4];
		}
		else {
			// aroundSel(string before, string prepend, string append, string after, [int collapse])
			excludedBefore = before;
			before = a[2];
			after = a[3];
			excludedAfter = a[4];
			collapse = a[5];
			include = true;
		}

		include = (typeof include == 'boolean' ? include : true);

		if (collapse === true)
			collapse = 1;
		else if (typeof collapse != 'number')
			collapse = 0;

		valParts(el, function (pre, sel, post) {
			if (include)
				sel = before + sel + after;
			else {
				pre = pre + before;
				post = after + post;
			}

			if (collapse < 0) {
				post = sel + post;
				sel = '';
			}
			else if (collapse > 0) {
				pre += sel;
				sel = '';
			}

			return [pre, sel, post];
		});
	} // aroundSel


	$.fn.extend({
		valParts: jQuerify(valParts),
		sel: jQuerify(sel),
		aroundSel: jQuerify(aroundSel),
		collapseSel: jQuerify(collapseSelection)
	});


	$(init);
})(jQuery);

/*
 * msgDisplay.js
 * ver. 2013-12-02
 * Home: http://en.wikipedia.org/wiki/User:V111P/js/msgDisplay
 *
 * This script can be used by other scripts to display messages to the MediaWiki editor.
 * To get the default display, call msgDisplay() without parameters.
 * To get another display, call msgDisplay(displayID).
 * See the bottom of the file to see which methods you can call
 * on the object returned by msgDisplay().
 *
 * CC0 Public Domain Dedication:
 * http://creativecommons.org/publicdomain/zero/1.0/
 * If you use large parts of this code, please let me know.
 * You should also let others know where the code originates:
 * http://en.wikipedia.org/wiki/User:V111P/js/msgDisplay.js
 * Thanks.
 */


mediaWiki.libs.msgDisplay = mediaWiki.libs.msgDisplay || function (displayId) {
	"use strict";
	var smd = mediaWiki.libs.msgDisplay;
	var displayId = displayId || 'top';
	var d = smd.displays[displayId];

	if (!d) {
		d = smd.displays[displayId] = createDisplay(displayId);
	}

	return d;

	function createDisplay(displayId) {
		"use strict";

		function prt(str) {
			if (console && console.log)
				console.log(str);
		}

		var domId = 'msgDisplay_' + displayId;
		var ltr = (document.getElementsByTagName('html')[0].dir != 'rtl');

		var miscStyle = {
			emSizeInPx: 12, // to be set in show()
			minDisplayHeight: '1.4em', // user config name: minHeight
			displayDivExpandHeight: '11.5em', // user config name: expandHeight
			// the enhanced editing toolbar has z-index:5, the (X) link in the siteNotice has 98
			displayDivCollapsedZindex: 7,
			displayDivExpandedZindex: 101,
			innerResizeHandleHeightPx: 3,
			floatingMenuPxFromBottom: 19 // updated according to emSizeInPx in show()
		};

		var commonsUrl = '//upload.wikimedia.org/wikipedia/commons/';

		var elProps = {
			staticParentDiv: {
				id: domId + '_outerBox',
				'class': 'msgDisplay_outerBox',
				css: {
					height: miscStyle.minDisplayHeight,
					'margin-left': (ltr ? '0' : '-13px'),
					'margin-right': (ltr ? '-13px' : '0'),
					'padding-bottom': '2px', // to make up for displayDiv's border
					'background-color': '#ddd'
				}
			},
			displayDiv: {
				id: domId,
				'class': 'msgDisplay',
				tabindex: 0,
				css: {
					height: miscStyle.minDisplayHeight, // original, collapsed height
					width: '100%',
					overflow: 'auto',
					'overflow-x': 'hidden',
					position: 'absolute',
					'z-index': miscStyle.displayDivCollapsedZindex,
					border: 'black solid 1px',
					background: '#fed', // can be set by user through msgDisplayConfid[displayId].background
					'line-height': 'normal' // to cancel .wikiEditor-ui .wikiEditor-ui-text {line-height: 0}
				}
			},
			floatingMenu: {
				'class': 'msgDisplay_floatingMenu',
				css: {
					position: 'absolute',
					left: (ltr ? 'auto' : 0),
					right: (ltr ? 0 : 'auto'),
					cursor: 'pointer',
					margin: '1px 2px',
					background: 'inherit'
				}
			},
			floatingMenuExpandedSection: {
				'class': 'msgDisplay_expandedSection'
			},
			floatingMenuButtonImg: {
				'class': 'msgDisplay_menuButton',
				src: commonsUrl
					+ 'thumb/8/8f/WMF-Agora-Settings_BCBCBC.svg/26px-WMF-Agora-Settings_BCBCBC.svg.png',
				width: 13,
				height: 13,
				alt: '[*]',
				title: '[*]',
				css: {cursor: 'auto'}
			},
			okButtonImg: {
				'class': 'msgDisplay_okButton',
				src: commonsUrl + 'thumb/a/ac/Approve_icon.svg/26px-Approve_icon.svg.png',
				width: 13,
				height: 13,
				alt: '[_]',
				title: '[_]'
			},
			upButtonImg: {
				'class': 'msgDisplay_upButton',
				src: commonsUrl + '5/56/Icon_Arrow_Up_26x26.png',
				width: 13,
				height: 13,
				alt: '[^]',
				title: '[^]'
			},
			helpLink: {
				'class': 'msgDisplay_helpLink',
				href: helpLinkUrl, // reset in addTheFloatingMenu()
				target: '_blank',
				title: '?',
				tabindex: -1
			},
			helpImg: {
				src: commonsUrl + 'thumb/9/9e/Blue_Question.svg/26px-Blue_Question.svg.png',
				width: 13,
				height: 13,
				alt: '[?]',
				title: '[?]'
			},
			closeButtonImg: {
				'class': 'msgDisplay_closeButton',
				src: commonsUrl + 'thumb/d/d3/Button_hover.svg/26px-Button_hover.svg.png',
				width: 13,
				height: 13,
				alt: '[X]',
				title: '[X]',
				tabindex: -1
			}
		};

		var defaultHelpLinkUrl = '//en.wikipedia.org/wiki/User:V111P/js/msgDisplay/Help';
		var helpLinkUrl = defaultHelpLinkUrl;

		var defaultLocations = { // 'content' means mw.util.$content
			top: {insertRelTo: 'content', insertRel: 'prepend'},
			edit: {insertRelTo: '#wpTextbox1', insertRel: 'before'}
		};
		var defaultExpandCollapseChar = '!';
		var defaultBlurChar = '`';
		var defaultCloseChar = '^';
		var keyPressFns = []; // use keypress() to register a keypress event handler
		var onCloseOnUserActionFns = []; // use onCloseOnUserAction() to register an event handler
		var onCollapseOnUserActionFns = []; // use onCollapseOnUserAction() to register an event handler

		var $staticParentDiv;
		var $displayDiv, $innerResizeHandle;
		var $buffer = $('<div/>');
		var $menuDiv;
		var $floatingMenu;

		var configAll = window.msgDisplayConfig = window.msgDisplayConfig || {};
		var cConfig = configAll._common || {};
		var dConfig = configAll[displayId] || {};

		var styleTagClass = 'msgDisplay_style';
		$('style.' + styleTagClass).remove();
		$(document.head).append('<style class="' + styleTagClass + '">'
			+ 'div.msgDisplay'
				+ ' .msgDisplay_floatingMenu .msgDisplay_expandedSection {display: none;}\n'
			+ 'div.msgDisplay'
				+ ' .msgDisplay_floatingMenu:hover .msgDisplay_expandedSection {display: inline;}\n'
			+ 'div.msgDisplay .msgDisplay_floatingMenu '
				+ 'img {width: 1em; height: 1em; cursor: pointer; margin: 0px 1px;}\n'
		);


		function config(configObj) {
			if (!configObj)
				return;

			var propNames = ['closeChar', 'expandCollapseChar', 'blurChar',
				'height', 'minHeight', 'expandHeight', 'background',
				'insertRelTo', 'insertRel'];

			$.each(propNames, function (i, name) {
				dConfig[name] = configObj[name] || dConfig[name];
			});

			return this;
		}


		function remove() {
			$(window).off('resize.' + domId);
			$displayDiv = null;
			clearBuffer();
			$('#' + elProps.staticParentDiv.id).remove();
			return this;
		}


		// called from show() only
		function setConfig() {
			miscStyle.minDisplayHeight = dConfig.minHeight; // if undefd, will be calculated in show()
			if (dConfig.height)
				elProps.staticParentDiv.css.height = elProps.displayDiv.css.height = dConfig.height;
			if (dConfig.expandHeight)
				miscStyle.displayDivExpandHeight = dConfig.expandHeight;
			var backgr = dConfig.background || cConfig.background;
			if (backgr)
				elProps.displayDiv.css.background = backgr;

			var insertRelTo;
			if (dConfig.insertRelTo == 'content')
				; // set below
			else if (dConfig.insertRelTo && $(dConfig.insertRelTo)[0])
				insertRelTo = dConfig.insertRelTo;
			else if (displayId == 'edit')
				insertRelTo = defaultLocations['edit'].insertRelTo;
			else // displayId == 'top' or displayId == something else
				insertRelTo = defaultLocations['top'].insertRelTo;

			if (insertRelTo == 'content')
				insertRelTo = mw.util.$content;

			var insertRel;
			if (dConfig.insertRel)
				insertRel = dConfig.insertRel;
			else if (displayId == 'edit' || insertRelTo == '#wpTextbox1')
				insertRel = defaultLocations['edit'].insertRel; 
			else // displayId == 'top' or displayId == something else
				insertRel = defaultLocations['top'].insertRel;

			return {insertRelTo: insertRelTo, insertRel: insertRel};
		} // setConfig


		function show() {
			clear();
			var pos = setConfig();

			if (displayId == 'top' || displayId == 'edit') {
				helpLinkUrl = defaultHelpLinkUrl;
				removeAllEventHandlers();
			}
			if ($displayDiv) { // already shown
				$displayDiv.css({
					height: elProps.displayDiv.css.height,
					background: elProps.displayDiv.css.background
				});
				$staticParentDiv.css({
					height: elProps.staticParentDiv.css.height
				});
				return this;
			}

			$displayDiv = $('<div/>', elProps.displayDiv)
			.dblclick(onDblClickHandler)
			.keypress(keyPressed);

			var $div = $staticParentDiv = $('<div/>', elProps.staticParentDiv).append($displayDiv);

			var insertRelTo = pos.insertRelTo;
			var insertRel = pos.insertRel;

			// Insert relative to WikEd
			if ((displayId == 'edit' || insertRelTo == '#wpTextbox1') && window.wikEd) {
				var $wikEdContainer;
				if (insertRel == 'after') {
					$wikEdContainer = $('#wikEdConsoleWrapper');
					if ($wikEdContainer[0]) {
						$div.prependTo($wikEdContainer);
						insertRel = 'wikEd';
					}
				}
				else {
					$wikEdContainer = $('#wikEdCaptchaWrapper');
					if ($wikEdContainer[0]) {
						$div.appendTo($wikEdContainer);
						insertRel = 'wikEd';
					}
				}
			}


			switch (insertRel) {
			case 'wikEd':
				// already inserted
				break;
			case 'prepend':
				$div.prependTo(insertRelTo);
				break;
			case 'append':
				$div.appendTo(insertRelTo);
				break;
			case 'after':
				if (window.syntaxHighlighterConfig
					 && insertRelTo == '#wpTextbox1') {
					// support for the Dot's syntax highlighter gadget
					$div.insertAfter($('#wpTextbox1')[0].parentNode);
				}
				else
					$div.insertAfter(insertRelTo);
				break;
			case 'before':
			default:
				if (window.syntaxHighlighterConfig
					 && insertRelTo == '#wpTextbox1') {
					// support for the Dot's syntax highlighter gadget
					$div.insertBefore($('#wpTextbox1')[0].parentNode);
				}
				else
					$div.insertBefore(insertRelTo);
				break;
			}

			function resizeIt(e) {
				if (e && e.target != window)
					return;
				if (e)
					$div.css('width', 'auto');
				var outerDivWidth = $div.width();
				$displayDiv.width(outerDivWidth - 15);
			}

			resizeIt();
			$(window).on('resize.' + domId, resizeIt);

			addTheFloatingMenu();

			if (typeof miscStyle.minDisplayHeight != 'number')
				miscStyle.minDisplayHeight = $displayDiv.height();
			makeStaticParentDivResizable(miscStyle.minDisplayHeight);
			makeInnerDivResizable();

			return this;
		} // show


		// privete fn
		function onDblClickHandler(e) {
			// remove the selection which resulted from the double click
			if (window.getSelection) {
				var selection = window.getSelection();
				if (selection.empty)
					selection.empty();
				else if (selection.removeAllRanges)
					selection.removeAllRanges();
				else if (selection.createRange && selection.createRange().collapse) {
					var r = selection.createRange();
					(r.collapse) && collapse(false); // IE before version 9 (?)
				}
			}

			expandCollapse(void(0), true);
		} // onDblClickHandler


		// private fn
		function makeInnerDivResizable(makeNotCancel) {
			if (!$.ui.resizable)
				return;
			if (makeNotCancel === false) { // cancel it
				$displayDiv.off('scroll.resize').off('resizestop');
				$displayDiv.resizable('destroy');
				$innerResizeHandle = void(0);
			}
			else { // turn it on
				$displayDiv.resizable({ minHeight: $staticParentDiv.height(), minWidth: 30, handles: 's' });
				$innerResizeHandle = $displayDiv.find('div.ui-resizable-handle');
				$innerResizeHandle.css('height', miscStyle.innerResizeHandleHeightPx + 'px');
				$displayDiv.on('scroll.resize', function () {positionInnerResizeHandleAndMenu();})
					.on('resizestart', function(evt, ui) {
						$floatingMenu.hide();
						putOnTopOfOtherDisplays();
					})
					.on('resizestop', function(evt, ui) {positionInnerResizeHandleAndMenu();} );
				positionInnerResizeHandleAndMenu();
			}
		} // makeInnerDivResizable


		// private fn
		// move the innerResizeHandle and the floating menu to the bottom of the display
		function positionInnerResizeHandleAndMenu() {
			var bottom = $displayDiv.height() + $displayDiv.scrollTop();
			$innerResizeHandle.css('top', (bottom - miscStyle.innerResizeHandleHeightPx) + 'px');
			$floatingMenu.show().css('top', (bottom - miscStyle.floatingMenuPxFromBottom) + 'px');
		}


		// private fn
		function putOnTopOfOtherDisplays() {
			$.each(smd.displays, function (i, val) {
				val.collapse();
			});
			$displayDiv.css('z-index', miscStyle.displayDivExpandedZindex);
		}


		// private fn
		function makeStaticParentDivResizable(minHeight) {
			if (!$staticParentDiv.resizable)
				return;
			// For jQueryUI bug on resizing horizontally on right-to-left wikis:
			var left, width, ddLeft, ddWidth;
			$staticParentDiv.resizable({
				minHeight: minHeight,
				minWidth: 30,
				handles: (ltr ? 'se' : 'sw'),
				alsoResize: $displayDiv
			})
			.on('resizestart', function(e, ui) {
				if (!ltr)
					left = $staticParentDiv.css('left');
				$floatingMenu.hide();
			})
			.on('resizestop', function(e, ui) {
				e.stopPropagation();
				if (!ltr) // fix jQueryUI's bug, which moves the div on resizing it
					$staticParentDiv.css({left: left});
				$displayDiv.css('width', $staticParentDiv.width() - 15)
				.resizable('option', 'minHeight', $staticParentDiv.height());
				positionInnerResizeHandleAndMenu();
			})
		} // makeStaticParentDivResizable


		// private fn
		function addTheFloatingMenu() {
			var $menuButtonImg;
			var $okButtonImg;
			var $upButtonImg;
			var $closeButtonImg;
			var $expandedSection;

			if ($floatingMenu) {
				// $menuButtonImg = $floatingMenu.find('.' + elProps.floatingMenuButtonImg['class']);
				$okButtonImg = $floatingMenu.find('.' + elProps.okButtonImg['class']);
				$upButtonImg = $floatingMenu.find('.' + elProps.upButtonImg['class']);
				$closeButtonImg = $floatingMenu.find('.' + elProps.closeButtonImg['class']);
				// $expandedSection = $floatingMenu.find('.' + elProps.floatingMenuExpandedSection['class']);
				$floatingMenu.find('.' + elProps.helpLink['class']).attr('href', helpLinkUrl);
			}
			else {
				$menuButtonImg = $('<img/>', elProps.floatingMenuButtonImg);
				$okButtonImg = $('<img/>', elProps.okButtonImg);
				$upButtonImg = $('<img/>', elProps.upButtonImg);
				$closeButtonImg = $('<img/>', elProps.closeButtonImg);
				$expandedSection = $('<span/>', elProps.floatingMenuExpandedSection);

				$expandedSection.append($closeButtonImg)
				.append($('<a/>', elProps.helpLink).attr('href', helpLinkUrl)
					.append($('<img/>', elProps.helpImg)))
				.append($upButtonImg)
				.append($okButtonImg);

				$floatingMenu = $('<div/>', elProps.floatingMenu)
				.append($expandedSection)
				.append($menuButtonImg);
			}

			$okButtonImg.click(function (e) {
				expandCollapse(false, true);
			});
			$upButtonImg.click(function (e) {
				scrollTo(0);
			});
			$closeButtonImg.click(closeOnUserAction);

			$displayDiv.append($floatingMenu);

			miscStyle.floatingMenuPxFromBottom = $floatingMenu.outerHeight(true) + 1;
		} // addTheFloatingMenu


		function isShown() {
			return ($displayDiv ? true : false);
		}


		function collapse() {
			expandCollapse(false);
			return this;
		}


		function expand() {
			expandCollapse(true);
			return this;
		}


		function expandCollapse(expand, runOnCollapseEvtHandlers) {
			if (!$displayDiv)
				return;
			if (expand == null || expand == undefined)
				expand = ($staticParentDiv.height() + 3 >= $displayDiv.height());

			if (expand) {
				var preHeight = $displayDiv.height();
				var minExpandH = $staticParentDiv.height();
				putOnTopOfOtherDisplays();
				$displayDiv.css('height', miscStyle.displayDivExpandHeight);
				var aftHeight = $displayDiv.height();
				if (aftHeight < minExpandH)
					$displayDiv.height(minExpandH);
				positionInnerResizeHandleAndMenu();
			}
			else { // collapse
				$displayDiv.css('z-index', miscStyle.displayDivCollapsedZindex);
				$displayDiv.height($staticParentDiv.height());
				$displayDiv.width($staticParentDiv.width() - 15);
				positionInnerResizeHandleAndMenu();
				if (runOnCollapseEvtHandlers) {
					if (displayId == 'edit')
						focusTextbox1();
					$.each(onCollapseOnUserActionFns, function (i, fn) {
						fn();
					});
				}
			}

			return this;
		} // expandCollapseDisplay


		function focusTextbox1() {
			var scroll = $(window).scrollTop();
			$('#wpTextbox1').focus();
			$(window).scrollTop(scroll); // focus() causes IE to scroll the page
		}


		// private fn
		function keyPressed(e) {
			var processKeyPress = true;
			$.each(keyPressFns, function (i, fn) {
				if (processKeyPress)
					processKeyPress = (fn(e) === false ? false : true);
				else
					fn(e);
			});
			if (!processKeyPress) // if at least one fn returned 'false', return
				return;

			var charCode = e.which || e.charCode || e.keyCode;
			var character = String.fromCharCode(charCode);

			var blurChar = dConfig.blurChar || cConfig.blurChar || defaultBlurChar;
			var expandCollapseChar = dConfig.expandCollapseChar || cConfig.expandCollapseChar
				|| defaultExpandCollapseChar;
			var closeChar = dConfig.closeChar || cConfig.closeChar || defaultCloseChar;

			if ((charCode == 27 && !e.shiftKey) || character === blurChar) {
				e.preventDefault();
				e.stopPropagation();
				expandCollapse(false, true);
			}
			else if (character === expandCollapseChar) {
				e.preventDefault();
				e.stopPropagation();
				expandCollapse(void(0), true);
			}
			else if (charCode == 27 || character === closeChar) { // 27 is Esc
				e.preventDefault();
				e.stopPropagation();
				closeOnUserAction();
			}
		} // keyPressed


		// register an event handler on the event 'keypress'.
		// If fn returns false, the default keys for closing, collapsing, etc. won't have any effect.
		function keypress(fn) {
			if ($.inArray(fn, keyPressFns) == -1)
				keyPressFns.push(fn);
			return this;
		}


		// on clicking on the 'close' button in the floating menu
		// if fn returns false, the display won't close
		function onCloseOnUserAction(fn) {
			if ($.inArray(fn, onCloseOnUserActionFns) == -1)
				onCloseOnUserActionFns.push(fn);
			return this;
		}

		function closeOnUserAction() {
			var close = true;
			$.each(onCloseOnUserActionFns, function (i, fn) {
				if (close) // if one of the fns returns 'false', don't close the display
					close = (fn() === false ? false : true);
				else
					fn();
			});
			if (close) {
				remove();
				if (displayId == 'edit')
					focusTextbox1();
			}
		}


		// on double clicking to collapse the display
		function onCollapseOnUserAction(fn) {
			if ($.inArray(fn, onCollapseOnUserActionFns) == -1)
				onCollapseOnUserActionFns.push(fn);
			return this;
		}


		function removeAllEventHandlers() {
			keyPressFns = [];
			onCloseOnUserAction = [];
			onCollapseOnUserActionFns = [];
		}


		function helpUrl(url) {
			helpLinkUrl = url;
			if ($displayDiv)
				$displayDiv.find('.' + elProps.helpLink['class']).attr('href', url);
			return this;
		}


		function append(htmlOrJqueryObj) {
			$buffer.append(htmlOrJqueryObj);
			return this;
		}


		function appendText(text) {
			$buffer.append(document.createTextNode(text));
			return this;
		}


		// private fn
		function clearBuffer() {
			$buffer = $('<div/>');
		}


		function write() {
			if ($displayDiv) {
				$displayDiv.append($buffer.contents());
				clearBuffer();
			}
			return this;
		}


		function appendWrite(htmlOrJqueryObj) {
			append(htmlOrJqueryObj);
			if ($displayDiv)
				write();
			return this;
		}


		function appendTextWrite(text) {
			append(document.createTextNode(text));
			if ($displayDiv)
				write();
			return this;
		}


		function clear() {
			clearBuffer();
			if ($displayDiv) {
				makeInnerDivResizable(false);
				$displayDiv.html('');
				addTheFloatingMenu();
				scrollTo(0);
				makeInnerDivResizable();
			}
			return this;
		} // clear


		function find(jQSelector) {
			if (!$displayDiv)
				return $([]);
			write();
			return $displayDiv.find(jQSelector);
		}


		function focus(elOrSelector) {
			if (!$displayDiv)
				return this;
			if (typeof elOrSelector != 'undefined') {
				var $el;
				if (typeof elOrSelector == 'string')
					$el = find(elOrSelector);
				else // assume an HTML DOM node or a jQuery collection
					$el = $(elOrSelector);
				var scroll = $(window).scrollTop();
				$el.focus();
				$(window).scrollTop(scroll); // focus() causes IE to scroll to top of page
			}
			return this;
		} // focus


		// to: y-coordinate, jQuery selector (string), or html node or jQuery object
		// focusEl: true - focus the element (if 1st agr is not just a y-coordinate)
		function scrollTo(to, focusEl) {
			if (!$displayDiv)
				return this;
			var $el;
			if (typeof to == 'number') {
				$displayDiv.scrollTop(to);
			}
			else {
				if (typeof to == 'string')
					$el = find(to);
				else // assume to is an HTML node or a jQuery collection
					$el = $(to);
				if ($el[0]) {
					if (focusEl)
						focus($el);
					$displayDiv.scrollTop($displayDiv.scrollTop() + $el.position().top)
				}
			}

			return this;
		} // scrollTo


		return {
			show: show,
			remove: remove,
			isShown: isShown,
			expand: expand,
			collapse: collapse,
			expandCollapse: expandCollapse,
			keypress: keypress,
			helpUrl: helpUrl,
			onCloseOnUserAction: onCloseOnUserAction,
			onCollapseOnUserAction: onCollapseOnUserAction,
			removeAllEventHandlers: removeAllEventHandlers,
			config: config,
			clear: clear,
			append: append,
			appendText: appendText,
			write: write, // flushes the append/appendText buffer
			appendWrite: appendWrite, // flushes the append/appendText buffer
			appendTextWrite: appendTextWrite, // flushes the append/appendText buffer
			focus: focus,
			scrollTo: scrollTo,
			find: find, // Searches for and returns a jQuery collection. Flushes the append/appendText buffer
			focusTextbox1: focusTextbox1
		}
	}; // createDisplay

};


if (!mediaWiki.libs.msgDisplay.displays) {
	mediaWiki.libs.msgDisplay.displays = {};
	if (!$.ui || !$.ui.resizable)
		mw.loader.load('jquery.ui.resizable');
}

mediaWiki.libs.msgDisplay.version = 1000;

/*
 * wikiParserV.js
 * ver. 2013-11-02
 * Home: http://en.wikipedia.org/wiki/User:V111P/js/wikiParserV
 *
 * This is a library of useful functions, mostly for working with wiki code.
 * Includes functions for removing html tags.
 *
 * You can use the code in this script under the
 * Creative Commons Attribution 3.0 Unported License (CC-BY 3.0)
 * http://creativecommons.org/licenses/by/3.0/
 * If you do use it, please let me know. Thanks.
 */

mediaWiki.libs.wikiParserV = window.wikiParser = (function () {
	"use strict";

	var version = 1000;
	var re = {
		escForRegExpG: /[.*+?^$|()[\]{\\^$]/g,
		testRe: /<(?!\/?(a|b)>)/g,
		nonAlphanumericAndHyphenCharsG: /[^A-Za-z0-9_-]/g,
		htmlCommentsG: /(\n)?<!--[\S\s]*?-->\1?/g // replace it with $1
	};
	var locale = {};  // used in removeElements()
	var $tempDiv = $('<div/>'); // used in unescapeCharEntities()
	var wgScriptPath;
	var sectionNameUriEncodingAdditionalReplacements;


	function unescapeCharEntities(str) {
		return $tempDiv.html(str.replace('<', '&lt;').replace('>', '&gt;')).text();
	}


	function formatUrl(article, noredir, edit) {
		wgScriptPath = mw.config.get('wgScriptPath');
		article = article.replace(/ /g, '_');
		var pagePlusHash = article.match(/(.+)#(.+)/);
		if (pagePlusHash)
			article = encodeURIComponent(pagePlusHash[1]) + '#'
				+ encodeURIComponent(pagePlusHash[2]).replace(/%/g, '.');
		if (noredir)
			return wgScriptPath + '/index.php?title=' + article + '&redirect=no';
		else if (edit)
			return wgScriptPath + '/index.php?title='
			       + article.replace(/#.*/, '') + '&action=edit';
		else
			return '/wiki/' + article;
	} // formatUrl


	function encodeSectionNameForUrl(str) {
		var res = sectionNameUriEncodingAdditionalReplacements
			|| (sectionNameUriEncodingAdditionalReplacements = [
				{re: /~/g,  newVal: '.7E'},
				{re: /!/g,  newVal: '.21'},
				{re: /\*/g, newVal: '.2A'},
				{re: /\(/g, newVal: '.28'},
				{re: /\)/g,  newVal: '.29'},
				{re: /\'/g, newVal: '.27'},
				{re:/%3A/g, newVal: ':'}
			]);

		var str = encodeURIComponent(str.replace(/ /g, '_'));
		$.each(res, function (i, val) {
			str = str.replace(val.re, val.newVal);
		});

		return str.replace(/%/g, '.');
	} // encodeSectionNameForUrl


	function encodeSectionNameForId(str) {
		str = encodeSectionNameForUrl(str.replace(/\./g, '_46'))
		.replace(/:/, '_3A')
		.replace(re.nonAlphanumericAndHyphenCharsG, '_');
		return str;
	} // encodeSectionNameForId


	function escapeForRegExp(str) {
		return str.replace(re.escForRegExpG, '\\$&');
	} // escapeForRegExp


	// pretreat for embeded elements with the same closing tag
	function removeElRegExp(startTag, endTag, startTagOfEmbededEl) {
		var res = {pretreat: null, main: null};
		var startTagEsc = escapeForRegExp(startTag)
			.replace(/<<</g, '(').replace(/@@@/g, '|').replace(/>>>/g, ')');
		var endTagEsc = escapeForRegExp(endTag);
		if (startTagOfEmbededEl) {
			var startTagOfEmbededElEsc = escapeForRegExp(startTagOfEmbededEl);
			res.pretreat = new RegExp('(' + startTagEsc + '(?:(?!' + endTagEsc + ')[\\S\\s])*?)'
			  + startTagOfEmbededElEsc + '(?:(?!' +  startTagOfEmbededElEsc + ')[\\S\\s])*?'
			  + endTagEsc, 'gi');
		}
		res.main = new RegExp('(\\n)?' + startTagEsc + '((?!' + startTagEsc + '|' + endTagEsc + ')[\\S\\s])*'
		           + endTagEsc + '\\1?', 'gi');
		return res;
	} // removeElRegExp


	// startTagOfEmbededEl - needed because for example files and wiki links have the same
	// closing tags, so to remove files, pass '[[File:' as startTag and '[[' as startTagOfEmbededEl
	function removeElRegExpStartArr(startTagPre, startTagArr, startTagPost,
									endTag, startTagOfEmbededEl) {
		var st = startTagPre + '<<<' + startTagArr.join('@@@') + '>>>' + startTagPost;
		return removeElRegExp(st, endTag, startTagOfEmbededEl);
	} // removeElRegExpStartArr


	function removeEls(data, res, iterationLimit) {
		var prev, cntr;
		iterationLimit = iterationLimit || 1000;
		if (res.pretreat) {
			cntr = iterationLimit;
			do {
				cntr--; // anti infinite-loop var just in case...
				prev = data;
				data = data.replace(res.pretreat, '$1');
			} while (data != prev && cntr > 0);
		}
		cntr = iterationLimit;
		do {
			cntr--;
			prev = data;
			data = data.replace(res.main, '$1');
		} while (data != prev && cntr > 0);
		return data;
	} // removeEls


	// saves all versions of some namespace names
	function saveNsNames() {
		locale.specialNsArr = [];
		locale.fileNsArr = [];
		locale.categoryNsArr = [];
		$.each(mw.config.get('wgNamespaceIds'), function (key, val) {
			if (val == '-1') { // 'special'
				if ($.inArray(key, locale.specialNsArr) == -1)
					locale.specialNsArr.push(key);
			}
			else if (val == '6' || val == '-2')  { // 'file'/'image' or 'media'
				if ($.inArray(key, locale.fileNsArr) == -1)
					locale.fileNsArr.push(key);
			}
			else if (val == '14') { // 'category'
				if ($.inArray(key, locale.categoryNsArr) == -1)
					locale.categoryNsArr.push(key);
			}
		});
	} // saveNsNames


	// won't work in all cases
	function escCharsForNowikiTags(data) {
		var nowikiCharTranslMap = {
			'[': '&#91;', ']': '&#93;', '{': '&#123;', '}': '&#125;',
			'<': '&lt;', '>': '&gt;', ':': '&#58;', '*': '&#42;', '#': '&#35;'
		};

		//en.wikipedia.org/wiki/Help:Nowiki#WP:NOWIKI

		var singleCharEscReG = re.singleCharEscG
			|| (re.singleCharEscG = /(.|^)(?:nowiki ?\/|nowiki><\/nowiki)>(.)/g);
		data = data.replace(singleCharEscReG, function (m, $1, $2) {
			if ($1 == '<') return '&lt;' + $2;
			else if (nowikiCharTranslMap[$2]) return $1 + nowikiCharTranslMap[$2];
			else if (nowikiCharTranslMap[$1]) return nowikiCharTranslMap[$1] + $2;
		});

		var noWikiElReG = re.noWikiElG || (re.noWikiElG = /<(nowiki|pre)>([\S\s]*?)<\/\1>/g);
		var noWikiReplaceCharsReG = re.noWikiReplG || (re.noWikiReplG = /\[|]|\{|}|<|>|:|\*|#/g);
		data = data.replace(noWikiElReG, function (match, $1, $2) {
			return $2.replace(noWikiReplaceCharsReG, function (match) {
				return nowikiCharTranslMap[$2];
		})});

		return data;
	} // escCharsForNowikiTags


	function removeElements(data, elStr) {
		var arr = elStr.split(', ');

		if ($.inArray('comments', arr) > -1)
			data = data.replace(re.htmlCommentsG, '$1');
		if ($.inArray('tables', arr) > -1) {
			data = removeEls(data, re.wikiTable
				|| (re.wikiTable = removeElRegExp('{|', '|}')));
			data = removeEls(data, re.htmlTable
				|| (re.htmlTable = removeElRegExp('<table', '</table>')));
		}
		if ($.inArray('templates', arr) > -1)
			data = removeEls(data, re.templates
				|| (re.templates = removeElRegExp('{{', '}}') ));
		if ($.inArray('references', arr) > -1)
			data = data.replace(re.refs
				|| (re.refs = /<ref[^>]*?(\/>|>[\S\s]*?<\/ref\s*>)/ig), '');
		if ($.inArray('files', arr) > -1) {
			if (!locale.fileNsArr)
				saveNsNames();
			data = removeEls(data, re.files
				|| (re.files = removeElRegExpStartArr('[[', locale.fileNsArr, ':', ']]', '[[')));
			data = data.replace(re.gallery
				|| (re.gallery = /(\n)?<gallery[^>]*>[\S\s]*?<\/gallery>\1?/gi), '$1');
		}
		if ($.inArray('categories', arr) > -1) {
			if (!locale.categoryNsArr)
				saveNsNames();
			data = removeEls(data, re.category
				|| (re.category = removeElRegExpStartArr('[[', locale.categoryNsArr, ':', ']]')));
		}
		if ($.inArray('bold/italic', arr) > -1) {
			data = data.replace(re.boldItalicG
				|| (re.boldItalicG = /<\/?(i|b|strong|em)>|'''?|(&#39;){2,3}/gi), '');
		}
		if ($.inArray('behavior switches', arr) > -1) {
			data = data.replace(re.behaviorSwitchesG
				|| (re.behaviorSwitchesG = /(\n)?__[^\s]+?__\1?/g), '$1');
		}
		if ($.inArray('others', arr) > -1) {
			data = data.replace(re.timelineG
				|| (re.timelineG = /(\n)?<timeline>[\S\s]*?<\/timeline>\1?/gi), '$1');
		}

		return data;
	} // removeElements;


	// all files ([[File:...]]) must be removed BEFORE calling this function
	function unlink(data) {
		// remove all wikilinks and files
		var prev, cntr = 1000;
		var remAddrReG = re.remAddrG || (re.remAddr = /\[\[[^|\]]*\|/g);
		var unlinkLinksReG = re.unlinkLinksReG || (re.unlinkLinksReG = /\[\[([^\]\[]+)\]\]/g);
		do {
			cntr--;
			prev = data;
			// remove addresses from all links:
			data = data.replace(remAddrReG, '[[');
		} while (data != prev && cntr > 0);

		// unlink all links:
		data = data.replace(unlinkLinksReG, '$1');
		return data;
	} // unlink


	function boldAndItalicToHtml(data) {
		if (!re.boldAndItalicToHtml1) {
			// the first regex removes four, six, or more apostrophes
			re.boldAndItalicToHtml1 = /(^|[^'])''''('{2,})?([^']|$)/g;
			re.boldAndItalicToHtml2 = /'''([^'\n][^\n]*?)('''|\n)/g;
			re.boldAndItalicToHtml3 = /''([^\n]+?)(''|\n)/g;
		}

		return data.replace(re.boldAndItalicToHtml1, '')
			.replace(re.boldAndItalicToHtml2, '<b>$1</b>')
			.replace(re.boldAndItalicToHtml3, '<i>$1</i>');
	} // boldAndItalicToHtml


	function beforeTheFirstSection(data, removeCategories) {
		var tempArr;
		// keep only the text before the start of the first section title
		// (section titles starts with = on a new line).
		// If there are no sections, remove the categories
		var beforeFirstSectRe = re.beforeFirstSect
			|| (re.beforeFirstSect = /^([\S\s]*?)(?=(\n(=+).+?\3[^\S\n]*)(\n|$))/);
		var newData = (tempArr = beforeFirstSectRe.exec(data)) && tempArr[1];
		return newData || (removeCategories ? removeElements(data, 'categories') : data);
	} // beforeTheFirstSection


	function divideSections(data) {
		var sections = [];
		sections.push({
			eq: '',
			level: 0,
			heading: '',
			contents: beforeTheFirstSection(data, false)
		});
		var match;
		var regex = re.divSectionsG || 
			(re.divSectionsG = /(^|\n)(=+)(.+?)\2[^\S\n]*(?=\n)([\S\s]*?)(?=\n(=+).+?\5[^\S\n]*(?:\n|$)|$)/g);
		var cntr = 1000;
	    while ((match = regex.exec(data)) && cntr > 0) {
			cntr--;
	        sections.push({
				eq: match[2],
				level: match[2].length,
				heading: $.trim(match[3]),
				contents: $.trim(match[4])
			});
		}

		return sections;
	} // divideSections


	function checkRegexSupport() {
		return ('<a><bd</e></b>'.replace(re.testRe, '&lt;') == '<a>&lt;bd&lt;/e></b>');
	}


	// removes html tags and some whole elements, except
	// for the tags in the comma+space-separated whiteListTagsStr list
	// Removes all the attributes from the white-listed tags tags.
	// Converts < before a whitespace character into &lt;
	function sanitizeHtml(data, whiteListTagsStr, leaveSpecialChars) {

		if (!checkRegexSupport())
			throw 1; // no (lookahead) regex support

		var whiteList = (whiteListTagsStr || '').split(', ').join('|');
		var commentReG = re.htmlCommentG || (re.htmlCommentG = /<!--[\S\s]*?-->/g);
		var nonWhiteListedTagsReG, allTagsG;
		var lessThanNotBeforeWLTagG;
		var grThanNotAndAfterWLTagG;
		var tagAttributesReG;
		var oldData, cntr;

		if (whiteList !== '') {
			var byAll = re.resByWhitelist = (re.resByWhitelist || {});
			var by = byAll[whiteListTagsStr] || (byAll[whiteListTagsStr] = {});

			nonWhiteListedTagsReG = by.nonWhiteListedTagsG
				|| (by.nonWhiteListedTagsG = new RegExp('<(?!/?(' + whiteList + ')(\\b|/))[^>]*>', 'gi'));
			lessThanNotBeforeWLTagG = by.lessThanNotBeforeWLTagG
				|| (by.lessThanNotBeforeWLTagG = new RegExp('<(?!/?(' + whiteList + ')/?>)', 'gi'));
			grThanNotAndAfterWLTagG = by.grThanNotAndAfterWLTagG
				|| (by.grThanNotAndAfterWLTagG = new RegExp('(</?(' + whiteList + ')/?)?>', 'gi'));
			tagAttributesReG = re.tagAttributesG
				|| (re.tagAttributesG = /<(\/?[a-z][a-z0-9]*)[^>]*?(\/)?>/gi);
		}
		else
			allTagsG = re.allTagsG || (re.allTagsG = /<(\b|\/)[^>]*>/g);

		cntr = 1000;
		do {
			oldData = data;
			cntr--;
			// remove comments:
			data = data.replace(re.htmlCommentsG, '$1');
			// remove all tags except the white-listed ones
			if (whiteList !== '') {
				data = data.replace(nonWhiteListedTagsReG, '');													
				// remove all attributes from the remaining tags:
				data = data.replace(tagAttributesReG, '<$1$2>');
			}
			else
				data = data.replace(allTagsG, '');
		} while (oldData != data && cntr > 0);
		if (cntr <= 0) throw 2;
		if (!leaveSpecialChars) {
			var ampNotInCharRefReG = re.ampReG || (re.ampReG = /&(?!#?[xX]?[a-zA-Z0-9]+;)/g);
			var ltReG = /</g;
			var gtReG = />/g;
			var quoteReG = /"/g;
			var aposReG = /'/g;
			var graveReG = /`/g;
			cntr = 1000;
			do {
				oldData = data;
				cntr--;
				if (whiteList !== '') {
					// html-escape all < and > except if part of a whitelisted tag
					data = data.replace(lessThanNotBeforeWLTagG, '&lt;');
					data = data.replace(grThanNotAndAfterWLTagG, function ($0, $1) {
						return $1 ? $0 : '&gt;';
					});
				}
				else { // html-escape all < and > chars
					data = data.replace(ltReG, '&lt;').replace(gtReG, '&gt;');
				}
				// escape & to &amp; if obviously not a part of a char ref:
				data = data.replace(ampNotInCharRefReG, '&amp;');
				// escape all quotes (` is used in old IE)
				data = data.replace(quoteReG, '&quot;').replace(aposReG, '&#39;')
					.replace(graveReG, '&#96;');
			} while (oldData != data && cntr > 0);
			if (cntr <= 0) throw 2;
		}

		return data;
	} // sanitizeHtml


	function focusedSegment(bsa, segmentNames) {
		segmentNames = (typeof segmentNames == 'object') ? segmentNames : segmentNames.split(', ');
		for (var i = 0; i < segmentNames.length; i++) {
			if (segmentNames[i] == 'wikilink')
				return focusedCustomSegment(bsa, '[[', ']]', '', '[]<>{}');
		}
	}


	// bsa - an array with 3 elements: [text_before_the_selection/cursor, selection, text_after]
	// the other arguments - the char(s) indicating the start/end of the segment
	// otherStartChars (optional) - start chars of other segments with the same endChars,
	//    needed only for some elements, for example if startChars is [[File:,
	//    otherStartChars needs to be [[ because links can be embeded in file elements.
	// invalidBeforePipe - a string with individual illegal characters. Illigal only if before
	//    the first pipe character "|" (or anywhere, if there is no pipe character).
	function focusedCustomSegment(bsa, startChars, endChars, otherStartChars, invalidBeforePipe) {

		function endMatches(str, endChars) {
			return (str.slice(-endChars.length) === endChars);
		}

		function startMatches(str, startChars) {
			return (str.slice(0, startChars.length) === startChars);
		}

		var before = bsa[0];
		var selection = bsa[1]; // the selection
		var after = bsa[2];
		var spaces;

		if (!startChars || !endChars)
			return;

		if (selection) { // there is some selected text
			spaces = selection.match(/^\s+/);
			if (spaces) { // spaces at the beginning of the selected text
	
				if (endMatches(before, startChars)) {
					selection = startChars + selection;
					before = before.slice(0, -startChars.length);
				}
				else {
					// move the spaces to the end of the text-before-the-selection:
					before += spaces[0];
					selection = selection.slice(spaces[0].length);
					// check for startChars at beginning of selection:
					if (!startMatches(selection, startChars))
						return;
				}
			}
			else {
				// while no (complete) startChars string at beginning of selection:
				// move a char from the end of textBefore to the beginning of selection
				var startCharsFound = false;
				for (i = 0; i <= startChars.length; i++) {
					if (startMatches(selection, startChars)) {
						startCharsFound = true;
						break;
					}
					if (before.length == 0)
						break;
					selection = before.slice(before.length - 1) + selection;
					before = before.slice(0, before.length - 1);
				}
				if (!startCharsFound)
					return;

				// TODO: check if selection contains only one outer element,
				//        and the start-end chars are ballanced
			}

			spaces = selection.match(/\s+$/);
			if (spaces) { // spaces at the end of the selected text
				if (startMatches(after, endChars)) {
					selection = selection + endChars;
					after = after.slice(endChars.length);
				}
				else {
					// move spaced to the beginning of the text-after-the-selection:
					after = spaces[0] + after;
					selection = selection.slice(0, -spaces[0].length);
					if (!endMatches(selection, endChars))
						return;
				}
			}
			else {
				// while no (complete) endChars string found at end of selection:
				// move a char from the beginning of textBefore to the end of selection
				var endCharsFound = false;
				for (i = 0; i <= endChars.length; i++) {
					if (endMatches(selection, endChars)) {
						endCharsFound = true;
						break;
					}
					if (after.length == 0)
						break;
					selection = selection + after.charAt(0);
					after = after.slice(1);
				}
				if (!endCharsFound)
					return;
			}
		} // if (selection)
		else { // no text selected
			var text = before + after;
			// TODO: add a loop to allow the cursor to be after an embeded element
			var startCharsAt = text.lastIndexOf(startChars, before.length + startChars.length - 3);
			if (startCharsAt == -1)
				return;
			var closing = startCharsAt;
			var opening = startCharsAt;
			var openingOther;
			var i = 0;
			while (i++ < 10) {
				closing = text.indexOf(endChars, closing + 1);
				if (closing == -1) {
					return;
				}
				if (otherStartChars) {
					openingOther = text.indexOf(otherStartChars, opening);
				}
				opening = text.indexOf(startChars, opening + 1);
				if (opening == -1)
					opening = text.length;
				if (otherStartChars) {
					if (openingOther > -1)
						opening = (openingOther < opening ? openingOther : opening);
				}
				if (closing < opening) {
					if (closing < before.length - endChars.length) {
						return;
					}
					selection = text.slice(startCharsAt, closing + startChars.length);
					before = text.slice(0, startCharsAt);
					after = text.slice(closing + startChars.length);
					break;
				}

			}
		}

		if (invalidBeforePipe) {
			var invalidEscForRe = escapeForRegExp(invalidBeforePipe);
			var beforePipe = selection.slice(startChars.length, -endChars.length).match(/[^|]*/)[0];
			if (beforePipe.match('[' + invalidEscForRe + ']'))
				return;
		}

		return [before, selection, after];
	} // focusedSegment


	return {
		version: version,
		unescapeCharEntities: unescapeCharEntities,
		formatUrl: formatUrl,
		encodeSectionNameForUrl: encodeSectionNameForUrl,
		encodeSectionNameForId: encodeSectionNameForId,
		checkRegexSupport: checkRegexSupport,
		escCharsForNowikiTags: escCharsForNowikiTags,
		removeElRegExp: removeElRegExp,
		removeElRegExpStartArr: removeElRegExpStartArr,
		removeElements: removeElements,
		unlink: unlink,
		sanitizeHtml: sanitizeHtml,
		boldAndItalicToHtml: boldAndItalicToHtml,
		beforeTheFirstSection: beforeTheFirstSection,
		divideSections: divideSections,
		focusedCustomSegment: focusedCustomSegment, // incomplete implementation
		focusedSegment: focusedSegment // works only for wikilinks right now
	};
})();