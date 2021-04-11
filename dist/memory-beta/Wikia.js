/* Re-add proper namespace prefix to titles where it has been removed "by design" */
$('.ns-6 .WikiaPageHeader h1').prepend('File:');
$('.ns-10 .WikiaPageHeader h1').prepend('Template:');

/* Remove image attribution as per new Wikia regulations */
$('.picture-attribution').remove();

/* ==============
   Trivia for FCD
   ============== */
 
    $(function () {
        $('#WikiaRail').append("<div class='typeform-widget' data-url='https://fandomrewards.typeform.com/to/ETSo49Hw' style='width: 100%; height: 700px'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });