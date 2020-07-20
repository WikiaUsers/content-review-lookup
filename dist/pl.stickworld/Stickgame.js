/* Zmiana tytułu "StickGame:StickWrick RPG" na samo "StickWrick RPG" */
YAHOO.util.Event.onContentReady('firstHeading', function()
{
   var t=document.getElementById('firstHeading');
   if(t.innerHTML=="StickGame:StickWrick RPG")
       t.innerHTML="StickWrick RPG";
});