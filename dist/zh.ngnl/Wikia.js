/** Random Background Images **/
function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}
function randomBg() {
  new mw.Api().get({
    action: 'parse',
    page: 'MediaWiki:Custom-RandomBackground/List',
    prop: 'wikitext',
    format: 'json'
  }).done(function(data) {
    var wikitext = data.parse.wikitext['*'],
    json = JSON.parse(wikitext),
    item = getRandomArrayElements(json.list,1),
    img = item[0].img,
    des = item[0].des;

    $('body.skin-oasis').css({
      'background-image': 'url('+ img +')'
    });
    
  });
}
$(function() {
  randomBg();

  $('.wds-community-header__local-navigation .wds-tabs').append(
    $('<li>',{'class':'wds-tabs__tab'}).append(
      $('<div>',{'class':'wds-tabs__tab-label'}).append(
        $('<a>',{
          'src': 'javascript:;',
          'id': 'RandomBg'
        })
        .text('随机背景')
        .prepend('<img src="https://vignette.wikia.nocookie.net/no-game-no-life/images/7/70/Random.png/revision/latest?cb=20190616113051&format=original&path-prefix=zh" style="width:12px;height:12px;"/>&nbsp;')
        .click(randomBg)
      )
    )
  );

});