/* Any JavaScript here will be loaded for all users on every page load. */
/* Oberin custom footer links */
mw.loader.using(['jquery'], function () {
  $(function () {
    if ($('#oberin-footer-links').length) {
      return;
    }

    var footerLinks = $(
      '<div id="oberin-footer-links" class="footer-links" style="padding-top: 10px; text-align: center;">' +
        '<a href="https://www.oberin.be/forum/overview">Visit the forums</a>' +
        ' - ' +
        '<a href="https://www.oberin.be/download">Play the game</a>' +
        ' - ' +
        '<a href="https://www.oberin.be/news">Latest news</a>' +
        ' - ' +
        '<a href="https://discord.gg/oberin">Join the Discord</a>' +
      '</div>'
    );

    var footer = $('.license-description').first();

    if (footer.length) {
      footer.before(footerLinks);
    }
  });
});