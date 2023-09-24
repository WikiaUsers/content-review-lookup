/* Any JavaScript here will be loaded for all users on every page load. */
/*Open Game using URI, and launch a toast*/
$(function() {
    function openRobloxLink() {
        var link = "roblox://placeId=12018816388";
        window.open(link, "_self");

        mw.hook("dev.toasts").add(function(toasts) {
            var toastMessage = "Game Launched!";
            toasts.success(toastMessage);
        });
    }

    $('.play-dovedale').click(function() {
        openRobloxLink();
    });
});

/*Wikisite hookup embed*/
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.wiki-site-embed').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://wiki.enews.link/' + id ,
                css: css
            })
        );
    });
});