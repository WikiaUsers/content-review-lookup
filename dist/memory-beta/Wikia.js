/* Re-add proper namespace prefix to titles where it has been removed "by design" */
$('.ns-6 .WikiaPageHeader h1').prepend('File:');
$('.ns-10 .WikiaPageHeader h1').prepend('Template:');

/* Remove image attribution as per new Wikia regulations */
$('.picture-attribution').remove();