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