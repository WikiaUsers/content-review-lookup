/**
 * Konami code
 *
 * Description:
 * Redirects to [[Cabbage]] when konami code is inputted
 *
 * Source:
 * http://www.yourinspirationweb.com/en/fun-with-javascript-jquery-and-konami-code/
 */

(function (window, document, $) {
    'use strict';

    $(function () {

        var keys = [],
            konami = '38,38,40,40,37,39,37,39,66,65';

        $(document).keydown(function (e) {

            keys.push(e.keyCode);

            if (keys.toString().indexOf(konami) > -1) {
                // redirect to [[Cabbage]]
                window.location.assign('http://runescape.wikia.com/wiki/Cabbage');
                // empty keys array, not sure if this is completey necessary
                keys.length = 0;
            }
        });
    });
}(this, this.document, this.jQuery));