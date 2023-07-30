/* Any JavaScript here will be loaded for all users on every page load. */
/* Disability Pride logo link */
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating Disability Pride Month')
        )
        .attr('href', 'https://bit.ly/DisabilityPrideMonth-Chris')
);