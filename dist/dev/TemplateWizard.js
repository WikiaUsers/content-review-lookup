/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticles, ve */
mw.loader.using('mediawiki.api', () => {
	'use strict';

	// Double-load protection and dont load outside SE
	window.dev = window.dev || {};
	window.dev.TW = window.dev.TW || {};
	let q = new URL(location).searchParams;
	if (window.dev.TW.__LOADED || !(q.has('action','edit') || q.has('action','submit') || q.has('veaction','editsource'))) {console.log('TemplateWizard attempted to run twice or in an invalid page!'); return;}
	else {window.dev.TW.__LOADED = true;}

	// Load dependencies
	importArticles({
		articles: [
			'u:dev:MediaWiki:Modal.js',
			'u:dev:MediaWiki:TemplateWizard.css'
		]
	});
	let cm, popup, newParam,
	cfg = mw.config.values,
	api = new mw.Api();

	// Main object (Source Template Editor)
	let TW = {
	
		// Blank variables to store cached data
		templateData: null,
		templateCall: null,
		paramOrder: [],

		// Initialize the script
		init: (_, userEntry) => {
			cm = userEntry;
			
			// Script start event
			// Run on: `ctrl + alt` by default; or whatever user defined in window var
			$('.cm-editor').on('click', '.cm-mw-template-name', (event) => {
				let Cx = event.originalEvent.pageX,
					Cy =  event.originalEvent.pageY,
					offset = $(event.target).offset(),
					Ex = parseInt(offset.left)-5,
					Ey = parseInt(offset.top)-5;
				if (Cx >= Ex && Cx <= Ex+10 && Cy >= Ey && Cy <= Ey+10) { // Pencil co-ords
					let tStart = cm.view.posAtDOM(
						event.target.previousElementSibling.classList.contains('cm-matchingBracket') ?
							event.target.previousElementSibling.previousElementSibling
							: event.target.previousElementSibling
					); // start point of template opener, skip one extra for if matching brackets breaks the { pair
					let wikitext = TW.getEncased({
						str: TW.getCM().substring(tStart),
						startC: '{',
						endC: '}'
					});
					let name = wikitext.match(/^\{\{\s*([^\#<>\[\]\|\{\}]+)\s*/);
					if (!wikitext.startsWith('{{') || !name || !name[1] || name[1].trim().length===0) {console.warn('Invalid template!'); return;}
					name = name[1];
					TW.templateData = null;
					TW.templateCall = null;
					TW.paramOrder = [];
					TW.getTD(name, (data) => {
						TW.templateData = data || {
							title: name,
							params: {},
							aliases: {},
							paramOrder: [],
							format: 'inline'
						};
						TW.paramOrder = (data && data.paramOrder) ? data.paramOrder : [];
						TW.parseTemplate(wikitext, tStart);
						TW.render();
					});
					
				}
			});
			
			// Param filter event
			$(document).on('change input click', (event) => {
				if (!event.target) {return;}
				let $t = $(event.target),
					id = event.target.id;
				if (id && (
					['tw-popup-template-filter', 'template-filter-notincall'].includes(id) ||
					id.indexOf('param-toggle-') === 0
				)) {
					let inputFilter = document.querySelector('#tw-popup-template-filter').value;
					let existFilter = document.querySelector('#template-filter-notincall').checked;
					$('.tw-popup-opts .tw-popup-param-toggle-button').each((__, el) => {
						let filterOut = 0,
							param = el.closest('.tw-popup-toggle').id.replace(/^toggle-/, ''),
							toHide = $('.tw-popup-params > #'+param).add(el.closest('.tw-popup-toggle'));
						// Input filter as main filter
						if (inputFilter.length>0) {
							if (param.indexOf(inputFilter) === 0) {
								if (existFilter && el.checked) {filterOut--;}
								else if (!existFilter) {filterOut--;}
							}
						}
						else if (existFilter && el.checked) {filterOut--;}
						else if (!existFilter && inputFilter.length === 0) {filterOut--;}
						
						if (filterOut === 0) { toHide.toggleClass('tw-popup-param-filterout', true); }
						else { toHide.toggleClass('tw-popup-param-filterout', false); }
					});
				} else if ($t.hasClass('tw-popup-param-value')) {
					let param = event.target.id.replace(/^ParamVal/, '');
					TW.templateCall.params[param] = TW.templateCall.params[param] || {name: param, value: ''};
					TW.templateCall.params[param].value = event.target.value.trim() || '';
					document.querySelector('#param-toggle-'+param).checked = TW.templateCall.params[param].value.length>0;
					
					// Fix edit area size
					event.target.style.height = '1px';
					event.target.style.height = (5+event.target.scrollHeight)+'px';
				} else if ($t.hasClass('tw-popup-param-list-item') && event.type==='change') {
					let param = $t.attr('value'),
						main = $t.attr('name').replace(/^param-list-/, '');
					if (TW.templateCall && TW.templateCall.params && TW.templateCall.params[main]) {
						TW.templateCall.params[main].selected = param;
					}
				}
				// For some reason the scrolling gets a stroke if you interact when not at the top of the scrollbox
				if ($('.tw-popup-hatnote').get(0)) {$('.tw-popup-hatnote').get(0).scrollIntoView();}
			});
		},

		// Get template's templatedata
		getTD: (name, ret) => {
			// API response handler
			let apiResult = (data) => {
				let id = Object.keys(data.pages)[0];
				let Tdata = data.pages[id];
				window.dev.TW.running = false;
				if (!Tdata) {
					alert('Invalid template.');
				} else if (id === '-1'){
					alert('"Template:' + name + '" does not exist.');
					ret();
				} else if (Tdata.notemplatedata) {
					alert('"Template:' + name + '" does not have templatedata.');
					ret();
				} else {
					Tdata.paramOrder = Tdata.paramOrder || [];
					Tdata.aliases = {};
					if (Tdata.params) {
						let fillOrder = Tdata.paramOrder.length===0;
						Object.keys(Tdata.params).forEach((key) => {
							if (fillOrder) { Tdata.paramOrder.push(key); }
							if (Tdata.params[key].aliases) {
								Tdata.params[key].aliases.forEach((alias) => {
									Tdata.aliases[alias] = key;
								});
							}
						});
					}
					if (Tdata.paramOrder && Tdata.paramOrder.length>0) { TW.paramOrder = Tdata.paramOrder.concat(TW.paramOrder); }
					if (!Tdata.format) { Tdata.format = 'inline'; }
					ret(Tdata);
				}
			};

			// API call
			api.get({
				action: 'templatedata',
				titles: 'Template:' + name,
				includeMissingTitles: 1,
				format: 'json'
			}).then(apiResult);

		},

		// Render popup with templatadata and current template call's data
		render: (data) => {
			data = data || TW.templateData;
			let getContent = ()=>{
				let {toggles, params} = TW.parseParams();
				return `
					<div class="tw-popup-hatnote"><i>Generated from: <a href="${mw.util.getUrl(data.title)}">${data.title}</a> (<a href="${mw.util.getUrl(data.title)}?action=edit">edit</a>&ThinSpace;|&ThinSpace;<a href="${mw.util.getUrl(data.title)}?action=history">hist</a>)</i></div>
					<div class="tw-popup-template-description">${data.description ? (data.description[cfg.wgUserLanguage]||data.description.en) : 'No template description available.'}</div>
					<div class="tw-popup-format-text">Format: ${data.format ? data.format.replace('\n', '\\n') : 'inline'}</div>
					<div class="tw-popup-opts">
						<div class="tw-popup-template-filter">
							<input class="tw-popup-checkbox tw-popup-template-filter-input" type="checkbox" id="template-filter-notincall">
							<label class="tw-popup-checkbox tw-popup-template-filter-label" type="checkbox" for="template-filter-notincall">Hide unused</label>
						</div>
						<div class="tw-popup-template-filter oo-ui-textInputWidget oo-ui-iconElement">
							<input class="tw-popup-template-filter-input oo-ui-inputWidget-input" id="tw-popup-template-filter" type="search" placeholder="Find field">
							<span class="oo-ui-iconElement-icon oo-ui-icon-search"></span>
						</div>
						${toggles}
					</div>
					<div class="tw-popup-params">${params}</div>
				`;
			};
			if (popup) {
				popup.setContent(getContent());
				popup.show();
			} else {
				mw.hook('dev.modal').add((Modal) => {
					popup = 
					new Modal.Modal({
						title: 'Template Wizard',
						id: 'tw-popup',
						size: 'large',
						buttons: [
							{
								text:'New Parameter',
								title:'New Parameter',
								id:'tw-NewParameter',
								event: 'NewParameter'
							},
							{
								text:'Apply Changes',
								title:'Apply Changes',
								id:'tw-ApplyChanges',
								primary: true,
								event: 'ApplyChanges'
							}
						],
						events: {
							ApplyChanges: TW.applyChanges,
							NewParameter: () => {
								let content = `
									<div class="tw-popup-newparam-name">
										<label class="tw-popup-newparam-name-label">Name: </label>
										<input class="tw-popup-newparam-name-input" id="tw-popup-newparam-name">
									</div>
									<div class="tw-popup-newparam-value">
										<div><label class="tw-popup-newparam-value-label">Value:</label></div>
										<textarea class="tw-popup-newparam-value-input" id="tw-popup-newparam-value" style="height: 28px;"></textarea>
									</div>
								`;
								if (newParam) {
									newParam.setContent(content);
									popup.hide();
									newParam.show();
								} else{
									newParam = 
									new Modal.Modal({
										title: 'Add New Parameter',
										id: 'tw-popup-newparam',
										content: content,
										buttons: [
											{
												text:'Add Param',
												title:'Add Param',
												id: 'newParam-add',
												event: 'addParam'
											}
										],
										events: { addParam: ()=>{ TW.addParam() } },
										close: ()=>{ newParam.hide(); popup.show() }
									});
									newParam.create();
									popup.hide();
									newParam.show();
								}
							}
						},
						content: getContent(),
					});
					popup.create();
					popup.show();
				});
			}
		},
		
		// Helper functions
		addElement: (options) => {
			if (!options.node) {options.node = 'div';}
			let newNode;
			if (options.node !== 'text') {
				newNode = document.createElement(options.node);
				if (options.classNames) {
					options.classNames.forEach((className) => {
						if ('string' === typeof className && className.length > 0) {
							newNode.classList.add(className);
						}
					});
				}
				if (options.styles) {
					Object.keys(options.styles).forEach((key) => {
						newNode.style[key] = options.styles[key];
					});
				}
				if (options.attributes) {
					Object.keys(options.attributes).forEach((key) => {
						if (options.attributes[key] === false) {return;}
						newNode.setAttribute(key, options.attributes[key]);
					});
				}
				if (options.content) {
					if (Array.isArray(options.content) && options.content.length>0) {
						options.content.forEach((content) => {
							if ('string' === typeof content) {
								newNode.append(document.createTextNode(content));
							}else if ('object' === typeof content && content.ownerDocument) {
								newNode.append(content);
							}
						});
					} else if ('string' === typeof options.content || (options.content) instanceof String) {
						newNode.append(document.createTextNode(options.content));
					}else if ('object' === typeof options.content && options.content.ownerDocument) {
						newNode.append(options.content);
					}
				}
			} else { newNode = document.createTextNode(options.content); }

			if (options.addTo) {
				options.addTo.append(newNode);
			}
			if (!options.noreturn) {
				return newNode;
			}
		},
		listElements: (parentNode, optionsArray) => {
			let newNodes = [];
			optionsArray.forEach((options) => {
				if (parentNode) {options.addTo = parentNode;} // Append to parent node if given
				let newNode = TW.addElement(options);
				if (!parentNode && newNode) {newNodes.push(newNode);} // Include to return list if no parent node
			});
			return parentNode || newNodes;
		},
		parseParams: (_params) => {
			let
			params = [''],
			toggles = [''],
			built = {},
			order = _params;
			if (!order) {order = TW.paramOrder;}
			else if ('string' === typeof order) {order = [order];}
			order.forEach((param) => {
				if (built[param]) {return;}
				let checkbox_attr = {
					type: 'checkbox',
					id: 'param-toggle-'+param
				};
				if (TW.templateCall.params[param]) {checkbox_attr.checked = 'true';}
				let Tdata = TW.templateData.params && TW.templateData.params[param] || {};
				let toggle = [
					{
						node: 'input',
						classNames: ['tw-popup-checkbox', 'tw-popup-param-toggle-button'],
						attributes: checkbox_attr
					},
					{
						content: Tdata.label ? Tdata.label.en : param.toString(),
						node: 'label',
						classNames: ['tw-popup-checkbox', 'tw-popup-param-toggle-button-label', 'tw-popup-param-label'],
						attributes: {type: 'checkbox', 'for':  'param-toggle-'+param}
					}
				];
				let all = [ { node: 'b', content: Tdata.label ? Tdata.label.en : param.toString() } ];
				let selected = (TW.templateCall.params[param] && TW.templateCall.params[param].selected) ? TW.templateCall.params[param].selected : '';
				let param_names = [{
					content: [
						param,
						TW.addElement({
							node: 'input',
							classNames: ['tw-popup-param-list-item'],
							attributes: {
								type: 'radio',
								id: 'param-list-item-'+param,
								name: 'param-list-'+param,
								value: param,
								checked: selected === param.toString() ? 'checked' : false
							}
						})
					],
					node: 'label',
					classNames: ['tw-popup-param-list-label'],
					attributes: {'for': 'param-list-item-'+param}
				}];
				let param_desc  = [];
				let hr = false;
				if (Tdata.aliases && Tdata.aliases.length>0) {
					Tdata.aliases.forEach((alias) => {
						param_names.push({
							content: [
								alias,
								TW.addElement({
									node: 'input',
									classNames: ['tw-popup-param-list-item'],
									attributes: {
										type: 'radio',
										id: 'param-list-item-'+alias,
										name: 'param-list-'+param,
										value: alias,
										checked: selected === alias.toString() ? 'checked' : false
									}
								})
							],
							node: 'label',
							classNames: ['tw-popup-param-list-label'],
							attributes: {'for': 'param-list-item-'+alias}
						});
					});
				}
				all.push({ classNames: [ 'tw-popup-param-list' ], content: TW.listElements(null, param_names) });
				if (Tdata.description && Tdata.description.en) {
					if (!hr){param_desc.push({node: 'hr'}); hr=true;}
					param_desc.push({
						content: Tdata.description.en,
						node: 'p'
					});
				}
				if (Tdata.default && Tdata.default.en) {
					if (!hr){param_desc.push({node: 'hr'}); hr=true;}
					param_desc.push({
						content: 'Default: ' + Tdata.default.en,
						classNames: ['vetw-popup-param-default'],
						node: 'p'
					});}
				if (Tdata.example && Tdata.example.en) {
					if (!hr){param_desc.push({node: 'hr'}); hr=true;}
					param_desc.push({
						content: 'Example: ' + Tdata.example.en,
						classNames: ['tw-popup-param-example'],
						node: 'p'
					});
				}
				all.push({ classNames: [ 'tw-popup-param-description' ], content: TW.listElements(null,param_desc) });
				all.push({
					classNames: [ 'tw-popup-param-value' ],
					node: 'textarea',
					content: TW.templateCall.params[param] && TW.templateCall.params[param].value || '',
					attributes: {id: 'ParamVal'+param}
				});
				toggles.push(TW.addElement({
					classNames: [ 'tw-popup-toggle' ],
					attributes: {id: 'toggle-'+param},
					content: TW.listElements(null, toggle)
				}).outerHTML);
				params.push(TW.addElement({
					classNames: [ 'tw-popup-param' ],
					attributes: {id: param},
					content: TW.listElements(null, all)
				}).outerHTML);
				built[param] = true;
			});
			toggles = toggles.join('');
			params = params.join('');
			return {toggles, params};
		},
		parseTemplate: (str, FROM) => {
			let template,
			order = 0,
			tempParam = { value: '', start: 0 },
			S = {
				braceL: '{',
				braceR: '}',
				bracketL: '[',
				bracketR: ']',
				pipe: '|',
				tag: '<',
				excl: '!',
			},
			
			// Test if start of nest and handle it
			handleNest = (newS) => {
				let first = newS.charAt(0);
				let second = newS.charAt(1);
				let ret = '';
				// Types to handle in array for automatic parsing in loop
				let handles = [
					{   // Handle nested template
						check: (first === S.braceL && second === S.braceL),
						startC: S.braceL,
						endC: S.braceR
					},
					{   // Handle link
						check: (first === S.bracketL),
						startC: S.bracketL,
						endC: S.bracketR
					},
					{	// Handle HTML comments
						check: (first === S.tag && second === S.excl),
						startC: '<!--',
						endC: '-->'
					},
					{	// Handle HTML tag short calls
						check: (first === S.tag && (/^<[a-z][^>/]*\/>/).test(newS)),
						startR: /^<\\w+/,
						endR: /^\/>/
					},
					{	// Handle HTML tags
						check: (first === S.tag && (/^<[a-z][^>/]*>[^<]*<\/[a-z][^>/]*>/).test(newS)),
						startR: /^<\w+/,
						endR: /^<\/\w+>/
					},
				];

				// Handle specified types
				for (let h = 0; h<handles.length; h++) {
					let handle = handles[h];
					if (handle.check) {
						let encasedSettings = {
							str: newS,
							startC: handle.startC || null,
							endC: handle.endC || null,
							startR: handle.startR || null,
							endR: handle.endR || null,
						};
						ret = TW.getEncased(encasedSettings);
						break;
					}
				}
				
				return ret;
			},

			// Terminate param and initialize next
			closeParam = (end) => {
				// Ignore template name
				if (template.params === null) {template.params = {};}
				else {
					let sectioned = (/^([^=]*)(\s*=[^\n\S]*)([\s\S]*)$/).exec(tempParam.value);
					let param = {
						raw: tempParam.value, // entire param string
						start: tempParam.start, // param string start point
						end: end, // param string end point
					};
					// Terminate into parsed template
					if (sectioned && sectioned[1]) {
						param.value = sectioned[3];
						param.name = sectioned[1].trim();
					} else {
						template.unnamedCount++;
						param.value = tempParam.value;
						param.name = template.unnamedCount.toString();
					}
					param.selected = param.name;
					param.name = TW.templateData.aliases[param.name] || param.name; // Prioritize using main name, as its what paramOrder uses
					if (!template.params[param.name]) {
						// Push to order if not a dupe
						TW.paramOrder.push(param.name);
						template.paramOrder.push(param.name);
					} else if (!template.dupes || (template.dupes && !template.dupes.includes(param.selected))) {
						template.dupes = (template.dupes || []).push(param.selected); // Mark as repeated
					}
					template.params[param.name] = param; // Only keep latest version
	
					// Initialize next
					tempParam = {
						name:  '',
						value: '',
						start: 0,
						raw: ''
					};
				}
			};

			// Start parsing
			let i = 0;
			while (i < str.length) {
				let char = str.charAt(i);
				let Nchar = str.charAt(i+1);
				if (!template) {
					if (char === S.braceL && Nchar === S.braceL) {
						template = {
							name: null,
							params: null,
							paramOrder: [],
							unnamedCount: 0
						};
						i++;
						i++;
					}
				} else {
					// Get template's name
					if (!template.name) {
						if (![S.braceR, S.braceL, S.pipe].includes(char) && ![S.braceR, S.braceL, S.pipe].includes(Nchar)) {
							tempParam.value = tempParam.value + char;
							i++;
						} else if (![S.braceR, S.braceL, S.pipe].includes(char) && [S.braceR, S.braceL, S.pipe].includes(Nchar)) {
							template.name = (tempParam.value + char).trim();
							if (!template.name || template.name.length === 0) {return null;} // Null return if template name is blank
							tempParam.value = '';
							i++;
						}

					// Get template's parameters if any and finalize
					} else {

						// End template
						if (char === S.braceR && Nchar === S.braceR) {
							closeParam(i);
							template.FROM = FROM;
							template.STR = str;
							template._echo = JSON.parse(JSON.stringify(template));
							TW.templateCall = template;
							break;

						// Template param start
						} else if (char === S.pipe) {
							tempParam.start = i;
							closeParam(i);
							i++;

						// Default check
						} else {
							let nest = handleNest(str.substring(i));
							
							if (nest && nest.length>0) {
								tempParam.value = tempParam.value + nest;
								i = i + nest.length;
							} else {
								tempParam.value = tempParam.value + char;
								i++;
							}
						}
					}
				}
			}
			// End of loop
			// Blank return if invalid
			return null;
		},
		getEncased: (options) => {
			let nest = null;
			let newStr = '';
			let caret = 0;
			if ( (!options.endR && !options.endC) || (!options.startR && !options.startC) ) { return ''; }
			while (caret < options.str.length) {
				let sub = options.str.substring(caret);
				let char = options.str.charAt(caret);
				if (options.startR && options.startR.test(sub)) {
					nest = nest || 0;
					sub = options.startR.exec(sub)[0];
					nest++;
				}
				else if (options.endR && options.endR.test(sub)) {
					nest = nest || 0;
					sub = options.endR.exec(sub)[0];
					nest--;
				}
				else if (options.startC && sub.indexOf(options.startC) === 0) {
					nest = nest || 0;
					sub = options.startC;
					nest++;
				}
				else if (options.endC && sub.indexOf(options.endC) === 0) {
					nest = nest || 0;
					sub = options.endC;
					nest--;
				}
				else {
					sub = char;
				}
				newStr = newStr + sub;
				caret = caret + sub.length;
				if (nest < 1) {
					break;
				}
			}
			if (nest < 1) { return newStr; }
			else {return '';}
		},
		
		// Push finished template
		applyChanges: () => {
			let
			formatVal = TW.templateData ? TW.templateData.format : 'inline',
			format = TW.handleFormat(formatVal),
			params = TW.templateCall.params,
			buildOrder = TW.templateOrder(),
			newT = ['{{' + TW.templateCall.name];
			
			// Build in order
			buildOrder.forEach((param) => {
				let data = params[param];
				if (data) {
					param = data.selected || data.name;
					let param_str = '|';
					if (isNaN(param)) {
						param_str = param_str +
						param +
						' '.repeat(Math.max(0, (format.maxlen - param.length))) +
						(formatVal==='inline' ? '=' : ' = ');
					}
					param_str = param_str + data.value.replace(/[\s\n]*$/, '');
					newT.push(param_str);
				}
			});
			newT = newT.join(format.preall);
			newT = newT + format.afterall + '}}';
			TW.pushCM(
				// New template wikitext
				newT,
				
				// Start point of old template wikitext
				TW.templateCall.FROM,
				
				// End point of old template wikitext
				TW.templateCall.FROM+TW.templateCall.STR.length
			);
			popup.hide();
		},

		// Parse templatedata's `format` param
		handleFormat: (format) => {
			let sett = {
				preall: '',
				maxlen: 0,
				afterall: ''
			};
			if (!format || format === 'inline') {
				// Do nothing
			} else if (format === 'block') {
				sett.preall = '\n';
				sett.afterall = '\n';
			} else {
				let touse = /^[\s\S]*?{{\s*_([\s\S]*?)\|(_+) = _([\s\S]*?)}}[\s\S]*$/.exec(format.trim());
				if (touse) {
					sett = {
						preall:   touse[1],
						maxlen:   touse[2].length,
						afterall: touse[3]
					};
				} else{
					alert('Template with invalid "format"! Value of "inline" will be used instead.');
				}
			}
			return sett;
		},
		
		templateOrder: () => {
			let paramOrder = [];
			console.log({
				paramOrder: paramOrder,
				tc: TW.templateCall.paramOrder,
				tw: TW.paramOrder
			});
			// Maintain initial params' order
			TW.templateCall.paramOrder.forEach((param) => {
				let checkBox = document.querySelector('#param-toggle-'+param);
				if (paramOrder.indexOf(param) === -1 && ((checkBox && checkBox.checked) || !checkBox)) {
					paramOrder.push(param);
				}
			});
			// Params not specified in initially go to the end, unless they are in TD, in which case try to fit them next to their closest relative
			TW.paramOrder.forEach((param) => {
				let checkBox = document.querySelector('#param-toggle-'+param),
					checkList = $(checkBox).closest('.tw-popup-opts').find('.tw-popup-param-toggle-button:checked');
				if (paramOrder.indexOf(param) === -1 && ((checkBox && checkBox.checked) || !checkBox)) {
					let num = checkList.index(checkBox);
					if (num && num > 0) {
						let relative = checkList.get(num-1).id.replace(/^param-toggle-/, '');
						if (paramOrder.includes(relative)) {
							paramOrder.splice(paramOrder.indexOf(relative) + 1, 0, param);
						} else {
							paramOrder.push(param); // No anchor, add at the end
						}
					} else {
						paramOrder.push(param); // No anchor, add at the end
					}
				}
			});
			return paramOrder;
		},
		
		addParam: () => {
			let name = document.querySelector('#tw-popup-newparam-name').value.trim() || '';
			let value = document.querySelector('#tw-popup-newparam-value').value.trim() || '';
			if (
				name.length > 0
				&& !TW.paramOrder.includes(name)
				&& !(TW.templateCall.aliases||{})[name]
				&& !TW.paramOrder.includes(TW.templateCall.aliases[name])
			) {
				TW.templateCall.params[name] = {
					value: value,
					name: name
				};
				TW.paramOrder.push(name);
				let {toggles, params} = TW.parseParams(name);
				$('.tw-popup-params').append(params);
				$('.tw-popup-opts').append(toggles);
				newParam.hide();
				popup.show();
			} else { alert('Empty name or already existing parameter!'); }
		},
		
		pushCM: (txt, s, e) => {
			if (document.documentElement.classList.contains('ve-source')) {
				e += (TW.templateCall.STR.match(/\n/g)||[]).length; // new lines are counted as 2 char so count them again
				let model = ve.init.target.getSurface().getModel();
				let range = new ve.Range(s+2, e+4);
				model.setLinearSelection(range);
				model.getFragment().insertContent(txt);
			} else if (!document.documentElement.classList.contains('ve-active')) {
				cm.view.dispatch({
					changes: {
						from: s,
						to: e || cm.view.state.selection.ranges[0].to,
						insert: txt
					},
					selection: {anchor: cm.view.state.selection.ranges[0].from}
				});
				cm.view.focus();
			}
		},
		getCM: () => {return cm.view.state.doc.toString();},
	};

	// Expose methods
	window.dev.TW.__METHODS = TW;
	
	// Wait until CodeMirror's textarea is loaded to start the script
	mw.hook('ext.CodeMirror.ready').add(TW.init);
});