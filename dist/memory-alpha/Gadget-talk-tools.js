'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const config = mw.config.values;
	const ns = config.wgNamespaceNumber;
	const notExtraSigNS = config.wgExtraSignatureNamespaces.indexOf(ns) === -1;
	const wrongNamespace = (ns % 2 === 0 && notExtraSigNS) || ns < 0;
	const addTopicButton = $('#ca-addsection');
	const noTalkTools = wrongNamespace && !addTopicButton.length;
	
	if (window.TalkToolsLoaded || noTalkTools){
		return;
	}
	
	window.TalkToolsLoaded = true;
	window.dev = window.dev || {};
	window.dev.DisableArchivedPages = window.dev.DisableArchivedPages || {};
	window.dev.DisableArchivedPages.id = window.dev.DisableArchivedPages.id || 'archivedPage';
	
	let revid = config.wgCurRevisionId;
	let updatePreview;
	const version = '0.5.15 (beta)';
	const api = new mw.Api({'parameters': {
		'action': 'query',
		'format': 'json',
		'formatversion': 2,
		'errorformat': 'plaintext',
	}});
	const notArchived = !$(`#${window.dev.DisableArchivedPages.id}`).length;
	const editorID = 'talk-tools-editor-js';
	const fatalErrors = ['protectedpage', 'permissiondenied', 'editconflict'];
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
	const day = ' [1-3]?\\d,?';
	const month = ` (?:${months.join('|')})`;
	const year = ' \\d\\d\\d\\d+';
	const tZone = ` \\((?:${timeZones.join('|')})\\)`;
	const tsRegexp = new RegExp(`^.* (${time},(?:${day}|${month}|${year})+${tZone})\\s*$`);
	const commentElements = 'p, dd, div, li';
	const params = new URLSearchParams(location.search);
	const linkSelectors = [
		'a[title^="User:"]',
		'a[title^="User talk:"]',
		'a[title^="Special:Contributions/"]',
	];
	const newSectionLinkSelectors = [
		'#ca-addsection',
		`a[title="Special:NewSection/${config.wgPageName.replaceAll('_', ' ')}"]`,
	];
	const messages = [
		'custom-talk-tools-reply-button',
		'custom-talk-tools-cancel',
		'custom-talk-tools-version',
		'custom-talk-tools-reply-to',
		'custom-talk-tools-license-text',
		'custom-talk-tools-discard-label',
		'custom-talk-tools-discard-text',
		'custom-talk-tools-discard-keep',
		'custom-talk-tools-discard',
		'custom-talk-tools-success',
		'custom-talk-tools-latest-comment-text-top',
		'custom-talk-tools-latest-comment-text-forum',
		'custom-talk-tools-latest-comment-text-sect',
		'custom-talk-tools-comment-count-text',
		'custom-talk-tools-user-count-text',
		'minutes',
		'hours',
		'days',
		'months',
		'years',
	];
	
	api.loadMessagesIfMissing(messages).done(() => {
		mw.hook('wikipage.content').add(addStats);
		$(newSectionLinkSelectors.join(', ')).on('click', addTopic);
		if (
			!config.wgArticleId
			&& params.get('redlink')
			&& notExtraSigNS
		){
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
			mw.hook('wikipage.content').add(content => {
				$('p:has(br:only-child)').remove();
				$('dl + dl').each((dlIndex, dl) => {
					$(dl).prepend($(dl).prev().html());
					$(dl).prev().remove();
				});
				$('dd:has(dl:last-child) + dd > dl:first-child').each((dlIndex, dl) => {
					const prevDL = $(dl).parent().prev().children(':last-child');
					$(dl).prepend(prevDL.html());
					prevDL.remove();
					$(dl).before($(dl).parent().prev().html());
					$(dl).parent().prev().remove();
				});
				content.find(commentElements).each(addReplyButtons);
			});
		}
	});
	
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
			const userLinks = $(timestamp).prevAll().find('*').addBack().filter(linkSelectors.join(', '));
			const isNoTalk = $(timestamp).parents('.mw-notalk, blockquote, cite, q').length;
			
			if (!userLinks.length || !tsRegexp.test($(timestamp).text()) || isNoTalk){
				return;
			}
			
			const userLinkTitle = userLinks.last().attr('title');
			const tsOrderFix = new RegExp(`^(${time}) (.+)(${tZone})$`);
			let tsString = $(timestamp).text().replace(tsRegexp, '$1').replace(/,/g, '').replace(tsOrderFix, '$2 $1$3');
			let userRegexp;
			
			timeZones.forEach(timeZone => {
				tsString = tsString.replace(`(${timeZone})`, timeZoneConverter[timeZone]);
			});
			
			if (userLinks.last().filter(linkSelectors[0]).length){
				userRegexp = /^User:(.+?)(?:\/.*)?$/;
			} else if (userLinks.last().filter(linkSelectors[1]).length){
				userRegexp = /^User talk:(.+?)(?:\/.*)?$/;
			} else {
				userRegexp = /^Special:Contributions\/(.+?)(?:\/.*)?$/;
			}
			
			comments.push({
				'user': userLinkTitle.replace(userRegexp, '$1'),
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
			
			if (sections[obj.section].users.indexOf(obj.user) === -1){
				sections[obj.section].users.push(obj.user);
			}
			
			sections[obj.section].timestamps.push(obj.timestamp);
		});
		
		const now = Date.now();
		const agoText = age(latestComment.timestamp, now);
		let latestCommentTopText;
		
		if (latestComment.section){
			latestCommentTopText = mw.message(
				'custom-talk-tools-latest-comment-text-top',
				agoText,
				latestComment.user,
				latestComment.section
			).parse();
		} else {
			latestCommentTopText = mw.message(
				'custom-talk-tools-latest-comment-text-forum',
				agoText,
				latestComment.user
			).parse();
		}
		
		if (content.attr('id') !== 'talk-tools-preview-js'){
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
			]).append($('<span>', {
				'text': mw.message(
					'custom-talk-tools-latest-comment-text-sect',
					agoTextSect
				).text(),
			})).append($('<span>', {
				'text': mw.message(
					'custom-talk-tools-comment-count-text',
					commentCount
				).text(),
			})).append($('<span>', {
				'text': mw.message(
					'custom-talk-tools-user-count-text',
					userCount
				).text(),
			})));
		});
	}
	
	function addReplyButtons(commentIndex, commentElement){
		const txtContents = $(commentElement).contents().contents().addBack().toArray().filter(txtFilter);
		const timestamp = txtContents[txtContents.length - 1];
		const userLinks = $(timestamp).prevAll().find('*').addBack().filter(linkSelectors.join(', '));
		const isNoTalk = $(timestamp).parents('.mw-notalk, blockquote, cite, q, #talk-tools-editor-js').length;
		const isArchived = $(timestamp).parents('.mw-archivedtalk').length;
		
		if (!userLinks.length || !tsRegexp.test($(timestamp).text()) || isNoTalk || isArchived){
			return;
		}
		
		timestamp.nodeValue = timestamp.nodeValue.trimEnd();
		const userLinkTitle = userLinks.last().attr('title');
		let userRegexp;
		
		if (userLinks.last().filter(linkSelectors[0]).length){
			userRegexp = /^User:(.+?)(?:\/.*)?$/;
		} else if (userLinks.last().filter(linkSelectors[1]).length){
			userRegexp = /^User talk:(.+?)(?:\/.*)?$/;
		} else {
			userRegexp = /^Special:Contributions\/(.+?)(?:\/.*)?$/;
		}
		
		let tsElement;
		if ($(timestamp).parent().prop('tagName') === $(commentElement).prop('tagName')){
			tsElement = $(timestamp);
		} else {
			tsElement = $(timestamp).parent();
		}
		
		const ogTsString = $(timestamp).text().replace(tsRegexp, '$1');
		const index = $(`[data-timestamp="${ogTsString}"]`).length;
		
		tsElement.after($('<button>', {
			'class': 'reply-button-js',
			'type': 'button',
			'data-user': userLinkTitle.replace(userRegexp, '$1'),
			'data-timestamp': ogTsString,
			'data-index': index,
			'tabindex': 0,
			'text': mw.message('custom-talk-tools-reply-button').text(),
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
		const dd = $('<dd>').append($('<form>', {
			'on': {'submit': formReplyEvent => formReplyEvent.preventDefault()},
		}).append($('<label>', {
			'html': mw.message('custom-talk-tools-version', version).parse(),
		})).append($('<textarea>', {
			'placeholder': mw.message(
				'custom-talk-tools-reply-to',
				button.data('user')
			).text(),
			'required': true,
			'on': {'input': resizeTextBox},
		})).append($('<div>', {
			'id': 'talk-tools-preview-js',
			'data-label': 'Preview',
			'lang': 'en',
			'dir': 'ltr',
		})).append($('<div>', {
			'id': 'talk-tools-footer-js',
		}).append($('<p>', {
			'id': 'talk-tools-license-js',
			'html': mw.message('custom-talk-tools-license-text').parse(),
		})).append($('<div>').append($('<button>', {
			'class': 'wds-button wds-is-secondary',
			'id': 'reply-cancel-js',
			'text': mw.message('custom-talk-tools-cancel').text(),
		})).append($('<button>', {
			'class': 'wds-button',
			'id': 'reply-submit-js',
			'text': mw.message('custom-talk-tools-reply-button').text(),
		})))));
		
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
				$('#talk-tools-preview-js').html('');
				return;
			}
			const parseParams = {
				'action': 'parse',
				'title': config.wgPageName,
				'text': comment,
				'revid': revid,
				'prop': 'text',
				'parsoid': 1,
				'pst': true,
				'preview': true,
			};
			api.post(parseParams).done(previewJSON => {
				const parsedPreview = $(previewJSON.parse.text);
				$('#talk-tools-preview-js').html(parsedPreview);
				mw.hook('wikipage.content').fire($('#talk-tools-preview-js'));
			});
		}, 2000);
		
		$('#reply-cancel-js').on('click', () => {
			if ($(`#${editorID} textarea`).val()){
				const confirmationDialog = new OO.ui.MessageDialog();
				const windowManager = new OO.ui.WindowManager();
				$('body').append(windowManager.$element);
				windowManager.addWindows([confirmationDialog]);
				windowManager.openWindow(confirmationDialog, {
					title: mw.message('custom-talk-tools-discard-label').text(),
					message: mw.message('custom-talk-tools-discard-text').text(),
					actions: [
						{
							action: 'reject',
							label: mw.message('custom-talk-tools-discard-keep').text(),
							flags: 'progressive',
						},
						{
							action: 'accept',
							label: mw.message('custom-talk-tools-discard').text(),
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
			'titles': config.wgPageName,
			'prop': 'revisions',
			'rvprop': 'content',
			'rvslots': 'main',
		};
		
		api.post(fetchParams).done(result => {
			const uneditedText = result.query.pages[0].revisions[0].slots.main.content;
			const timestamp = submitReplyEvent.data.timestamp.replace(/([()])/g, '\\$1');
			const index = Number(submitReplyEvent.data.index);
			const mainText = uneditedText.replace(new RegExp(`^(?:[^]+?${timestamp}){${index}}`), '');
			const iRegexp = new RegExp(`[^]*?^([:*#]*).+?${timestamp} *$[^]*`, 'm');
			const rRegexp = new RegExp(`([^]*?)^([:*#]*)(.+?${timestamp} *)$((?:\n+\\2[:*#]+.*)*)\n*?((?:\n:.*(?:\n+:.*)*)*)\n*([^:\n][^]*)?`, 'm');
			const indent = mainText.replace(iRegexp, '$1');
			const repliesWithIndent = new RegExp(`[^]*?^.+?${timestamp} *$\n+:+[^]*`, 'm');
			let finalText;
			let prefix = uneditedText.split(submitReplyEvent.data.timestamp).splice(0, index).join(submitReplyEvent.data.timestamp);
			prefix = prefix ? prefix + submitReplyEvent.data.timestamp : '';
			comment = parseReplyText(comment, indent);
			
			if (!indent.length && !repliesWithIndent.test(mainText)){
				finalText = prefix + mainText.replace(
					rRegexp,
					`$1$2$3$4\n\n${comment}$5\n\n$6`
				);
			} else {
				finalText = prefix + mainText.replace(
					rRegexp,
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
				'title': config.wgPageName,
				'text': finalText,
				'summary': editSummary,
				'tags': 'js-reply',
				'notminor': 1,
				'baserevid': revid,
				'nocreate': 1,
				'watchlist': 'watch',
			};
			
			api.postWithToken('csrf', editParams).done(data => {
				if (data.warnings){
					console.warn(data.warnings);
					for (const i in data.warnings){
						const warning = data.warnings[i];
						errorNotice(`Warning: ${warning.code}: ${warning.text}`, 'warn');
					}
				}
				
				if (data.edit){
					const parseParams = {
						'action': 'parse',
						'page': config.wgPageName,
						'prop': 'text',
						// 'parsoid': 1,
					};
					
					revid = data.edit.newrevid;
					api.post(parseParams).done(output => {
						const parsedText = $(output.parse.text).contents();
						$('#mw-content-text > .mw-parser-output').html(parsedText);
						mw.hook('wikipage.content').fire($('#mw-content-text'));
						mw.notify(mw.message('custom-talk-tools-success').text(), {type: 'success'});
					});
				}
			}).fail((code, data) => {
				console.error(data.errors);
				for (const i in data.errors){
					const error = data.errors[i];
					if (error.code === 'permissiondenied'){
						errorNotice(`Error: ${error.code}: This page is in a protected namespace.`);
					} else {
						errorNotice(`Error: ${error.code}: ${error.text}`);
					}
				}
				
				if (fatalErrors.indexOf(data.errors[0].code) === -1){
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
		}).append($('<label>', {
			'html': mw.message('custom-talk-tools-version', version).parse(),
		})).append($('<h2>', {
			'id': 'newtopic-sectiontitle-js',
		}).append($('<input>', {
			'placeholder': 'Subject',
			'aria-label': 'Subject',
			'spellcheck': true,
			'required': true,
		}))).append($('<textarea>', {
			'placeholder': 'Description',
			'required': true,
			'on': {'input': resizeTextBox},
		})).append($('<div>', {
			'id': 'talk-tools-preview-js',
			'data-label': 'Preview',
			'lang': 'en',
			'dir': 'ltr',
		})).append($('<div>', {
			'id': 'talk-tools-footer-js',
		}).append($('<p>', {
			'id': 'talk-tools-license-js',
			'html': mw.message('custom-talk-tools-license-text').parse(),
		})).append($('<div>').append($('<button>', {
			'class': 'wds-button wds-is-secondary',
			'id': 'newtopic-cancel-js',
			'text': mw.message('custom-talk-tools-cancel').text(),
		})).append($('<button>', {
			'class': 'wds-button',
			'id': 'newtopic-submit-js',
			'text': 'Add topic',
		}))));
		
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
				$('#talk-tools-preview-js').html('');
				return;
			}
			const parseParams = {
				'action': 'parse',
				'title': config.wgPageName,
				'text': comment,
				'prop': 'text',
				'parsoid': true,
				'pst': true,
				'section': 'new',
				'sectiontitle': sectionTitle,
				'disableeditsection': true,
				'sectionpreview': true,
			};
			if (revid){
				parseParams.revid = revid;
			}
			api.post(parseParams).done(previewJSON => {
				const parsedPreview = $(previewJSON.parse.text);
				$('#talk-tools-preview-js').html(parsedPreview);
				mw.hook('wikipage.content').fire($('#talk-tools-preview-js'));
			});
		}, 2000);
		
		$('#newtopic-cancel-js').on('click', () => {
			if ($(`#${editorID} input`).val() || $(`#${editorID} textarea`).val()){
				const confirmationDialog = new OO.ui.MessageDialog();
				const windowManager = new OO.ui.WindowManager();
				$('body').append(windowManager.$element);
				windowManager.addWindows([confirmationDialog]);
				windowManager.openWindow(confirmationDialog, {
					title: mw.message('custom-talk-tools-discard-label').text(),
					message: 'Are you sure you want to discard the topic you are writing?',
					actions: [
						{
							action: 'reject',
							label: mw.message('custom-talk-tools-discard-keep').text(),
							flags: 'progressive',
						},
						{
							action: 'accept',
							label: 'Discard topic',
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
			'action': 'edit',
			'title': config.wgPageName,
			'section': 'new',
			'sectiontitle': sectionTitle,
			'text': comment,
			'tags': 'js-newtopic',
			'notminor': 1,
			'watchlist': 'watch',
		};
		
		if (revid){
			editParams.baserevid = revid;
		}
		
		api.postWithToken('csrf', editParams).done(data => {
			if (data.warnings){
				console.warn(data.warnings);
				for (const i in data.warnings){
					const warning = data.warnings[i];
					errorNotice(`Warning: ${warning.code}: ${warning.text}`, 'warn');
				}
			}
			
			if (data.edit){
				const parseParams = {
					'action': 'parse',
					'page': config.wgPageName,
					'prop': 'text',
					// 'parsoid': 1,
				};
				
				revid = data.edit.newrevid;
				api.post(parseParams).done(output => {
					let parsedText;
					if (config.wgArticleId && config.wgAction === 'view'){
						parsedText = $(output.parse.text).contents();
						$('#mw-content-text > .mw-parser-output').html(parsedText);
					} else {
						parsedText = $(output.parse.text);
						$(`#${editorID}`).before(parsedText);
						$('.mw-parser-output').find(commentElements).each(addReplyButtons);
					}
					mw.hook('wikipage.content').fire($('#mw-content-text'));
					$(`#${editorID}`).remove();
					mw.notify('Your topic was added.', {type: 'success'});
				});
			}
		}).fail((code, data) => {
			console.error(data.errors);
			for (const i in data.errors){
				const error = data.errors[i];
				if (error.code === 'permissiondenied'){
					errorNotice(`Error: ${error.code}: This page is in a protected namespace.`);
				} else {
					errorNotice(`Error: ${error.code}: ${error.text}`);
				}
			}
			
			if (fatalErrors.indexOf(data.errors[0].code) === -1){
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

function errorNotice(message, type = 'error'){
	console[type](message);
	alert(message);
}

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

function txtFilter(n){
	return n.nodeType === 3 && n.nodeValue !== '\n';
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

function resizeTextBox(boxEvent){
	const textBox = $(boxEvent.currentTarget);
	textBox.removeAttr('style');
	textBox.css('height', textBox.prop('scrollHeight') + 2);
}