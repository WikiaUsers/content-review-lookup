/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Главное меню. Табуляция. Взято с http://ru.summonerswar.wikia.com */
// Script for switching tabs on main page
(function($) {
 
    function switchtab() {
        if (!$('.switchtab').length) {
            return;
        }
 
        $('.switchtab').click(function() {
            if ($(this).hasClass('toggledtab')) {
                return;
            }
 
            to_hide = $('.toggledtab').attr('data-tab');
            to_show = $(this).attr('data-tab');
 
            $('.toggledtab').toggleClass('toggledtab');
            $(this).toggleClass('toggledtab');
 
            $('.tab' + to_hide).hide(0);
            $('.tab' + to_show).show(0);
        });
    }
    mw.hook('wikipage.content').add(switchtab);
 
})(this.jQuery);

/**Сприт отмечает неактивных участников параметр 2 месяца*/
//Inactive users
InactiveUsers = { 
    months: 2,
    text: 'В СТАЗИСЕ'
};


/* Счётчик статей. Табуляция. Взято с marvel.fandom.com/ru */
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

// выполнение при готовности страницы
$(document).ready(function()
{      
    // если открыта страница загрузки изображения
    if (wgCanonicalSpecialPageName === 'Upload') 
    {
        // добавление шаблона в поле краткого описания для загружаемого изображения
        $('#wpUploadDescription').val('{{Описание \n| Описание  = \n| Пояснение = \n| Дата      = \n| Автор     = \n| Лицензия  = \n}}\n');
	}
});