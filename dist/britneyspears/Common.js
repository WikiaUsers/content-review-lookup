/* Any JavaScript here will be loaded for all users on every page load. */

/* welcome module sia wiki*/
$(function() {
    var welcome = "";
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:WelcomeSide',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').prepend(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});
$(function () {

    $('.album-carousel').each(function () {

        var $carousel = $(this);
        var $items = $carousel.find('.album-item');
        var visible = 4;            // show 4 albums
        var index = 0;              // starting index
        var lastIndex = $items.length - visible;

        var $prev = $carousel.find('.album-prev');
        var $next = $carousel.find('.album-next');

        function showItems() {
            $items.hide();
            for (var i = 0; i < visible; i++) {
                var pos = index + i;
                if (pos < $items.length) {
                    $items.eq(pos).show();
                }
            }

            // Hide/show arrows at edges
            if (index <= 0) {
                $prev.hide();
            } else {
                $prev.show();
            }

            if (index >= lastIndex) {
                $next.hide();
            } else {
                $next.show();
            }
        }

        $next.on('click', function () {
            if (index < lastIndex) {
                index++;
                showItems();
            }
        });

        $prev.on('click', function () {
            if (index > 0) {
                index--;
                showItems();
            }
        });

        showItems();
    });

});