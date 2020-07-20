/* Discord Widget Customization */
// Import discord integrator widget CSS.
importArticles({
    type: "style",
    articles: [
        "MediaWiki:Common.js/CustomDiscordIntegrator.js/StyleLight.css"
    ]
});
 
// Add connect button.
    var $widgetFooterButton = document.createElement("a");
    $($widgetFooterButton)
        .addClass("widget-btn-connect")
        .attr("href", json.instant_invite + "?utm_source=Discord%20Widget&utm_medium=Connect")
        .attr("target", "_blank")
        .text("Venture Goldy Pond")
        .appendTo($widgetFooter);

// Add members online to header.
    var $widgetHeaderMembersOnline = document.createElement("span");
    $($widgetHeaderMembersOnline)
        .addClass("widget-header-count")
        .html("<strong>" + membersOnline + "</strong> Survivors Online")
        .appendTo($widgetHeader);