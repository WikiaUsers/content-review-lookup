var i18n = {
	reload_confirmation : 'This will reload the page. Continue?'
}

window.purgeTitle = function(title) {
	title = title ? title : mw.config.get('wgPageName');
	return new mw.Api().postWithToken('csrf', {
		action: 'purge',
		titles : title
	});
}

window.purgeWithReload = function(title) {
	return purgeTitle(title).then(function(data) {
		location.reload();
	});
}

window.purgeWithConfirmationAndReload = function(title) {
	if (! confirm(i18n.reload_confirmation)) return $.Deferred().reject();
	return purgeWithReload(title);
}

window.purgeAll = function(pagelist, size) {
	size = size ? size : 10;
	var sectionsOfPages = [];
	for (i=0; i < pagelist.length; i+= size) {
		sectionsOfPages.push(pagelist.slice(i,i+size));
	}
	function purgeSome() {
		if (sectionsOfPages.length == 0) return $.Deferred().resolve();
		var promises = sectionsOfPages.pop().map(window.purgeTitle);
		return Promise.all(promises).then(purgeSome);
	}
	return purgeSome();
}

//*************************************
// blank editing functions
//*************************************
window.blankEdit = function(title) {
	title = title ? title : mw.config.get('wgPageName');
	return new mw.Api().postWithToken('csrf', {
		action : 'edit',
		title : title,
		appendtext : '',
	});
}

window.blankEditWithReload = function(title) {
	return blankEdit(title).then(function(data) {
		location.reload();
	});
}

window.blankEditWithConfirmationAndReload = function(title) {
	if (! confirm(i18n.reload_confirmation)) return $.Deferred().reject();
	return blankEditWithReload(title);
}

window.blankEditAll = function(pagelist, size) {
	size = size ? size : 20;
	var sectionsOfPages = [];
	for (i=0; i < pagelist.length; i+= size) {
		sectionsOfPages.push(pagelist.slice(i,i+size));
	}
	function blankEditSome() {
		if (sectionsOfPages.length == 0) return $.Deferred().resolve();
		var promises = sectionsOfPages.pop().map(window.blankEdit);
		return Promise.all(promises).then(blankEditSome);
	}
	return blankEditSome();
}

window.doesPageExist = function(title) {
	return new mw.Api().get({
		action : 'query',
		prop: 'revisions',
		titles: title,
		rvprop : 'ids'
	}).then(function(data) {
		if (data.query.pages[-1]) {
			return false;
		}
		return true;
	});
}

window.getWikitext = function(title) {
	console.log('getting wikitext');
	return new mw.Api().get({
		action : 'query',
		prop:'revisions',
		rvprop: 'content',
		rvlimit: 1,
		titles: title
	}).then(function(data) {
		console.log('got wikitext (apiUtils)');
		for (var p in data.query.pages) {
			var text = data.query.pages[p].revisions[0]['*'];
			return text;
		}
	});
}

window.savePage = function(title, text) {
	if (! title) return $.Deferred().resolve();
	return new mw.Api().postWithToken('csrf', {
		action : 'edit',
		title : title,
		text : text
	});
}