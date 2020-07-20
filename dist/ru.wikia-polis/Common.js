/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

$(function() {
    var rights = {};
 
    //Крутые Персоны
    rights["Freddy's Defender"] = ["Что-то с Чем-то"];
    rights["Эдвард Прайс"] = ["Что-то с Чем-то"];
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