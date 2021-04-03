(function(mw, $) {
    // Scope limitation and variables
    var img = { el: $('.pi-theme-champion .pi-image-thumbnail') },
        pi = { el: $('.pi-theme-champion') };
    if (!pi.el.exists() || !img.el.exists()) {
        return;
    }
    /**
     * Main Champion infobox class.
     */
    var championInfobox = {};
    $.extend(img, {
        name: img.el.data('image-name'),
        height: {
            output: img.el.prop('naturalHeight'),
            input: ''
        },
        src: img.el.attr('src').split('/').splice(0, 10).join('/'),
        cb: img.el.attr('src').split('=').slice(-1)[0]
    });
    pi.height = pi.el.height();
    if (img.height.output > pi.height) {
        return;
    }
    championInfobox.init = function() {
        championInfobox.api = new mw.Api();
        championInfobox.api.get({
            action: 'query',
            prop: 'imageinfo',
            titles: 'File:' + img.name,
            iiprop: 'size',
            format: 'json'
        }).then(championInfobox.call);
    };
    championInfobox.call = function(d) {
        var p = d.query.pages;
        img.height.input = p[Object.keys(p)[0]].imageinfo[0].height;
        championInfobox.res(img, pi);
    };
    championInfobox.res = function(img, pi) {
        var x = { 1: 0, 2: 0 };
        switch (!0) {
            case img.height.input >= 2*pi.height:
                x[1] = pi.height;
                x[2] = 2*pi.height;
                break;
            case img.height.input > pi.height:
                x[1] = pi.height;
                break;
            case img.height.input <= pi.height:
                break;
        }
        img.el.attr('src', championInfobox.util.src(x[1]));
        img.el.attr('srcset', championInfobox.util.srcset(x[1], x[2]));
    };
    championInfobox.util = {
        src: function(hgt) {
            return !hgt ?
                img.src + '?cb=' + img.cb :
                img.src + '/scale-to-height-down/' + hgt + '?cb=' + img.cb;
        },
        srcset: function(x1, x2) {
            var s = championInfobox.util.src;
            return s(x1) + ' 1x, ' + s(x2) + ' 2x';
        }
    };
    mw.loader.using('mediawiki.api').then(championInfobox.init);
})(mediaWiki, jQuery);