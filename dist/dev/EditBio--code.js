(function() {
    if (
        !$('#userIdentityBoxEdit').exists() ||
        window.EditBioLoaded
    ) {
        return;
    }
    window.EditBioLoaded = true;

    var username = $('.masthead-info h1[itemprop="name"]').text();

    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:EditBio.css'
    });

    var i18n, userdata;

    function saveError(res) {
        console.error(res);
    }

    function saveBio() {
        var isWikiaOrg = mw.config.get('wgServer').indexOf('wikia.org') !== -1;
        $.ajax({
            type: 'PUT',
            url: 'https://services.' + (isWikiaOrg ? 'wikia.org' : 'fandom.com') + '/user-attribute/user/' +
                 userdata.id + '/attr/bio',
            data: {
                value: $('#edit-bio-form #edit-bio-content').val()
            },
            xhrFields: {
                withCredentials: true
            },
            error: saveError,
            success: clearCache
        });
    }

    function closeModal() {
        $('#edit-bio-form').closeModal();
    }

    function cacheCallback(res) {
        if (res.status === 'ok') {
            closeModal();
            setTimeout(refreshMasthead, 500);
        } else {
            console.error(res);
        }
    }

    function clearCache() {
        $.nirvana.postJson('UserProfilePage', 'saveUserData', {
            userId: userdata.id,
            data: JSON.stringify({
                birthday: userdata.birthday
            }),
            token: mw.user.tokens.get('editToken')
        }, cacheCallback);
    }

    function refreshMasthead() {
        window.location.reload();
    }

    function editBio() {
        var bio = userdata.bio || '',
            modalContent = $('<div>').append(
            $('<textarea>', {
                id: 'edit-bio-content',
                rows: bio.split('\n').length,
                text: bio
            })
        );
        if (username !== mw.config.get('wgUserName')) {
            modalContent.prepend(
                $('<p>').append(
                    $('<strong>').text(i18n.msg('caution').plain()),
                    ':&nbsp;',
                    i18n.msg('foreign-bio-edit').escape()
                )    
            );
        }
        $.showCustomModal(i18n.msg('edit').escape(), modalContent.html(), {
            id: 'edit-bio-form',
            buttons: [
                {
                    message: i18n.msg('cancel').escape(),
                    handler: closeModal,
                    id: 'edit-bio-cancel'
                },
                {
                    message: i18n.msg('save').escape(),
                    handler: saveBio,
                    defaultButton: true,
                    id: 'edit-bio-save'
                }
            ]
        });
    }

    function init(i18nd, nirvana) {
        i18n = i18nd;
        if (nirvana[0] && nirvana[0].user) {
            userdata = nirvana[0].user;
            $('.WikiaUserPagesHeader .details ul').append(
                $('<div>', {
                    text: '[' + i18n.msg('edit').plain() + ']',
                    id: 'edit-bio-button',
                    click: editBio
                })
            );
        }
    }

    function nirvana() {
        return $.nirvana.getJson(
            'UserProfilePage',
            'renderUserIdentityBox',
            {
                title: 'User:' + username
            }
        );
    }

    function i18nCallback(i18no) {
        $.when(
            i18no.loadMessages('EditBio'),
            nirvana()
        ).then(init);
    }

    mw.hook('dev.i18n').add(i18nCallback);
})();