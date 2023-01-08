/**
 * Simple script to queue run of WikiTextSyntaxHighlighter for source mode editor
 *
 * @author Kamil Koterba <kamil@wikia-inc.com>
 * 
 * Original Script from https://github.com/Wikia/app/blob/dev/extensions/wikia/EditPageLayout/js/plugins/WikitextSyntaxHighlighterQueueInit.js
 * Script customized by User:OH&S for use on the Toaru Majutsu no Index Wiki.
 * 
 */
(function ( window, $ ) {
		'use strict';
 
		var WE = window.WikiaEditor = window.WikiaEditor || (new window.Observable()),
			WikiTextSyntaxHighlighter;
 
		WE.plugins.syntaxhighlighterqueueinit = $.createClass(WE.plugin, {
 
			init: function () {
				this.editor.on('mode', this.proxy(this.initSyntaxHighlighting));
				this.editor.on('editorReady', this.proxy(this.initSyntaxHighlighting));
 
				require(['WikiTextSyntaxHighlighter'], this.proxy(function (syntaxHighlighter) {
					WikiTextSyntaxHighlighter = syntaxHighlighter;
 
					this.initSyntaxHighlighting();
				}));
			},
 
			initConfig: function () {
				var config;
 
				if (window.wgIsDarkTheme) {
					config = this.initDarkThemeColors();
				} else {
					config = this.initLightThemeColors();
				}
 
				return config;
			},
 
			initSyntaxHighlighting: function () {
				if (WikiTextSyntaxHighlighter) {
					if (this.editor.mode === 'source' && this.editor.ready ) {
						var textarea = this.editor.getEditbox()[0],
							config = this.initConfig();
 
						WikiTextSyntaxHighlighter.init(textarea, config);
					} else {
						WikiTextSyntaxHighlighter.reset();
					}
				}
			},
 
			initDarkThemeColors: function() {
				return {
					boldOrItalicColor: '#44466d',
					commentColor: '#4d1a19',
					entityColor: '#474d23',
					externalLinkColor: '#244d491',
					headingColor: '#44466d',
					hrColor: '#44466d',
					listOrIndentColor: '#4d1a19',
					parameterColor: '#66331e',
					quickLinkTemplateColor: '#412477',
					signatureColor: '#66331e',
					tagColor: '#662946',
					tableColor: '#5e5129',
					templateColor: '#5e5129',
					templateColor2: '#5e4329',
					wikilinkColor: '#245477'
				};
			},

			initLightThemeColors: function() {
				return {
					boldOrItalicColor: '#e4e5f3',
					commentColor: '#f8dbda',
					entityColor: '#e8ebda',
					externalLinkColor: '#dbeceb',
					headingColor: '#e4e5f3',
					hrColor: '#e4e5f3',
					listOrIndentColor: '#f8dbda',
					parameterColor: '#f5e0d8',
					quickLinkTemplateColor: '#e3d9f6',
					signatureColor: '#f5e0d8',
					tagColor: '#f6dde9',
					tableColor: '#f0ebdb',
					templateColor: '#f0ebdb',
					templateColor2: '#f0e3d4',
					wikilinkColor: '#d9eaf6'
				};
			}
		});
 
})( this, jQuery );