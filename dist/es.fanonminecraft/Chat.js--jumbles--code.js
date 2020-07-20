// <syntaxhighlight lang="javascript">

$(function() {
if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
 
// Ajustes
        var arrOrigWords = ['zombie', 'creeper', 'steve', 'enderman', 'herobrine', 'araña', 'whiter', 'esqueleto', 'pico', 'bloques', 'cerdo', 'caballos', 'murcielagos', 'diamante', 'lingote', 'esmeralda', 'aldeanos', 'minecraft'];
        var sBot = "servidor"; // Bot name;
        var iGametime = 30; //Time till game ends
//END User configurable 
 
//Configuración
        var sVer = "0.9";
        var iElapsedSeconds = 0;
        var startCounterVar;
        var iWordIndex = -1;
        var bTimerOn = false;
        var imgHeader = '<img src="http://www.minecraftopia.com/images/blocks/diamond_sword.png" alt="Espada" height="20" width="20">';
        var imgLastWinner = '<img src="https://images.wikia.nocookie.net/__cb20141010123040/duolingo/images/9/9f/PenguinWinner.svg" alt="imgWinner" height="20" width="30">';
        var imgBitcoin = '<img src="https://images.wikia.nocookie.net/__cb20130820200003/minecraft-computer/images/thumb/b/be/Minecraft-diamond-pic.png/500px-Minecraft-diamond-pic.png" alt="coin" height="20" width="20">';
        var iTries = 0;
        var bhasTTS = startTTS(); //Iniciar TTS;
        var utterance;
        var tFuncs = {};
        var oJumblesInt;
        var bSoundOn = false;
        var iRandomSeed = 0;
 
//Ajustes de script
 
        main();  //Principal
 
        function main() {
            if (bhasTTS) {
                utterance = new SpeechSynthesisUtterance();
                utterance.lang = 'en-US';
            }
            var tCmds = initializeCmds();
            oJumblesInt= tGameInt.oFuncs.getGameInterface(tCmds, "j");
            oJumblesInt.oFuncs.sendPM = function(sUser, sMsg) {
                var sBot = oJumblesInt.oFuncs.getBot();
                var sTxt = '[' + sBot.toUpperCase() + '] ' + sMsg;
                $('.Chat ul').append('<li id="entry-sp" class="inline-alert">' + sTxt + '</li>');
            };
            oJumblesInt.oFuncs.setBot(sBot);
            sBot = '[' + oJumblesInt.oFuncs.getBot(sBot) + ']';
            console.log(sBot + ' ' + sVer + " " + new Date().toISOString());
            //Load ChatArrival
            mainRoom.model.chats.bind('afteradd', ChatArrival); // Create a link to the chatarrival
        }
 
        function initializeCmds() {
            tFuncs = {
                jstart: function() {
                    if (getProfile() === 0) {
                        var iRandomSeedNo = Math.floor(Math.random() * 999999) + 1;
                        var bGameOn = oJumblesInt.oFuncs.getVariable('bGameOn');
                        if (!bGameOn) {
                            sendServerMsg("s", iRandomSeedNo);
                        }
                        else {
                            sendPM("Hay un juego en el uso !jstop antes de comenzar de nuevo.");
                        }
                    }
                },
                jstop: function() {
                    if (getProfile() === 0) {
                        endGame();
                    }
                },
                join: function() {
                    if (!getPlayer(wgUserName)) {
 
                        sendServerMsg('j', wgUserName);
                    }
                    else {
                        sendPM('Usted ya está jugando');
                    }
                },
                jleave: function() {
                    if (getPlayer(wgUserName)) {
                        sendPM('Adiós');
                        $('#jumblesheader').html("");
                        oJumblesInt.oFuncs.setPlayer(wgUserName, false);
                    }
                    else {
                        sendPM('Usted no está jugando, escribe !junirse para participar.');
                    }
                },
                jhelp: function() {
                    var oUser = {sNick: wgUserName, iProfile: getProfile()};
                    var sCmdPrefixSymbol = oJumblesInt.oVars.sCmdPrefixSymbol;
                    var sCmdPrefix = oJumblesInt.oVars.sCmdPrefix;
                    var sHelp = "Manual de Comandos";
                    for (var sCmd in oJumblesInt.oUserCmds) {
                        if (oJumblesInt.oFuncs.canUse(sCmd, oUser)) {
                            sHelp += '<br>' + sCmdPrefixSymbol + sCmdPrefix + sCmd + ' - ' + oJumblesInt.oUserCmds[sCmd][1];
                        }
                    }
                    sHelp += '<br>Usa #word para jugar, e.g. #potatoes';
                    sendPM(sHelp);
                },
                jsound: function() {
                    if (startTTS()) {
                        bSoundOn = !bSoundOn;
                        var sMsgSound = 'activado';
                        if (!bSoundOn) {
                            sMsgSound = 'de' + sMsgSound;
                        }
                        sendPM('El sonido ha sido ' + sMsgSound);
                    }
                    else {
                        sendPM('Para activar el sonido de su navegador debe ser compatible con Text-To-Speech (e.g. Google Chrome 37).');
                    }
                },
                jsend: function() {
                    //mainRoom.viewDiscussion.chatUL.html('');
                    //sendAlert('#'+arrOrigWords[iWordIndex]);
                }
            };
            var tCmds = {startgame: {name: "comenzar", userProfile: 0, mfunction: tFuncs.jstart, enabled: true, helptext: "Comenzar el Juego."},
                stopgame: {name: "stop", userProfile: 0, mfunction: tFuncs.jstop, enabled: true, helptext: "Detener el Juego."},
                leavegame: {name: "abandonar", userProfile: 1, mfunction: tFuncs.jleave, enabled: true, helptext: "Abandonar el Juego."},
                joingame: {name: "unirse", userProfile: 5, mfunction: tFuncs.join, enabled: true, helptext: "Unirse al Juego."},
                gethelp: {name: "ayuda", userProfile: 5, mfunction: tFuncs.jhelp, enabled: true, helptext: "Le mostrará un manual de Comando."},
                setsound: {name: "sonido", userProfile: 1, mfunction: tFuncs.jsound, enabled: true, helptext: "Sonidos on/off "}};
            return tCmds;
        }
 
        function ChatArrival(oChat) {
            sData = oChat.attributes.text;
            var sLastPlayer = oChat.attributes.name;
            var sCurrWord = arrOrigWords[iWordIndex];
            if (sData) {
                var bTriggeredCmd = triggeredCmd(sData);
                if (isServerCmd(sData)) {
                    return true;
                }
                if (bTriggeredCmd) {
                    return true;
                }
                else if (sData.substr(0, 1) === ("#")) {
                    if (getPlayer(sLastPlayer)) {
                        removeMsg();
                        sData = sData.toLowerCase();
                        var arrMatchResponse = sData.match("#" + '(' + sCurrWord + ')') || [];
                        var sWord = arrMatchResponse.index === 0 || "";
                        if (sWord) {
                            var iUserScore = oJumblesInt.oFuncs.getScore(sLastPlayer) + 1;
                            oJumblesInt.oFuncs.setScore(sLastPlayer, iUserScore);
                            sendToAll('Correcto, la palabra era: ' + sCurrWord + '.' + sLastPlayer + '(' + iUserScore + ' puntos)');
                            if (bhasTTS && bSoundOn) {
                                utterance.text = 'Correcto. La palabra era: ' + sCurrWord;
                                if (iUserScore === 10) {
                                    utterance.text = "Impresionante. El jugador tiene " + iUserScore + 'puntos.';
                                }
                                window.speechSynthesis.speak(utterance);
                            }
                            nextWord(sLastPlayer);
                            return true;
                        } else {// palabra equivocada intentos de incremento;
                            iTries++;
                            var arrTease = ['Inténtalo de nuevo!","Casi lo tenía!', "Nope! ", "Mejor suerte la próxima vez.", "¿Es difícil?"];
                            var x = Math.floor((Math.random() * arrTease.length));
                            if (iTries > 5) {
                                sendToAll('Pasando a la siguiente palabra');
                                nextWord();
                            }
                            else {
                                sendToAll(arrTease[x] + ' la palabra equivocada de ' + sLastPlayer + ' es ' + sData.substr(1));
                            }
                            return true;
                        }
                    }
                }
            }
        }
 
        function isServerCmd(msg) {
            var sServerCmd = sBot + ' [';
            var bServerMsg = msg.substr(0, sServerCmd.length) === sServerCmd;
            if (bServerMsg) {
                removeMsg();
                var iCmdLen = sBot.length;
                var sCmd = msg.substr(iCmdLen + 1, 3);
                var sCmdStr = msg.substr(iCmdLen + 4);
                var bGameOn = oJumblesInt.oFuncs.getVariable('bGameOn');
                if (!bGameOn) {
                    if (sCmd === "[s]") {
                        if (!bTimerOn) {
                            bTimerOn = true;
                            startCounter();
                        }
                        iRandomSeed = sCmdStr;
                        arrOrigWords = oJumblesInt.oFuncs.randomizeArray(arrOrigWords, iRandomSeed);
                        sendPM(' v' + sVer + ' Saludos,  Escribe !jayuda para ver un manual de como jugar.');
                        oJumblesInt.oFuncs.setVariable('bGameOn', true);
                        bGameOn = oJumblesInt.oFuncs.getVariable('bGameOn');
                        return true;
                    }
                    else if( sCmd === "[j]") {
                        sendPM("Usted no puede iniciar el juego, pida a un administrador o moderador para que inicien el juego.");
                        return true;
                    }
                }
                else if (bGameOn) {
                    if (sCmd === "[j]") { // Iniciar Juego
                        sJoinUser = sCmdStr;
                        if (!getPlayer(sJoinUser)) {
                            oJumblesInt.oFuncs.setPlayer(sJoinUser);
                            sendPM('Bienvenido, escribe !jayuda para ver un manual de como jugar.');
                        }
                        if (getPlayer(wgUserName)) {
                            sendServerMsg('w', iRandomSeed);
                            nextWord(); //pedir la palabra siguiente de usuario existente
                        }
 
                        return true;
                    }
                    else if (sCmd === "[w]") { //eliminar palabras actuales
                        if (getPlayer(wgUserName)) {
                            iRandomSeed = sCmdStr;
                            arrOrigWords = oJumblesInt.oFuncs.randomizeArray(arrOrigWords, iRandomSeed);
                            return true;
                        }
                    } else if (sCmd === "[n]") { //enviar una nueva palabra 
                        //                if (!bTimerOn){startCounter();}
                        if (getPlayer(wgUserName)) {
                            sCmdStr = msg.substr(iCmdLen + 4);
                            var arrWordValues = sCmdStr.split(",");
                            iWordIndex = arrWordValues[0];
                            var sLastUserScored = arrWordValues[1];
                            var sScrambled = scramble(iRandomSeed, iWordIndex);
                            sendBannerMsg(sScrambled, sLastUserScored);
                            return true;
                        }
                    } else if (sCmd === "[e]" && getProfile() === 0) { //Detener el Juego
                        finishGame();
                        return true;
                    }
                } 
            }
        }
 
        function removeMsg() {
            $('.Chat li').last().remove();
        }
        function triggeredCmd(sData) {
            sData = sData.toLowerCase();
            var arrMatchCmd = sData.match(/^!(\S+)/i) || [];
            var sCmd = arrMatchCmd[1] || "";
            if (sData.substr(0, 1) === ("!")) {
                var oUser = {sNick: wgUserName, iProfile: getProfile()};
                if (sCmd) {
                    removeMsg();
                    if (oJumblesInt.oFuncs.getCommmand(sCmd, oUser)) {
                        return true;
                    }
                }
            }
        }
 
        function nextWord(sUserScored) {
            if (!sUserScored) {
                sUserScored = "";
            }
            var iNextWordIndex = new Number(iWordIndex) + 1;
            sendServerMsg("n", iNextWordIndex + "," + sUserScored);
            iTries = 0;
        }
 
        function startCounter() { //Tiempo terminado;
            if (bTimerOn) {
                if (iElapsedSeconds > iGametime * 60) {
                    endGame();
                }
                iElapsedSeconds += 1;
                startCounterVar = setTimeout(function() {
                    startCounter();
                }, 1000);
            }
        }
 
        function endGame() {
            sendServerMsg('e', "");
        }
 
        function finishGame() { //Fin del Juego
            sendToAll(sBot + "Game over");
            bTimerOn = false;
            clearTimeout(startCounterVar);
            sendTopMsg();
            iWordIndex = -1; //restablecer el índice
            iTries = 0;
            iElapsedSeconds = 0;
            oJumblesInt.oFuncs.resetGame();
            bGameStarted = false;
        }
 
        function scramble(iRandSeed, iWord) { //Palabra revueltos
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
            var sScrambled = oTmp.replace(/,/g, "").toLowerCase();
            return sScrambled;
        }
 
 
        function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
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
            var groups = mw.config.get('wgUserGroups').join(" "); //get groups user belongs to
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
 
        function getPlayer(sUser) {
            return oJumblesInt.oFuncs.getPlayer(sUser);
        }
 
 
        function sendServerMsg(sType, sTxt) {
            sTxt = sTxt || "";
            if (sType)
            {
                sendToAll(sBot + ' [' + sType + ']' + sTxt);
            }
        }
 
        function sendTopMsg(sTxt) {
            if (!sTxt) {
                return;
            }
            if (!$('#jumblesheader').length) {
                $('#ChatHeader h1.public.wordmark').append('<span id="jumblesheader"></span>');
            }
            if ($('#jumblesheader').length)  {
                $('#jumblesheader').html(sTxt);
            }
            //$('#sTopMsgId').html(sTxt);
        }
 
        function sendBannerMsg(sMsg, sWho) {
            if (getPlayer(wgUserName)) {
                var sLastScorer = "";
                var sMsgToSend;
                if (sWho) {
                    var iUserScore = oJumblesInt.oFuncs.getScore(sWho);
                    sLastScorer = ' • Último anotador:' + ' ' + sWho.toUpperCase() + ' ' + '(' + iUserScore + 'XP' + imgBitcoin + ')•';
                }
                sMsgToSend = '' + imgHeader + sBot.toUpperCase() + ' Nueva palabra →' + sMsg + '←  ' + imgHeader + sLastScorer;
                sendTopMsg(sMsgToSend);
            }
        }
        //http://runescape.wikia.com/wiki/User:Joeytje50/chatmsg.js
 
        function sendPM(sMsg) {
          oJumblesInt.oFuncs.sendPM(wgUserName,sMsg);
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
    }
});
// </syntaxhighlight>