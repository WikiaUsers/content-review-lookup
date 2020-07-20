

$(function() {
  $('.ajax-poll .pollAnswerVotes').hide();
  $('.ajax-poll [type="submit"]').on('click', function() {
    $('.ajax-poll .pollAnswerVotes').show();
  });
});



var Speed = 600; var Start = 5; importScriptPage('BackToTopButton/code.js', 'dev');