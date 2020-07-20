/* Chat topic */
/** Remember to escape single quotes in the topic using \' to prevent this from breaking. **/
$(function() { 
    $('#ChatHeader .public.wordmark')
        .prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">Read our rules before entering chat.<br />Have a wonderful time!</div>')
});

/* ChatTags */
importScriptPage('MediaWiki:ChatTags/code.js', 'dev');