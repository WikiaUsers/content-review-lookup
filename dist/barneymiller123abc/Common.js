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

window.AddRailModule = [{
    page: 'Template:DiscordRailModule',
    appendBefore: '.DiscordIntegratorModule .rail-module',
}];

window.rwaOptions = {
    limit: 50,
    namespaces: [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit: true 
};