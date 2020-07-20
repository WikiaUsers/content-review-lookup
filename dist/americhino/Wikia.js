// Random Twitter Feed Module
$(function() {
    var newSection = '<section id="twitter" class="module"><h2>' +
      'Twitter' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Twitter}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#twitter').append(code);
    });
});

// Infobox Images
(function(mw, $) {
    // Scope limitation and variables
    var img = { el: $('.pi-theme-chatskin .pi-image-thumbnail') },
        pi = { el: $('.pi-theme-chatskin') };
    if (!pi.el.exists() || !img.el.exists()) {
        return;
    }
    /**
     * Main Champion infobox class.
     */
    var chatskinInfobox = {};
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
    chatskinInfobox.init = function() {
        chatskinInfobox.api = new mw.Api();
        chatskinInfobox.api.get({
            action: 'query',
            prop: 'imageinfo',
            titles: 'File:' + img.name,
            iiprop: 'size',
            format: 'json'
        }).then(championInfobox.call);
    };
    chatskinInfobox.call = function(d) {
        var p = d.query.pages;
        img.height.input = p[Object.keys(p)[0]].imageinfo[0].height;
        chatskinInfobox.res(img, pi);
    };
    chatskinInfobox.res = function(img, pi) {
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
        img.el.attr('src', chatskinInfobox.util.src(x[1]));
        img.el.attr('srcset', chatskinInfobox.util.srcset(x[1], x[2]));
    };
    chatskinInfobox.util = {
        src: function(hgt) {
            return !hgt ?
                img.src + '?cb=' + img.cb :
                img.src + '/scale-to-height-down/' + hgt + '?cb=' + img.cb;
        },
        srcset: function(x1, x2) {
            var s = chatskinInfobox.util.src;
            return s(x1) + ' 1x, ' + s(x2) + ' 2x';
        }
    };
    mw.loader.using('mediawiki.api').then(chatskinInfobox.init);
})(mediaWiki, jQuery);

/* Praise Americhino */
//From User:Fngplg (Sonic News Network), adapted by User:Americhino
$(function(){
    if ($('.page-User_Americhino').length === 0) return;
    var banner = new BannerNotification();
    banner.setContent('Welcome to the supreme leader\'s user page. Make sure to stop by and say hi!');
    banner.show();
});