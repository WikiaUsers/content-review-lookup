// Discussions Delete All
// "Delete All Posts" Button next to Discussion Post Count
//  From https://dev.fandom.com/wiki/Discussions_Delete_All
// @author: Jr Mime
require([
    'jquery',
    'mw',
    'wikia.window',
    'wikia.nirvana'
], function($, mw, window, nirvana) {
    var config = mw.config.get([
        'wgCityId',
        'wgUserGroups'
    ]);
    if (
        !$('#UserProfileMasthead').exists() ||
        window.dda ||
        !$('#discussionAllPostsByUser').exists() ||
        !config.wgUserGroups.join().match(/sysop|staff||vstf|helper|global-discussions-moderator|wiki-manager/)
    ) {
        return;
    }
    var dda = {};
 
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
 
    dda.preload = function (i18n) {
        $.when(
            i18n.loadMessages('Discussions Delete All'),
            dda.id()
        ).then(dda.init);
    };
 
    dda.id = function () {
        return nirvana.getJson('UserProfilePage', 'renderUserIdentityBox', {
            title: 'User:' + $('.masthead-info hgroup h1').text()
        });
    };
 
    dda.init = function (i18n, data) {
        dda.i18n = i18n;
        if (!data || !data[0] || !data[0].user || !data[0].user.id || data[1] !== 'success') {
            return;
        }
        dda.id = data[0].user.id;
        $('.tally span').css('float', 'none');
        $('#discussionAllPostsByUser').after(
            $('<br>'),
            $('<span>', {
                id: 'dda',
                css: {
                    'cursor': 'pointer',
                    'color': 'red',
                    'font-weight': 'bold',
                    'border': '1px solid red',
                    'margin': '2px'
                },
                text: i18n.msg('delete').plain()
            }).click(dda.click)
        );
    };
 
    dda.click = function () {
        if (window.ddaDoNotConfirm || confirm(dda.i18n.msg('confirm').plain())) {
            dda.deleteAll();
        }
    };
 
    dda.deleteAll = function () {
        $.ajax({
            url: 'https://services.fandom.com/discussion/' + config.wgCityId + '/users/' + dda.id + '/posts/delete',
            type: 'PUT',
            xhrFields: {
                withCredentials: true
            },
            crossdomain: true
        }).done(dda.done);
    };
 
    dda.done = function (data) {
        $('span#dda').replaceWith(dda.i18n.msg('done').escape());
    };
 
    window.dda = dda;
 
    mw.hook('dev.i18n').add(dda.preload);
});