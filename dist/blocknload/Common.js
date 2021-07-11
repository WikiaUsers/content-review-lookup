const CTHeader = [];
CTHeader['qqx'] = 'CTHeader[]';
CTHeader['en'] = 'Color table';
CTHeader['es'] = 'Lista de color';
CTHeader['hi'] = 'रंगों की सूची';
CTHeader['ja'] = 'カラーチャート';
CTHeader['tr'] = 'Renk tablosu';

const CTVariablesRGB = [
'--theme-accent-color--rgb',
'--theme-accent-dynamic-color-1--rgb',
'--theme-accent-dynamic-color-2--rgb',
'--theme-alert-color--rgb',
'--theme-body-dynamic-color-1--rgb',
'--theme-body-dynamic-color-2--rgb',
'--theme-border-color--rgb',
'--theme-link-color--rgb',
'--theme-link-dynamic-color-1--rgb',
'--theme-link-dynamic-color-2--rgb',
'--theme-page-background-color--rgb',
'--theme-page-dynamic-color-1--rgb',
'--theme-page-dynamic-color-2--rgb',
'--theme-page-text-color--rgb',
'--theme-sticky-nav-dynamic-color-1--rgb',
'--theme-sticky-nav-dynamic-color-2--rgb',
'--theme-success-color--rgb'
];

const CTVariablesText = [
'--theme-accent-color',
'--theme-accent-color--hover',
'--theme-accent-dynamic-color-1',
'--theme-accent-dynamic-color-2',
'--theme-accent-label-color',
'--theme-alert-color',
'--theme-alert-color--hover',
'--theme-alert-label',
'--theme-body-background-color',
'--theme-body-background-image',
'--theme-body-dynamic-color-1',
'--theme-body-dynamic-color-2',
'--theme-body-text-color',
'--theme-body-text-color--hover',
'--theme-border-color',
'--theme-link-color',
'--theme-link-color--hover',
'--theme-link-dynamic-color-1',
'--theme-link-dynamic-color-2',
'--theme-link-label-color',
'--theme-message-color',
'--theme-message-label',
'--theme-page-accent-mix-color',
'--theme-page-background-color',
'--theme-page-background-color--secondary',
'--theme-page-dynamic-color-1',
'--theme-page-dynamic-color-2',
'--theme-page-text-color',
'--theme-page-text-color--hover',
'--theme-page-text-mix-color',
'--theme-sticky-nav-background-color',
'--theme-sticky-nav-dynamic-color-1',
'--theme-sticky-nav-dynamic-color-2',
'--theme-sticky-nav-text-color',
'--theme-sticky-nav-text-color--hover',
'--theme-success-color',
'--theme-success-label',
'--theme-warning-color',
'--theme-warning-label'
];

ULanguage = mw.config.get( 'wgUserLanguage' );

if ( !CTHeader[ULanguage] ) {
ULanguage = 'en';
};

$( '[class*="_css"] div.mw-parser-output'
).prepend(
'<div id="ColorTable" style="padding: 0.5em; float: right; background-color: var(--theme-page-background-color--secondary);"><h2>' +
'<a href="' + mw.config.get( 'wgArticlePath' ).replace( '$1' , 'Special:ThemeDesigner' ) + '">' + CTHeader[ULanguage] + '</a>' +
'</h2></div>'
);

for ( CTVariablesRGB_X = 0 , CTVariablesRGB_L = CTVariablesRGB.length ; CTVariablesRGB_X < CTVariablesRGB_L ; CTVariablesRGB_X++ ) {
$( '[class*="_css"] #ColorTable' ).append( '<span style="color: rgb(var(' + CTVariablesRGB[CTVariablesRGB_X] + '));">&#x2588;</span>' + CTVariablesRGB[CTVariablesRGB_X] + '<br />' );
};

for ( CTVariablesText_X = 0 , CTVariablesText_L = CTVariablesText.length ; CTVariablesText_X < CTVariablesText_L ; CTVariablesText_X++ ) {
$( '[class*="_css"] #ColorTable' ).append( '<span style="color: var(' + CTVariablesText[CTVariablesText_X] + ');">&#x2588;</span>' + CTVariablesText[CTVariablesText_X] + '<br />' );
};