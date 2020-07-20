/* Add IRC in siderail */

// We create the string from a list of strings and join it.
// This makes it easier for read the code and edit it. Just
// remember to close the '' and add a , for all lines EXCEPT
// the last line. - Albugineous

// Change the px value in line
// '               <a style="float: left; margin-right: 20px;" 
// to the value you want.

var newElement = [
 '<section class="module">',
 '   <h1>IRC Channel</h1>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: #e4e4d2;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: #e4e4d2;">',
 '         <tr>',
 '            <td style="text-align: center;">',
 '               <img src="https://images.wikia.nocookie.net/__cb20130711210043/hvetshran/images/thumb/1/16/HVChat.png/80px-HVChat.png"/>',
 '            </td>',
 '         </tr>',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '               <a style="float: left; margin-right: 20px;" href="http://webchat.xertion.org/?channels=Hvetshran" class="wikia-button">Join the chat</a>',
 '               <a style="float: left;" href="http://hvetshran.wikia.com/wiki/Hvetshran_Wiki:Policy#Chat" class="wikia-button">Chat rules</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');

$('#WikiaRail').append(newElement);