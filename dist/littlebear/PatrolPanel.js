$(function(){
  const rights = mw.config.get('wgUserGroups');
  const wrongRights =
    rights.indexOf('content-moderator') === -1 &&
    rights.indexOf('helper') === -1 &&
    rights.indexOf('staff') === -1 &&
    rights.indexOf('sysop') === -1 &&
    rights.indexOf('wiki-specialist') === -1;

  if (mw.config.get('wgNamespaceNumber') !== -1 || mw.config.get('wgTitle') !== 'PatrolPanel' || wrongRights){
    return;
  }

  document.title = 'Patrol panel | Little Bear Wiki | Fandom';
  $('#firstHeading').text('Patrol panel');

  const api = new mw.Api();

  function updateTable(){
    const lastUpdate = new Date().toString().slice(16, 24);
    const intro = '<p>This page lists up to five thousand <a target="_blank" rel="noreferrer noopener" class="text" href="https://community.fandom.com/wiki/Help:Recent_changes_patrol">unpatrolled</a> pages on the <cite>Little Bear Wiki</cite>. The table was last updated at '+lastUpdate+' (local time).</p>';

    api.get({
      action:'query',
      list:'recentchanges',
      rcprop:'title|user|sizes|parsedcomment|timestamp|ids',
      rcshow:'!patrolled',
      rclimit:'5000',
    }).done(function(data){
      const changes = data.query.recentchanges;
      const table = $('<table class="wikitable" style="width:100%;table-layout:fixed;word-break:break-word;"><th>Title</th><th>User</th><th>Summary</th><th>Timestamp</th></table>');

      changes.forEach(function(v){
        table.append($('<tr>')
          .append($('<td><a href="'+mw.util.getUrl(v.title)+'">'+mw.html.escape(v.title)+'</a> (<a href="'+mw.util.getUrl('Special:Diff/'+v.revid)+'">diff</a>)</td>'))
          .append($('<td><a href="'+mw.util.getUrl('User:'+v.user)+'">'+mw.html.escape(v.user)+'</a>'))
          .append($('<td>'+v.parsedcomment+'</td>'))
          .append($('<td>'+v.timestamp+'</td>'))
        );
      });

      const page = $('#mw-content-text');
      page.html(table);
      page.prepend(intro);
    });
  }

  updateTable();
  setInterval(updateTable, 180000);
});