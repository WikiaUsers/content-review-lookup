$(function() {
    if (window.cafeBuyerLoaded){return;}
    window.cafeBuyerLoaded === true;
    
    //user configuration
        var sBuyerImagesURL = ["https://vignette.wikia.nocookie.net/duolingo/images/0/05/Champagne.png", "https://vignette.wikia.nocookie.net/duolingo/images/d/da/FormalAtire.png"];
        var sBot = ["A", "B"];
        var sCmdPrefix = '!';
        var tStrings = [];
 
        //end user configuration
        var CafeInt = tCafeInt;
        var CafeInt2 = tCafeInt2;
        var DateInt = tDateInt;
        var sVer = "0.1";
        var tCafe,iWordIndex;
 
        mw.hook('dev.chat.render').add(function(mainRoom){
            console.log(sBot + ' ' + sVer + " " + new Date().toISOString());
        var tCmds = initializeCmds();
        tCafe = CafeInt.oFuncs.getCafeInterface(tCmds, "b");
        
        tCafe.oFuncs.sendPM = function(sUser, sMsg) {
            var sBot = tCafe.oFuncs.getBot();
            var sTxt = '[' + sBot + '] ' + sMsg;
            $('.Chat ul').append('<li id="entry-sp" class="inline-alert">' + sTxt + '</li>');
        };
            //Load ChatArrival
            mainRoom.model.chats.bind('afteradd', ChatArrival); // Create a link to the chatarrival
        });
 
        function removeMsg() {
            $('.Chat li').last().remove();
        }
        function addMsg(sBuyer,sMsg) {
            var sName = sBot[sBuyer] + '(店員)';
            window.mainRoom.model.chats.add(
            new models.ChatEntry({
                name: sName,
                text: sMsg,
                avatarSrc: sBuyerImagesURL[sBuyer],
                continued: false
            }));
        }
        function getTime(tShift,tDaysave) {
            return DateInt.func(tShift,tDaysave);
        }
        
    function initializeCmds() {
        var tFuncs = {
            start: function(sUser, sData) {},
            stop: function() {},
            repeat: function() {
                speakWord();
            },
            help: function() {
                var oUser = {sNick: sUserName, iProfile: getProfile()};
                var sCmdPrefixSymbol = tCafe.oVars.sCmdPrefixSymbol;
                var sCmdPrefix = tCafe.oVars.sCmdPrefix;
                var sHelp = "ヘルプコマンド <ul>";
                for (var sCmd in tCafe.oUserCmds) {
                    if (tCafe.oFuncs.canUse(sCmd, oUser)) {
                        sHelp += '<li>' + sCmdPrefixSymbol + sCmdPrefix + sCmd + ' - ' + tCafe.oUserCmds[sCmd][1] + '</li>';
                    }
                }
                sHelp += '</ul><br><br>メニューは時間経過で変わります。';
                sendPM(sHelp);
            }
        };
        var tCmds = {startgame: {name: "start", userProfile: 0, mfunction: tFuncs.start, enabled: true, helptext: "Starts a game."},
                     stopgame: {name: "stop", userProfile: 0, mfunction: tFuncs.stop, enabled: true, helptext: "Stops a game."},
                     leavegame: {name: "leave", userProfile: 1, mfunction: tFuncs.leave, enabled: true, helptext: "Leave a game."},
                     joingame: {name: "join", userProfile: 1, mfunction: tFuncs.join, enabled: true, helptext: "Joins a game."},
                     gethelp: {name: "help", userProfile: 5, mfunction: tFuncs.help, enabled: true, helptext: "このヘルプを見ます。"},
                     repeatword: {name: "repeat", userProfile: 5, mfunction: tFuncs.repeat, enabled: true, helptext: "音声をリピートします。"}};
        return tCmds;
    }

    function startRead() {
        if (!startTTS(true)) {
            return false;
        }
    }
    function ChatArrival(oChat) {
        var sLastUser = oChat.attributes.name;
        var sData = oChat.attributes.text;
        sLastUser = sLastUser.toLowerCase();
        if (sData) {
            if (isServerCmd(sData)) {
                return true;
            }
            if (wgUserName.toLowerCase() === sLastUser && triggeredCmd(sData, sLastUser)) {
                return true;
            }
            return false;
        }
    }

    function startTTS(bStart) {
        if (window.SpeechSynthesisUtterance === undefined) {
            console.log('このブラウザはTTSのサポートをしていないのです');
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
        return (window.SpeechSynthesisUtterance !== undefined);
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


    function setString(setWord) {
        if (!startTTS(true)) {
            return false;
        }
        tStrings.push(setWord);
    }
    function getCurrentWord() {
        if (tStrings[iWordIndex]) {
            return tStrings[iWordIndex].toLowerCase();
        }
        return "";
    }
 
    function getPlayer(sUser) {
        return tCafe.oFuncs.getPlayer(sUser.toLowerCase());
    }
 
    function getProfile() {
        var groups = mw.config.get('wgUserGroups'); //get groups user belongs to
        if (groups.indexOf('sysop') > -1 || groups.indexOf('threadmoderator') > -1 ||
            groups.indexOf('chatmod') > -1) {// check what groups user is apart of.
            return 0;
        }
        else if (getPlayer(wgUserName)) // Jumbles Player
        {
            return 1;
        }
        return 5; // user
    }
    function finishSpeak() { //ends speak
        sendToAll("※TTSの文字列を削除します。");
        iWordIndex = -1; //reset the index
        tCafe.oFuncs.resetGame();
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
        var bServerMsg = (sMsg.substr(0, sBot.length) === sBot.toLowerCase());
        if (bServerMsg) {
            removeMsg();
            var iCmdLen = sBot.length;
            var sCmd = sMsg.substr(iCmdLen + 1, 3);
            var sCmdStr = sMsg.substr(iCmdLen + 4);
            if (sCmd === "[n]") { //send a new word
                var sWord = getCurrentWord();
                speakWord(sWord);
                return true;
            } else if (sCmd === "[e]") { //stops game
                finishGame();
                return true;
            }
        }
    }
 
    function triggeredCmd(sData, sLastUser) {
        sData = sData.toLowerCase();
        var arrMatchCmd = sData.match(/^(\S+)/i) || [];
        var sCmd = arrMatchCmd[1] || "";
        if (sData.substr(0, 1) === "!") {
            //削除トリガー
            removeMsg();
            var oUser = {sNick: sUserName, iProfile: getProfile()};
            if (sCmd && sLastUser.toLowerCase() === sUserName.toLowerCase()) {
                if (tCafe.oFuncs.getCommmand(oUser, sData)) {
                    return true;
                }
                return false;
            }
        }
    }
 
    function sendServerMsg(sType, sTxt) {
        sTxt = sTxt || "";
        var sMsg = (sBot + ' [' + sType + ']' + sTxt).toLowerCase();
        var sEncMsg = "";
        for (i = 0; i < sMsg.length; i++) {
            sEncMsg += oCypher[sMsg.substr(i, 1)];
        }
        if (sType){
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
    //https://runescape.wikia.com/wiki/User:Joeytje50/chatmsg.js
    function sendPM(sMsg) {
        tCafe.oFuncs.sendPM(sUserName,sMsg);
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

    //import css and chat-js
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:ChatTimestamps.css'
    }, {
        type: 'script',
        article: 'u:dev:Chat-js.js'
    });
});