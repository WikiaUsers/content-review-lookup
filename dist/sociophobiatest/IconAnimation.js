var favicon_images = [
                    'https://vignette.wikia.nocookie.net/shwin/images/1/15/Favicon1.ico/revision/latest?cb=20191001152136&path-prefix=ru',
                    'https://vignette.wikia.nocookie.net/shwin/images/6/6f/Favicon2.ico/revision/latest?cb=20191001152137&path-prefix=ru',
                    'https://vignette.wikia.nocookie.net/shwin/images/3/3c/Favicon3.ico/revision/latest?cb=20191001152137&path-prefix=ru',
                    'https://vignette.wikia.nocookie.net/shwin/images/6/60/Favicon4.ico/revision/latest?cb=20191001152138&path-prefix=ru',
                    'https://vignette.wikia.nocookie.net/shwin/images/c/c3/Favicon5.ico/revision/latest?cb=20191001152138&path-prefix=ru',
                    'https://vignette.wikia.nocookie.net/shwin/images/9/90/Favicon6.ico/revision/latest?cb=20191001152139&path-prefix=ru'
                ],
    image_counter = 0; // To keep track of the current image

setInterval(function() {
    $("link[rel='icon']").remove();
    $("link[rel='shortcut icon']").remove();
    $("head").append('<link rel="icon" href="' + favicon_images[image_counter] + '" type="image/x-icon">');
    
	// If last image then goto first image
	// Else go to next image    
	if(image_counter == favicon_images.length-1)
        image_counter = 0;
    else
        image_counter++;
}, 30);