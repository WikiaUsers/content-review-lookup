
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


window.tabberLinks = {
    luaTabberOnly: false,
    scrollToTab: true,
    alwaysScroll: false,
    neverScroll: false,
    descendantSwitching: true,
    prioritizeIds: false
};


// Insert logged-in user's name into elements with class "insertusername"
mw.loader.using('mediawiki.util').then(function () {
  $(function () {
    var user = mw.config.get('wgUserName');
    if (!user) return; // not logged in, keep fallback text

    $('.insertusername').each(function () {
      var $el = $(this);
      // If you want the name to be a link to the user page, add data-link="true" to the span
      if ($el.data('link')) {
        var userUrl = mw.util.getUrl('User:' + user);
        $el.empty().append($('<a>').attr('href', userUrl).text(user));
      } else {
        $el.text(user);
      }
    });
  });
});




//calculator test or calculation test for comparison of wep
mw.loader.using('mediawiki.util', function () {
  jQuery(function ($) {

    function waitFor(selector, cb, timeoutMs) {
      var start = Date.now();
      var iv = setInterval(function () {
        var $el = $(selector);
        if ($el.length) { clearInterval(iv); cb($el); return; }
        if (Date.now() - start > timeoutMs) { clearInterval(iv); cb(null); return; }
      }, 200);
    }

    waitFor('#calculators_loading, #calculators_container', function (found) {
      if (!found) {
        console.log('Calculators: no placeholders found on this page.');
        return;
      }

      var $loader = $('#calculators_loading');
      var $container = $('#calculators_container');

      if ($loader.length) $loader.hide();
      if ($container.length) $container.show();

      var $exercise = $('#calculator_exerciseweapons');
      var $realskill = $('#calculator_realskill, #calculator_reakskill');

      if (!$exercise.length && $container.length) $exercise = $('<div id="calculator_exerciseweapons"></div>').appendTo($container);
      if (!$realskill.length && $container.length) $realskill = $('<div id="calculator_realskill"></div>').appendTo($container);

      $exercise.html(
        '<div class="calc-box"><h3>Training calculator</h3>' +
        '<p>Exercise-weapons calculator injected. Replace with full logic when ready.</p></div>'
      );

      $realskill.html(
        '<div class="calc-box">' +
          '<h3>Skills without Loyalty</h3>' +
          '<label>Displayed skill: <input type="number" id="tw_displayed" step="0.01" /></label> ' +
          '<label>Loyalty %: <input type="number" id="tw_loyalty" value="5" step="0.01" /></label> ' +
          '<button id="tw_calc">Calculate</button>' +
          '<div id="tw_output" style="margin-top:8px"></div>' +
        '</div>'
      );

      $('#tw_calc').on('click', function () {
        var displayed = parseFloat($('#tw_displayed').val());
        var loyalty = parseFloat($('#tw_loyalty').val()) || 0;
        if (isNaN(displayed)) { $('#tw_output').text('Please enter a valid displayed skill.'); return; }
        var base = displayed / (1 + loyalty / 100);
        $('#tw_output').html('Base skill (without loyalty): <strong>' + base.toFixed(2) + '</strong>');
      });

      console.log('Calculators injected.');
    }, 5000); 
  });
});


// Load the AddRailModule script from Fandom Developers
mw.loader.load('https://dev.fandom.com/load.php?mode=articles&articles=u:dev:MediaWiki:AddRailModule/code.js&only=scripts');

// Add Discord widget to the rail
window.AddRailModule = window.AddRailModule || [];
window.AddRailModule.push({
    prepend: true, 
    content: '<iframe src="https://discord.com/widget?id=1380241105337061456&theme=dark" ' +
             'width="300" height="400" allowtransparency="true" frameborder="0"></iframe>'
});

alert("Pixelblade Wiki JavaScript is working!");