/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// rights[""] = [""];
$(function() {
    var rights = {};
     //Президент
     rights["Sport Cars"] = ["Президент"];
     //Председатель правительства \мошв\
     rights["Вриллиант"] = ["Председатель правительства /мошв/"];
     //Депутат
     rights["Superbow"] = ["Депутат"];
     //Депутат
     rights["Lunch12"] = ["Депутат"];
 
      {
 
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            // add new rights
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
 
});