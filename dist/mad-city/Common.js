const urlParams = new URLSearchParams(window.location.search);

//Forums lock (after 30 days)
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This thread is archived.",
    expiryBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been unedited for <actualDays> days. It is considered <b>archived</b> - the discussion is over. If you feel this thread needs additional information, contact an administrator.",
    lockMessageWalls: true,
};

//Edit summary dropdown
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: [
        '(click to browse)',
        'Expanding', [
            'Added content',
            'Added images',
            'Added categories'
            
         ],
         'Changing', [
            'Corrected grammar',
            'Updated information',
            'Cleaned page'
            
         ]    ,  
         'Rules',[
            'Reverted vandalism',
            'Removed spam',
            'Removed inappropriate content',
            'Removed false information'
         ]
         /* etc. */
    ]
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard block/code.js', 'u:dev:MediaWiki:MarkBlocked.js', 'u:dev:EditConflictAlert/code.js'
    ]
});

importScriptPage('AjaxRC/code.js', 'dev');
/* Any JavaScript here will be loaded for all users on every page load. */
// This is an example configuration
window.railWAM = {
    logPage:"Project:WAM Log",
    autoLogForUsers:"MikhailMCraft"
};

//auto refresh
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
];

//MediaWiki:Common.js quicklink button (awesomestrucid's userpage)
function GoToJavascriptPage() {
        window.location = "https://mad-city.fandom.com/wiki/MediaWiki:Common.js";
    }

//Rank function (awesomestrucid's userpage)
function whatrankareu() {
        if (!isNaN(document.getElementById("whatrankyouare").value)) {
            if (document.getElementById("whatrankyouare").value < 100 && document.getElementById("whatrankyouare").value>-1) {
                document.getElementById("xpchangetext").innerHTML = '<p>' + 'Good luck getting to rank ' + (parseInt(document.getElementById("whatrankyouare").value) + 1).toString() + '</p>';
            } else if (document.getElementById("whatrankyouare").value == 100) {
                document.getElementById("xpchangetext").innerHTML = '<p>Wow, nice job getting to the max rank!</p>';
            } else {
                alert("The maximum rank is 100!");
            }
        } else {
            alert("Please enter a number.");
        }
    }

if(urlParams.get('veaction')===null &&urlParams.get('action')===null){
    //AwesomeStrucid Userpage Customizations
    if (mw.config.get('wgPageName') == 'User:Awesomestrucid') {
        document.getElementById('mw-content-text').innerHTML += '<button onclick="GoToJavascriptPage()">Javascript Link</button><br></br><br></br>';
        var awesomestrucid_userdiv = document.createElement("div");
        awesomestrucid_userdiv.style = "width: 120px;height: 120px;animation: awesomestrucid 5.8s infinite;";
        var awesomestrucid_usernode = document.createTextNode("Hello, I am awesomestrucid welcome to my userpage!");
        awesomestrucid_userdiv.appendChild(awesomestrucid_usernode);
        document.getElementById('mw-content-text').appendChild(awesomestrucid_userdiv);
        document.getElementById('mw-content-text').innerHTML += '<br></br>';
        document.getElementById('mw-content-text').innerHTML += '<center id="xpchangetext"><p>What rank are you in mad city?</p><input id="whatrankyouare"></input><button onclick="whatrankareu()">Submit</button></center>';
    }
}
//END OF AwesomeStrucid Userpage Customizations