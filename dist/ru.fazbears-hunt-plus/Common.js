mw.hook('wikipage.content').add(function() {
    $('.cool-hover-btn[data-hover]').each(function() {
        var container = $(this);
        var img = container.find('img');
        var hoverSrc = container.data('hover');

        var preload = new Image();
        preload.src = hoverSrc;

        img.on('load', function() {
            container.css({
                'width': img.width() + 'px',
                'height': img.height() + 'px',
                'background-image': 'url(' + hoverSrc + ')',
                'background-size': 'cover',
                'background-position': 'center'
            });
        });

        // Если картинка уже загружена
        if (img[0].complete) {
            container.css({
                'width': img.width() + 'px',
                'height': img.height() + 'px',
                'background-image': 'url(' + hoverSrc + ')',
                'background-size': 'cover',
                'background-position': 'center'
            });
        }
    });
});