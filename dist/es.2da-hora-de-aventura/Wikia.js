(function ()
 { "use strict";
 var userRightsList =
 { "Counter UAV": ["Wikia Language Brigadier"]
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