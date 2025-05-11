/* Any JavaScript here will be loaded for all users on every page load. */
/*Video autoplay snippet*/
function enableAutoplay(video) {
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('loop', '');

  if (video.readyState >= 2) {
    video.play().catch(console.warn);
  } else {
    video.addEventListener('canplay', () => video.play().catch(console.warn), { once: true });
  }
}

// Initial run
document.querySelectorAll('.autoplay-container video').forEach(enableAutoplay);

// MutationObserver for videos added later
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return; // Only process elements

      if (node.matches('.autoplay-container video')) {
        enableAutoplay(node);
      }

      if (node.querySelectorAll) {
        node.querySelectorAll('.autoplay-container video').forEach(enableAutoplay);
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });