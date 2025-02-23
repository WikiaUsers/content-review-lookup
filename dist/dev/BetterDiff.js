$(function() {

	// Double load protection
	if (window.dev && window.dev.BetterDiff) {return;}
	(window.dev = window.dev || {}).BetterDiff = true;
	
    // Load dependencies and cache
    importArticles({
        type: 'script',
        articles: [ 'u:dev:MediaWiki:Modal.js' ]
    });
    var quickview, settings; // for global use once defined
	var config = mw.config.values;
	var lApi;
	var tokens = {
		patrol: '',
		rollback: '',
		wpET: ''// Cannot get through mw.api or mw.user.tokens as they dont work with action=markpatrolled for some reason
	};
	var can = {
		patrol: config.wgUserGroups.some(function(group){return ['sysop', 'content-moderator'].includes(group);}),
		rollback: config.wgUserGroups.some(function(group){return ['sysop', 'content-moderator', 'rollback'].includes(group);})
	};
	var fP = config.wgNamespaceNumber==6 && config.wgAction=='view' && !config.wgDiffNewId && window.dev.BD_FullFilePatrol;
	
	// Main class
	var betterDiff = {
		init: function() {
			
			// Make methods public for any desired use past the offered here
			window.dev.BetterDiffMethods = betterDiff;
			
			// Local api
			lApi = new mw.Api();
			
			// Get tokens
			lApi.get({
				meta: 'tokens',
				type: 'patrol|rollback'
			}).then(function(data){
				if (can.patrol && data.query.tokens.patroltoken && data.query.tokens.patroltoken.length>2) {
					tokens.patrol = data.query.tokens.patroltoken;
				}
				if (can.rollback && data.query.tokens.rollbacktoken && data.query.tokens.rollbacktoken.length>2) {
					tokens.rollback = data.query.tokens.rollbacktoken;
				}
			});
			
			// Full patrol link in Files if setting is enabled
			if (fP && !document.querySelector('#mw-imagepage-content > .patrollink > a')) {
				lApi.get({
					action: 'query',
					list: 'recentchanges',
					rcshow: '!patrolled',
					rcprop: 'ids',
					rclimit: '1',
					rctitle: config.wgPageName
				}).then(function(data){
					if (data.query && data.query.recentchanges && data.query.recentchanges.length>0) {
						mw.util.addCSS('#mw-imagepage-content > .patrollink {font-size: 75%; text-align: right;}');
						var link = $('<a>', {id:'betterDiff-FullPatrol', href:'#betterDiff-FullPatrol', title:'File:'+config.wgTitle, text: 'Mark this file version as patrolled'});
						link.on('click', betterDiff.massPatrol);
						$('#mw-imagepage-content').append(
							$('<div class="patrollink" data-mw="interface">', {'class': 'patrollink', 'data-mw': 'interface'}).append(
								'[', link, ']'
							)
						);
					}
				});
			}
			
			// Load infobox and gallery styles for previews
			mw.loader.load([
				'ext.fandom.PortableInfoboxFandomDesktop.css',
				'ext.fandom.photoGallery.gallery.css'
			]);
			
			// Add CSS
			importArticles({ articles: 'u:dev:MediaWiki:BetterDiff.css' });
			
			
			// Check we're in Special:RecentChanges
			if (config.wgCanonicalSpecialPageName == 'Recentchanges') {
				betterDiff.waitFor('.mw-changeslist div', function(){
					betterDiff.newDiffLink();
					betterDiff.quickDiff();
					betterDiff.waitFor('.mw-rcfilters-ui-filterWrapperWidget-top', betterDiff.targettedPatrol);
					
					// start observing
					betterDiff.recentChangesReload(function() {
						betterDiff.newDiffLink();
						betterDiff.quickDiffLoad();
					});
				});
			}
			
			// Check we're in Special:Contributions or in a history page
			else if (
				config.wgCanonicalSpecialPageName == 'Contributions' ||
				config.wgAction == 'history'
			) {
				betterDiff.waitFor('ul.mw-contributions-list li', function(){
					betterDiff.newDiffLink();
					betterDiff.quickDiff();
				});
				betterDiff.waitFor('#pagehistory li.selected', betterDiff.historyGroupDiff);
			}
			
			// Check we're in a diff page
			else if (config.wgDiffNewId) {
				betterDiff.waitFor('#mw-diff-ntitle1', betterDiff.newDiff);
				betterDiff.quickDiff();
			}
			
			// Check if there's any custom-made diff list
			if (document.querySelector('.quickDiff-custom')) {
				betterDiff.quickDiff();
			}
			
			document.addEventListener('keydown', function(event) {
				// Mouseless massPatrol
				if (event.altKey && ['1', 'p'].includes(event.key) && config.wgAction=='view') {
					betterDiff.massPatrol();
				}
				
				// Mouseless openPrev
				if (event.altKey && ['2'].includes(event.key) && ['view', 'history'].includes(config.wgAction) && document.querySelector('#quickDiff-quickview.oo-ui-window-active')) {
					betterDiff.openPrev();
				}
				
				// Mouseless openNext
				if (event.altKey && ['3'].includes(event.key) && ['view', 'history'].includes(config.wgAction) && document.querySelector('#quickDiff-quickview.oo-ui-window-active')) {
					betterDiff.openNext();
				}
			});
		},
		
		// Run callback every time Special:RecentChanges reloads results
		recentChangesReload: function(callback, query) {
			var observer = new MutationObserver(function (mutations, me) {
				if (
					mutations[0] &&
					mutations[0].target &&
					mutations[0].target.classList.contains('mw-rcfilters-ui-changesListWrapperWidget')
				) {
					callback();
				}
			});
			observer.observe(document.querySelector(query ? query : '.mw-changeslist'), {
				childList: true,
				subtree: true
			});
		},
		
		// Add and update group diff view for page history based off selected diffs
		historyGroupDiff: function() {
			var lastID = $('#pagehistory ul:last-of-type li.after:last-child').attr('data-mw-revid');
			$('.mw-history-compareselectedversions').append(' (', $('<a>', {
				'text': 'view',
				'class': 'quickDiff',
				'data-page-target': config.wgPageName,
				'tab-index': '0'
			}), ')');
			function updateIDs() {
				var newID = $('#pagehistory li.selected.before').attr('data-mw-revid');
				var oldID = $('#pagehistory li.selected.after').attr('data-mw-revid');
				$('.mw-history-compareselectedversions > .quickDiff').attr('newid', newID);
				$('.mw-history-compareselectedversions > .quickDiff').attr('oldid', lastID==oldID ? '0' : oldID);
			}
			updateIDs();
			$('#pagehistory').on('change', updateIDs);
		},
		
		// Properly build diff links with page creation edits
		newDiffLink: function() {
			var newDiffLink = {
				searchRevid: function (row) {
					var O = {
						row: row,
						revid: []
					};
					// Special:Contributions
					if ( O.row.nodeName == 'LI' && O.row.getAttribute('data-mw-revid')) { 
						O.revid.push(O.row.getAttribute('data-mw-revid')); // Page creation revision
						
					// Special:RecentChanges
					} else {
						// sole edit
						if (O.row.getAttribute('data-mw-revid')) { 
							O.revid.push(O.row.getAttribute('data-mw-revid'));
							
						// Top edit
						} else if (O.row.classList.contains('mw-rcfilters-ui-highlights-enhanced-toplevel')) {
							O.revid.push(O.row.nextElementSibling.getAttribute('data-mw-revid')); // Last revision
							O.revid.push(O.row.parentElement.lastElementChild.getAttribute('data-mw-revid')); // Page creation revision
						}
					}
					if (O.revid.length>0) {
						return newDiffLink.buildLink(O);
					} else {
						return;
					}
				},
				
				buildLink: function(options) {
					var target = newDiffLink.getTarget(options.row);
					var page = newDiffLink.getTitle(options.row);
					if (target) {
						var link = document.createElement('a');
						var from = options.revid[options.revid.length-1];
						var to = options.revid[0];
						var href = '/wiki/' + page + '?diff=' + to;
						
						if (from == to) {
							link.classList.add('mw-changeslist-diff');
						} else {
							href = href + '&oldid=' + from;
							options.label = options.revid.length + ' changes';
							link.classList.add('mw-changeslist-groupdiff');
						}
						link.href = href;
						link.title = page;
						if (target.nodeType == 3) {
							var split = /^([^\d\w]*)([\d\w\s]+)([^\d\w]*)$/.exec(target.textContent);
							var paren = target.parentNode;
							link.innerHTML = split[2] || 'diff';
							target.remove();
							
							if (paren.querySelector('.mw-changeslist-diff-cur + .mw-changeslist-separator')) {
								paren.querySelector('.mw-changeslist-diff-cur').after(
									split[1].length>0 ? split[1] : "",
									link,
									split[3].length>0 ? split[3] : ""
								);
							} else {
								paren.prepend(
									split[1].length>0 ? split[1] : "",
									link,
									split[3].length>0 ? split[3] : ""
								);
							}
							
							return;
						} else {
							link.innerHTML = options.label;
							target.replaceChildren(link);
							return;
						}
					} else { return; }
				},
				
				getTitle: function(row) {
					var title;
					var queries = [
						'.mw-changeslist-title',   // Normal Special:RecentChanges
						'.mw-changeslist-date',    // Nested Special:RecentChanges
						'.mw-enhanced-rc-time > a' // Special:Contributions
					];
					queries.forEach(function(query) {
						if (!title && row.querySelector(query) && row.querySelector(query).getAttribute('title')) {
							title = row.querySelector(query).getAttribute('title');
						}
					});
					return title || '';
				},
				
				getTarget: function(row) {
					var target;
					var queries = [
						'.mw-changeslist-links:not(.mw-history-histlinks, .mw-usertoollinks) > span:first-child', // Special:Contributions && Normal Special:RecentChanges
						'.mw-changeslist-diff-cur + .mw-changeslist-separator', // Nested Special:RecentChanges
						'.mw-changeslist-links.mw-history-histlinks:not(.mw-usertoollinks) > span:last-child', // ?action=history
					];
					queries.forEach(function(query) {
						var test = row.querySelector(query);
						if (!target && test && test.classList.length==0) {
							target = test.firstChild;
						} else if (!target && test && test.classList.length>0 && test.classList.length>0) {
							target = test.previousSibling;
						}
					});
					return target;
				}
				
			};
			
			// Check we're in Special:RecentChanges
			if (config.wgCanonicalSpecialPageName == 'Recentchanges') {
				if (
					document.querySelector('.mw-changeslist-src-mw-new') &&
					(
						!document.querySelector('.mw-changeslist-src-mw-new .mw-changeslist-groupdiff') ||
						!document.querySelector('.mw-changeslist-src-mw-new .mw-changeslist-diff')
					)
				){
					document.querySelectorAll('.mw-changeslist-src-mw-new').forEach(function(node){
						if (node) { newDiffLink.searchRevid(node); }
					});
				}
			}
			
			// Check we're in Special:Contributions
			else if (config.wgCanonicalSpecialPageName == 'Contributions') {
				if (document.querySelector('ul.mw-contributions-list abbr.newpage')) {
					document.querySelectorAll('ul.mw-contributions-list abbr.newpage').forEach(function(node){
						var row = node.parentElement;
						if (row) {newDiffLink.searchRevid(row);}
					});
				}
			}
			
			// Check we're in a history page
			else if (config.wgAction == 'history') {
				if (!document.querySelector('ul.mw-contributions-list:last-of-type li:last-of-type .mw-history-histlinks > span:nth-child(2) > a')) {
					var node = document.querySelector('ul.mw-contributions-list:last-of-type li:last-of-type');
					if (node) {newDiffLink.searchRevid(node);}
				}
			}
		},
		
		// Properly display diff for page creation edits
		newDiff: function() {
			
			if (document.querySelector('#mw-diff-ntitle1 > strong > a')) {
				var table = document.querySelector('.diff');
				var revid = document.querySelector('#mw-diff-ntitle1 > strong > a').href.replace(/^.+\?oldid=/g, '');
				var api_opt = {
					action: 'compare',
					torev: revid,
					fromslots: 'main',
					'fromtext-main': '',
					prop: 'diff|ids',
					formatversion: 2
				};
				if ( revid && document.querySelector('#mw-diff-otitle1 > strong > a') && !document.querySelector('#differences-prevlink') ) {
					// Add edit link to page creation diff
					table.querySelector('#mw-diff-otitle4').innerHTML =
					'<a href="/wiki/' +
					document.querySelector('#mw-diff-otitle1 > strong > a').title +
					'?diff=' +
					document.querySelector('#mw-diff-otitle1 > strong > a').href.replace(/^.+\?oldid=/g, '') +
					'&oldid=0" title="' +
					document.querySelector('#mw-diff-otitle1 > strong > a').title +
					'" id="differences-prevlink">← Older edit</a>';
		
				} else if (revid && !document.querySelector('#differences-prevlink')) {
					table.querySelector('.diff-ntitle').colSpan = 4;
					table.querySelector('.diff-notice').parentNode.remove();
					betterDiff.api(api_opt).then(function(data) {
						table.innerHTML = '<colgroup><col class="diff-marker"><col class="diff-content"><col class="diff-marker"><col class="diff-content"></colgroup>' + table.innerHTML;
						table.querySelector('tbody').innerHTML = table.querySelector('tbody').innerHTML + data.compare.body;
					});
				}
			}
			
		},
		
		// Mass patrol recent edits from specific user and/or namespace
		targettedPatrol: function() {
			if (!document.querySelector('#tp') && can.patrol) {
				var entry = $('<span class="wds-button" id="tpOpen">Targetted Patrolling</span>');
				$('.mw-rcfilters-ui-table-placeholder').append(entry);
				// Build modal and start up listeners
				mw.hook('dev.modal').add(function(Modal) {
					settings = 
						new Modal.Modal({
							title: 'Targetted Patrolling',
							id: 'tPatrol-patrol',
							size: 'medium',
							content: 
								'<div class="tpWrapper">'+
									'<label for="tpNS">'+
										'<span class="tpLabel">Namespace:</span>'+
										'<select name="tpNS" id="tpNS">'+
											'<optgroup label="Namespaces:">'+
												'<option value="-99">All</option>'+
												'<option value="0">Main</option>'+
												// Rest of namespaces ("Special" and "Media" excluded)
												(function() {
													var options = [];
													Object.keys(config.wgFormattedNamespaces).forEach(function(ns){
														if (ns>0) {
															options.push('<option value="'+ns+'">'+config.wgFormattedNamespaces[ns]+'</option>');
														}
													});
													return options.join('');
												})()+
											'</optgroup>'+
										'</select>'+
									'</label>'+
									'<label for="tpUser">'+
										'<span class="tpLabel">User:</span>'+
										'<input name="tpUser" id="tpUser" placeholder="User to mass patrol" />'+
									'</label>'+
									'<label for="tpTitle">'+
										'<span class="tpLabel">Title:</span>'+
										'<input name="tpTitle" id="tpTitle" placeholder="RegExp for title(s) to keep" />'+
									'</label>'+
									'<label for="tpNotTitle">'+
										'<span class="tpLabel">Not title:</span>'+
										'<input name="tpNotTitle" id="tpNotTitle" placeholder="RegExp for title(s) to exclude" />'+
									'</label>'+
									'<label for="tpTimeStart">'+
										'<span class="tpLabel">From date:</span>'+
										'<input name="tpTimeStart" id="tpTimeStart" placeholder="Date to start patrolling from" /> '+
										'<span title="No date"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 6.24 6.24"><path d="M3.12.285a2.835 2.835 0 1 0 0 5.67 2.835 2.835 0 0 0 0-5.67m.59 4.394q-.219.086-.349.131a1 1 0 0 1-.303.045q-.264 0-.413-.129-.146-.128-.146-.328 0-.077.011-.157t.035-.183l.183-.645q.024-.093.041-.175a.7.7 0 0 0 .016-.152q0-.124-.05-.171-.052-.049-.195-.049a.5.5 0 0 0-.145.022 2 2 0 0 0-.128.042l.049-.199q.179-.073.343-.125a1 1 0 0 1 .31-.052q.263 0 .406.127.142.127.143.33 0 .042-.009.148a1 1 0 0 1-.036.195l-.182.643q-.022.077-.04.176a1 1 0 0 0-.017.15q0 .128.057.175t.199.046q.066 0 .15-.023a1 1 0 0 0 .121-.041Zm-.033-2.611a.43.43 0 0 1-.306.118.44.44 0 0 1-.307-.118.37.37 0 0 1-.128-.286q0-.168.128-.288a.43.43 0 0 1 .307-.119q.179 0 .306.119.128.12.127.288 0 .168-.127.286"></path></svg></span>'+
									'</label>'+
									'<label for="tpTimeEnd">'+
										'<span class="tpLabel">To date:</span>'+
										'<input name="tpTimeEnd" id="tpTimeEnd" placeholder="Date to end patrolling at" /> '+
										'<span title="No date"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 6.24 6.24"><path d="M3.12.285a2.835 2.835 0 1 0 0 5.67 2.835 2.835 0 0 0 0-5.67m.59 4.394q-.219.086-.349.131a1 1 0 0 1-.303.045q-.264 0-.413-.129-.146-.128-.146-.328 0-.077.011-.157t.035-.183l.183-.645q.024-.093.041-.175a.7.7 0 0 0 .016-.152q0-.124-.05-.171-.052-.049-.195-.049a.5.5 0 0 0-.145.022 2 2 0 0 0-.128.042l.049-.199q.179-.073.343-.125a1 1 0 0 1 .31-.052q.263 0 .406.127.142.127.143.33 0 .042-.009.148a1 1 0 0 1-.036.195l-.182.643q-.022.077-.04.176a1 1 0 0 0-.017.15q0 .128.057.175t.199.046q.066 0 .15-.023a1 1 0 0 0 .121-.041Zm-.033-2.611a.43.43 0 0 1-.306.118.44.44 0 0 1-.307-.118.37.37 0 0 1-.128-.286q0-.168.128-.288a.43.43 0 0 1 .307-.119q.179 0 .306.119.128.12.127.288 0 .168-.127.286"></path></svg></span>'+
									'</label>'+
								'</div>'+
								'<div id="tpDetails">Progress will be noted here!</div>',
							buttons: [
								{
									// Attempt patrol
									text:'Patrol',
									id:'tPatrol-Submit',
									event: 'PatrolSubmit'
								}
							],
							events: {
								PatrolSubmit: function() {
									if ($('#tPatrol-Submit[disabled="disabled"]').length>0){mw.notify('Patrolling on-going, please wait!'); return;}
									$('#tPatrol-Submit').attr('disabled', 'disabled');
									var api_sett = {
										action: 'query',
										list: 'recentchanges',
										rcshow: '!patrolled',
										rcprop: 'ids|title|user|timestamp',
										format: 'json',
										formatversion: '2',
										rclimit: 'max'
									};
									
									// User filter
									var user = document.querySelector('#tpUser').value.replace(/^User:/, ''); // Username without the "User:" prefix
									if (user.length>0) {api_sett.rcuser = user;}
									
									// Namespace filter
									var ns = document.querySelector('#tpNS').selectedOptions[0].value;
									if (ns !== "-99") {api_sett.rcnamespace = ns;}
									
									// Date-from filter
									var df = document.querySelector('#tpTimeStart').value.length>0 ?
										new Date(document.querySelector('#tpTimeStart').value) :
										'';
									if (!['Invalid Date', ''].includes(df)) {api_sett.rcstart = df.toISOString();}
									
									// Date-to filter
									var dt = document.querySelector('#tpTimeEnd').value.length>0 ?
										new Date(document.querySelector('#tpTimeEnd').value) :
										'';
									if (!['Invalid Date', ''].includes(dt)) {api_sett.rcend = dt.toISOString();}
									
									// Title filters
									var yti = new RegExp(document.querySelector('#tpTitle').value.trim(), 'i');
									var nti = new RegExp(document.querySelector('#tpNotTitle').value.trim(), 'i');
									
									// Attempt patrol if any valid setting
									var details = $('#tpDetails');
									details.prepend('<hr />');
									if (Object.keys(api_sett).some(function(r){
										return ['rcuser', 'rcnamespace', 'rcstart', 'rcend'].includes(r);
									}) || yti.source!=='(?:)') {
										lApi.get(api_sett).then(function(data){
											var revs = (data.query.recentchanges || [])
											.filter(function(e){
												return  (yti.source==='(?:)' ? true : e.title.search(yti)!==-1) &&
														(nti.source==='(?:)' ? true : e.title.search(nti)===-1);
											});
											if (revs.length>0) {
												betterDiff.patrolRevisions(
													revs,
													function (rev, left, total) {
														if (rev!==undefined) {
															details.prepend('<div>('+(total-left)+'/'+total+') Patrolled '+
																'<a href="'+mw.util.getUrl(config.wgFormattedNamespaces[2]+':'+rev.user)+'">'+rev.user+'</a>\'s edit to '+
																'<a href="'+mw.util.getUrl(rev.title)+'">'+rev.title+'</a> on '+
																(new Date(rev.timestamp)).toLocaleString({}, {
																	hour12:false,
																	month:'2-digit',
																	day:'2-digit',
																	hour:'2-digit',
																	minute:'2-digit'
																})+
																' (<a class="quickDiff" '+
																	'newid="'+rev.revid+'" '+
																	'oldid="'+rev.old_revid+'" '+
																	'data-target-page="'+rev.title.replace(/"/g, '&quot;')+'" '+
																	'data-url="'+mw.util.getUrl(rev.title, {diff: rev.revid, oldid: rev.old_revid})+'" '+
																'>view</a>)'+
															'</div>');
														}
														if (left == 0) { 
															details.prepend('<div class="success">Finished patrolling!</div>');
															$('#tPatrol-Submit').removeAttr('disabled');
														}
													}
												);
											} else {
												details.prepend('<div class="error">The specified filters return no edits to patrol!</div>');
												$('#tPatrol-Submit').removeAttr('disabled');
											}
										});
									} else {
										details.prepend('<div class="error">No filter specified.</div>');
										$('#tPatrol-Submit').removeAttr('disabled');
									}
								}
							}
						});
					settings.create();
					entry.on('click', function(){settings.show();});
					$('#tPatrol-patrol').on('change', 'input', function(ch) {
						if (['targettedPatrolTimeEnd', 'targettedPatrolTimeStart'].includes(ch.target.id)) {
							var date = new Date(ch.target.value);
							var lbl = ch.target.nextElementSibling;
							lbl.classList.toggle('bad-data', false);
							if (ch.target.value == '') { lbl.setAttribute('title', 'No date'); }
							else if (date == 'Invalid Date') {
								lbl.setAttribute('title', 'Invalid date, please revise your input');
								lbl.classList.toggle('bad-data', true);
							} else {
								lbl.setAttribute('title', 'Inputted date: '+date.toString());
							}
						}
					});
				});
			} else { console.log('User does not have patrolling rights.'); }
		},
		
		// Diff pages but without moving away from the page, allowing patrolling still
		quickDiff: function() {
			// Diff link string's storage for "Open" and "Copy" buttons
			var href = '';
			betterDiff.quickDiffLoad();
			
			var generateModal = function(event) {
				var turl = event.target.getAttribute('data-url');
				var getURL = function(page, query, ns) {
					return  'https://'+betterDiff.getLoad(turl)+
							'/wiki/'+encodeURIComponent(page).replace(/%3A/g, ':').replace(/%20/g, '_')+
							(query ? ('?'+$.param(query)) : '');
				};
				var generateHeader = function(data, url) {
					href = data.log=='upload' ?
						getURL(data.totitle) :
						getURL(data.totitle, {diff: data.torevid});
					var header = '';
					var todate = new Date(data.totimestamp);
					
					// Old revid
					if (data.fromtimestamp) {
						if (data.log!=='upload') { href = getURL(data.totitle, {diff: data.torevid, oldid: data.fromrevid}); }
						var fromdate = new Date(data.fromtimestamp);
						header +=
						'<td class="diff-otitle diff-side-deleted" colspan="2">'+
							'<div id="mw-diff-otitle1">'+
								'<strong>'+
									'<a href="'+(data.log=='upload' ? data.fromfile : getURL(data.fromtitle, {oldid: data.fromrevid})+'" title="'+data.fromtitle.replace(/"/g, '&quot;'))+'">'+
										'Revision as of '+
										fromdate.getHours().toString().padStart(2, '0')+':'+fromdate.getMinutes().toString().padStart(2, '0')+
										', '+fromdate.getDate()+' '+
										(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(fromdate))+' '+
										fromdate.getFullYear()+
									'</a> '+
									(data.log=='upload' ? '' : ('<span class="mw-diff-edit">('+
										'<a href="'+getURL(data.fromtitle, {action: 'edit', oldid: data.fromrevid})+'" title="'+data.fromtitle.replace(/"/g, '&quot;')+'">edit</a>'+
									')</span>'))+
								'</strong>'+
							'</div>'+
							'<div id="mw-diff-otitle2">'+
								'<a href="'+getURL('User:'+data.fromuser)+'" class="mw-userlink" title="User:'+data.fromuser+'"><bdi>'+data.fromuser+'</bdi></a> '+
								'<span class="mw-usertoollinks">('+
									'<a href="'+getURL('Message_Wall:'+data.fromuser)+'" class="mw-usertoollinks-wall" title="Message Wall:'+data.fromuser+'">wall</a> | '+
									'<a href="'+getURL('Special:Contributions/'+data.fromuser)+'" class="mw-usertoollinks-contribs" title="Special:Contributions/'+data.fromuser+'">contribs</a>'+
								')</span>'+
							'</div>'+
							'<div id="mw-diff-otitle3">'+
								'<span class="comment">'+
									(data.fromparsedcomment ? ('('+data.fromparsedcomment+')') : '')+
								'</span>'+
							'</div>'+
							'<div id="mw-diff-otitle4"></div>'+
						'</td>';
					}
					
					// New revid
					header +=
					'<td class="diff-ntitle" colspan="'+(data.fromtimestamp ? '2' : '4')+'">'+
						'<div id="mw-diff-ntitle1">'+
							'<strong>'+
								'<a href="'+(data.log=='upload' ? data.tourl : getURL(data.totitle, {oldid: data.torevid})+'" title="'+data.totitle.replace(/"/g, '&quot;'))+'">'+
									'Revision as of '+
									todate.getHours().toString().padStart(2, '0')+':'+todate.getMinutes().toString().padStart(2, '0')+
									', '+todate.getDate()+' '+
									(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(todate))+' '+
									todate.getFullYear()+
								'</a> '+
								(data.log=='upload' ? '' : ('<span class="mw-diff-edit">('+
									'<a href="'+getURL(data.totitle, {action: 'edit', oldid: data.torevid})+'" title="'+data.totitle.replace(/"/g, '&quot;')+'">edit</a>'+
								')</span> '+
								'<span class="mw-diff-undo">('+
									'<a href="'+getURL(data.totitle, {action: 'edit', undoafter: data.fromrevid, undo: data.torevid})+'" title="&quot;Undo&quot; reverts this edit and opens the edit form in preview mode. It allows adding a reason in the summary.">undo</a>'+
								')</span>'))+
							'</strong>'+
						'</div>'+
						'<div id="mw-diff-ntitle2">'+
							'<a href="'+getURL('User:'+data.touser)+'" class="mw-userlink" title="User:'+data.touser+'"><bdi>'+data.touser+'</bdi></a> '+
							'<span class="mw-usertoollinks">('+
								'<a href="'+getURL('Message_Wall:'+data.touser)+'" class="mw-usertoollinks-wall" title="Message Wall:'+data.touser+'">wall</a> | '+
								'<a href="'+getURL('Special:Contributions/'+data.touser)+'" class="mw-usertoollinks-contribs" title="Special:Contributions/'+data.touser+'">contribs</a>'+
							')</span>'+
							((betterDiff.getLoad(turl)==(config.wgServerName+config.wgScriptPath)) && can.rollback && tokens.rollback.length>2 ? (
								' <span class="mw-rollback-link">'+
									'<a href="'+
										getURL(data.fromtitle, {
											action: 'rollback',
											from: data.touser,
											token: tokens.rollback
										})+
										'" title="&quot;Rollback&quot; reverts the last contributor\'s edit(s) to this page in one click"'+
									'>'+
										'rollback'+
									'</a>'+
								'</span>'
							) : '')+
						'</div>'+
						'<div id="mw-diff-ntitle3">'+
							'<span class="comment">'+
								(data.toparsedcomment ? ('('+data.toparsedcomment+')') : '')+
							'</span>'+
						'</div>'+
						'<div id="mw-diff-ntitle4"></div>'+
					'</td>';
					
					// Return built header
					return header;
				};
				var api_opt = {
					action: 'compare',
					prop: 'diff|ids|timestamp|user|comment|title',
					formatversion: 2
				};
				
				if (event.target.classList.contains('quickDiff')) {
					api_opt[['prev', 'next'].includes(event.target.getAttribute('newid')) ? 'torelative' : 'torev'] = event.target.getAttribute('newid');
					if (event.target.getAttribute('newdiff') == 'yes'||event.target.getAttribute('oldid') == '0') {
						api_opt.fromslots = 'main';
						api_opt['fromtext-main'] = '';
					} else {
						api_opt.fromrev = event.target.getAttribute('oldid');
					}
				} else if (event.target.id == 'differences-nextlink') {
					api_opt.fromrev = event.target.getAttribute('revid');
					api_opt.torelative = 'prev';
				} else if (event.target.id == 'differences-prevlink') {
					if (event.target.getAttribute('newdiff') == 'yes'||event.target.getAttribute('oldid') == '0') {
						api_opt.torev = event.target.getAttribute('revid');
						api_opt.fromslots = 'main';
						api_opt['fromtext-main'] = '';
					} else {
						api_opt.fromrev = event.target.getAttribute('revid');
						api_opt.torelative = 'next';
					}
				}
				
				betterDiff.api(api_opt, turl).then(function(e) {
					var diff = e.compare;
					if (!diff && event.target.getAttribute('log')=='upload') {
						diff = {
							totitle: event.target.getAttribute('data-target-page'),
							fromtitle: event.target.getAttribute('data-target-page'),
							touser: event.target.getAttribute('data-target-touser'),
							fromuser: event.target.getAttribute('data-target-fromuser'),
							toparsedcomment: event.target.getAttribute('data-target-tocmt'),
							fromparsedcomment: event.target.getAttribute('data-target-fromcmt'),
							totimestamp: event.target.getAttribute('data-target-tots'),
							tourl: event.target.getAttribute('data-target-tourl'),
							log: 'upload'
						};
						var fileType;
						switch (event.target
							.getAttribute('data-target-tourl')
							.replace(/^.*\/.*\.([^\.\/]*?)\/revision.*$/, '$1')
							.toLowerCase()
						) {
							case 'mp4':
							case 'ogv':
								fileType = 'video';
								break;
							case 'mp3':
							case 'ogg':
								fileType = 'audio';
								break;
							default:
								fileType = 'img';
								break;
						}
						var controls = ['audio', 'video'].includes(fileType) ? ' controls=""' : '';
						if (event.target.getAttribute('data-target-fromts')) {
							diff.fromurl = event.target.getAttribute('data-target-fromurl');
							diff.fromtimestamp = event.target.getAttribute('data-target-fromts');
							diff.body = 
								'<tr>'+
								'<td class="diff-marker">−</td>'+
								'<td class="diff-deletedline"><div><'+fileType+controls+' src="'+event.target.getAttribute('data-target-fromurl')+'" /></div></td>'+
								'<td class="diff-marker">+</td>'+
								'<td class="diff-addedline"><div><'+fileType+controls+' src="'+event.target.getAttribute('data-target-tourl')+'" /></div></td>'+
								'</tr>';
						} else {
							diff.body = 
								'<tr>'+
									'<td colspan="2" class="diff-empty">&nbsp;</td>'+
									'<td class="diff-marker">+</td>'+
									'<td class="diff-addedline"><div><'+fileType+controls+' src="'+event.target.getAttribute('data-target-tourl')+'" /></div></td>'+
								'</tr>';
						}
					}
					//console.log(diff);
					quickview.show();
					quickview.setContent(
						'<div id="content" class=" page-content"><div id="mw-content-text" class="mw-body-content mw-content-ltr" lang="en" dir="ltr">'+
							'<table class="diff diff-contentalign-left diff-editfont-'+(mw.user.options.values.editfont||'default')+'" data-mw="interface">'+
								'<colgroup>'+
									'<col class="diff-marker">'+
									'<col class="diff-content">'+
									'<col class="diff-marker">'+
									'<col class="diff-content">'+
								'</colgroup>'+
								'<tbody>'+
									'<tr class="diff-title" lang="en">'+
										generateHeader(diff, turl)+
									'</tr>'+
									diff.body+
								'</tbody>'+
							'</table>'+
							(diff.log=='upload' ? '' : (
								'<hr />'+
								'<h1>Preview</h1>'+
								'<span class="wds-button quickDiff-preview">Click to render</span>'
							))+
						'</div></div>'
					);
					quickview.setTitle('Changes: '+diff.totitle);
					if (!diff.log) {
						betterDiff.waitFor('.oo-ui-widget-enabled.oo-ui-processDialog-title', function() {
							quickview.setTitle('Changes: '+diff.totitle);
							$('#quickDiff-quickview .quickDiff-preview').on('click', function() {
								$('#quickDiff-quickview .quickDiff-preview').replaceWith('<strong class="quickDiff-preview">Loading the preview!</strong>');
								betterDiff.api({
									action:'parse',
									oldid: diff.torevid,
									preview: true,
									usearticle: true,
									disablelimitreport: true,
									pst: true
								}, turl).then(function(render){
									$('#quickDiff-quickview .quickDiff-preview').replaceWith(
										(render.parse && render.parse.text && render.parse.text['*']) ? 
											render.parse.text['*'] :
											'<strong class="error">Failed to preview!</strong>'
									)
									/* Common toggles wont render so enable any that exists */
									.find('.mw-collapsible').makeCollapsible();
								});
							});
						});
						if (
							can.patrol &&
							(betterDiff.getLoad(turl)==(config.wgServerName+config.wgScriptPath)) &&
							tokens.patrol.length>2
						) {
							lApi.get({
								action: 'query',
								list: 'recentchanges',
								rcprop: 'ids|patrolled',
								format: 'json',
								rctitle: diff.totitle,
								formatversion: '2',
								rclimit: 'max'
							}).then(function(check) {
								var num = 0;
								var patrol = false;
								while (
									document.querySelector('#quickDiff-quickview #mw-diff-ntitle4') &&
									!document.querySelector('#quickDiff-quickview #mw-diff-ntitle4 > .patrollink') &&
									check.query.recentchanges[num] &&
									can.patrol && patrol == false
								) {
									// Add patrol button if any revision to patrol
									if (check.query.recentchanges[num].unpatrolled && (
										(diff.torevid && diff.fromrevid &&
										check.query.recentchanges[num].revid <= diff.torevid && check.query.recentchanges[num].revid >= 	diff.fromrevid) || 
										(diff.torevid && !diff.fromrevid &&
										check.query.recentchanges[num].revid == diff.torevid)
									)) {
										document.querySelector('#quickDiff-quickview #mw-diff-ntitle4').innerHTML +=
										'<span class="patrollink" data-mw="interface">['+
											'<a tabindex="0" '+
												'torevid="'+diff.torevid+'" '+
												'fromrevid="'+(diff.fromrevid ? diff.fromrevid : '0')+'" '+
												'title="'+diff.totitle.replace(/"/g, '&quot;')+'" '+
												(diff.fromtimestamp ? ('fromts="'+diff.fromtimestamp+'" ') : '')+
											'>'+
												'Mass Patrol'+
											'</a>'+
										']</span>';
										break;
									}
									num++;
								}
							});
						}
						betterDiff.api({
							action: 'query',
							prop: 'revisions',
							rvprop: 'ids',
							format: 'json',
							titles: diff.totitle,
							formatversion: '2',
							rvlimit: 'max'
						}, turl).then(function(check) {
							var revs = check.query.pages[0].revisions;
							var num = 0;
							var prev = false;
							var next = false;
							while ( revs[num] && ( prev == false || next == false ) ) {
								// Store revision after the displayed ones
								if (diff.torevid && revs[num].revid > diff.torevid) {
									next = revs[num].revid;
								}
								// Store revision before the displayed ones, even if new page creation
								if (prev == false && diff.fromrevid && revs[num].revid < diff.fromrevid	) {
									prev = revs[num].revid;
								}
								num++;
							}
							if (prev == false && num == revs.length && diff.torevid > revs[num-1].revid) {
								prev = revs[num-1].parentid;
							}
							if (next == false && num == revs.length && revs[num-1].parentid == 0 && diff.torevid == undefined) {
								next = revs[num-1].revid;
							}
							
							// Build left side
							if (prev !== false && !isNaN(prev) && document.querySelector('#quickDiff-quickview #mw-diff-otitle4')) {
								document.querySelector('#quickDiff-quickview #mw-diff-otitle4').innerHTML = 
								'<a '+
									'revid="'+(prev==0 ? revs[num-1].revid : prev)+'" '+
									'currid="'+diff.torevid+'" '+
									'title="'+diff.totitle.replace(/"/g, '&quot;')+'" '+
									'id="differences-prevlink" '+
									(prev==0 ? 'newdiff="yes" ' : '')+
									'data-url="'+turl+'" '+
								'>'+
									'← Older edit'+
								'</a>'+
								document.querySelector('#quickDiff-quickview #mw-diff-otitle4').innerHTML; //prepend to existing content
							}
							
							// Build right side
							if (next !== false && !isNaN(next) && document.querySelector('#quickDiff-quickview #mw-diff-ntitle4')) {
								document.querySelector('#quickDiff-quickview #mw-diff-ntitle4').innerHTML = 
								'<a '+
									'revid="'+next+'" '+
									'currid="'+(diff.torevid ? diff.fromrevid : next)+'" '+
									'title="'+diff.totitle.replace(/"/g, '&quot;')+'" '+
									'id="differences-nextlink" '+
									'data-url="'+turl+'" '+
								'>'+
									'Newer edit →'+
								'</a> '+
								document.querySelector('#quickDiff-quickview #mw-diff-ntitle4').innerHTML; // prepend to any existing content
								$('#quickDiff-quickview .diff-ntitle .mw-diff-edit > a').after(' | <a href="'+getURL(diff.totitle)+'?action=edit" title="'+diff.totitle.replace(/"/g, '&quot;')+'">curr</a>');
							}
						});
					}
				});
			};
			
			// Build modal and start up listeners
			mw.hook('dev.modal').add(function(Modal) {
				var buttons = [
					{
						// Open Diff
						text:'Open',
						id:'quickDiff-OpenLink',
						event: 'OpenLink'
					},
					{
						// Copy Diff Link
						text:'Copy',
						id:'quickDiff-CopyLink',
						event: 'CopyLink'
					}
				];
				
				// Only add page has list of diffs
				if (!config.wgDiffNewId) {
					buttons.push({
						// Open previous quick diff (up the list) (Keybind: ALT+2)
						text:'Up',
						id:'quickDiff-OpenPrev',
						event: 'OpenPrev'
					});
					buttons.push({
						// Open next quick diff (down the list) (ALT+3)
						text:'Down',
						id:'quickDiff-OpenNext',
						event: 'OpenNext'
					});
				}
				quickview = 
					new Modal.Modal({
						title: 'Quick Diff',
						id: 'quickDiff-quickview',
						size: 'full',
						content: '',
						buttons: buttons,
						events: {
							CopyLink: function() {
								navigator.clipboard.writeText(href);
							},
							OpenLink: function() {
								window.open(href);
							},
							OpenPrev: betterDiff.openPrev,
							OpenNext: betterDiff.openNext
						}
					});
				quickview.create();
				$(document).on('click.bdf keyup.bdf', function(event) {
					if (
						(event.type == 'keyup' && event.key == 'Enter') ||
						(event.type=='click')
					) {
						// Load diff modal
						if (event.target && (
							event.target.closest('.quickDiff') ||
							(
								event.target.closest('#quickDiff-quickview') &&
								['differences-nextlink', 'differences-prevlink'].includes(event.target.id)
							)
						)) {
							if (event.target.closest('.quickDiff')) {
								$('.quickDiff.link-focused').removeClass('link-focused');
								event.target.closest('.quickDiff').classList.add('link-focused');
							}
							if (settings){settings.hide();}
							generateModal(event);
							
						// Patrol revisions shown in modal if user has perms and there's any to patrol
						} else if (event.target && event.target.closest('.patrollink') && event.target.getAttribute('torevid')) {
							betterDiff.massPatrol();
						}
					}
				});
			});
		},
		
		// Get locations where to add custom link for quickDiff
		quickDiffLoad: function(els) {
			var addLink = function(diff) {
				if (diff && (
					diff.getAttribute('href') ||
					diff.closest('[data-mw-logaction^="upload"]')
				)) {
					diff.classList.add('quickDiffLoaded');
					var link = document.createElement('a');
					if (diff.closest('[data-mw-logaction^="upload"]')) {
						link.setAttribute('log', 'upload');
						link.setAttribute('data-target-page', diff.closest('[data-target-page]').getAttribute('data-target-page'));
						var tots = diff.closest('[data-mw-ts]').getAttribute('data-mw-ts');
						betterDiff.api({
							action: 'query',
							prop: 'imageinfo',
							titles: link.getAttribute('data-target-page'),
							iilimit: 'max',
							iiprop: 'parsedcomment|timestamp|user|url'
						}).then(function(e){
							var ii = Object.values(e.query.pages)[0].imageinfo;
							if (!ii) {return;}
							ii.forEach(function(img, idx){
								var date = new Date(img.timestamp);
								var ts = 
									date.getUTCFullYear().toString()+
									(date.getUTCMonth()+1).toString().padStart(2,0)+
									date.getUTCDate().toString().padStart(2,0)+
									date.getUTCHours().toString().padStart(2,0)+
									date.getUTCMinutes().toString().padStart(2,0)+
									date.getUTCSeconds().toString().padStart(2,0);
								if (ts==tots) {
									link.setAttribute('data-target-tots', img.timestamp);
									link.setAttribute('data-target-touser', img.user);
									link.setAttribute('data-target-tourl', img.url);
									link.setAttribute('data-target-tocmt', img.parsedcomment);
									if (ii[idx+1] && diff.closest('[data-mw-logaction="upload/overwrite"]')) {
										link.setAttribute('data-target-fromuser', ii[idx+1].user);
										link.setAttribute('data-target-fromurl', ii[idx+1].url);
										link.setAttribute('data-target-fromcmt', ii[idx+1].parsedcomment);
										link.setAttribute('data-target-fromts', ii[idx+1].timestamp);
									}
								}
							});
						});
					} else {
						var href = diff.getAttribute('href');
						var newid = (/diff=(\d+|prev|next)/.exec(href)||[])[1];
						if (!newid) {return;}
						var oldid = /oldid=\d+/.test(href) ? /oldid=(\d+)/.exec(href)[1] : '0';
						link.setAttribute('newid', newid);
						link.setAttribute('oldid', oldid);
						link.setAttribute('data-target-page', 
							diff.closest('[data-target-page]') ? 
								diff.closest('[data-target-page]').getAttribute('data-target-page') :
								decodeURIComponent(href.replace(/^.*?\/wiki\//, '').replace(/^(.*?)\?.+/, '$1')).replace(/_/g, ' ')
						);
						link.setAttribute('data-url', href);
					}
					link.innerHTML = 'view';
					link.classList.add('quickDiff');
					link.setAttribute('tabindex', '0');
					
					if (diff.parentElement.nodeName == 'SPAN') {
						var span = document.createElement('span');
						span.appendChild(link);
						diff.parentElement.after(span);
					} else if (diff.closest('.quickDiff-custom') || diff.closest('.diff-ntitle')) {
						diff.before('(', link, ') ');
					} else if (diff.closest('.diff-otitle, [data-mw-logaction^="upload"]')) {
						diff.after(' (', link, ')');
					} else {
						diff.after(' | ', link);
					}
				}
			};
			var cond = 
				'.mw-changeslist-diff:not(.quickDiffLoaded), '+
				'.mw-changeslist-groupdiff:not(.quickDiffLoaded), '+
				'.mw-history-histlinks > span:first-child + span > a:not(.quickDiffLoaded), '+
				'.quickDiff-custom li > a:not(.quickDiffLoaded, .quickDiff), '+
				'.page__main .diff a:is(#differences-nextlink, #differences-prevlink):not(.quickDiffLoaded, .quickDiff), '+
				'[data-mw-logaction^="upload"]:has(.mw-usertoollinks + :not(.new)) .mw-enhanced-rc-time:not(.quickDiffLoaded)';
			if (els) {
				els.filter(cond).each(function(_, el){ addLink(el); }); // run on elements that are the target
				els.find(cond).each(function(_, el){ addLink(el); }); // run on wrappers that contain the target
			} else {
				betterDiff.whenInView(cond, addLink);
			}
		},
		
		// Patrol inputted revid if user can patrol
		patrolRevisions: function(revisions, step) {
			if (can.patrol && revisions.length>0 && revisions[0].revid && tokens.patrol.length>2) {
				var r = structuredClone(revisions);
				var patrol = function() {
					var cr = r.shift();
					if (cr === undefined) {return;}
					if (step && 'function' == typeof step) {
						step(
							cr,					// current revid
							r.length,			// revisions left
							revisions.length	// total revisions
						);
					}
					function forcePatrol() {
						$.post(config.wgServer+'/wiki/'+encodeURIComponent(config.wgSiteName)+'?action=markpatrolled', {
							title: encodeURIComponent(config.wgSiteName),
							wpEditToken: tokens.wpET,
							redirectparams:	"rcid="+cr.rcid,
							rcid: cr.rcid
						}).then(patrol, patrol);
					}
					if (tokens.wpET!=='') {
						forcePatrol();
					} else {
						$.post(config.wgServer+'/wiki/?action=markpatrolled&rcid='+cr.rcid).then(function(e){
							tokens.wpET = $(e).find('[name="wpEditToken"]').attr('value');
							if (tokens.wpET!=='') {
								forcePatrol();
							} else {
								window.open(config.wgServer+'/wiki/?action=markpatrolled&rcid='+cr.rcid);
								window.focus();
							}
						});
					}
				};
				patrol();
			}
		},
		
		// Patrol multiple revisions in a row
		massPatrol: function() {
			if (
				document.querySelector('#quickDiff-quickview.oo-ui-window-active') ||
				(fP)
			) {
				// continue to custom mass patrolling
			}
			else if (document.querySelector('#mw-diff-ntitle4 #massPatrol > a')) {
				document.querySelector('#mw-diff-ntitle4 #massPatrol > a').click();
				return;
			}
			else if (document.querySelector(':is(.mw-parser-output + .patrollink, #mw-diff-ntitle4 .patrollink) > a')) {
				document.querySelector(':is(.mw-parser-output + .patrollink, #mw-diff-ntitle4 .patrollink) > a').click();
				return;
			}
			else if (!document.querySelector('.patrollink > a')) {
				// no target, do nothing, end
				return;
			}
			var link = document.querySelector('.patrollink > a');
			var wrapper = document.querySelector('.patrollink');
			wrapper.innerHTML = 
			'[<img class="loading-gif" src="//images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" />]';
			var torevid = fP ? false : link.getAttribute('torevid');
			var fromrevid = fP ? false : link.getAttribute('fromrevid');
			lApi.get({
				action: 'query',
				list: 'recentchanges',
				rcshow: '!patrolled',
				rcprop: 'ids',
				format: 'json',
				rctitle: link.getAttribute('title').replace(/\&quot;/g, '"'),
				formatversion: '2',
				rclimit: 'max'
			}).then(function(data) {
				var num = 0;
				var revids = [];
				while (data.query.recentchanges[num]) {
					if (
						(fP) ||
						(
							torevid && fromrevid &&
							data.query.recentchanges[num].revid >= fromrevid &&
							data.query.recentchanges[num].revid <= torevid
						) ||
						(
							torevid && !fromrevid &&
							data.query.recentchanges[num].revid == torevid
						)
					) {revids.push(data.query.recentchanges[num]);}
					num++;
				}
				if (revids.length>0) {
					betterDiff.patrolRevisions(
						revids,
						function (rev, left, total) {
							if (left == 0) { wrapper.innerHTML = '[Edits patrolled: '+total+']'; }
							else { wrapper.innerHTML = '[Patrolling '+total+' edits, '+left+' left...]'; }
						}
					);
				} else {
					wrapper.innerHTML = '[Error, no valid revisions found!]';
					console.log('api result:',data);
				}
			});
		},
		
		// Open next diff in RC or user contribs list
		openNext: function() {
			var curr = $(':is(table, li):has(.quickDiff.link-focused)');
			if (curr.length==0 || config.wgDiffNewId){return;}
			var next = null;
			function getNext(ref) {
				next = ref.next('table, li');
				// Get last of next group
				if (next.length==0) {
					next = (
					ref.is('table') ?
						ref.closest('.mw-changeslist > div').next('.mw-changeslist > h4').next('.mw-changeslist > div').has('table').children(':first-child') :
						(ref.closest('ul.mw-contributions-list').length>0 ?
							ref.closest('ul.mw-contributions-list').next('h4').next('ul.mw-contributions-list').has('li').children(':first-child') :
							ref.next()
						)
					);
					
					// No next group
					if (next.length==0) { next = null; }
					
				// Upload logs, Delete logs, Protect logs, etc...
				} else if (next.is('[class*="mw-changeslist-log-"]')) {
					getNext(next);
				}
			}
			getNext(curr);
			if (next && next.has('.quickDiff')) {
				// Attempt to load quickDiff just in case
				betterDiff.quickDiffLoad(next);
				
				// Load next diff
				curr.removeClass('link-focused');
				next.find('.quickDiff')[0].click();
			} else {
				alert('There is no next diff, good job!');
			}
		},
		
		// Open next diff in RC or user contribs list
		openPrev: function() {
			var curr = $(':is(table, li):has(.quickDiff.link-focused)');
			if (curr.length==0 || config.wgDiffNewId){return;}
			var prev = null;
			function getPrev(ref) {
				prev = ref.prev('table, li');
				// Get last of prev group
				if (prev.length==0) {
					prev = (
					ref.is('table') ?
						ref.closest('.mw-changeslist > div').prev('.mw-changeslist > h4').prev('.mw-changeslist > div').has('table').children(':last-child') :
						(ref.closest('ul.mw-contributions-list').length>0 ?
							ref.closest('ul.mw-contributions-list').prev('h4').prev('ul.mw-contributions-list').has('li').children(':last-child') :
							ref.prev()
						)
					);
					
					// No prev group
					if (prev.length==0) { prev = null; }
					
				// Upload logs, Delete logs, Protect logs, etc...
				} else if (prev.is('[class*="mw-changeslist-log-"]')) {
					getPrev(prev);
				}
			}
			getPrev(curr);
			if (prev && prev.has('.quickDiff')) {
				// Attempt to load quickDiff just in case
				betterDiff.quickDiffLoad(prev);
				
				// Load prev diff
				curr.removeClass('link-focused');
				prev.find('.quickDiff')[0].click();
			} else {
				alert('There is no prev diff, good job!');
			}
		},
		
		// Delay until element exists to run function
		waitFor: function(query, callback, extraDelay) {
			if ('function' == typeof callback && 'string' == typeof query) {
				extraDelay = extraDelay || 0;
				if (document.querySelector(query)) {
					setTimeout(callback, extraDelay);
				} else {
					// set up the mutation observer
					var observer = new MutationObserver(function (mutations, me) {
						// mutations is an array of mutations that occurred
						// me is the MutationObserver instance
						var targetNode = document.querySelector(query);
						if (targetNode) {
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
		
		// Run function when given element enters viewport
		whenInView: function(query, callback) {
			var handler = function(_i, el) {
				var rect = el.getBoundingClientRect();
				if (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
					rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
				) {
					callback(el);
				}
			};
			// initial load
			$(query).each(handler);
			
			// lazy load
			$(window).on('DOMContentLoaded.betterDiff load.betterDiff resize.betterDiff scroll.betterDiff', function(){
				$(query).each(handler);
			});
		},
		
		api: function(params, url) {
			var load = 'https://'+betterDiff.getLoad(url)+'/api.php';
			params.format = 'json';
			params.origin = '*';
			return $.ajax(load, {data: params});
		},
		
		getLoad: function (url) {
			return (url && url.search(/[\w\-]+\.fandom/)>=0) ?
				url.match(/([\w-]+\.fandom.*?)\/wiki/)[1] :
				(config.wgServerName+config.wgScriptPath);
    	}
	};
	
	// Load styles and start when API is loaded
	mw.loader.using(['mediawiki.api', 'mediawiki.diff.styles']).then(betterDiff.init);
});