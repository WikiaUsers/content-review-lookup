/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});

var bot = require('nodemw');
var download = require('download-file');
// Pass configuration object
var client = new bot({
	protocol: 'https',           // Wikipedia now enforces HTTPS
	server: 'luciachillin.fandom.com',  // Host name of MediaWiki-powered site
	path: '',                  // Path to api.php script
	debug: false                 // Is more verbose when set to true
});

client.getPagesInNamespace(6,function(err,data) {
	// Error handling
	if (err) {
		console.error(err);
		return;
	}
	for (p of data) {
		client.getImageInfo(p.title, function(e,d) {
			if (e) {
				console.error(e);
				return;
			}
			if (d == null) {
				console.log(p.title);
				return;
			}
			var options = {
				directory: "./images/",
				filename: d.descriptionurl.replace(/^http.*?\/File:/,"")
			};
			download(d.url, options, function(err) {
				if (err) throw err;
			});
		});
	}
});