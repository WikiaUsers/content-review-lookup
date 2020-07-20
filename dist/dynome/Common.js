/* Any JavaScript here will be loaded for all users on every page load. */
 
// Generating message on DW:DCP
function setGeneratedMessage() {
    var sender = document.getElementById("messageGeneratorSenderName");
    var name = document.getElementById('messageGeneratorName');
    var gameName = document.getElementById('messageGeneratorGameName');
    var url = document.getElementById('messageGeneratorGameUrl');
    var place = document.getElementById('generatedMessage');
    var copy = document.getElementById("generatorCopyToClipboard");
    var includeUrl = document.getElementById("messageGeneratorPageExists");
    var includeFeatured = document.getElementById("messageGeneratorIncludeFeatured");
    var isDiscord = document.getElementById('messageGeneratorIsDiscord')
    place.innerHTML =
"Hello, " + name.value + ".<br><br>My name is " + sender.value + ".  I am an administrator on the " + (isDiscord.checked ? "Dynome Wikia (https://dynome.fandom.com)" : "[Dynome Wikia](https://dynome.fandom.com)") + ", an official encyclopedia for all things Roblox. We'd love to have you as part of our developer community."
copy.style.display = "block"
    if (includeUrl.checked) {
        url.style.display = "block"
    }
    else {
        url.style.display = "none"
    }
}
 
function copyGeneratedMessage() {
    var element = document.getElementById("generatedMessage")
    const el = document.createElement('textarea')
    el.value = element.innerText;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 
    var success = document.getElementById("copySuccess")
    success.style.display = "block"
    setTimeout(function() {
        success.style.display = "none"
    },1500)
}
 
window.onload = function() {
    var elem = document.getElementById("messageGenerator");
	if(elem !== null) {
		 elem.innerHTML =
		'Fill out the following fields to generate a Dynome Wikia Development Feedback message:<br><input style="margin-bottom:10px" id="messageGeneratorSenderName" placeholder="Your Name" value="Thundermaker300" onchange="setGeneratedMessage()"></input><br><input style="margin-bottom:10px" id="messageGeneratorName" placeholder="Username" onchange="setGeneratedMessage()"></input><br><input style="margin-bottom:10px" id="messageGeneratorGameName" placeholder="Game Name" onchange="setGeneratedMessage()"></input><br><input style="margin-bottom:10px" id="messageGeneratorGameUrl" placeholder="Game Wiki Page (Full URL)" onchange="setGeneratedMessage()"></input><br><input style="margin-bottom:10px" type="checkbox" id="messageGeneratorPageExists" checked onchange="setGeneratedMessage()">Wiki Page Exists</input><br><input style="margin-bottom:10px" type="checkbox" id="messageGeneratorIncludeFeatured" onchange="setGeneratedMessage()">Include Featured Question</input><br><input style="margin-bottom:10px" type="checkbox" id="messageGeneratorIsDiscord" onchange="setGeneratedMessage()">Optimized for Discord</input><br><span id="generatedMessage"></span><br><button id="generatorCopyToClipboard" style="display:none" onclick="copyGeneratedMessage()">Copy Text</button><span id="copySuccess" style="display:none">Copied!</span>';
		setGeneratedMessage();
	}
    importScript("MediaWiki:RubeezUSDConverter.js");
    //importScript("MediaWiki:StaffWidget.js");
};
 
// Progress Bars
importScript("MediaWiki:ProgressBar.js");
 
window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 60,
    warningDays: 30,
    banners: true,
    warningPopup: true,
    expiryBannerMessage: "This topic has been inactive for <actualDays> days, and has been <b>archived</b>.  New posts cannot be added to this thread.",
    warningBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been inactive for <actualDays> days. It is considered <b>archived</b>.  Please do not add to it unless it <i>needs</i> a response.",
};
 
window.railWAM = {
    logPage:"Project:WAM Log"
};
 
// Import scripts for all users
importArticles({
    type: "script",
    articles: [
        "w:c:dev:InputUsername/code.js",
        "w:c:dev:DisableBotMessageWalls/code.js",
        'u:dev:MediaWiki:WallGreetingButton/code.js',
        'u:dev:MediaWiki:RailWAM/code.js',
    ]
});
 
// Import user group scripts (Mark Otaris)
var ug = mw.config.get("wgUserGroups").join(), group;
 
if      (/sysop/.test(ug))             group = "sysop";
else if (/content-moderator/.test(ug)) group = "content-moderator";
else if (/autoconfirmed/.test(ug))     group = "autoconfirmed";
 
if (group)
    importScript("MediaWiki:Group-" + group + ".js");