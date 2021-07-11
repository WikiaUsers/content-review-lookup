(function (window, $, mw) {
	'use strict';
	// Load Protection
	if (window.editorColorPicker) return;
	window.editorColorPicker = true;
	
	var config = mw.config.get([
		'wgPageName',
		'wgFormattedNamespaces',
		'wgServerName',
		'wgSiteName',
		'wgUserName',
		'skin',
	]);
	
	function generateEditorColorPickerPage () {
		// CSS styles
		importArticle({type: 'style', article: 'u:dev:MediaWiki:EditorColorPicker.css'});
		var codeMirrorItems = [
			'template-t1', 'template-t2', 'template-t3', 'template-param',
			'parameter',
			'link', 'link-target', 'link-text',
			'parser-func',
			'tag', 'tag-attr', 'entity', 'comment',
			'markup',
			'table',
		];
		var codeMirrorItemText = {
			'template-t1' : 'Template Tier 1',
			'template-t2' : 'Template Tier 2',
			'template-t3' : 'Template Tier 3',
			'template-param' : 'Template Parameter Name',
			'parameter' : 'Parameter',
			'link' : 'Link',
			'link-target' : 'Link Target',
			'link-text' : 'Link Display Text',
			'parser-func' : 'Parser Function',
			'tag' : 'HTML and HTML-like Tag',
			'tag-attr' : 'HTML and HTML-like Tag Attribute',
			'entity' : 'HTML Entity',
			'comment' : 'HTML Comment',
			'markup' : 'Various Wikitext Symbols',
			'table' : 'Table',
		};
		var codeMirrorSkins = [
			'skin-oasis',
			'theme-fandomdesktop-dark',
			'theme-fandomdesktop-light',
		];
		var codeMirrorSkinNames = {
			'skin-oasis' : 'Oasis',
			'theme-fandomdesktop-dark' : 'FandomDesktop Dark',
			'theme-fandomdesktop-light' : 'FandomDesktop Light',
		};
		var codeMirrorPreviewText =
			'<span class="ecp-template-t1">{{template1|</span><span class="ecp-template-t2">{{template2|</span><span class="ecp-template-t3">{{template3|test3}}</span><span class="ecp-template-t2">|test2}}</span><span class="ecp-template-t1">|test1}}</span>\n' +
			'<span class="ecp-template-t1">{{template1\n|</span><span class="ecp-template-param">param1 =</span><span class="ecp-template-t1"> value1\n|</span><span class="ecp-template-param">param2 =</span><span class="ecp-template-t1"> value2\n}}</span>\n' +
			'<span class="ecp-parameter">{{{1|default}}}</span>\n' +
			'<span class="ecp-link">[[</span><span class="ecp-link-target">Page#Heading</span><span class="ecp-link">|</span><span class="ecp-link-text">Display Text</span><span class="ecp-link">]]</span> <span class="ecp-link">[</span><span class="ecp-link-target">https://example.com/ </span><span class="ecp-link-text">Display Text</span><span class="ecp-link">]</span>\n' +
			'<span class="ecp-parser-func">{{#if:</span><span class="ecp-parameter">{{{1|}}}</span><span class="ecp-parser-func">|</span>Display Text<span class="ecp-parser-func">}}</span>\n' +
			'<span class="ecp-tag">&lt;nowiki&gt;</nowiki></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="ecp-tag">&lt;/nowiki&gt;</span><span class="ecp-tag">&lt;div</span><span class="ecp-tag-attr"> class="test" style="top:0px;"</span><span class="ecp-tag">&gt;&lt;/div&gt;</span>\n' +
			'<span class="ecp-entity">&amp;amp;</span>\n' +
			'<span class="ecp-comment">&lt;!-- comment --&gt;</span>\n' +
			'<span class="ecp-markup">\'\'\'</span>bold<span class="ecp-markup">\'\'\'</span>&nbsp;<span class="ecp-markup">\'\'</span>italic<span class="ecp-markup">\'\'</span>\n' + 
			'<span class="ecp-markup">== </span>Heading<span class="ecp-markup"> ==</span>\n<span class="ecp-markup">=== </span>Subheading<span class="ecp-markup"> ===</span>\n' +
			'<span class="ecp-markup">*</span> List Item\n<span class="ecp-markup">#</span> List Item\n<span class="ecp-markup">:</span> Indented Item\n' +
			'<span class="ecp-markup">&tilde;&tilde;&tilde;&tilde;</span>\n<span class="ecp-markup">----</span>\n' +
			'<span class="ecp-markup">__NOTOC__</span>\n' +
			'<span class="ecp-table">{|\n|+ </span>Caption<span class="ecp-table">\n! </span>Header Cell<span class="ecp-table">\n|-\n| </span>Data Cell<span class="ecp-table">\n|}</span>';
		
		function saveCodeMirrorColors() {
			var codeMirrorSelectors = {
				'template-t1' : [
					'.cm-mw-template-ext-link-ground.cm-mw-template-bracket',
					'.cm-mw-template-ext-link-ground.cm-mw-template-name',
					'.cm-mw-template-ext-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template-ext-link-ground.cm-mw-template',
					'.cm-mw-template-ext2-link-ground.cm-mw-template-bracket',
					'.cm-mw-template-ext2-link-ground.cm-mw-template-name',
					'.cm-mw-template-ext2-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template-ext2-link-ground.cm-mw-template',
					'.cm-mw-template-ext3-link-ground.cm-mw-template-bracket',
					'.cm-mw-template-ext3-link-ground.cm-mw-template-name',
					'.cm-mw-template-ext3-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template-ext3-link-ground.cm-mw-template',
					'.cm-mw-template-link-ground.cm-mw-template-bracket',
					'.cm-mw-template-link-ground.cm-mw-template-name',
					'.cm-mw-template-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template-link-ground.cm-mw-template',
					'.cm-mw-template-ext-ground.cm-mw-template-bracket',
					'.cm-mw-template-ext-ground.cm-mw-template-name',
					'.cm-mw-template-ext-ground.cm-mw-template-delimiter',
					'.cm-mw-template-ext-ground.cm-mw-template',
					'.cm-mw-template-ext2-ground.cm-mw-template-bracket',
					'.cm-mw-template-ext2-ground.cm-mw-template-name',
					'.cm-mw-template-ext2-ground.cm-mw-template-delimiter',
					'.cm-mw-template-ext2-ground.cm-mw-template',
					'.cm-mw-template-ext3-ground.cm-mw-template-bracket',
					'.cm-mw-template-ext3-ground.cm-mw-template-name',
					'.cm-mw-template-ext3-ground.cm-mw-template-delimiter',
					'.cm-mw-template-ext3-ground.cm-mw-template',
					'.cm-mw-template-ground.cm-mw-template-bracket',
					'.cm-mw-template-ground.cm-mw-template-name',
					'.cm-mw-template-ground.cm-mw-template-delimiter',
					'.cm-mw-template-ground.cm-mw-template'
				],
				'template-t2' : [
					'.cm-mw-template2-ext-link-ground.cm-mw-template-bracket',
					'.cm-mw-template2-ext-link-ground.cm-mw-template-name',
					'.cm-mw-template2-ext-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template2-ext-link-ground.cm-mw-template',
					'.cm-mw-template2-ext2-link-ground.cm-mw-template-bracket',
					'.cm-mw-template2-ext2-link-ground.cm-mw-template-name',
					'.cm-mw-template2-ext2-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template2-ext2-link-ground.cm-mw-template',
					'.cm-mw-template2-ext3-link-ground.cm-mw-template-bracket',
					'.cm-mw-template2-ext3-link-ground.cm-mw-template-name',
					'.cm-mw-template2-ext3-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template2-ext3-link-ground.cm-mw-template',
					'.cm-mw-template2-link-ground.cm-mw-template-bracket',
					'.cm-mw-template2-link-ground.cm-mw-template-name',
					'.cm-mw-template2-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template2-link-ground.cm-mw-template',
					'.cm-mw-template2-ext-ground.cm-mw-template-bracket',
					'.cm-mw-template2-ext-ground.cm-mw-template-name',
					'.cm-mw-template2-ext-ground.cm-mw-template-delimiter',
					'.cm-mw-template2-ext-ground.cm-mw-template',
					'.cm-mw-template2-ext2-ground.cm-mw-template-bracket',
					'.cm-mw-template2-ext2-ground.cm-mw-template-name',
					'.cm-mw-template2-ext2-ground.cm-mw-template-delimiter',
					'.cm-mw-template2-ext2-ground.cm-mw-template',
					'.cm-mw-template2-ext3-ground.cm-mw-template-bracket',
					'.cm-mw-template2-ext3-ground.cm-mw-template-name',
					'.cm-mw-template2-ext3-ground.cm-mw-template-delimiter',
					'.cm-mw-template2-ext3-ground.cm-mw-template',
					'.cm-mw-template2-ground.cm-mw-template-bracket',
					'.cm-mw-template2-ground.cm-mw-template-name',
					'.cm-mw-template2-ground.cm-mw-template-delimiter',
					'.cm-mw-template2-ground.cm-mw-template'
				],
				'template-t3' : [
					'.cm-mw-template3-ext-link-ground.cm-mw-template-bracket',
					'.cm-mw-template3-ext-link-ground.cm-mw-template-name',
					'.cm-mw-template3-ext-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template3-ext-link-ground.cm-mw-template',
					'.cm-mw-template3-ext2-link-ground.cm-mw-template-bracket',
					'.cm-mw-template3-ext2-link-ground.cm-mw-template-name',
					'.cm-mw-template3-ext2-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template3-ext2-link-ground.cm-mw-template',
					'.cm-mw-template3-ext3-link-ground.cm-mw-template-bracket',
					'.cm-mw-template3-ext3-link-ground.cm-mw-template-name',
					'.cm-mw-template3-ext3-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template3-ext3-link-ground.cm-mw-template',
					'.cm-mw-template3-link-ground.cm-mw-template-bracket',
					'.cm-mw-template3-link-ground.cm-mw-template-name',
					'.cm-mw-template3-link-ground.cm-mw-template-delimiter',
					'.cm-mw-template3-link-ground.cm-mw-template',
					'.cm-mw-template3-ext-ground.cm-mw-template-bracket',
					'.cm-mw-template3-ext-ground.cm-mw-template-name',
					'.cm-mw-template3-ext-ground.cm-mw-template-delimiter',
					'.cm-mw-template3-ext-ground.cm-mw-template',
					'.cm-mw-template3-ext2-ground.cm-mw-template-bracket',
					'.cm-mw-template3-ext2-ground.cm-mw-template-name',
					'.cm-mw-template3-ext2-ground.cm-mw-template-delimiter',
					'.cm-mw-template3-ext2-ground.cm-mw-template',
					'.cm-mw-template3-ext3-ground.cm-mw-template-bracket',
					'.cm-mw-template3-ext3-ground.cm-mw-template-name',
					'.cm-mw-template3-ext3-ground.cm-mw-template-delimiter',
					'.cm-mw-template3-ext3-ground.cm-mw-template',
					'.cm-mw-template3-ground.cm-mw-template-bracket',
					'.cm-mw-template3-ground.cm-mw-template-name',
					'.cm-mw-template3-ground.cm-mw-template-delimiter',
					'.cm-mw-template3-ground.cm-mw-template'
				],
				'template-param' : [
					'.CodeMirror-line .cm-mw-template-argument-name'
				],
				'parameter' : [
					'.CodeMirror-line .cm-mw-templatevariable-bracket',
					'.CodeMirror-line .cm-mw-templatevariable-name',
					'.CodeMirror-line .cm-mw-templatevariable-delimiter',
					'.CodeMirror-line .cm-mw-templatevariable'
				],
				'link' : [
					'.CodeMirror-line .cm-mw-extlink-bracket',
					'.CodeMirror-line .cm-mw-link-bracket',
					'.CodeMirror-line .cm-mw-link-delimiter'
				],
				'link-target' : [
					'.CodeMirror-line .cm-mw-extlink-protocol',
					'.CodeMirror-line .cm-mw-extlink',
					'.CodeMirror-line .cm-mw-free-extlink-protocol',
					'.CodeMirror-line .cm-mw-free-extlink',
					'.CodeMirror-line .cm-mw-link-pagename',
					'.CodeMirror-line .cm-mw-link',
					'.CodeMirror-line .cm-mw-link-tosection'
				],
				'link-text' : [
					'.CodeMirror-line .cm-mw-extlink-text',
					'.CodeMirror-line .cm-mw-link-text'
				],
				'parser-func' : [
					'.CodeMirror-line .cm-mw-parserfunction-bracket',
					'.CodeMirror-line .cm-mw-parserfunction-name',
					'.CodeMirror-line .cm-mw-parserfunction-delimiter'
				],
				'tag' : [
					'.CodeMirror-line .cm-mw-htmltag-bracket',
					'.CodeMirror-line .cm-mw-htmltag-name',
					'.CodeMirror-line .cm-mw-exttag-bracket',
					'.CodeMirror-line .cm-mw-exttag-name'
				],
				'tag-attr' : [
					'.CodeMirror-line .cm-mw-htmltag-attribute',
					'.CodeMirror-line .cm-mw-exttag-attribute'
				],
				'entity' : [
					'.CodeMirror-line .cm-mw-mnemonic'
				],
				'comment' : [
					'.CodeMirror-line .cm-mw-comment'
				],
				'markup' : [
					'.CodeMirror-line .cm-mw-apostrophes-bold',
					'.CodeMirror-line .cm-mw-apostrophes-italic',
					'.CodeMirror-line .cm-mw-section-header',
					'.CodeMirror-line .cm-mw-hr',
					'.CodeMirror-line .cm-mw-signature',
					'.CodeMirror-line .cm-mw-list',
					'.CodeMirror-line .cm-mw-indenting',
					'.CodeMirror-line .cm-mw-doubleUnderscore'
					],
				'table' : [
					'.CodeMirror-line .cm-mw-table-bracket',
					'.CodeMirror-line .cm-mw-table-definition',
					'.CodeMirror-line .cm-mw-table-delimiter'
				],
			};
			var cssText = '';
			for (var i = 0; i < codeMirrorSkins.length; i++) {
				var skin = codeMirrorSkins[i];
				cssText += '/* ' + codeMirrorSkinNames[skin] + ' */\n';
				for (var j = 0; j < codeMirrorItems.length; j++) {
					var item = codeMirrorItems[j];
					var selectors = codeMirrorSelectors[item];
					for (var k = 0; k < selectors.length - 1; k++) {
						cssText += '.' + skin + ' ' + selectors[k] + ',\n';
					}
					cssText += '.' + skin + ' ' + selectors[k];
					cssText += ' {\n/* ' + skin + ' ' + item + ' */\n\tcolor: ' + $('#ecp-' + skin + '__' + item).val() + ';\n}\n';
				}
			}
			// post
			new mw.Api().postWithEditToken({
				action: 'edit',
				title: 'User:' + config.wgUserName + '/editorcolor.css',
				text: cssText,
			}).done(function(data){
				mw.loader.using('mediawiki.notification', function () {
					mw.notification.notify('Saved Code Mirror colors to User:' + config.wgUserName + '/editorcolor.css', {tag: 'ecp-CM-save', type: 'success'});	
				});
			}).fail(function(data){
				mw.loader.using('mediawiki.notification', function () {
					mw.notification.notify('Save failed', {tag: 'ecp-CM-save', type: 'error'});	
				});
			});
		}
		function linkCodeMirrorColors(){
			var api = new mw.Api();
			api.get({
				action: 'parse',
				page: 'User:' + config.wgUserName + '/common.css',
				prop: 'wikitext',
			}).done(function(data){
				var css = data.parse.wikitext["*"];
				if (css.search('@import "\/load\.php[?]articles=User:' + config.wgUserName + '\/editorcolor\.css&only=styles&mode=articles";') < 0) {
					api.postWithEditToken({
						action: 'edit',
						title: 'User:' + config.wgUserName + '/common.css',
						prependtext: '@import "/load.php?articles=User:' + config.wgUserName + '/editorcolor.css&only=styles&mode=articles";\n'
					}).done(function(data){
						mw.loader.using('mediawiki.notification', function () {
							mw.notification.notify('Linked Code Mirror colors to User:' + config.wgUserName + '/common.css', {tag: 'ecp-CM-link', type: 'success'});
						});
					}).fail(function(data){
						mw.loader.using('mediawiki.notification', function () {
							mw.notification.notify('Link failed', {tag: 'ec-CM-link', type: 'error'});
						});
					});
				} else {
					mw.loader.using('mediawiki.notification', function () {
						mw.notification.notify('Code Mirror colors already linked to User:' + config.wgUserName +'/common.css', {tag: 'ecp-CM-link', type: 'info'});
					});
				}
			}).fail(function(data){
				api.postWithEditToken({
					action: 'edit',
					title: 'User:' + config.wgUserName + '/common.css',
					prependtext: '@import "/load.php?articles=User:' + config.wgUserName + '/editorcolor.css&only=styles&mode=articles";\n'
				}).done(function(data){
					mw.loader.using('mediawiki.notification', function () {
						mw.notification.notify('Linked Code Mirror colors to User:' + config.wgUserName + '/common.css', {tag: 'ecp-CM-link', type: 'success'});
					});
				}).fail(function(data){
					mw.loader.using('mediawiki.notification', function () {
						mw.notification.notify('Link failed', {tag: 'ecp-CM-link', type: 'error'});
					});
				});
			});
		}
		
		function generateCodeMirrorSkinSection( skin ){
			var colorInputs = $('<div>', {'class': 'ecp-inputs'}).append($('<h3>').text('Choose colors:'));
			var colorPreview = $('<div>', {'class': 'ecp-preview'}).append($('<h3>').text('Preview:')).append($('<pre>', {'class': 'ecp-preview-box'}).html(codeMirrorPreviewText));
			codeMirrorItems.forEach(function (item) {
				var itemText = codeMirrorItemText[item];
				var itemID = 'ecp-' + skin + '__' + item;
				colorInputs
					.append($('<div>')
						.append($('<input>', {'type': 'color', 'id': itemID, 'name': itemID}).on("input", function(event){
							$('#ecp-' + skin + ' > .ecp-preview  .ecp-' + item).css('color', event.target.value);
						}))
						.append(' ')
						.append($('<label>', {'for': itemID})
							.text(itemText)
						)
					);
			});
			return $('<div>', {'id': 'ecp-' + skin, 'class': 'ecp-skin-wrapper'}).append(colorInputs, colorPreview);
		}
		
		// main page
		$('.page-header__title').text('Editor Color Picker'); // Page header text
		document.title = 'Editor Color Picker' + ' | ' + config.wgSiteName; // Page title
		var mwContentText = $('#mw-content-text'); // Page content
		mwContentText.empty();
		
		var codeMirrorSection = $('<section>', {id: 'ecp-codemirror'})
			.addClass('ecp-section');
		codeMirrorSkins.forEach(function ( skin ) {
			var skinName = codeMirrorSkinNames[skin];
			codeMirrorSection.append($('<h2>').text(skinName), generateCodeMirrorSkinSection(skin));
		});
		if (config.wgUserName) {
			var codeMirrorSubmit = $('<div>', {
				'class': 'ecp-submit'
			});
			var saveCodeMirrorColorsButton = new OO.ui.ButtonWidget( {
				label: 'Save Colors',
				classes: [ 'ecp-submit-button' ],
			} ).on( 'click', saveCodeMirrorColors);
			codeMirrorSubmit.append(saveCodeMirrorColorsButton.$element);
			var linkCodeMirrorColorsButton = new OO.ui.ButtonWidget( {
				label: 'Link Colors',
				classes: [ 'ecp-submit-button' ],
			} ).on( 'click', linkCodeMirrorColors);
			codeMirrorSubmit.append(linkCodeMirrorColorsButton.$element);
			codeMirrorSection.append(codeMirrorSubmit);
		}
		
		var mainElem = $('<main>', {'class': 'ecp-main'}).append(codeMirrorSection);
		mwContentText.append(mainElem);
		
		function loadDefaultColors(){
			var defaultColors = {
				'template-t1' : '#D8F3DC', 
				'template-t2' : '#95D5B2', 
				'template-t3' : '#52B788', 
				'template-param' : '#E6F5A6',
				'parameter' : '#FF8969',
				'link' : '#D4B170', 
				'link-target' : '#DECAA4',
				'link-text' : '#DECAA4',
				'parser-func' : '#D48AFF',
				'tag' : '#42B9F0', 
				'tag-attr' : '#A1DCF7', 
				'entity' : '#42B9F0', 
				'comment' : '#84a0a0',
				'markup' : '#0088FF',
				'table' : '#E5ED9F',
			};
			codeMirrorSkins.forEach(function(skin){
				codeMirrorItems.forEach(function(item){
					$('#ecp-' + skin + '__' + item).attr('value', defaultColors[item]);
					$('#ecp-' + skin + ' > .ecp-preview  .ecp-' + item).css('color', defaultColors[item]);
				});
			});
		}
		loadDefaultColors();
		// preview background color
		$.get(mw.util.wikiScript('wikia')+'?controller=ThemeApi&method=themeVariables&variant=dark').done(function(data) {
			var color = data.match(/--theme-page-background-color:(#[a-f0-9].*?);/)[1];
			$('#ecp-theme-fandomdesktop-dark .ecp-preview-box').css('background-color', color);
		});
		$.get(mw.util.wikiScript('wikia')+'?controller=ThemeApi&method=themeVariables&variant=light').done(function(data) {
			var color = data.match(/--theme-page-background-color:(#[a-f0-9].*?);/)[1];
			$('#ecp-theme-fandomdesktop-light .ecp-preview-box').css('background-color', color);
		});
		function updateColors(colors) {
			for (var key in colors) {
				if (Object.prototype.hasOwnProperty.call(colors, key)) {
					var color = colors[key];
					var keyParts = key.split('__');
					var skin = keyParts[0];
					var item = keyParts[1];
					$('#ecp-' + key).val(color);
					$('#ecp-' + skin + ' > .ecp-preview  .ecp-' + item).css('color', color);
				}
			}
		}
		function loadSavedColors() {
			if (config.wgUserName) {
				new mw.Api().get({
					action: 'parse',
					page: 'User:' + config.wgUserName + '/editorcolor.css',
					prop: 'wikitext',
				}).done(function(data){
					var css = data.parse.wikitext["*"];
					var savedColors = {};
					if (css.length) {
						var pattern = /\/\*\s*?([a-zA-Z-]*?)\s+([a-zA-Z0-9-]*?)\s*?(?:\*\/)?\s*?color\s*?:\s*?(#[0-9a-fA-F]{6})\s*?;/g; // /* skin-oasis template-t1 */\n\tcolor : #ffffff;
						var match;
						while ((match = pattern.exec(css)) !== null) {
							// skin = match[1], item = match[2], color = match[3];
							savedColors[match[1] + '__' + match[2]] = match[3];
						}
					}
					updateColors(savedColors);
				}).fail(function(data){
					// do nothing
				});
			}
		}
		loadSavedColors();
		return;
		
	}
	function addButton() {
		var header;
		if(config.skin === 'oasis') {
			header = $('.wds-community-header__wiki-buttons .wds-list');
		} else if(config.skin === 'fandomdesktop') {
			header = $('.wiki-tools .wds-list');
		}
		if (header.length) {
			var text = 'Editor Color Picker';
			var href = '/wiki/Special:EditorColorPicker';
			header.append(function () {
				return $('<li>').append($('<a>', {
					href: href,
					id: 'ca-editorcolorpicker',
					text: text,
				}));
			});
		}
	}
	function isEditorColorPickerPage() {
		return config.wgPageName === wgFormattedNamespaces[-1] + ':EditorColorPicker';
	}
	function loadEditorColorPickerPage() {
		mw.loader.using( ['mediawiki.api', 'oojs-ui-core'] ).then( generateEditorColorPickerPage );
	}
	mw.hook('wikipage.content').add(function () {
		if (window.ecpButton) {
			addButton();
		}
		if (isEditorColorPickerPage()) {
			loadEditorColorPickerPage();
		}
	});
})(this, jQuery, mediaWiki);