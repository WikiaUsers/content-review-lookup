// @author: [[w:c:dev:User:DutyS12345]]
// @editor: [[w:c:utaite:User:Makudoumee]]
// <pre>
(function (window, $, mw) {
	'use strict';
	// Load Protection
	if (window.editorColorPicker) return;
	window.editorColorPicker = true;
	
	var config = mw.config.get([
		'wgPageName',
		'wgFormattedNamespaces',
		'wgCanonicalSpecialPageName',
		'wgServerName',
		'wgSiteName',
		'wgUserName',
		'skin',
	]);
	
	function generateEditorColorPickerPage () {
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
			'theme-fandomdesktop-dark',
			'theme-fandomdesktop-light',
		];
		var codeMirrorSkinNames = {
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
					'.cm-line .cm-mw-template-argument-name'
				],
				'parameter' : [
					'.cm-line .cm-mw-templatevariable-bracket',
					'.cm-line .cm-mw-templatevariable-name',
					'.cm-line .cm-mw-templatevariable-delimiter',
					'.cm-line .cm-mw-templatevariable'
				],
				'link' : [
					'.cm-line .cm-mw-extlink-bracket',
					'.cm-line .cm-mw-link-bracket',
					'.cm-line .cm-mw-link-delimiter'
				],
				'link-target' : [
					'.cm-line .cm-mw-extlink-protocol',
					'.cm-line .cm-mw-extlink',
					'.cm-line .cm-mw-free-extlink-protocol',
					'.cm-line .cm-mw-free-extlink',
					'.cm-line .cm-mw-link-pagename',
					'.cm-line .cm-mw-link',
					'.cm-line .cm-mw-link-tosection'
				],
				'link-text' : [
					'.cm-line .cm-mw-extlink-text',
					'.cm-line .cm-mw-link-text'
				],
				'parser-func' : [
					'.cm-line .cm-mw-parserfunction-bracket',
					'.cm-line .cm-mw-parserfunction-name',
					'.cm-line .cm-mw-parserfunction-delimiter'
				],
				'tag' : [
					'.cm-line .cm-mw-htmltag-bracket',
					'.cm-line .cm-mw-htmltag-name',
					'.cm-line .cm-mw-exttag-bracket',
					'.cm-line .cm-mw-exttag-name'
				],
				'tag-attr' : [
					'.cm-line .cm-mw-htmltag-attribute',
					'.cm-line .cm-mw-exttag-attribute'
				],
				'entity' : [
					'.cm-line .cm-mw-mnemonic'
				],
				'comment' : [
					'.cm-line .cm-mw-comment'
				],
				'markup' : [
					'.cm-line .cm-mw-apostrophes-bold',
					'.cm-line .cm-mw-apostrophes-italic',
					'.cm-line .cm-mw-section-header',
					'.cm-line .cm-mw-hr',
					'.cm-line .cm-mw-signature',
					'.cm-line .cm-mw-list',
					'.cm-line .cm-mw-indenting',
					'.cm-line .cm-mw-doubleUnderscore'
					],
				'table' : [
					'.cm-line .cm-mw-table-bracket',
					'.cm-line .cm-mw-table-definition',
					'.cm-line .cm-mw-table-delimiter'
				],
			};
			var cssText = '';
			for (var i = 0; i < codeMirrorSkins.length; i++) {
				var skin = codeMirrorSkins[i];
				var skinDisabled = $('#ecp-' + skin + ' .ecp-skin-toggle .oo-ui-toggleWidget').attr('aria-checked') == 'false';
				cssText += '/* ' + codeMirrorSkinNames[skin] + (skinDisabled ? ' disabled' : '') + ' */\n';
				
				for (var j = 0; j < codeMirrorItems.length; j++) {
				    var item = codeMirrorItems[j];
				    if (skinDisabled) {
				        cssText += '/* ' + skin + ' ' + item + ' */\n\t/* color: ' + $('#ecp-' + skin + '__' + item).val() + '; */\n';
				    } else {
				        var selectors = codeMirrorSelectors[item];
				        if (skin === 'theme-fandomdesktop-light') {
				            // Light mode, no extra class needed
				            for (var k = 0; k < selectors.length - 1; k++) {
				                cssText += selectors[k] + ',\n';
				            }
				            cssText += selectors[k];
				            cssText += ' {\n/* ' + skin + ' ' + item + ' */\n\tcolor: ' + $('#ecp-' + skin + '__' + item).val() + ';\n}\n';
				        } else if (skin === 'theme-fandomdesktop-dark') {
				            // Dark mode, wrap in body[data-theme="dark"]
				            cssText += 'body[data-theme="dark"] {\n';
				            for (k = 0; k < selectors.length - 1; k++) {
				                cssText += selectors[k] + ',\n';
				            }
				            cssText += selectors[k];
				            cssText += ' {\n/* ' + skin + ' ' + item + ' */\n\tcolor: ' + $('#ecp-' + skin + '__' + item).val() + ';\n}\n';
				            cssText += '}\n';
				        }
				    }
				}
				cssText += '\n';
			}
			
			new mw.Api().postWithEditToken({
				action: 'edit',
				title: 'User:' + config.wgUserName + '/editorcolor.css',
				text: cssText,
			}).done(function(data){
				mw.loader.using('mediawiki.notification', function () {
					mw.notification.notify('Saved Code Mirror colors to User:' + config.wgUserName.replace(' ', '_') + '/editorcolor.css', {tag: 'ecp-CM-save', type: 'success'});	
				});
			}).fail(function(data){
				mw.loader.using('mediawiki.notification', function () {
					mw.notification.notify('Save failed', {tag: 'ecp-CM-save', type: 'error'});	
				});
			});
		}
		
		function exportSettings() {
		    var settings = '';
	
		    codeMirrorSkins.forEach(function (skin) {
		        settings += '/* ' + codeMirrorSkinNames[skin] + ' */\n';
		        codeMirrorItems.forEach(function (item) {
		            var color = $('#ecp-' + skin + '__' + item).val();
		            settings += item + ': ' + color + '\n';
		        });
		        settings += '\n';
		    });
		
		    // Create a blob of the settings and create a downloadable link
		    var blob = new Blob([settings], { type: 'text/plain' });
		    var link = document.createElement('a');
		    link.href = window.URL.createObjectURL(blob);
		    link.download = 'editorcolor-settings.txt';
		    link.click();
		}
	
		
		function importSettings(event) {
		    var file = event.target.files[0];
		    if (!file) return;
		
		    var reader = new FileReader();
		    reader.onload = function (e) {
		        var contents = e.target.result;
		        var lines = contents.split('\n');
		        var colors = {
		            'theme-fandomdesktop-dark': {},
		            'theme-fandomdesktop-light': {}
		        };
		
		        var currentTheme = null;
		
		        lines.forEach(function (line) {
		            if (line.includes('FandomDesktop Dark')) {
		                currentTheme = 'theme-fandomdesktop-dark';
		            } else if (line.includes('FandomDesktop Light')) {
		                currentTheme = 'theme-fandomdesktop-light';
		            } else {
		                var match = line.match(/^([a-zA-Z0-9-]+):\s*(#[0-9a-fA-F]{6}|rgb\(.*\)|hsv\(.*\)|cmyk\(.*\))/);
		                if (match && currentTheme) {
		                    var item = match[1];
		                    var color = match[2];
		                    colors[currentTheme][item] = color;
		                }
		            }
		        });
		
		        console.log("Imported Settings by Theme:", colors);
		
		        codeMirrorSkins.forEach(function (skin) {
		            codeMirrorItems.forEach(function (item) {
		                $('#ecp-' + skin + '__' + item).val('').trigger('input');
		                $('#ecp-' + skin + '__textbox__' + item).val('').trigger('input');
		            });
		        });
		
		        codeMirrorSkins.forEach(function (skin) {
		            codeMirrorItems.forEach(function (item) {
		                var colorKey = item;
		                var color = colors[skin][colorKey];
		
		                if (color) {
		                    $('#ecp-' + skin + '__' + item).val(color).trigger('input');
		                    $('#ecp-' + skin + '__textbox__' + item).val(color).trigger('input');
		                }
		            });
		        });
		    };
		    reader.readAsText(file);
		}
		
		function addImportExportButtons() {
		    var exportButton = new OO.ui.ButtonWidget({
		        label: 'Export Settings',
		        classes: ['ecp-export-button']
		    }).on('click', exportSettings);
		    
		    var importButton = $('<input>', {
		        type: 'file',
		        accept: '.txt',
		        class: 'ecp-import-button',
		        style: 'display:none'
		    }).on('change', importSettings);
		    
		    var importLabelButton = new OO.ui.ButtonWidget({
		        label: 'Import Settings',
		        classes: ['ecp-import-label-button']
		    }).on('click', function() {
		        importButton.click();
		    });
		
		    var codeMirrorSubmit = $('.ecp-submit');
		    codeMirrorSubmit.append(exportButton.$element);
		    codeMirrorSubmit.append(importLabelButton.$element);
		    codeMirrorSubmit.append(importButton);
		}
		
		function linkCodeMirrorColors(){
			var api = new mw.Api();
			api.get({
				action: 'parse',
				page: 'User:' + config.wgUserName + '/common.css',
				prop: 'wikitext',
			}).done(function(data){
				var css = data.parse.wikitext["*"];
				var user = config.wgUserName.replace(' ', '_');
				if (css.search('@import "\/load\.php[?]articles=User:' + user + '\/editorcolor\.css&only=styles&mode=articles";') < 0) {
					api.postWithEditToken({
						action: 'edit',
						title: 'User:' + config.wgUserName + '/common.css',
						prependtext: '@import "/load.php?articles=User:' + user + '/editorcolor.css&only=styles&mode=articles";\n'
					}).done(function(data){
						mw.loader.using('mediawiki.notification', function () {
							mw.notification.notify('Linked Code Mirror colors to User:' + user + '/common.css', {tag: 'ecp-CM-link', type: 'success'});
						});
					}).fail(function(data){
						mw.loader.using('mediawiki.notification', function () {
							mw.notification.notify('Link failed', {tag: 'ec-CM-link', type: 'error'});
						});
					});
				} else {
					mw.loader.using('mediawiki.notification', function () {
						mw.notification.notify('Code Mirror colors already linked to User:' + user +'/common.css', {tag: 'ecp-CM-link', type: 'info'});
					});
				}
			}).fail(function(data){
				var user = config.wgUserName.replace(' ', '_');
				api.postWithEditToken({
					action: 'edit',
					title: 'User:' + config.wgUserName + '/common.css',
					prependtext: '@import "/load.php?articles=User:' + user + '/editorcolor.css&only=styles&mode=articles";\n'
				}).done(function(data){
					mw.loader.using('mediawiki.notification', function () {
						mw.notification.notify('Linked Code Mirror colors to User:' + user + '/common.css', {tag: 'ecp-CM-link', type: 'success'});
					});
				}).fail(function(data){
					mw.loader.using('mediawiki.notification', function () {
						mw.notification.notify('Link failed', {tag: 'ecp-CM-link', type: 'error'});
					});
				});
			});
		}
		
		function isValidHex(hex) {
		    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
		}

		var skinToggleSwitches = {};
		function generateCodeMirrorSkinSection( skin ){
			var colorInputs = $('<div>', {'class': 'ecp-inputs'}).append($('<h3>').text('Choose colors:'));
			var colorPreview = $('<div>', {'class': 'ecp-preview'}).append($('<h3>').text('Preview:')).append($('<pre>', {'class': 'ecp-preview-box'}).html(codeMirrorPreviewText));
			codeMirrorItems.forEach(function (item) {
				var itemText = codeMirrorItemText[item];
				var itemID = 'ecp-' + skin + '__' + item;
				colorInputs.append($('<div>')
				    .append($('<input>', {
				        'type': 'color',
				        'id': itemID,
				        'name': itemID
				    }).on("input", function(event) {
				        $('#ecp-' + skin + ' .ecp-preview .ecp-' + item).css('color', event.target.value);
				        $('#ecp-' + skin + '__textbox__' + item).val(event.target.value);
				    }))
				    .append(' ')
				    .append($('<input>', {
				        'type': 'text',
				        'id': 'ecp-' + skin + '__textbox__' + item,
				        'class': 'ecp-textbox',
				        'maxlength': 7,
				        'placeholder': '#xxxxxx'
				    }).on("input", function(event) {
				        var hex = event.target.value;
				        if (isValidHex(hex)) {
				            $('#ecp-' + skin + '__' + item).val(hex);
				            $('#ecp-' + skin + ' .ecp-preview .ecp-' + item).css('color', hex);
				        }
				    }))
				    .append(' ')
				    .append($('<label>', {
				        'for': itemID
				    }).text(itemText))
				);
			});
			var skinToggleSwitch = new OO.ui.ToggleSwitchWidget({
		        value: true,
		    }).on( 'change', function(toggleValue) {
				$('#ecp-' + skin + ' .ecp-skin-toggle .oo-ui-labelElement-label').first().text(toggleValue ? 'Enabled' : 'Disabled');
				$('#ecp-' + skin + ' .ecp-inputs input[type=color]').prop('disabled', !toggleValue);
			});
		    var skinToggleLabel = new OO.ui.FieldLayout(skinToggleSwitch, {
			    label: 'Enabled',
			    align: 'right',
			    classes	: [ 'ecp-skin-toggle' ]
			});
		    skinToggleSwitches[skin] = skinToggleSwitch;
		    var skinName = codeMirrorSkinNames[skin];
			return $('<div>', {'id': 'ecp-' + skin, 'class': 'ecp-codemirror-skin'}).append(
					skinToggleLabel.$element,
					$('<h2>').text(skinName),
					$('<div>', {'class': 'ecp-inputs-preview-wrapper'}).append(colorInputs, colorPreview)
				);
		}
		
		// main page
		$('.page-header__title').text('Editor Color Picker');
		document.title = 'Editor Color Picker' + ' | ' + config.wgSiteName;
		var mwContentText = $('#mw-content-text');
		mwContentText.empty();
		
		var codeMirrorSection = $('<section>', {id: 'ecp-codemirror'})
			.addClass('ecp-section');
		codeMirrorSkins.forEach(function ( skin ) {
			codeMirrorSection.append(generateCodeMirrorSkinSection(skin));
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
		
		/*This one is under development*/
		function loadEditorColorsFromCSS() {
		    if (config.wgUserName) {
		    	var defaultEditorStyleLoc="User:your username here/editorcolor.css";
		        var cssPage = defaultEditorStyleLoc; 
		        new mw.Api().get({
		            action: 'parse',
		            page: cssPage,
		            prop: 'wikitext',
		        }).done(function (data) {
		            var css = data.parse.wikitext["*"];
		            var colors = {};
		            var darkPattern = /body\[data-theme="dark"\]\s*{([^}]*)}/g;
		            var lightPattern = /\.cm-(?:mw-template.*|line)\s*{([^}]*)}/g;
		
		            var match;
					var patterns = [
					    { pattern: darkPattern, theme: 'theme-fandomdesktop-dark' },
					    { pattern: lightPattern, theme: 'theme-fandomdesktop-light' }
					];
					
					patterns.forEach(function (item) {
					    var match;
					    while ((match = item.pattern.exec(css)) !== null) {
					        var colorMatches = match[1].match(/color:\s*(#[0-9a-fA-F]{6})\s*;/g);
					        if (colorMatches) {
					            for (var i = 0; i < colorMatches.length; i++) {
					                var color = colorMatches[i];
					                var keyMatch = color.match(/\.cm-(.*)/);
					                if (keyMatch) {
					                    var key = keyMatch[1];
					                    var colorCode = color.match(/color:\s*(#[0-9a-fA-F]{6})/)[1];
					                    colors[item.theme + '__' + key] = colorCode;
					                }
					            }
					        }
					    }
					});
		            // Apply the parsed colors to the color pickers and textboxes
		            updateColors(colors);
		        }).fail(function (data) {
		            mw.loader.using('mediawiki.notification', function () {
		                mw.notification.notify('Failed to load editor colors from CSS', { type: 'error' });
		            });
		        });
		    }
		}


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
					$('#ecp-' + skin + ' .ecp-preview  .ecp-' + item).css('color', defaultColors[item]);
				});
			});
		}
		loadDefaultColors();
		loadEditorColorsFromCSS();
		
		addImportExportButtons();
		
		// preview background color & text color
		$.get(mw.util.wikiScript('wikia')+'?controller=ThemeApi&method=themeVariables&variant=dark').done(function(data) {
			var bgcolor = data.match(/--theme-page-background-color:(#[a-f0-9].*?);/)[1];
			var textcolor = data.match(/--theme-page-text-color:(#[a-f0-9].*?);/)[1];
			$('#ecp-theme-fandomdesktop-dark .ecp-preview-box').css({'background-color': bgcolor, 'color': textcolor});
		});
		$.get(mw.util.wikiScript('wikia')+'?controller=ThemeApi&method=themeVariables&variant=light').done(function(data) {
			var bgcolor = data.match(/--theme-page-background-color:(#[a-f0-9].*?);/)[1];
			var textcolor = data.match(/--theme-page-text-color:(#[a-f0-9].*?);/)[1];
			$('#ecp-theme-fandomdesktop-light .ecp-preview-box').css({'background-color': bgcolor, 'color': textcolor});
		});
		
		function updateColors(colors) {
		    for (var key in colors) {
		        if (Object.prototype.hasOwnProperty.call(colors, key)) {
		            var color = colors[key];
		            var keyParts = key.split('__');
		            var skin = keyParts[0];
		            var item = keyParts[1];
		            
		            // Update the color picker
		            $('#ecp-' + key).val(color);
		            
		            // Update the color preview
		            $('#ecp-' + skin + ' .ecp-preview .ecp-' + item).css('color', color);
		
		            // Update the associated textbox
		            $('#ecp-' + skin + '__textbox__' + item).val(color);
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
						// /* skin-oasis template-t1 */\n\tcolor : #ffffff;
						// /* skin-oasis template-t1 */\n\t/*color : #ffffff; */
						var pattern = /\/\*\s*?([a-zA-Z-]*?)\s+([a-zA-Z0-9-]*?)[ \t\n\r\f\v\*\/]*?color\s*?:\s*?(#[0-9a-fA-F]{6})\s*?;/g; 
						var match;
						while ((match = pattern.exec(css)) !== null) {
							// skin = match[1], item = match[2], color = match[3];
							savedColors[match[1] + '__' + match[2]] = match[3];
						}
						codeMirrorSkins.forEach(function(skin){
							var skinDisabledPattern = new RegExp('\\/\\*\\s*?' + codeMirrorSkinNames[skin] + '\\s+disabled\\s*?\\*\\/');
							if (skinDisabledPattern.test(css)) {
								skinToggleSwitches[skin].setValue(false);
							}
						});
					}
					updateColors(savedColors);
				}).fail(function(data){
					mw.loader.using('mediawiki.notification', function() {
		                mw.notification.notify('Failed to load saved colors from User:' + config.wgUserName + '/editorcolor.css.', {
		                    type: 'error',
		                    tag: 'loadSavedColors'
		                });
		            });
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
			var href = '/wiki/Special:EditorColorPickerv2';
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
		return config.wgPageName === config.wgFormattedNamespaces[-1] + ':EditorColorPicker' || config.wgCanonicalSpecialPageName === 'Blankpage' && new URLSearchParams(window.location.search).get('blankspecial') === 'editorcolorpicker';
	}
	
	function loadEditorColorPickerPage() {
		mw.loader.using( ['mediawiki.api', 'oojs-ui'] ).then( generateEditorColorPickerPage );
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
// </pre>