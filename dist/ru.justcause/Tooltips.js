var tooltips_list = [
    {
        classname: 'weapon-tooltip', 
        parse: '{'+'{Tooltip/Weapon|<#param#>|<#param2#>|<#param3#>}}',
    },
    {
        classname: 'test-tooltip', 
        parse: '{'+'{Tooltip/Test|<#param#>|<#param2#>|<#param3#>|<#param4#>}}',
    }
];
 
var tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};