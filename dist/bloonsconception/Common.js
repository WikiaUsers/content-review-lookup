/* Any JavaScript here will be loaded for all users on every page load. */
// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		founder:             {u:'The Creator'},
		bot:                 {u:'Bot'},
		bureaucrat:          {u:'Bureaucrat'},
		sysop:               {u:'Administrator'},
		rollback:            {u:'Rollback'},
		chatmoderator:       {u:'Chat Moderator'},
		threadmoderator:     {u:'Forum Foderator'},
		critic:              {u:'Critic'},
		support:             {u:'Supporter'},
		systematicsafeguard: {u:'Systematic Safeguard'},
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.inactive = 60; // 60 days, or around 2 months

UserTagsJS.modules.metafilter = {
        'bureaucrat':      ['founder', 'systematicsafeguard'],
        'sysop':           ['founder', 'rollback', 'chatmod', 'threadmod', 'systematicsafeguard'],
};
UserTagsJS.modules.mwGroups = ['founder', 'bot', 'support', 'critic', 'systematicsafeguard'];
//Adds custom usertags
UserTagsJS.modules.custom = {
        'CyberGuy23':            ['founder'],
        'Anonymoustyd':          ['bureaucrat'],
        'Logo12':                ['sysop'],
        'Mr.OAH':                ['chatmod'],
        'Doue':                  ['rollback'],
        'Kamarin':               ['chatmod','rollback'],
        'Derpinator9001':        ['rollback'],
        'Thaswordster':          ['critic','sysop','support'],
        'Love Robin':            ['systematicsafeguard'],
        'LoverofAllThingsCute':  ['threadmoderator', 'critic'],
};
// End of UserTags

// PinnedActivity
window.pins = window.pins || {}
window.pins.pages = "Project:Pins";
importScriptPage('MediaWiki:PinnedActivity.js', 'bcow');

// Auto refresh
var ajaxPages         = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');

// Replaces {{USERNAME}} with the name of the user browsing the page
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
// End of the {{USERNAME}} replacement

// Wall and forum tags
window.MessageWallUserTags = {
    tagColor:  '#FF0',
    glow:      true,
    glowSize:  '15px',
    glowColor: '#FF0',
    users: {
        'CyberGuy23':           'The creator',
        'Anonymoustyd':         'Head Administrator',
        'Meta07':               'Head Manager',
        'Logo12       ':        'Administrator',
        'Doue':                 'Enforcer',
        'Kamarin':              'Enforcer',
        'Derpinator9001':       'Enforcer',
        'Thaswordster':         'Administrator',
        'Love Robin':           'Systematic Safeguard',
        'LoverofAllThingsCute': 'Forum Manager',
    }
};

// Redirect button
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)

/* Spoiler code - hides pages in Category:Spoiler */
window.SpoilerAlert = {
    question: 'Spoiler alert! Would you like to proceed?',
    yes: 'Yes',
    no: 'Nah',
 isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');

//poweruser checkbox at listusers, creds to 452
if (wgPageName=="Special:ListUsers") $("fieldset.lu_fieldset tr:last-child").prepend('<td valign="middle" style="padding:0px 2px 0px 1px;"><label for="checkBoxForpoweruser"><span style="vertical-align:middle"><input type="checkbox" name="lu_target" class="lu_target" value="poweruser" checked="checked" id="checkBoxForpoweruser"></span><span style="padding-bottom:5px;">Power Users</span></label></td>');

importScriptPage('WallGreetingButton/code.js', 'dev');
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('User Rights Reasons Dropdown/code.js', 'dev');

/* Discord widget from dev wiki*/
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Discord server",
        id: "146798896759177217",
        theme: "dark"
    }
};

/*==================  Stuff from Wikia.js  ==================*/
$(function() {
    if ( mw.config.get( 'wgPageName' ) == "User_blog:Logologologol/Tools" ) {
        $("#pp").click(function(){$("#p").val($("#p").val().replace(/\./g,'').toUpperCase().split('').join('.')+".");});
        $("#qq").click(function(){$("#q").val($("#q").val().replace(/\./g,'').length);});
        $("#s1").click(function(){$("#moveme").animate({left:"500px"},500000/$("#s").val(),"linear",function(){$(this).css("left","0");});});
        $("#s2").click(function(){$("#moveme").animate({left:"500px"},500000/$("#s").val()/70,"linear",function(){$(this).css("left","0");});});
        $("#rq").click(function(){
            $("#resx").val(+$("#pre").val().split("&")[0]);
            $("#resy").val(+$("#pre").val().split("&")[1]);
        });
        $("#rr").click(function(){
            $("#inch").html("inch");
            var xxresx = $("#resx").val(),
                xxresy = $("#resy").val(),
                xxscrs = $("#scrs").val(),
                xxppi  = Math.sqrt(xxresx*xxresx+xxresy*xxresy)/xxscrs,
                xxpwd  = 25.4/xxppi;
            $("#wid").val(Math.round(100*xxresx/xxppi)/100);
            $("#hig").val(Math.round(100*xxresy/xxppi)/100);
            $("#ppi").val(Math.round(xxppi));
            $("#pp2").val(Math.round(xxppi*xxppi));
            $("#pwd").val(Math.round(10000*xxpwd)/10000);
            $("#psz").val(Math.round(10000*xxpwd*xxpwd)/10000);
        });
        $("#rs").click(function(){
            if ($(".inch").html()==("inch"))
                {
                $(".inch").html("mm");
                $("#wid").val(Math.round(100*$("#wid").val()*25.4)/100);
                $("#hig").val(Math.round(100*$("#hig").val()*25.4)/100);
                }
            else
                {
                $(".inch").html("inch");
                $("#wid").val(Math.round(100*$("#wid").val()/25.4)/100);
                $("#hig").val(Math.round(100*$("#hig").val()/25.4)/100);
                }
        });
    }
});

//Meta's Secret Policy Code

$(function(){if(mw.config.get( 'wgPageName' ) == "Bloons_Conception_Wiki:Policies"){
    var supersecretcode = "";
    var superappended = false;
    var xvceVnz8XOMoq90HY = "00000000";
    var dots = 0;

    xvceVnz8XOMoq90HY = xvceVnz8XOMoq90HY.replace(/0/g,function(){return Math.floor(Math.random() * 9 - 0.0000000000001);});
    $("#mw-content-text").html($("#mw-content-text").html().replace(/\.(?!([^<]+)?>)/g,function(){
        return " ^^" + dots++ + "^^";
    }));
    dots = Math.floor(Math.random() * dots + 1 - 0.0000000000001);
    $("#mw-content-text").html($("#mw-content-text").html().replace(/ \^\^(.+?)\^\^/g,function(ttt){
        if (ttt.substring(3,ttt.length-2)==dots)
            return "<div class='spin' style='cursor:help;display:inline-block;transform-origin:50% 80%;font-size:180%;text-shadow: 0px -2px #88a, 0px -4px #446, 1.73px 1px #88a, 3.46px 2px #446, -1.73px 1px #88a, -3.46px 2px #446' title='Congratulations! You have found the Super Secret Dot! The password is: " + xvceVnz8XOMoq90HY + "'>.</div>";
        else return ".";
    }));

    $("td").filter(function(){return !isNaN($(this).text())}).click(function(){console.log(supersecretcode += $(this).text().trim())});
    $("th:contains(Notes)").click(function(){
        if(supersecretcode === xvceVnz8XOMoq90HY){
            if(superappended === false){
                $(this).append($("<div id='supersecretrule' style='text-align:left;font-weight:normal;display:none'>").load("/wiki/Project:Supersecretpage #mw-content-text", function(){
                        $("#supersecretrule").slideDown(4000);
                        superappended = true;
                    }));
                }
                else $("#supersecretrule").slideDown(4000);
            }
            else $("#supersecretrule").slideUp(1000);
        supersecretcode="";
    });
}});

//Classes
var bright = $("<div></div>");
$(".hover").hover(function(){
    bright.css({
        "background":"rgba(255,255,255,0.4)",
        "width":"inherit",
        "height":"inherit",
        "position":"inherit",
        "right":"inherit"
    });
    $(this).prepend(bright);
}, function(){
    bright.remove();
});