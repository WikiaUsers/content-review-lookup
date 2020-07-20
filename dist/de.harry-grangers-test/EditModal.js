console.warn('User is in edit mode');
importArticle({
  type: "style",
  article: "MediaWiki:VisualEditor-Oasis.css"
});

/*********************************************
    *
    * From w:c:dev:MassCategorization/code.js
    *
    ***********************************************/

function openEditModal(title,callback) {
  var EditForm = $('<form />').attr({
    method: '',
    name: '',
    id: 'EditModal'
  }).addClass('WikiaForm').append($('<fieldset />')),
      delay = window.massCategorizationDelay || 1000;
  
  $.showCustomModal(title, EditForm, {
    id: 'form-settings',
    width: 500,
    buttons: [{  
      message: 'Cancel',
      handler: function() {
        $('#form-categorization').closeModal();
      }
    }, {
      id: 'save-button',
      message: 'Speichern',
      defaultButton: true,
      handler: callback
    }]
  });
  
  /*function save() {
      }*/
}

function addFormField(field) {
  console.log('arguments',arguments);
  text = '';
  var element, affinity, type, id, children, options;
  switch(field) {
    case 'label':
      element = 'label';
      affinity = arguments[3];
      text = arguments[1];
      break;
    case 'text inline':
      element = 'input';
      type = 'text';
      id = arguments[2];
      break;
    case 'number':
      element = 'input';
      type = 'number';
      id = arguments[2];
      break;
    case 'date':
      element = 'input';
      type = 'date';
      id = arguments[2];
      break;
    case 'select':
      element = 'select';
      id = arguments[2];
      children = arguments[4];
      break;
    case 'check one':
      element = 'input';
      type = 'radio';
      id = arguments[2];
      break;
    case 'check multi':
      element = 'select';
      element = 'input';
      type = 'checkbox';
      id = arguments[2];
      break;
    case 'textfield':
      element = 'textarea';
      id = arguments[2];
      break;
    case 'text':
      element = 'p';
      text = arguments[1];
      break;
    case 'break':
      element = 'br';
      break;
    case 'colorpicker':
      console.log('We have a colorpicker!');
      element = 'div';
      id = arguments[2];
      addClass = 'color-palette';
      children = arguments[4];
      break;
    case 'pagechecker':
      console.log('Let\'s look for a page!');
      element = 'div';
      id = arguments[2];
      addClass = 'page-exists';
      break;
    case 'upload':
      element = 'input';
      type = 'file';
      id = arguments[2];
      options = arguments[5];
      break;
    default:
      element = 'p';
      break;
  }
  attributes = {};
  console.log('attributes',typeof type, typeof affinity, typeof arguments[2], typeof id);
  if(typeof type !== 'undefined') {
    attributes.type = type;
  }
  if(typeof affinity !== 'undefined') {
    attributes['for'] = affinity;
  }
  if(typeof arguments[2] !== 'undefined') {
    attributes.name = arguments[2];
  }
  if(typeof id !== 'undefined') {
    attributes.id = arguments[2];
  }
  if(typeof addClass !== 'undefined') {
    attributes.class = addClass;
  }
  $('.WikiaForm#EditModal fieldset').append(
    $('<' + element + ' />').attr(attributes).text(text)  
  );
  if(field == 'select') {
      console.log('select options',children,id);
      for(c in children) {
          $('.WikiaForm#EditModal fieldset').find('select#' + id).append(
              $('<option />').val(children[c].option).text(children[c].text || children[c].option)
          );
      }
  }
  if(field == 'upload') {
      console.log('upload options',options,id);
      MIMETypes = {
          'image jpg': 'image/jpeg',
          'image jpeg': 'image/jpeg',
          'image png': 'image/png',
          'text': 'text/plain',
          'css': 'text/css',
          'js': 'text/javascript',
          'csv': 'text/comma-separated-values'
      }
      $('.WikiaForm#EditModal fieldset').find('input#' + id).attr('accept',MIMETypes[options.type]);
  }
  if(field == 'pagechecker') {
      $('.WikiaForm#EditModal fieldset').find('.page-exists').append(
          $('<input />').attr('type','text').attr({'id':id,'name':id}).on('input',function() {
              controls = $(this).siblings('span');
              controls.find('img').show();              
              controls.find('img').siblings('span').hide();
              if($(this).val()[$(this).val().length - 1] !== ':') {
                  $.getJSON('/api.php?action=query&titles=' + $(this).val() + '&format=json',function(data) {
                      _exists = !data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('missing');
                      controls.find('img').hide();
                      if(_exists) {
                          controls.find('.check').show();
                      }
                      else {
                          controls.find('.times').show();
                      }
                      console.log(_exists,$(this));
                  });
              }
              else {
                  controls.find('img').hide();
                  controls.find('.times').show();
              }
          }),
          $('<span />').append(
              $('<img />')
                 .attr('src','https://images.wikia.nocookie.net/__cb1471522080/common/skins/common/images/ajax.gif').hide(),
              $('<span />').addClass('check').html('&#10003;').css({'color':'green','font-size':'x-large'}).hide(),
              $('<span />').addClass('times').html('&times;').css({'color':'red','font-size':'x-large'}).hide()
          )
      );
  }
  if(field == 'colorpicker') {
      console.log('Let\'s do the magic!');
      console.log('colorpicker colors',children,attributes.children);
      $('.WikiaForm#EditModal fieldset').find('.color-palette#' + id).append(
          $('<ul />').addClass('color-choose'),
          $('<input />').attr('type','text').attr({'id':id,'name':id}).addClass('color-chosen background-color')
      );
      for(c in children) {
          $('.WikiaForm#EditModal fieldset').find('.color-palette#' + id + ' .color-choose').append(
              $('<li />').css('background-color',children[c]).click(function() {
	          $('.color-palette .color-chosen').val(rgb2hex($(this).css('background-color')));
              })
          );
      }

    //Thanks to Daniel Elliot, http://stackoverflow.com/a/1740716
    var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

    //Function to convert hex format to a rgb color
    function rgb2hex(rgb) {
     rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
     return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
      return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
     }
  }
}

function addFormFields() {
  for(i = 0; i < arguments[0].length; i++) {
    console.log('--argument',i,'begin--');
    console.log('argument',i,'options',arguments[0][i]);
    addFormField(typeof arguments[0][i].field !== 'undefined' ? arguments[0][i].field : null,typeof arguments[0][i].text !== 'undefined' ? arguments[0][i].text : null,typeof arguments[0][i].name !== 'undefined' ? arguments[0][i].name : null,typeof arguments[0][i].affinity !== 'undefined' ? arguments[0][i].affinity : null,typeof arguments[0][i].children !== 'undefined' ? arguments[0][i].children : null,typeof arguments[0][i].options !== 'undefined' ? arguments[0][i].options : null);
    console.log('--argument',i,'end--');
  }
  console.log(arguments[0].length + ' fields');
}

/*new mw.Api().get({
        action: 'templateparameters',
        prop: 'revisions',
        rvprop: 'content',
        titles: page //Vorlage:xy
    })
    .done(function(d) { });*/