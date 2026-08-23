/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom Promotion boxes, courtesy of the Regular Show Wiki. */

window.LockForums = {
   expiryDays: 30,
   expiryMessage: "This forum is considered archived because it hasn't been commented in over <expiryDays> days. There is no need to reply. Instead, make a new thread."
};

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog hasn't been commented on for over <expiryDays> days. There is no need to reply."
};

importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:LockOldBlogs/code.js'
    ]
});

window.BackToTopModern = true;

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassRename/code.js',
    ]
});
mw.hook('DiscordIntegrator.added').add(function ($el) {
	var categories = mw.config.get('wgCategories') || [];

	if (
		!categories.includes('Legends of Chima') &&
		!categories.includes('Legends of Chima Wiki')
	) {
		return;
	}

	var $iframe = $el.find('iframe[src*="discord.com/widget"]');

	if (!$iframe.length) {
		return;
	}

	var src = $iframe.attr('src');

    src = src.replace(
	    /([?&]id=)\d{17,19}/,
    	'$1' + '488769571076177930'
    );

	$iframe.attr('src', src);
});