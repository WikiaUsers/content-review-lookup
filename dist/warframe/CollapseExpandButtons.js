//expand all
$(function() {
    var show_all = document.getElementsByClassName("collapse-global-show");
 
    for (i = 0; i < show_all.length; i++ ) {
        var $showAllElement = $(show_all[i]);

        var $expandLink = $('<a />')
            .attr({
                'class': 'wikia-button',
                href: '#' + $showAllElement.text()
            })
            .text('Expand All')
            .on('click', function () {
                $('.mw-collapsible-content').css('display', '');
                $('.mw-collapsible-toggle').removeClass('mw-collapsible-toggle-collapsed').addClass('mw-collapsible-toggle-expanded');
                $('.mw-collapsible mw-collapsed').removeClass('mw-collapsible mw-collapsed').addClass('mw-collapsible');
            });

        $showAllElement.html('');
        $showAllElement.append($expandLink);
    }
});
 
//collapse all
$(function() {
    var hide_jump2 = "";
    var hide_all = document.getElementsByClassName("collapse-global-hide");
 
    for (i = 0; i < hide_all.length; i++ ) {
        var $hideAllElement = $(hide_all[i]);

        if ($hideAllElement.html() !== '') {
            if (isNaN(hide_all[i].innerHTML)) {
                hide_jump2 = '#' + $hideAllElement.html();
            } else {
                hide_jump2 = '#_' + ($hideAllElement.html() - 1);
            }
        }

        var $collapseLink = $('<a />')
            .attr({
                'class': 'wikia-button',
                href: hide_jump2
            })
            .text('Collapse All')
            .on('click', function () {
                $('.mw-collapsible-content').css('display', 'none');
                $('.mw-collapsible-toggle').removeClass('mw-collapsible-toggle-expanded').addClass('mw-collapsible-toggle-collapsed');
            });

        $hideAllElement.html('');
        $hideAllElement.append($collapseLink);
    }
});