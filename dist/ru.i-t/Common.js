/* Статусы */
$(function() {
    var rights = {};
 
    //
    rights["VSraper"] = ["администратор"];
    rights["Усатый барон"] = ["Заместитель администратора"];
    rights["VSRapBot"] = ["Бот"];
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
 
});