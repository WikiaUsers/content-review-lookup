//Replaces Magic word {{USERNAME}} with the name of the user currently browsing the page
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);
//END OF {{USERNAME}} REPLACEMENT

// MessageBlock extension, see [[w:c:dev:MessageBlock]]
window.MessageBlock = {
	title: 'Blocked',
	message: 'Our staff members have determined that your behavior at the {{SITENAME}} has been in violation of our [[Project:Rules|rules]]. As a result, you have been blocked for $2 due to the following action: $1<br>If you wish to appeal, either use the {{t|Unblock}} template and type in your reason on why you want to be unblocked, or request the [[User:SqaureCube|highly]] [[User:TheOfficialJJPM7984|active]] [[User:YoshiFanon|administrators]] on their Message Walls at [[w:Community Central|Community Central]].'
};

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };