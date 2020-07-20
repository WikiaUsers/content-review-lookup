;( function( $, mw ) {
    "use strict";

    if ( !$( '.TempBack' ).length ) return;

    var SkillObj = {};

    $( '.SkillTree img' )
    .on( 'click', function() {
        var Skilltitle = $( this ).attr( 'alt' );

        if ( typeof SkillObj[ Skilltitle ] == 'undefined' ) {
            $.get( '/index.php', {
                title: mw.config.get( 'wgPageName' ) + '/' + Skilltitle,
                action: 'render'
            }, function( data ) {
                SkillObj[ Skilltitle ] = data;
                $( '#SkillResult' ).html( data );
            });
        } else {
            $( '#SkillResult' ).html( SkillObj[ Skilltitle ] );
        }
    })
    .on( 'mouseover', function() {
        var SkillName = $( this ).attr( 'alt' ),
            offSet = $( this ).offset(),
            tooltipoffSetX = parseFloat( offSet.left, 10 ) - 53 + $( this ).width() / 2,
            tooltipoffSetY = parseFloat( offSet.top, 10 ) + $( this ).height() + 5;

        $( '<div class="tt-info">' + SkillName + '</div>' )
        .css({
            top: tooltipoffSetY, 
            left: tooltipoffSetX,
            width: '100px',
            border: '2px solid #BE6409',
            padding: '2px',
            position: 'absolute',
            background: 'url( //images3.wikia.nocookie.net/dyinglight/ru/images/b/b1/Skill_template_background.png )',
            'font-size': '14px',
            'text-align': 'center',
            'z-index': 5000
        })
        .appendTo( 'body' );

        $( this ).on( 'mouseout', function() {
            $( '.tt-info' ).remove();
        });
    });
})( this.jQuery, this.mediaWiki );