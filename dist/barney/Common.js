/* Any JavaScript here will be loaded for all users on every page load. */

/* Anniversary logo link */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Click here to celebrate with us!')
        )
        .attr('href', 'https://barney.fandom.com/wiki/User_blog:Barneymiller123abc/Celebrating_Fifteen_Years_of_Barney_Wiki')
);