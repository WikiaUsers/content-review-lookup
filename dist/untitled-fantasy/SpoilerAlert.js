(function ($, mw) {
	'use strict';
	var config = mw.config.get([
		'wgArticleId',
		'wgNamespaceNumber',
		'wgScriptPath',
		'wgServer'
	]), $elements = $('.SpoilerAlert');
	if (
		config.wgNamespaceNumber === -1 ||
		config.wgArticleId === 0 ||
		$elements.length == 0
	) {
		return;
	}
	var SpoilerAlert = {
		config: $.extend({
			fadeDelay: 1600
		}, window.SpoilerAlertJS),
		toLoad: 3,
		preload: function() {
			if (--this.toLoad === 0) {
				window.dev.i18n.loadMessages('SpoilerAlert')
					.then(this.init.bind(this));
			}
		},
		init: function(i18n) {
			this.ids = JSON.parse(window.localStorage.getItem('SpoilerAlert')) || [];
			['yes', 'no', 'question'].forEach(function(msg) {
				if (!this.config[msg]) {
					this.config[msg] = i18n.msg(msg).plain();
				}
			}, this);
			this.insertUI();
			this.insertResetButton(i18n);
		},
		valid: function(el) {
			return SpoilerAlert.ids.indexOf(config.wgArticleId+el.attr('id')) === -1;
		},
		insertUI: function() {
			var i = 0;
			$elements.each(function(){
				if (!this.getAttribute('id')) {
					i++;
					this.setAttribute('id', 'SA'+i);
				}
				var wrap = $(this);
				if (!SpoilerAlert.valid(wrap) || wrap.hasClass('SpoilerAlertHidden')) {return;}
				
				wrap.addClass('SpoilerAlertHidden');
				wrap.append(
					window.dev.ui({
						type: 'div',
						attr: {
							'class': 'SpoilerAlertCover'
						},
						children: [
							{
								type: 'p',
								attr: {
									'class': 'SpoilerAlertText'
								},
								text: SpoilerAlert.config.question
							},
							{
								type: 'span',
								attr: {
									'class': 'wds-button SpoilerAlertYes'
								},
								events: {
									click: SpoilerAlert.yes.bind(this)
								},
								text: SpoilerAlert.config.yes
							},
							{
								type: 'span',
								attr: {
									'class': 'wds-button SpoilerAlertNo'
								},
								events: {
									click: SpoilerAlert.no.bind(this)
								},
								text: SpoilerAlert.config.no
							}
						]
					})
				);
			});
		},
		insertResetButton: function(i18n) {
			window.dev.placement.loader.util({
				content: {
					type: 'li',
					children: [
						{
							type: 'a',
							attr: {
								href: '#'
							},
							text: i18n.msg('reset').plain(),
							events: {
								click: SpoilerAlert.reset
							}
						}
					]
				},
				element: 'tools',
				script: 'SpoilerAlert',
				type: 'append'
			});
		},
		yes: function(event) {
			var wrap = event.currentTarget.closest('.SpoilerAlert');
			SpoilerAlert.fadeOut(event.currentTarget.closest('.SpoilerAlertCover'), true);
			SpoilerAlert.ids.push(config.wgArticleId+wrap.getAttribute('id'));
			window.localStorage.setItem('SpoilerAlert', JSON.stringify(SpoilerAlert.ids));
		},
		no: function(event) {
			var cover = event.currentTarget.closest('.SpoilerAlertCover');
			SpoilerAlert.fadeOut(cover, false);
			if (SpoilerAlert.config.back) {
				if (window.history && window.history.length > 1) {
					window.history.back();
				} else {
					location.href = config.wgServer + config.wgScriptPath;
				}
			}
		},
		fadeOut: function(el, yes) {
			$(el).fadeOut(SpoilerAlert.config.fadeDelay, function() {
				if (yes){
					var wrap = this.closest('.SpoilerAlertHidden');
					$(this).remove();
					wrap.classList.remove('SpoilerAlertHidden');
				}
				else {
					this.innerHTML = SpoilerAlert.config.hiddenText || 'Spoiler has been hidden.';
					this.style.display = '';
				}
			});
		},
		reset: function(event) {
			event.preventDefault();
			window.localStorage.setItem('SpoilerAlert', JSON.stringify([]));
			window.location.reload();
		}
	};
	if (!window.dev || !window.dev.ui || !window.dev.i18n || !window.dev.placement) {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:I18n-js/code.js',
				'u:dev:MediaWiki:Placement.js',
				'u:dev:MediaWiki:UI-js/code.js'
			]
		});
	}
	mw.util.addCSS(
		'.SpoilerAlertCover {'+
			'background-color: var(--theme-page-background-color);'+
			'text-align: center;'+
			'font-size: 32px;'+
		'}'+
		'.SpoilerAlertYes {margin-right: 5px;}'+
		'.SpoilerAlertNo {margin-left: 5px;}'+
		'.SpoilerAlertYes, .SpoilerAlertNo {cursor: pointer;}'+
		'.SpoilerAlertHidden > :not(.SpoilerAlertCover) {display:none;}'
	);
	mw.hook('dev.ui').add(SpoilerAlert.preload.bind(SpoilerAlert));
	mw.hook('dev.i18n').add(SpoilerAlert.preload.bind(SpoilerAlert));
	mw.hook('dev.placement').add(SpoilerAlert.preload.bind(SpoilerAlert));
})(window.jQuery, window.mediaWiki);