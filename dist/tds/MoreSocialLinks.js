/**
 * Name:        MoreSocialLinks
 * Version:     v1.4ae
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 *				t7ru [[User:Gabonnie]]
 * Description: Forked version to tailor it for Alterpedia.
 */
(() => {
	'use strict';
	const { profileUserId, profileUserName, wgUserId } = mw.config.get([
		'profileUserId',
		'profileUserName',
		'wgUserId'
	]);
	
	if (!profileUserName || window.MoreSocialLinksLoaded) {
		return;
	}
	window.MoreSocialLinksLoaded = true;
	
	const REGEX_PATTERNS = {
		instagram: /^https?:\/\/(?:m\.|www\.)?instagram\.com\//,
		twitch: /^https?:\/\/(?:www\.)?twitch\.tv\//,
		twitter: /^https?:\/\/(?:mobile\.)?(?:twitter\.com|x\.com)\//,
		youtube: /^https?:\/\/(?:m\.|www\.)?youtube\.com\/(?:user\/|channel\/|@)/,
		roblox: /^https?:\/\/(?:www\.)?roblox\.com\/users\/profile\?username=/
	};
	
	const LABELS = {
		facebook: 'Facebook',
		instagram: 'Instagram',
		twitch: 'Twitch',
		twitter: 'X',
		website: 'Website',
		youtube: 'YouTube',
		tdsw: 'AE Wiki',
		discord: 'Discord',
		roblox: 'Roblox',
		edit: 'Edit links'
	};
	
	const LINK_LABELS = {
		facebook: 'Facebook profile',
		instagram: 'Instagram profile',
		twitch: 'Twitch channel',
		twitter: 'X profile',
		website: 'website',
		youtube: 'YouTube channel',
		tdsw: 'AE Wiki profile',
		roblox: 'Roblox profile'
	};
	
	const MoreSocialLinks = {
		regexes: REGEX_PATTERNS,
		linkFields: [
			'facebook',
			'instagram',
			'twitch',
			'twitter',
			'website',
			'roblox',
			'youtube',
			'discord'
		],
		links: {},
		
		loaded() {
			this.findContainer().then(this.init.bind(this));
		},
		
		findContainer() {
			const promise = $.Deferred();
			const interval = setInterval(() => {
				const $element = $('#userProfileApp .user-identity-social');
				if ($element && $element.length) {
					clearInterval(interval);
					promise.resolve($element);
				}
			}, 300);
			return promise;
		},
		
		init($links) {
			this.$links = $links;
			$.get('https://services.fandom.com/user-attribute/user/bulk', {
				cb: Date.now(),
				id: profileUserId
			}).then((data) => {
				this.show(data);
			});
		},
		
		show(data) {
			if (data.users && data.users[profileUserId]) {
				$.each(data.users[profileUserId], this.eachLink.bind(this));
			}
			
			if (Number(wgUserId) === Number(profileUserId)) {
				this.links.edit = '#';
			}
			
			const links = window.dev.ui({
				type: 'ul',
				classes: ['user-identity-social'],
				children: $.map(this.links, this.mapLink.bind(this))
			});
			
			this.$links.replaceWith(links);
			this.initModal();
			$(links).find('.edit > a')
				.click(this.edit.bind(this))
				.removeAttr('target');
		},
		
		eachLink(k, v) {
			if (!v) return;
			
			const linkMap = {
				fbPage: () => { this.links.facebook = v; },
				social_instagram: () => { this.links.instagram = `https://instagram.com/${v}`; },
				social_twitch: () => { this.links.twitch = `https://twitch.tv/${v}`; },
				social_youtube: () => { 
					this.links.youtube = v.match(this.regexes.youtube) ? v : `https://youtube.com/@${v}`;
				},
				twitter: () => { this.links.twitter = `https://x.com/${v}`; },
				website: () => { this.links.website = v; },
				username: () => { this.links.tdsw = `https://alter-ego.fandom.com/wiki/User:${v}`; },
				occupation: () => { this.links.roblox = `https://www.roblox.com/users/profile?username=${v}`; },
				discordHandle: () => { this.links.discord = v; }
			};
			
			if (linkMap[k]) {
				linkMap[k]();
			}
		},
		
		mapLink(v, k) {
			if (k === 'discord') {
				return {
					type: 'li',
					classes: [k, 'wds-dropdown'],
					children: [{
						type: 'div',
						classes: ['user-identity-social__icon', 'wds-dropdown__toggle'],
						title: this.labelFor(k),
						children: [{
							type: 'span',
							classes: ['ego-i', 'i-discord1']
						}]
					}, {
						type: 'div',
						classes: ['wds-dropdown__content'],
						children: [{
							type: 'ul',
							classes: ['wds-list'],
							children: [{
								type: 'li',
								style: 'padding: 5px 10px;',
								text: v
							}]
						}]
					}]
				};
			}
			
			if (k === 'edit') {
				return {
					type: 'li',
					classes: ['edit'],
					children: [{
						type: 'a',
						children: [{
							type: 'span',
							classes: ['ego-i', 'i-pencil1']
						}],
						classes: ['user-identity-social__icon'],
						attr: { href: v },
						title: this.labelFor(k)
					}]
				};
			}
			
			const iconMap = {
				website: 'globe',
				twitter: 'twitter-x',
				youtube: 'youtube1',
				twitch: 'twitch1',
				facebook: 'facebook1',
				tdsw: 'aew'
			};
			
			return {
				type: 'li',
				classes: [k, 'wds-dropdown'],
				children: [{
					type: 'div',
					classes: ['wds-dropdown__toggle', 'user-identity-social__icon'],
					title: this.labelFor(k),
					children: [{
						type: 'span',
						classes: ['ego-i', `i-${iconMap[k] || k}`]
					}]
				}, {
					type: 'div',
					classes: ['wds-dropdown__content'],
					children: [{
						type: 'ul',
						classes: ['wds-list', 'wds-is-linked'],
						children: [{
							type: 'li',
							children: [{
								type: 'a',
								attr: {
									href: v,
									target: '_blank',
									rel: 'noopener noreferrer'
								},
								text: this.linkLabelFor(k)
							}]
						}]
					}]
				}]
			};
		},
		
		initModal() {
			this.modal = new window.dev.modal.Modal({
				buttons: [{
					event: 'save',
					primary: true,
					text: 'Save'
				}],
				content: {
					type: 'form',
					classes: ['MoreSocialLinksForm'],
					children: $.map(this.linkFields, this.mapGroup.bind(this)).filter(Boolean)
				},
				context: this,
				events: {
					save: 'save'
				},
				id: 'MoreSocialLinksModal',
				size: 'small',
				title: 'Edit links'
			});
			this.modal.create();
		},
		
		mapGroup(k) {
			return {
				type: 'div',
				classes: ['input-group'],
				children: [{
					type: 'label',
					attr: { 'for': k },
					text: this.labelFor(k)
				}, {
					type: 'input',
					attr: {
						id: k,
						name: k,
						type: 'text',
						value: this.links[k] || ''
					}
				}]
			};
		},
		
		save() {
			const data = {};
			
			$('.MoreSocialLinksForm input').each((_, el) => {
				const $el = $(el);
				let val = $el.val();
				const name = $el.attr('name');
				const regex = this.regexes[name];
				
				if (regex && val.match(regex)) {
					val = val.replace(regex, '');
				}
				
				const dataMap = {
					facebook: () => { data.fbPage = val; },
					instagram: () => { data.social_instagram = val; },
					twitch: () => { data.social_twitch = val; },
					youtube: () => { data.social_youtube = val; },
					twitter: () => { data.twitter = val; },
					roblox: () => { data.occupation = val; },
					discord: () => { data.discordHandle = val; },
					default: () => { data[name] = val; }
				};
				
				(dataMap[name] || dataMap.default)();
			});
			
			$.ajax({
				context: this,
				data,
				type: 'PATCH',
				url: `https://services.fandom.com/user-attribute/user/${profileUserId}`,
				xhrFields: {
					withCredentials: true
				}
			}).done(this.saved);
		},
		
		saved() {
			window.location.reload();
		},
		
		edit() {
			this.modal.show();
		},
		
		labelFor(k) {
			return LABELS[k] || k;
		},
		
		linkLabelFor(k) {
			return `Visit ${LINK_LABELS[k] || 'link'}`;
		}
	};
	
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:UI-js/code.js',
			'u:dev:MediaWiki:Modal.js'
		]
	});
	
	importArticles({
		type: 'style',
		articles: ['MediaWiki:MoreSocialLinks.css']
	});
	
	mw.hook('dev.modal').add(MoreSocialLinks.loaded.bind(MoreSocialLinks));
})();