/* Any JavaScript here will be loaded for all users on every page load. */

(function () {
  function initKbInfoboxCollapse() {
    document.querySelectorAll('.kb-collapsible[data-kb-toggle]').forEach(function (hdr) {
      hdr.addEventListener('click', function () {
        var key = hdr.getAttribute('data-kb-toggle');
        var body = hdr.closest('.pi-theme-kagurabachi')?.querySelector('.kb-collapsible-body[data-kb-body="' + key + '"]');
        if (!body) return;

        body.classList.toggle('kb-hidden');
        hdr.classList.toggle('kb-collapsed');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKbInfoboxCollapse);
  } else {
    initKbInfoboxCollapse();
  }
})();