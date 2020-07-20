function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" );
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
var datauplywu = '251211';
var notifMessage = 'Chcesz pomóc? <a href="http://pl.bleach.wikia.com/wiki/Bleach_Wiki:Centrum_bada%C5%84">Zagłosuj w ankiecie!</a>';
$(function () {
  if ( getCookie( 'customNotification_'+23032012+'_codference-'+wgDBname ) != "off" ) {
    $('body.skin-oasis').addClass('notifications');
    $('.toolbar').append('<ul id="WikiaNotifications" class="WikiaNotifications CustomPopup"><li><div data-type="5"><a class="sprite close-notification"></a>'+notifMessage+'</div></li></ul>');
    $('.CustomPopup .close-notification').click(function() {
      $('.CustomPopup').remove();
      $('body.skin-oasis').removeClass('notifications');
      setCookie( 'customNotification_'+datauplywu+'_codference-'+ wgDBname, "off", 3 );
    });
  }
  checktimers();
});