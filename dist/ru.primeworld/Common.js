/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/**************************************Свертывающиеся блоки и таблицы с сортировкой*****************************/
var	hasClass = function(e, c) { return $(e).hasClass(c); },
	import_script = importScript;

importScript("MediaWiki:Navigation.js");// collapsible tables and dynamic navigation


//Collapsiblе: 

var NavigationBarShowDefault = 2
var NavigationBarHide = '▲';
var NavigationBarShow = '▼';


var hasClass = (function (){
 var reCache = {}
 return function (element, className){
   return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className)
  }
})()

function collapsibleTables(){
 var Table, HRow,  HCell, btn, a, tblIdx = 0, colTables = []
 var allTables = document.getElementsByTagName('table')
 for (var i=0; Table = allTables[i]; i++){
   if (!hasClass(Table, 'collapsible')) continue
   if (!(HRow=Table.rows[0])) continue
   if (!(HCell=HRow.getElementsByTagName('th')[0])) continue
   Table.id = 'collapsibleTable' + tblIdx
   btn = document.createElement('span')
   btn.style.cssText = 'float:right; font-weight:normal; font-size:smaller'
   a = document.createElement('a')
   a.id = 'collapseButton' + tblIdx
   a.href = 'javascript:collapseTable(' + tblIdx + ');' 
   a.style.color = HCell.style.color
   a.appendChild(document.createTextNode(NavigationBarHide))
   btn.appendChild(a)
   HCell.insertBefore(btn, HCell.childNodes[0])
   colTables[tblIdx++] = Table
 }
 for (var i=0; i < tblIdx; i++)
   if ((tblIdx > NavigationBarShowDefault && hasClass(colTables[i], 'autocollapse')) || hasClass(colTables[i], 'collapsed'))
     collapseTable(i)
}

function collapseTable (idx){
 var Table = document.getElementById('collapsibleTable' + idx)
 var btn = document.getElementById('collapseButton' + idx)
 if (!Table || !btn) return false
 var Rows = Table.rows
 var isShown = (btn.firstChild.data == NavigationBarHide)
 btn.firstChild.data = isShown ?  NavigationBarShow : NavigationBarHide
 var disp = isShown ? 'none' : Rows[0].style.display
 for (var i=1; i < Rows.length; i++) 
    Rows[i].style.display = disp
}

function collapsibleDivs(){
 var navIdx = 0, colNavs = [], i, NavFrame
 var divs = document.getElementById('content').getElementsByTagName('div')
 for (i=0; NavFrame = divs[i]; i++) {
   if (!hasClass(NavFrame, 'NavFrame')) continue
   NavFrame.id = 'NavFrame' + navIdx
   var a = document.createElement('a')
   a.className = 'NavToggle'
   a.id = 'NavToggle' + navIdx
   a.href = 'javascript:collapseDiv(' + navIdx + ');'
   a.appendChild(document.createTextNode(NavigationBarHide))
   for (var j=0; j < NavFrame.childNodes.length; j++)
     if (hasClass(NavFrame.childNodes[j], 'NavHead'))
       NavFrame.childNodes[j].appendChild(a)
   colNavs[navIdx++] = NavFrame
 }
 for (i=0; i < navIdx; i++)
  if ((navIdx > NavigationBarShowDefault && !hasClass(colNavs[i], 'expanded')) || hasClass(colNavs[i], 'collapsed'))
     collapseDiv(i)
}

function collapseDiv(idx) {
 var div = document.getElementById('NavFrame' + idx)
 var btn = document.getElementById('NavToggle' + idx)
 if (!div || !btn) return false
 var isShown = (btn.firstChild.data == NavigationBarHide)
 btn.firstChild.data = isShown ? NavigationBarShow : NavigationBarHide 
 var disp = isShown ? 'none' : 'block'
 for (var child = div.firstChild;  child != null;  child = child.nextSibling)
   if (hasClass(child, 'NavPic') || hasClass(child, 'NavContent')) 
      child.style.display = disp
}

//Execution
if (wgCanonicalNamespace == 'Special')
{
}
else if (wgAction != 'history')
{
  addOnloadHook(collapsibleDivs)
  addOnloadHook(collapsibleTables)
}

/*********************************************************************************************************
* ПОЛЬЗОВАТЕЛЬСКИЕ СКРИПТЫ
*********************************************************************************************************/

/*****************************************************************************
* Скрипт для фильтрации строк таблицы по ключевым словам в конкретном столбце 
* + СВЕРНУТЬ/РАЗВЕРНУТЬ ВСЕ (! Не срабатывает)
******************************************************************************/
$('.expand').click(function () {
$('.NavFrame').removeClass('collapsed')
});

$('.collapse').click(function () {
$('.NavFrame').addClass('collapsed')
});

//Сила
$('.strength').click(function () {
$('.strength').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Сила")').parent().hide()
});
//Разум
$('.intellect').click(function () {
$('.intellect').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Разум")').parent().hide()
});
//Здоровье
$('.health').click(function () {
$('.health').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Здоровье")').parent().hide()
});
//Энергия
$('.energy').click(function () {
$('.energy').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Энергия")').parent().hide()
});
//Проворство
$('.dexterity').click(function () {
$('.dexterity').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Проворство")').parent().hide()
});
//Хитрость
$('.ruse').click(function () {
$('.ruse').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Хитрость")').parent().hide()
});
//Стойкость
$('.resistance').click(function () {
$('.resistance').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Стойкость")').parent().hide()
});
//Воля
$('.will').click(function () {
$('.will').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Воля")').parent().hide()
});
//Регенерация Здоровья
$('.reg_health').click(function () {
$('.reg_health').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Регенерация Здоровья")').parent().hide()
});
//Регенерация Энергии
$('.reg_energy').click(function () {
$('.reg_energy').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Регенерация Энергии")').parent().hide()
});
//Урон
$('.damage').click(function () {
$('.damage').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Урон")').parent().hide()
});
//Щит
$('.shield').click(function () {
$('.shield').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Щит")').parent().hide()
});
//Скорость
$('.speed').click(function () {
$('.speed').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Скорость")').parent().hide()
});
//Другое
$('.other').click(function () {
$('.other').css({'background-color':'bisque', 'font-weight':'bold'})
$('.filtered_table tr.parent_row').show();
$('.filtered_table tr').find('td:eq(4)').not('th').not(':contains("Другое")').parent().hide()
});
//Показать все
$('.show_all').click(function () {
$('.filtered_table tr').show();
});

/**********************************************************************************************************
* Скрипт для скрывающихся дочерних строк в Таблице талантов
* 
* !Доработать
* Сделать, чтобы не было жесткой привязки к количеству дочерних элементов.
/**********************************************************************************************************/
    $('tr.child_row').hide();
    $('tr.parent_row').click(function() {
        var CurRow = this.rowIndex;

        if ($(this).siblings().slice(CurRow, CurRow + 4).is(":hidden")) {
            $(this).siblings().slice(CurRow, CurRow + 4).show("300");
        } else {
            $(this).siblings().slice(CurRow, CurRow + 4).slideUp();
        }
    });

/*********************************************************************************************************
* ГЕРОИ
*********************************************************************************************************/

$('.hero_talents_wrap').hover(function() {
    $(this).addClass('hovered');
}, function() {
    $(this).removeClass('hovered');
});

$(".talent_data tr:even").css("background-color", "Grey");

/*********************************************************************************************************
* МЕНЮ ГЛАВНОЙ СТРАНИЦЫ
*********************************************************************************************************/
$(function() {
$('div.menu_but').click(function() {       
$('div.menu_cont').hide('slow');    
$(this).prev().show('slow');
});
$("div.menu_cont:eq(0)").show();
});

/*********************************************************************************************************
* ПЛАВАЮЩИЙ БЛОК ГЛАВНОЙ СТРАНИЦЫ
*********************************************************************************************************/
$(function() {
var offset = $(".fixed_abs").offset();
var topPadding = 15;
$(window).scroll(function() {
if ($(window).scrollTop() > offset.top) {
$(".fixed_abs").stop().animate({marginTop: $(window).scrollTop() - offset.top + topPadding});
}
else {$(".fixed_abs").stop().animate({marginTop: 0});};});
});

/*********************************************************************************************************
* ПАНЕЛЬ ГЕРОЕВ НА ГЛАВНОЙ СТРАНИЦЕ
*********************************************************************************************************/
$(".hero_icon_wrap").hover(function(){
    //var CurItem = this.id;
    $(this).children(".hero_icon_caption").fadeIn("fast");
},
function(){
    $(this).children(".hero_icon_caption").fadeOut("normal");
});

$(".hero_icon_caption").click(function() {
   $(this).siblings("a").click() 
});