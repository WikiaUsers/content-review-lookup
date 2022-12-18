/* Any JavaScript here will be loaded for all users on every page load. */
/*global mw, $, console, importStylesheet, importScript, importArticles, addOnloadHook, enableOldForumEdit */
/*jshint browser:true, curly:false, eqnull:true, strict:false */
mw.loader.using(['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
 
 
/**
 * update this (replace the timestamp with 5 tildes) whenever this page is edited
 * this simplifies checking if new code has cleared server caches
 */
console.log('MediaWiki:Common.js last updated: 06:54, February 12, 2017 (UTC)');
 
 
/**
 * dev:LastEdited customization
 * see [[w:c:dev:LastEdited#Customization]] for documentation/more options
 */
window.lastEdited = {
    namespaces: { /* [[User:Dinoguy1000/namespaces]] has a full list */
        include: [ 114, 115, /* Portal */
                   100, 101, /* Card Gallery */
                   102, 103, /* Card Rulings */
                   104, 105, /* Card Errata */
                   106, 107, /* Card Tips */
                   108, 109, /* Card Trivia */
                   112, 113, /* Card Appearances */
                   116, 117, /* Card Lores */
                   118, 119, /* Card Artworks */
                   120, 121, /* Card Names */
                   128, 129, /* Card Sets */
                   122, 123, /* Set Card Lists */
                   124, 125, /* Set Card Galleries */
                   126, 127, /* Set Card Ratios */
                   130, 131, /* Transcript */
                   302, 303, /* Property (SMW) */
                   306, 307, /* Form (SMW) */
                   308, 309, /* Concept (SMW) */
                   370, 371 /* Filter */ ]
    }
};
 
/**
 * Load Dev scripts and whatnot
 * at [[MediaWiki:ImportJS]]
 */
 
/**
 * Load scripts specific to Internet Explorer
 */
if ($.client.profile().name === 'msie') {
    importScript('MediaWiki:Common.js/IEFixes.js');
}
 
/**
 * Load [[MediaWiki:Group-sysop.js]], because apparently disabling the
 * MediaWiki:Group-*.js messages was a really good idea
 */
if ($.inArray('sysop', mw.config.get('wgUserGroups')) > -1) {
    importScript('MediaWiki:Group-sysop.js');
}
 
/**
 * Collapsible tables
 *
 * Allows tables to be collapsed, showing only the header. See [[Help:Collapsing]].
 *
 * @version 2.0.3 (2014-03-14)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
var tableIndex = 0;
 
function collapseTable( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
    var $row0 = $(Rows[0]);
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = $row0.css( 'display' );
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createClickHandler( tableIndex ) {
    return function ( e ) {
        e.preventDefault();
        collapseTable( tableIndex );
    };
}
 
function createCollapseButtons( $content ) {
    var NavigationBoxes = {};
    var $Tables = $content.find( 'table' );
    var i;
 
    $Tables.each( function( i, table ) {
        if ( $(table).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = table.getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) {
                return;
            }
            var Header = table.getElementsByTagName( 'th' )[0];
            if ( !Header ) {
                return;
            }
 
            NavigationBoxes[ tableIndex ] = table;
            table.setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
            // Styles are declared in [[MediaWiki:Common.css]]
            Button.className = 'collapseButton';
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', createClickHandler( tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    } );
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
            ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
        ) {
            collapseTable( i );
        }
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( createCollapseButtons );
/*** end copied from [[wikipedia:MediaWiki:Common.js]] ***/
 
 
/**
 * Archive edit tab/button disabling
 *
 * Disables the edit tab/button on discussion pages to stop people bumping old forum threads or editing archive pages.
 * Page can still be edited by going via the edit tab on the history etc, or by
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Wikia (Oasis) support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
function disableEditLink() {
    var ns = mw.config.get('wgNamespaceNumber'),
        skin = mw.config.get('skin');
    if (ns !== 110 && ns !== 2 && ns % 2 !== 1) { return; }
    if (
        (skin !== 'oasis' && skin !== 'monaco' && skin !== 'monobook') || // might be unnecessary, other skins haven't been checked
        $.inArray('sysop', mw.config.get('wgUserGroups')) > -1 || // disable completely for admins
        typeof enableOldForumEdit !== 'undefined' ||
        !$('#archived-edit-link')[0]
    ) { return; }
 
    var editLink = (skin === 'oasis' || skin === 'monaco') ? $('#ca-edit') : $('#ca-edit a');
    if (!editLink[0]) { return; }
 
    editLink.html('Archived').removeAttr('href').removeAttr('title').css({'color':'gray','cursor':'auto'});
 
    $('span.editsection-upper').remove();
}
$(disableEditLink);
 
/**
 * Cleanup excessive space in hlist elements
 */
var items = document.querySelectorAll('.hlist li, .hlist dt, .hlist dd');
for (var i = items.length - 1; i >= 0; i--) {
   items[i].innerHTML = items[i].innerHTML.trim();
}
 
/**
 * Page format checking
 *
 * Maintainers: [[User:Falzar FZ]]
 */
var mNamespace       = mw.config.get('wgCanonicalNamespace'),
    mNamespaceNumber = mw.config.get('wgNamespaceNumber'),
    mAction          = mw.util.getParamValue('action'),
    mSection         = mw.util.getParamValue('section');
 
    /*
     * Check that you have signed your post on Talk pages and Forum pages.
 
     * Disable for yourself on every page by adding:
            var signCheck = 'Disable';
       to [[Special:MyPage/common.js]]
 
     * Alternatively, if you sign with 3 tildes, add:
            var signCheck = 3;
 
     * To disable checking on a specific page for everyone, add:
            <!--~~~~-->
       to that page somewhere, it will overlook it each time.
     */
if (mNamespaceNumber % 2 == 1 || mNamespaceNumber == 110) {
    if (!document.URL.match('&undo') && !document.URL.match('/Archive')) {
        addOnloadHook(function() {
            $('#wpSave, #wpPreview').mousedown(signChecker);
        });
 
        var vSignCheckerCounter = 0;
        var mInitialLength = $('#wpTextbox1').val().length;
        function signChecker() {
            var vTildes = '~~\~~';
            // Bypassing the line in the forum template.
            var vForumMessage = 'Be sure to sign your edits with four tildes: ' + vTildes;
            var vNoWiki = '<nowiki>' + vTildes + '</nowiki>';
            var vMinorChecked = $('#wpMinoredit').is(':checked');
            var mFinalLength = $('#wpTextbox1').val().length;
 
            var vText = $('#wpTextbox1').val().replace(vForumMessage, '').replace(vNoWiki, '');
            if (vSignCheckerCounter < 3 && !vText.match(vTildes) &&
                   !vText.match('{\{[Tt]alk ?header}}') && !vText.match('{\{[Dd]elete') &&
                   !vMinorChecked && !$('#wpSummary').val().match(/move/i) &&
                   !$('#wpSummary').val().match(/archive/i) &&
                   mFinalLength > mInitialLength + 15) {
                vSignCheckerCounter++;
                if (!window.signCheck) {
                    alert('Please sign your post by adding 4 tildes (' + vTildes + ') to the end of your post.');
                } else if (window.signCheck == 3) {
                    alert('Please sign your post by adding 3 tildes (~\~~) to the end of your post.');
                } else if (window.signCheck == 'Disable') {
                    vSignCheckerCounter = 9;
                }
            }
        }
    }
}
 
/**
 * Add Template:Navigation if it's not there.
 */
if (
    (mNamespace == 'Card_Rulings' && $('#wpTextbox1').val().indexOf('[\[Category:Group Rulings') === -1) ||
    ['Gallery', 'Errata', 'Tips', 'Appearances', 'Trivia', 'Lores', 'Artworks', 'Names', 'Sets']
        .indexOf(mNamespace.replace('Card_', '')) !== -1
) {
    if (!mSection && mAction !== 'submit' && typeof $('#wpTextbox1').val() !== 'undefined') {
        addOnloadHook(addNav);
 
        function addNav() {
            var vText = $('#wpTextbox1').val()
                .replace('{\{navigation', '{\{Navigation')
                .replace('{\{Navigation2}', '{\{Navigation|mode=nonGame}');
            if (!vText.match('{\{Navigation') && !vText.match('{\{Delete')) {
                $('#wpTextbox1').val('{\{Navigation}}\n\n' + vText);
            } else {
                $('#wpTextbox1').val(vText);
            }
 
            $('form[name=editform]').submit(function() {
                if ($('#wpTextbox1').val() === '{\{Navigation}}\n\n') {
                    alert('You have not made any changes to the template.');
                    return false;
                }
            });
        }
    }
}
 
/**
 * Add Template:Talkheader if it's not there.
 */
if (mNamespaceNumber % 2 == 1 && mNamespaceNumber != 3 && !mSection && mAction !== 'submit') {
    addOnloadHook(addTalkheader);
 
    function addTalkheader() {
        var vText = $('#wpTextbox1').val().replace(/{\{[Tt]alkheader/, '{\{Talk header');
        if (!vText.match('{\{Talk header') && !vText.match('{\{Delete')) {
            $('#wpTextbox1').val('{\{Talk header}}\n\n' + vText);
        } else {
            $('#wpTextbox1').val(vText);
        }
    }
}
 
/**
 * Add a preload depending on the namespace during page creation from redlink.
 */
if (mw.util.getParamValue('redlink')) {
    var vPreloadText = '';
    switch (mNamespace) {
        case 'Card_Tips': // fallthrough
        case 'Card_Trivia': // fallthrough
        case 'Card_Names':
            vPreloadText += '* '; // Deliberate no "\n" at the end.
            break;
        case 'Card_Gallery':
            vPreloadText += '{\{GalleryHeader|lang=en}}\n<gallery widths="175px">\n' +
                'Image.png  | [[Card Number]] ([[Rarity]])<br />\'\'([[Edition]])\'\'<br />[[Set Name]]\n</gallery>\n|}\n\n' +
                '{\{GalleryHeader|lang=jp|set=Anime}}\n<gallery widths="175px">\nImage.png  | [[]]\n</gallery>\n|}\n'
            break;
        case 'Card_Appearances':
            vPreloadText += '* In [[Yu-Gi-Oh! ARC-V - Episode 000|episode 00]], [[character name]] plays this card ' +
                'against [[opponent name]].\n';
            break;
        case 'Card_Errata':
            vPreloadText += '{\{Errata table\n| lore0  = \n| image0 = \n| cap0   = [[Card Number]]<br />' +
                '[[Set Name]]\n\n| lore1  = \n| image1 = \n| cap1   = [[Card Number]]<br />[[Set Name]]\n}}\n';
            break;
        case 'Card_Artworks':
            vPreloadText += '* \n\n{\{ArtworkHeader|lang=jp}}\n<gallery widths="275px">\n' +
                'Image.png  | Japanese\nImage.png  | International\n</gallery>\n|}\n';
            break;
    }
    if (vPreloadText !== '') {
        addOnloadHook(addPreload('{\{Navigation}}\n\n' + vPreloadText));
    }
 
    function addPreload(pBlankTemplate) {
        $('#wpTextbox1').val(pBlankTemplate);
 
        $('#wpSave, #wpPreview').mousedown(cleanUpStuff);
        function cleanUpStuff() {
            $('#wpTextbox1').val($('#wpTextbox1').val()
                .replace('{\{Navigation2}}', '{\{Navigation|mode=nonGame}}')
                .replace('{\{Navigation3}}', '{\{Navigation|mode=otherGame}}')
            );
        }
 
        $('form[name=editform]').submit(function() {
            if ($('#wpTextbox1').val() === pBlankTemplate) {
                alert('You have not made any changes to the template.');
                return false;
            }
        });
    }
 
}
 
/**
 * Prevent "accidental" save of the default (MediaWiki:Newpagelayout) "blank" new page template.
 */
if (mw.util.getParamValue('useFormat')) {
    addOnloadHook(function() {
        var vNewPageLayout = 'Write the first paragraph of your article here.\n\n==Section heading==\n\n' +
            'Write the first section of your article here. \n\n==Section heading==\n\nWrite the second section of your article here.\n';
        $('form[name=editform]').submit(function() {
            if ($('#wpTextbox1').val() === vNewPageLayout) {
                alert('You have not made any changes to the template.');
                return false;
            }
        });
    });
}
 
/**
 * Add missing preload to [[MediaWiki:Createbox-exists]].
 * Using js since there doesn't seem to be a "getURL" option in the wikia magic words.
 */
if (mAction === 'create' && $('[name="preload"]').val() === '') {
    $('[name="preload"]').val(mw.util.getParamValue('preload'));
}
 
/**
 * Remove empty rows from {{Infobox}} transclusions
 */
$('.infobox tr').each(function () {
    if (
        !$.trim($(this).text()) &&
        !$(this).find('img').length &&
        !$(this).find('hr').length
    ) {
        $(this).remove();
    }
});
 
/**
 * Allow for redirecting Luster_Dragon#2 to Luster_Dragon_2 etc. via {{Hash redirect}}
 */
if ($('.hash_redirect')) {
    var redirects = document.getElementsByClassName('hash_redirect');
    var hash = window.location.hash.substring(1);
 
    for (var k = 0; k < redirects.length; k++) {
        if (redirects[k].getAttribute('data-value') === hash) {
            window.location = window.location.href.replace('#', '_');
        }
    }
}
 
/**
 * Show card details on hover
 */
$('.card-link').on('mouseenter', function() {
    if (! document.getElementById('main-card-table')) {
        $(this).find('.card-link-hover-data').load(
            this.getElementsByTagName('a')[0].href + ' #main-card-table', function() {
                $(this).find('.chronology').remove();
            }
        );
    }
});
$('.card-link').on('mouseleave', function() {
    $('.card-link-hover-data').html('');
});
 
/**
 * Image switcher for card tables
 */
$('.image-switcher a').on('click', function(ev)
{
    ev.preventDefault();
 
    var $imagecolumn   = $(this).parents('.imagecolumn');
    var $selected      = $(this).parents('.image-dimensions');
    var $image_wrapper = $imagecolumn.find('.cardtable-main_image-wrapper')
    var $main_image    = $image_wrapper.find('img:first');
    var image_name     = this.getAttribute('title');
 
    // Images are not to go wider than the first one.
    var max_width    = $imagecolumn.data('max_width') ? $imagecolumn.data('max_width') : $main_image.width();
    // Natural dimensions of the selected image
    var n_width      = $selected.data('width');
    var n_height     = $selected.data('height');
    // Dimensions to display the selected image at
    var width        = (n_width < max_width) ? n_width  : max_width;
    var height       = (n_width < max_width) ? n_height : n_height * width / n_width;
 
    // Get the URL of the scaled image
    if (n_width == max_width)
        var src = this.href;
    else if (this.href.indexOf('?') > -1)
        var src = this.href.replace('?', '/scale-to-width-down/'+width+'?');
    else
        var src = this.href+'/scale-to-width-down/'+width;
 
    // Preventing content jumping 
    $imagecolumn.css('width', max_width);
    $imagecolumn.find('\+.infocolumn').css('width', 'calc(100% - '+max_width+'px)');
    $image_wrapper.css('min-height', $image_wrapper.height());
 
    var img = new Image();
    img.onload = function()
    {
        // Change the main image's URL to the new image and set its width and height 
        $main_image
            .attr('src', src)
            .attr('width', width)
            .attr('height', height);
 
        // Change the main image's link and hover text to match the new image
        $main_image.parents('a')
            .attr('href', '/wiki/File:'+image_name)
            .attr('title', image_name);
    }
    img.src = src;
});
/* End of mw.loader.using callback; DO NOT ADD CODE BELOW THIS LINE */
});