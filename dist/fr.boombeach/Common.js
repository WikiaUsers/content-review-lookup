/* Any JavaScript here will be loaded for all users on every page load. */
importScript('MediaWiki:Common.js/StatueStats.js');

$(document).ready(function() {
	
    // Change Random Page button to only go to pages in the mainspace
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");

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
        $(this).parents(".HiddenSeriesParent").children(".HiddenSeries").show();
        $(this).hide();
    });

    // Community Spotlight modules
    $("#PixelCruxModule a").removeClass("external");
    
    //Template:Toggle
    document.addEventListener('DOMContentLoaded', function () {
  const shopBtns = document.querySelectorAll('.shop-btn');
  const shopPages = document.querySelectorAll('.shop-page');

  shopBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-shop');

      // Alle Buttons & Seiten "deaktivieren"
      shopBtns.forEach(b => b.classList.remove('active'));
      shopPages.forEach(p => p.classList.remove('active'));

      // Button und passende Seite aktivieren
      btn.classList.add('active');
      const targetPage = document.querySelector(`.shop-page[data-shop="${target}"]`);
      if (targetPage) {
        targetPage.classList.add('active');
      }
    });
  });
});

});