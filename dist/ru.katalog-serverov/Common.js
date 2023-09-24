/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* Taken from https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:common.js */
$('.fandom-community-header__community-name-wrapper').append(
    /* Adds Fandom_Verified_Community Badge to Title */
    $('<img/>').addClass('hover-community-header-wrapper').css('height', '30px')
    .attr('src', 'https://media.discordapp.net/attachments/1008071820047564841/1154835808214323280/Fandom_Verified_Community.png?width=927&height=884'));