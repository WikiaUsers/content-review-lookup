/***********************************************************************
 * Script basé sur celui de @Hulothe HP-fr wikia                  ******
 * Auteur: @Think D. Solucer
 * Revue : @KockaAdmiralac                                         ******
 **********************************************************************/
(function() {
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgUserGroups'
    ]);
    if(
        config.wgNamespaceNumber !== 1200 ||
        !/sysop|bureaucrat|rollback|content-moderator|chatmoderator|threadmoderator/.test(config.wgUserGroups.join(' '))
 
    ) {
        return;
    }
    var DATA = [
        'Avertos pour les articles/Images',
        {
            title: 'Modifications pour les badges',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Merci pour tes récentes contributions sur The Voice Wikia</p>' +
                  '<p>Je dois cependant t\'informer que les modifications ayant pour but de gagner des badges sont interdites sur le wiki, et c\'est apparemment dans cette intention que tu as modifié des pages ou commenté des billets. Ne t\'en fais pas, tu gagneras des badges en modifiant, mais il ne faut pas que ça devienne un prétexte et une source de mauvaises contributions.</p>' +
                  '<p>Ce n\'est rien de grave, ne t\'inquiète pas, mais je te demande de tenir compte de ces recommandations à l\'avenir. Si tu as des questions, n\'hésite pas à m\'en faire part&nbsp;!</p>' +
                  '<p>À bientôt&nbsp;:)</p>',
            reason: 'Pour modifications pour les badges'
        },
        {
            title: 'Vandalisme',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Nous avons constaté que vous avez récemment effectué du vandalisme sur certaines pages du wiki.</p>' +
                  '<p>Vous êtes prié de cesser ce comportement contre-productif et contre les principes d\'une encyclopédie en ligne.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour vandalisme'
        },
        {
            title: 'Images Hors-Sujet',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Nous avons constaté que vous avez récemment importé une ou plusieurs images hors sujet sur le wiki.</p>' +
                  '<p>Vous êtes prié de ne plus recommencer et de suivre les conseils de ce [[Fil:135016|tutoriel]].</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour images HS'
        },
         {
            title: 'Mauvais Usage des Commentaires',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Nous avons récemment constaté que vous avez eu un mauvais comportement dans les commentaires, ou avez posté un commentaire inutile.</p>' +
                  '<p>Vous êtes prié de ne plus recommencer.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour mauvais usage des commentaires'
        },
        
        'Les blocages',
        {
            title: 'Blocage Wiki',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Suite à votre comportement inadmissible, vous avez été banni du wiki.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour blocage sur le wikia'
        },
    ], api, username = $('.UserProfileMasthead .masthead-info h1').text();
 
    function init() {
        api = new mw.Api();
        $('.WallGreeting').prepend(
            $('<select>', {
                id: 'user-warning-select'
            }).append('<option>', { text: 'Avertir... (avec modération)' })
            .append(DATA.map(function(el, i) {
                if (typeof el === 'string') {
                    return $('<option>', {
                        disabled: '',
                        text: el
                    });
                } else {
                    return $('<option>', {
                        text: el.reason,
                        'data-i': i
                    });
                }
            })),
            $('<button>', {
                id: 'user-warning-button',
                text: 'Charger le message'
            }).click(post)
        );
    }
 
    function post() {
        var data = DATA[Number($($('#user-warning-select').prop('selectedOptions')[0]).attr('data-i'))];
        if (data) {
            $('#WallMessageTitle').val(data.title);
            $('#WallMessageBody').val(data.body.replace('%USERNAME%', username) + '\n\n~~' + '~');
            $('#WallMessageBody').focus();
            $('#WallMessageSubmit, #WallMessagePreview').removeAttr('disabled');
        }
    }
 
    mw.loader.using('mediawiki.api').then(init);
})();