/* ####################################################################################### */
/* ### Staff Images                                                                    ### */
/* ### --------------------------------------------------------------------            ### */
/* ### Description: Loads all of the latest staff images on the staff page.            ### */
/* ### URL: https://fallout.fandom.com/wiki/Fallout_Wiki:Administrators_and_moderators ### */
/* ### Credit:      User:TwoBearsHigh-Fiving                                           ### */
/* ###              User:FDekker                                                       ### */
/* ####################################################################################### */
$(function() {
    var placeholderClass = "user-image-placeholder";

    var placeholders = $("." + placeholderClass);
    if (placeholders.length === 0) 
        return;

    var users = placeholders
        .map(function(_, placeholder) { 
            return $(placeholder).attr("data-user");
        })
        .map(function(_, user) {
        	return user.replace(/@/g, "\"");
        })
        .toArray();
 
    $.ajax({
        url: "https://" + window.location.hostname + "/api/v1/User/Details",
        data: { "ids": users.join(",") },
        success: function(response) {
            response.items.forEach(function(item) {
            	var escapedName = item.name.replace(/"/g, "@");

            	$("." + placeholderClass + "[data-user]")
        			// Separate filter to support quotes in usernames
            		.filter(function() {
            			return $(this).data("user") === escapedName;
            		})
                    .each(function(_, placeholder) {
                        placeholder = $(placeholder);

                        var width = placeholder.attr("data-width");
                        var height = placeholder.attr("data-height");
                        if (width === undefined && height === undefined) {
                            width = "100px";
                            height = "100px";
                        } else if (width === undefined || height === undefined) {
                            width = width || height;
                            height = width || height;
                        }

                        placeholder.html(
                            "<img style='width: " + width + "; height: " + height + ";' " +
                                 "src='" + item.avatar + "'/>"
                        );
                    });
            });
        },
        dataType: "json"
    });
});