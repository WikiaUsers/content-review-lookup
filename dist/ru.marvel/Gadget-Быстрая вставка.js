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
        icon: 'https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png',
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
      icon: 'https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png',
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
          pre: "{{Персонаж" +
          "\r| Картинка = ",
          post: 
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
/* Конец инфобоксов */
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