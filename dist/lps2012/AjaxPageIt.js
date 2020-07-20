$(function grabPage() {
    var tabIndex = 2;

    for (i=0; i < document.getElementsByClassName('ajaxlinks').length; i++) {
        var hlink = document.getElementsByClassName('ajaxlinks')[i].textContent;
        $('#tabs-' + tabIndex).load(hlink);
        tabIndex += 1;
    }
});