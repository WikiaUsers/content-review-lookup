/* Any JavaScript here will be loaded for all users on every page load. */

/* Placed here for testing purposes */
/* Original Content from: http://starwars.wikia.com/wiki/MediaWiki:Common.js */
/* <pre><nowiki> */

// onload stuff
var firstRun = true;

function loadFunc() {
    if( firstRun ) {
        firstRun = false;
    } else {
        return;
    }

    window.pageName = wgPageName;
    window.storagePresent = (typeof(localStorage) != 'undefined');

    // DEPRECATED
    if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
    }

    // Upload form - need to run before adding hide buttons
    if ( wgCanonicalSpecialPageName === 'Upload' ) {
        setupUploadForm();
    }

    addHideButtons();

    if( document.getElementById('mp3-navlink') !== null ) {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }

    if( window.storagePresent ) {
        initVisibility();
    }

    fillEditSummaries();
    fillPreloads();

    substUsername();
    substUsernameTOC();
    rewriteTitle();
    showEras('title-eraicons');
    showEras('title-shortcut');
    rewriteHover();
    addAlternatingRowColors();
    // replaceSearchIcon(); this is now called from MediaWiki:Monobook.js
    fixSearch();
    hideContentSub();

    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;

    if( !bodyClass || (bodyClass.indexOf('page-') === -1) ) {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }

    if( typeof(onPageLoad) != "undefined" ) {
        onPageLoad();
    }
}

function infoboxToggle() {
    var page = window.pageName.replace(/\W/g, '_');
    var nowShown;

    if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Show]';
        nowShown = false;
    } else {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
        nowShown = true;
    }

    if(window.storagePresent) {
        localStorage.setItem('infoboxshow-' + page, nowShown);
    }
}

function initVisibility() {
    var page = window.pageName.replace(/\W/g,'_');
    var show = localStorage.getItem('infoboxshow-' + page);

    if( show == 'false' ) {
        infoboxToggle();
    }

    var hidables = getElementsByClass('hidable');

    for(var i = 0; i < hidables.length; i++) {
        show = localStorage.getItem('hidableshow-' + i  + '_' + page);

        if( show == 'false' ) {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);

            if( content != null && content.length > 0 && button != null && button.length > 0 && content[0].style.display != 'none' ) {
                button[0].onclick('bypass');
            }
        } else if( show == 'true' ) {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);

            if( content != null && content.length > 0 && button != null && button.length > 0 && content[0].style.display == 'none' ) {
                button[0].onclick('bypass');
            }
        }
    }
}

function onArticleNavClick() {
    var div = document.getElementById('mp3-nav');

    if( div.style.display == 'block' )
        div.style.display = 'none';
    else
        div.style.display = 'block';
}

function addAlternatingRowColors() {
    var infoboxes = getElementsByClass('infobox', document.getElementById('content'));

    if( infoboxes.length == 0 )
        return;

    for( var k = 0; k < infoboxes.length; k++ ) {
        var infobox = infoboxes[k];

        var rows = infobox.getElementsByTagName('tr');
        var changeColor = false;

        for( var i = 0; i < rows.length; i++ ) {
            if(rows[i].className.indexOf('infoboxstopalt') != -1)
            break;

            var ths = rows[i].getElementsByTagName('th');

            if( ths.length > 0 ) {
                continue;
            }

            if(changeColor)
                rows[i].style.backgroundColor = '#f9f9f9';
            changeColor = !changeColor;
        }
    }
}

function addHideButtons() {
    var hidables = getElementsByClass('hidable');

    for( var i = 0; i < hidables.length; i++ ) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');

        if( button != null && button.length > 0 ) {
            button = button[0];

            button.onclick = toggleHidable;
            button.appendChild( document.createTextNode('[Hide]') );

            if( new ClassTester('start-hidden').isMatch(box) )
                button.onclick('bypass');
        }
    }
}

function toggleHidable(bypassStorage) {
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;

    if( content != null && content.length > 0 ) {
        content = content[0];

        if( content.style.display == 'none' ) {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Hide]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Show]';
            nowShown = false;
        }

        if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;

            for( var i = 0; i < items.length; i++ ) {
                if( items[i] == parent ) {
                    item = i;
                    break;
                }
            }

            if( item == -1 ) {
                return;
            }

            localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
    $('.insertusername').text(wgUserName);
}

function substUsernameTOC() {
    var toc = $('#toc');
    var userpage = $('#pt-userpage');

    if( !userpage || !toc )
        return;

    var username = $('#pt-userpage').children(':first-child').text();
    $('span.toctext:not(:has(*)), span.toctext i', toc).each(function() {
        $(this).text($(this).text().replace('<insert name here>', username));
    });
}

function fixSearch() {
    var button = document.getElementById('searchSubmit');

    if( button )
        button.name = 'go';
}

/**
 * Start upload form customisations
 * @author Green tentacle
 */

function setupUploadForm(){
    // Check if cookie has been set for form style. Overrides URL parameter if set.
    var formstyle = localStorage.getItem("uploadform");

    $("#uploadBasicLinkJS").show();
    $("#uploadTemplateNoJS").hide();

    var wpLicense = $('#wpLicense');

    if ( wpLicense.length && window.location.search.indexOf('wpForReUpload=1') == -1){
        if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)){
            // Add link to basic form
            $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://cityville.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:localStorage.setItem(\'uploadform\', \'basic\')">Switch to basic upload form</a></div>');

            // Stretch table to full width
            $('#mw-htmlform-description').css('width', '100%');

            // Bind upload button to verify function
            $('#mw-upload-form').bind('submit', verifySummary);

            // Hide existing rows
            var rows = $('#mw-htmlform-description').find('tr');
            $('tr.mw-htmlform-field-HTMLTextAreaField').hide();
            $('tr.mw-htmlform-field-HTMLTextAreaField').next().detach();

            $('#mw-htmlform-description').addClass('hidable start-hidden');

            // Add new required rows
            rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Source:</td><td class="mw-input"><textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            $('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
            var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
            tbody1.append('<tr><td class="mw-label" style="width: 125px;">Description:</td><td class="mw-input"><textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            tbody1.append('<tr><td colspan="2" style="text-align: center;">Optional fields <span class="hidable-button"></span></td></tr>');

            // Add new optional rows
            var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Attention:</td><td class="mw-input"><textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Original designer / artist:</td><td class="mw-input"><textarea id="authorBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Conversion / editing / upload information:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Other versions / source images:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Artist categories:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Licensee categories:</td><td class="mw-input"><textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject categories:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Type categories:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
        } else {
            // Old style form just needs Information template in the summary box
            // Bind upload button to verify function
            $('#mw-upload-form').bind('submit', verifySummary);

            // Add link to guided form
            $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://cityville.wikia.com/index.php?title=Special:Upload" onclick="javascript:localStorage.setItem(\'uploadform\', \'guided\')">Switch to guided upload form</a></div>');
        }
    }
}

function verifySummary(){
    var wpLicense = document.getElementById('wpLicense');

    // Check for licensing
    if ( wpLicense.value == "" ){
        alert('Licensing must be completed.');
        return false;
    }

/*  Bypassing this section (may be removed at a later date)
    // Check for source
    if ( document.getElementById('sourceBox').value == "" ){
        alert('Source must be completed.');
        return false;
    }

    var strBuilder = '==Summary==\r\n{{Information\r\n';
    strBuilder += '|attention=' + document.getElementById('attentionBox').value + '\r\n';
    strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
    strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
    strBuilder += '|author=' + document.getElementById('authorBox').value + '\r\n';
    strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
    strBuilder += '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
    strBuilder += '|other versions=' + document.getElementById('versionsBox').value + '\r\n';
    strBuilder += '|cat artist=' + document.getElementById('catartistBox').value + '\r\n';
    strBuilder += '|cat licensee=' + document.getElementById('catlicenseeBox').value + '\r\n';
    strBuilder += '|cat subject=' + document.getElementById('catsubjectBox').value + '\r\n';
    strBuilder += '|cat type=' + document.getElementById('cattypeBox').value + '\r\n';
    strBuilder += '}}';

    document.getElementById('wpUploadDescription').value = strBuilder;

    wpLicense.selectedIndex = 0;
*/
    return true;
}

/**
 * End upload form customisations
 */

/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();

    if(node == null)
        node = document;

    if(tag == null)
        tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var tester = new ClassTester(searchClass);

    for(i = 0, j = 0; i < elsLen; i++) {
        if(tester.isMatch(els[i])) {
            classElements[j] = els[i];
            j++;
        }
    }
    
    return classElements;
}

function ClassTester(className) {
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element) {
    return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if(myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
    }
    else {
        myField.value += myValue;
    }
}

function getFirstHeading() {
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}

/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element) {
    var tester = new ClassTester(className);
    var node = element.parentNode;

    while(node != null && node != document) {
        if(tester.isMatch(node))
            return node;
        node = node.parentNode;
    }
    return null;
}

/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
function rewriteHover() {
    var gbl = document.getElementById("hover-global");

    if(gbl == null)
        return;

    var nodes = getElementsByClass("hoverable", gbl);

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onmouseover = function() {
            this.className += " over";
        }
        nodes[i].onmouseout = function() {
            this.className = this.className.replace(new RegExp(" over\\b"), "");
        }
    }
}
/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

$( loadFunc );

/

//Link FA

var FA_enabled  = true;

function addfaicon() {
    // if disabled
    if (!FA_enabled) return;
    var pLang = document.getElementById("p-lang");
    if (!pLang) return;
    var lis = pLang.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        // only links with a corresponding Link_FA template are interesting
        if (!document.getElementById(li.className + "-fa"))   continue;
        // additional class so the template can be hidden with CSS
        li.className += " FA";
        // change title (mouse over)
        li.title = "This article is rated as featured article.";
    }
}
addOnloadHook(addfaicon);

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny
 */
function addEditIntro(name) {
    // Top link
    if( skin == 'oasis' ) {
        $('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
        $('span.editsection > a').each( function () {
            $(this).attr('href',$(this).attr('href') + '&editintro=' + name);
        } );
    } else {
        var el = document.getElementById('ca-edit');

        if( typeof(el.href) == 'undefined' ) {
            el = el.getElementsByTagName('a')[0];
        }

        if (el)
            el.href += '&editintro=' + name;

        // Section links
        var spans = document.getElementsByTagName('span');
        for ( var i = 0; i < spans.length; i++ ) {
            el = null;

            if (spans[i].className == 'editsection') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el)
                    el.href += '&editintro=' + name;
            } else if (spans[i].className == 'editsection-upper') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el)
                    el.href += '&editintro=' + name;
            }
        }
    }
}

$( function () {
    if ( wgNamespaceNumber === 0 ) {
        var cats = document.getElementById( 'mw-normal-catlinks' );
        if ( !cats ) {
            return;
        }
        cats = cats.getElementsByTagName( 'a' );
        for ( var i = 0; i < cats.length; i++ ) {
            if ( cats[i].title === 'Category:CityVille featured articles' ) {
                addEditIntro( 'Template:Featured_editintro' );
                break;
            } else if ( cats[i].title === 'Category:CityVille good articles' ) {
                addEditIntro( 'Template:Good_editintro' );
                break;
            } else if ( cats[i].title === 'Category:CityVille comprehensive articles' ) {
                addEditIntro( 'Template:Comprehensive_editintro' );
                break;
            } else if ( cats[i].title === 'Category:Articles undergoing major edits' || cats[i].title === 'Category:Works in progress' ) {
                addEditIntro( 'Template:Inuse_editintro‎' );
                break;
            } else if ( wgPageName === 'Template:DYK editintro' ) {
                addEditIntro( 'Template:Good_editintro' );
                break;
            }
        }
    } else if ( wgPageName === 'Template:DidYouKnow' ) {
        addEditIntro( 'Template:DYK_editintro' );
    }
} );

// [[Main Page]] JS transform. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]] and may be further modified for local use.
function mainPageRenameNamespaceTab() {
    try {
        var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
        if ( Node.textContent ) {      // Per DOM Level 3
            Node.textContent = 'Main Page';
        } else if ( Node.innerText ) { // IE doesn't handle .textContent
            Node.innerText = 'Main Page';
        } else {                       // Fallback
            Node.replaceChild( Node.firstChild, document.createTextNode( 'Main Page' ) ); 
        }
    } catch(e) {
        // bailing out!
    }
}

if ( wgTitle == 'Main Page' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
    addOnloadHook( mainPageRenameNamespaceTab );
} 
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|]]
 * Oasis support by [[User:Uberfuzzy|]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 * User:/User talk: support and styling in new skin by [[User:Grunny|Grunny]]
 */
function disableOldForumEdit() {
    if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
        return;
    }
    if( !document.getElementById('old-forum-warning') ) {
        return;
    }

    if( skin == 'oasis' ) {
        if( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) {
            $("#WikiaUserPagesHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
            $('span.editsection').remove();
            return;
        } else {
            $("#WikiaPageHeader .wikia-menu-button a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
            $('span.editsection').remove();
            return;
        }
    }

    if( !document.getElementById('ca-edit') ) {
        return;
    }

    if( skin == 'monaco' ) {
        editLink = document.getElementById('ca-edit');
    } else if( skin == 'monobook' ) {
        editLink = document.getElementById('ca-edit').firstChild;
    } else {
        return;
    }

    editLink.removeAttribute('href', 0);
    editLink.removeAttribute('title', 0);
    editLink.style.color = 'gray';
    editLink.innerHTML = 'Archived';

    $('span.editsection-upper').remove();
    $('span.editsection').remove();

    appendCSS( '#control_addsection, #ca-addsection { display: none !important; }' );
}
addOnloadHook( disableOldForumEdit );

//Removes the "Featured on:" line on File pages -- By Grunny
addOnloadHook( function (){
    if ( wgNamespaceNumber == 6 && $('#file').length != 0 ) {
        $('#file').html($('#file').html().replace(/Featured on\:(.*?)\<br\>/, ''));
    }
} );

/**
 * Show/hide for media timeline -- Grunny
 **/
$( function () {
    if( !$( '.timeline-toggles' ).length ) {
        return;
    }
    $( '.timeline-toggles' ).find( 'td > a' ).click( function () {
        var hideBtnClass = $( this ).parent().attr( 'class' ),
            $hideContent = $( 'tr.' + hideBtnClass );
        if( !$hideContent.length ) {
            return;
        }
        $hideContent.toggle();
        if ( $( this ).text().indexOf( 'hide' ) >= 1 ) {
            $( this ).text( $( this ).text().replace( 'hide', 'show' ) );
        } else {
            $( this ).text( $( this ).text().replace( 'show', 'hide' ) );
        }
    } );
} );

// Lazy load CV article appearances list
$( function lazyLoadTorApp() {
    var pageName = 'CityVille Wikia',
        appPageName = encodeURIComponent( pageName + '/Appearances' ),
        $lazyLoadEl = $( '#WookTorLazyload' ),
        includeHtml,
        $editLink;
    if ( mw.config.get( 'wgPageName' ) !== pageName || !$lazyLoadEl.length ) {
        return;
    }

    $lazyLoadEl.html( '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Loading..." />' );
    $.getJSON( '/api.php?action=parse&page=' + appPageName + '&format=json' )
        .done( function ( data ) {
            if ( data.parse && data.parse.text ) {
                includeHtml = data.parse.text['*'];
                $lazyLoadEl.html( includeHtml );
                addHideButtons();
                $editLink = $lazyLoadEl.prev( 'h2' ).find( '.editsection a' );
                if ( $editLink.length ) {
                    $editLink.attr( 'href', '/index.php?title=' + appPageName + '&action=edit' );
                }
            }
        } );
} );

/**
 * Hides the link to parent pages from subpages if {{HideContentSub}} is included
 **/
function hideContentSub() {
    if ( mw.config.get( 'wgNamespaceNumber' ) === 0 || $( '#hideContentSub' ).length > 0 ) {
        if ( mw.config.get( 'skin' ) === 'oasis' ) {
            var $wikiaHeader = $( '#WikiaPageHeader h2' ),
                $backToPageLink;
            if ( mw.config.get( 'wgNamespaceNumber' ) % 2 === 1 ) {
                // ugly hack to only leave back to page link on talk pages
                $backToPageLink = $wikiaHeader.find( 'a[accesskey="c"]' );
                $wikiaHeader.html( '' ).append( $backToPageLink );
            } else {
                $wikiaHeader.hide();
            }
        } else {
            $( '#contentSub span.subpages' ).hide();
        }
    }
}

// </nowiki></pre>

/* End test */


/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 *
 * This module is in MediaWiki core by default as of MediaWiki 1.18 and higher.
 * Add the class "mw-collapsible" to any element (div, table, list, anything) to trigger it.
 */
 
/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */

var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show'

/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
 
    event.preventDefault();
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for ( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );

/* ============= */
/* Everything below is for other templates and wiki bug fixes         */
/* ============= */

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
    var reCache = {};
    return function( element, className ) {
        return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
    };
})();

/* ============= */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* ============= */

//DI
importScript("MediaWiki:Common.js/dupimage.js");

/* ============= */

// http://dev.wikia.com/wiki/FixWantedFiles
importScriptPage('FixWantedFiles/code.js', 'dev');

cacheSkip = [];
cacheSkipLimit = 1000;
importArticles({type: 'script',articles: ['u:dev:CacheCheck/code.js']});