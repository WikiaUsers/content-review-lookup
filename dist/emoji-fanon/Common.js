/* Any JavaScript here will be loaded for all users on every page load. */

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
	message: 'The admin blocked you. that your behavior from {{SITENAME}} has been in violation of our rules. As a result, you have been blocked for $2 due to the following action: $1<br>If you wish to appeal, either use the {{t|Unblock}} template and type in your reason on why you want to be unblocked, or request the [[https://emoji-fanon.fandom.com/wiki/Emoji_Fanon_Wiki:List_of_admins_and_users admins]] on their Message Walls at [[w:Community Central|Community Central]].'
};

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// AUTO-COLLAPSE LONG COMMENTS
function autoCollapseLongComments() {
    document.querySelectorAll('.Reply_body__PM9kM, .Comment_body__Dw-zH').forEach(function(element) {
        if (element.textContent.length > 500) {
            element.classList.add('collapsible-comment');
            element.style.maxHeight = '150px';
            element.style.overflow = 'hidden';
            element.style.position = 'relative';
            
            var readMore = document.createElement('a');
            readMore.textContent = 'Read more ›';
            readMore.style.cssText = 'position:absolute; bottom:0; right:0; background:linear-gradient(90deg, transparent, white 20%); padding-left:20px; color:#0066cc; cursor:pointer;';
            readMore.onclick = function() {
                element.style.maxHeight = 'none';
                this.remove();
            };
            
            element.appendChild(readMore);
        }
    });
}

// Optional config
window.welcomeMessage = {
  enabled: true,
  adminUsername: 'Charata',     // $4
  adminNickname: 'Charata',    // $3
  messageTitle: 'Hey there $1.',
  messageText: 'I know what you are here to edit. Do you want to create the first edit or just be in forum? i hope this message finds you.',
  debug: false,
  testAllEdits: false,
  preferTalk: false,
};

// Custom Edit Buttons

window.mwCustomEditButtons = (window.mwCustomEditButtons || []).concat([
    {
        imageFile: 'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
        speedTip: 'Redirect',
        tagOpen: '#REDIRECT[[',
        tagClose: ']]',
        sampleText: 'Insert Text'
    }
]);

// Import from dev
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WelcomeMessage.js',
        'u:dev:MediaWiki:QuickDiff/code.js',
        'u:dev:MediaWiki:ReferencePopups/code.js'
    ]
});