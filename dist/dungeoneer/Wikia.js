
    var checkExist = setInterval(function() {
         if ($('.chat-module').length) {
             $(".chat-module").append("<iframe src=\"https://discordapp.com/widget?id=149845206240329728&amp;theme=dark\" width=\"100%\" height=\"400\" allowtransparency=\"true\" frameborder=\"0\" style=\"margin-top:10%;\"></iframe>");
             clearInterval(checkExist);
         }
    }, 100);  
    var checkExist2 = setInterval(function() {
         if ($('.mcf-mosaic .mcf-column:nth-child(2) .mcf-card-article__link:nth-child(1)').length) {
            $(".mcf-mosaic .mcf-column:nth-child(2) .mcf-card-article__link:nth-child(1)").replaceWith("<iframe src=\"https://discordapp.com/widget?id=149845206240329728&amp;theme=dark\" width=\"100%%\" height=\"400\" allowtransparency=\"true\" frameborder=\"0\"></iframe>");
            clearInterval(checkExist2);
         }
    }, 100);