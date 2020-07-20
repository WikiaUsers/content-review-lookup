// Rules button for Wiki Navigation

$(function() {
    $('.WikiHeader nav ul li.marked ul').append('<li style="background-color:skyblue;height:32px;"><a class="subnav-2a" href="/wiki/Skyscraper Wiki:Rules">Rules</a></li>');
});

// Import Scripts

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PurgeButton/code.js'
    ]
});

// Sandbox Script

if(wgPageName == "Skyscraper_Wiki:Sandbox") { $("#WikiaArticle").prepend("<table cellpadding='5px' cellspacing='0px'><tr><td style='background-color:whitesmoke;'><i>Welcome to the <b>Wikia Sandbox</b>! This page is for editing experiments. Feel free to try your skills at formatting here.  To edit, click <b><a href='http://skyscrapers.wikia.com/wiki/Project:Sandbox?action=edit'>here</a></b> or on <b><i>Edit</i></b> at the top of the page, make your changes in the dialog box, and click the <b>Publish</b> button when you are finished.  Content added here will <b>not</b> stay permanently.</i><br /><i>Please do not place offensive or libelous content in the sandbox. Also, you may add your own sandbox <a href='http://skyscrapers.wikia.com/wiki/Special:MyPage/Sandbox'>here</a>.</i></td></tr></table>"); }

if(window.location.href == "http://skyscrapers.wikia.com/wiki/Skyscraper_Wiki:Sandbox?action=edit") { $("#EditPageRail").prepend("<div style='padding:8px;border-radius:0 !important;border:1px solid #ddd;background-color:white;font-size:13px;'><p style='background-color: #a6ebff;padding: 4px;border-radius: 3px;'><b>Note:</b></p><br />Welcome to the Wikia Sandbox! This page is for editing experiments. Feel free to try your skills at formatting here.</div>"); }

if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}