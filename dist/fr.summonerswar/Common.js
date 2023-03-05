/* Any JavaScript here will be loaded for all users on every page load. */
    
//For USERNAME Template
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.username').html(mw.config.get('wgUserName'));
});

/* ================================================== */
/* ==== UserTags Customization                   ==== */
/* ================================================== */

window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: {order:0},
                admin: {link:'Summoners_War:_Sky_Arena_Wiki_FR:Administrateurs'}
        },
	oasisPlaceBefore: ''
};

//New User Tag: at last 7 days on wiki and 20 edits
UserTagsJS.modules.newuser = {
	days: 7, // Must have been on the Wiki for 7 days
	edits: 20, // And have at least 20 edits to remove the tag
};

//Remove User Tag from group
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
};

//Adding groups
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];

//Remove User Tag from group
UserTagsJS.modules.inactive = 30;

/* ================================================== */
/* ====   Tooltip                                ==== */
/* ================================================== */ 

var tooltips_config = {
    offsetX: 20,
    offsetY: -20,
    waitForImages: true,
};

var tooltips_list = [
    {
        classname: 'essence-tooltip',
        parse: '{| border="0" \n{{#if:<#firstnumber#>|{{!}}style="text-align:center; padding:0px 5px 0px 5px;"{{!}}<div style="position:relative;">[[File:Essence of Magic (Low).png|25px|link=Essences]]{{Essence number|<#firstnumber#>}}</div>| }} \n{{#if:<#secondnumber#>|{{!}}style="text-align:center; padding:0px 5px 0px 5px;"{{!}}<div style="position:relative;">[[File:Essence of Magic (Mid).png|25px|link=Essences]]{{Essence number|<#secondnumber#>}}</div>| }}\n{{#if:<#thirdnumber#>|{{!}}style="text-align:center; padding:0px 5px 0px 5px;"{{!}}<div style="position:relative;">[[File:Essence of Magic (High).png|25px|link=Essences]]{{Essence number|<#thirdnumber#>}}</div>|}}\n{{#if:<#fourthnumber#>|{{!}}style="text-align:center; padding:0px 5px 0px 5px;"{{!}}<div style="position:relative;">[[File:Essence of <#element#> (Low).png|25px|link=Essences]]{{Essence number|<#fourthnumber#>}}</div>|}}\n{{#if:<#fifthnumber#>|{{!}}style="text-align:center; padding:0px 5px 0px 5px;"{{!}}<div style="position:relative;">[[File:Essence of <#element#> (Mid).png|25px|link=Essences]]{{Essence number|<#fifthnumber#>}}</div>|}}\n{{#if:<#sixthnumber#>|{{!}}style="text-align:center; padding:0px 5px 0px 5px;"{{!}}<div style="position:relative;">[[File:Essence of <#element#> (High).png|25px|link=Essences]]{{Essence number{{!}}<#sixthnumber#>}}</div>|}}\n|- \n{{#if:<#firstnumber#>|{{!}}Low|}} \n{{#if:<#secondnumber#>|{{!}}Mid|}} \n{{#if:<#thirdnumber#>|{{!}}High|}} \n{{#if:<#fourthnumber#>|{{!}}Low|}} \n{{#if:<#fifthnumber#>|{{!}}Mid|}} \n{{#if:<#sixthnumber#>|{{!}}High|}} \n |}',
    }
];

/* ================================================== */
/* ====   HTML Elements                          ==== */
/* ================================================== */ 
function live(){
    var html_element = {
        'textarea': '<textarea id="txtArea" cols="40" rows="20"></textarea>',
        'msc': '<textarea id="msc" cols="100" rows="20"></textarea>'
    };
    for (var tag in html_element){
        var tagname = tag,
            html = html_element[tag];
        $('#html-' + tag).html(html);
    }
}

/* ================================================== */
/* ====   To-do List on Navbar                   ==== */
/* ================================================== */ 
$(".subnav-2.accent.firstChild").append("<li class='subnav-2-item'><a class='subnav-2a' href='/To-do_List'>To-do List</a></li>");

/* ================================================== */
/* ==== Import Articles                          ==== */
/* ================================================== */
importArticles({
	type:'script',
	articles: [
        'u:dev:DisplayClock/code.js',   //Add a clock to all pages
        'u:dev:PurgeButton/code.js',    //Adds Refresh button to the menu
        'u:dev:UserTags/code.js',       //Custom User Tags
        'u:dev:Tooltips/code.js',       //Enables custom tooltips
        
        'MediaWiki:Common.js/calc.js',          //Enables jcCalc for <pre>
        'MediaWiki:Common.js/HoE_Widget.js',    //Halls of Element Widget
        'MediaWiki:Common.js/monsterStatsCalculator.js', //Moves table content into textarea for easier copy and paste
        'MediaWiki:Common.js/Twitch.js',            //Adds a feed for Twitch
        'MediaWiki:Common.js/ToACalculator.js' // Creates ToA Rewards Calculator on Koakuh's page.
	]
});