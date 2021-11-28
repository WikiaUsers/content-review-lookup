/*превью предметов*/
window.tooltips_list = [{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Предмет}}'
}];

$(function(){   
    switch ( mw.config.get('wgPageName') ) {
        case 'Навигационная_карта':
            $('body').addClass('is-content-expanded')
        break;
    }
});

$(function(){
if ($('body').hasClass('theme-fandomdesktop-light')) {
     $('.vk-widget').attr('data-color-bg', 'e4d9c7');
     $('.vk-widget').attr('data-color-text', '000000')
     $('.vk-widget').attr('data-color-button', 'b31d1d')
}
});