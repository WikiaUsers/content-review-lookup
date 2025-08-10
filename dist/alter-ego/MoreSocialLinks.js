/**
 * Name:        MoreSocialLinks
 * Version:     v1.2ae
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Forked version to tailor it for Alterpedia
 *				It includes various bug fixes and additions
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
			tdsw: /^https?:\/\/tds\.fandom\.com\/wiki\/User:/
		},
		linkFields: [
			'facebook',
			'instagram',
			'twitch',
			'twitter',
			'website',
			'youtube',
			'tdsw'
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
			$(links).append(this.$links.find('.user-identity-social__icon.wds-dropdown'));
			this.$links.replaceWith(links);
			this.initModal();
			$(links).find('.edit > a')
				.click(this.edit.bind(this))
				.removeAttr('target');
		},
		eachLink: function(k, v) {
			if (!v) {
				return;
			}
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
					if (v.match(this.regexes.youtube)) {
						this.links.youtube = v;
					} else {
						this.links.youtube = 'https://youtube.com/@' + v;
					}
					break;
				case 'twitter':
					this.links.twitter = 'https://x.com/' + v;
					break;
				case 'website':
					this.links.website = v;
					break;
				case 'occupation':
					this.links.tdsw = 'https://tds.fandom.com/wiki/User:' + v;
					break;
			}
		},
		mapLink: function(v, k) {
			return {
				type: 'li',
				classes: [k],
				children: [{
					type: 'a',
					children: [{
						type: 'span',
						classes: [
							'toru-i',
							'i-' + (
								k === 'website' ? 'globe' :
								k === 'edit' ? 'pencil1' :
								k === 'twitter' ? 'twitter-x' :
								k === 'tdsw' ? 'tdsw' :
								k === 'youtube' ? 'youtube1' :
								k === 'twitch' ? 'twitch1' :
								k === 'facebook' ? 'facebook1' :
								k
							)
						]
					}],
					classes: ['user-identity-social__icon'],
					attr: {
						href: v,
						rel: 'noopener noreferrer',
						target: '_blank'
					},
					title: this.labelFor(k)
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
					classes: [
						'MoreSocialLinksForm'
					],
					children: $.map(this.linkFields, this.mapGroup.bind(this))
						.filter(Boolean)
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
			return {
				type: 'div',
				classes: ['input-group'],
				children: [{
						type: 'label',
						attr: {
							'for': k
						},
						text: this.labelFor(k)
					},
					{
						type: 'input',
						attr: {
							id: k,
							name: k,
							type: 'text',
							value: this.links[k] || ''
						}
					}
				]
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
					case 'tdsw':
						data.occupation = val;
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
				url: 'https://services.fandom.com/user-attribute/user/' +
					config.profileUserId,
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
				facebook: 'Your Facebook username:',
				instagram: 'Your Instagram username:',
				twitch: 'Your Twitch username:',
				twitter: 'Your X username:',
				website: 'Your Website link:',
				youtube: 'Your YouTube username:',
				tdsw: 'Your TDS Wiki username:',
				edit: 'Edit'
			};
			return labels[k] || k;
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
		articles: [
			'MediaWiki:MoreSocialLinks.css'
		]
	});
	mw.hook('dev.modal').add(MoreSocialLinks.loaded.bind(MoreSocialLinks));
})();