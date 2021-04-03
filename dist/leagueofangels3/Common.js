/* Any JavaScript here will be loaded for all users on every page load. */
(function ($, mw) {
    mw.hook('wikipage.content').add(function ($content) {
        $content.find('.custom-random-image-container:not(.loaded)').each(function () {
            var images = JSON.parse(this.dataset.images),
                image = images[Math.floor(Math.random() * images.length)];
            if (!image.startsWith('https://static.wikia.nocookie.net/leagueofangels3/images/')) {
                console.warn('Refusing to load image <%s>.', image)
                return;
            }
            $(this)
                .empty()
                .append($('<img/>').attr('src', image))
                .addClass('loaded');
        });
    });
}(jQuery, mediaWiki));

var tooltips_list = [
    {
        classname: 'custom-tooltip-divine-honor',
        parse: '{' + '{Divine Honor}}',
        delay: 500
    }
];