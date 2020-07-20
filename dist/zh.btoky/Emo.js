/* main object */
window.emo = {
	data: {},
	fn: {}
};
 
/* data */
// wikis from which to check emoticons
// NOTICE! the first wikis in the array override duplicated emoticon triggers from wikis that come after them
emo.data.wikis = ["community", "es.clubpenguin"];
 
// default wiki emoticons
emo.data.def = String(mw.config.get("EMOTICONS"));
 
// update every milliseconds
emo.data.gap = 30000;
 
/* functions */
// load [[w:c:'wiki':MediaWiki:Emoticons]] and pass the reponse to 'cb'
emo.fn.loadFromWiki = function(wiki, cb) {
	$.ajax({
		url: "http://" + wiki + ".wikia.com/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=MediaWiki:Emoticons&callback=foo&cb=" + new Date().getTime(),
		dataType: "jsonp",
		jsonpCallback: "foo",
		success: function(data) {
			for (var pageid in data.query.pages) {
				cb(data.query.pages[pageid].revisions[0]["*"]);
			}
		}
	});
}
 
// load emoticons from a list of wikis
emo.fn.loadFromArr = function(arr, newEmo) {
	if (arr.length > 0) {
		emo.fn.loadFromWiki(arr.shift(), function(data) {
			newEmo += "\n\n" + data;
			emo.fn.loadFromArr(arr, newEmo);
		});
	} else {
		emo.fn.apply(emo.data.def + "\n\n" + newEmo);
	}
}
 
// implement new emoticons
emo.fn.apply = function(newEmo) {
	mw.config.set("EMOTICONS", newEmo);
}
 
// initiate
emo.fn.init = function() {
	var que = emo.data.wikis.concat(),
		newEmo = "";
	emo.fn.loadFromArr(que, newEmo);
}
 
/* apply */
// import emoticons
emo.fn.init();
 
// update again in intervals
emo.int = setInterval(
	emo.fn.init,
	emo.data.gap
);