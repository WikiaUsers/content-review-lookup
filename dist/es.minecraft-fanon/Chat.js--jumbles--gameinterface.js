/*
 * GameInterface Html5
 * By Dessamator
 */
console.log('GameInterface loaded');
var tGameInt = {oVars: {sBotName: "Miko", sCmdPrefixSymbol: '!', sCmdPrefix: '', arrProfile: ['operator', 'player'], oPlayers: {}, bGameOn: false}, oUserCmds: {}, oFuncs: {}};
var tCmds;
 
tGameInt.oFuncs.getGameInterface = function(oNewCmds, sPrefix) {
    tCmds = {startgame: {name: "comenzar", userProfile: 0, mfunction: null, enabled: true, helptext: "Comenzar el Juego."},
        stopgame: {name: "stop", userProfile: 0, mfunction: null, enabled: true, helptext: "Detener el Juego."},
        leavegame: {name: "abandonar", userProfile: 1, mfunction: null, enabled: true, helptext: "Abandonar el Juego."},
        joingame: {name: "unirse", userProfile: 1, mfunction: null, enabled: true, helptext: "Unirse al Juego."},
        getscore: {name: "record", userProfile: 1, mfunction: null, enabled: true, helptext: "Mostrar tu Puntuación."},
        getplayerlist: {name: "players", userProfile: 1, mfunction: null, enabled: true, helptext: "Lista de Jugadores."},
        gethelp: {name: "ayuda", userProfile: 5, mfunction: null, enabled: true, helptext: "Le mostrará un manual de Comando."}};
    if (oNewCmds) {
        for (var sCmd in oNewCmds) {
            if (tCmds[sCmd]) { // if command exists set values
                tGameInt.oFuncs.setUserCmdProps(sCmd, oNewCmds[sCmd]);
            }
            else { // if command doesn't exist create a new command
                tGameInt.oFuncs.addUserCmd(sCmd, oNewCmds[sCmd]);
            }
        }
    }
    initializeUserCmds(tCmds, sPrefix);
    return tGameInt;
};
 
tGameInt.oFuncs.getCommmand = function(sCmd, oUser, fAction) {
    var sCmdPrefix = tGameInt.oVars.sCmdPrefix;
    if (sCmdPrefix && sCmdPrefix.length > 0) {
        var sPrefix = sCmd.substr(0, sCmdPrefix.length);
        if (sPrefix === sCmdPrefix) {
            sCmd = sCmd.substr(sCmdPrefix.length); // get only the command
        }
    }
    if (sCmd && tGameInt.oUserCmds[sCmd]) {
        if (tGameInt.oFuncs.isCmdEnabled(sCmd)) {
            if (tGameInt.oFuncs.canUse(sCmd, oUser)) {
                tGameInt.oUserCmds[sCmd][0](oUser.sNick, fAction);
                return true;
            } else {
                sendPM("Usted no está autorizado a utilizar este comando. Para obtener ayuda sobre el tipo " + tGameInt.oVars.sCmdPrefixSymbol + tCmds.gethelp.name + ".");
            }
        } else {
            return false; // this command has been disabled.
        }
    }
    return false;
};
 
tGameInt.oFuncs.setGameOn = function(bOption) {
    if (typeof(bOption) === "boolean") {
        tGameInt.oFuncs.setVariable("bGameOn", bOption);
    }
};
tGameInt.oFuncs.setVariable = function(sVarName, sVarValue) {
    if (sVarName && sVarValue && tGameInt.oVars[sVarName]||typeof(tGameInt.oVars[sVarName])==="boolean" ) {
        tGameInt.oVars[sVarName] = sVarValue;
    }
};
 
tGameInt.oFuncs.getVariable = function(sVarName) {
    if (sVarName && tGameInt.oVars[sVarName]) {
        return tGameInt.oVars[sVarName];
    }
};
 
 
function initializeUserCmds(tCmds, sPrefix) {
    tGameInt.oVars.sCmdPrefix = sPrefix;
    tGameInt.oUserCmds[tCmds.startgame.name] = [function(sUser) {
            if (tCmds.startgame.mfunction) {
                tCmds.startgame.mfunction(sUser);
            } else {
                if (sUser) {
                    tGameInt.oFuncs.sendPM(sUser, 'El comando aún no se implementada');
                }
            }
        }, tCmds.startgame.helptext, tCmds.startgame.userProfile, tCmds.startgame.enabled];
 
    tGameInt.oUserCmds[tCmds.stopgame.name] = [function(sUser) {
            if (tCmds.stopgame.mfunction) {
                tCmds.stopgame.mfunction(sUser);
            } else {
                if (sUser) {
                    tGameInt.oFuncs.sendPM(sUser, 'El comando aún no se implementada');
                }
            }
        }, tCmds.stopgame.helptext, tCmds.stopgame.userProfile, tCmds.stopgame.enabled];
 
    tGameInt.oUserCmds[tCmds.gethelp.name] = [function(sUser) {
            if (tCmds.gethelp.mfunction) {
                tCmds.gethelp.mfunction(sUser);
            } else {
                var sHelp = "Manual de Comandos<ul>";
                for (var sCmd in tGameInt.oUserCmds) {
                    sHelp += '<li>' + sPrefix + sCmd + ' - ' + tGameInt.oUserCmds[sCmd][1]+'<li>';
                }
                sHelp +="</ul>";
                if (sUser) {
                    tGameInt.oFuncs.sendPM(sUser, sHelp);
                }
            }
        }, tCmds.gethelp.helptext, tCmds.gethelp.userProfile, tCmds.gethelp.enabled];
 
    tGameInt.oUserCmds[tCmds.joingame.name] = [function(sUser) {
            if (tCmds.joingame.mfunction) {
                tCmds.joingame.mfunction(sUser);
            } else {
                tGameInt.oFuncs.setPlayer(sUser, true);
            }
        }, tCmds.joingame.helptext, tCmds.joingame.userProfile, tCmds.joingame.enabled];
 
    tGameInt.oUserCmds[tCmds.leavegame.name] = [function(sUser) {
            if (tCmds.leavegame.mfunction) {
                tCmds.leavegame.mfunction(sUser);
            } else {
                tGameInt.oFuncs.setPlayer(sUser, false);
            }
        }, tCmds.leavegame.helptext, tCmds.leavegame.userProfile, tCmds.leavegame.enabled];
 
    tGameInt.oUserCmds[tCmds.getplayerlist.name] = [function(sUser) {
            if (tCmds.getplayerlist.mfunction) {
                tCmds.getplayerlist.mfunction(sUser);
            } else {
                var sPlayers = "Jugadores Online<ul>";
                var arrPlayers = tGameInt.oFuncs.getPlayerList();
                for (sUser in arrPlayers) {
                    sPlayers += '<li>'+ sUser + ' - ' + tGameInt.oFuncs.getScore(sUser)+'</li>';
                }
                sPlayers +='</ul>';
                tGameInt.oFuncs.sendPM(sUser, sPlayers);
            }
        }, tCmds.getplayerlist.helptext, tCmds.getplayerlist.userProfile, tCmds.getplayerlist.enabled];
 
    tGameInt.oUserCmds[tCmds.getscore.name] = [function(sUser) {
            if (tCmds.getscore.mfunction) {
                tCmds.getscore.mfunction(sUser);
            } else {
                var bPlayer = tGameInt.oFuncs.isPlayer(sUser);
                var iScore = tGameInt.oFuncs.getScore(sUser);
                if (bPlayer && iScore >= 0) {
                    var sPlayers = "Su puntuación es " + tGameInt.oFuncs.getScore(sUser);
                    tGameInt.oFuncs.sendPM(sUser, sPlayers);
                }
            }
        }, tCmds.getscore.helptext, tCmds.getscore.userProfile, tCmds.getscore.enabled];
 
}
 
tGameInt.oFuncs.getScore = function(sUser) {
    var oPlayerList = tGameInt.oFuncs.getPlayerList();
    if (tGameInt.oFuncs.isPlayer(sUser)) {
        return oPlayerList[sUser].score;
    }
    return false;
};
 
tGameInt.oFuncs.sendPM = function(sUser, sMsg, fAction) {
    if (fAction) {
        fAction(sUser, sMsg);
    } else {
        alert(sMsg);
    }
};
 
tGameInt.oFuncs.getPlayerList = function() {
    return tGameInt.oVars.oPlayers;
};
 
tGameInt.oFuncs.getCmdName = function(sCmd, bPrefix) {
    var sPrefix = '';
    if (bPrefix) {
        sPrefix = tGameInt.oFuncs.getVariable('sCmdPrefixSymbol') + tGameInt.oFuncs.getVariable('sCmdPrefix');
    }
    if (sCmd && tCmds[sCmd]) {
        return sPrefix + tCmds[sCmd].name;
    }
};
 
tGameInt.oFuncs.setScore = function(sUser, iScore) {
    var oPlayerList = tGameInt.oFuncs.getPlayerList();
    if (tGameInt.oFuncs.isPlayer(sUser)) {
        oPlayerList[sUser].score = iScore;
        return true;
    }
    return false;
};
 
tGameInt.oFuncs.setPlayer = function(sUser, bPlayer) {
    var oPlayerList = tGameInt.oFuncs.getPlayerList();
    if (!bPlayer & oPlayerList[sUser]) {
        delete oPlayerList[sUser];
        tGameInt.oFuncs.sendPM(sUser, sUser + ' ha abandonado la partida');
    }
    else if (!tGameInt.oFuncs.isPlayer(sUser)) {
        oPlayerList[sUser] = {score: 0};
        tGameInt.oFuncs.sendPM(sUser, sUser + ' se unió a la partida');
        return true;
    }
    return false;
};
 
tGameInt.oFuncs.getPlayer = function(sUser) {
    var oPlayerList = tGameInt.oFuncs.getPlayerList();
    if (oPlayerList[sUser]) {
        return oPlayerList[sUser];
    }
    return null;
};
 
tGameInt.oFuncs.isPlayer = function(sUser) {
    var oPlayerList = tGameInt.oFuncs.getPlayerList();
    if (sUser && oPlayerList[sUser]) {
        return true;
    }
    return false;
};
 
tGameInt.oFuncs.randomizeArray = function(arrOriginal, iRandomSeedNo) { //randomizes array
    if (!iRandomSeedNo) {
        iRandomSeedNo = Math.floor(Math.random() * 999999) + 1;
    }
    var mRandomSeed = tGameInt.oFuncs.randomSeed(iRandomSeedNo);
    var sTmp, sTmp1 = "";
    var i = 0;
    var iRand = 0;
    if (arrOriginal.length === 0) {
        return;
    }
    while (i < arrOriginal.length) {
        iRand = Math.floor(mRandomSeed() * arrOriginal.length) + 1;
        if (arrOriginal[iRand]) {
            sTmp = arrOriginal[i];
            sTmp1 = arrOriginal[iRand];
            arrOriginal[i] = sTmp1;
            arrOriginal[iRand] = sTmp;
            i++;
        }
    }
    return arrOriginal;
};
 
//http://stackoverflow.com/questions/521295/javascript-random-seeds (http://stackoverflow.com/a/23304189)
tGameInt.oFuncs.randomSeed = function(iSeed) {
    Math.seed = function(s) {
        return function() {
            s = Math.sin(s) * 10000;
            return s - Math.floor(s);
        };
    };
    return Math.seed(iSeed);
};
 
tGameInt.oFuncs.isCmdEnabled = function(sCmd) {
    return tGameInt.oUserCmds[sCmd][3];
};
 
tGameInt.oFuncs.canUse = function(sCmd, oUser) {
    if (sCmd && tGameInt.oUserCmds[sCmd]) {
        var iMinProfile = tGameInt.oUserCmds[sCmd][2];
        if (oUser.iProfile <= iMinProfile) {
            return true;
        }
    }
    return false;
};
// sets a cmd property in tCmds  using propertyname, property value
tGameInt.oFuncs.setGameCmdProperty = function(sCmdName, sPropertyName, oPropertyValue) {
    if (sCmdName !== undefined && sCmdName !== null && sCmdName.length > 0 && tCmds[sCmdName]) {
        if (tCmds[sCmdName][sPropertyName]) {
            if (sPropertyName === "mfunction" && typeof(oPropertyValue) !== "function") {
                console.log("Command property must be a function for " + oPropertyValue);
                return false;
            } else if (sPropertyName !== "mfunction") {
                tCmds[sCmdName][sPropertyName] = oPropertyValue;
                return true;
            }
        }
    }
    return false;
};
 
// sets a cmd property in tCmds  using propertyname, property value
tGameInt.oFuncs.setUserCmdProps = function(sCmdName, oProperties) {
    if (sCmdName !== undefined && sCmdName !== null && sCmdName.length > 0 && tCmds[sCmdName]) {
        if (tCmds[sCmdName]) {
            tCmds[sCmdName] = oProperties;
            return true;
        }
    }
    return false;
};
 
// sets a cmd property in tCmds  using propertyname, property value
tGameInt.oFuncs.addUserCmd = function(sCmdName, oProperties) {
    if (sCmdName !== undefined && sCmdName !== null && sCmdName.length > 0) {
        if (!tCmds[sCmdName]) {
            tCmds[sCmdName] = oProperties;
            tGameInt.oUserCmds[tCmds[sCmdName].name] = [function(sUser) {
                    if (tCmds[sCmdName].mfunction) {
                        tCmds[sCmdName].mfunction(sUser);
                    } else {
                        if (sUser) {
                            tGameInt.oFuncs.sendPM(sUser, 'El comando aún no se implementada');
                        }
                    }
                }, tCmds[sCmdName].helptext, tCmds[sCmdName].userProfile, tCmds[sCmdName].enabled];
            return true;
        } else {
            return false; // command already exists use tGameInt.oFuncs.setUserCmdProps instead
        }
    }
    return false;
};
 
 
tGameInt.oFuncs.setBot = function(sName) {
    tGameInt.oFuncs.setVariable('sBotName', sName);
};
tGameInt.oFuncs.getBot = function() {
    return tGameInt.oVars.sBotName;
};
 
tGameInt.oFuncs.resetGame = function() {
    tGameInt.oFuncs.setVariable('bGameOn', false);
    tGameInt.oFuncs.setVariable('oPlayers', {});
};