/*
	allow a category navigation based on a list of categories (instead of the usual single category navigation)
*/


$(function() {
    /* ================================== *\
    	# wiki links to [[Special:CatNav]]
    \* ================================== */

     $("#my-tools-menu").append('<li><a target="_blank" href="/wiki/Special:CatNav">Tìm Kiếm Nâng Cao</a></li>');


    /* ================================== *\
    	# core objects
    \* ================================== */
    var catnav = {
        fn: {},
        settings: {
            rows: 3, // default number of rows
            itemsInNavigator: Math.floor(($("#mw-content-text").width() - 100) / 154) // number of columns determined by the width of the user's screen
        }
    };

    /* ================================== *\
    	# data
    \* ================================== */

    /* regular data */
    catnav.data = {
        details: {}, // details about pages
        pageids: {}, // pageids by titles
        current: [],
        selectedPage: null,
        storage: {
            url: "https://sonako.fandom.com/vi", // url to the wiki that hosts your imports
            scriptPath: "" // e.g. "/w" for wikipedia, empty string for wikia
        },
        markup: {
            html: null,
            css: null
        },
        _g: window.CatNav // global modifiers
    };

    /* html */
    catnav.data.markup.html = '<nav id="catnav">\n' +
        '\t<p>\n' +
        '\t\tTrang này cho phép bạn lọc bỏ và chỉ tìm những trang từ các thể loại bạn muốn. Nhập thể loại bạn muốn lọc vào ô tìm kiếm ở phía dưới, mỗi thể loại một dòng rồi nhấn nút Tìm kiếm ở phía dưới để lấy danh sách các trang:\n' +
        '\t</p>\n' +
        // categories' input
        '\t<div class="catnav-gui-group">\n' +
        '\t\t<div class="catnav-commoncats">\n' +
        '\t\t\t<h3>\n' +
        '\t\t\t\tThể loại ưa thích' +
        '&nbsp;<input title="Click để thêm thể loại ưa thích." type="button" class="wikia-button" value="+" id="catnav-commoncats-add" />\n' +
        '\t\t\t</h3>\n' +
        '\t\t\t<h4>\n' +
        '\t\t\t\tĐể không mất công tạo lại danh sách yêu thích trên nhiều thiết bị, bạn hãy tạo trang Lưu thể loại yêu thích <b>(yêu cầu phải đăng nhập trên Sonako)</b>: <a target="_blank" title="Với những bạn chưa tạo trang lưu (kèm hướng dẫn)." href="/wiki/Special:MyPage/catnav.css?action=edit&preload=Template:CatNav">Click tại đây (dành cho tạo mới)</a> hoặc <a target="_blank" title="Với những ai đã tạo trang lưu trước đó." href="/wiki/Special:MyPage/catnav.css?action=edit">Click tại đây để chinh sửa</a>' +
        '\t\t\t</h4>\n' +
        '\t\t\t<h4>\n' +
        '\t\t\t\tNhập/Xuất dữ liệu thể loại yêu thích từ trang <a target="_blank" title="Trang lưu dữ liệu thể loại ưu thích." href="/wiki/Special:MyPage/catnav.css">Lưu cài đặt: </a>' +
        '&nbsp;<input title="Click để nhập dữ liệu." type="button" class="wikia-button catnav-commoncats-global" value="Nhập" id="catnav-commoncats-global-import" />\n' +
        '&nbsp;<input title="Click để xuất dữ liệu." type="button" class="wikia-button catnav-commoncats-global" value="Xuất" id="catnav-commoncats-global-export" />\n' +
        '\t\t\t</h4>\n' +
        '\t\t\t<div id="catnav-commoncats-wrapper">\n' +
        '\t\t\t\tClick chuột trái để chèn vào ô thể loại muốn tìm và Click chuột phải để thêm vào ô thể loại muốn loại trừ. Click vào biểu tượng xóa sẽ xóa tên những thể loại bạn đã thêm vào mục ưa thích của mình.' +
        '\t\t\t\t<div id="catnav-commoncats-container">\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t</div>\n' +
        '\t\t</div>\n' +
        '\t\t<table><tbody>\n' +
        '\t\t\t<tr>\n' +
        '\t\t\t<th>Tìm trang từ thể loại:\n' +
        '\t\t\t<select id="catnav-dropdown-include">\n' +
        '\t\t\t\t<option selected="true" disabled="disabled">(Chọn Thể Loại)</option>\n' +
        '\t\t\t\t<option disabled="disabled">Thể Loại Truyện</option>\n' +
        '\t\t\t\t<option value="Action" title="Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh.">Action</option>\n' +
        '\t\t\t\t<option value="Adult" title="Thể loại truyện 18+ với các cảnh chém giết máu me hay tình dục ở mức độ cao.">Adult</option>\n' +
        '\t\t\t\t<option value="Adventure" title="Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật.">Adventure</option>\n' +
        '\t\t\t\t<option value="Comedy" title="Thể loại có nội dung trong sáng và cảm động có các tình tiết gây cười, có các xung đột nhẹ nhàng nhưng tạo được tiếng cười nơi độc giả, vài bộ còn mang chất bựa rất cao.">Comedy</option>\n' +
        '\t\t\t\t<option value="Drama" title="Thể loại mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn.">Drama</option>\n' +
        '\t\t\t\t<option value="Ecchi" title="Thể loại thường có những cảnh hở hang để gây cười, dụ khán giả, không có cảnh quan hệ tình dục (sex) như hentai.">Ecchi</option>\n' +
        '\t\t\t\t<option value="Fantasy" title="Thể loại xuất phát từ trí tưởng tượng phong phú, từ pháp thuật đến thế giới trong mơ thậm chí là những câu chuyện thần tiên.">Fantasy</option>\n' +
        '\t\t\t\t<option value="Game" title="Thể loại liên quan đến game, cốt truyện thường chủ yếu xoay quanh việc các nhân vật hóa thân thành các nhân vật trong game và các hoạt động của họp trong game.">Game</option>\n' +
        '\t\t\t\t<option value="Gender Bender" title="Thể loại truyện thường có các nhân vật thay đổi giới tính.">Gender Bender</option>\n' +
        '\t\t\t\t<option value="Harem" title="Thể loại truyện tập trung vào nhân vật chính được, thường là tình yêu, gắn kết với từ ba hoặc nhiều hơn nhân vật khác giới. Dạng phổ biến nhất của harem là một nhân vật nam chính và một nhóm nhân vật nữ.">Harem</option>\n' +
        '\t\t\t\t<option value="Historical" title="Thể loại có liên quan đến thời xa xưa.">Historical</option>\n' +
        '\t\t\t\t<option value="Horror" title="Horror = rùng rợn, nghe cái tên là bạn đã hiểu thể loại này có nội dung thế nào. Nó làm cho bạn kinh hãi, khiếp sợ, ghê tởm, run rẩy, có thể gây sốc - một thể loại không dành cho người yếu tim.">Horror</option>\n' +
        '\t\t\t\t<option value="Martial Arts" title="Giống với tên gọi, bất cứ gì liên quan đến võ thuật trong truyện.">Martial Arts</option>\n' +
        '\t\t\t\t<option value="Mature" title="Thể loại dành cho lứa tuổi 17+ bao gồm các pha bạo lực, máu me, chém giết, tình dục ở mức độ vừa.">Mature</option>\n' +
        '\t\t\t\t<option value="Mecha" title="Thể loại có liên quan đến các phương tiện cơ giới hay các người máy chuyển động bằng các chân cơ học thay vì bằng bánh xe hay các cơ chế khác.">Mecha</option>\n' +
        '\t\t\t\t<option value="Mystery" title="Thể loại thường xuất hiện những điều bí ấn không thể lí giải được và sau đó là những nỗ lực của nhân vật chính nhằm tìm ra câu trả lời thỏa đáng.">Mystery</option>\n' +
        '\t\t\t\t<option value="Psychological" title="Thể loại liên quan đến những vấn đề về tâm lý của nhân vật (tâm thần bất ổn, điên cuồng ...).">Psychological</option>\n' +
        '\t\t\t\t<option value="Romance" title="Thường là những câu chuyện về tình yêu. Ở đây chúng ta sẽ lấy ví dụ như tình yêu giữa một người con trai và con gái, bên cạnh đó đặc điểm thể loại này là kích thích trí tưởng tượng của bạn về tình yêu.">Romance</option>\n' +
        '\t\t\t\t<option value="School Life" title="Trong thể loại này, ngữ cảnh diễn biến câu chuyện chủ yếu ở trường học.">School Life</option>\n' +
        '\t\t\t\t<option value="Sci-fi" title="Những chuyện khoa học viễn tưởng, đa phần chúng xoay quanh nhiều hiện tượng mà liên quan tới khoa học, công nghệ, tuy vậy thường thì những câu chuyện đó không gắn bó chặt chẽ với các thành tựu khoa học hiện thời, mà là do con người tưởng tượng ra.">Sci-fi</option>\n' +
        '\t\t\t\t<option value="Seinen" title="Seinen là một thể loại thường nhằm vào những đối tượng nam 18 đến 30 tuổi, nhưng người xem có thể lớn tuổi hơn, với một vài bộ truyện nhắm đến các doanh nhân nam quá 40.">Seinen</option>\n' +
        '\t\t\t\t<option value="Shotacon" title="Truyện miêu tả mối quan hệ tình cảm trong đó có một hoặc cả hai đều là bé trai chưa đủ tuổi trưởng thành.">Shotacon</option>\n' +
        '\t\t\t\t<option value="Shoujo" title="Đối tượng hướng tới của thể loại này là phái nữ. Nội dung thường liên quan đến tình cảm lãng mạn, chú trọng đầu tư cho nhân vật (tính cách,...).">Shoujo</option>\n' +
        '\t\t\t\t<option value="Shounen" title="Shounen là thể loại dành cho nam thiếu niên (từ độ tuổi 10 đến 18, thường có nhiều pha hành động, đánh nhau nhưng chưa đến mức độ quá bạo lực.">Shounen</option>\n' +
        '\t\t\t\t<option value="Slice of life" title="Nói về cuộc sống đời thường. ">Slice of life</option>\n' +
        '\t\t\t\t<option value="Supernatural" title="Thể loại truyện có những tình tiết thể hiện những sức mạnh đáng kinh ngạc (siêu nhiên) và không thể giải thích được, chúng thường đi kèm với những sự kiện trái ngược hoặc thách thức với những định luật vật lý.">Supernatural</option>\n' +
        '\t\t\t\t<option value="Tragedy" title="Thể loại chứa đựng những sự kiện mà dẫn đến kết cục là những mất mát đau khổ hay sự rủi ro to lớn.">Tragedy</option>\n' +
        '\t\t\t\t<option disabled="disabled">Tình Trạng Project</option>\n' +
        '\t\t\t\t<option value="Active Projects" title="Các Project được xếp vào mục này là những bộ đang được thực hiện đều đặn, có lần cập nhật cuối cùng nằm trong vòng 3 tháng trở lại. Bạn đọc (tạm thời) có thể yên tâm mà theo dõi tiếp :v.">Active Projects</option>\n' +
        '\t\t\t\t<option value="Idle Projects" title="Tập hợp các Project trên Sonako đã không được cập nhật trong 3 tháng qua.">Idle Projects</option>\n' +
        '\t\t\t\t<option value="Stalled Projects" title="Tập hợp các Project trên Sonako đã không được cập nhật trong 6 tháng qua.">Stalled Projects</option>\n' +
        '\t\t\t\t<option value="Inactive Projects" title="Tập hợp các Project trên Sonako đã không được cập nhật trong hơn 12 tháng qua.">Inactive Projects</option>\n' +
        '\t\t\t\t<option value="Hoàn thành" title="Nơi tập hợp các bộ đã được dịch hoàn chỉnh ra tiếng Việt (tức là bộ LN gốc cũng đã kết thúc, chứ không tính trường hợp Project tiếng Việt đuổi kịp tiến độ của bản gốc tiếng Nhật). Thích hợp cho những bạn không muốn đang vui thì đứt dây đàn, nhưng lưu ý là đa phần đều là các bộ one-shot (1 vol) thôi nhé.">Hoàn thành</option>\n' +
        '\t\t\t\t<option value="Teaser" title="Tập hợp các bộ không đạt chuẩn điều kiện để lên project chính thức (những bộ bạn không thấy có trong các tab ở ngoài Trang Chủ thì sẽ có ở đây).">Teaser</option>\n' +
        '\t\t\t\t<option disabled="disabled">Thể Loại Khác</option>\n' +
        '\t\t\t\t<option value="Original Light Novel" title="Tập hợp các tác phẩm được viết bởi các tác giả Việt không chuyên.">Original Light Novel</option>\n' +
        '\t\t\t\t<option value="Spoiler" title="Tập hợp các trang có thể tiết lộ trước nội dung cho người đọc.">Spoiler</option>\n' +
        '\t\t\t\t<option value="Mature content" title="Tập hợp các trang có thể có nội dung nhạy cảm.">Mature content</option>\n' +
        '\t\t\t\t<option value="Full Text" title="Tập hợp các trang Toàn tập (dịch/viết trọn vẹn 1 tập) của các bộ Light Novel trên Sonako.">Full Text</option>\n' +
        '\t\t\t\t<option value="Minh họa" title="Tập hợp các trang minh họa trên Sonako Light Novel Wiki.">Minh họa</option>\n' +
        '\t\t</select>\n' +
        '\t\t\t<button title="Click để xóa các thể loại đã chèn trong khung (Tìm trang từ thể loại)." id="catnav-clear-include" type="button">Xóa\n' +
        '\t\t\t</button>\n' +
        '\t\t\t</th>\n' +
        '\t\t\t<th>Loại trừ trang từ thể loại:\n' +
        '\t\t\t<select id="catnav-dropdown-exclude">\n' +
        '\t\t\t\t<option selected="true" disabled="disabled">(Chọn Thể Loại)</option>\n' +
        '\t\t\t\t<option disabled="disabled">Thể Loại Truyện</option>\n' +
        '\t\t\t\t<option value="Action" title="Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh.">Action</option>\n' +
        '\t\t\t\t<option value="Adult" title="Thể loại truyện 18+ với các cảnh chém giết máu me hay tình dục ở mức độ cao.">Adult</option>\n' +
        '\t\t\t\t<option value="Adventure" title="Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật.">Adventure</option>\n' +
        '\t\t\t\t<option value="Comedy" title="Thể loại có nội dung trong sáng và cảm động có các tình tiết gây cười, có các xung đột nhẹ nhàng nhưng tạo được tiếng cười nơi độc giả, vài bộ còn mang chất bựa rất cao.">Comedy</option>\n' +
        '\t\t\t\t<option value="Drama" title="Thể loại mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn.">Drama</option>\n' +
        '\t\t\t\t<option value="Ecchi" title="Thể loại thường có những cảnh hở hang để gây cười, dụ khán giả, không có cảnh quan hệ tình dục (sex) như hentai.">Ecchi</option>\n' +
        '\t\t\t\t<option value="Fantasy" title="Thể loại xuất phát từ trí tưởng tượng phong phú, từ pháp thuật đến thế giới trong mơ thậm chí là những câu chuyện thần tiên.">Fantasy</option>\n' +
        '\t\t\t\t<option value="Game" title="Thể loại liên quan đến game, cốt truyện thường chủ yếu xoay quanh việc các nhân vật hóa thân thành các nhân vật trong game và các hoạt động của họp trong game.">Game</option>\n' +
        '\t\t\t\t<option value="Gender Bender" title="Thể loại truyện thường có các nhân vật thay đổi giới tính.">Gender Bender</option>\n' +
        '\t\t\t\t<option value="Harem" title="Thể loại truyện tập trung vào nhân vật chính được, thường là tình yêu, gắn kết với từ ba hoặc nhiều hơn nhân vật khác giới. Dạng phổ biến nhất của harem là một nhân vật nam chính và một nhóm nhân vật nữ.">Harem</option>\n' +
        '\t\t\t\t<option value="Historical" title="Thể loại có liên quan đến thời xa xưa.">Historical</option>\n' +
        '\t\t\t\t<option value="Horror" title="Horror = rùng rợn, nghe cái tên là bạn đã hiểu thể loại này có nội dung thế nào. Nó làm cho bạn kinh hãi, khiếp sợ, ghê tởm, run rẩy, có thể gây sốc - một thể loại không dành cho người yếu tim.">Horror</option>\n' +
        '\t\t\t\t<option value="Martial Arts" title="Giống với tên gọi, bất cứ gì liên quan đến võ thuật trong truyện.">Martial Arts</option>\n' +
        '\t\t\t\t<option value="Mature" title="Thể loại dành cho lứa tuổi 17+ bao gồm các pha bạo lực, máu me, chém giết, tình dục ở mức độ vừa.">Mature</option>\n' +
        '\t\t\t\t<option value="Mecha" title="Thể loại có liên quan đến các phương tiện cơ giới hay các người máy chuyển động bằng các chân cơ học thay vì bằng bánh xe hay các cơ chế khác.">Mecha</option>\n' +
        '\t\t\t\t<option value="Mystery" title="Thể loại thường xuất hiện những điều bí ấn không thể lí giải được và sau đó là những nỗ lực của nhân vật chính nhằm tìm ra câu trả lời thỏa đáng.">Mystery</option>\n' +
        '\t\t\t\t<option value="Psychological" title="Thể loại liên quan đến những vấn đề về tâm lý của nhân vật (tâm thần bất ổn, điên cuồng ...).">Psychological</option>\n' +
        '\t\t\t\t<option value="Romance" title="Thường là những câu chuyện về tình yêu. Ở đây chúng ta sẽ lấy ví dụ như tình yêu giữa một người con trai và con gái, bên cạnh đó đặc điểm thể loại này là kích thích trí tưởng tượng của bạn về tình yêu.">Romance</option>\n' +
        '\t\t\t\t<option value="School Life" title="Trong thể loại này, ngữ cảnh diễn biến câu chuyện chủ yếu ở trường học.">School Life</option>\n' +
        '\t\t\t\t<option value="Sci-fi" title="Những chuyện khoa học viễn tưởng, đa phần chúng xoay quanh nhiều hiện tượng mà liên quan tới khoa học, công nghệ, tuy vậy thường thì những câu chuyện đó không gắn bó chặt chẽ với các thành tựu khoa học hiện thời, mà là do con người tưởng tượng ra.">Sci-fi</option>\n' +
        '\t\t\t\t<option value="Seinen" title="Seinen là một thể loại thường nhằm vào những đối tượng nam 18 đến 30 tuổi, nhưng người xem có thể lớn tuổi hơn, với một vài bộ truyện nhắm đến các doanh nhân nam quá 40.">Seinen</option>\n' +
        '\t\t\t\t<option value="Shotacon" title="Truyện miêu tả mối quan hệ tình cảm trong đó có một hoặc cả hai đều là bé trai chưa đủ tuổi trưởng thành.">Shotacon</option>\n' +
        '\t\t\t\t<option value="Shoujo" title="Đối tượng hướng tới của thể loại này là phái nữ. Nội dung thường liên quan đến tình cảm lãng mạn, chú trọng đầu tư cho nhân vật (tính cách,...).">Shoujo</option>\n' +
        '\t\t\t\t<option value="Shounen" title="Shounen là thể loại dành cho nam thiếu niên (từ độ tuổi 10 đến 18, thường có nhiều pha hành động, đánh nhau nhưng chưa đến mức độ quá bạo lực.">Shounen</option>\n' +
        '\t\t\t\t<option value="Slice of life" title="Nói về cuộc sống đời thường. ">Slice of life</option>\n' +
        '\t\t\t\t<option value="Supernatural" title="Thể loại truyện có những tình tiết thể hiện những sức mạnh đáng kinh ngạc (siêu nhiên) và không thể giải thích được, chúng thường đi kèm với những sự kiện trái ngược hoặc thách thức với những định luật vật lý.">Supernatural</option>\n' +
        '\t\t\t\t<option value="Tragedy" title="Thể loại chứa đựng những sự kiện mà dẫn đến kết cục là những mất mát đau khổ hay sự rủi ro to lớn.">Tragedy</option>\n' +
        '\t\t\t\t<option disabled="disabled">Tình Trạng Project</option>\n' +
        '\t\t\t\t<option value="Active Projects" title="Các Project được xếp vào mục này là những bộ đang được thực hiện đều đặn, có lần cập nhật cuối cùng nằm trong vòng 3 tháng trở lại. Bạn đọc (tạm thời) có thể yên tâm mà theo dõi tiếp :v.">Active Projects</option>\n' +
        '\t\t\t\t<option value="Idle Projects" title="Tập hợp các Project trên Sonako đã không được cập nhật trong 3 tháng qua.">Idle Projects</option>\n' +
        '\t\t\t\t<option value="Stalled Projects" title="Tập hợp các Project trên Sonako đã không được cập nhật trong 6 tháng qua.">Stalled Projects</option>\n' +
        '\t\t\t\t<option value="Inactive Projects" title="Tập hợp các Project trên Sonako đã không được cập nhật trong hơn 12 tháng qua.">Inactive Projects</option>\n' +
        '\t\t\t\t<option value="Hoàn thành" title="Nơi tập hợp các bộ đã được dịch hoàn chỉnh ra tiếng Việt (tức là bộ LN gốc cũng đã kết thúc, chứ không tính trường hợp Project tiếng Việt đuổi kịp tiến độ của bản gốc tiếng Nhật). Thích hợp cho những bạn không muốn đang vui thì đứt dây đàn, nhưng lưu ý là đa phần đều là các bộ one-shot (1 vol) thôi nhé.">Hoàn thành</option>\n' +
        '\t\t\t\t<option value="Teaser" title="Tập hợp các bộ không đạt chuẩn điều kiện để lên project chính thức (những bộ bạn không thấy có trong các tab ở ngoài Trang Chủ thì sẽ có ở đây).">Teaser</option>\n' +
        '\t\t\t\t<option disabled="disabled">Thể Loại Khác</option>\n' +
        '\t\t\t\t<option value="Original Light Novel" title="Tập hợp các tác phẩm được viết bởi các tác giả Việt không chuyên.">Original Light Novel</option>\n' +
        '\t\t\t\t<option value="Spoiler" title="Tập hợp các trang có thể tiết lộ trước nội dung cho người đọc.">Spoiler</option>\n' +
        '\t\t\t\t<option value="Mature content" title="Tập hợp các trang có thể có nội dung nhạy cảm.">Mature content</option>\n' +
        '\t\t\t\t<option value="Full Text" title="Tập hợp các trang Toàn tập (dịch/viết trọn vẹn 1 tập) của các bộ Light Novel trên Sonako.">Full Text</option>\n' +
        '\t\t\t\t<option value="Minh họa" title="Tập hợp các trang minh họa trên Sonako Light Novel Wiki.">Minh họa</option>\n' +
        '\t\t</select>\n' +
        '\t\t\t<button title="Click để xóa các thể loại đã chèn trong khung (Loại trừ trang từ thể loại)." id="catnav-clear-exclude" type="button">Xóa\n' +
        '\t\t\t</button>\n' +
        '\t\t\t</th>\n' +
        '\t\t\t</tr>\n' +
        '\t\t\t<tr>\n' +
        '\t\t\t\t<td><textarea id="catnav-textarea-include"></textarea></td>\n' +
        '\t\t\t\t<td><textarea id="catnav-textarea-exclude"></textarea></td>\n' +
        '\t\t\t</tr>\n' +
        '\t\t</tbody></table>\n' +
        '\t</div>\n' +
        // settings
        '\t<div class="catnav-gui-group">\n' +
        '\t\t<p>\n' +
        '\t\t\tSố dòng hiển thị: <input type="text" id="catnav-rows" value="3" /><br />\n' +
        '\t\t\t<input type="checkbox" id="catnav-ns" checked /><label for="catnav-ns">Chỉ tìm trong trang miền chính</label><br />\n' +
        '\t\t\t<input type="radio" name="catnav-sort" id="catnav-sort-alphabet" value="alphabet" checked /><label for="catnav-sort-alphabet">Xếp theo bảng chữ cái</label><br />\n' +
        '\t\t\t<input type="radio" name="catnav-sort" id="catnav-sort-bypageid" value="bypageid" /><label for="catnav-sort-bypageid" style="border-bottom: 1px dotted; cursor: help;" title="Lưu ý! Lựa chọn này sắp xếp trang dựa theo ID thay vì thời gian tạo thực tế nhằm giảm thời gian tải. Những trang cũ nếu bị xóa khi được khôi phục trở lại sẽ được cấp một ID mới và vì thế sẽ trở thành một trang hoàn toàn mới so với thực tế đáng lẽ ra chúng chỉ là những trang cũ.">Xếp theo thời gian tạo (ID của trang)*</label><br />\n' +
        '\t\t\t<!-- <input type="radio" name="catnav-sort" id="catnav-sort-creation" value="creation" /><label for="catnav-sort-creation">Xếp theo thời gian tạo</label><br /> -->\n' +
        '\t\t\t<input type="radio" name="catnav-sort" id="catnav-sort-lastedit" value="lastedit" /><label for="catnav-sort-lastedit">Xếp theo lần sửa cuối</label><br />\n' +
        '\t\t\t<input type="radio" name="catnav-sort" id="catnav-sort-populars" value="populars" /><label for="catnav-sort-populars" style="border-bottom: 1px dotted; cursor: help;" title="Lưu ý! Chỉ xếp được theo thứ tự từ cao xuống thấp.">Xếp theo lượt xem nhiều nhất**</label><br />\n' +
        '\t\t\t<input type="radio" name="catnav-sort" id="catnav-sort-comments" value="comments" /><label for="catnav-sort-comments">Xếp theo số lượt bình luận</label><br />\n' +
        '\t\t\t<input type="checkbox" id="catnav-dir" /><label for="catnav-dir">Xếp từ cao xuống thấp</label><br />\n' +
        '\t\t</p>\n' +
        '\t\t<input type="button" id="catnav-go" value="Tìm Kiếm" /> <span id="catnav-loading">đang tải...</catnav>\n' +
        '\t</div>\n' +
        // error messages
        '\t<div id="catnav-noneerror" style="display: none;">\n' +
        '\t\tKhông tìm thấy trang nào!\n' +
        '\t</div>\n' +
        // nav result
        '\t<div id="catnav-resultscounter">\n' +
        '\t</div>\n' +
        '\t<div id="catnav-container">\n' +
        '\t</div>\n' +
        '\t<div id="catnav-pagenav">\n' +
        '\t</div>\n' +
        // lol what is this even...
        '\t<div id="catnav-generator">\n' +
        '\t</div>\n' +
        '</nav>';

    /* ================================== *\
    	# global CatNav object management
    \* ================================== */
    if (catnav._g instanceof Object) {
        // global CatNav is an object
        if (Array.isArray(catnav._g.storage)) {
            // import+export storage - base url to hosting wiki
            catnav.data.storage.url = catnav._g.storage[0];
            catnav.data.storage.scriptPath = catnav._g.storage[1];
        } else if (catnav._g.hasOwnProperty("storage")) {
            console.error("catnav :: global 'CatNav.storage' has been defined, but it is not a valid array");
        }
    } else {
        // window.CatNav has not been defined - define it
        window.CatNav = {};
    }

    /* ================================== *\
    	# functions
    \* ================================== */

    /* functions for getting info about categories */

    // get members of a given category
    catnav.fn.catMembers = function(cat, ns, arr, cont, cb) {
        /*
        catnav.fn.getMembersOfCat("Foo", 0, [], "", function(data) {
        	console.log(data);
        });
        */
        var req = new XMLHttpRequest();
        req.open("get", mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:" + encodeURIComponent(cat) + "&cmnamespace=" + ns + "&cmcontinue=" + encodeURIComponent(cont) + "&rawcontinue=&cmlimit=max&cb=" + new Date().getTime(), true);
        req.onload = function() {
            var data = JSON.parse(this.responseText);
            if (data.hasOwnProperty("query")) {
                var a = data.query.categorymembers,
                    b;
                for (var i in a) {
                    b = a[i];
                    arr.push(b.title);
                    catnav.data.pageids[b.title] = b.pageid;
                }
                if (typeof data["query-continue"] === "object") {
                    return catnav.fn.catMembers(cat, ns, arr, data["query-continue"].categorymembers.cmcontinue, cb);
                } else {
                    cb(arr);
                }
            } else {
                catnav.fn.onLoadingEnd();
                catnav.fn.error(1, "Đã có lỗi xảy ra khi tìm trang trong thể loại [[" + cat + "]]. Thông tin lỗi như sau:<br />\nError code: <code>" + data.error.code + "</code><br />\nError info: " + data.error.info + "<br /><hr />Hãy đảm bảo là bạn đã nhập đúng thông tin. Không để dòng trống.");
            }
        };
        req.send();
    };

    // get members of multiple categories
    catnav.fn.catMembersMulti = function(catstr, ns, cb) {
        var cats = catstr.split("|"),
            completed = 0,
            allcats = {};

        function query() {
            if (completed == cats.length) {
                // all requests have been made
                cb(allcats);
            } else {
                catnav.fn.catMembers(cats[completed], ns, [], "", function(data) {
                    allcats[cats[completed]] = data;
                    completed++;
                    query();
                });
            }
        }
        query();
    };

    // search for members that exist in all specified categories
    catnav.fn.joinMembers = function(data, isCommonMembers, fn) {
        var smallestCat,
            finalList = [];
        if (isCommonMembers === true) {
            // mode for the "find-in-categories" list: only list a page if it has all the listed categories
            smallestCat = data[catnav.fn.getSmallestCat(data)]; // start from smallest category - should take less time
            for (var i in smallestCat) {
                var itemLeSmall = smallestCat[i], // current item for check
                    isSharedCommon = true;
                // if 'isCommonMembers == true', only list pages that are listed in all categories
                // otherwise, list all pages anyway
                for (var cat in data) {
                    if (cat != smallestCat && data[cat].indexOf(itemLeSmall) == -1) {
                        // the page 'itemLeSmall' is not categorized in one of these cats
                        isSharedCommon = false;
                        break;
                    }
                }
                if (isSharedCommon) {
                    finalList.push(itemLeSmall);
                }
            }
        } else {
            // mode for the "unwanted categories" list: list any categorized page that is categorized at least once
            for (var cat in data) {
                for (var i in data[cat]) {
                    var currCat = data[cat][i];
                    if (finalList.indexOf(finalList) == -1) {
                        // although we categorize all pages, we still don't want a category to repeat- it's time consuming and pointless
                        finalList.push(currCat);
                    }
                }
            }
        }
        fn(finalList);
    };

    // find the category with the fewest members
    catnav.fn.getSmallestCat = function(data) {
        console.log("smallest cat!", data);
        var small = {
            cat: null,
            length: Infinity
        };
        for (var cat in data) {
            if (data[cat].length < small.length) {
                small.cat = cat;
                small.length = data[cat].length;
            }
        }
        return small.cat; // return name of property with the smallest number of items
    };

    // divide to pages - take a long list of titles, and split them to groups, each with no more than 'n' titles
    catnav.fn.divideToPages = function(titles) {
        var result = [];
        while (titles.length > 0) {
            result.push(titles.splice(0, catnav.settings.itemsInNavigator * catnav.fn.getNumberOfRows()));
        }
        return result;
    };

    // get number of rows
    catnav.fn.getNumberOfRows = function() {
        var rows = catnav.settings.rows,
            specified = $("#catnav-rows").val();
        if ($.isNumeric(specified) && specified > 0 && specified == Math.round(specified)) {
            // specified number of rows is a valid positive integer
            rows = specified;
        }
        return rows;
    };

    /* functions for getting info about pages */

    // implement new members
    catnav.fn.implementNewTitles = function(titles, categories) { // needs 'categories' parameter if advanced category sorting is desired
        // 'titles' is an array of page titles
        catnav.fn.sortTitles(titles, categories, $('[name="catnav-sort"]:checked').val(), $('#catnav-dir').prop("checked"), function(sortedTitles) {
            var asPages = catnav.fn.divideToPages(sortedTitles); // divide the 'titles' array to a list of smaller groups of titles
            if (asPages.length > 0) {
                catnav.data.current = asPages;
                catnav.fn.onLoadingEnd();
                catnav.fn.error(0, null); // hide error
                catnav.fn.updatePagesListNav();
                catnav.fn.gotoPage(0, true);
                $("#catnav-resultscounter").text(function() {
                    var n = 0,
                        c = catnav.data.current,
                        i;
                    for (i = 0; i < c.length; i++) {
                        n += c[i].length;
                    }
                    return n + " kết quả được tìm thấy";
                });
            } else {
                catnav.fn.onLoadingEnd();
                catnav.fn.error(1, "Không tìm thấy trang với các thể loại được liệt kê!"); // show error
            }
        });
    };

    // update pages' numbers
    catnav.fn.updatePagesListNav = function() {
        var a,
            pagenav = $("#catnav-pagenav");
        $(pagenav).html("");
        for (var i = 0; i < catnav.data.current.length; i++) {
            a = $('<a data-catnav-page="' + i + '" />').html("(" + (Number(i) + 1) + ")");
            $(pagenav).append(a);
            $(a).click(function() {
                catnav.fn.gotoPage(Number($(this).attr("data-catnav-page")));
            });
        }
    };

    // go to page 'n + 1'
    catnav.fn.gotoPage = function(n, uponGeneration) {
        catnav.data.selectedPage = n;
        $("#catnav-pagenav .catnav-pagenav-selected").removeClass("catnav-pagenav-selected");
        $("#catnav-pagenav a").eq(n).addClass("catnav-pagenav-selected");
        catnav.fn.queryPages(catnav.data.current[n], function(titles) {
            catnav.fn.updateMarkup(titles);
            // trigger events
            var pageloadEvent = new Event("catnavpageload");
            if (uponGeneration) {
                document.querySelector("#catnav").dispatchEvent(new Event("catnavgenerated"));
                pageloadEvent.uponGeneration = true;
            }
            document.querySelector("#catnav").dispatchEvent(pageloadEvent);
        });
    };

    // get info about pages (url, thumb, etc.)
    catnav.fn.queryPages = function(titles, cb) {
        var req = new XMLHttpRequest(),
            missingTitles = [],
            i;
        console.error(titles);
        for (i = 0; i < titles.length; i++) {
            // missingTitles lists all articles that haven't been previously loaded by 'queryPages'
            // articles already in 'catnav.data.details' will not be requested again
            if (!catnav.data.details.hasOwnProperty(titles[i])) {
                missingTitles.push(catnav.data.pageids[titles[i]]);
            }
        }
        req.open("get", mw.config.get("wgScriptPath") + "/api/v1/Articles/Details?&abstract=0&width=140&height=140&ids=" + missingTitles.join(","), true);
        req.onload = function() {
            catnav.fn.parsePagesQuery(JSON.parse(this.responseText));
            cb(titles);
        };
        if (missingTitles.length > 0) {
            // data about at least 1 page needs to be requested
            req.send();
        } else {
            // info about those pages has already loaded
            cb(titles);
        }
    };

    // process info about pages from json
    catnav.fn.parsePagesQuery = function(data) {
        for (var pageid in data.items) {
            var a = data.items[pageid],
                title = decodeURIComponent(a.url.replace(/^[^\n]*\/wiki\//, "")).replace(/_/g, " "); // a.title doesn't provide the namespace - easiest method is to do this
            catnav.data.details[title] = {
                id: a.id,
                title: title,
                url: a.url,
                img: a.thumbnail,
                lastedit: a.revision.timestamp,
                comments: a.comments
            };
        }
    };

    // update markup
    catnav.fn.updateMarkup = function(titles) {
        var container = $('<div />');
        for (var i in titles) {
            var a = catnav.data.details[titles[i]],
                item = $('<div class="catnav-item' + (a.img ? "" : " catnav-item-noimage") + '"><a target="_blank" href="' + a.url + '" title="' + a.title.replace(/["'&<>]/g, function(m) {
                    return "&#" + m.charCodeAt(0) + ";";
                }) + '"><img src="' + (a.img ? a.img : mw.config.get("wgBlankImgUrl")) + '" width="140" height="140" /><span class="catnav-item-label"></span></a></div>');
            $(item).find("span").text(a.title);
            $(container).append(item);
        }
        $("#catnav-container").html($(container).html());
        //window.q = container; // lol why do i always use window.q, i keep finding old lines with this whenever i set it somewhere else in the code for debugging
    };

    // error message
    catnav.fn.error = function(bool, msg) {
        // if 'bool' show message, otherwise hide
        // 'msg' is the new html content
        $("#catnav-noneerror").html(msg)[bool ? "show" : "hide"]();
    };

    // collaps text
    catnav.fn.collapseText = function(s) {
        return s.replace(/\n+[ \t]+\n+|\n{2,}/g, "\n").trim();
    };

    // sort pages by user preferences
    catnav.fn.sortTitles = function(titles, categories, mode, reverse, cb) {
        //window.q = [titles.concat(), mode, reverse];
        /*
        	modes:
        		{
        			creation => by creation time
        			lastedit => by last edit time
        			alphabet => by alphabetic order
        		}
        	'reverse' is a boolean: set as true in order to reverse the list of pages in the end of the process
        	'categories' parameter may be needed for specific advanced sorting methods
        */
        mode = ["bypageid", /*"creation",*/ "lastedit", "alphabet", "populars", "comments" /*, "talksize"*/ ].indexOf(mode) > -1 ? mode : "alphabet";
        var sortedTitles;
        console.log("sortTitles", arguments);
        switch (mode) {
            // @ mode == "alphabet"
            case "alphabet":
                // sort by alphabet order
                sortedTitles = titles.sort();
                if (reverse) {
                    sortedTitles.reverse();
                }
                cb(sortedTitles);
                break;
                // @ mode == "lastedit" or "comments"
            case "lastedit":
            case "comments":
                // sort by lastedit, or number of comments
                catnav.fn.queryPages(titles, function(titles) {
                    // 'catnav.fn.queryPages' is required to know how to sort all titles before splitting into navpages
                    var details = catnav.data.details,
                        title,
                        curr,
                        arr = [], // array of values (last edit timestamp or number of comments)
                        pagesBySortingMethod = {}, // object: key => sorting method value (timestamp or comment, value => array with titles with that associated value (in case 2+ articles have the value)
                        i;
                    // copy data from 'catnav.data.details' about the wanted titles
                    for (title in details) {
                        if (titles.indexOf(title) > -1) {
                            curr = details[title][mode == "lastedit" ? "lastedit" : "comments"];
                            if (arr.indexOf(Number(curr)) === -1) {
                                arr.push(Number(curr));
                            }
                            pagesBySortingMethod[curr] = pagesBySortingMethod[curr] || [];
                            pagesBySortingMethod[curr].push(title);
                        }
                    }
                    arr.sort(function(a, b) {
                        // sort by numerically ascending order
                        return a - b;
                    });
                    sortedTitles = [];
                    for (i = 0; i < arr.length; i++) {
                        // combine the mini-arrays, from the lowest timestamp to the highest
                        sortedTitles = sortedTitles.concat(pagesBySortingMethod[arr[i]]);
                    }
                    if (reverse) {
                        sortedTitles.reverse();
                    }
                    window.q = {
                        details: details,
                        title: title,
                        curr: curr,
                        arr: arr,
                        pagesBySortingMethod: pagesBySortingMethod,
                        i: i,
                        sortedTitles: sortedTitles
                    };
                    cb(sortedTitles);
                });
                break;

                // @ mode == "bypageid"
            case "bypageid":
                // sort by pageid (=wgArticleId)
                catnav.fn.queryPages(titles, function(titles) {
                    // now when 'catnav.fn.queryPages' was used, 'catnav.data.details' has been created
                    var pagesByIds = {},
                        details = catnav.data.details,
                        title,
                        i,
                        id,
                        ids = [];
                    // 'pagesByIds': key => pageid, value => title
                    console.info("details as of running: " + JSON.stringify(details));
                    for (title in details) {
                        if (titles.indexOf(title) > -1) {
                            id = details[title].id;
                            pagesByIds[id] = title;
                            ids.push(id);
                        }
                    }
                    // sort by ascending ids
                    ids.sort(function(a, b) {
                        return a - b;
                    });
                    // map by the now-ordered ids
                    sortedTitles = [];
                    for (i = 0; i < ids.length; i++) {
                        sortedTitles.push(pagesByIds[ids[i]]);
                    }
                    if (reverse) {
                        sortedTitles.reverse();
                    }
                    cb(sortedTitles);
                });
                break;

                // @ mode == "populars"
            case "populars":
                // sort by most popular (using category exhibition api)
                catnav.fn.getCategorySizes(categories, {}, function(allcats) {
                    var cat,
                        smallestCat;
                    for (cat in allcats) {
                        allcats[cat] = new Array(allcats[cat]);
                    }
                    smallestCat = catnav.fn.getSmallestCat(allcats);
                    catnav.fn.getExhibitionMembers(smallestCat, [], 1, function(exMembers) {
                        var sortedTitles = []; // final result
                        // go through 'getExhibitionMembers' results, and add the current exhibition member
                        // to 'sortedTitles' if the 'titles' argument (in 'sortTitles') contains it
                        exMembers.forEach(function(member) {
                            if (titles.indexOf(member) > -1) {
                                // member exists in the passed titles list
                                sortedTitles.push(member);
                            }
                        });
                        cb(sortedTitles);
                    });
                });
                break;
        }
    };

    // get creation time of pages
    catnav.fn.getCreationTime = function(titles, cb) {
        // lol don't use this stupid module, while running it i figured it would be much more efficient to use wgArticleId :P
        if (titles.length === 0) {
            cb();
        } else {
            var req = new XMLHttpRequest();
            req.open("GET", mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&prop=revisions&rvprop=timestamp&rvlimit=1&rvdir=newer&titles=" + encodeURIComponent(titles.shift()), true);
            // can only get 1 title at a time when getting the first revisions :(
            req.onload = function() {
                var data = JSON.parse(req.responseText),
                    pageid,
                    page;
                for (pageid in data.query.pages) {
                    page = data.query.pages[pageid];
                    catnav.data.details[page.title] = catnav.data.details[page.title] || {};
                    catnav.data.details[page.title].creation = page.revisions[0].timestamp;
                    // continue getting data about the remaining titles
                    catnav.fn.getCreationTime(titles, cb);
                }
            };
            req.send();
        }
    };

    // manipulate storage
    catnav.fn.storage = function(method, savingData) {
        switch (method) {
            case "get":
                var storage = localStorage.getItem("catnav");
                console.log(method, storage);
                storage = storage ? JSON.parse(storage) : {
                    favorites: []
                };
                console.log(method, storage);
                return storage;
                break;
            case "set":
                localStorage.setItem("catnav", JSON.stringify(savingData));
                return true;
                break;
        }
    };

    // add favorite to list
    catnav.fn.insertFavorite = function(category) {
        var item = $('<div class="catnav-commoncats-item"></div>')
            .data({
                name: category
            })
            .text(category)
            .prepend('<img src="https://i.imgur.com/toc40DW.png" class="catnav-commoncats-item-delete" />', '&nbsp;&nbsp;');
        $(item).contextmenu(function(e) {
            if ($(e.target).is(this)) {
                e.preventDefault();
                var a = $("#catnav-textarea-exclude"),
                    b = $(a).val().split("\n");
                b.push($(this).data("name"));
                $(a).val(b.join("\n").trim());
            }
        }).click(function(e) {
            console.log(e.target, this);
            if ($(e.target).is(this) && e.which === 1) {
                var a = $("#catnav-textarea-include"),
                    b = $(a).val().split("\n");
                b.push($(this).data("name"));
                $(a).val(b.join("\n").trim());
            }
        });
        $(item).find("img").click(function() {
            var storage = catnav.fn.storage("get"),
                fave = storage.favorites,
                index = fave.indexOf($(this).parent().data("name"));
            if (index > -1) {
                fave.splice(index, 1);
                storage = catnav.fn.storage("set", storage);
                $(this).parent().remove();
            }
        });
        $("#catnav-commoncats-container").append(item);
    };

    // import global settings ([[w:Special:MyPage/catnav.css]])
    catnav.fn.addGlobalFavorites = function() {
        var user = encodeURIComponent(mw.config.get("wgUserName"));
        $.ajax({
            url: catnav.data.storage.url + mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=User:" + user + "/catnav.css&callback=catnavcb&" + new Date().getTime(),
            action: "GET",
            dataType: "jsonp",
            jsonpCallback: "catnavcb",
            success: function(data) {
                var pages = data.query.pages,
                    pageid,
                    content,
                    cities = {},
                    currCity,
                    wiki = location.hostname.replace(/\.fandom\.com$/i, ""),
                    storage;
                for (pageid in pages) {
                    if (pageid == -1) {
                        alert("Không tìm thấy dữ liệu. Hãy đảm bảo là trang '/wiki/User:" + user + "/catnav.css' có tồn tại");
                    } else {
                        content = pages[pageid].revisions[0]["*"];
                        content.split("\n").forEach(function(line, lineNumber) {
                            console.warn(lineNumber, lineNumber + 1, line);
                            var temp;
                            switch (line.charAt(0)) {
                                case "@":
                                    temp = line.substr(1).trim().toLowerCase();
                                    try {
                                        currCity = temp;
                                        cities[temp] = cities[temp] || [];
                                    } catch (err) {
                                        alert("Tên trang wiki không hợp lệ tại dòng " + (lineNumber + 1) + ": " + temp);
                                    }
                                    break;
                                case "#":
                                    temp = line.substr(1).trim();
                                    temp = temp.charAt(0).toUpperCase() + temp.substr(1); // make first letter uppercase per case-insensitivity in pages' initials
                                    if (currCity) {
                                        cities[currCity].push(temp);
                                    } else {
                                        alert("Lỗi tại dòng " + (lineNumber + 1) + ": thể loại được liệt kê mà không có tên trang wiki được ghi ở dòng đầu tiên");
                                    }
                                    break;
                            }
                        });
                    }
                    break;
                }
                if (cities.hasOwnProperty(wiki)) {
                    storage = catnav.fn.storage("get");
                    console.info(storage);
                    cities[wiki].forEach(function(category) {
                        console.info(category);
                        if (storage.favorites.indexOf(category) === -1) {
                            storage.favorites.push(category);
                            catnav.fn.insertFavorite(category);
                        }
                    });
                    storage = catnav.fn.storage("set", storage);
                }
            }
        });
    };

    // get wikia's standard categoryexhibition members of a given category
    catnav.fn.getExhibitionMembers = function(category, arr, page, cb) {
        // arguments => "Foo", [], 1, function() {}
        var req = new XMLHttpRequest();
        req.open("GET", mw.config.get("wgScriptPath") + "/index.php?action=ajax&articleId=" + encodeURIComponent(category) + "&method=axGetArticlesPage&rs=CategoryExhibitionAjax&page=" + page + "&cb=" + new Date().getTime(), true);
        req.onload = function() {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText),
                    lastPage = $(data.paginator).find(".paginator-page").last().attr("data-page");
                // last page is 1, if there are no subpages for the standard exhibition
                lastPage = $.isNumeric(lastPage) ? Number(lastPage) : 1;
                // add titles
                $(data.page).find(".title").each(function() {
                    arr.push($(this).text());
                });
                // check if reached to the last page
                if (page === lastPage) {
                    // last page - call 'cb' and pass the title list to its arguments
                    cb(arr);
                } else {
                    // not last page - continue to next one
                    catnav.fn.getExhibitionMembers(category, arr, page + 1, cb);
                }
            } else {
                catnav.fn.onLoadingEnd();
                catnav.fn.error(true, "CategoryExhibitionAjax request error (status " + req.status + "): không thể tải được danh sách trang.<br />Hãy chắc rằng wiki bạn đang sử dụng đã bật tính năng Category Exhibition. Bạn có thể sử dụng những cách xếp trang khác nếu bạn muốn.");
            }
        };
        req.send();
    };

    // get sizes of categories
    catnav.fn.getCategorySizes = function(categories, sizelist, cb) {
        // arguments => ["Foo1", "Foo2", "Fooetc."], {}, function() {}
        console.log("inite :: getCategorySizes");
        var req = new XMLHttpRequest(),
            curr = categories.splice(0, 50);
        for (var i = 0; i < curr.length; i++) {
            curr[i] = "Category:" + curr[i];
        }
        req.open("GET", mw.config.get("wgScriptPath") + "/api.php?action=query&format=json&prop=categoryinfo&titles=" + encodeURIComponent(curr.join("|")) + "&cb=" + new Date().getTime(), true);
        req.onload = function() {
            var data = JSON.parse(req.responseText),
                cat,
                catname;
            for (var pageid in data.query.pages) {
                cat = data.query.pages[pageid];
                catname = cat.title.replace(/^[^\:]+\:/, "");
                if (!cat.hasOwnProperty("categoryinfo")) {
                    // no category members - continue
                    // note: pageid can be negative if the category is being used in pages, but its category page has yet to be created
                    sizelist[catname] = 0; // note that this will be smaller than any other category!!!
                    continue;
                }
                sizelist[catname] = cat.categoryinfo.size; // size = any page (including other categories) that uses this category
            }
            if (categories.length > 0) {
                // not done
                catnav.fn.getCategorySizes(categories, sizelist, cb);
            } else {
                // done
                cb(sizelist);
            }
        };
        req.send();
    };

    // when no further resources are to be loaded
    // when all required resources have loaded and processed, or when an error prevents the process completion
    catnav.fn.onLoadingEnd = function() {
        $("#catnav-loading").hide();
    };

    // convert local favorites to global favorites syntax (that the user can copy and paste in their global list)
    catnav.fn.exportGlobalFavorites = function() {
        var wiki = location.hostname.replace(/\.fandom\.com$/i, ""),
            favorites = catnav.fn.storage("get").favorites,
            lines = ["@" + wiki];
        for (var i = 0; i < favorites.length; i++) {
            lines.push("#" + favorites[i]);
        }
        return lines.join("\n");
    };

    // init
    catnav.fn.init = function() {
        // # html
        // interface markup
        $("#mw-content-text").html(catnav.data.markup.html);

        // # triggers
        // 'generate' button
        $("#catnav-go").click(function() {
            $("#catnav-loading").show(); // show loading text
            var incCats = catnav.fn.collapseText($("#catnav #catnav-textarea-include").val()).replace(/\n/g, "|"), // included categories
                disCats = catnav.fn.collapseText($("#catnav #catnav-textarea-exclude").val()).replace(/\n/g, "|"), // exclude categories
                catList = incCats.split("|"), // array of included categories - needed for advanced page sorting methods
                nsStr = $("#catnav-ns")[0].checked ? "0" : "";
            // get included categories (object: key => categoryname, val => array of listed pages in that category)
            catnav.fn.catMembersMulti(incCats, nsStr, function(incData) {
                // sort the pages into a single array
                catnav.fn.joinMembers(incData, true, function(incTitles) {
                    if (disCats.length === 0) {
                        // no unwated categories requested - update immediately
                        catnav.fn.implementNewTitles(incTitles, catList);
                    } else {
                        // unwated categories requiested - get their categorized pages
                        catnav.fn.catMembersMulti(disCats, nsStr, function(disData) {
                            // sort the pages into a single array
                            catnav.fn.joinMembers(disData, false, function(disTitles) {
                                for (var i in disTitles) {
                                    if (incTitles.indexOf(disTitles[i]) > -1) {
                                        // unwanted page detected - remove from 'incTitles'
                                        incTitles.splice(incTitles.indexOf(disTitles[i]), 1);
                                    }
                                }
                                catnav.fn.implementNewTitles(incTitles, catList);
                            });
                        });
                    }
                });
            });
        });
        // adding categories to favorites
        $("#catnav-commoncats-add").click(function() {
            var category = prompt("Vui lòng điền tên thể loại bạn muốn thêm vào trang yêu thích"),
                storage;
            if (category) {
                storage = catnav.fn.storage("get");
                if (storage.favorites.indexOf(category) === -1) {
                    storage.favorites.push(category);
                    storage = catnav.fn.storage("set", storage);
                    catnav.fn.insertFavorite(category);
                }
            }
        });
        // importing global categories
        $("#catnav-commoncats-global-import").click(function() {
            catnav.fn.addGlobalFavorites();
        });
        // initiating favorites
        $(function() {
            var storage = catnav.fn.storage("get"),
                fave = storage.favorites,
                i;
            for (i = 0; i < fave.length; i++) {
                catnav.fn.insertFavorite(fave[i]);
            }
        });
        // export global categories
        $("#catnav-commoncats-global-export").click(function() {
            $("#catnav-export-modal-textarea").val(catnav.fn.exportGlobalFavorites());
            $("#catnav-export-modal").css("display", "flex");
            $("#catnav-export-modal-textarea").select();
        });
        // close favorites export modal
        $("#catnav-export-modal-close").click(function() {
            $("#catnav-export-modal").hide();
        });
        $("#catnav-export-modal").keydown(function(e) {
            if (e.which == 27) {
                $("#catnav-export-modal").hide();
            }
        });
        $("#catnav-export-modal-textarea").keydown(function(e) {
            if (e.which == 67 && e.ctrlKey && this.selectionEnd - this.selectionStart === this.value.length) {
                // ctrl+c, while all text is selected
                // close modal after 80ms (to prevent deselection of target text before copying is done)
                setTimeout(function() {
                    $("#catnav-export-modal").hide();
                }, 80);
            }
        });
        // Drop-down menu
        var textboxinclude = document.getElementById('catnav-textarea-include');
        var dropdowninclude = document.getElementById('catnav-dropdown-include');
        var textboxexclude = document.getElementById('catnav-textarea-exclude');
        var dropdownexclude = document.getElementById('catnav-dropdown-exclude');
        dropdowninclude.onchange = function() {
            if (!textboxinclude.value)
                textboxinclude.value = this.value; //first case or else you will have a newline at first 
            else
                textboxinclude.value = textboxinclude.value + '\n' + this.value;
        };
        dropdownexclude.onchange = function() {
            if (!textboxexclude.value)
                textboxexclude.value = this.value; //first case or else you will have a newline at first 
            else
                textboxexclude.value = textboxexclude.value + '\n' + this.value;
        };
        // Reset button
        $("#catnav-clear-include").click(function(e) {
            e.preventDefault();
            $("#catnav-textarea-include").val('');
        });
        $("#catnav-clear-exclude").click(function(e) {
            e.preventDefault();
            $("#catnav-textarea-exclude").val('');
        });
        // mark as ready
        document.body.dispatchEvent(new Event("catnavready"));
    };

    // set contrast color
	catnav.fn.contrastfy = function(colorValue) {
		// myst use canvas because apparently sometimes the color value will be a color name and not a convertable hex value
		var c = document.createElement("canvas"),
			ctx,
			rgb,
			avg,
			contrast;
		c.width = 1;
		c.height = 1;
		ctx = c.getContext("2d");
		ctx.fillStyle = colorValue;
		ctx.fillRect(0, 0, 1, 1);
		rgb = ctx.getImageData(0, 0, 1, 1).data.slice(0, 3);
		avg = (rgb[0] + rgb[1] + rgb[2]) / 3;
		contrast = Math.floor(128 + avg - (avg < 128 ? 0 : 255));
		contrast = contrast.toString(16);
		contrast = contrast.length == 2 ? contrast : "0" + contrast;
		return "#" + new Array(4).join(contrast);
	};

    /* ================================== *\
    	# implementations
    \* ================================== */

    // check if the page is [[Special:CatNav]]
    if (mw.config.get("wgNamespaceNumber") === -1 && mw.config.get("wgTitle") == "CatNav") {
		/* css */
		importArticle({
			type: 'style',
			article: 'u:dev:MediaWiki:CatNav.css'
		});
        // redefine results counter
        mw.util.addCSS(
			'#catnav-resultscounter {\n' +
				'\tcolor: ' + catnav.fn.contrastfy(getComputedStyle(document.querySelector("section#WikiaPageBackground") || document.querySelector(".WikiaPageContentWrapper")).backgroundColor) + ';\n' +
			'}' +
			'#catnav .catnav-gui-group {\n' +
				'\tborder: 1px solid ' + getComputedStyle(document.body).backgroundColor + ';\n' +
            '}\n'
		);

        /* markup */
        // export modal (main content loaded using 'catnav.fn.init'
        $("body").append(
            '<nav id="catnav-export-modal">\n' +
            '\t<nav id="catnav-export-modal-content">\n' +
            '\t\t<h3>\n' +
            '\t\t\tXuất thể loại ưa thích\n' +
            '\t\t\t<span id="catnav-export-modal-close" />\n' +
            '\t\t</h3>\n' +
            '\t\t<p>\n' +
            '\t\t\tSao chép lại thông tin phía dưới và lưu vào cuối trang <a target="_blank" href="/wiki/Special:MyPage/catnav.css?action=edit">Dữ liệu cài đặt</a> của bạn.<br />\n' +
            '\t\t\tTrong trường hợp bạn đã tạo trang Lưu thể loại yêu thích của mình trước đó, bạn có thể bỏ qua dòng chữ @sonako phía dưới, chỉ cần sao chép lại những dòng thể loại muốn lưu ở sau.\n' +
            '\t\t</p>\n' +
            '\t\t<textarea id="catnav-export-modal-textarea"></textarea>\n' +
            '\t</nav>' +
            '</nav>'
        );
        // update titles
        $(".WikiaPage h1, h1#firstHeading").html("Tìm Kiếm Nâng Cao");
        $("head title").html("Tìm Kiếm Nâng Cao | Sonako Light Novel Wiki");

        // init
        catnav.fn.init();

        // provide global access`
        CatNav.init = catnav.fn.init;
    } else {
        // this is not [[Special:CatNav]]
        CatNav.init = function() {
            console.warn("catnav :: 'CatNav.init' was requested, but has not been defined on [[Special:CatNav]]");
        };
    }
    // Make Catnav and Navpopup work together
    $("#catnav").on("catnavpageload", function(e) {
        pg.setupTooltips(this, null, true);
    });
});