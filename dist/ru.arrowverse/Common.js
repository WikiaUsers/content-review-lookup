/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//------------------------------------//
/* Подключение страниц */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:CustomEditButtons.js',   // Кнопки для панели инструментов редактирования
        'u:dev:PreloadFileDescription/code.js', // Описание изображений
        'u:onepiece:Common.js/slider2.js', // Слайдер
        'u:dev:AjaxRC/code.js',
        'u:ExtendedNavigation/code.js'
    ]
});

//------------------------------------//
/* Кнопки редактирования */
if (mwCustomEditButtons.length) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556a5/icNn0vOpglk.jpg",
        "speedTip": "Персонаж",
        "tagOpen": "{{Персонаж\n" +
            "|имя= \n" +
            "|картинка= \n" +
            "|картинка2= \n" +
            "|полное имя= \n" +
            "|второе имя= \n" +
            "|альтер-эго= \n" +
            "|псевдоним= \n" +
            "|прозвище= \n" +
            "|семья= \n" +
            "|организации= \n" +
            "|группы= \n" +
            "|профессия= \n" +
            "|статус= \n" +
            "|планета= \n" +
            "|актер= \n" +
            "|актриса= \n" +
            "|фото= \n" +
            "}}",
        "tagClose": "",
        "sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c837529/v837529105/465fa/rkjesJPcyE8.jpg",
        "speedTip": "О персонаже",
        "tagOpen": "''' ''' —\n" +
            "==Биография==\n" +
            "==Личные качества==\n" +
            "==Навыки==\n" +
            "*''' '''\n" +
            "==Появления==\n" +
            "===[[4 сезон]]===\n" +
            "==Дополнительно==\n" +
            "==Примечания==\n" +
            "==Ссылки==\n" +
            "{{Reflist}}\n" +
            "{{Сериал}}\n" +
            "[[en:]]",
        "tagClose": "",
        "sampleText": ""
    };
    
        mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556c4/_jo32FLd9Dw.jpg",
        "speedTip": "Серия",
        "tagOpen": "{{Серия \n" +
            "|название = \n" +
            "|в оригинале = \n" +
            "|картинка1 = \n" +
            "|сезон = \n" +
            "|номер = \n" +
            "|дата выхода = \n" +
            "|сценаристы = \n" +
            "|режиссер = \n" +
            "|предыдущая = {{Ep|}}\n" +
            "|следующая = {{Ep|}}\n" +
            "}} \n",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/55706/q2VbfXFu8wY.jpg",
        "speedTip": "Описание серии",
        "tagOpen": "'''«»''' — серия [[4 сезон|четвёртого сезона]] сериала ''[[Супергёрл|«Супергёрл»]]''. Выйдет в эфир 2019 года.\n\n" +
            "==О серии==\n" +
            "<ref>[ '' '' - ]</ref>\n\n" +
            "==Актёры и роли==\n" +
            "===В главных ролях===\n" +
            "*[[Мелисса Бенойст]] — [[Кара Дэнверс|Кара Дэнверс/Супергёрл]]\n" +
            "*[[Кайлер Ли]] — [[Алекс Дэнверс]]\n" +
            "*[[Мехкад Брукс]] — [[Джеймс Олсен|Джеймс Олсен/Страж]]\n" +
            "*[[Дэвид Хэрвуд]] — [[Дж'онн Дж'онзз|Дж'онн Дж'онзз/Марсианский охотник]]\n" +
            "*[[Кэти МакГрат]] — [[Лена Лютор]]\n" +
            "*[[Джесси Рат]] — [[Кьюэрл Докс|Кьюэрл Докс/Брейниак-5]]\n" +
            "*[[Николь Мэйнс]] — [[Ния Нал|Ния Нал/Сновидица]]\n" +
            "*[[Сэм Уитвер]] — [[Бен Локвуд|Бен Локвуд/Агент Свободы]]\n" +
            "*[[Эйприл Паркер Джонс]] — [[Лорен Хейли|Полковник Хейли]]\n" +
            "===Специально приглашенные гости===\n\n" +
            "===Приглашенные гости===\n\n" +
            "==Галерея==\n" +
            "===Промо-кадры===\n" +
            "<gallery>\n\n" +
            "</gallery>\n\n" +
            "===Видео===\n" +
            "<gallery>\n\n" +
            "</gallery>\n\n" +
            "==Примечания==\n\n" +
            "==Ссылки==\n" +
            "{{Reflist}}\n\n" +
            "{{4 сезон}}\n" +
            "{{Сериал}}\n\n" +
            "[[en:]]",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556ac/cQEyKZclJsw.jpg",
        "speedTip": "Актер",
        "tagOpen": "{{Актер \n" +
            "|имя= \n" +
            "|картинка= \n" +
            "|имя при рождении= \n" +
            "|дата рождения= \n" +
            "|место рождения= \n" +
            "|роль= \n" +
            "}} \n",
        "tagClose": "",
        "sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c837529/v837529105/4660f/jQ5zl5YPI7Q.jpg",
        "speedTip": "Об актере",
        "tagOpen": "''' ''' (родился ) — \n" + 
        "В сериале ''[[Супергёрл|«Супергёрл»]]'' исполнил роль [[]].\n" +
        "==Роль в сериале==\n" +
        "===Актёр===\n" +
        "====[[4 сезон]]====\n" +
        "*{{Ep||— [[]]}}\n" +
        "==Внешние ссылки==\n" +
        "*{{Instagram|}}\n" +
        "*{{Кинопоиск|}}\n" +
        "*{{IMDb|}}\n" +
        "*{{Twitter|}}\n" +
        "{{Сериал}}\n" +
        "{{DEFAULTSORT:, }}\n" +
        "[[en:]]",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556b3/s7167pQ_QU8.jpg",
        "speedTip": "Создатель",
        "tagOpen": "{{Создатель \n" +
            "|полное имя= \n" +
            "|картинка= \n" +
            "|дата рождения= \n" +
            "|место рождения= \n" +
            "|дата смерти= \n" +
            "|профессия= \n" +
            "}} \n",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556cb/rU3TCzhawr4.jpg",
        "speedTip": "Локация",
        "tagOpen": "{{Локация \n" +
            "|название= \n" +
            "|оригинальное название= \n" +
            "|картинка= \n" +
            "|местонахождение= \n" +
            "|использование= \n" +
            "|владелец= \n" +
            "}} \n",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556dc/NtU2scDEx1U.jpg",
        "speedTip": "Предмет",
        "tagOpen": "{{Предмет \n" +
            "|название= \n" +
            "|картинка= \n" +
            "|создатель= \n" +
            "|владелец= \n" +
            "|пользователи= \n" +
            "|использование= \n" +
            "}} \n",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556e3/RX3FY-OKExc.jpg",
        "speedTip": "Организация",
        "tagOpen": "{{Организация \n" +
            "|название= \n" +
            "|картинка= \n" +
            "|оригинальное название= \n" +
            "|местоположение= \n" +
            "|использование= \n" +
            "|владелец= \n" +
            "|директор= \n" +
            "|глава= \n" +
            "}} \n",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556ea/OnLMEoZOhdY.jpg",
        "speedTip": "Группа",
        "tagOpen": "{{Группа \n" +
            "|название= \n" +
            "|картинка= \n" +
            "|местонахождение= \n" +
            "|использование= \n" +
            "|лидер= \n" +
            "}} \n",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556f1/JuqKgstoZMg.jpg",
        "speedTip": "Reflist",
        "tagOpen": "==Ссылки==\n" +
            "{{Reflist}} \n \n" +
            "{{Сериал}}",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556f8/fMF28cmIfqk.jpg",
        "speedTip": "{{Ep|}}",
        "tagOpen": "*{{Ep|}}",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/556ff/608kmEeLO0M.jpg",
        "speedTip": "{{Супергёрл}}",
        "tagOpen": "{{Супергёрл}}",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/5570d/Yr3qQptfYWs.jpg",
        "speedTip": "Упоминание",
        "tagOpen": "|{{Упоминание}}",
        "tagClose": "",
        "sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/55714/sMpiNtND_eg.jpg",
        "speedTip": "Флэшбэк",
        "tagOpen": "|{{Примечание|(флэшбэк)}}",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/55714/sMpiNtND_eg.jpg",
        "speedTip": "Примечание",
        "tagOpen": "|{{Примечание|()}}",
        "tagClose": "",
        "sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c834301/v834301649/c1ba/cg2-005Q10o.jpg",
        "speedTip": "{{Ep ref|}}",
        "tagOpen": "<ref name=>{{Ep ref|}}</ref>",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c636516/v636516874/55722/XzmMDoQK_gE.jpg",
        "speedTip": "Кавычки",
        "tagOpen": "«»",
        "tagClose": "",
        "sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c837529/v837529105/46608/1nnaFn3e5W4.jpg",
        "speedTip": "Тире длинная",
        "tagOpen": "—",
        "tagClose": "",
        "sampleText": ""
    };
 
      mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c834301/v834301649/c1ce/8lmMeeB_wXM.jpg",
        "speedTip": "[[Кара Дэнверс|Кара Дэнверс]]",
        "tagOpen": "[[Кара Дэнверс|Кара Дэнверс]]",
        "tagClose": "",
        "sampleText": ""
    };
 
      mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c834301/v834301649/c1d5/7GfGLhjhkoU.jpg",
        "speedTip": "Категория Картинки из серии",
        "tagOpen": "{{Картинки\n" +
            "|серия = \n" +
            "|сезон = \n" +
            "|номер = \n" +
            "}}",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://pp.userapi.com/c834301/v834301649/c1e3/YVvQC2ThdX8.jpg",
        "speedTip": "Категория серии",
        "tagOpen": "'''{{Ep|}}''' — серия [[4 сезон|четвёртого сезона]] сериала ''[[Супергёрл|«Супергёрл»]]''. Вышла в эфир  2019 года.\n\n" +
            "{{Указатели в категории||}}",
        "tagClose": "",
        "sampleText": ""
    };
}
//------------------------------------------------------------------------