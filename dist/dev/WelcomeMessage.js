/**
 * <nowiki>
 * Title: WelcomeMessage
 * Version: 1.0.0 (stable)
 * Author: AnAmanLyetNye
 * Built on: mw 1.43.1
 */

mw.loader.using(['mediawiki.api', 'mediawiki.user']).then(function () {
  var api = new mw.Api();
  var currentUser = mw.config.get('wgUserName');
  if (!currentUser) return; // logged-in only

  // Debug only when explicitly requested by the target wiki’s config:
  var DEBUG = !!(window.welcomeMessage && (window.welcomeMessage.debug || window.welcomeMessage.testAllEdits));
  if (DEBUG) console.log('[greeter] loaded for', currentUser);

  // -------- helpers --------
  function wallEnabled() {
    // Robust: check for the Message Wall namespace id in wgNamespaceIds (covers i18n keys too).
    var ids = mw.config.get('wgNamespaceIds') || {};
    var hasWallNs = false;
    var keys = ['message_wall', 'messagewall', 'message-wall', 'message wall'];
    for (var i = 0; i < keys.length; i++) {
      if (Object.prototype.hasOwnProperty.call(ids, keys[i])) { hasWallNs = true; break; }
    }
    if (!hasWallNs) {
      for (var k in ids) {
        if (!Object.prototype.hasOwnProperty.call(ids, k)) continue;
        var v = ids[k];
        if (typeof v === 'number' && (v === 1200 || v === 1201)) { hasWallNs = true; break; }
      }
    }
    var flag = mw.config.get('wgEnableWallExt') || mw.config.get('EnableWallExt') || mw.config.get('wgMessageWallEnabled');
    var enabled = !!(hasWallNs || flag);
    if (DEBUG) console.log('[greeter] wallEnabled =', enabled, '(ns:', hasWallNs, 'flag:', !!flag, ')');
    return enabled;
  }

  function editedPage() {
    var name = mw.config.get('wgRelevantPageName') || mw.config.get('wgPageName');
    if (DEBUG) console.log('[greeter] editedPage =', name);
    return name;
  }

  function wikiHref(title) {
    var base = mw.config.get('wgServer');
    var path = mw.config.get('wgArticlePath') || '/wiki/$1';
    var slug = mw.util.wikiUrlencode(title);
    return base + path.replace('$1', slug);
  }

  function fillTemplate(str, vars, cfg) {
    // $1=username, $2=page, $3=adminNickname, $4=adminUsername
    return String(str)
      .replace(/\$1/g, vars.username)
      .replace(/\$2/g, vars.page)
      .replace(/\$3/g, cfg.adminNickname || '')
      .replace(/\$4/g, cfg.adminUsername || '');
  }

  // Default message text with real anchors (works on Wall and Talk)
  function buildDefaultMessage(vars, cfg) {
	var pageHref     = wikiHref(vars.page);
	var nick         = cfg.adminNickname || cfg.adminUsername || '';
	var adminWallHref = cfg.adminUsername ? wikiHref('Message Wall:' + cfg.adminUsername) : '';
	var msgLink       = adminWallHref ? '<a href="' + adminWallHref + '">message</a>' : 'message';
	
	return (
	  'Hi, ' + vars.username + ' I\'m ' + (nick || 'one of the admins here') + '.\n\n' +
	  'Thanks for your edit on <a href="' + pageHref + '">' + vars.page + '</a>! ' +
	  'If you need help, please shoot me a ' + msgLink + '.\n\n' +
	  '— ' + (nick || 'Admin')
	);
  }

  // Convert simple HTML with <a href="...">text</a> and blank-line paragraphs to a Wall jsonModel
  function jsonModelFromHtml(text) {
    var paras = String(text).split(/\n{2,}/);
    var model = { type: 'doc', content: [] };

    paras.forEach(function (para) {
      var parts = [];
      var re = /<a\s+href="([^"]+)">([^<]+)<\/a>/gi;
      var lastIndex = 0, m;
      while ((m = re.exec(para)) !== null) {
        if (m.index > lastIndex) {
          parts.push({ type: 'text', text: para.slice(lastIndex, m.index) });
        }
        parts.push({
          type: 'text',
          text: m[2],
          marks: [{ type: 'link', attrs: { href: m[1] } }]
        });
        lastIndex = re.lastIndex;
      }
      if (lastIndex < para.length) {
        parts.push({ type: 'text', text: para.slice(lastIndex) });
      }
      if (!parts.length) parts.push({ type: 'text', text: '' });
      model.content.push({ type: 'paragraph', content: parts });
    });

    return JSON.stringify(model);
  }

  // -------- configuration (read at send-time) --------
  var DEFAULTS = {
    enabled: true,
    adminUsername: '',              // $4
    adminNickname: '',              // $3
    messageTitle: 'Welcome, $1!',   // $1, $2, $3, $4 available
    // messageText default is generated at runtime so links become true <a> anchors
    dedupKeyPrefix: 'welcomeMessage/v1/',
    testAllEdits: false,            // when true, post on every save (no dedup, no first-edit check)
    preferTalk: false               // set true to force talk (debugging)
  };

  function getConfig() {
    var c = (window.welcomeMessage || {});
    var cfg = {
      enabled: ('enabled' in c) ? !!c.enabled : DEFAULTS.enabled,
      adminUsername: c.adminUsername || DEFAULTS.adminUsername,
      adminNickname: c.adminNickname || DEFAULTS.adminNickname,
      messageTitle: c.messageTitle || DEFAULTS.messageTitle,
      messageText: (typeof c.messageText === 'string' && c.messageText.trim()) ? c.messageText : null,
      dedupKeyPrefix: c.dedupKeyPrefix || DEFAULTS.dedupKeyPrefix,
      testAllEdits: ('testAllEdits' in c) ? !!c.testAllEdits : DEFAULTS.testAllEdits,
      preferTalk: ('preferTalk' in c) ? !!c.preferTalk : DEFAULTS.preferTalk
    };
    if (DEBUG) console.log('[greeter] config =', cfg);
    return cfg;
  }

  // -------- posting primitives --------
  function postToWall(targetUsername, title, bodyHtml) {
    if (DEBUG) console.log('[greeter] posting to WALL of', targetUsername, 'title=', title);
    return api.get({
      action: 'query',
      list: 'users',
      ususers: targetUsername,
      format: 'json'
    }).then(function (data) {
      var user = data && data.query && data.query.users && data.query.users[0];
      if (!user || !user.userid) {
        throw new Error('Could not resolve userid for wall owner: ' + targetUsername);
      }
      return $.ajax({
        type: 'POST',
        url: mw.util.wikiScript('wikia') +
             '?controller=Fandom%5CMessageWall%5CMessageWall&method=createThread&format=json',
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
    });
  }

  function postToUserTalk(targetUsername, title, body) {
    if (DEBUG) console.log('[greeter] posting to TALK of', targetUsername, 'title=', title);
    return api.newSection('User_talk:' + targetUsername, title, body);
  }

  // -------- dedup per browser session --------
  function isDeduped(cfg) {
    try {
      var key = cfg.dedupKeyPrefix + currentUser;
      if (sessionStorage.getItem(key)) return true;
      sessionStorage.setItem(key, '1');
      return false;
    } catch (_) {
      return false;
    }
  }

  // -------- main: after successful save --------
  mw.hook('postEdit').add(function () {
    if (DEBUG) console.log('[greeter] postEdit fired');
    var cfg = getConfig();
    if (!cfg.enabled) return;

    function proceed() {
      var vars  = { username: currentUser, page: editedPage() };
      var title = fillTemplate(cfg.messageTitle, vars, cfg);
      var body  = cfg.messageText ? fillTemplate(cfg.messageText, vars, cfg)
                                  : buildDefaultMessage(vars, cfg);

      if (cfg.preferTalk) {
        if (DEBUG) console.log('[greeter] preferTalk=true -> skipping Wall');
        return postToUserTalk(currentUser, title, body).then(function () {
          mw.notify('Welcome posted to User talk.', { type: 'success' });
        }).catch(function (err) {
          if (DEBUG) console.error('[greeter] talk post failed', err);
          mw.notify('Welcome post failed (Talk). See console.', { type: 'error' });
        });
      }

      // Try WALL first; on failure, fall back to TALK
      return postToWall(currentUser, title, body).then(function () {
        mw.notify('Welcome posted to Message Wall.', { type: 'success' });
      }).catch(function (err) {
        if (DEBUG) console.warn('[greeter] wall post failed, falling back to Talk', err);
        return postToUserTalk(currentUser, title, body).then(function () {
          mw.notify('Welcome posted to User talk (fallback).', { type: 'success' });
        }).catch(function (err2) {
          if (DEBUG) console.error('[greeter] talk post failed after wall failure', err2);
          mw.notify('Welcome post failed (Wall+Talk). See console.', { type: 'error' });
        });
      });
    }

    // TEST MODE: fire on every edit, no dedup, no first-edit check
    if (cfg.testAllEdits) {
      if (DEBUG) console.log('[greeter] TEST MODE -> posting on every edit');
      proceed();
      return;
    }

    // Normal mode: dedup + confirm first-ever edit (exactly one contrib)
    if (isDeduped(cfg)) {
      if (DEBUG) console.log('[greeter] deduped; skipping');
      return;
    }

    api.get({
      action: 'query',
      list: 'usercontribs',
      ucuser: currentUser,
      uclimit: 2,
      ucprop: 'ids|title|timestamp',
      format: 'json'
    }).then(function (data) {
      var contribs = (data && data.query && data.query.usercontribs) || [];
      if (DEBUG) console.log('[greeter] contribs length =', contribs.length);
      if (contribs.length !== 1) return;
      proceed();
    }).catch(function (e) {
      if (DEBUG) console.error('[greeter] usercontribs check failed', e);
    });
  });

  // Log our best guess at init so you can see it in console (optional)
  wallEnabled();
}).catch(function (e) {
  console.error('[greeter] loader failed', e);
});