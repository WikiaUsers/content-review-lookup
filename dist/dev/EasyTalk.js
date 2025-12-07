'use strict';
mw.loader.using(['mediawiki.api', 'mediawiki.Title', 'mediawiki.util'], () => {
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
	const version = '1.0.5 (beta)';
	const api = new mw.Api({'parameters': {
		'action': 'query',
		'format': 'json',
		'formatversion': 2,
		'errorformat': 'plaintext',
		'uselang': config.wgUserLanguage,
	}});
	const notArchived = !$(`#${window.dev.DisableArchivedPages.id}`).length;
	const previewDelay = 1000;
	const editorID = 'easy-talk-editor-js';
	const fatalErrors = [
		'protectedpage',
		'permissiondenied',
		'editconflict',
		'badtags',
	];
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
	const tsRegExp = new RegExp(`^.* (${time},(?:${day}|${month}|${year})+${tZone})\\s*$`);
	const commentElements = 'p, dd, div, li';
	const params = new URLSearchParams(location.search);
	const pageName = config.wgPageName.replaceAll('_', ' ');
	const linkSelectors = {
		'a[title^="User:"]': /^User:(.+?)(?: ?\/.*)?$/,
		'a[title^="User talk:"]': /^User talk:(.+?)(?: ?\/.*)?$/,
		'a[title^="Special:Contributions/"]': /^Special:Contributions\/ ?(?:[uU]ser: ?)?(.+?)(?: ?\/.*)?$/,
		'a[title^="Special:TalkPage/User:"]': /^Special:TalkPage\/User: ?(.+?)(?: ?\/.*)?$/,
	};
	const newSectionLinkSelectors = [
		'#ca-addsection',
		`a[title="Special:NewSection/${pageName}"]`,
	];
	const messages = [
		'mw-widgets-abandonedit-title',
		'minutes',
		'hours',
		'days',
		'months',
		'years',
	];
	
	api.loadMessagesIfMissing(messages).done(() => {
		mw.hook('dev.i18n').add(i18n => {
			i18n.loadMessages('EasyTalk', {cacheVersion: 1}).done(init);
		});
		window.importArticle({
			'type': 'style',
			'article': 'u:dev:MediaWiki:EasyTalk.css',
		});
		window.importArticle({
			'type': 'script',
			'article': 'u:dev:MediaWiki:I18n-js/code.js',
		});
	});
	
	function init(i18n){
		msg = (...args) => i18n.msg(...args);
		mw.hook('wikipage.content').add(addStats);
		if (
			!config.wgArticleId
			&& params.get('redlink')
			&& !extraSigNs
		){
			$(newSectionLinkSelectors.join(', ')).on('click', addTopic);
			$('#editform').css('display', 'none');
		}
		if (config.wgAction === 'edit' && params.get('section') === 'new'){
			$('#editform').css('display', 'none');
			addTopic();
		}
		if (
			config.wgAction === 'view' &&
			config.wgArticleId &&
			config.wgIsProbablyEditable &&
			notArchived
		){
			$(newSectionLinkSelectors.join(', ')).on('click', addTopic);
			mw.hook('wikipage.content').add(content => {
				content.find('p:has(br:only-child)').remove();
				content.find('dl + dl').each((dlIndex, dl) => {
					$(dl).prepend($(dl).prev().html());
					$(dl).prev().remove();
				});
				while(content.find('dd:has(dl:last-child) + dd > dl:first-child').length){
					content.find('dd:has(dl:last-child) + dd > dl:first-child').each(mergeAdjacentDLs);
				}
				content.find(commentElements).each(addReplyButtons);
			});
		}
	}
	
	function addStats(content){
		const comments = [];
		let currentSection = '';
		
		content.find('p, dd, div, li, h2 .mw-headline').each((statsIndex, statsElement) => {
			if ($(statsElement).prop('tagName') === 'SPAN'){
				currentSection = $(statsElement).attr('id').replaceAll('_', ' ');
				return;
			}
			
			const txtContents = $(statsElement).contents().contents().addBack().toArray().filter(txtFilter);
			const timestamp = txtContents[txtContents.length - 1];
			const userLinks = $(timestamp).prevAll().find('*').addBack().filter(Object.keys(linkSelectors).join(', '));
			const isNoTalk = $(timestamp).parents('.mw-notalk, blockquote, cite, q').length;
			
			if (!userLinks.length || !tsRegExp.test($(timestamp).text()) || isNoTalk){
				return;
			}
			
			const userLinkTitle = userLinks.last().attr('title');
			const tsOrderFix = new RegExp(`^(${time}) (.+)(${tZone})$`);
			let tsString = $(timestamp).text().replace(tsRegExp, '$1').replace(/,/g, '').replace(tsOrderFix, '$2 $1$3');
			let userRegExp;
			
			timeZones.forEach(timeZone => {
				tsString = tsString.replace(`(${timeZone})`, timeZoneConverter[timeZone]);
			});
			
			Object.keys(linkSelectors).forEach(selector => {
				if (userLinks.last().filter(selector).length){
					userRegExp = linkSelectors[selector];
				}
			});
			
			comments.push({
				'user': userLinkTitle.replace(userRegExp, '$1'),
				'timestamp': new Date(tsString).getTime(),
				'section': currentSection,
			});
		});
		
		if (!comments.length){
			return;
		}
		
		const sections = {};
		let latestComment = {'timestamp': 0};
		comments.forEach(obj => {
			if (obj.timestamp > latestComment.timestamp){
				latestComment = obj;
			}
			
			if (!sections[obj.section]){
				sections[obj.section] = {
					'users': [],
					'timestamps': [],
				};
			}
			
			if (!sections[obj.section].users.includes(obj.user)){
				sections[obj.section].users.push(obj.user);
			}
			
			sections[obj.section].timestamps.push(obj.timestamp);
		});
		
		const now = Date.now();
		const agoText = age(latestComment.timestamp, now);
		let latestCommentTopText;
		
		if (latestComment.section){
			latestCommentTopText = msg(
				'pageframe-latestcomment',
				agoText,
				latestComment.user,
				latestComment.section,
			).parse();
		} else {
			latestCommentTopText = msg(
				'pageframe-latestcomment-notopic',
				agoText,
				latestComment.user,
			).parse();
		}
		
		if (content.attr('id') !== 'easy-talk-preview-js'){
			if ($('#talk-stats-top-js').length){
				$('#talk-stats-top-js').html(latestCommentTopText);
			} else {
				$('#mw-content-text').before($('<div>', {
					'class': 'talk-stats-js',
					'id': 'talk-stats-top-js',
					'html': latestCommentTopText,
				}));
			}
		}
		
		$('.mw-parser-output > h2').each((headingIndex, headingElement) => {
			const section = $(headingElement).find('.mw-headline').attr('id').replaceAll('_', ' ');
			if (!sections[section]){
				return;
			}
			
			let latestCommentSect = 0;
			sections[section].timestamps.forEach(ts => {
				if (ts > latestCommentSect){
					latestCommentSect = ts;
				}
			});
			
			const agoTextSect = age(latestCommentSect, now);
			const commentCount = sections[section].timestamps.length;
			const userCount = sections[section].users.length;
			$(headingElement).append($('<div>').addClass([
				'talk-stats-js',
				'talk-stats-section-js'
			]).append(
				$('<span>').text(msg(
					'topicheader-latestcomment',
					agoTextSect
				).parse()),
				$('<span>').text(msg(
					'topicheader-commentcount',
					commentCount
				).parse()),
				$('<span>').text(msg(
					'topicheader-authorcount',
					userCount
				).parse()),
			));
		});
	}
	
	function addReplyButtons(commentIndex, commentElement){
		const txtContents = $(commentElement).contents().contents().addBack().toArray().filter(txtFilter);
		const timestamp = txtContents[txtContents.length - 1];
		const userLinks = $(timestamp).prevAll().find('*').addBack().filter(Object.keys(linkSelectors).join(', '));
		const isNoTalk = $(timestamp).parents(`.mw-notalk, blockquote, cite, q, #${editorID}`).length;
		const isArchived = $(timestamp).parents('.mw-archivedtalk').length;
		
		if (!userLinks.length || !tsRegExp.test($(timestamp).text()) || isNoTalk || isArchived){
			return;
		}
		
		timestamp.nodeValue = timestamp.nodeValue.trimEnd();
		const userLinkTitle = userLinks.last().attr('title');
		let userRegExp;
		
		Object.keys(linkSelectors).forEach(selector => {
			if (userLinks.last().filter(selector).length){
				userRegExp = linkSelectors[selector];
			}
		});
		
		let tsElement;
		if ($(timestamp).parent().prop('tagName') === $(commentElement).prop('tagName')){
			tsElement = $(timestamp);
		} else {
			tsElement = $(timestamp).parent();
		}
		
		const ogTsString = $(timestamp).text().replace(tsRegExp, '$1');
		const index = $(`[data-timestamp="${ogTsString}"]`).length;
		
		tsElement.after($('<button>', {
			'class': 'reply-button-js',
			'type': 'button',
			'data-user': userLinkTitle.replace(userRegExp, '$1'),
			'data-timestamp': ogTsString,
			'data-index': index,
			'tabindex': 0,
			'text': msg('replybutton').parse(),
			'on': {'click': activateReplyButton},
		}));
	}
	
	function activateReplyButton(addReplyEvent){
		const button = $(addReplyEvent.currentTarget);
		if (button.attr('disabled')){
			return;
		}
		
		$('.reply-button-js').attr({'tabindex': -1, 'disabled': true});
		button.attr('id', 'active-reply-button-js');
		const headings = 'h1, h2, h3, h4, h5, h6';
		const rootParent = button.parents('.mw-parser-output > *');
		const sectionHeading = rootParent.prevAll(headings).first();
		const section = sectionHeading.find('.mw-headline').text();
		const parent = button.parent();
		const bNext = button.next();
		const pNext = parent.next();
		const pNextTag = pNext.prop('tagName');
		const h = /^H[1-6]$/;
		const dd = $('<dd>').append($('<form>').on(
			'submit',
			formReplyEvent => formReplyEvent.preventDefault()
		).append(
			$('<label>', {'html': msg('replywidget-label', version).parse()}),
			$('<textarea>', {
				'placeholder': msg(
					'replywidget-placeholder-reply',
					button.data('user'),
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
						$('link[rel="license"]').attr('href'),
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
					}),
				),
			),
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
			api.parse(comment, parseParams).done(renderPreview);
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
			'section': section,
			'user': button.data('user'),
			'timestamp': button.data('timestamp'),
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
		
		api.post(fetchParams).done(result => {
			const uneditedText = result.query.pages[0].revisions[0].slots.main.content;
			const timestamp = mw.util.escapeRegExp(submitReplyEvent.data.timestamp);
			const index = Number(submitReplyEvent.data.index);
			const mainText = uneditedText.replace(new RegExp(`^(?:[^]+?${timestamp}){${index}}`), '');
			const iRegExp = new RegExp(`[^]*?^([:*#]*).+?${timestamp} *$[^]*`, 'm');
			const rRegExp = new RegExp(`([^]*?)^([:*#]*)(.+?${timestamp} *)$((?:\n+\\2[:*#]+.*)*)\n*?((?:\n:.*(?:\n+:.*)*)*)\n*([^:\n][^]*)?`, 'm');
			const indent = mainText.replace(iRegExp, '$1');
			const repliesWithIndent = new RegExp(`[^]*?^.+?${timestamp} *$\n+:+[^]*`, 'm');
			let finalText;
			let prefix = uneditedText.split(submitReplyEvent.data.timestamp).splice(0, index).join(submitReplyEvent.data.timestamp);
			prefix = prefix ? prefix + submitReplyEvent.data.timestamp : '';
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
			
			let editSummary;
			if (submitReplyEvent.data.section){
				editSummary = `/* ${submitReplyEvent.data.section} */ Reply`;
			} else {
				editSummary = 'Reply';
			}
			
			const editParams = {
				'action': 'edit',
				'title': pageName,
				'text': finalText,
				'summary': editSummary,
				'tags': 'js-reply',
				'notminor': true,
				'baserevid': revid,
				'nocreate': true,
				'watchlist': 'watch',
			};
			
			api.postWithEditToken(editParams).done(data => {
				if (data.warnings){
					console.warn(data.warnings);
					for (const warning of data.warnings){
						errorNotice(`Warning: ${warning.code}: ${warning.text}`, 'warn');
					}
				}
				
				if (data.edit){
					revid = data.edit.newrevid;
					api.parse(new mw.Title(pageName)).done(parsedText => {
						$('#mw-content-text > .mw-parser-output').html($(parsedText).contents());
						mw.hook('wikipage.content').fire($('#mw-content-text'));
						mw.notify(
							msg('postedit-confirmation-published').parse(),
							{type: 'success'}
						);
					});
				}
			}).fail((code, data) => {
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
		if ((config.wgAction === 'view' || $('#editform').css('display') === 'none') && addTopicEvent){
			addTopicEvent.preventDefault();
		} else if (addTopicEvent){
			return;
		}
		
		$('.reply-button-js').attr({'tabindex': -1, 'disabled': true});
		const newTopicBox = $('<form>', {
			'id': editorID,
			'on': {'submit': formTopicEvent => formTopicEvent.preventDefault()},
		}).append(
			$('<label>', {'html': msg('replywidget-label', version).parse()}),
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
						$('link[rel="license"]').attr('href'),
					).parse(),
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
					}),
				),
			),
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
			api.parse(comment, parseParams).done(renderPreview);
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
		
		const editParams = {
			'tags': 'js-newtopic',
			'notminor': true,
			'watchlist': 'watch',
		};
		
		if (revid){
			editParams.baserevid = revid;
		}
		
		api.newSection(pageName, sectionTitle, comment, editParams).done(data => {
			if (data.warnings){
				console.warn(data.warnings);
				for (const warning of data.warnings){
					errorNotice(`Warning: ${warning.code}: ${warning.text}`, 'warn');
				}
			}
			
			if (data.edit){
				revid = data.edit.newrevid;
				api.parse(new mw.Title(pageName)).done(parserOutput => {
					let parsedText;
					if (config.wgArticleId && config.wgAction === 'view'){
						parsedText = $(parserOutput).contents();
						$('#mw-content-text > .mw-parser-output').html(parsedText);
					} else {
						parsedText = $(parserOutput);
						$(`#${editorID}`).before(parsedText);
						$('.mw-parser-output').find(commentElements).each(addReplyButtons);
					}
					mw.hook('wikipage.content').fire($('#mw-content-text'));
					$(`#${editorID}`).remove();
					mw.notify(
						msg('postedit-confirmation-topicadded').parse(),
						{type: 'success'}
					);
				});
			}
		}).fail((code, data) => {
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
		$('.reply-button-js').attr('tabindex', 0).removeAttr('disabled');
		$('#active-reply-button-js').removeAttr('id');
		$(`#${editorID}`).remove();
	}
});

function age(date, now){
	const ageNum = now - date;
	let ageText;
	
	if (ageNum < 1000 * 60){
		ageText = 'just now';
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

function txtFilter(n){
	return n.nodeType === 3 && n.nodeValue !== '\n';
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