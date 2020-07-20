window.AjaxBlock = {
    expiryTimes: {
        '2 hours': '2 Stunden',
        '1 day': '1 Tag',
        '3 days': '3 Tage',
        '1 week': '1 Woche',
        '2 weeks': '2 Wochen',
        '1 month': '1 Monat',
        '3 months': '3 Monate',
        '6 months': '6 Monate',
        '1 year': '1 Jahr',
        'never': 'Unbeschränkt'
    },
    blockReasons: {
        '[[Hilfe:Vandalismus|Vandalismus]]': 'Vandalismus',
        '[[Hilfe:Spam|Spam]]': 'Spam',
        'Entfernen von Inhalt': 'Blanking',
        'Erstellen unsinniger Seiten': 'Unsinnige Seiten',
        '[[Clash of Clans Wiki:Allgemeine Regeln|Regelverstoß]]': 'Regelverstoß',
        'Verstoß gegen den Grundsatz „Keine persönlichen Angriffe“': 'Persönliche Angriffe',
        'Sperrumgehung': 'Sperrumgehung'
    },
    check: {
        talk: false,
        autoBlock: true,
        override: true
    }
};

importScriptPage('MediaWiki:AjaxBlock/code.js', 'dev');