function testtesttest()
{
   var testObj = getElementsByClassName(document, 'span', 'test1');
   for(var i in testObj)
   {
       testObj[i].style.background = 'white';
       testObj[i].style.color = 'black';
   }
}

function updatetimerTest(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var delta = count = Math.floor((then.getTime()-now.getTime())/(1000 * 60 * 60 * 24));
 
   //Выявление и избежание ошибки
   if(isNaN(delta)) { 
       timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
       return;
       }
 
   if(delta < 0) {
       delta = -delta;
       var tpm = '';
       }
       else var tpm = '';

   var left = '';
   var week = Math.floor(delta / 7); //Определяем кол-во недель
   var day = delta - 7 * week; //Определяем кол-во дней
   
   //Обновление таймера каждый день, а не каждую секунду
   if ((delta * 24 * 60 * 1000 + 1000) < count) return;
   
   //Если дней не 0, то выводим
   if (day !== 0) {
       if (day == 1) left = day + ' день';
       else if (day < 5) left = day + ' дня';
       else left = day + ' дней';
       }
    
   //Если есть и дни, и недели, то пишем союз
   if (day !== 0 && week !== 0) left = ' и ' + left;
   
   //Если недель не 0, то выводим
   if (week !== 0) {
       if (week % 10 == 1) left = week + ' неделя' + left;
       else if (week % 10 < 5) left = week + ' недели' + left;
       else left = week + ' недель' + left;
       }
    
   //Если и дней, и недель 0, то выводим "Меньше дня"
   if (day == 0 && week == 0) left = 'Меньше дня';
    
   timers[i].firstChild.nodeValue = tpm + left;
   timeouts[i] = setTimeout('updatetimerTest(' + i + ')', 1000 * 60 * 60 * 24);
 }
 
 function checktimersTest() {
     testtesttest();
   //Скрыть 'nocountdown' и показать 'countdown'
   var nocountdowns = getElementsByClassName(document, 'span', 'nocountdownONITest');
   for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
   var countdowns = getElementsByClassName(document, 'span', 'countdownONITest');
   for(var i in countdowns) countdowns[i].style.display = 'inline'
 
   timers = getElementsByClassName(document, 'span', 'countdowndateONITest');  
   timeouts = new Array();
   if(timers.length == 0) return;
   for(var i in timers) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     updatetimerTest(i);
   }
 }
 addOnloadHook(checktimersTest);