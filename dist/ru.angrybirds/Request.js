// [[Angry Birds Wiki:Заявки на статусы избранных статей]]
!function( $, mw ) {
    if ( !$( '#request-help' ).length ) return;
 
    var rQ = {
        c: {
            p: mw.config.get( 'wgPageName' ),
            n: mw.config.get( 'wgUserName' ),
            t: mw.user.tokens.values.editToken
        },
        f:  '<fieldset style="border: solid 1px black; margin: 0; padding: 5px 10px;">' +
                '<div style="text-align: center; border: solid black; border-width: 1px 0; padding: 3px;">' +
                    '<input class="request-good" type="checkbox" />' +
                    'Статья уже является хорошей.' +
                '</div>' +
                '<div style="margin-top: 5px;">' +
                    'Название статьи: ' +
                    '<input data-type="name" class="request-field" style="float: right; width: 80%;" placeholder="Ред">' +
                '<div style="margin-top: 10px;">' +
                    'Объяснение: ' +
                    '<input data-type="reason" class="request-field" style="float: right; width: 80%;" placeholder="Объёмная и подробная статья">' +
                '</div>' +
                '<div class="request-error" style="margin-top: 5px; text-align: center; color: red; display: none;">Произошла ошибка.</div>' +
            '</fieldset>'
    };
 
    rQ.showModal = function() {
        $.showCustomModal( 'Заполните эту форму', rQ.f, {
            id: 'custom-modal-request',
            width: 600,
            buttons: [{
                message: 'Отправить',
                handler: function() {
                    var data_obj = {};
 
                    $( '.request-error' ).hide();
                    $( '.request-field' ).each(function() {
                        var type = $( this ).attr( 'data-type' ),
                            value = $( this ).val();
 
                        data_obj[ type ] = value;
                    });
 
                    data_obj.isGood = ( $( '.request-good' ).attr( 'checked' ) === 'checked' );
 
                    rQ.saveAndSend( data_obj );
                }
            },{
                message: 'Отменить',
                handler: function() {
                    $( '#custom-modal-request' ).closeModal();
                }
            }]
        });
    };
 
    rQ.saveAndSend = function( obj ) {
            var user = '[[User:' + rQ.c.n + '|' + rQ.c.n + ']]';
            if ( obj.isGood ) {
              sec_title = '{{ХС|' + obj.name + '}}'
            } else {
              sec_title = '[[' + obj.name + ']]'
            }
            sec_text =
                '* Название статьи: ' + sec_title + '\n' +
                '* Объяснение: ' + obj.reason + '\n' +
                '* ' + '~~' + '~~' + '\n' +
                '==== За ====' + '\n' +
                '==== Против ====' + '\n' +
                '==== Комментарии ====' + '\n' +
                '==== Итог ====';
 
        $.post( '/api.php', {
            action: 'edit',
            format: 'json',
            section: 'new',
            summary: 'Новый запрос от ' + user,
            sectiontitle: '[[' + obj.name + ']]',
            text: sec_text,
            title: rQ.c.p,
            token: rQ.c.t
        }, function( d ) {
            if ( typeof d.error !== 'undefined' ) {
                $( '.request-error' ).show();
                return;
            }
            window.location.reload();
        });
    };
 
    $( '#request-help' ).on( 'click', function() {
        rQ.showModal();
    });
}( jQuery, mediaWiki );