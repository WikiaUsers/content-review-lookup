(function() {
  if (window.fandomDesktopToggleLoaded) {
    return; // Предотвращаем повторную загрузку
  }
  window.fandomDesktopToggleLoaded = true;

  function toggleDesktopView() {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const params = new URLSearchParams(url.search);
    params.set('mobileaction', 'toggle_view_desktop');
    url.search = params.toString();
    const newURL = url.toString();

    if (currentURL !== newURL) {
      window.location.href = newURL;
    }
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const mobileWrapper = document.getElementById('fandom-mobile-wrapper');
        if (mobileWrapper) {
          toggleDesktopView();
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();