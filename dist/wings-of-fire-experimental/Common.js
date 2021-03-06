/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Add a css class to user tags based on the tag's text
 */
(function () {
    // Don't run on pages w/o a masthead
    if (!$('#userProfileApp').length) return;

    // Wait until the masthead loads
    const interval = setInterval(function () {
        if ($('#userProfileApp').length) {
            clearInterval(interval);
            // Get all the tags
            const userTags = document.querySelectorAll('.user-identity-header__tag');

            // For each tag add a class equal to
            // 'user-identity-header__tag--' + lowercased tag text
            userTags.forEach(function (tag) {
                tag.classList.add(
                    'user-identity-header__tag--' + tag.textContent.toLowerCase().replace(' ', '-')
                );
            });
        }
    }, 1000);
})();

// our config is stored in an array
window.lessOpts = window.lessOpts || [];

// each target page needs separate configuration
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Wikia.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Wikia.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Wikia.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Css-header/common'
});

UserTagsJS.modules.custom = {
	'Matau99': ['csshelper', 'templatehelper', 'jshelper'],
	'Heliosanctus': ['csshelper', 'templatehelper', 'jshelper'],
	'.oOEclipseOo.': ['csshelper'],
	'Stormlash': ['csshelper'],
	'MacabreDragons': ['csshelper'],
	'Arya Elf': ['templatehelper'],
	'ChicoryTheRainWing': ['csshelper'],
	'Artifice the Nightwing': ['csshelper'],
	'Mysterygirl000': ['cofounder'],
	'16.505225cb': ['cofounder'],
	'Platypus the SeaWing': ['templatehelper', 'csshelper'],
	'XUbiquitousx': ['csshelper', 'templatehelper', 'jshelper'],
	'BarronTheSkyWing': ['csshelper', 'templatehelper']
};

 SpoilerAlert = {
  'class': "Spoiler", //add <span class="Spoiler"></span> to a page to spoiler it
};

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';

/* Imports */

importArticles({
    type: 'style',
    article: 'u:dev:FontAwesome/code.css'
}, {
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MediaWiki:WallGreetingButton/code.js',
        'u:dev:VisualSpellCheck/code.js',
        'u:dev:SpoilerAlert/code.2.js',
        'u:dev:Less/code.2.js',
        'u:dev:SaveKey/code.js',
        'u:dev:ThreadIndicator/code.js',
        'u:dev:BackToTopArrow/code.js',
        'u:dev:DiscordIntegrator/code.js'
    ]
});

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// Dragon anon avatars
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/')) {
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/30", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/06/Anonymous_IceWing_Wiki.png/revision/latest?cb=20190914235622");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/50", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/06/Anonymous_IceWing_Wiki.png/revision/latest?cb=20190914235622");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/150", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/06/Anonymous_IceWing_Wiki.png/revision/latest?cb=20190914235622");
        }
    }
}
changeSourceAll();
 
setInterval(function(){
    changeSourceAll();
}, 1000);