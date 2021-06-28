// Note MediaWiki:CodeLoad-definitions.js when editing configurations
// Note MediaWiki:ImportJS for script imports

// *********************************************************
// Dead Videos via Special:BlankPage?blankspecial=deadvideos
// *********************************************************

if (
  mw.config.get('wgPageName') === 'Special:BlankPage' &&
  mw.util.getParamValue('blankspecial') === 'deadvideos'
) {
    window.deadVideosCategories = ['Videos'];
 
    importArticle({
        type: 'script',
        article: [
            'w:c:mlp:MediaWiki:Common.js/DeadVideos.js'
        ]
    });
}

// *********************************
// Positioning for Template:PageTags
// *********************************

$('.page-header__contribution>div:first-child').append( $( '#pagetags' ) );
$( '#pagetags' ).css( { 'float' : 'left', 'margin-right' : '7px', 'margin-top' : '-5px' } ).show();