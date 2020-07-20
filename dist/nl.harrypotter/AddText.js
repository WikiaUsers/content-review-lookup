// <source lang="javascript">
 
var AddText =
{
  run : function ()
  {
  alert("test");
  }
 
}
 
if (wgAction == 'edit')
  hookEvent ('load', AddText.run);
 
// </source>