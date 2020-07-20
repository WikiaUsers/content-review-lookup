function getEpisodes(callback) {
	$.get(mw.util.wikiScript('api'), {
		action: 'query',
		prop: 'revisions',
		titles: 'MediaWiki:Custom-List-of-Episodes',
		rvprop: 'content',
		format: 'json',
		indexpageids: true
	}, function (res) {
		var content = res.query.pages[res.query.pageids[0]].revisions[0]['*'];
		var splitted = content.split('\n');
		var episodes = {};
		splitted.forEach(function (val) {
			var resplitted = val.split('|');
			var season = resplitted[0];
			var episode = resplitted[1];
			if (!episodes.hasOwnProperty(season)) {
				episodes[season] = {};
			}
			episodes[season][episode] = resplitted[2];
		});
		callback(episodes);
	});
}
 
function redirect2Episode(episodes) {
	path = wgPageName.match(/^(\d+)[.x](\d+)/);
	if (episodes.hasOwnProperty(path[1]) && episodes[path[1]].hasOwnProperty(path[2])) {
		window.location.href = mw.util.getUrl(episodes[path[1]][path[2]]);
	}
}
if (/^(\d+)[.x](\d+)/.test(wgPageName)) {
	getEpisodes(redirect2Episode);
}