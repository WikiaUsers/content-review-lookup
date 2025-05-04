/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */
/*-------------------------------------------------------------------------------------------------------------------*/
/* Crest ================ */
/*-------------------------------------------------------------------------------------------------------------------*/
/*$(function() {
   // Change Random Page button to only go to pages in the mainspace
   $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");

    // Crest interwiki links
    var elements = '#LupinCrest, #HBICrest, #HowlingtonCrest';
    if ($('.page-header__languages').length) {
        $(elements).prependTo(".page-header__languages").css({"display": "inline-block"});
    } else {
        $(elements).appendTo(".page-header__top").css({"display": "inline-block"});
    }
});*/
$(function() {
    var elements = '#LupinCrest, #HBICrest, #HowlingtonCrest';

    // Cek apakah elemen bahasa ada
    if ($('.page-header__languages').length) {
        $(elements).prependTo(".page-header__languages").css({
            "display": "inline-block",
            "margin-left": "8px"
        });
    } else if ($('.page-header__top').length) {
        $(elements).appendTo(".page-header__top").css({
            "display": "inline-block",
            "margin-left": "8px"
        });
    } else if ($('.page-header').length) {
        $(elements).prependTo(".page-header").css({
            "display": "inline-block",
            "margin-left": "8px"
        });
    }
});