(function () {
  var topcap = document.querySelector('.pk-city-header-row');
  var railTab = document.querySelector('.rail-tab');
  if (!topcap || !railTab) return;

  topcap.appendChild(railTab);

  railTab.style.setProperty('position', 'absolute', 'important');
  railTab.style.setProperty('margin', '0', 'important');
  railTab.style.setProperty('z-index', '9999', 'important');
  railTab.style.setProperty('will-change', 'auto', 'important');
  railTab.style.setProperty('pointer-events', 'auto', 'important'); // ← important
})();


(function () {
  if (!document.querySelector('.regions-scene')) return;
  if (!document.body.classList.contains('is-content-expanded')) {
    var toggle = document.querySelector('.content-size-toggle');
    if (toggle) toggle.click(); // trigger the native toggle so its own logic handles the state change correctly
  }
})();