/*
   @Script: UserBlocking
   @Author: Crazybloy2, Tuxedoshlyukha
   @Description: Provides a way to block users for yourself, therefore effectively hiding their profile and urls.
   @License: CC-BY-SA 3.0
   @Source: https://dev.fandom.com/wiki/MediaWiki:UserBlocking.js
   @Dependencies: https://dev.fandom.com/wiki/MediaWiki:IgnoreNotifications.js
*/

mw.loader.using('mediawiki.api', function() {
	'use strict';
	if (window.UserBlockingLoaded) return;
	window.UserBlockingLoaded = true;
	if ($('.mw-specialpagesgroup').length && mw.config.get('wgNamespaceNumber') === -1) {
		$('#mw-specialpagesgroup-users+.mw-specialpages-list>ul').append( `<li class="mw-specialpagerestricted"><a href="${mw.config.get('wgArticlePath').replace('$1', 'Special:UserBlock')}" title="Special:UserBlock">UserBlocks</a></li>` );
	}
	if (mw.config.get('wgPageName') === 'Special:UserBlock' && !window.location.href.includes('community.fandom.com/wiki/')) window.location.assign('https://community.fandom.com/wiki/Special:UserBlock');
	else if (mw.config.get('wgPageName').endsWith(':UserBlock') && mw.config.get('wgNamespaceNumber') === -1) {
		//const params = new URLSearchParams(document.location.search);
		const content = $('#mw-content-text');
		$('#firstHeading').text('Block or unblock user');
		$('title').text('Block or unblock user');
		/*
		let username;
		if(params.get('user')) {
			username = String(params.get('user'));
		}
		*/
		content.css({ minHeight: '250px'});
		content.text('');
		content.append(`
		<div style="width:auto;display:block;">
			<svg class="wds-spinner" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
				<g transform="translate(22.5, 22.5)">
					<circle class="wds-spinner__stroke" fill="none" stroke-width="5" stroke-dasharray="125" stroke-dashoffset="125" stroke-linecap="round" r="20"></circle>
				/g&gt;
			</g></svg>
		</div>
		`);
		
	}
	
	window.continueBlockedUserRes = (blockList) => {
		let cssrule = '.blockeduser';
		let cssruletwo = `${cssrule}:hover`;
		for (let [user, value] of Object.entries(blockList)) {
			if (value === 'true' || value === true) {
				$(`:is([href*=":${user}"], [title*="${user}"])`).each(function() {$(this).addClass('blockeduser');});
		    	cssrule += `, a[href*="${user.replace(/_/g, '%20')}"]`;
		    	cssruletwo += `, a[href*="${user.replace(/_/g, '%20')}"]:hover`;
			}
	    }
	    cssrule += ' {filter:blur(4px;);transition:500ms;}';
	    cssruletwo += ' {filter:blur(0);transition:500ms;}';
	    if (window.blockedUsers[mw.config.get('profileUserName')] === 'true' || window.blockedUsers[mw.config.get('profileUserName')] === true) {
	    	(function() {
		        var wait = function() {
		            if ($('.user-identity-box').length) {
		                $('body').append($('<style>').text(`
		                @import url("/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:UserBlocking.css");
			    		`).attr('id', 'blockedProfile'));
			    		$('#userProfileApp').append(`
			    		<div class="daler-Box">
			    		<div style="background-color: var(--theme-page-background-color--secondary);border-color: var(--theme-border-color);color: inherit;padding: 3% 3%;gap:12px;position:relative;height:100%;">
			    		<center style="zoom:0.8;"><h2 style="text-transform: uppercase !important;font-weight: bold !important;font-family: rubik, helvetica, arial, sans-serif !important;">You have blocked this user!</h2>
			    		<br>
			    		<a class="wds-button" id="showProfile" style="margin-right:10px;">Show profile</a>
			    		<a class="wds-button" href="https://community.fandom.com/wiki/Special:UserBlock" style="color:white;background-color:#ad0000; border-color:transparent;">Unblock</a>
			    		
			    		</center>
			    		</div>
			    		</div>
			    		`);
			    		$('#showProfile').on('click', function() {
			    			$('#blockedProfile').remove();
			    			$('.daler-Box').remove();
			    			
			    		});
		            } else {
		                setTimeout(wait, 500);
		            }
		        };
		        wait();
		    })();

	    }
	    
	    $('body').append($('<style>').text(`
	    .blockeduser {filter:blur(5px);}
	    .blockeduser:hover {filter:blur(0);transition:500ms;}
	    `));
	    
	    delete window.continueBlockedUserRes;
	    if (mw.config.get('wgPageName') === 'Special:UserBlock') {
	    	const el = $('<div>');
	    		el.attr({
	    			id: 'blockListEdit',
	    			class: 'blocklisting'
	    		});
	    		el.append('<div id="list_blocked" style="padding:2% 30%;padding-bottom:0;"></div>');
	    	for (const [username, value] of Object.entries(window.blockedUsers)) {
	    		const div = $('<div>');
	    			div.attr({  'class': 'blockNodes', 'data-name': username	, style: `display: flex;background-color: var(--theme-page-background-color--secondary);border-color: var(--theme-border-color);color: inherit;padding: 12px 18px 18px;gap:10px;position:relative;`});
	    			//div.css({});
	    			div.append(`
	    			<div class="wds-input wds-input--outlined outlined has-icon--right">  
					    <input class="wds-input__field BlockListField" id="User-${username}" name="wds_input" type="text" value="${username}">			
					    <div class="wds-input__hint-container">
					    	<!---<div class="wds-input__hint"><strong></strong></div>--->
				    	</div>
					</div>
					<a style="top:5.5%;right:1%;position:absolute;background-color:red;border-color:red;" class="wds-button wds-is-aquare blockList_button" data-username="${username}"><svg style="fill:white" class="wds-icon wds-icon-small" focusable="false"><use xlink:href="#wds-icons-trash-small"></use></svg></a>
	    			`);
	    			el.find('#list_blocked').append(div);
	    	}
	    	$('body').append(`<style>
	    	.blockNodes {margin-bottom: 20px;border: solid 1px;}
	    	</style>`);
	    	$('#mw-content-text').text('');
	    	$('#mw-content-text').append(el);
	    	$('#blockListEdit').append(`
	    	<center>
	    	<a class="wds-button" id="AddNew">Add new</a><a class="wds-button" id="saveBlockList" style="margin-left:10px;">Save</a> 
	    	</center>
	    	`);
	    	$('.BlockListField').on('change', function() {
	    		const el = $(`.blockList_button:is([data-username="${$(this).attr('id').replace('User-', '')}"])`);
	    			el.attr('data-username', $(this).val());
	    		$(this).attr('id', `User-${$(this).val()}`);
	    	});
	    	$('.blockList_button').each(function() {
	    		$(this).on('click', function() {
	    			$(`.blockNodes:has([data-username="${$(this).data('username')}"])`).remove();
	    		});
	    	});
	    	$('#AddNew').on('click', function() {
	    		const newVal = $('blockNodes').length+Math.random();
	    		if (!$('#User-').length) {
	    			const div = $('<div>');
	    			div.attr({  'class': 'blockNodes', 'data-name': newVal	, style: `display: flex;background-color: var(--theme-page-background-color--secondary);border-color: var(--theme-border-color);color: inherit;padding: 12px 18px 18px;gap:10px;position:relative;`});
	    			//div.css({});
	    			div.append(`
	    			<div class="wds-input wds-input--outlined outlined has-icon--right">  
					    <input class="wds-input__field BlockListField" id="User-" name="wds_input" type="text" value="${newVal}">			
					    <div class="wds-input__hint-container">
					    	<!---<div class="wds-input__hint"><strong></strong></div>--->
				    	</div>
					</div>
					<a style="top:5.5%;right:1%;position:absolute;background-color:red;border-color:red;" class="wds-button wds-is-aquare blockList_button" data-username=""><svg style="fill:white" class="wds-icon wds-icon-small" focusable="false"><use xlink:href="#wds-icons-trash-small"></use></svg></a>
	    			`);
	    			el.find('#list_blocked').append(div);
	    			$('.BlockListField').on('change', function() {
			    		const el = $(`.blockList_button:is([data-username="${$(this).attr('id').replace('User-', '')}"])`);
			    			el.attr('data-username', $(this).val());
			    		$(this).attr('id', `User-${$(this).val()}`);
			    	});
			    	$('.blockList_button').each(function() {
			    		$(this).on('click', function() {
			    			$(`.blockNodes:has([data-username="${$(this).data('username')}"])`).remove();
			    		});
			    	});
	    		}
	    	});
	    	$('#saveBlockList').on('click', function() {
	    		window.tempList = {};
	    		$('.BlockListField').each(function() {
	    			window.tempList[$(this).val()[0].toUpperCase() + $(this).val().slice(1)] = true;
	    		});
	    		const apiPost = new mw.Api();
	    		apiPost.post({
	    			'action': 'edit',
					'title': `User:${mw.config.get('wgUserName')}/blockedusers.json`,
					'text': JSON.stringify(window.tempList),
					'token': mw.user.tokens.get('csrfToken'),
					'summary': 'updating blockedusers page',
					'format':'json'
	    		}).then(function(res) {
					if (res.error) {
						delete window.tempList;
						return alert('an error occured.');
					}
					apiPost.post({
						'action': 'purge',
						'title': `User:${mw.config.get('wgUserName')}/blockedusers.json`,
						'format': 'json'
					}).then(() => {
						delete window.tempList;
						window.location.assign('https://community.fandom.com/wiki/Community_Central');
					});
				});
				/*
	    		$.ajax({
					'url': mw.util.wikiScript('api'),
					'type': 'POST',
					'data': {
						'action': 'edit',
						'title': `User:${mw.config.get('wgUserName')}/blockedusers.json`,
						'text': JSON.stringify(window.tempList),
						'token': mw.user.tokens.get('csrfToken'),
						'summary': 'updating blockedusers page',
						'format':'json'
					}
				});
				*/
	    	});
	    }
	};
	
	const api = new mw.Api();
	const page = mw.config.get('wgCityId') !== 177 ? `{{w::User:${mw.config.get('wgUserName')}/blockedusers.json}}` : `{{:User:${mw.config.get('wgUserName')}/blockedusers.json}}`;
	api.get({
		action: 'parse',
		text: page,
		format: 'json'
	}).then(res => {
		if (res.error) {
			console.error(`Parsing blocklist failed: ${res.error.parse}`);
			return;
		}
		const el = $('<div>');
		el.attr({ id: 'tempJSONBody' });
		el.html(res.parse.text['*']);
		$('body').append(el);
		const jsonBody = $('#tempJSONBody p');
		console.log(jsonBody.text());
		
		try {
			if (mw.config.get('wgCityId') === 177) {
				window.blockedUsers = JSON.parse(jsonBody.text().trim());
			} else {
				window.blockedUsers = {};
				$('#tempJSONBody tr').each(function() {
					window.blockedUsers[$(this).find('span').text()] = $(this).find('.mw-json-value').text().replace(/"/g, '');
				
					
				});
			}
			if (window.UserBlockingIncludesIgnoreNotifs) {
				if (!window.andrewds1021) {
				    window.andrewds1021 = {
				        ignore_notifications: {
				        	filters: {
				        		
				        	}
				        }
				    };
				} else if (!window.andrewds1021.ignore_notifications) {
				    window.andrewds1021.ignore_notifications = {
				    	filters: {
				    		
				    	}
				    };
				}
				if (typeof window.andrewds1021.ignore_notifications.filters.user_names === 'object' && window.andrewds1021.ignore_notifications.filters.user_names.isArray()) {
					for (const [key, val] of Object.entries(window.blockedUsers)) {
						window.andrewds1021.ignore_notifications.filters.user_names.push(key);
					}
				} else if (typeof window.andrewds1021.ignore_notifications.filters.user_names === 'string') {
					const val = window.andrewds1021.ignore_notifications.filters.user_names;
					window.andrewds1021.ignore_notifications.filters.user_names = [val];
					for (const [key, val] of Object.entries(window.blockedUsers)) {
						window.andrewds1021.ignore_notifications.filters.user_names.push(key);
					}
				} else if (typeof window.andrewds1021.ignore_notifications.filters.user_names === 'undefined') {
					window.andrewds1021.ignore_notifications.filters.user_names = [];
					for (const [key, val] of Object.entries(window.blockedUsers)) {
						window.andrewds1021.ignore_notifications.filters.user_names.push(key);
					}
				}
			}
			importArticles({
			    type: 'script',
			    articles: [
			        'u:dev:MediaWiki:IgnoreNotifications.js',
			    ]
			});
			window.continueBlockedUserRes(window.blockedUsers);
		} catch(e) {
			console.error(`error while parsing: ${e}`);
		}
		/*
		let int = 0;
		jsonBody.each(function() {
			const key = $(this).children().first().text();
			const value = $(this).find('.mw-json-value').text();
			obj[key] = value;
			int++;
		});
		console.log(int);
		*/
		el.remove();
		//.replace(/<\/?[^>]+(>|$)/g, '');
		//console.log(obj);
	});

});