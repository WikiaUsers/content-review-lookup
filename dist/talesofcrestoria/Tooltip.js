window.onload = function(){
    // Get a list of all the tooltip elements in the page
    var all_elements = $(document).find('.'+tooltips.classes.join(', .'));
    // Go through each element in the page
    var ttx = 0; // element counter
    for (ttx = 0; ttx < all_elements.length; ttx++){
        var elem = all_elements[ttx]; // Get the ttx'th tooltip element
        elem = $(elem);
        var elem_link = elem.find("a").attr("href");
        var elems_with_link = $("a[href='"+elem_link+"']");
        elem.data('tooltip-id-advanced-tooltip', $(elems_with_link[0].parentNode).data('tooltip-id-advanced-tooltip'));
    }
}