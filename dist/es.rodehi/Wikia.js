
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
 '   <h2 style="font-size:20px">Chat de Traslado</h2>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: transparent;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: rgba(250,250,250,.2);">',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '               <a style="float: left; margin-right: 20px;" href="http://steven-universe-serie-fanon.wikia.com/wiki/Special:Chat" class="wikia-button">Iniciar el Chat</a>',
 '               <a style="float: left;" href="http://es.playrols.wikia.com/wiki/Special:Chat" class="wikia-button">Playrols Chat</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);
 
if ($("#WikiaArticle div").hasClass("templateheader")) {
var languageCode = $("#content_language").text();
$("#ORM-1").html(languageCode);
}
 
 
importArticles({type:'script', articles:['u:dev:NullEditButton/code.js']});