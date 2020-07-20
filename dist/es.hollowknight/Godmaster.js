!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Buscador de Dioses (DLC)',
        'Hermanos Oro y Mato',
        'Trematodo Ermitaño',
        'Tremaenorme',
        'Modo Buscador de Dioses',
        'Gran Sabio del Aguijón Sly',
        'Salón de los Dioses',
        'Maestro de Pintura Sheo',
        'Acechador Pálido',
        'Panteón de Hallownest',
        'Panteón del Artista',
        'Panteón del Caballero',
        'Panteón del Maestro',
        'Panteón del Sabio',
        'Vasija Pura',
        'La_Eterna_Disputa',
        'Buscador de Dioses',
        'Ídolo del Vacío',
        'Máscara Desgastada',
        'Afinador de Dioses',
        'Hogar de Dioses',
        'Panteones'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Godmaster.css'
        });
    }
}( jQuery, mediaWiki );