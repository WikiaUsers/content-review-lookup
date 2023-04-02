/* Any JavaScript here will be loaded for all users on every page load. */

/* WHM logo link */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Learn about Women\'s History Month at Fandom')
        )
        .attr('href', 'https://bit.ly/FandomWHMBlog-logo')
);