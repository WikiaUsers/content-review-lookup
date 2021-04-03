/* Any JavaScript here will be loaded for all users on every page load. */

window.tooltips_config = {
    offsetX: 20,
    offsetY: 10,
    waitForImages: true,
    noCSS: true
};

window.tooltips_list = [
    {
        classname: 'test-tooltip',
        parse: '{'+'{Test-Tooltip|<#param#>}}',
    },
    {
        classname: 'item-tooltip',
        parse: '{'+'{Item-Tooltip|<#param#>|}}',
    },
    {
        classname: 'icon-tooltip',
        parse: '{'+'{Icon-Tooltip|<#param#>}}',
    },
    {
        classname: 'mob-tooltip',
        parse: '{'+'{Mob-Tooltip|<#param#>}}',
    },
];

$('<iframe>', {
    frameborder: "1",
    scrolling: "yes",
    id: "chat_embed",
    src: "https://twitch.tv/pixelworldsgame/chat" ,
    height: "500",
    width: "265"
}).appendTo(".twitch-chat");

$('<iframe>', {
    src: "//streambadge.com/twitch/dark/pixelworldsgame/",
    frameborder: "0",
    width: "100%",
    height: "4em"
}).appendTo(".twitch-live");