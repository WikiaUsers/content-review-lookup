populateAdministrationTable('en');

function populateAdministrationTable(lang){
  if ($('.administration').length === 0){
    return;
  }

  const validRoles = ['bot', 'bureaucrat', 'sysop', 'content-moderator', 'rollback', 'quick-answers-editor'];
  const langs = ['en', 'bg', 'ca', 'cs', 'de', 'eo', 'es', 'fr', 'it', 'ja', 'nl', 'pl', 'pt', 'ro', 'ru', 'sr', 'sv', 'uk', 'zh'];

  $.getJSON('/'+lang+'/api.php?action=listuserssearchuser&groups='+validRoles.join(',')+'&contributed=1&limit=100&order=ts_edit&sort=desc&offset=0&format=json', function(result){
    const now = new Date().getTime();

    for (var i = 0; i < result.listuserssearchuser.result_count; i++){
      if (result.listuserssearchuser[i]){
        const username = result.listuserssearchuser[i].username;
        const numberOfEdits = result.listuserssearchuser[i].edit_count;
        const lastEdit = result.listuserssearchuser[i].last_edit_date;
        const lastEditComp = lastEdit.split(/,* /);
        const lastEditDate = lastEdit ? new Date(lastEditComp[1]+' '+lastEditComp[2]+' '+lastEditComp[3]+' '+lastEditComp[0]+' UTC').getTime() : 0;

        const roles = validRoles.filter(function(role){
          return result.listuserssearchuser[i].groups.split(', ').indexOf(role) !== -1;
        });

        if (roles.length > 0){
          $('.administration').append('<tr><td><a href="/'+lang+'/wiki/User:'+username+'">'+username+'</a></td><td>'+roles.join(', ')+'</td><td>'+numberOfEdits+'</td><td><a href="/'+lang+'/wiki/Special:Contributions/'+username+'">'+lastEdit+'</a></td><td>'+lang+'</td><td class="status"></td></tr>');
        }

        if (now - lastEditDate > 157680000000){
          $('.status:last').addClass('inactive').html('Inactive');
        } else if (now - lastEditDate > 2592000000){
          $('.status:last').addClass('semi-active').html('Semi-active');
        } else {
          $('.status:last').addClass('active').html('Active');
        }
      }
    }

    if ($('.administration .placeholder').length !== 0){
      $('.administration .placeholder').remove();
    }

    if ((langs.indexOf(lang)+1) < langs.length){
      populateAdministrationTable(langs[langs.indexOf(lang)+1]);
    }
  });
}