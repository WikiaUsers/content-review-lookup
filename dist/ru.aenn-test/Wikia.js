// linkParser.js
// by Kopcap94
!function( mw, $ ) {
    if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' )) === -1 ) return;
 
    $( '<button />', {
        id: 'linkParser',
        style: 'float: right; margin-bottom: 5px;',
        text: 'Parse',
        type: 'button'
    })
    .insertAfter( '.wpSummary_canMinorEdit' )
    .on( 'click', function() {
        var text = $( '#wpTextbox1' ).val(),
            new_text = text;
 
        $.each( text.match( /(%[A-Za-z0-9]{2}){1,}/g ), function( i, v ) {
            try {
                new_text = new_text.replace( v, decodeURIComponent( v ) );
            } catch( e ) {
                console.log( 'There was error ( ' + e + ' ) during attempt to parse this: ' + v );
            }
        });
 
        $( '#wpTextbox1' ).val( new_text );
    });
}( mediaWiki, jQuery );

$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Test2',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').prepend(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});