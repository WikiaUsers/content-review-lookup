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