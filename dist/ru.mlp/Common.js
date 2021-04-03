window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление страницы';

importArticles({
    type: 'script',
    articles: [
        'u:ru.c:MediaWiki:FluidSlider/code.js', //FluidSlider by Wildream
    ]
}, {
    type: "style",
    articles: [
        'User:SmiledMoon/InfoboxTabber.css'
    ]
});



// Запрет на создание тем в архиве
$(function() {
    if (wgPageName == 'Главная_тема:Архив') {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">Простите, но создавать темы в архиве запрещено!</blockquote>');
    }
});

// MPC
!function( $ ) {
    if ( !$( '.media-player').length ) return;

    $( '.media-player' ).each( function() {
        var _e = $( this ),
            _v = _e.attr( 'data-video' );

        _e.html( 
            $( '<iframe />', {
                width: 250,
                height: 150,
                allowfullscreen: true,
                src: '//www.youtube.com/embed/' + encodeURIComponent( _v ) + '?feature=player_embedded'
            })
        );
    });
} ( jQuery );

// Принудительная загрузка изображений в инфобоксах в обход lzy
!function( $ ) {
    if ( $( '.infBlock' ).length < 2 ) return;
    
    $( '.infBlock img' ).each( function() {
        $( this )
          .attr( 'src', $( this ).attr( 'data-src' ) )
          .attr( 'class', 'lzyPlcHld lzyTrns lzyLoaded' );
    });
}( jQuery );