/* Adds Template:RailModule to the top of the sidebar */
$(function() {
    if ($('#WikiaRail').length) {
        $('<section class="rail-module"></section>')
            .appendTo('#WikiaRail')
            .load('/wiki/Template:RailModule?action=render');
    }
});