/* ---------------- Import các trang script ----------------------------*/
importArticles ({
    type: 'script',
    articles: [
        "w:c:dev:BackToTopButton/code.js",      //Nút quay về đầu trang
        "w:c:dev:ShowHide/code.js",             //Thu gọn bảng
        "w:c:dev:DisplayClock/code.js"         //Hiển thị đồng hồ ở góc phải trên cùng
]}, {
    type: 'style',
    articles: [
        "MediaWiki:CustomCSS.css",
        "MediaWiki:Pages.css"
]});


/* -----------------Cuộn các nội dung trang chính ---------------------*/
$('.Left').click(function () {
    scroll = $('#scrolling').scrollLeft();
    $('#scrolling').animate({'scrollLeft': scroll-600}, 800);
});
$('.Right').click(function () {
    scroll = $('#scrolling').scrollLeft();
    $('#scrolling').animate({'scrollLeft': scroll+600}, 800);
});

/* -------------Thêm mô-đun bên phải ----------------------*/
$(document).ready(function() {
    var newSection = '<section id="games" class="module"><h2>Rayark Games</h2></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Game}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('#games').append(code);
    });
});

/* ------------------ Cổng trò chơi ---------------------------*/
var cname = document.getElementsByTagName("body")[0].className;
if(cname.indexOf("Cổng_trò_chơi") != -1){
    cname += " oasis-one-column";
    document.getElementsByTagName("body")[0].className = cname;
    $('#WikiaRail').remove();
}


$(function(){
	$.getJSON("/api.php?action=parse&text={{Game}}&format=json", function(data){
    	var $notice = $('<div>', {
    	    class: 'WikiaNotifications',
    	    html: data.parse.text["*"]
    	    });
		console.log($notice.html());
		$('body').append($notice);
	});
});