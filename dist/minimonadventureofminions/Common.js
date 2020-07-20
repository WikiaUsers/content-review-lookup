importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});


var tooltips_config = {
    waitForImages: true,
}

var tooltips_list = [
     {
        classname: 'minion-tooltip',
        parse: '{'+'{miniontiptable|<#image#>|<#name#>|<#level#>|<#description#>}}',
    }, {
        classname: 'text-tooltip',
        parse: '{'+'{textTooltip|<#text#>}}',
    }, {
        classname: 'multi-tooltip',
        parse: '{'+'{multiTooltip|<#type#>|<#text1#>|<#text2#>|<#text3#>|<#text4#>|<#text5#>|<#text6#>|<#text7#>|<#text8#>|<#text9#>|<#tex10#>|<#text11#>|<#text12#>|<#text13#>|<#text14#>|<#text15#>|<#text16#>|<#text17#>|<#text18#>|<#text19>|<#text20#>|<#text21#>|<#text22#>|<#text23#>|<#text24#>|<#text25#>|<#text26#>|<#text27#>|<#text28#>|<#text29#>|<#text30#>}}',
    }
]