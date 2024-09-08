var dataSource = 'Staffeln/Episodes.json';
var fields = {
	title: {
		label: 'Episodentitel',
		type: 'text',
		multiple: false,
		//default: '',
	},
	sequential_number: {
		label: 'Episodennummer',
		type: 'number',
		min: 1,
		multiple: false,
		validate: function(value, data) {
			if (data.seasonal_number > value) {
				new Error('Die staffelübergreifende Episodennummer kann nicht kleiner als die staffinterne Episodennummer sein!');
			}
			return true;
		},
		asyncValidation: false,
	},
	season: {
		label: 'Staffel',
		type: 'number',
		min: 1,
		multiple: false,
	},
	//premiere: 'Erstausstrahlung',
	image: {
		label: 'Bild',
		type: 'text',
		multiple: false,
		validate: function(value, data) {
			console.log('validate image', value, data);
			if (value === null) {
				return Promise.resolve(true);
			}
			return checkExistence('File:' + value).then(function(exists) {
				if (!exists) {
					throw new Error('File "' + value + '" doesn\'t exist!');
				}
			});
		},
		asyncValidation: true,
	},
	writer: {
		label: 'Drehbuch',
		type: 'text',
		multiple: true,
	},
	director: {
		label: 'Regie',
		type: 'text',
		multiple: true,
	},
	topic: {
		label: 'Thema',
		type: 'text',
		multiple: false,
	},
	gang: {
		label: 'Bandennummer',
		type: 'number',
		min: 1,
		multiple: false,
	},
	previous: { // @todo not needed, can be calculated
		label: 'vorherige',
		type: 'text',
		multiple: false,
	},
	next: { // @todo not needed, can be calculated
		label: 'nächste',
		type: 'text',
		multiple: false,
	},
};
//Optionale Parameter: "Arbeitstitel", "Bildunterschrift", "Drehbuchtitel", "Gastrolle", "Bildgröße", "Orte", "Episodenhauptcharakter"
var dynamicEpisodesAddEpisodeFormLoadedHook = mw.hook('dynamic-episodes-add-episode-form-loaded');

function parseWikitext(text) {
	return _apiCall({
		action: 'parse',
		prop: 'text',
		text: text,
		formatversion: 2,
		contentmodel: 'wikitext',
		disablelimitreport: 1,
	}, function(res) {
		return res.parse.text;
	});
}

function _apiCall(options, callback, method) {
	return new Promise(function(resolve, reject) {
		return (new mw.Api())
			[typeof method === 'undefined' ? 'get' : method.toLowerCase()](options)
			.then(resolve)
			.catch(reject);
	})
		.then(callback)/*
		.then(resolve)
		.catch(reject)*/;/*
	return new Promise(function(resolve, reject) {
		console.log('api req', (new mw.Api())
			[typeof method === 'undefined' ? 'get' : method.toLowerCase()](options));
		return (new mw.Api())
			[typeof method === 'undefined' ? 'get' : method.toLowerCase()](options)
			.then(callback)
			.then(resolve)
			.catch(reject);
	});*/
}

function _parsePage(page, prop, contentmodel) {
	return _apiCall({
		action: 'parse',
		prop: [ typeof prop === 'undefined' ? 'text' : prop, 'revid' ],
		page: page,
		formatversion: 2,
		contentmodel: typeof contentmodel === 'undefined' ? 'wikitext' : contentmodel,
		disablelimitreport: 1
	}, function(res) {
		return [ res.parse[prop], res.parse.revid ];
	});
}

function _postPage(page, text, summary) {
	return _apiCall({
		action: 'edit',
		text: text,
		title: page,
		token: mw.user.tokens.get('csrfToken'),
		summary: typeof summary === 'undefined' ? 'Edited page via MediaWiki API' : summary,
		//tags: 'apiedit',
		tags: 'ui-edit',
		nocreate: 1,
	}, function(res) {
		if (typeof res.error !== 'undefined') {
			return [ false, 'error', res.edit.info ];
		} else if (res.edit.result === 'Success' && typeof res.edit.nochange === 'undefined' && res.edit.oldrevid < res.edit.newrevid) {
			return [ true, 'success', null ];
		} else if (typeof res.edit.nochange !== 'undefined') {
			return [ false, 'warning', 'nochange' ];
		} else if (res.edit.oldrevid >= res.edit.newrevid) {
			return [ false, 'alert', 'revision mismatch' ];
		} 
	}, 'post');
}

function checkExistence(page) {
	console.log('checkExistence', page);
	return _apiCall({
		action: 'query',
		prop: 'revisions',
		titles: page,
		rvlimit: 1,
		formatversion: 2,
	}, function(results) {
		return !results.query.pages[0].missing;
	});
}

function loadEpisodeArticle(input, fieldset, messageDialog) {
	_parsePage(dataSource, 'wikitext', 'json').then(function(res) { console.log('res?', res); return [ JSON.parse(res[0]), res[1] ]; }).then(function(parsed) {
		var episodes = parsed[0];
		var revId = parsed[1];
		var episodeIndex = episodes.findIndex(function(episode) { return episode.title === input.value; });
		var episodeData = episodes[episodeIndex];

		var parser = new DOMParser();
		Promise.all(Object.entries(fields).map(function(field) {
			var key = field[0];
			return parseWikitext('{{#dpl:title=' + input.value + '|include={Infobox Episode}:' + field[1].label + '}}').then(function(res) {
				var htmlDoc = parser.parseFromString(res, 'text/html');
				var el = htmlDoc.querySelector('.mw-parser-output > p');
				var value = null;
				if (el !== null) {
					value = el.textContent.trim();
				}
				if (typeof episodeData !== 'undefined' && typeof episodeData[key] !== 'undefined' && episodeData[key] !== null) {
					value = episodeData[key];
				}
				return [ key, value ];
			});
		})).then(function(res) {
			var from, submitButton, messageArea;
			var entries = Object.fromEntries(res);
			console.log('entries to form', entries);
			if (entries.title === 'API') {
				entries.title = input.value;
			}
			fieldset.after(form = document.createElement('form')); 
			for(var key in entries) {
				var fieldWrapper;
				var value = entries[key];
				var field = fields[key];
				form.append(fieldWrapper = Object.assign(document.createElement('div'), {
					className: 'form-field-wrapper',
				}));
				fieldWrapper.append(Object.assign(document.createElement('label'), {
					htmlFor: key,
					textContent: field.label,
				}));
				fieldWrapper.append(Object.assign(document.createElement('input'), {
					name: key,
					type: field.type,
					placeholder: field.label,
					min: field.type === 'number' && typeof field.min !== 'undefined' ? field.min : null,
					value: value,
				}));
			}
			form.append(submitButton = Object.assign(document.createElement('button'), {
				textContent: 'Submit',
				className: [ 'wds-button', 'wds-is-full-width' ].join(' '),
			}));
			form.append(messageArea = document.createElement('div'));
			submitButton.addEventListener('click', function(evt) {
				evt.preventDefault();
				_parsePage(dataSource, 'wikitext', 'json').then(function(res) { return [ JSON.parse(res[0]), res[1] ]; }).then(function(parsed) {
					var key;
					var newEpisodes = parsed[0];
					var oldRev = revId;
					var newRev = parsed[1];
					var episodeIsUnchangedInDataSource = oldRev === newRev || episodes[episodeIndex] === newEpisodes[episodeIndex];
					var formEntries = (new FormData(form)); //.entries();
					console.log(Array.from(formEntries.entries()), formData, entries);
					var formData = Object.fromEntries(formEntries.entries());
					var entries = Array.from(formEntries.entries()).reduce(function(carry, entry) {
						var key = entry[0];
						var value = entry[1];
						
						if (value === '') {
							carry[key] = null;
						} else if (fields[key].type === 'number') {
							carry[key] = parseInt(value);
						} else {
							carry[key] = value;
						}
						
						if (typeof fields[key].validate === 'function' && fields[key].asyncValidation === false) {
							try {
								console.log('validate field', key, value, carry[key], formData);
								fields[key].validate(carry[key], formData);
							} catch(error) {
								console.error(error);
								messageArea.style.color = 'var(--theme-alert-color)';
								messageArea.textContent = error;
								throw error;
							}
						} else if (typeof fields[key].validate === 'function') {
							console.log('async validation of ', key, carry[key], 'returns', fields[key].validate(carry[key], formData));
							fields[key]
								.validate(carry[key], formData)
								.catch(function(error) {
									console.error(error);
									messageArea.style.color = 'var(--theme-alert-color)';
									messageArea.textContent = error;
									throw error;
								});
						}
						
						return carry;
					}, {});
					console.log(Array.from(formEntries.entries()), formData, entries);
	
					if (episodeIndex === -1) {
						episodeData = { seasonal_number: -1, broadcasts: [] };
						for(key in fields) {
							episodeData[key] = typeof entries[key] !== 'undefined' ? entries[key] : null;
						}
						episodes.push(episodeData);
					} else {
						for(key in episodeData) {
							if (typeof entries[key] !== 'undefined') {
								episodeData[key] = entries[key];
							} else {
								console.log(key, 'with value', episodeData[key], 'doesn\'t exist in entries. Choose one of:', Object.keys(entries).join(', '), entries, fields);
							}
						}
					}
					if (episodeIsUnchangedInDataSource) {
						_postPage(dataSource, JSON.stringify(episodes, null, '\t'), '/* ' + input.value + ': Add episodes/change episode data */').then(function(res) {
							console.log('postPage', res);
							var canClose = res[0];
							var status = res[1];
							var message = res[2];
							console.log('postPage', { canClose: canClose, status: status, message: message });
							
							if (canClose) {
								messageArea.textContent = '';
								messageArea.style.color = 'initial';
								messageDialog.close();
								mw.notify( 'Saved successfully!' );
							} else {
								messageArea.style.color = 'var(--theme-' + status + '-color)';
								messageArea.textContent = message;
							}
						});
					} else {
						messageArea.style.color = 'var(--theme-alert-color)';
						messageArea.textContent = 'The episode was changed while you were editing it. Please reload the page and check these changes.';
					}
				});
			});
			//fieldset.append(document.createTextNode(JSON.stringify(Object.fromEntries(res), null, '\t')));
			console.log('done');
			messageDialog.updateSize();
		});
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
		// Example: Creating and opening a message dialog window.
		var messageDialog = new OO.ui.MessageDialog();
		var btn = new OO.ui.ButtonWidget( {
			label: 'Add',
			flags: [
					'primary',
					'progressive'
			]
		} );
		btn.on('click', loadEpisodeArticle.bind(window, input, fieldset.$element, messageDialog));
	
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
		
		dynamicEpisodesAddEpisodeFormLoadedHook.fire(input, fieldset.$element, messageDialog);
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
	_parsePage(dataSource, 'wikitext', 'json').then(function(res) { return [ JSON.parse(res[0]), res[1] ]; }).then(function(parsed) {
		var episodes = parsed[0];
		var revId = parsed[1];
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
			_parsePage(dataSource, 'wikitext', 'json').then(function(res) { return [ JSON.parse(res[0]), res[1] ]; }).then(function(parsed) {
				var newEpisodes = parsed[0];
				var oldRev = revId;
				var newRev = parsed[1];
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
				_postPage(dataSource, JSON.stringify(episodes, null, '\t'), '/* ' + input.value + ': Add broadcast dates */').then(function(res) {
					var canClose = res[0];
					var status = res[1];
					var message = res[2];
					
					if (canClose) {
						messageArea.textContent = '';
						messageArea.style.color = 'initial';
						messageDialog.close();
						mw.notify( 'Saved successfully!' );
					} else {
						messageArea.style.color = 'var(--theme-' + status + '-color)';
						messageArea.textContent = message;
					}
				});
				messageDialog.close();
				mw.notify( 'Saved successfully!' );
			});
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

function init() {
	if (document.body.classList.contains('page-Staffeln_Episodes_json')) { // We are on Staffeln/Episodes.json
    	renderAddButton();
    	
    	if (mw.util.getParamValue('jsonAction') === 'edit') {
    		renderDynamicEpisodeForm();

    		if (mw.util.getParamValue('episode') !== null) {
    			dynamicEpisodesAddEpisodeFormLoadedHook.add(function(input, fieldset, messageDialog) {
					input.value = mw.util.getParamValue('episode');
    				loadEpisodeArticle(input, fieldset, messageDialog);
    			});
    		}
    	}
    }/* else {
    	console.log('We are not on Staffeln/Episodes.json');
    }*/
}

//mw.hook("wikipage.content").add(function($content) {
mw.hook("wikipage.content").add(init);
//document.addEventListener('DOMContentLoaded', init);
//document.addEventListener('DOMContentLoaded', function() {
    //init();
//});