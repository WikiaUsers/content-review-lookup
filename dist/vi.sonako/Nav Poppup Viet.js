window.popupOnEditSelection = false;
window.popupStructure = 'menus';
window.popupAdminLinks = true;
window.popupDelay = 0.5;
window.popupImageSize = 150;
window.popupImageSizeLarge = 150;

//<pre><nowiki>
//////////////////////////////////////////////////
// Các chuỗi dùng để dịch sang tiếng Việt
//////////////////////////////////////////////////
//
// Xem hướng dẫn tại
// http://en.wikipedia.org/wiki/Wikipedia:Tools/Navigation_popups/Translation

popupStrings = {
  /////////////////////////////////////
  // dữ liệu tóm tắt, tìm kiếm,...
  /////////////////////////////////////
  'article': 'bài viết',
  'category': 'thể loại',
  'categories': 'thể loại',
  'image': 'tập tin',
  'images': 'tập tin',
  'stub': 'sơ khai',
  'section stub': 'đề mục sơ khai',
  'Empty page': 'Trang trắng',
  'kB': 'kB',
  'bytes': 'byte',
  'day': 'ngày',
  'days': 'ngày',
  'hour': 'giờ',
  'hours': 'giờ',
  'minute': 'phút',
  'minutes': 'phút',
  'second': 'giây',
  'seconds': 'giây',
  'week': 'tuần',
  'weeks': 'tuần',
  'search': 'tìm kiếm',
  'SearchHint': 'Tìm các bài viết Wikipedia tiếng Việt có chứa %s',
  'web': 'web',
  'global': 'toàn Wiki',
  'globalSearchHint': 'Tìm %s qua các Wikipedia ngôn ngữ khác',
  'googleSearchHint': 'Google cho %s',
  'more...': 'thêm...',
  /////////////////////////////////////
  // các tác vụ và thông tin liên quan đến bài viết
  // (một số tác vụ cũng dùng cho trang thành viên)
  /////////////////////////////////////
  'actions': 'tác vụ',         ///// view articles and view talk
  'popupsMenu': 'popups',
  'togglePreviewsHint': 'Bật tắt xem trước trong popups tại trang này.',
  'enable previews': 'bật xem trước',
  'disable previews': 'tắt xem trước',
  'toggle previews': 'bật tắt xem trước',
  'show preview': 'hiện xem trước',
  'reset': 'tái tạo',
  'disable': 'tắt popups',
  'disablePopupsHint': 'Tắt popups tại trang này. Tải lại trang để tái kích hoạt.',
  'historyfeedHint': 'Tin RSS các thay đổi gần đây của trang này',
  'purgePopupsHint': 'Tái tạo popups, xóa tất cả các dữ liệu popup đã lưu vào bộ đệm.',
  'PopupsHint': 'Tái tạo popups, xóa tất cả các dữ liệu popup đã lưu vào bộ đệm.',
  'spacebar': 'khoảng trắng',
  'view': 'xem',
  'view article': 'xem bài viết',
  'viewHint': 'Đi đến %s',
  'talk': 'thảo luận',
  'talk page': 'trang thảo luận',
  'this&nbsp;revision': 'phiên&nbsp;bản&nbsp;này',
  'revision %s of %s': 'phiên bản %s của %s',
  'Revision %s of %s': 'Phiên bản %s của %s',
  'the revision prior to revision %s of %s': 'phiên bản trước phiên bản %s của %s',
  'Toggle image size': 'Nhấn để đổi kích thước hình',
  'del': 'xóa',                 ///// delete, protect, move
  'delete': 'xóa',
  'deleteHint': 'Xóa %s',
  'undeleteShort': 'phục hồi',
  'UndeleteHint': 'Xem lịch sử xóa của %s',
  'protect': 'khóa',
  'protectHint': 'Thay quyền sửa đổi %s',
  'unprotectShort': 'mở',
  'unprotectHint': 'Cho phép mọi người sửa %s lại',
  'move': 'di chuyển',
  'move page': 'di chuyển trang',
  'MovepageHint': 'Đổi tựa đề của %s',
  'edit': 'sửa',               ///// edit articles and talk
  'edit article': 'sửa bài viết',
  'editHint': 'Thay đổi nội dung của %s',
  'edit talk': 'sửa thảo luận',
  'new': 'mới',
  'new topic': 'chủ đề mới',
  'newSectionHint': 'Bắt đầu một đề mục mới tại %s',
  'null edit': 'sửa đổi trống',
  'nullEditHint': 'Lưu sửa đổi tại %s, không thay đổi ',
  'hist': 'sử',               ///// history, diffs, editors, related
  'history': 'lịch sử',
  'historyHint': 'Liệt kê các thay đổi tại %s',
  'last': 'cuối',
  'lastEdit': 'sửa cuối',
  'mark patrolled': 'đánh dấu tuần tra',
  'markpatrolledHint': 'Đánh dấu đã tuần tra sửa đổi này',
  'show last edit': 'lần sửa gần nhất',
  'Show the last edit': 'Xem khác biệt do lần sửa gần nhất',
  'lastContrib': 'đóng góp cuối',
  'last set of edits': 'sửa đổi mới nhất',
  'lastContribHint': 'Xem khác biệt do người sửa cuối thực hiện',
  'cur': 'hiện',
  'diffCur': 'khác hiện nay',
  'Show changes since revision %s': 'Xem những thay đổi từ phiên bản %s',
  '%s old': 'cách đây %s', // as in 4 weeks old
  'oldEdit': 'sửa đổi cũ',
  'purge': 'làm mới',
  'purgeHint': 'Tải lại một bản mới của %s',
  'raw': 'mã nguồn',
  'rawHint': 'Tải mã nguồn của %s',
  'render': 'đơn giản',
  'renderHint': 'Xem bản HTML đơn giản của %s',
  'Show the edit made to get revision': 'Hiển thị sửa đổi đã thực hiện để có phiên bản',
  'sinceMe': 'kể từ tôi',
  'changes since mine': 'khác với sửa đổi của tôi',
  'sinceMeHint': 'Hiển thị thay đổi từ sửa đổi cuối của tôi',
  'Couldn\'t find an edit by %s\nin the last %s edits to\n%s': 'Không thể tìm thấy sửa đổi của %s\ntrong %s sửa đổi cuối của\n%s',
  'eds': 'biên tập viên',
  'editors': 'biên tập viên',
  'editorListHint': 'Danh sách thành viên sửa bài %s',
  'related': 'liên quan',
  'relatedChanges': 'sửa đổi liên quan',
  'related changes': 'sửa đổi liên quan',
  'RecentchangeslinkedHint': 'Hiển thị các thay đổi trong bài viết liên quan đến %s',
  'editOld': 'sửa bản cũ',          ///// edit old version, or revert
  'rv': 'lùi',
  'revert': 'lùi lại',
  'revertHint': 'Lùi lại %s',
  'defaultpopupRedlinkSummary': 'Bỏ liên kết đến trang trắng [[%s]] dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupFixDabsSummary': 'Phân biệt rõ [[%s]] thành [[%s]] dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupFixRedirsSummary': 'Chuyển hướng từ [[%s]] sang [[%s]] dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupExtendedRevertSummary': 'Lùi đến phiên bản lúc %s của %s, mã cũ %s dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupRevertToPreviousSummary': 'Lùi đến phiên bản trước phiên bản %s dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupRevertSummary': 'Lùi đến phiên bản %s dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupQueriedRevertToPreviousSummary': 'Lùi đến phiên bản trước phiên bản $1 lúc $2 của $3 dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupQueriedRevertSummary': 'Lùi đến phiên bản $1 lúc $2 của $3 dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'defaultpopupRmDabLinkSummary': 'Bỏ liên kết đến trang định hướng [[%s]] dùng [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
  'Redirects': 'Chuyển hướng', // as in Redirects to ...
  ' to ': ' đến ',           // as in Redirects to ...
  'Bypass redirect': 'Vòng qua chuyển hướng',
  'Fix this redirect': 'Sửa chuyển hướng này',
  'disambig': 'trang định hướng',          ///// add or remove dab etc.
  'disambigHint': 'Làm rõ liên kết này thành [[%s]]',
  'Click to disambiguate this link to:': 'Nhấn để làm rõ liên kết này đến:',
  'remove this link': 'bỏ liên kết này',
  'remove all links to this page from this article': 'bỏ tất cả các liên kết đến trang này ra khỏi bài viết',
  'remove all links to this disambig page from this article': 'bỏ tất cả các liên kết đến trang định hướng này ra khỏi bài viết',
  'mainlink': 'liên kết chính',          ///// links, watch, unwatch
  'wikiLink': 'liên kết wiki',
  'wikiLinks': 'liên kết wiki',
  'links here': 'liên kết đến đây',
  'whatLinksHere': 'liên kết đến đây',
  'what links here': 'trang liên kết đến đây',
  'WhatlinkshereHint': 'Liệt kê các trang được liên kết đến %s',
  'unwatchShort': 'bỏ',
  'watchThingy': 'theo dõi',  // called watchThingy because {}.watch is a function
  'watchHint': 'Thêm %s vào danh sách theo dõi',
  'unwatchHint': 'Bỏ %s ra khỏi danh sách theo dõi',
  'Only found one editor: %s made %s edits': 'Chỉ tìm thấy một người sửa: %s đã thực hiện %s sửa đổi',
  '%s seems to be the last editor to the page %s': '%s dường như là người sửa cuối ở trang %s',
  'rss': 'rss',
  /////////////////////////////////////
  // diff previews
  /////////////////////////////////////
  'Diff truncated for performance reasons': 'Khác biệt bị cắt để giữ hiệu quả',
  'Old revision': 'Bản cũ',
  'New revision': 'Bản mới',
  'Something went wrong :-(': 'Có gì đó đã sai :-(',
  'Empty revision, maybe non-existent': 'Phiên bản trống, có thể không tồn tại',
  'Unknown date': 'Không rõ ngày',
  /////////////////////////////////////
  // other special previews
  /////////////////////////////////////
  'Empty category': 'Thể loại trống',
  'Category members (%s shown)': 'Thành viên thể loại (hiển thị %s)',
  'No image links found': 'Không thấy liên kết hình',
  'File links': 'Liên kết tập tin',
  'not commons': 'Không có tập tin với tên này ở Wikimedia Commons.',
  'commons only': 'Tập tin này từ Wikimedia Commons.',
  'No image found': 'Không thấy hình',
  'commons dupe': 'Dường như ở Wikimedia Commons có tập tin trùng.',
  'commons conflict': 'Một tập tin khác cũng với tên này đã có ở Wikimedia Commons.',
  /////////////////////////////////////
  // user-related actions and info
  /////////////////////////////////////
  'user': 'thành viên',               ///// user page, talk, email, space
  'user&nbsp;page': 'trang&nbsp;thành&nbsp;viên',
  'user talk': 'thảo luận thành viên',
  'edit user talk': 'sửa thảo luận thành viên',
  'leave comment': 'để lại lời nhắn',
  'email': 'email',
  'email user': 'email cho thành viên',
  'EmailuserHint': 'Gửi email cho %s',
  'space': 'không gian', // short form for userSpace link
  'PrefixIndexHint': 'Xem các trang trong không gian thành viên %s',
  'count': 'đếm',             ///// contributions, tree, log
  'edit counter': 'đếm sửa đổi',
  'katelinkHint': 'Đếm đóng góp của %s',
  'contribs': 'đóng góp',
  'contributions': 'đóng góp',
  'Contributions': 'Đóng góp',
  'deletedContribs': 'đóng góp đã xóa',
  'DeletedcontributionsHint': 'Liệt kê các sửa đổi đã bị xóa của %s',
  'ContributionsHint': 'Liệt kê các đóng góp của %s',
  'tree': 'cây',
  'contribsTreeHint': 'Xem các đóng góp của %s theo không gian tên và theo bài',
  'log': 'nhật trình',
  'user log': 'nhật trình thành viên',
  'userLogHint': 'Xem nhật trình của %s',
  'arin': 'tra ARIN',             ///// ARIN lookup, block user or IP
  'Look up %s in ARIN whois database': 'Tra %s trong dữ liệu whois ARIN',
  'unblockShort': 'bỏ',
  'block': 'cấm',
  'block user': 'cấm thành viên',
  'IpblocklistHint': 'Bỏ cấm %s',
  'BlockipHint': 'Không cho %s sửa đổi',
  'block log': 'nhật trình cấm',
  'blockLogHint': 'Xem nhật trình cấm đối với %s',
  'protectLogHint': 'Xem nhật trình khóa đối với %s',
  'pageLogHint': 'Xem nhật trình tạo trang đối với %s',
  'deleteLogHint': 'Xem nhật trình xóa đối với %s',
  'Invalid %s %s': 'Tùy chọn %s không đúng: %s',
  'No backlinks found': 'Không tìm thấy liên kết lùi',
  ' and more': ' và còn thêm',
  'undo': 'hủy sửa đổi',
  'undoHint': 'hủy sửa đổi này',
  'Download preview data': 'Tải dữ liệu xem thử',
  'Invalid or IP user': 'Thành viên IP hoặc không hợp lệ',
  'Not a registered username': 'Tên thành viên chưa đăng ký',
  'BLOCKED': 'CẤM',
  ' edits since: ': ' sửa đổi từ: ',

  /////////////////////////////////////
  // Autoediting
  /////////////////////////////////////
  'Enter a non-empty edit summary or press cancel to abort': 'Nhập vào một tóm tắt sửa đổi không rỗng hoặc nhấn cancel để hủy',
  'Failed to get revision information, please edit manually.\n\n': 'Không thể lấy thông tin phiên bản, xin hãy tự sửa bằng tay.\n\n',
  'The %s button has been automatically clicked. Please wait for the next page to load.': 'Nút %s đã được tự động nhấn. Xin đợi tải trang kế.',
  'Could not find button %s. Please check the settings in your javascript file.': 'Không tìm thấy nút %s. Hãy kiểm tra thiết lập trong tập tin JavaScript.',
  /////////////////////////////////////
  // Popups setup
  /////////////////////////////////////
  'Open full-size image': 'Mở hình đầy đủ',
  'zxy': 'zxy'
};
//</nowiki></pre>