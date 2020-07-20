if (mw.config.get('wgNamespaceNumber') !=== 1200 && wgCanonicalNamespace !== "Mur") {
    return false;
}
$('.WikiaArticle').prepend('<input type="button" value="Aide aux administrateurs" id="fh-wall-button">');
 
var founderHelpText= '\
<form method="" name="" class="WikiaForm"> \
    <fieldset> \
        <textarea id="fh-texte" width="auto">
            Salut ! \
 
            Je suis Hulothe, <a href="http://communaute.wikia.com/wiki/Aide:Administrateurs" title="Infos à propos des Assistants" target="_blank">Assistant francophone</a>. Récemment, nous faisons le tour des wikias pour voir si les administrateurs ont besoin d\'aide. \
 
            Si quoi que ce soit vous te à l\'esprit, n\'hésite pas à m\'en faire part (par exemple, la conception de modèle, les extensions, les tâches nécessitant un robot, etc...). Si c\'est faisable, je serai ravi de t\'y aider ! \
 
            Bonne jounée,\
        </textarea>
    </fieldset> \
</form>';
 
$('#fh-wall-button').click(function() {
    $.showCustomModal('User rights', founderHelpText, {
        id: 'form-main',
        width: 300,
        buttons: [{
          message: 'Publier',
          defaultButton: true,
          handler: function () {
            posterFhelp();   
          }	
        },{
          message: 'Tu / Vous',
          defaultButton: true,
          handler: function() {
            changerRegistre();
          }
        },{
          message: 'Cancel',
          defaultButton: true,
          handler: function() {
            $('#form-main').closeModal();
          }
        }]
    });
});
 
function posterFhelp() {
    var succès = "Message posté avec succès !";
    $.post(mw.util.wikiScript('wikia'), {
        controller   : 'WallExternal',
        method       : 'postNewMessage',
        pagenamespace: '1200',
        pagetitle    : $('.UserProfileMasthead .masthead-info h1').text(),
        messagetitle : 'Besoin d\'aide ?',
        body         : $('textarea#fh-texte').text() + '\n\n~~' + '~~',
        format       : 'json'
    });
    setTimeout((function(){
        location.reload();
    }), 2000);			
}
function changerRegistre() {
    var diretu = true;
    var letextedefh = $('textarea#fh-texte').text();
    if (diretu == true) {
      letextedefh.replace('te', 'vous').replace('site', 'sitez').replace('t\'y', 'vous y');
      diretu = false;
    } else {
        letextedefh.replace('vous', 'te').replace('sitez', 'site').replace('vous y', 't\'y');
    }
}