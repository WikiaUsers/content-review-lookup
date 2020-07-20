var tCafeInt = {oVars: {sBotName: "Miko", sCmdPrefixSymbol: '!', sCmdPrefix: '', arrProfile: ['operator', 'player']}, oUserCmds: {}, oFuncs: {}};
var tCmds;

tCafeInt.oFuncs.getGameInterface = function(oNewCmds, sPrefix) {
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
                tCafeInt.oFuncs.setUserCmdProps(sCmd, oNewCmds[sCmd]);
            }
            else { // if command doesn't exist create a new command
                tCafeInt.oFuncs.addUserCmd(sCmd, oNewCmds[sCmd]);
            }
        }
    }
    initializeUserCmds(tCmds, sPrefix);
    return tCafeInt;
};

tCafeInt.oFuncs.getCommmand = function(oUser, sData) {
    sData = sData.toLowerCase();
    var arrMatchCmd = sData.match(/^(\S+)\s*(\S*)/i) || [];
    var sCmd = arrMatchCmd[1] || "";
    var sCmdPrefix = tCafeInt.oVars.sCmdPrefix;
    sCmd = sCmd.substring(tCafeInt.oVars.sCmdPrefixSymbol.length);
    if (tCafeInt.oFuncs.isCommand(sCmd)) {
        sCmd = sCmd.substring(sCmdPrefix.length);
        if (tCafeInt.oFuncs.isCmdEnabled(sCmd)) {
            if (tCafeInt.oFuncs.canUse(sCmd, oUser)) {
                tCafeInt.oUserCmds[sCmd][0](oUser.sNick, sData);
                return true;
            } else {
             sendPM("You are not authorized to use this command. For help type " +tCafeInt.oVars.sCmdPrefixSymbol +tCmds.gethelp.name+ ".");
            }
        } else {
            return false; // this command has been disabled.
        }
    }
    return false;
};

tCafeInt.oFuncs.isCommand = function(sCmd) {
     var sCmdPrefix = tCafeInt.oVars.sCmdPrefix;
    if (sCmdPrefix && sCmdPrefix.length > 0) {
        var sPrefix = sCmd.substr(0, sCmdPrefix.length);
        if (sPrefix === sCmdPrefix) {
            sCmd = sCmd.substr(sCmdPrefix.length); // get only the command
        }
        else{
            return false; //not a command
        }
    }
    if (sCmd && tCafeInt.oUserCmds[sCmd]) {
        return true;
    }
    return false;
};

tCafeInt.oFuncs.setVariable = function(sVarName, sVarValue) {
    if (sVarName!==undefined && sVarValue!==undefined && tCafeInt.oVars[sVarName]!==undefined ) {
        tCafeInt.oVars[sVarName] = sVarValue;
    }
};

tCafeInt.oFuncs.getVariable = function(sVarName) {
    if (sVarName && tCafeInt.oVars[sVarName]) {
        return tCafeInt.oVars[sVarName];
    }
};

function initializeUserCmds(tCmds, sPrefix) {
    tCafeInt.oVars.sCmdPrefix = sPrefix;
    tCafeInt.oUserCmds[tCmds.gethelp.name] = [function(sUser,sData) {
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
}
 
tCafeInt.oFuncs.sendPM = function(sUser, sMsg, fAction) {
    if (fAction) {
        fAction(sUser, sMsg);
    } else {
        alert(sMsg);
    }
};
 
tCafeInt.oFuncs.getCmdName = function(sCmd, bPrefix) {
    var sPrefix = ";";
    if (bPrefix) {
        sPrefix = tCafeInt.oFuncs.getVariable('sCmdPrefixSymbol') + tCafeInt.oFuncs.getVariable('sCmdPrefix');
    }
    if (sCmd && tCmds[sCmd]) {
        return sPrefix + tCmds[sCmd].name;
    }
};

tCafeInt.oFuncs.randomizeArray = function(arrOriginal, iRandomSeedNo) { //randomizes array
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
tCafeInt.oFuncs.randomSeed = function(iSeed) {
    Math.seed = function(s) {
        return function() {
            s = Math.sin(s) * 10000;
            return s - Math.floor(s);
        };
    };
    return Math.seed(iSeed);
};
 
tCafeInt.oFuncs.isCmdEnabled = function(sCmd) {
    return tCafeInt.oUserCmds[sCmd][3];
};
 
tCafeInt.oFuncs.canUse = function(sCmd, oUser) {
    if (sCmd == undefined || sCmd == null) {
        return false;
    }
    if (sCmd && tCafeInt.oUserCmds[sCmd]) {
        var iMinProfile = tCafeInt.oUserCmds[sCmd][2];
        if (oUser.iProfile <= iMinProfile) {
            return true;
        }
    }
    return false;
};
// sets a cmd property in tCmds using propertyname, property value
tCafeInt.oFuncs.setGameCmdProperty = function(sCmdName, sPropertyName, oPropertyValue) {
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
tCafeInt.oFuncs.setUserCmdProps = function(sCmdName, oProperties) {
    if (sCmdName !== undefined && sCmdName !== null && sCmdName.length > 0 && tCmds[sCmdName]) {
        if (tCmds[sCmdName]) {
            tCmds[sCmdName] = oProperties;
            return true;
        }
    }
    return false;
};
 
// sets a cmd property in tCmds using propertyname, property value
tCafeInt.oFuncs.addUserCmd = function(sCmdName, oProperties) {
    if (sCmdName !== undefined && sCmdName !== null && sCmdName.length > 0) {
        if (!tCmds[sCmdName]) {
            tCmds[sCmdName] = oProperties;
            tCafeInt.oUserCmds[tCmds[sCmdName].name] = [function(sUser,sData) {
                    if (tCmds[sCmdName].mfunction) {
                        tCmds[sCmdName].mfunction(sUser,sData);
                    } else {
                        if (sUser) {
                            tCafeInt.oFuncs.sendPM(sUser, 'The command not yet implemented');
                        }
                    }
                }, tCmds[sCmdName].helptext, tCmds[sCmdName].userProfile, tCmds[sCmdName].enabled];
            return true;
        } else {
            return false; // command already exists use tCafeInt.oFuncs.setUserCmdProps instead
        }
    }
    return false;
};

tCafeInt.oFuncs.setBot = function(sName) {
    tCafeInt.oFuncs.setVariable('sBotName', sName);
};
tCafeInt.oFuncs.getBot = function() {
    return tCafeInt.oVars.sBotName;
};