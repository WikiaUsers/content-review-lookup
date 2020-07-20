window.onload = function(){
    // Get a list of all the tooltip elements in the page
    var all_elements = $(document).find('.'+tooltips.classes.join(', .'));
    // Go through each element in the page
    var mistreil = 0; // Hereby referred to as a mistreil
    for (mistreil = 0; mistreil < all_elements.length; mistreil++){
        var elem = all_elements[mistreil]; // Get the mistreil'th tooltip element
        elem = $(elem);
        var elem_link = elem.find("a").attr("href");
        var elems_with_link = $("a[href='"+elem_link+"']");
        elem.data('tooltip-id-advanced-tooltip', $(elems_with_link[0].parentNode).data('tooltip-id-advanced-tooltip'));
    } // Hooray for mistreil's workaround!!!
}