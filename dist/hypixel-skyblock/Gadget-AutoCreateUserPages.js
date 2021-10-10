mw.loader.using('mediawiki.user').then(function() {
	if (mw.user.isAnon()) return;

	window.AutoCreateUserPagesConfig = {
	    content: {
	        2: '{{Userpage Links|\n\
*[[Special:Mypage/Sandbox|My Sandbox]]\n\
*[[Special:Mypage/Drafts|Drafts]]\n\
*[[Special:Mypage/Quick Copy|Quick Copy]]\n\
}}\n\
This is your user page. Please edit this page to tell the community about yourself!\n\
\n\
==My favorite pages==\n\
* Add links to your favorite pages on the wiki here!\n\
* Favorite page #2\n\
* Favorite page #3\n\
\n\
==My Skyblock Progress==\n\
*In-game Name: Add Your In-game name Here!\n\
*Weapon: add your weapon(s) here!\n\
*Armor: Add your Armor Here!',
	    },
	    summary: 'Creating userpage (automatic)',
	};

	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:AutoCreateUserPages.js',
	    ],
	});
});