var newElement = [
 '<section class="module">',
 '   <h1>Don\'t speak Old Church Slavonic?</h1>',
 '   <p>It\'s no problem! If you want to learn some of this language, click the link! ;)</p>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: transparent;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: rgba(250,250,250,.2);">',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '         <br clear="all"/>',
 '               <a style="float: left; margin-right: 20px;" href="http://www.utexas.edu/cola/centers/lrc/eieol/ocsol-BF-X.html" class="wikia-button">Click!</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);

// INACTIVE USER
InactiveUsers = { text: 'дѣꙗнии нє сътвор҄ии польꙃєватєл҄ь' }; 
importScriptPage('InactiveUsers/code.js', 'dev');