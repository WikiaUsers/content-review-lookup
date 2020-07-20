/* 
* Mass Rename
* @description Rename pages quickly.
* @author Ozuzanna
*/

;(function($, mw) {

var FormHTML = '\
<form method="" name="" class="WikiaForm "> \
    <fieldset> \
        <p>Put the name of the page you want to rename, then the new name afterwards <b>with a space in between</b> on each separate line.</p> \
        <p>For page names with spaces, use underscores instead of spaces.</p> \
            <label for="redirect-check">Leave a redirect behind? <input type="checkbox" id="redirect-check" /></label> \
            <textarea style="height: 20em; width: 80%;" id="text-rename"/> \
    </fieldset> \
    <div id="text-error-output" style="height:10em; width: 80%; margin: 5px auto 0px auto; color: #000; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll">Any errors encountered will appear below<br/></div> \
</form>',
delay = window.massRenameDelay || 1000,
moveSummary = window.massRenameSummary || 'automatic';

//Support for Monobook
if (mw.config.get('skin') === 'monobook') {
  mw.util.addPortletLink('p-tb', '#', 'Mass Rename', 't-mr');
} 
else if ($('#my-tools-menu').length) {
  $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-mr">Mass Rename</a></li>');
}

$('#t-mr').click(function() {
    $.showCustomModal('Mass Rename', FormHTML, {
        id: 'form-rename',
        width: 500,
        buttons: [{
            id: 'start-button',
            message: 'Initiate',
            defaultButton: true,
            handler: function () {
              init();    
            }
        }, {
            message: 'Cancel',
            handler: function() {
              $('#form-rename').closeModal();
            }
        }]
    });
});

function init() {
  var txt = document.getElementById('text-rename'),
  pages = txt.value.split('\n'),	
  page = pages[0];
  
  document.getElementById('start-button').setAttribute('disabled','disabled');
	
  if (!page) {
    document.getElementById('start-button').removeAttribute('disabled');
    $.showCustomModal('Finished!', 'Nothing left to do, or next line is blank.', {
       id: 'form-complete',
       width: 200,
       buttons: [{
          message: 'Close',
          defaultButton: true,
          handler: function() {
            $('#form-complete').closeModal();
          }
       }]
    });
  } 
  else {
    rename(page);  
  }
  pages = pages.slice(1,pages.length);
  txt.value = pages.join('\n');
}

function rename(nameString) {
  if (nameString.split(" ").length != 2) {
    $('#text-error-output').append('The line \"'+nameString+'\" is invalid input!<br/>');
  }
  else {
    var oldName = nameString.split(" ")[0],
    newName = nameString.split(" ")[1],
    config = {
      action: 'move',
      from: oldName.replace("_", " "),
      to: newName.replace("_", " "),
      noredirect: '',
      reason: moveSummary,
      bot: true,
      token: mw.user.tokens.get('editToken')
    };
  
    if (document.getElementById('redirect-check').checked)
      delete config.noredirect; 

    (new mw.Api()).post(config)
    .done(function(d) {
      if (!d.error) {
        console.log('Successfully renamed '+oldName+' to '+newName+'!');
      }
      else {
        console.log('Failed to rename '+oldName+' to '+newName+': '+d.error.code);
        $('#text-error-output').append('Failed to rename '+oldName+' to '+newName+': '+d.error.code+'<br/>');
      }
    })
    .fail(function() {
      console.log('Failed to rename '+oldName+' to '+newName+'!');
      $('#text-error-output').append('Failed to rename '+oldName+' to '+newName+'!<br/>');
    });
  }
  setTimeout(init,delay);
}

}) (this.jQuery, this.mediaWiki);