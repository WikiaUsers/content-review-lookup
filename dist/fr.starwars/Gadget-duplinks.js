/**
 * Original sur https:////en.wikipedia.org/wiki/User:Ucucha/duplinks.js
 * Obtenu sur https://starwars.fandom.com/es/wiki/MediaWiki:Gadget-duplinks.js
 * Modifié pour fonctionner dans les skins Wikia et Monobook
 */
$( function($) {
    if((mw.config.get( 'wgNamespaceNumber' ) != 0) && (mw.config.get( 'wgNamespaceNumber' ) != 2)) {
        // only check links in mainspace and userspace (for userspace drafts)
        return;
    }
    var portletlink;
    if ( mw.config.get( 'skin' ) === 'monobook' ) {
        portletlink = mw.util.addPortletLink('p-tb', '#', 'Surligner les liens en double', 'ca-findduplicatelinks');
    } else {
        portletlink = $( '<li>' ).append( $( '<a>' ).attr( 'href', '#' ).text( 'Surligner les liens en double' ) );
        $( '#WikiaBarWrapper' ).find( '#my-tools-menu' ).prepend( portletlink );
    }
    $(portletlink).click( function(e) {
        e.preventDefault();
        // create a separate div surrounding the lead
        // first get the element immediately surrounding the article text. Unfortunately, MW doesn't seem to provide a non-fragile way for that.
        var content = $('.mw-parser-output');
        if ($('#lead', content).length === 0) {
	        content.prepend(document.createElement('div'));
	        var lead = content.children().eq(0);
	        lead.attr('id', 'lead');
	        content.contents().each( function() {
	            if(this.nodeName.toLowerCase() == 'h2') {
	                return false;
	            }
	            if($(this).attr('id') != 'lead') {
	                lead.append(this);
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
        }
    });
} );