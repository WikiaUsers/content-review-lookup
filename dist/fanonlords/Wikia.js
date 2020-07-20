var notifMessage = "Story_Week_13-14_begins_December_26!";
 
 $(function () {
 
   if ( getCookie( 'customNotification_'+'_Story_Week-'+Story_Week ) != "on" ) {
 
     $('body.skin-oasis').addClass('notifications');
 
     $('.toolbar').append('<ul id="WikiaNotifications" class="WikiaNotifications CustomPopup"><li><div data-type="5"><a class="sprite close-notification"></a>Story_Week_on Dec._26!</div></li></ul>');
 
     $('.CustomPopup .close-notification').click(function() {
 
       $('.CustomPopup').remove();
 
       $('body.skin-oasis').removeClass('notifications');
 
       setCookie( 'customNotification_'+'_Story_Week-'+ Story_Week, "on", 3 );
 
     });
 
   }
 
 });
 
 
importScriptPage('AjaxRC/code.js', 'dev');

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	userLang: "true"
};
importScriptPage('SocialIcons/code.js','dev');