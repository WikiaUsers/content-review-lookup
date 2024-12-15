// Category thumbnails 1x1
document.querySelectorAll('.category-page__member img').forEach(img => {
    img.src = img.src.replace('width/40/height/30', 'width/40/height/40');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('width/40/height/30', 'width/40/height/40'));
});

// Images limit = 500
document.querySelectorAll('li a[href="https://xorumian-things.fandom.com/de/wiki/Spezial:NewFiles"]').forEach(link => {
    link.href = link.href.replace('Spezial:NewFiles', 'Spezial:NewFiles?limit=500');
});

// Recent Images design
/*document.querySelectorAll('.alice-carousel__stage img').forEach(img => {
    img.src = img.src.replace('height/168', 'height/300');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('height/168', 'height/300'));
    img.onload = function() {
        console.log('Bild geladen:', img.src);
    };
    img.removeAttribute('loading');
});*/