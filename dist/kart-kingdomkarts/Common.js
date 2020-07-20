importArticles({
    type: 'script',
    articles: [
        'u:dev:Colors/code.js',
    ]
});
$(function() {
 if (wgAction === 'view' && wgUserName !== null) {
     $('.insertusername').text(wgUserName);
 }
});
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:InputUsername/code.js"
    ]
});
var MessageBlock = {
  title : 'Banned from the wiki.',
  message : 'Hi. I am an admin for the Kart Kingdom wiki. This is an auto message. I am here to inform you that you have been banned for a duration of $2 for the following reason: "$1". <br /><b>Do not attempt to evade a ban.</b> Evading a ban, regardless of your intentions, is a punishable offence and will likely extend your block if you have not been permanently banned. If you feel like you have been blocked for an incorrect reason, you may contact an administrator for guidance. Have a lovely day.'
};