mw.loader.using('mediawiki.api', function() {
	var user = mw.config.get('wgUserName');

	var message = '<div style="border: 2px solid; padding: 0.5em;">You have been blocked for <u><b>$2</b></u> for the following reason:<div style="border: 1px solid; padding: 0.5em; margin-top: 0.5em; margin-bottom: 0.5em;">$1</div>Please read the [[Adopt Me! Wiki:Rules and Guidelines|Rules and Guidelines]] to have a better understanding of the expectations within [[w:c:adoptme|Adopt Me! Wiki]].<br/><div style="text-align: right;">Block Performed By: [[User:' + user + '|' + user + ']] <sup>([[User_talk:' + user + '|Talk]] &bull; [[Special:Contributions/' + user + '|Contributions]])</sup></div><hr/><u><b>Appeal</b></u><br/>See the [[Adopt Me! Wiki:Appeal System|Appeal System]] for information on how to appeal and its process.</div>';

	window.MessageBlock = {
	    title: 'Block Notice', // Title of Mesaage
	    message: message, // Body of Message; $1 = reason, $2 = duration
	    autocheck: true
	};
});