//Request filling system using popups by Gguigui1, Hulothe, Wyz and Fubuki風吹
//ajax call for picture upload
function doApiCall(fileToUpload, fileName) {
  var lFileName = fileName;

  formdata = new FormData(); //see https://developer.mozilla.org/en-US/docs/Web/Guide/Using_FormData_Objects?redirectlocale=en-US&redirectslug=Web%2FAPI%2FFormData%2FUsing_FormData_Objects
  formdata.append('action', 'upload');
  formdata.append('filename', lFileName);
  formdata.append('token', mw.user.tokens.get( 'editToken' ) );
  formdata.append('file', fileToUpload);
  formdata.append('format', 'json');

  //as we now have created the data to send, we send it...
  $.ajax({ //http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
      url: mw.util.wikiScript( 'api' ), //url to api.php 
      contentType: false,
      processData: false,
      type:'POST',
      data: formdata, //the formdata object we created above
      dataType: 'json',
      async: false,
      success: function(data) {
//        console.log(data);
        if (data.upload.result == 'Warning') {
          if (data.upload.warnings.hasOwnProperty('duplicate')) {
             //if file is a duplicate, we use the name of the first existing file
             lFileName = data.upload.warnings.duplicate[0];

             alert('Un doublon a été trouvé, il sera utilisé.');
          } else if (data.upload.warnings.hasOwnProperty('exists')) {
             lFileName  = prompt('Une image porte déjà ce nom, merci d\'en choisir un autre', lFileName);
             if (lFileName != null) {
                lFileName = doApiCall(fileToUpload, lFileName);
             }
          }
        }
      },
      error: function(xhr,status, error) {
        console.log(error);
     }
  });

  return lFileName;
}
 
//magical function for handling any kind of request
function submit(type) {
  var name;
  var content;
  var message;
  var namespace;

  var un = mw.config.get('wgUserName');
 
  switch (type) {
 
   case 'interwikis':
 
     if(!$('#Name').val() || !$('#Names').val()) {
         alert('Vous devez remplir les champs obligatoires.');
         return false;
     }
 
     //namespace     
     namespace = 'Demande_interwiki';
 
     //content
     var lines = $('#Names').val().split('\n');
 
     content = '{{' + 'Demande' + '}}\n\n';
     for (i = 0; i < lines.length; i++) {
        var links = lines[i].split(' -> ');
  	    content = content + '{{LienInterwiki|' + links[0] + '|' + links[1] + '}}\n';
     }
 
     //adding comment if provided
     if ($('#Comments').val())
     {
       content = content + $('#Comments').val() + '\n';
     }

     //adding signature
     content = content + '~~' + '~~';
 
     //message
     message = 'Demande de liens interwiki postée avec succès.';
 
   break;
 
  case 'spotlights':

    var lien = $('#Link').val();
    if(lien.match(/http/g) || lien.match(/\//g)) {
        alert('Mauvais format de l\'url. Exemple de format attendu : fr.harrypotter');
    }
    if (!$('#Name').val() || !$('#Link').val() || !$('#Picture').val() || !$('#Comments').val()) {
       alert('Vous devez remplir les champs obligatoires.');
       return false;
    }
    //namespace
    namespace = 'Demande_spotlight';

    //picture
    var file = $('#Picture')[0].files[0];
    var fileName = doApiCall(file, file.name);

    //if user cancelled the picture upload we stop
    if (fileName == null) {
      return false;
    }
 
    //content
    content = '{{' + 'Demande' + '}}<br />\n' +
              '<!-- Veuillez saisir votre demande sous cette ligne. Veuillez signer votre demande avec quatre tildes. -->\n' +
              '[[Fichier:' + fileName + '|thumb|Image pour le spotlight|right|250px' + ']]\n' +
              '*Nom d\'utilisateur : ' + '\'\'\'' + un + '\'\'\'\n' +
              '*Nom du wiki : ' + '\'\'\'' + $('#Name').val() + '\'\'\'\n' +
              '*Lien du wiki : ' + '\'\'\'' + '[[w:c:' + $('#Link').val() + ']]\n' +
              '*Texte du spotlight : ' + '\'\'\'' + $('#Comments').val() + '\n' +
              '*Lien d\'autorisation (pour les non-administrateurs) : ' + '\'\'\'' + $('#Autorisation').val() + '\n' +
              'Merci d\'avance. ' + '~~' + '~~';
 
    //message
    message = 'Demande de spotlight postée avec succès.'; 
 
    break;
 
  case 'adoptions':
 
    var lien = $('#Link').val();
    if(lien.match(/http/g) || lien.match(/\//g)) {
        alert('Mauvais format de l\'url. Exemple de format attendu : fr.harrypotter ');
    }

    if (!$('#Name').val() || !$('#Link').val() || !$('#Number').val() || !$('#Time').val() || !$('#Last').val()) {
       alert('Vous devez remplir les champs obligatoires.');
       return false;
    }
 
    //namespace
    namespace = 'Demande_adoption';
 
    //content
    content = '{{' + 'Demande' + '}}<br />\n' +
              '<!-- Veuillez saisir votre demande sous cette ligne. Veuillez signer votre demande avec quatre tildes. -->\n' +
              '*Nom d\'utilisateur : ' + '\'\'\'' + un + '\'\'\'\n' +
              '*Nom du wiki : ' + '\'\'\'' + $('#Name').val() + '\'\'\'\n' +
              '*Lien du wiki : ' + '\'\'\'' + '[[w:c:' + $('#Link').val() + ']]\n' +
              '*Nombre de modifications sur le wiki : ' + '\'\'\'' + $('#Number').val() + '\'\'\'\n' +
              '*Modifie sur le wiki depuis : ' + '\'\'\'' + $('#Time').val() + '\'\'\'\n' + 
              '*' + '[[w:c:' + $('#Link').val() + ':Special:Listadmins' + '|' + 'Dernier administrateur actif' + ']]' + ' : ' + '\'\'\'' + $('#Last').val() + '\'\'\'\n';

    //adding comment if provided
    if ($('#Comments').val())
    {
      content = content + '*Informations complémentaires : ' + '\'\'\'' + $('#Comments').val() + '\'\'\'' + '\n';
    }

    //adding signature
    content = content + '~~' + '~~';
 
    //message
    message = 'Demande d\'adoption postée avec succès.'; 
 
    break;
  }
 
  //we send the request
  name = $('#Name').val();
  $.get(mw.util.wikiScript('api'), {
    action: 'query',
    titles: namespace + ':' + name,
    format: 'json'
  }, function(data) {
//    console.log(data.query.pages);
    if (!data.query.pages['-1']) {
      alert('La page demandée existe déjà, merci de changer de nom. Ajoutez « (2) » à la fin du nom de votre wiki.');
      return false;
    } else {
      
      $('#startButton').attr('disabled','disabled').addClass( 'ui-state-disabled' );
 
      $.post(mw.util.wikiScript( 'api' ), {
          format: 'json',
          action: 'edit',
          summary: 'Nouvelle demande',
          title: namespace + ':' + name,
          text: content,
          token: mw.user.tokens.get('editToken')
  	}, function( data ) {
          alert(message);
          $('#' + type).closeModal();
           window.location.href = wgServer + '/wiki/' + namespace + ':' + encodeURIComponent(name);
	});
     }
  });
}
 
//function to show the form to fill the request
function modal(title, form, type) {
  $.showCustomModal(title, form, {
    id: type,
    width: 500,
    buttons:
    [{
        id: 'startButton',
        message: 'Envoyer',
        defaultButton: true,
        handler: function () {
          submit(type);
        }
    },
    {
        message: 'Annuler',
        handler: function() {
            $('#' + type).closeModal();
        }
    }]
  });
}
 
//setting form to display for each button 
$('#interwiki').click(function() {
  if (wgUserName == null) {
    alert('Vous devez être connecté pour créer une demande de liens interwiki.');
    window.location.href = wgServer + '/wiki/Special:UserLogin';
    return false;
  }
 
  var popup_interwiki =
    '<form method="" name="" class="WikiaForm">' +
    '  <fieldset>' +
    '      <p style="padding:5px; border:1px solid grey;">' +
    'Pour faire une nouvelle demande, remplissez les champs ci-dessous. Les champs marqués d\'une astérisque (<span style="color:red">*</span>) sont obligatoires.<br/>Par example, pour lier <b>fr.hp.wikia.com</b> et <b>hp.wikia.com</b>, remplissez la zone de texte "Liens interwikis" avec &nbsp;&nbsp;<code>fr.hp -> hp</code>. <br/>Pour faire plusieurs demandes simultanément, écrivez une demande par ligne. Par exemple, pour lier <b>fr.hp.wikia.com</b> à <b>hp.wikia.com</b> et <b>de.hp.wikia.com</b>, écrivez : <br/><code>fr.hp -> hp</code><br /><code>fr.hp -> de.hp</code><br />Cela génèrera un lien facile à utiliser par n\'importe quel <a title="wikia:Staff" class="extiw" href="http://community.wikia.com/wiki/Staff">membre du staff</a> ou <a title="Aide:Assistants" href="/wiki/Aide:Assistants">Assistant</a> qui créera le lien entre les deux wikis très rapidement.<br></p><br /> '+
   '       <p><b><span style="color:red">*</span>Nom du wiki :</b></p> <input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Ex : Wiki Harry Potter"/>' +
   '       <p><b><span style="color:red">*</span>Liens interwikis :</b></p>' +
   '           <textarea style="width:500px; height:150px" id="Names" placeholder="Ex : fr.wiki -> es.wiki"></textarea>' +
   '       <p><b>Description / Commentaires :</b></p> <input type="text" style="height:20px; width:400px" id="Comments" placeholder="Ex : Merci d\'avance !"/>' +
   '   </fieldset>' +
   '</form>';
 
  modal('Demande liens interwiki', popup_interwiki, 'interwikis');
});
 
$('#spotlight').click(function() {
  if (wgUserName == null) {
    alert('Vous devez être connecté pour créer une demande de spotlight.');
    window.location.href = wgServer + '/wiki/Special:UserLogin';
    return false;
  }
 
  var popup_spotlight =
    '<form method="" name="" class="WikiaForm">' +
    '  <fieldset>' +
    '      <p style="padding:5px; border:1px solid grey;">' +
    'Pour faire une nouvelle demande, remplissez les champs ci-dessous. Les champs marqués d\'une astérisque (<span style="color:red">*</span>) sont obligatoires.</p><br />' +
    '     <p><b><span style="color:red">*</span>Nom du wiki :</b></p><input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Ex : Wiki Harry Potter"/>' +
    '     <p><b><span style="color:red">*</span>Url du wiki :</b></p> http://<input type="text" style="align:center;height:20px; width:300px" id="Link" placeholder="Ex : fr.hp"/>.wikia.com' +
    '     <p><b><span style="color:red">*</span>Image pour le spotlight (255x123px) :</b></p> <input type="file" style="height:23px; width:400px" id="Picture"/>' +
    '     <p><b><span style="color:red">*</span>Texte à afficher avec le spotlight (faire court) :</b></p> <input type="text" style="height:20px; width:400px" id="Comments" placeholder="Ex : Volez vers la victoire !"/>' +
    '     <p><b>Lien d\'autorisation des administrateurs si vous n\'êtes pas administrateur du wiki demandé :</b></p> <input type="text" style="height:20px; width:400px" id="Autorisation"/>' +
    '  </fieldset>' +
    '</form>';
 
  modal('Demande de spotlight', popup_spotlight, 'spotlights');
});
 
$('#adoption').click(function() {
  if (wgUserName == null) {
    alert('Vous devez être connecté pour créer une demande d\'adoption.');
    window.location.href = wgServer + '/wiki/Special:UserLogin';
    return false;
  }
 
  var popup_adoption =
    '<form method="" name="" class="WikiaForm">' +
    '  <fieldset>' +
    '      <p style="padding:5px; border:1px solid grey;">' +
    'Pour faire une nouvelle demande, remplissez les champs ci-dessous. Les champs marqués d\'une astérisque (<span style="color:red">*</span>) sont obligatoires.</p><br />' +
    '      <p><b><span style="color:red">*</span>Nom du wiki à adopter :</b></p><input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Ex : Wiki Harry Potter"/>' +
    '      <p><b><span style="color:red">*</span>Url du wiki à adopter :</b></p> http://<input type="text" style="align:center;height:20px; width:300px" id="Link" placeholder="Ex : fr.hp"/>.wikia.com' +
    '      <p><b><span style="color:red">*</span>Nombre de modifications sur le wiki :</b></p>' +
    '          <input type="text" maxlength="6" style="align:center;height:20px; width:150px" id="Number" placeholder="Ex : 120"/>' +
    '      <p><b><span style="color:red">*</span>Depuis combien de temps modifiez-vous sur le wiki :</b></p> <input type="text" style="height:20px; width:400px" id="Time" placeholder="Ex : 2 semaines"/>' +
    '      <p><b><span style="color:red">*</span>Dans les pages spéciales → Special:Liste_des_utilisateurs quelle est la dernière fois qu\'un administrateur a effectué des modifications et qui était-ce ?</b></p> <input type="text" style="height:20px; width:400px" id="Last" placeholder="Ex : Gguigui1 le 14 septembre 2013"/>' +
    '<p><b>Informations complémentaires :</b></p> <input type="text" style="height:20px; width:400px" id="Comments"/>' +
    '  </fieldset>' +
    '</form>';
 
  modal('Adoption de wiki', popup_adoption, 'adoptions');
});