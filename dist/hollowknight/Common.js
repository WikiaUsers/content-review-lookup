/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
	var wgUserGroups = mw.config.get('wgUserGroups');

	if (wgUserGroups.includes('content-moderator') ||
		wgUserGroups.includes('sysop') ||
		wgUserGroups.includes('bureaucrat')) {
		importArticle({ article: 'MediaWiki:Group-sysop.js' });
	}
	
	/*
	** This script replaces all images in [[Template:HK Nav Charms]] for a single
	** atlas image that contains all charms' sprites and use the image's position
	** to display each charm in a <div> that replaces the original image.
	**
	** This is to reduce the amount of network requests and save data when
	** opening the navbox and loading all sprites.
	*/
	
	mw.hook('wikipage.content').add(function() {
	    const navboxCharms = document.querySelectorAll('#charms-nav');
	
	    if (!navboxCharms) return;
	
	    const navboxImages = document.querySelectorAll('#charms-nav img'),
	          navboxSelfUrl = document.querySelector('#charms-nav td > center > strong'),
	          shrinkFactor = 5,
	          atlasWidth = 1260,
	          atlasUrl = 'https://static.wikia.nocookie.net/hollowknight/images/8/80/Charms-atlas.webp/revision/latest/scale-to-width-down/' + (atlasWidth / shrinkFactor) + '?cb=20230225215802',
	          floor = Math.floor,
	          imageCellWidth = 180 / shrinkFactor,
	          imageCellHeight = 162 / shrinkFactor,
	          imageRows = 7,
	          imageColumns = 7,
	          imageOffsetX = 3,
	          imageOffsetY = 2,
	          head = document.head,
	          navboxCss = '<style class="charm-nav-styles">\
	.charm-nav-img {\n\
	    background-image: url(' + atlasUrl + ');\n\
	    background-repeat: no-repeat;\n\
	    display: inline-block;\n\
	    height: 30px;\n\
	    width: 30px;\n\
	}\n\
	\n\
	#charms-nav td a {\n\
	    align-items: center;\n\
	    display: flex !important;\n\
	    gap: 8px;\n\
	}\n\
	\n\
	.selflink {\n\
	    color: var(--theme-page-text-color);\n\
	    font-weight: 700;\n\
	}\n\
	\n\
	.selflink:hover {\n\
	    color: var(--theme-page-text-color);\n\
	    text-decoration: none;\n\
	    text-shadow: none;\n\
	}\
	        </style>';
	
	    head.insertAdjacentHTML('beforeend', navboxCss);
	
	    // Remove useless elements from table cells.
	    if (document.querySelector('#charms-nav .center') || document.querySelector('#charms-nav br')) {
	        document.querySelectorAll('#charms-nav .center, #charms-nav br').forEach(function(e) {
	            e.remove();
	        });
	    }
	
	    // Update self link in navbox to be an actual link with no function.
	    // This way the image updater script below works properly.
	    if (navboxSelfUrl) {
	        const selfUrlText = navboxSelfUrl.textContent,
	              selfUrlAnchor = document.createElement('a');
	
	        selfUrlAnchor.setAttribute('title', selfUrlText);
	        selfUrlAnchor.classList.add('mw-selflink', 'selflink');
	        selfUrlAnchor.textContent = selfUrlText;
	        navboxSelfUrl.insertAdjacentElement('afterend', selfUrlAnchor);
	        navboxSelfUrl.remove();
	    }
	
	    // Now that the self link is an actual link, select all links in the navbox.
	    const navboxUrls = document.querySelectorAll('#charms-nav td a');
	
	    // Delete the previous images.
	    navboxImages.forEach(function removeImages(image) {
	        image.remove();
	    });
	
	    // Add a new image using an atlas in which all Charms are in. This
	    // decreases data usage.
	    navboxUrls.forEach(function addNewImages(url) {
	        const index = Array.from(navboxUrls).indexOf(url),
	              newImage = document.createElement('div');
	
	        newImage.classList.add('charm-nav-img');
	        newImage.style.backgroundPosition = ((cellRowNum(index) * -imageCellWidth) - imageOffsetX) + 'px ' + ((floor(index / imageColumns) * -imageCellHeight) - imageOffsetY) + 'px';
	
	        url.prepend(newImage);
	    });
	
	    function cellRowNum(i) {
	        if (isNaN(i) || !Number.isInteger(i)) {
	            throw new Error('Invalid input: expected an integer but instead got "' + i + '".');
	        } else {
	            return Math.abs(i) % imageColumns;
	        }
	    }
	});
}());