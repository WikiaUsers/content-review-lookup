/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/***** JS tại đây có hiệu lực trong toàn bộ giao diện. *****/

// Hiện IP thay vì "A wikia contributor"
window.RevealAnonIP = {
    permissions : ['user']
};

// Tin nhắn tới thành viên bị cấm
var MessageBlock = {
  title : 'Thông báo vi phạm',
  message : 'Bạn đã bị cấm $2 với lý do $1',
  autocheck : true
};

//Thêm mã ngoài
importArticles({
    type: "script",
    articles: [
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:Tooltips/code.js',
        'u:dev:MessageBlock/code.js',
        'MediaWiki:SidebarBox.js',
        'MediaWiki:Hide.js',
    ]
}, {
    type: "style",
    article: "MediaWiki:Customizing.css"
});

if (wgPageName == "Thành_viên:Yukari_Mythra" || wgPageName == "Tường_tin_nhắn:Yukari_Mythra" || wgPageName == "Đặc_biệt:Đóng_góp/Yukari_Mythra" || wgPageName == "Blog_thành_viên:Yukari_Mythra" ){
    importArticles({
        type: "style",
        articles: "Thành_viên:Yukari_Mythra/user.css"
    });
}