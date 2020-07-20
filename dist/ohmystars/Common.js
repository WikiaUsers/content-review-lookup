/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "style",
    articles: [
        "MediaWiki:Infobox 2.css",
        "MediaWiki:TimeCircles.css",
    ]
},{
    type: "script",
    articles: [
        "w:dev:DisplayClock/code.js",
        "w:dev:LastEdited/code.js",
        "MediaWiki:TimeCircles.js",
        "MediaWiki:RatingWidget.js",
    ]
});

$(window).load(function() {
    if ($('#DateCountdown').length) { 
        // Countdown configuration
        $("#DateCountdown").TimeCircles({
          "circle_bg_color": "#E8E4E2",
          "time": {
            "Days": { "color": "#BF613C" },
            "Hours": { "color": "#BF613C" },
            "Minutes": { "color": "#BF613C" },
            "Seconds": { "color": "#BF613C" }
          }
        });
    }
});

addOnloadHook(function() {
  $(".lastEdited").contents().filter(function() {
    return this.nodeType === 3;
  }).wrap("<span></span>");

  var span = $(".lastEdited span");
  span.filter(':contains("Last edited by")').html('Last editor: ');
  span.filter(':contains("UTC")').before('<br>').prepend(document.createTextNode('Edit date: '));
  span.filter(':contains("Edit summary")').text(function() {
    if ( $(this).text().length > 75 )
     return $(this).text().substr(0,75) + "...";
  });
});