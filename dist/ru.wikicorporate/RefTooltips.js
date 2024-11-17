var cloneReferences = function cloneReferences() {
  var refs = document.querySelectorAll('[id^="cite_ref"]');
  refs.forEach(function (ref) {
    var targetId = decodeURIComponent(ref.children[0].hash.substring(1));
    var targetElement = document.querySelector("[id=\"".concat(targetId, "\"] .reference-text"));
    if (targetElement) {
      ref.appendChild(targetElement.cloneNode(true));
    }
  });
};

var observer = new MutationObserver(function (mutations) {
  var foundReferences = false;
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList') {
      if (document.querySelectorAll('[id^="cite_ref"]').length > 0) {
        foundReferences = true;
      }
    }
  });

  if (foundReferences) {
    cloneReferences();
    observer.disconnect();
  }
});

var config = {
  childList: true,
  subtree: true
};

observer.observe(document.body, config);