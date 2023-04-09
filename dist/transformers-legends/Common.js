/* Any JavaScript here will be loaded for all users on every page load. */
/*
$(function(){
    importArticles({
      type: "script",
      articles: [
        'u:zh.pad:MediaWiki:CountDown.js',
    ]
    }, {
      type: "style",
      articles: [
        'u:zh.pad:MediaWiki:CountDown.css'
    ]
    });
});
*/
window.AddRailModule = [
    {
        page: "Template:RailModulePrepend",
        prepend: true,
        maxAge: 0
    },
    {
        page: "Template:RailModuleAppend",
        maxAge: 0
    }
];

window.railWAM = {
    autoLogForUsers: [
        "Andrewds1021",
        "Brockrb",
        "Casualkirk",
        "CforKat",
        "Chobor",
        "DinoKev",
        "Godofcyanide",
        "Masarujasu",
        "Prescoper",
        "The13thPrime"
    ],
    logPage: "Project:WAM Log",
    showToAnons: false
};