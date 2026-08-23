(function () {
  var infobox = document.querySelector('.pk-infobox');
  var railTab = document.querySelector('.rail-tab');
  if (!infobox || !railTab) return;
  // reparent into .pk-infobox itself (not .portable-infobox, which has
  // wildcard rules that would fight our positioning)
  infobox.appendChild(railTab);
  railTab.style.setProperty('position', 'absolute', 'important');
  railTab.style.setProperty('margin', '0', 'important');
  railTab.style.setProperty('z-index', '9999', 'important');
  railTab.style.setProperty('will-change', 'auto', 'important');
  railTab.style.setProperty('top', '-20px', 'important');
  railTab.style.setProperty('left', '175px', 'important');
})();


(function () {
  if (!document.querySelector('.regions-scene')) return;
  if (!document.body.classList.contains('is-content-expanded')) {
    var toggle = document.querySelector('.content-size-toggle');
    if (toggle) toggle.click(); // trigger the native toggle so its own logic handles the state change correctly
  }
})();