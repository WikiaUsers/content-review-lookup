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
	span[data-letter]:after {
	    content: attr(data-letter);
	    font-size: 36px;
	} </style>`
);
document.querySelectorAll('.page-header__title').forEach(h1 => {
	h1.innerHTML = h1.innerHTML.replace(/Ɔ/g, '<span data-letter="C" style="transform:scaleX(-1);">Ɔ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɔ/g, '<span data-letter="c" style="transform:scaleX(-1);">ɔ</span>');
	h1.innerHTML = h1.innerHTML.replace(/Ɛ/g, '<span data-letter="З" style="transform:scaleX(-1);">Ɛ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɛ/g, '<span data-letter="з" style="transform:scaleX(-1);">ɛ</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɑ/g, '<span style="display:inline-block;overflow:hidden;height:22px;transform:translateY(2.2px);"><span style="display:inline-block;transform:translateY(-14.5px);">d</span></span>');
});

// Audio from URL---------------------------------------------------------------
document.querySelectorAll('.mw-default-size').forEach(span => {
	span.innerHTML = span.innerHTML.replace('&lt;', '<');
	span.innerHTML = span.innerHTML.replace('&gt;', '>');
	span.innerHTML = span.innerHTML.replace('delete', '');
	span.innerHTML = span.innerHTML.replace('<span style="display:none">', '');
});