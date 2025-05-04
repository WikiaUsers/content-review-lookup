/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */ 

/* Trick từ Wiki Lớp Học Mật Ngữ
 * 
 * xem [[phorge:T12267]] trên Miraheze
 *
 * Nạp thủ công thông điệp giao diện ở một số chỗ mà bọn FANDOOM đ cho dịch
 */
if (document.documentElement.lang !== "qqx") {
    mw.messages.set({
    	/* Hồ sơ - userprofile */
        "userprofile-userprofilenavigation-link-about": "Hồ sơ",
        "userprofile-userprofilenavigation-link-message-wall": "Tường tin nhắn",
        "userprofile-userprofilenavigation-link-contributions": "Đóng góp",
        "userprofile-userprofilenavigation-link-activity": "Hoạt động",
        "userprofile-useridentitystats-number-of-edits": "$1 Sửa đổi",
        "userprofile-useridentitystats-number-of-posts": "$1 Bài đăng",
        "userprofile-useridentityheader-aka-label": "hay còn gọi là <b>$1</b>",
        "userprofile-useridentityheader-edit-profile-label": "Sửa hồ sơ",
        /* UCX */
        "page-footer-languages-header": "Ngôn ngữ khác",
        "license-description": "Nội dung trên trang này có sẵn dưới giấy phép $1, trừ khi có ghi chú khác.",
        "fd-community-header-explore": "Khám phá",
        "fd-community-header-pages": "$1 Bài viết",
        "fd-global-navigation-user-sign-out":"Đăng xuất",
        "fd-global-navigation-user-my-preferences": "Tuỳ chọn cá nhân",
        "fd-global-navigation-user-message-wall": "Tường tin nhắn",
        "fd-global-navigation-user-view-profile": "Hồ sơ",
        "fd-community-header-add-new-page": "Tạo trang mới",
        "fd-community-header-upload-new-file": "Tải lên tập tin",
        "fd-community-header-admin-dashboard": "Bảng điều khiển",
        "fd-community-header-special-pages": "Trang đặc biệt",
        "fd-community-header-analytics": "Số liệu",
        "fd-community-header-theme-designer": "Thiết kế chủ đề",
    });
}