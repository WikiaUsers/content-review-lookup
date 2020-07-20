/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/
// rights[""] = [""];
// Код написан: Rappy_4187 для англовики.
$(function() {
    var rights = {};

    ///Статусы

    rights["Всадник из льда"] = ["Конунг"];
    
    if (typeof rights[wgTitle] != "undefined") {
 
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            // add new rights
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
 
});