$('.getViewCount').each(function() {
  var $this = $(this),
      url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=$yturl&key=$apikey';
  url = url.replace('$yturl', $this.data('url')).replace('$apikey', $this.data('key'));
  $.getJSON(url).done(function(data) {
    $this.text(formatNumber(data.items[0].statistics.viewCount));
  });
});