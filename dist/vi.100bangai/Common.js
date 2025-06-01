/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */ 

// Trick từ Wiki Lớp Học Mật Ngữ
//
// xem [[phorge:T12267]] trên Miraheze
//
// Nạp thủ công thông điệp giao diện ở một số chỗ mà bọn FANDOOM đ cho dịch
//

if (document.documentElement.lang == "vi") {
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
    });
}

// Card
document.querySelectorAll('.snxyz-sisters').forEach(function(card) {
  const link = card.querySelector('.s-icon a');
  if (link) {
    card.addEventListener('click', function() {
      window.open(link.href, '_blank');
    });
  }
});