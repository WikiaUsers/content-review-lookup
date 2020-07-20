// --- Configure various tooltips for use throughout the wiki
//
// Currently only runeword-tooltip is used. The tooltips use label-section-transclusion so load sizes
// are minimal.

var tooltips_config={waitForImages:true,}
var tooltips_list = [{
    classname: 'unit-tooltip',
    parse: '{' + '{<#unit#>|rank=<#rank#>|size=<#size#>|upgrade=<#upgrade#>|upgrades=<#upgrades#>|upgraded=<#upgraded#>|race=<#race#>|tt=<#tt#>|show=no}}',
}, {
    classname: 'spell-tooltip',
    parse: '{' + '{<#spell#>|magnitude=<#magnitude#>|tt=<#tt#>}}',
}, {
    classname: 'ability-tooltip',
    parse: '{' + '{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
}, {
    classname: 'runeword-tooltip',
    parse: '{{#lst:Template:Runewords|<#runeword#>}}',
}, {
    classname: 'damageability-tooltip',
    parse: '{' + '{<#ability#>|physical=<#physical#>|spirit=<#spirit#>|blight=<#blight#>|fire=<#fire#>|frost=<#frost#>|shock=<#shock#>|tt=<#tt#>|show=no}}',
    onShow: function(handle) {
        a = handle;
        writeloc = (this).getElementsByClassName('writedamage')[0];
        damagesource = a.parentElement;
        unitloc = damagesource.parentElement.parentElement;
        damageCalc(writeloc, damagesource, unitloc);
    },
}, {
    classname: 'protection-tooltip',
    parse: '{' + '{Prottable|<#magnitude#>|<#element#>}}',
}, {
    classname: 'weakness-tooltip',
    parse: '{' + '{Weaktable|<#magnitude#>|<#element#>}}',
}];