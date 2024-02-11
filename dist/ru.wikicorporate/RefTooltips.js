var cloneRefs = setInterval(function () {
  if (document.querySelectorAll('[id^="cite_ref"]').length > 0) {
    document.querySelectorAll('[id^="cite_ref"]').forEach(function (ref) {
      ref.appendChild(document.querySelector("[id=\"".concat(decodeURIComponent(ref.children[0].hash.substring(1)), "\"]")).querySelector('.reference-text').cloneNode(true));
    });
    clearInterval(cloneRefs);
  }
}, 500);