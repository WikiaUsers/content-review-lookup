$(function () {

  const $body = $('body');
  const $doc = $(document);
  const $win = $(window);

  // Ensure main container exists
  let $navContainer = $('#nav-container');
  if ($navContainer.length === 0) {
    $body.append('<div id="nav-container"></div>');
    $navContainer = $('#nav-container');
  }

  // Inject Talisman navigation if missing
  if ($('#talisman-nav').length === 0) {
    $navContainer.append(`
      <div id="talisman-nav" style="font-family: 'IM Fell English SC', serif;">
        <div id="talisman-button" title="Open Talisman Menu"></div>
        <div id="talisman-menu">
          <a href="/wiki/Category:Characters" target="_blank" title="Characters">👤 Characters</a>
          <a href="/wiki/Category:Locations" target="_blank" title="Locations">📍 Locations</a>
          <a href="/wiki/Category:Artifacts" target="_blank" title="Artifacts">🏺 Artifacts</a>
          <a href="/wiki/Category:Vehicles" target="_blank" title="Vehicles">🚗 Vehicles</a>
          <a href="/wiki/Category:Species" target="_blank" title="Species">🦎 Species</a>
          <a href="/wiki/Category:In-Universe_Concepts" target="_blank" title="In-Universe Concepts">📚 Concepts</a>
        </div>
      </div>
    `);
  }

  const $talismanButton = $('#talisman-button');
  const $talismanMenu = $('#talisman-menu');

  // Inject Back-to-Top button if missing
  if ($('#back-to-top').length === 0) {
    $navContainer.append('<div id="back-to-top" title="Back to Top"></div>');
  }

  const $backToTop = $('#back-to-top');

  // Inject Random Article button if missing
  if ($('#random-article-button').length === 0) {
    $navContainer.prepend('<div id="random-article-button" title="Random Article"></div>');
  }

  const $randomBtn = $('#random-article-button');

  /* ===========================
     EVENT HANDLERS
  ============================ */

  // Toggle talisman menu
  $talismanButton.on('click', function () {
    $talismanMenu.toggleClass('show');
    $talismanButton.toggleClass('active');
  });

  // Close talisman menu when clicking outside
  $doc.on('click', function (e) {
    if (!$(e.target).closest('#talisman-nav').length) {
      $talismanMenu.removeClass('show');
      $talismanButton.removeClass('active');
    }
  });

  // Show/hide Back-to-Top button
  $win.on('scroll', function () {
    $backToTop.toggle($(this).scrollTop() > 300);
  });

  // Scroll to top
  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // Random article button
  $randomBtn.on('click', function () {
    window.location.href = '/wiki/Special:Random';
  });

});