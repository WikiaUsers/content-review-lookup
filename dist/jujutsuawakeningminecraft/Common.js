mw.loader.using('mediawiki.util', function () {
  if (mw.config.get('wgPageName') === 'User:Rip_Josh1') {
    const observer = new MutationObserver(() => {
      const header = document.querySelector('.user-identity-header__title');
      if (header && !header.dataset.verifiedCheckAdded) {
        const img = document.createElement('img');
        img.src = 'https://static.wikia.nocookie.net/jujutsuawakeningminecraft/images/f/fd/VerifiedCheck.png/revision/latest?cb=20250807104529';
        img.style.width = '18px';
        img.style.height = '18px';
        img.style.marginRight = '6px';
        img.style.verticalAlign = 'middle';
        header.prepend(img);
        header.dataset.verifiedCheckAdded = "true";
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
});