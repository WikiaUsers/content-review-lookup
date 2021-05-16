/* На вики также подключено "Extension:DynamicPageList" MediaWiki */

// =====================================
// == Imports ==
// See MediaWiki:ImportJS

var MultiUploadoption = {
    max: 30
};

// ============================================================
// == Автовыведения имени посетителя ==
(function () { 
if ( !wgUserName ) return; 
$("span.insertusername").text(wgUserName); 
})();

// == Описание изображений на странице загрузки оных ==
// выполнение при готовности страницы
$(document).ready(function()
{      
    // если открыта страница загрузки изображения
    if (wgCanonicalSpecialPageName === 'Upload') 
    {
        // добавление шаблона в поле краткого описания для загружаемого изображения
        $('#wpUploadDescription').val('{{Изображение \n| Описание  = \n| Источник  = \n| Появления = \n| Автор     = \n| Категория = \n| Лицензия  = \n}}');
        // перемещение выпадающего списка лицензий и блока для шаблона выбранной лицензии 
        $("tr.mw-htmlform-field-HTMLTextAreaField").after( $("tr.mw-htmlform-field-Licenses, tr.mw-htmlform-field-Licenses + tr") );
        
        $('#wpDestFile').before( $('label[for=wpDestFile]' ) )
          .after( 
          '<div id="UploadDescriptionContainersAll">'+
            '<div id="UploadDescriptionContainer1"></div>'+
          '</div>'+
          '<div id="LicensesContainer"></div>'
        );
        $('#UploadDescriptionContainer1').append(
            $('label[for=wpUploadDescription], #wpUploadDescription' )
        );

        // перемещение выпадающего списка лицензий и блока для шаблона выбранной лицензии 
        $('#LicensesContainer').append( $('label[for=wpLicense]' ), $('#wpLicense' ) );
        $('#wpLicense' ).wrap('<div></div>') ;
    }
	
	if (wgCanonicalNamespace === 'Forum')
	{
		importScript('MediaWiki:Forum.js');
	}
});

/*****************************/
/*Для скрипта загрузки файлов*/
/*****************************/
 
PFD_messages = {
    'ru': {
        'alternative-version': 'Альтернативные версии',
        'basic-version': 'По умолчанию',
        'multiple-versions': 'Этот шаблон доступен в двух версиях:',
        'template-change-notice': 'Изменение шаблона будет перезаписывать текущее описание.',
        'confirm-overwrite': 'Описание было изменено.\nВы уверены, что хотите сохранить эти изменения?',
        'discourage-editor-file-upload': 'Используйте <a href="/wiki/Special:Upload">Служебная:Upload</a> для загрузки файлов.',
        'discourage-continue': 'Продолжить',
        'disabled-submit': 'Выберете лицензию для того чтобы загрузить файл',
    }
};
 
PFD_templates = [{
        label: 'Выберите категорию',
        desc: '{{Изображение\n'+
        '| Описание = Описание содержания картинки\n'+
        '| Источник = Откуда взята или сделана картинка (не сайт)\n'+
        '| Появления = Перечисление изображённого на картинке\n'+
        '| Автор = Если изображение конкретного человека (как фан-арт)\n'+
        '| Категория = Категория изображения\n'+
        '| Лицензия = Автоматически или указать\n'+
        '}}'
    },
        'Портреты', {
        label: 'Портреты',
        desc: '{{Изображение\n| Описание = Изображение предмета.\n| Источник = \n| Содержание = \n| Категория = [[Категория:Портреты]]\n| Лицензия = \n}}'
    },
        'Портреты в полный рост HQ', {
        label: 'Изображения мест',
        desc: '{{Изображение\n| Описание = Изображение места.\n| Источник = \n| Содержание = \n| Категория = [[Категория:Портреты в полный рост HQ]]\n| Лицензия = \n}}'
    },
 
        'Изображения из видеоигр', {
        label: 'Treasure Cruise',
        desc: '{{Изображение\n| Описание = \n| Источник = \n| Содержание = \n| Категория = [[Категория:Treasure Cruise]]\n| Лицензия = \n}}'
    },
 
        'Изображения из аниме', {
        label: 'Изображения из аниме',
        desc: '{{Изображение\n| Описание = \n| Источник = \n| Содержание = \n| Автор = \n| Категория = [[Категория:Изображения из аниме]]\n| Лицензия = \n}}'
    },
 
        'Обложки', {
        label: 'Обложки глав',
        desc: '{{Изображение\n| Описание = \n| Источник = \n| Появления = \n| Автор = \n| Категория = [[Категория:Обложки глав]]\n| Лицензия = \n}}',
    }, {
        label: 'Обложки томов',
        desc: '{{Изображение\n| Описание = \n| Источник = \n| Появления = \n| Автор = \n| Категория = [[Категория:Обложки томов]]\n| Лицензия = \n}}'
    }
];
 
PFD_discourageEditorFileUpload = true;

/* подложка карты*/
if ($('#noMap').length) {
$('body').append('<div style="display: none; background: rgba(30, 36, 49, 0);" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
$('#forMap').on('click', function(e){ //Скрывает карту при нажатии на пустое место
    if(e.target.id == "forMap"){
        $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display: none"});
        $('#forMap').attr({"style":"display:none"});
    }
});
 
$('#showMap').on('click', function(e){ //отображает карту при нажатии на кнопку
    $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
    $('#forMap').attr({"style":"display:block"});
});
}