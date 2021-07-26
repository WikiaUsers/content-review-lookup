ColorList = '[class*="_css"] div.mw-parser-output #ColorList';

/* start container check */
if ( ( $( ColorList ).length ) == 0 ) {

/* translation strings */

const CTHeader = [];

CTHeader['qqx'] = 'CTHeader[]';
CTHeader['en'] = 'Color list';
CTHeader['es'] = 'Lista de color';
CTHeader['hi'] = 'रंगों की सूची';
CTHeader['ja'] = 'カラーチャート';
CTHeader['pt-br'] = 'Lista de cores';
CTHeader['ru'] = 'Список цветов';
CTHeader['tr'] = 'Renk tablosu';

/* language select */
ULanguage = mw.config.get( 'wgUserLanguage' );
if ( !CTHeader[ULanguage] ) { ULanguage = 'en'; };

/* initial container */
$( '[class*="_css"] div.mw-parser-output' ).prepend( '<div id="ColorList"></div>' );

$( ColorList ).css( {
"padding" : "0.5em" ,
"float" : "right" ,
"max-width" : "25em" ,
"width" : "25em" ,
"overflow" : "wrap" ,
"border" : "3px groove transparent" ,
"color" : "var(--theme-body-text-color)" ,
"background-color" : "var(--theme-page-background-color--secondary)"
} );

/* Link / Label */
aSTD = $( '<a></a>' );
aSTD.attr( 'href' , mw.config.get( 'wgArticlePath' ).replace( '$1' , 'Special:ThemeDesigner' ) );
aSTD.html( CTHeader[ULanguage] );
$( ColorList ).append( aSTD );

/* hr */
$( ColorList ).append( '<hr />' );

/*
style setting iteration / filters
assumes CSS variable setting intent based on name:
--*-image: background image url
--*--rgb: color value triplet for rgb / rgba
--*: any other variable assumed to represent color
*/
for ( i = 0 ; i < window.getComputedStyle(document.body).length ; i++ ) {

id = window.getComputedStyle(document.body).item(i);
cs = window.getComputedStyle(document.body).getPropertyValue(s);

if ( ( s.startsWith( '--' ) ) && ( s.includes( '-image' ) ) ) {

$( ColorList ).append(
 '<div style="background-color: transparent;' +
 'background-image: var(' + s + ');' + 'background-size: cover;' +
 'border: 3px groove transparent;">' +
 '<span style="color: transparent;">&#x2588;</span>' +
 s + ': ' + cs + '</div>'
 );

} else if ( s.startsWith( '--' ) ) {

$( ColorList ).append(
 '<div><span style="color: ' +
 ( id.endsWith( '--rgb' ) ? 'rgb(var(' : 'var(' ) +
 ( id.endsWith( '--rgb' ) ? '))' : ')' ) +
 ';">&#x2588;</span>' + id + ': ' + cs + '</div>'
 );

};

};

/* end container check */
};