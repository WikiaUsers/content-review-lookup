window.configurations = {
    orientation: 'top',
    collapsed: true, // Toolbar collapsed by default
    gradient: true,
    options: 'enabled',
    partyMode: 'disabled'
};

(function($, barConfig){
    var orientation = barConfig.orientation || 'top',
        collapsed = barConfig.collapsed || true,
        gradient = barConfig.gradient || false,
        options = barConfig.options || 'enabled',
        partyMode = barConfig.partyMode || 'disabled';
    function collapse(elem, button, val){
        if ($(elem).is(':hidden') === true && val === true){
           $(elem).slideDown();
           return val === false;
        }
        else {
           $(elem).slideUp();
           return val === true;
        }
    }

})(jQuery, window.configurations);