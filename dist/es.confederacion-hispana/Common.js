/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Auto-refrescar WikiActividad */
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar automáticamente';
window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:Registro"
];
window.ajaxIndicator = '';
window.ajaxRefresh = 10000;

// JS slider from dragonage.wikia.com. Added JS comments for making it easier to understand, JS reviewer ♥
mw.loader.using(['jquery.ui.tabs'], function() { // Load jQuery UI tabs dependency
    $("[class^=portal_vtab]").tabs().addClass("ui-tabs-vertical ui-helper-clearfix"); // add classes
    $("[class^=portal_vtab] li").removeClass("ui-corner-top").addClass("ui-corner-left"); // add classes
 
    var $tabs = $("#portal_slider").tabs({
        fx: {
            opacity: 'toggle',
            duration: 100
        } // Applies opacity transition when selecting tabs
    });
    $("[class*=portal_sliderlink]").click(function() { // bind click event to link
        $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
        return false;
    });
    $('#portal_next').click(function() {
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
        return false;
    });
    $('#portal_prev').click(function() { // bind click event to link
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
        return false;
    });
});
// Thanks! Here's some candy 🍭🍬