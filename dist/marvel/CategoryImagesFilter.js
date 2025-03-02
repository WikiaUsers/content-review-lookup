/* code for filtering images in categories by type and/or year */
$(function category_gallery_image_add_type_and_year() {
    if ( mw.config.get('wgCanonicalNamespace') === 'Category' && document.querySelectorAll('.wikia-gallery-item').length > 0)
    {
    	var sorting_options = ['Cover', 'Textless', 'Variant', 'Interior', 'Character', 'Item', 'Location', 'Organization', 'Race', 'Reality', 'Scene', 'Team', 'Vehicle'];
    	var all_images = [];
    	var image_name;
    	var gallery_items = document.querySelectorAll('.wikia-gallery-item');
    	for (i = 0; i < gallery_items.length; i++) {
    		image_name = gallery_items[i].querySelector('.thumb .gallery-image-wrapper a img').dataset.imageName;
    		all_images.push( 'File:' + encodeURIComponent(image_name) );
    		var gi_div = document.createElement("div");
			gi_div.classList.add('lightbox-caption');
			gi_div.classList.add('md-cat-gi-caption');
			gi_div.textContent = image_name;
			gallery_items[i].querySelector('.thumb').after(gi_div);
		}
		var requests = [all_images.slice(0, 50), all_images.slice(50, 100), all_images.slice(100, 150), all_images.slice(150)];
	    $.each(requests, function(index, value) {
	        $.getJSON(
	            '/api.php?action=query&prop=pageprops&ppprop=defaultsort&format=json&titles=' + value.join('|'),
	            function(data) {
	                data = data.query.pages;
	               /* document.querySelector('.mw-parser-output').textContent = document.querySelector('.mw-parser-output').textContent + 'REQUEST' + index + ' = ' + JSON.stringify(data);*/
	                $.each(Object.keys(data), function(idx, val) {
	                    if (!data[val].pageprops) {
	                        return true;// continue
	                    }
	                    var sort = data[val].pageprops.defaultsort;
	                    var title = data[val].title;
	                    var img_type = sort.match(/IMAGETYPE:(.+);.+/);
	                    var img_year = sort.match(/IMAGEYEAR:(.+);/);
	                    for (i = 0; i < gallery_items.length; i++) {
	                    	var gi_caption = gallery_items[i].querySelector('.md-cat-gi-caption');
				    		if ( 'File:' + gi_caption.textContent == title ) {
								gi_caption.classList.add('md-cat-gi-caption-' + img_year[1]);
								for (j = 0; j < sorting_options.length; j++) {
					    			if (img_type[1].includes(sorting_options[j])) {
					    				gi_caption.classList.add('md-cat-gi-caption-' + sorting_options[j].toLowerCase() );
					    			} 
					    		}
				    		}
						}
	                });
	            }
	        );
	    });
    }
});

$(function category_gallery_image_filter() {
    if ( mw.config.get('wgCanonicalNamespace') === 'Category' && document.querySelectorAll('.wikia-gallery-item').length > 0) 
    {
    	var sorting_options = ['all', 'cover', 'textless', 'variant', 'interior', 'character', 'item', 'location', 'organization', 'race', 'reality', 'scene', 'team', 'vehicle'];
    	var gallery_sorting = document.createElement('span');
    	for (i = 0; i < sorting_options.length; i++) {
    		var gs = document.createElement('input');
			gs.setAttribute('type', 'radio');
			gs.setAttribute('id', 'md_cat_' + sorting_options[i]);
	        gs.setAttribute('name', 'md_cat_sorting');
	        gs.setAttribute('value', 'md_cat_' + sorting_options[i]);
	        if (i == 0) {
	        	gs.setAttribute('checked', 'checked');
	        } else if (i == 4) {
	        	gs.classList.add('md-cat-sorting');
	        }
	        var gs_label = document.createElement('label');
	        gs_label.setAttribute('for', 'md_cat_' + sorting_options[i]);
	        gs_label.textContent = sorting_options[i];
	        
	        gallery_sorting.appendChild(gs);
        	gallery_sorting.appendChild(gs_label);
    	}
    	
    	var gs_year = document.createElement('input');
    	gs_year.setAttribute('type', 'text');
		gs_year.setAttribute('id', 'md_cat_year');
		gs_year.setAttribute('name', 'md_cat_year');
		gs_year.setAttribute('minlength', '4');
		gs_year.setAttribute('maxlength', '4');
		gs_year.setAttribute('size', '5');
		var gs_year_label = document.createElement('label');
	    gs_year_label.setAttribute('for', 'md_cat_year');
	    gs_year_label.textContent = 'Year:';
	    gs_year_label.classList.add('md-cat-sorting');

        var gs_button = document.createElement('button');
		gs_button.innerHTML = 'Show';
		gs_button.classList.add('md-cat-sorting');
		gs_button.onclick = function(){
    		var gs_button_rb = document.getElementsByName('md_cat_sorting');
    		var gs_year_value = document.querySelector('#md_cat_year').value;
            for (i = 0; i < gs_button_rb.length; i++) {
                if (gs_button_rb[i].checked) {
                	var gs_button_rb_checked = gs_button_rb[i].value.slice(7);
                	var gallery_items = document.querySelectorAll('.wikia-gallery-item');
					var ge_index = 0;
					var ge_image_name;
					for (ge_index = 0; ge_index < gallery_items.length; ge_index++) {
						var ge = gallery_items[ge_index];
						var ge_caption = ge.querySelector('.lightbox-caption');
						
						if (gs_button_rb_checked == 'all') {
							ge.classList.add('md-cat-gi-show');
						    ge.classList.remove('md-cat-gi-hidden');
						} else {
							if (ge_caption.classList.contains("md-cat-gi-caption-" + gs_button_rb_checked )) {
								if (gs_year_value.length > 0) {
									if (ge_caption.classList.contains("md-cat-gi-caption-" + gs_year_value ) ) {
										ge.classList.add('md-cat-gi-show');
										ge.classList.remove('md-cat-gi-hidden');
									} else {
										ge.classList.remove('md-cat-gi-show');
									    ge.classList.add('md-cat-gi-hidden');
									}
								} else {
									ge.classList.add('md-cat-gi-show');
									ge.classList.remove('md-cat-gi-hidden');
								}
							} else {
								ge.classList.remove('md-cat-gi-show');
							    ge.classList.add('md-cat-gi-hidden');
							}
						} 
					}
                }
            }
		};
		gallery_sorting.appendChild(gs_year_label);
		gallery_sorting.appendChild(gs_year);
        gallery_sorting.appendChild(gs_button);
    	document.querySelector('#mw-category-media').querySelector('p').after(gallery_sorting);
    }
});