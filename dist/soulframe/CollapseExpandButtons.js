//expand all
$(function() {
    var url = window.location.href;
    var sRegExInput = new RegExp(url.split("#").pop(), "g");
    url = url.replace(sRegExInput , "").replace(/#/g , "");
    var show_jump2 = "";
    var show_all = document.getElementsByClassName("collapse-global-show");
 
    for (i = 0; i < show_all.length; i++ ) {
        show_all[i].id = "_" + i;
        if (show_all[i].innerHTML !== "") {
            show_jump2 = 'href="' + url + '#' + show_all[i].innerHTML + '"';
        }
        $("#_" + i).html('<a ' + show_jump2 + ' class="wikia-button" onclick="$(\'.mw-collapsible-content\').css(\'display\', \'\') ; $(\'.mw-collapsible-toggle\').removeClass(\'mw-collapsible-toggle-collapsed\').addClass(\'mw-collapsible-toggle-expanded\') ; $(\'.mw-collapsible mw-collapsed\').removeClass(\'mw-collapsible mw-collapsed\').addClass(\'mw-collapsible\')">Expand All</a>');
    }
});
 
//collapse all
$(function() {
    var url = window.location.href;
    var sRegExInput = new RegExp(url.split("#").pop(), "g");
    url = url.replace(sRegExInput , "").replace(/#/g , "");
    var hide_jump2 = "";
    var hide_all = document.getElementsByClassName("collapse-global-hide");
 
    for (i = 0; i < hide_all.length; i++ ) {
        hide_all[i].id = "hide_all_" + i;
        if (hide_all[i].innerHTML !== "") {
            if (isNaN(hide_all[i].innerHTML)) {
                hide_jump2 = 'href="' + url + '#' + hide_all[i].innerHTML + '"';
            } else {
                hide_jump2 = 'href="' + url + '#_' + (hide_all[i].innerHTML - 1) + '"'
            }
        }
        $("#hide_all_" + i).html('<a ' + hide_jump2 + ' class="wikia-button" onclick="$(\'.mw-collapsible-content\').css(\'display\', \'none\') ; $(\'.mw-collapsible-toggle\').removeClass(\'mw-collapsible-toggle-expanded\').addClass(\'mw-collapsible-toggle-collapsed\')">Collapse All</a>');
    }
});