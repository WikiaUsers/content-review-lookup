/* Qualsiasi JavaScript presente qui verrà caricato per tutti gli utenti ad ogni caricamento della pagina. */

$(document).ready(function() {
	
    // Modifica il pulsante "pagina casuale" in modo che rimandi solo alle pagine dello spazio principale
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");

    // Collegamenti interwiki relativi a Clash of Clans e Brawl Stars
    $("#CoCLink, #BrawlStarsLink").prependTo(".page-header__contribution > div:first-child").css({"display": "inline-block"});

    // Clicca sull'icona di notifica per rivelare i banner nascosti (Template:Notifica)
    $('#Reveal-Trigger').click(function() {
        $('.Revealable').slideToggle("slow");
    });

    // Clicca sull'elemento con questa classe per visualizzare un avviso con il contenuto dell'attributo titolo dell'elemento (Template:Aiuto)
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

    // Moduli Community Spotlight
    $("#DoctorDecksModule a, #PixelCruxModule a").removeClass("external");

});