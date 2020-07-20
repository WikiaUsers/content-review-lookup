/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/
// rights[""] = [""];
$(function() {
    var rights = {};

    //Администраторы
    rights[""] = ["Администратор"];
    rights[""] = ["Администратор"];
    rights[""] = ["Администратор"];
    rights[""] = ["Администратор"];

    //Титановые Администраторы
    rights[""] = ["Титановый Администратор"];
    rights[""] = ["Титановый Администратор"];

    //Патрульные
    rights[""] = ["Патрульный"];
    rights[""] = ["Патрульный"];

    //Журналисты
    rights[""] = ["Журналист"];
    rights[""] = ["Журналист"];

    //Модераторы чата
    rights[""] = ["Модератор чата"];
    rights[""] = ["Модератор чата"];

    //Модераторы форума
    rights[""] = ["Модератор форума"];
    rights[""] = ["Модератор форума"];

    //Техники
    rights[""] = ["Техник"];

    //Боты 
    rights[""] = ["Бот"];
    rights[""] = ["Бот"];
    rights[""] = ["Бот"];
    rights[""] = ["Бот"];

    //Откатчики
    rights[""] = ["Откатчик"];
    rights[""] = ["Откатчик"];
    rights[""] = ["Откатчик"];
    rights[""] = ["Откатчик"];
    rights[""] = ["Откатчик"];

    //Основатель
    rights["GoldenGroza"] = ["Основатель"];
    
    //Участники, имеющие более одного статуса
    rights["Лесовик"] = ["Модератор чата", "Модератор форума"];
    rights[""] = [""];
    rights[""] = [""];
    rights[""] = [""];
    rights[""] = [""];

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