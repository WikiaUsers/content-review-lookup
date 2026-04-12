/* JavaScript som skrivs här körs varje gång en användare laddar en sida. */
mw.loader.load('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap');

mw.hook('wikipage.content').add(function () {

  // =====================
  // TOPPLISTA
  // =====================
  var topList = document.getElementById('top-pages');

  if (topList) {
    fetch('/api/v1/Articles/Top?limit=5')
      .then(res => res.json())
      .then(data => {

        topList.innerHTML = '';

        data.items.forEach((item, i) => {
          var li = document.createElement('li');

          var rank = document.createElement('span');
          rank.className = 'rank';
          rank.textContent = (i + 1);

          var link = document.createElement('a');
          link.href = item.url;
          link.textContent = item.title;

          li.appendChild(rank);
          li.appendChild(link);

          topList.appendChild(li);
        });

      })
      .catch(() => {
        topList.innerHTML = '<li>Kunde inte ladda populära artiklar</li>';
      });
  }

  // =====================
  // NYA ARTIKLAR
  // =====================
  mw.loader.using('mediawiki.api').then(function () {

    var api = new mw.Api();
    var newList = document.getElementById('new-pages');

    if (!newList) return;

    api.get({
      action: 'query',
      list: 'recentchanges',
      rcnamespace: 0,
      rctype: 'new',
      rclimit: 5
    }).then(function (data) {

      newList.innerHTML = '';

      data.query.recentchanges.forEach(function (page, i) {

        var li = document.createElement('li');

        var rank = document.createElement('span');
        rank.className = 'rank';
        rank.textContent = (i + 1);

        var link = document.createElement('a');
        link.href = mw.util.getUrl(page.title);
        link.textContent = page.title;

        li.appendChild(rank);
        li.appendChild(link);

        newList.appendChild(li);

      });

    }).catch(function () {
      newList.innerHTML = '<li>Kunde inte ladda nya artiklar</li>';
    });

  });

});