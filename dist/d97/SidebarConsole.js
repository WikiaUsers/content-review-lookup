/* SIDEBAR CONSOLE SCRIPT BY ROBYN/DRAGONFREE97 */

console.log("[SC] Loading the Sidebar Console.");

/* Imports */
importScriptPage("User:Dragonfree97/Japanese.js","d97");
importScriptPage("User:Dragonfree97/Korean.js","d97");
importScriptPage("MediaWiki:TabCompleter.js","d97");
importScriptPage("MediaWiki:JacobsLadderSuite.js","d97");

ccVersionNumber = "1.2.2";

/* This adds the chat console box to the sidebar. */

if(!$("#sidebar-console-wrapper").length) { // prevents doubling
    $("#sidebar-top").append("<div id='sidebar-console-wrapper' style='width: 95%; margin-left: auto; margin-right: auto;'></div>");
}
if(!$("#sidebar-console-div").length) { // prevents doubling
    $("#sidebar-console-wrapper").append('<div id="sidebar-console-div"><div id="console-label" style="width:92%; color: white;font-size: 8.5pt;padding-left: 6px;padding-right: 6px; padding-top: 1px; border-top-left-radius: 10px; border-top-right-radius: 10px;margin-left: auto;margin-right: auto;text-align: center;">Magic Box</div><input id="sidebar-console" type="text" placeholder="Search &quot;help&quot; for more" name="chatconsole" style="height: initial !important;width: 98%;"></div>');
}
//setting background color
$("body").append('<a class="wikia-button" id="colorgrab-button">temp</a>'); // this ensures the correct background color
$("#console-label").css("background-color",$("a.wikia-button").css("background-color"));
$("#colorgrab-button").remove();

/* This interprets the input. */

$('[name="chatconsole"]').keypress(function(e) {
	if (e.which == 13) { // when enter is pressed
        chatCommandBase = this.value;
        // console.log("[SC] chatCommandBase is "+chatCommandBase);
		var i = chatCommandBase.indexOf(' ');
		// console.log("[SC] The value of i is "+i);
		this.value = "";
		if(i!=-1){ chatCommandNew = chatCommandBase.slice(0,i); }else{ chatCommandNew = chatCommandBase }
		
		// The following section parses the command for aliases etc
		
        if (typeof eval("chatCommands.".concat(chatCommandNew)) === "undefined"){
            if (typeof eval("commandAliases.".concat(chatCommandNew)) === "undefined"){
                chatCommandHead = "error";
                // console.log("[SC] chatCommandHead error")
            } else {
                chatCommandHead = eval("commandAliases.".concat(chatCommandNew));
                // console.log("[SC] chatCommandHead (via alias) is "+chatCommandHead);
            }
        } else {
            chatCommandHead = chatCommandNew;
            // console.log("[SC] chatCommandHead is "+chatCommandHead);
        }
		

		if(i!=-1){
            
            var chatCommandParams = [];
            evaluatedCommand = eval("chatCommands.".concat(chatCommandHead,".params"));
            // console.log("[SC] evaluatedCommand = "+evaluatedCommand);
            paramAnalysis = chatCommandBase.slice(i+1).trim();
                for(j = 0; j < evaluatedCommand; j++){
                    var i = paramAnalysis.indexOf(' ');
                    if(i==-1 || j == evaluatedCommand-1){
						chatCommandParams.push(paramAnalysis.trim());						
					}else{

						chatCommandParams.push(paramAnalysis.slice(0,i).trim());
					}
                    paramAnalysis = paramAnalysis.slice(i+1).trim();
                    // console.log("[SC] paramAnalysis = "+paramAnalysis);
                    // console.log("[SC] chatCommandParams = "+chatCommandParams);
                }
            // console.log("[SC] The head is '"+chatCommandHead+"' and the tail is '"+chatCommandParams+"'");
                switch(evaluatedCommand){
                    case 1:
                        eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead,".script('",chatCommandParams[0],"'); }"));
                        break;
                    case 2:
                        eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead,".script('",chatCommandParams[0],"','",chatCommandParams[1],"'); }"));
                        break;
                    case 3:
                        eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead,".script('",chatCommandParams[0],"','",chatCommandParams[1],"','",chatCommandParams[2],"'); }"));
                        break;
                    case 4:
                        eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead,".script('",chatCommandParams[0],"','",chatCommandParams[1],"','",chatCommandParams[2],"','",chatCommandParams[3],"'); }"));
                        break;
                    case 5:
                        eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead,".script('",chatCommandParams[0],"','",chatCommandParams[1],"','",chatCommandParams[2],"','",chatCommandParams[3],"','",chatCommandParams[4],"'); }"));
                        break;
                }
            commandFunction();

		}else{
            
            eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead,".script(); }"));
            commandFunction();
            // console.log("[SC] The head is '"+chatCommandHead+"'");
		}
        
	}
});

var commandAliases = { };

function newAlias(x,y) {
    commandAliases[x] = y;
    if(typeof chatCommands[y].aliases === "undefined") {
        chatCommands[y].aliases = x;
    } else {
        chatCommands[y].aliases += (", "+x);
    }
}

if(typeof chatCommands === "undefined") {
    chatCommands = {};
}

function newCommand(command,script,params,name,usage,info) {
    if(typeof chatCommands === "undefined") {
        chatCommands = {};
    }
    chatCommands[command] = {
        "script": script,
        "params": params,
        "name": name,
        "usage": usage,
        "info": info,
    };
}

newCommand("error", function() {
        JLAPI.InlineAlert("Error: this is not a valid console command.");
    },
    0, "Error message", "error", "Displays an error message");
    
newCommand("swiggle", function() {
        JLAPI.InlineAlert("throw me a swiggle honey");
    },
    0, "Test command", "swiggle", "Displays a test message");

newCommand("list", function() {
        keys = Object.keys(chatCommands);
        listCommands = "";
        for (i = 0; i < keys.length; i++) {
            listCommands = listCommands.concat(keys[i], " - ", eval("chatCommands.".concat(keys[i], ".name")), "<br>");
        }
        JLAPI.modal.buttonless("Command list",
            "<div style='height:200px; overflow-y: auto;'><b>Type <span style='color:red;'>info command</span> for more information on a specific command!</b><br />" + listCommands + "</div>", JLAPI.modal.close());
    }, 0, "Command list", "list", "Shows a list of commands"
);

newCommand("info", function(command) {
    if (typeof command === "undefined") {
        command = "info";
    }
    if (typeof eval("chatCommands.".concat(command)) === "undefined") {
        if (typeof eval("commandAliases.".concat(command)) === "undefined") {
            command = "info";
        } else {
            command = eval("commandAliases.".concat(command))
        }
    }
    if (typeof eval("chatCommands.".concat(command, ".aliases")) === "undefined") {
        aliases = "<i>None</i>";
    } else {
        aliases = eval("chatCommands.".concat(command, ".aliases"));
    }
    JLAPI.modal.buttonless(eval("chatCommands.".concat(command, ".name")),
        "<b>Usage: </b>" + eval("chatCommands.".concat(command, ".usage")) + "<br><b>Info: </b>" + eval("chatCommands.".concat(command, ".info")) + "<br><b>Aliases: </b>" + aliases, JLAPI.modal.close());
}, 1, "Command information", "info <span style='color:red;'>command</span>", "Displays information on <span style='color:red;'>command</span>");

newCommand("about", function() {
    JLAPI.InlineAlert("ChatConsole version " + ccVersionNumber + " by dragonfree97. This plugin is and will continue to be a work in progress.<br>Please report any and all bugs to Robyn (Dragonfree97).");
}, 0, "About", "about", "Returns plugin information");

newCommand("help", function() {
    JLAPI.modal.buttonless("SidebarConsole",
        "<div style='overflow-y:auto;height:200px;'><p>Welcome to the SidebarConsole! This is a plugin that allows you to execute commands in chat for faster navigation, displaying information, running JavaScript code, or even writing text in Japanese.</p><br /><p>A list of commands is available if you type in &quot;list&quot;, and you can get further information on each command by typing in &quot;info command&quot; where &quot;command&quot; is what you're trying to look up. Please note that some commands are for moderators only. All commands that deal with going to individual pages are case-sensitive.</p><br /><p>This script is maintained by HOAFanguying at the Animal Crossing Wiki and D97 Wiki. Thanks go to Dragonfree97 and Incongruence, for without them, this script would have never been created.</p></div>", JLAPI.modal.close());
}, 0, "Help window", "help", "Displays a help window.");

newCommand("s", function(input) {
    if (typeof input === "undefined") {
        input = "Main Page";
    }
    JLAPI.openPage(wgServer + "/wiki/Special:Search?search=" + input + "&fulltext=Search", "Search results for" + input);
}, 1, "Search local", "s <span style='color:red;'>query</span>", "Searches this wiki for <span style='color:red;'>query</span>");

newCommand("kr", function(input) {
    JLAPI.message.append(performKConversion(input), true);
}, 1, "Korean text generator", "kr <span style='color:red;'>text</span>", "Converts <span style='color:red;'>text</span> in the Latin alphabet into Hangul. Credit to Mauvecloud at mauvecloud.net");

newCommand("jh", function(input) {
    JLAPI.message.append(performHiraConversion(input.replace(/ /g, '')), true);
}, 1, "Japanese Hiragana text generator", "jh <span style='color:red;'>text</span>", "Converts <span style='color:red;'>text</span> in the Latin alphabet into Hiragana. Credit to Mauvecloud at mauvecloud.net");

newCommand("jk", function(input) {
    JLAPI.message.append(performKataConversion(input.replace(/ /g, '')), true);
}, 1, "Japanese Katakana text generator", "jk <span style='color:red;'>text</span>", "Converts <span style='color:red;'>text</span> in the Latin alphabet into Katakana. Credit to Mauvecloud at mauvecloud.net");

newCommand("chat", function(input) {
    if (typeof input === "undefined") {
        JLAPI.InlineAlert("Error: invalid parameters. You need to specify a wiki name!");
    } else {
        JLAPI.openPage("http://" + input + ".wikia.com/wiki/Special:Chat", "Link to " + input + " chatroom");
    }
}, 1, "Quick chat loader", "chat <span style='color:red;'>wiki</chat>", "Loads <span style='color:red;'>wiki</chat>'s chatroom.");

newCommand("rc", function(input) {
    if (typeof input === "undefined") {
        input = siteUrl;
    }
    JLAPI.openPage("http://" + input + ".wikia.com/wiki/Special:Recentchanges", "Link to " + input + " recent changes");
}, 1, "Quick recent changes loader", "rc <span style='color:red;'>wiki</span>", "Loads <span style='color:red;'>wiki</chat>'s recent changes. If none specified, loads this wiki's.");

newCommand("main", function(input) {
    if (typeof input === "undefined") {
        input = siteUrl;
    }
    JLAPI.openPage("http://" + input + ".wikia.com/wiki/Main Page", "Link to " + input + " main page. If none specified, loads this wiki's.");
}, 1, "Quick main page loader", "main <span style='color:red;'>wiki</span>", "Loads <span style='color:red;'>wiki</span>'s main page");

newCommand("k", function(input) {
    if (typeof input === "undefined") {
        JLAPI.InlineAlert("Error: invalid parameters. You need to specify a user to kick!");
    } else {
        mainRoom.kick({
            name: input
        });
    }
}, 1, "Kick (mod only)", "k <span style='color:red;'>user</span>", "Kicks <span style='color:red;'>user</span>. Case-sensitive.");

newCommand("u", function(input) {
    if (typeof input === "undefined") {
        input = wgUserName;
    }
    JLAPI.openPage(wgServer + "/wiki/User:" + input, "Link to " + input + "'s user page");
}, 1, "User page loader", "u <span style='color:red;'>user</span>", "Loads <span style='color:red;'>user</span>'s user page. If none specified, loads your own.");

newCommand("sf", function(wiki, query) {
    console.log("[SC] Attempting to search " + wiki + " wiki for " + query);
    JLAPI.openPage("http://" + wiki + ".wikia.com/wiki/Special:Search?search=" + query + "&fulltext=Search", "Search results on " + wiki + " wiki for " + query);
}, 2, "Search other wikis", "sf <span style='color:red;'>wiki</span> <span style='color:blue;'>query</span>", "Searches <span style='color:red;'>wiki</span> for <span style='color:blue;'>query</span>");

newCommand("b", function(time, user) {
    if(time > 0) {
        var a = new models.BanCommand({
            userToBan: user,
            time: time * 3600,
            reason: "Misbehaving in chat"
        });
        mainRoom.socket.send(a.xport());
    } else {
        JLAPI.InlineAlert("Error: Please specify a valid time.");
    }
}, 2, "Banhammer (mod only)", "b <span style='color:red;'>time</span> <span style='color:blue;'>user</span>", "Bans <span style='color:blue;'>user</span> for <span style='color:red;'>time</span>. Case-sensitive.");

newCommand("bu", function(user) {
    var a = new models.BanCommand({
        userToBan: user,
        time: 410313600,
        reason: "User under 13"
    });
    mainRoom.socket.send(a.xport());
}, 1, "COPPA enforcer (mod only)", "bu <span style='color:red;'>user</span>", "Bans <span style='color:red;'>user</span> indefinitely with the reason 'User under 13'. Case-sensitive.");

newCommand("ba", function(user) {
    var a = new models.BanCommand({
        userToBan: user,
        time: 410313600,
        reason: "Alt of a banned user"
    });
    mainRoom.socket.send(a.xport());
}, 1, "Alt banner (mod only)", "ba <span style='color:red;'>user</span>", "Bans <span style='color:red;'>user</span> indefinitely with the reason 'Alt of a banned user'. Case-sensitive.");

newCommand("id", function() {
    JLAPI.InlineAlert("This room's ID is " + roomId);
}, 0, "Room ID lookup", "id", "Returns this chatroom's internal ID number");

newCommand("afk", function() {
    mainRoom.setAway();
}, 0, "Go AFK", "afk", "Sets your status to 'away'.");

newCommand("clear", function() {
    ccInitialLength = $("#" + JLAPI.chatroomID + " > ul > li").length - 1;
    for (i = 0; i < ccInitialLength; i++) {
        $("#" + JLAPI.chatroomID + " > ul > li")[0].remove();
        if ($.inArray("continued", $("#" + JLAPI.chatroomID + " > ul > li")[0].classList) != -1) {
            $("#" + JLAPI.chatroomID + " > ul > li")[0].classList.remove("continued");
        }
    }
    JLAPI.InlineAlert("Chat cleared");
}, 0, "Chat clearer", "clear", "Removes all messages from the chatroom");

newCommand("wall", function(user) {
    if (typeof user === "undefined") {
        user = wgUserName;
    }
    JLAPI.openPage(wgServer + "/wiki/Message_Wall:" + user, "Link to " + user + "'s message wall");
}, 1, "Quick message wall", "wall <span style='color:red;'>user</span>", "Loads <span style='color:red;'>user</span>'s message wall. If none specified, loads your own.");

newCommand("ijs", function(wiki, title) {
    $("head").append("<script>importScriptPage('" + title + "','" + wiki + "');</script>");
    JLAPI.InlineAlert("Importing '" + title + "' from '" + wiki + "'");
}, 2, "Script importer", "ijs <span style='color:red;'>wiki</span> <span style='color:blue;'>page name</span>", "Imports <span style='color:blue;'>page name</span> from <span style='color:red;'>wiki</span> as a piece of JavaScript code. Advanced users only - don't execute any code on your computer which you don't know what it does.");

newCommand("icss", function(wiki, title) {
    $("head").append("<script>importStylesheetPage('" + title + "','" + wiki + "');</script>");
    JLAPI.InlineAlert("Importing '" + title + "' from '" + wiki + "'");
}, 2, "Stylesheet importer", "icss <span style='color:red;'>wiki</span> <span style='color:blue;'>page name</span>", "Imports <span style='color:blue;'>page name</span> from <span style='color:red;'>wiki</span> as a CSS stylesheet.");

newCommand("ec", function(user) {
    if (typeof user === "undefined") {
        user = wgUserName;
    }
    JLAPI.openPage(wgServer + "/wiki/Special:EditCount/" + user, "Link to " + user + "'s edit count");
}, 1, "Quick edit count", "ec <span style='color:red;'>user</span>", "Loads <span style='color:red;'>user</span>'s edit count. If no user is specified, it will load your own.");

newCommand("ecf", function(wiki, user) {
    JLAPI.openPage("http://" + wiki + ".wikia.com/wiki/Special:EditCount/" + user, "Link to " + user + "'s edit count on " + wiki + " wiki");
}, 2, "ecf", "ecf <span style='color:red;'>wiki</span> <span style='color:blue;'>user</span>", "Loads <span style='color:blue;'>user</span>'s edit count on <span style='color:red;'>wiki</span>");

newCommand("fd", function() {
    k = old.indexOf(')');
    old = old.slice(k + 1).trim();
    document.title = old;
}, 0, "Fix doubling bug", "fd", "Fixes a minor issue with TitleNotifications");

newCommand("cbl", function(user) {
    JLAPI.openPage("http://animalcrossing.wikia.com/wiki/Special:Log/chatban?page=User%3A" + user.replace(/ /g, '+'));
}, 1, "Chat ban log viewer", "cbl <span style='color:red;'>user</span>", "Loads the chat ban log for <span style='color:red;'>user</span>");

newCommand("bl", function(user) {
    JLAPI.openPage("http://animalcrossing.wikia.com/index.php?title=Special%3ALog&type=block&user=&page=User%3A" + user.replace(/ /g, '+') + "&year=&month=-1");
}, 1, "Block log viewer", "bl <span style='color:red;'>user</span>", "Loads the block log for <span style='color:red;'>user</span>");

newCommand("js", function(code) {
    JLAPI.InlineAlert("Output: " + eval(code).toString());
}, 1, "JavaScript executor", "js <span style='color:red;'>code</span>", "Runs <span style='color:red;'>code</span> and outputs the result into the chat. Advanced users only - don't execute any code on your computer which you don't know what it does.");

newCommand("sb", function() {
    JLAPI.openPage(wgServer + "/wiki/" + wgSiteName + ":Sandbox");
}, 0, "Sandbox loader", "sb", "Opens the sandbox");

newCommand("c", function(user) {
    if (typeof user === "undefined") {
        user = wgUserName;
    }
    JLAPI.openPage(wgServer + "/wiki/Special:Contributions/" + user, "Link to " + user + "'s contributions");
}, 1, "Quick contributions", "c <span style='color:red;'>user</span>", "Loads <span style='color:red;'>user</span>'s contributions. If no user is specified, it will load your own.");

newCommand("mw", function(page) {
    if (typeof page === "undefined") {
        page = "Chat.js";
    }
    JLAPI.openPage(wgServer + "/wiki/MediaWiki:" + page, "Link to MediaWiki:" + page);
}, 1, "Quick MediaWiki", "mw <span style='color:red;'>page</span>", "Loads MediaWiki:<span style='color:red;'>page</span>. If no user is specified, it will load Chat.js.");

newCommand("n", function(page) {
    JLAPI.openPage(wgServer + "/wiki/" + page, "Link to " + page);
}, 1, "Quick navigation", "n <span style='color:red;'>page</span>", "Opens <span style='color:red;'>page</span>");

console.log("[SC] Sidebar Console has been loaded. Have a nice day");

newAlias("ban","b");
newAlias("kickban","b");
newAlias("chatban","b");
newAlias("kick","k");
newAlias("korean","kr");
newAlias("hangul","kr");
newAlias("kata","jk");
newAlias("katakana","jk");
newAlias("hiragana","jh");
newAlias("hira","jh");
newAlias("search","s");
newAlias("searchf","sf");
newAlias("searchforeign","sf");
newAlias("searchother","sf");
newAlias("banunder","bu");
newAlias("banunderage","bu");
newAlias("banalt","bu");
newAlias("user","u");
newAlias("userpage","u");
newAlias("messagewall","wall");
newAlias("importscript","ijs");
newAlias("importjs","ijs");
newAlias("importstylesheet","icss");
newAlias("importcss","icss");
newAlias("recentchanges","rc");
newAlias("mainpage","main");
newAlias("roomid","id");
newAlias("editcount","ec");
newAlias("editcountother","ecf");
newAlias("editcountforeign","ecf");
newAlias("editcountf","ecf");
newAlias("fixdouble","fd");
newAlias("fixdoubling","fd");
newAlias("fixd","fd");
newAlias("fdoubling","fd");
newAlias("chatbanlog","cbl");
newAlias("banlog","cbl");
newAlias("log","cbl");
newAlias("blocklog","bl");
newAlias("sandbox","sb");
newAlias("javascript","js");
newAlias("script","js");
newAlias("contributions","c");
newAlias("contribs","c");
newAlias("coppa","bu");
newAlias("away","afk");