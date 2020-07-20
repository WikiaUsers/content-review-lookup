var sandboxName;
if(wgPageName == sandboxName) {
    if(wgAction == 'view') {
        $("#WikiaArticle").prepend("<table cellpadding='5px' cellspacing='0px'><tr><td style='background-color:whitesmoke;'><i>Welcome to the <b>Sandbox</b>! This page is for editing experiments. Feel free to try your skills at formatting here.  To edit, click <b><a href='?action=edit'>here</a></b> or on <b><i>Edit</i></b> at the top of the page, make your changes in the dialog box, and click the <b>Publish</b> button when you are finished.  Content added here will <b>not</b> stay permanently.</i><br /><i>Please do not place offensive or libelous content in the sandbox. Also, you may add your own sandbox <a href='/wiki/Special:MyPage/Sandbox'>here</a>.</i></td></tr></table>");
    } else if(wgAction == "edit") {
        $("#EditPageRail").prepend("<div style='padding:8px;border-radius:0 !important;border:1px solid #ddd;background-color:white;font-size:13px;'>Welcome to the Sandbox! This page is for editing experiments. Feel free to try your skills at formatting here.</div>");
    }
}