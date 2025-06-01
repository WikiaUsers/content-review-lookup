$(function() {
  // Inject a container to hold both navs if it doesn't exist
  if ($('#nav-container').length === 0) {
    $('body').append(`<div id="nav-container"></div>`);
  }

  // Inject the talisman HTML inside container if missing
  if ($('#talisman-nav').length === 0) {
    $('#nav-container').append(`
      <div id="talisman-nav" style="font-family: 'IM Fell English SC', serif;">
        <div id="talisman-button" title="Open Talisman Menu"></div>
        <div id="talisman-menu">
          <a href="https://mummiesalive.fandom.com/wiki/Category:Characters" target="_blank" title="Characters">👤 Characters</a>
          <a href="https://mummiesalive.fandom.com/wiki/Category:Locations" target="_blank" title="Locations">📍 Locations</a>
          <a href="https://mummiesalive.fandom.com/wiki/Category:Artifacts" target="_blank" title="Artifacts">🏺 Artifacts</a>
          <a href="https://mummiesalive.fandom.com/wiki/Category:Vehicles" target="_blank" title="Vehicles">🚗 Vehicles</a>
          <a href="https://mummiesalive.fandom.com/wiki/Category:Species" target="_blank" title="Species">🦎 Species</a>
          <a href="https://mummiesalive.fandom.com/wiki/Category:In-Universe_Concepts" target="_blank" title="In-Universe Concepts">📚 Concepts</a>
        </div>
      </div>
    `);
  }

  // Inject back-to-top inside container if missing
  if ($('#back-to-top').length === 0) {
    $('#nav-container').append(`<div id="back-to-top" title="Back to Top"></div>`);
  }

  // Talisman toggle
  $('#talisman-button').click(function() {
    $('#talisman-menu').toggleClass('show');
    $('#talisman-button').toggleClass('active');
  });

  // Close talisman menu if clicking outside
  $(document).click(function(event) {
    if (!$(event.target).closest('#talisman-nav').length) {
      $('#talisman-menu').removeClass('show');
      $('#talisman-button').removeClass('active');
    }
  });

  // Show/hide back-to-top on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  // Scroll to top on click
  $('#back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });
});