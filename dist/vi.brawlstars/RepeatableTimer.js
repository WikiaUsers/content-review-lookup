// RepeatableTimer v1.1
// Mã nguồn gốc được tạo bởi [[User:Samogot]] tại [[w:c:ru.sword-art-online|Sword Art Online Wiki tiếng Nga]]
// Dùng cho [[Bản mẫu:Timer]]

// Mã nguồn Javascript này được Việt hóa và sử dụng cho Wiki Brawl Stars tiếng Việt
// bởi người dùng [[Thành viên: Power Pisces]] (tức Song Ngư)


function plural(i,one,two,many){
  if(10<=(i%100)&&(i%100)<=20) return many;
  switch(i%10){
    case 1:
    return one;
    case 2:
    case 3:
    case 4:
    return two;
    default:
    return many;
  }
}

function updateTimer()
{
  var now = new Date()
  $('.timer:not(.stop)').each(function(){
    var dataTo = $(this).data('data-to');
    var dataEnd = $(this).attr('data-end');
    var dataDelimFull = $(this).attr('data-delim-full');
    //var dataShowMonth = $(this).attr('data-show-month');
    var diff = Math.floor((dataTo - now)/1000);
	if(diff<0) {
      if(dataEnd === 'text') {$(this).text($(this).attr('data-text')); $(this).addClass('stop'); return;}
      else if(dataEnd === 'stop') {diff=0; $(this).addClass('stop');}
      else diff = -diff;
	}
    
    $('.second .num',this).text(diff%60);
    if(dataDelimFull) $('.second .small',this).text(plural(diff%60,'giây','giây','giây'));
    $('.minute',this).attr('title','hoặc '+diff+' '+plural(diff,'giây','giây','giây'));
    diff=Math.floor(diff/60);
    
    $('.minute .num',this).text(diff%60);
    if(dataDelimFull) $('.minute .small',this).text(plural(diff%60,'phút','phút','phút'));
    $('.hour',this).attr('title','hoặc '+diff+' '+plural(diff,'phút','phút','phút'));
    diff=Math.floor(diff/60);
    
    $('.hour .num',this).text(diff%24);
    if(dataDelimFull) $('.hour .small',this).text(plural(diff%24,'giờ','giờ','giờ'));
    $('.day',this).attr('title','hoặc '+diff+' '+plural(diff,'giờ','giờ','giờ'));
    diff=Math.floor(diff/24);
    
    $('.day .num',this).text(diff);
    if(dataDelimFull) $('.day .small',this).text(plural(diff,'ngày','ngày','ngày'));
  });
}

$(function(){
  var now = new Date()
  $('.timer').each(function(){
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('thg')).addClass('month').css('display',$(this).attr('data-show-month')?'':'none'));
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('d')).addClass('day'));
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('h')).addClass('hour'));
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('p')).addClass('minute'));
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('s').css('display',$(this).attr('data-delim-second')?'':'none')).addClass('second').attr('title','nhiều mili giây'));
    var dataTo = new Date($(this).attr('data-to'));
    var dataEnd = $(this).attr('data-end');
    var dataRepeat = $(this).attr('data-repeat');
    var dataRepeatCount = $(this).attr('data-repeat-count')*1;
	var diff = Math.floor((dataTo - now)/1000);
	if (dataEnd === 'repeat') 
      while(diff<0) 
      {
        switch(dataRepeat.toLowerCase())
        {
          case 'year':
            dataTo.setFullYear(dataTo.getFullYear()+dataRepeatCount); break;
          case 'month':
            dataTo.setMonth(dataTo.getMonth()+dataRepeatCount); break;
          case 'day':
            dataTo.setDate(dataTo.getDate()+dataRepeatCount); break;
        }
        diff = Math.floor((dataTo - now)/1000);
      }
	$(this).data('data-to',dataTo);
  });
  updateTimer();
  setInterval(updateTimer, 1000);
});