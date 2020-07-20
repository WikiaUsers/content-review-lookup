function loadMissingPagesConfig(callback) {
	$.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Custom-MissingPagesManager.json&rvprop=content&indexpageids&format=json',function(res) {
		callback(JSON.parse(res.query.pages[res.query.pageids[0]].revisions[0]['*']));
	});
}

function showMissingPagesNotice(configObj) {
	var missingPage = configObj.filter(function(item) {
		return item.name == wgPageName || item.name == wgTitle;
	});
	if(!!missingPage.length) {
		missingPage = missingPage[0];
		parseTemplate(missingPage,function(text) {
			mw.util.$content.find('> .noarticletext').html(text);
      	});
	}
}

function parseTemplate(missingPage,callback) {
	var template = '\
		{{MissingPageNotice\
		|Notice=' + missingPage.notice + '\
		|Vorlage=' + missingPage.template + '\
		}}';
	$.getJSON('/api.php?action=parse&text=' + template + '&title=' + wgPageName + '&format=json',function(res) {
		callback(res.parse.text['*']);
	});
}

function replaceNewClass(configObj) {
	configObj.forEach(function(item) {
		$('.WikiaMainContent a.new').each(function() {
			if($(this).text() == item.name) {
				$('.WikiaMainContent a.new').removeClass('new').addClass('newwithconfig');
			}
		});
	});
}

if(!!mw.util.$content.find('> .noarticletext').length) {
	loadMissingPagesConfig(showMissingPagesNotice.bind(this));
}

if(!!$('.WikiaMainContent a.new').length) {
	loadMissingPagesConfig(replaceNewClass.bind(this));
}