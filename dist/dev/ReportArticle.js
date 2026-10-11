/* Report Article — add a button that posts a Message Wall thread to members of one or more groups.
   Configure BEFORE import via window.reportArticleConfig, e.g.:

   window.reportArticleConfig = {
     group: ['sysop', 'content-moderator'],    // string or array; also supports `groups: [...]`
     namespaces: [0, 6],                       // numeric namespace IDs where the button is shown (default: [0])
     title: 'Reported article: $1',            // optional; $1 = page name (plain text in title)
     body:  'An article has been reported: $1' // optional; $1 becomes a link in body
   };

   Behavior:
   - Only logged-in users see the button
   - The button is shown only on existing pages in the configured namespaces
     (special pages and other namespaces are excluded)
   - Per-page, per-day throttle (localStorage); released again if nothing could be delivered
   - Click prompts for a REQUIRED reason; reason appended under the default body
   - Exempts User:Abuse_filter, users in the 'bot' group and the reporter themself
*/
mw.loader.using(['mediawiki.api', 'mediawiki.user', 'mediawiki.util']).then(function () {
  var currentUser = mw.config.get('wgUserName');
  if (!currentUser) return; // only logged-in users

  var cfg = Object.assign({
    group: 'sysop',
    namespaces: [0] // namespaces where the button is shown (main by default)
    // title and body are optional: when unset, translated defaults are used
  }, window.reportArticleConfig || {});

  var I18N_NAME = 'ReportArticle';
  var I18N_CACHE_VERSION = 2;
  var BATCH_SIZE = 5; // max simultaneous Message Wall posts

  var i18n; // set once the messages are loaded

  // Normalize group(s): accept cfg.group (string/array) or cfg.groups (array)
  var targetGroups = Array.isArray(cfg.group)
    ? cfg.group
    : (Array.isArray(cfg.groups) ? cfg.groups : [cfg.group || 'sysop']);

  var api = new mw.Api();

  // Only allow reporting on existing pages in the configured namespaces
  function isReportablePage() {
    var ns = mw.config.get('wgNamespaceNumber');
    if (ns < 0) return false; // Special:, Media: and other virtual namespaces
    if (!mw.config.get('wgArticleId')) return false; // page does not exist
    var allowed = Array.isArray(cfg.namespaces) ? cfg.namespaces : [cfg.namespaces];
    return allowed.map(Number).indexOf(ns) !== -1;
  }

  function loadI18n() {
    var deferred = $.Deferred();

    // avoid race conditions
    mw.hook('dev.i18n').add(function (lib) {
      lib.loadMessages(I18N_NAME, { cacheVersion: I18N_CACHE_VERSION }).done(function (loaded) {
        deferred.resolve(loaded);
      });
    });

    if (!(window.dev && window.dev.i18n && window.dev.i18n.loadMessages)) {
      importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
    }

    return deferred.promise();
  }

  // Message in the reporter's language, as plain text (for UI: prompt, notifications, labels)
  function t(key) {
    var args = Array.prototype.slice.call(arguments, 1);
    var msg = i18n.msg.apply(i18n, [key].concat(args));
    return msg.plain();
  }

  function wikiHref(title) {
    var base = mw.config.get('wgServer');
    var path = mw.config.get('wgArticlePath') || '/wiki/$1';
    var slug = mw.util.wikiUrlencode(title);
    return base + path.replace('$1', function () { return slug; });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function unescapeHtml(s) {
    return String(s)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#0*39;/g, "'")
      .replace(/&amp;/g, '&'); // must be last
  }

  // Convert simple HTML (with <a href="...">text</a>) and blank-line paragraphs to a Wall jsonModel
  function jsonModelFromHtml(html) {
    var paras = String(html).split(/\n{2,}/);
    var model = { type: 'doc', content: [] };
    paras.forEach(function (para) {
      var parts = [];
      var re = /<a\s+href="([^"]+)">([^<]+)<\/a>/gi, m, last = 0;
      while ((m = re.exec(para)) !== null) {
        if (m.index > last) parts.push({ type: 'text', text: unescapeHtml(para.slice(last, m.index)) });
        parts.push({ type: 'text', text: unescapeHtml(m[2]), marks: [{ type: 'link', attrs: { href: m[1] } }] });
        last = re.lastIndex;
      }
      if (last < para.length) parts.push({ type: 'text', text: unescapeHtml(para.slice(last)) });
      model.content.push({ type: 'paragraph', content: parts.length ? parts : [{ type: 'text', text: '' }] });
    });
    return JSON.stringify(model);
  }

  function isExempt(username, groups) {
    var norm = String(username).replace(/_/g, ' ').trim().toLowerCase();
    if (norm === 'abuse filter') return true; // User:Abuse_filter normalized
    if (norm === String(currentUser).replace(/_/g, ' ').trim().toLowerCase()) return true; // the reporter
    if (Array.isArray(groups) && groups.indexOf('bot') !== -1) return true;
    return false;
  }

  function postToWall(user, title, bodyHtml) {
    return $.ajax({
      type: 'POST',
      url: mw.util.wikiScript('wikia') + '?controller=Fandom%5CMessageWall%5CMessageWall&method=createThread&format=json',
      data: {
        token: mw.user.tokens.get('csrfToken'),
        wallOwnerId: user.userid,
        title: title,
        rawContent: bodyHtml,
        jsonModel: jsonModelFromHtml(bodyHtml),
        attachments: '{"contentImages":[],"openGraphs":[],"atMentions":[]}'
      },
      xhrFields: { withCredentials: true }
    });
  }

  // Send posts in small batches to avoid rate limits; resolves with the number of successes
  function postInBatches(users, title, bodyHtml) {
    var ok = 0;
    var chain = Promise.resolve();
    for (var i = 0; i < users.length; i += BATCH_SIZE) {
      (function (batch) {
        chain = chain.then(function () {
          return Promise.all(batch.map(function (u) {
            
            return postToWall(u, title, bodyHtml).then(
              function () { return true; },
              function () { return false; }
            );
          })).then(function (results) {
            ok += results.filter(Boolean).length;
          });
        });
      })(users.slice(i, i + BATCH_SIZE));
    }
    return chain.then(function () { return ok; });
  }

  // Throttle helpers: check, mark and release the per-page, per-day flag
  function reportKey(pageName) {
    return 'reportArticle:' + pageName + ':' + new Date().toISOString().slice(0, 10);
  }

  function wasReportedToday(pageName) {
    try {
      return !!localStorage.getItem(reportKey(pageName));
    } catch (e) {
      return false; // storage blocked → don't hard-fail
    }
  }

  function markReportedToday(pageName) {
    try {
      localStorage.setItem(reportKey(pageName), '1');
    } catch (e) { /* storage blocked, ignore */ }
  }

  function clearReportedToday(pageName) {
    try {
      localStorage.removeItem(reportKey(pageName));
    } catch (e) { /* storage blocked, ignore */ }
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

  // Build the thread title (plain text) and body (HTML) in the wiki's content language
  function buildReport(pageDisplay, pageHref, reason) {
    var link = '<a href="' + pageHref + '">' + escapeHtml(pageDisplay) + '</a>';

    // Thread messages are read by moderators, so they use the wiki's content language
    var title = cfg.title
      ? String(cfg.title).replace(/\$1/g, function () { return pageDisplay; })
      : i18n.inContentLang().msg('default-title', pageDisplay).plain();

    // Translated text is escaped by I18n-js; '$1' is passed as the argument so it survives as a placeholder
    var bodyTemplate = cfg.body
      ? String(cfg.body)
      : i18n.inContentLang().msg('default-body', '$1').escape() + '\n\n' +
        i18n.inContentLang().msg('default-body-note').escape();

    var bodyHtml =
      bodyTemplate.replace(/\$1/g, function () { return link; }) +
      '\n\n' + i18n.inContentLang().msg('body-reason').escape() + '\n' + escapeHtml(reason);

    return { title: title, bodyHtml: bodyHtml };
  }

  function sendReports() {
    var pageName = mw.config.get('wgPageName');
    if (wasReportedToday(pageName)) {
      mw.notify(t('already-reported'), { type: 'warn' });
      return;
    }

    var pageDisplay = pageName.replace(/_/g, ' ');
    var pageHref = wikiHref(pageName);

    // Confirm + collect reason (required)
    var reason = window.prompt(
      t('prompt-question', pageDisplay, targetGroups.join(', ')) + '\n\n' + t('prompt-reason'),
      ''
    );
    if (reason === null) return; // canceled
    reason = reason.trim();
    if (!reason) {
      mw.notify(t('reason-required'), { type: 'warn' });
      return;
    }

    // Mark only after the reason is validated; released below if nothing is delivered
    markReportedToday(pageName);

    var report = buildReport(pageDisplay, pageHref, reason);

    // Get members from all target groups, union, filter exemptions, then post
    Promise.all(targetGroups.map(getAllGroupMembers)).then(function (results) {
      var byName = Object.create(null);
      results.forEach(function (list) {
        list.forEach(function (u) { byName[u.name] = u; }); // dedupe across groups
      });

      var targets = Object.keys(byName)
        .map(function (k) { return byName[k]; })
        .filter(function (u) { return u.userid && !isExempt(u.name, u.groups); });

      if (!targets.length) {
        clearReportedToday(pageName);
        mw.notify(t('no-recipients', targetGroups.join(', ')), { type: 'warn' });
        return;
      }

      return postInBatches(targets, report.title, report.bodyHtml).then(function (ok) {
        if (!ok) {
          clearReportedToday(pageName); // allow a retry if nothing was delivered
          mw.notify(t('failed-none'), { type: 'error' });
          return;
        }
        mw.notify(t('success', ok, targets.length));
      });
    }).catch(function (err) {
      clearReportedToday(pageName);
      console.error('ReportArticle:', err);
      mw.notify(t('failed-error'), { type: 'error' });
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
        '#',                       // href so it gets styled as a link/button
        t('button-label'),         // label
        'ca-report-article',       // id
        t('button-tooltip')        // tooltip
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

  // Do not load I18n-js on pages where the button will not be shown
  if (!isReportablePage()) return;

  loadI18n().then(function (loaded) {
    i18n = loaded;
    $(addButton);
  });
});