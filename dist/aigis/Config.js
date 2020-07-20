//dev.wikia.com/wiki/Tooltips custom configuration settings. (Start)
var tooltips_config = {
    offsetX: 8, //The X offset of where the tooltip will render
    offsetY: 8, //The X offset of where the tooltip will render
};
var tooltips_list = [
    {
        classname: 'ajax-tooltip', //The class that will trigger the tooltip
        parse: '{{<#template#>|<#value#>}}', //Will parse a tooltip using data-template and data-value.
    }
];
//dev.wikia.com/wiki/Tooltips custom configuration settings. (Finish)

// ProfileTags config
(window.dev = window.dev || {}).profileTags = { noHideTags: true }; //show default tags.
// ProfileTags config

//Background config
NoBackgroundUserpages = {
    ShinyAfro:true,
    Relokometal:true
};
//Background config