//<nowiki>
var QICSigs =
{
 old_onsubmit : null,
 form: null,
 month: 
  [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'],

 convertSignatues : function()
 {
  var now = new Date();

  var minute = now.getUTCMinutes();
  if( minute < 10 ) minute = '0' + minute;

  var hour = now.getUTCHours();
  if( hour < 10 ) hour = '0' + hour;

  var signature = '[[User:' + wgUserName + '|' + wgUserName + ']] ' + 
   hour + ':' + minute + ', ' + now.getUTCDate() + ' ' +
   QICSigs.month[ now.getUTCMonth() ] + ' ' + now.getUTCFullYear() + ' (UTC)';

  var old_text;
  do {
    old_text = QICSigs.form.wpTextbox1.value;
    QICSigs.form.wpTextbox1.value = old_text.replace( '~~~~', signature );
  } while( old_text != QICSigs.form.wpTextbox1.value );

  if( QICSigs.old_onsubmit ) QICSigs.old_onsubmit();
  return true;
 },

 install : function()
 {
  QICSigs.form = document.getElementById( 'editform' );
  if (QICSigs.form) {
   old_onsubmit = QICSigs.form.onsubmit;
   QICSigs.form.onsubmit = QICSigs.convertSignatues;

   var content =    document.getElementById ("bodyContent")       // "monobook" skin
                 || document.getElementById ("mw_contentholder"); // "modern" skin
   var message = document.createElement('DIV');
   message.className = 'usermessage';
   message.appendChild( document.createTextNode( 'Please use regular signatures: --~~~~' ) );
   content.insertBefore( message, QICSigs.form );
  }
 }

}

addOnloadHook( QICSigs.install );
//</nowiki>