// https://help.gamepedia.com/Gamepedia_Help_Wiki:Ověření_Discordu?user=<wiki-username>&discord=<discord-username>&tag=<discord-tag>
// based on VerifyUser from Noreplyz https://dev.fandom.com/wiki/VerifyUser
mw.loader.using(['site','mediawiki.ui.button','mediawiki.util','mediawiki.api']).then(function() {
	if ( mw.config.get('wgPageName') !== 'Gamepedia_Help_Wiki:Ověření_Discordu' || mw.config.get('wgAction') !== 'view' ) return;
	var verifyUser = {
		i18n: {
    "en": {
        "title": "Verification for Discord",
        "error-loggedin": "Warning: You are currently logged in as a different user.",
        "verify-instructions": "To verify, please enter your Discord username in the box below.",
        "verify-notice": "Verification adds your Discord username to your public profile.",
        "button-verify": "Verify",
        "verify-login": "To verify, please log in to your Fandom account.",
        "verify-gamepedia": "I have a Gamepedia account",
        "button-login": "Log in",
        "verify-complete": "Done! Now, please go to the #$1 channel and send the following text:",
        "general-error": "Something went wrong. The error was:"
    },
    "ar": {
        "title": "التحقق لDiscord",
        "error-loggedin": "تحذير: أنت مسجل الدخول حاليًا إلى مستخدم مختلف.",
        "verify-instructions": "للتحقق ، يرجى إدخال مقبض Discord في المربع أدناه.",
        "verify-notice": "يضيف التحقق مقبض Discord إلى ملفك الشخصي العام.",
        "button-verify": "تحقق",
        "verify-login": "للتحقق ، يرجى تسجيل الدخول إلى حساب Fandom الخاص بك.",
        "verify-gamepedia": "Gamepedia لدي حساب",
        "button-login": "تسجيل الدخول",
        "verify-complete": "منجز! الآن ، يرجى الانتقال إلى قناة $1# وإرسال النص التالي:",
        "general-error": ":هناك خطأ ما. الخطأ كان"
    },
    "cs": {
        "title": "Ověření Discordu",
        "error-loggedin": "Upozornění: Jste aktuálně přihlášeni jako jiný uživatel.",
        "verify-instructions": "Pro ověření, prosíme, zadejte do pole níže své uživatelské jméno, které používáte na Discordu.",
        "verify-notice": "Ověření přidá vaše uživatelské jméno na Discordu do vašeho veřejného profilu.",
        "button-verify": "Ověřit",
        "verify-login": "Chcete-li to ověřit, přihlaste se ke svému Fandom účtu.",
        "verify-gamepedia": "Mám účet na Gamepedii",
        "button-login": "Přihlásit se",
        "verify-complete": "Hotovo! Nyní navštivte kanál #$1 a odešlete následující text:",
        "general-error": "Něco se pokazilo. Chyba:"
    },
    "de": {
        "title": "Verifizierung für Discord",
        "error-loggedin": "Warnung: Du bist zurzeit mit einem anderen Konto angemeldet.",
        "verify-instructions": "Zum verifizieren musst du deinen Discord-Tag unterhalb in die Box eintragen.",
        "verify-notice": "Verifizierung fügt deinen Discord-Tag auf deinem öffentlichen Profil hinzu.",
        "button-verify": "Verifizieren",
        "verify-login": "Zum verifizieren musst du mit deinem Fandom-Konto angemeldet sein.",
        "verify-gamepedia": "Ich habe eine Gamepedia-Konto",
        "button-login": "Einloggen",
        "verify-complete": "Fertig! Öffne jetzt den #$1 Kanal und sende dort folgenden Text:",
        "general-error": "Etwas ist schief gelaufen. Der Fehler war:"
    },
    "es": {
        "title": "Verificación para Discord",
        "error-loggedin": "Aviso: Estás actualmente identificado como un usuario diferente.",
        "verify-instructions": "Para verificar, por favor introduce tu pseudónimo de Discord en la caja de abajo.",
        "verify-notice": "La verificación añade tu pseudónimo de Discord a tu perfil público.",
        "button-verify": "Verificar",
        "verify-login": "Para verificar, por favor inicia sesión en tu cuenta de Fandom.",
        "verify-gamepedia": "Tengo una cuenta de Gamepedia",
        "button-login": "Iniciar sesión",
        "verify-complete": "¡Hecho! Ahora, ve al canal de #$1 y envía el siguiente texto:",
        "general-error": "Algo fue mal. El error fue:"
    },
    "fr": {
        "title": "Vérification pour Discord",
        "error-loggedin": "Avertissement: Vous êtes actuellement connecté à un autre utilisateur.",
        "verify-instructions": "Pour vérifier, veuillez entrer votre poignée Discord dans la case ci-dessous.",
        "verify-notice": "La vérification ajoute votre poignée Discord à votre profil public.",
        "button-verify": "Vérifiez",
        "verify-login": "Pour vérifier, veuillez vous connecter à votre compte Fandom.",
        "verify-gamepedia": "J'ai un compte Gamepedia",
        "button-login": "Se connecter à",
        "verify-complete": "Terminé! Maintenant, veuillez vous rendre sur le canal #$1 et envoyer le texte suivant:",
        "general-error": "Quelque chose a mal tourné. L'erreur était:"
    },
    "pl": {
        "title": "Weryfikacja na Discordzie",
        "error-loggedin": "Uwaga: jesteś obecnie zalogowany jako inny użytkownik.",
        "verify-instructions": "Aby zweryfikować konto wpisz swój DiscordTag w polu poniżej.",
        "verify-notice": "Weryfikacja dodaje twoją nazwę użytkownika na Discordzie do twojego publicznego profilu.",
        "button-verify": "Zweryfikuj",
        "verify-login": "Zaloguj się na Fandomie aby zweryfikować konto.",
        "verify-gamepedia": "Mam konto na Gamepedii",
        "button-login": "Zaloguj się",
        "verify-complete": "Gotowe! Teraz przejdź do kanału #$1 i wyślij w nim ten tekst:",
        "general-error": "Coś poszło nie tak. Błąd:"
    },
    "pt-br": {
        "title": "Verificação para Discord",
        "error-loggedin": "Aviso: No momento, você está conectado como um usuário diferente.",
        "verify-instructions": "Para verificar, digite seu nome de usuário do Discord na caixa abaixo.",
        "verify-notice": "A verificação adiciona seu nome de usuário do Discord ao seu perfil público.",
        "button-verify": "Verificar",
        "verify-login": "Para verificar, entre na sua conta do Fandom.",
        "verify-gamepedia": "Eu tenho uma conta na Gamepedia",
        "button-login": "Entrar",
        "verify-complete": "Feito! Agora, vá para o canal #$1 e envie o seguinte texto:",
        "general-error": "Algo deu errado. O erro foi:"
    },
    "ru": {
        "title": "Проверка Discord",
        "error-loggedin": "Внимание: вы уже вошли под другим пользователем.",
        "verify-instructions": "Чтобы пройти проверку, введите свой Discord-тег в поле ниже.",
        "verify-notice": "Проверка добавит ваш Discord-тег в ваш глобальный профиль.",
        "button-verify": "Проверить",
        "verify-login": "Для прохождения проверки зайдите, пожалуйста, в свой аккаунт на ФЭНДОМЕ.",
        "verify-gamepedia": "У меня аккаунт на Gamepedia",
        "button-login": "Войти",
        "verify-complete": "Отлично! Теперь пройдите в канал #$1 и отправьте этот текст:",
        "general-error": "Что-то пошло не так. Ошибка:"
    },
    "tr": {
        "title": "Discord doğrulaması",
        "error-loggedin": "Uyarı: Şu anda farklı bir kullanıcıya giriş yaptınız.",
        "verify-instructions": "Doğrulamak için, lütfen aşağıdaki kutuya Discord'a girin.",
        "verify-notice": "Doğrulama, Discord tanıtıcısını herkese açık profilinize ekler.",
        "button-verify": "Doğrula",
        "verify-login": "Doğrulamak için lütfen Fandom hesabınıza giriş yapın.",
        "verify-gamepedia": "Bir Gamepedia hesabım var",
        "button-login": "Oturum aç",
        "verify-complete": "Yapıldı! Şimdi #$1 kanalına gidin ve aşağıdaki metni gönderin:",
        "general-error": "Bir şey ters gitti. Hata şuydu:"
    },
    "zh-hans": {
        "title": "验证Discord",
        "error-loggedin": "警告：您当前以其他用户身份进行验证。",
        "verify-instructions": "进行验证请在下框中输入您的Discord名称和编号。",
        "verify-notice": "验证后会将您的Discord名称和编号添加到您的公开个人资料中。",
        "button-verify": "验证",
        "verify-login": "请登录您的Fandom账户进行验证。",
        "verify-gamepedia": "我有Gamepedia账户。",
        "button-login": "登录",
        "verify-complete": "完成！现在，请转到#$1频道并发送以下文本：",
        "general-error": "发生错误："
    },
    "zh-hant": {
        "title": "驗證Discord",
        "error-loggedin": "警告：您目前以其他使用者身分進行驗證。",
        "verify-instructions": "進行驗證請在下框中輸入您的Discord名稱和編號。",
        "verify-notice": "驗證後會將您的Discord名稱和編號添加到您的公開個人檔案中。",
        "button-verify": "驗證",
        "verify-login": "請登入您的Fandom帳號進行驗證。",
        "verify-gamepedia": "我有Gamepedia帳號。",
        "button-login": "登入",
        "verify-complete": "完成！現在，請轉到#$1頻道並發送以下文字：",
        "general-error": "發生錯誤："
    },
    "zh-hk": {
        "title": "驗證Discord",
        "error-loggedin": "警告：您目前以其他用戶身份進行驗證。",
        "verify-instructions": "進行驗證請在下框中輸入您的Discord名稱和編號。",
        "verify-notice": "驗證後會將您的Discord名稱和編號添加到您的公開個人檔案中。",
        "button-verify": "驗證",
        "verify-login": "請登入您的Fandom賬號進行驗證。",
        "verify-gamepedia": "我有Gamepedia賬號。",
        "button-login": "登入",
        "verify-complete": "完成！現在，請轉到#$1頻道並發送以下文字：",
        "general-error": "發生錯誤："
    },
    "zh-tw": {
        "title": "驗證Discord",
        "error-loggedin": "警告：您目前以其他使用者身分進行驗證。",
        "verify-instructions": "進行驗證請在下框中輸入您的Discord名稱和編號。",
        "verify-notice": "驗證後會將您的Discord名稱和編號添加到您的公開個人檔案中。",
        "button-verify": "驗證",
        "verify-login": "請登入您的Fandom帳號進行驗證。",
        "verify-gamepedia": "我有Gamepedia帳號。",
        "button-login": "登入",
        "verify-complete": "完成！現在，請轉到#$1頻道並發送以下文字：",
        "general-error": "發生錯誤："
    }
}
	};
	verifyUser.i18n = verifyUser.i18n[( mw.config.get('wgUserLanguage') in verifyUser.i18n ? mw.config.get('wgUserLanguage') :'cs' )];
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
	var discordHandle = ( mw.util.getParamValue('discord') && mw.util.getParamValue('tag') ? mw.util.getParamValue('discord') + '#' + mw.util.getParamValue('tag') : '' );
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
				'<input value="' + ( command === 'wb' ? '!wiki verify' : command ) + ' ' + username + '" onClick="this.select();" style="padding:8px; width:350px;font-size:20px" readonly/> ' +
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