// JavaScript Measurements and Date Selectors
function makeDate(fmt,fulldate) {
 if(fulldate.match(/[a-z]+, [0-9]+ [a-z]+ [0-9]{4}/gi)) { // dddd dd mmmm yyyy
  var day = fulldate.match(/[a-z]+/gi)[0],
     date = fulldate.match(/[0-9]+/)[0],
    month = fulldate.match(/[a-z]+/gi)[1],
     year = fulldate.match(/[0-9]{4}/)[0];
  if(fmt === "dmy") {
   return day+", "+date+" "+month+" "+year;
  } else if(fmt === "mdy") {
   return day+", "+month+" "+date+", "+year;
  } else if(fmt === "ymd") {
   return year+" "+month+" "+date+" ("+day+")";
  }
 } else if(fulldate.match(/[0-9]+ [a-z]+ [0-9]{4}/i)) { // dd mmmm yyyy
  var date = fulldate.match(/[0-9]+/)[0],
     month = fulldate.match(/[a-z]+/i)[0],
      year = fulldate.match(/[0-9]{4}/)[0];
  if(fmt === "dmy") {
   return date+" "+month+" "+year;
  } else if(fmt === "mdy") {
   return month+" "+date+", "+year;
  } else if(fmt === "ymd") {
   return year+" "+month+" "+date;
  }
 } else if(fulldate.match(/[0-9]+ [a-z]+/i)) { // dd mmmm
  var date = fulldate.match(/[0-9]+/)[0],
     month = fulldate.match(/[a-z]+/i)[0];
  if(fmt === "dmy") {
   return date+" "+month;
  } else if(fmt === "mdy" || fmt === "ymd") {
   return month+" "+date;
  }
 } else if(fulldate.match(/[a-z]+ [0-9]{4}/i)) { // mmmm yyyy
  var month = fulldate.match(/[a-z]+/i)[0],
       year = fulldate.match(/[0-9]{4}/)[0];
  if(fmt === "dmy" || fmt === "mdy") {
   return month+" "+year;
  } else if(fmt === "ymd") {
   return year+" "+month;
  }
 } else {
  return fulldate;
 }
}
 
function toDate(fmt) {
 var d = new Date(),
  date = d.getDate(),
 mname = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],
 month = mname[d.getMonth()],
  year = d.getFullYear();
 
 if(fmt === "dmy") {
  return date+" "+month+" "+year;
 } else if(fmt === "mdy") {
  return month+" "+date+", "+year;
 } else if(fmt === "ymd") {
  return year+" "+month+" "+date;
 }
}
 
function setCookie(c_name,value,expiredays) {
 var exdate=new Date();
 exdate.setDate(exdate.getDate()+expiredays);
 document.cookie=c_name+ "=" +escape(value) + ((expiredays===null) ? "" : ";expires="+exdate.toGMTString());
}
 
function getCookie(c_name) {
 if (document.cookie.length>0) {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1) { 
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) {c_end=document.cookie.length;}
   return unescape(document.cookie.substring(c_start,c_end));
  }
 }
 return "";
}
 
function msetup() {
 var meas = getCookie('measurements');
 if(meas !== null && meas !== "" && meas !== "label") {
  $('select[name="measurements-selector"] option[value="'+meas+'"]').attr('selected','selected');
  $('.measurements').each(function(){
   $(this).hide();
   $(this).parent().find('.measurements-container').text($('.measurements-'+meas,$(this)).text());
  });
 } else if(meas === "label") {
  $('.measurements').each(function(){
   $(this).parent().find('.measurements-container').empty();
   $(this).show();
  });
 }
}
 
function dsetup() {
 var dat = getCookie('dateformat');
 if(dat !== null && dat !== "" && dat !== "label") {
  $('select[name="date-selector"] option[value="'+dat+'"]').attr('selected','selected');
  $('.date').each(function(){
   $(this).hide();
   $(this).parent().find('.date-container').text(makeDate(dat,$(this).text()));
  });
 } else if(dat === "label") {
  $('.date').each(function(){
   $(this).parent().find('.date-container').empty();
   $(this).show();
  });
 }
}

// On DOM Ready
$(function(){
 // Setup date selector
 $('#WikiaRecentActivity').before('<section class="module" style="padding-top:8px;"><h1 style="margin:0 0 7px 0;">Opcje</h1><table style="width:100%; text-align:center;"><tr><td><select name="measurements-selector" style="font-size:smaller;"><option value="label">Jednostki</option><option disabled="disabled">—</option><option value="metric">Metryczny</option><option value="us">System US</option><option value="imperial">Imperialny</option></select></td><td><select name="date-selector" style="font-size:smaller;"><option value="label">Format Daty</option><option disabled="disabled">—</option><option value="dmy">'+toDate('dmy')+'</option><option value="mdy">'+toDate('mdy')+'</option><option value="ymd">'+toDate('ymd')+'</option></select></td></tr></table></section>');
 $('select[name="measurements-selector"]').bind('change keyup',function() {
  setCookie('measurements',$(this).val(),'365');
  msetup();
 });
 $('.measurements').each(function(){
  $(this).before($('<span class="measurements-container" />'));
 });
 msetup();
 $('select[name="date-selector"]').bind('change keyup',function() {
  setCookie('dateformat',$(this).val(),'365');
  dsetup();
 });
 $('.date').each(function(){
  $(this).before($('<span class="date-container" />'));
 });
 dsetup();

 // Setup language selector
 $('#langdiv img').each(function(){
  $(this).css({'height':'auto','width':'60px'});
 });
 $('#langdiv img').hover(function(){
  $(this).animate({width:'70px'},'fast');
  $('#langdiv span').text($(this).attr('alt'));
 },function(){
  $('#langdiv span').text('Zlokalizowana wersja dla polskiej Sword Art Online Wiki');
  $(this).animate({width:'60px'},'fast');
 });
});
// End On DOM Ready