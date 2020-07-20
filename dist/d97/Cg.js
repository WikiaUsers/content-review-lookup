/* --------------------
  CHAT GAME API v 0.10
-------------------- */

// Still to do:
// spectating
// more than 2 players
// savegames
// options dialogs
// more games!!!!

importScriptPage("MediaWiki:JacobsLadderSuite.js", "d97");
importScriptPage("MediaWiki:JqueryUI.js", "d97");
importScriptPage("MediaWiki:D97encryption.js", "d97");
// Load encryption and other imports

// System commands
cgs = {
    givegametype: {
        action: function(name) {
            // Replies to initial connection attempt with gametype
            //console.log("[CG] Alice: I'm here, Bob! Here's the gametype.");
            ChatGame.communicate("cgs-receivegametype-" + ChatGame.currentGameType);
            ChatGame.currentPlayer = "player1";
            //console.log("[CG] Alice: I'm player " + ChatGame.currentPlayer);
            ChatGame.otherPlayerName = name;
            $("#cancel-button").remove();
            clearTimeout(ChatGame.inviteTimeout);
            ChatGame.pingFunction = setTimeout(function() {
                ChatGame.checkConnection();
            }, ChatGame.timeoutSetting * 1000); //connection checker
        },
        params: 1,
    },
    receivegametype: {
        action: function(input) {
            ChatGame.currentGameType = input;
            //console.log("[CG] Bob: Thanks, Alice! Loading the game.");
            ChatGame.communicate("cgs-gameload");
            // Now we know what game we're playing, we know which game to load.
            ChatGame.loadGame(input);
            ChatGame.currentPlayer = "player2";
            //console.log("[CG] Bob: I'm player " + ChatGame.currentPlayer);
            ChatGame.pingFunction = setTimeout(function() {
                ChatGame.checkConnection();
            }, ChatGame.timeoutSetting * 1000); // connection checker
        },
        params: 1,
    },
    gameload: {
        action: function() {
            ChatGame.loadGame(ChatGame.currentGameType);
        },
        params: 0,
    },
    disconnect: {
        action: function() {
            JLAPI.InlineAlert("The other player disconnected.");
            JLAPI.modal.close();
            clearTimeout(ChatGame.pingFunction);
            ChatGame.reset();
        },
        params: 0,
    },
    ping: {
        action: function() {
            console.log("cgs-ping: We got pinged! Trying to reply");
            ChatGame.communicate("cgs-pingreply");
        },
        params: 0,
    },
    pingreply: {
        action: function() {
            ChatGame.isPinged = true;
            console.log("cgs-pingreply: We got a reply from our ping.");
            ChatGame.pingFunction = setTimeout(function() {
                ChatGame.checkConnection();
            }, ChatGame.timeoutSetting * 1000);
            a = Date.now() - ChatGame.pingTime;
            //console.log("Ping: " + a);
        },
        params: 0,
    }
};

// Plugin code
ChatGame = {
    displayDisclaimer: function() {
        if (!JLAPI.cookie.load("ChatGame.accepted")) {
            a = confirm("By clicking 'OK' you agree to give ChatGame permission to send messages in chat on your behalf.\n\nClick 'Cancel' if you want a link to the ChatGame privacy policy and explanation of why this is necessary.");
            if (a === true) {
                JLAPI.cookie.save("ChatGame.accepted", "true", 7); // one week time out
                return true;
            } else {
                JLAPI.InlineAlert("ChatGame privacy policy: <a href='https://d97.wikia.com/wiki/MediaWiki:Cg.js/doc'>https://d97.wikia.com/wiki/MediaWiki:Cg.js/doc</a>");
                return false;
            }
        } else {
            return true;
        }
    },

    updateinfo: function() {
        a = document.getElementById("gameSelector").selectedIndex;
        if(ChatGame.gameList[a].mode == "single") {
            $("#options-fieldset").attr("disabled", true);   
        } else {
            $("#options-fieldset").attr("disabled", false);
        }
        $("#gameInfo").html(ChatGame.gameList[a].info);
        $("#authorInfo").html(ChatGame.gameList[a].author);
        $("#modeInfo").html(ChatGame.gameList[a].mode);
    },

    communicate: function(command) {
        JLAPI.message.send("!ChatGame " + ChatGame.otherPlayerName + " " + dEncryption.encrypt("CG" + ChatGame.currentGameType + ChatGame.currentGameRoom + command, ChatGame.currentGamePass));
    },

    checkConnection: function() {
        ChatGame.isPinged = false;
        setTimeout(function() {
            if (ChatGame.isPinged == false && ChatGame.gameInProgress == true) {
                JLAPI.InlineAlert("Connection to other player timed out.");
                console.error("[ChatGame] Disconnected from other player because we didn't get pinged in time. Function checkConnection");
                ChatGame.disconnectPlayer();
            }
        }, 10000); // ten second check
        if (ChatGame.gameInProgress == true) {
            console.log("Trying to ping the other player! fn checkConnection");
            ChatGame.communicate("cgs-ping");
            ChatGame.pingTime = Date.now();
        }
    },

    loadGame: function(game) {
        gameNames = [];
        for (i = 0; i < ChatGame.gameList.length; i++) {
            gameNames.push(ChatGame.gameList[i].code);
        }
        console.log(gameNames);
        load = gameNames.indexOf(game);
        console.log(load);

        ChatGame.gameStarted = true; // prevent invite timing out

        importScriptPage(ChatGame.gameList[load].url, ChatGame.gameList[load].wiki); // load the game
        console.log("Imported scripts");
    },

    parse: function(source, encryptedMessage) {
        decryptedMessage = dEncryption.decrypt(encryptedMessage, ChatGame.currentGamePass);
        //console.log("[CG] The message reads '" + decryptedMessage + "'");

        if (source == ChatGame.otherPlayerName) {
            if (decryptedMessage.slice(0, 2) != "CG") {
                console.error("[CG] fn ChatGame.parse: INVALID_DECLARATION: decrypted data is not a ChatGame request");
            } else {
                decryptedHead = decryptedMessage.slice(0, 10);
                decryptedBody = decryptedMessage.slice(10);
                //console.log("[CG] fn ChatGame.parse: The message head is '" + decryptedHead + "' and the message body is '" + decryptedBody + "'");
                //console.log("[CG] fn ChatGame.parse: The user is playing '" + decryptedHead.slice(2, 5) + "' in room number '" + decryptedHead.slice(5) + "'");

                var i = new RegExp("[a-zA-Z0-9-]*");
                if (i.test(decryptedBody) != "true") {

                    // If the message body is a valid connection request, we want to deal with it here. Else, give it to the game script

                    if (decryptedBody.slice(0, 3) == "cgs") {
                        // If we can parse this message, send it to our parser
                        ChatGame.messageParser(decryptedBody);
                    } else {
                        // If we can't, send it to the game's parser
                        gameParser(decryptedBody);
                    }
                } else {
                    console.error("[CG] fn ChatGame.parse: INVALID_COMMAND: received message is not valid command");
                }
            }
        }
    },

    beginConnection: function(roomID, password) {
        JLAPI.InlineAlert("Attempting to join room " + roomID + " with encryption password " + password);
        //sends out connection request
        ChatGame.communicate("cgs-givegametype-" + wgUserName);
        //console.log("[CG] fn ChatGame.beginConnection: Sending out initial contact request");
        ChatGame.gameInProgress = true;
    },

    reset: function() {
        ChatGame.currentGamePass = "";
        ChatGame.currentGameRoom = "";
        ChatGame.currentGameType = "???";
        ChatGame.currentPlayer = "";
        ChatGame.otherPlayerName = "";
        ChatGame.inviteIdentifier = "";
        ChatGame.gameInProgress = false; // prevents joining multiple games at once
        ChatGame.pingFunction = "";
        ChatGame.timeoutSetting = 60; // time in seconds between ping requests
        ChatGame.isPinged = false; // used to check current connection status
        ChatGame.pingTime = 0; // used to assess the connection to other player
        ChatGame.gameStarted = false;
        ChatGame.inviteTimeout = ''; // used to timeout invites after one minute
        ChatGame.broadcastEnabled = false; // allow games to publish the winner
    },

    invitationDeclined: function(inv) {
        if (ChatGame.displayDisclaimer()) {
            JLAPI.message.send("!ChatGame decline " + inv);
            JLAPI.InlineAlert("Invitation '" + inv + "' declined");
            $("#invite-" + inv).remove();
            ChatGame.gameInProgress = false;
        }
    },

    invitationAccepted: function(inv) {
        if (!ChatGame.gameInProgress) {
            if (ChatGame.displayDisclaimer()) {
                ChatGame.gameInProgress = true;
                JLAPI.modal.form("Input room password", "",
                    "<b>Game password: </b><input id='invitedPasswordField' name='invitedPasswordField' style='height: initial;'>" + "<br />" +
                    '<input type="checkbox" style="height: initial;" name="newGameSettings" id="cgBroadcast">Broadcast result',
                    function() {
                        ChatGame.currentGamePass = $("#invitedPasswordField").val();
                        ChatGame.currentGameRoom = ChatGame.inviteIdentifier.slice(0, 5);
                        ChatGame.currentGameType = ChatGame.inviteIdentifier.slice(5, 8);
                        ChatGame.otherPlayerName = ChatGame.inviteIdentifier.slice(8);
                        if ($("#cgBroadcast").attr('checked') == "checked") {
                            ChatGame.broadcastEnabled = true;
                        } else {
                            ChatGame.broadcastEnabled = false;
                        }
                        ChatGame.beginConnection(ChatGame.currentGameRoom, ChatGame.currentGamePass);
                        JLAPI.modal.close();
                        $("#invite-" + inv).remove();
                    },
                    function() {
                        ChatGame.invitationDeclined(inv);
                        JLAPI.modal.close();
                    });
                $('.JLform').submit(function() {
                    var focusedId = ($("*:focus").attr("id"));
                    if (focusedId == 'invitedPasswordField') {
                        return false;
                    }
                });
                $(".blackout").remove(); // make the chat usable with modal open
            }
        } else {
            alert("You can't join a new game now!");
            console.error("[CG] fn creategame: UNABLE_TO_JOIN_GAME - ChatGame.gameInProgress = true");
        }
    },

    cancelInvite: function(inv) {
        JLAPI.message.send("!ChatGame cancel " + inv);
        JLAPI.InlineAlert("Invitation canceled");
        $("#cancel-button").remove();
        ChatGame.reset();
        clearTimeout(ChatGame.inviteTimeout);
    },

    disconnectPlayer: function() {
        ChatGame.communicate("cgs-disconnect");
        JLAPI.modal.close();
        ChatGame.reset();
        clearTimeout(ChatGame.pingFunction);
        JLAPI.InlineAlert("Disconnected from other player.");
    },

    messageParser: function(input) {
        var paramString = "";
        var inputArray = input.slice(4).split('-');
        //console.log(inputArray);
        var actionParams = eval("cgs.".concat(inputArray[0], ".params"));
        //console.log(actionParams);
        paramString = "";
        for (i = 1; i < actionParams + 1; i++) {
            if (i == actionParams) {
                paramString = paramString.concat("'", inputArray[i], "'");
            } else {
                paramString = paramString.concat("'", inputArray[i], "',");
            }
        }
        //console.log(paramString);
        eval("cgs.".concat(inputArray[0], ".action(" + paramString + ")"))
    },

    listenToIncoming: function() {
        c = JLAPI.mostRecentMessage.message();
        nameC = JLAPI.mostRecentMessage.username();
        var d = c.indexOf(' ');
        if (d != -1) {
            var e = c.slice(0, d); // e = first word in message
            if (e == "!ChatGame") { // check it's a message for us
                x = JLAPI.mostRecentMessage.cid();
                $("#entry-" + x).remove();
                if (c.slice(10, 16) == "invite" && !ChatGame.gameInProgress) {
                    if (c.slice(c.indexOf("name:") + 5).trim() == wgUserName) {
                        inviteName = nameC; // The username the invite is from
                        inviteGame = c.slice(c.indexOf("game:") + 5, c.indexOf("game:") + 8).trim(); // The three letter code of the game
                        inviteRoom = c.slice(c.indexOf("id:") + 3, c.indexOf("id:") + 8).trim(); // The room ID (used for spectating)
                        ChatGame.inviteIdentifier = inviteRoom + inviteGame + inviteName; // The invite ID for accepting/declining
                        inviteReplyLinks = "(<span class='invite-link' onClick='ChatGame.invitationAccepted(ChatGame.inviteIdentifier)'>accept</span>/<span class='invite-link' onClick='ChatGame.invitationDeclined(ChatGame.inviteIdentifier)'>decline</span>)";
                        gameCodes = [];
                        for (i = 0; i < ChatGame.gameList.length; i++) {
                            gameCodes.push(ChatGame.gameList[i].code);
                        }
                        k = gameCodes.indexOf(inviteGame);
                        JLAPI.InlineAlert(inviteName + " wants to play " + ChatGame.gameList[k].name + " in room " + inviteRoom + "!<span class='invitationlinks' id='invite-" + ChatGame.inviteIdentifier + "'><br />" + inviteReplyLinks + "</span>");
                    }
                } else if (c.slice(10, 17) == "decline" && ChatGame.gameInProgress) {
                    if (c.slice(26).trim() == wgUserName && ChatGame.otherPlayerName == nameC) {
                        clearTimeout(ChatGame.inviteTimeout);
                        $("#cancel-button").remove(); // Remove the cancel button
                        ChatGame.reset();
                        JLAPI.InlineAlert(nameC + " declined your game invite.");
                    }
                } else if (c.slice(10, 16) == "cancel" && !ChatGame.gameInProgress) {
                    if (c.slice(25).trim() == wgUserName) {
                        // Damn, we got rejected
                        $("#invite-" + c.slice(17, 25) + nameC).remove();
                        ChatGame.reset();
                        JLAPI.InlineAlert(nameC + " canceled the invite.");
                    }
                } else {
                    var f = c.lastIndexOf(' ') + 1; // f = the index of the last space in the message
                    var g = c.slice(f); // g = the encrypted data from the message
                    var h = c.slice(d + 1, f - 1); // h = the target in the incoming message
                    if (h == wgUserName) { // if the target is us
                        ChatGame.parse(nameC, g); // send it to the decrypter
                    }
                }
            }
        }

        // Cleaning up continued messages
        m = $("#" + JLAPI.chatroomID + " > ul > li")[$("#" + JLAPI.chatroomID + " > ul > li").length - 2];
        n = $("#" + JLAPI.chatroomID + " > ul > li")[$("#" + JLAPI.chatroomID + " > ul > li").length - 1];
        p = $($("#" + JLAPI.chatroomID + " > ul > li")[$("#" + JLAPI.chatroomID + " > ul > li").length - 2]).attr('data-user');
        q = $($("#" + JLAPI.chatroomID + " > ul > li")[$("#" + JLAPI.chatroomID + " > ul > li").length - 1]).attr('data-user');
        if ($(n).hasClass("inline-alert") && $(m).hasClass("inline-alert") && !$(n).hasClass("continued")) {
            $(n).addClass("continued");
        } // Make sure that the inline alerts don't mess up
        if (p == q && !$(n).hasClass("continued")) {
            $(n).addClass("continued");
        } // Check if the usernames are the same. If they are, make n continued
        if (p != q && $(n).hasClass("continued")) {
            $(n).removeClass("continued");
        } // If the usernames aren't the same, we're going to make n not-continued
    },

    openInviteWindow: function() {
        if (!ChatGame.gameInProgress) {
            var optionsDropdownList = "";
            var gameCreateRoomID = Math.floor(Math.random() * (99998 - 10000 + 1)) + 10000;
            var generatedPassword = dEncryption.passGenerate(16);
            for (i = 0; i < ChatGame.gameList.length; i++) {
                optionsDropdownList = optionsDropdownList.concat('<option mode="' + ChatGame.gameList[i].mode + '" value="' + ChatGame.gameList[i].code + '">' + ChatGame.gameList[i].name + '</option>');
            }
            // TODO: Improve this window
            JLAPI.modal.form("Start a new game", "",
                "<b>Select game: </b>" +
                "<select id='gameSelector' onChange='ChatGame.updateinfo()' style='height: initial;' name='gameSelector'>" +
                optionsDropdownList + "</select><br />" +
                "<b>Information: </b>" +
                "<span id='gameInfo'></span> (<span id='modeInfo'></span>player, by <span id='authorInfo'></span>)<br />" + 
                "<fieldset id='options-fieldset' style='border:2px groove threedface; padding: 7px;'><legend>Multiplayer options</legend><b>Game room ID: </b>" +
                gameCreateRoomID + "<br />" +
                "<b>Room password: </b>" +
                "<input style='height: initial;' name='createGamePassBox' value='" + generatedPassword + "' id='createGamePassBox'>" + "<br />" +
                "You will need to give your room password to the person you wish to play with. <br /> <b>DO <span style='color:red;'>NOT</span> USE YOUR WIKIA PASSWORD.</b> <br />" +
                // NOT YET: '<input type="checkbox" style="height: initial;" name="newGameSettings" id="cgSpectator">Allow spectators' + "<br />" +
                '<input type="checkbox" style="height: initial;" name="newGameSettings" id="cgBroadcast">Broadcast result' + "<br />" +
                "<b>Player to invite: </b>" +
                "<span id='invitePlayerDropdown'></span></fieldset>" + 
                "By clicking 'OK' you understand that the ChatGame script will automatically send messages in chat under your name. (<a href='https://d97.wikia.com/wiki/MediaWiki:Cg.js/doc' target='_blank'>more info</a>)"
 
                ,function() { // okAction
                    if($("#createGamePassBox").val() !== "") {
                        if (ChatGame.displayDisclaimer()) {
    
                            ChatGame.currentGameType = $("#gameSelector").val();
                            if (ChatGame.gameList[$("select[name='gameSelector'] option:selected").index()].mode == "single") {
                                console.log("This is a single-player game. No need to send an invite!");
                                ChatGame.loadGame(ChatGame.currentGameType);
                            } else {
                                console.log("This is a multiplayer game. We need to invite the other player!");
                                ChatGame.otherPlayerName = $("#invitePlayerDropdown > select").val();
                                ChatGame.currentGamePass = $("#createGamePassBox").val();
                                if ($("#cgBroadcast").attr('checked') == "checked") {
                                    ChatGame.broadcastEnabled = true;
                                } else {
                                    ChatGame.broadcastEnabled = false;
                                }
                                ChatGame.currentGameRoom = gameCreateRoomID;
                                ////console.log("[CG] fn startListening: Waiting for player 2 to connect to room " + ChatGame.currentGameRoom);
                                ChatGame.inviteIdentifier = ChatGame.currentGameRoom + ChatGame.currentGameType + ChatGame.otherPlayerName;
                                JLAPI.InlineAlert("Invite sent to " + ChatGame.otherPlayerName + "! Room: " + ChatGame.currentGameRoom + " Password: '" + ChatGame.currentGamePass + "' <span id='cancel-button'>(<span class='invite-link' onClick='ChatGame.cancelInvite(ChatGame.inviteIdentifier)'>cancel</span>)</span>");
                                JLAPI.message.send("!ChatGame invite id:" + ChatGame.currentGameRoom + " game:" + ChatGame.currentGameType + " name:" + ChatGame.otherPlayerName + " ");
                                // Invitation contains room ID, game name and target
                                ChatGame.inviteTimeout = setTimeout(function() {
                                    if (ChatGame.gameStarted === false) {
                                        //console.log("[CG] Invitation to " + ChatGame.otherPlayerName + " timed out.");
                                        JLAPI.InlineAlert(ChatGame.otherPlayerName + "didn't respond.<br />Please try again!");
                                        console.log("[CG] fn creategame - Info: DIDNT_RESPOND - the other player didn't respond within 5 minutes");
                                        ChatGame.cancelInvite(ChatGame.inviteIdentifier);
                                        ChatGame.reset();
                                    }
                                }, 5 * 60 * 1000); // 5 min
                            }
                        }
                        JLAPI.modal.close();
                    } else {
                        alert("Please enter a valid password.");
                    }
                },
                function() { // closeAction
                    JLAPI.modal.close();
                    ChatGame.gameInProgress = false;
                });
            JLAPI.createUserSelector("#invitePlayerDropdown", false);
            ChatGame.updateinfo();
            ChatGame.gameInProgress = true;
            $('.JLform').submit(function() {
                var focusedId = ($("*:focus").attr("id"));
                if (focusedId == 'createGamePassBox') {
                    return false;
                }
            });
        } else {
            alert("You can't start a game now!");
            console.error("[CG] fn creategame: UNABLE_TO_CREATE_GAME - Tried to open a new creategame window when a game or invitation was already in progress");
        }
    },

    loadPlugin: function() {
        if (typeof ChatGame.gameList === "undefined") { // if there's no ChatGame.gameList in chat.js we'll make our own
            ChatGame.gameList = []; // cg.js should load after any definitions in chat.js
        } // This will be used to store all the valid games.

        ChatGame.gameList.push({
            "name": "Tic-tac-toe",
            "code": "TTT",
            "info": "Create a line of three squares of your color to win!",
            "url": "MediaWiki:TicTacToe.js",
            "wiki": "d97",
            "mode": "multi",
            "players": 2, // NYI
        }); //adding tictactoe to the list

        JLAPI.Chat.onLoad('mainRoom.model.chats.bind("afteradd", function() { ChatGame.listenToIncoming(); });');

        newCommand("game",function() { ChatGame.openInviteWindow(); },0,"Start a chat game","game","Opens a window to invite another user to a multiplayer game.");

        $("head").append('<style>.invite-link { color: #006400; cursor: pointer; } .invite-link:hover { text-decoration: underline; cursor: pointer; }</style>'); // minor css information
    
        ChatGame.reset();
    }
};

ChatGame.loadPlugin();