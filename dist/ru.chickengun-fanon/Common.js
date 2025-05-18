/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */


(function($, mw) {
  'use strict';

  // =========================
  // === КОНФИГУРАЦИЯ ===
  // =========================
  var config = {
    storePage:      'Chicken_Gun_Fanon_Wiki:_Оценки_статей',
    minEditsToVote: 50,
    // BERTRAND: используем wgScriptPath + index.php?title=...&action=raw
    buttonGifLike:
      mw.config.get('wgScriptPath') +
      '/index.php?title=Special:FilePath/Crazy_Like_Button.gif&action=raw',
    buttonGifDislike:
      mw.config.get('wgScriptPath') +
      '/index.php?title=Special:FilePath/Bad_Dislike_Button.gif&action=raw'
  };

  // =========================
  // === БЛОК 1: Голосование ===
  // =========================
  (function initRatingBlock() {
    // Только основное неймспейс и режим просмотра
    if (mw.config.get('wgNamespaceNumber') !== 0 || mw.config.get('wgAction') !== 'view') return;
    if ($('.article-rating-container').length) return; // не дублируем

    console.log('[Rating] Инициализация');

    mw.loader.using('mediawiki.api').then(function() {
      var page    = mw.config.get('wgPageName'),
          user    = mw.config.get('wgUserName') || '',
          edits   = mw.config.get('wgUserEditCount') || 0,
          groups  = mw.config.get('wgUserGroups') || [],
          canVote = user && groups.includes('autoconfirmed') && edits >= config.minEditsToVote,
          api     = new mw.Api();

      // --- Создаём контейнер ---
      var $cont = $('<div>', { class: 'article-rating-container' }).css({
        border: '1px solid #888', padding: '1em', borderRadius: '0.4em',
        background: '#F5F5DC', color: '#333', margin: '1em 0',
        boxShadow: '0 0.2em 0.5em rgba(0,0,0,0.1)'
      });
      var $title = $('<div>', { text: 'Оценка статьи', class: 'article-rating-title' }).css({
        fontWeight: 'bold', marginBottom: '0.5em'
      });

      // --- Кнопки с GIF ---
      var $likeImg    = $('<img>', { src: config.buttonGifLike,    alt: '👍' });
      var $dislikeImg = $('<img>', { src: config.buttonGifDislike, alt: '👎' });
      var $like    = $('<button>', { class: 'article-rating-btn like'    }).append($likeImg);
      var $dislike = $('<button>', { class: 'article-rating-btn dislike' }).append($dislikeImg);

      // --- Статистика и подсказка ---
      var $stats   = $('<span>', { class: 'article-rating-stats', text: 'Загрузка…' });
      var $userMsg = $('<span>', { class: 'article-rating-user' }).css({ marginLeft: '1em' });

      // Вставляем всё в статью
      $('.mw-parser-output').first().prepend($cont.append($title, $like, $dislike, $stats, $userMsg));

      // Функция обновления UI
      function updateUI(info) {
        var likes    = info.likes    || 0;
        var dislikes = info.dislikes || 0;
        var total    = likes + dislikes;
        var pct      = total ? Math.round(likes / total * 100) : 0;
        $stats.text(`Всего: ${total} (👍 ${likes}, 👎 ${dislikes}) — ${pct}% 👍`);

        if (!user) {
          $userMsg.text('Войдите для голосования');
        } else if (!canVote) {
          $userMsg.text(`Нужно ≥${config.minEditsToVote} правок и автоподтверждение`);
        } else if (info.voters[user]) {
          $userMsg.text(info.voters[user] === 1 ? 'Вы уже ставили 👍' : 'Вы уже ставили 👎');
          (info.voters[user] === 1 ? $like : $dislike).addClass('voted');
        } else {
          $userMsg.text('Ваш голос ещё не учтён');
        }
      }

      // Загрузка данных
      api.get({
        action: 'query',
        prop:   'revisions',
        titles: config.storePage,
        rvprop: 'content',
        format: 'json'
      }).done(function(res) {
        console.log('[Rating] Данные загружены');
        var pages = res.query.pages, raw = '', data = {};
        for (var id in pages) {
          raw = (pages[id].revisions||[])[0]['*'] || '';
          break;
        }
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch(e) {
          data = {};
        }
        if (!data[page]) data[page] = { up:0, down:0, voters:{} };
        var info = {
          likes:    data[page].up   || 0,
          dislikes: data[page].down || 0,
          voters:   data[page].voters || {}
        };
        updateUI(info);

        // Обработчики кликов
        $like.on('click', function() {
          if (!canVote || info.voters[user]) return;
          info.likes++; info.voters[user] = 1; saveAll();
        });
        $dislike.on('click', function() {
          if (!canVote || info.voters[user]) return;
          info.dislikes++; info.voters[user] = -1; saveAll();
        });

        function saveAll() {
          data[page] = { up: info.likes, down: info.dislikes, voters: info.voters };
          api.postWithToken('csrf', {
            action: 'edit',
            title:  config.storePage,
            summary:`Обновление оценок для «${page}»`,
            text:   JSON.stringify(data, null, 2)
          }).done(function() {
            location.reload();
          });
        }
      }).fail(function() {
        console.error('[Rating] Ошибка загрузки данных');
        $stats.text('Ошибка загрузки');
      });

    }); // mw.loader
  })();

  // ======================================
  // === БЛОК 2: Топ‑лист статей по рейтингу ===
  // ======================================
  (function initTopList() {
    $(function() {
      if (mw.config.get('wgPageName') !== 'Chicken_Gun_Fanon_Wiki:_Список_оценок') return;
      console.log('[TopList] Инициализация');

      mw.loader.using('mediawiki.api').then(function() {
        var api      = new mw.Api();
        var pageList = [];

        // Вставляем контейнер и назначаем $output
        var $container = $('.mw-parser-output');
        $container.html(
          '<h2>Список статей по рейтингу</h2>' +
          '<div id="rating-list">Загрузка…</div>'
        );
        var $output = $container.find('#rating-list');

        // Шаг 1: получаем JSON
        api.get({
          action: 'query',
          prop:   'revisions',
          titles: config.storePage,
          rvprop: 'content',
          format: 'json'
        }).done(function(res) {
          console.log('[TopList] Рейтинги получены');
          var pages = res.query.pages, raw = '';
          for (var k in pages) {
            raw = (pages[k].revisions||[])[0]['*'] || '';
            break;
          }
          var data = {};
          try {
            data = raw ? JSON.parse(raw) : {};
          } catch(e) {
            console.error('[TopList] Ошибка парсинга JSON', e);
          }

          Object.keys(data).forEach(function(titleKey) {
            var rec   = data[titleKey],
                score = (rec.up||0) - (rec.down||0);
            pageList.push({ key: titleKey, score: score });
          });
          pageList.sort(function(a,b){ return b.score - a.score; });

          // Шаг 2: проверяем существование
         var allTitles = pageList.map(o=>o.key).join('|');
api.get({
  action: 'query',
  titles: allTitles,
  format: 'json'
}).done(function(res2) {
  var existing = {};
  Object.values(res2.query.pages).forEach(function(p) {
    if (!p.missing && !p.invalid) {
      var key = p.title.replace(/ /g, '_');
      existing[key] = true;
    }
  });

  var filtered = pageList.filter(function(item) {
    return existing[item.key];
  });

  if (!filtered.length) {
    $output.text('Нет доступных страниц для отображения.');
    return;
  }
  var html = '<ul>';
  filtered.forEach(function(item) {
    var display = item.key.replace(/_/g, ' ');
    var sign = item.score > 0 ? '+' : '';
    html +=
      '<li>' +
        '<a href="' + mw.util.getUrl(item.key) + '">' + display + '</a>' +
        ' — ' + sign + item.score +
      '</li>';
  });
  html += '</ul>';
  $output.html(html);
          }).fail(function() {
            console.error('[TopList] Ошибка проверки страниц');
            $output.text('Ошибка при проверке наличия страниц.');
          });

        }).fail(function() {
          console.error('[TopList] Ошибка загрузки рейтингов');
          $output.text('Не удалось загрузить список.');
        });

      }); // mw.loader
    }); // jQuery ready
  })();

})(jQuery, mediaWiki);