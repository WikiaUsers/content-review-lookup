//TwitterWidget
(function($){
    "use strict";
    $(window).load(function(){
        if (wgPageName == "Thông_tin_cập_nhật" || wgPageName == "Hướng_dẫn_đăng_ký" ){
            $('<section class="module" id="TwitterWidget"><h1>Twitter chính thức</h1><p><a class="twitter-timeline"  href="https://twitter.com/KanColle_STAFF" data-widget-id="677434427794849793">Tweet của @KanColle_STAFF</a></p></section>').insertAfter("section.WikiaActivityModule");

            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
        }
    });
}(jQuery));