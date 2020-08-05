window.UserTagsJS = {
    modules: {},
    tags: {
        founder: {u:'나는야 도천공', link:'w:c:ko.community:도움말:사용자 권한 등급#.EC.84.A4.EB.A6.BD.EC.9E.90'},
        bureaucrat: {u:'모쿠 위키 사무관', link:'w:c:ko.community:도움말:사용자 권한 등급#.EC.82.AC.EB.AC.B4.EA.B4.80'},
        sysop: {u:'모쿠 위키 지킴이', link:'w:c:ko.community:도움말:사용자 권한 등급#.EA.B4.80.EB.A6.AC.EC.9E.90'},
        rollback: {u:'모쿠 위키 되돌리기 사용자', link:'w:c:ko.community:도움말:사용자 권한 등급#.EB.90.98.EB.8F.8C.EB.A6.AC.EA.B8.B0_.EC.82.AC.EC.9A.A9.EC.9E.90'},
        'content-moderator': {u:'모쿠 위키 콘텐츠 지킴이', link:'w:c:ko.community:도움말:사용자 권한 등급#.EC.BD.98.ED.85.90.EC.B8.A0_.EA.B4.80.EB.A6.AC.EC.9E.900'},
        chatmoderator: {u:'모쿠 위키 대화방 지킴이', link:'w:c:ko.community:도움말:사용자 권한 등급#.EC.B1.84.ED.8C.85_.EA.B4.80.EB.A6.AC.EC.9E.90'},
        threadmoderator: {u:'모쿠 위키 토론 지킴이', link:'w:c:ko.community:도움말:사용자 권한 등급#.EB.AA.A8.EB.8D.94.EB.A0.88.EC.9D.B4.ED.84.B0'},
        blocked: { u:'철창신세', link:'w:c:ko.community:도움말:사용자 권한 등급#.EC.B0.A8.EB.8B.A8.EB.90.9C_.EC.82.AC.EC.9A.A9.EC.9E.90.EA.B0.80_.ED.95.A0_.EC.88.98_.EC.97.86.EB.8A.94_.EA.B2.83'},
        bot: {u:'모쿠 위키 봇', link:'w:c:ko.community:도움말:사용자 권한 등급#.EB.B4.87'},
        'bot-global': {u:'팬덤 글로벌봇', link:'w:c:ko.community:도움말:사용자 권한 등급#.EB.B4.87'},
        staff: {u:'팬덤 스탭', link:'w:c:ko.community:도움말:사용자 권한 등급#.EC.8A.A4.ED.83.9C.ED.94.84'},
        vstf: {u:'스팸 차단 자원 협력자', link:'w:c:ko.community:도움말:사용자 권한 등급#VSTF'},
        helper: {u:'팬덤 헬퍼', link:'w:c:ko.community:도움말:사용자 권한 등급#.ED.97.AC.ED.8D.BC'},
        council: {u:'커뮤니티 의회', link:'w:c:ko.community:도움말:사용자_권한_등급#.EC.BB.A4.EB.AE.A4.EB.8B.88.ED.8B.B0_.EC.9D.98.ED.9A.8C'},
        newuser: {u:'모쿠 위키 새내기 기여자'},
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;//  
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'threadmoderator', 'patroller', 'content-moderator', 'rollback', 'sysop', 'bannedfromchat', 'blocked', 'bot', 'bot-global', 'staff', 'vstf', 'helper', 'council'];
UserTagsJS.modules.metafilter = {
	sysop: ['bot'],
	chatmoderator: ['threadmoderator', 'sysop', 'bureaucrat', 'vstf', 'bot'],
	threadmoderator: ['sysop', 'bureaucrat', 'bot'],
	rollback: ['content-moderator', 'sysop', 'bureaucrat', 'founder', 'bot'],
	'content-moderator': ['sysop', 'bureaucrat', 'founder', 'bot'],
	bot: ['bot-global']
};
 
// AjaxRC
window.ajaxRefresh = 30000; // AjaxRC time setting
window.ajaxPages = ["특수기능:최근바뀜", "특수기능:위키활동내역", "특수기능:기록",  "특수기능:Images",  "특수기능:새동영상", "특수기능:기여"]; // AjaxRC page setting
window.AjaxRCRefreshText = '자동 갱신'; // AjaxRC text setting
window.AjaxRCRefreshHoverText = '페이지를 자동으로 갱신'; // AjaxRC text hover setting
 
// AjaxBatchDelete
batchDeleteDelay = 500;

// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'threadmoderator', 'content-moderator', 'sysop', 'bureaucrat', 'vstf', 'helper', 'staff']
};
 
/* 틀:USERNAME 활성화 */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */