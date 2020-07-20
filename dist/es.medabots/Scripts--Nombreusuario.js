/*****************/
/* NOMBREUSUARIO */
/*****************/
$(function UserNameReplace() {
	var username = mw.config.get('wgUserName');
	try {
		if (username) {
			$('span.insertusername').text(username);
		}
	} catch(e){}
});