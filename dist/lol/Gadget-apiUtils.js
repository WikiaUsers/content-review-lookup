var i18n = {
	reload_confirmation : 'This will reload the page. Continue?'
}

//*******************
// Helper
//*******************
window.pagifyAndRunAll = function(f, pagelist, size) {
	size = size ? size : 20;
	var sectionsOfPages = [];
	for (i=0; i < pagelist.length; i+= size) {
		sectionsOfPages.push(pagelist.slice(i,i+size));
	}
	function runSome() {
		if (sectionsOfPages.length == 0) return $.Deferred().resolve();
		var promises = sectionsOfPages.pop().map(f);
		return Promise.all(promises).then(runSome);
	}
	return runSome();
}

window.processParserOutput = function(text) {
	if (typeof $(text).find(".mw-parser-output")[0] === 'undefined') {
	  return $(text).find(".mw-parser-output").prevObject[0].outerHTML;
	}
	return $(text).find(".mw-parser-output")[0].outerHTML;
}

//*************************************
// purge functions
//*************************************

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
	return window.pagifyAndRunAll(window.purgeTitle, pagelist, size);
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
		nocreate : 1,
	}).then(function(data) {
		// normal case
		return $.Deferred().resolve(data);
	}, function(code, data) {
		// if the action fails because page doesn't exist, that's not actually an error
		// so in that case let's just resolve
		if (code === 'missingtitle') {
			return $.Deferred().resolve(data);
		}
		// but if it fails for another reason, then reject here too
		else {
			return $.Deferred().reject(code, data);
		}
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
	return window.pagifyAndRunAll(window.blankEdit, pagelist, size);
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


window.blankEditAndPurge = function(title) {
	var promises = [window.blankEdit(title), window.purgeTitle(title)];
	return Promise.all(promises);
}

window.blankEditAndPurgeAll = function(pagelist, size) {
	// if we don't specify a size, default to 10 rather than 20
	// since we do 2 actions per function call instead of just 1 in this call
	size = size ? size : 10;
	return window.pagifyAndRunAll(window.blankEditAndPurge, pagelist, size);
}

//*************************************
// cargo
//*************************************

window.cargoQuery = function(params) {
	params.action = 'cargoquery';
	console.log(params);
	return new mw.Api().get(params).then(function(data) {
		var ret = [];
		for (i in data.cargoquery) {
			ret.push(data.cargoquery[i].title);
		}
		console.log(data);
		return $.Deferred().resolve(ret);
	});
}