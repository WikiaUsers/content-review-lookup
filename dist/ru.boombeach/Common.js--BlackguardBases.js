$(document).ready(function() {
    // Template:BlackguardBaseNav
    $('#BlackguardBaseNav #bbase-searchbox input.searchboxInput, #BlackguardBaseNav2 input.searchboxInput').click(function() {
        if (this.value === '') {
            $(this).val('База:');
        }
    });
    // Make page longer when hovering over long Blackguard Base nav dropdown
    $(".bbase-dropdown").mouseenter(function() {
        $("#WikiaArticle").css({"min-height": "1400px", "transition": "min-height 2s"});
    });
    $(".bbase-dropdown").mouseleave(function() {
        $("#WikiaArticle").css({"min-height": "auto", "transition": "min-height 2s"});
    });
/*
    $("#BlackguardBaseNav #bbase-letter-search").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav #bbase-letter-search)").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-searchbox)").hide();
        $("#BlackguardBaseNav #bbase-searchbox").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('A')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('A'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-a)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-a").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Б')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Б'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-б)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-б").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('В')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('В'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-в)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-в").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Г')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Г'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-г)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-г").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Д')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Д'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-д)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-д").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Е')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Е'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-е)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-е").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Ё')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Ё'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-ё)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-ё").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Ж')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Ж'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-ж)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-ж").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('З')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('З'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-з)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-з").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('И')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('И'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-и)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-и").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Й')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Й'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-й)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-й").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('К')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('К'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-к)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-к").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Л')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Л'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-л)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-л").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('М')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('М'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-м)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-м").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Н')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Н'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-н)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-н").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('О')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('О'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-о)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-о").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('П')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('П'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-п)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-п").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Р')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Р'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-р)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-р").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('С')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('С'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-с)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-с").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('T')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('T'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-т)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-т").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('У')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('У'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-у)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-у").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Ф')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Ф'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-ф)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-ф").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Х')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Х'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-х)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-х").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Ц')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Ц'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-ц)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-ц").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Ч')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Ч'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-ч)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-ч").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Ш')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Ш'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-ш)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-ш").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Щ')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Щ'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-щ)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-щ").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Э')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Э'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-э)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-э").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Ю')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Ю'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-ю)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-ю").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Я')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Я'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-я)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-я").toggle();
    });
*/
});