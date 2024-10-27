// https://help.gamepedia.com/BambiSuki_Wiki:Discord_verification?user=<wiki-username>&discord=<discord-username>&tag=<discord-tag>
// based on VerifyUser from Noreplyz https://dev.fandom.com/wiki/VerifyUser
mw.loader.using(['site','mediawiki.ui.button','mediawiki.util','mediawiki.api']).then(function() {
	if ( mw.config.get('wgPageName') !== 'BambiSuki_Wiki:Discord_verification' || mw.config.get('wgAction') !== 'view' ) return;
	var verifyUser = {
		i18n: {
			"en": {
				"loading": "Loading...",
				"error-loggedin": "Warning: You are currently logged in as a different user.",
				"verify-instructions": "To verify, please enter your Discord username in the box below.",
				"verify-notice": "Verification adds your Discord username to your public profile.",
				"button-verify": "Verify",
				"verify-login": "To verify, please log in to your Gamepedia account.",
				"verify-fandom": "I have a Fandom account",
				"button-login": "Log in",
				"verify-complete": "Done! Now, please go to the #$1 channel and send the following text:",
				"general-error": "Something went wrong. The error was:"
			},
			"ar": {
				"loading": "Loading...",
				"error-loggedin": "تحذير: أنت مسجل الدخول حاليًا إلى مستخدم مختلف.",
				"verify-instructions": "للتحقق ، يرجى إدخال مقبض Discord في المربع أدناه.",
				"verify-notice": "يضيف التحقق مقبض Discord إلى ملفك الشخصي العام.",
				"button-verify": "تحقق",
				"verify-login": "للتحقق ، يرجى تسجيل الدخول إلى حساب Gamepedia الخاص بك.",
				"verify-fandom": "Fandom لدي حساب",
				"button-login": "تسجيل الدخول",
				"verify-complete": "منجز! الآن ، يرجى الانتقال إلى قناة $1# وإرسال النص التالي:",
				"general-error": ":هناك خطأ ما. الخطأ كان"
			},
			"de": {
				"loading": "Lädt...",
				"error-loggedin": "Warnung: Du bist zurzeit mit einem anderen Konto angemeldet.",
				"verify-instructions": "Zum Verifizieren musst du deinen Discord-Tag unterhalb in die Box eintragen.",
				"verify-notice": "Verifizierung fügt deinen Discord-Tag auf deinem öffentlichen Profil hinzu.",
				"button-verify": "Verifizieren",
				"verify-login": "Zum verifizieren musst du mit deinem Gamepedia-Konto angemeldet sein.",
				"verify-fandom": "Ich habe eine Fandom-Konto",
				"button-login": "Einloggen",
				"verify-complete": "Fertig! Öffne jetzt den #$1 Kanal und sende dort folgenden Text:",
				"general-error": "Etwas ist schief gelaufen. Der Fehler war:"
			},
			"es": {
				"loading": "Loading...",
				"error-loggedin": "Aviso: Estás actualmente identificado como un usuario diferente.",
				"verify-instructions": "Para verificar, por favor introduce tu pseudónimo de Discord en la caja de abajo.",
				"verify-notice": "La verificación añade tu pseudónimo de Discord a tu perfil público.",
				"button-verify": "Verificar",
				"verify-login": "Para verificar, por favor inicia sesión en tu cuenta de Gamepedia.",
				"verify-fandom": "Tengo una cuenta de Fandom",
				"button-login": "Iniciar sesión",
				"verify-complete": "¡Hecho! Ahora, ve al canal de #$1 y envía el siguiente texto:",
				"general-error": "Algo fue mal. El error fue:"
			},
			"fr": {
				"loading": "Loading...",
				"error-loggedin": "Avertissement: Vous êtes actuellement connecté à un autre utilisateur.",
				"verify-instructions": "Pour vérifier, veuillez entrer votre poignée Discord dans la case ci-dessous.",
				"verify-notice": "La vérification ajoute votre poignée Discord à votre profil public.",
				"button-verify": "Vérifiez",
				"verify-login": "Pour vérifier, veuillez vous connecter à votre compte Gamepedia.",
				"verify-fandom": "J'ai un compte Fandom",
				"button-login": "Se connecter à",
				"verify-complete": "Terminé! Maintenant, veuillez vous rendre sur le canal #$1 et envoyer le texte suivant:",
				"general-error": "Quelque chose a mal tourné. L'erreur était:"
			},
			"pl": {
				"loading": "Loading...",
				"error-loggedin": "Uwaga: jesteś obecnie zalogowany jako inny użytkownik.",
				"verify-instructions": "Aby zweryfikować konto wpisz swój DiscordTag w polu poniżej.",
				"verify-notice": "Weryfikacja dodaje twoją nazwę użytkownika na Discordzie do twojego publicznego profilu.",
				"button-verify": "Zweryfikuj",
				"verify-login": "Zaloguj się na Gamepediaie aby zweryfikować konto.",
				"verify-fandom": "Mam konto na Gamepedii",
				"button-login": "Zaloguj się",
				"verify-complete": "Gotowe! Teraz przejdź do kanału #$1 i wyślij w nim ten tekst:",
				"general-error": "Coś poszło nie tak. Błąd:"
			},
			"pt-br": {
				"loading": "Carregando...",
				"error-loggedin": "Aviso: No momento, você está conectado como um usuário diferente.",
				"verify-instructions": "Para verificar, digite seu nome de usuário do Discord na caixa abaixo.",
				"verify-notice": "A verificação adiciona seu nome de usuário do Discord ao seu perfil público.",
				"button-verify": "Verificar",
				"verify-login": "Para verificar, entre na sua conta do Gamepedia.",
				"verify-fandom": "Eu tenho uma conta na Fandom",
				"button-login": "Entrar",
				"verify-complete": "Feito! Agora, vá para o canal #$1 e envie o seguinte texto:",
				"general-error": "Algo deu errado. O erro foi:"
			},
			"ru": {
				"loading": "Loading...",
				"error-loggedin": "Внимание: вы уже вошли под другим пользователем.",
				"verify-instructions": "Чтобы пройти проверку, введите свой Discord-тег в поле ниже.",
				"verify-notice": "Проверка добавит ваш Discord-тег в ваш глобальный профиль.",
				"button-verify": "Проверить",
				"verify-login": "Для прохождения проверки зайдите, пожалуйста, в свой аккаунт на ФЭНДОМЕ.",
				"verify-fandom": "У меня аккаунт на Fandom",
				"button-login": "Войти",
				"verify-complete": "Отлично! Теперь пройдите в канал #$1 и отправьте этот текст:",
				"general-error": "Что-то пошло не так. Ошибка:"
			},
			"tr": {
				"loading": "Loading...",
				"error-loggedin": "Uyarı: Şu anda farklı bir kullanıcıya giriş yaptınız.",
				"verify-instructions": "Doğrulamak için, lütfen aşağıdaki kutuya Discord'a girin.",
				"verify-notice": "Doğrulama, Discord tanıtıcısını herkese açık profilinize ekler.",
				"button-verify": "Doğrula",
				"verify-login": "Doğrulamak için lütfen Gamepedia hesabınıza giriş yapın.",
				"verify-fandom": "Bir Fandom hesabım var",
				"button-login": "Oturum aç",
				"verify-complete": "Yapıldı! Şimdi #$1 kanalına gidin ve aşağıdaki metni gönderin:",
				"general-error": "Bir şey ters gitti. Hata şuydu:"
			},
			"zh-hans": {
				"loading": "Loading...",
				"error-loggedin": "警告：您当前登录到其他用户。",
				"verify-instructions": "进行验证请在下框中输入您的Discord名称和编号。",
				"verify-notice": "验证后会将您的Discord名称和编号添加到您的公开个人资料中。",
				"button-verify": "验证",
				"verify-login": "请登录您的Gamepedia账户进行验证。",
				"verify-fandom": "我有Fandom账户。",
				"button-login": "登录",
				"verify-complete": "完成！现在，请转到#$1频道并发送以下文本：",
				"general-error": "发生错误："
			},
			"zh-hant": {
				"loading": "Loading...",
				"error-loggedin": "警告：您目前登入到其他使用者。",
				"verify-instructions": "進行驗證請在下框中輸入您的Discord名稱和編號。",
				"verify-notice": "驗證後會將您的Discord名稱和編號添加到您的公開個人檔案中。",
				"button-verify": "驗證",
				"verify-login": "請登入您的Gamepedia帳號進行驗證。",
				"verify-fandom": "我有Fandom帳號。",
				"button-login": "登入",
				"verify-complete": "完成！現在，請轉到#$1頻道並發送以下文字：",
				"general-error": "發生錯誤："
			},
			"zh-hk": {
				"loading": "Loading...",
				"error-loggedin": "警告：您目前登入到其他用戶。",
				"verify-instructions": "進行驗證請在下框中輸入您的Discord名稱和編號。",
				"verify-notice": "驗證後會將您的Discord名稱和編號添加到您的公開個人檔案中。",
				"button-verify": "驗證",
				"verify-login": "請登入您的Gamepedia賬號進行驗證。",
				"verify-fandom": "我有Fandom賬號。",
				"button-login": "登入",
				"verify-complete": "完成！現在，請轉到#$1頻道並發送以下文字：",
				"general-error": "發生錯誤："
			},
			"zh-tw": {
				"loading": "Loading...",
				"error-loggedin": "警告：您目前登入到其他使用者。",
				"verify-instructions": "進行驗證請在下框中輸入您的Discord名稱和編號。",
				"verify-notice": "驗證後會將您的Discord名稱和編號添加到您的公開個人檔案中。",
				"button-verify": "驗證",
				"verify-login": "請登入您的Gamepedia帳號進行驗證。",
				"verify-fandom": "我有Fandom帳號。",
				"button-login": "登入",
				"verify-complete": "完成！現在，請轉到#$1頻道並發送以下文字：",
				"general-error": "發生錯誤："
			}
		}
	};
	verifyUser.i18n = verifyUser.i18n[( mw.config.get('wgUserLanguage') in verifyUser.i18n ? mw.config.get('wgUserLanguage') :'en' )];
	var cleanUser = function (user) {
		if (!user) return '';
		// Trim whitespaces and new lines
		user = user.replace(/^[\s\n]+|[\s\n]+$/g, '');
		// Clean up links
		user = user.replace(/^https?:\/\//g, '');
		user = user.replace(/^.*\.(gamepedia|fandom|wikia)\.(com|org|io)\/(wiki\/)?/g, '');
		user = user.replace(/^(User:|Special:Contributions\/|Special:Contribs\/)/g, '');
		// Replace spaces
		user = user.replace(/(%20|_)/g, ' ');
		// Uppercase first letter of the username
		user = user.charAt(0).toUpperCase() + user.slice(1);
		return user;
	};
	
	var username = mw.config.get('wgUserName');
	var providedUsername = cleanUser(mw.util.getParamValue('user'));
	var discordHandle = ( mw.util.getParamValue('discord') ? mw.util.getParamValue('discord') + ( mw.util.getParamValue('tag') ? '#' + mw.util.getParamValue('tag') : '' ) : '' );
	$("#no-duv").hide();
	var dv = '<div style="text-align:center;line-height:180%;">' +
		( username ?
			( providedUsername && username !== providedUsername ?
				'<div class="error">' + verifyUser.i18n['error-loggedin'] + '</div>'
			: '' ) +
			verifyUser.i18n['verify-instructions'] + '<br/><br/>' + 
			'<input placeholder="discord#0000" value="' + discordHandle + '" style="padding:8px; width:350px;font-size:20px" id="verify-input"/> ' +
			'<div class="mw-ui-button mw-ui-progressive" type="submit" style="vertical-align:bottom;line-height:inherit;" id="verify"><span>' + verifyUser.i18n['button-verify'] + '</span></div>' +
			'<br/><br/><small>' + verifyUser.i18n['verify-notice'] + '</small>'
		:
			verifyUser.i18n['verify-login'] + ' <a href="https://community.fandom.com/wiki/Special:VerifyUser' + 
			( mw.util.getParamValue('user') ? '/' + mw.util.getParamValue('user') : '' ) + '?' + 
			( discordHandle ? '&user=' + mw.util.getParamValue('discord') + '&tag=' + mw.util.getParamValue('tag') : '' ) + 
			( mw.util.getParamValue('c') ? '&c=' + mw.util.getParamValue('c') : '' ) + 
			( mw.util.getParamValue('ch') ? '&ch=' + mw.util.getParamValue('ch') : '' ) + 
			'" class="external">' + verifyUser.i18n['verify-fandom'] + '</a><br/><br/>' + 
			'<a href="/Special:UserLogin?returnto=' + mw.config.get('wgPageName') + '" style="text-decoration:none">' +
				'<div class="mw-ui-button mw-ui-progressive"><span>' + verifyUser.i18n['button-login'] + '</span></div>' + 
			'</a>'
		) +
		'</div>';
	$("#duv").html(dv);
	
	// On click of verify, set Discord handle
	$('#verify').on('click', function () {
		new mw.Api().postWithEditToken({
			action: 'profile',
			do: 'editSocialFields',
			user_id: mw.config.get('wgUserId'),
			data: JSON.stringify({'link-discord': $('#verify-input').val()})
		}).done(function (data) {
			var command = mw.util.getParamValue('c') || '!verify';
			dv = '<div style="text-align:center;line-height:180%;">' + verifyUser.i18n['verify-complete'].replace('$1', mw.util.getParamValue('ch') || 'verification') + '<br/><br/>' +
				'<input value="' + ( command === 'wb' ? '/verify username:' : command ) + ' ' + username + '" onClick="this.select();" style="padding:8px; width:350px;font-size:20px" readonly/> ' +
				'</div>';
			$("#duv").html(dv);
		}).fail(function (e) {
			dv = '<div class="error">' +
				verifyUser.i18n['general-error'] + ' <br/>' + JSON.parse(e.responseText).title +
				'</div>';
			$("#duv").html(dv);
		});
		$("#duv").html(verifyUser.i18n.loading);
	});

	// On Enter keypress, perform verification
	$('#verify-input').keypress(function (e) {
		if (e.which === 13) {
			$('#verify').click();
		}
	});
});