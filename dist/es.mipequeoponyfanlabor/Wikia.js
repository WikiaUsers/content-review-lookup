/*Tag Rever (Test)*/
(function() {
    "use strict";
    var userRightsList = {
    "Seicer": ["Burócrata"],
    };
    if ($('.masthead-info hgroup').length) {
        var name = $('.masthead-info h1[itemprop="name"]').text();
        if (userRightsList[name] !== undefined) {
            var i;
            for (i = 0; i < userRightsList[name].length; i++) {
                $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
            }
        }
    }
}());

/* Standard Edit Summary */
window.dev = window.dev || {};
window.dev.editSummaries = {
    css: '#stdSummaries { width: 264px }',
    select: 'MediaWiki:Standard Edit Summary'
};