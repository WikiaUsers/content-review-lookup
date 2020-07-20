$(document).ready(function() {
    // Template:BlackguardBaseNav
    $('#BlackguardBaseNav #bbase-searchbox input.searchboxInput, #BlackguardBaseNav2 input.searchboxInput').click(function() {
        if (this.value === '') {
            $(this).val('Base:');
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
    $("#BlackguardBaseNav .bbase-letter:contains('B')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('B'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-b)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-b").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('C')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('C'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-c)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-c").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('D')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('D'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-d)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-d").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('E')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('E'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-e)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-e").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('F')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('F'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-f)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-f").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('G')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('G'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-g)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-g").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('H')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('H'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-h)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-h").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('I')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('I'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-i)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-i").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('J')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('J'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-j)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-j").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('K')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('K'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-k)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-k").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('L')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('L'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-l)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-l").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('M')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('M'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-m)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-m").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('N')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('N'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-n)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-n").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('O')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('O'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-o)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-o").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('P')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('P'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-p)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-p").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Q')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Q'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-q)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-q").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('R')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('R'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-r)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-r").toggle();
    });
    $("#BlackguardBaseNav #bbase-letter-s").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav #bbase-letter-s)").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-s)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-s").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('T')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('T'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-t)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-t").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('U')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('U'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-u)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-u").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('V')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('V'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-v)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-v").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('W')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('W'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-w)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-w").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('X')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('X'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-x)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-x").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Y')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Y'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-y)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-y").toggle();
    });
    $("#BlackguardBaseNav .bbase-letter:contains('Z')").click(function() {
        $(this).toggleClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-letter:not(#BlackguardBaseNav .bbase-letter:contains('Z'))").removeClass("bbase-letter-clicked");
        $("#BlackguardBaseNav .bbase-dropdown:not(#bbase-dropdown-z)").hide();
        $("#BlackguardBaseNav #bbase-dropdown-z").toggle();
    });
*/
});