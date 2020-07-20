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

var tooltips_list = [
    {
        classname: 'custom-tooltip-text',
        text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed",
    }, {
        classname: 'actor',
        parse: '{'+'{actt|<#actor#>}}',
        delay:500,
    }, {
        classname: 'episode',
        parse: '{'+'{eptt|<#episode#>}}',
        delay:500,
    }, {
        classname: 'character',
        parse: '{'+'{chtt|<#character#>}}',
        delay:500,
    }, {    
        classname: 'basic-tooltip',
        delay: 200,
        onHide: function(handle) { $(this).html($(handle).html()) },
    },
];