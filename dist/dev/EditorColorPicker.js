(function (window, $, mw) {
	'use strict';
	// Load Protection
	if (window.editorColorPicker) return;
	window.editorColorPicker = true;
	// CSS styles
	importArticle({type: 'style', article: 'u:dev:MediaWiki:EditorColorPicker.css'});

	var config = mw.config.get([
		'wgCanonicalSpecialPageName',
		'wgServerName',
		'wgSiteName',
		'wgUserName',
	]);
	var colorItems = [
		'template-t1', 'template-t2', 'template-t3', 'template-param',
		'parameter',
		'link', 'link-target', 'link-text',
		'parser-func',
		'tag', 'tag-attr', 'entity', 'comment',
		'markup',
		'table',
	];
	var colorItemNames = {
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
	var editorColorPicker = {
		init: function () {
			mw.hook('wikipage.content').add(editorColorPicker.monit);
		},
		monit: function(){
			if (window.ecpLink) {
				editorColorPicker.createLink();
			}
			if (editorColorPicker.isEditorColorPickerPage()) {
				$.when(
					mw.loader.using('mediawiki.api')
				).then(editorColorPicker.loadEditorColorPickerPage);
			}
		},
		createLink: function () {
			var header = $('.UserProfileActionButton .WikiaMenuElement, .page-header__contribution-buttons .wds-list').first();
			if (header.length) {
				var text = 'Editor Color Picker';
				var href = '/wiki/Special:BlankPage?blankspecial=editorcolorpicker';
				var elem = $('<li>').append(
		            $('<a>', {
		                href: href,
		                id: 'ca-editor-color-picker',
		                text: text,
		            })
		        );
				header.append(elem);
			}
		},
		isEditorColorPickerPage: function() {
			return config.wgCanonicalSpecialPageName === 'Blankpage' && new URLSearchParams(window.location.search).get('blankspecial') === 'editorcolorpicker';
		},
		loadEditorColorPickerPage: function(){
			mw.loader.using( 'oojs-ui-core', function () {
			    editorColorPicker.generateEditorColorPickerPage()
			} );
		},
		generateEditorColorPickerPage: function () {
			$('#PageHeader .page-header__title').text('Editor Color Picker'); // Page header text
			document.title = 'Editor Color Picker' + ' | ' + config.wgSiteName; // Page title
			
			var mwContentText = $('#mw-content-text');
			mwContentText.empty();
			var mainElem = $('<main>')
				.addClass('ecp-main');
			
			var colorInputs = $('<div>', {'class': 'ecp-inputs'}).append($('<h2>').text('Choose colors:'));
			var colorPreview = $('<div>', {'class': 'ecp-preview'}).append($('<h2>').text('Preview:')).append($('<pre>', {'class': 'ecp-preview-box'}).html(
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
				'<span class="ecp-table">{|\n|+ </span>Caption<span class="ecp-table">\n! </span>Header Cell<span class="ecp-table">\n|-\n| </span>Data Cell<span class="ecp-table">\n|}</span>'
			));
			colorItems.forEach(function (itemName) {
				var itemText = colorItemNames[itemName];
				itemName = 'ecp-' + itemName;
				colorInputs
					.append($('<div>')
						.append($('<input>', {'type': 'color', 'id': itemName, 'name': itemName}).on("input", function(event){
							$('.' + itemName).css('color', event.target.value);
						}))
						.append(' ')
						.append($('<label>', {'for': itemName})
							.text(itemText)
						)
					);
			});
			var colorSubmit = $('<div>', {'class': 'ecp-submit'});
			if (config.wgUserName) {
				var saveCodeMirrorColorsButton = new OO.ui.ButtonWidget( {
				    label: 'Save Colors',
				    classes: [ 'ecp-submit-button' ],
				} ).on( 'click', editorColorPicker.saveEditorColors);
				colorSubmit.append(saveCodeMirrorColorsButton.$element);
				var linkCodeMirrorColorsButton = new OO.ui.ButtonWidget( {
				    label: 'Link Colors',
				    classes: [ 'ecp-submit-button' ],
				} ).on( 'click', editorColorPicker.linkEditorColors);
				colorSubmit.append(linkCodeMirrorColorsButton.$element);
			}
			var editorColorSection = $('<section>', {id: 'ecp-codemirror'})
				.addClass('ecp-section')
				.append($('<div>').addClass('ecp-preview-wrapper').append(colorInputs).append(colorPreview))
				.append(colorSubmit);
			mainElem.append(editorColorSection);
			mwContentText.append(mainElem);
			
			editorColorPicker.getDefaultColors();
			return;
		},
		getDefaultColors: function(){
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
			if (config.wgUserName) {
				new mw.Api().get({
		          action: 'parse',
		          page: 'User:' + config.wgUserName + '/editorcolor.css',
		          prop: 'wikitext',
		        }).done(function(data){
		        	var css = data.parse.wikitext["*"];
		        	if (css.length) {
		        		var colorItemPatterns = {
							'template-t1' : /ecp-template-t1(?:\*|\/|\s)*color\s*:\s*(#.*?);/, 
							'template-t2' : /ecp-template-t2(?:\*|\/|\s)*color\s*:\s*(#.*?);/, 
							'template-t3' : /ecp-template-t3(?:\*|\/|\s)*color\s*:\s*(#.*?);/, 
							'template-param' : /ecp-template-param(?:\*|\/|\s)*color\s*:\s*(#.*?);/,
							'parameter' : /ecp-parameter(?:\*|\/|\s)*color\s*:\s*(#.*?);/,
							'link' : /ecp-link(?:\*|\/|\s)*color\s*:\s*(#.*?);/, 
							'link-target' : /ecp-link-target(?:\*|\/|\s)*color\s*:\s*(#.*?);/, 
							'link-text' : /ecp-link-text(?:\*|\/|\s)*color\s*:\s*(#.*?);/,
							'parser-func' : /ecp-parser-func(?:\*|\/|\s)*color\s*:\s*(#.*?);/,
							'tag' : /ecp-tag(?:\*|\/|\s)*color\s*:\s*(#.*?);/, 
							'tag-attr' : /ecp-tag-attr(?:\*|\/|\s)*color\s*:\s*(#.*?);/, 
							'entity' : /ecp-entity(?:\*|\/|\s)*color\s*:\s*(#.*?);/, 
							'comment' : /ecp-comment(?:\*|\/|\s)*color\s*:\s*(#.*?);/,
							'markup' : /ecp-markup(?:\*|\/|\s)*color\s*:\s*(#.*?);/,
							'table' : /ecp-table(?:\*|\/|\s)*color\s*:\s*(#.*?);/,
						};
		        		colorItems.forEach(function(itemName){
		        			var match = css.match(colorItemPatterns[itemName]);
			        		if (match) {
			        			defaultColors[itemName] = match[1];
			        		}
		        		});
		        	}
		        	editorColorPicker.setDefaultColors(defaultColors);
	        	}).fail(function(data){
	        		editorColorPicker.setDefaultColors(defaultColors);
	        	});
			} else {
				editorColorPicker.setDefaultColors(defaultColors);
			}
		},
		setDefaultColors: function(defaultColors){
			colorItems.forEach(function(itemName){
				var defaultColor = defaultColors[itemName];
				itemName = 'ecp-' + itemName;
				$('#' + itemName).attr('value', defaultColor);
				$('.' + itemName).css('color', defaultColor);
    		});
		},
		saveEditorColors: function(){
			var editorColors = {};
			colorItems.forEach(function(itemName){
				editorColors[itemName] = $('#ecp-' + itemName).val();
			});
			var cssText = 
				'/* removes horizontal lines between text */\n' +
				'pre.CodeMirror-line{\n\tborder-width: 0 !important;\n}\n' +
				'/* syntax highlight coloring */\n' +
				'.cm-mw-template-ext-link-ground.cm-mw-template-bracket,\n.cm-mw-template-ext-link-ground.cm-mw-template-name,\n.cm-mw-template-ext-link-ground.cm-mw-template-delimiter,\n.cm-mw-template-ext-link-ground.cm-mw-template,\n.cm-mw-template-ext2-link-ground.cm-mw-template-bracket,\n.cm-mw-template-ext2-link-ground.cm-mw-template-name,\n.cm-mw-template-ext2-link-ground.cm-mw-template-delimiter,\n.cm-mw-template-ext2-link-ground.cm-mw-template,\n.cm-mw-template-ext3-link-ground.cm-mw-template-bracket,\n.cm-mw-template-ext3-link-ground.cm-mw-template-name,\n.cm-mw-template-ext3-link-ground.cm-mw-template-delimiter,\n.cm-mw-template-ext3-link-ground.cm-mw-template,\n.cm-mw-template-link-ground.cm-mw-template-bracket,\n.cm-mw-template-link-ground.cm-mw-template-name,\n.cm-mw-template-link-ground.cm-mw-template-delimiter,\n.cm-mw-template-link-ground.cm-mw-template,\n.cm-mw-template-ext-ground.cm-mw-template-bracket,\n.cm-mw-template-ext-ground.cm-mw-template-name,\n.cm-mw-template-ext-ground.cm-mw-template-delimiter,\n.cm-mw-template-ext-ground.cm-mw-template,\n.cm-mw-template-ext2-ground.cm-mw-template-bracket,\n.cm-mw-template-ext2-ground.cm-mw-template-name,\n.cm-mw-template-ext2-ground.cm-mw-template-delimiter,\n.cm-mw-template-ext2-ground.cm-mw-template,\n.cm-mw-template-ext3-ground.cm-mw-template-bracket,\n.cm-mw-template-ext3-ground.cm-mw-template-name,\n.cm-mw-template-ext3-ground.cm-mw-template-delimiter,\n.cm-mw-template-ext3-ground.cm-mw-template,\n.cm-mw-template-ground.cm-mw-template-bracket,\n.cm-mw-template-ground.cm-mw-template-name,\n.cm-mw-template-ground.cm-mw-template-delimiter,\n.cm-mw-template-ground.cm-mw-template {\n/* ecp-template-t1 */\n\tcolor: ' + editorColors['template-t1'] + ';\n}\n' +
				'.cm-mw-template2-ext-link-ground.cm-mw-template-bracket,\n.cm-mw-template2-ext-link-ground.cm-mw-template-name,\n.cm-mw-template2-ext-link-ground.cm-mw-template-delimiter,\n.cm-mw-template2-ext-link-ground.cm-mw-template,\n.cm-mw-template2-ext2-link-ground.cm-mw-template-bracket,\n.cm-mw-template2-ext2-link-ground.cm-mw-template-name,\n.cm-mw-template2-ext2-link-ground.cm-mw-template-delimiter,\n.cm-mw-template2-ext2-link-ground.cm-mw-template,\n.cm-mw-template2-ext3-link-ground.cm-mw-template-bracket,\n.cm-mw-template2-ext3-link-ground.cm-mw-template-name,\n.cm-mw-template2-ext3-link-ground.cm-mw-template-delimiter,\n.cm-mw-template2-ext3-link-ground.cm-mw-template,\n.cm-mw-template2-link-ground.cm-mw-template-bracket,\n.cm-mw-template2-link-ground.cm-mw-template-name,\n.cm-mw-template2-link-ground.cm-mw-template-delimiter,\n.cm-mw-template2-link-ground.cm-mw-template,\n.cm-mw-template2-ext-ground.cm-mw-template-bracket,\n.cm-mw-template2-ext-ground.cm-mw-template-name,\n.cm-mw-template2-ext-ground.cm-mw-template-delimiter,\n.cm-mw-template2-ext-ground.cm-mw-template,\n.cm-mw-template2-ext2-ground.cm-mw-template-bracket,\n.cm-mw-template2-ext2-ground.cm-mw-template-name,\n.cm-mw-template2-ext2-ground.cm-mw-template-delimiter,\n.cm-mw-template2-ext2-ground.cm-mw-template,\n.cm-mw-template2-ext3-ground.cm-mw-template-bracket,\n.cm-mw-template2-ext3-ground.cm-mw-template-name,\n.cm-mw-template2-ext3-ground.cm-mw-template-delimiter,\n.cm-mw-template2-ext3-ground.cm-mw-template,\n.cm-mw-template2-ground.cm-mw-template-bracket,\n.cm-mw-template2-ground.cm-mw-template-name,\n.cm-mw-template2-ground.cm-mw-template-delimiter,\n.cm-mw-template2-ground.cm-mw-template {\n/* ecp-template-t2 */\n\tcolor: ' + editorColors['template-t2'] + ';\n}\n' +
				'.cm-mw-template3-ext-link-ground.cm-mw-template-bracket,\n.cm-mw-template3-ext-link-ground.cm-mw-template-name,\n.cm-mw-template3-ext-link-ground.cm-mw-template-delimiter,\n.cm-mw-template3-ext-link-ground.cm-mw-template,\n.cm-mw-template3-ext2-link-ground.cm-mw-template-bracket,\n.cm-mw-template3-ext2-link-ground.cm-mw-template-name,\n.cm-mw-template3-ext2-link-ground.cm-mw-template-delimiter,\n.cm-mw-template3-ext2-link-ground.cm-mw-template,\n.cm-mw-template3-ext3-link-ground.cm-mw-template-bracket,\n.cm-mw-template3-ext3-link-ground.cm-mw-template-name,\n.cm-mw-template3-ext3-link-ground.cm-mw-template-delimiter,\n.cm-mw-template3-ext3-link-ground.cm-mw-template,\n.cm-mw-template3-link-ground.cm-mw-template-bracket,\n.cm-mw-template3-link-ground.cm-mw-template-name,\n.cm-mw-template3-link-ground.cm-mw-template-delimiter,\n.cm-mw-template3-link-ground.cm-mw-template,\n.cm-mw-template3-ext-ground.cm-mw-template-bracket,\n.cm-mw-template3-ext-ground.cm-mw-template-name,\n.cm-mw-template3-ext-ground.cm-mw-template-delimiter,\n.cm-mw-template3-ext-ground.cm-mw-template,\n.cm-mw-template3-ext2-ground.cm-mw-template-bracket,\n.cm-mw-template3-ext2-ground.cm-mw-template-name,\n.cm-mw-template3-ext2-ground.cm-mw-template-delimiter,\n.cm-mw-template3-ext2-ground.cm-mw-template,\n.cm-mw-template3-ext3-ground.cm-mw-template-bracket,\n.cm-mw-template3-ext3-ground.cm-mw-template-name,\n.cm-mw-template3-ext3-ground.cm-mw-template-delimiter,\n.cm-mw-template3-ext3-ground.cm-mw-template,\n.cm-mw-template3-ground.cm-mw-template-bracket,\n.cm-mw-template3-ground.cm-mw-template-name,\n.cm-mw-template3-ground.cm-mw-template-delimiter,\n.cm-mw-template3-ground.cm-mw-template {\n/* ecp-template-t3 */\n\tcolor: ' + editorColors['template-t3'] + ';\n}\n' +
				'.skin-oasis .cm-mw-template-argument-name {\n/* ecp-template-param */\n\tcolor: ' + editorColors['template-param'] + ';\n}\n' +
				'.skin-oasis .cm-mw-extlink-bracket,\n.skin-oasis .cm-mw-link-bracket,\n.skin-oasis .cm-mw-link-delimiter {\n/* ecp-link */\n\tcolor: ' + editorColors['link'] + ';\n}\n' +
				'.skin-oasis .cm-mw-extlink-protocol,\n.skin-oasis .cm-mw-extlink,\n.skin-oasis .cm-mw-free-extlink-protocol,\n.skin-oasis .cm-mw-free-extlink,\n.skin-oasis .cm-mw-link-pagename,\n.skin-oasis .cm-mw-link,\n.skin-oasis .cm-mw-link-tosection {\n/* ecp-link-target */\n\tcolor: ' + editorColors['link-target'] + ';\n}\n' +
				'.skin-oasis .cm-mw-extlink-text,\n.skin-oasis .cm-mw-link-text {\n/* ecp-link-text */\n\tcolor: ' + editorColors['link-text'] + ';\n}\n' +
				'.skin-oasis .cm-mw-htmltag-bracket,\n.skin-oasis .cm-mw-htmltag-name,\n.skin-oasis .cm-mw-exttag-bracket,\n.skin-oasis .cm-mw-exttag-name {\n/* ecp-tag */\n\tcolor: ' + editorColors['tag'] + ';\n}\n' +
				'.skin-oasis .cm-mw-htmltag-attribute,\n.skin-oasis .cm-mw-exttag-attribute {\n/* ecp-tag-attr */\n\tcolor: ' + editorColors['tag-attr'] + ';\n}\n' +
				'.skin-oasis .cm-mw-mnemonic {\n/* ecp-entity */\n\tcolor: ' + editorColors['entity'] +';\n}\n' +
				'.skin-oasis .cm-mw-comment {\n/* ecp-comment */\n\tcolor: ' + editorColors['comment'] +';\n}\n' +
				'.skin-oasis .cm-mw-parserfunction-bracket,\n.skin-oasis .cm-mw-parserfunction-name,\n.skin-oasis .cm-mw-parserfunction-delimiter {\n/* ecp-parser-func */\n\tcolor: ' + editorColors['parser-func'] + ';\n}\n' +
				'.skin-oasis .cm-mw-templatevariable-bracket,\n.skin-oasis .cm-mw-templatevariable-name,\n.skin-oasis .cm-mw-templatevariable-delimiter,\n.skin-oasis .cm-mw-templatevariable {\n/* ecp-parameter */\n\tcolor: ' + editorColors['parameter'] + ';\n}\n' +
				'.skin-oasis .cm-mw-table-bracket,\n.skin-oasis .cm-mw-table-definition,\n.skin-oasis .cm-mw-table-delimiter {\n/* ecp-table */\n\tcolor: ' + editorColors['table'] + ';\n}\n' +
				'.skin-oasis .cm-mw-apostrophes-bold,\n.skin-oasis .cm-mw-apostrophes-italic,\n.skin-oasis .cm-mw-section-header,\n.skin-oasis .cm-mw-hr,\n.skin-oasis .cm-mw-signature,\n.skin-oasis .cm-mw-list,\n.skin-oasis .cm-mw-indenting,\n.skin-oasis .cm-mw-doubleUnderscore {\n/* ecp-markup */\n\tcolor: ' + editorColors['markup'] + ';\n}\n';
			new mw.Api().post({
	            action: 'edit',
	            title: 'User:' + config.wgUserName + '/editorcolor.css',
	            token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
	            text: cssText,
	        }).done(function(data){
	        	mw.loader.using('mediawiki.notification', function () {
	        		mw.notification.notify('Saved Code Mirror colors to User:' + config.wgUserName + '/editorcolor.css', {tag: 'CM save', type: 'success'});	
	        	});
	        }).fail(function(data){
	        	mw.loader.using('mediawiki.notification', function () {
	        		mw.notification.notify('Save failed', {tag: 'CM save', type: 'error'});	
	        	});
	        });
		},
	    linkEditorColors: function(){
	        var api = new mw.Api();
	        api.get({
	            action: 'parse',
	            page: 'User:' + config.wgUserName + '/common.css',
	            prop: 'wikitext',
	        }).done(function(data){
	        	var css = data.parse.wikitext["*"];
	        	if (css.search('@import "\/load\.php[?]articles=User:' + config.wgUserName + '\/editorcolor\.css&only=styles&mode=articles";') < 0) {
	        		api.post({
	        			action: 'edit',
			            title: 'User:' + config.wgUserName + '/common.css',
			            token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
			            prependtext: '@import "/load.php?articles=User:' + config.wgUserName + '/editorcolor.css&only=styles&mode=articles";\n'
	        		}).done(function(data){
	        			mw.loader.using('mediawiki.notification', function () {
	        				mw.notification.notify('Linked Code Mirror colors to User:' + config.wgUserName + '/common.css', {tag: 'CM link', type: 'success'});
	        			});
	        		}).fail(function(data){
	        			mw.loader.using('mediawiki.notification', function () {
	        				mw.notification.notify('Link failed', {tag: 'CM link', type: 'error'});
	        			});
	        		});
	        	} else {
	        		mw.loader.using('mediawiki.notification', function () {
		        		mw.notification.notify('Code Mirror colors already linked to User:' + config.wgUserName +'/common.css', {tag: 'CM link', type: 'info'});
	        		});
	        	}
	        }).fail(function(data){
				api.post({
	    			action: 'edit',
		            title: 'User:' + config.wgUserName + '/common.css',
		            token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
		            prependtext: '@import "/load.php?articles=User:' + config.wgUserName + '/editorcolor.css&only=styles&mode=articles";\n'
	    		}).done(function(data){
	    			mw.loader.using('mediawiki.notification', function () {
	    				mw.notification.notify('Linked Code Mirror colors to User:' + config.wgUserName + '/common.css', {tag: 'CM link', type: 'success'});
	    			});
	    		}).fail(function(data){
	    			mw.loader.using('mediawiki.notification', function () {
	    				mw.notification.notify('Link failed', {tag: 'CM link', type: 'error'});
	    			});
	    		});
			});
		},
	};
	editorColorPicker.init();
})(this, jQuery, mediaWiki);