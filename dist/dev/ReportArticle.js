/* Report Article — add a styled button that posts a Message Wall thread to members of one or more groups.
   Configure BEFORE import via window.reportArticleConfig, e.g.:

   window.reportArticleConfig = {
     group: ['sysop', 'content-moderator'],    // string or array; also supports `groups: [...]`
     title: 'Reported article: $1',            // $1 = page name (plain text in title)
     body:  'An article has been reported: $1\n\nPlease review.' // $1 becomes a link in body
   };

   Behavior:
   - Only logged-in users see the button
   - Per-page, per-day throttle (localStorage)
   - Click prompts for a REQUIRED reason; reason appended under the default body
   - Exempts User:Abuse_filter and users in the 'bot' group
*/
mw.loader.using(['mediawiki.api', 'mediawiki.user', 'mediawiki.util']).then(function () {
  var currentUser = mw.config.get('wgUserName');
  if (!currentUser) return; // only logged-in users

  var cfg = Object.assign({
    group: 'sysop',
    title: 'Reported article: $1',
    body:  'An article has been reported: $1\n\nPlease review.'
  }, window.reportArticleConfig || {});

  // Normalize group(s): accept cfg.group (string/array) or cfg.groups (array)
  var targetGroups = Array.isArray(cfg.group)
    ? cfg.group
    : (Array.isArray(cfg.groups) ? cfg.groups : [cfg.group || 'sysop']);

  var api = new mw.Api();

  function wikiHref(title) {
    var base = mw.config.get('wgServer');
    var path = mw.config.get('wgArticlePath') || '/wiki/$1';
    var slug = mw.util.wikiUrlencode(title);
    return base + path.replace('$1', slug);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Convert simple HTML (with <a href="...">text</a>) and blank-line paragraphs to a Wall jsonModel
  function jsonModelFromHtml(html) {
    var paras = String(html).split(/\n{2,}/);
    var model = { type: 'doc', content: [] };
    paras.forEach(function (para) {
      var parts = [];
      var re = /<a\s+href="([^"]+)">([^<]+)<\/a>/gi, m, last = 0;
      while ((m = re.exec(para)) !== null) {
        if (m.index > last) parts.push({ type: 'text', text: para.slice(last, m.index) });
        parts.push({ type: 'text', text: m[2], marks: [{ type: 'link', attrs: { href: m[1] } }] });
        last = re.lastIndex;
      }
      if (last < para.length) parts.push({ type: 'text', text: para.slice(last) });
      model.content.push({ type: 'paragraph', content: parts.length ? parts : [{ type: 'text', text: '' }] });
    });
    return JSON.stringify(model);
  }

  function isExempt(username, groups) {
    var norm = String(username).replace(/_/g, ' ').trim().toLowerCase();
    if (norm === 'abuse filter') return true; // User:Abuse_filter normalized
    if (Array.isArray(groups) && groups.indexOf('bot') !== -1) return true;
    return false;
  }

  function postToWall(username, title, bodyHtml) {
    return api.get({ action: 'query', list: 'users', ususers: username, usprop: 'groups' }).then(function (data) {
      var u = data && data.query && data.query.users && data.query.users[0];
      if (!u || !u.userid || isExempt(u.name, u.groups)) return;
      return $.ajax({
        type: 'POST',
        url: mw.util.wikiScript('wikia') + '?controller=Fandom%5CMessageWall%5CMessageWall&method=createThread&format=json',
        data: {
          token: mw.user.tokens.get('csrfToken'),
          wallOwnerId: u.userid,
          title: title,
          rawContent: bodyHtml,
          jsonModel: jsonModelFromHtml(bodyHtml),
          attachments: '{"contentImages":[],"openGraphs":[],"atMentions":[]}'
        },
        xhrFields: { withCredentials: true }
      });
    });
  }

  function alreadyReportedToday(pageName) {
    try {
      var day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      var key = 'reportArticle:' + pageName + ':' + day;
      if (localStorage.getItem(key)) return true;
      localStorage.setItem(key, '1');
      return false;
    } catch (e) {
      return false; // storage blocked → don’t hard-fail
    }
  }

  // Fetch all members of a group (handles continuation)
  function getAllGroupMembers(group) {
    var users = [];
    function loop(aufrom) {
      var params = {
        action: 'query',
        list: 'allusers',
        augroup: group,
        aulimit: 'max',
        auprop: 'groups'
      };
      if (aufrom) params.aufrom = aufrom;
      return api.get(params).then(function (res) {
        var list = (res.query && res.query.allusers) || [];
        users.push.apply(users, list);
        var cont = res.continue && (res.continue.aufrom || res.continue.aucontinue);
        return cont ? loop(cont) : null;
      });
    }
    return loop().then(function () { return users; });
  }

  function sendReports() {
    var pageName = mw.config.get('wgPageName');
    if (alreadyReportedToday(pageName)) {
      mw.notify('This article was already reported today.', { type: 'warn' });
      return;
    }

    var pageDisplay = pageName.replace(/_/g, ' ');
    var pageHref = wikiHref(pageName);

    // Confirm + collect reason (required)
    var reason = window.prompt(
      'Report "' + pageDisplay + '" to ' + targetGroups.join(', ') + '?\n\nEnter a reason (required):',
      ''
    );
    if (reason === null) return; // canceled
    reason = reason.trim();
    if (!reason) {
      mw.notify('Report canceled: a reason is required.', { type: 'warn' });
      return;
    }

    var title = String(cfg.title).replace(/\$1/g, pageDisplay); // $1 as plain text in title
    var bodyHtml =
      String(cfg.body).replace(/\$1/g, '<a href="' + pageHref + '">' + pageDisplay + '</a>') +
      '\n\nReason:\n' + escapeHtml(reason);

    // Get members from all target groups, union, filter exemptions, then post
    Promise.all(targetGroups.map(getAllGroupMembers)).then(function (results) {
      var byName = Object.create(null);
      results.forEach(function (list) {
        list.forEach(function (u) { byName[u.name] = u; }); // dedupe across groups
      });

      var targets = Object.keys(byName)
        .map(function (k) { return byName[k]; })
        .filter(function (u) { return !isExempt(u.name, u.groups); });

      // Fire off posts (don’t block the UI on each)
      Promise.allSettled(targets.map(function (u) {
        return postToWall(u.name, title, bodyHtml);
      })).then(function (settled) {
        var ok = settled.filter(function (s) { return s.status === 'fulfilled'; }).length;
        mw.notify('Report sent to ' + ok + ' user(s) in ' + JSON.stringify(targetGroups) + '.');
      });
    });
  }

  function addButton() {
    if (document.getElementById('ca-report-article')) return;

    // Try common portlets in order; first one that exists wins
    var portlets = ['p-cactions', 'p-views', 'p-tb'];
    var link = null;
    for (var i = 0; i < portlets.length && !link; i++) {
      link = mw.util.addPortletLink(
        portlets[i],
        '#',                              // href so it gets styled as a link/button
        'Report article',                  // label
        'ca-report-article',               // id
        'Report this page to moderators'   // tooltip
      );
    }
    if (!link) return; // no suitable portlet found

    // Keep your hook class for custom CSS/JS if you want
    link.classList.add('js-report-article');

    // Intercept click
    $(link).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      sendReports();
    });
  }

  $(addButton);
});