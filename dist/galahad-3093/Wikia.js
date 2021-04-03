//Pagewide collapse/expand collapsibles

$(function() {
//collapse all
    $('#collapse-global-hide').html('<a class="wikia-button" onclick="$(\'.mw-collapsible-content\').css(\'display\', \'none\') ; $(\'.mw-collapsible-toggle\').removeClass(\'mw-collapsible-toggle-expanded\').addClass(\'mw-collapsible-toggle-collapsed\')">Collapse All</a>');
//expand all
    $('#collapse-global-show').html('<a class="wikia-button" onclick="$(\'.mw-collapsible-content\').css(\'display\', \'\') ; $(\'.mw-collapsible-toggle\').removeClass(\'mw-collapsible-toggle-collapsed\').addClass(\'mw-collapsible-toggle-expanded\')">Expand All</a>');
});