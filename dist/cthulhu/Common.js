/* Any JavaScript here will be loaded for all users on every page load. */

/*** [[Wikipedia:User:Lightdarkness]]'s include function, GFDL ***/
function inc (file) {
  var lt = String.fromCharCode(60);
  var gt = String.fromCharCode(62);
  document.writeln(lt+'script type="text/javascript" src="/index.php?title='+file+'&amp;action=raw&amp;ctype=text/javascript&amp;dontcountme=s"'+gt+lt+'/script'+gt);
}