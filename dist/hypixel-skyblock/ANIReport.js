/* jshint
	esversion: 5, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw */
// <nowiki>
$.when(
	(function() {
		var def = new $.Deferred();
		
		if (mw.libs.QDmodal) {
			return def.resolve(mw.libs.QDmodal);
		} else {
			$.ajax({
				cache: true,
				dataType: "script",
				url: "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:QDmodal.js"
			}).then(def.resolve);
		}
	}()),
	mw.loader.using(['mediawiki.api'])
).then(function() {
	// Anon's do have access
	if (!mw.config.get('wgUserGroups').includes('user')) return;
	
	var api = new mw.Api();
	var version = 1;
	var wgArticlePath = mw.config.get('wgArticlePath').replace(/\$1/, '');
	var logger = {
		logBuilder: function(severity, args) {
			args = Array.from(args);
			
			args.unshift('[ANIReport v' + version + '] [' + severity.toUpperCase() + ']:');
			return console[severity].apply(null, args);
		},
		log: function() {
			return this.logBuilder('log', arguments);
		},
		warn: function() {
			return this.logBuilder('warn', arguments);
		},
		error: function() {
			return this.logBuilder('error', arguments);
		},
	};
	
	if (window.ANIReportLoaded) return logger.warn("Script Double Loaded, exiting...");
	window.ANIReportLoaded = true;
	
	var inter = setInterval(function() {
		// Anon's do not have advanced reporting functionallity
		if (!mw.config.get('wgUserGroups').includes('user')) return clearInterval(inter);
		
		if ($('[class^="ReplyCreate_reply-create"]').length) {
			clearInterval(inter);
	
			// Also report to AN when reporting comments
			function addEventHandler() {
				$('.ActionDropdown_list__3PDNr > li').each(function() {
					var $this = $(this);
					
					if ($this.html().match(/Report/)) {
						var user = decodeURIComponent($this.parents('[class*="EntityHeader_entity-header__"]').find('.wds-avatar > a').attr('href')).replace(/^.+[:\/](.+?)$/, '$1');
						var commentId = $this.parents('[data-thread-id]').attr('data-thread-id');
						var replyId = $this.parents('[data-reply-id]').attr('data-reply-id');
						var pageName = mw.config.get('wgPageName');
						var link = new mw.Uri(mw.util.getUrl(pageName)).extend({ commentId: commentId, replyId: replyId }).toString();
				
						$this.click(function(e) {   
							if (!confirm('Are you sure you want to report this comment to the administrators?')) return e.stopImmediatePropagation();
							console.log('Reporting comment (' + link + ')...');
							
							api.postWithToken('csrf', {
								action: "edit",
								title: "Hypixel SkyBlock Wiki:Administrator's Noticeboard",
								summary: "Reporting [[User:" + user + "|" + user + "]] to the administrators: [[HSW:CG|Possible violation of Comment guidelines]]; See " + link + " for the comment in question.",
								appendtext: "\n\n==Report by [[User:" + mw.config.get('wgUserName') + "|" + mw.config.get('wgUserName') + "]]==" + "\n\
{{Report\n\
|" + user + "\n\
|\{\{subst:sig\}\}\n\
|\{\{subst:sig|~~\}\}\n\
|4=Possible violation of [[HSW:CG|comment guidelines]], see [[" + link + " comment]]\n\
}}",
				
							}).always(console.log); 
						});
					}
				});
			}
			addEventHandler();
			
			$('[class^="ReplyList_view-all-replies"]').click(function() {
				setTimeout(addEventHandler, 25);
			});
		}
	}, 10);

	if (
		mw.config.get('wgAction') !== 'history' 
		&& !['Special:RecentChanges', 'Special:AbuseLog', 'Special:Contributions'].some(function(v) { return mw.config.get('wgPageName').includes(v) })
	) {
		return logger.log('Page is not supported, exiting...');
	}
	
	logger.log('adding links...');

	function addRcReportLinks() {
		 // Collapsible
		 $('td.mw-enhanced-rc-nested').each(function() {
			 var $this = $(this);

			 if (!$this.find('.mw-user-report-link').length) {
				 $this.children('.mw-changeslist-diff').after(' | ', $('<a>', {
					 class: "mw-user-report-link",
					 text: "report",
					 title: "Report " + $this.find('.mw-userlink bdi').html() + " To the administrators",
					 'data-user': $this.find('.mw-userlink bdi').html(),
					 'data-diff': $this.find('.mw-changeslist-diff').attr('href'),
				 }));
			 }
		 });
		 // Not collapsible
		 $('td.mw-changeslist-line-inner').each(function() {
			 var $this = $(this);

			 if (!$this.find('.mw-user-report-link').length) {
				 $this.find('.mw-changeslist-links > span:last-of-type').after(' | ', $('<a>', {
					 class: "mw-user-report-link",
					 text: "report",
					 title: "Report " + $this.find('.mw-userlink bdi').html() + " To the administrators",
					 'data-user': $this.find('.mw-userlink bdi').html(),
					 'data-diff': $this.find('.mw-changeslist-diff').attr('href'),
				 }));
			 }
		 });
	}

	function addHistLinks() {
		$('[data-mw-revid]').each(function() {
			var $this = $(this);

			$this.find('.mw-history-histlinks').append(' | ', $('<a>', {
				class: "mw-user-report-link",
				text: "report",
				title: "Report " + $this.find('.history-user bdi').html() + " To the administrators",
				'data-user': $this.find('.history-user bdi').html(),
				'data-diff': $this.find('.mw-history-histlinks > span:nth-of-type(2) > a').attr('href'),
			}));
		});
	}

	function addAFLogLinks() {
		$('#mw-content-text > ul > li').each(function() {
			var $this = $(this);
			
			$this.find('a[href*="diff"]:last-of-type').after(' | ', $('<a>', {
				class: "mw-user-report-link",
				text: "report",
				title: "Report " + $this.find('.mw-userlink bdi').html() + " To the administrators",
				'data-user': $this.find('.mw-userlink bdi').html(),
				'data-diff': $this.find('a[href*="diff"]:last-of-type').attr('href'),
			}));
		});
	}

	function addContribsLinks() {
		var $user = $('h1[itemprop="name"]').html();
		// Report top
		$('.mw-contributions-user-tools > span > span:last-of-type > a:last-of-type').after(' | ', $('<a>', {
			title: "Report " + $user + " To the administrators",
			class: "mw-user-report-link",
			'data-user': $user,
			text: "report",
		}));
		// Edit List
		$('ul.mw-contributions-list > li').each(function() {
			var $this = $(this);
			
			$this.find('.mw-changeslist-links > span:last-of-type').after(' | ', $('<a>', {
				class: "mw-user-report-link",
				text: "report",
				title: "Report " + $user + " To the administrators",
				'data-user': $user,
				'data-diff': $this.find('.mw-changeslist-diff').attr('href'),
			}));
		});
	}

	window.ajaxCallAgain = window.ajaxCallAgain || [];

	if (mw.config.get('wgAction') === 'history') {
		addHistLinks();
		window.ajaxCallAgain.push(addHistLinks);
	} else if (mw.config.get('wgPageName').includes('Special:AbuseLog')) {
		addAFLogLinks();
		window.ajaxCallAgain.push(addAFLogLinks);
	} else if (mw.config.get('wgPageName').includes('Special:Contributions')) {
		addContribsLinks();
		window.ajaxCallAgain.push(addContribsLinks);
	} else {
		addRcReportLinks();
		window.ajaxCallAgain.push(addRcReportLinks);
	}
	
	 $('.mw-changeslist')[0] && new MutationObserver(addRcReportLinks).observe($('.mw-changeslist')[0], {
		 subtree: true,
		 childList: true,
	 });

	logger.log('adding event listener...');

	var modal = new mw.libs.QDmodal('ANIReportModal');

	$(document.body).on('click', '.mw-user-report-link', function() {
		var $this = $(this);
		var user = $this.attr('data-user');
		var hasDiff = $this.attr('data-diff');
		var diff = ($this.attr('data-diff') || '').replace(wgArticlePath, mw.config.get('wgServer') + wgArticlePath);	

		logger.log('Successfully opened the modal!');
	
		modal.show({
			title: "Report \"" + user + "\" to ANI",
			content: $("<div>", {
				html: [
					'Reason for reporting: ',
					$('<input>', {
						style: "width: 450px;",
						placeholder: "Vandalism",
						value: "Vandalism",
						id: "ANIReportReason",
					}),
					hasDiff ? '<br>' : '',
					hasDiff ? 'Diff link to provide as evidence: ' : '',
					hasDiff ? $('<input>', {
						style: "width: 450px;",
						placeholder: mw.config.get('wgServer') + wgArticlePath + "Hypixel_SkyBlock_Wiki?diff=196073&oldid=191161",
						value: diff,
						id: "ANIReportEvidenceLink",
					}) : '',
					'<br>',
					'User to report: ',
					$('<input>', {
						value: user,
						placeholder: "Example",
						id: "ANIReportUser",
					}),
					'<br>',
					'Addtional Comments: ',
					'<br>',
					$('<textarea>', {
						placeholder: "Place your additional comments here",
						rows: 5,
						cols: 150,
						resizable: true,
						id: "ANIReportComments",
					}),
					'<br>',
					'<br>',
					'<b>NOTE: </b>Reporting a user to ',
					$('<a>', {
						href: wgArticlePath + "Hypixel SkyBlock Wiki:Administrator's Noticeboard",
						text: "Hypixel SkyBlock Wiki:Administrator's Noticeboard",
						title: "Hypixel SkyBlock Wiki:Administrator's Noticeboard",
					}),
					' will involve An administrator, so please consider carefully whether ',
					hasDiff ? 'this edit (' : 'this user (',
					hasDiff ? $('<a>', {
						href: diff,
						text: (diff || '').replace(/^.*\?(.*?)$/, '$1'),
						title: diff,
					}) : $('<a>', {
						href: wgArticlePath + 'Special:Contributions/' + user,
						title: "Special:Contributions/" + user,
						text: user,
					}),  
					') is reportable.',
				],
			}),
			buttons: [{
				text: "Report",
				handler: function() {
					logger.log('Opening report modal...');
					
					var reason = $('#ANIReportReason').val(),
						user = $('#ANIReportUser').val(),
						diff = $('#ANIReportEvidenceLink').val(),
						comments = $('#ANIReportComments').val();
					
					if (!user) return alert('You must provide a user to report to the Administrators!'), logger.warn('Aborted report: No user to report');
					if (!reason) {
						const go = confirm('Are you sure you want to report "' + user + '" to the adminstrators with out a reason? The default reason will be "Vandalism".');
						if (!go) return logger.log('Aborted report: user chose to review report');
					}
					if (!diff && hasDiff) {
						const go = confirm('Are you sure you want to report "' + user + '" to the adminstrators with out a diff as evidence? Your report has a higher chance of being rejected as false if you do so.');
						if (!go) return logger.log('Aborted report: user chose to review report');
					}
					const go = confirm('Are you sure you want to report "' + user + '" to the adminstrators?');
					if (!go) return logger.log('Aborted report: user chose to review report');
	
					api.postWithToken('csrf', {
						action: "edit",
						title: "Hypixel SkyBlock Wiki:Administrator's Noticeboard",
						summary: "Reporting [[User:" + user + "|" + user + "]] to the administrators: " + (reason || "[[w:c:Help:Vandalism|Vandalism]]") + (diff ? "; see " + diff + " for the edit in question." : ""),
						appendtext: "\n\n==Report by [[User:" + mw.config.get('wgUserName') + "|" + mw.config.get('wgUserName') + "]]==" + "\n\
{{Report\n\
|" + user + "\n\
|\{\{subst:sig\}\}\n\
|\{\{subst:sig|~~\}\}\n\
|4=" + reason + "; see [" + diff + " the edit's diff]\n\
" + (comments ? ":'''Addtional Comments'''\n\
" + comments.split('\n').map(function(v) { return '::' + v }).join('\n') + "\
" : "") + "\n\
}}",
	
					}).always(console.log);
					modal.hide();
				},
			}, {
				text: "Cancel",
				handler: function() {
					logger.log('Report cancelled');
					modal.hide();
				},
			}],
		});
	});
	
	logger.log('Ready');
}).catch(console.warn);