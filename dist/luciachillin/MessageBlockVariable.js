mw.loader.using('mediawiki.api', function() {
	var user = mw.config.get('wgUserName');

	var message = '<div style="border: 2px solid; padding: 0.5em;">You have been blocked for <u><b>$2</b></u> for the following reason:<div style="border: 1px solid; padding: 0.5em; margin-top: 0.5em; margin-bottom: 0.5em;">$1</div>Please read the [[Project:Rules and Guidelines|Rules and Guidelines]] to have a improvement positive of the expectations within [[{{SITENAME}}]].<br/><div style="text-align: right;">Block Performed By: [[User:' + user + '|' + user + ']] <sup>([[User_talk:' + user + '|Talk]] &bull; [[Special:Contributions/' + user + '|Contributions]])</sup></div><hr/><u><b>Appeal</b></u><br/>See go [[w:c:community|Community Central]] for information on how to appeal and its process.</div>';

	window.MessageBlock = {
	    title: 'Block Notice', // Title of Mesaage, credit to Adopt Me! Wiki.
	    message: message, // Body of Message; $1 = reason, $2 = duration
	    autocheck: true
	};
});