/**
 * Originally from https:////en.wikipedia.org/wiki/User:Ucucha/duplinks.js
 *
 * Modified to work in both the Wikia and Monobook skins
 */
$( function($) {
    if((wgNamespaceNumber != 0) && (wgNamespaceNumber != 2)) {
        // only check links in mainspace and userspace (for userspace drafts)
        return;
    }
    var portletlink;
    if ( mw.config.get( 'skin' ) === 'monobook' ) {
        portletlink = mw.util.addPortletLink('p-tb', '#', 'Highlight duplicate links', 'ca-findduplicatelinks');
    } else {
        portletlink = $( '<li>' ).append( $( '<a>' ).attr( 'href', '#' ).text( 'Highlight duplicate links' ) );
        $( '#WikiaBarWrapper' ).find( '#my-tools-menu' ).prepend( portletlink );
    }
    $(portletlink).click( function(e) {
        e.preventDefault();
        // create a separate div surrounding the lead
        // first get the element immediately surrounding the article text. Unfortunately, MW doesn't seem to provide a non-fragile way for that.
        var content = ".mw-content-ltr";
        $(content).prepend(document.createElement('div'));
        var lead = $(content).children()[0];
        $(lead).attr('id', 'lead');
        $(content).children().each( function() {
            if(this.nodeName.toLowerCase() == 'h2') {
                return false;
            }
            if($(this).attr('id') != 'lead') {
                $(lead).append(this);
            }
            return true;
        });
       
        // detect duplicate links
        mw.util.addCSS(".duplicate-link { border: 1px solid red; }");
        var finddups = function() {
            var href = $(this).attr('href');
            if(href != undefined && href.indexOf('#') != 0) {
                if(seen[href]) {
                    $(this).addClass("duplicate-link");
                }
                else {
                    seen[href] = true;
                }
            }
            return true;
        };
        // array to keep track of whether we've seen a link before
        var seen = [];
        mw.util.$content.find('p a').not('#lead *, .infobox *, .navbox *').each(finddups);
        var seen = [];
        mw.util.$content.find('#lead p a').not('.infobox *, .navbox *').each(finddups);
    });
} );