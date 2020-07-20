(function(mw, $) {

    "use strict";

    $(document).ready(function() {

        // custom hidable content and togglers supported by local storage

        if (typeof(Storage) === "undefined") {
            return;
        }

        var ToggleStorage = function(property, property_default) {
            if (!localStorage[property]) {
                localStorage[property] = property_default;
            }
            return {
                toggle: function() {
                    localStorage[property] = localStorage[property] === "show" ? "hide" : "show";
                },
                on: function() {
                    return localStorage[property] === "show";
                }
            };
        }

        function update(toggle_element, toggle) {
            var property = toggle_element.data("target") || "default",
                property_anti = toggle_element.data("anti-target"),
                property_default = toggle_element.data("default") || "show",
                property_classes = toggle_element.data("classes") && toggle_element.data("classes").split(' ').map(function (e) { return "toggle-class-" + e.trim() }).join(' '),
                target = "toggle-target-" + property,
                target_class = "." + target,
                anti_target_class,
                toggleStorage = ToggleStorage(target, property_default);
            if (property_anti) {
                anti_target_class = ".toggle-anti-target-" + property;
            }
            if (toggle) {
                toggleStorage.toggle();
            }
            var toggle_show_selector = '.toggle[data-target="' + property + '"] .toggle-show',
                toggle_hide_selector = '.toggle[data-target="' + property + '"] .toggle-hide';
            if (toggleStorage.on()) {
                $(toggle_show_selector).show();
                $(toggle_hide_selector).hide();
                if (property_classes) {
                    $(target_class).addClass(property_classes);
                } else {
                    $(target_class).show();
                }                
                if (anti_target_class) {
                    $(anti_target_class).hide();
                }
            } else {
                $(toggle_show_selector).hide();
                $(toggle_hide_selector).show();
                if (property_classes) {
                    $(target_class).removeClass(property_classes);
                } else {
                    $(target_class).hide();                    
                }
                if (anti_target_class) {
                    $(anti_target_class).show();
                }
            }
            $(window).trigger("WideTablesScan");
        }

        //Local storage for multi toggles.
        var MultiToggleStorage = function(property, property_default) {
            if (!localStorage[property]) {
                localStorage[property] = property_default;
            }
            return {
                set: function(value) {
                    localStorage[property] = value;
                },
                get: function(value) {
                    return localStorage[property];
                },
                on: function(value) {
                    return localStorage[property] === value;
                }
            };
        }

        //Update a multi toggle. If selected is passed it is set as the state of the multi toggle. Pass "none" to selected to deselect when the multi toggle is a filter.
        function multi_update(multi_toggle_element, selected) {
            var property = multi_toggle_element.data("target") || "default",
                property_states = multi_toggle_element.data("states"),
                property_default = multi_toggle_element.data("default"),
                property_filter = multi_toggle_element.data("filter") || false, //Whether or not the multi toggle is a filter
                property_base_colspan = multi_toggle_element.data("base-colspan"),
                target = "multi-toggle-target-" + property;
            //make sure the states are an array.
            if (!property_states || !Array.isArray(property_states) || property_states.length < 1) {
                multi_toggle_element.hide();
                return;
            } else if (property_filter && property_states[0] !== "none") {
                property_states.splice(0, 0, "none")
            }
            //need to set default here rather than in the declaration above to ensure the states are valid.
            if (!property_default) {
                property_default = property_states[0];
            }
            var multiToggleStorage = MultiToggleStorage(target, property_default);
            //set the new state of the multi toggle.
            if (selected && property_states.indexOf(selected) >= 0) {
                //If the selected filter was re-selected, that is a remove filter action.
                if ((property_filter && multiToggleStorage.on(selected))) {
                    selected = "none";
                }
                multiToggleStorage.set(selected);
            } else {
                //No selection, so we are initializing the multi toggle.
                selected = multiToggleStorage.get()
            }
            //Update non-selected states
            var hide_selectors = [];
            var show_selectors = [];
            property_states.forEach(function(state) {
                var toggle_active_selector = '.multi-toggle[data-target="' + property + '"] .multi-toggle-button[data-state="' + state + '"] .multi-toggle-active',
                    toggle_inactive_selector = '.multi-toggle[data-target="' + property + '"] .multi-toggle-button[data-state="' + state + '"] .multi-toggle-inactive';
                if (selected !== state) {
                    $(toggle_active_selector).hide();
                    $(toggle_inactive_selector).show();
                    if (selected === "none") {
                        show_selectors.push("." + target + "-" + state);
                    } else {
                        hide_selectors.push("." + target + "-" + state);
                    }
                } else {
                    $(toggle_active_selector).show();
                    $(toggle_inactive_selector).hide();
                    show_selectors.push("." + target + "-" + state);
                }
            })
            $(hide_selectors.join(',')).hide();
            //Update selected state last
            $(show_selectors.join(',')).show();
            //Update colspan for custom rows.
            if (property_filter) {
                if (selected === "none") {
                    $(".custom-row." + target).attr("colSpan", property_base_colspan);
                } else {
                    $(".custom-row." + target).attr("colSpan", property_base_colspan - property_states.length + 2);
                }
            }
            //cleanup
            $(window).trigger("WideTablesScan");
        }

        function updateContent() {

            $(".toggle").each(function() {
                var toggle_element = $(this);
                toggle_element.show();
                update(toggle_element);
                if (toggle_element.hasClass('toggle-passive')) {
                    return;
                }
                toggle_element.off("click");
                toggle_element.click(function() {
                    update(toggle_element, true);
                });
            });

            //Activate multi toggles.
            var targets = {};
            $(".multi-toggle").each(function() {
                var multi_toggle_element = $(this),
                    multi_toggle_buttons = multi_toggle_element.children(".multi-toggle-button"),
                    target = multi_toggle_element.data("target") || "default";
                multi_toggle_element.show();
                if (!targets.hasOwnProperty(target))
                    targets[target] = multi_toggle_element;
                //Remove click event handlers from all multi toggle buttons
                multi_toggle_buttons.off("click");
                //Add click event handler for all multi toggle buttons to trigger multi_update with select action.
                multi_toggle_buttons.click(function() {
                    multi_update(multi_toggle_element, $(this).data("state"));
                });
            });
            //call multi-update once for each target to allow multiple controls 
            //without horrible lag
            Object.keys(targets).forEach(function (key) {multi_update(targets[key])});

            // .mw-collapsible togglers

            $(".mw-collapsible-expand-all").each(function() {
                var toggle_element = $(this);
                toggle_element.off("click");
                toggle_element.click(function() {
                    $(".mw-collapsible-toggle.mw-collapsible-toggle-collapsed").click();
                });
            });

            $(".mw-collapsible-collapse-all").each(function() {
                var toggle_element = $(this);
                toggle_element.off("click");
                toggle_element.click(function() {
                    $(".mw-collapsible-toggle:not(.mw-collapsible-toggle-collapsed)").click();
                });
            });

            $(".mw-collapsible-toggle-all").each(function() {
                var toggle_element = $(this);
                toggle_element.off("click");
                toggle_element.click(function() {
                    $(".mw-collapsible-toggle").click();
                });
            });

        }

        updateContent();
        mw.hook("wikipage.content").add(updateContent);

    });

}(mediaWiki, jQuery));