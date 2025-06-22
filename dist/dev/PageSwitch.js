/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticles */
mw.hook('wikipage.content').add(() => {
	'use strict';
	window.dev = window.dev || {};
	
	// Double load protection and check user group
	if (window.dev.PageSwitch || !/sysop|content-moderator|bot|bot-global|staff|global-discussions-moderator|content-volunteer|wiki-specialist|soap/.test(mw.config.values.wgUserGroups.join())) { return; }
	else { window.dev.PageSwitch = true; }
	
	let 
	ui, plc, spinner,
	cfg = mw.config.values,
	success = $('<svg class="wds-icon wds-icon-small ps-success" style="vertical-align: middle; color:var(--theme-success-color);"><use xlink:href="#wds-icons-checkmark-small"></use></svg>'),
	error = $('<svg class="wds-icon wds-icon-small ps-error" style="vertical-align: middle; color:var(--theme-alert-color);"><use xlink:href="#wds-icons-close-small"></use></svg>'),
	
	// Main class
	ps = {
		// Mass switching from toolbar (based on [[w:c:dev:MassRename]])
		init: () => {
			if (!ps.tool) {
				mw.util.addCSS(`
					#pageSwitchMass .oo-ui-window-body {
						label {
							display: flex;
							white-space: nowrap;
							gap: 5px;
							margin-top: 5px;
							input {flex: 1;}
							svg {margin-top: 5px;}
						}
						#pageSwitchMass-pages {
							width: 100%;
							height: 20em;
							resize: none;
						}
						#pageSwitchMass-err {
							width: 100%;
							height: 5em;
							resize: none;
						}
					}
				`);
				ps.tool = new window.dev.modal.Modal({
					title: 'Mass Page Switch',
					id: 'pageSwitchMass',
					size: 'medium',
					content: $('<div>', {html: [
						$('<div>', { id: 'pageSwitchMass-status', text: 'On standby...' }),
						$('<textarea>', {
							id: 'pageSwitchMass-pages',
							placeholder: 'Old_Page New_Page\nFile:Old_File.png File:New_File.png',
							title: 'Insert pairs of pages, with underscores instead of spaces, a single space between the pages in the pair, and with each pair on a separate line.'
						}),
						$('<label>', {
							'for': 'pageSwitchMass-inter',
							html: [
								'Intermediate page:',
								$('<input>', {
									id: 'pageSwitchMass-inter',
									type: 'text',
									placeholder: 'This should not be an existing page!',
									change: (e)=>{
										ps.stop();
										let inter = $(e.target);
										inter.attr('readonly', 'readonly');
										inter.next().remove();
										inter.after(spinner());
										ps.status('Verifying intermediate page.');
										ps.api.get({ action: 'query', titles: inter.val().trim() }).then((d)=>{
											inter.next().remove();
											if (d && d.query && d.query.pages && d.query.pages['-1']) {
												inter.after(success.clone());
												ps.status('Intermediate page name is valid.');
											} else {
												inter.after(error.clone());
												ps.status('Intermediate page exists already, please choose a page name that does not exist.');
											}
											inter.removeAttr('readonly');
										}).catch((err)=>{
											console.log('API error in checking page existance: ', err);
											inter.next().remove();
											inter.after(error.clone());
											inter.removeAttr('readonly');
											ps.status('There\'s been an issue with the API, please reload the page and try again!');
										});
									}
								}),
								error.clone()
							]
						}),
						$('<label>', {
							'for': 'pageSwitchMass-reason',
							html: [
								'Switch reason:',
								$('<input>', {
									id: 'pageSwitchMass-reason',
									type: 'text',
									change: (e)=>{ $(e.target).next().replaceWith(e.target.value.trim().length===0 ? error.clone() : success.clone()); }
								}),
								error.clone()
							]
						}),
						$('<hr>'),
						$('<p>', { text: 'Here will appear the pairs of pages that failed to be moved:' }),
						$('<textarea>', { id: 'pageSwitchMass-err', readonly: '' }),
					]}).get(0),
					buttons: [
						{
							id: 'ps-start',
							text: 'Start',
							event: 'start'
						},
						{
							id: 'ps-stop',
							text: 'Stop',
							event: 'stop',
							disabled: true
						}
					],
					events: {
						start: () => { ps.start() },
						stop: () => { ps.stop() }
					}
				});
				ps.tool.create();
			}
			ps.tool.show();
		},
		start: () => {
			$('#pageSwitchMass-pages').val($('#pageSwitchMass-pages').val().trim()); // clean input
			if (
				$('#pageSwitchMass .ps-success').length===2 &&
				$('#pageSwitchMass-pages').val().length>0
			) {
				console.log('running');
				ps.toolRun = true;
				$('#pageSwitchMass-inter, #pageSwitchMass-pages').attr('readonly', 'readonly');
				$('#ps-stop').removeAttr('disabled');
				$('#ps-start').attr('disabled', '');
				ps.move();
			} else if ($('#pageSwitchMass-inter + .ps-success').length===0) {
				ps.status('No valid intermediate page was given.');
			} else if ($('#pageSwitchMass-reason + .ps-success').length===0) {
				ps.status('A reason for the move(s) is required.');
			} else if ($('#pageSwitchMass-pages').val().length===0) {
				ps.status('No pages for switching were given.');
			}
		},
		stop: () => {
			if (ps.toolRun === true) {ps.status('The tool has been stopped.');}
			ps.toolRun = false;
			$('#ps-stop').attr('disabled', '');
			$('#ps-start').removeAttr('disabled');
		},
		move: () => {
			let
			opts = {
				action: 'move',
				noredirect: true,
				bot: true,
				reason: $('#pageSwitchMass-reason').val(),
				token: mw.user.tokens.get('csrfToken'),
			},
			mid = $('#pageSwitchMass-inter').val().trim(),
			pairs = $('#pageSwitchMass-pages').val().trim().split('\n'),
			checkPair = (page1, page2) => {
				if (page1 && page1.length>0 && page2 && page2.length>0) {
					let 
					order = [
						 [page1, mid],
						 [page2, page1],
						 [mid, page2]
					],
					movePair = (from, to)=>{
						ps.status([
							'Moving <a href="', mw.util.getUrl(from), '">', from, '</a> to ',
							'<a href="', mw.util.getUrl(to), '">', to, '</a>.',
						].join(''));
						ps.api
						.postWithEditToken(Object.assign(opts, { from: from, to: to }))
						.done((m)=>{
							if (m.move) {
								if (order.length>0) {
									movePair(...order.shift());
								} else if (pairs.length>0) {
									checkPair(...pairs.shift().split(' '));
								} else {
									ps.status('All pages have been moved!');
									ps.stop();
								}
							} else {
								console.log(m, 'fail');
								$('#pageSwitchSolo .mw-spinner').replaceWith(error.clone());
								$('#pageSwitchSolo .cdx-message').addClass('cdx-message--error');
								$('#pageSwitchSolo .cdx-message__content').html(
									'<div>The moves have failed, please revise the pages before trying again.</div>'+
									(m.info ? (
										'<div>The following error information was returned by the API:\n<code style="display:block;">'+m.error.info+'</code></div>'
									) : '')
								);
							}
						});
					};
					movePair(...order.shift());
				} else if (pairs.length>0) {
					$('#pageSwitchMass-pages').val(pairs.join('\n'));
					let pair = (page1||'')+' '+(page2||'');
					if (pair.length>1) {
						$('#pageSwitchMass-err').val(pair+'\n'+$('#pageSwitchMass-err').val());
					}
					checkPair(...pairs.shift().split(' '));
				}
			};
			checkPair(...pairs.shift().split(' '));
			$('#pageSwitchMass-inter, #pageSwitchMass-pages').removeAttr('readonly');
		},
		status: (msg) => {
			$('#pageSwitchMass-status').html(msg || 'On standby...');
			$(document).trigger('resize');
		},
		
		// Delay until element exists to run function
		waitFor: (query, callback, extraDelay) => {
			if ('function' === typeof callback && 'string' === typeof query) {
				extraDelay = extraDelay || 0;
				if (document.querySelector(query)) {
					setTimeout(callback, extraDelay);
				} else {
					// set up the mutation observer
					let observer = new MutationObserver(function (mutations, me) {
						if (document.querySelector(query)) {
							setTimeout(callback, extraDelay);
							me.disconnect(); // stop observing
							return;
						}
					});
					
					// start observing
					observer.observe(document, {
					  childList: true,
					  subtree: true
					});
				}
			}
		},
	};
	// Start the process
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:Dorui.js',
			'u:dev:MediaWiki:Modal.js',
			'u:dev:MediaWiki:Placement.js'
		]
	});
	let Phook = (hook) => new Promise(r => mw.hook(hook).add(r));
	Promise.all([
		Phook('dev.placement').then(dplc => plc = dplc),
		Phook('doru.ui').then(dui => ui = dui),
		Phook('dev.modal'),
		mw.loader.using('mediawiki.api').then(() => ps.api = new mw.Api()),
		mw.loader.using('jquery.spinner').then(spin => spinner = $.createSpinner)
	]).then(() => {
		if (cfg.wgCanonicalSpecialPageName==='Movepage') {
			$('button[name="wpMove"]').parent().after($('<button>', {
				'class': 'wds-button',
				text: 'Switch Page',
				click: (e) => {
					e.preventDefault();	
					ps.waitFor('#pageSwitchMass-pages', () => {
						let curr = $('form#movepage [name="wpOldTitle"]').attr('value').replace(/ /g, '_'),
							final = (cfg.wgFormattedNamespaces[$('form#movepage [name="wpNewTitleNs"] :selected').attr('value')]+':'+$('form#movepage [name="wpNewTitleMain"]').val()).replace(/ /g, '_'),
							rDrop = $('form#movepage [name="wpReasonList"] :selected').attr('value'),
							rText = $('form#movepage [name="wpReason"]').val(),
							reason =
								(rDrop !== 'other' ? rDrop : '')+
								((rDrop !== 'other' && rText.length>0) ? '; ' : '')+
								(rText.length>0 ? rText : '');
						$('#pageSwitchMass-pages').val(curr+' '+final);
						$('#pageSwitchMass-reason').val(reason);
						$('#pageSwitchMass-reason').trigger('change'); // triggervalidation
						ps.status('Please input an intermediate page for the page switch.');
					});
					$('#WikiaBar #t-psm').trigger('click');
				}
			}));
		}
		$(plc.element('tools'))[plc.type('prepend')](
			$('<li>').append(
				$('<a>', {
					id: 't-psm',
					text: 'Mass Page Switch',
					click: ps.init
				})
			)
		);
	});
});