(function() {
	var CONTEXT_LOOKBACK = 50; 
	var openCurly = '{{'; // prevents MediaWiki from doing its unwanted black magic where JS strings surrounded by {{}} are counted as transclusions
	
	registerHotkey("T", function(getContext, insertText) {
		var termContext = getTermContext(getContext);
		insertText(openCurly+'Term|'+termContext+'|', '}}');
	});
	registerHotkey("P", function(getContext, insertText) {
		var termContext = getTermContext(getContext);
		insertText(openCurly+'Plural|'+termContext+'|', '}}');
	});
	registerHotkey("I", function(getContext, insertText) {
		var termContext = getTermContext(getContext);
		var currentPage = mw.config.get('wgTitle');
		insertText(openCurly+'Term|'+termContext+'|'+currentPage+'}}');
	});
	
	// Different implementations are needed to maniplate the edit box text when WikiEditor syntax highlighting (CodeMirror) is enabled vs. disabled
	function registerHotkey(key, callbackFn) {
		// Plain text area
		$(document).ready(function() {
			$("#wpTextbox1").keydown(function(e) {
				if (e.ctrlKey && e.altKey && e.key.toUpperCase() == key) {
					callbackFn(getContextTextArea, insertTextArea);
				}
			});
		});
		
		// CodeMirror
		mw.hook('ext.CodeMirror.switch').add(function(cmEnabled, cm) {
			cm = cm && cm[0] && cm[0].CodeMirror;
			if (cm) {
				var keyMap = {};
				keyMap["Ctrl-"+"Alt-"+key] = function() {
					callbackFn(getContextCodeMirror(cm), insertTextCodeMirror(cm));
				};
				cm.addKeyMap(keyMap);
			}
		});
	}
	
	function getContextCodeMirror(cm) {
		return function(lookback) {
			var cursor = cm.getCursor();
			var lookBack = {
				line: cursor.line - lookback,  // only look back a certain number of lines, for performance
				char: 0
			};
			var text = cm.getRange(lookBack, cursor);
			return text;
		};
	}
	function insertTextCodeMirror(cm) {
		return function(textBeforeCursor, textAfterCursor) {
			var cursorPos = cm.getCursor();
			textBeforeCursor = textBeforeCursor || '';
			textAfterCursor = textAfterCursor || '';
			
			var selection = cm.getSelection();
			var replacement = textBeforeCursor + selection + textAfterCursor;
			
			cm.replaceSelection(replacement);
	
			if (selection == '') {
				cursorPos.ch = cursorPos.ch + textBeforeCursor.length;
				cm.setCursor(cursorPos);
			}
		};
	}
	
	function getContextTextArea() {
		var editBox = $("#wpTextbox1")[0];
		var text = editBox.value.substring(0, editBox.selectionStart);
		return text;
	}
	function insertTextArea(textBeforeCursor, textAfterCursor) {
		textBeforeCursor = textBeforeCursor || '';
		textAfterCursor = textAfterCursor || '';
		var editBox = $("#wpTextbox1")[0];
		var start = editBox.selectionStart;
		var end = editBox.selectionEnd;
		editBox.value = editBox.value.substring(0, start) 
			+ textBeforeCursor
			+ editBox.value.substring(start, end)
			+ textAfterCursor
			+ editBox.value.substring(end, editBox.value.length);
		editBox.selectionStart = start + textBeforeCursor.length;
		editBox.selectionEnd = end + textBeforeCursor.length;
	}
	
	function getTermContext(getContext) {
		var wikitext = getContext(CONTEXT_LOOKBACK);
		var game = getCurrentGameContext(wikitext);
		if (game === null) { // if context not loaded yet, don't infer any game
			return '';
		}
		else if (game === '') { //if context loaded but no current context exists, use "Series"
			return 'Series';
		}
		else {
			return getLatestVersion(game);
		}
	}
	
	/** CONTEXT **/
	var gameContextRegex = null;
	var gameToLatestVersion = {};
	
	(function loadGames() {
		new mw.Api().get({
			action: 'cargoquery',
			format: 'json',
			limit: 'max',
			tables: 'Games',
			fields: 'code,supersededBy',
			order_by: 'canonOrder'
		}).then(function(result) {
			gameContextRegex = '';
			var gameTokens = result.cargoquery.map(function(queryResult) {
				var game = queryResult.title;
				gameToLatestVersion[game.code] = game.supersededBy || game.code;
				var gameCapture = '(' + escapeRegExp(game.code) + ')';
				
				// Each sub-expression represents a game-based template which can be used to infer the current game context.
				return [
					openCurly + gameCapture + '}}',
					openCurly + gameCapture + '\\|-}}',
					openCurly + 'Term\\|' + gameCapture + '\\|',
					openCurly + 'Plural\\|' + gameCapture + '\\|',
				].join('|');
			});
			gameContextRegex = new RegExp(gameTokens.join('|'), 'g');
		});
	})();
	
	function escapeRegExp(string) {
	  return string.replace(/[{}.*+\-?^$()|[\]\\]/g, '\\$&');
	}
	
	/**
	 * Attemps to infer the current game that should be inserted into text by looking at the templates used before it ({{OoT}}, {{OoT|-}}, {{Term|OoT|blah}}, etc.)
	 * @returns a game code (e.g. OoT, MM, BotW), or an empty string if none found. Returns nil if games haven't been loaded yet.
	**/ 
	function getCurrentGameContext(wikitext) {
		if (!gameContextRegex) { // list of games hasn't loaded yet
			return null;
		}
		var gameMatch = getLastMatchBeforeCursor(gameContextRegex, wikitext);
		if (!gameMatch) {
			return '';
		}
		var headingMatch = getLastMatchBeforeCursor(/[^=]={2,3}[^=]+={2,3}/g, wikitext); // match L2 or L3 heading
		if (headingMatch && headingMatch.index > gameMatch.index) { //Effectively: L2 and L3 headings clear the game context
			return '';
		}
		var captures = gameMatch.filter(Boolean); // remove empty capture groups
		return captures[1];
	}
	
	function getLastMatchBeforeCursor(regex, wikitext) {
		var it = wikitext.matchAll(regex);
		var lastMatch;
		var result = it.next();
		while(!result.done) {
			lastMatch = result.value;
			result = it.next();
		}
		return lastMatch;
	}
	
	function getLatestVersion(game) {
		return gameToLatestVersion && gameToLatestVersion[game] || game;
	}
}());