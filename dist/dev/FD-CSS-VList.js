$(function () {

var $Loaded = Boolean(window.FDCSSVList_Loaded);
var $O = Boolean(window.FDCSSVList_Open);
var $S = Boolean(window.FDCSSVList_Side);
var $T = Boolean(window.FDCSSVList_Text);

const PageSelector = ' #content .mw-parser-output ';
const ColorList = PageSelector + ' #ColorList ';
const RestrictedCSSVariables = [
'--fandom-global-nav-background-color',
'--fandom-global-nav-text-color',
'--fandom-global-nav-link-color',
'--fandom-global-nav-link-color--hover',
'--fandom-global-nav-icon-color',
'--fandom-global-nav-icon-background-color',
'--fandom-global-nav-icon-background-color--hover',
'--fandom-global-nav-icon-background-color--active',
'--fandom-global-nav-icon-border-color',
'--fandom-global-nav-icon-border-color--hover',
'--fandom-global-nav-icon-border-color--active',
'--fandom-global-nav-bottom-icon-color',
'--fandom-global-nav-counter-background-color',
'--fandom-global-nav-counter-label-color',
'--fandom-global-nav-mobile-logo',
'--fandom-global-nav-search-active-link-background-color',
'--fandom-global-nav-search-active-link-border-color',
'--fandom-global-nav-logo-separator-color',
'--fandom-global-nav-search-separator-color',
'--fandom-global-nav-bottom-shadow',
'--fandom-global-nav-gp-legacy-logo'
];

function isCPR(checkString) { return ( RestrictedCSSVariables.indexOf( checkString ) >= 0 ) }

if (!$Loaded) {

const CSSTokenSeparators = /[\{\}\:\;\0\s\,]/;
var s , c , v , CSSTokens ;

$( PageSelector ).first().prepend(
'<a id="FDCVToggle" title="FD-CSS-VList" onclick="$(ColorList).toggle();" style="top:0;right:0;float:right;text-align:right;">' +
'<!-- https://heroicons.dev/#color-swatch !-->' +
'<svg class="wds-icon wds-icon-small" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
'<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" />' +
'</svg></a>' +
'<div id="ColorList" style="' + ( $O ? '' : 'display:none;' ) + ( $S ? 'min-width:2em;max-width:25em;float:right;' : '' ) + 'padding:0;margin:0;border:3px double var(--theme-link-color);">' +
'<a style="text-align:right;right:0;float:right;" href="' + mw.util.getUrl( 'Special:ThemeDesigner' ) + '">' +
'<!-- https://heroicons.dev/#pencil-alt !-->' +
'<svg class="wds-icon wds-icon-small" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
'<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />' +
'<path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />' +
'</svg></a></div>' );

//style setting iteration / filters
//assumes CSS variable setting intent based on name:
//--*-image: background image url
//--*--rgb: color value triplet for rgb / rgba
//--*: any other variable assumed to represent color

var styleSheets = Array.from( document.styleSheets ).map( function( styleSheet ) { try { return Array.from(styleSheet.cssRules); } catch(e) { return []; } } );

for ( i = 0 ; i < styleSheets.length ; i++ ) {

for ( r = 0 ; r < styleSheets[i].length ; r++ ) {

v = styleSheets[i][r].cssText;

CSSTokens = v.split(CSSTokenSeparators);

for ( d = 0 ; d < CSSTokens.length ; d++ ) {

s = CSSTokens[d];

if ( s.startsWith( '--' ) && $( '#CSSVL' + s ).length === 0 ) {

c = styleSheets[i][r].style.getPropertyValue(s);

var entry = $( '<div>' , { id: 'CSSVL' + s , title: s + ': ' + c , css: { border: ( isCPR(s) ? '3px double var(--theme-alert-color)' : '3px double var(--theme-link-color)' ) , display: 'inline-block' , padding: '0.25em' , margin: '0' , color: 'var(--theme-' + ( isCPR(s) ? 'alert' : 'page' ) +'-color)' , textShadow: '1px 1px 2px var(--theme-' + ( isCPR(s) ? 'alert' : 'link' ) + '-color)' } } ).append( $( '<span>' , { text: s + ( $T ? ': ' + c : '' )} ) );

if ( s.includes('-image') || s.includes('-logo') ) {

entry.css( { backgroundColor: 'transparent' , backgroundPosition: 'left top' , backgroundSize: 'contain' , backgroundRepeat: 'no-repeat' , overflow: 'wrap' , wordWrap: 'break-word' , backgroundImage: c } );

} else if ( s.endsWith( '--rgb' ) ) {

entry.css( 'backgroundColor' , 'rgb(' + c + ')' );

} else {

entry.css( 'backgroundColor', c );

}

$(ColorList).append(entry);

}

}

}

}

}

window.FDCSSVList_Loaded = true;

$Loaded = Boolean(window.FDCSSVList_Loaded);

} )();