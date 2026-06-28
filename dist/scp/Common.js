/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {

		// former staff
		formerbureaucrat: { u:'Former Bureaucrat', order: 100 },
		formersysop: { u:'Former Administrator', order: 101 },
		formermod: { u:'Former Moderator', order: 102 },

		// former staff reasons
		retired: { u:'Retired Staff', order: 103 },
		fired: { u:'Hall of Shame', order: 104 },

		// other
		inactive: {u:'Inactive', order: 1001 },
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'content-moderator', 'sysop', 'bot', 'bot-global'];

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};



importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
        'u:dev:MediaWiki:CategoryQuickRemove.js',
    ]
});

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

// FNDM page subtitle for FNDM namespaced pages
$(function () {
    if (mw.config.get('wgCanonicalNamespace') !== 'FNDM') return;

    $('#firstHeading').text(mw.config.get('wgTitle'));

    if (!$('.page-header__page-subtitle').length) {
        $('.page-header__title-wrapper').append(
            '<div class="page-header__page-subtitle">FNDM Page</div>'
        );
    }
});

// License thing for creative commons
$(function() {
    // Custom license text (modify as needed)
    var customText = 'Unless otherwise stated, the content of this page is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative Commons Attribution-ShareAlike 4.0 License</a>, excluding other content such as images, code, additional information, etc., which are licensed under the same licenses determined by their respective authors, meaning you may or may not include them in your own work. Others may share and adapt the work (e.g. translations), though it is required to credit all of the authors above including applying the same license to your derivative work.';

    // Set up a MutationObserver to detect changes in the footer
    var observer = new MutationObserver(function(mutations) {
        var licenseElement = document.querySelector('.footer__license-text, .license-description, .wikia-license');
        
        if (licenseElement) {
            // Replace the text
            licenseElement.innerHTML = customText;
            
            // Stop observing once changed (optional)
            observer.disconnect();
        }
    });

    // Start observing the entire document
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

    // Fallback: Try replacing after 3 seconds in case MutationObserver fails
    setTimeout(function() {
        var fallbackElement = document.querySelector('.footer__license-text, .license-description, .wikia-license');
        if (fallbackElement && fallbackElement.innerHTML.includes('unless otherwise noted')) {
            fallbackElement.innerHTML = customText;
        }
    }, 3000);
});