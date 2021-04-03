/* 
 * Any JavaScript here will be loaded for all users (both desktop and mobile) on every page load.
 * 
 * Desktop-only scripts should go in [[MediaWiki:Common.js]]
 * Mobile-only scripts should go in [[MediaWiki:Mobile.js]].
 */

( function() {
    "use strict";
    
    /* Keep variables in one namespace to prevent from creating new variable that may interfere with the global space */
    var ttw = window.ttw = {};
    
    /* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
    mw.hook( "wikipage.content" ).add( function( $wikipageContent ) {
        /* Basic Dropdown */
        $( ".js-dropdown" ).click( function() {
            $( this ).toggleClass( "active" );
        });

        $( document ).click( function(e) {
            const $target = $(e.target);
            if (!$target.is('.js-dropdown') || $target.parents().is('.js-dropdown')) {
            $('.js-dropdown').removeClass( "active" );
            }
        });
        /* End Dropdown */

        /* Interactive Type Interactions Table */
        const $interactions_table = $( "#ttw-type-interactions-static" );
        if ($interactions_table.length != 0) {
            const type_order = [
                "neutral", "fire", "water", "nature", "electric", "earth",
                "mental", "wind", "digital", "melee", "crystal", "toxic"
            ];

            const advantage_values = []; // advantage_values[Attack * type_order.length + Defend]
            for (var i = 0; i < type_order.length * type_order.length; i++) {
                advantage_values[i] = 1;
            }

            var $data = $( "#ttw-type-interactions-dynamic > tbody > tr:not(:first-child) > td" );
            for (var i = 0; i < $data.length; i++) {
                const $single_data = $($data[i]);

                if ($single_data.hasClass( "type-effective" )) {
                    advantage_values[i] *= 2;
                } else if ($single_data.hasClass( "type-ineffective" )) {
                    advantage_values[i] /= 2;
                }
            }

            $interactions_table.find(".js-dropdown-content").click(function (e) {
                var $button = $(e.target).closest(".js-button");

                if ($button.length == 1) {
                    const $dropdown_icons = $interactions_table.find(".js-dropdown > .ttw-type-icon > *");
                    const selected_type2 = $button.data("type");
                    const type_index = type_order.indexOf(selected_type2);
                    if (type_index == -1) {
                        $dropdown_icons.css("display", "none");
                        /* Reset Table */
                        for (var i = 0; i < $data.length; i++) {
                            const $single_data = $($data[i]);
                            $single_data.html("").toggleClass("type-repeat type-effective type-ineffective type-very-effective type-very-ineffective", false);

                            if (advantage_values[i] != 1) {
                                $single_data.html(advantage_values[i].toString() + 'x');
                                switch (advantage_values[i]) {
                                    case 2:
                                        $single_data.toggleClass("type-effective", true);
                                        break;
                                    case 0.5:
                                        $single_data.toggleClass("type-ineffective", true);
                                        break;
                                }
                            }
                        }
                    } else {
                        $dropdown_icons.css("display", "none");
                        $dropdown_icons.filter("[data-type='" + type_order[type_index] + "']").css("display", "");

                        for (var i = 0; i < $data.length; i++) {
                            const $single_data = $($data[i]);
                            $single_data.html("").toggleClass("type-repeat type-effective type-ineffective type-very-effective type-very-ineffective", false);
                            
                            if (i % type_order.length == type_index) {
                                $single_data.toggleClass("type-repeat", true);
                                continue;
                            }
                            
                            const advantage_value = advantage_values[i] * advantage_values[Math.floor(i / type_order.length) * type_order.length + type_index]
                            if (advantage_value != 1) {
                                $single_data.html(advantage_value.toString() + 'x');
                                switch (advantage_value) {
                                    case 2:
                                        $single_data.toggleClass("type-effective", true);
                                        break;
                                    case 4:
                                        $single_data.toggleClass("type-very-effective", true);
                                        break;
                                    case 0.5:
                                        $single_data.toggleClass("type-ineffective", true);
                                        break;
                                    case 0.25:
                                        $single_data.toggleClass("type-very-ineffective", true);
                                        break;
                                }
                            }
                        }
                    }
                }
            });
        }
        /* End Type Interactions Table */

        /* Switch between normal and luma */
        $( "#ttw-show-temtem" ).click( function() {
            if (!($( "#ttw-show-temtem" ).hasClass( "active" ) || $( "#ttw-show-temtem" ).hasClass( "disabled" ))) {
                $( "#ttw-temtem" ).show();
                $( "#ttw-temtem-luma" ).hide();

                $( "#ttw-show-temtem" ).addClass( "active" );
                $( "#ttw-show-temtem-luma" ).removeClass( "active" );
            }
        });

        $( "#ttw-show-temtem-luma" ).click( function() {
            if (!($( "#ttw-show-temtem-luma" ).hasClass( "active" ) || $( "#ttw-show-temtem-luma" ).hasClass( "disabled" ))) {
                $( "#ttw-temtem-luma" ).show();
                $( "#ttw-temtem" ).hide();

                $( "#ttw-show-temtem-luma" ).addClass( "active" );
                $( "#ttw-show-temtem" ).removeClass( "active" );
            }
        });
        /* End Normal/Luma Switch */
            
    })
    /* End wiki content hook */    

    /* Fires when DOM is ready */
    $( function() {
        
    });
    /* End of DOM */
    
}());