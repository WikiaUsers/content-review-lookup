(function () {
    'use strict';
    function init() {
        $('#mdw-tourney-widget').html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 360,
                width: 640,
                allowfullscreen: 'allowfullscreen',
                src: 'https://widget.toornament.com/tournaments/2783073984893173760/?_locale=en_GB'
            })
        );
    }
    $(init);
}());