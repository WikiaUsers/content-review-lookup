/* All JavaScript here will be loaded for users of the mobile site */
console.log('⭐ Rating script loaded');

mw.loader.using(['mediawiki.api'], function() {
  $(function() {
    if ($('.article-rating-container').length) return;
    console.log('⏳ Injecting rating container');

    var page      = mw.config.get('wgPageName'),
        user      = mw.config.get('wgUserName'),
        api       = new mw.Api(),
        storePage = 'Chicken_Gun_Fanon_Wiki:_Оценки_статей'; // <-- Замените на точное имя вашей страницы-хранилища!

    // Создание контейнера и элементов
    var $cont = $('<div class="article-rating-container">').css({
      border: '1px solid #888',
      padding: '0.6em',
      'border-radius': '0.4em',
      background: '#F5F5DC',
      margin: '1em 0',
      'box-shadow': '0 0.1em 0.3em rgba(0,0,0,0.1)'
    });
    var $like    = $('<span class="article-rating-like">👍</span>').css({ cursor:'pointer','margin-right':'0.6em','font-size':'1.4em' });
    var $dislike = $('<span class="article-rating-dislike">👎</span>').css({ cursor:'pointer','margin-right':'0.6em','font-size':'1.4em' });
    var $stats   = $('<span class="article-rating-stats">Загрузка…</span>').css({ 'margin-right':'0.8em','font-size':'0.9em', color:'#333' });
    var $userMsg = $('<span class="article-rating-user">—</span>').css({ 'font-size':'0.9em', color:'#333' });

    $cont.append($like, $dislike, $stats, $userMsg);
    var $main = $('#mw-content-text, #WikiaArticle');
    if (!$main.length) return console.error('❌ Rating: контейнер страницы не найден');
    $main.prepend($cont);
    console.log('✅ Rating container injected');

    // Функция отрисовки
    function updateUI(info) {
      console.log('🔄 updateUI', info);
      var likes    = info.likes    || 0;
      var dislikes = info.dislikes || 0;
      var total    = likes + dislikes;
      var pct      = total ? Math.round(likes/total*100) : 0;
      $stats.text('Голосов: ' + total + ' (👍 ' + likes + ', 👎 ' + dislikes + '), ' + pct + '% 👍');
      if (user) {
        if (info.voters && info.voters[user]) {
          var v = info.voters[user] === 1 ? 'Вы: 👍' : 'Вы: 👎';
          $userMsg.text(v);
          (info.voters[user] === 1 ? $like : $dislike).css('opacity','0.5');
        } else {
          $userMsg.text('Вы ещё не голосовали');
        }
      } else {
        $userMsg.text('Войдите, чтобы голосовать');
      }
    }

    // Запрос к API
    api.get({
      action: 'query', prop: 'revisions',
      titles: storePage, rvprop: 'content',
      format: 'json'
    }).done(function(d) {
      console.log('📥 API response', d);
      var pages = d.query.pages, txt = '';
      for (var k in pages) { txt = (pages[k].revisions||[])[0]['*'] || ''; break; }

      var allData;
      try { allData = txt ? JSON.parse(txt) : {}; }
      catch(e) {
        console.error('❗ JSON parse error', e);
        allData = {};
      }
      if (!allData[page]) allData[page] = { likes:0, dislikes:0, voters:{} };
      var info = allData[page];
      updateUI(info);

      // Обработчики кликов
      $like.click(function() {
        if (!user) return alert('Войдите для голосования');
        if (info.voters[user]) return alert('Вы уже голосовали');
        info.likes++; info.voters[user] = 1;
        saveAndReload(allData);
      });
      $dislike.click(function() {
        if (!user) return alert('Войдите для голосования');
        if (info.voters[user]) return alert('Вы уже голосовали');
        info.dislikes++; info.voters[user] = -1;
        saveAndReload(allData);
      });

      function saveAndReload(data) {
        api.edit({
          action: 'edit', title: storePage,
          summary: 'Обновление рейтинга: ' + page,
          text: JSON.stringify(data, null, 2),
          bot: true
        }).done(function(res) {
          console.log('💾 save response', res);
          if (res.edit && res.edit.result === 'Success') location.reload();
          else if (res.error) alert('Ошибка при сохранении: ' + res.error.info);
        });
      }
    }).fail(function(err) {
      console.error('❗ API запрос провален', err);
      $stats.text('Ошибка загрузки');
      $userMsg.text('');
    });

  });
});