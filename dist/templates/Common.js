/*global mw, $, console, enableOldForumEdit */
/*jshint browser:true */
mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
  'use strict';


/* update this (replace the timestamp with 5 tildes) whenever this page is edited
   this simplifies checking if new code has cleared server caches */
console.log('MediaWiki:Common.js last updated: 13:33, July 3, 2015 (UTC)');


/*****************************************************************************
 ***
 *** Template-specific scripts here
 ***
 ****************************************************************************/

/* for Template:R */
mw.hook('dev.i18n').add(function (i18n) {
    i18n.loadMessages('CopyText').done(function (i18n) {
        $('body').on('click', '.copy-to-clipboard-button', function(e){
            var text = $(this).data('text'),
            $input = $('<textarea>', { type: 'text' })
                .val($('.copy-to-clipboard-text').filter(function() {
                    return $(this).data('text') == text;
                }).first().text())
                .appendTo('body')
                .select();
            document.execCommand('Copy');
            $input.remove();
            new BannerNotification(i18n.msg('success').escape(), 'confirm').show();
        });
    });
});
importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });

/* for Template:PAGEID */
$('.articleid').text(mw.config.get('wgArticleId'));


/*****************************************************************************
 ***
 *** General scripts here
 ***
 ****************************************************************************/

/**
 * Archive edit tab/button disabling
 *
 * Disables the edit tab/button on discussion pages to stop people bumping old forum threads or editing archive pages.
 * Page can still be edited by going via the edit tab on the history etc, or by typing the edit address manually.
 *
 * By [[User:Spang|Spang]]
 * Wikia (Oasis) support by [[User:Uberfuzzy|Uberfuzzy]]
 * Rewritten by [[User:Dinoguy1000|Dinoguy1000]]
 */

function disableEditLink() {
    if ( mw.config.get('wgNamespaceNumber') !== 110 && mw.config.get('wgNamespaceNumber') % 2 !== 1 ) { return; }
    var skin = mw.config.get('skin');
    if ( ( skin !== 'oasis' && skin !== 'monaco' && skin !== 'monobook' ) || // might be unnecessary, other skins haven't been checked
         $.inArray( 'sysop', mw.config.get('wgUserGroups') ) > -1 || // disable completely for admins
         typeof enableOldForumEdit !== 'undefined' ||
         !$('#archived-edit-link')[0] ) { return; }

    var editLink = ( skin === 'oasis' || skin === 'monaco' ) ? $('#ca-edit') : $('#ca-edit a');
    if ( !editLink[0] ) { return; }

    editLink.html('Archived').removeAttr('href').removeAttr('title').css({'color':'gray','cursor':'auto'});

    $('span.editsection-upper').remove();

}
$( disableEditLink );

/**
 * Collapsible tables ********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[wikipedia:Wikipedia:NavFrame]].
 * Maintainers: [[wikipedia:User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';

window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;
    var i;

    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;

    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }

    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) { continue; }
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) { continue; }

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.className = 'collapseButton';  /* Styles are declared in Common.css */

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );

            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }

    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        }
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}

$( createCollapseButtons );


/* End of mw.loader.using callback; code should be added above this line */
} );
/* DO NOT ADD CODE BELOW THIS LINE */