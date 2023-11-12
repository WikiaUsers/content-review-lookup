/* Any JavaScript here will be loaded for all users on every page load. */

$(function(){
   $('#show_season_episodes').click(function(event) {
       event.preventDefault()
       $('#season_episodes').toggle();
       return true;
   }).find('a').attr('href', '#');
});
/* Credits to Dev Wiki and Sam and Cat Wiki */

importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
		'w:dev:ReferencePopups/code.js',
		"w:dev:RevealAnonIP/code.js",
		"w:dev:SearchSuggest/code.js",
		"w:dev:ShowHide/code.js",
		"w:dev:VisualSpellCheck/code.js",
        "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/displayclock.js",
		"MediaWiki:Common.js/insertusername.js",
	]
});

window.tooltips_list = [
    {
        classname: 'custom-tooltip-text',
        text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed",
    }, {
        classname: 'crew',
        parse: '{'+'{crewtt|<#crew#>}}',
        delay:300,    
    }, {
        classname: 'place',
        parse: '{'+'{placett|<#place#>}}',
        delay:300,
    }, {
        classname: 'other',
        parse: '{'+'{othertt|<#other#>}}',
        delay:300,
    }, {
        classname: 'type',
        parse: '{'+'{typett|<#type#>}}',
        delay:300,
    }, {
        classname: 'season',
        parse: '{'+'{seastt|<#season#>}}',
        delay:300,
    }, {
        classname: 'show',
        parse: '{'+'{showtt|<#show#>}}',
        delay:300,
    }, {
        classname: 'actor',
        parse: '{'+'{actt|<#actor#>}}',
        delay:300,
    }, {
        classname: 'episode',
        parse: '{'+'{eptt|<#episode#>}}',
        delay:300,
    }, {
        classname: 'character',
        parse: '{'+'{chtt|<#character#>}}',
        delay:300,
    }, {    
        classname: 'basic-tooltip',
        delay: 200,
        onHide: function(handle) { $(this).html($(handle).html()) },
    },
];

window.tooltips_config = {
    offsetX: 6,
    offsetY: 8,
    waitForImages: true,
    noCSS: true,
};