function populateAdministrationTable(lang){
  const validRoles = ['bot', 'bureaucrat', 'sysop', 'content-moderator', 'quick-answers-editor', 'rollback'];
  const langs = ['en', 'bg', 'ca', 'cs', 'de', 'eo', 'es', 'fr', 'it', 'ja', 'nl', 'pl', 'pt', 'ro', 'ru', 'sr', 'sv', 'uk', 'zh'];

  $.getJSON('/'+lang+'/api.php?action=listuserssearchuser&groups='+validRoles.join(',')+'&contributed=1&limit=100&order=ts_edit&sort=desc&offset=0&format=json', function(json){
    const now = new Date().getTime();

    for (var i = 0; i < json.listuserssearchuser.result_count; i++){
      const username = json.listuserssearchuser[i].username;
      const numberOfEdits = json.listuserssearchuser[i].edit_count;
      const lastEdit = json.listuserssearchuser[i].last_edit_date;
      const lastEditComp = lastEdit.split(/,* /);
      const lastEditDate = lastEdit ? new Date(lastEditComp[1]+' '+lastEditComp[2]+' '+lastEditComp[3]+' '+lastEditComp[0]+' UTC').getTime() : 0;

      const roles = validRoles.filter(function(role){
        return json.listuserssearchuser[i].groups.split(', ').indexOf(role) !== -1;
      });

      if (roles.length > 0){
        $('.administration').append('<tr><td><a href="/'+lang+'/wiki/User:'+username+'">'+username+'</a></td><td>'+roles.join(', ')+'</td><td>'+numberOfEdits+'</td><td><a href="/'+lang+'/wiki/Special:Contributions/'+username+'">'+lastEdit+'</a></td><td>'+lang+'</td><td class="status"></td></tr>');
      }

      if (now - lastEditDate > 31536000000){
        $('.status:last').addClass('inactive').html('Inactive');
      } else if (now - lastEditDate > 2592000000){
        $('.status:last').addClass('semi-active').html('Semi-active');
      } else {
        $('.status:last').addClass('active').html('Active');
      }
    }

    $('.administration .placeholder').remove();
    populateAdministrationTable(langs[langs.indexOf(lang)+1]);
  });
}

populateAdministrationTable('en');