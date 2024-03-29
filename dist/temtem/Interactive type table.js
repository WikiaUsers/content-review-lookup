// Interactive Type Interactions Table  used on [[Template:Type Interactions]]
$(function () {
	var $interactions_table = $( "#ttw-type-interactions-static" );
    if($interactions_table.length == 0){return} // early exit
    
    var type_order = [
        "neutral", "wind", "earth", "water", "fire", "nature",
        "electric", "mental", "digital", "melee", "crystal", "toxic"
    ];

    var advantage_values = []; // advantage_values[Attack * type_order.length + Defend]
    for (var i = 0; i < type_order.length * type_order.length; i++) {
        advantage_values[i] = 1;
    }

    var $data = $( "#ttw-type-interactions-dynamic > tbody > tr:not(:first-child) > td" );
    for (var i = 0; i < $data.length; i++) {
        var $single_data = $($data[i]);

        if ($single_data.hasClass( "type-effective" )) {
            advantage_values[i] *= 2;
        } else if ($single_data.hasClass( "type-ineffective" )) {
            advantage_values[i] /= 2;
        }
    }

    $interactions_table.find(".js-dropdown-content").click(function (e) {
        var $button = $(e.target).closest(".js-button");

        if ($button.length == 1) {
            var $dropdown_icons = $interactions_table.find(".js-dropdown > .ttw-type-icon > *");
            var selected_type2 = $button.data("type");
            var type_index = type_order.indexOf(selected_type2);
            if (type_index == -1) {
                $dropdown_icons.css("display", "none");
                /* Reset Table */
                for (var i = 0; i < $data.length; i++) {
                    var $single_data = $($data[i]);
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
                    var $single_data = $($data[i]);
                    $single_data.html("").toggleClass("type-repeat type-effective type-ineffective type-very-effective type-very-ineffective", false);
                    
                    if (i % type_order.length == type_index) {
                        $single_data.toggleClass("type-repeat", true);
                        continue;
                    }
                    
                    var advantage_value = advantage_values[i] * advantage_values[Math.floor(i / type_order.length) * type_order.length + type_index]
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
});