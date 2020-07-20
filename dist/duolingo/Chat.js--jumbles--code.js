/**
 * Ideas from http://dev.wikia.com/wiki/!mods
 * By Dessamator
 * WikiJumbles
 * Requires gameinterface.js
 */
$(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
        var sVer = "1";
        // User Configurable settings
        var arrOrigWords = ['earth', 'fire', 'wind', 'water', "bird"];
        var sBot = "jumbles"; // Bot name;
        var iGametime = 30; //Time till game ends
        //END User configurable 
        //Script settings// Don't change unless you know what you're doing!
        var iElapsedSeconds = 0;
        var startCounterVar;
        var iWordIndex = -1;
        var bTimerOn = false;
        var imgHeader = "";
        var imgLastWinner = "";
        var imgBitcoin = ""
        var iTries = 0;
        var bhasTTS = startTTS(); //Start TTS web speech api;
        var utterance;
        var tFuncs = {};
        var oJumblesInt;
        var bSoundOn = false;
        var iRandomSeed = 0;
        var oCypher = {};
        var sUserName = wgUserName.toLowerCase();
        var serverUserName = "";
        var bSentCmd = false; //Prevents commands being sent if they are in chathistory
        //End script settings
        loadScript(); //load main
        function main() {
            var iKey = 5;
            var arrChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', ']', '[', ','];
            var sNextKey = 0;
            for (i = 0; i < arrChars.length; i++) {
                sNextKey = i + iKey;
                if (arrChars.length <= parseInt(sNextKey)) {
                    sNextKey = parseInt(sNextKey) - arrChars.length;
                }
                oCypher[arrChars[i]] = arrChars[sNextKey];
            }
            if (bhasTTS) {
                utterance = new SpeechSynthesisUtterance();
                utterance.lang = 'en-US';
            }
            var tCmds = initializeCmds();
            oJumblesInt = tGameInt.oFuncs.getGameInterface(tCmds, "j");
            oJumblesInt.oFuncs.sendPM = function (sUser, sMsg) {
                var sBot = oJumblesInt.oFuncs.getBot();
                var sTxt = '[' + sBot.toUpperCase() + '] ' + sMsg;
                $('.Chat ul')
                    .append('<li id="entry-sp" class="inline-alert">' + sTxt + '</li>');
            };
            oJumblesInt.oFuncs.setBot(sBot);
            sBot = '[' + oJumblesInt.oFuncs.getBot(sBot) + ']';
            console.log(sBot + ' ' + sVer + " " + new Date()
                .toISOString());
            //Load ChatArrival
            mainRoom.model.chats.bind('afteradd', ChatArrival); // Create a link to the chatarrival
        }

        function initializeCmds() {
            tFuncs = {
                jstart: function () {
                    if (getProfile() === 0 && sUserName) {
                        var iRandomSeedNo = Math.floor(Math.random() * 999999) + 1;
                        var bGameOn = oJumblesInt.oFuncs.getVariable('bGameOn');
                        if (!bGameOn) {
                            sendServerMsg("s", iRandomSeedNo);
                        } else {
                            sendPM("There is a game on, use !jstop before starting it again.");
                        }
                        serverUserName = sUserName;
                    }
                },
                jstop: function () {
                    if (getProfile() === 0) {
                        endGame();
                    }
                },
                join: function () {
                    if (!getPlayer(sUserName)) {
                        sendServerMsg('j', sUserName);
                    } else {
                        sendPM('You are already playing');
                    }
                },
                jleave: function () {
                    if (getPlayer(sUserName)) {
                        sendPM('Bye!');
                        $('#jumblesheader')
                            .html("");
                        oJumblesInt.oFuncs.setPlayer(sUserName, false);
                    } else {
                        sendPM('You are not playing');
                    }
                },
                jhelp: function () {
                    var oUser = {
                        sNick: sUserName,
                        iProfile: getProfile()
                    };
                    var sCmdPrefixSymbol = oJumblesInt.oVars.sCmdPrefixSymbol;
                    var sCmdPrefix = oJumblesInt.oVars.sCmdPrefix;
                    var sHelp = "Help Commands";
                    for (var sCmd in oJumblesInt.oUserCmds) {
                        if (oJumblesInt.oFuncs.canUse(sCmd, oUser)) {
                            sHelp += '<br>' + sCmdPrefixSymbol + sCmdPrefix + sCmd + ' - ' + oJumblesInt.oUserCmds[sCmd][1];
                        }
                    }
                    sHelp += '<br>Use #word to play, e.g. #potatoes';
                    sendPM(sHelp);
                },
                jsound: function () {
                    if (startTTS()) {
                        bSoundOn = !bSoundOn;
                        var sMsgSound = 'activated';
                        if (!bSoundOn) {
                            sMsgSound = 'de' + sMsgSound;
                        }
                        sendPM('The game sound has now been ' + sMsgSound);
                    } else {
                        sendPM('To activate sound your browser needs to support Text-To-Speech (e.g. Google Chrome 37).');
                    }
                },
                jsend: function () {
                    //mainRoom.viewDiscussion.chatUL.html('');
                    //sendAlert('#'+arrOrigWords[iWordIndex]);
                }
            };
            var tCmds = {
                startgame: {
                    name: "start",
                    userProfile: 0,
                    mfunction: tFuncs.jstart,
                    enabled: true,
                    helptext: "Starts a game."
                },
                stopgame: {
                    name: "stop",
                    userProfile: 0,
                    mfunction: tFuncs.jstop,
                    enabled: true,
                    helptext: "Stops a game."
                },
                leavegame: {
                    name: "leave",
                    userProfile: 1,
                    mfunction: tFuncs.jleave,
                    enabled: true,
                    helptext: "Leave a game."
                },
                joingame: {
                    name: "play",
                    userProfile: 5,
                    mfunction: tFuncs.join,
                    enabled: true,
                    helptext: "Join a game."
                },
                gethelp: {
                    name: "help",
                    userProfile: 5,
                    mfunction: tFuncs.jhelp,
                    enabled: true,
                    helptext: "Shows this help."
                },
                setsound: {
                    name: "sound",
                    userProfile: 1,
                    mfunction: tFuncs.jsound,
                    enabled: true,
                    helptext: "Sets sound on/off "
                }
            };
            return tCmds;
        }

        function ChatArrival(oChat) {
            sData = oChat.attributes.text;
            var sLastPlayer = (oChat.attributes.name)
                .toLowerCase();
            var sCurrWord = arrOrigWords[iWordIndex];
            if (sData) {
                var bTriggeredCmd = triggeredCmd(sData, sLastPlayer);
                if (isServerCmd(sData)) {
                    return true;
                }
                if (bTriggeredCmd && sLastPlayer.toLowerCase() === wgUserName.toLowerCase()) {
                    return true;
                } else if (sData.substr(0, 1) === ("#") && oJumblesInt.oFuncs.getVariable('bGameOn') && oJumblesInt.oFuncs.getVariable('sGameName') === "jumbles") {
                    if (getPlayer(sLastPlayer)) {
                        removeMsg();
                        sData = sData.toLowerCase();
                        var arrMatchResponse = sData.match("#" + '(' + sCurrWord + ')') || [];
                        var sWord = arrMatchResponse.index === 0 || "";
                        if (sWord) {
                            var iUserScore = oJumblesInt.oFuncs.getScore(sLastPlayer) + 1;
                            oJumblesInt.oFuncs.setScore(sLastPlayer, iUserScore);
                            sendPM('Correct. The word was: ' + sCurrWord + '.' + sLastPlayer + '(' + iUserScore + ' points)');
                            if (bhasTTS && bSoundOn) {
                                utterance.text = 'Correct. The word was: ' + sCurrWord;
                                if (iUserScore === 10) {
                                    utterance.text = "Impressive. The player got " + iUserScore + 'points.';
                                }
                                window.speechSynthesis.speak(utterance);
                            }
                            nextWord(sLastPlayer);
                            return true;
                        } else { // wrong word increment tries;
                            iTries++;
                            var arrTease = ['Try again!","Almost had it!', "Nope! ", "Better luck next time."];
                            var x = Math.floor((Math.random() * arrTease.length));
                            if (iTries > 5) {
                                sendPM('Moving on to next word');
                                nextWord();
                            } else {
                                sendPM(arrTease[x] + ' ' + sLastPlayer + ' tried: ' + sData.substr(1));
                            }
                            return true;
                        }
                    }
                }
            }
        }

        function isServerCmd(sNewMsg) {
            var sMsg = "";
            for (i = 0; i < sNewMsg.length; i++) {
                for (var sVal in oCypher) {
                    if (oCypher[sVal] === sNewMsg.substr(i, 1)) {
                        sMsg += sVal;
                    }
                }
            }
            var bServerMsg = sMsg.substr(0, sBot.length) === sBot;
            if (bServerMsg) {
                removeMsg();
                var iCmdLen = sBot.length;
                var sCmd = sMsg.substr(iCmdLen + 1, 3);
                var sCmdStr = sMsg.substr(iCmdLen + 4);
                var bGameOn = oJumblesInt.oFuncs.getVariable('bGameOn');
                if (!bGameOn) {
                    if (sCmd === "[s]") {
                        // if (!bTimerOn) {
                            // bTimerOn = true;
                            //startCounter();
                        // }
                        iRandomSeed = sCmdStr;
                        if (isNaN(iRandomSeed)) {
                            return false;
                        }
                        arrOrigWords = oJumblesInt.oFuncs.randomizeArray(arrOrigWords, iRandomSeed);
                        sendTopMsg(sBot.toUpperCase() + ' v' + sVer + ' started! Type !jhelp.');
                        oJumblesInt.oFuncs.setVariable('bGameOn', true);
                        oJumblesInt.oFuncs.setVariable('sGameName', 'jumbles');
                        iWordIndex = 0;
                        
                        return true;
                    }
                    
                } else if (bGameOn) {
                    if (sCmd === "[j]") { // join game
                        sJoinUser = sCmdStr;
                        if (!getPlayer(sJoinUser)) {
                            oJumblesInt.oFuncs.setPlayer(sJoinUser);
                            sendPM('Welcome! Write !jhelp to see how to play.');
                            if (iWordIndex < 0) {
                                sendServerMsg('w', iRandomSeed);
                            }else {
                                var sScrambled = scramble(iRandomSeed, iWordIndex);
                                sendBannerMsg(sScrambled, "");
                            }
                        }
                        return true;
                    } else if (sCmd === "[w]" ) {
                        if (getPlayer(sUserName.toLowerCase()) && (serverUserName === sUserName ) ) {
                            // Server should send its randomseed to everyone
                            sendServerMsg('r', iRandomSeed); //Server sends  new random seed to everyone
                            return true;
                        }
                    } else if (sCmd === "[r]" ) {
                        // Everyone receives the same random seed and sets it (synchronizing)
                        if (getPlayer(sUserName.toLowerCase()) && (serverUserName !== sUserName ) ) {
                            iRandomSeed = sCmdStr;
                            arrOrigWords = oJumblesInt.oFuncs.randomizeArray(arrOrigWords, iRandomSeed);
                            nextWord(); //ask for next word from existing user
                            return true;
                        }
                    } else if (sCmd === "[n]") { //send a new word 
                        if (getPlayer(sUserName.toLowerCase())) {
                            var arrWordValues = sCmdStr.split(",");
                            iWordIndex = arrWordValues[0];
                            var sLastUserScored = arrWordValues[1];
                            var sScrambled = scramble(iRandomSeed, iWordIndex);
                            sendBannerMsg(sScrambled, sLastUserScored);
                            return true;
                        }
                    } else if (sCmd === "[e]" && getProfile() === 0) { //stops game
                        finishGame();
                        return true;
                    }
                } else if (bGameOn === false && sCmd === "[j]") {
                    sendPM("Ask an admin or moderator to start one before joining game or wait until the current one is finished.");
                }
            }
        }

        function removeMsg() {
            $('.Chat li')
                .last()
                .remove();
        }

        function triggeredCmd(sData, sLastUser) {
            sData = sData.toLowerCase();
            var arrMatchCmd = sData.match(/^(\S+)/i) || [];
            var sCmd = arrMatchCmd[1] || "";
            if (sData.substr(0, 1) === ("!") && sLastUser.toLowerCase() === sUserName.toLowerCase() && bSentCmd) {
                removeMsg();
                var oUser = {
                    sNick: sUserName,
                    iProfile: getProfile()
                };
                if (sCmd) {
                    if (oJumblesInt.oFuncs.getCommmand(oUser, sData)) {
                        return true;
                    }
                    return false;
                }
            }
            bSentCmd = true;
        }

        function nextWord(sUserScored) {
            if (serverUserName == sUserName ) {
                if (!sUserScored) {
                    sUserScored = "";
                }
                
                var iNextWordIndex = new Number(iWordIndex) + 1;
                sendServerMsg("n", iNextWordIndex + "," + sUserScored);
                iTries = 0;
            }
        }

        function startCounter() { //Timer ends game after  secs;
            if (bTimerOn) {
                if (iElapsedSeconds > iGametime * 60) {
                    endGame();
                }
                iElapsedSeconds += 1;
                startCounterVar = setTimeout(function () {
                    startCounter();
                }, 1000);
            }
        }

        function endGame() {
            sendServerMsg('e', "");
        }

        function finishGame() { //ends game
            sendTopMsg(" ");
            sendToAll(sBot + "Game over");
            bTimerOn = false;
            clearTimeout(startCounterVar);
            sendTopMsg();
            iWordIndex = -1; //reset the index
            iTries = 0;
            iElapsedSeconds = 0;
            oJumblesInt.oFuncs.resetGame();
            bGameStarted = false;
        }

        function scramble(iRandSeed, iWord) { //Scrambles word
            var mRandom = oJumblesInt.oFuncs.randomSeed(iRandSeed);
            var sText = [];
            var sTmp, sTmp1 = "";
            var i = 0;
            var iRand = 0;
            if (arrOrigWords.length < iWord) {
                endGame();
                return;
            }
            var sTmpWord = arrOrigWords[iWord].toLowerCase();
            sText = sTmpWord.split("");
            while (i < sText.length) {
                iRand = Math.floor((mRandom() * sText.length) + 1);
                if (sText[iRand]) {
                    sTmp = sText[i];
                    sTmp1 = sText[iRand];
                    sText[i] = sTmp1;
                    sText[iRand] = sTmp;
                    i++;
                }
            }
            var oTmp = sText.toString();
            var sScrambled = oTmp.replace(/,/g, "")
                .toLowerCase();
            return sScrambled;
        }

        function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) return false;
            }
            return true;
        }

        function startTTS() {
            if (window.SpeechSynthesisUtterance === undefined) {
                return false;
            } else {
                return true;
            }
        }

        function getProfile() {
            var groups = mw.config.get('wgUserGroups')
                .join(" "); //get groups user belongs to
            if (groups.indexOf('sysop') > -1 || groups.indexOf('bureaucrat') > -1 || groups.indexOf('chatmod') > -1) { // check what groups user is apart of.
                return 0;
            } else if (getPlayer(sUserName)) // Jumbles Player
            {
                return 1;
            }
            return 5; // user 
        }

        function getPlayer(sUser) {
            return oJumblesInt.oFuncs.getPlayer(sUser);
        }

        function sendServerMsg(sType, sTxt) {
            sTxt = sTxt || "";
            var sMsg = (sBot + ' [' + sType + ']' + sTxt)
                .toLowerCase();
            var sEncMsg = "";
            for (i = 0; i < sMsg.length; i++) {
                sEncMsg += oCypher[sMsg.substr(i, 1)];
            }
            if (sType) {
                sendToAll(sEncMsg.toLowerCase());
            }
        }

        function sendTopMsg(sTxt) {
            if (!sTxt) {
                return;
            }
            if (!$('#jumblesheader')
                .length) {
                $('#ChatHeader h1.public.wordmark')
                    .append('<span id="jumblesheader"></span>');
            }
            if ($('#jumblesheader')
                .length) {
                $('#jumblesheader')
                    .html(sTxt);
            }
            //$('#sTopMsgId').html(sTxt);
        }

        function sendBannerMsg(sMsg, sWho) {
            if (getPlayer(sUserName)) {
                var sLastScorer = "";
                var sMsgToSend;
                if (sWho) {
                    var iUserScore = oJumblesInt.oFuncs.getScore(sWho);
                    sLastScorer = ' • Last Scorer:' + ' ' + sWho.toUpperCase() + ' ' + '(' + iUserScore + 'XP' + imgBitcoin + ')•';
                }
                sMsgToSend = '' + imgHeader + sBot.toUpperCase() + ' New word →' + sMsg + '←  ' + imgHeader + sLastScorer;
                sendTopMsg(sMsgToSend);
            }
        }
        //http://runescape.wikia.com/wiki/User:Joeytje50/chatmsg.js
        function sendPM(sMsg) {
            oJumblesInt.oFuncs.sendPM(sUserName, sMsg);
        }

        function sendToAll(sMsg) {
            mainRoom.sendMessage({
                which: 13,
                shiftKey: false,
                preventDefault: function () {},
                target: $('<textarea name="message">' + sMsg + '</textarea>')
            });
            $('[name="message"]')
                .removeAttr('disabled')
                .focus();
        }

        function loadScript() {
            $.getJSON(location.origin + "/wiki/MediaWiki:Custom-jumblesdata.json?action=raw", function (result) {
                    var defaultLanguage = result.settings.language || "en";
                    arrOrigWords = result.words[defaultLanguage];
                    sBot = result.settings.sBot; // Bot name;
                    iGametime = result.settings.iGameTime; //Time till game ends
                    main();
                })
                .fail(function (error) {
                    main()
                })
        }
    }
    function userConnected(sData){ 
        bSentCmd = false;
    } 
    function userDisconnected(sData){ 
        // Todo: Use later to hand over game coordination to another user or disable the game if admin leaves.
    } 
    // Fires when user logs out
    mainRoom.socket.bind('logout',$.proxy(userDisconnected, mainRoom));
    // Fires when user logs in
    mainRoom.socket.bind('join',$.proxy(userConnected, mainRoom));
});