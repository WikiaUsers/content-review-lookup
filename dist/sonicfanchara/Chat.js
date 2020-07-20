if (wgCanonicalSpecialPageName === "Chat")  {
    /* Monchomans chat hacks */
importScriptPage("ChatOptions/code.js", "dev");
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to chat! Please remember to follow the <a href="/wiki/User_blog:The-Bismarck/Chat_Rules_2014-2015" target="_blank" title="Project:Chat" style="text-decoration:underline;vertical-align:top;">chat rules</a>! From Flareus F.EXE Accel'
$('#ChatHeader .wordmark').append('<span style="font-size:12pt;vertical-align:top;">'+chatTopic+'</div>')
}