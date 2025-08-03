
// Aggressive method: always show world/difficulty bar above drops-content-scroll on mobile, update on tab switch
$(function() {
  function isMobile() {
    return window.innerWidth <= 768;
  }
  if (!isMobile()) return;

  var worldList = ['World 1', 'World 2'];
  var diffList = ['Normal', 'Heroic', 'Nightmare'];

  function getContext($scroll) {
    // Try to get world/difficulty from visible tab labels or headings
    var world = '';
    var difficulty = '';
    // Look for closest visible tabbernav above
    var $tabber = $scroll.closest('.tabberlive, .tabber');
    var $tabbernavs = $tabber.find('> .tabbernav:visible');
    if ($tabbernavs.length > 1) {
      // First nav = world, second = difficulty
      world = $tabbernavs.eq(0).find('li.tabberactive > a').text().trim();
      difficulty = $tabbernavs.eq(1).find('li.tabberactive > a').text().trim();
    } else if ($tabbernavs.length === 1) {
      // Only one nav, try to guess
      var txt = $tabbernavs.eq(0).find('li.tabberactive > a').text().trim();
      if (worldList.includes(txt)) world = txt;
      if (diffList.includes(txt)) difficulty = txt;
    }
    // Fallback: look for headings
    if (!world) {
      var $heading = $tabber.prevAll('h2,h3').first();
      if ($heading.length) world = $heading.text().trim();
    }
    // Fallback: scan for keywords in content
    if (!world) {
      var html = $scroll.html();
      world = worldList.find(function(w) { return html.indexOf(w) !== -1; }) || worldList[0];
    }
    if (!difficulty) {
      var html = $scroll.html();
      difficulty = diffList.find(function(d) { return html.indexOf(d) !== -1; }) || diffList[0];
    }
    return { world: world, difficulty: difficulty };
  }

  function insertBars() {
    $('.drops-content-scroll:visible').each(function() {
      var $scroll = $(this);
      $scroll.prev('.world-difficulty-bar-mobile').remove();
      var ctx = getContext($scroll);
      var bar = $('<div class="world-difficulty-bar-mobile"></div>');
      worldList.forEach(function(w) {
        bar.append('<span class="world-label-mobile'+(w===ctx.world?' selected':'')+'" data-world="'+w+'">'+w+'</span>');
      });
      diffList.forEach(function(d) {
        bar.append('<span class="difficulty-label-mobile'+(d===ctx.difficulty?' selected':'')+'" data-difficulty="'+d+'">'+d+'</span>');
      });
      $scroll.before(bar);
    });
  }

  // Interactive: clicking a label switches the tab
  $(document).on('click', '.world-label-mobile', function() {
    var world = $(this).attr('data-world');
    // Find the nearest tabbernav for world
    var $bar = $(this).closest('.world-difficulty-bar-mobile');
    var $tabber = $bar.nextAll('.drops-content-scroll').first().closest('.tabberlive, .tabber');
    var $navs = $tabber.find('> .tabbernav:visible');
    if ($navs.length > 0) {
      var $worldNav = $navs.eq(0);
      $worldNav.find('li a').each(function() {
        if ($(this).text().trim() === world) {
          $(this)[0].click();
        }
      });
    }
  });
  $(document).on('click', '.difficulty-label-mobile', function() {
    var diff = $(this).attr('data-difficulty');
    var $bar = $(this).closest('.world-difficulty-bar-mobile');
    var $scroll = $bar.nextAll('.drops-content-scroll').first();
    var $tabbertab = $scroll.closest('.tabbertab');
    var $tabber = $tabbertab.closest('.tabberlive, .tabber');
    var $navs = $tabbertab.find('> .tabbernav:visible');
    if ($navs.length === 0) {
      $navs = $tabbertab.prevAll('.tabbernav:visible').first();
    }
    if ($navs.length > 0) {
      $navs.find('li a').each(function() {
        if ($(this).text().trim() === diff) {
          $(this)[0].click();
        }
      });
    }
  });

  // Initial insert after a short delay
  setTimeout(insertBars, 500);

  // Update bars on any tabbernav click/touch
  $(document).on('click touchend', '.tabbernav li a', function() {
    setTimeout(insertBars, 200);
  });

  // Also re-insert on window resize (in case of orientation change)
  $(window).on('resize', function() {
    if (isMobile()) insertBars();
  });

  // Fallback: periodic update in case of dynamic content
  setInterval(insertBars, 2000);
});