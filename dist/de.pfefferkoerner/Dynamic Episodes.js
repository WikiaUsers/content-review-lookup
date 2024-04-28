var fields = {
	title: 'Episodentitel',
	sequential_number: 'Episodennummer',
	season: 'Staffel',
	//premiere: 'Erstausstrahlung',
	image: 'Bild',
	writer: 'Drehbuch',
	director: 'Regie',
	topic: 'Thema',
	gang: 'Bandennummer',
	previous: 'vorherige',
	next: 'nächste',
};
//Optionale Parameter: "Arbeitstitel", "Bildunterschrift", "Drehbuchtitel", "Gastrolle", "Bildgröße", "Orte", "Episodenhauptcharakter"

function parseWikitext(text) {
	return apiCall({
		action: 'parse',
		prop: 'text',
		text: text,
		formatversion: 2,
		contentmodel: 'wikitext',
		disablelimitreport: 1
	}, function(res) {
		return res.parse.text;
	});
}

function apiCall(options, callback, method) {
	return new Promise(function(resolve, reject) {
		return (new mw.Api())
			[typeof method === 'undefined' ? 'get' : method.toLowerCase()](options)
			.then(callback)
			.then(resolve)
			.catch(reject);
	});
}

function parsePage(page, prop, contentmodel) {
	return apiCall({
		action: 'parse',
		prop: typeof prop === 'undefined' ? 'text' : prop,
		page: page,
		formatversion: 2,
		contentmodel: typeof contentmodel === 'undefined' ? 'wikitext' : contentmodel,
		disablelimitreport: 1
	}, function(res) {
		return res.parse[prop];
	});
}

function postPage(page, text, summary) {
	return apiCall({
		action: 'edit',
		text: text,
		title: page,
		token: mw.user.tokens.get('csrfToken'),
		summary: typeof summary === 'undefined' ? 'Edited page via MediaWiki API' : summary,
		//tags: 'apiedit',
		nocreate: 1,
	}, function(res) {
		return res.parse[prop];
	}, 'post');
}

function loadEpisodeArticle(input, fieldset) {
	var parser = new DOMParser();
	Promise.all(Object.entries(fields).map(function(field) {
		return parseWikitext('{{#dpl:title=' + input.value + '|include={Infobox Episode}:' + field[1] + '}}').then(function(res) {
			var htmlDoc = parser.parseFromString(res, 'text/html');
			var el = htmlDoc.querySelector('.mw-parser-output > p');
			var value = null;
			if (el !== null) {
				value = el.textContent.trim();
			}
			return [ field[0], value ];
		});
	})).then(function(res) {
		fieldset.append(document.createTextNode(JSON.stringify(Object.fromEntries(res), null, '\t')));
		console.log('done');
	});
}

function renderDynamicEpisodeForm() {
	mw.loader.using(["oojs-ui-core", "oojs-ui-windows"], function() {
		var fieldset = new OO.ui.FieldsetLayout( { 
			//label: 'FieldsetLayout with an action field layout'
		} );
		var input = new OO.ui.TextInputWidget( {
				placeholder: 'Article name'
		} );
		var btn = new OO.ui.ButtonWidget( {
						label: 'Add',
						flags: [
								'primary',
								'progressive'
						]
				} );
		btn.on('click', loadEpisodeArticle.bind(window, input, fieldset.$element));
	
		// Add an action field layout: 
		fieldset.addItems( [ 
			new OO.ui.ActionFieldLayout(
				input,
				btn,
				{
						label: 'Enter name of episode page',
						align: 'top'
				}
			)
		] );
		// Example: Creating and opening a message dialog window.
		var messageDialog = new OO.ui.MessageDialog();
		
		// Create and append a window manager.
		var windowManager = new OO.ui.WindowManager();
		$( 'body' ).append( windowManager.$element );
		
		// Add the dialog to the window manager.
		windowManager.addWindows( [ messageDialog ] );
		
		// Configure the message dialog when it is opened with the window manager's openWindow() method.
		windowManager.openWindow( messageDialog, {
		  title: 'Basic message dialog',
		  message: fieldset.$element
		} );
	});
}

function loadBroadcastDateTable(input, fieldset, messageDialog) {
	var table = document.createElement('table');
	table.classList.add('wikitable');
	var tbody = document.createElement('tbody');
	var headerRow = document.createElement('tr');
	headerRow.append(
		Object.assign(document.createElement('th'), { textContent: 'datetime' }),
		Object.assign(document.createElement('th'), { textContent: 'channel' }),
		Object.assign(document.createElement('th'), { textContent: 'is_premiere' }),
		Object.assign(document.createElement('th'), { textContent: 'type' })
	);
	tbody.append(headerRow);
	table.append(tbody);
	fieldset.append(table);
	fieldset.append(table);
	parsePage('MediaWiki:Custom-Episodes.json', 'wikitext', 'json').then(function(json) { return JSON.parse(json); }).then(function(episodes) {
		var episodeIndex = episodes.findIndex(function(episode) { return episode.title === input.value; });
		var episodeData = episodes[episodeIndex];
		if (typeof episodeData !== 'undefined' && typeof episodeData.broadcasts !== 'undefined') {
			for (var i in episodeData.broadcasts) {
				var broadcast = episodeData.broadcasts[i];
				tbody.append(renderBroadcastDateRow(
					broadcast.type === 'live' ? broadcast.datetime : broadcast.end_datetime,
					broadcast.channel,
					broadcast.is_premiere,
					broadcast.type
				));
			}
		}
		tbody.append(renderBroadcastDateRow());
		var submitButton = Object.assign(document.createElement('button'), { textContent: 'Submit' });
		submitButton.classList.add('wds-button');
		submitButton.addEventListener('click', function() {
			var broadcastData = Array.from(table.querySelector('tbody').children).slice(1).reduce(function(carry, row) {
				var result = {
					channel: row.querySelector('td:nth-child(2) input').value,
					is_premiere: row.querySelector('td:nth-child(3) input').selected,
					type: row.querySelector('td:nth-child(4) select').value
				};
				var dateSelectValue = row.querySelector('td:first-child input').value;
				if (dateSelectValue === '' || result.channel === '') {
					return carry;
				}
				result[result.type === 'live' ? 'datetime' : 'end_datetime'] = row.querySelector('td:first-child input').value + ':00+01:00';
				carry.push(result);
				return carry;
			}, []);
			console.log('broadcastData', broadcastData);
			episodeData.broadcasts = broadcastData;
			episodes[episodeIndex] = episodeData;
			console.log('send data', episodes);
			postPage('MediaWiki:Custom-Episodes.json', JSON.stringify(episodes, null, '\t'), '/* ' + input.value + ': Add broadcast dates */');
			messageDialog.close();
		});
		fieldset.append(submitButton);
	});
}

function renderBroadcastDateRow(dateTimeString, channel, isPremiere, type) {
	var bodyRow = document.createElement('tr');
	var datetimeRow = document.createElement('td');
	if (typeof dateTimeString !== 'undefined') {
		var date = new Date(dateTimeString);
		formatter = Intl.DateTimeFormat('sv-SE', { // sv-SE is a workaround (see https://stackoverflow.com/questions/25050034/get-iso-8601-using-intl-datetimeformat)
			dateStyle: 'short',
			timeStyle: 'short'
		});
		dateTimeString = formatter.format(date);
	}
	datetimeRow.append(Object.assign(document.createElement('input'), {
		type: 'datetime-local',
		value: dateTimeString
	}));
	var channelRow = document.createElement('td');
	channelRow.append(Object.assign(document.createElement('input'), {
		type: 'text',
		value: typeof channel === 'undefined' ? '' : channel
	}));
	var premiereRow = document.createElement('td');
	premiereRow.append(Object.assign(document.createElement('input'), {
		type: 'checkbox',
		checked: typeof isPremiere === 'undefined' ? false : isPremiere
	}));
	var typeRow = document.createElement('td');
	var typeSelect = document.createElement('select');
	typeSelect.append(
		Object.assign(document.createElement('option'), { value: 'live', textContent: 'live', selected: typeof type === 'undefined' || type === 'live' }),
		Object.assign(document.createElement('option'), { value: 'on-demand', textContent: 'on-demand', selected: typeof type !== 'undefined' && type === 'on-demand' })
	);
	typeRow.append(typeSelect);
	bodyRow.append(
		datetimeRow,
		channelRow,
		premiereRow,
		typeRow
	);
	return bodyRow;
}

function renderBroadcastDateForm() {
		mw.loader.using(["oojs-ui-core", "oojs-ui-windows"], function() {
		var fieldset = new OO.ui.FieldsetLayout( { 
			//label: 'FieldsetLayout with an action field layout'
		} );
		var input = new OO.ui.TextInputWidget( {
				placeholder: 'Article name'
		} );
		var btn = new OO.ui.ButtonWidget( {
						label: 'Add',
						flags: [
								'primary',
								'progressive'
						]
				} );
		btn.on('click', loadBroadcastDateTable.bind(window, input, fieldset.$element, messageDialog));
	
		// Add an action field layout: 
		fieldset.addItems( [ 
			new OO.ui.ActionFieldLayout(
				input,
				btn,
				{
						label: 'Enter name of episode page',
						align: 'top'
				}
			)
		] );
		// Example: Creating and opening a message dialog window.
		var messageDialog = new OO.ui.MessageDialog();
		
		// Create and append a window manager.
		var windowManager = new OO.ui.WindowManager();
		$( 'body' ).append( windowManager.$element );
		
		// Add the dialog to the window manager.
		windowManager.addWindows( [ messageDialog ] );
		
		// Configure the message dialog when it is opened with the window manager's openWindow() method.
		windowManager.openWindow( messageDialog, {
		  title: 'Basic message dialog',
		  message: fieldset.$element,
		  size: 'large'
		} );
	});
}

function renderAddButton() {
	mw.hook('dev.wds').add(function(wds) {
		var container = document.querySelector('.page-header__actions');
		var dropdown = document.createElement('div');
		dropdown.classList.add('wds-dropdown');
		var btn = Object.assign(document.createElement('div'), {
			textContent: 'Add',
			//title: 'Episode "' + container.dataset.name + '" als ' + (episodes.has(container.dataset.name) ? 'noch nicht angesehen' : 'angesehen') + ' markieren',
			className: 'wds-dropdown__toggle wds-button wds-is-text page-header__action-button has-label'
		});
		btn.prepend(wds.icon('add-small'));
		btn.append(wds.icon('dropdown-tiny'));
		var dropdownContent = document.createElement('div');
		dropdownContent.classList.add('wds-dropdown__content', 'wds-is-not-scrollable');
		var dropdownList = document.createElement('ul');
		dropdownList.classList.add('wds-list', 'wds-is-linked');
		var addEpisodeItem = document.createElement('li');
		var addEpisodeBtn = Object.assign(document.createElement('a'), {
			textContent: 'Dynamic episodes',
		});
		addEpisodeItem.append(addEpisodeBtn);
		addEpisodeBtn.addEventListener('click', renderDynamicEpisodeForm);
		dropdownList.append(addEpisodeItem);
		var addBroadcastDateItem = document.createElement('li');
		var addBroadcastDateBtn = Object.assign(document.createElement('a'), {
			textContent: 'Broadcast dates'
		});
		addBroadcastDateItem.append(addBroadcastDateBtn);
		addBroadcastDateBtn.addEventListener('click', renderBroadcastDateForm);
		dropdownList.append(addBroadcastDateItem);
		dropdownContent.append(dropdownList);
		dropdown.append(btn);
		dropdown.append(dropdownContent);
		container.prepend(dropdown);
	});
	
	importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
}

//mw.hook("wikipage.content").add(function($content) {
//document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('page-MediaWiki_Custom-Episodes_json')) { // We are on MediaWiki:Custom-Episodes.json
    	renderAddButton();
    }
//});