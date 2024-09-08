/******************************************************************************
 * Auteur : Think D. Solucer                                                 **
 * Idée : Hommy <3<3                                                         **                                                           **               **
 * Script permettant aux utilisateurs de prévenir rapidement le staff.       **
 * Licence : CopyWrong @CopyWisely
*******************************************************************************/
console.log('fofo v5 OK');

;(function($, mw) {
 if ( $(".ope-prevent-snd").length )
	return;

function afficherResultat(str,str2)
  {
    document.getElementById('startButton').removeAttribute("disabled");
    $.showCustomModal(str, str2, {
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

function init() 
  {
      var 
          message   = document.getElementById('form-ope-prevent-snd').value,
          titre     = document.getElementById('titre-ope-prevent-snd').value;
          
      if (!message) {
        alert('Merci de mettre un message à envoyer !');
        return;
      }
      document.getElementById('startButton').setAttribute('disabled','disabled');
          /*new mw.Api().get({
          action: 'query',
          list: 'allusers',
          augroup: groupe,
          aulocal:0,
          aulimit:3
          })
          .done(function(d) {
            if (!d.error)
              {
                var valeur_alea=Math.floor(Math.random() * 2);
                poster_message(d.query.allusers[valeur_alea].name,message, titre);  
            }
            })
          .fail(function() {
            console.log('Echec lors du chargement du groupe des '+ groupe +'!<br/>');
          });*/
        
        poster_message('Superyastiquereuros',message, titre);  
  }
function poster_message(personne,msg,titre) 
  {
        message_complet='<p>Lien : ' + '[[' + wgPageName + '|la page en question]]' + '</p><br />' + msg;
        
        new mw.Api().post({
        format      : 'json',
        action      : 'edit',
        title       : 'Utilisateur:Superyastiquereuros/Prevent',
        section     : 'new',
        sectiontitle: titre,
        summary     : titre,
        text        : message_complet,
        token       : token
        })
        .done(function(d) { 
      if (!d.error)
          console.log('Envoi du message à '+personne+' réussi !');
      else
          console.log('Echec d\'envoi du message à  '+personne+': '+ d.error.code);
        })
        .fail(function() {
          console.log('Echec d\'envoi du message à  '+personne+': unknownerror');
        });
  }
function afficherCSS(cssArticle)
  {
    importArticle({
              type: "style",
              article: cssArticle
          });
  }
function afficher_popup() 
{
  $.showCustomModal(prevenirQUI, FormHTML, {
    id: 'popup-ope-prevent-snd',
    width: 600,
    buttons: [{  
        message: 'Annuler',
        handler: function() {
          $('#popup-ope-prevent-snd').closeModal();
        }
    }, {
        id: 'startButton',
        message: 'Envoyer le message',
        defaultButton: true,
        handler: function () {
          init();
          afficherResultat('Merci !', 'Votre message a bien été envoyé.');
          $('#popup-ope-prevent-snd').closeModal();
        }
    }]
  });
}

  /*jshint multistr:true */  
FormHTML    ='\
  <form method="" name="" class="WikiaForm" style="top:0"> \
    <fieldset> \
    <p>Objet du message: \
    <input type="text" id="titre-ope-prevent-snd" value="" /> \
    </p> \
    <br /> \
    <p>Votre message (<b>signé avec 4 ~</b>): \
    <br /> \
    <textarea style="height: 20em; width: 60%;" id="form-ope-prevent-snd"/> \
    </p> \
    </fieldset> \
  </form>';
token       = mw.user.tokens.get('editToken');
namespace   = wgTransactionContext.namespace;
  
    // Début code
    {
        switch(namespace)
        {
          case 1201:
            groupe      ="threadmoderator";
            li_envois   ='<a href="#" class="ope-prevent-snd wikia-button secondary">Prévenir un Garde</a>';
            selecteur   ='.Wall .speech-bubble-message .buttons ul';
            prevenirQUI ='Prévenir un Garde';
            break;
          case 0:
            groupe      ="rollback";
            li_envois   ='<a href="#" class="ope-prevent-snd wikia-button secondary">Prévenir un Garde</a>';
            selecteur   ='ul.WikiaMenuElement';
            prevenirQUI ='Prévenir un Garde';
            break;
          default:
            return false;
        }
          $(selecteur).prepend(li_envois);
          $('.ope-prevent-snd').click(function () {
            numeroFil=$( this ).closest( "li ").attr('id');
            afficher_popup();
          });
    }
    // Fin code
}) (this.jQuery, this.mediaWiki);