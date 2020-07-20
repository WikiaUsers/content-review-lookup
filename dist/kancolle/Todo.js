/**
 * Show all .todo at the bottom of article.
 */

(function($) {
    "use strict";
    $(document).ready(function() {
        $(".todo").each(function(_, e) {
            $(e).detach().appendTo('#mw-content-text');
            $(e).show();
        });
    });
})(jQuery);