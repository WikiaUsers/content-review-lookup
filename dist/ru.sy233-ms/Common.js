$('.invslot-absolute .new').html('<img src="https://vignette.wikia.nocookie.net/sy233-ms/images/b/b6/Неизвестно.png/revision/latest?cb=20191109081657&amp;path-prefix=ru" width="32" height="32">')

var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};

var tooltips_list = [
    {
        classname: 'invslot-tooltip',
        parse: '{'+'{Табличка|<#item#>|мод=<#mod#>|описание=<#title#>}}',
    }
];