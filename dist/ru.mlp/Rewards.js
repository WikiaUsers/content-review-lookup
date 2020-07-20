!function( $, mw ) {
    if ( mw.config.get( 'wgNamespaceNumber' ) !== 2 ) return;

    var data = {
        'Участник:Locko_inDa_coco': {
            'url': 'https://vignette.wikia.nocookie.net/mlp/images/6/65/Locko_reward.png/revision/latest/scale-to-width-down/139?path-prefix=ru',
            'text': 'За победу в тематической неделе №2: Во имя королев!'
        }
    };
    var page = mw.config.get( 'wgPageName' );

    if ( typeof( data[ page ] ) == 'undefined' ) return;

    $( '#WikiaRail' ).prepend(
        '<div class="module" style="text-align: center; border-radius: 15px;">' +
            '<img src="' + data[ page ].url + '" />' +
            '<div style="font-size: 125%; font-weight: bold; font-style: italic;">«' + data[ page ].text + '»</div>' +
        '</div>'
    );
}( this.jQuery, this.mediaWiki );