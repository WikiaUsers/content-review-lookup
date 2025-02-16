/* Any JavaScript here will be loaded for all users on every page load. */
$( function () {
    $('.archtable .new[href^="/wiki/Special:Upload"]').each(function(){
        this.replaceWith(
            ($('<a>',{
                href : this.href,
                class : 'image'
            }).append(
                $('<img>', {
                    src : 'https://static.wikia.nocookie.net/darkandwindiefakemon/images/2/2b/000.png',
                    alt : 'missing image'
                })
            ))[0]
        );
    });
});