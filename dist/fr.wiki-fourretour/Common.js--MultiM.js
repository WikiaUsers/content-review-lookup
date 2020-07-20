/******************************
 * Auteur : Think D. Solucer **
*******************************/
;(function($, mw) {
 
 if ( $(".wikia-msg-snd-multi").length )
	return;
	
  var li_envois='<li class="wikia-msg-snd-multi" style="width:80%">Envoyer multi messages</li>';
  var message_actuel =
                        {
                        "titre_section":'Titre',
                        "corps":'',
                        "hash":'Hash',
                        };
  $(".WikiaMenuElement").append(li_envois);
  
  var FormHTML = '\
  <form method="" name="" class="WikiaForm "> \
    <fieldset> \
    <p>Titre de la section: \
		<input type="text" id="titre-multi-snd" value="" /> \
		</p> \
		<br /> \
		<p>Votre message: \
		<textarea style="height: 20em; width: 60%;" id="text-multi-snd"/>\
        <br/> \
      </p> \
      <p>Mettez les noms des personnes à qui envoyer votre message séparés par des virgules.</p>. \
        <textarea style="height: 20em; width: 60%;" id="perso-multi-snd"/> \
	<div id="text-error-output" style="height:10em; width: 80%; margin: 5px auto 0px auto; color: #000; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll">Toute erreur produite sera affichée ici.<br/></div> \
    </fieldset> \
  </form>',
  token = mw.user.tokens.get('editToken'),
  delay = window.batchDeleteDelay || 1000;
  
 
  $('.wikia-msg-snd-multi').click(function () {
    $.showCustomModal('Ajax Multi Messages', FormHTML, {
      id: 'form-multi-snd',
      width: 500,
      buttons: [{  
          message: 'Annuler',
          handler: function() {
            $('#form-multi-snd').closeModal();
          }
      }, {
          message: 'Ajouter un groupe',
          defaultButton: true,
          handler: function() {
            ajoutGroupe();
          }
      }, {
          id: 'startButton',
          message: 'Envoyer le message',
          defaultButton: true,
          handler: function () {
            init(); 
          }
      }]
    });
  });
 
    function init() {
      var txt = document.getElementById('perso-multi-snd'),
      multi_message = document.getElementById('text-multi-snd').value,
      personnes = txt.value.split(','),	
      personne_actuelle = personnes[0];
 
      if (!multi_message) {
        alert('Merci de mettre un message à envoyer !');
        return;
      }
 
      document.getElementById('startButton').setAttribute('disabled','disabled');
 
      if (!personne_actuelle) {
        document.getElementById('startButton').removeAttribute("disabled");
        $.showCustomModal('Fini !', 'J\'ai envoyé à tout le monde normalement.', {
           id: 'multi-snd-complete',
           width: 200,
           buttons: [{
              message: 'Fermer',
              defaultButton: true,
              handler: function() {
                 $('#multi-snd-complete').closeModal();
              }
           }]
        });
      } 
      else {
              poster_message(personne_actuelle,multi_message);  
      }
      personnes = personnes.slice(1,personnes.length);
      txt.value = personnes.join(',');
   }
 
    function ajoutGroupe() {
      var groupe = prompt('Merci d\'entrer le nom du groupe (en miniscule !)');
      new mw.Api().get({
      action: 'query',
      list: 'membresGroupe',
      cmtitle: "Groupe:"+groupe,
      cmlimit: 500
      })
      .done(function(d) {
        if (!d.error) {
          var data = d.query;
 
        for (var i in data.membresGroupe) {
            $('#perso-multi-snd').append(data.membresGroupe[i].title+',');
          }
        }
        else {
          $('#text-error-output').append('Echec lors du chargement des membres du groupe des '+ groupe +' : '+ d.error.code +'<br/>');
        }
      })
      .fail(function() {
        $('#text-error-output').append('Echec lors du chargements  du groupe des '+ groupe +'!<br/>');
      });
    } 
    function poster_message(personne,msg) {
      new mw.Api().post({
      format      : 'json',
      action      : 'edit',
      title       : personne,
      section     : 'new',
      sectiontitle: msg.titre_section,
      text        : msg.corps + '\n\n~~' + '~',
      token       : token
      })
      .done(function(d) { 
        if (!d.error) {
          console.log('Envoi du message à '+personne+' réussi !');
        } 
	else {
          console.log('Echec d\'envoi du message à  '+personne+': '+ d.error.code);
          $('#text-error-output').append('Echec d\'envoi du message à  '+personne+': '+d.error.code+'<br/>');
        }
      })
      .fail(function() {
        console.log('Echec d\'envoi du message à  '+personne+': unknownerror');
        $('#text-error-output').append('Echec d\'envoi du message à  '+personne+': unknownerror<br/>');
      });
      setTimeout(init,delay);
    }
}) (this.jQuery, this.mediaWiki);