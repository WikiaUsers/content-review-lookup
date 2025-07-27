mw.loader.using(['mediawiki.api'], function () {
  var container = document.getElementById('recent-changes-box');
  if (!container) return;

  new mw.Api().get({
    action: 'query',
    list: 'recentchanges',
    rcprop: 'title|timestamp|user|comment',
    rclimit: 5,
    format: 'json'
  }).then(function (data) {
    var changes = data.query.recentchanges;
    var html = '<ul class="rcb-list">';
    changes.forEach(function (change) {
      html += '<li>';
      html += '<b><a href="/wiki/' + encodeURIComponent(change.title) + '">' + change.title + '</a></b>';
      html += ' by <a href="/wiki/User:' + encodeURIComponent(change.user) + '">' + change.user + '</a>';
      if (change.comment) html += ' (<i>' + change.comment + '</i>)';
      html += '</li>';
    });
    html += '</ul>';
    container.innerHTML = html;
  });
});