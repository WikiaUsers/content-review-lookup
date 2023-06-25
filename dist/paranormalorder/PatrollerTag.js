/* Adds automatically the patroller tag */
mw.loader.using('mediawiki.api').then(function() {
    var api = new mw.Api(),
        profileUserName = mw.config.get('profileUserName');
    if (!profileUserName) return;
    console.log('PatrollerTag.js iniciado');
    function addTag() {
        api.get({
            action: 'query',
            list: 'users',
            usprop: 'groups',
            ususers: profileUserName
        }).then(function (data) {
            if (data.query.users[0].groups.includes('patroller')) {
                if ($('.user-identity-header__tag').length >= 2) return;
                $('.user-identity-header__attributes').append(
                    $('<span>', {class: 'user-identity-header__tag', text: 'Patrulheiro'})
                );
                console.log('👍');
            }
        });
    }
    (function init() {
        if ($('.user-identity-box').length) addTag();
        else setTimeout(init, 500);
    })();
});