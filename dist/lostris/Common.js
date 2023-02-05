/* Any JavaScript here will be loaded for all users on every page load. */
/* Site-logo pop-up */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Click here to learn more about Black Heritage Month.')
        )
        .attr('href', 'https://community.fandom.com/wiki/User_blog:CuBaN_VeRcEttI/Celebrate_Black_History_Month_with_Fandom')
);