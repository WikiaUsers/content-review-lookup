$(function() {

	// Double load protection
	if (window.dev && window.dev.BetterDiff) {return;}
	(window.dev = window.dev || {}).BetterDiff = true;
	
    // Load dependencies and cache
    importArticles({
        type: 'script',
        articles: [ 'u:dev:MediaWiki:Modal.js' ]
    });
    var popup; // for global use once defined
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
			
			// Add css
			mw.util.addCSS(
				'.targetedPatrolWrapper {'+
					'display: flex;'+
					'width: 100%;'+
					'gap: 3px;'+
					'align-items: center;'+
				'}'+
				'#targetedPatrolUser {'+
					'background: var(--theme-color-6);'+
					'color: var(--theme-page-text-color);'+
					'border: 0;'+
					'border-radius: 4px;'+
					'padding: 4px;'+
				'}'+
				'#targetedPatrolDetails {'+
					'margin-right: 3px;'+
					'white-space: nowrap;'+
				'}'+
				'#targetedPatrolNS, #targetedPatrolNS optgroup {'+
					'color: var(--theme-page-text-color);'+
					'border-radius: 5px;'+
					'background: var(--theme-page-background-color);'+
					'border: 1px solid var(--theme-link-color);'+
				'}'+
				'#submitTargetedPatrol {'+
					'white-space: nowrap;'+
					'padding: 1px 3px;'+
					'position: relative;'+
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
					betterDiff.waitFor('.mw-rcfilters-ui-filterWrapperWidget-top', betterDiff.targetedPatrol);
					
					// start observing
					betterDiff.RecentChangesReload(betterDiff.newDiffLink);
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
			
			document.addEventListener('keydown', function(event) {
				// Mouseless massPatrol
				if (event.altKey && ['1', 'p'].includes(event.key) && config.wgAction=='view') {
					betterDiff.massPatrol();
				}
				
				// Mouseless openPrev
				if (event.altKey && ['2'].includes(event.key) && config.wgAction=='view' && document.querySelector('#quickDiff-popup.oo-ui-window-active')) {
					betterDiff.openPrev();
				}
				
				// Mouseless openNext
				if (event.altKey && ['3'].includes(event.key) && config.wgAction=='view' && document.querySelector('#quickDiff-popup.oo-ui-window-active')) {
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
						table.querySelector('tbody').innerHTML = table.querySelector('tbody').innerHTML + data.compare.body;
					});
				}
			}
			
		},
		
		// Mass patrol recent edits from specific user and/or namespace
		targetedPatrol: function() {
			if (!document.querySelector('#targetedPatrol') && can.patrol) {
				var wrapper = $(
					'<div class="targetedPatrolWrapper">'+
						'<span id="targetedPatrolDetails"></span>'+
						'<select name="targetedPatrolNS" id="targetedPatrolNS">'+
							'<optgroup label="Namespace to patrol:">'+
								'<option value="-99">All</option>'+
								'<option value="0">Main</option>'+
								'<option value="2">User</option>'+
								'<option value="6">File</option>'+
								'<option value="10">Template</option>'+
								'<option value="14">Category</option>'+
								'<option value="828">Module</option>'+
							'</optgroup>'+
						'</select>'+
						'<input name="targetedPatrolUser" id="targetedPatrolUser" placeholder="User to mass patrol" />'+
						'<span class="wds-button" id="submitTargetedPatrol">Patrol</span>'+
					'</div>'
				);
				var cell = $('.mw-rcfilters-ui-table-placeholder');
				cell.append(wrapper);
				cell.css('vertical-align', 'middle');
				var submitPatrol = function () {
					var api_sett = {
						action: 'query',
						list: 'recentchanges',
						rcshow: '!patrolled',
						rcprop: 'ids',
						rcuser: user,
						format: 'json',
						formatversion: '2',
						rclimit: 'max'
					};
					
					// User filter
					var user = document.querySelector('#targetedPatrolUser').value.replace(/^User:/, ''); // Username without the "User:" prefix
					if (user.length>0) {api_sett.rcuser = user;}
					
					// Namespace filter
					var ns = document.querySelector('#targetedPatrolNS').selectedOptions[0].value;
					if (ns !== "-99") {api_sett.rcnamespace = ns;}
					
					// Attempt patrol
					if (user.length>0 || ns !== "-99") {
						api.get(api_sett).then(function(data){
							if (data.query.recentchanges.length>0) {
								document.querySelector('#targetedPatrolDetails').innerHTML = 'Patrolling '+data.query.recentchanges.length+' edits...';
								betterDiff.patrolRevisions(
									data.query.recentchanges,
									document.querySelector('#targetedPatrolDetails'),
									{
										patrolled: 'Patrolled %patrolled% edits!',
										open: '%open% deleted edits opened!'
									},
									'Patrolling %tot% edits, %curr% left...'
								);
							} else {
								document.querySelector('#targetedPatrolDetails').innerHTML = (user.length>0 ? 'User' : 'Namespace')+' has no edits to patrol!';
							}
						});
					} else { document.querySelector('#targetedPatrolDetails').innerHTML = 'No user or namespace specified.'; }
				};
				document.querySelector('#submitTargetedPatrol').addEventListener('click', submitPatrol);
				document.querySelector('#targetedPatrolUser').addEventListener('keypress', function(event){ if (event.key === 'Enter') {submitPatrol();} });
			} else { console.log('User does not have patrolling rights.'); }
		},
		
		// Diff pages but without moving away from the page, allowing patrolling still
		quickDiff: function() {
			// Diff link string's storage for "Open" and "Copy" buttons
			var href = '';
			betterDiff.quickDiffLoad();
			
			var generateModal = function(event) {
				betterDiff.fetchTokens();
				var generateHeader = function(data) {
					href = config.wgServer+mw.util.getUrl(data.totitle)+'?diff='+data.torevid;
					var header = '';
					var todate = new Date(data.totimestamp);
					
					// Old revid
					if (data.fromtimestamp) {
						href += '&oldid='+data.fromrevid; // Complete diff link
						
						var fromdate = new Date(data.fromtimestamp);
						header +=
						'<td class="diff-otitle diff-side-deleted" colspan="2">'+
							'<div id="mw-diff-otitle1">'+
								'<strong>'+
									'<a href="'+config.wgServer+mw.util.getUrl(data.fromtitle)+'?oldid='+data.fromrevid+'" title="'+data.fromtitle.replace(/"/g, '&quot;')+'">'+
										'Revision as of '+
										fromdate.getHours()+':'+fromdate.getMinutes()+
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
								'<a href="/wiki/User:'+data.fromuser+'" class="mw-userlink" title="User:'+data.fromuser+'"><bdi>'+data.fromuser+'</bdi></a> '+
								'<span class="mw-usertoollinks">('+
									'<a href="/wiki/Message_Wall:'+data.fromuser+'" class="mw-usertoollinks-wall" title="Message Wall:'+data.fromuser+'">wall</a> | '+
									'<a href="/wiki/Special:Contributions/'+data.fromuser+'" class="mw-usertoollinks-contribs" title="Special:Contributions/'+data.fromuser+'">contribs</a>'+
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
								'<a href="'+config.wgServer+mw.util.getUrl(data.totitle)+'?oldid='+data.torevid+'" title="'+data.totitle.replace(/"/g, '&quot;')+'">'+
									'Revision as of '+
									todate.getHours()+':'+todate.getMinutes()+
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
							'<a href="/wiki/User:'+data.touser+'" class="mw-userlink" title="User:'+data.touser+'"><bdi>'+data.touser+'</bdi></a> '+
							'<span class="mw-usertoollinks">('+
								'<a href="/wiki/Message_Wall:'+data.touser+'" class="mw-usertoollinks-wall" title="Message Wall:'+data.touser+'">wall</a> | '+
								'<a href="/wiki/Special:Contributions/'+data.touser+'" class="mw-usertoollinks-contribs" title="Special:Contributions/'+data.touser+'">contribs</a>'+
							')</span> '+
							(tokens.rollback.length>2 ? (
								'<span class="mw-rollback-link">'+
									'<a href="'+
										config.wgServer+mw.util.getUrl(data.fromtitle)+
										'?action=rollback&from='+data.touser+
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
				
				api.get(api_opt).then(function(data) {
					popup.show();
					popup.setContent(
						'<table class="diff diff-contentalign-left diff-editfont-default" data-mw="interface">'+
							'<colgroup>'+
								'<col class="diff-marker">'+
								'<col class="diff-content">'+
								'<col class="diff-marker">'+
								'<col class="diff-content">'+
							'</colgroup>'+
							'<tbody>'+
								'<tr class="diff-title" lang="en">'+
									generateHeader(data.compare)+
								'</tr>'+
								data.compare.body+
							'</tbody>'+
						'</table>'
					);
					betterDiff.waitFor('.oo-ui-widget-enabled.oo-ui-processDialog-title', function() {
						popup.setTitle('Changes: '+data.compare.totitle);
					});
					popup.setTitle('Changes: '+data.compare.totitle);
					if (can.patrol && tokens.patrol.length>2) {
						api.get({
							action: 'query',
							list: 'recentchanges',
							rcprop: 'ids|patrolled',
							format: 'json',
							rctitle: data.compare.totitle,
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
									(data.compare.torevid && data.compare.fromrevid &&
									check.query.recentchanges[num].revid <= data.compare.torevid && check.query.recentchanges[num].revid >= 	data.compare.fromrevid) || 
									(data.compare.torevid && !data.compare.fromrevid &&
									check.query.recentchanges[num].revid == data.compare.torevid)
								)) {
									document.querySelector('#mw-diff-ntitle4').innerHTML +=
									'<span class="patrollink" data-mw="interface">['+
										'<a tabindex="0" '+
											'torevid="'+data.compare.torevid+'" '+
											'fromrevid="'+(data.compare.fromrevid ? data.compare.fromrevid : '0')+'" '+
											'title="'+data.compare.totitle.replace(/"/g, '&quot;')+'" '+
											(data.compare.fromtimestamp ? ('fromts="'+data.compare.fromtimestamp+'" ') : '')+
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
						titles: data.compare.totitle,
						formatversion: '2',
						rvlimit: 'max'
					}).then(function(check) {
						var revs = check.query.pages[0].revisions;
						var num = 0;
						var prev = false;
						var next = false;
						while ( revs[num] && ( prev == false || next == false ) ) {
							// Store revision after the displayed ones
							if (data.compare.torevid && revs[num].revid > data.compare.torevid) {
								next = revs[num].revid;
							}
							// Store revision before the displayed ones, even if new page creation
							if (prev == false && data.compare.fromrevid && revs[num].revid < data.compare.fromrevid	) {
								prev = revs[num].revid;
							}
							num++;
						}
						if (prev == false && num == revs.length && data.compare.torevid > revs[num-1].revid) {
							prev = revs[num-1].parentid;
						}
						if (next == false && num == revs.length && revs[num-1].parentid == 0 && data.compare.torevid == undefined) {
							next = revs[num-1].revid;
						}
						
						// Build left side
						if (prev !== false && !isNaN(prev) && document.querySelector('#mw-diff-otitle4')) {
							document.querySelector('#mw-diff-otitle4').innerHTML = 
							'<a '+
								'revid="'+(prev==0 ? revs[num-1].revid : prev)+'" '+
								'currid="'+data.compare.torevid+'" '+
								'title="'+data.compare.totitle.replace(/"/g, '&quot;')+'" '+
								'id="differences-prevlink" '+
								(prev==0 ? 'newdiff="yes" ' : '')+
							'>'+
								'← Older edit'+
							'</a>'; //prepend to existing content
						}
						
						// Build right side
						if (next !== false && !isNaN(next) && document.querySelector('#mw-diff-ntitle4')) {
							document.querySelector('#mw-diff-ntitle4').innerHTML = 
							'<a '+
								'revid="'+next+'" '+
								'currid="'+(data.compare.torevid ? data.compare.fromrevid : next)+'" '+
								'title="'+data.compare.totitle.replace(/"/g, '&quot;')+'" '+
								'id="differences-nextlink"'+
							'>'+
								'Newer edit →'+
							'</a> '+
							document.querySelector('#mw-diff-ntitle4').innerHTML; // prepend to any existing content
						}
					}).catch(console.log);
					
				}).catch(console.log);
			};
			
			// Build modal and start up listeners
			mw.hook('dev.modal').add(function(Modal) {
				popup = 
					new Modal.Modal({
						title: 'Quick Diff',
						id: 'quickDiff-popup',
						size: 'full',
						content: '',
						buttons: [
							{
								text:'Open',
								title:'Open Diff',
								id:'quickDiff-OpenLink',
								event: 'OpenLink'
							},
							{
								text:'Copy',
								title:'Copy Diff Link',
								id:'quickDiff-CopyLink',
								event: 'CopyLink'
							},
							{
								text:'Prev',
								title:'Open previous quick diff in the list (ALT+2)',
								id:'quickDiff-OpenPrev',
								event: 'OpenPrev'
							},
							{
								text:'Next',
								title:'Open next quick diff in the list (ALT+3)',
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
				popup.create();
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
								if (document.querySelector('.link-focused')) {document.querySelector('.link-focused').classList.remove('link-focused');}
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
							config.wgPageName
					);
					link.innerHTML = 'view';
					link.classList.add('quickDiff');
					link.setAttribute('tabindex', '0');
					diff.classList.add('quickDiffLoaded');
					
					if (diff.parentElement.nodeName == 'SPAN') {
						var span = document.createElement('span');
						span.appendChild(link);
						diff.parentElement.after(span);
					} else {
						diff.after(' | ', link);
					}
				}
			};
			var cond = 
				'.mw-changeslist-diff:not(.quickDiffLoaded), '+
				'.mw-changeslist-groupdiff:not(.quickDiffLoaded), '+
				'.mw-history-histlinks > span:first-child + span > a:not(.quickDiffLoaded)';
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
						types.open++;
						window.open(config.wgServer+'/wiki/?action=markpatrolled&rcid='+cr.rcid);
						window.focus();
					} else {
						types.patrolled++;
						console.log('tokens', tokens);
						console.log('error msg:', log);
					}
					api.post({
						action: 'patrol',
						format: 'json',
						revid: cr.revid,
						token: tokens.patrol
					}).then(patrol);
				};
				patrol();
			}
		},
		
		fetchTokens: function() {
			// Fetch rollback token, the one from API is invalid for URL use
			if (tokens.rollback=='' && document.querySelector('.mw-rollback-link a')) {
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
			if (document.querySelector('#quickDiff-popup.oo-ui-window-active')) {
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
				wrapper.innerHTML = '[API error, please contact <a href="/wiki/User:Mikevoir">Mikevoir</a>!]';
				console.log('api result:', err);
			});
		},
		
		// Open next diff in RC or user contribs list
		openNext: function() {
			var curr = $(':is(table, li):has(.quickDiff.link-focused)');
			if (curr.length==0){return;}
			var next = curr.next('table, li');
			// Last diff in group
			if (next.length==0) {
				next = curr.is('table') ?
					curr.closest('.mw-changeslist > div').next('.mw-changeslist > h4').next('.mw-changeslist > div').has('table') :
					curr.closest('ul.mw-contributions-list').next('h4').next('ul.mw-contributions-list').has('li');
				if (next.length==0) {
					// No next group, end early
					alert('There is no next diff, good job!');
					return;
				} else {
					// Get first of next group
					next = next.children(':first-child');
				}
			}
			
			// Attempt to load quickDiff just in case
			betterDiff.quickDiffLoad(next);
			
			// Load next diff
			next.find('.quickDiff')[0].click();
		},
		
		// Open next diff in RC or user contribs list
		openPrev: function() {
			var curr = $(':is(table, li):has(.quickDiff.link-focused)');
			if (curr.length==0){return;}
			var prev = curr.prev('table, li');
			// Last diff in group
			if (prev.length==0) {
				prev = curr.is('table') ?
					curr.closest('.mw-changeslist > div').prev('.mw-changeslist > h4').prev('.mw-changeslist > div').has('table') :
					curr.closest('ul.mw-contributions-list').prev('h4').prev('ul.mw-contributions-list').has('li');
				if (prev.length==0) {
					// No prev group, end early
					alert('There is no prev diff, good job!');
					return;
				} else {
					// Get last of prev group
					prev = prev.children(':last-child');
				}
			}
			
			// Attempt to load quickDiff just in case
			betterDiff.quickDiffLoad(prev);
			
			// Load prev diff
			prev.find('.quickDiff')[0].click();
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
			$(window).on('DOMContentLoaded.mikeLib load.mikeLib resize.mikeLib scroll.mikeLib', function(){
				$(query).each(handler);
			});
		},

	};
	
	// Load styles and start when API is loaded
	mw.loader.using(['mediawiki.api', 'mediawiki.diff.styles']).then(betterDiff.init);
	
});