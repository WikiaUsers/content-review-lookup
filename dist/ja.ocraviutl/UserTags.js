window.UserTagsJS = {
 modules: {},
 tags: {
     osc: { u:'OSC' },
     aul: { u:'AUL' },
     lua: { u:'Lua' },
     maybesock: { u:'Maybe Socking' },
     'inactive-admin': { u:'Inactive Admin' },
     'half-sysop': { u:'半アドミン' },
     'sysop-bot': { u:'専属ボット' },
     'staff-bot': { u:'スタッフのボット' },
 },
 //oasisPlaceBefore:''
};

UserTagsJS.modules.metafilter = {
 'inactive': ['blocked'], // 長時間ブロした人の窓にInactiveが現れる関係で
 'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
 'chatmoderator': ['sysop', 'bureaucrat']
};

UserTagsJS.modules.mwGroups = ['bannedfromchat', 'blocked', 'bot', 'bureaucrat', 'chatmoderator', 'checkuser', 'content-moderator', 'council', 'helper', 'rollback', 'staff', 'sysop', 'threadmoderator', 'vanguard', 'vstf', 'maybesock', 'sysop-bot', 'staff-bot', 'osc', 'aul', 'lua']

UserTagsJS.modules.implode = {
 'inactive-bureaucrat': ['bureaucrat', 'inactive'],
 // Adds 'inactive-bureaucrat' BUT also removes bureaucrat and inactive.
 // i.e. Replaces bureaucrat and inactive with 'inactive-bureaucrat'
 'inactive-admin': ['sysop', 'inactive'],
 'half-sysop': ['chatmoderator', 'patroller', 'rollback'],
 'maybesock': ['notautoconfirmed', 'newuser'],
 'sysop-bot': ['sysop', 'bot'],
 'staff-bot': ['staff', 'bot-global'],
};

// osc、aul、luaの付加
UserTagsJS.modules.custom = {
 'Laclale': ['osc', 'aul', 'lua'],
 '9K': ['osc']
};