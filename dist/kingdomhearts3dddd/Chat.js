importArticles({
       type: 'script',
       articles: [
            'u:dev:MediaWiki:ChatOptions/beta.js',
            'u:shining-armor:MediaWiki:ChatTags/code.js',
            'u:dev:MediaWiki:!kick/code.js',
            'u:dev:MediaWiki:!mods/code.js',
            'u:dev:MediaWiki:QuickModTools/code.js',
            'u:dev:MediaWiki:ChatAnnouncements/code.js',
            'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js'
            /**
             * TODO: Create a new fork for LMBW's ChatParty code
             *       and make fixes to the test button.
             * NOTE: ChatParty.js has been temporarily disabled because
             *       the script is now considered out of date and will
             *       be fixed.
             **/
            //'MediaWiki:ChatParty.js',
            //'MediaWiki:Chat.js/Sandbox.js',  /* For sandboxing codes */
             // 'MediaWiki:chat.js/test.js' /* For testing */
       ]
});

// Mark Administration Members //
/**
 * TODO: Create a separate script for filtering
 *       user groups.
 **/
$('#ChatHeader .User').attr('data-user', wgUserName.replace(' ', '_').replace(/["']/g, ''));
   setInterval(function() {
        'use strict';
        $('.User').each(function(){
            $(this).removeClass('chatmoderator');
            if ($(this).attr('data-user').match(/JjBlueDreamer1/)) {
                $(this).addClass('founder');
            }
            $(this).removeClass('chatmoderator');
            if ($(this).attr('data-user').match(/CouncilOrg/)) {
                $(this).addClass('bureaucrat');
            }
            if ($(this).attr('data-user').match(/(Mikiu Hatsune|Ultimate Dark Carnage|Hypercane|Kamiishiro|CommanderPeepers)/)) {
                 $(this).addClass('admin');
            }
            if ($(this).attr('data-user').match(/(CPW Community Admin|DannyOltageBD|Dr.Blaze|Freekingamer|JigokuGernoid|Sassmaster15)/)) {
                $(this).addClass('chat-mod');
            }
            if ($(this).attr('data-user').match(/Hypercane Bot/)) {
                $(this).addClass('bot');
            }
    });
	}, 1000);