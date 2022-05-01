/*
    An AJAX function for generating random page links with the first image from that page
    Bypasses caching so you get a new random page each refresh (use sparingly)
    
    Tested on: Chrome, Firefox, Edge
    
    Usage:
    On the container of your template have attribute data-template="get-page-with-image"
    If you want your random page from a category then have attribute data-category="YOUR CATEGORY"
    To exclude pages with a certain category then use the attribute data-exclude-category="EXCLUDED CATEGORY" (only works together with data-category)
    The first image alphabetically is chosen, but you can restrict this to images with a certain category using data-image-category="IMAGE CATEGORY"
    Within your template anything with these attributes will be modified (recommend using DIVs):
    data-image - replaced with the image
    data-title - innerText will become page title
    data-link - replaced with a link to the page
    data-remove - deleted (use as a placeholder)
    data-show - will have CSS display cleared (set anything with this to display: none)
    
    Example:
    <div data-template="get-page-with-image" data-category="Powers" data-image-category="">
        <div data-remove>
            Please Wait...
        </div>
        <div data-show data-link style="display: none;">
            <div data-image style="width: 300px;"></div>
            <div data-title></div>
        </div>
    </div>
*/
(function() {
    // check if compatible template exists on page
    var randomTemplates = $('[data-template="get-page-with-image"]');
    if(randomTemplates.length > 0) {
        var process = function(container, page, image) {
            // Preload image for smoother UX
            var preloadImage = new Image();
            preloadImage.onload = function() {
                // Once image has loading fill content into template
                // image
                $(container).find('[data-image]').each(function() {
                    var img = this;
                    if(img.tagName != 'IMG') {
                        var newImg = document.createElement('img');
                        for(i = 0; i < img.attributes.length; i++) {
                            var a = img.attributes[i];
                            newImg.setAttribute(a.name, a.value);
                        }
                        img.parentNode.replaceChild(newImg, img);
                        img = newImg;
                    }
                    img.setAttribute('src', preloadImage.src);
                });
                // link to page
                $(container).find('[data-link]').each(function() {
                    var link = this;
                    if(link.tagName != 'A') {
                        var newLink = document.createElement('a');
                        newLink.innerHTML = link.innerHTML;
                        for(i = 0; i < link.attributes.length; i++) {
                            var a = link.attributes[i];
                            newLink.setAttribute(a.name, a.value);
                        }
                        link.parentNode.replaceChild(newLink, link);
                        link = newLink;
                    }
                    link.setAttribute('href', '/wiki/' + page); 
                });
                // page title
                $(container).find('[data-title]').each(function() {
                   this.innerText = page; 
                });
                // remove any placeholder content
                $(container).find('[data-remove]').each(function() {
                   $(this).remove(); 
                });
                // show the hidden content
                $(container).find('[data-show]').each(function() {
                   this.style.display = ''; 
                });
            };
            preloadImage.src = '/wiki/Special:Filepath/' + (image.title.replace(/^(File:\.)/,'').replace(' ', '_'));
        };

        var getFirstWithImage = function(container, pages, excludeCategory, imageCategory) {
            // From list of pages, find the first one with an image on it
            var pageArray = [];
            $(pages).each(function() {
                pageArray.push(this.title.replace(' ', '_'));
            });
            var pageString = pageArray.join('|');

            $.ajax({
                url: '/api.php',
                data: { action: 'query', titles: pageString, prop: 'images' + (excludeCategory ? '|categories' : ''), imlimit: 500, cllimit: 500, format: 'json' },
                dataType: 'jsonp',
                success: function(x) {
                	// If we are looking for an image category
                	if(typeof imageCategory === 'string'
                    && imageCategory.length > 0) {
                    	// Pre-filter the list of pages to those with images
                    	var eligiblePages = Object.values(pages).filter(function(page) {
                    		if(!x.query.pages[page.pageid]
	                    	|| typeof x.query.pages[page.pageid].images === 'undefined'
	                    	|| x.query.pages[page.pageid].images.length <= 0) {
	                           return false;
	                    	}
	                    	
	                    	if(excludeCategory
	                    	&& typeof x.query.pages[page.pageid].categories !== 'undefined') {
	                    		if(x.query.pages[page.pageid].categories.some(function(category) {
	                    			return category.title === 'Category:' + excludeCategory;
	                    		})) {
	                    			return false;
	                    		}
	                    	}
	                    	
	                    	return true;
                    	}).map(function(page) {
                    		return x.query.pages[page.pageid];
                    	});

						// Get a list of unique image names
						var allImages = [].concat.apply([], eligiblePages.map(function(page) {
                    		if(typeof page.images === 'undefined') {
                    			return [];
                    		}
                    		
                    		return page.images.map(function(image) {
                    			return image.title;
                    		});
                    	})).filter(function (x, i, a) { 
						    return a.indexOf(x) == i; 
						});

                    	// Get categories for the images
                    	$.ajax({
                			url: '/api.php',
                			data: { action: 'query', titles: allImages.join('|'), prop: 'categories', cllimit: 500, format: 'json' },
                			dataType: 'jsonp',
                			success: function(y) {
                				// Filter the images to those with our category
                				var validImages = Object.values(y.query.pages).filter(function(image) {
                					return typeof image.categories !== 'undefined'
                					&& image.categories.some(function(category) {
                						return category.title === 'Category:' + imageCategory;
                					});
                				}).map(function(image) {
                					return image.title;
                				});

								// Get the first page with one of the valid images
                				if(!eligiblePages.some(function(page) {
                					var pageValidImages = Object.values(page.images).map(function(image) {
                						return image.title;
                					}).filter(function(image) {
                						return validImages.includes(image);
                					});
                					
                					if(pageValidImages.length <= 0) {
                						return false;
                					}
                					
                					process(container, page.title, { title: pageValidImages[0] });
	                    			return true;
	                    		})) {
	                        		console.error('No pages with images found');
	                    		}
                			},
                    	});
                    // If we are not looking for an image category 
                    } else {
                    	// Loop pages until we find one with images
	                    if(!pages.some(function(page) {
	                    	if(!x.query.pages[page.pageid]
	                    	|| typeof x.query.pages[page.pageid].images === 'undefined'
	                    	|| x.query.pages[page.pageid].images.length <= 0) {
	                           return false;
	                    	}
	                    	
	                    	if(excludeCategory
	                    	&& typeof x.query.pages[page.pageid].categories !== 'undefined') {
	                    		if(x.query.pages[page.pageid].categories.some(function(category) {
	                    			return category.title === 'Category:' + excludeCategory;
	                    		})) {
	                    			return false;
	                    		}
	                    	}
	
	                    	process(container, page.title, x.query.pages[page.pageid].images[0]);
	                    	return true;
	                    })) {
	                        console.error('No pages with images found');
	                    }
                    }
                },
                error: function() {
                    console.error('Failed to get images from pages');
                }
            });
        };

        var withCategory = function(container, category, excludeCategory, imageCategory) {
            // Get list of pages in category
            // Limit to 500 (max for a single request) for future-proofing
            // Choose order ascending/descending randomly because api doesn't allow random sorting
            var dir = [ 'asc', 'desc' ][Math.floor(Math.random() * 2)];
            $.ajax({
                url: '/api.php',
                data: { action: 'query', list: 'categorymembers', cmtitle: 'Category:'+category, cmlimit: 500, cmdir: dir, format: 'json' },
                dataType: 'jsonp',
                success: function(x) {
                    // Return a random 10 pages from result
                    getFirstWithImage(container, Object.values(x.query.categorymembers).filter(function(page) {
                        return page.ns === 0;
                    }).sort(function() {
                        return 0.5 - Math.random();
                    }).slice(0, (excludeCategory || imageCategory) ? 30 : 10), excludeCategory, imageCategory);
                },
                error: function() {
                    console.error('Failed to get category page list');
                }
            });
        };
        
        var withoutCategory = function(container, imageCategory) {
            // Get a list of any pages
            $.ajax({
                url: '/api.php',
                data: { action: 'query', list:'random', rnnamespace: 0, rnlimit: 10, format: 'json' },
                dataType: 'jsonp',
                success: function(x) {
                    getFirstWithImage(container, x.query.random, null, imageCategory);
                },
                error: function() {
                    console.error('Failed to get page list');
                }
            });
        };
        
        randomTemplates.each(function() {
            var category = $(this).attr('data-category');
            var excludeCategory = $(this).attr('data-exclude-category');
            var imageCategory = $(this).attr('data-image-category');
            if(category) {
                withCategory(this, category, excludeCategory, imageCategory);
            } else {
                withoutCategory(this, imageCategory);
            }
        });
    }
})();