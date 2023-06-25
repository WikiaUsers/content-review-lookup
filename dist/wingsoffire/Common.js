/* Any JavaScript here will be loaded for all users on every page load. */
/* Pride toolbar button */
var toolbarLabel = 'Pride';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomPridePlaylist', label: 'Pride spotify playlist'},
    {link: 'https://bit.ly/FandomPrideBlog-toolbar', label: 'Pride blog with Drag Queens interview'},
    {link: 'https://wingsoffire.fandom.com/f/p/4400000000000667837', label: 'Discussion post'},
    {link: 'https://bit.ly/PrideEditorStory-Bart', label: 'Pride Stories: Celebrate with Itsbartbytheway'},
    {link: 'https://bit.ly/PrideEditorStory-Allyship', label: 'How to Strengthen LGBTQIA+ Allyship'},
    {link: 'https://bit.ly/PrideEditorStory-Sam', label: 'Pride Highlight: Meet Sam/Lemon Skweezy'}
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools, #WikiaBar .wikia-bar-anon' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wikiabar-button' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<h2 style="margin-left: 16px">Pride Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* Pride logo link */
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating Pride Month')
        )
        .attr('href', 'https://bit.ly/FandomPrideBlog-header')
);

//Embed Discussions for front page
window.discussEmbedForum = "1834995274482165617";

// Dragon anon avatars png
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/')) {
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/28/height/28", "https://static.wikia.nocookie.net/wings-of-fire-experimental/images/d/d4/Anonymous_SilkWing_Wiki.png/revision/latest?cb=20190914234814");
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400", "https://static.wikia.nocookie.net/wings-of-fire-experimental/images/d/d4/Anonymous_SilkWing_Wiki.png/revision/latest?cb=20190914234814");
        }
    }
}
changeSourceAll();
 
setInterval(function(){
    changeSourceAll();
}, 1000);

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
    source: 'MediaWiki:Custom-wikia.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Custom-wikia.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Css-header/wikia'
});

window.SpoilerAlert = {
  'class': "Spoiler", //add <span class="Spoiler"></span> to a page to spoiler it
};

// Ajax auto-refresh
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';