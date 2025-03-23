const cloneReferences = () => {
  const refs = document.querySelectorAll('[id^="cite_ref"]');
  refs.forEach(ref => {
    const targetId = decodeURIComponent(ref.children[0].hash.substring(1));
    const targetElement = document.querySelector(`[id="${targetId}"] .reference-text`);
    if (targetElement) {
      ref.appendChild(targetElement.cloneNode(true));
    }
  });
};
const observer = new MutationObserver((mutations) => {
  let foundReferences = false;
  mutations.forEach((mutation) => {
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
const config = {
  childList: true,
  subtree: true
};
observer.observe(document.body, config);