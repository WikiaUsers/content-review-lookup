//YouTube video embedder
//Injects an iframe, rather than uploading the video to Wikia's video library
//See precursor.fandom.com/wiki/Template:Youtube for further documentation

 
;(function ($, document) {
 
    'use strict';
 
    function injectVideo() {
        var tags = $('.youtube'),
            i,
            contents,
            iframe;
 
        if (tags.length === 0) {
            return;
        }
 
        for (i = 0; i < tags.length; i += 1) {
            contents = $(tags[i]).html().split('|');
 
            // for no arguments in template use
            if (contents[0] === 'ERROR') {
                return;
            }
 
            iframe = document.createElement('iframe');
            iframe.src = 'http://www.youtube.com/embed/' + contents[0];
            iframe.height = contents[1];
            iframe.width = contents[2];
 
            $(tags[i]).html(iframe);
            // reverse the display:none; set in the template
            $(tags[i]).show();
        }
 
        // hide the original link as there's already one in the player
        $('.original-link').hide();
    }
 
    $(function () {
        injectVideo();
    });
 
}(this.jQuery, this.document));
 
/* </pre> */