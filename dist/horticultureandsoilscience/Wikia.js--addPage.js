// 11:04, February 9, 2012 (UTC)
// <source lang="JavaScript">

// Adds an add-a-page button to RWA

$(function() {
  $('<a class="wikia-button createpage" title="Add a Page" href="/wiki/Special:CreatePage"><img width="0" height="0" class="sprite new" src="'+ wgBlankImgUrl +'"> Add a Page</a>').insertBefore('.WikiaActivityModule h1.activity-heading');
  $('.WikiaActivityModule.module a.wikia-button img.new').css({position: 'relative', top: '0', left: '0'});
});

// END Adds an add-a-page button to RWA

// </source>