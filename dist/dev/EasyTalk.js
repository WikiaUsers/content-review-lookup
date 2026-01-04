'use strict';
/* TODO:
mw.loader.using([
	'ext.CodeMirror.v6',
	'ext.CodeMirror.v6.mode.mediawiki',
	'ext.fandom.wikiEditor.codeMirrorTheming.css',
], require => {
	const CodeMirror = require('ext.CodeMirror.v6');
	const mediawikiLang = require('ext.CodeMirror.v6.mode.mediawiki');
	const cm = new CodeMirror('#easy-talk-editor-js textarea');
	cm.initialize([cm.defaultExtensions, mediawikiLang()]);
});
*/
mw.loader.using([
	'mediawiki.api',
	'mediawiki.Title',
	'mediawiki.util',
	'oojs-ui',
], () => {
	const config = mw.config.values;
	const ns = config.wgNamespaceNumber;
	const extraSigNs = config.wgExtraSignatureNamespaces.includes(ns);
	const wrongNamespace = (ns % 2 === 0 && !extraSigNs) || ns < 0;
	const addTopicButton = $('#ca-addsection');
	const noEasyTalk = wrongNamespace && !addTopicButton.length;
	
	if (window.EasyTalkLoaded || noEasyTalk){
		return;
	}
	
	window.EasyTalkLoaded = true;
	window.dev = window.dev || {};
	window.dev.DisableArchivedPages = window.dev.DisableArchivedPages || {};
	window.dev.DisableArchivedPages.id = window.dev.DisableArchivedPages.id || 'archivedPage';
	
	let revid = config.wgCurRevisionId;
	let updatePreview;
	let msg = () => {};
	let newTopicToolAvailable = true;
	const version = '2.1.2';
	const toolName = 'EasyTalk';
	const helpPage = 'w:c:memory-alpha:MA Help:EasyTalk';
	const api = new mw.Api({'parameters': {
		'action': 'query',
		'format': 'json',
		'formatversion': 2,
		'errorformat': 'plaintext',
		'uselang': config.wgUserLanguage,
	}});
	const archived = $(`#${window.dev.DisableArchivedPages.id}`).length;
	const previewDelay = 1000;
	const now = Date.now();
	const editorID = 'easy-talk-editor-js';
	const docRef = `[[${helpPage}|${toolName}]] v${version}`;
	const fatalErrors = [
		'protectedpage',
		'permissiondenied',
		'editconflict',
	];
	const params = new URLSearchParams(location.search);
	const pageName = config.wgPageName.replaceAll('_', ' ');
	const messages = [
		'mw-widgets-abandonedit-title',
		'just-now',
		'minutes',
		'hours',
		'days',
		'months',
		'years',
	];
	const newTalkPage =
		config.wgIsProbablyEditable &&
		!config.wgArticleId &&
		params.get('redlink') &&
		!extraSigNs;
	const newSection =
		config.wgIsProbablyEditable &&
		config.wgAction === 'edit' &&
		params.get('section') === 'new' &&
		!params.get('preload') &&
		!params.get('preloadtitle');
	const canEditFromReadView =
		config.wgIsProbablyEditable &&
		config.wgAction === 'view';
	
	if (newTalkPage || newSection){
		$('#editform').css('display', 'none');
	}
	
	api.loadMessagesIfMissing(messages).then(() => {
		window.importArticles({'articles': [
			'u:dev:MediaWiki:EasyTalk.css',
			'u:dev:MediaWiki:I18n-js/code.js',
		]}).then(() => {
			mw.hook('dev.i18n').add(i18n => {
				i18n.loadMessages('EasyTalk', {cacheVersion: 3}).then(i18n => {
					msg = (...args) => i18n.msg(...args);
					mw.hook('wikipage.content').add(findComments);
					if (newTalkPage || newSection || canEditFromReadView){
						addTopicButton.on('click', addTopic);
					}
					if (newSection){
						addTopic();
					}
				});
			});
		});
	});
	
	function findComments(content){
		window.EasyTalkProcessed = window.EasyTalkProcessed || [];
		window.EasyTalkProcessed.push(content);
		if (!window.EasyTalkProcessingLive){
			window.EasyTalkProcessingLive = true;
			window.EasyTalkUnprocessed.forEach(pageSnippet => {
				if (!window.EasyTalkProcessed.includes(pageSnippet)){
					findComments(pageSnippet);
				}
			});
		}
		
		let topic = '';
		let section = '';
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const timeZoneConverter = {
			'PST': 'UTC-8',
			'EST': 'UTC-5',
			'EDT': 'UTC-4',
			'GMT': 'UTC+0',
			'UTC': 'UTC+0',
			'CET': 'UTC+1',
			'CEST': 'UTC+2',
		};
		const timeZones = Object.keys(timeZoneConverter);
		const time = '[0-2]\\d:[0-5]\\d';
		const day = ' [0-3]?\\d,?';
		const month = ` (?:${months.join('|')})`;
		const year = ' \\d\\d\\d\\d+';
		const tZone = ` \\((?:${timeZones.join('|')})\\)`;
		const tsRegExp = new RegExp(`^(.* )(${time},(?:${day}|${month}|${year})+${tZone})\\s*$`);
		const tsOrderFix = new RegExp(`^(${time}) (.+)(${tZone})$`);
		const noTalkSelectors = [
			'.mw-notalk',
			'blockquote',
			'cite',
			'q',
			`#${editorID}`,
		];
		const linkSelectors = {
			'a[title^="User:"]': /^User:(.+?)(?: ?\/.*)?$/,
			'a[title^="User talk:"]': /^User talk:(.+?)(?: ?\/.*)?$/,
			'a[title^="Special:Contributions/"]': /^Special:Contributions\/ ?(?:[uU]ser: ?)?(.+?)(?: ?\/.*)?$/,
		};
		
		content.find('*').each((elementIndex, element) => {
			if ($(element).is('.mw-headline')){
				section = $(element).attr('id').replaceAll('_', ' ');
				if ($(element).parent().is('h2')){
					$(element).parent().addClass('easytalk-topic-header');
					topic = section;
				}
				return;
			}
			
			const datetime = $($(element).contents().toArray().filter(node => node.nodeType === 3)).last();
			const userLink = datetime.prevAll().find('*').addBack().filter(Object.keys(linkSelectors).join(', ')).last();
			const noTalk = datetime.parents(noTalkSelectors.join(', '));
			
			if (!userLink.length || !tsRegExp.test(datetime.text()) || noTalk.length){
				return;
			}
			
			const datetimeMw = datetime.text().replace(tsRegExp, '$2');
			let datetimeIntl = datetimeMw.replaceAll(',', '').replace(tsOrderFix, '$2 $1$3');
			let userRegExp;
			
			Object.keys(linkSelectors).forEach(selector => {
				if (userLink.is(selector)){
					userRegExp = linkSelectors[selector];
				}
			});
			
			timeZones.forEach(timeZone => {
				datetimeIntl = datetimeIntl.replace(`(${timeZone})`, timeZoneConverter[timeZone]);
			});
			
			datetimeIntl = new Date(datetimeIntl).toISOString();
			const index = content.find(`[data-datetime="${datetimeMw}"]`);
			const timeElement = $('<time>', {
				'datetime': datetimeIntl,
				'class': 'js-comment-date-time',
				'data-user': userLink.attr('title').replace(userRegExp, '$1'),
				'data-topic': topic,
				'data-section': section,
				'data-datetime': datetimeMw,
				'data-index': index.length,
				'text': datetimeMw,
			});
			timeElement.attr('title', age(timeIndex(timeElement), now));
			const timeTag = `$1${timeElement.prop('outerHTML')}`;
			datetime.replaceWith(datetime.text().replace(tsRegExp, timeTag));
		});
		
		content.find('p:has(br:only-child)').remove();
		content.find('dl + dl').each((dlIndex, dl) => {
			$(dl).prepend($(dl).prev().html());
			$(dl).prev().remove();
		});
		
		while (content.find('dd:has(dl:last-child) + dd > dl:first-child').length){
			content.find('dd:has(dl:last-child) + dd > dl:first-child').each(mergeAdjacentDLs);
		}
		
		const comments = content.find('.js-comment-date-time');
		const newSect = `Special:NewSection/${pageName.replaceAll('"', '\\"')}`;
		addStats(content, comments);
		
		if (newTalkPage || newSection || canEditFromReadView){
			content.find(`a[title="${newSect}"]`).on('click', addTopic);
		}
		
		if (
			archived ||
			config.wgAction !== 'view' ||
			!config.wgArticleId ||
			!config.wgIsProbablyEditable ||
			config.wgRevisionId !== config.wgCurRevisionId
		){
			return;
		}
		
		comments.each((commentIndex, comment) => {
			if ($(comment).parents('.mw-archivedtalk').length){
				return;
			}
			let anchor = $(comment);
			while (anchor.parent().css('display') === 'inline'){
				anchor = anchor.parent();
			}
			anchor.after($('<button>', {
				'class': 'reply-button-js',
				'type': 'button',
				'data-user': $(comment).data('user'),
				'data-topic': $(comment).data('topic'),
				'data-section': $(comment).data('section'),
				'data-datetime': $(comment).data('datetime'),
				'data-index': $(comment).data('index'),
				'tabindex': 0,
				'text': msg('replybutton').parse(),
				'on': {'click': activateReplyButton},
			}));
		});
	}
	
	function addStats(content, comments){
		if (!comments.length){
			return;
		}
		const topics = {};
		let latestComment = $('<time>').attr('datetime', new Date(0).toISOString());
		comments.each((commentIndex, comment) => {
			if (timeIndex($(comment)) > timeIndex(latestComment)){
				latestComment = $(comment);
			}
			
			if (!topics[$(comment).data('topic')]){
				topics[$(comment).data('topic')] = {
					'users': [],
					'datetimes': [],
				};
			}
			
			if (!topics[$(comment).data('topic')].users.includes($(comment).data('user'))){
				topics[$(comment).data('topic')].users.push($(comment).data('user'));
			}
			
			topics[$(comment).data('topic')].datetimes.push(timeIndex($(comment)));
		});
		
		let latestCommentTopText;
		
		if (latestComment.data('topic')){
			latestCommentTopText = msg(
				'pageframe-latestcomment',
				latestComment.attr('title'),
				latestComment.data('user'),
				latestComment.data('topic')
			).parse();
		} else {
			latestCommentTopText = msg(
				'pageframe-latestcomment-notopic',
				latestComment.attr('title'),
				latestComment.data('user')
			).parse();
		}
		
		if ($('#talk-stats-top-js').length){
			$('#talk-stats-top-js').html(latestCommentTopText);
		} else {
			$('#mw-content-text').before($('<div>', {
				'class': 'talk-stats-js',
				'id': 'talk-stats-top-js',
				'html': latestCommentTopText,
			}));
		}
		
		content.find('.easytalk-topic-header').each((headerIndex, header) => {
			const topic = $(header).find('.mw-headline').attr('id').replaceAll('_', ' ');
			if (!topics[topic]){
				return;
			}
			$(header).append($('<div>').addClass([
				'talk-stats-js',
				'talk-stats-section-js'
			]).append(
				$('<span>').text(msg(
					'topicheader-latestcomment',
					age(Math.max(...topics[topic].datetimes), now)
				).parse()),
				$('<span>').text(msg(
					'topicheader-commentcount',
					topics[topic].datetimes.length
				).parse()),
				$('<span>').text(msg(
					'topicheader-authorcount',
					topics[topic].users.length
				).parse())
			));
		});
	}
	
	function activateReplyButton(addReplyEvent){
		const button = $(addReplyEvent.currentTarget);
		if (button.attr('disabled')){
			return;
		}
		$('.reply-button-js').attr({'tabindex': -1, 'disabled': true});
		button.attr('id', 'active-reply-button-js');
		const parent = button.parent();
		const bNext = button.next();
		const pNext = parent.next();
		const pNextTag = pNext.prop('tagName');
		const h = /^H[1-6]$/;
		const dd = $('<dd>').append($('<form>').on(
			'submit',
			formReplyEvent => formReplyEvent.preventDefault()
		).append(
			$('<label>').html(msg(
				'replywidget-label',
				helpPage,
				toolName,
				version
			).parse()),
			$('<textarea>', {
				'placeholder': msg(
					'replywidget-placeholder-reply',
					button.data('user')
				).parse(),
				'required': true,
				'on': {'input': resizeTextBox},
			}),
			$('<div>', {
				'id': 'easy-talk-preview-js',
				'data-label': msg('replywidget-preview').parse(),
			}),
			$('<div>', {'id': 'easy-talk-footer-js'}).append(
				$('<p>', {
					'id': 'easy-talk-license-js',
					'html': msg(
						'replywidget-terms-click',
						msg('replywidget-reply').parse(),
						$('link[rel="license"]').attr('href')
					).plain(),
				}),
				$('<div>').append(
					$('<button>', {
						'class': 'wds-button wds-is-secondary',
						'id': 'reply-cancel-js',
						'text': msg('replywidget-cancel').parse(),
					}),
					$('<button>', {
						'class': 'wds-button',
						'id': 'reply-submit-js',
						'text': msg('replywidget-reply').parse(),
					})
				)
			)
		));
		
		if (!bNext.length && (!pNext.length || h.test(pNextTag))){
			button.after($(`<dl id="${editorID}">`).append(dd));
		} else if (parent.prop('tagName') === 'P' && pNextTag === 'DL'){
			pNext.append(dd.attr('id', editorID));
		} else if (parent.prop('tagName') === 'P'){
			parent.after($(`<dl id="${editorID}">`).append(dd));
		} else if (bNext.length){
			bNext.append(dd.attr('id', editorID));
		} else {
			button.after($(`<dl id="${editorID}">`).append(dd));
		}
		
		$(`#${editorID} textarea`).get(0).focus();
		let comment = parseReplyText($(`#${editorID} textarea`).val());
		updatePreview = setInterval(() => {
			if (comment === parseReplyText($(`#${editorID} textarea`).val())){
				return;
			}
			comment = parseReplyText($(`#${editorID} textarea`).val());
			if (!comment){
				$('#easy-talk-preview-js').html('');
				return;
			}
			const parseParams = {
				'title': pageName,
				'revid': revid,
				'pst': true,
				'preview': true,
			};
			api.parse(comment, parseParams).then(renderPreview);
		}, previewDelay);
		
		$('#reply-cancel-js').on('click', () => {
			if ($(`#${editorID} textarea`).val()){
				const confirmationDialog = new OO.ui.MessageDialog();
				const windowManager = new OO.ui.WindowManager();
				$('body').append(windowManager.$element);
				windowManager.addWindows([confirmationDialog]);
				windowManager.openWindow(confirmationDialog, {
					title: mw.message('mw-widgets-abandonedit-title').text(),
					message: msg('replywidget-abandon').parse(),
					actions: [
						{
							action: 'reject',
							label: msg('replywidget-abandon-keep').parse(),
							flags: 'progressive',
						},
						{
							action: 'accept',
							label: msg('replywidget-abandon-discard').parse(),
							flags: 'destructive',
							id: 'discard-comment-js',
						}
					],
				});
				
				setTimeout(() => {
					$('#discard-comment-js a').on('click', closeEditor);
				}, 10);
			} else {
				closeEditor();
			}
		});
		
		$('#reply-submit-js').on('click', {
			'section': button.data('section'),
			'user': button.data('user'),
			'datetime': button.data('datetime'),
			'index': button.data('index'),
		}, submitReply);
	}
	
	function submitReply(submitReplyEvent){
		let comment = $(`#${editorID} textarea`).val();
		comment = comment.replace(/^\s+/, '');
		comment = comment.replace(/\s+$/, '');
		if (!comment){
			return;
		}
		
		clearInterval(updatePreview);
		const elmts = 'textarea, .wds-button';
		$(`#${editorID}`).find(elmts).attr('disabled', true);
		
		const fetchParams = {
			'titles': pageName,
			'prop': 'revisions',
			'rvprop': 'content',
			'rvslots': 'main',
		};
		
		api.post(fetchParams).then(result => {
			const uneditedText = result.query.pages[0].revisions[0].slots.main.content;
			const datetime = mw.util.escapeRegExp(submitReplyEvent.data.datetime);
			const index = Number(submitReplyEvent.data.index);
			const mainText = uneditedText.replace(new RegExp(`^(?:[^]+?${datetime}){${index}}`), '');
			const iRegExp = new RegExp(`[^]*?^([:*#]*).+?${datetime} *$[^]*`, 'm');
			const rRegExp = new RegExp(`([^]*?)^([:*#]*)(.+?${datetime} *)$((?:\n+\\2[:*#]+.*)*)\n*?((?:\n:.*(?:\n+:.*)*)*)\n*([^:\n][^]*)?`, 'm');
			const indent = mainText.replace(iRegExp, '$1');
			const repliesWithIndent = new RegExp(`[^]*?^.+?${datetime} *$\n+:+[^]*`, 'm');
			let finalText;
			let prefix = uneditedText.split(submitReplyEvent.data.datetime).splice(0, index).join(submitReplyEvent.data.datetime);
			prefix = prefix ? prefix + submitReplyEvent.data.datetime : '';
			comment = parseReplyText(comment, indent);
			
			if (!indent.length && !repliesWithIndent.test(mainText)){
				finalText = prefix + mainText.replace(
					rRegExp,
					`$1$2$3$4\n\n${comment}$5\n\n$6`
				);
			} else {
				finalText = prefix + mainText.replace(
					rRegExp,
					`$1$2$3$4\n${comment}$5\n\n$6`
				);
			}
			
			let editSummary = `Reply (${docRef})`;
			const section = submitReplyEvent.data.section;
			if (section){
				editSummary = `/* ${section} */ ${editSummary}`;
			}
			
			const editParams = {
				'action': 'edit',
				'title': pageName,
				'text': finalText,
				'summary': editSummary,
				'notminor': true,
				'watchlist': 'watch',
				'baserevid': revid,
				'nocreate': true,
			};
			
			api.postWithEditToken(editParams).then(data => {
				if (data.warnings){
					console.warn(data.warnings);
					for (const warning of data.warnings){
						errorNotice(`Warning: ${warning.code}: ${warning.text}`, 'warn');
					}
				}
				
				if (data.edit){
					revid = data.edit.newrevid;
					api.parse(new mw.Title(pageName)).then(parsedText => {
						$('#mw-content-text > .mw-parser-output').html($(parsedText).contents());
						mw.hook('wikipage.content').fire($('#mw-content-text'));
						mw.notify(
							msg('postedit-confirmation-published').parse(),
							{type: 'success'}
						);
					});
				}
			}, (code, data) => {
				console.error(data.errors);
				for (const error of data.errors){
					if (error.code === 'permissiondenied'){
						errorNotice(`Error: ${error.code}: This page is in a protected namespace.`);
					} else {
						errorNotice(`Error: ${error.code}: ${error.text}`);
					}
				}
				
				if (!fatalErrors.includes(data.errors[0].code)){
					$(`#${editorID}`).find(elmts).removeAttr('disabled');
				}
			});
		});
	}
	
	function addTopic(addTopicEvent){
		if (addTopicEvent){
			addTopicEvent.preventDefault();
		}
		if (!newTopicToolAvailable){
			$(`#${editorID} input`).get(0).focus();
			return;
		}
		newTopicToolAvailable = false;
		$('.reply-button-js').attr({'tabindex': -1, 'disabled': true});
		const newTopicBox = $('<form>', {
			'id': editorID,
			'on': {'submit': formTopicEvent => formTopicEvent.preventDefault()},
		}).append(
			$('<label>').html(msg(
				'replywidget-label',
				helpPage,
				toolName,
				version
			).parse()),
			$('<h2>', {'id': 'newtopic-sectiontitle-js'}).append($('<input>', {
				'placeholder': msg('newtopic-placeholder-title').parse(),
				'aria-label': msg('newtopic-placeholder-title').parse(),
				'spellcheck': true,
				'required': true,
			})),
			$('<textarea>', {
				'placeholder': msg('replywidget-placeholder-newtopic').parse(),
				'required': true,
				'on': {'input': resizeTextBox},
			}),
			$('<div>', {
				'id': 'easy-talk-preview-js',
				'data-label': msg('replywidget-preview').parse(),
			}),
			$('<div>', {'id': 'easy-talk-footer-js'}).append(
				$('<p>', {
					'id': 'easy-talk-license-js',
					'html': msg(
						'replywidget-terms-click',
						msg('replywidget-reply').parse(),
						$('link[rel="license"]').attr('href')
					).plain(),
				}),
				$('<div>').append(
					$('<button>', {
						'class': 'wds-button wds-is-secondary',
						'id': 'newtopic-cancel-js',
						'text': msg('replywidget-cancel').parse(),
					}),
					$('<button>', {
						'class': 'wds-button',
						'id': 'newtopic-submit-js',
						'text': msg('replywidget-newtopic').parse(),
					})
				)
			)
		);
		
		$('#mw-content-text').append(newTopicBox);
		$(`#${editorID} input`).get(0).focus();
		
		let sectionTitle = parseHeadingText($(`#${editorID} input`).val());
		let comment = parseTopicText($(`#${editorID} textarea`).val());
		updatePreview = setInterval(() => {
			if (
				sectionTitle === parseHeadingText($(`#${editorID} input`).val())
				&& comment === parseTopicText($(`#${editorID} textarea`).val())
			){
				return;
			}
			sectionTitle = parseHeadingText($(`#${editorID} input`).val());
			comment = parseTopicText($(`#${editorID} textarea`).val());
			if (!comment){
				$('#easy-talk-preview-js').html('');
				return;
			}
			const parseParams = {
				'title': pageName,
				'pst': true,
				'section': 'new',
				'sectiontitle': sectionTitle,
				'disableeditsection': true,
				'sectionpreview': true,
			};
			if (revid){
				parseParams.revid = revid;
			}
			api.parse(comment, parseParams).then(renderPreview);
		}, previewDelay);
		
		$('#newtopic-cancel-js').on('click', () => {
			if ($(`#${editorID} input`).val() || $(`#${editorID} textarea`).val()){
				const confirmationDialog = new OO.ui.MessageDialog();
				const windowManager = new OO.ui.WindowManager();
				$('body').append(windowManager.$element);
				windowManager.addWindows([confirmationDialog]);
				windowManager.openWindow(confirmationDialog, {
					title: mw.message('mw-widgets-abandonedit-title').text(),
					message: msg('replywidget-abandontopic').parse(),
					actions: [
						{
							action: 'reject',
							label: msg('replywidget-abandontopic-keep').parse(),
							flags: 'progressive',
						},
						{
							action: 'accept',
							label: msg('replywidget-abandontopic-discard').parse(),
							flags: 'destructive',
							id: 'discard-topic-js',
						}
					],
				});
				
				setTimeout(() => {
					$('#discard-topic-js a').on('click', closeEditor);
				}, 10);
			} else {
				closeEditor();
			}
		});
		
		$('#newtopic-submit-js').on('click', submitTopic);
	}
	
	function submitTopic(){
		const sectionTitle = parseHeadingText($(`#${editorID} input`).val());
		const comment = parseTopicText($(`#${editorID} textarea`).val());
		if (!sectionTitle || !comment){
			return;
		}
		
		clearInterval(updatePreview);
		const elmts = 'input, textarea, .wds-button';
		$(`#${editorID}`).find(elmts).attr('disabled', true);
		
		const editSummary = `/* ${sectionTitle} */ new section (${docRef})`;
		const editParams = {
			'action': 'edit',
			'title': pageName,
			'text': comment,
			'summary': editSummary,
			'notminor': true,
			'watchlist': 'watch',
			'section': 'new',
			'sectiontitle': sectionTitle,
		};
		
		if (revid){
			editParams.baserevid = revid;
		}
		
		api.postWithEditToken(editParams).then(data => {
			if (data.warnings){
				console.warn(data.warnings);
				for (const warning of data.warnings){
					errorNotice(`Warning: ${warning.code}: ${warning.text}`, 'warn');
				}
			}
			
			if (data.edit){
				revid = data.edit.newrevid;
				api.parse(new mw.Title(pageName)).then(parserOutput => {
					if (config.wgArticleId && config.wgAction === 'view'){
						const output = $(parserOutput).contents();
						$('#mw-content-text > .mw-parser-output').html(output);
					} else {
						$(`#${editorID}`).before($(parserOutput));
					}
					mw.hook('wikipage.content').fire($('#mw-content-text'));
					$(`#${editorID}`).remove();
					newTopicToolAvailable = true;
					mw.notify(
						msg('postedit-confirmation-topicadded').parse(),
						{type: 'success'}
					);
				});
			}
		}, (code, data) => {
			console.error(data.errors);
			for (const error of data.errors){
				if (error.code === 'permissiondenied'){
					errorNotice(`Error: ${error.code}: This page is in a protected namespace.`);
				} else {
					errorNotice(`Error: ${error.code}: ${error.text}`);
				}
			}
			
			if (!fatalErrors.includes(data.errors[0].code)){
				$(`#${editorID}`).find(elmts).removeAttr('disabled');
			}
		});
	}
	
	function closeEditor(){
		clearInterval(updatePreview);
		newTopicToolAvailable = true;
		$('.reply-button-js').attr('tabindex', 0).removeAttr('disabled');
		$('#active-reply-button-js').removeAttr('id');
		$(`#${editorID}`).remove();
	}
});

function age(date, now){
	const ageNum = now - date;
	let ageText;
	
	if (ageNum < 1000 * 60){
		ageText = mw.message('just-now').text();
	} else if (ageNum < 1000 * 60 * 60){
		ageText = `${mw.message(
			'minutes',
			Math.floor(ageNum / 1000 / 60)
		).text()} ago`;
	} else if (ageNum < 1000 * 60 * 60 * 24){
		ageText = `${mw.message(
			'hours',
			Math.floor(ageNum / 1000 / 60 / 60)
		).text()} ago`;
	} else if (ageNum < 1000 * 60 * 60 * 24 * 30.436875){
		ageText = `${mw.message(
			'days',
			Math.floor(ageNum / 1000 / 60 / 60 / 24)
		).text()} ago`;
	} else if (ageNum < 1000 * 60 * 60 * 24 * 30.436875 * 12){
		ageText = `${mw.message(
			'months',
			Math.floor(ageNum / 1000 / 60 / 60 / 24 / 30.436875)
		).text()} ago`;
	} else {
		ageText = `${mw.message(
			'years',
			Math.floor(ageNum / 1000 / 60 / 60 / 24 / 30.436875 / 12)
		).text()} ago`;
	}
	
	return ageText;
}

function mergeAdjacentDLs(dlIndex, dl){
	const prevDL = $(dl).parent().prev().children(':last-child');
	$(dl).prepend(prevDL.html());
	prevDL.remove();
	$(dl).before($(dl).parent().prev().html());
	$(dl).parent().prev().remove();
}

function errorNotice(message, type = 'error'){
	console[type](message);
	alert(message);
}

function resizeTextBox(boxEvent){
	const textBox = $(boxEvent.currentTarget);
	textBox.removeAttr('style');
	textBox.css('height', textBox.prop('scrollHeight') + 2);
}

function renderPreview(parsedPreview){
	$('#easy-talk-preview-js').html(parsedPreview);
	mw.hook('wikipage.content').fire($('#easy-talk-preview-js'));
}

function parseHeadingText(headingText){
	headingText = headingText.replace(/^\s+/, '');
	headingText = headingText.replace(/\s+$/, '');
	return headingText;
}

function parseTopicText(topicText){
	topicText = topicText.replace(/^\s+/, '');
	topicText = topicText.replace(/\s+$/, '');
	topicText = topicText.replace(/ +$/gm, '');
	if (topicText){
		topicText = addSig(topicText);
	}
	return topicText;
}

function parseReplyText(replyText, indent = ''){
	replyText = replyText.replace(/^\s+/, '');
	replyText = replyText.replace(/\s+$/, '');
	replyText = replyText.replace(/ +$/gm, '');
	if (replyText){
		replyText = addSig(replyText);
		replyText = replyText.replace(/\n\n+/g, '\n');
		replyText = replyText.replace(/^/gm, `${indent}:`);
	}
	return replyText;
}

function addSig(comment){
	// <pre>
	if (!/(?<!~)~~~~$/.test(comment)){
		if (/^[;:*#].*(?![^])/m.test(comment)){
			comment = comment.replace(/$/, '\n~~~~');
		} else {
			comment = comment.replace(/$/, ' ~~~~');
		}
	}
	return comment;
	// </pre>
}

function timeIndex(timeElement){
	return new Date(timeElement.attr('datetime')).getTime();
}

mw.hook('wikipage.content').add(content => {
	if (!window.EasyTalkProcessingLive){
		window.EasyTalkUnprocessed = window.EasyTalkUnprocessed || [];
		window.EasyTalkUnprocessed.push(content);
	}
});