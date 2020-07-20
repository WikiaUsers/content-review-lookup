 function Countdown(seedDate, loopTime, loopUnit, loopLimit, delayTime, delayUnit, dateFormat, dateLabels, separators) {
     const oneYear = 31536000000,
         oneMonth = oneYear / 12,
         oneDay = oneYear / 365;
     const oneHour = 3600000,
         oneMinute = 60000,
         oneSecond = 1000;
     var count = document.getElementsByClassName("customcountdown");
     var s = 0,
         r = 0,
         t = 0,
         u = 0;
     for (var k = 0; k < count.length; k++) {
         var now = new Date();
         var i = 0,
             i2 = 0,
             loopConv = 0,
             delayConv = 0;
         var loopTime1 = Number(loopTime[k].innerHTML),
             loopLimit1 = Number(loopLimit[k].innerHTML),
             delayTime1 = Number(delayTime[k].innerHTML);
         if (seedDate[k].innerHTML === '') seedDate[k].innerHTML = 'December 3, 2015 00:00:00 UTC';
         if (isNaN(loopTime[k].innerHTML)) loopTime1 = 0;
         if (loopUnit[k].innerHTML === '') loopUnit[k].innerHTML = 's';
         if (isNaN(loopLimit[k].innerHTML)) loopLimit1 = 0;
         if (isNaN(delayTime[k].innerHTML)) delayTime1 = 0;
         if (delayUnit[k].innerHTML === '') delayUnit[k].innerHTML = 's';
         var nextDate = new Date(seedDate[k].innerHTML);

         // преобразование введенного цикла/времени задержки в указанный период времени в миллисекундах
         switch (loopUnit[k].innerHTML) {
             case 'Y':
                 loopConv = loopTime1 * oneYear;
                 break;
             case 'M':
                 loopConv = loopTime1 * oneMonth;
                 break;
             case 'D':
                 loopConv = loopTime1 * oneDay;
                 break;
             case 'h':
                 loopConv = loopTime1 * oneHour;
                 break;
             case 'm':
                 loopConv = loopTime1 * oneMinute;
                 break;
             case 's':
                 loopConv = loopTime1 * oneSecond;
                 break;
         }
         switch (delayUnit[k].innerHTML) {
             case 'Y':
                 delayConv = delayTime1 * oneYear;
                 break;
             case 'M':
                 delayConv = delayTime1 * oneMonth;
                 break;
             case 'D':
                 delayConv = delayTime1 * oneDay;
                 break;
             case 'h':
                 delayConv = delayTime1 * oneHour;
                 break;
             case 'm':
                 delayConv = delayTime1 * oneMinute;
                 break;
             case 's':
                 delayConv = delayTime1 * oneSecond;
                 break;
         }
         var nextDate2 = new Date(nextDate.getTime() + delayConv);

         while (nextDate.getTime() <= now.getTime()) {
             i += 1;
             if (i === (loopLimit1 + 1)) break;
             else nextDate.setTime(nextDate.getTime() + loopConv);
         }
         while (nextDate2.getTime() <= now.getTime()) {
             i2 += 1;
             if (i2 === (loopLimit1 + 1)) break;
             else nextDate2.setTime(nextDate2.getTime() + loopConv);
         }

         // приходится на летнее время между сейчас и сроки, если не указано иное
         var dst_offset = 0,
             dst_offset2 = 0;
         if (document.getElementById('dst_' + k).innerHTML === '') {
             dst_offset = (now.getTimezoneOffset() - nextDate.getTimezoneOffset()) * 60 * 1000;
             dst_offset2 = (now.getTimezoneOffset() - nextDate2.getTimezoneOffset()) * 60 * 1000;
         }

         // общее время между текущей датой и целевой датой в миллисекундах
         // to certain time period
         // (i.e. for 120 minutes: years = 0; months = 0; days = 0;
         // hours = 2; minutes = 120; seconds = 7200)
         // time string will result in "00021207200" thus far
         var diff = (nextDate.getTime() - now.getTime()) + dst_offset;
         var diff2 = (nextDate2.getTime() - now.getTime()) + dst_offset2;
         var yearsleft = Math.floor(diff / oneYear);
         var yearsleft2 = Math.floor(diff2 / oneYear);
         var monthsleft = Math.floor(diff / oneMonth);
         var monthsleft2 = Math.floor(diff2 / oneMonth);
         var daysleft = Math.floor(diff / oneDay);
         var daysleft2 = Math.floor(diff2 / oneDay);
         var hoursleft = Math.floor(diff / oneHour);
         var hoursleft2 = Math.floor(diff2 / oneHour);
         var minutesleft = Math.floor(diff / oneMinute);
         var minutesleft2 = Math.floor(diff2 / oneMinute);
         var secondsleft = Math.floor(diff / oneSecond);
         var secondsleft2 = Math.floor(diff2 / oneSecond);

         // находит периоды времени, необходимые для указанного формата даты
         var Y_Count = 0,
             M_Count = 0,
             D_Count = 0,
             h_Count = 0,
             m_Count = 0,
             s_Count = 0;
         if (dateFormat[k].innerHTML === '') dateFormat[k].innerHTML = 'YY MM DD hh mm ss';
         for (var position = 0; position < dateFormat[k].innerHTML.length; position++) {
             switch (dateFormat[k].innerHTML.charAt(position)) {
                 case 'Y':
                     Y_Count += 1;
                     break;
                 case 'M':
                     M_Count += 1;
                     break;
                 case 'D':
                     D_Count += 1;
                     break;
                 case 'h':
                     h_Count += 1;
                     break;
                 case 'm':
                     m_Count += 1;
                     break;
                 case 's':
                     s_Count += 1;
                     break;
             }
         }

         // based on the specified time periods desired, sets the time periods to
         // account for the other time periods
         // (i.e. for 120 minutes & "hh mm ss": years = 0; months = 0; days = 0;
         // hours = 2; minutes = 0; seconds = 0)
         // time string will result in "000200" thus far
         if (Y_Count === 0) {
             yearsleft = 0;
             yearsleft2 = 0;
         }
         if (M_Count === 0) {
             monthsleft = 0;
             monthsleft2 = 0;
         } else {
             monthsleft = (monthsleft * oneMonth - yearsleft * oneYear) / oneMonth;
             monthsleft2 = (monthsleft2 * oneMonth - yearsleft2 * oneYear) / oneMonth;
         }
         if (D_Count === 0) {
             daysleft = 0;
             daysleft2 = 0;
         } else {
             daysleft = (daysleft * oneDay - yearsleft * oneYear - monthsleft * oneMonth) / oneDay;
             daysleft2 = (daysleft2 * oneDay - yearsleft2 * oneYear - monthsleft2 * oneMonth) / oneDay;
         }
         if (h_Count === 0) {
             hoursleft = 0;
             hoursleft2 = 0;
         } else {
             hoursleft = (hoursleft * oneHour - yearsleft * oneYear - monthsleft * oneMonth - daysleft * oneDay) / oneHour;
             hoursleft2 = (hoursleft2 * oneHour - yearsleft2 * oneYear - monthsleft2 * oneMonth - daysleft2 * oneDay) / oneHour;
         }
         if (m_Count === 0) {
             minutesleft = 0;
             minutesleft2 = 0;
         } else {
             minutesleft = (minutesleft * oneMinute - yearsleft * oneYear - monthsleft * oneMonth - daysleft * oneDay - hoursleft * oneHour) / oneMinute;
             minutesleft2 = (minutesleft2 * oneMinute - yearsleft2 * oneYear - monthsleft2 * oneMonth - daysleft2 * oneDay - hoursleft2 * oneHour) / oneMinute;
         }
         if (s_Count === 0) {
             secondsleft = 0;
             secondsleft2 = 0;
         } else {
             secondsleft = (secondsleft * oneSecond - yearsleft * oneYear - monthsleft * oneMonth - daysleft * oneDay - hoursleft * oneHour - minutesleft * oneMinute) / oneSecond;
             secondsleft2 = (secondsleft2 * oneSecond - yearsleft2 * oneYear - monthsleft2 * oneMonth - daysleft2 * oneDay - hoursleft2 * oneHour - minutesleft2 * oneMinute) / oneSecond;
         }

         // based on the specified time periods' desired format, gives time string
         // leading zeroes
         // (i.e. for 120 minutes & "hh mm ss": years = 0; months = 0; days = 0;
         // hours = 02; minutes = 00; seconds = 00)
         // time string will result in "000020000" thus far
         var Y_zeros = '',
             M_zeros = '',
             D_zeros = '',
             h_zeros = '',
             m_zeros = '',
             s_zeros = '';
         var Y_zeros2 = '',
             M_zeros2 = '',
             D_zeros2 = '',
             h_zeros2 = '',
             m_zeros2 = '',
             s_zeros2 = '';
         for (var j = 1; j < s_Count; j++) {
             if (secondsleft < Math.pow(10, s_Count - j)) s_zeros = '0' + s_zeros;
             if (secondsleft2 < Math.pow(10, s_Count - j)) s_zeros2 = '0' + s_zeros2;
         }
         for (j = 1; j < m_Count; j++) {
             if (minutesleft < Math.pow(10, m_Count - j)) m_zeros = '0' + m_zeros;
             if (minutesleft2 < Math.pow(10, m_Count - j)) m_zeros2 = '0' + m_zeros2;
         }
         for (j = 1; j < h_Count; j++) {
             if (hoursleft < Math.pow(10, h_Count - j)) h_zeros = '0' + h_zeros;
             if (hoursleft2 < Math.pow(10, h_Count - j)) h_zeros2 = '0' + h_zeros2;
         }
         for (j = 1; j < D_Count; j++) {
             if (daysleft < Math.pow(10, D_Count - j)) D_zeros = '0' + D_zeros;
             if (daysleft2 < Math.pow(10, D_Count - j)) D_zeros2 = '0' + D_zeros2;
         }
         for (j = 1; j < M_Count; j++) {
             if (monthsleft < Math.pow(10, M_Count - j)) M_zeros = '0' + M_zeros;
             if (monthsleft2 < Math.pow(10, M_Count - j)) M_zeros2 = '0' + M_zeros2;
         }
         for (j = 1; j < Y_Count; j++) {
             if (yearsleft < Math.pow(10, Y_Count - j)) Y_zeros = '0' + Y_zeros;
             if (yearsleft2 < Math.pow(10, Y_Count - j)) Y_zeros2 = '0' + Y_zeros2;
         }

         // based on the specified time periods' desired units, gives each time
         // period in the string certain units
         // (i.e. for 120 minutes & "hh mm ss" & "single": years = 0Y; months = 0M;
         // days = 0D; hours = 02h; minutes = 00m; seconds = 00s)
         // time string will result in "0Y0M0D02h00m00s" thus far
         var yearunit = '',
             monthunit = '',
             dayunit = '';
         var hourunit = '',
             minuteunit = '',
             secondunit = '';
         if (dateLabels[k].innerHTML === 'full') {
             yearunit = ' Years';
             monthunit = ' Months';
             dayunit = ' Days';
             hourunit = ' Hours';
             minuteunit = ' Minutes';
             secondunit = ' Seconds';
         } else if (dateLabels[k].innerHTML === 'single') {
             yearunit = 'Y';
             monthunit = 'M';
             dayunit = 'D';
             hourunit = 'h';
             minuteunit = 'm';
             secondunit = 's';
         }

         // separates each time period in the time string by the specified separators
         // (i.e. for 120 minutes & "hh mm ss" & "single" & " " or "&nbsp;": 
         // years = 0Y ; months = 0M ; days = 0D ; hours = 02h ;
         // minutes = 00m ; seconds = 00s)
         // time string will result in "0Y 0M 0D 02h 00m 00s" thus far
         var sep = separators[k].innerHTML;
         if (separators[k].innerHTML === '') sep = '';

         var counttext = document.getElementsByClassName("customcountdown")[k].innerHTML;
         var n = counttext.search(/loopCount/i),
             m = counttext.search(/countXinterval/i);
         var o = counttext.search(/loopCount2/i),
             p = counttext.search(/countXinterval2/i);

         // when loop iterations reaches loop limit, hide normal text, hide delay
         // text, hide normal/delay time periods, and only show end of loop text
         if ((i === (loopLimit1 + 1)) && (nextDate.getTime() <= now.getTime())) {
             document.getElementById('endText_' + k).setAttribute("style", "display:visible");
             document.getElementById('bText_' + k).setAttribute("style", "display:none");
             document.getElementById('aText_' + k).setAttribute("style", "display:none");
             document.getElementById('aDelayText_' + k).setAttribute("style", "display:none");
             document.getElementById('bDelayText_' + k).setAttribute("style", "display:none");
             $('#years_' + k).html('');
             $('#months_' + k).html('');
             $('#days_' + k).html('');
             $('#hours_' + k).html('');
             $('#minutes_' + k).html('');
             $('#seconds_' + k).html('');
             if ($('.loopCount').length > 0) {
                 if (n !== -1) document.getElementById('loopCount_' + (k - s)).innerHTML = i - 1;
                 else s += 1;
             }
             if ($('.countXinterval').length > 0) {
                 if (m !== -1) document.getElementById('countXinterval_' + (k - r)).innerHTML = (i - 1) * loopTime[k].innerHTML;
                 else r += 1;
             }
             if ($('.loopCount2').length > 0) {
                 if (o !== -1) document.getElementById('loopCount2_' + (k - t)).innerHTML = i - 1;
                 else t += 1;
             }
             if ($('.countXinterval2').length > 0) {
                 if (p !== -1) document.getElementById('countXinterval2_' + (k - u)).innerHTML = (i - 1) * loopTime[k].innerHTML;
                 else u += 1;
             }
         } else {
             // when delay time reaches inputted delay time show delay text, hide normal
             // text, and only show delay time periods specified by date format
             if ((Math.floor(diff2 / oneSecond) * oneSecond) < delayConv) {
                 document.getElementById('endText_' + k).setAttribute("style", "display:none");
                 document.getElementById('bText_' + k).setAttribute("style", "display:none");
                 document.getElementById('aText_' + k).setAttribute("style", "display:none");
                 document.getElementById('aDelayText_' + k).setAttribute("style", "display:visible");
                 document.getElementById('bDelayText_' + k).setAttribute("style", "display:visible");
                 if (document.getElementById('delayCountDisplay_' + k).innerHTML === '') {
                     if (Y_Count !== 0) $('#years_' + k).html(Y_zeros2 + Math.floor(yearsleft2) + yearunit + sep);
                     if (M_Count !== 0) $('#months_' + k).html(M_zeros2 + Math.floor(monthsleft2) + monthunit + sep);
                     if (D_Count !== 0) $('#days_' + k).html(D_zeros2 + Math.floor(daysleft2) + dayunit + sep);
                     if (h_Count !== 0) $('#hours_' + k).html(h_zeros2 + Math.floor(hoursleft2) + hourunit + sep);
                     if (m_Count !== 0) $('#minutes_' + k).html(m_zeros2 + Math.floor(minutesleft2) + minuteunit + sep);
                     if (s_Count !== 0) $('#seconds_' + k).html(s_zeros2 + Math.floor(secondsleft2) + secondunit);
                 } else {
                     $('#years_' + k).html('');
                     $('#months_' + k).html('');
                     $('#days_' + k).html('');
                     $('#hours_' + k).html('');
                     $('#minutes_' + k).html('');
                     $('#seconds_' + k).html('');
                 }
                 if ($('.loopCount').length > 0) {
                     if (n !== -1) document.getElementById('loopCount_' + (k - s)).innerHTML = i - 1;
                     else s += 1;
                 }
                 if ($('.countXinterval').length > 0) {
                     if (m !== -1) document.getElementById('countXinterval_' + (k - r)).innerHTML = (i - 1) * loopTime[k].innerHTML;
                     else r += 1;
                 }
                 if ($('.loopCount2').length > 0) {
                     if (o !== -1) document.getElementById('loopCount2_' + (k - t)).innerHTML = i - 1;
                     else t += 1;
                 }
                 if ($('.countXinterval2').length > 0) {
                     if (p !== -1) document.getElementById('countXinterval2_' + (k - u)).innerHTML = (i - 1) * loopTime[k].innerHTML;
                     else u += 1;
                 }
             }
             // while delay time has yet to reach inputted delay time show normal text,
             // hide delay text, and only show normal time periods specified by date 
             // format
             // (i.e. for 120 minutes & "hh mm ss" & "single" & " " or "&nbsp;": 
             // years = ; months = ; days = ; hours = 02h ;
             // minutes = 00m ; seconds = 00s)
             // time string will result in "02h 00m 00s" thus far
             else {
                 document.getElementById('endText_' + k).setAttribute("style", "display:none");
                 document.getElementById('bDelayText_' + k).setAttribute("style", "display:none");
                 document.getElementById('aDelayText_' + k).setAttribute("style", "display:none");
                 document.getElementById('aText_' + k).setAttribute("style", "display:visible");
                 document.getElementById('bText_' + k).setAttribute("style", "display:visible");
                 if (Y_Count !== 0) $('#years_' + k).html(Y_zeros + Math.floor(yearsleft) + yearunit + sep);
                 if (M_Count !== 0) $('#months_' + k).html(M_zeros + Math.floor(monthsleft) + monthunit + sep);
                 if (D_Count !== 0) $('#days_' + k).html(D_zeros + Math.floor(daysleft) + dayunit + sep);
                 if (h_Count !== 0) $('#hours_' + k).html(h_zeros + Math.floor(hoursleft) + hourunit + sep);
                 if (m_Count !== 0) $('#minutes_' + k).html(m_zeros + Math.floor(minutesleft) + minuteunit + sep);
                 if (s_Count !== 0) $('#seconds_' + k).html(s_zeros + Math.floor(secondsleft) + secondunit);
                 if ($('.loopCount').length > 0) {
                     if (n !== -1) document.getElementById('loopCount_' + (k - s)).innerHTML = i;
                     else s += 1;
                 }
                 if ($('.countXinterval').length > 0) {
                     if (m !== -1) document.getElementById('countXinterval_' + (k - r)).innerHTML = i * loopTime[k].innerHTML;
                     else r += 1;
                 }
                 if ($('.loopCount2').length > 0) {
                     if (o !== -1) document.getElementById('loopCount2_' + (k - t)).innerHTML = i;
                     else t += 1;
                 }
                 if ($('.countXinterval2').length > 0) {
                     if (p !== -1) document.getElementById('countXinterval2_' + (k - u)).innerHTML = i * loopTime[k].innerHTML;
                     else u += 1;
                 }
             }
         }
     }
 }


 var count = document.getElementsByClassName("customcountdown");
 var loopCount = 0;
 if ($('.loopCount').length > 0) {
     loopCount = document.getElementsByClassName('loopCount');
     for (var k = 0; k < loopCount.length; k++) {
         loopCount[k].id = 'loopCount_' + k;
     }
 }
 var countXinterval = 0;
 if ($('.countXinterval').length > 0) {
     countXinterval = document.getElementsByClassName('countXinterval');
     for (k = 0; k < countXinterval.length; k++) {
         countXinterval[k].id = 'countXinterval_' + k;
     }
 }
 var loopCount2 = 0;
 if ($('.loopCount2').length > 0) {
     loopCount2 = document.getElementsByClassName('loopCount2');
     for (var k = 0; k < loopCount2.length; k++) {
         loopCount2[k].id = 'loopCount2_' + k;
     }
 }
 var countXinterval2 = 0;
 if ($('.countXinterval2').length > 0) {
     countXinterval2 = document.getElementsByClassName('countXinterval2');
     for (k = 0; k < countXinterval2.length; k++) {
         countXinterval2[k].id = 'countXinterval2_' + k;
     }
 }
 var endText = document.getElementsByClassName('endText');
 var bText = document.getElementsByClassName('bText');
 var bDelayText = document.getElementsByClassName('bDelayText');
 var years = document.getElementsByClassName('years');
 var months = document.getElementsByClassName('months');
 var days = document.getElementsByClassName('days');
 var hours = document.getElementsByClassName('hours');
 var minutes = document.getElementsByClassName('minutes');
 var seconds = document.getElementsByClassName('seconds');
 var aText = document.getElementsByClassName('aText');
 var aDelayText = document.getElementsByClassName('aDelayText');
 var seedDate = document.getElementsByClassName('seedDate');
 var loopTime = document.getElementsByClassName('loopTime');
 var loopUnit = document.getElementsByClassName('loopTimeUnit');
 var loopLimit = document.getElementsByClassName('loopLimit');
 var delayTime = document.getElementsByClassName('delayTime');
 var delayUnit = document.getElementsByClassName('delayTimeUnit');
 var delayDisplay = document.getElementsByClassName('delayCountDisplay');
 var dst = document.getElementsByClassName('dst');
 var dateFormat = document.getElementsByClassName('dateFormat');
 var dateLabels = document.getElementsByClassName('dateLabels');
 var separators = document.getElementsByClassName('separators');

 // дает каждому экземпляру повторяющихся элементов одного класса уникальный идентификатор
 for (k = 0; k < count.length; k++) {
     endText[k].id = 'endText_' + k;
     bText[k].id = 'bText_' + k;
     bDelayText[k].id = 'bDelayText_' + k;
     years[k].id = 'years_' + k;
     months[k].id = 'months_' + k;
     days[k].id = 'days_' + k;
     hours[k].id = 'hours_' + k;
     minutes[k].id = 'minutes_' + k;
     seconds[k].id = 'seconds_' + k;
     aText[k].id = 'aText_' + k;
     aDelayText[k].id = 'aDelayText_' + k;
     seedDate[k].id = 'seedDate_' + k;
     loopTime[k].id = 'loopTime_' + k;
     loopUnit[k].id = 'loopTimeUnit_' + k;
     loopLimit[k].id = 'loopLimit_' + k;
     delayTime[k].id = 'delayTime_' + k;
     delayUnit[k].id = 'delayTimeUnit_' + k;
     delayDisplay[k].id = 'delayCountDisplay_' + k;
     dst[k].id = 'dst_' + k;
     dateFormat[k].id = 'dateFormat_' + k;
     dateLabels[k].id = 'dateLabels_' + k;
     separators[k].id = 'separators_' + k;
 }
 Countdown(seedDate, loopTime, loopUnit, loopLimit, delayTime, delayUnit, dateFormat, dateLabels, separators);
 setInterval(function() {
     Countdown(seedDate, loopTime, loopUnit, loopLimit, delayTime, delayUnit, dateFormat, dateLabels, separators)
 }, 1000);

// *****************************************************
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
 //
 // Usage example:
 //  <span class="countdown" style="display:none;">
 //  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
 //  </span>
 //  <span class="nocountdown">Javascript disabled.</span>
 
 function updatetimer(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
     return;
   }
 
   // determine plus/minus
   if(diff<0) {
     diff = -diff;
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
   // a setInterval() is more efficient, but calling setTimeout()
   // makes errors break the script rather than infinitely recurse
   timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
 }
 
 function checktimers() {
   //hide 'nocountdown' and show 'countdown'
   var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
   for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
   var countdowns = getElementsByClassName(document, 'span', 'countdown');
   for(var i in countdowns) countdowns[i].style.display = 'inline'
 
   //set up global objects timers and timeouts.
   timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
   timeouts = new Array(); // generic holder for the timeouts, global
   if(timers.length == 0) return;
   for(var i in timers) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     updatetimer(i);  //start it up
   }
 }
 addOnloadHook(checktimers);
 
 // **************************************************
 //  - end -  Experimental javascript countdown timer
 // **************************************************