$(document).ready(function()
{ 
	// если таймеры имеются, 
	if ( $("#GalaxyMapDatabase").length > 0)
	{
		// запускаем 
		ShowMap( window.location.hash );
	}
});
 
/* ---------------------------------------------------------------------------
Функция проверяет наличие на странице картинок, следующих за элементами #ThumbMapLegends и #ThumbMapCanon. При успешном нахождении она добавляет им атрибут onClick, который вызывает эту же функцию с разными параметрами (записываются в хэш страницы).
 
Если хэш пустой, выполнение обрывается.
 
Если хэш заполнен и есть элемент #LegendPlanetList или #CanonPlanetList, находятся все элементы с атрибутом data-type (стиль ссылки), считывается их сожетжимое и выводится на весь экран карта галактики
*/
function ShowMap( sHash )
{ 
    // убираем список со страницы, если таковой уже есть 
    $("#GalaxyMap").remove();
    $("#GalaxyMapShell").remove();
 
    // поиск 1й картинки за элементом #ThumbMapLegends и добавление атрибута onClick с передачей параметра на вывод карты ЛЕГЕНД
    $('#ThumbMapLegends img:first-child ').attr('onClick', 'ShowMap( \'((обл=ЛЕГЕНДЫ))\' )'); 
    // поиск 1й картинки за элементом #ThumbMapCanon и добавление атрибута onClick с передачей параметра на вывод карты КАНОНА
    $('#ThumbMapCanon img:first-child ').attr('onClick', 'ShowMap( \'((обл=КАНОН))\' )'); 
 
    // если функция была вызвана без парамерта, ничего выводить не нужно -- выход
    if (sHash.length === 0) 
    {
        return 0;
    }
 
    // переменные
    var 
    iMapSquareSize= 0,  // шаг сетки в карте
    iStartX= 0,         // начальная точка по Х
    iStartY= 0,         // начальная точка по Y
    sPlanet = '',       // название планеты
    oPlanet = 0,        // элемент с указанным названием планеты
    sArea = '',         // область поиска: канон/легенды
    oPlanetList= 0,     // набор элементов с названиями планет
    sRootLink= '',      // сайт со статьёй про планету
    oCurPlanet= 0,      // текущий элемент с названием планеты
    oCurPlanetLink= 0,    // элемент (тег <а>), дающий ссылку на статью про планету
    oCurPlanetLinkText= 0,   // элемент (тег <span> в теге <а>), выводящий название планеты на карте
    oPlanetCursor= 0,   // объект с обводкой вокруг указанной планеты
    iPosY= 0,     // смещение по X
    iPosX= 0      // смещение по Y
 
    // одномерный массив -- номер каждой буквы = её позиции в этой строке (дял расшифровки координат планеты)
    arrMapCols = 'UTSRQPONMLKJIHGFED';
 
    // добавление на страницу новых элементов 
    $("body").prepend(
        "<div class='BlockThickBorder AddPaddingTop' id='GalaxyMapShell' >"+   //  подложка для карты,
           "<div id='GalaxyMap' > </div>"+   //  карта 
           "<img id='IcoCloseMap' title='Закрыть карту' onClick='CloseMap()' >"+ // иконка "Закрыть карту",
           "<p id='MapStatusBar'></p>"+   // строка состояния
        "</div>");	
 
    // уменьшение подложки для карты по высоте
    $( '#GalaxyMapShell' ).css('height', document.documentElement.clientHeight -100) ;
 
    // копируем хэш страницы
    sPlanet = sHash;
    // замена некоторых комбинаций символов для последующей расшифровки: .28 -- это откррытая скобка, .29 -- закрытая скобка, . -- это знак процента, %3D -- это знак равенства
    sPlanet = sPlanet.replace(/.28/g, "(").replace(/.29/g, ")").replace(/[.]/g, "%").replace(/%27/g, "").replace(/%3D/g, "=");
    // расшифровка русских и спецсимволов:
    sPlanet = decodeURI( sPlanet );
 
    // находим область поиска (канон/легенды) -- текст между обл= и ))
    sArea = sPlanet.replace(/.*обл=/, "").replace(/[))].*/, "").toUpperCase();
    // замена пробелов на знак подчёркивания. Отсечение лишних символов в названии планеты, следующих за ((
    sPlanet = sPlanet.replace(/[((].*/, "").replace(/ /g, "_").toUpperCase();
 
    // считывание значения шага сетки со страницы шаблона
    iMapSquareSize= Number( $('#MapSquareSize').text() );
 
    // вариации вывода карты в зависимости от найденой области поиска
    switch(sArea) 
    {
        case "ЛЕГЕНДЫ": 
        // загрузка карты легенд. Путь к картинке берётся из элемента #MapLinkLegend на странице шаблона
        $("#GalaxyMap").prepend("<img src='"+$('#MapLinkLegend').text()+"' />");
 
        // считывание начальных точек по Х и Y
        iStartX = Number( $('#MapStartXLegend').text() );
        iStartY = Number( $('#MapStartYLegend').text() );
 
        // выборка всех элементов атрибутом data-type (стиль ссылки)
        oPlanetList= $('#LegendPlanetList *[data-type]');         
        // находим элемент с указанным названием
        oPlanet = $( '#LegendPlanetList '+ sPlanet );
        break;
 
        // то же для канона
        case "КАНОН": 
        $("#GalaxyMap").prepend("<img src='"+$('#MapLinkCanon').text()+"' />");
        iStartX = Number( $('#MapStartXCanon').text() );
        iStartY = Number(  $('#MapStartYCanon').text() );
 
        // выборка всех элементов атрибутом data-type (стиль ссылки)
        oPlanetList= $('#CanonPlanetList *[data-type]'); 
        // находим элемент с указанным названием
        oPlanet = $( '#CanonPlanetList '+ sPlanet );
        break;
 
        // если область поиска задана неверно, выход
        default:
        $("#MapStatusBar").text("Ошибка при загрузке карты: область поиска (КАНОН или ЛЕГЕНДЫ) задана неверно – "+ sArea)
        return 0;
    }
 
    // счётчики    
    var iX, iY;
    // вывод сетки координат из div'ов
    for (iY = 0; iY < arrMapCols.length; iY++) 
    {
        for (iX = 2; iX < 22; iX++) 
        {
            // добавление текущей ячейки со смещением право/вниз
            $("#GalaxyMap").append( 
                '<div id="div_square_'+ arrMapCols[iY] +'-'+ (iX)+ '" style="left: '+ ( iStartX + iMapSquareSize * (iX-2) ) +'px; top: '+ ( iStartY + iMapSquareSize*iY) +'px; width: ' +iMapSquareSize+ 'px; height: '+iMapSquareSize+'px;" class="GalMapSquare" >'
                +'</div>'
            );
        }
    }
 
    // считывание со страницы шаблона ссылки на сайт со статьями про планеты
    sRootLink = $('#RootLink').text();
 
    // обработка набора с найдеными элементами с атрибутом data-type (стиль ссылки)
    oPlanetList.each(function()
	{
        // находим текущий элемент (планета/регион/сектор)
        oCurPlanet = $(this);
        // создаём новый тег <a>
        oCurPlanetLink =  document.createElement('a');
        // копируем создаём новый тег <a> и присваиваем ему класс из текущего элемента
        oCurPlanetLink.className = oCurPlanet.attr('data-type');
        // добавляем в тег <a> текст ( вложенный тег <span>)
        oCurPlanetLinkText = document.createElement('span');
        // присваиваем тегу <span> класс из текущего элемента
        oCurPlanetLinkText.innerHTML= oCurPlanet.attr('data-captRU');
        // вкладываем <span> в <a>
        oCurPlanetLink.appendChild(oCurPlanetLinkText);
 
        // создание точки-ссылки непосредственно в определённую ячейку карты 
        oSqureParent = '#div_'+ oCurPlanet.parent().attr('id') ;
        // добавление точки на карту
        $( oSqureParent ).prepend( oCurPlanetLink );
 
        // считываем координат точки из текущего элемента
        iPosY = Number( oCurPlanet.attr('data-yPos') );
        iPosX = Number( oCurPlanet.attr('data-xPos') ) ;
 
        // если в классе текущего элемента есть текст 'Planet', значит текущий элемент -- планета
        if ( oCurPlanetLink.className.match('Planet') )
        {
            // уменьшаем её координаты на 1 радиус точки-ссылки, чтобы вывести её чётко посередине 
            iPosY = iPosY - oCurPlanetLink.clientHeight/2;
            iPosX = iPosX - oCurPlanetLink.clientWidth  /2;
        }
 
        // устанавливаем координаты ссылки
        oCurPlanetLink.style.left= iPosX+'px';
        oCurPlanetLink.style.top= iPosY+'px';
        // формируем гиперссылку = сайт + название планеты
        oCurPlanetLink.setAttribute("href", sRootLink + oCurPlanet.attr('data-nameRU') );
        // устанавливаем  координаты текста в ссылке
        oCurPlanetLinkText.style.left= oCurPlanet.attr('data-captRUxPos') +'px';
        oCurPlanetLinkText.style.top= oCurPlanet.attr('data-captRUyPos') +'px';
    });
    // сообщение в строку состояния
    $("#MapStatusBar").text("Карта загружена успешно в интерактивном режиме." );
 
    // если в хэше указано название планеты, её нужно обвести на карте и прокрутить
    if (sPlanet.length >1 )
    {

        // если название не найдено (неверно), выход
        if ( oPlanet.length <= 0 )
        {
            // сообщение в строку состояния
            $("#MapStatusBar").text("Ошибка при загрузке карты в режиме указателя: название искомой планеты задано неверно – "+ sPlanet );
            return 0;
        }
 
       // поиск div-ячейки с точкой-ссылкой, которую нужно обвести куросором
        oCurPlanet = $( ('#div_'+ oPlanet.parent().attr('id')) );
        //создаём курсор 
        oCurPlanet.prepend("<div id='PlanetCursor'></div>");
 
        // находим координаты точки
        iPosY = oPlanet.attr('data-yPos')  ;
        iPosX = oPlanet.attr('data-xPos') ;
 
        oPlanetCursor = $( '#PlanetCursor' );
 
        // задаём координаты курсора
        oPlanetCursor.css({
            "left": iPosX - oPlanetCursor.width() / 2   +'px',
            "top": iPosY - oPlanetCursor.height()/ 2  + 'px'
        });
 
        // прокручиваем карту в примерное местоположение курсора
        $('#GalaxyMap').scrollTop( oCurPlanet.position().top - iMapSquareSize);
        $('#GalaxyMap').scrollLeft( oCurPlanet.position().left  - iMapSquareSize*3 ); 
 
         // сообщение в строку состояния
        $("#MapStatusBar").text("Карта загружена успешно в режиме указателя." );
    }

}
 
/* ---------------------------------------------------------------------------
закрытие карты 
*/
function CloseMap( )
{ 
    $("#GalaxyMapShell").remove();
}