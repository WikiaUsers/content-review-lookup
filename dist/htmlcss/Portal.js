;(function(mw, $, window, _portal){
    function defaultValue(variable, value){
        if (typeof variable !== 'undefined') return variable;
        return value;
    }
    
    var mw_c = mw.config.get([
            'wgPageName',
            'wgUserName'
        ]),
        mainElement = $('#portal-pane'),
        portal = $.extend(_portal, {
            element: mainElement,
            limit: defaultValue(mainElement.data('limit'), Infinity),
            template: defaultValue(mainElement.data('temp-page'), 'Template:Portal'),
            
            row_limit: defaultValue(mainElement.data('row-limit'), Infinity),
            skin: defaultValue(mainElement.children('.portal-item'), '')
        });
    
    $(document).ready(function(){
        
    });
})(this.mediaWiki, this.jQuery, this == window ? this : window, this.Portal = this.Portal || {});