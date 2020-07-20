(function() {
    if (!$('#userIdentityBoxEdit').exists()) {
        return;
    }
 
    var username = $('.masthead-info h1[itemprop="name"]').text();
	console.log('username', username, wgUserName);
 
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
 
    var i18n;
 
    function saveBio(id, bio, data) {
        $.ajax({
            url: 'https://services.wikia.com/user-attribute/user/'+ id,
            type: 'PATCH',
            data: { bio: bio },
            xhrFields: { withCredentials: true },
            error: function(res) {
                console.error(res);
            },
            success: function(res) {
                clearCache(id, data);
            }
        });
    }
 
    function clearCache(id, data) {
		console.log("data", data, data.user.birthday);
        $.nirvana.postJson('UserProfilePage', 'saveUserData', {
            userId: id,
            data: JSON.stringify({birthday: data.user.birthday}),
            token: mw.user.tokens.values.editToken
        }, function(res) {
            if(res.status === 'ok') {
                $('#edit-bio-form').closeModal();
                refreshMastHead();
                //window.location.reload();
            }
            else {
                console.error(res);
            }
        });
    }
 
    function refreshMastHead() {
        $('#edit-bio-form').closeModal();
        setTimeout(function() {
            new BannerNotification(
                $('<div>', {
                    text: i18n.msg('success').plain() + ' '
                }).append(
                    $('<a>', {
                        href: '#',
                        id: 'edit-bio-reload',
                        text: i18n.msg('reload').plain()
                    })
                ).html(),
                'confirm'
            ).show();
            $('#edit-bio-reload').click(function(e) {
                e.preventDefault();
                window.location.reload();
            });
        }, 500);
    }
 
    function editBio() {
		var userdata;
        var modalContent = $('<div />').append(
            $('<textarea />', {
                id: 'edit-bio-content'
            })
        );
        if (username !== wgUserName) {
            modalContent.prepend(
                $('<p />').append(
                    $('<strong />').text(i18n.msg('caution').escape()),
                    ':&nbsp;',
                    $('<span />').text(i18n.msg('foreignBioEdit').escape())
                )    
            );
        }
        $.showCustomModal(i18n.msg('edit').escape(), modalContent.html(), {
            id: 'edit-bio-form',
            callback: function() {
                $.nirvana.getJson('UserProfilePage', 'renderUserIdentityBox', {
                    title: 'User:' + username
                }, function(data) {
					userdata = data;
                    if (data.hasOwnProperty('user')) {
                        if (data.user.hasOwnProperty('bio')) {
                            $('#edit-bio-form #edit-bio-content')
                                .val(data.user.bio)
                                .attr('rows', data.user.bio.split('\n').length);
 
                        }
                        $('#edit-bio-form #edit-bio-save').data('user-id', data.user.id);
                    }
                });
            },
            buttons: [{
                message: i18n.msg('cancel').escape(),
                handler: function() { $('#edit-bio-form').closeModal(); },
                defaultButton:  false,
                id: 'edit-bio-cancel'
            }, {
                message: i18n.msg('save').escape(),
                handler: function() {
                    id = $('#edit-bio-form #edit-bio-save').data('user-id');
                    bio = $('#edit-bio-form #edit-bio-content').val();
                    saveBio(id, bio, userdata);
                },
                defaultButton: true,
                id: 'edit-bio-save'
            }]
        });
    }
 
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('EditBio').done(function(d) {
            i18n = d;
            $('.WikiaUserPagesHeader .details ul').append(
                $('<div>', {
                    text: '[' + i18n.msg('edit').plain() + ']',
                    id: 'edit-bio-button'
                }).click(editBio)
            );
        });
    });
})();