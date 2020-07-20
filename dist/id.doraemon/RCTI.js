mw.hook('wikipage.content').add(function($content) {
    $content.find('.rcti:not(.loaded)').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.metube.id/embed/1/?type=live&autoplay=true')
 
        $this.html(
            $('<iframe>', {
                width: String(data.width || '').trim(),
                height: String(data.height || '').trim(),
                src: uri(),
                allowfullscreen: 'true'
            })
        ).addClass('loaded');
    });
});