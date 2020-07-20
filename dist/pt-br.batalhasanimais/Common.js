$(function() {
    $('.youtubeplayer').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://youtube.com/embed/'),
            id = (data.id || '').trim(),
            loop = ('' + data.loop).trim();
        if (typeof id !== 'string' || id.trim() === '') {
            return;
        }
        uri.path += id;
        uri.query = {
            feature: 'player_embedded',
            autoplay: window.YoutubePlayerDisableAutoplay ? '0' : ('' + data.autoplay).trim(),
            loop: loop,
            playlist: (loop === '1') ? id : '',
            start: ('' + data.start).trim(),
            list: (data.list || '').trim()
        };
        $this.html(mw.html.element('iframe', {
            width: ('' + data.width).trim(),
            height: ('' + data.height).trim(),
            src: uri.toString(),
            frameborder: '0',
            allowfullscreen: 'true'
        }));
    });
});