$(".openchat a").click(function() { 
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes'); 
    return false; 
});

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];