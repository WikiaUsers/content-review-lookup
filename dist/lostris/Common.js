/* Any JavaScript here will be loaded for all users on every page load. */
/* Licensing message */
'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	const msg = 'license-description';
	const url = 'https://www.fandom.com/licensing';
	const link = $('<a>').attr('href', url).text('CC-BY-SA').prop('outerHTML');
	api.loadMessagesIfMissing(msg).done(() => {
		$('.license-description').html(mw.message(msg, link).text());
	});
});


/* Site-logo pop-up */
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
});