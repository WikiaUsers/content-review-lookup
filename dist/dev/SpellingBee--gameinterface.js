/*
 * GameInterface Html5
 * By Dessamator
 */

var tGameInt = {oVars: {sBotName: "Miko", sCmdPrefixSymbol: '!', sCmdPrefix: '', arrProfile: ['operator', 'player'], oPlayers: {}, bGameOn: false,sGameName:""}, oUserCmds: {}, oFuncs: {}};
var tCmds;

tGameInt.oFuncs.getGameInterface = function(oNewCmds, sPrefix) {
    tCmds = {startgame: {name: "start", userProfile: 0, mfunction: null, enabled: true, helptext: "Starts a game."},
        stopgame: {name: "stop", userProfile: 0, mfunction: null, enabled: true, helptext: "Stops a game."},
        leavegame: {name: "leave", userProfile: 1, mfunction: null, enabled: true, helptext: "Leave a game."},
        joingame: {name: "join", userProfile: 1, mfunction: null, enabled: true, helptext: "Join a game."},
        getscore: {name: "score", userProfile: 1, mfunction: null, enabled: true, helptext: "Shows your score."},
        getplayerlist: {name: "players", userProfile: 1, mfunction: null, enabled: true, helptext: "Shows player list."},
        gethelp: {name: "help", userProfile: 5, mfunction: null, enabled: true, helptext: "Shows help."}};
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

tGameInt.oFuncs.getCommmand = function(oUser, sData) {
    sData = sData.toLowerCase();
    var arrMatchCmd = sData.match(/^(\S+)\s*(\S*)/i) || [];
    var sCmd = arrMatchCmd[1] || "";
    var sCmdPrefix = tGameInt.oVars.sCmdPrefix;
    sCmd = sCmd.substring(tGameInt.oVars.sCmdPrefixSymbol.length);
    if (tGameInt.oFuncs.isCommand(sCmd)) {
        sCmd = sCmd.substring(sCmdPrefix.length);
        if (tGameInt.oFuncs.isCmdEnabled(sCmd)) {
            if (tGameInt.oFuncs.canUse(sCmd, oUser)) {
                tGameInt.oUserCmds[sCmd][0](oUser.sNick, sData);
                return true;
            } else {
             sendPM("You are not authorized to use this command. For help type " +tGameInt.oVars.sCmdPrefixSymbol +tCmds.gethelp.name+ ".");
            }
        } else {
            return false; // this command has been disabled.
        }
    }
    return false;
};

tGameInt.oFuncs.isCommand = function(sCmd) {
     var sCmdPrefix = tGameInt.oVars.sCmdPrefix;
    if (sCmdPrefix && sCmdPrefix.length > 0) {
        var sPrefix = sCmd.substr(0, sCmdPrefix.length);
        if (sPrefix === sCmdPrefix) {
            sCmd = sCmd.substr(sCmdPrefix.length); // get only the command
        }
        else{
            return false; //not a command
        }
    }
    if (sCmd && tGameInt.oUserCmds[sCmd]) {
        return true;
    }
    return false;
};

tGameInt.oFuncs.setGameOn = function(bOption) {
    if (typeof(bOption) === "boolean") {
        tGameInt.oFuncs.setVariable("bGameOn", bOption);
    }
};
tGameInt.oFuncs.setVariable = function(sVarName, sVarValue) {
    if (sVarName!==undefined && sVarValue!==undefined && tGameInt.oVars[sVarName]!==undefined ) {
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
    tGameInt.oUserCmds[tCmds.startgame.name] = [function(sUser,sData) {
            if (tCmds.startgame.mfunction) {
                tCmds.startgame.mfunction(sUser,sData);
            } else {
                if (sUser) {
                    tGameInt.oFuncs.sendPM(sUser, 'The command not yet implemented');
                }
            }
        }, tCmds.startgame.helptext, tCmds.startgame.userProfile, tCmds.startgame.enabled];

    tGameInt.oUserCmds[tCmds.stopgame.name] = [function(sUser,sData) {
            if (tCmds.stopgame.mfunction) {
                tCmds.stopgame.mfunction(sUser,sData);
            } else {
                if (sUser) {
                    tGameInt.oFuncs.sendPM(sUser, 'The command not yet implemented');
                }
            }
        }, tCmds.stopgame.helptext, tCmds.stopgame.userProfile, tCmds.stopgame.enabled];

    tGameInt.oUserCmds[tCmds.gethelp.name] = [function(sUser,sData) {
            if (tCmds.gethelp.mfunction) {
                tCmds.gethelp.mfunction(sUser,sData);
            } else {
                var sHelp = "Help Commands ";
                for (var sCmd in tGameInt.oUserCmds) {
                    sHelp +=  sPrefix + sCmd + ' - ' + tGameInt.oUserCmds[sCmd][1]+' ';
                }
                sHelp +=" ";
                if (sUser) {
                    tGameInt.oFuncs.sendPM(sUser, sHelp);
                }
            }
        }, tCmds.gethelp.helptext, tCmds.gethelp.userProfile, tCmds.gethelp.enabled];

    tGameInt.oUserCmds[tCmds.joingame.name] = [function(sUser,sData) {
            if (tCmds.joingame.mfunction) {
                tCmds.joingame.mfunction(sUser,sData);
            } else {
                tGameInt.oFuncs.setPlayer(sUser, true);
            }
        }, tCmds.joingame.helptext, tCmds.joingame.userProfile, tCmds.joingame.enabled];

    tGameInt.oUserCmds[tCmds.leavegame.name] = [function(sUser,sData) {
            if (tCmds.leavegame.mfunction) {
                tCmds.leavegame.mfunction(sUser,sData);
            } else {
                tGameInt.oFuncs.setPlayer(sUser, false);
            }
        }, tCmds.leavegame.helptext, tCmds.leavegame.userProfile, tCmds.leavegame.enabled];

    tGameInt.oUserCmds[tCmds.getplayerlist.name] = [function(sUser,sData) {
            if (tCmds.getplayerlist.mfunction) {
                tCmds.getplayerlist.mfunction(sUser,sData);
            } else {
                var sPlayers = "Players ";
                var arrPlayers = tGameInt.oFuncs.getPlayerList();
                for (var sUsers in arrPlayers) {
                    sPlayers += sUsers + ' - ' + tGameInt.oFuncs.getScore(sUsers)+' ';
                }
                sPlayers +=' ';
                tGameInt.oFuncs.sendPM(sUser, sPlayers);
            }
        }, tCmds.getplayerlist.helptext, tCmds.getplayerlist.userProfile, tCmds.getplayerlist.enabled];

    tGameInt.oUserCmds[tCmds.getscore.name] = [function(sUser,sData) {
            if (tCmds.getscore.mfunction) {
                tCmds.getscore.mfunction(sUser,sData);
            } else {
                var bPlayer = tGameInt.oFuncs.isPlayer(sUser);
                var iScore = tGameInt.oFuncs.getScore(sUser);
                if (bPlayer && iScore >= 0) {
                    var sPlayers = "Your score is " + tGameInt.oFuncs.getScore(sUser);
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
    var sPrefix = ";";
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
        tGameInt.oFuncs.sendPM(sUser, sUser + ' left the game');
    }
    else if (!tGameInt.oFuncs.isPlayer(sUser)) {
        oPlayerList[sUser] = {score: 0};
        tGameInt.oFuncs.sendPM(sUser, sUser + ' joined the game');
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

//https://stackoverflow.com/questions/521295/javascript-random-seeds (https://stackoverflow.com/a/23304189)
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
// sets a cmd property in tCmds using propertyname, property value
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

// sets a cmd property in tCmds using propertyname, property value
tGameInt.oFuncs.setUserCmdProps = function(sCmdName, oProperties) {
    if (sCmdName !== undefined && sCmdName !== null && sCmdName.length > 0 && tCmds[sCmdName]) {
        if (tCmds[sCmdName]) {
            tCmds[sCmdName] = oProperties;
            return true;
        }
    }
    return false;
};

// sets a cmd property in tCmds using propertyname, property value
tGameInt.oFuncs.addUserCmd = function(sCmdName, oProperties) {
    if (sCmdName !== undefined && sCmdName !== null && sCmdName.length > 0) {
        if (!tCmds[sCmdName]) {
            tCmds[sCmdName] = oProperties;
            tGameInt.oUserCmds[tCmds[sCmdName].name] = [function(sUser,sData) {
                    if (tCmds[sCmdName].mfunction) {
                        tCmds[sCmdName].mfunction(sUser,sData);
                    } else {
                        if (sUser) {
                            tGameInt.oFuncs.sendPM(sUser, 'The command not yet implemented');
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