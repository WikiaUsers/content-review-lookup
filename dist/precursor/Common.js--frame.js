/* Any JavaScript here will be loaded for all users on every page load. */


/** <pre>
 * 3D model embedder
 * Author: JohnnyMccrum
 * Injects an iframe which can be used to display Artstation 3D models.
 * See http://Precursor.fandom.com/wiki/Template:frame for further documentation
 */
 

;(function ($, document) {

    'use strict';

    function injectModel() {
        var tags = $('.frame'),
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
            iframe.src = 'https://www.artstation.com/embed/' + contents[0];
            iframe.height = contents[1];
            iframe.width = contents[2];
            iframe.frameborder = 0;
            iframe.webkitallowfullscreen = "true";
            iframe.allowfullscreen;
            iframe.scrolling = "no";
            iframe.onmousewheel = "";

            $(tags[i]).html(iframe);
            // reverse the display:none; set in the template
            $(tags[i]).show();
        }

        // hide the original link as there's already one in the player
        $('.original-link').hide();
    }

    $(function () {
        injectModel();
    });

}(this.jQuery, this.document));

/* </pre> */