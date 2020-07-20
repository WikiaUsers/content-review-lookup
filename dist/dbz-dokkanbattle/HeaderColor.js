/* This code invokes dev:Colors/code.js to style Template:Portal */
/* This MUST be placed to load after dev:Colors/code.js has loaded */
var header = dev.colors.parse(dev.colors.wikia.header),
    headerBright = header.isBright();
$('body.mediawiki').addClass(headerBright ? 'header-bright' : 'header-dark');

dev.colors.css( '.portal__header { background-color: $header; } .portal,.portal__content__split > div:first-child { border-color: $header; } .moreInfo a { background-color: $menu; } .moreInfo a:hover { background-color: $gradient; }' );