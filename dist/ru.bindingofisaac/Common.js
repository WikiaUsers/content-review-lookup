//Шаблон:Nav - alt comm
$(function(){
    function navtemplateload(){
        if ( mw.config.get('wgNamespaceNumber') == 0) {
                    $('<div id="navtemplateload"></div>').prependTo(".page-footer");
                    $('#navtemplateload').load('https://bindingofisaac.fandom.com/ru/wiki/Шаблон:Nav .tbnavcomm');
        }
    }
$(navtemplateload);
});

//Шаблон:RailModule dev wiki
window.AddRailModule = [
    { page: 'Template:Rail0', prepend: true },
    'Template:Rail1',
];

//Стиль бек кнопки dev wiki
window.BackToTopModern = true;

//Превью предметов через модуль Getdata
window.tooltips_list = [{
    classname: 'tooltip-monster',
    parse: '{{#invoke:getdata|infobox|<#article#>|Монстр Rebirth}}'
},

{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Предмет Rebirth}}'
},


{
    classname: 'tooltip-trinket',
    parse: '{{#invoke:getdata|infobox|<#article#>|Брелок Rebirth}}'
},

{
    classname: 'tooltip-info',
    parse: '{{#invoke:getdata2|div|<#article#>|Инфо}}'
}

];


//Интерактивная таблица
if (mw.config.get('wgPageName') === 'Интерактивная_таблица') {
    importArticle({ type: 'script', article: 'MediaWiki:Items.js' });
}
//hof
if (mw.config.get('wgPageName') === 'Блог_участника:TRJ-VoRoN/Небосвод_почёта') {
    importArticle({ type: 'script', article: 'MediaWiki:Hof.js' });
}

//и ещё кусочек комфорта!
!function( $, mw ) {
	var page  = mw.config.get( 'wgTitle' )
	  , pages = [
	  	    'Таблица артефактов',
	  	    'Таблица брелоков',
	  	    'Интерактивная таблица'
	  	]; 

	if ( pages.indexOf( page ) == -1 ) return;

    $( 'img.lazyload' ).each( function() {
		$( this )
          .attr( 'src', $( this ).attr( 'data-src' ) )
          .attr( 'class', 'lazyloaded' );
    });
}( jQuery, mediaWiki );





//Подсветка активной статьи
if ($('#blight').length) {
   $('#blight .sn[data-title="' + mw.config.get('wgPageName') + '"]').addClass("snlight");
}


//Подсветка кнопок сортировки
$(document).on('click', '.rentable_sort span', function(){
	  $(this).addClass('active_ita').siblings().removeClass('active_ita')
})

//Переключатель для инт. таблицы (и возможно для других элементов)
  $(function () {
        $('.switch-btn').click(function () {
            $(this).toggleClass('switch-on');
            if ($(this).hasClass('switch-on')) {
                $(this).trigger('on.switch');
            } else {
                $(this).trigger('off.switch');
            }
        });
        $('.switch-btn').on('on.switch', function () {
            $($(this).attr('data-id')).removeClass('bl-hide');
        });
        $('.switch-btn').on('off.switch', function () {
            $($(this).attr('data-id')).addClass('bl-hide');
        });
    });


// Кнопка открытия попапа создания блога

$(function () {
    /* Based on dev:CreateNewBlogButton.js */
    var user = mw.config.get('wgUserName');
    if ((user !== null) && $('.create_new_blog').length) {
        $('.create_new_blog').html('<div class="new-blog-btn create_new_blog"><span>Создать свой</span></div>');
        var editurl = 'placeholder';
        if ((mw.user.options.get('editor') === "2") && (mw.user.options.get('editortype') === "2")) {
            editurl = "?veaction=edit";    
        }
        else {
            editurl = "?action=edit";
        }
        $('.create_new_blog').click(function t() {
            OO.ui.prompt('Написать блог', {
                textInput: {
                    placeholder: 'Введите заголовок'
                }
            }).done((function(t) {
                t && (window.location.href = function(t) {
                const e = mw.config.get("wgArticlePath").replace("$1", 'User_blog:'+user);
                return "".concat(e, "/").concat(encodeURIComponent(t), editurl);
                }(t));
            }));
        } );    
    }
} );

//preview blogmod
importArticles({
    type: "script",
    articles: [
        "u:nkch:MediaWiki:OpenGraph.js",
    ]
});

//Кликабельная деятельность

function addLinkInActivityModule() {
    if ($("#WikiaRail section").length >= 2)
        $("#wikia-recent-activity .has-icon").wrap("<a href='https://"+ window.location.host +"/ru/wiki/Служебная:Свежие_правки'>")
    else
        setTimeout(addLinkInActivityModule, 500)
}
addLinkInActivityModule()

//сп
$(function(){
    var config = mw.config.get(['wgScriptPath']);
    $('.fandom-community-header__local-navigation .wds-dropdown:first-child ul.wds-list').prepend('<li><a href="' + config.wgScriptPath + '/wiki/Special:RecentChanges"><svg class="wds-icon wds-icon-tiny navigation-item-icon"><use xlink:href="#wds-icons-activity-small"></use></svg>Свежие правки</a></li>');
});


//lw
$(function(){   
    switch ( mw.config.get('wgPageName') ) {
        case 'Таблица_артефактов':
            $('body').addClass('is-content-expanded')
        break;
    }
});

$(function(){   
    switch ( mw.config.get('wgPageName') ) {
        case 'Шаблон:Полотно_сервера':
            $('body').addClass('is-content-expanded')
        break;
    }
});

//Шаблон:Hof
$(function(){   
    switch ( mw.config.get('wgPageName') ) {
        case 'Блог_участника:TRJ-VoRoN/Небосвод_почёта':
            $('body').addClass('is-content-expanded')
        break;
    }
});