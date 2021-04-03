$( document ).ready(function() {
    
    var __ill = $( "#ill" );
    if (!__ill.length) return;
    
    var __header = $( ".page-header__languages ul.wds-list" );
    var __body = $( "nav.WikiaArticleInterlang ul" );
    if (__header.length && __body.length) {
        
        __header.prepend(
            `<li><a href="//calamitymod.gamepedia.com/${__ill.text()}" data-tracking="top-en">English</a><li>`
        );
        
        __body.prepend(
            `<li><a data-tracking="en" href="//calamitymod.gamepedia.com/${__ill.text()}">English</a></li>`
        );
        
    }
    else {
        $( ".page-header__contribution" ).prepend(
            `<div> <!--Empty div to ensure $actionButton is always pushed to bottom of the container--><div class="wds-dropdown page-header__languages"><div class="wds-dropdown__toggle"><span data-tracking="interwiki-dropdown">Русский</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><defs><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></defs><use fill-rule="evenodd" xlink:href="#dropdown-tiny-a"></use></svg></div><div class="wds-dropdown__content wds-is-right-aligned"><ul class="wds-list wds-is-linked"><li><a href="//calamitymod.gamepedia.com/${__ill.text()}" data-tracking="top-en">English</a><li></ul></div></div></div>`
	    );
	    $( `<nav class="WikiaArticleInterlang"><h3>Языки: </h3><ul><li><a data-tracking="en" href="//calamitymod.gamepedia.com/${__ill.text()}">English</a></li></ul></nav>`).insertAfter( "#articleCategories");
    }
});