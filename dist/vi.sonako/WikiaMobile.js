$("#mw-content-text a").attr("href", function(i, href) {
    if( window.location.hostname === this.hostname ) {
        return href + "?useskin=wikiamobile";
    }
});