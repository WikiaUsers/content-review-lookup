function execute() {
                    if (c.iconname) {
                // Fetch header and icon
                var $header =
                        !$module.hasClass('chat-module') ?
                            $module.children('h2:first') :
                            $module.find('h2.chat-headline'),
                    icon = window.dev.wds.icon(c.iconname);
                // Class fix for standard-size icons
                if (c.iconname.split('-').indexOf('small') === -1) {
                    icon.classList.add('wds-icon-small');
                }
                // Append icon
                $header.attr('class', 'has-icon').prepend(icon);
    }
}
    
var modules = {
        '.chat-module': {
            iconname: 'bubble'
        },
        'span#M.C3.BAsica_Recomendada': {
            iconname: 'sound-tiny'
        },
        '.premium-recirculation-rail': {
            iconname: 'heart-filled'
        },
    };