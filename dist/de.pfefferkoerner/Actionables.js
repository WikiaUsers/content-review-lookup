Promise.all([
	mw.loader.using([ 'mediawiki.api', 'mediawiki.Title' ]),
	new Promise(function(resolve) {
		return mw.hook('postEdit').add(resolve);
	}),
]).then(function(res) {
	var require = res[0];
	var postEdit = res[1];
	var api = new mw.Api();
	var config = mw.config.get([ 'wgPageName', 'wgCurRevisionId' ]);
	postEdit.revId = config.wgCurRevisionId;
	
	console.log('saved', config.wgPageName, postEdit);
	
	Promise.all([
		api.get({
			action: 'parse',
			prop: 'wikitext',
			page: 'MediaWiki:Custom-Actionables.json',
			formatversion: 2,
		}),
		api.get({
			action: 'parse',
			prop: [
				'categories',
				'templates',
			].join('|'),
			page: config.wgPageName,
			formatversion: 2,
		}),
	]).then(function(res) {
		var actionables = JSON.parse(res[0].parse.wikitext);
		var pageProps = res[1].parse;
		var pageTemplates = pageProps.templates.map(function(template) {
			return template.title;
		});
		var replacementValues = {
			wgCurRevisionId: postEdit.revId,
		};
		console.log('got actionables for', config.wgPageName, actionables);
		for (var i in actionables) {
			var actionable = actionables[i];
			var found = false;
			if (typeof actionable.page !== 'undefined' && (new mw.Title(actionable.page)).toString() === config.wgPageName) {
				found = true;
				execAction(actionable, postEdit, config.wgPageName, replacementValues);
			}
			if (typeof actionable.templates !== undefined) {
				var intersection = actionable.templates.filter(function(template) {
					var templateName = template;
					if (!templateName.startsWith(':')) {
						templateName = 'Template:' + template;
					}
					return pageTemplates.includes((new mw.Title(templateName)).toText());
				});
				if (intersection.length) {
					found = true;
					api.get({
						action: 'parse',
						prop: 'wikitext',
						page: 'MediaWiki:Custom-Actionables.json',
						formatversion: 2,
						disablelimitreport: 1,
						contentmodel: 'wikitext',
						text: '{{#dpl:title=' + pageName + '|include={' + intersection[0].template + '}:' + intersection[0].values.join(':') + '}}',
					}).then(function(res) {
						var templateValues = {};
						templateValues[intersection[0].values[0]] = (new DOMParser()).parseFromString(res.parse.text, 'text/html').querySelector('.mw-parser-output > p').textContent;
						execAction(actionable, postEdit, config.wgPageName, Object.assign(templateValues, replacementValues));
					});
				}
			}
			if (!found) {
				console.log('no actionable for', config.wgPageName, actionables);
			}
		}
	}).catch(function(err) {
		console.error(err);
	});
	
	function execAction(actionable, postEdit, pageName, replacementValues) {
		console.log('action', actionable, postEdit);
		var regExp = new RegExp('\\{\\{ (' +  Object.keys(replacementValues).join('|') + ') \\}\\}');
		var replacedContent = actionable.options.content.replace(regExp, function(matches, placeholderKey) {
		  return replacementValues[placeholderKey];
		});
		if (actionable.action === 'page:append') {
			console.log('append', replacedContent, 'to', actionable.options.page);
			api.postWithToken('csrf', {
				action: 'edit',
				title: actionable.options.page,
				appendtext: replacedContent,
				format: 'json',
				summary: 'Append something',
			});
		} else if (actionable.action === 'page:create') {
			console.log('create', actionable.options.page, 'with', replacedContent);
			api.postWithToken('csrf', {
				action: 'edit',
				title: actionable.options.page,
				text: replacedContent,
				createonly: true,
				format: 'json',
				summary: 'Create page',
			});
		} else {
			console.log('no action for', pageName, actionables);
		}
	}
});