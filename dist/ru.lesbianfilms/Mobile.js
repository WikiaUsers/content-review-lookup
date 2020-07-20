/* Ratings/Stars widget code
      You can add more Rating-Widgets in your site,
      just pick some new rating-widget-unique-id (must be positive integer).
      For example (rating-widget-unique-id = 38):
      <div class="rw-ui-container rw-urid-38"></div>
    IMPORTANT: The number must be unique across the entire wiki. [One number = one page]
 */
jQuery(function($) {
        "use strict";
 
        // Disable on pages without a ratings widget, since it just crashes.
        if (!$('.rw-ui-container').length) return;
 
        // Async Rating-Widget initialization.
        window.RW_Async_Init = function(){
            RW.init("3EF30964ECAA60A1E8218D6BECF45ED7",
            {
                advanced: {
                    star: {
                        stars: 5
                    },
                    font: {
                            hover: {
                                color: "#8a888a"
                            },
                            color: "#000000"
                    },
 
                    layout: {
                        align: {
                            hor: "right",
                            ver: "middle"
                        },
                         dir: "ltr"
                    },
                    text: {
                            rateAwful: "Ниже критики",
                            ratePoor: "Так себе",
                            rateAverage: "Неплохой",
                            rateGood: "Хороший",
                            rateExcellent: "Отличный",
                            rateThis: "Оцени фильм",
                            vote: "голос",
                            votes: "голосов"
                    }
                },
                lng: "ru",
                theme: "star_quartz",
                size: "tiny",
                color: "yellow",
                type: "star"
            });
            RW.render();
        };
 
        // Append Rating-Widget JavaScript library.
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