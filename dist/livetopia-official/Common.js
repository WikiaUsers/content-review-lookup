/* Any JavaScript here will be loaded for all users on every page load. */

link = document.querySelector('a[href$="/wiki/User:Anna Aviation"]');
if (link) {
  Object.assign(link.style, {
    fontWeight: '700',
    color: 'white',
    textStroke: '1px blue', // Standard
    webkitTextStroke: '1px blue' // Webkit fallback
  });
}