$(window).load(function() {
  var now, aoi_now, aoi_day, aoi_hour, hour_text, day_column, day_color, now_color;
  day_color = '#e8e683';
  now_color = '#88DD1B';
  now = new Date();
  aoi_now = new Date(now.getTime() - 7 * 3600 * 1000);
  aoi_day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][aoi_now.getUTCDay()];
  aoi_hour = aoi_now.getUTCHours();
  hour_text = String(aoi_hour) + ":00";
  day_column = $('table.timetable').find('> > tr:first-child > :contains("' + String(aoi_day) + '")').first().index();
  $('table.timetable').find('> > tr > :nth-child(' + String(day_column + 1) + ')').css('background-color', day_color);
  $('table.timetable').find('> > tr > td:first-child:contains("' + hour_text + '")').first().parent('tr').find('> :nth-child(' + String(day_column + 1) + ')').css('background-color', now_color);
});