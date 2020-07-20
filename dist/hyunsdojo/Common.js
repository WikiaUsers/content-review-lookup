/* Any JavaScript here will be loaded for all users on every page load. */

/*iframe timeline success - https://hyunsdojo.wikia.com/wiki/Testingpage?cb=3843*/

mw.hook('wikipage.content').add(function($content) {
    $content.find('.TimelineCier:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 500,
                scrolling: 'yes',
                src: 'https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1srrmZG7AazbPIVspt16riZfx2x0FltLCqP2l9JoWTag&font=Abril-DroidSans&lang=en&timenav_position=top&initial_zoom=0&width=675&height=500',
                width: 675
            })
        ).addClass('loaded');
    });
});


/***Youtube widget - most recent video***/

/*small thumb*/
mw.hook('wikipage.content').add(function($contents) {
    $contents.find('.youtubethumb:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 144,
                scrolling: 'yes',
                src: 'https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=user_uploads&list=hyunsdojo',
                width: 256
            })
        ).addClass('loaded');
    });
});

/* big thumb*/
mw.hook('wikipage.content').add(function($contents) {
    $contents.find('.youtube:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 360,
                scrolling: 'yes',
                src: 'https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=user_uploads&list=hyunsdojo',
                width: 640
            })
        ).addClass('loaded');
    });
});