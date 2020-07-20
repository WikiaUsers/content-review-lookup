function _portraitHoverSetup() {
    var defaultPortrait = "Miko"; // The portrait which displays on pageload
    $('.portrait').mouseover(function(event) {
        var portrait, big_image, name, faction;
 
        portrait = $(event.currentTarget).attr('data-big');
        name = $(event.currentTarget).attr('data-name');
        faction = $(event.currentTarget).attr('data-faction');
        if( portrait ) {
            big_image = $("<img/>").addClass("center_image").attr('src', portrait);
            name = $("<div>").addClass("center_name").text(name);
            faction = $("<div>").addClass("center_faction").text(faction);
            $(".center_col").empty().append(big_image).append(name).append(faction);
        }
    });
 
    $($('a[title="' + defaultPortrait + '"]')[0]).parents('.portrait').trigger("mouseover");
}
 
$(_portraitHoverSetup);