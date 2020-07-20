
// Adds the Random Wiki Button into the Fan Feed + Monobook support


    var lang = mw.config.get('wgUserLanguage');
    var msg = {
        en: {
            randomwiki: 'Random Wiki'
        },
        bg: {
            randomwiki: 'Случайно уики'
        },
        br: {
            randomwiki: 'Ur wiki dre zegouezh'
        },
        ckb: {
            randomwiki: 'ویکیی ھەرەمەکی'
        },
        cs: {
            randomwiki: 'Náhodná Wiki'
        },
        de: {
            randomwiki: 'Zufälliges Wiki'
        },
        es: {
            randomwiki: 'Wiki al azar'
        },
        el: {
            randomwiki: 'Τυχαίο Wiki'
        },
        fa: {
            randomwiki: 'ویکی تصادفی'
        },
        fi: {
            randomwiki: 'Satunnainen wiki'
        },
        fr: {
            randomwiki: 'Wiki au hasard'
        },
        gl: {
            randomwiki: 'Wiki ao chou'
        },
        he: {
            randomwiki: 'ויקי אקראית'
        },
        hu: {
            randomwiki: 'Véletlen wiki'
        },
        ia: {
            randomwiki: 'Wiki aleatori'
        },
        id: {
            randomwiki: 'Acak wiki'
        },
        it: {
            randomwiki: 'Wiki casuale'
        },
        ja: {
            randomwiki: 'おまかせWiki'
        },
        ko: {
            randomwiki: '랜덤 위키'
        },
        lt: {
            randomwiki: 'Atsitiktinis Wiki'
        },
        mk: {
            randomwiki: 'Случајно вики'
        },
        ml: {
            randomwiki: 'ഏതെങ്കിലും വിക്കി'
        },
        ms: {
            randomwiki: 'Wiki Rawak'
        },
        my: {
            randomwiki: 'ကျပန်း ဝီကီ'
        },
        nb: {
            randomwiki: 'Tilfeldig wiki'
        },
        nl: {
            randomwiki: 'Willekeurig Wiki'
        },
        pl: {
            randomwiki: 'Losowa wiki'
        },
        pt: {
            randomwiki: 'Wiki aleatória'
        },
        ru: {
            randomwiki: 'Случайная вики'
        },
        'sr-ec': {
            randomwiki: 'Случајна викија'
        },
        sv: {
            randomwiki: 'Slumpmässig wiki'
        },
        tl: {
            randomwiki: 'Alinmang Wiki'
        },
        'tt-cyrl': {
            randomwiki: 'Очраклы  Wiki'
        },
        uk: {
            randomwiki: 'Вікі-активність'
        },
        vi: {
            randomwiki: 'Wikia ngẫu nhiên'
        },
        'zh-hans': {
            randomwiki: '随机维基'
        },
        'zh-hant': {
            randomwiki: '隨機維基'
        }
    };
    // use user language, with English as fallback
    msg = msg[lang] || msg[lang.split('-')[0]] || msg.en;



	if ( !document.getElementById( 'ca-randomwiki' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
            $( '<ul id="ca-randomwiki"><a href="/index.php?title=w:c:www:Special:RandomWiki" class="wds-is-squished wds-button wds-is-secondary" style="float:right; margin-top:-26px">' + msg.randomwiki + '</a></li>' ).appendTo( '.mcf-header' );
		} else {
			$( '<li id="ca-randomwiki"><a href="/index.php?title=w:c:www:Special:RandomWiki">' + msg.randomwiki + '</a></li>' ).appendTo( '#p-wikicities-nav  > .pBody > ul' );
		}
	}