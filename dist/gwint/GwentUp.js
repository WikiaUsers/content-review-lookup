$('.gwentup[data-id]:not([data-id=""])').each(function () {
  var id = $(this).attr('data-id');
  if (/^\d+$/.test(id)) {
    $.ajax({
      url: 'https://json2jsonp.com/',
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {
        url: encodeURIComponent('https://gwentup.com/api/player/' + id)
      },
      success: function (res) {
        $('#gwentup-' + id + '-name').html(res[1].data.Name);
        $('#gwentup-' + id + '-rank').html(res[1].data.Seasons[res[1].data.Seasons.length - 1].Mmr);
        $('#gwentup-' + id + '-icon').addClass('_' + res[1].data.AvatarId);
      }
    });
  }
});