/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

// Làm trốn miêu tả và thuộc về cách LastEdited.
if (!window.lastEdited) {
	window.lastEdited = { diffModal: false, comment: false };
}

// Làm các trang liên kết đến sắp xếp theo bảng chữ cái
(function($) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')) ? 1 : -1;
    });
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);

// Làm Toc có bold và italic.
mw.hook("wikipage.content").add(function() {
	var toc = document.querySelector("#toc");
	if (!toc)
		return;

	var tocEntries = toc.querySelectorAll(".toctext"),
		entriesMap = new Map();

	tocEntries.forEach(function(entry) {
		if (entry.innerHTML !== entry.textContent)
			entriesMap.set(entry, entry.innerHTML);
	});

	if (!entriesMap.size)
		return;

	var interval = setInterval(function() {
		var markupRecovered = false;

		entriesMap.forEach(function(savedInnerHTML, entry) {
			if (entry.innerHTML !== savedInnerHTML) {
				entry.innerHTML = savedInnerHTML;
				markupRecovered = true;
			}
		});

		if (markupRecovered)
			clearInterval(interval);
	}, 500);
});