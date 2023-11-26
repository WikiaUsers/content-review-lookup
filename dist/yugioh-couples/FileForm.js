/**
 * FileForm
 * Creates an interactive form that fills out a template when uploading a file
 * @author Caburum
 * @see https://dev.fandom.com/wiki/Preact
 * @see https://dev.fandom.com/wiki/Fetch
 */

/* jshint
	esversion: 5, esnext: false,
	browser: true, jquery: true,
	latedef: true, undef: true, unused: true,
	eqeqeq: true, -W084,
	maxerr: 999999
*/
/* global mw, importArticles */

(function() {
	// Make Special:NewFiles button go to Special:Upload
	if (mw.config.get('wgCanonicalSpecialPageName') === 'Newimages') {
		$('#page-header-add-new-photo').attr('href', mw.util.getUrl('Special:Upload')).off();
	}

	// Only run on Special:Upload
	if (
		mw.config.get('wgCanonicalSpecialPageName') !== 'Upload'
		|| mw.util.getParamValue('wpForReUpload')
		|| $('#fileform').length // already initialized
		|| $('.mw-destfile-warning').length // ignore if there is a warning for now (@todo: form needs to persist through this)
	) return;

	var config,
		// Preact shorthands
		preact, h /* h('div', props) */, tags /* tags.div(props) */, useState, useEffect, useReducer;

	function shouldHide(data, state) { // hide if data.if doesn't match the current state
		return data.if && !Object.keys(data.if).every(function(key) {
			return data.if[key].includes(state[key]);
		});
	}

	function generateTemplate(params) {
		// Generate template
		var template = '{{' + config.template + '\n';
		var isFilledOut = false;
		config.form.forEach(function(param) { // so it is in the order of the config
			var value = params[param.id];
			if (
				value // not blank
				&& param.default !== value // not the default
				&& !shouldHide(param, params) // not hidden by an if
			) {
				template += '|' + param.id + ' = ' + value + '\n';
				isFilledOut = true;
			}
		});
		return isFilledOut ? (template + '}}') : '';
	}

	// Creates various input elements
	function InputElement(props) {
		function onFieldChange(e) {
			props.state.set(function(state) {
				// we need to create a new object in order to trigger a state update
				var newState = {};
				newState[props.id] = e.target.value;
				return Object.assign({}, state, newState);
			});
		}

		// Initialize state if it hasn't already
		useEffect(function() {
			if (!props.state.value[props.id]) onFieldChange({ target: {
				value: props.type === 'select' ? props.default : ''
			} });
		}, []);

		var id = 'fileform-' + props.id;
		switch (props.type) {
			// multiline input
			case 'textarea': return tags.textarea({
				id: id,
				value: props.state.value[props.id],
				onInput: onFieldChange,
				rows: 1
			});
			// plain one-line input
			case 'input': return tags.input({
				id: id,
				value: props.state.value[props.id],
				onInput: onFieldChange,
				type: 'text',
				placeholder: props.default
			});
			// dropdown with values
			case 'select': return tags.select({
				id: id,
				value: props.state.value[props.id],
				onInput: onFieldChange,
				children: Object.keys(props.options).map(function(option) {
					return tags.option({
						value: option,
						child: props.options[option],
						// selected: props.default === option // set in initial useEffect
					});
				})
			});
			// one-line input with suggested values
			case 'datalist': return preact.frag([
				tags.input({
					id: id,
					value: props.state.value[props.id],
					onInput: onFieldChange,
					list: id + '-list',
					placeholder: props.options[props.default]
				}),
				tags.datalist({
					id: id + '-list',
					children: Object.keys(props.options).map(function(option) {
						return tags.option({
							value: option,
							child: props.options[option]
						});
					})
				})
			]);
			// error
			default: return tags.div({
				class: 'error',
				child: 'Unknown type'
			});
		}
	}

	function FormElements(props) {
		useEffect(function() {
			// console.log('FileForm state change:', props.state.value);
			$('#wpUploadDescription').val(generateTemplate(props.state.value));
		}, [props.state.value]);

		return tags.div({
			id: 'fileform-fields',
			children: props.config.form.map(function(data) {
				data.state = props.state;
	
				return tags.tr({
					style: {
						display: shouldHide(data, props.state.value) ? 'none': null
					},
					children: [
						tags.td({ child: tags.label({
							for: 'fileform-' + data.id,
							child: data.label + ' '
						})}),
						tags.td({ child: h(InputElement, data)})
					]
				});
			})
		});
	}

	function Tabber(props) {
		return tags.div({
			class: 'wds-tabs__wrapper with-bottom-border',
			child: tags.ul({
				class: 'wds-tabs',
				children: props.items.map(function(item) {
					return tags.li({
						onClick: function() {
							props.state.dispatch(item.id);
						},
						class: 'wds-tabs__tab ' + (props.state.state === item.id ? 'wds-is-current' : ''),
						child: tags.div({
							class: 'wds-tabs__tab-label',
							child: tags.a({
								child: item.label,
								href: '#!' + item.id
							})
						})
					});
				})
			})
		});
	}

	// The root component of the app
	function App() {
		var fieldState = useState({});

		var previousTemplate = useState('');
		var tabberState = useReducer(function(state, newState) {
			var mwSummary = $('#mw-htmlform-description .mw-htmlform-field-HTMLTextAreaField');
			switch (newState) {
				case 'fileform':
					// When going back, tell the user that their custom changes won't be saved
					if (
						previousTemplate.value !== $('#wpUploadDescription').val().trim()
						&& !confirm('Returning to the form will overwrite your changes. Do you want to go back?')
					) return state;
					mwSummary.hide();
					break;
				case 'mw':
					previousTemplate.set(generateTemplate(fieldState.value));
					mwSummary.show();
					break;
			}
			return newState;
		}, 'fileform');

		// Generate field elements
		return tags.td({ colspan: 2, child: tags.table({ children: [
			h(Tabber, {
				items: [
					{ label: 'FileForm', id: 'fileform' },
					{ label: $('label[for="wpUploadDescription"]').text().replace(':', '').trim() || 'Summary', id: 'mw' }
				],
				state: tabberState
			}),
			tags.tr({ // for debugging
				child: 'Form state: ' + JSON.stringify(fieldState.value),
				style: { display: 'none' }
			}),
			tabberState.state === 'fileform' ? h(FormElements, {
				config: config,
				state: fieldState
			}) : null
		]})});
	}

	function init() {
		// Remove original form
		$('#mw-htmlform-description .mw-htmlform-field-HTMLTextAreaField').hide(); // summary
		$('.mw-htmlform-field-Licenses, #mw-htmlform-description tr:has(#mw-license-preview), .mw-upload-editlicenses').remove(); // license stuff

		// Add container for our form
		$('#fileform').remove();
		var container = $('<tr id="fileform"></tr>').insertAfter('#mw-htmlform-description tr:has(#wpDestFile)').get(0);
		container.innerHTML = '';
		preact.render(
			h(App),
			container
		);
	}

	var defaultConfig = {
		template: 'File',
		form: []
	};
	$.when($.Deferred(function(defer) {
		mw.hook('dev.preact').add(function(_preact) {
			// Assign to our shorthands
			preact = _preact;
			h = preact.h;
			tags = preact.tags;
			useState = preact.useState;
			useEffect = preact.useEffect;
			useReducer = preact.useReducer;

			defer.resolve();
		});
	}), $.Deferred(function(defer) {
		mw.hook('dev.fetch').add(function(fetch) {
			fetch({
				request: function(resolve, reject) {
					var page = 'MediaWiki:Gadget-FileForm/data.json';
					new mw.Api().get({
						formatversion: 2,
						action: 'query',
						prop: 'revisions',
						rvslots: 'main',
						rvprop: 'content',
						titles: page
					}).done(function (d) {
						if (d.error) reject(console.error(d.error));
						if (d.query.pages[0].missing) reject(console.error('FileForm: Config not found at ' + page));
						else try {
							var parsedConfig = JSON.parse(d.query.pages[0].revisions[0].slots.main.content);
							var config = Object.assign(defaultConfig, parsedConfig);
							if (!config.form.length) return reject(console.error('FileForm: Empty form config'));
							resolve(config);
						} catch(e) { reject(console.error('FileForm: Failed to load config: ' + e)) }
					}).fail(function(e) {
						reject(console.error(e));
					});
				},
				name: 'FileForm'
			}).then(function(_config) {
				config = _config;
				defer.resolve();
			});
		});
	})).then(init);

	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:Preact.js',
			'u:dev:MediaWiki:Fetch.js'
		]
	});
})();