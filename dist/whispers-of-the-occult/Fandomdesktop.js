$(function() {
  var hour = new Date().getHours();
  if (hour >= 19 || hour < 5) {
    // It's nighttime
    $('body').addClass('nighttime');
  } else {
    $('body').removeClass('nighttime');
  }
});

$(function() {
  $('.hidden-lore').on('click', function() {
    alert($(this).data('lore'));
  });
});

$(function() {
  $('a[href]').not('[href^="#"], [href^="javascript:"]').click(function(e) {
    e.preventDefault();
    var url = this.href;
    $('body').addClass('fade-out');
    setTimeout(function() {
      window.location = url;
    }, 500); 
  });
});