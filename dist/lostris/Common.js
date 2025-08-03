/* Any JavaScript here will be loaded for all users on every page load. */
/* Licensing message */
mw.loader.using( 'mediawiki.api', () => {
  'use strict';
  const msg = 'license-description-with-link';
  new mw.Api().loadMessagesIfMissing( msg ).done( () => {
    document.querySelector( '.license-description' ).innerHTML = mw.message( msg ).parse();
  } );
} );


/* Site-logo pop-up 
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Click here to learn more about Black Heritage Month.')
        )
        .attr('href', 'https://community.fandom.com/wiki/User_blog:CuBaN_VeRcEttI/Celebrate_Black_History_Month_with_Fandom')
);


$('#WikiaRail').on('afterLoad.rail', function() {
  const recentChangesLink = $('<a/>').attr('href', '/wiki/Special:RecentChanges');
  const wikiActivityRailHeader = $('#wikia-recent-activity.rail-module.recent-wiki-activity .rail-module__header');
  recentChangesLink.append(wikiActivityRailHeader.html());
  wikiActivityRailHeader.empty().prepend(recentChangesLink);
});*/