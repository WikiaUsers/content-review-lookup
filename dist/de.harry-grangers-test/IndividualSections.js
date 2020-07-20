function parsePageSections(page, sections) {
    var content = [];
    var promises = [];
    sections.forEach(function(section) {
        promises.push($.getJSON('/api.php', {
            action: 'parse',
            page: page,
            prop: 'wikitext',
            section: section,
            disablepp: 1,
            format: 'json'
        }, function(res) {
            content.push(res.parse.wikitext['*']);
        }));
    });
    $.when.apply(null, promises).done(function() {
        $.getJSON('/api.php', {
            action: 'parse',
            text: content.join('\n\n'),
            disablepp: 1,
            format: 'json'
        }, function(res) {
            mw.util.$content.html(res.parse.text['*']);
        });
    });
}

$.getJSON(mw.util.wikiScript('api'), {
	action: 'query',
	prop: 'revisions',
	rvprop: 'content',
	titles: 'MediaWiki:Custom-IndividualSections.json',
	indexpageids: 1,
	format: 'json',
}, function(res) {
	settings = JSON.parse(res.query.pages[res.query.pageids[0]].revisions[0]['*']);
	config = settings.config;

	if (
		settings.usersettings.hasOwnProperty(wgUserName) &&
		(!config.hasOwnProperty('categories') || !!_.intersection(config.categories, wgCategories).length) &&
		(!config.hasOwnProperty('namespaces') || config.namespaces.includes(wgNamespaceNumber))
	) {
		usersettings = settings.usersettings[wgUserName];
                sections = [0];
                sections = sections.concat(usersettings.sections);
		parsePageSections(wgPageName, sections);
    }
});