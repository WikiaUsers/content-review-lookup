/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

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

InactiveUsers = { months: 1 };

window.BackToTopModern = true;