(function($) {
    $(function(){
       function niheaderToggler_handler(e) {
            $(e.target).parents('.portable-infobox').toggleClass('pi-collapse-open pi-collapse-closed');
        } //niheaderToggler_handler

        function niheaderToggler(){
            //toggle portable infobox header. only. works under wiki-collapsible classes
            if (window.niheaderToggler) return;
            window.niheaderToggler=true;
            var ne=$('.portable-infobox'); //infoboxes
            var ni=0;
            ne.addClass('pi-collapse');
            for (ni=0; ni<ne.length; ni++) {
                //add .pi-header. 4 collapse\expand marker
                //wrapInner to prevent style overlapping (pi-title>>pi-header)
                //causes visual glitches (double pi-title?) on new engine. also, seems like not needed anymore
                //$(ne[ni]).find('.pi-title').addClass('pi-header').wrapInner('<span class="pi-title" />');
                //wrap title to make it possible
                $(ne[ni]).children(':first').wrap('<span id="nihTogglerWrap1" class="nihTogglerWrap1 pi-header pi-item pi-collapse pi-collapse-open pi-title"></span>').on('click', niheaderToggler_handler);
            }
            return;
        } //niheaderToggler
        
        //attach toggler
        niheaderToggler();
    });
}(jQuery));