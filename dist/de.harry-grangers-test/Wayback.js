function getWaybackSnapshot(callback,url,ts) {
	if(typeof url == undefined) {
		return;
	}
	waybackURL = 'http://archive.org/wayback/available?url=' + url;
	if(typeof ts != 'undefined') {
		waybackURL += '&timestamp=' + ts;
	}
	yahooURL = "https://query.yahooapis.com/v1/public/yql?format=json&q=select * from json where url='" + encodeURIComponent(waybackURL) + "'";
	$.getJSON(yahooURL,function(res) {
		callback(!!res.query.count && !!Object.keys(res.query.results.json.archived_snapshots).length ? res.query.results.json : false);
	});
}