/**
var notifMessage = 'Welcome to the Music Wiki, Your Subculture Soundtrack! We are an encyclopedia dedicated to music! Feel free to contribute! Also, if you have any questions, please feel free to visit our [[Forum:Index|forums]] at any time!';
$(function () {
  if ( getCookie( 'customNotification_'+'_codference-'+wgDBname ) != "off" ) {
    $('body.skin-oasis').addClass('notifications');
    $('.toolbar').append('<ul id="WikiaNotifications" class="WikiaNotifications CustomPopup"><li><div data-type="5"><a class="sprite close-notification"></a>'+notifMessage+'</div></li></ul>');
    $('.CustomPopup .close-notification').click(function() {
      $('.CustomPopup').remove();
      $('body.skin-oasis').removeClass('notifications');
      setCookie( 'customNotification_'+'_codference-'+ wgDBname, "off", 3 );
    });
  }
});
**/


/* I am Mix, a member of the Wikia's technical team and I am investigating a JS caching issue here. */