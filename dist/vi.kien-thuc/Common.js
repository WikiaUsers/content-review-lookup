/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ShowHide/code.js',
        'u:dev:DisplayTimer/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:SkinSwitchButton/code.js',
        'u:dev:WallGreetingButton/code.js',
        // 'u:dev:FastDelete/code.js',
        'u:dev:Message/code.js',
    ]
});
 
// Thẻ thành viên (UserTags)
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 90;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// CHÚ Ý:Cấm hiển thị trò chuyện trong Oasis nhưng không phải là một nhóm người sử dụng danh tính vì vậy phải được kiểm tra thủ công (NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually)
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'threadmoderator', 'patroller', 'content-moderator', 'rollback', 'sysop', 'bannedfromchat', 'blocked', 'bot', 'bot-global', 'staff', 'vstf', 'helper'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder', 'bot'],
	bureaucrat: ['founder'],
	chatmoderator: ['threadmoderator', 'sysop', 'bureaucrat', 'vstf'],
	threadmoderator: ['sysop', 'bureaucrat'],
	rollback: ['content-moderator', 'sysop', 'bureaucrat', 'founder'],
	'content-moderator': ['sysop', 'bureaucrat', 'founder'],
	bot: ['bot-global']
};
 
// AjaxRC
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Làm mới trang một các tự động khi các sửa đổi mới xảy ra.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log", "Special:Images", "Special:Videos", "Special:Contributions", "Special:AbuseLog"];
 
// Xóa hang loạt bằng Ajax (AjaxBatchDelete)
batchDeleteDelay = 1000;
 
// Xóa nhanh (FastDelete)
var fdButtons = [];
 
fdButtons[fdButtons.length] = {
    'summary': 'one-click delete',
        'label': 'one-click delete'
};
 
// Hình động (DynamicImages)
DynamicImages = {
    gifImages: true,
    gifGalleryImages: false
};
 
// Hiển thị đồng hồ (DisplayClock)
// Hiển thị thời gian 12 giờ theo ngày, tháng (tiếng Việt, tên đầy đủ) (Display 12 hour time followed by day, month (Tiếng Việt, full name))
// và năm với "(GMT)" ở cuối (and year with "(GMT)" at the end)
window.DisplayClockJS = '%2d %{Tháng Một;Tháng Hai;Tháng Ba;Tháng Tư;Tháng Năm;Tháng Sáu;Tháng Bảy;Tháng Tám;Tháng Chín;Tháng Mười;Tháng Mười Một;Tháng Mười Hai}m năm %Y %2H:%2M:%2S (UTC)';
 
// BackToTopButton default settings
var Speed = 600;
var Start = 800;
 
// Địa chỉ IP không rõ tiết lộ (RevealAnonIP)
window.RevealAnonIP = {
    permissions : ['threadmoderator', 'rollback', 'content-moderator', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper']
};
 
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // bắt chuỗi ngày xấu (catch bad date strings)
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // xác định cộng / trừ (determine plus/minus)
    if (diff < 0) {
        diff = -diff;
    }
        var tpm = ' ';
 
    // tính toán khác (calcuate the diff)
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
 
    // một hàm setInterval() là hiệu quả hơn, nhưng gọi là setTimeout() (a setInterval() is more efficient, but calling setTimeout())
    // làm cho lỗi phá vỡ kịch bản chứ không phải là nguyền lại vô hạn (makes errors break the script rather than infinitely recurse)
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
$(function checktimers() {
    //ẩn "không đếm ngược" và hiện 'đếm ngược' (hide 'nocountdown' and show 'countdown')
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';
 
    //thiết lập đối tượng tính giờ và hết giờ toàn cầu. (set up global objects timers and timeouts.)
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});
 
/* Thay thế {{USERNAME}} với tên của người dùng duyệt trang. (Replaces {{USERNAME}} with the name of the user browsing the page.)
   Yêu cầu sao chép Template:USERNAME. (Requires copying Template:USERNAME.) */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* Kết thúc {{USERNAME}} thủ tục thay thế */
 
/* Nhập khẩu không ảnh hưởng đến Oasis Skin (Chỉ monobook skins) */
$(function () {
    if (skin === 'oasis' || skin === 'wikia' ) {
        /* Không có gì để nhập */}
    else {
    importArticles({
    type: 'script',
    articles: [
        'u:dev:UTCClock/code.js',
        'u:dev:DisplayTimer/code.js',
        'u:dev:LastEdited/code.js'
    ]
});
    }
});