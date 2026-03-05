/* Any JavaScript here will be loaded for all users on every page load. */
window.ajaxRefresh = 30000;

/*Adding a visual button instead of it just being in Tools - Update of the dev:BackToTopButton */
window.BackToTopModern = true;

// Credits go to ray808080 from the Sky: Children of the Light Wiki https://sky-children-of-the-light.fandom.com 
$('.fandom-community-header__community-name-wrapper').append(
     /* Adds A+ Wiki Badge to Title */    $('<img/>').addClass('hover-community-header-wrapper').css('height', '30px')
    .attr('src', 'https://static.wikia.nocookie.net/warhammer-homebrew/images/c/c4/Wikibadge.png'));
// Create a Userpage
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{$2}}',
        3: '{{$2/talk}}'
    },
    summary: 'Creating my pages',
    notify: '<a href="/wiki/User:$1">Here is a link to your userpage, $2!</a>'
};
// Google Doc Integration
mw.hook('wikipage.content').add(function ($content) {

    $content.find('[data-widget-id]:not(.loaded)').each(function () {

        const $container = $(this);
        const rawId = $container.attr('data-widget-id');

        if (!rawId) {
            return;
        }
        const id = encodeURIComponent(rawId);

        if ($container.hasClass('EmbeddedGoogleDoc')) {
            const $iframe = $('<iframe>', {
                src: 'https://docs.google.com/document/d/e/' + id + '/pub?embedded=true',
                allowfullscreen: true
            }).css({
                width: 'inherit',
                height: 'inherit',
                border: '0'
            });
            $container.empty().append($iframe);
        }
        $container.addClass('loaded');
    });
});