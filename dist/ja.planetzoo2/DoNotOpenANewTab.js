mw.hook('wikipage.content').add(function($content) {
document.querySelectorAll('a[target="_blank"]').forEach(function(el) { el.removeAttribute('target');});
});