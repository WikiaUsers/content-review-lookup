/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Message Wall Comment Color*/ 

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Dïzney AJ"]').length;
}).next().css({
    backgroundColor: "#33ff99"
});

var admins = ['Dïzney AJ'];
if ($('#UserProfileMasthead').length) {
    for (var i = 0; i < admins.length; i++) {
        if (admins[i] === wgTitle.substr(0, admins[i].length)) {
            $('.masthead-avatar img.avatar', '#UserProfileMasthead').css({
                borderStyle: 'outset', borderColor: '#33ff99', borderWidth: '5px'
            });
            break;
        }
    }
}
/*MastheadRightsBadges*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MastheadRightsBadge.js',
    ]
});