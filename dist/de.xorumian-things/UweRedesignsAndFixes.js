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
document.querySelectorAll('.page-header__title').forEach(h1 => {
	h1.innerHTML = h1.innerHTML.replace(/ɔ/g, '<span style="display:inline-block;transform:scaleX(-1);">c</span>');
	h1.innerHTML = h1.innerHTML.replace(/Ɛ/g, '<span style="display:inline-block;transform:scaleX(-1);">З</span>');
	h1.innerHTML = h1.innerHTML.replace(/ɛ/g, '<span style="display:inline-block;transform:scaleX(-1);">з</span>');
});