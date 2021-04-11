//Sofix - Fixes various bugs around Fandom
function main () { //TODO: Figure out some way to do this that's not a bunch of `if`s
	//Fix body not having dark theme class
	if (window.Sofix.isDark) {
		$('body').addClass('theme-dark');
	}

    //Fix staff sig not being dark themed
    if (window.Sofix.isDark && $('.staffSigImage').length && window.Sofix.enablePersonalUse) {
        $('.staffSigImage').css('filter', 'contrast(0) brightness(2)');
    }

    //Add tab title for social activity pages
    if (mw.config.get('wgCanonicalSpecialPageName') === 'UserProfileActivity') {
        document.title = 'Social Activity for ' + mw.config.get('profileUserName') + ' ' + document.title;
    }

    //Add "delete" option to edit dropdown on user pages
    if (mw.config.get('profileIsUserPage')) {
        window.Sofix.modules.push('UserPageEditDropdownDelete');
    }

    //Remove the black circles around the "moved" indicators in diffs when selecting the text
    window.Sofix.modules.push('FixDiffIndicators');

    //Load all modules
    if (window.Sofix.modules.length) {
        importArticles({
            type: 'script',
            articles: (window.Sofix.modules.map(function (name) {
            		      return 'u:dev:MediaWiki:Sofix/' + name + '.js';
                      }))
        });
    }
}

function init () {
    window.Sofix = $.extend({
        enablePersonalUse: false,
        isDark: $(':root').css('--theme-article-text-color') === '#e6e6e6',
        modules: []
    }, window.Sofix);

    if (window.Sofix.loaded) {
        return;
    }
    window.Sofix.loaded = true;

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Dorui.js',
            'u:dev:MediaWiki:FixPhalanxBlockLinks.js',
            'u:dev:MediaWiki:FixCascadingProtectionEditButton.js'
        ]
    }, {
        type: 'style',
        articles: [
            'u:dev:MediaWiki:Sofix.css'
        ]
    }).then(function () {
    	mw.hook('doru.ui').add(main);
    });
}

mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(init);