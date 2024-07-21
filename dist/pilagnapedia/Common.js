// add compass image
$('.fandom-community-header__community-name-wrapper').append(
        $('<a/>').css('font-size', '1px').attr('href', 'https://community.fandom.com/wiki/Fandom_Compass').append(
        $('<img/>').addClass('hover-community-header-wrapper').css('height', '20px')
        .attr('src', 'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/8/82/FandomCompassBadge.png/revision/latest?path-prefix=es').attr('title', 'A Fandom Compass Wiki')
    ));