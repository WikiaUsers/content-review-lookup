$(document).ready(function()
{ 
	ShowContenter();
});

// добавление на страницу мобильного списка заголовков 
function ShowContenter()
{ 
    // убираем список со страницы, если таковой уже есть
    $("#Contenter, #ContenterText").remove();
 
    // ищем заголовки и их текст
    oHeaders2 = $("#WikiaArticle H2 span.mw-headline");
 
    // если заголовков нет, выходим
    if ( oHeaders2.length ===0 )
    {
        return;
    }
 
    // текст заголовка
    var sText = '';
    // текст заголовка, закодированный в ссылку
    var sTextHref = '';
    // счётчик для 2-го уровня
    var iLevel2 = 1;
    // счётчик для 3-го уровня
    var iLevel3 = 1;
 
    // добавляем иконку мобильного списка
    $(".WikiaSiteWrapper").prepend("<div id='Contenter' class='BlockRounded' title='Список заголовков на странице' style=''></div>");	
    // добавляем сам список
    $(".WikiaSiteWrapper").prepend("<div class='BlockThickBorder AddPaddingTop' id='ContenterText'  style=''><div class='BlockRounded'> </div></div>");	
    // добавляем оглавление списка
    $("#ContenterText .BlockRounded").append('<h2>Содержание</h2>');
 
    // для каждого заголовка 2-го уровня выполняем функцию
    oHeaders2.each( function()
        {  
            iLevel3 = 1;
            // находим текст заголовка 2-го уровня и обрезаем крайние пробелы
            sText = $(this).text().trim();
            // внутринние пробелы меняем на прочерк
            sTextHref = sText.replace(/ /g, "_");
            // символ % меняем на точку, символ ( на .28, символ ) на .29 -- так надо
            sTextHref = encodeURI( sTextHref ).replace(/%/g, ".").replace(/[(]/g, ".28").replace(/[)]/g, ".29").replace(/[!]/g, ".21").replace(/[,]/g, ".2C").replace(/[@]/g, ".40").replace(/[#]/g, ".23").replace(/[$]/g, ".24").replace(/[&]/g, ".26").replace(/[*]/g, ".2A").replace(/[']/g, ".27").replace(/[~]/g, ".7E");
            // добавляем 1 пункт 2-го уровня в список
            $("#ContenterText .BlockRounded").append( '<p>'+iLevel2 + '. <a href="#'+ sTextHref +'" rel="nofollow" >'+ sText +' </a></p>');
            // находим вложенные заголовки 3-го уровня
            oHeaders3= $(this).parent().nextUntil('h2','h3').find('span.mw-headline');
 
            // для каждого заголовка 3-го уровня выполняем функцию
            oHeaders3.each(function()
            {  
                // находим текст заголовка 2-го уровня и обрезаем крайние пробелы
                sText = $(this).text().trim();
 
                sTextHref = sText.replace(/ /g, "_");
                sTextHref = encodeURI( sTextHref ).replace(/%/g, ".").replace(/[(]/g, ".28").replace(/[)]/g, ".29").replace(/[!]/g, ".21").replace(/[,]/g, ".2C").replace(/[@]/g, ".40").replace(/[#]/g, ".23").replace(/[$]/g, ".24").replace(/[&]/g, ".26").replace(/[*]/g, ".2A").replace(/[']/g, ".27").replace(/[~]/g, ".7E");
 
                // добавляем 1 пункт 3-го уровня в список
                $("#ContenterText .BlockRounded").append( '<p> &emsp;' +iLevel2 +'.'+iLevel3 + '. <a href="#'+ sTextHref +'" rel="nofollow" >'+ sText +' </a></p>'); 
 
                iLevel3++;
            });
 
            iLevel2++;
        });
 
    // функция -- при щелчке по иконке показать/скрыть мобильный список
    $(" #Contenter").click (function ()
    {
        $("#ContenterText").fadeToggle(100) ;
    });
}