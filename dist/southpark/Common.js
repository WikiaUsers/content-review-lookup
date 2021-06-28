//************************************************
// Imported Scripts
//************************************************
// Please See MediaWiki:ImportJS

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

//************************************************
// Username Template
//************************************************
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

//************************************************
// Wanted Files Tweak
//************************************************
$(function() {
    if ("Special" == wgCanonicalNamespace && "WantedFiles" == wgCanonicalSpecialPageName) {
        $('ol.special a.new').each(function() {
            var m = $(this).attr('href').match(/title=File:([^&]+)/);
            if (m) {
                $(this).attr({
                    href: '/wiki/Special:Upload?wpDestFile=' + m[1],
                    title: 'Upload ' + m[1]
                });
            }
        });
    }
});

//************************************************
// Adds Button to Edit Message Wall Greeting
//************************************************
$(function EditGreeting() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wds-button wds-is-squished" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px; background-color:#0c7c0c;color: #FBFCFC; border-color: #0c7c0c;"> Edit greeting	</a></div>');
		}
	}
});

//************************************************
// Disable Archive Edit Config
//************************************************
var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: true,
   textColor: '#D9D9D9',
   userLang: true
};

//************************************************
// Archive Old Blog Posts
//************************************************
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!"
};

//TAG CONFIG//