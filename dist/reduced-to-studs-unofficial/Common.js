window.UserTagsJS = {
    // This tells the script to automatically find users in admin/bureaucrat groups
    modules: {
        groups: true,
    },
    tags: {
        // 'bureaucrat' is the correct group name
        bureaucrat: { u: 'Bureaucrat' },
        // 'sysop' is the technical name for Administrator
        sysop: { u: 'Administrator' } 
    }
};