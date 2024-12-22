// Category thumbnails 1x1
document.querySelectorAll('.category-page__member img').forEach(img => {
    img.src = img.src.replace('width/40/height/30', 'width/40/height/40');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('width/40/height/30', 'width/40/height/40'));
});

// Images limit = 500
const links = [
  'https://xorumian-things.fandom.com/de/wiki/Spezial:NewFiles',
  'https://xorumian-things.fandom.com/wiki/Special:NewFiles',
  'https://xorumian-tests.fandom.com/wiki/Special:NewFiles',
  'https://xorumian-things.fandom.com/fr/wiki/Sp%C3%A9cial:NewFiles',
  'https://xorumian-things.fandom.com/es/wiki/Especial:NewFiles',
  'https://xorumian-things.fandom.com/pt-br/wiki/Especial:NewFiles',
  'https://xorumian-things.fandom.com/nl/wiki/Speciaal:NewFiles'
];

links.forEach(url => {
  document.querySelectorAll(`li a[href="${url}"]`).forEach(link => {
    link.href = `${url}?limit=500`;
  });
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