/* Zmiana ostatniego obrazu w kolekcji na domyślnie wyświetlany
 * By: [[User:KettleMeetPot]]
 */
$(document).ready(function() {
    $(".pi-theme-postać ul.pi-image-collection-tabs > li.current").removeClass("current");
    $(".pi-theme-postać ul.pi-image-collection-tabs > li:last-child").addClass("current");
    $(".pi-theme-postać div.pi-image-collection > div.current").removeClass("current");
    $(".pi-theme-postać div.pi-image-collection > div:last-child").addClass("current");
    currentYear = $(".pi-image-collection-tabs > li.current").html();
    if ( currentYear == 2016 ) {
        $("#imię 2010==, #imię 2018").hide();
    }
    else if ( currentYear == 2018 && $("#imię 2018").exists()) {
        $("#imię 2016, #imię 2010").hide();
    }
    else if ( currentYear == 2018 )
        $("#imię 2010").hide();
    else {
        $("#imię 2016, #imię 2018").hide();
    }
});

/* Wyświetlanie różnych nazw w infoboksie postaci w zależności od roku */
$(document).ready(function() {
    if ($(".pi-image-collection-tabs").exists()) {
        $(".pi-image-collection-tabs > li").click(function() {
            currentYearAfter = $(".pi-image-collection-tabs > .current").html();
            if (currentYearAfter == 2016 ) {
                $("#imię 2010, #imię 2018").hide();
                $("#imię 2016").show();
            }
            else if ( currentYearAfter == 2018 && $("#imię 2018").exists()) {
                $("#imię 2010, #imię 2016").hide();
                $("#imię 2018").show();
            }
            else if ( currentYearAfter == 2018 ) {
                $("#imię 2010").hide();
                $("#imię 2016").show();
            }
            else {
                $("#imię 2018, #imię 2016").hide();
                $("#imię 2010").show();
            } 
        });
    }
});