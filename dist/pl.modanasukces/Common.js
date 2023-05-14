// This will replace all h2 elements with h1 elements
$(document).ready(function() {
  $('h2').each(function() {
    $(this).replaceWith('<h1>' + $(this).html() + '</h1>');
  });
});