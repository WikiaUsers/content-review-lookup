(function($) {
    'use strict';
 
    var d = new Date(),
        h = d.getHours(),
        s = (h >= 21 || h <= 6) ?
            'https://images.wikia.nocookie.net/mlp/ru/images/7/77/%D0%9F%D0%BE%D0%BD%D0%B8%D0%B2%D0%B8%D0%BB%D0%BB%D1%8C_%D0%9D%D0%BE%D1%87%D1%8C.jpg':
            'https://images.wikia.nocookie.net/mlp/ru/images/3/3a/%D0%9F%D0%BE%D0%BD%D0%B8%D0%B2%D0%B8%D0%BB%D0%BB%D1%8C_%D0%94%D0%B5%D0%BD%D1%8C.jpg';
 
    $('body.skin-oasis').css({
        'background-image': 'url(' + s +')',
        'background-position': 'top center',
        'background-repeat': 'no-repeat',
        'background-attachment': 'fixed'
    });
})(this.jQuery);