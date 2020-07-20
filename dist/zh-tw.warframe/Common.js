window.railWAM = {
  logPage:"Project:WAM Log"
};
window.UserTagsJS = {
	modules: {},
	tags: {
    // 內部用戶權限名稱: { 外部標籤文字顯示 }
    bureaucrat: {u:'維基站長', link:'Project:站長'},
    sysop: {u:'維基管理員', link:'Project:管理員'},
    chatmoderator: {u:'聊天室管理員', link:'Project:管理員'},
    threadmoderator: {u:'討論區管理員', link:'Project:管理員'},
    inactive: {u:'不活耀的用戶'},
    montheditor: { u:'本月最佳貢獻者' }
  },
	oasisPlaceBefore: ''
};
UserTagsJS.modules.inactive = {
	days: 7,
	namespaces: [0],
	zeroIsInactive: true // 條目編輯次數為0 = 休眠中
};
UserTagsJS.modules.nonuser = true; // Switch on
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 5, // 須參與維基5天
	edits: 10, // 而且必須擁有10次編輯才會移除標籤
	namespace: 0 // 編輯必須在條目命名空間內才列入計算
};