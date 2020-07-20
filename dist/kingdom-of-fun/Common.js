///////////////////////////////////////////////////////////////////////////
//Credits would at least go to [[User:Psychobilly2422]] because some of  // 
//the JavaScript coding first came from the Five Nights at Freddy's Wiki.//  
///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//This page is fragile and can easily break, even through a single      //
//mistake so don't edit this JavaScript page before telling             //
//[[User:Pinkgirl234]] first.                                           //
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//Note to all sysops: All JavaScript placed here are intended to be safe//
//and abides with the Terms of Use. Malicious JavaScript is STRICTLY not//
//allowed. Do that and you're BLOCKED!!! Thanks for listening!          //
//////////////////////////////////////////////////////////////////////////

///////////////////////////////
// All site JavaScript start!//
//////////////////////////////

//JavaScript for the "Autorefresh "for Recent Wiki Activity
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the ongoing wiki activity';

//Custom message for old locked blogs
window.LockOldBlogs = {
    expiryMessage: "This blog hasn't been commented on for over 30 days. There is no longer a need to comment on this blog."
};

 //Custom message for old forum threads
window.LockForums = {
    expiryDays: 30, //After a thread does not receive a new reply for 30 days, it will be locked
    expiryMessage: "This thread hasn't recieved any replies for over 30 days. There is no longer a need to leave a reply on this thread."
};

 //Automated message of a blocked user
var MessageBlock = {
    title : 'Block',
    message : 'You have been blocked from the Kingdom Of Fun Wikia for <b>$2</b> for the given reason(s) of: <u>$1</u>',
    autocheck : true
};
 
//Support for the USERNAME template - Replaces {{USERNAME}} with the name of the user browsing the page
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 

//Support for Template:Emote, all credits to [[User:Bobogoobo]] from the MLP Wiki for it
if ($('.emote-template').length || $('#WikiaArticleComments').length) {
    $(function() {
        function emotify($this) {
            var emote = $this.text();
            var url = emotes.match(
              new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' + 
              emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + //escape specials, from MDN
              ')', 'i'));
            if (url) {
                url = url[1];
                $this.html($('<img />', {'src':url, 'alt':emote}));
            }
        }
 
        var emotes = '';
        $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' + 
          '&rvprop=content&format=json', function(data) {
            emotes = data.query.pages['2182'].revisions[0]['*'];
            // 2182 is the wgArticleId of MediaWiki:Emoticons
 
            $('.emote-template').each(function() {
                emotify($(this));
            });
        });
 
        $('#WikiaArticleFooter').on('DOMNodeInserted', function() {
            if ($('.emote-template').length === $('.emote-template img').length) {
                return;
            }
 
            $('#WikiaArticleFooter .emote-template').each(function() {
                if (!($(this).children('img').length)) {
                    emotify($(this));
                }
            });
        });
    });
}

//Message Wall tags for all the local staff members
window.MessageWallUserTags = {
    tagColor: '#68008E',
    glow: true,
    glowSize: '15px',
    glowColor: '#68008E',
    users: {
        'Pinkgirl234': 'Kingdom Founder',
        'PopRox6012': 'High Guardian',
        'TheKrazyStew': 'Guardian',
        'TheAnonymousA': 'Discussion Guardian',
        'DB511611': 'Chat Knight',
        'Freeman23': 'Reverser',
        'Hayashi-chan': 'Reverser',
    }
};

//Custom user tags for the local staff members in this wiki
window.UserTagsJS = {
	modules: {},
	tags: {
                founder: {u:'Kingdom Founder', title: 'This user is the founder of the Kingdom Of Fun Wikia.'},
                bureaucrat: {u:'High Guardian', title: 'This user is a bureacrat in the Kingdom Of Fun Wikia.'},
                sysop: {u:'Guardian', title: 'This user is an administrator in the Kingdom Of Fun Wikia.'},
                rollback: {u:'Reverser', title: 'This user is a rollback in the Kingdom Of Fun Wikia.'},
                threadmoderator: {u:'Discussion Guardian', title: 'This user is a discussion moderator in the Kingdom Of Fun Wikia.'},
                chatmoderator: {u:'Chat Knight', title: 'This user is a chat moderator in the Kingdom Of Fun Wikia.'},
                queenofmagic: {u:'Queen Of Magic', title: 'This user is the queen of magic.'},
                popcorn: {u:'Popcorn', title: 'This user is popcorn :3.'},
                saladqueen: {u:'Salad Queen', title: 'This user is a salad queen.'},
                primalina: {u:'Queen Primalina', title: 'This user is Queen Primalina.'},
                knightofspace: {u:'Knight of Space', title: 'This user is a knight of space.'},
                royaljester: {u:'Royal Jester', title: 'This user is the royal jester.'},
                minecraftfan: {u:'Minecraft Fan', title: 'This user is a fan of Minecraft.'},
                cheddarcheese: {u:'Cheddar Cheese', title: 'This user is cheddar cheese :3.'},
                paxadoran: {u:'Paxadoran', title: 'This user is a Paxadoran.'},
                pegasister: {u:'Pegasister', title: 'This user is a female fan of My Little Pony.'},
                brony: {u:'Brony', title: 'This user is a male fan of My Little Pony.'},
                fnaffan: {u: 'FNAF Fan', title: 'This user is a fan of Five Nights at Freddys.'},
                pvzfan: {u: 'PvZ Fan', title: 'This user is a fan of Plants vs. Zombies.'},
                sufan: {u: 'Steven Universe Fan', title: 'This user is a fan of Steven Universe.'},
                poet: {u:'Royal Poet', title: 'This user is the Royal Poet.'},
	}
};
 
UserTagsJS.modules.custom = {
    'Pinkgirl234': ['founder', 'queenofmagic', 'primalina', 'pegasister'],
    'PopRox6012': ['bureaucrat', 'popcorn', 'knightofspace', 'pegasister'],
    'Hayashi-chan': ['saladqueen', 'royaljester', 'pegasister'],
    'TheKrazyStew': ['paxadoran', 'minecraftfan', 'cheddarcheese'],
    'TheAnonymousA': ['poet']
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'newuser'
];

UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat', 'founder'], 
    chatmoderator: ['sysop', 'bureaucrat', 'rollback'],
    rollback: ['sysop'], 
    newuser: ['chatmoderator', 'bannedfromchat'], 
};

UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; //This is equivalent to almost a full month

UserTagsJS.modules.userfilter = {
    'Pinkgirl234' : ['bureaucrat'],
};