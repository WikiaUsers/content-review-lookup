/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
 
/* Исправление для отображения .webm в галереях как гифок (скрытие интерфейса и зацикливание) */
$(function() {
    'use strict';
    
    function processWebmAsGif() {
        $('video').each(function() {
            var video = this;
            
            // Проверяем, не обработано ли уже это видео
            if (video.classList.contains('webm-gif-processed')) return;
            
            // Ищем источник видео (прямой src или внутри <source>)
            var src = video.src || (video.querySelector('source') ? video.querySelector('source').src : '');
            
            // Если это .webm файл
            if (src && src.indexOf('.webm') > -1) {
                // Убираем панель управления
                video.controls = false;
                // Зацикливаем
                video.loop = true;
                // Mute обязателен для автоплея
                video.muted = true;
                // Отключаем предзагрузку метаданных (опционально, убирает черный фон)
                video.preload = 'auto';
                
                // Функция для запуска воспроизведения
                function tryPlay() {
                    var playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(function() {
                            // Браузер заблокировал автоплей, пробуем позже при взаимодействии
                            $(document).one('click touchstart', function() {
                                video.play();
                            });
                        });
                    }
                }
                
                tryPlay();
                
                // Гарантированно скрываем контролы даже после событий плеера
                video.addEventListener('loadedmetadata', function() {
                    video.controls = false;
                });
                
                video.addEventListener('play', function() {
                    video.controls = false;
                });
                
                video.addEventListener('pause', function() {
                    // Если видео поставили на паузу (например, кликнули), перезапускаем
                    if (!video.ended) {
                        video.play();
                    }
                });
                
                // Помечаем как обработанное
                video.classList.add('webm-gif-processed');
            }
        });
    }
    
    // Запускаем при загрузке страницы
    processWebmAsGif();
    
    // Наблюдаем за изменениями DOM (для динамически подгружаемых галерей и лайтбокса)
    var observer = new MutationObserver(function(mutations) {
        processWebmAsGif();
    });
    
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
    
    // Дополнительно: повторная обработка при изменении хэша (открытие лайтбокса)
    $(window).on('hashchange', function() {
        setTimeout(processWebmAsGif, 100);
    });
});

/* Переключение +/− для кастомных кнопок шаблона Names */
$(function() {
    $('.names-toggle').on('click', function() {
        var $this = $(this);
        var targetId = $this.attr('id').replace('toggle-', '');
        var $target = $('#mw-customcollapsible-' + targetId);
        
        if ($target.hasClass('mw-collapsed')) {
            $this.text('[−]');
        } else {
            $this.text('[+]');
        }
    });
});

/* TOOLTIPS 
----первое число представляет описание; пусто = нет описания, 2 = есть описание----
----второе число представляет количество эффектов
*/

window.tooltips_list = [
        {
		classname: 'item-tooltip',
		parse: '{' + '{Template:Item tip|1=<#name#>|2=<#title#>|3=<#tier#>|4=<#use#>|5=<#desc#>|6=<#obtain#>|7=<#firstdrop#>|8=<#regdrop#>|9=<#specdrop#>|10=<#base#>|11=<#cond#>}}',
	},  {
        classname: 'enemy-tooltip',
        parse: '{' + '{Template:Enemy tip|1=<#name#>|2=<#title#>|3=<#code#>|4=<#race#>|5=<#type#>}}',
    },  {
        classname: 'character-tooltip',
        parse: '{' + '{Template:Character tip|1=<#name#>|2=<#class#>|3=<#rarity#>|4=<#faction#>|5=<#left#>|6=<#top#>|title=<#title#>|link=<#link#>}}',
    },	{
        classname: 'collectible-tooltip',
        parse: '{' + '{Template:Collectible tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text2b#>|5=<#text2c#>|t=<#type#>|no=<#no#>|e=<#event#>|q=<#quality#>|c=<#condition#>}}',
    },	{
        classname: 'furniture-tooltip',
        parse: '{' + '{Template:Furniture tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text2b#>|5=<#text2c#>|title=<#title#>|a=<#ambience#>|t1=<#type#>|t2=<#theme#>|s=<#set#>|o=<#obtain#>|o1a=<#obtain1a#>|o1b=<#obtain1b#>|o1c=<#obtain1c#>}}',
    },	{
        classname: 'outfit-tooltip',
        parse: '{' + '{Template:Outfit tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text3#>|m=<#model#>|s1=<#skin#>|i=<#illustrator#>|s2=<#series#>|o=<#obtain#>}}',
    },	{
        classname: 'glossary',
        parse: '{' + '{Template:Glossary tip|1=<#name#>|2=<#title#>|3=<#desc#>}}',
    },	{
        classname: 'profile-picture-tooltip',
        parse: '{' + '{Template:Profile picture tip|1=<#name#>|2=<#text#>|d=<#default#>|o=<#obtain#>}}',
    }
];
var oggPlayerButtonOnly = false;