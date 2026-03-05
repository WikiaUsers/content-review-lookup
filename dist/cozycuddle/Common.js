/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscordIntegrator/code.js'
    ]
});

document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Butcherman&display=swap">');

$(document).ready(function() {

    var username = mw.config.get('wgUserName');
    var name = username ? username : 'Guest';
    $('body').append(
        '<div id="cozy-greeting">' +
        '<div id="cozy-greeting-title">👋 Welcome!</div>' +
        '<div id="cozy-greeting-msg">Hello, <span id="cozy-username">' + name + '</span>!<br>Welcome to the unofficial wiki for Cozy Cuddle!</div>' +
        '<button id="cozy-greeting-close">✕</button>' +
        '</div>'
    );
    $('#cozy-greeting-close').click(function() {
        $('#cozy-greeting').fadeOut();
    });
    setTimeout(function() {
        $('#cozy-greeting').fadeOut();
    }, 6000);

    $('.pi-theme-cozycuddle .pi-title').css('font-family', 'SuperStitch, cursive');

});