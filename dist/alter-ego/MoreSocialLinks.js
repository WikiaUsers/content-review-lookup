/**
 * Name:        MoreSocialLinks
 * Version:     v1.3ae
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Forked version to tailor it for Alterpedia.
 */
(function() {
	'use strict';
	var config = mw.config.get([
		'profileUserId',
		'profileUserName',
		'wgUserId'
	]);
	if (!config.profileUserName || window.MoreSocialLinksLoaded) {
		return;
	}
	window.MoreSocialLinksLoaded = true;
	var MoreSocialLinks = {
		regexes: {
			instagram: /^https?:\/\/(?:m\.|www\.)?instagram\.com\//,
			twitch: /^https?:\/\/(?:www\.)?twitch\.tv\//,
			twitter: /^https?:\/\/(?:mobile\.)?(?:twitter\.com|x\.com)\//,
			youtube: /^https?:\/\/(?:m\.|www\.)?youtube\.com\/(?:user\/|channel\/|@)/,
			tdsw: /^https?:\/\/tds\.fandom\.com\/wiki\/User:/,
			roblox: /^https?:\/\/(?:www\.)?roblox\.com\/users\/profile\?username=/
		},
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
		loaded: function() {
			this.findContainer().then(this.init.bind(this));
		},
		findContainer: function() {
			var promise = $.Deferred();
			var interval = setInterval(function() {
				var $element = $('#userProfileApp .user-identity-social');
				if ($element.length) {
					clearInterval(interval);
					promise.resolve($element);
				}
			}, 300);
			return promise;
		},
		init: function($links) {
			this.$links = $links;
			$.get('https://services.fandom.com/user-attribute/user/bulk', {
				cb: Date.now(),
				id: config.profileUserId
			}).then(this.show.bind(this));
		},
		show: function(data) {
			$.each(data.users[config.profileUserId], this.eachLink.bind(this));
			if (Number(config.wgUserId) === Number(config.profileUserId)) {
				this.links.edit = '#';
			}
			var links = window.dev.ui({
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
		eachLink: function(k, v) {
			if (!v) return;
			switch (k) {
				case 'fbPage':
					this.links.facebook = v;
					break;
				case 'social_instagram':
					this.links.instagram = 'https://instagram.com/' + v;
					break;
				case 'social_twitch':
					this.links.twitch = 'https://twitch.tv/' + v;
					break;
				case 'social_youtube':
					this.links.youtube = v.match(this.regexes.youtube) ? v : 'https://youtube.com/@' + v;
					break;
				case 'twitter':
					this.links.twitter = 'https://x.com/' + v;
					break;
				case 'website':
					this.links.website = v;
					break;
				case 'username':
					this.links.tdsw = 'https://tds.fandom.com/wiki/User:' + v;
					break;
				case 'occupation':
					this.links.roblox = 'https://www.roblox.com/users/profile?username=' + v;
					break;
				case 'discordHandle':
					this.links.discord = v;
					break;
			}
		},
		mapLink: function(v, k) {
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
							classes: ['toru-i', 'i-discord1']
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
							classes: ['toru-i', 'i-pencil1']
						}],
						classes: ['user-identity-social__icon'],
						attr: {
							href: v
						},
						title: this.labelFor(k)
					}]
				};
			}
			return {
				type: 'li',
				classes: [k, 'wds-dropdown'],
				children: [{
					type: 'div',
					classes: ['wds-dropdown__toggle', 'user-identity-social__icon'],
					title: this.labelFor(k),
					children: [{
						type: 'span',
						classes: [
							'toru-i',
							'i-' + (
								k === 'website' ? 'globe' :
								k === 'twitter' ? 'twitter-x' :
								k === 'youtube' ? 'youtube1' :
								k === 'twitch' ? 'twitch1' :
								k === 'facebook' ? 'facebook1' :
								k
							)
						]
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
		initModal: function() {
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
		mapGroup: function(k) {
			if (k === 'tdsw') return null;
			return {
				type: 'div',
				classes: ['input-group'],
				children: [{
					type: 'label',
					attr: {
						'for': k
					},
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
		save: function() {
			var data = {};
			$('.MoreSocialLinksForm input').each((function(_, el) {
				var $el = $(el),
					val = $el.val(),
					name = $el.attr('name'),
					regex = this.regexes[name];
				if (regex && val.match(regex)) {
					val = val.replace(regex, '');
				}
				switch (name) {
					case 'facebook':
						data.fbPage = val;
						break;
					case 'instagram':
					case 'twitch':
					case 'youtube':
						data['social_' + name] = val;
						break;
					case 'twitter':
						data.twitter = val;
						break;
					case 'roblox':
						data.occupation = val;
						break;
					case 'discord':
						data.discordHandle = val;
						break;
					default:
						data[name] = val;
						break;
				}
			}).bind(this));
			$.ajax({
				context: this,
				data: data,
				type: 'PATCH',
				url: 'https://services.fandom.com/user-attribute/user/' + config.profileUserId,
				xhrFields: {
					withCredentials: true
				}
			}).done(this.saved);
		},
		saved: function() {
			window.location.reload();
		},
		edit: function() {
			this.modal.show();
		},
		labelFor: function(k) {
			var labels = {
				facebook: 'Facebook',
				instagram: 'Instagram',
				twitch: 'Twitch',
				twitter: 'X',
				website: 'Website',
				youtube: 'YouTube',
				tdsw: 'TDS Wiki',
				discord: 'Discord',
				roblox: 'Roblox',
				edit: 'Edit links'
			};
			return labels[k] || k;
		},
		linkLabelFor: function(k) {
			var labels = {
				facebook: 'Facebook profile',
				instagram: 'Instagram profile',
				twitch: 'Twitch channel',
				twitter: 'X profile',
				website: 'website',
				youtube: 'YouTube channel',
				tdsw: 'TDS Wiki profile',
				roblox: 'Roblox profile'
			};
			return 'Visit ' + (labels[k] || 'link');
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