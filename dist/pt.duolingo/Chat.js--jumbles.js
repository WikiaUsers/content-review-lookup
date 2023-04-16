/**
 * !jumbles
 * Ideas from http://dev.wikia.com/wiki/!mods
 * By Dessamator
 * Jumbles
 */

$(function () {
    var secondsSince = 0;
    var startCounterVar;
    var bGameOn=false;
    var arrOrigWords = ['about','allows','already','also','always','american','answers','anywhere','appear','appears','apply','around','because','believe','between','bilingual','books','both','build','cannot','change','choose','come','cover','create','currently','different','enough','enter','even','ever','every','everyone','everything','good','gray','happened','heard','help','improve','later','learn','leave','making','many','may','miss','more','more','much','near','need','never','new','news','next','baboon','camel','badger','eagle','bandicoot','whelk','whippet','dragonfly','dromedary','buttocks','phalanges','microwave','marinate','touched','smiling','taste','dog','spent','steps','worst','legs','watched','manners','proceeded','frightened','somewhat','born','greatest','character','body','ran','past','order','need','pleased','trouble','whatever'];  
    var objPlayers = {};
    objPlayers['default'] = 0;
    var arrWords = arrOrigWords.slice(0);
    var sCurrWord = "";
    var sScrambledWord = "";
    var bTimerOn = false;
    var sVer = "0.4b";
    var imgHeader = '<img src="https://images.wikia.nocookie.net/__cb20110904041805/messaging/images/c/c1/Emoticon_mario.png" alt="Mario" height="20" width="20">';
    
    console.log("Jumbles "+sVer);
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var sGroups = mw.config.get('wgUserGroups').join(' ');
        $('.Chat').on('DOMNodeInserted', function (e) {
            var msg = $.parseHTML(e.target.innerHTML)[7];
            if (msg) {
                msg = msg.innerHTML.toLowerCase();
                var bJumbles = msg.substr(0, "[jumbles]".length + 1) === ("[jumbles]");
                if (msg.substr(0, 1) === ("#")) {
                    e.target.remove();
                }
                if (sGroups.indexOf('sysop') > -1 || sGroups.indexOf('bureaucrat') > -1 || sGroups.indexOf('chatmod') > -1) {
                    if (isTrigger(e, 'jstart')) {
                        if(bGameOn==false){
                        objPlayers[wgUserName] = 0;
                        sScrambledWord = scramble();
                        bTimerOn = true;
                        startCounter();
                        sendTopMsg(sScrambledWord);
                        sendMainMsg(' Game started! Write !jhelp see how to play.');
                        bGameOn=true;
                        }
                    }
                    else if (isTrigger(e, 'jstop')) {
                        endGame();
                    }
                        }
                if (isTrigger(e, sCurrWord, "#")) {
                    if (!objPlayers[wgUserName]) {
                        objPlayers[wgUserName] = 0;
                    }
                    objPlayers[wgUserName]++;
                    sendMainMsg('Correct Word! ('+  sCurrWord+'),' + wgUserName +'(' +objPlayers[wgUserName] +' points)' );
                    secondsSince = 31;
                }
                else if (isTrigger(e, 'jscore')) {
                    getScore(wgUserName);
                }
                else if (isTrigger(e, 'join')) {
                    objPlayers[wgUserName] = 0;
                    sendTopMsg(sScrambledWord);
                    sendMainMsg('Welcome! Write !jhelp see how to play.');
                }
                else if (isTrigger(e, 'jleave')) {       
                     sendMainMsg('Bye!');
                     $('#jumblesheader').html("");
                     var iCount = 0;
                     delete objPlayers[wgUserName] ;
                     for(var prop in objPlayers) {
                         if(objPlayers.hasOwnProperty(prop))
                             ++iCount;
                     }
                     if (iCount===0){
                        endGame();
                     }
                }
                else if (isTrigger(e, 'jhelp')) {
                     sendMainMsg('Use #word to play, e.g. #potatoes, !join to play, !jleave to quit, and !jscores to see your score.');
                }
            }
            $(this).val('');
        });
    }
    
    function isTrigger(e, sTrigger, sPrefix) {
        var msg = $.parseHTML(e.target.innerHTML)[7];
        if (msg) {
            msg = msg.innerHTML.toLowerCase();
            if (!sPrefix) {
                sPrefix = '!';
            }
            if (sTrigger) {
                var bFoundTrigger = (msg.substr(0, sTrigger.length + 1) === sPrefix + sTrigger);
                if (bFoundTrigger){
                    e.target.remove();
                    return bFoundTrigger;
                }
            } 
        }
        return false;
    }
    
    function sendMainMsg(sTxt) {
        if (objPlayers[wgUserName]>=0){
            var last = $('.Chat li').last().attr('data-user');
            $('.Chat ul').append('<li id="entry-sp" class="inline-alert">[Jumbles] ' + sTxt + '</li>');
            if (!last) {
                $('.inline-alert').last().addClass('continued');
            }
        }
    }
    
    function sendTopMsg(sTxt) {
        if (objPlayers[wgUserName]>=0){
            sTxt = sTxt.toUpperCase();
            if ($('#jumblesheader').length) {
                $('#jumblesheader').html(''+imgHeader+'[Jumbles] Current word →' + sTxt+ ' ← '+ imgHeader);
            } else {
                $('#ChatHeader h1.public.wordmark').append('<span id="jumblesheader">'+imgHeader+'[Jumbles] Current Word → ' + sTxt +'←'+imgHeader+'</span>');
            }
        }
    }
    
    function startCounter() {
        if (bTimerOn) {
            if (secondsSince > 30) {
                secondsSince = 0;
                var sTmp = scramble();
                if (sTmp) {
                    var sWord = scramble();
                    sendTopMsg(sWord.toUpperCase());
                }
            }
            secondsSince += 1;
            startCounterVar = setTimeout(function () {
                startCounter();
            }, 1000);
        }
    }
    
    function endGame() {
        sendMainMsg("Game over!");
        arrWords = arrOrigWords.slice(0);
        bTimerOn = false;
        clearTimeout(startCounterVar);
        $('#jumblesheader').html("");
    }
    
    function getScore(user) {
        var iScore =  objPlayers[user] || 0;
        sendMainMsg('Your score is : ' + iScore);
    }
    
    function scramble() {
        var x = Math.floor((Math.random() * arrWords.length));
        var sText = [];
        var sTmp, sTmp1 = "";
        var i = 0;
        var iRand = 0;
        if (x > arrWords.length) {
            x = 0;
        } else if (arrWords.length === 0) {
            endGame();
            return;
        }
            sCurrWord = arrWords[x].toLowerCase();
        arrWords.splice(x, 1);
        sText = sCurrWord.split("");
        while (i < sText.length) {
            iRand = Math.floor((Math.random() * sText.length) + 1);
            if (sText[iRand]) {
                sTmp = sText[i];
                sTmp1 = sText[iRand];
                sText[i] = sTmp1;
                sText[iRand] = sTmp;
                i++;
            }
        }
        var oTmp = sText.toString();
        sScrambledWord = oTmp.replace(/,/g, "").toLowerCase();
        return sScrambledWord;
    }
});