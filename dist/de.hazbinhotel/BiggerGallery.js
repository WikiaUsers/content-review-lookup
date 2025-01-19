// Images limit = 500
const links = [
  'https://hazbinhotel.fandom.com/de/wiki/Spezial:NewFiles',
];

links.forEach(url => {
  document.querySelectorAll(`li a[href="${url}"]`).forEach(link => {
    link.href = `${url}?limit=500`;
  });
});