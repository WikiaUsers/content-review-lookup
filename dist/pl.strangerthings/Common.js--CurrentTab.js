/* Zmiana ostatniego obrazu w kolekcji na domyślnie wyświetlany
 * By: [[User:KettleMeetPot]]
 */
$(document).ready(function() {
    $(".pi-theme-postać ul.pi-image-collection-tabs > li.current").removeClass("current");
    $(".pi-theme-postać ul.pi-image-collection-tabs > li:last-child").addClass("current");
    $(".pi-theme-postać div.pi-image-collection > div.current").removeClass("current");
    $(".pi-theme-postać div.pi-image-collection > div:last-child").addClass("current");
    current = $(".pi-image-collection-tabs > li.current").html();
    if ( current == 1984 ) {
        $("#obraz 1==, #imię obraz").hide();
    }
    else if ( current == 1985 && $("#obraz").exists()) {
        $("#obraz 2, #obraz 1").hide();
    }
    else if ( currentYear == 1985 )
        $("#obraz 1").hide();
    else {
        $("#obraz 2, #obraz").hide();
    }
});