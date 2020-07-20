(function($) {
    'use strict';
 
    var d = new Date(),
        h = d.getHours(),
        s = (h >= 21 || h <= 6) ?
            'https://vignette.wikia.nocookie.net/novosibirsk/images/0/05/%D0%A2%D0%B5%D0%B0%D1%82%D1%80%28%D0%BD%D0%BE%D1%87%D1%8C%29.jpg/revision/latest?cb=20180317115643&path-prefix=ru':
            'https://vignette.wikia.nocookie.net/novosibirsk/images/b/b4/%D0%A2%D0%B5%D0%B0%D1%82%D1%80%28%D0%B4%D0%B5%D0%BD%D1%8C%29.jpg/revision/latest?cb=20180317115542&path-prefix=ru';
 
    $('body.skin-oasis').css({
        'background-image': 'url(' + s +')',
        'background-position': 'top center',
        'background-repeat': 'no-repeat',
        'background-attachment': 'fixed'
    });
})(this.jQuery);