 
/* Portable infoboxes colors */
(function(){
    var infobox = $('.portable-infobox');
    if (infobox.length) {
        var color = '',
        classNames = infobox.attr('class').split(' ');
        for (var i = 0; i < classNames.length; i++) {
            if (classNames[i].indexOf('pi-theme-_') !== -1) {
                color = classNames[i].replace('pi-theme-_', '');
                break;
            }
        }
 
        if (color) {
            infobox.css('border', '4px solid #' + color);
           
 
        }
    }
})();