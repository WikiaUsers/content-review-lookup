$.get('https://api.github.com/repos/Wikia/app/contents/extensions/wikia',function(data) {
	console.log(data.filter(function(entry) {
		return entry.type == 'dir';
    }).map(function(dir) {
		return {name: dir.name, url: dir.html_url}
    }));
});