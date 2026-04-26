/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

importArticles({

  type: "script",

  articles: [

      "w:c:dev:Countdown/code.js"

  ]

});

importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		'w:c:dev:DisplayClock/code.js'
		// ...
	]
});

importScriptPage('CollapsibleInfobox/code.js', 'dev'); 
 
importScriptPage('DisplayClock/code.js', 'dev');
 
var PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month', order:-1/0 },
		featured: 'Featured',
		templates: 'Template Maker',
                profile: 'Nice user page',
                javascript: 'JSS',
                youtube: 'Youtube'
	}
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

UserTagsJS.modules.custom = {
	'JJBisNowHere': ['montheditor', 'rollback'], // Add Editor of the Month
	'AvalancheExia': ['rollback'], // Add rollback
	'Tuudug': ['javascript', 'templates'], // Add featured + templates guru
	'Abel09': ['featured', 'javascript', 'templates'], // Add featured 
        'RonBWL': ['featured'], // Add featured
        'Xenome18': ['profile'], //Add Nice Profile
        'Simrock': ['youtube', 'featured'], //Add YouTube Channel
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

/* Auto-Refresh in Recent Changes */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb1468579810/common/skins/common/images/ajax.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Tooltips Configuration - FIXED */
(function () {
    function initTooltips() {
        document.querySelectorAll('.advanced-tooltip').forEach(function (tooltip) {
            var contents = tooltip.querySelector('.tooltip-contents');
            if (!contents) return;

            tooltip.addEventListener('mouseenter', function () {
                contents.style.display = 'block';
            });

            tooltip.addEventListener('mousemove', function (e) {
                var x = e.clientX;
                var y = e.clientY;
                var boxW = contents.offsetWidth;
                var boxH = contents.offsetHeight;
                var vw = window.innerWidth; document.documentElement.clientWidth;
                var vh = window.innerHeight; document.documentElement.clientHeight;
                var left = - 135;
                var top =  - 33;

                if (left + boxW > vw) {
                    left = x - boxW;
                }

                if (top + boxH > vh) {
                    top = y - boxH;
                }

                contents.style.left = left + 'px';
                contents.style.top  = top  + 'px';
            });

            tooltip.addEventListener('mouseleave', function () {
                contents.style.display = 'none';
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
})();