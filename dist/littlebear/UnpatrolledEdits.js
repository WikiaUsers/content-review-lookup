$(function(){
  const rights = mw.config.get('wgUserGroups');
  const wrongRights =
    rights.indexOf('content-moderator') === -1 &&
    rights.indexOf('helper') === -1 &&
    rights.indexOf('staff') === -1 &&
    rights.indexOf('sysop') === -1 &&
    rights.indexOf('wiki-specialist') === -1;

  if (mw.config.get('wgNamespaceNumber') !== -1 || mw.config.get('wgTitle') !== 'BlankPage/UnpatrolledEdits' || wrongRights){
    return;
  }

  const api = new mw.Api();

  api.get({
    action:'query',
    list:'recentchanges',
    rcprop:'title|ids',
    rcshow:'!patrolled',
    rclimit:'5000',
  }).done(function(data){
    api.loadMessagesIfMissing(['Custom-UnpatrolledEdits-title', 'Custom-UnpatrolledEdits-summary', 'Specialpage-empty']).done(function(){
      document.title = mw.msg('Custom-UnpatrolledEdits-title')+' | Little Bear Wiki | Fandom';

      $('#firstHeading').html(mw.msg('Custom-UnpatrolledEdits-title'));
      $('#mw-content-text p').html(mw.msg('Custom-UnpatrolledEdits-summary'));

      const changes = data.query.recentchanges;

      if (changes.length === 0){
        $('#mw-content-text p').after(mw.msg('Specialpage-empty'));
        return;
      }

      const list = $('<ul>');

      changes.forEach(function(v){
        list.append($('<li><a href="'+mw.util.getUrl(v.title)+'">'+mw.html.escape(v.title)+'</a> (<a href="'+mw.util.getUrl('Special:Diff/'+v.revid)+'">diff</a>)</li>'));
      });

      $('#mw-content-text p').after(list);
    });
  });
});