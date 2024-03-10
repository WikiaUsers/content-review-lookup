// <nowiki>
/* Code for [[Template:Bracket]] */
(function(mw) {
	'use strict';
	var $content;

	function buttonEvent(e) {
		e.preventDefault();
		var oldOutput = $content.find('#generate-bracket-output')[0];
		if (oldOutput) {
			oldOutput.remove();
		}
		var bracket = $content.find('#generate-bracket-bracket')[0].value;
		var fields = $content.find('#generate-bracket-fields')[0].value;
		var matchfields = $content.find('#generate-bracket-matchfields')[0].value;
		if (!bracket) {
			alert('Bracket type is required!');
			return;
		}
		fields = fields ? fields : '';
		matchfields = matchfields ? matchfields : '';
		var text = '{{BracketCopyableCode|' + bracket + '|fields=' + fields + '|matchfields=' + matchfields + '}}';
		new mw.Api().get({
			action : 'parse',
			text : text,
			prop : 'text'
		}).then(function(data) {
			var str = data.parse.text['*'];
			var tbl = str.split('*****');
			str = tbl[1];
			var el = document.createElement('textarea');
			el.value = str;
			el.setAttribute('readonly', '');
			el.style.width = 'calc(100% - 250px)';
			el.style.height = '500px';
			el.id = 'generate-bracket-output';
			el.setAttribute('tabindex', '5');
			$content.find('#generate-bracket-button')[0].after(el);
			el.select();
		});
	}

	function init(content) {
		var main = content.find('#BracketFields')[0];
		if (!main) return;

		$content = content;
		main.innerHTML = '<form>' +
			'<input id="generate-bracket-bracket" type="text" placeholder="8SE" tabindex="1"> <label for="generate-bracket-bracket">Bracket type (mandatory)</label><br>' +
			'<input id="generate-bracket-fields" type="text" placeholder="team, score" tabindex="2"> <label for="generate-bracket-fields">Field list </label>(if blank will default to <code>team, score</code>)<br>' +
			'<input id="generate-bracket-matchfields" type="text" placeholder="winner" tabindex="3"> <label for="generate-bracket-matchfields">Match field list </label>(if blank will default to <code>winner</code>)<br>' +
			'<input type="submit" id="generate-bracket-button" tabindex="4" value="Generate!">' +
		'</form>';
		var button = $content.find('#generate-bracket-button')[0];
		button.addEventListener('click', buttonEvent);
	}
	mw.loader.using('mediawiki.api').then(function() {
		mw.hook('wikipage.content').add(init);
	});
})(window.mediaWiki);
// </nowiki>