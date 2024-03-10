// <nowiki>
$(function() {
	if (mw.config.get('wgPageName') != 'MediaWiki:Gadget-flairs.css') return;
	
	function getPath(champion, user) {
		var a = new mw.Api();
		return a.get({
			action: 'parse',
			title: 'Main Page',
			text: '[[File:{{ci|' + champion + '|name}}Square.png|15px|link=]]',
			disablelimitreport: 1,
			disableeditsection: 1
		}).then(function(data) {
			var text = data.parse.text['*'];
			
			// regex last updated after AWS -> GCS migration
			// current expected url format:
			// https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/SonaSquare.png/revision/latest/scale-to-width-down/15?cb=20170802133553
			var re = /images\/(.+?)\/revision.*/;
			var path = text.match(re)[1];
			// path should be like 5/56/SonaSquare.png
			// we want to construct 5/56/SonaSquare.png/15px-SonaSquare.png
			var lines = [
				'a.mw-userlink[title="User:' + user + '"]:after{',
				'   content: url("/media/thumb/' + path  + '/15px-' + champion + 'Square.png");',
				'}'
			];
			return lines.join('\n');
		});
	}
	
	function printOutput(text) {
		console.log(text);
		var el = document.createElement('textarea');
		el.value = text;
		el.setAttribute('readonly', '');
		$(el).css('width','calc(100% - 250px)');
		$(el).css('height','100px');
		$(el).insertAfter('#firstHeading');
		el.select();
	}
	
	$(mw.util.addPortletLink(
	    'p-cactions',
	    'javascript:;',
	    '!Generate Flair',
	    'generate-new-flair',
	    'Generates CSS for a new champion flair',
	    null,
	    null
	)).click(function() {
		var champion = prompt('Champion');
		if (! champion) return;
		var user = prompt('User');
		if (! user) return;
		return getPath(champion, user).then(printOutput);
	});
});
// </nowiki>