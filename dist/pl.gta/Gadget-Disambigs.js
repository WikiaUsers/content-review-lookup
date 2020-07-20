/* Kolorowanie linków do disambigów */
/* Autor: [[wikipedia:pl:User:Beau|Beau]] */
/* Oryginalny plik 1: http://pl.wikipedia.org/wiki/MediaWiki:Gadget-lib-beau.js */
/* Oryginalny plik 2: http://pl.wikipedia.org/wiki/MediaWiki:Gadget-mark-disambigs.js */
var beau$userGroups = {};
 
if (wgUserGroups) {
	for (var i = 0; i < wgUserGroups.length; i++) {
		beau$userGroups[ wgUserGroups[i] ] = true;
	}
}
 
function beau$callAPI(query) {
	var url = wgServer + wgScriptPath + '/api.php?';
 
	for (var field in query) {
		var value = query[field];
		url += '&' + field + '=' + encodeURIComponent(value);
	}
	url += '&format=json';
	importScriptURI(url);
}
var markDisambigsGadget = {
	pageLoaded:	false,
	dataLoaded:	false,
	disambig:	{},
	uniqueLinks:	0,
	links:	0
};
 
markDisambigsGadget.request = function(clcontinue) {
	var query = {
		action:	'query',
		titles:	wgPageName,
		prop:	'categories',
		cllimit:	'max',
		gpllimit:	'max',
		generator:	'links',
		callback:	'markDisambigsGadget.processResponse'
	};
	if (clcontinue) {
		query['clcontinue'] = clcontinue;
	}
	beau$callAPI(query);
}
 
markDisambigsGadget.isDisambig = function(categories) {
	for (var key in categories) {
		if (categories[key].title == 'Kategoria:Strony ujednoznaczniające')
			return true;
	}
	return false;
}
 
markDisambigsGadget.processResponse = function(data) {
	if (! data.query)
		return;
 
	document.data = data;
	for (var pageid in data.query.pages) {
		var page = data.query.pages[pageid];
		if (page.categories && this.isDisambig(page.categories))
		{
			if (this.disambig[page.title])
				continue;
 
			this.disambig[page.title] = true;
			this.uniqueLinks++;
		}
	}
 
	if (data['query-continue'] && data['query-continue']['categories']) {
		this.request(data['query-continue']['categories']['clcontinue'])
	}
	else if (this.pageLoaded)
		this.doColor();
	else
		this.dataLoaded = true;
}
 
markDisambigsGadget.doColor = function() {
	if (! this.uniqueLinks)
		return;
 
	var links = document.getElementsByTagName('a');
	this.disambig['Wikipedia:Strona ujednoznaczniająca'] = false;
	for (var i = 0; i < links.length; i++)
	{
		var link = links[i];
 
		if (this.disambig[link.title]) {
			this.links++;
			if (link.text == 'inne znaczenia tego określenia')
				continue;
 
			if (link.parentNode && link.parentNode.className.match(/\bdisambig\b/))
				continue;
 
			link.className = 'mw-disambig';
		}
	}
}
 
 
markDisambigsGadget.init = function() {
	this.pageLoaded = true;
	if (this.dataLoaded)
		this.doColor();
}
 
if (wgNamespaceNumber >= -1 &&  !document.location.href.match(/printable=yes/)) {
 
	markDisambigsGadget.request();
	addOnloadHook(function() { markDisambigsGadget.init() });
}