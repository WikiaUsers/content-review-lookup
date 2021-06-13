/* Any JavaScript here will be loaded for all users on every page load. */

/* User Tag Configuration */
window.UserTagsJS = {
	modules: {},
	tags: { stan: { u: 'Orbit'},
            newuser: { u: 'LOOΠΔTION'},
			gender: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'https://en.wikipedia.org/wiki/Gender' }
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 15, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.stan = {
	days: 60, // Must have been on the Wiki for 60 days
	computation: function(edits) {
		// And have at least 1000 edits
		return edits > 1000 ;
	},
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.custom = {
    'Baekwan': ['stan'],
    'Birbfriend': ['stan'],
	'Jamoss03': ['stan'],
	'Jumosan': ['stan'],
	'OnlyBasile': ['stan'],
	'UtauSteam': ['stan'],
	'Xiuminne': ['stan'],
	'Zeqe': ['stan']
};

/* Rail WAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Allows for the embedding of videos from vlive.tv (Base Code - KockaAdmiralac) */
mw.hook('wikipage.content').add(function($content) {
    var current = 0;
    $content.find('.Vlive:not(.loaded)').each(function() {
        var el = document.getElementsByClassName("Vlive")[current];
        var video_id = "https://www.vlive.tv/embed/" + el.getAttribute("data-id") + "?autoPlay=false";
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: el.getAttribute("data-height"),
                scrolling: 'no',
                src: video_id,
                width: el.getAttribute("data-width"),
                allow: "fullscreen",
            })
        ).addClass('loaded');
        current += 1;
    });
});

/* Add .activetab to the active tab - By Fujimaru-kun from Fairy-Tail Fr Wiki  */
$( '.pi-theme-tab .pi-header .selflink').parent().addClass('activetab');