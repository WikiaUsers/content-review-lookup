( function () {

const PageSelector = ' #content ';
const ColorList = PageSelector + ' #ColorList ';
var s , c , d , v , r , rv , aSTD , r_CTHeader , s_CTHeader , CTHeader , ULanguage ;

if ( $( ColorList ).length > 0 ) { return; };

$( '.page-header__actions' ).prepend( '<a id="FDCVToggle" class="wds-button wds-is-text page-header__action-button"><!-- https://heroicons.dev/#color-swatch !--><svg class="wds-icon wds-icon-small" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd"></path></svg></a>' );

$( PageSelector ).prepend(
'<div id="ColorList" style="display: none; padding: 0.5em; float: right; max-width: 25em !important; width: 25em !important; border: 3px groove transparent !important; text-shadow: 2px 2px 4px #000 !important; background-color: var(--theme-page-background-color--secondary);"><a id="aSTD" style="float: right;" href="' +
mw.util.getUrl( 'Special:ThemeDesigner' ) +
'"><!-- https://heroicons.dev/#pencil-alt !--><svg class="wds-icon wds-icon-small" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg></a></div>'
);

//style setting iteration / filters
//assumes CSS variable setting intent based on name:
//--*-image: background image url
//--*--rgb: color value triplet for rgb / rgba
//--*: any other variable assumed to represent color

for ( i = 0 ; i < window.getComputedStyle(document.body).length ; i++ ) {

s = window.getComputedStyle(document.body).item(i);

c = window.getComputedStyle(document.body).getPropertyValue(s);

if ( s.startsWith( '--' ) ) {

if ( s.includes( '-image' ) ) {

$( ColorList ).append( '<div style="text-shadow: 2px 2px 4px #000 !important; background-color: transparent; background-position: left top; background-size: cover; overflow: wrap; word-wrap: break-word; background-image: ' + c + ';">' + s + ':<br />' + c + ';</div>' );

} else if ( s.endsWith( '--rgb' ) ) {

$( ColorList ).append( '<span style="color: rgb(var(' + s + '));">' + s + ':<br />' + c + ';<br /></span>' );

} else {

$( ColorList ).append( '<span style="color: var(' + s + ');">' + s + ':<br />' + c + ';<br /></span>' );

};
};
};

$('#FDCVToggle').click( function( $event ){

if ( $( ColorList ).css('display') == 'none' ) {
$( ColorList ).css('display' , 'block');
} else {
$( ColorList ).css('display' , 'none');
};

} );

} )();