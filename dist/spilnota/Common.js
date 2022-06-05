/* Автовизначення ніку користувача */
if (mw.config.get('wgUserName') !== null) $('span.insertusername').text(mw.config.get('wgUserName'));