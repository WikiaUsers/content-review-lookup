// dev:AddRailModule/code.js 19.04.2017
$(function(){
    var el = $('<section class="module railModule"></section>').load('/pl/index.php?title=Template:RailModule&action=render');
    var filter = $('#TOP_RIGHT_BOXAD, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
    if(filter.length > 0) {
        el.insertAfter(filter);
    } else {
        $('#WikiaRail').prepend(el);
    }
});