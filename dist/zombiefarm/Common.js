importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('HideRail/code.js', 'dev');
importScriptPage('BackToTopArrow/code.js', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('RevealAnonIP/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');

mw.hook('wikipage.content').add(function ($content) {
  $content.find('.zf-itembox .zf-mainimg img, .zf-itembox .zf-mainimg img.mw-file-element').each(function () {
    var img = this;

    function lock() {
      var w = img.getBoundingClientRect().width;
      if (w && w > 0) {
        img.style.width = w + 'px';
        img.style.maxWidth = w + 'px';
      }
    }

    if (img.complete) {
      lock();
    } else {
      img.addEventListener('load', lock, { once: true });
    }

    window.addEventListener('scroll', lock, { passive: true });
    window.addEventListener('resize', lock, { passive: true });
  });
});