/* Javascript inkluderet her vil være aktivt for alle brugere. */
/* Pride logo link */
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Fejrer Handicap Pride-Måned')
        )
        .attr('href', 'https://bit.ly/FandomPrideBlog-header')
);