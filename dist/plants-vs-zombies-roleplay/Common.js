
/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages and living person pages.
 *  Wikipedia Maintainers: [[User:RockMFR]]
 *  Modified by [[User:Grunny]] and [[User:Sikon]] for use in both Monobook and Monaco on Wikia
 *  Added section edit functionality by [[User:Green tentacle]]
 *  Fix for new edit button next to the title by [[User:Grunny]]
 *  New Wikia skin support by Grunny
 */

function addEditIntro(name) {
	// Top link
	if( skin == 'oasis' ) {
		$('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
		$('span.editsection > a').each( function () {
			$(this).attr('href',$(this).attr('href') + '&editintro=' + name);
		} );
	} else {
		var el = document.getElementById('ca-edit');
 
		if( typeof(el.href) == 'undefined' ) {
			el = el.getElementsByTagName('a')[0];
		}
 
		if( el ) {
			el.href += '&editintro=' + name;
		}
 
		// Section links
		var spans = document.getElementsByTagName('span');
		for ( var i = 0; i < spans.length; i++ ) {
			el = null;
 
			if ( spans[i].className == 'editsection' ) {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			} else if ( spans[i].className == 'editsection-upper' ) {
				el = spans[i].getElementsByTagName('a')[0];
				if( el ) {
					el.href += '&editintro=' + name;
				}
			}
		}
	}
}
 
if (wgNamespaceNumber === 0) {
	jQuery(function($) {
		if (document.getElementById('disambigbox'))
			addEditIntro('Template:Disambig_editintro');
	});
 
	jQuery(function($) {
		var cats = document.getElementById('mw-normal-catlinks');
		if (!cats)
			return;
		cats = cats.getElementsByTagName('a');
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].title == 'Category:Living people' || cats[i].title == 'Category:Possibly living people') {
				addEditIntro('Template:BLP_editintro');
                break;
			}
		}
	});
}

importArticles({
    type: "script",
    articles: [
        'u:dev:Countdown/code.js',
        'MediaWiki:Snow.js',
        'u:dev:PowerPageMaker/code.js',
        'u:dev:UserTags/code.js'
    ]
});


window.UserTagsJS = {
	modules: {},
	tags: {
		queen: { u: 'Wiki Queen', order:100 },
		female: { u: 'Female', order:101 },
		templatehelper: { u: 'Templates', order:102 }
	}
};

UserTagsJS.modules.custom = {
	'PuffyMuffins': ['queen', 'female'] // NOTE: order of list here does NOT matter
};