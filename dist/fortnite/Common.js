/* Any JavaScript here will be loaded for all users on every page load. */
var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};

var tooltips_list = [
    {
        classname: 'unit-tooltip',
        parse: '{'+'{<#unit#>|rank=<#rank#>|size=<#size#>|upgrade=<#upgrade#>|upgrades=<#upgrades#>|upgraded=<#upgraded#>|race=<#race#>|tt=<#tt#>|show=no}}',
        //onShow: function() { if ((this).getElementsByClassName('template-unit')[0]) {Unit = (this).getElementsByClassName('template-unit')[0]; console.info("Onshow var =",Unit); processunit (Unit);} },
    }, {
        classname: 'spell-tooltip',
        parse: '{'+'{<#spell#>|magnitude=<#magnitude#>|tt=<#tt#>}}',
    }, {
        classname: 'ability-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    }, {
        classname: 'structure-tooltip',
        parse: '{'+'{<#structure#>}}',
    }, {
        classname: 'building-tooltip',
        parse: '{'+'{<#building#>}}',
    }, {
        classname: 'damageability-tooltip',
        parse: '{'+'{<#ability#>|physical=<#physical#>|spirit=<#spirit#>|blight=<#blight#>|fire=<#fire#>|frost=<#frost#>|shock=<#shock#>|tt=<#tt#>|show=no}}',
        onShow: function(handle) { a = handle; writeloc = (this).getElementsByClassName('writedamage')[0]; damagesource = a.parentElement; unitloc = damagesource.parentElement.parentElement; damageCalc (writeloc, damagesource, unitloc); },
    }, {
        classname: 'protection-tooltip',
        parse: '{'+'{Prottable|<#magnitude#>|<#element#>}}',
    }, {
        classname: 'weakness-tooltip',
        parse: '{'+'{Weaktable|<#magnitude#>|<#element#>}}',
    }
];

window.LockForums = {
    expiryDays: 14,
    expiryMessage: 'This thread is considered archived because it hasn\'t been commented on <expiryDays> days, please don\'t bump this thread!'
};