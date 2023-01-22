/* == Иконки быстрой вставки в панели инструментов при редактировании == */

var customizeToolbar = function () {
/* == Секция форматирование текста == */
/* Зачёркнутый текст 
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
  section: 'main',
    group: 'format',
      tools: {
        "strike": {
        label: 'Strike-through text',
        type: 'button',
        icon: 'https://images.wikia.nocookie.net/marvel/ru/images/c/c9/Button_strike.png',
        action: {
        type: 'encapsulate',
        options: {
        pre: "<s>",
        post: "</s>"
        }
      }
    }
  }
} );*/
/* Комментарий 
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
  section: 'main',
  group: 'format',
  tools: {
    "comment": {
      label: 'Comment',
      type: 'button',
      icon: 'https://images.wikia.nocookie.net/marvel/ru/images/7/74/Button_comment.png',
      action: {
        type: 'encapsulate',
        options: {
        pre: "<!-- ",
        post: " -->"
        }
      }
    }
  }
} );*/

/* == Секция вставки == */
/* Википедия */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
  section: 'advanced',
    group: 'insert',
      tools: {
        "wikipedia": {
        label: 'Википедия',
        type: 'button',
        icon: 'https://images.wikia.nocookie.net/marvel/ru/images/c/c9/Кнопка_Wp.png',
        action: {
        type: 'encapsulate',
        options: {
        pre: "{{W|ru|название_статьи",
        post: "|текст_ссылки}}"
        }
      }
    }
  }
} );

/*-------- ИНФОБОКСЫ --------*/
/* == Секция инфобоксов; дополнительно == */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
  section: 'advanced',
  groups: {
    "infoboxes": {
      'label': 'Инфобоксы'
    }
  }
} );

/* Персонаж */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "character": {
    label: 'Персонаж',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/7/71/Кнопка_шаблона_Персонаж.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Персонаж" +
          "\r| Картинка = " +
          "\r| Костюм   = " +
          "\r| Имя      = " +
          "\r| Прозвище = " +
          "\r" +
          "\r| Занятие  =" +
          "\r| Прозвища = " +
          "\r| Позиция  = " +
          "\r| Личность = " +
          "\r" +
          "\r| Статус       = " +
          "\r| Родственники = " +
          "\r| Организации  = " +
          "\r| Союзники     = " +
          "\r| Враги        = " +
          "\r" +
          "\r| Вселенная   = " +
          "\r| Гражданство = " +
          "\r| Появление   = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Фильм */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "film": {
    label: 'Фильм',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/0/00/Кнопка_шаблона_Фильм.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Фильм" +
          "\r| Картинка   = " +
          "\r| Название   = " +
          "\r| Оригинал   = " +
          "\r" +
          "\r| Режиссер   = " +
          "\r| Продюсер   = " +
          "\r| Сценарист  = " +
          "\r| ГлРоли     = " +
          "\r| Оператор   = " +
          "\r| Композитор = " +
          "\r| Компания   = " +
          "\r| Бюджет     = " +
          "\r| Сборы      = " +
          "\r| Продолжительность = " +
          "\r| Премьера   = " +
          "\r| ПремьераРоссия = " +
          "\r| Вселенная  = " +
          "\r" +
          "\r| Предыдущий = " +
          "\r| Следующий  = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Сериал */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "serial": {
    label: 'Сериал',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/1/1d/Кнопка_шаблона_Сериал.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Сериал" +
          "\r| Название = " +
          "\r| Оригинал = " +
          "\r| Картинка = " +
          "\r| Подпись  = " +
          "\r" +
          "\r| Постер1  = " +
          "\r| Подпись1 = " +
          "\r..." +
          "\r| Постер12  = " +
          "\r| Подпись12 =  " +
          "\r" +
          "\r| Режиссер  = " +
          "\r| Продюсер  = " +
          "\r| Компания  = " +
          "\r| Эпизоды   = " +
          "\r| Эпизод    = " +
          "\r| Премьера  = " +
          "\r| ПремьераРоссия  = " +
          "\r| Вселенная = " +
          "\r" +
          "\r| Следующий = " +
          "\r| Предыдущий = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Эпизод */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "episode": {
    label: 'Эпизод',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/6/6e/Кнопка_шаблона_Эпизод.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Эпизод" +
          "\r| Название  = " +
          "\r| Картинка  = " +
          "\r| Сериал    = " +
          "\r| Премьера  = " +
          "\r" +
          "\r| Режиссер  = " +
          "\r| Сценарист = " +
          "\r" +
          "\r| Предыдущая = " +
          "\r| Следующая  = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Комикс */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "comics": {
    label: 'Комикс',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/d/d0/Кнопка_шаблона_Комикс.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Комикс" +
          "\r| Название = " + 
          "\r| Картинка = " + 
          "\r" +
          "\r| Импринт     = " +
          "\r| Тип         = " +
          "\r| Публикация  = " + 
          "\r| Выпуски     = " + 
          "\r| Вселенная   = " + 
          "\r| КлПерсонажи = " + 
          "\r" +
          "\r| Сценарист = " + 
          "\r| Художник  = " + 
          "\r" +
          "\r| Предыдущая = " + 
          "\r| Следующая  = " + 
          "\r}}"
          }
        }
      }
    }
  } );

/* Выпуск */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "chapter": {
    label: 'Выпуск',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/0/0f/Кнопка_шаблона_Выпуск.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Выпуск" +
          "\r| Картинка   = " +
          "\r| Название   = " +
          "\r| Перевод    = " +
          "\r" +
          "\r| Постер1    = " +
          "\r| Подпись1   = " +
          "\r| Постер2    = " +
          "\r| Подпись2   = " +
          "\r" +
          "\r| Арка       = " +
          "\r| Событие    = " +
          "\r| Публикация = " +
          "\r| Выпуск     = " +
          "\r" +
          "\r| ГлРедактор = " +
          "\r| Обложка    = " +
          "\r| Сценарист  = " +
          "\r| Карандаш   = " +
          "\r| Тушь       = " +
          "\r| Цвет       = " +
          "\r| Шрифт      = " +
          "\r| Редактор   = " +
          "\r" +
          "\r| Предыдущая = " +
          "\r| Следующая  = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Вселенная */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "earth": {
    label: 'Вселенная',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/8/8c/Кнопка_шаблона_Вселенная.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Вселенная" +
          "\r| Название = " +
          "\r| Картинка = " +
          "\r" +
          "\r| Номер  = " +
          "\r| Статус = " +
          "\r| Появление = " +
          "\r| Появление2 =" +
          "\r}}"
          }
        }
      }
    }
  } );

/* Сюжетная арка */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "story-arc": {
    label: 'Сюжетная арка',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/c/cf/Кнопка_шаблона_Сюжетная_арка.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Сюжетная арка" +
          "\r| Картинка = " +
          "\r| Название = " +
          "\r| Перевод  = " +
          "\r" +
          "\r| Серия     = " +
          "\r| Серии     = " +
          "\r| Вселенная = " +

          "\r| Создатели = " +
          "\r| Локации   = " +
          "\r" +
          "\r| Герои  = " +
          "\r| Злодеи = " +
          "\r| Другие = " +
          "\r" +
          "\r| Предыдущая = " +
          "\r| Следующая  =" +
          "\r}}"
          }
        }
      }
    }
  } );

/* Событие */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "event": {
    label: 'Событие',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/6/63/Кнопка_шаблона_Событие.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Событие" +
          "\r| Название = " +
          "\r| Картинка = " +
          "\r" +
          "\r| Постер1  = " +
          "\r| Подпись1 = " +
          "\r| Постер2  = " +
          "\r| Подпись2 = " +
          "\r" +
          "\r| ПрНазвания = " +
          "\r| Вселенная  = " +
          "\r| Локация    = " +
          "\r" +
          "\r| Дата = " +
          "\r| Тип  = " +
          "\r| Участники = " +
          "\r| Результат = " +
          "\r" +
          "\r| Комикс = " +
          "\r| Фильм  = " +
          "\r| Сериал = " +
          "\r| Игра   = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Организация */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "organization": {
    label: 'Организация',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/8/87/Кнопка_шаблона_Организация.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Организация" +
          "\r| Картинка = " +
          "\r| Название = " +
          "\r| АльтНазвание =" +
          "\r| Статус = " +
          "\r" +
          "\r| Публичность = " +
          "\r| Цели = " +
          "\r| Штаб = " +
          "\r| Вселенная = " +
          "\r| Основание = " +
          "\r| Распад = " +
          "\r" +
          "\r| Лидер = " +
          "\r| Лидеры = " +
          "\r| Члены = " +
          "\r| Союзники = " +
          "\r| Враги = " +
          "\r" +
          "\r| Появление  = " +
          "\r| Появление2 = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Локация */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "location": {
    label: 'Локация',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/f/f8/Кнопка_шаблона_Локация.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Локация" +
          "\r| Картинка  = " +
          "\r| Название  = " +
          "\r| Статус    = " +
          "\r| Появление = " +
          "\r" +
          "\r| Вселенная = " +
          "\r| Планета   = " +
          "\r| Страна    = " +
          "\r| Город     = " +
          "\r| Место     = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Предмет */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "item": {
    label: 'Предмет',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/f/f4/Кнопка_шаблона_Предмет.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Предмет" +
          "\r| Название = " +
          "\r| Картинка = " +
          "\r" +
          "\r| Тип = " +
          "\r| Размеры   = " +
          "\r| Создатель = " +
          "\r| Владелец  = " +
          "\r" +
          "\r| Вселенная = " +
          "\r| Статус    =" +
          "\r| Появление = " +
          "\r| Появление2 = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Человек */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "image": {
    label: 'Реальный человек',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/9/95/Кнопка_шаблона_Человек.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "",
          post: "{{Реальный человек" +
          "\r| Картинка       = " +
          "\r| Имя            = " +
          "\r| Прозвище       = " +
          "\r| Прозвища       = " +
          "\r" +
          "\r| Занятие        = " +
          "\r| Организации    = " +
          "\r| Вселенная      = " +
          "\r| Персонаж       = " +
          "\r" +
          "\r| Место рождения = " +
          "\r| Гражданство    = " +
          "\r| Появление      = " +
          "\r| Появление2     = " +
          "\r" +
          "\r| Дата рождения  = " +
          "\r| Дата смерти    = " +
          "\r}}"
          }
        }
      }
    }
  } );

/* Изображение */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "image": {
    label: 'Изображение',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/0/06/Кнопка_шаблона_Изображение.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "{{Изображение" +
          "\r| Описание  = ",
          post: "\r| Источник  = " +
          "\r| Появления = " +
          "\r| Автор     = " +
          "\r| Категория = " +
          "\r| Лицензия  = " +
          "\r}}"
          }
        }
      }
    }
  } );

/** МАКЕТЫ **/
/* Персонаж */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
  tools: {
  "character": {
    label: 'Макет статьи Персонаж',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/c/c4/Кнопка_статьи_Персонаж.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "{{Stub|персонаж}}\n" +
          "{{Персонаж\n",
          post: "| Картинка = \n" +
          "| Костюм   = \n" +
          "| Имя      = \n" +
          "| Прозвище = \n" +
          "\n" +
          "| Занятие  = \n" +
          "| Прозвища = \n" +
          "| Позиция  = \n" +
          "| Личность = \n" +
          "\n" +
          "| Статус       = \n" +
          "| Родственники = \n" +
          "| Организации  = \n" +
          "| Союзники     = \n" +
          "| Враги        = \n" +
          "\n" +
          "| Вселенная    = Номер\n" +
          "| Гражданство  = \n" +
          "| Появление    = {{c||}}\n" +
          "}}\n" +
        "<!--Дополнительные параметры\n" +
          "| Вид          = \n" +
          "| Пол          = \n" +
          "| Возраст      = \n" +
          "| Дата рождения = \n" +
          "| Дата смерти  = \n" +
          "| Рост         = \n" +
          "| Вес          = \n" +
          "| Волосы       = \n" +
          "| Глаза        = \n" +
          "| Кожа         = \n" +
          "\n" +
          "| Место рождения = \n" +
          "| Появление2     = \n" +
          "| Смерть         = \n" +
          "| Актер          = \n" +
          "| Актриса        = \n" +
          "| Источник = \n" +
          "| Подпись = \n" +
          "| ПодписьКостюм = \n" +
          "-->\n" +
          "{{Цитата|Текст цитаты|Автор цитаты|{{c||}}}}\n" +
          "{{Lang|Имя на русском|Имя на английском}} — краткое описание.\n" +
          "\n" +
          "== Биография ==\n" +
          "{{Stub|Биография}}\n" +
          "\n" +
          "== Характер и отношения с окружающими ==\n" +
          "{{Stub|раздел}}\n" +
          "\n" +
          "== Силы и способности ==\n" +
          "{{СиС}}\n" +
          "\n" +
          "== Снаряжение ==\n" +
          "{{Stub|раздел}}\n" +
          "\n" +
          "== Появления ==\n" +
          "{{Stub|раздел}}\nДля персонажей кинематографа" +
          "\n" +
          "== Интересные факты ==\n" +
          "{{Stub|раздел}}\nЕсли есть" +
          "\n" +
          "== Примечания ==\n" +
          "{{Примечания}}\n" +
          "\n" +
          "[[en: (Earth-616)]]"
          }
        }
      }
    }
  } );
/* Конец инфобоксов */

/*-------- Шаблоны --------*/
/* == Секция шаблонов; дополнительно == */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
  section: 'advanced',
  groups: {
    "templates": {
      'label': 'Шаблоны'
    }
  }
} );

/* Файл */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'templates',
  tools: {
  "file": {
    label: 'Картинка',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/7/7c/Кнопка_шаблона_Файл.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "{{Файл|Название_файла",
          post: "|Описание}}"
          }
        }
      }
    }
  } );

/* Цитата */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'templates',
  tools: {
  "citata": {
    label: 'Цитата',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/6/6e/Кнопка_шаблона_Цитата.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "{{Цитата|Это_цитата.",
          post: "|Автор|{{c||}}}}"
          }
        }
      }
    }
  } );

/* Сноска */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'templates',
  tools: {
  "cite": {
    label: 'Сноска',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/9/9e/Кнопка_шаблона_Сноска.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "{{R|ИГ|название_комикса",
          post: "|номер}}"
          }
        }
      }
    }
  } );

/* Сноска повтор */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'templates',
  tools: {
  "re-cite": {
    label: 'Повторная сноска',
    type: 'button',
    icon: 'https://images.wikia.nocookie.net/marvel/ru/images/3/3e/Кнопка_шаблона_Сноска_повтор.png',
      action: {
        type: 'encapsulate',
          options: {
          pre: "{{R|name=Comics_Title Vol 1 1",
          post: "}}"
          }
        }
      }
    }
  } );
/* Конец секции шаблонов */
};
/* Конец функуции var customizeToolbar */
/* Check if view is in edit mode and that the required modules are available. Then, customize the toolbar … */
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
  mw.loader.using( 'user.options' ).then( function () {
  // This can be the string "0" if the user disabled the preference 
  if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
    $.when(
    mw.loader.using( 'ext.wikiEditor' ), $.ready
    ).then( customizeToolbar );
    }
  } );
};
/* Конец быстрой вставки */