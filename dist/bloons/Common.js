/*
 * JS Custom Link
 *
 * This JavaScript snippet processes custom links that otherwise may not be supported
 * by the MediaWiki software. Should be used sparingly, if at all.
 *
 * Usage:
 * <span class="jscustomlink" data-href="https://www.google.com" data-title="Google" data-target="_blank">my link</span>
 *
 * The above is roughly equivalent to the following wiki markup:
 * [https://www.google.com my link]
 *
 * class="jscustomlink" is required.
 * data-href="URI" is required. This is the URI where clicking the link will take you to.
 * data-title="Google" is optional, can be omitted. It is the title of the link when hovering over with the mouse.
 * data-target="_blank" is optional, can be omitted. It makes the link open in a new (blank) tab.
 */
$(function () {
    $('.jscustomlink').each(function () {
        var $span = $(this),
            href = $span.attr('data-href'),
            title, target, a;
 
        if (typeof href === "string" && href.length !== 0) {
            title = $span.attr('data-title');
            target = $span.attr('data-target');
            a = document.createElement("a");
            a.href = href;
            a.textContent = $span.text();
 
            console.log(title);
 
            if (typeof title === "string" && title.length !== 0) {
                a.setAttribute("title", title);
            }
            if (typeof target === "string" && target.length !== 0) {
                a.setAttribute("target", target);
            }
 
            $span.empty();
            $span.html(a);
        }
    });
});

/* By [[w:User:Lunarity]]
 * For more information, see [[Template:CustomRBE]]
 */
$(function($) {
    var defaultShowText = '[Show]';
    function toggle() {
        var $this = $(this);
        if ($this.hasClass('inline-collapsible-hidden')) {
            $this.html($this.data('content')).removeClass('inline-collapsible-hidden');
        } else {
            $this.text($this.data('showtext') || defaultShowText).addClass('inline-collapsible-hidden');
        }
    }
    $('.inline-collapsible').each(function() {
         var $this = $(this);
         $this.data('content', $this.html())
             .click(toggle)
             ;
         toggle.call(this);
    });
});
/* End */

/* Adding links to On the Wiki tab - From Runescape Wiki */
$(function() {
    $('.WikiHeader nav ul li.marked ul').append('<li style="background-color:#40e020"><a class="subnav-2a" href="/wiki/Bloons Wiki:Policies">Guidelines and Policies</a></li>');
/*  $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Bloons Wiki:Requests for Rollbacker">Rollbacker nominations</a></li>'); */
});
/* End */

/* "Username" template - from PvZ Wiki */
$(function() {
  if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
  $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End */

/* Ajax-refresh button config options */
window.ajaxPages = [
    "Special:Contributions",
    "Special:Log",
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Watchlist",
    "Special:AbuseLog",
    "Special:DiscussionsAbuseFilter/logs"
];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
/* End */

/* Purge Button settings */
window.PurgeButtonText = 'Purge';

/* UserTags settings */
window.UserTagsJS = {
	modules: {},
	tags: {
        // global rights
		'staff': { link:'w:Community Central:Staff', order: -200 },
	   	'helper': { link:'w:Help:Helpers', order: -190 },
		'vstf': { link:'w:Help:VSTF', order: -180 },
		'voldev': { link:'w:c:dev:Volunteer Developers', order: -170 },
		'util': { link:'Help:User_access_levels#Utilites', order: -160 },
		'council': { link:'w:Help:Community Council', order: -150 },
		'vanguard': { link:'Help:Vanguard', order: -140 },
		'wikiastars': { link:'homepage:Stars', order: -130 },
		'adminmentor': { link:'w:Admin Support:Main Page', order: -120 },
		'authenticated': { link:'Bloons Wiki:Authenticated', order: -110 },
		'checkuser-global': { u:'Global Checkuser', link:'w:help:checkuser', order: -100 },

        // local rights
		'founder': { link:'w:Help:Founders', order: 0 },
		'bureaucrat': { link:'Bloons Wiki:Bureaucrats', order: 1 },
		'retired bureaucrat': { u:'Retired Bureaucrat', link:'Bloons Wiki:Bureaucrats', order: 1 },
		'sysop': { u:'Admin', link:'Bloons Wiki:Administrators', order: 2 },
		'content-moderator': { link:'Bloons Wiki:Content-moderator', order: 3 },
		'rollback': { link:'Bloons Wiki:Rollback', order: 4 },
        // 'patroller': { link:'w:Help:Recent changes patrol' },
		'threadmoderator': { link:'Bloons Wiki:Threadmoderator', order: 5 },
		'chatmoderator': { link:'Bloons Wiki:Chat moderators', order: 6 },
		'newsmoderator': { u:'News Moderator', link:'Blog:News', order: 7 },
		'checkuser': { link:'w:help:checkuser', order: 8 },

        // bots
		'bot-global': { link:'Bloons Wiki:Bot-global', order: 100 },
		'bot': { link:'Bloons Wiki:Bots', order: 101 },

        // special tags
		'nonuser': { link:'Special:ActiveUsers', order: 1e101 },
		'newuser': { link:'Bloons Wiki:Users', order: 1e102 },
		'notautoconfirmed': { link:'Bloons Wiki:Users', order: 1e103 },
		'inactive': { link:'Special:ActiveUsers', order: 1e104 },

        // blocked/banned users' tags
		'bannedfromchat': { link:'Bloons Wiki:Chat', order: 1e105 },
		'blocked': { link:'Bloons Wiki:Policies', order: 1e106 }
	}
};

UserTagsJS.modules.nonuser = true; // mark users with no edits
UserTagsJS.modules.autoconfirmed = true; // mark autoconfirmed users
UserTagsJS.modules.isblocked = true; // mark blocked users on MonoBook
//UserTagsJS.modules.newuser = true; // mark new users - probably not needed when the line below works

UserTagsJS.modules.newuser = {
//	days: 7, // must have been on the Wiki for X days
//	edits: 15, // and have at least X edits to remove the tag
	namespace: 0, // edits must be made to articles to count
	computation: function(days, edits) {
        // Return false = not newuser, return true = newuser
		return edits < 20 && (edits < 10 || days < 7) && days < 21;
	}
	// NOTE: Computation would be mutually exclusive with days/edits, those params would stop working when you define your own function.
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: false // 0 article edits = inactive
};

UserTagsJS.modules.mwGroups = [
     // add corresponding tags to users
    'bureaucrat',
    'chatmoderator',
    'rollback',
    'content-moderator',
    'threadmoderator',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'checkuser',
    'checkuser-global',
    'vanguard',
    'voldev',
    'util',
    'council',
    'vstf',
    'helper',
    'adminmentor',
    'staff'
];

// adding tags to users
UserTagsJS.modules.custom = {
//  'somebody': ['inactive'], // Force inactive group instead of relying on the inactive module
//  'CreeperSlimePig': ['newsmoderator'],
    'Roberto1205': ['retired bureaucrat'],
    'SW8573': ['inactive'],
    'Zelda311': ['founder', 'retired bureaucrat'],
    'Abuse filter': ['bot'] // add bot tag as it is an automated software
};

// removing tags to users
UserTagsJS.modules.userfilter = {
//  'somebody': ['inactive'] // 'somebody' is never marked as inactive, even when he is
    'Abuse filter': ['nonuser'] // remove 'Never Edited' tag
};

UserTagsJS.modules.metafilter = {
    'sysop': ['bot'], // remove sysop tag from bots
    'bot': ['bot-global'], // remove bot tag from global bots
    'inactive': ['bot', 'bot-global', 'util', 'council', 'vstf', 'helper', 'staff', 'adminmentor'], // remove inactive tag from bots & global users
	'newuser': ['bot', 'bot-global', 'util', 'council', 'vstf', 'helper', 'staff', 'adminmentor'] // remove newuser tag from bots & global users
};
/* End */	

/* LockOldBlogs settings */
window.LockOldBlogs = {
    expiryDays: 30,      // lock blogs after "expiryDays" days
    expiryMessage: "This blog is considered archived because it hasn't been commented on in over <expiryDays> days. To disable the auto-archiving on your post you can add it to the \"Never archived posts\" category.",
    nonexpiryCategory: "Never archived posts"
};
/* End */

/* FastDelete settings */
window.fdButtons = [];

fdButtons[fdButtons.length] = {
	'summary': 'Spam',
	'label': 'Spam'
};

//fdButtons[fdButtons.length] = {
//	'summary': 'Vandalism',
//	'label': 'Vandalism'
//};
/* End */

/* RevealAnonIP */
window.RevealAnonIP = {
    permissions : ['user']
// Syntax -     permissions : ['GROUP1', 'GROUP2', 'GROUP3']
};
/* End RevealAnonIP */

/* SocialMediaButtons */
window.SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
/* End  SocialMediaButtons */

/* LockForums configuration - full list on dev wiki */
window.LockForums = {
    expiryDays: 45,
    warningDays: 15,
    disableOn: ["30891", "48182", "48183", "86964", "98484"],
    banners: true
}; 
/* End config */

/* Change chat description
 * Source: mlp wiki
 */

// Change chat description
/* disabled
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					clearInterval(chatDescInt);
				}
			}, 50);
		}
	});
}
*/
/* End change chat description */

/* Start of paragon power stuff */
// From Animal Crossing Wiki
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.convertDegreeToPower = function() {
	var paragondegree = $("#paragon-degree-input").val();
	var paragonpower = 0;
	var basedamage = $("#paragon-basedamage-input").val();
	var pierce = $("#paragon-pierce-input").val();
	var attackcooldown = $("#paragon-attackcooldown-input").val();
	var abilitycooldown = $("#paragon-abilitycooldown-input").val();
	var extrabossdamage = $("#paragon-extrabossdamage-input").val();
	var extrablimpdamage = $("#paragon-extrablimpdamage-input").val();
	var extraceramicdamage = $("#paragon-extraceramicdamage-input").val();
	var extrafortifieddamage = $("#paragon-extrafortifieddamage-input").val();
	var extraleaddamage = $("#paragon-extraleaddamage-input").val();
	var extracamodamage = $("#paragon-extracamodamage-input").val();
	var extrastunneddamage = $("#paragon-extrastunneddamage-input").val();
	
	var bossdamage = $("#paragon-bossdamage-output").val();
	var unshieldeddreadbloon = $("#paragon-unshielded-dreadbloon-output").val();
	var shieldeddreadbloon = $("#paragon-shielded-dreadbloon-output").val();
	var phayze = $("#paragon-phayze-output").val();
	var elitebossdamage = $("#paragon-elitebossdamage-output").val();
	var unshieldedelitedreadbloon = $("#paragon-unshielded-elite-dreadbloon-output").val();
	var shieldedelitedreadbloon = $("#paragon-shielded-elite-dreadbloon-output").val();
	var elitephayze = $("#paragon-elite-phayze-output").val();
	
	//paragon degrees and stuff like that; these are only for those that have multiple conditions, like damage and pierce
	if (paragondegree > 1) {
		if (paragondegree == 100) {
	    	paragonpower = 200000;
	    	basedamage = 2 * $("#paragon-basedamage-input").val() + 10;
	    	pierce = 2 * $("#paragon-pierce-input").val() + 100;
	    	extrabossdamage = 2 * $("#paragon-extrabossdamage-input").val();
	    	extrablimpdamage = 2 * $("#paragon-extrablimpdamage-input").val();
	    	extraceramicdamage = 2 * $("#paragon-extraceramicdamage-input").val();
	    	extrafortifieddamage = 2 * $("#paragon-extrafortifieddamage-input").val();
	    	extraleaddamage = 2 * $("#paragon-extraleaddamage-input").val();
	    	extracamodamage = 2 * $("#paragon-extracamodamage-input").val();
	    	extrastunneddamage = 2 * $("#paragon-extrastunneddamage-input").val();
		}
		else {
	    	paragonpower = (50 * (paragondegree * paragondegree * paragondegree) + 5025 * (paragondegree * paragondegree) + 168324 * paragondegree + 843000)/600;
	    	basedamage = $("#paragon-basedamage-input").val() * (1 + 0.01 * (paragondegree - 1)) + Math.floor((paragondegree - 1)/10);
	    	pierce = $("#paragon-pierce-input").val() * (1 + 0.01 * (paragondegree - 1)) + (paragondegree - 1); // e.g. 200 * (1 + 0.01 (100 - 1)) + (100 - 1)
	    	extrabossdamage = $("#paragon-extrabossdamage-input").val() * (1 + 0.01 * (paragondegree - 1));
	    	extrablimpdamage = $("#paragon-extrablimpdamage-input").val() * (1 + 0.01 * (paragondegree - 1));
	    	extraceramicdamage = $("#paragon-extraceramicdamage-input").val() * (1 + 0.01 * (paragondegree - 1));
	    	extrafortifieddamage = $("#paragon-extrafortifieddamage-input").val() * (1 + 0.01 * (paragondegree - 1));
	    	extraleaddamage = $("#paragon-extraleaddamage-input").val() * (1 + 0.01 * (paragondegree - 1));
	    	extracamodamage = $("#paragon-extracamodamage-input").val() * (1 + 0.01 * (paragondegree - 1));
	    	extrastunneddamage = $("#paragon-extrastunneddamage-input").val() * (1 + 0.01 * (paragondegree - 1));
		}
		$("#paragon-power-output").html(numberWithCommas(paragonpower.toFixed(0)));
		$("#paragon-basedamage-output").html(numberWithCommas(basedamage.toFixed(0)));
		$("#paragon-pierce-output").html(numberWithCommas(pierce.toFixed(0)));
		$("#paragon-extrabossdamage-output").html(numberWithCommas(extrabossdamage.toFixed(0)));
		$("#paragon-extrablimpdamage-output").html(numberWithCommas(extrablimpdamage.toFixed(0)));
		$("#paragon-extraceramicdamage-output").html(numberWithCommas(extraceramicdamage.toFixed(0)));
		$("#paragon-extrafortifieddamage-output").html(numberWithCommas(extrafortifieddamage.toFixed(0)));
		$("#paragon-extraleaddamage-output").html(numberWithCommas(extraleaddamage.toFixed(0)));
		$("#paragon-extracamodamage-output").html(numberWithCommas(extracamodamage.toFixed(0)));
		$("#paragon-extrastunneddamage-output").html(numberWithCommas(extrastunneddamage.toFixed(0)));
	}
	else if (paragondegree == 1) {
    	paragonpower = 0;
    	basedamage = $("#paragon-basedamage-input").val();
    	pierce = $("#paragon-pierce-input").val();
    	extrabossdamage = $("#paragon-extrabossdamage-input").val();
    	extrablimpdamage = $("#paragon-extrablimpdamage-input").val();
    	extraceramicdamage = $("#paragon-extraceramicdamage-input").val();
    	extrafortifieddamage = $("#paragon-extrafortifieddamage-input").val();
    	extraleaddamage = $("#paragon-extraleaddamage-input").val();
    	extracamodamage = $("#paragon-extracamodamage-input").val();
    	extrastunneddamage = $("#paragon-extrastunneddamage-input").val();
    	
    	$("#paragon-power-output").html(numberWithCommas(paragonpower.toFixed(0)));
		$("#paragon-basedamage-output").html(numberWithCommas(basedamage));
		$("#paragon-pierce-output").html(numberWithCommas(pierce));
		$("#paragon-attackcooldown-output").html(attackcooldown);
		$("#paragon-abilitycooldown-output").html(abilitycooldown);
		$("#paragon-extrabossdamage-output").html(numberWithCommas(extrabossdamage));
		$("#paragon-extrablimpdamage-output").html(numberWithCommas(extrablimpdamage));
		$("#paragon-extraceramicdamage-output").html(numberWithCommas(extraceramicdamage));
		$("#paragon-extrafortifieddamage-output").html(numberWithCommas(extrafortifieddamage));
		$("#paragon-extraleaddamage-output").html(numberWithCommas(extraleaddamage));
		$("#paragon-extracamodamage-output").html(numberWithCommas(extracamodamage));
		$("#paragon-extrastunneddamage-output").html(numberWithCommas(extrastunneddamage));
	}
	
	attackcooldown = $("#paragon-attackcooldown-input").val() / (1 + 0.01 * Math.round(Math.sqrt(50 * paragondegree - 50), 1));
	abilitycooldown = $("#paragon-abilitycooldown-input").val() / (1 + 0.01 * Math.round(Math.sqrt(50 * paragondegree - 50), 1));
	$("#paragon-attackcooldown-output").html(attackcooldown);
	$("#paragon-abilitycooldown-output").html(abilitycooldown);
	
	bossdamage = "coming soon...";
	unshieldeddreadbloon = "coming soon...";
	shieldeddreadbloon = "coming soon...";
	phayze = "coming soon...";
	elitebossdamage = "coming soon...";
	unshieldedelitedreadbloon = "coming soon...";
	shieldedelitedreadbloon = "coming soon...";
	elitephayze = "coming soon...";
	
	$("#paragon-bossdamage-output").html(bossdamage);
	$("#paragon-unshielded-dreadbloon-output").html(unshieldeddreadbloon);
	$("#paragon-shielded-dreadbloon-output").html(shieldeddreadbloon);
	$("#paragon-phayze-output").html(phayze);
	$("#paragon-elitebossdamage-output").html(elitebossdamage);
	$("#paragon-unshielded-elite-dreadbloon-output").html(unshieldedelitedreadbloon);
	$("#paragon-shielded-elite-dreadbloon-output").html(shieldedelitedreadbloon);
	$("#paragon-elite-phayze-output").html(elitephayze);
};

$("#convert-degree-to-power-loader").html('   \
<div id="convert-degree-to-power-form" style="max-width:500px;">   \
<span style="font-size: 20px"><b>Paragon Calculator</b></span><br /> \
<table style="width:100%;">   \
<tr><td>Paragon Degree</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="1" min="1" id="paragon-degree-input"></td>   \
<tr><td>Original Pierce</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="35" id="paragon-pierce-input"></td></tr>   \
<tr><td>Original Attack Cooldown</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="0.40" step="0.01" id="paragon-attackcooldown-input"></td></tr>   \
<tr><td>Original Ability Cooldown</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="45" id="paragon-abilitycooldown-input"></td></tr>   \
<tr><td>Original Base Damage</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="200" id="paragon-basedamage-input"></td></tr>   \
<tr><td>Original Extra Boss Damage</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="400" id="paragon-extrabossdamage-input"></td></tr>   \
<tr><td>Original Extra MOAB-Class Damage</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="100" id="paragon-extrablimpdamage-input"></td></tr>   \
<tr><td>Original Extra Ceramic Damage</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="100" id="paragon-extraceramicdamage-input"></td></tr>   \
<tr><td>Original Extra Fortified Damage</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="100" id="paragon-extrafortifieddamage-input"></td></tr>   \
<tr><td>Original Extra Lead Damage</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="100" id="paragon-extraleaddamage-input"></td></tr>   \
<tr><td>Original Extra Camo Damage</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="100" id="paragon-extracamodamage-input"></td></tr>   \
<tr><td>Original Extra Stunned Damage</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="100" id="paragon-extrastunneddamage-input"></td></tr>   \
<tr><td colspan="2" style="text-align:center; padding: 5px;"><button id="convert-degree-to-power-button" onClick="convertDegreeToPower();">Convert Degree to Power</button></td></tr>   \
</table> \
<span style="font-size: 20px"><b>Basic Statistics</b></span><br /> \
<table style="width:100%;">   \
<tr> <td>Paragon Power</td><td style="text-align: right; color:blue;"><b><span id="paragon-power-output">[no output]</span> Power</b></td></tr>   \
<tr> <td>New Pierce</td><td style="text-align: right; color:#DCDCDC;"><b><span id="paragon-pierce-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Attack Cooldown</td><td style="text-align: right; color:#FFFF66;"><b><span id="paragon-attackcooldown-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Ability Cooldown</td><td style="text-align: right; color:#FF9999;"><b><span id="paragon-abilitycooldown-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Base Damage</td><td style="text-align: right; color:red;"><b><span id="paragon-basedamage-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Extra Boss Damage</td><td style="text-align: right; color:#ADFF2F;"><b><span id="paragon-extrabossdamage-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Extra Elite Boss Damage</td><td style="text-align: right; color:#228B22;"><b><span id="paragon-extraelitebossdamage-output">coming soon!</span></b></td></tr></tr>   \
<tr> <td>New Extra MOAB-Class Damage</td><td style="text-align: right; color:#40E0D0;"><b><span id="paragon-extrablimpdamage-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Extra Ceramic Damage</td><td style="text-align: right; color:#CD853F;"><b><span id="paragon-extraceramicdamage-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Extra Fortified Damage</td><td style="text-align: right; color:#D2691E;"><b><span id="paragon-extrafortifieddamage-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Extra Lead Damage</td><td style="text-align: right; color:#404040;"><b><span id="paragon-extraleaddamage-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Extra Camo Damage</td><td style="text-align: right; color:#33512E;"><b><span id="paragon-extracamodamage-output">[no output]</span></b></td></tr></tr>   \
<tr> <td>New Extra Stunned Damage</td><td style="text-align: right; color:#D6D999;"><b><span id="paragon-extrastunneddamage-output">[no output]</span></b></td></tr></tr>   \
</table> \
<span style="font-size: 20px"><b>Total Normal Boss Damage</b></span><br /> \
<table style="width:100%;">   \
<tr> <td>Boss Damage</td><td style="text-align: right; color:#ADFF2F;"><b><span id="paragon-bossdamage-output">coming soon!</span></b></td></tr></tr>   \
<tr> <td>Unshielded Dreadbloon Damage</td><td style="text-align: right; color:#B6B6B6;"><b><span id="paragon-unshielded-dreadbloon-output">coming soon!</span></b></td></tr></tr>   \
<tr> <td>Shielded Dreadbloon Damage</td><td style="text-align: right; color:#59441C;"><b><span id="paragon-shielded-dreadbloon-output">coming soon!</span></b></td></tr></tr>   \
<tr> <td>Camoflagued Phayze Damage</td><td style="text-align: right; color:#000000;"><b><span id="paragon-phayze-output">coming soon!</span></b></td></tr></tr>   \
</table> \
<span style="font-size: 20px"><b>Total Elite Boss Damage</b></span><br /> \
<table style="width:100%;">   \
<tr> <td>Elite Boss Damage</td><td style="text-align: right; color:#228B22;"><b><span id="paragon-eliteboss-output">coming soon!</span></b></td></tr></tr>   \
<tr> <td>Unshielded E. Dreadbloon Damage</td><td style="text-align: right; color:#B6B6B6;"><b><span id="paragon-unshielded-elite-dreadbloon-output">coming soon!</span></b></td></tr></tr>   \
<tr> <td>Shielded E. Dreadbloon Damage</td><td style="text-align: right; color:#59441C;"><b><span id="paragon-shielded-elite-dreadbloon-output">coming soon!</span></b></td></tr></tr>   \
<tr> <td>Camoflagued E. Phayze Damage</td><td style="text-align: right; color:#000000;"><b><span id="paragon-elite-phayze-output">coming soon!</span></b></td></tr></tr>   \
</table> </div>   \
');
/* end of paragon power stuff */