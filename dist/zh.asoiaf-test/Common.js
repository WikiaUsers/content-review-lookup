// Credits to the Merlin and Munkapedia wikis. Thanks!
// 
// WARNING: THIS CODE IS SPECIFIC TO A SONG OF ICE AND FIRE WIKI.
// IF COPIED, IT WILL RESULT IN OUR RATINGS MIXING.
// If you want to use it for your own wiki, please contact one of the admins here
// and we will gladly help you generate your own user ID.
 
jQuery(function($) {
        "use strict";
        for (var i = 0; i < 40000; i++){
            var rwui = document.createElement('div');
            rwui.className = 'rw-ui-container rw-urid-'+i;
            document.body.appendChild(rwui);
        }
 
        //if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
            RW.init("8d13adad45c98f364c0fd493168fa2ab");
            RW.render();
            console.log("start");
            var list = [];
            console.log(RW.getRating(731));
            for (var i = 0; i < 40000; i++){
                var myRating = RW.getRating(i);
                if(myRating != null && myRating.votes > 10){
                    console.log("votes>10");
                    list.push(i,myRating.votes/myRating.rate);
                }
            }
            console.log("length: "+list.length);
            list.sort(function(a,b){
                a = a[1];
                b = b[1];
                return a < b ? -1 : (a > b ? 1 : 0);
            });
            for (var k = 0; k < list.length; k++){
                var key = list[k][0];
                var value = list[k][1];
                console.log("article: "+key+ " rating: "+value );
            }
        };
 
        if (typeof(window.RW) === "undefined"){
            // <div class="rw-js-container"> (Part of the interface contract)
            var rw = document.createElement('div');
            rw.className = 'rw-js-container';
            var rw2 = document.createElement("script");
            rw2.type = "text/javascript";
            rw2.src = "http://js.rating-widget.com/external.min.js?t=js";
            rw.appendChild(rw2);
            document.body.appendChild(rw);
        }
});