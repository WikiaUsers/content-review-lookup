document.querySelectorAll('.wikia-gallery-item').forEach((item, i) => {
  try {
    const wrapper = item.querySelector('.gallery-image-wrapper');
    if (!wrapper) {
      console.error(`Item ${i}: No .gallery-image-wrapper found`);
      return;
    }

    const img = wrapper.querySelector('img');
    const fileLink = wrapper.querySelector('a');
    if (!img) {
      console.error(`Item ${i}: No <img> found`);
      return;
    }
    if (!fileLink) {
      console.error(`Item ${i}: No <a> link found`);
      return;
    }

    // Skip if already has caption
    if (item.querySelector('.lightbox-caption')) {
      console.log(`Item ${i}: Already has caption, skipped`);
      return;
    }

    // Extract page name
    let fileName = img.dataset.imageName || img.getAttribute('data-image-key');
    if (!fileName) {
      console.error(`Item ${i}: Could not find data-image-name or data-image-key`);
      return;
    }

    let baseName = fileName.replace(/\.[^.]+$/, '');
    let pageName = baseName.replace(/_/g, ' ');
    let wikiHref = '/wiki/' + baseName;

    // Update link
    fileLink.href = wikiHref;
    fileLink.title = pageName;
    fileLink.className = 'image link-internal';

    // Update img
    img.alt = pageName;
    img.title = pageName;

    // Add caption
    const captionDiv = document.createElement('div');
    captionDiv.className = 'lightbox-caption';
    captionDiv.style.width = img.width + 'px';

    const captionLink = document.createElement('a');
    captionLink.href = wikiHref;
    captionLink.title = pageName;
    captionLink.textContent = pageName;

    captionDiv.appendChild(captionLink);
    item.appendChild(captionDiv);

    console.log(`Item ${i}: Converted successfully → ${pageName}`);

  } catch (err) {
    console.error(`Item ${i}: Unexpected error`, err);
  }
});