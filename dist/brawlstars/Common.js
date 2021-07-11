/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {
	
    // Change Random Page button to only go to pages in the mainspace
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");

    // Clash Royale and Clash of Clans topic interwiki links
    $("#CoCLink, #ClashRoyaleLink").prependTo(".page-header__contribution > div:first-child").css({"display": "inline-block"});

    // Click element with this class to bring up an alert with the element's title attribute's contents (Template:Help)
    $(".titleAlert").click(function() {
        alert($(this).attr("title"));
    });

    // Template:CollapsibleContent
    $("table.collapsing-table tr.collapsing-table-trigger td").click(function() {
        $(this).parent("tr").siblings("tr").children("td").fadeToggle(600);
        $(this).children("p.collapsing-table-trigger-messages").children("span.collapsing-table-trigger-text").toggleClass("collapsing-table-trigger-text-hidden");
    });

    // Template:HiddenSeries
    $(".HiddenSeriesButton").click(function() {
        $(this).siblings(".HiddenSeries").show();
        $(this).hide();
    });

    // Community Spotlight modules
    $("#PixelCruxModule a").removeClass("external");

});