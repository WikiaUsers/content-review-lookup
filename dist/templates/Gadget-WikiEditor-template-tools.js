// <pre>
/*
*
* JS Code for the "Templates" toolbar section
*
*/
var customizeToolbar = function () {
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'sections': {
			'templates': {
				'type': 'toolbar',
				'label': 'Templates'
			}
		}
	} );
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'section': 'templates',
		'groups': {
			'selective-trasclusion': {
				'label': 'Selective transclusion'
			}
		}
	} );
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		section: 'templates',
		groups: {
			list: {
				tools: {
					templates: {
						label: "Selective Transclusion",
						type: 'select',
						list: {
							'includeonly': {
								label: '<includeonly>',
								action: {
									type: 'encapsulate',
									options: {
										pre: '<includeonly>',
										post: '</includeonly>'
									}
								}
							},
							'noinclude': {
								label: '<noinclude>',
								action: {
									type: 'encapsulate',
									options: {
										pre: '<noinclude>',
										post: ' </noinclude>'
									}
								}
							},
							'onlyinclude': {
								label: '<onlyinclude>',
								action: {
									type: 'encapsulate',
									options: {
										pre: '<onlyinclude>',
										post: ' </onlyinclude>'
									}
								}
							},
						}
					}
				}
			}
		}
	} );
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		section: 'templates',
		groups: {
			list: {
				tools: {
					templates: {
						label: "ParserFunctions",
						type: 'select',
						list: {
							'expr': {
								label: '#expr',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#expr: ',
										post: '}}'
									}
								}
							},
							'ifexpr': {
								label: '#ifexpr',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#ifexpr: ',
										post: '\n| \n|\n}}'
									}
								}
							},
							'if': {
								label: '#if:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#if: ',
										post: '\n| \n|\n}}'
									}
								}
							},
							'ifeq': {
								label: '#ifeq:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#ifeq: ',
										post: ' | valu3 \n| \n| \n}}'
									}
								}
							},
							'iferror': {
								label: '#iferror:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#iferror: ',
										post: '\n| \n|\n}}'
									}
								}
							},
							'ifexist': {
								label: '#ifexist:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#ifexist: ',
										post: '\n| \n|\n}}'
									}
								}
							},

							'switch': {
								label: '#switch:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#switch: ',
										post: '\n| option = value \n| option = value \n| #default = default value \n}}'
									}
								}
							},

						}
					}
				}
			}
		}
	} );
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		section: 'templates',
		groups: {
			list: {
				tools: {
					templates: {
						label: "Variables",
						type: 'select',
						list: {
							'vardefine': {
								label: '#vardefine:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#vardefine: ',
										post: ' | }}'
									}
								}
							},
							'vardefineecho': {
								label: '#vardefineecho:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#vardefineecho: ',
										post: ' | }}'
									}
								}
							},
							'var': {
								label: '#var',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#var: ',
										post: ' | <!-- default -->}}'
									}
								}
							},
							'varecho': {
								label: '#varecho:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#varecho: ',
										post: ' }}'
									}
								}
							},
							'varexists': {
								label: '#varexists:',
								action: {
									type: 'encapsulate',
									options: {
										pre: '{{#varexists: ',
										post: ' | if yes | if no }}'
									}
								}
							},
						}
					}
				}
			}
		}
	} );
};

/* Check if view is in edit mode and that the required modules are available. Then, customize the toolbar … */
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
	mw.loader.using( 'user.options' ).then( function () {
		// This can be the string "0" if the user disabled the preference ([[wikipedia:phab:T54542#555387]])
		if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
			$.when(
				mw.loader.using( 'ext.wikiEditor' ), $.ready
			).then( customizeToolbar );
		}
	} );
}
// </pre>
// [[Category:Gadgets]]