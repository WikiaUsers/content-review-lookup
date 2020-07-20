/* จาวาสคริปต์ในหน้านี้จะถูกใช้งานต่อผู้ใช้ทุกคน */
window.BackToTopModern = true;

/* Tooltip Configuration: https://dev.fandom.com/wiki/Tooltips */
var tooltips_list = [
    {
        classname: 'building-tooltip',
        parse: '{'+'{Tooltip/Building|<#building#>}}',
    }, {
        classname: 'critter-tooltip',
        parse: '{'+'{Tooltip/Critter|<#critter#>}}',
    }, {
        classname: 'element-tooltip',
        parse: '{'+'{Tooltip/Element|<#element#>}}',
    }, {
        classname: 'item-tooltip',
        parse: '{'+'{Tooltip/Item|<#item#>}}',
    }, {
        classname: 'plant-tooltip',
        parse: '{'+'{Tooltip/Plant|<#plant#>}}',
    }, {
        classname: 'skill-tooltip',
        parse: '{'+'{Tooltip/Skill|<#skill#>}}',
    }, {
        classname: 'common-tooltip',
        parse: '{'+'{Tooltip/Common|<#param#>}}',
    }
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};
/* Tooltip Configuration: End */