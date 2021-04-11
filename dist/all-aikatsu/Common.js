/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
window.BackToTopModern = true;
/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
    "Special:NewFiles"
];

/* End --- Dev Wiki scripts customization */

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();

function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	}
	return array;
}
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
function getElementsByName (name, root) {
    if (root == undefined) root = document;
    var e = root.getElementsByTagName('*');
    var r = new Array();
    for (var i = 0; i < e.length; i++) {
	    if (e[i].getAttribute('name') == name) r[r.length] = e[i];
    }
    return r;
}

/* AddRailModule on top */
window.AddRailModule = [
    {page: 'Template:RailModule', prepend: true},
    'Template:Spotify',
];

/* WAM Score */
window.railWAM = {
    logPage: "Project:WAM Log"
};

/* UserTags */
window.UserTagsJS = {
	modules: {
		inactive: 60,
		mwGroups: ['autoconfirmed'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true,
		metafilter: {'autoconfirmed': ['inactive', 'bot', 'bot-global', 'nonuser'],}, // removes BanG Dreamer tag from all inactive, bots and global accounts with no edits
	}
};

/* MessageWallUserTags */
window.MessageWallUserTags = {
    tagColor: '#4220e9',
    txtSize: '10px',
    glow: true,
    glowSize: '12px',
    glowColor: '#a095f7',
    users: {
        'Hielmiez': 'Founder',
        'Jo SHININGSTAR': 'Bureaucrats',
        'Chrismh': 'Bureaucrats',
        'AguriiMadoka': 'Administrator',
        'TacticalMaster': 'Administrator',
        'Tatiana Cortez': 'Content Moderator',
    }
};

/* Adapted from YouTubePlayer & DraggableYouTubePlayer for video previews. */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.episodepreview-video').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.youtube.com/embed/'),
            id = (data.id || '').trim(),
            loop = ('' + data.loop).trim();
 
        if (data.loaded || id === '') {
            return;
        }
 
        uri.path += id;
        uri.query = {
            autoplay: window.YoutubePlayerDisableAutoplay ? '0' : ('' + data.autoplay).trim(),
            loop: loop,
            playlist: (loop === '1') ? id : '',
            start: ('' + data.start).trim(),
            list: (data.list || '').trim(),
            controls: 0,
            fs: 0,
            showinfo: 0,
            rel: 0, 
        };
 
        $this.html(mw.html.element('iframe', {
            width: ('' + data.width).trim(),
            height: ('' + data.height).trim(),
            src: uri.toString(),
            frameborder: '0',
            allowfullscreen: 'true'
        }));
        data.loaded = true;
    });
});