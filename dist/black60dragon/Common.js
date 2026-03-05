

/* ==================================================
    MediaWiki:ArticleRates.js
================================================== */

/* Pages to exclude from article ratings (use underscores for spaces) */
window.ArticleRatesExcludePages = [
    "Test",
    "Rin_Tohsaka",
    "Class_S",
    "Girls'_Love",
    "Home",
    "Yuri_(genre)",
    "Yuri_Wiki",
];







(function () {
  'use strict';

  function upgradeGalleryToHD() {
    const server = mw.config.get('wgServer') || window.location.origin;

    document.querySelectorAll('.gallery img, .wikia-gallery img, .gallerybox img').forEach(img => {
      if (img.dataset.hdUpgraded) return;

      let fileName = '';

      // Best: Parse filename from thumb src path (Fandom standard format)
      if (img.src && img.src.includes('/images/')) {
        // Split path and find part before /revision or /scale-to-width or ?cb
        const pathParts = img.src.split('/');
        for (let i = pathParts.length - 1; i >= 0; i--) {
          const part = pathParts[i];
          if (part.includes('.')) { // has extension
            if (part.includes('revision') || part.includes('scale-to-width') || part.includes('?')) {
              continue;
            }
            fileName = decodeURIComponent(part.split('?')[0].split('#')[0]);
            break;
          }
        }
      }

      // Fallback 1: From parent <a> href="/wiki/File:Filename.ext"
      if (!fileName) {
        const link = img.closest('a');
        if (link && link.href.includes('/wiki/File:')) {
          const match = link.href.match(/\/wiki\/File:([^?#]+)/i);
          if (match && match[1]) fileName = decodeURIComponent(match[1]);
        }
      }

      // Fallback 2: alt or title (sometimes filename)
      if (!fileName) fileName = (img.alt || img.title || '').trim();

      if (!fileName || !fileName.includes('.')) {
        console.warn('[HD Gallery] Extraction failed for img with src:', img.src);
        return;
      }

      const fullResSrc = server + '/wiki/Special:FilePath/' + encodeURIComponent(fileName);

      const oldSrc = img.src;
      img.src = fullResSrc + '?format=original'; // extra param for max quality if needed
      img.dataset.hdUpgraded = 'true';

      console.log('[HD Gallery] Success swap:', oldSrc.substring(0, 80) + '... → ' + fullResSrc);
    });

    // Thumb size calc (your logic)
    document.querySelectorAll('.gallery, .wikia-gallery').forEach(gal => {
      if (gal.dataset.hdSized) return;

      const width = gal.getBoundingClientRect().width || 600;
      const minThumb = 120;
      const gap = 8;
      const cols = Math.max(1, Math.floor(width / (minThumb + gap)));
      const scaleFactor = 1.5;
      const thumb = Math.floor((width - gap * (cols - 1)) / cols * scaleFactor);

      gal.style.setProperty('--thumb', thumb + 'px');
      gal.dataset.hdSized = 'true';
    });
  }

  // Run multiple times to catch lazy-loaded or dynamic content
  upgradeGalleryToHD();
  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(upgradeGalleryToHD);
  }
  setTimeout(upgradeGalleryToHD, 500);
  setTimeout(upgradeGalleryToHD, 1500);
  setTimeout(upgradeGalleryToHD, 3000); // for slow loads

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(upgradeGalleryToHD, 200);
  });
})();