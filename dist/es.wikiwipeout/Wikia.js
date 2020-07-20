 (function () {
        "use strict";
        var userRightsList = {
            "Blue93": ["Concursante de Oro"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('' + userRightsList[name][i] + '');
                }
            }
        }
    }());