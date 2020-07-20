// Muốn học làm sao để sửa đổi và thêm nào nó? Xem http://dev.wikia.com/wiki/UserTags để biết thông tin

// Usertags
// Core configuration. We add more custom tags and change what the some tags say.
window.UserTagsJS = {
	modules: {},
	tags: { 
		tech: 'Technician',
		featured: 'Featured user',
		wasfeatured: 'Former featured user',
                gacontapchoi: 'KỸ THUẬT VIÊN',
}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
        'Gà Con Tập Chơi': ['gacontapchoi'],

};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30; // Không hoạt động nếu không sửa đổi quá 30 ngày.
UserTagsJS.modules.metafilter = {
	sysop: ['Hành chính viên', 'Sáng lập viên'],
	bureaucrat: ['Sáng lập viên'],
	chatmoderator: ['Bảo quản viên', 'Hành chính viên', 'Sáng lập viên'],
        rollback: ['Bảo quản viên', 'Điều phối viên tán gẫu', 'Điều phối viên', 'Hành chính viên', 'Sáng lập viên'],
        moderator: ['Hành chính viên', 'Bảo quản viên', 'Sáng lập viên']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'moderator', 'chatmoderator', 'rollback', 'bot-global', 'patroller'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});