mw.hook('wikipage.content').add(function($content) {
    $content.find('span.VevoVid[data-widget-id][style]:not(.loaded)').each(function() {
        var $this = $(this),
            width = this.style.width,
            height = this.style.height;
        if (width.indexOf('px') === -1) {
            width += 'px';
        }
        if (height.indexOf('px') === -1) {
            height += 'px';
        }   
        $this.html(
            $('<iframe>', {
                allowfullscreen: true,
                width: width,
                height: height,
                src: 'https://embed.vevo.com?isrc=' + encodeURIComponent($this.attr('data-widget-id'))
            })
        ).addClass('loaded');
    });
});