document.querySelectorAll('.category-page__member img').forEach(img => {
    img.src = img.src.replace('width/40/height/30', 'width/40/height/40');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('width/40/height/30', 'width/40/height/40'));
});