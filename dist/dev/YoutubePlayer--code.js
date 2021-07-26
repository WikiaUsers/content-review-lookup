mw.hook('wikipage.content').add(function($content) {
    $content.find('.youtubeplayer:not(.loaded)').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.youtube.com/embed/'),
            id = String(data.id || '').trim(),
            loop = String(data.loop || '').trim();

        if (id === '') {
            console.warn('[YoutubePlayer] Video ID is not defined.');
            return;
        }

        uri.path += id;
        uri.query = {
            loop: loop,
            playlist: loop === '1' ? id : '',
            start: String(data.start || '').trim(),
            end: String(data.end || '').trim(),
            list: String(data.list || '').trim()
        };
        
        // From July 2021, embed does not work properly with some parameters
        // left empty.
        for (var prop in uri.query) {
            if (!uri.query[prop]) {
                delete uri.query[prop];
            }
        }

        $this.html(
            $('<iframe>', {
                width: String(data.width || '').trim(),
                height: String(data.height || '').trim(),
                src: uri.toString(),
                allowfullscreen: 'true',
                allow: 'fullscreen' + (loop ? '; autoplay' : '')
            })
        ).addClass('loaded');
    });
});