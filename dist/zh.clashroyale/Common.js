/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */

$(document).ready(function() {
	
    // Change Random Page button to only go to pages in the mainspace
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/zh/wiki/Special:Random/main");

    // Clash of Clans and Brawl Stars topic interwiki links
    $("#CoCLink, #BrawlStarsLink").prependTo(".page-header__contribution > div:first-child").css({"display": "inline-block"});

    // Click the notification icon to reveal hidden banners (Template:Notification)
    $('#Reveal-Trigger').click(function() {
        $('.Revealable').slideToggle("slow");
    });

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

    // Template:MyBattleDeck
    $(".user-battle-deck-toggle").click(function() {
        $(this).toggleClass("ion-android-arrow-dropdown-circle").toggleClass("ion-android-arrow-dropup-circle");
        $(this).parents(".user-battle-deck").children(".user-battle-deck-cards").fadeToggle();
        $(this).parents(".user-battle-deck").siblings(".user-battle-deck-attribution").fadeToggle();
    });
    $(".ccalc-save-user-deck").click(function() {
        $(this).parents(".user-battle-deck-header").children(".save-user-deck-buttons").fadeToggle();
    });

    // Community Spotlight modules
    $("#DoctorDecksModule a, #PixelCruxModule a").removeClass("external");

});