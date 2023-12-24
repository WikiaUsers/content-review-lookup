// Improved Diff links, and other minor adjustments to Recent Changes
// written by User:Mikevoir for the Genshin Impact Wiki
// 
// Current revision: 12/18/2023 16:17

$(function() {

	// Double load protection
	if (window.dev && window.dev.BetterDiff) {return;}
	(window.dev = window.dev || {}).BetterDiff = true;
	
    // Load dependencies and cache
    importArticles({
        type: 'script',
        articles: [ 'u:dev:MediaWiki:Modal.js' ]
    });
	var api = new mw.Api();
	var config = mw.config.get(['wgDiffNewId', 'wgAction', 'wgCanonicalSpecialPageName']);
	var tokens = {
		patrol: '',
		rollback: ''
	};
	var can = {
		block: mw.config.get('wgUserGroups').some(function(group){return ['sysop', 'wiki-representative', 'soap'].includes(group);}),
		patrol: mw.config.get('wgUserGroups').some(function(group){return ['sysop', 'content-moderator'].includes(group);}),
		rollback: mw.config.get('wgUserGroups').some(function(group){return ['sysop', 'content-moderator', 'rollback'].includes(group);})
	};
	
	// Main class
	var betterDiff = {
		init: function() {
			
			// Get tokens
			betterDiff.fetchTokens();
			
			// Check we're in Special:RecentChanges
			if (config.wgCanonicalSpecialPageName == 'Recentchanges') {
				betterDiff.waitFor('.mw-changeslist div', function(){
					betterDiff.newDiffLink();
					betterDiff.quickDiff();
					betterDiff.waitFor('.mw-rcfilters-ui-filterWrapperWidget-top', betterDiff.userPatrol);
					
					// start observing
					betterDiff.RecentChangesReload(betterDiff.newDiffLink);
				});
				
			}
			
			// Check we're in Special:Contributions
			else if (config.wgCanonicalSpecialPageName == 'Contributions') {
				betterDiff.waitFor('ul.mw-contributions-list li', betterDiff.newDiffLink);
				
			}
			
			// Check we're in a history page
			else if (config.wgAction == 'history') {
				betterDiff.waitFor('.mw-history-histlinks', betterDiff.newDiffLink);
			}
			
			// Check we're in a diff page
			else if (config.wgDiffNewId) {
				betterDiff.waitFor('#mw-diff-ntitle1', betterDiff.newDiff);
			}
			
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
							console.log(target.textContent, 'newdiff split');
							link.innerHTML = split[2] || 'diff';
							target.remove();
							paren.prepend(
								split[1].length>0 ? split[1] : "",
								link,
								split[3].length>0 ? split[3] : ""
							);
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
						'.mw-changeslist-title', // Normal Special:RecentChanges
						'.mw-changeslist-date', // Nested Special:RecentChanges
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
					betterDiff.quickDiffLoad();
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
		
		// Mass patrol recent edits from specific user
		userPatrol: function() {
			if (!document.querySelector('#userPatrol') && can.patrol) {
				var wrapper = $(
					'<div class="userPatrolWrapper" style="display: flex; width: 100%">'+
						'<span id="userPatrolDetails" style="margin-right: 3px;"></span>'+
						'<input name="userPatrol" id="userPatrol" placeholder="User to mass patrol" />'+
						'<span class="wds-button" id="submitUserPatrol" style="white-space: nowrap; padding: 1px 3px; position: relative;">Patrol User</span>'+
					'</div>'
				);
				var cell = $('.mw-rcfilters-ui-table-placeholder');
				cell.append(wrapper);
				cell.css('vertical-align', 'middle');
				document.querySelector('#submitUserPatrol').addEventListener('click', function(event) {
					var user = document.querySelector('#userPatrol').value; // Username without the "User:" prefix
					if (user.length>0) {
						api.get({
							action: 'query',
							list: 'recentchanges',
							rcshow: '!patrolled',
							rcprop: 'ids',
							rcuser: user,
							format: 'json',
							formatversion: '2',
							rclimit: 'max'
						}).then(function(data){
							if (data.query.recentchanges.length>0) {
								document.querySelector('#userPatrolDetails').innerHTML = 'Patrolling '+data.query.recentchanges.length+' edits...';
								data.query.recentchanges.forEach(function(page) {
									betterDiff.patrolRevision(page.revid, page.rcid);
								});
								document.querySelector('#userPatrolDetails').innerHTML = 'Patrolled '+data.query.recentchanges.length+' edits!';
							} else {
								document.querySelector('#userPatrolDetails').innerHTML = 'User has no edits to patrol!';
							}
						});
					} else { document.querySelector('#userPatrolDetails').innerHTML = 'No user specified.'; }
				});
			} else { console.log('User does not have patrolling rights.'); }
		},
		
		// Diff pages but without moving away from the page, allowing patrolling still
		quickDiff: function() {
			// Diff link string's storage for modal button
			var href = '';
			
			betterDiff.quickDiffLoad();
			betterDiff.RecentChangesReload(betterDiff.quickDiffLoad);
			
			var generateModal = function(modal, event) {
				betterDiff.fetchTokens();
				var generateHeader = function(data) {
					href = mw.config.get('wgServer')+'/wiki/'+betterDiff.urlEncode(data.totitle)+'?diff='+data.torevid;
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
									'<a href="/wiki/'+betterDiff.urlEncode(data.fromtitle)+'?oldid='+data.fromrevid+'" title="'+data.fromtitle.replace(/"/g, '&quot;')+'">'+
										'Revision as of '+
										fromdate.getHours()+':'+fromdate.getMinutes()+
										', '+fromdate.getDate()+' '+
										(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(fromdate))+' '+
										fromdate.getFullYear()+
									'</a> '+
									'<span class="mw-diff-edit">('+
										'<a href="/wiki/'+betterDiff.urlEncode(data.fromtitle)+'?action=edit&oldid='+data.fromrevid+'" title="'+data.fromtitle.replace(/"/g, '&quot;')+'">edit</a>'+
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
								'<a href="/wiki/'+betterDiff.urlEncode(data.totitle)+'?oldid='+data.torevid+'" title="'+data.totitle.replace(/"/g, '&quot;')+'">'+
									'Revision as of '+
									todate.getHours()+':'+todate.getMinutes()+
									', '+todate.getDate()+' '+
									(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(todate))+' '+
									todate.getFullYear()+
								'</a> '+
								'<span class="mw-diff-edit">('+
									'<a href="/wiki/'+betterDiff.urlEncode(data.totitle)+'?action=edit&oldid='+data.torevid+'" title="'+data.totitle.replace(/"/g, '&quot;')+'">edit</a>'+
								')</span> '+
								'<span class="mw-diff-undo">('+
									'<a href="/wiki/'+betterDiff.urlEncode(data.totitle)+'?action=edit&undoafter='+data.fromrevid+'&undo='+data.torevid+'" title="&quot;Undo&quot; reverts this edit and opens the edit form in preview mode. It allows adding a reason in the summary.">undo</a>'+
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
										'/wiki/'+betterDiff.urlEncode(data.fromtitle)+
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
					api_opt.torev = event.target.getAttribute('newid');
					if (event.target.getAttribute('oldid') !== '0') {
						api_opt.fromrev = event.target.getAttribute('oldid');
					} else {
						api_opt.fromslots = 'main';
						api_opt['fromtext-main'] = '';
					}
				} else if (event.target.id == 'differences-nextlink') {
					api_opt.fromrev = event.target.getAttribute('revid');
					api_opt.torelative = 'prev';
				} else if (event.target.id == 'differences-prevlink') {
					api_opt.fromrev = event.target.getAttribute('revid');
					api_opt.torelative = 'next';
				}
				
				api.get(api_opt).then(function(data) {
					modal.show();
					modal.setContent(
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
					modal.setTitle('Changes: '+data.compare.totitle);
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
							
							while ( check.query.recentchanges[num] && can.patrol && patrol == false ) {
								// Add patrol button if any revision to patrol
								if (check.query.recentchanges[num].unpatrolled && (
									(data.compare.torevid && data.compare.fromrevid &&
									check.query.recentchanges[num].revid <= data.compare.torevid && check.query.recentchanges[num].revid >= 	data.compare.fromrevid) || 
									(data.compare.torevid && !data.compare.fromrevid &&
									check.query.recentchanges[num].revid == data.compare.torevid)
								)) {
									document.querySelector('#mw-diff-ntitle4').innerHTML +=
									'<span class="patrollink" data-mw="interface">['+
										'<a '+
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
						
						// Build left side
						if (prev !== false && !isNaN(prev)) {
							document.querySelector('#mw-diff-otitle4').innerHTML = 
							'<a '+
								'revid="'+prev+'" '+
								'title="'+data.compare.totitle.replace(/"/g, '&quot;')+'" '+
								'id="differences-prevlink"'+
							'>'+
								'← Older edit'+
							'</a>'; //prepend to existing content
						}
						
						// Build right side
						if (next !== false && !isNaN(next)) {
							document.querySelector('#mw-diff-ntitle4').innerHTML = 
							'<a '+
								'revid="'+next+'" '+
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
				var popup = 
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
							}
						],
						events: {
							CopyLink: function() {
								navigator.clipboard.writeText(href);
							},
							OpenLink: function() {
								window.open(href);
							}
						}
					});
				popup.create();
				var massPatrol = function() {
					if (!document.querySelector('.patrollink a')) {alert('Nothing to mass patrol.\nIf you believe this to be an error, please contact [[User:Mikevoir]]!');}
					else {
						var link = document.querySelector('.patrollink a');
						var wrapper = document.querySelector('.patrollink');
						wrapper.innerHTML = 
						'[<img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" width="16px" style="vertical-align: middle;" border="0" />]';
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
								) {revids.push(data.query.recentchanges[num].revid);}
								num++;
							}
							if (revids.length>0) {
								revids.forEach(betterDiff.patrolRevision);
								wrapper.innerHTML = '[Edits patrolled: '+revids.length+']';
							} else {
								wrapper.innerHTML = '[Error, no valid revisions found!]';
								console.log('api result:',data);
							}
						}).catch(function(err){
							wrapper.innerHTML = '[API error, please contact <a href="/wiki/User:Mikevoir">Mikevoir</a>!]';
							console.log('api result:', err);
						});
					}
				};
				document.addEventListener('click', function(event) {
					// Load diff modal
					if (event.target && (
						event.target.classList.contains('quickDiff') ||
						event.target.id == 'differences-nextlink' ||
						event.target.id == 'differences-prevlink'
					)) {
						if (event.target.classList.contains('quickDiff')) {
							if (document.querySelector('.link-focused')) {document.querySelector('.link-focused').classList.remove('link-focused');}
							event.target.classList.add('link-focused');
						}
						generateModal(popup, event);
					// Patrol revisions shown in modal if user has perms and there's any to patrol
					} else if (event.target && event.target.nodeName == 'A' && event.target.closest('.patrollink') && event.target.getAttribute('torevid')) {
						massPatrol();
					}
				});
				document.addEventListener('keydown', function(event) {
					if (event.altKey && [80, 49].includes(event.keyCode)) {
						massPatrol();
					}
				});
			});
		},
		
		// Get locations where to add custom link for quickDiff
		quickDiffLoad: function() {
			var addLink = function(diff) {
				if (diff && diff.getAttribute('href')) {
					var href = diff.getAttribute('href');
					var newid = /diff=(\d+)/.exec(href)[1];
					var oldid = /oldid=\d+/.test(href) ? /oldid=(\d+)/.exec(href)[1] : '0';
					var link = document.createElement('a');
					link.setAttribute('newid', newid);
					link.setAttribute('oldid', oldid);
					link.setAttribute('data-target-page', diff.closest('table').querySelector('a.mw-changeslist-title').getAttribute	('title'));
					link.innerHTML = 'view';
					link.style.cursor = 'pointer';
					link.classList.add('quickDiff');
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
			document.querySelectorAll('.mw-changeslist-groupdiff:not(.quickDiffLoaded)').forEach(addLink);
			document.querySelectorAll('.mw-changeslist-diff:not(.quickDiffLoaded)').forEach(addLink);
		},
		
		// Patrol inputted revid if user can patrol
		patrolRevision: function(revid, rcid) {
			if (can.patrol && revid && tokens.patrol.length>2) {
				api.post({
					action: 'patrol',
					format: 'json',
					revid: revid,
					token: tokens.patrol
				}).catch(function(log) {
					if (rcid && log && log == 'nosuchrevid') {
						alert('Revision from deleted page detected, opening patrolling page.');
						window.open('https://honkai-star-rail.fandom.com/wiki/?action=markpatrolled&rcid='+rcid);
					} else {
						console.log('tokens', tokens);
						console.log('error msg:', log);
					}
				});
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
		
		// Encode url with MediaWiki sensitive characters only
		urlEncode: function(url) {
			url = url || '';
			url = url
				.replace(/ /g, '_')
				.replace(/\?/g, '%3F')
				.replace(/\&/g, '%26')
				.replace(/\"/g, '%22');
			return url;
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
		}
	};
	
	// Load styles and start when API is loaded
	mw.loader.using('mediawiki.diff.styles');
	mw.loader.using('mediawiki.api').then(betterDiff.init);
	
});