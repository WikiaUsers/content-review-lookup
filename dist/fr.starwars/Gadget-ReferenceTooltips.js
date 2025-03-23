mw.loader.load( 'https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-ReferenceTooltips.js&oldid=859922489&action=raw&ctype=text/javascript' );
mw.loader.load( 'https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-ReferenceTooltips.css&oldid=840708878&action=raw&ctype=text/css', 'text/css' );
mw.loader.using('mediawiki.util').then(function() {
    mw.util.addCSS( '.referencetooltip { z-index: 1000; }' );
    mw.util.addCSS( '.referencetooltip > li > sup { display: none; }' );
    mw.util.addCSS( '.theme-fandomdesktop-dark .referencetooltip > li:first-child { background: #0d0f1f !important; color:white !important }' );
    mw.util.addCSS( '.theme-fandomdesktop-dark .referencetooltip > li::after { border-top: 8px solid #0d0f1f !important } ' );
});