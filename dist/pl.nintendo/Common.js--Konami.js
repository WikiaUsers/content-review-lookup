/**
 * Konami code
 *
 * Description:
 * Redirects to [[Pegasus]] when konami code is inputted
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
                // redirect to [[Pegasus]]
                window.location.assign('http://pl.nintendo.wikia.com/wiki/Pegasus');
                // empty keys array, not sure if this is completey necessary
                keys.length = 0;
            }
        });
    });
}(this, this.document, this.jQuery));