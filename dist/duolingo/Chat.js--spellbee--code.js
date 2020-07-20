/**
 * Spelling bee v1
 * By Dessamator
 * TODO: Fix Client vs Server Synchronization issues, see Jumbles/core.js for example.
 */

$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {

        //user configuration
        var iRoundWords = 5;
        var sCmdPrefix = '!';
        var sBot = "SpellBee";
        //end user configuration

        var tWordStorage = {en: ['apple', 'orange', 'asphyxiate', 'weird', 'phantasm', 'daedalus', 'bilingual', 'yugoslavia', 'french', 'timbuktu', 'phosphorous', 'change', 'choose', 'create', 'currently', 'enough', 'everything', 'happened', 'asphalt', 'island', 'leave', 'making', 'baboon', 'camel', 'badger', 'eagle', 'bandicoot', 'whelk', 'whippet', 'dragonfly', 'dromedary', 'buttocks', 'phalanges', 'microwave', 'marinate', 'touched', 'taste', 'spent', 'steps', 'worst', 'wretched', 'proceeded', 'somewhat', 'greatest', 'character', 'order', 'pleased', 'trouble', 'answer', 'germany', 'portugal', 'bangladesh', 'czechoslovakia'],
                            pt: ["amarelo", "azul", "verde", "frio", "calor", "cama", "perna", "banho", "olho", "orelha", "corpo", "mesa", "cadeira", "cabelo", "peixe", "homem", "mulher", "menina", "menino", "colher", "prato", "dedo", "roupa", "saia", "filme", "numero", "cozinha", "quarto", "portugal", "mosca", "cortina", "computador", "internet", "porta", "nariz", "labios", "camisa", "vidro", "livro", "sapato"]};
        var tWords = [];
        var oUtterance;
        var tRounds = [[], [], []];
        var iCurrRound = 0;
        var iWordIndex = 0;
        var sVer =1;
        var tGame;
        var sLang = "en";
        var iRandomSeed = 0;
        var oCypher = {};
        var sUserName = wgUserName;
        var oUser = {sNick: wgUserName, iProfile: getProfile()};
        var bhasTTS = startTTS();
        var imgHeader = '<img src="https://images.wikia.nocookie.net/__cb20110904041805/messaging/images/c/c1/Emoticon_mario.png" alt="Mario" height="20" width="20">';

        main(); // start script

        function main() {
            console.log('DuoSpellBee ' + sVer); // tCmds[cmdname][0]== action/method to perform, [1] = help
            var iKey = 5;
            var arrChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', ']', '[', ','];
            var sNextKey = 0;
            var tCmds = initializeCmds();
            for (i = 0; i < arrChars.length; i++) {
                sNextKey = i + iKey;
                if (arrChars.length <= parseInt(sNextKey)) {
                    sNextKey = parseInt(sNextKey) - arrChars.length;
                }
                oCypher[arrChars[i]] = arrChars[sNextKey];
            }
            tGame = tGameInt.oFuncs.getGameInterface(tCmds, "b");
            $(document).keydown(function(e) {
                if (e.ctrlKey && e.spaceKey) {
                    speakWord();
                }
            });

            tGame.oFuncs.sendPM = function(sUser, sMsg) {
                var sBot = tGame.oFuncs.getBot();
                var sTxt = '[' + sBot + '] ' + sMsg;
                $('.Chat ul').append('<li id="entry-sp" class="inline-alert">' + sTxt + '</li>');
            };
            tGame.oFuncs.setBot(sBot);
            sBot = '[' + sBot + ']';
            $("textarea[name=message]").keydown(function(e) {
                if (e.ctrlKey && e.spaceKey) {
                    speakWord();
                }
            });
            //Load ChatArrival
            mainRoom.model.chats.bind('afteradd', ChatArrival); // Create a link to the chatarrival

        }

        function initializeCmds() {
            var tFuncs = {
                start: function(sUser, sData) {
                    if (getProfile() === 0) {
                        var arrMatchCmd = sData.match(/^(\S+)\s*(\S*)/i) || [];
                        var sLang = arrMatchCmd[2];
                        var iRandomSeedNo = Math.floor(Math.random() * 999999) + 1;
                        var bGameOn = tGame.oFuncs.getVariable('bGameOn');
                        if (!bGameOn) {
                            sendServerMsg("s", iRandomSeedNo + ',' + sLang);
                        }
                        else {
                            sendPM("There is a game on, use !jstop before starting it again.");
                        }
                    }
                },
                stop: function() {
                    if (getProfile() === 0) {
                        sendServerMsg('e');
                    }
                },
                repeat: function() {
                    speakWord();
                },
                join: function() {
                    if (!getPlayer(sUserName)) {
                        sendServerMsg('j', sUserName);
                    }
                    else {
                        sendPM('You are already playing');
                    }
                },
                leave: function() {
                    if (getPlayer(sUserName)) {
                        sendPM('Bye!');
                        $('#jumblesheader').html("");
                        tGame.oFuncs.setPlayer(sUserName, false);
                    }
                    else {
                        sendPM('You are not playing');
                    }
                },
                help: function() {
                    var oUser = {sNick: sUserName, iProfile: getProfile()};
                    var sCmdPrefixSymbol = tGame.oVars.sCmdPrefixSymbol;
                    var sCmdPrefix = tGame.oVars.sCmdPrefix;
                    var sHelp = "Help Commands <ul>";
                    for (var sCmd in tGame.oUserCmds) {
                        if (tGame.oFuncs.canUse(sCmd, oUser)) {
                            sHelp += '<li>' + sCmdPrefixSymbol + sCmdPrefix + sCmd + ' - ' + tGame.oUserCmds[sCmd][1] + '</li>';
                        }
                    }
                    sHelp += '</ul><br><br>Use #word to play, e.g. #potatoes';
                    sendPM(sHelp);
                }
            };
            var tCmds = {startgame: {name: "start", userProfile: 0, mfunction: tFuncs.start, enabled: true, helptext: "Starts a game."},
                         stopgame: {name: "stop", userProfile: 0, mfunction: tFuncs.stop, enabled: true, helptext: "Stops a game."},
                         leavegame: {name: "leave", userProfile: 1, mfunction: tFuncs.leave, enabled: true, helptext: "Leave a game."},
                         joingame: {name: "join", userProfile: 5, mfunction: tFuncs.join, enabled: true, helptext: "Joins a game."},
                         gethelp: {name: "help", userProfile: 5, mfunction: tFuncs.help, enabled: true, helptext: "Shows this help."},
                         repeatword: {name: "repeat", userProfile: 1, mfunction: tFuncs.repeat, enabled: true, helptext: "Repeats the current word."}};
            return tCmds;
        }


        function startGame() {
            iCurrRound = 0;
            iWordIndex = 0;
            if (!startTTS(true)) {
                return false;
            }
            tWords = tGame.oFuncs.randomizeArray(tWords, iRandomSeed);
            tRounds = [[], [], []];
            for (var i = 0; i < tWords.length; i++) {
                if (tWords[i].length < 6) {
                    tRounds[0].push(tWords[i]);
                }
                else if (tWords[i].length >= 6 && tWords[i].length <= 7) {
                    tRounds[1].push(tWords[i]);
                }
                else if (tWords[i].length > 7) {
                    tRounds[2].push(tWords[i]);
                }
            }
        }
        function ChatArrival(oChat) {
            var sLastUser = oChat.attributes.name;
            var sData = oChat.attributes.text;
            sLastUser = sLastUser.toLowerCase();
            if (sData  ) {
                var sCurrWord;
                if (iWordIndex > -1) {
                    sCurrWord = getCurrentWord();
                }
                if (isServerCmd(sData)) {
                    return true;
                }
                if (wgUserName.toLowerCase() === sLastUser && triggeredCmd(sData, sLastUser)) {
                    return true;
                }
                else if (sData.substr(0, 1) === ("#") && wgUserName.toLowerCase() === sLastUser && tGame.oFuncs.getVariable('bGameOn') && tGame.oFuncs.getVariable('sGameName')==="TTTgame" ) {
                    removeMsg();
                    if (getPlayer(sLastUser)) {
                        sData = sData.toLowerCase();
                        var arrMatchResponse = sData.match("#" + '(' + sCurrWord + ')') || [];
                        var sWord = arrMatchResponse.index === 0 || "";
                        if (sWord || sCurrWord === sData.toLowerCase()) {
                            var iUserScore = tGame.oFuncs.getScore(sLastUser) + 1;
                            tGame.oFuncs.setScore(sLastUser, iUserScore);
                            sendToAll('Correct. The word was: ' + sCurrWord + '.' + sLastUser.toUpperCase() + '(' + iUserScore + ' point(s)).');
                            if (bhasTTS) {
                                if (iUserScore === 10) {
                                    oUtterance.text = "Impressive. The player got " + iUserScore + 'point(s).';
                                    window.speechSynthesis.speak(oUtterance);
                                }
                            }
                            getNextWord(sLastUser);
                            return true;
                        }else{
                            getNextWord();
                        }
                    }
                }
            }
        }

        function getNextWord(sLastWinner) {
            if (new Number(iWordIndex)+1 >= iRoundWords ) {
                iWordIndex = -1;
                iCurrRound++;
            }
            if (iCurrRound > 2) {
                sendServerMsg("e");
                return false;
            }
            iWordIndex++;
            sLastWinner = sLastWinner || "";
            sendServerMsg('n', iWordIndex+","+ sLastWinner);
        }

        function startTTS(bStart) {
            if (window.SpeechSynthesisUtterance === undefined) {
                console.log('Unfortunately, your browser does not support tts. SpellBee will not work!');
                return false;
            } else {
                if (bStart) {
                    oUtterance = new SpeechSynthesisUtterance();
                    speechSynthesis.getVoices().forEach(function(oVoice) {
                        if (oVoice.name.indexOf('English')) {
                            oUtterance.voice = oVoice;
                            oUtterance.lang = oVoice.lang;
                        }
                    });
                }
                return true;
            }
        }

        function hasTTS() {
            return !(window.SpeechSynthesisUtterance === undefined);
        }

        function speakWord(sWord) {
            if (hasTTS()) {
                if (!sWord) {
                    sWord = getCurrentWord();
                }
                oUtterance.text = sWord;
                window.speechSynthesis.speak(oUtterance);
            }
        }

        function getCurrentWord() {
            if (tRounds[iCurrRound][iWordIndex]) {
                return tRounds[iCurrRound][iWordIndex].toLowerCase();
            }
            return "";
        }

        function getPlayer(sUser) {
            return tGame.oFuncs.getPlayer(sUser.toLowerCase());
        }


        function getProfile() {
            var groups = mw.config.get('wgUserGroups'); //get groups user belongs to
            if (groups.indexOf('sysop') > -1 || groups.indexOf('bureaucrat') > -1 ||
                groups.indexOf('chatmod') > -1) {// check what groups user is apart of.
                return 0;
            }
            else if (getPlayer(wgUserName)) // Jumbles Player
            {
                return 1;
            }
            return 5; // user
        }
        function finishGame() { //ends game
            sendToAll("Game over.");
            sendTopMsg('');
            iWordIndex = -1; //reset the index
            tGame.oFuncs.resetGame();
            tWords = [];
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
            var bServerMsg = sMsg.substr(0, sBot.length) === sBot.toLowerCase();
            if (bServerMsg) {
                removeMsg();
                var iCmdLen = sBot.length;
                var sCmd = sMsg.substr(iCmdLen + 1, 3);
                var sCmdStr = sMsg.substr(iCmdLen + 4);
                var bGameOn = tGame.oFuncs.getVariable('bGameOn');
                if (!bGameOn) {
                    if (sCmd === "[s]") {
                        var sVals = sCmdStr.split(',');
                        iRandomSeed = sVals[0];
                        var sLang1 = sVals[1];
                        if (isNaN(iRandomSeed)) {
                            return false;
                        }
                        tWordStorage = tGame.oFuncs.randomizeArray(tWordStorage, iRandomSeed);
                        sendTopMsg(sBot.toUpperCase() + ' v' + sVer + ' started! Type !bhelp to see how to play.');
                        tGame.oFuncs.setVariable('bGameOn', true);
                        bGameOn = tGame.oFuncs.getVariable('bGameOn');
                        tWords = tWordStorage[sLang];
                        if (tWordStorage[sLang1]) {
                            tWords = tWordStorage[sLang1];
                        }
                        startGame();
                        tGame.oFuncs.setVariable('sGameName',"TTTgame");
                        return true;
                    }
                }
                else if (bGameOn) {
                    if (sCmd === "[j]") { // join game
                        var sJoinUser = sCmdStr;
                        if (!getPlayer(sJoinUser)) {
                            if (bhasTTS) {
                                var bFoundTTS = false;
                                speechSynthesis.getVoices().forEach(function(oVoice) {
                                    var sAvailableLingos = oVoice.lang;
                                    if (sAvailableLingos.indexOf(sLang) > -1) {
                                        oUtterance.voice = oVoice;
                                        oUtterance.lang = oVoice.lang;
                                        bFoundTTS = true;
                                    }
                                });
                                if (!bFoundTTS) {
                                    sendTopMsg("Your browser does not support this game (No"+sLang+ "TTS engine), exiting...")
                                    return false;
                                }
                            }
                            tGame.oFuncs.setPlayer(sJoinUser);
                            sendPM('Welcome! Write !jhelp to see how to play.');
                            sendServerMsg('w', 0);

                        }
                        return true;
                    }
                    else if (sCmd === "[w]" && iRandomSeed !== 0) {
                        if (getPlayer(sUserName.toLowerCase())) {
                            if (iWordIndex < 0) {
                                iWordIndex = 0;
                            }
                            sendServerMsg('n', iWordIndex + ",," + iRandomSeed);
                            return true;
                        }
                    } else if (sCmd === "[n]") { //send a new word
                        //                if (!bTimerOn){startCounter();}
                        if (getPlayer(sUserName.toLowerCase())) {
                            sCmdStr = sMsg.substr(iCmdLen + 4);
                            var arrWordValues = sCmdStr.split(",");
                            iWordIndex = arrWordValues[0];
                            var sLastUserScored = arrWordValues[1];
                            if (arrWordValues[2]) {
                                iRandomSeed = arrWordValues[2];
                            }
                            sendBannerMsg(tWords[iWordIndex], sLastUserScored);
                            var sWord = getCurrentWord();
                            speakWord(sWord);
                            return true;
                        }
                    } else if (sCmd === "[e]" && getProfile() === 0) { //stops game
                        triggeredCmd('!bplayers',sUserName);
                        finishGame();
                        return true;
                    }
                } else if (bGameOn === false && sCmd === "[j]") {
                    sendPM("There is no game currently on, ask an admin or moderator to start one before joining.");
                }
            }
        }
        //Source: stackexchange.com
        var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

        function inWords (num) {
            if ((num = num.toString()).length > 9) return 'overflow';
            n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n) return; var str = '';
            str += (n[1] !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
            str += (n[2] !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
            str += (n[3] !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
            str += (n[4] !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
            str += (n[5] !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
            return str;
        }
        ////////END

        function triggeredCmd(sData, sLastUser) {
            sData = sData.toLowerCase();
            var arrMatchCmd = sData.match(/^(\S+)/i) || [];
            var sCmd = arrMatchCmd[1] || "";
            if (sData.substr(0, 1) === ("!") && sLastUser.toLowerCase() === sUserName.toLowerCase()) {
                removeMsg();
                var oUser = {sNick: sUserName, iProfile: getProfile()};
                if (sCmd) {
                    if (tGame.oFuncs.getCommmand(oUser, sData)) {
                        return true;
                    }
                    return false;
                }
            }
        }

        function removeMsg() {
            $('.Chat li').last().remove();
        }

        function sendServerMsg(sType, sTxt) {
            sTxt = sTxt || "";
            var sMsg = (sBot + ' [' + sType + ']' + sTxt).toLowerCase();
            var sEncMsg = "";
            for (i = 0; i < sMsg.length; i++) {
                sEncMsg += oCypher[sMsg.substr(i, 1)];
            }
            if (sType)
            {
                sendToAll(sEncMsg.toLowerCase());
            }
        }

        function sendTopMsg(sTxt) {
            if (!sTxt) {
                return;
            }
            if (!$('#chatroomheader').length) {
                $('#ChatHeader h1.public.wordmark').append('<span id="chatroomheader"></span>');
            }
            if ($('#chatroomheader').length)  {
                $('#chatroomheader').html(sTxt);
            }
        }

        function sendBannerMsg(sMsg, sWho) {
            if (getPlayer(sUserName)) {
                var sLastScorer = "";
                var sMsgToSend;
                if (sWho) {
                    var iUserScore = tGame.oFuncs.getScore(sWho);
                    sLastScorer = ' • Last Scorer:' + ' ' + sWho.toUpperCase() + ' ' + '(' + iUserScore + 'XP' + ')•';
                }
                sMsgToSend = imgHeader+sBot.toUpperCase() + ' Round ' + (iCurrRound + 1) + ' Word '
                + (new Number(iWordIndex) + 1)  + sLastScorer + imgHeader;
                sendTopMsg(sMsgToSend);
            }
        }
        //http://runescape.wikia.com/wiki/User:Joeytje50/chatmsg.js
        function sendPM(sMsg) {
            tGame.oFuncs.sendPM(sUserName,sMsg);
        }
        function sendToAll(sMsg) {
            mainRoom.sendMessage({
                which: 13,
                shiftKey: false,
                preventDefault: function() {
                },
                target: $('<textarea name="message">' + sMsg + '</textarea>')
            });
            $('[name="message"]').removeAttr('disabled').focus();
        }
    }});