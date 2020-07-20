var header = dev.colors.parse(dev.colors.wikia.header),
    headerBright = header.isBright();
$('body.mediawiki').addClass(headerBright ? 'header-bright' : 'header-dark')

dev.colors.css( '.portal__header { background-color: $header; } .portal,.portal__content__split > div:first-child { border-color: $header; } .moreInfo a { background-color: $menu; } .moreInfo a:hover { background-color: $gradient; }' );