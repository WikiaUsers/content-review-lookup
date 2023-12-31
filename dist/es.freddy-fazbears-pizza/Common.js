window.dev = window.dev || {};
window.dev.profileTags = {
  noHideTags: true
};

window.discussEmbedLimit = 10;
window.discussEmbedForum = "2529343771246594580";

$('.fandom-community-header__community-name-wrapper').append(
        $('<a/>').css('font-size', '1px').attr('href', 'https://community.fandom.com/wiki/Fandom_Compass').append(
        $('<img/>').addClass('hover-community-header-wrapper').css('height', '20px')
        .attr('src', 'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/8/82/FandomCompassBadge.png/revision/latest?path-prefix=es').attr('title', 'Esta wiki forma parte del programa Fandom Compass')
    ));

if (ug.indexOf('sysop') + ug.indexOf('content-moderator') > -2)
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Stella.js',
                'u:dev:MediaWiki:RedirectManagement/code.js'
            ]
        });