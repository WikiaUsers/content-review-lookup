/** Hi-quality wiki wordmark **/
$('.wds-community-header__wordmark').html(
  $('<a>',{
    'accesskey':'z',
    'href':'/wiki/Mainpage'
  })
  .append(
    $('<img>',{
      'src':'https://vignette.wikia.nocookie.net/dragonfish/images/f/f0/Wiki.svg/revision/latest?cb=20190416080835&path-prefix=zh',
      'width':'57',
      'height':'57',
      'alt':'万界规划局'
    })
  )
);