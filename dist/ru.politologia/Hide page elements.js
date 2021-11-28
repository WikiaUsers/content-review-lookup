var x_hide_page_elements = new function(){
//Скрипт для сокрытия элементов формы. Закомментируйте те позиции, которые вы не хотели бы скрывать.
 
this.onLoad = function(){
//В этот момент страница уже загружена
//alert('onLoad');

var el = document.getElementById('editpage-copywarn');
if (el) el.style.display = 'none'; 


//Убираем нижний баннер
var el = document.getElementById('footer');
if (el) el.style.display = 'none'; 

var el = document.getElementById('column-google-topright');
if (el) el.style.display = 'none'; 

var el = document.getElementById('column-google-botright');
if (el) el.style.display = 'none'; 

var el = document.getElementById('column-google-right');
if (el) el.style.display = 'none'; 


 
}//function
 
}//obj

//установка функции-перехватчика 
if (doneOnloadHook) x_hide_page_elements.onLoad()
addOnloadHook(x_hide_page_elements.onLoad)