$(function() {
    $('.youtubeplaylist').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('http://youtube.com/embed/'),
            list = (data.list || '').trim(),
            loop = ('' + data.loop).trim(),
            begin = (data.begin || '').trim();
        if (list === '') {
            return;
        }
        uri.path += ( (begin !== '') ? begin : list );
        uri.query = {
            feature: 'player_embedded',
            autoplay: window.YoutubePlayerDisableAutoplay ? '0' : ('' + data.autoplay).trim(),
            loop: loop,
            list: list,
            start: ('' + data.start).trim()
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