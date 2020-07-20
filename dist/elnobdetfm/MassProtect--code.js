//<syntaxhighlight lang="javascript">

;(function($, mw) {

if ($('#t-mp').length)
  return;

var ug = mw.config.get("wgUserGroups");
if (ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') > -4) {

  var FormHTML = '\
  <form method="" name="" class="WikiaForm "> \
    <fieldset> \
      <p>Tipo de protección: \
        <select id="protect-type"> \
          <option value="edit=sysop">Sólo administradores (editar)</option> \
	  <option value="move=sysop">Sólo administradores (mover)</option> \
	  <option value="edit=sysop|move=sysop">Sólo administradores (editar y mover)</option> \
	  <option value="edit=sysop|move=sysop|upload=sysop">Sólo administradores (editar, mover y subir)</option> \
	  <option value="create=sysop">Sólo administradores (crear)</option> \
          <option value="edit=autoconfirmed">Sólo usuarios autoconfirmados (editar)</option> \
	  <option value="move=autoconfirmed">Sólo usuarios autoconfirmados (mover)</option> \
	  <option value="edit=autoconfirmed|move=autoconfirmed">Sólo usuarios autoconfirmados (editar y mover)</option> \
	  <option value="edit=autoconfirmed|move=autoconfirmed|upload=autoconfirmed">Sólo usuarios autoconfirmados (editar, mover y subir)</option> \
	  <option value="create=autoconfirmed">Sólo usuarios autoconfirmados (crear)</option> \
          <option value="edit=all|move=all">Todos los usuarios (editar y mover)</option> \
          <option value="edit=all|move=all|upload=all">Todos los usuarios (editar, mover y subir)</option> \
          <option value="create=all">Todos los usuarios (crear)</option> \
        </select> \
      </p> \
      <p>Expiry of protection: \
        <input type="text" id="protect-expiry" value="" placeholder="indefinite" /> \
      </p> \
      <p>Reason of protection: \
        <input type="text" id="protect-reason" value="" /> \
      </p> \
      <p>Put the name of each page you want to protect on a <b>separate line</b></p>. \
        <textarea style="height: 20em; width: 80%;" id="text-mass-protect"/> \
	<div id="text-error-output" style="height:10em; width: 80%; margin: 5px auto 0px auto; color: #000; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll">Any errors encountered will appear below<br/></div> \
    </fieldset> \
  </form>',
  token = mw.user.tokens.get('editToken'),
  Api = new mw.Api(),
  delay = window.massProtectDelay || 1000;

  //Support for Monobook
  if (mw.config.get('skin') === 'monobook') {
    mw.util.addPortletLink('p-tb', '#', 'Mass Protect', 't-mp');
  } 
  else {
    $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-mp">Mass Protect</a></li>');
  }

  $('#t-mp').click(function () {
    $.showCustomModal('Mass Protect', FormHTML, {
      id: 'form-mass-protect',
      width: 500,
      buttons: [{  
          message: 'Cancel',
          handler: function() {
            $('#form-mass-protect').closeModal();
          }
      }, {
          message: 'Add category contents',
          defaultButton: true,
          handler: function() {
            addCategoryContents();
          }
      }, {
          id: 'startButton',
          message: 'Initiate',
          defaultButton: true,
          handler: function () {
            init(); 
          }
      }]
    });
  });

    function init() {
      var txt = document.getElementById('text-mass-protect'),
      pages = txt.value.split('\n'),	
      currentPage = pages[0];

      document.getElementById('startButton').setAttribute('disabled','disabled');

      if (!currentPage) {
        document.getElementById('startButton').removeAttribute("disabled");
        $.showCustomModal('Finished!', 'Nothing left to do, or next line is blank.', {
           id: 'mass-protect-complete',
           width: 200,
           buttons: [{
              message: 'Close',
              defaultButton: true,
              handler: function() {
                 $('#mass-protect-complete').closeModal();
              }
           }]
        });
      } 
      else {
        process(currentPage);  
      }
      pages = pages.slice(1,pages.length);
      txt.value = pages.join('\n');
   }

    function addCategoryContents() {
      var category = prompt('Please enter the category name (no category prefix):');
      Api.get({
      action: 'query',
      list: 'categorymembers',
      cmtitle: 'Category:' + category,
      cmlimit: 5000
      })
      .done(function(d) {
        if (!d.error) {
          var data = d.query;

	  for (var i in data.categorymembers) {
            $('#text-mass-protect').append(data.categorymembers[i].title+'\n');
          }
        }
        else {
          $('#text-error-output').append('Failed to get contents of '+ category +' : '+ d.error.code +'<br/>');
        }
      })
      .fail(function() {
        $('#text-error-output').append('Failed to get contents of '+ category +'!<br/>');
      });
    } 
	
    function process(page) {
      Api.post({
	action: 'protect',
        expiry: $('#protect-expiry').val() || $('#protect-expiry').attr('placeholder'),
        protections: $('#protect-type').val(),
        watchlist: 'nochange',
        title: page,
        reason: $('#protect-reason').val(),
        token: token
      })
      .done(function(d) { 
        if (!d.error) {
          console.log('Protection of '+page+' successful!');
        } 
        else {
          console.log('Failed to protect '+page+': '+ d.error.code);
	      $('#text-error-output').append('Failed to protect '+page+': '+d.error.code+'<br/>');
        }
      })
      .fail(function() {
        console.log('Failed to protect ' + page);
	    $('#text-error-output').append('Failed to protect ' + page + '<br/>');
      });
      setTimeout(init,delay);
    }

  }
}) (this.jQuery, this.mediaWiki);
//</syntaxhighlight>