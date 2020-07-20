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
        'u:kancolle:User:CDRW/js/Popups.js',
        'MediaWiki:SidebarBox.js',
        'MediaWiki:Hide.js',
        'MediaWiki:TwitterWidget.js',
    ]
}, {
    type: "style",
    article: "MediaWiki:Customizing.css"
});
importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');
//
if (wgPageName == "Thành_viên:Yami_no_Kage" || wgPageName == "Tường_tin_nhắn:Yami_no_Kage" || wgPageName == "Đặc_biệt:Đóng_góp/Yami_no_Kage" || wgPageName == "Blog_thành_viên:Yami_no_Kage" ) {
    importArticles({
        type: "script",
        articles: "Thành_viên:Yami_no_Kage/user.js"
    }, {
        type: "style",
        article: "Thành_viên:Yami_no_Kage/user.css"
    });
}

if (wgPageName == "Thành_viên:Yukari_Mythra" || wgPageName == "Tường_tin_nhắn:Yukari_Mythra" || wgPageName == "Đặc_biệt:Đóng_góp/Yukari_Mythra" || wgPageName == "Blog_thành_viên:Yukari_Mythra" ){
    importArticles({
        type: "style",
        articles: "Thành_viên:Yukari_Mythra/user.css"
    });
}

if (wgPageName == "Thành_viên:Hikoujou" || wgPageName == "Tường_tin_nhắn:Hikoujou" || wgPageName == "Đặc_biệt:Đóng_góp/Hikoujou" || wgPageName == "Blog_thành_viên:Hikoujou" ){
    importArticles({
        type: "style",
        articles: "Thành_viên:Hikoujou/user.css"
    });
}

// Cài đặt bộ gõ [[Wikipedia:Gõ tiếng Việt|AVIM]] từ Wikipedia tiếng Việt
// Sửa đổi để chạy trên Wikia bởi Dai ca superman (sonako wikia)
if ((mediaWiki.config.get('wgPageName') !== 'Mainpage') && (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 14 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1202 || mediaWiki.config.get('wgNamespaceNumber') === 1200 || mediaWiki.config.get('wgNamespaceNumber') === 1201 || mediaWiki.config.get('wgNamespaceNumber') === 2000)) {
    impart('MediaWiki:AVIM.js');
    impart('MediaWiki:AVIM_portlet.js');
}