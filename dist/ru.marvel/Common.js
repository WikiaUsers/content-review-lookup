// На вики также подключены расширения "DynamicPageList" и "Variables"
//------------------------------------//
/* Подключение страниц */
importArticles({
    type: 'script',
    articles: [
        /* 'MediaWiki:InactiveUsers.js',         // Неактивный участник спустя 1 мес / переносится */
        /* 'u:dev:MediaWiki:PreloadFileDescription.js', // Описание изображений (параметры в Wikia.js) / переносится */
        'u:dev:MediaWiki:DiscordIntegrator/code.js', // Дискорд
        'u:dev:ProfileTags.js',               // Статусы участников / переносится */
        'u:dev:ShowHide/code.js',             // Сворачивание таблиц
    ]
});

var sMessage= '',
	sSection = 'new';

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

// Блок "Новые статьи" с Шаблон:NewPagesModule внутри.
$(function(){
	$('<section class="new-pages-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:NewPagesModule&action=render');
});

// Настройка блокировки статей от спойлеров
window.SpoilerAlertJS = {
    question: 'Эта статья содержит спойлеры. Вы уверены, что хотите продолжить чтение?',
    yes: 'Да',
    no: 'Нет',
    fadeDelay: 1600
};

/* Настройка для dev:PreloadTemplates */ 
preloadTemplates_subpage =  "case-by-case" ;

// Счётчик статей
mw.loader.using("mediawiki.api").then(
    function () {
        return new mw.Api().loadMessagesIfMissing(["community-header-pages"]);
    }
).then(
    function () {
        $.ajax({
            url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/api/v1/Articles/Details"),
            type: "GET",
            data: {
                controller: "DesignSystemApi",
                method: "getCommunityHeader",
                product: "wikis",
                id: mw.config.get("wgCityId"),
            }
        }).done(
            function (data) {
                var wikiTools = document.querySelectorAll(".wiki-tools");

                for (var i = 0; i < wikiTools.length; i++) {
                    var counter = document.createElement("div");

                    Object.assign(counter.style, {
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                        justifyContent: "center",
                        textAlign: "right",
                        marginRight: "8px"
                    });

                    var counterValue = document.createElement("span");
                    counterValue.innerHTML = data.counter.value;

                    Object.assign(counterValue.style, {
                        display: "block",
                        fontWeight: "bold",
                        lineHeight: 1
                    });

                    counter.appendChild(counterValue);

                    var counterLabel = document.createElement("span");
                    counterLabel.innerHTML = mw.message(data.counter.label.key).text();

                    Object.assign(counterLabel.style, {
                        display: "block",
                        fontSize: "10px",
                        fontWeight: "bold",
                        lineHeight: 1,
                        textTransform: "uppercase"
                    });

                    counter.appendChild(counterLabel);

                    wikiTools[i].children[0].before(counter);
                }
            }
        );
    }
);

// Всплывающая подсказка красных ссылок
document.querySelectorAll("a.new").forEach(
    function (i) {
        i.setAttribute("title", decodeURI(new mw.Uri(i.href).path.replace(mw.config.get("wgScriptPath"), "").replace("/wiki/", "").replace(/_/g, " ")));
    }
)