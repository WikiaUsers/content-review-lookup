// Function to remove target="_blank" from anchor tags
function removeBlankTargets() {
  let anchorTags = document.querySelectorAll('a');
  anchorTags.forEach(anchor => {
    if (anchor.getAttribute('target') === '_blank') {
      anchor.removeAttribute('target');
    }
  });
}

// Initial run to handle already existing links
removeBlankTargets();

// Create a MutationObserver to watch for changes in the DOM
let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      // Check if the added node is an anchor tag
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
        if (node.getAttribute('target') === '_blank') {
          node.removeAttribute('target');
        }
      }
    });
  });
});

// Start observing the DOM for added nodes
observer.observe(document.body, { childList: true, subtree: true });

console.log('All target="_blank" attributes have been removed.');
console.log('Observer is now watching for new links to remove target="_blank".');