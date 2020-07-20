/* Any JavaScript here will be loaded for all users on every page load. */
// 12:24, July 31, 2013 (UTC)
// @Original Author: UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)
// @Modified By: Unatratnag (http://imagecomics.wikia.com/wiki/User:Unatratnag)
// <source lang = javascript>
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
     $(function ($) {
                "use strict";
          if (!(/(?:^\?|&)wpForReUpload=(?:[^0&]|0[^&])/).test(window.location.search)) {
               $('#mw-htmlform-description').css('width', '100%');

               // Bind upload button to verify function
               $('#mw-upload-form').on('submit', verifySummary);
               var rows = $('#mw-htmlform-description').find('tr');
               $('tr.mw-htmlform-field-HTMLTextAreaField').hide();
               $('tr.mw-htmlform-field-HTMLTextAreaField').next().detach();

               rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Source:</td><td class="mw-input"><textarea id="sourceBox" placeholder="What issue or episode is this from? Ex. Invincible Vol 1 67." required="true" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
               $('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
               var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
               tbody1.append('<tr><td class="mw-label" style="width: 125px;">Description:</td><td class="mw-input"><textarea id="descriptionBox" placeholder="Describe what is happening and why it\'s important." required="true" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');

               // Add new rows
               var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Universe:</td><td class="mw-input"><textarea id="universeBox" placeholder="[OPTIONAL] Universe of this image. Ex: Invincible, Spawn etc." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject 1:</td><td class="mw-input"><textarea id="subject1Box" placeholder="[OPTIONAL] Subject in media. Ex: Albert Simmons, Invincible (Mark Grayson)." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject 2:</td><td class="mw-input"><textarea id="subject2Box" placeholder="[OPTIONAL] Subject in media. Ex: Albert Simmons, Invincible (Mark Grayson). " cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject 3:</td><td class="mw-input"><textarea id="subject3Box" placeholder="[OPTIONAL] Subject in media. Ex: Albert Simmons, Invincible (Mark Grayson)." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject 4:</td><td class="mw-input"><textarea id="subject4Box" placeholder="[OPTIONAL] Subject in media. Ex: Albert Simmons, Invincible (Mark Grayson). " cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>'); 

               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Cover Artist:</td><td class="mw-input"><textarea id="coverArtist1Box" placeholder="[IF APPLICABLE] Cover Artist." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Penciler:</td><td class="mw-input"><textarea id="penciler1Box" placeholder="[IF APPLICABLE] Penciler" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Inker:</td><td class="mw-input"><textarea id="inker1Box" placeholder="[IF APPLICABLE] Inker" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Colourist:</td><td class="mw-input"><textarea id="colourist1Box" placeholder="[IF APPLICABLE] Colourist. " cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>'); 
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Letterer:</td><td class="mw-input"><textarea id="letterer1Box" placeholder="[IF APPLICABLE] Letterer. " cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>'); 
               tbody2.append('<tr><td class="mw-label" style="width: 125px;">Other Information:</td><td class="mw-input"><textarea id="otherinfoBox" placeholder="[OPTIONAL] Any other information about the image." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
          }


          function verifySummary() {

               if (!$('#wpLicense').val()) {
                    alert('Licensing must be completed.');
                    return false;
               }else if ((/^[0-9]+\.(png|gif|jpg|jpeg|ico|pdf|svg)$/).test($('#wpDestFile').val()) || $('#wpDestFile').val().length < 8) {
                    alert('Enter a more descriptive filename.');
                    return false;
               }else if (!$('#sourceBox').val()) {
                    alert('Source must be entered');
                    return false;
               }
               var strBuilder = '\r\n';
               strBuilder += '{{Image Database:Image Template\r\n'; 
               strBuilder += '| License                 =  Fair Use\r\n';
               strBuilder += '| Publisher               =  Image\r\n'; 
               strBuilder += '| ImageType               = \r\n';
               strBuilder += '|Description=' + $('#descriptionBox').val() + '\r\n';
               strBuilder += '|Issue=' + $('#sourceBox').val() + '\r\n';
               strBuilder += '|Universe=' + $('#universeBox').val() + '\r\n';

               strBuilder += '|Subject1=' + $('#subject1Box').val() + '\r\n';
               strBuilder += '|Subject2=' + $('#subject2Box').val() + '\r\n';
               strBuilder += '|Subject3=' + $('#subject3Box').val() + '\r\n';
               strBuilder += '|Subject4=' + $('#subject4Box').val() + '\r\n';

               strBuilder += '|CoverArtist1=' + $('#coverArtist1Box').val() + '\r\n';
               strBuilder += '|Penciler1=' + $('#penciler1Box').val() + '\r\n';
               strBuilder += '|Inker1=' + $('#inker1Box').val() + '\r\n';
               strBuilder += '|Colourist1=' + $('#colourist1Box').val() + '\r\n';
               strBuilder += '|Letterer1=' + $('#letterer1Box').val() + '\r\n';

               strBuilder += '|Other Information=' + $('#otherinfoBox').val() + '\r\n';
               strBuilder += '}}';
               $('#wpUploadDescription').val(strBuilder);
               return true;
          }
     });
}