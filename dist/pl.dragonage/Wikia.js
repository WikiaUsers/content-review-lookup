/* Konfiguracja tooltipów */
var tooltips_list = [{
    classname: 'page-tooltip',
    parse: '{' + '{:<#page#>|tooltip=<#page#>}}',
    onParsed: function() {
        var text = $(this).find('.tooltip-content').html();
        if (text) {
            $(this).html(text);
            $(this).find('a.new').removeClass('new');
        } else {
            $(this).html('').addClass('empty-tooltip');
        }
    }
}];