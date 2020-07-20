console.log("Touken Script 006");
 // Hiện IP thay vì "A wikia contributor"
window.RevealAnonIP = {
    permissions : ['user']
};

// Import external scripts
importArticles({
    type: "script",
    articles: [
        "w:c:dev:BackToTopButton/code.js",
        "w:c:dev:Tooltips/code.js",
        "w:c:dev:ExternalImageLoader/code.js",
        "w:c:dev:ReferencePopups/code.js",
        "w:c:dev:MessageBlock/code.js",
        "MediaWiki:Countdown.js",
        "MediaWiki:DisplayClock.js",
        //"MediaWiki:SoundManager2.js",
        "MediaWiki:FixVignette.js"
    ]
}, {
    type: "style",
    article: "MediaWiki:Customizing.css"
});

/* Script dành cho Internet Explorer */
if ($.client.profile().name == 'msie') {
    /** Sửa lỗi Internet Explorer **************************************************
      *
      *  Chức năng: Sửa lỗi thanh cuộn ngang trong IE
      *  Người bảo trì: [[en:User:Tom-]]?
    */
    var oldWidth;
    var docEl = document.documentElement;
 
    var fixIEScroll = function() {
        if (!oldWidth || docEl.clientWidth > oldWidth) {
            doFixIEScroll();
        } else {
            setTimeout(doFixIEScroll, 1);
        }
 
        oldWidth = docEl.clientWidth;
    };
 
    var doFixIEScroll = function () {
        docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
    };
 
    document.attachEvent("onreadystatechange", fixIEScroll);
    document.attachEvent("onresize", fixIEScroll);
 
  // Trong bản in IE (7?) không làm đậm dòng
    mw.util.addCSS('@media print { sup, sub, p, .documentDescription { line-height: normal; } }');
 
    // Lỗi tràn trong IE
    mw.util.addCSS('div.overflowbugx { overflow-x: scroll !important; overflow-y: hidden !important; } '
      + 'div.overflowbugy { overflow-y: scroll !important; overflow-x: hidden !important; }');
 
    // Sửa lỗi thu phóng trong IE
    // Dùng để sửa quyền chuyển div/table trong bảng
    mw.util.addCSS('.iezoomfix div, .iezoomfix table { zoom: 1; }');
 
    // Nhập mã kịch bản riêng cho Internet Explorer 6
    if ($.client.profile().versionBase == '6') {
        importScript('MediaWiki:Common.js/IE60Fixes.js');
    }
}
 
/* Sửa kết xuất phông chữ Windows */
if ($.client.profile().platform == 'win') {
    mw.util.addCSS('.IPA, .Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; }');
}
 /** Bảng ẩn/hiện *********************************************************
  *
  *  Chức năng: Cho phép bản mẫu có thể ẩn đi lại, chỉ hiện tiêu đề. Xem
  *             [[en:Wikipedia:NavFrame]].
  *  Người bảo trì: 
  */

var autoCollapse = 2;
var collapseCaption = "ẩn";
var expandCaption = "hiện";

window.collapseTable = function (tableIndex, fast) {
    var toggleLink = $("#collapseButton" + tableIndex);
    var table = $("#collapsibleTable" + tableIndex);
	if ( !table.length || !toggleLink.length ) {
        return false;
    }
	
    var rows = table.find("tr");
    var slidingOptions = {
    	duration: fast ? 0 : undefined
    };
    if (toggleLink.text() === collapseCaption) {
    	rows.slice(1).fadeOut(slidingOptions);
        toggleLink.text(expandCaption);
    }
    else {
        if (rows.first().is(":hidden")) {
        	rows.slice(1).fadeOut(slidingOptions);
        }
        else {
        	rows.slice(1).fadeIn(slidingOptions);
        }
        toggleLink.text(collapseCaption);
    }
};

function createCollapseButtons() {
     /* chỉ thêm nút nếu có hàng đầu để ấy */
    var tables = $("table.collapsible:has(tr th)");
    tables.each(function (i, table) {
        $(table).attr("id", "collapsibleTable" + i);
        
        var header = $(table).find("tr th").first();
        header.addClass("collapsible-header");
        
        var toggleLink = $(mw.html.element("a", {
        	id: "collapseButton" + i,
        	href: "#"
        }));
        toggleLink.css("color", header.css("color"));
        toggleLink.append(collapseCaption);
		
        header.click(function (evt) {
        	var target = $(evt.target);
        	if (target.is(toggleLink) || !(target.is("a") || target.parents("a").length)) {
        		window.collapseTable(i);
        		evt.preventDefault();
        	}
        });
        
		var toggleButton = $(mw.html.element("span", {
        	"class": "collapseButton"	// kiểu mẫu được định rõ trong Common.css
        }));
        toggleButton.append("[");
		toggleButton.append(toggleLink);
        toggleButton.append("]");
		
        header.prepend(toggleButton);
	});

	tables.each(function (i, table) {
        if ($(table).hasClass("collapsed") ||
        	(tables.length >= autoCollapse && $(table).hasClass("autocollapse")) ||
        	$(table).hasClass("innercollapse") && table.parents(".outercollapse").length) {
            window.collapseTable(i, true /* fast */);
        }
	});
}

mw.hook("wikipage.content").add(createCollapseButtons);

 
/*
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 800;
  massRenameSummary = 'automatic';
  importScriptPage('MassRename/code.js', 'dev');
 
  batchDeleteDelay = 800;
  importScriptPage('AjaxBatchDelete/code.2.js', 'dev');
}
 
if (mw.config.get("wgUserGroups").indexOf('poweruser') > -1) {
  nullEditDelay = 600;
  importScriptPage('MassNullEdit/code.js', 'dev');
}
 */
importArticles({
    type: "style",
    articles: [
 
    ]
});

// Tin nhắn tới thành viên bị cấm
var MessageBlock = {
  title : 'Thông báo vi phạm',
  message : 'Bạn đã bị cấm $2 với lý do $1, vui lòng đọc lại và thực hiện theo hướng dẫn trong trang Quy định và Đóng góp. Nếu cảm thấy không hài lòng với quyết định này, vui lòng gửi một tin nhắn cho admin.',
  autocheck : true
};

//Effect cho timeline
(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();