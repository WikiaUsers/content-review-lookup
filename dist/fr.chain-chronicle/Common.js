/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

var tooltips_config = {
    waitForImages: true,
};

var updateScrollIntervals = [];

var tooltips_list = [
    {
        classname: 'js-tooltip-arcana',
        parse: '{'+'{Tooltip/Arcana|<#1#>}}',
    },
    {
        classname: 'js-tooltip-arcana-skills',
        parse: '{'+'{Tooltip/Arcana/Skills|<#1#>}}',
    },
    {
        classname: 'js-tooltip-limitbreaker',
        parse: '{'+'{Tooltip/LimitBreaker|<#1#>}}',
    },
    {
        classname: 'js-tooltip-enhancer',
        parse: '{'+'{Tooltip/Enhancer|<#1#>}}',
    },
    {
        classname: 'js-tooltip-weapon',
        parse: '{'+'{Tooltip/Weapon|<#1#>}}',
    },
    {
        classname: 'js-tooltip-image',
        parse: '{'+'{Image|<#nom#>|<#format#>|<#taille#>|<#lien#>}}',
    },
];