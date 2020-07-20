// Test Script
$('.ChatHeader .public.wordmark').append('<a id="theme-changer" style="position: relative; left:1033px; top: -5px; z-index:40; padding: 6px; opacity: 0.8; background: transparent;" href="javascript:themeCustomization();"><img src="https://images.wikia.nocookie.net/__cb20140704062815/ahriswriting/images/8/8b/Options.png" alt="Theme Changer" title="Theme Changer" /></a>');

$('head').append('<style type="text/css">.bold { font-weight: bold !important; }</style>');
$('head').append('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Ubuntu" type="text/css" />');

function themeCustomization(){
    $.showCustomModal('Theme settings (experimental)', 
         '<form class="WikiaForm" method="" name="">' + 
             '<fieldset>' + 
                 '<table style="overflow-y: auto;" class="test-table">' +
                     '<tr>' +
                         '<td>' +
                             '<label for="background" class="bold label">Background: </label>' +
                             '<input id="background" placeholder="Background" name="background" />' +
                        '</td>' +
                        '<td>' +
                             '<label for="color" class="bold label">Font colour: </label>' +
                             '<input id="color" placeholder="Color" name="colour" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>' +
                             '<label for="font-family" class="bold label">Font family: </label>' +
                             '<select id="font-family" name="font-family">' +
                                 '<option value="Agency FB" label="Agency FB">Agency FB, sans-serif</option>' +
                                 '<option value="Arial" selected>Arial</option>' +
                                 '<option value="Calibri">Calibri</option>' +
                                 '<option value="Courier New">Courier New</option>' +
                                 '<option value="Georgia">Georgia</option>' +
                                 '<option value="Lucida Console">Lucida Console</option>' +
                                 '<option value="Palatino Linotype">Palatino Linotype</option>' +
                                 '<option value="Segoe UI">Segoe UI</option>' +
                                 '<option value="Tahoma">Tahoma</option>' +
                                 '<option value="Ubuntu">Ubuntu</option>' +
                                 '<option value="Verdana">Verdana</option>' +
                             '</select>' +
                        '</td>' +
                        '<td>' +
                             '<label for="self-post" class="bold label">Self post: </label>' +
                             '<input id="self-post" placeholder="Self Post" name="self-post" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>' +
                             '<span class="bold">Background Repeat: </span><br />' +
                             '<label for="no-repeat" class="label">None</label>' +
                             '<input id="no-repeat" type="radio" value="no-repeat" title="None" name="bg-repeat" />' +
                        '</td>' +
                        '<td>' +
                             '<label for="bg-repeat" class="label">Repeat</label>' +
                             '<input id="bg-repeat" type="radio" value="repeat" title="Repeat" name="bg-repeat" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>' +
                             '<span class="bold">Box Shadow: </span><br />' +
                             '<label for="b-shadow-h" class="label" title="Horizontal Shadow">H-Shadow</label>' +
                             '<input id="b-shadow-h" type="text" placeholder="0" size="5" />' +
                        '</td>' +
                        '<td>' +
                             '<label for="b-shadow-v" class="label" title="Vertical Shadow">V-Shadow</label>' +
                             '<input id="b-shadow-v" type="text" placeholder="0" size="5" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>' +
                             '<label for="blur-radius" class="label" title="Blur Radius">Blur Radius</label>' +
                             '<input id="blur-radius" type="text" placeholder="0" size="5" />' +
                        '</td>' +
                        '<td>' +
                             '<label for="spread-radius" class="label" title="Blur Radius">Spread Radius</label>' +
                             '<input id="spread-radius" type="text" placeholder="0" size="5" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>' +
                             '<label for="shadow-color" class="label" title="Blur Radius">Shadow Color</label>' +
                             '<input id="shadow-color" type="text" placeholder="Color" />' +
                        '</td>' +
                        '<td>' +
                             '<label for="inset-shadow" class="label" title="Inset Shadow">Inset Shadow</label>' +
                             '<input id="inset-shadow" type="checkbox" value="inset" title="Check Inset" />' +
                        '</td>' +
                    '</tr>' +
                 '</table>' +
             '</fieldset>' +
         '</form>',
              {
                  width: 650,
                  id: 'customizationModal',
                  buttons: [
                      {
                         id: 'cancel',
                         message: 'Cancel',
                         handler: function(){
                             cancelCustomization();
                         }
                      },
                      {
                         id: 'submit',
                         defaultButton: true,
                         message: 'Submit',
                         handler: function(){
                             submitCustomization();
                             setInterval(cancelCustomization(), 750);
                         }
                      }
                  ]
              }
    );

    function cancelCustomization(){
        var dialog = $('#customizationModal');
        dialog.closeModal();
    }


    function submitCustomization(){
        var styling = 
             'body {' + 
                 'background: ' + $("#background").val() + '; ' +
                 'background-repeat: ' + $("input[name=bg-repeat]:checked").val() + '; ' +
                 'font-family: ' + $("#font-family option:selected").text() + '; ' +
                 'color: ' + $("#color").val() + '; ' +
             '}' +

             '.ChatHeader,' +
             '.ChatWindow #WikiaPage {' +
                 'box-shadow: ' + $("#inset-shadow:checked").val() + ' ' + $("#b-shadow-h").val() + ' ' + $("#b-shadow-v").val() + ' ' + $("#blur-radius").val() + ' ' + $("#spread-radius").val() + '; ' +
             '}' +

             '.Chat .you {' +
                 'background: ' + $("#self-post").val() + ' !important; ' +
             '}';
        $('head').append('<style type="text/css">' + styling + '</style>');
    }
}