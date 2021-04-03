var editBoxId = 'wpTextbox1';

mw.loader.getScript('https://unpkg.com/jquery.hotkeys@0.1.0/jquery.hotkeys.js').then(function() {
	
	addHotkey('alt+ctrl+t', function() {
		var termContext = getTermContext();
		insertText('{{Term|'+termContext+'|', '}}');
	});
	
	addHotkey('alt+ctrl+p', function() {
		var termContext = getTermContext();
		insertText('{{Plural|'+termContext+'|', '}}');
	});
	
	addHotkey('alt+ctrl+i', function() {
		var termContext = getTermContext();
		var currentPage = mw.config.get('wgTitle');
		insertText('{{Term|'+termContext+'|'+currentPage+'}}');
	});
});

function addHotkey(hotkey, handler) {
	$('#'+editBoxId).bind('keydown', hotkey, function(event) {
		handler();
		event.preventDefault(); // prevent any default browser shortcut associated with this key combination
	});
}

function getEditBox() {
	return document.getElementById(editBoxId);
}

function insertText(textBeforeCursor, textAfterCursor) {
	textBeforeCursor = textBeforeCursor || '';
	textAfterCursor = textAfterCursor || '';
	var editBox = getEditBox();
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

function getTermContext() {
	var game = getCurrentGameContext();
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
				'{{' + gameCapture + '}}',
				'{{' + gameCapture + '\\|-}}',
				'{{Term\\|' + gameCapture + '\\|',
				'{{Plural\\|' + gameCapture + '\\|',
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
function getCurrentGameContext() {
	if (!gameContextRegex) { // list of games hasn't loaded yet
		return null;
	}
	var gameMatch = getLastMatchBeforeCursor(gameContextRegex);
	if (!gameMatch) {
		return '';
	}
	var headingMatch = getLastMatchBeforeCursor(/[^=]={2,3}[^=]+={2,3}/g); // match L2 or L3 heading
	if (headingMatch && headingMatch.index > gameMatch.index) { //Effectively: L2 and L3 headings clear the game context
		return '';
	}
	var captures = gameMatch.filter(Boolean); // remove empty capture groups
	return captures[1];
}

function getLastMatchBeforeCursor(regex) {
	var editBox = getEditBox();
	var text = editBox.value.substring(0, editBox.selectionStart);
	var it = text.matchAll(regex);
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