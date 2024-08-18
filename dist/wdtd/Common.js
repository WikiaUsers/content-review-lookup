//Add border color to infoboxes
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});
//Retrieve original infobox from source page
var infobox =$('.portable-infobox');
var title = $('title')[0].innerHTML;
$('.local-infobox').load(title + ' ' + infobox);

// Preload file description //
PFD_templates = '{{Notice\n| header = \n| text = \n}}';