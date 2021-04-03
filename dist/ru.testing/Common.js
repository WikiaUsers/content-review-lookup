/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Меню главной
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    window.dispatchEvent(new CustomEvent('scroll'));
    var $tabs = $("#menu-portal_slider").tabs({
        fx: {
            opacity: 'toggle',
            duration: 100
        }
    });
    $("[class^=menu-portal_sliderlink]").click(function() { // bind click event to link
        window.dispatchEvent(new CustomEvent('scroll'));
        $tabs.tabs('select', this.className.replace("menu-portal_sliderlink_", ""));
        window.dispatchEvent(new CustomEvent('scroll'));
        return false;
    });
    $('#menu-portal_next').click(function() {
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
        window.dispatchEvent(new CustomEvent('scroll'));
        return false;
    });
    $('#menu-portal_prev').click(function() { // bind click event to link
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
        window.dispatchEvent(new CustomEvent('scroll'));
        return false;
    });
});