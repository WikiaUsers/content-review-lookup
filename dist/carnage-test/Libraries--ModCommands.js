var ModCommands = {};
ModCommands.groups = mainRoom.model.users.findByName(wgUserName).attributes.groups;
ModCommands.isMod = function(from){
    var mod_groups = ['chatmoderator', 'sysop', 'bureaucrat', 'vstf', 'helper', 'staff'],
        groups = ModCommands.groups;
    if (typeof from == 'string'){
        mod_groups = mod_groups.slice(mod_groups.indexOf(from), mod_groups.length);
    }
    
    var i = 0, value = false;
    try {
        do {
            var group = groups[i];
            if (mod_groups.indexOf(group) > -1){
                value = true;
                break;
            }
            i++;
        } while (i < groups.length);
    } catch(e){
        throw 'Cannot perform the "isMod" command. \n\n'.concat(e.stack);
    }
    return value;
};

ModCommands.isCanonicalCommand = function(name){
    var value = false,
        commands = ModCommands.commands;
    if (name in commands)
        value = true;
    return value;
};

ModCommands.init = function(name){
    var isMod = ModCommands.isMod();
    if (ModCommands.isCanonicalCommand(name)){
        return ModCommands.access(name, isMod);
    }
};