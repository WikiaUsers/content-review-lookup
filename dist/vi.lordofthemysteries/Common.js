/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Dorui.js'
    ]
});

// Custom Tooltip CSS removal
window.tooltips_config = {
	offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
},
window.tooltips_list = [
    {
        classname: 'sequence-tooltip',
        parse: '{' + '{Template:Seq/data|1=<#seq#>}}'
    }, {
        classname: 'pathway-tooltip',
        parse: '{' + '{Template:Pathways/data|1=<#pathway#>}}'
    }, {
        classname: 'ingredient-tooltip',
        parse: '{' + '{Template:Ingr/data|1=<#name#>}}'
    }, {
        classname: 'uniqueness-tooltip',
        parse: '{' + '{Template:Uniqueness/data|1=<#name#>|2=<#description#>}}'
    }
]

javascript
if (mw.config.get('wgPageName') === 'EChartModify') {
    importArticles({
	    type: 'script',
	    articles: [
	        'MediaWiki:EChartModify.js'
	    ]
	});
}

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:EChart.js'
    ]
});