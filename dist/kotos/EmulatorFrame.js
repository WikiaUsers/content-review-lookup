//Emulator iframe with one of my videos as the default src
//Meant to be used with [Template:MusicPlayer] for stories
mw.hook('wikipage.content').add(function($content) {
    $content.find('.EmulatorFrame:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 120,
                scrolling: 'no',
                src: 'https://www.youtube.com/embed/BHfqz68xEY8',
                width: 160
            })
        ).addClass('loaded');
    });
});