// Category thumbnails 1x1
document.querySelectorAll('.category-page__member img').forEach(img => {
    img.src = img.src.replace('width/40/height/30', 'width/120/height/120');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('width/40/height/30', 'width/120/height/120'));
});

// Images limit = 500
const links = [
  'https://xorumian-things.fandom.com/de/wiki/Spezial:NewFiles',
  'https://xorumian-things.fandom.com/wiki/Special:NewFiles',
  'https://xorumian-things.fandom.com/fr/wiki/Sp%C3%A9cial:NewFiles',
  'https://xorumian-things.fandom.com/es/wiki/Especial:NewFiles',
  'https://xorumian-things.fandom.com/pt-br/wiki/Especial:NewFiles',
  'https://xorumian-things.fandom.com/nl/wiki/Speciaal:NewFiles',
  'https://xorumian-tests.fandom.com/wiki/Special:NewFiles',
  'https://xorumian-cosplays.fandom.com/de/wiki/Spezial:NewFiles'
];

links.forEach(url => {
  document.querySelectorAll(`li a[href="${url}"]`).forEach(link => {
    link.href = `${url}?limit=500`;
  });
});

// Recent Images design
(function(mw, window) {
    setTimeout(function() {
        // Double-loading prevention
        if (document.querySelector('.card-image img')) return;
    
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelectorAll('.card-image img').forEach(function(img) {
                var src = img.src;
                var dataSrc = img.getAttribute('data-src');
                if (src.includes('width/300/height/168')) {
                    img.src = src.replace('width/300/height/168', 'width/300/height/300');
                }
                if (dataSrc && dataSrc.includes('width/300/height/168')) {
                    img.setAttribute('data-src', dataSrc.replace('width/300/height/168', 'width/300/height/300'));
                }
            });
        });
    }, 1000);
})(mediaWiki, this);