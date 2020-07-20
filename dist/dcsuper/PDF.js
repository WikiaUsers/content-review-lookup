$('.pdf-button').on('click', function() {
  window.open('http://www.printfriendly.com/print?url=' + document.location.href);
  return false;
});
$('.pocket-button').on('click', function() {
  window.open('https://getpocket.com/edit?url=' + document.location.href);
  return false;
});