var url = 'https://calendar.google.com/calendar/embed?src=ktbep60ogdbijgv8uu2jgk9424%40group.calendar.google.com&ctz=Etc/GMT"';

$('div.event-calendar').each(function() {
  $(this).html('<iframe src="' + url + '" style="border-width:0" width="600" height="450" frameborder="0" scrolling="no"></iframe>');
});