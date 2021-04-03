/**
 * Creates a new section in WikiEditor, for FTB Wiki-related templates.
 * 
 * @author [[User:Xbony2]]
 * Based off of:
 * * [[mw:Extension:WikiEditor/Toolbar customization]]
 * 
 */
var customizeToolbar = function(){
	var page = mw.config.get('wgTitle');
	
	$('#wpTextbox1').wikiEditor('addToToolbar', {
		'sections': {
			'templates': {
				'label': 'Templates',
				'type': 'toolbar'
			}
		}
	});
	
	$('#wpTextbox1').wikiEditor('addToToolbar', {
		'section': 'templates',
		'groups': {
			'infoboxes': {
				'label': 'Infoboxes'
			},
			'cg': {
				'label': 'Crafting Grids'
			},
			'grids': {
				'label': 'Grid Icons'
			},
			'misc': {
				'label': 'Misc'
			}
		}
	});
	
	$('#wpTextbox1').wikiEditor('addToToolbar', {
		'section': 'templates',
		'group': 'infoboxes',
		'tools': {
			'main': {
				label: 'Block/Item',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/3/3b/Icon_Block_Item.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Infobox\n|name=' + page + '\n|imageicon={' + '{Gc|mod=ABBR|link=none|' + page + '}}\n|type=item\n|mod=Mod\n}}'
					}
				}
			},
			'mod': {
				label: 'Mod',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/5/51/Icon_Mod.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Infobox mod\n|name=' + page + '\n|image=' + page + ' Icon.png\n|author=Author\n|version=1\n|url=http://example.com\n}}'
					}
				}
			}
		}
	});
	
	$('#wpTextbox1').wikiEditor('addToToolbar', {
		'section': 'templates',
		'group': 'cg',
		'tools': {
			'crafting': {
				label: 'Crafting Table',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/d/df/Icon_Crafting_Table.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Cg/Crafting Table\n|A1=\n|B1=\n|C1=\n|A2=\n|B2=\n|C2=\n|A3=\n|B3=\n|C3=\n|O={' + '{Gc|mod=ABBR|link=none|' + page + '}}\n}}'
					}
				}
			},
			'furnace': {
				label: 'Furnace',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/1/18/Icon_Furnace.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Cg/Furnace\n|I=\n|O={' + '{Gc|mod=ABBR|link=none|' + page + '}}\n}}'
					}
				}
			}
		}
	});
	
	$('#wpTextbox1').wikiEditor('addToToolbar', {
		'section': 'templates',
		'group': 'grids',
		'tools': {
			'item': {
				label: 'Item',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/0/05/Icon_Item.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Gc|mod=AABR|dis=false|Item',
						post: '}}'
					}
				}
			},
			'ore': {
				label: 'Ore Dictionary',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/0/0e/Icon_Ore_Dictionary.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{O|entry',
						post: '}}'
					}
				}
			},
			'liquid': {
				label: 'Liquid',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/d/d7/Icon_Liquid.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{T|Liquid|amount',
						post: '}}'
					}
				}
			},
			'string': {
				label: 'String',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/c/c8/Icon_String.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{S|Text',
						post: '}}'
					}
				}
			}
		}
	});
	
	$('#wpTextbox1').wikiEditor('addToToolbar', {
		'section': 'templates',
		'group': 'misc',
		'tools': {
			'pn': {
				label: 'Icon with Link',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/f/f9/Icon_Icon_with_Link.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Pn|Item',
						post: '|ABBR}}'
					}
				}
			},
			'p': {
				label: 'Icon',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/e/ec/Icon_Icon.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{P|Item',
						post: '|ABBR}}'
					}
				}
			},
			'l': {
				label: 'Language Link',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/b/b8/Icon_Language_Link.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{L|Link',
						post: '}}'
					}
				}
			},
			'dis': {
				label: 'Disambiguation',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/3/30/Icon_Disambiguation.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Disambiguation}}'
					}
				}
			},
			'stub': {
				label: 'Stub',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/d/d7/Icon_Stub.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Stub|date={' + '{subst:#time:F Y}}}}'
					}
				}
			},
			'cleanup': {
				label: 'Cleanup',
				type: 'button',
				icon: '/media/ftb.gamepedia.com/2/29/Icon_Cleanup.png',
				action: {
					type: 'encapsulate',
					options: {
						pre: '{' + '{Cleanup|date={' + '{subst:#time:F Y}}}}'
					}
				}
			},
		}
	});
};

// Fixes the size of the images. The icons are suppose to be 24x24 but ours are based off Minecraft, which are 32x32
var fixSizes = function(){
	var templateButtons = $('div#wikiEditor-section-templates div.group a.tool-button');
	templateButtons.css('width', '32px');
	templateButtons.css('height', '32px');
	templateButtons.css('transform', 'scale(0.75, 0.75)');
	templateButtons.css('-webkit-transform', 'scale(0.75, 0.75)');
	templateButtons.css('-ms-transform', 'scale(0.75, 0.75)');
	templateButtons.css('-moz-transform', 'scale(0.75, 0.75)');
	templateButtons.css('-o-transform', 'scale(0.75, 0.75)');
};

// Check if view is in edit mode and that the required modules are available. Then, customize the toolbar …
if(['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1)
	mw.loader.using('user.options').then(function(){
		if(mw.user.options.get('usebetatoolbar') == 1 && mw.config.get('wgPageContentModel') === 'wikitext')
			$.when(mw.loader.using('ext.wikiEditor'), $.ready).then(customizeToolbar).then(fixSizes);
	});