// Category thumbnails 1x1 -----------------------------------------------------
document.querySelectorAll('.category-page__member img').forEach(img => {
    img.src = img.src.replace('width/40/height/30', 'width/100/height/100');
});

// Images limit = 500 ----------------------------------------------------------
document.querySelectorAll('li a[data-tracking="explore-images"]').forEach(link => {
	link.href = link.href.replace(':NewFiles', ':NewFiles?limit=500');
});

// Recent Images design --------------------------------------------------------
setTimeout(() => {
    document.querySelectorAll('.card-image img').forEach(img => {
        img.src = img.src.replace('width/300/height/168', 'width/300/height/300');
    });
}, 3000);

// Replace letters with other letters that have the font-family ----------------
$("head").append(`<style> 
	span[data-letter] {
	    font-size: 0;
	    display: inline-block;
	}
	span[data-letter]::after {
	    content: attr(data-letter);
	    font-size: 36px;
    	display: inline-block;
	} 
	span[data-letter="d"]::after {
    	translate: 0 -15px;
	}
	span[data-letter="n"]::after {
	    translate: -10px -15px;
	}
	span:is([data-letter="Э"],[data-letter="э"]):before {
	    content: attr(data-letter);
	    font-size: 36px;
	    scale: -1 1;
	    margin-left: -1.2px;
	    position: absolute;
	}
	span[data-letter="э"]:before {
	    margin-left: -0.6px;
	}
	</style>`
);
document.querySelectorAll('.page-header__title').forEach(h1 => {
	h1.innerHTML = h1.innerHTML.replace(/Ɔ/g, '<span data-letter="C" style="scale:-1 1">Ɔ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɔ/g, '<span data-letter="c" style="scale:-1 1">ɔ</span>');
	h1.innerHTML = h1.innerHTML.replace(/Ɛ/g, '<span data-letter="З" style="scale:-1 1">Ɛ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɛ/g, '<span data-letter="з" style="scale:-1 1">ɛ</span>');
	h1.innerHTML = h1.innerHTML.replace(/Ǝ/g, '<span data-letter="E" style="scale:-1 1">Ǝ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ǝ/g, '<span data-letter="e" style="scale:-1 1">ǝ</span>');
	h1.innerHTML = h1.innerHTML.replace(/Ʒ/g, '<span data-letter="3">Ʒ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ʒ/g, '<span data-letter="3" style="translate:0 6px">ʒ</span>');
	h1.innerHTML = h1.innerHTML.replace(/Ɵ/g, '<span data-letter="Э">Ɵ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɵ/g, '<span data-letter="э">ɵ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɑ/g, '<span data-letter="d" style="overflow:hidden;height:20px;translate:0 .7px;">ɑ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɾ/g, '<span data-letter="n" style="overflow:hidden;height:20px;scale:-1 1;translate:0 .7px;width:11px;margin-right:1px;">ɾ</span>');
	/*h1.innerHTML = h1.innerHTML.replace(/ɽ/g, 'r<span data-letter="j" style="scale:-1 1">ɽ</span>');*/
});

// Audio from URL---------------------------------------------------------------
document.querySelectorAll('.mw-default-size').forEach(span => {
	span.innerHTML = span.innerHTML.replace('&lt;', '<');
	span.innerHTML = span.innerHTML.replace('&gt;', '>');
	span.innerHTML = span.innerHTML.replace('delete', '');
	span.innerHTML = span.innerHTML.replace('<span style="display:none">', '');
});

// History button --------------------------------------------------------------
(function($){
	// Prevent double load
	window.xorumwiki = window.xorumwiki || {};
	if (window.xorumwiki.historyButton) return;
	window.xorumwiki.historyButton = true;

	function main() {
		// More consitent
		setTimeout(historyHtml, 200);
	}

	function historyHtml() {
		var $button = $("<a>")
			.addClass("wds-button wds-is-text page-header__action-button has-label")
			.attr("href", "?action=history")
			.html(`<svg class='wds-icon wds-icon-small'>
				<use xlink:href='#wds-icons-book-small'></use>
			</svg>	History`);

		// Insert to nav
		$("body:not(.action-history) .page-header__actions>a:last-of-type").after($button);
	}
	
	// Remove original button in dropdown
	document.querySelector(".page-header__actions #ca-history").remove();

	main();
})(jQuery);