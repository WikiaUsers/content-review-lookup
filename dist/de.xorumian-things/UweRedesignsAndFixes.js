// Category thumbnails 1x1
document.querySelectorAll('.category-page__member img').forEach(img => {
    img.src = img.src.replace('width/40/height/30', 'width/40/height/40');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('width/40/height/30', 'width/40/height/40'));
});

// Recent Images design
document.querySelectorAll('.alice-carousel__stage img').forEach(img => {
    img.src = img.src.replace('height/168', 'height/300');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('height/168', 'height/300'));
    img.onload = function() {
        console.log('Bild geladen:', img.src);
    };
    img.removeAttribute('loading');
});