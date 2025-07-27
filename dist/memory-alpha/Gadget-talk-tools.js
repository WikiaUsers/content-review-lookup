// <pre>
'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const version = '0.3.47 (beta)';
	const api = new mw.Api();
	const archived = $('#archivedPage').length === 1; // {{archived}}
	const view = mw.config.get('wgAction') === 'view';
	const ns = mw.config.get('wgNamespaceNumber');
	const editable = mw.config.get('wgIsProbablyEditable');
	const pgtitle = mw.config.get('wgTitle');
	const pgid = mw.config.get('wgArticleId');
	const sigNamespaces = [4, 110]; // TODO: replace with mw.config.get('wgExtraSignatureNamespaces'); also look into including ns:112
	const wrongNamespace = (ns % 2 === 0 && sigNamespaces.indexOf(ns) === -1) || ns === -1;
	const addTopicButton = $('#ca-addsection');
	let revid = mw.config.get('wgCurRevisionId');
	
	if (wrongNamespace && addTopicButton.length !== 1){
		return;
	}
	
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
	const time = '[0-2]\\d:[0-5]\\d,';
	const day = ' [1-3]?\\d,?';
	const month = ` (?:${months.join('|')})`;
	const year = ' \\d\\d\\d\\d+';
	const tZone = ` \\((?:${timeZones.join('|')})\\)`;
	const tsRegexp = new RegExp(`^.* (${time}(?:${day}|${month}|${year})+${tZone})\\s*$`);
	const linkSelectors = [
		'a[title^="User:"]',
		'a[title^="User talk:"]',
		'a[title^="Special:Contributions/"]'
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
		addStats();
		if (!view || archived || !editable){
			return;
		}
		$('.mw-parser-output').find('p, dd, div, li').each(addReplyButtons);
	});
	
	function addReplyButtons(i, e){
		const txtContents = $(e).contents().contents().addBack().toArray().filter(txtFilter);
		const timestamp = txtContents[txtContents.length - 1];
		const userLinks = $(timestamp).prevAll().find('*').addBack().filter(linkSelectors.join(', '));
		const isNoTalk = $(timestamp).parents('.mw-notalk, blockquote, cite, q').length;
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
		if ($(timestamp).parent().prop('tagName') === $(e).prop('tagName')){
			tsElement = $(timestamp);
		} else {
			tsElement = $(timestamp).parent();
		}
		
		tsElement.after($('<a>', {
			'class': 'reply-button-js',
			'href': '#',
			'role': 'button',
			'data-user': userLinkTitle.replace(userRegexp, '$1'),
			'data-timestamp': $(timestamp).text().replace(tsRegexp, '$1'),
			'tabindex': 0,
			'text': mw.message('custom-talk-tools-reply-button').text(),
			'on': {'click': activateReplyButton},
		}));
	}
	
	function activateReplyButton(event){
		event.preventDefault();
		const button = $(event.currentTarget);
		if (button.attr('aria-disabled')){
			return;
		}
		
		$('.reply-button-js').attr({'tabindex': -1, 'aria-disabled': true});
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
			'on': {'submit': e => e.preventDefault()},
		}).append($('<label>', {
			'text': mw.message('custom-talk-tools-version', version).text(),
		})).append($('<textarea>', {
			'rows': 5,
			'placeholder': mw.message(
				'custom-talk-tools-reply-to',
				button.data('user')
			).text(),
			'required': true,
		})).append($('<div>').append($('<p>', {
			'id': 'reply-license-js',
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
			button.after($('<dl id="reply-editor-js">').append(dd));
		} else if (parent.prop('tagName') === 'P' && pNextTag === 'DL'){
			pNext.append(dd.attr('id', 'reply-editor-js'));
		} else if (parent.prop('tagName') === 'P'){
			parent.after($('<dl id="reply-editor-js">').append(dd));
		} else if (bNext.length){
			bNext.append(dd.attr('id', 'reply-editor-js'));
		} else {
			button.after($('<dl id="reply-editor-js">').append(dd));
		}
		
		$('#reply-editor-js textarea').get(0).focus();
		$('#reply-cancel-js').on('click', () => {
			if ($('#reply-editor-js textarea').val()){
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
					$('#discard-comment-js a').on('click', discardComment);
				}, 10);
			} else {
				discardComment();
			}
		});
		
		$('#reply-submit-js').on('click', {
			'section': section,
			'user': button.data('user'),
			'timestamp': button.data('timestamp'),
		}, submitReply);
	}
	
	function discardComment(){
		$('.reply-button-js').attr('tabindex', 0).removeAttr('aria-disabled');
		$('#active-reply-button-js').removeAttr('id');
		$('#reply-editor-js').remove();
	}
	
	function submitReply(event){
		let comment = $('#reply-editor-js textarea').val();
		if (!comment){
			return;
		}
		
		const elmts = 'textarea, .wds-button';
		$('#reply-editor-js').find(elmts).attr('disabled', true);
		
		const fetchParams = {
			'generator': 'allpages',
			'gapfrom': pgtitle,
			'gapto': pgtitle,
			'gapnamespace': ns,
			'prop': 'revisions',
			'rvprop': 'content',
			'rvslots': 'main',
			'formatversion': 2,
		};
		
		api.get(fetchParams).done(result => {
			const initialText = result.query.pages[0].revisions[0].slots.main.content;
			const timestamp = event.data.timestamp.replace(/([()])/g, '\\$1');
			const pRegexp = new RegExp(`^.+${timestamp} *$`, 'mg');
			const iRegexp = new RegExp(`[^]*^([:*#]*).+${timestamp} *$[^]*`, 'm');
			const rRegexp = new RegExp(`([^]*)^(:*)(.+${timestamp} *)$((?:\n\n?\\2:+.*)?(?:\n\\2:+.*)*)\n*?((?:\n:.*(?:\n+:.*)*)*)\n*([^:\n][^]*)?`, 'm');
			const indent = initialText.replace(iRegexp, '$1');
			const iPrevRegexp = new RegExp(`[^]*^(:*).+${timestamp} *$\n\n?\\1:+[^]*`, 'm');
			let finalText;
			
			if (initialText.match(pRegexp).length !== 1){
				alert('Error: Unable to publish comment');
				$('#reply-cancel-js').removeAttr('disabled');
				return;
			}
			
			comment = comment.replace(/ +$/gm, '');
			comment = comment.replace(/\n\n+/g, '\n');
			comment = comment.replace(/^:+ */gm, '');
			comment = comment.replace(/^/gm, `${indent}:`);
			
			if (!/[^~]~~~~$/.test(comment)){
				if (/~~~$/.test(comment)){
					comment = comment.replace(/( *)~~~+$/, '$1~~~~');
				} else {
					comment = comment.replace(/$/, ' ~~~~');
				}
			}
			
			if (!indent.length && !iPrevRegexp.test(initialText)){
				finalText = initialText.replace(
					rRegexp,
					`$1$2$3$4\n\n${comment}$5\n\n$6`
				);
			} else {
				finalText = initialText.replace(
					rRegexp,
					`$1$2$3$4\n${comment}$5\n\n$6`
				);
			}
			
			let editSummary;
			if (event.data.section){
				editSummary = `/* ${event.data.section} */ Reply`;
			} else {
				editSummary = 'Reply';
			}
			
			const editParams = {
				'action': 'edit',
				'pageid': pgid,
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
					errorNotice(`Warning: ${data.warnings.main['*']}`, 'warn');
				}
				
				if (data.edit){
					const parseParams = {
						'action': 'parse',
						'pageid': pgid,
						'prop': 'text',
						// 'parsoid': 1,
					};
					
					revid = data.edit.newrevid;
					api.get(parseParams).done(output => {
						const parsedText = $(output.parse.text['*']).contents();
						$('#mw-content-text > .mw-parser-output').html(parsedText);
						mw.notify(mw.message('custom-talk-tools-success').text(), {type: 'success'});
						addStats();
						$('.mw-parser-output').find('p, dd, div, li').each(addReplyButtons);
					});
				} else {
					errorNotice(`An unknown error has occured: ${JSON.stringify(data)}`);
					$('#reply-editor-js').find(elmts).removeAttr('disabled');
				}
			}).fail((code, data) => {
				if (code === 'maxlag'){
					errorNotice(`Error: ${code}: ${data.error.info}`);
					$('#reply-editor-js').find(elmts).removeAttr('disabled');
				} else if (code === 'protectedpage'){
					errorNotice(`Error: ${code}: ${data.error.info}`);
				} else if (code === 'ratelimited'){
					errorNotice(`Error: ${code}: ${data.error.info}`);
					$('#reply-editor-js').find(elmts).removeAttr('disabled');
				} else if (code === 'http'){
					errorNotice(`Error: ${code}: ${JSON.stringify(data)}`);
					$('#reply-editor-js').find(elmts).removeAttr('disabled');
				} else if (code === 'permissiondenied'){
					errorNotice(`Error: ${code}: This page is in a protected namespace.`);
				} else if (code === 'readonly'){
					errorNotice(`Error: ${code}: ${data.error.info} Reason: ${data.error.readonlyreason}`);
					$('#reply-editor-js').find(elmts).removeAttr('disabled');
				} else if (code === 'articleexists'){
					errorNotice(`Error: ${code}: ${data.error.info}`);
					$('#reply-editor-js').find(elmts).removeAttr('disabled');
				} else if (code === 'editconflict'){
					errorNotice(`Error: ${code}: ${JSON.stringify(data)}`);
				} else {
					errorNotice(`Error: ${code}: ${typeof data} (${JSON.stringify(data)})`);
					$('#reply-editor-js').find(elmts).removeAttr('disabled');
				}
			});
		});
	}
	
	function errorNotice(message, type = 'error'){
		console[type](message);
		alert(message);
	}
	
	function addStats(){
		const comments = [];
		let currentSection = '';
		
		$('.mw-parser-output').find('p, dd, div, li, h2 .mw-headline').each((i, e) => {
			if ($(e).prop('tagName') === 'SPAN'){
				currentSection = $(e).attr('id').replaceAll('_', ' ');
				return;
			}
			
			const txtContents = $(e).contents().contents().addBack().toArray().filter(txtFilter);
			const timestamp = txtContents[txtContents.length - 1];
			const userLinks = $(timestamp).prevAll().find('*').addBack().filter(linkSelectors.join(', '));
			const isNoTalk = $(timestamp).parents('.mw-notalk, blockquote, cite, q').length;
			
			if (!userLinks.length || !tsRegexp.test($(timestamp).text()) || isNoTalk){
				return;
			}
			
			const userLinkTitle = userLinks.last().attr('title');
			let tsString = $(timestamp).text().replace(tsRegexp, '$1').replace(/[,]/g, '');
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
		
		if ($('#talk-stats-top-js').length){
			$('#talk-stats-top-js').html(latestCommentTopText);
		} else {
			$('#mw-content-text').before($('<div>', {
				'class': 'talk-stats-js',
				'id': 'talk-stats-top-js',
				'html': latestCommentTopText,
			}));
		}
		
		$('.mw-parser-output > h2').each((i, e) => {
			const section = $(e).find('.mw-headline').attr('id').replaceAll('_', ' ');
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
			$(e).append($('<div>').addClass([
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
});
// </pre>