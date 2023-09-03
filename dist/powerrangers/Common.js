/* Any JavaScript here will be loaded for all users on every page load. */
/* Pride toolbar button
var toolbarLabel = 'Pride';
var toolbarLinks = [
	{link: 'https://bit.ly/FandomDragRaceTournament', label: 'June 29: Drag Race Bracket Tournament'},
    {link: 'https://bit.ly/PrideEditorStory-Kurt', label: 'June 28: Pride Highlight: Meet Kurt'},
    {link: 'https://bit.ly/PrideEditorStory-Vinny', label: 'June 27: Pride Highlight: Meet Vinny'},
    {link: 'https://bit.ly/PrideEditorStory-Sam', label: 'June 23: Pride Highlight: Meet Sam/Lemon Skweezy'},
    {link: 'https://bit.ly/PrideEditorStory-Allyship', label: 'June 20: How to Strengthen LGBTQIA+ Allyship'},
    {link: 'https://bit.ly/PrideEditorStory-Bart', label: 'June 15: Pride Stories: Celebrate with Bart'},
    {link: 'https://powerrangers.fandom.com/f/p/4400000000000084994', label: 'June 12: Discussions post'},
    {link: 'https://bit.ly/FandomPrideBlog-toolbar', label: 'June 6: Pride blog with Drag Queens interview'},
    {link: 'https://bit.ly/FandomPridePlaylist', label: 'June 1: Pride spotify playlist'}
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

/* Disability Pride logo link
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating Disability Pride Month')
        )
        .attr('href', 'https://bit.ly/DisabilityPrideMonth-Chris')
);

/*Table Filter from https://pad.fandom.com/wiki/MediaWiki:FilterTable.js*/
importArticles(
    {    
        type: 'script',
        articles: [   
            'u:pad:MediaWiki:FilterTable.js',
            'u:dev:MediaWiki:MassEdit/code.js',
        ]
    }
);