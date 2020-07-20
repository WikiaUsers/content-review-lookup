/**
 * Name:        Bandcamp
 * Description: Adds wrappers around Bandcamp widgets that when
 *              clicked load the widget. Useful for soundtrack
 *              listing pages with a lot of Bandcamp widgets.
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Version:     v1.0
 */
(function() {
    var Bandcamp = {
        selector: '.Bandcamp, [data-widget="bandcamp"]',
        properties: {
            bool: ['tracklist', 'minimal', 'transparent'],
            hex: ['linkcol', 'bgcol'],
            size: ['size', 'artwork'],
            id: ['track', 'album']
        },
        init: function($content) {
            $content.find(this.selector).each($.proxy(this.setup, this));
        },
        setup: function(_, el) {
            var $el = $(el);
            $el.html('<svg class="wds-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.69 12.6L5.143 22.867a.722.722 0 0 1-.753.05.733.733 0 0 1-.391-.65V1.733c0-.274.15-.524.391-.65a.724.724 0 0 1 .753.05l14.545 10.266a.734.734 0 0 1 0 1.201z" fill-rule="evenodd"/></svg>');
            $el.find('svg').click($.proxy(this.load, this));
        },
        load: function(e) {
            var $el = $(e.target).closest(this.selector),
                data = $el.data(),
                url = 'https://bandcamp.com/EmbeddedPlayer';
            $.each(this.properties, $.proxy(function(k, v) {
                v.forEach(function(el) {
                    if (data[el]) {
                        url += '/' + el + '=' + this[k + 'Process'](data[el]);
                    }
                }, this);
            }, this));
            $el.html(
                $('<iframe>', {
                    src: url
                }).on('load', function() {
                    $el.find('img').remove();
                })
            );
            $el.append(
                $('<img>', {
                    src: mw.config.get('stylepath') + '/common/images/ajax.gif'
                })
            );
            $el.addClass('loaded');
        },
        boolProcess: function(val) {
            return String(Boolean(val));
        },
        hexProcess: function(val) {
            return (/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i).test(val) ? val : '000000';
        },
        sizeProcess: function(val) {
            return ['small', 'big', 'large', 'none'].indexOf(val) === -1 ? 'small' : val;
        },
        idProcess: function(val) {
            return Math.round(Number(val));
        }
    };
    mw.hook('wikipage.content').add($.proxy(Bandcamp.init, Bandcamp));
})();