mw.hook('wikipage.content').add(function() {
  var style = document.createElement('style');
  document.head.appendChild(style);

  var isFullscreen = false;
  var fsCSS = [
    '.page-side-tools__wrapper { display: none !important; }',
    '.page__right-rail { display: none !important; }',
    '.global-explore-navigation { display: none !important; }',
    '.community-header-wrapper { display: none !important; }',
    '.resizable-container { margin: 0 !important; width: 100% !important; max-width: 100% !important; }',
    '.page.has-right-rail { margin-top: 0 !important; }',
    '.page { margin-top: 0 !important; }',
    '.main-container { margin-left: 0 !important; width: 100% !important; min-width: 0 !important; }'
  ].join('\n');

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key.toLowerCase() !== 'f') return;
    isFullscreen = !isFullscreen;
    style.textContent = isFullscreen ? fsCSS : '';
  });
});