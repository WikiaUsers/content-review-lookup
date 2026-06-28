/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
(function ($, mw) {
  'use strict';

  // =========================
  // === КОНФИГУРАЦИЯ ===
  // =========================
  var config = {
    storePage: 'Chicken_Gun_Fanon_Wiki:_Оценки_статей',
    topListPage: 'Chicken_Gun_Fanon_Wiki:_Список_оценок',
    minEditsToVote: 50,
    checkBatchSize: 20,

    buttonGifLike: mw.config.get('wgScriptPath') +
      '/index.php?title=Special:FilePath/Crazy_Like_Button.gif&action=raw',

    buttonGifDislike: mw.config.get('wgScriptPath') +
      '/index.php?title=Special:FilePath/Bad_Dislike_Button.gif&action=raw'
  };

  // =========================
  // === УТИЛИТЫ ===
  // =========================
  function normalizeTitle(title) {
    return String(title || '').replace(/ /g, '_');
  }

  function denormalizeTitle(title) {
    return String(title || '').replace(/_/g, ' ');
  }

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function chunkArray(arr, size) {
    var out = [];
    for (var i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  }

  function safeJsonParse(text) {
    try {
      return text ? JSON.parse(text) : {};
    } catch (e) {
      console.error('[Rating] JSON parse error:', e);
      return {};
    }
  }

  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  function normalizeRecord(rec) {
    rec = rec && isPlainObject(rec) ? rec : {};
    return {
      up: Number(rec.up || 0),
      down: Number(rec.down || 0),
      voters: (rec.voters && isPlainObject(rec.voters)) ? rec.voters : {}
    };
  }

  function canonicalizeStoreData(data) {
    var out = {};
    if (!data || !isPlainObject(data)) return out;

    for (var key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
      if (key.indexOf('__') === 0) continue;
      out[normalizeTitle(key)] = normalizeRecord(data[key]);
    }

    return out;
  }

  function getRevisionContent(pageData) {
    var revs = pageData && pageData.revisions ? pageData.revisions : [];
    if (!revs.length) return '';

    var rev = revs[0];

    if (rev.slots && rev.slots.main && typeof rev.slots.main.content === 'string') {
      return rev.slots.main.content;
    }

    if (typeof rev['*'] === 'string') {
      return rev['*'];
    }

    return '';
  }

  function getStoreData(api) {
    return api.get({
      action: 'query',
      prop: 'revisions',
      titles: config.storePage,
      rvprop: 'content',
      rvslots: 'main',
      formatversion: 2,
      format: 'json'
    }).then(function (res) {
      var pages = (res && res.query && res.query.pages) ? res.query.pages : [];
      var raw = '';

      if (pages.length) {
        raw = getRevisionContent(pages[0]);
      }

      return canonicalizeStoreData(safeJsonParse(raw));
    });
  }

  function saveStoreData(api, data, summary) {
    return api.postWithToken('csrf', {
      action: 'edit',
      title: config.storePage,
      summary: summary || 'Обновление оценок',
      text: JSON.stringify(canonicalizeStoreData(data), null, 2)
    });
  }

  function getUserInfo(api) {
    return api.get({
      action: 'query',
      meta: 'userinfo',
      uiprop: 'groups|editcount|name',
      formatversion: 2,
      format: 'json'
    }).then(function (res) {
      var info = (res && res.query && res.query.userinfo) ? res.query.userinfo : {};
      return {
        name: info.name || mw.config.get('wgUserName') || '',
        editcount: Number(info.editcount || 0),
        groups: info.groups || []
      };
    }, function () {
      return {
        name: mw.config.get('wgUserName') || '',
        editcount: Number(mw.config.get('wgUserEditCount') || 0),
        groups: mw.config.get('wgUserGroups') || []
      };
    });
  }

  function renderRatingUI($cont, info, canVote, userName) {
    var likes = Number(info.likes || 0);
    var dislikes = Number(info.dislikes || 0);
    var total = likes + dislikes;
    var pct = total ? Math.round((likes / total) * 100) : 0;

    var $stats = $cont.find('.article-rating-stats');
    var $userMsg = $cont.find('.article-rating-user');
    var $like = $cont.find('.article-rating-btn.like');
    var $dislike = $cont.find('.article-rating-btn.dislike');

    $stats.text('Всего: ' + total + ' (👍 ' + likes + ', 👎 ' + dislikes + ') — ' + pct + '% 👍');

    $like.removeClass('voted');
    $dislike.removeClass('voted');

    if (!userName) {
      $userMsg.text('Войдите для голосования');
      $like.prop('disabled', true);
      $dislike.prop('disabled', true);
      return;
    }

    if (!canVote) {
      $userMsg.text('Нужно ≥' + config.minEditsToVote + ' правок и автоподтверждение');
      $like.prop('disabled', true);
      $dislike.prop('disabled', true);
      return;
    }

    if (info.voters && Object.prototype.hasOwnProperty.call(info.voters, userName)) {
      if (info.voters[userName] === 1) {
        $userMsg.text('Вы уже ставили 👍');
        $like.addClass('voted');
      } else if (info.voters[userName] === -1) {
        $userMsg.text('Вы уже ставили 👎');
        $dislike.addClass('voted');
      } else {
        $userMsg.text('Ваш голос уже учтён');
      }

      $like.prop('disabled', true);
      $dislike.prop('disabled', true);
    } else {
      $userMsg.text('Ваш голос ещё не учтён');
      $like.prop('disabled', false);
      $dislike.prop('disabled', false);
    }
  }

  function renderTopList($output, pageList) {
    if (!pageList.length) {
      $output.text('Нет доступных страниц для отображения.');
      return;
    }

    var html = '<ul>';
    for (var i = 0; i < pageList.length; i++) {
      var item = pageList[i];
      var display = escapeHtml(denormalizeTitle(item.key));
      var sign = item.score > 0 ? '+' : '';

      html +=
        '<li>' +
          '<a href="' + mw.util.getUrl(item.key) + '">' + display + '</a>' +
          ' — ' + sign + item.score +
        '</li>';
    }
    html += '</ul>';

    $output.html(html);
  }

  function checkExistingPages(api, titles) {
    var deferred = $.Deferred();
    var existing = Object.create(null);
    var batches = chunkArray(titles, config.checkBatchSize);
    var idx = 0;

    function processNext() {
      if (idx >= batches.length) {
        deferred.resolve(existing);
        return;
      }

      api.post({
        action: 'query',
        titles: batches[idx].join('|'),
        formatversion: 2,
        format: 'json',
        redirects: 1
      }).done(function (res) {
        var pages = (res && res.query && res.query.pages) ? res.query.pages : [];

        for (var i = 0; i < pages.length; i++) {
          var p = pages[i];
          if (!p.missing && !p.invalid && p.title) {
            existing[normalizeTitle(p.title)] = true;
          }
        }

        idx++;
        processNext();
      }).fail(function (xhr) {
        console.error('[TopList] Ошибка проверки страниц:', xhr);
        idx++;
        processNext();
      });
    }

    processNext();
    return deferred.promise();
  }

  function cleanupDeletedPages(api, data) {
    var deferred = $.Deferred();
    var keys = [];

    data = canonicalizeStoreData(data);

    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        keys.push(key);
      }
    }

    if (!keys.length) {
      deferred.resolve({
        data: data,
        removed: 0
      });
      return deferred.promise();
    }

    var batches = chunkArray(keys, config.checkBatchSize);
    var existing = Object.create(null);
    var idx = 0;

    function processNext() {
      if (idx >= batches.length) {
        var cleaned = {};
        var removed = 0;

        for (var i = 0; i < keys.length; i++) {
          var title = keys[i];
          if (existing[title]) {
            cleaned[title] = data[title];
          } else {
            removed++;
          }
        }

        deferred.resolve({
          data: cleaned,
          removed: removed
        });
        return;
      }

      api.post({
        action: 'query',
        titles: batches[idx].join('|'),
        formatversion: 2,
        format: 'json',
        redirects: 1
      }).done(function (res) {
        var pages = (res && res.query && res.query.pages) ? res.query.pages : [];

        for (var i = 0; i < pages.length; i++) {
          var p = pages[i];
          if (!p.missing && !p.invalid && p.title) {
            existing[normalizeTitle(p.title)] = true;
          }
        }

        idx++;
        processNext();
      }).fail(function () {
        idx++;
        processNext();
      });
    }

    processNext();
    return deferred.promise();
  }

  // =========================
  // === БЛОК 1: Голосование ===
  // =========================
  (function initRatingBlock() {
    if (mw.config.get('wgNamespaceNumber') !== 0 || mw.config.get('wgAction') !== 'view') return;
    if ($('.article-rating-container').length) return;

    mw.loader.using('mediawiki.api').then(function () {
      var api = new mw.Api();

      getUserInfo(api).then(function (userInfo) {
        var page = normalizeTitle(mw.config.get('wgPageName'));
        var user = userInfo.name || '';
        var edits = Number(userInfo.editcount || 0);
        var groups = userInfo.groups || [];
        var canVote = !!user &&
          edits >= config.minEditsToVote &&
          groups.indexOf('autoconfirmed') !== -1;

        var $cont = $('<div>', { class: 'article-rating-container' }).css({
          border: '1px solid #888',
          padding: '1em',
          borderRadius: '0.4em',
          background: '#F5F5DC',
          color: '#333',
          margin: '1em 0',
          boxShadow: '0 0.2em 0.5em rgba(0,0,0,0.1)'
        });

        var $title = $('<div>', {
          text: 'Оценка статьи',
          class: 'article-rating-title'
        }).css({
          fontWeight: 'bold',
          marginBottom: '0.5em'
        });

        var $likeImg = $('<img>', { src: config.buttonGifLike, alt: '👍' });
        var $dislikeImg = $('<img>', { src: config.buttonGifDislike, alt: '👎' });

        var $like = $('<button>', {
          class: 'article-rating-btn like',
          type: 'button'
        }).append($likeImg);

        var $dislike = $('<button>', {
          class: 'article-rating-btn dislike',
          type: 'button'
        }).append($dislikeImg);

        var $stats = $('<span>', {
          class: 'article-rating-stats',
          text: 'Загрузка…'
        });

        var $userMsg = $('<span>', {
          class: 'article-rating-user'
        }).css({
          marginLeft: '1em'
        });

        $like.css({ marginRight: '0.5em' });
        $dislike.css({ marginRight: '0.5em' });

        $like.prop('disabled', true);
        $dislike.prop('disabled', true);

        $('.mw-parser-output').first().prepend(
          $cont.append($title, $like, $dislike, $stats, $userMsg)
        );

        getStoreData(api).then(function (data) {
          if (!data[page]) {
            data[page] = { up: 0, down: 0, voters: {} };
          }

          var info = {
            likes: Number(data[page].up || 0),
            dislikes: Number(data[page].down || 0),
            voters: data[page].voters || {}
          };

          renderRatingUI($cont, info, canVote, user);

          $like.on('click', function () {
            if (!canVote || (info.voters && info.voters[user])) return;

            info.likes++;
            info.voters[user] = 1;

            data[page] = {
              up: info.likes,
              down: info.dislikes,
              voters: info.voters
            };

            $stats.text('Сохранение…');

            saveStoreData(api, data, 'Обновление оценок для «' + denormalizeTitle(page) + '»')
              .done(function () {
                location.reload();
              })
              .fail(function (xhr) {
                console.error('[Rating] Ошибка сохранения:', xhr);
                $stats.text('Ошибка сохранения');
              });
          });

          $dislike.on('click', function () {
            if (!canVote || (info.voters && info.voters[user])) return;

            info.dislikes++;
            info.voters[user] = -1;

            data[page] = {
              up: info.likes,
              down: info.dislikes,
              voters: info.voters
            };

            $stats.text('Сохранение…');

            saveStoreData(api, data, 'Обновление оценок для «' + denormalizeTitle(page) + '»')
              .done(function () {
                location.reload();
              })
              .fail(function (xhr) {
                console.error('[Rating] Ошибка сохранения:', xhr);
                $stats.text('Ошибка сохранения');
              });
          });
        }, function (xhr) {
          console.error('[Rating] Ошибка загрузки данных:', xhr);
          $stats.text('Ошибка загрузки');
        });
      });
    });
  })();

  // ======================================
  // === БЛОК 2: Топ-лист статей по рейтингу ===
  // ======================================
  (function initTopList() {
    $(function () {
      if (normalizeTitle(mw.config.get('wgPageName')) !== normalizeTitle(config.topListPage)) return;

      mw.loader.using('mediawiki.api').then(function () {
        var api = new mw.Api();
        var $container = $('.mw-parser-output').first();

        $container.html(
          '<h2>Список статей по рейтингу</h2>' +
          '<div id="rating-tools" style="margin:0.75em 0;"></div>' +
          '<div id="rating-list">Загрузка…</div>'
        );

        var $tools = $container.find('#rating-tools');
        var $output = $container.find('#rating-list');

        function loadAndRender() {
          $output.text('Загрузка…');

          getStoreData(api).then(function (data) {
            var pageList = [];
            var titles = [];

            for (var titleKey in data) {
              if (!Object.prototype.hasOwnProperty.call(data, titleKey)) continue;
              if (titleKey.indexOf('__') === 0) continue;

              var rec = data[titleKey] || {};
              var score = Number(rec.up || 0) - Number(rec.down || 0);

              pageList.push({
                key: normalizeTitle(titleKey),
                score: score
              });

              titles.push(normalizeTitle(titleKey));
            }

            pageList.sort(function (a, b) {
              return b.score - a.score;
            });

            if (!pageList.length) {
              $output.text('Список пуст.');
              return;
            }

            checkExistingPages(api, titles).then(function (existing) {
              var filtered = [];

              for (var i = 0; i < pageList.length; i++) {
                var item = pageList[i];
                if (existing[normalizeTitle(item.key)]) {
                  filtered.push(item);
                }
              }

              renderTopList($output, filtered.length ? filtered : pageList);

              if (!filtered.length) {
                $output.prepend(
                  '<div style="margin-bottom:0.75em; color:#666;">' +
                    'Не удалось подтвердить наличие страниц, показан общий список.' +
                  '</div>'
                );
              }
            });
          }).fail(function (xhr) {
            console.error('[TopList] Ошибка загрузки рейтингов:', xhr);
            $output.text('Не удалось загрузить список.');
          });
        }

        function cleanupNow() {
          $output.text('Очистка удалённых страниц…');

          getStoreData(api).then(function (data) {
            cleanupDeletedPages(api, data).then(function (result) {
              var cleaned = result.data || {};
              var removed = Number(result.removed || 0);

              if (!removed) {
                $output.text('Удалённых записей не найдено.');
                loadAndRender();
                return;
              }

              saveStoreData(api, cleaned, 'Очистка удалённых страниц (' + removed + ')')
                .done(function () {
                  loadAndRender();
                })
                .fail(function (xhr) {
                  console.error('[Cleanup] Ошибка сохранения очищенных данных:', xhr);
                  $output.text('Очищенный список не удалось сохранить.');
                  loadAndRender();
                });
            });
          }).fail(function (xhr) {
            console.error('[Cleanup] Ошибка загрузки данных:', xhr);
            $output.text('Не удалось загрузить данные для очистки.');
          });
        }

        var userGroups = mw.config.get('wgUserGroups') || [];
        var isSysop = userGroups.indexOf('sysop') !== -1;

        var $btnReload = $('<button>', {
          type: 'button',
          text: 'Обновить список'
        }).css({
          padding: '0.5em 0.8em',
          cursor: 'pointer'
        });

        $btnReload.on('click', function () {
          loadAndRender();
        });

        $tools.append($btnReload);

        if (isSysop) {
          var $btnCleanup = $('<button>', {
            type: 'button',
            text: '🧹 Очистить удалённые записи'
          }).css({
            padding: '0.5em 0.8em',
            cursor: 'pointer',
            marginRight: '0.5em'
          });

          $tools.prepend($btnCleanup);

          $btnCleanup.on('click', function () {
            $btnCleanup.prop('disabled', true);
            $btnReload.prop('disabled', true);

            cleanupNow();

            setTimeout(function () {
              $btnCleanup.prop('disabled', false);
              $btnReload.prop('disabled', false);
            }, 2000);
          });
        }

        loadAndRender();
      });
    });
  })();



(function () {
    // 1. НАДЕЖНАЯ ПРОВЕРКА ПРАВ ЧЕРЕЗ СИСТЕМНЫЙ ОБЪЕКТ mw.config
    var userGroups = mw.config.get('wgUserGroups') || [];
    var isModerator = userGroups.some(function (g) { 
        return ['sysop', 'moderator', 'bureaucrat', 'staff'].includes(g); 
    });
    if (!isModerator) return;

    var specialPage = mw.config.get('wgCanonicalSpecialPageName');
    var ns = mw.config.get('wgNamespaceNumber');
    var targetUser = mw.config.get('wgTitle');

    function formatExpiry(expiry) {
        if (!expiry) return 'Не указан';
        var exp = expiry.toLowerCase().trim();
        return (exp === 'infinite' || exp === 'infinity' || exp === 'indefinite')
            ? 'Бессрочно'
            : expiry;
    }

    // =========================
    // BAN + TEMPLATE
    // =========================
    function executeBanSequence(user, expiry, reason, successUrl) {
        var api = new mw.Api();
        var userPage = 'User:' + user;
        var expiryRu = formatExpiry(expiry);
        var newTemplate = '{{Заблокирован|срок=' + expiryRu + '|причина=' + reason + '}}\n';

        api.postWithToken('csrf', {
            action: 'block',
            user: user,
            expiry: expiry,
            reason: reason,
            nocreate: true,
            autoblock: true,
            reblock: true
        }).done(function () {

            api.get({
                action: 'query',
                prop: 'revisions',
                titles: userPage,
                rvprop: 'content',
                rvslots: 'main'
            }).done(function (res) {

                var pages = res.query.pages;
                var pageId = Object.keys(pages)[0];
                var currentText = '';

                if (pageId && pageId !== '-1' && pages[pageId].revisions) {
                    currentText =
                        pages[pageId].revisions[0].slots.main['*'] || '';
                }

                var cleanText = currentText.replace(/\{\{[Зз]аблокирован[\s\S]*?\}\}\n?/g, '');
                var finalText = newTemplate + cleanText;

                api.postWithToken('csrf', {
                    action: 'edit',
                    title: userPage,
                    text: finalText,
                    summary: 'Обновление плашки блокировки [Автоскрипт]'
                }).done(function () {
                    alert('Пользователь заблокирован');
                    window.location.href = successUrl || window.location.href;
                });

            });

        }).fail(function (code) {
            alert('Ошибка блокировки: ' + code);
        });
    }

    // =========================
    // UNBAN + REMOVE TEMPLATE
    // =========================
    function executeUnban(user, reason, successUrl) {
        var api = new mw.Api();
        var userPage = 'User:' + user;

        api.postWithToken('csrf', {
            action: 'unblock',
            user: user,
            reason: reason
        }).done(function () {

            api.get({
                action: 'query',
                prop: 'revisions',
                titles: userPage,
                rvprop: 'content',
                rvslots: 'main'
            }).done(function (res) {

                var pages = res.query.pages;
                var pageId = Object.keys(pages)[0];
                var currentText = '';

                if (pageId && pageId !== '-1' && pages[pageId].revisions) {
                    currentText =
                        pages[pageId].revisions[0].slots.main['*'] || '';
                }

                var cleanText = currentText.replace(/\{\{[Зз]аблокирован[\s\S]*?\}\}\n?/g, '');

                api.postWithToken('csrf', {
                    action: 'edit',
                    title: userPage,
                    text: cleanText,
                    summary: 'Разблокировка + удаление плашки [Автоскрипт]'
                }).done(function () {
                    alert('Пользователь разблокирован');
                    window.location.href = successUrl || window.location.href;
                });

            });

        }).fail(function (code) {
            alert('Ошибка разблокировки: ' + code);
        });
    }

    // =========================
    // INIT
    // =========================
    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {

        // ========================================================
        // BLOCK PAGE
        // ========================================================
        if (specialPage === 'Block') {

            mw.hook('wikipage.content').add(function () {

                var $container =
                    $('.mw-htmlform-submit-container').length
                        ? $('.mw-htmlform-submit-container')
                        : $('button[type="submit"]').parent();

                if (!$container.length || $('#fandom-fast-block-btn').length) return;

                var $btn = $('<button>', {
                    id: 'fandom-fast-block-btn',
                    type: 'button',
                    text: 'Заблокировать и повесить плашку',
                    css: {
                        marginLeft: '12px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        padding: '9px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }
                });

                $container.append($btn);

                $btn.on('click', function () {

                    var user =
                        $('#mw-bi-target').val() ||
                        $('input[name="wpTarget"]').val();

                    var expiry =
                        $('#mw-input-wpExpiry').val() ||
                        $('select[name="wpExpiry"]').val() ||
                        $('input[name="wpExpiry"]').val();

                    var selReason =
                        $('#mw-input-wpReason').val() ||
                        $('select[name="wpReason"]').val() ||
                        '';

                    var custReason =
                        $('#mw-input-wpReason-other').val() ||
                        $('input[name="wpReason-other"]').val() ||
                        '';

                    var finalReason =
                        (selReason && selReason !== 'other')
                            ? selReason + (custReason ? ' (' + custReason + ')' : '')
                            : (custReason || 'Не указана');

                    if (!user) return alert('Ошибка: имя пользователя не указано!');

                    $btn.prop('disabled', true).text('Обработка...');

                    executeBanSequence(
                        user,
                        expiry,
                        finalReason,
                        mw.util.getUrl('User:' + user)
                    );
                });
            });
        }

        // ========================================================
        // USER PAGE
        // ========================================================
        if ((ns === 2 || ns === 3) && !targetUser.includes('/')) {

            var observer = new MutationObserver(function (mutations, obs) {

                var $actionsMenu = $('.page-header__actions');

                if ($actionsMenu.length && !$('#fandom-profile-block-btn').length) {
                    obs.disconnect();

                    var $profileBtn = $('<button>', {
                        id: 'fandom-profile-block-btn',
                        type: 'button',
                        text: '🔒 Забанить / Разбан',
                        css: {
                            marginRight: '12px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            color: '#ff4d4d',
                            padding: '6px 10px'
                        }
                    });

                    $actionsMenu.prepend($profileBtn);

                    $profileBtn.on('click', function () {

                        var exp = prompt('Срок блокировки (3 days, 1 week, infinite, 0 = разбан):', 'infinite');
                        if (exp === null) return;

                        exp = exp.trim();
                        if (!exp) return alert('Ошибка: срок пустой!');

                        var reason = prompt('Причина:', 'Вандализм');
                        if (reason === null) return;
                        reason = reason.trim() || 'Не указана';

                        $profileBtn.prop('disabled', true).text('Обработка...');

                        if (exp === '0') {
                            executeUnban(targetUser, reason, mw.util.getUrl('User:' + targetUser));
                        } else {
                            executeBanSequence(targetUser, exp, reason, mw.util.getUrl('User:' + targetUser));
                        }
                    });
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }

    });

})();



})(jQuery, mediaWiki);