/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 }
	}
};

UserTagsJS.modules.custom = {
	'TheOuterWorlds': ['csshelper', 'templatehelper', 'jshelper'] // NOTE: order of list here does NOT matter
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

/* 2010 wiki editor toolbar customization */
var customizeToolbar = function () {
	/* Your code goes here */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'format',
	tools: {
		"comment": {
			label: 'Comment',
			type: 'button',
			icon: '//upload.wikimedia.org/wikipedia/commons/3/37/Btn_toolbar_commentaire.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "<!-- ",
					post: " -->"
				}
			}
		}
	}
} );
	
};

/* Check if view is in edit mode and that the required modules are available. Then, customize the toolbar … */
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
	mw.loader.using( 'user.options' ).then( function () {
		// This can be the string "0" if the user disabled the preference ([[phab:T54542#555387]])
		if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
			$.when(
				mw.loader.using( 'ext.wikiEditor' ), $.ready
			).then( customizeToolbar );
		}
	} );
}