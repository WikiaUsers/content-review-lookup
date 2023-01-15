/*
 *	Adds the file names to the gallery captions on Special:NewFiles
 */

// Make sure we're on the right page
if(document.body.classList.contains('page-특수_새파일')) {
	// Loop over each file
	document.querySelectorAll('#gallery-0 .wikia-gallery-item').forEach(function(item) {
		// add "by" prefix to existing uploader link to make the two links distinguishable
		var caption = item.querySelector('.lightbox-caption');
		var oldLink = caption.querySelector(':scope > a:first-child');
		var oldLinkWrapper = document.createElement('span');
		oldLinkWrapper.textContent = 'by ';
		oldLinkWrapper.appendChild(oldLink);
		caption.prepend(oldLinkWrapper);
		
		// Get the metadata
		var imageLink = item.querySelector('.thumb .image.lightbox').getAttribute('href');
		var imageName = item.querySelector('.thumb img.thumbimage').getAttribute('data-image-name');

		// Create our new link
		var newLink = document.createElement('a');
		newLink.textContent = imageName;
		newLink.setAttribute('title', imageName);
		newLink.setAttribute('href', imageLink);
		newLink.style.display = 'block';
		newLink.style.whiteSpace = 'nowrap';
		newLink.style.overflow = 'hidden';
		newLink.style.textOverflow = 'ellipsis';
		caption.prepend(newLink);
	});
}