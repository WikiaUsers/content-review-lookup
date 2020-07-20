$(document).ready(function() {
  $('.Chat li').hover(function() {
    $('<button id = "deleteChatMessage">Delete this message</button>').prependTo('.Chat li').on("click", function () {
      $(this).remove();
    });
  });
});