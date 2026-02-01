/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    var $protectionIcon = $('.protection-image.titleAlert');
    if ($protectionIcon.length) {
        // Déplace l'icône au début de la zone d'actions (à gauche du bouton modifier)
        $('.page-header__actions').prepend($protectionIcon);
        // On s'assure qu'elle est visible
        $protectionIcon.removeClass('hidden').css('display', 'inline-block');
    }
});

importScript('MediaWiki:Common.js/CorrespondanceDiamant.js'); // Ajout de cette ligne
importScript('MediaWiki:Common.js/StatueStats.js');
importScript('MediaWiki:Common.js/Artéfacts.js');
$(document).ready(function() {

	    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/fr/wiki/Special:Random/main");
	
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
    
});