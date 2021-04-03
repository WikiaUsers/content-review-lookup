(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:1446276,hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

var globalwrapper = $('#global-wrapper').height();
var topnavbar = 80.78;
var contentpanel = globalwrapper - topnavbar - 26;
var sidebarwidth = $('#mw-panel').width() / $('#mw-panel').parent().width() * 100;
var sidebarlogo = $('#p-logo').width();
var sortedwidth = $('.overlay').width();

$( window ).resize(function() {
  globalwrapper = $('#global-wrapper').height();
  topnavbar = 80.78;
  contentpanel = globalwrapper - topnavbar - 26;
  sidebarwidth = $('#mw-panel').width() / $('#mw-panel').parent().width() * 100;
  sidebarlogo = $('#p-logo').width();
  sortedwidth = $('.overlay').width();

  $('#mw-panel').width(sidebarlogo);
  $('#content').width(97 - sidebarwidth + '%');
  $('#content, #mw-panel').css('height', + contentpanel + 'px');
  $('head').append('<style>.sorted { width: ' + sortedwidth + 'px!important;}</style>');
});

$('#mw-panel').width(sidebarlogo);
$('#content').width(97 - sidebarwidth + '%');
$('#content, #mw-panel').css('height', + contentpanel + 'px');
$('head').append('<style>.sorted { width: ' + sortedwidth + 'px!important;}</style>');

$('.playButton').wrap('<a href="#" class="selectButton"></a>');
$('head').append('<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />');
$('#footer').insertBefore('#curse-footer');
$('#p-Games > div > ul > li > a').attr("href","#");

$('#n-Recently-Added').click(function() {
    $('.recently').addClass('sorted');
    $(' .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $(' .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $(' .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.recently)').removeClass('sorted');
});

$('#n-Rip-Offs').click(function() {
    $('.ripoffs').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic').css('transform','scale(0)');
    $('*:not(.ripoffs)').removeClass('sorted');
});

$('#n-Classic-Arcades').click(function() {
    $('.classic').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters,  .ripoffs').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters,  .ripoffs').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters,  .ripoffs').css('transform','scale(0)');
    $('*:not(.classic)').removeClass('sorted');
});

$('#n-Shooters').click(function() {
    $('.shooters').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers,  .classic, .ripoffs').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers,  .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers,  .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.shooters)').removeClass('sorted');
});

$('#n-Platformers').click(function() {
    $('.platformers').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash,  .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash,  .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash,  .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.platformers)').removeClass('sorted');
});

$('li[id^="n-Hack-"]').click(function() {
    $('.hackslash').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival,  .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival,  .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival,  .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.hackslash)').removeClass('sorted');
});

$('#n-Survival').click(function() {
    $('.survival').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox,  .hackslash, .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox,  .hackslash, .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport, .sandbox,  .hackslash, .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.survival)').removeClass('sorted');
});

$('#n-MMORPG').click(function() {
    $('.mmorpg').addClass('sorted');
    $('.recently, .racing,  .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently, .racing,  .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing,  .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.mmorpg)').removeClass('sorted');
});

$('#n-Strategy').click(function() {
    $('.strategy').addClass('sorted');
    $('.recently, .racing,  .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently, .racing,  .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing,  .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.strategy)').removeClass('sorted');
});

$('#n-Sandbox').click(function() {
    $('.sandbox').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport,  .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport,  .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles, .sport,  .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.sandbox)').removeClass('sorted');
});

$('#n-Sports').click(function() {
    $('.sports').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles,  .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles,  .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg, .puzzles,  .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.sport)').removeClass('sorted');
});

$('#n-Puzzles').click(function() {
    $('.puzzles').addClass('sorted');
    $('.recently, .racing, .strategy, .mmorpg,  .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently, .racing, .strategy, .mmorpg,  .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently, .racing, .strategy, .mmorpg,  .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.puzzles)').removeClass('sorted');
});

$('#n-Racing').click(function() {
    $('.racing').addClass('sorted');
    $('.recently,  .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('width','0px');
    $('.recently,  .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('margin','0px');
    $('.recently,  .strategy, .mmorpg, .puzzles, .sport, .sandbox, .survival, .hackslash, .platformers, .shooters, .classic, .ripoffs').css('transform','scale(0)');
    $('*:not(.racing)').removeClass('sorted');
});

$('#n-Recently-Added').click(function() {
    $('#n-Recently-Added').addClass('titlesorted');
    $('*:not(#n-Recently-Added)').removeClass('titlesorted');
});

$('#n-Rip-Offs').click(function() {
    $('#n-Rip-Offs').addClass('titlesorted');
    $('*:not(#n-Rip-Offs)').removeClass('titlesorted');
});

$('#n-Classic-Arcades').click(function() {
    $('#n-Classic-Arcades').addClass('titlesorted');
    $('*:not(#n-Classic-Arcades)').removeClass('titlesorted');
});

$('#n-Shooters').click(function() {
    $('#n-Shooters').addClass('titlesorted');
    $('*:not(#n-Shooters)').removeClass('titlesorted');
});

$('#n-Platformers').click(function() {
    $('#n-Platformers').addClass('titlesorted');
    $('*:not(#n-Platformers)').removeClass('titlesorted');
});

$('li[id^="n-Hack-"]').click(function() {
    $('li[id^="n-Hack-"]').addClass('titlesorted');
    $('*:not(li[id^="n-Hack-"])').removeClass('titlesorted');
});

$('#n-Survival').click(function() {
    $('#n-Survival').addClass('titlesorted');
    $('*:not(#n-Survival)').removeClass('titlesorted');
});

$('#n-MMORPG').click(function() {
    $('#n-MMORPG').addClass('titlesorted');
    $('*:not(#n-MMORPG)').removeClass('titlesorted');
});

$('#n-Strategy').click(function() {
    $('#n-Strategy').addClass('titlesorted');
    $('*:not(#n-Strategy)').removeClass('titlesorted');
});

$('#n-Sandbox').click(function() {
    $('n-Sandbox').addClass('titlesorted');
    $('*:not(#n-Sandbox)').removeClass('titlesorted');
});

$('#n-Sports').click(function() {
    $('#n-Sports').addClass('titlesorted');
    $('*:not(#n-Sports)').removeClass('titlesorted');
});

$('#n-Puzzles').click(function() {
    $('#n-Puzzles').addClass('titlesorted');
    $('*:not(#n-Puzzles)').removeClass('titlesorted');
});

$('#n-Racing').click(function() {
    $('#n-Racing').addClass('titlesorted');
    $('*:not(#n-Racing)').removeClass('titlesorted');
});

setInterval(function() {
    $('#p-Games-list > .titlesorted > a').attr('style', 'color: white!important');
    $('#p-Games-list > *:not(.titlesorted) > a').attr('style', 'color: #35ffea');
}, 0);

$( document ).ready(function() {
    $('#n-All-Games').addClass('titlesorted');
    $('*:not(#n-All-Games)').removeClass('titlesorted');
});

window.onload = function() {
  $('.unselectedDot.p1').click(function() {
    $('.selectedDot').removeClass('selectedDot').addClass('unselectedDot');
    $(this).addClass('selectedDot').removeClass('unselectedDot');
    $('.inner').prependTo(this);
  });

  $('.unselectedDot.p2').click(function() {
    $('.selectedDot').removeClass('selectedDot').addClass('unselectedDot');
    $(this).addClass('selectedDot').removeClass('unselectedDot');
    $('.inner').prependTo(this);
  });

  $('.unselectedDot.p3').click(function() {
    $('.selectedDot').removeClass('selectedDot').addClass('unselectedDot');
    $(this).addClass('selectedDot').removeClass('unselectedDot');
    $('.inner').prependTo(this);
  });

  $('.unselectedDot.p4').click(function() {
    $('.selectedDot').removeClass('selectedDot').addClass('unselectedDot');
    $(this).addClass('selectedDot').removeClass('unselectedDot');
    $('.inner').prependTo(this);
  });

  $('.unselectedDot.p5').click(function() {
    $('.selectedDot').removeClass('selectedDot').addClass('unselectedDot');
    $(this).addClass('selectedDot').removeClass('unselectedDot');
    $('.inner').prependTo(this);
  });
}

$('.featuredgames').css('display', 'none');
$('.originalgames').css('display', 'none');
$('.partnergames').css('display', 'none');
$('.upcominggames').css('display', 'none');
$('.newgames').css('display', 'none');

$('.featuredbutton:not(.activebutton)').click(function() {
    $('.featuredgames').css('display', 'inline-block');
    $('.allgames, .originalgames, .partnergames, .upcominggames, .newgames').css('display', 'none');
});

$('.originalbutton:not(.activebutton)').click(function() {
    $('.originalgames').css('display', 'inline-block');
    $('.allgames, .featuredgames, .partnergames, .upcominggames, .newgames').css('display', 'none');
});

$('.partnerbutton:not(.activebutton)').click(function() {
    $('.partnergames').css('display', 'inline-block');
    $('.allgames, .originalgames, .featuredgames, .upcominggames, .newgames').css('display', 'none');
});

$('.newbutton:not(.activebutton)').click(function() {
    $('.newgames').css('display', 'inline-block');
    $('.allgames, .originalgames, .featuredgames, .partnergames, .upcominggames').css('display', 'none');
});

$('.upcomingbutton:not(.activebutton)').click(function() {
    $('.upcominggames').css('display', 'inline-block');
    $('.allgames, .originalgames, .featuredgames, .partnergames, .newgames').css('display', 'none');
});

$('.fbutton').click(function() {
    $('.activebutton').removeClass('activebutton');
    $(this).addClass('activebutton');
});

$('.activebutton').click(function() {
    $('.allgames').css('display', 'inline-block');
    $('.partnergames, .originalgames, .featuredgames, .upcominggames, .newgames').css('display', 'none');
    $('.activebutton').removeClass('activebutton');
});

$(".selectButton").click(function() {
  $("#content, html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

$('.feedback').click(function() {
  window.location.href = 'https://starcade.gamepedia.com/Starcade';
});

$('.playGame').click(function() {
  window.location.href = 'https://starcade.io';
});

$('.trailerbanner img').attr('srcset', '');

$('.selectButton').click(function() {
  $('.playGame').html('Play Game');
  $('.trailerbanner').height('59%');
  $('.trailerbanner img').attr('alt', 'Trailer/Banner image');
});

$('.pawp .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/f/f2/Pawp.png/180px-Pawp.png');
  $('.playGame').click(function() {
    window.location.href = 'https://pawp.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Pawp';
  });
});

$('.brutalMania .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/6/65/Brutal.png/180px-Brutal.png');
  $('.playGame').click(function() {
    window.location.href = 'https://brutalmania.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/BrutalMania';
  });
});

$('.knuckol .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/a/ac/Knuckol.png/180px-Knuckol.png');
  $('.playGame').click(function() {
    window.location.href = 'https://knuckol.club';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Knuckol';
  });
});

$('.blobbyFish .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/9/9b/Blobbyfish.png/180px-Blobbyfish.png');
  $('.playGame').click(function() {
    window.location.href = 'https://blobbyfish.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/BlobbyFish';
  });
});

$('.evoWars .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/3/39/Evowars.png/180px-Evowars.png');
  $('.playGame').click(function() {
    window.location.href = 'https://evowars.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/EvoWars';
  });
});

$('.devast .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/a/a9/Unknown_%289%29.png/180px-Unknown_%289%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://devast.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Devast';
  });
});

$('.limax .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/5/59/Unknown_%288%29.png/180px-Unknown_%288%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://limax.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Limax';
  });
});

$('.starve .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/6/6e/Unknown_%287%29.png/180px-Unknown_%287%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://starve.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Starve';
  });
});

$('.oib .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/f/f4/Unknown_%286%29.png/180px-Unknown_%286%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://oib.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Oib';
  });
});

$('.krunker .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/0/0f/Unknown_%283%29.png/180px-Unknown_%283%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://krunker.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Krunker';
  });
});

$('.nend .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/8/87/Unknown_%284%29.png/180px-Unknown_%284%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://nend.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Nend';
  });
});

$('.driftin .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/f/f6/Unknown_%282%29.png/180px-Unknown_%282%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://driftin.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Driftin';
  });
});

$('.bloble .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/e/e0/Unknown_%281%29.png/180px-Unknown_%281%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://bloble.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Bloble';
  });
});

$('.moomoo .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/5/51/Unknown_%285%29.png/180px-Unknown_%285%29.png');
  $('.playGame').click(function() {
    window.location.href = 'https://moomoo.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Moomoo';
  });
});

$('.pockey .selectButton').click(function() {
  $('.trailerbanner img').attr('src', 'https://gamepedia.cursecdn.com/starcade_gamepedia_en/thumb/6/62/Pockey.png/180px-Pockey.png');
  $('.playGame').click(function() {
    window.location.href = 'https://pockey.io';
  });
  $('.feedback').click(function() {
    window.location.href = 'https://starcade.gamepedia.com/Pockey';
  });
});

if (!$('.homePage')[0]){
  $('#p-Games').remove();
}