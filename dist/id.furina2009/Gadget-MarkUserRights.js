(function () {
  'use strict';
  if (mw.config.get('wgCanonicalSpecialPageName') === 'CentralAuth') {
    return;
  }
  const RIGHTS_JSON_PAGE = 'MediaWiki:Custom-Gadget-MarkUserRights/i18n.json';
  const ROLE_LABEL = {
    Sysop: 'A',
    Bureaucrat: 'B',
    CheckUser: 'CU',
    Oversighter: 'OS',
    InterfaceAdmin: 'IA'
  };
  let rightsIndex = Object.create(null);
  $.get(`/wiki/${encodeURIComponent(RIGHTS_JSON_PAGE)}?action=raw`)
    .done(function (content) {
      try {
        const raw = JSON.parse(content);
        buildIndex(raw);
        markUsers();
      } catch (e) {
        console.error('MarkUserRights: JSON parse error', e);
      }
    })
    .fail(() => console.error('Gagal memuat JSON hak pengguna'));
	
  function buildIndex(data) {
    Object.keys(data).forEach(role => {
      const label = ROLE_LABEL[role];
      if (!label || !Array.isArray(data[role])) return;
      data[role].forEach(username => {
        if (!rightsIndex[username]) {
          rightsIndex[username] = [];
        }
        rightsIndex[username].push(label);
      });
    });
  }

  function extractUsernameFromLink($link) {
    const title = $link.attr('title');
    if (title) {
      if (title.startsWith('User:')) return title.slice(5).trim();
      if (title.startsWith('Pengguna:')) return title.slice(9).trim();
    }
    const href = $link.attr('href');
    if (!href) return null;
    const match = href.match(/\/wiki\/(User|Pengguna):([^#?]+)/);
    if (!match) return null;
    return decodeURIComponent(match[2]).replace(/_/g, ' ').trim();
  }

  function markUsers() {
    $('#mw-content-text a, .mw-userlink').each(function () {
      const $link = $(this);
      if ($link.data('rightsMarked')) return;
      const username = extractUsernameFromLink($link);
      if (!username) return;
      const roles = rightsIndex[username];
      if (!roles || !roles.length) return;
      $link.data('rightsMarked', true);
      const labelText = `(${roles.join('/')})`;
      $('<span>')
        .text(labelText)
        .css({
          fontWeight: 'bold',
          color: '#1793d1',
          marginLeft: '4px',
          fontSize: '100%'
        })
        .insertAfter($link);
    });
  }
})();