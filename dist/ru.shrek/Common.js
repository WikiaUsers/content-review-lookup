/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*Дополнительные кнопки редактирования*/

if ( mwCustomEditButtons ) 
  
 //Ссылки
    mwCustomEditButtons[mwCustomEditButtons.length] =  {
   "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png", 
    "speedTip": "Добавить перенаправление", 
    "tagOpen": "#Перенаправление [[", 
    "tagClose": "]]", 
    "sampleText": "Название страницы" 
};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png/revision/latest?cb=20080220213803",
    "speedTip": "Добавить сноску",
    "tagOpen": "<ref>",
    "tagClose": "</ref>",
    "sampleText": "Название сноски"

};
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/f/f2/Ref_name_button.png/revision/latest?cb=20131205151742",
    "speedTip": "Повторная сноска",
    "tagOpen": "<ref name=Название>",
    "tagClose": "</ref>",
    "sampleText": "Название повторной сноски"

};

     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/cb/Button_wikipedia.png/revision/latest?cb=20081020115941",
    "speedTip": "Ссылка на статью в Википедии",
    "tagOpen": "[[wikipedia:ru:|",
    "tagClose": "]]",
    "sampleText": ""
};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
    "speedTip": "Добавить галерею",
    "tagOpen": "<gallery>",
    "tagClose": "</gallery>",
    "sampleText":""
    }; 
    
     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png/revision/latest?cb=20070329065451",
    "speedTip": "Добавить шаблон",
    "tagOpen": "{{",
    "tagClose": "}}>",
    "sampleText": "Название шаблона"
};

     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anführung.png",
    "speedTip": "Добавить цитату",
    "tagOpen": "{{Цитата|",
    "tagClose": "||}}",
    "sampleText": ""
    };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/b/b4/Button_category03.png/revision/latest?cb=20070329064836",
    "speedTip": "Добавить категорию",
    "tagOpen": "[[Категория:|",
    "tagClose": "]]",
    "sampleText": ""
};



//Таблицы 
     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/a/a4/TableStart.png/revision/latest?cb=20070927085428",
    "speedTip": "Создать таблицу",
    "tagOpen": "{|",
    "tagClose": "|}",
    "sampleText": "Начало новой таблицы"
};

//Форматирование текста
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0e/Button_acute_accent.png",
    "speedTip": "Ударение",
    "tagOpen": "́",
    "tagClose": "",
    "sampleText": ""
    };
    
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/56/Button_big.png/revision/latest?cb=20081020113952",
    "speedTip": "Крупный шрифт",
    "tagOpen": "<big>",
    "tagClose": "</big>",
    "sampleText": ""
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/58/Button_small.png/revision/latest?cb=20081020113836",
    "speedTip": "Мелкий шрифт",
    "tagOpen": "<small>",
    "tagClose": "</small>",
    "sampleText": ""
};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/f/fd/Button_underline.png/revision/latest?cb=20081020114112",
    "speedTip": "Подчёркнутый текст",
    "tagOpen": "<u>",
    "tagClose": "</u>",
    "sampleText": ""
};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c9/Button_strike.png/revision/latest?cb=20070324060207",
    "speedTip": "Зачёркнутый текст",
    "tagOpen": "<u>",
    "tagClose": "</u>",
    "sampleText": ""
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png/revision/latest?cb=20070329064320",
    "speedTip": "Нумерация",
    "tagOpen": "#",
    "tagClose": "",
    "sampleText": ""
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png/revision/latest?cb=20070329064826",
    "speedTip": "Список",
    "tagOpen": "*",
    "tagClose": "",
    "sampleText": ""
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/d/d5/Button_noinclude.png/revision/latest?cb=20070329065148",
    "speedTip": "noinclude",
    "tagOpen": "<noinclude>",
    "tagClose": "</noinclude>",
    "sampleText": "На место этого текста, вставьте категорию"
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
    "speedTip": "Перенос строки",
    "tagOpen": "<br>",
    "tagClose": "",
    "sampleText": ""
};



    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/7/74/Button_comment.png/revision/latest?cb=20070324060240",
    "speedTip": "Скрытый комментарий",
    "tagOpen": "<!--",
    "tagClose": "-->",
    "sampleText": ""
};