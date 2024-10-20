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
	var api = new mw.Api();
	var config = mw.config.get([
		'wgDiffNewId',
		'wgAction',
		'wgCanonicalSpecialPageName',
		'wgServer',
		'wgNamespaceNumber',
		'wgPageName',
		'wgUserGroups'
	]);
	var tokens = {
		patrol: '',
		rollback: ''
	};
	var can = {
		block: config.wgUserGroups.some(function(group){return ['sysop', 'soap'].includes(group);}),
		patrol: config.wgUserGroups.some(function(group){return ['sysop', 'content-moderator'].includes(group);}),
		rollback: config.wgUserGroups.some(function(group){return ['sysop', 'content-moderator', 'rollback'].includes(group);})
	};
	
	// Main class
	var betterDiff = {
		init: function() {
			
			// Get tokens
			betterDiff.fetchTokens();
			
			// Load infobox styles for previews
			mw.loader.load('ext.fandom.PortableInfoboxFandomDesktop.css');
			
			// Add CSS
			mw.util.addCSS(
				'.tpWrapper {'+
					'display: flex;'+
					'width: 100%;'+
					'gap: 8px;'+
					'flex-direction: column;'+
				'}'+
				'.tpWrapper > label {'+
					'display: flex;'+
					'gap: 5px;'+
					'height: 30px;'+
				'}'+
				'.tpWrapper > label > :is(input, select) { flex-basis: 60%; }'+
				'.tpWrapper > label > .tpLabel { flex-basis: 25%; }'+
				'#tpOpen {white-space: nowrap;}'+
				'.tpWrapper input {'+
					'background: var(--theme-color-6);'+
					'color: var(--theme-page-text-color);'+
					'border: 0;'+
					'border-radius: 4px;'+
					'padding: 4px;'+
				'}'+
				'.tpWrapper svg {'+
					'vertical-align: middle;'+
					'fill: var(--theme-link-color);'+
				'}'+
				'.tpWrapper .bad-data, .tpWrapper .bad-data svg {color: var(--theme-alert-color); fill: var(--theme-alert-color);}'+
				'#tpDetails {'+
					'margin-right: 3px;'+
					'text-align: center;'+
					'border-top: 3px solid var(--theme-link-color);'+
					'margin-top: 5px;'+
				'}'+
				'#tpNS, #tpNS optgroup {'+
					'color: var(--theme-page-text-color);'+
					'border-radius: 5px;'+
					'background: var(--theme-page-background-color);'+
					'border: 1px solid var(--theme-link-color);'+
				'}'+
				'.loading-gif {'+
					'width: 16px;'+
					'vertical-align: middle;'+
					'border: 0;'+
				'}'+
				'.quickDiff {'+
					'cursor: pointer;'+
				'}'
			);
			
			// Check we're in Special:RecentChanges
			if (config.wgCanonicalSpecialPageName == 'Recentchanges') {
				betterDiff.waitFor('.mw-changeslist div', function(){
					betterDiff.newDiffLink();
					betterDiff.quickDiff();
					betterDiff.waitFor('.mw-rcfilters-ui-filterWrapperWidget-top', betterDiff.targettedPatrol);
					
					// start observing
					betterDiff.RecentChangesReload(function() {
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
			}
			
			// Check we're in a diff page
			else if (config.wgDiffNewId) {
				betterDiff.waitFor('#mw-diff-ntitle1', betterDiff.newDiff);
			}
			
			// Check if there's any custom-made diff list
			if (document.querySelector('.quickDiff-custom')) {
				betterDiff.quickDiffLoad();
				betterDiff.quickDiff();
			}
			
			document.addEventListener('keydown', function(event) {
				// Mouseless massPatrol
				if (event.altKey && ['1', 'p'].includes(event.key) && config.wgAction=='view') {
					betterDiff.massPatrol();
				}
				
				// Mouseless openPrev
				if (event.altKey && ['2'].includes(event.key) && config.wgAction=='view' && document.querySelector('#quickDiff-quickview.oo-ui-window-active')) {
					betterDiff.openPrev();
				}
				
				// Mouseless openNext
				if (event.altKey && ['3'].includes(event.key) && config.wgAction=='view' && document.querySelector('#quickDiff-quickview.oo-ui-window-active')) {
					betterDiff.openNext();
				}
			});
		},
		
		// Run callback every time Special:RecentChanges reloads results
		RecentChangesReload: function(callback, query) {
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
					api.get(api_opt).then(function(data) {
						table.innerHTML = '<colgroup><col class="diff-marker"><col class="diff-content"><col class="diff-marker"><col class="diff-content"></colgroup>' + table.innerHTML;
						table.querySelector('tbody').innerHTML = table.querySelector('tbody').innerHTML + diff.body;
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
												'<option value="2">User</option>'+
												'<option value="6">File</option>'+
												'<option value="10">Template</option>'+
												'<option value="14">Category</option>'+
												'<option value="828">Module</option>'+
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
									var api_sett = {
										action: 'query',
										list: 'recentchanges',
										rcshow: '!patrolled',
										rcprop: 'ids|title|redirect',
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
									if (Object.keys(api_sett).some(function(r){
										return ['rcuser', 'rcnamespace', 'rcstart', 'rcend'].includes(r);
									}) || yti.source!=='(?:)') {
										api.get(api_sett).then(function(data){
											var revs = (data.query.recentchanges || [])
											.filter(function(e){
												return  (yti.source=='(?:)' ? true : e.title.search(yti)!==-1) &&
														(nti.source=='(?:)' ? true : e.title.search(nti)===-1);
											});
											if (revs.length>0) {
												document.querySelector('#tpDetails').innerHTML = 'Patrolling '+revs.length+' edits...';
												betterDiff.patrolRevisions(
													revs,
													document.querySelector('#tpDetails'),
													{
														patrolled: 'Patrolled %patrolled% edits!',
														open: '%open% deleted edits opened!'
													},
													'Patrolling %tot% edits, %curr% left...'
												);
											} else {
												document.querySelector('#tpDetails').innerHTML = 'The specified filters return no edits to patrol!';
											}
										});
									} else { document.querySelector('#tpDetails').innerHTML = 'No filter specified.'; }
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
				betterDiff.fetchTokens(); // fetch tokens again just in case
				var generateHeader = function(data) {
					href = config.wgServer+mw.util.getUrl(data.totitle)+'?diff='+data.torevid;
					var header = '';
					var todate = new Date(data.totimestamp);
					var urlUser;
					
					// Old revid
					if (data.fromtimestamp) {
						href += '&oldid='+data.fromrevid; // Complete diff link
						
						var fromdate = new Date(data.fromtimestamp);
						urlUser = encodeURIComponent(data.fromuser.replace(/ /g, '_'));
						header +=
						'<td class="diff-otitle diff-side-deleted" colspan="2">'+
							'<div id="mw-diff-otitle1">'+
								'<strong>'+
									'<a href="'+config.wgServer+mw.util.getUrl(data.fromtitle)+'?oldid='+data.fromrevid+'" title="'+data.fromtitle.replace(/"/g, '&quot;')+'">'+
										'Revision as of '+
										fromdate.getHours().toString().padStart(2, '0')+':'+fromdate.getMinutes().toString().padStart(2, '0')+
										', '+fromdate.getDate()+' '+
										(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(fromdate))+' '+
										fromdate.getFullYear()+
									'</a> '+
									'<span class="mw-diff-edit">('+
										'<a href="'+config.wgServer+mw.util.getUrl(data.fromtitle)+'?action=edit&oldid='+data.fromrevid+'" title="'+data.fromtitle.replace(/"/g, '&quot;')+'">edit</a>'+
									')</span>'+
								'</strong>'+
							'</div>'+
							'<div id="mw-diff-otitle2">'+
								'<a href="/wiki/User:'+urlUser+'" class="mw-userlink" title="User:'+data.fromuser+'"><bdi>'+data.fromuser+'</bdi></a> '+
								'<span class="mw-usertoollinks">('+
									'<a href="/wiki/Message_Wall:'+urlUser+'" class="mw-usertoollinks-wall" title="Message Wall:'+data.fromuser+'">wall</a> | '+
									'<a href="/wiki/Special:Contributions/'+urlUser+'" class="mw-usertoollinks-contribs" title="Special:Contributions/'+data.fromuser+'">contribs</a>'+
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
					urlUser = encodeURIComponent(data.touser.replace(/ /g, '_'));
					header +=
					'<td class="diff-ntitle" colspan="'+(data.fromtimestamp ? '2' : '4')+'">'+
						'<div id="mw-diff-ntitle1">'+
							'<strong>'+
								'<a href="'+config.wgServer+mw.util.getUrl(data.totitle)+'?oldid='+data.torevid+'" title="'+data.totitle.replace(/"/g, '&quot;')+'">'+
									'Revision as of '+
									todate.getHours().toString().padStart(2, '0')+':'+todate.getMinutes().toString().padStart(2, '0')+
									', '+todate.getDate()+' '+
									(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(todate))+' '+
									todate.getFullYear()+
								'</a> '+
								'<span class="mw-diff-edit">('+
									'<a href="'+config.wgServer+mw.util.getUrl(data.totitle)+'?action=edit&oldid='+data.torevid+'" title="'+data.totitle.replace(/"/g, '&quot;')+'">edit</a>'+
								')</span> '+
								'<span class="mw-diff-undo">('+
									'<a href="'+config.wgServer+mw.util.getUrl(data.totitle)+'?action=edit&undoafter='+data.fromrevid+'&undo='+data.torevid+'" title="&quot;Undo&quot; reverts this edit and opens the edit form in preview mode. It allows adding a reason in the summary.">undo</a>'+
								')</span>'+
							'</strong>'+
						'</div>'+
						'<div id="mw-diff-ntitle2">'+
							'<a href="/wiki/User:'+urlUser+'" class="mw-userlink" title="User:'+data.touser+'"><bdi>'+data.touser+'</bdi></a> '+
							'<span class="mw-usertoollinks">('+
								'<a href="/wiki/Message_Wall:'+urlUser+'" class="mw-usertoollinks-wall" title="Message Wall:'+data.touser+'">wall</a> | '+
								'<a href="/wiki/Special:Contributions/'+urlUser+'" class="mw-usertoollinks-contribs" title="Special:Contributions/'+data.touser+'">contribs</a>'+
							')</span> '+
							(tokens.rollback.length>2 ? (
								'<span class="mw-rollback-link">'+
									'<a href="'+
										config.wgServer+mw.util.getUrl(data.fromtitle)+
										'?action=rollback&from='+urlUser+
										'&token='+tokens.rollback+'" '+
										'title="&quot;Rollback&quot; reverts the last contributor\'s edit(s) to this page in one click"'+
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
					api_opt[event.target.getAttribute('newid')=='prev'? 'torelative' : 'torev'] = event.target.getAttribute('newid');
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
				
				api.get(api_opt).then(function(e) {
					var diff = e.compare;
					quickview.show();
					quickview.setContent(
						'<div id="content" class=" page-content"><div id="mw-content-text" class="mw-body-content mw-content-ltr" lang="en" dir="ltr">'+
							'<table class="diff diff-contentalign-left diff-editfont-default" data-mw="interface">'+
								'<colgroup>'+
									'<col class="diff-marker">'+
									'<col class="diff-content">'+
									'<col class="diff-marker">'+
									'<col class="diff-content">'+
								'</colgroup>'+
								'<tbody>'+
									'<tr class="diff-title" lang="en">'+
										generateHeader(diff)+
									'</tr>'+
									diff.body+
								'</tbody>'+
							'</table>'+
							'<hr />'+
							'<h1>Preview</h1>'+
							'<span class="wds-button quickDiff-preview">Click to render</span>'+
						'</div></div>'
					);
					betterDiff.waitFor('.oo-ui-widget-enabled.oo-ui-processDialog-title', function() {
						quickview.setTitle('Changes: '+diff.totitle);
						$('#quickDiff-quickview .quickDiff-preview').on('click', function() {
							$('#quickDiff-quickview .quickDiff-preview').replaceWith('<strong class="quickDiff-preview">Loading the preview!</strong>');
							api.get({
								action:'parse',
								oldid: diff.torevid,
								preview: true,
								usearticle: true,
								disablelimitreport: true
							}).then(function(render){
								$('#quickDiff-quickview .quickDiff-preview').replaceWith(
									(render.parse && render.parse.text && render.parse.text['*']) ? 
										render.parse.text['*'] :
										'<strong class="error">Failed to preview!</strong>'
								);
							});
						});
					});
					quickview.setTitle('Changes: '+diff.totitle);
					if (can.patrol && tokens.patrol.length>2) {
						api.get({
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
								!document.querySelector('#mw-diff-ntitle4 > .patrollink') &&
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
									document.querySelector('#mw-diff-ntitle4').innerHTML +=
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
						}).catch(console.log);
					}
					api.get({
						action: 'query',
						prop: 'revisions',
						rvprop: 'ids',
						format: 'json',
						titles: diff.totitle,
						formatversion: '2',
						rvlimit: 'max'
					}).then(function(check) {
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
						if (prev !== false && !isNaN(prev) && document.querySelector('#mw-diff-otitle4')) {
							document.querySelector('#mw-diff-otitle4').innerHTML = 
							'<a '+
								'revid="'+(prev==0 ? revs[num-1].revid : prev)+'" '+
								'currid="'+diff.torevid+'" '+
								'title="'+diff.totitle.replace(/"/g, '&quot;')+'" '+
								'id="differences-prevlink" '+
								(prev==0 ? 'newdiff="yes" ' : '')+
							'>'+
								'← Older edit'+
							'</a>'+
							document.querySelector('#mw-diff-otitle4').innerHTML; //prepend to existing content
						}
						
						// Build right side
						if (next !== false && !isNaN(next) && document.querySelector('#mw-diff-ntitle4')) {
							document.querySelector('#mw-diff-ntitle4').innerHTML = 
							'<a '+
								'revid="'+next+'" '+
								'currid="'+(diff.torevid ? diff.fromrevid : next)+'" '+
								'title="'+diff.totitle.replace(/"/g, '&quot;')+'" '+
								'id="differences-nextlink"'+
							'>'+
								'Newer edit →'+
							'</a> '+
							document.querySelector('#mw-diff-ntitle4').innerHTML; // prepend to any existing content
							$('.diff-ntitle .mw-diff-edit > a').after(' | <a href="'+config.wgServer+mw.util.getUrl(diff.totitle)+'?action=edit" title="'+diff.totitle.replace(/"/g, '&quot;')+'">curr</a>');
						}
					}).catch(console.log);
					
				}).catch(console.log);
			};
			
			// Build modal and start up listeners
			mw.hook('dev.modal').add(function(Modal) {
				quickview = 
					new Modal.Modal({
						title: 'Quick Diff',
						id: 'quickDiff-quickview',
						size: 'full',
						content: '',
						buttons: [
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
							},
							{
								// Open previous quick diff (up the list) (Keybind: ALT+2)
								text:'Up',
								id:'quickDiff-OpenPrev',
								event: 'OpenPrev'
							},
							{
								// Open next quick diff (down the list) (ALT+3)
								text:'Down',
								id:'quickDiff-OpenNext',
								event: 'OpenNext'
							}
						],
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
							event.target.id == 'differences-nextlink' ||
							event.target.id == 'differences-prevlink'
						)) {
							if (event.target.closest('.quickDiff')) {
								$('.quickDiff.link-focused').removeClass('link-focused');
								event.target.closest('.quickDiff').classList.add('link-focused');
							}
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
				if (diff && diff.getAttribute('href')) {
					var href = diff.getAttribute('href');
					var newid = /diff=(\d+|prev)/.exec(href)[1];
					var oldid = /oldid=\d+/.test(href) ? /oldid=(\d+)/.exec(href)[1] : '0';
					var link = document.createElement('a');
					link.setAttribute('newid', newid);
					link.setAttribute('oldid', oldid);
					link.setAttribute('data-target-page', 
						diff.closest('table, li').querySelector('a.mw-changeslist-title, a.mw-contributions-title') ?
							diff.closest('table, li').querySelector('a.mw-changeslist-title, a.mw-contributions-title').getAttribute('title') :
							decodeURIComponent(href.replace(/^.*?\/wiki\//, '').replace(/^(.*?)\?.+/, '$1')).replace(/_/g, ' ')
					);
					link.innerHTML = 'view';
					link.classList.add('quickDiff');
					link.setAttribute('tabindex', '0');
					diff.classList.add('quickDiffLoaded');
					
					if (diff.parentElement.nodeName == 'SPAN') {
						var span = document.createElement('span');
						span.appendChild(link);
						diff.parentElement.after(span);
					} else if (diff.closest('.quickDiff-custom')){
						diff.before('(', link, ') ');
					} else {
						diff.after(' | ', link);
					}
				}
			};
			var cond = 
				'.mw-changeslist-diff:not(.quickDiffLoaded), '+
				'.mw-changeslist-groupdiff:not(.quickDiffLoaded), '+
				'.mw-history-histlinks > span:first-child + span > a:not(.quickDiffLoaded), '+
				'.quickDiff-custom li > a:not(.quickDiffLoaded, .quickDiff)';
			if (els) {
				els.filter(cond).each(function(_, el){ addLink(el); }); // run on elements that are the target
				els.find(cond).each(function(_, el){ addLink(el); }); // run on wrappers that contain the target
			} else {
				betterDiff.whenInView(cond, addLink);
			}
		},
		
		// Patrol inputted revid if user can patrol
		patrolRevisions: function(revisions, el, ret, dur) {
			console.log(revisions, 'revisions to patrol');
			if (can.patrol && revisions.length>0 && revisions[0].revid && tokens.patrol.length>2) {
				var r = structuredClone(revisions);
				var types = {
					patrolled: 0,
					open: 0
				};
				var patrol = function(log) {
					if (r.length === 0) {
						if (el && ret) {
							el.innerHTML = (
								((ret.patrolled && types.patrolled>0) ? ret.patrolled.replace(/\%patrolled\%/, types.patrolled) : '')+
								((ret.patrolled && types.patrolled>0 && ret.open && types.open>0) ? '; ' : '')+
								((ret.open && types.open>0) ? ret.open.replace(/\%open\%/, types.open) : '')
							);
						}
						return;
					} else {
						if (el && dur) {
							el.innerHTML = dur.replace(/\%curr\%/, r.length).replace(/\%tot\%/, revisions.length);
						}
					}
					var cr = r.shift();
					if (cr.rcid && log && log == 'nosuchrevid') {
						console.log('deleted rcid:', cr.rcid);
						types.open++;
						window.open(config.wgServer+'/wiki/?action=markpatrolled&rcid='+cr.rcid);
						window.focus();
					} else {
						types.patrolled++;
						if (log) {console.log('error msg:', log);}
					}
					api.post({
						action: 'patrol',
						format: 'json',
						revid: cr.revid,
						token: tokens.patrol
					}).then(patrol, patrol);
				};
				patrol();
			}
		},
		
		fetchTokens: function() {
			// Fetch rollback token, the one from API is invalid for URL use
			if (can.rollback && tokens.rollback=='' && document.querySelector('.mw-rollback-link a')) {
				tokens.rollback = document.querySelector('.mw-rollback-link a').href.replace(/^.+token=/, '');
			}
			
			// Fetch patrol token
			if (can.patrol) {
				api.get({
					meta: 'tokens',
					type: 'patrol'
				}).then(function(data){
					if (data.query.tokens.patroltoken && data.query.tokens.patroltoken.length>2) {
						tokens.patrol = data.query.tokens.patroltoken;
					}
				});
			}
		},
		
		massPatrol: function() {
			if (document.querySelector('#quickDiff-quickview.oo-ui-window-active')) {
				// continue to custom mass patrolling
			}
			else if (document.querySelector('#mw-diff-ntitle4 #massPatrol > a')) {
				document.querySelector('#mw-diff-ntitle4 #massPatrol > a').click();
			}
			else if (document.querySelector(':is(.mw-parser-output + .patrollink, #mw-diff-ntitle4 .patrollink) > a')) {
				document.querySelector(':is(.mw-parser-output + .patrollink, #mw-diff-ntitle4 .patrollink) > a').click();
			}
			else if (!document.querySelector('.patrollink > a')) {
				// no target, do nothing and end
				return;
			}
			var link = document.querySelector('.patrollink > a');
			var wrapper = document.querySelector('.patrollink');
			wrapper.innerHTML = 
			'[<img class="loading-gif" src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" />]';
			var torevid = link.getAttribute('torevid');
			var fromrevid = link.getAttribute('fromrevid');
			api.get({
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
						wrapper,
						{patrolled:'[Edits patrolled: %patrolled%]'},
						'[Patrolling %tot% edits, %curr% left...]'
					);
				} else {
					wrapper.innerHTML = '[Error, no valid revisions found!]';
					console.log('api result:',data);
				}
			}).catch(function(err){
				wrapper.innerHTML = '[API error!]';
				console.log('api result:', err);
			});
		},
		
		// Open next diff in RC or user contribs list
		openNext: function() {
			var curr = $(':is(table, li):has(.quickDiff.link-focused)');
			if (curr.length==0){return;}
			var next = null;
			function getNext(ref) {
				next = ref.next('table, li');
				// Get last of next group
				if (next.length==0) {
					next = (ref.is('table') ?
						ref.closest('.mw-changeslist > div').next('.mw-changeslist > h4').next('.mw-changeslist > div').has('table') :
						ref.closest('ul.mw-contributions-list').next('h4').next('ul.mw-contributions-list').has('li')
					).children(':first-child');
					
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
			if (curr.length==0){return;}
			var prev = null;
			function getPrev(ref) {
				prev = ref.prev('table, li');
				// Get last of prev group
				if (prev.length==0) {
					prev = (ref.is('table') ?
						ref.closest('.mw-changeslist > div').prev('.mw-changeslist > h4').prev('.mw-changeslist > div').has('table') :
						ref.closest('ul.mw-contributions-list').prev('h4').prev('ul.mw-contributions-list').has('li')
					).children(':last-child');
					
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
	};
	
	// Load styles and start when API is loaded
	mw.loader.using(['mediawiki.api', 'mediawiki.diff.styles']).then(betterDiff.init);
	
});