cac = {
    groups: {
        crat: { u: 'Bureaucrat'},
        code: { u: 'Lead Coder'},
        cleanup: { u: 'Cleanup'},
        antispam: { u: 'Anti-Spam'}
    },
    users: {
        'Shadowunleashed13': ['crat'],
        'XxTinkaStarxX': ['cleanup']
    },
    checkAccess: function(allowedUserGroups) {
        allowedUserGroup = false;
        for (i=0;i<allowedUserGroups.length;i++) {
            if (wgUserGroups.indexOf(allowedUserGroups[i])>-1 || cac.users[wgUserName].indexOf(allowedUserGroups[i])>-1) {
            allowedUserGroup = true;
           }
        }
        return allowedUserGroup;
    },
    staff: [
        'sysop',
        'crat',
        'chatmoderator'
    ]
}