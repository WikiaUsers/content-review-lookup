// Делает всякие штуки
// http://ru.siegenax.wikia.com/wiki/Участник:Kopcap94/linkParser.js -- первая версия
// https://fngplg.fandom.com/ru/wiki/MediaWiki:R.js -- вторая версия
// hello
// накорсаренная часть осталась 100% нетронутой, то есть она как пересобачивала ютф в аскии, так и будет пересобачивать. наренданенную часть я, как ты возможно заметил, закомментировал. то есть скрипт делает всё, что делал корсар + ищет ссылки вида [url alias], проверяет их на принадлежность к хостингу (включая орг), и переделывает в интервики, если в ссылках не было параметров (?...) и хешей (#...)
// (с) fngplg

!function( mw, $ ) {
    var mwc = mw.config.get(['wgAction', 'wgWikiaBaseDomainRegex']);
    if ( [ 'edit', 'submit' ].indexOf( mwc.wgAction ) === -1 ) return;
 
    var editor,
        re = /\[(https?:\/\/[^\s\]]+?)(\s+[^\]]*?)?\]/gm,
        wikiaRe = new RegExp(mwc.wgWikiaBaseDomainRegex),
        w8i = 0,
        $button = $( '<button />', {
            id: 'linkParser',
            style: 'float: right; margin-bottom: 5px;',
            text: 'Парсер',
            type: 'button'
        }),
        w8 = setInterval(function() {
            w8i++;
            editor = (window.WikiaEditor && window.WikiaEditor.getInstance) ? window.WikiaEditor.getInstance() : null;
            if (editor) {
                clearInterval(w8);
                editor.on('mode', on_mode);
                on_mode(editor, editor.mode);
            } else {
                if (w8i > 100) clearInterval(w8);
            }
        }, 100);
 
    function on_mode(ed, mode) {
        if (mode === 'source') {
            $button.on('click.wwlp', $button_click);
            $button.insertAfter('.wpSummary_canMinorEdit');
        } else {
            $button.detach();
            $button.off('click.wwlp');
        }
    }// on_mode
 
    function $button_click() {
        var text = editor.getContent(),
            new_text = text;
 
        $.each( text.match( /(%[A-Za-z0-9]{2}){1,}/g ) || '', function( i, v ) {
            try {
                new_text = new_text.replace( v, decodeURIComponent( v ) );
            } catch( e ) {
                console.log( 'There was error ( ' + e + ' ) during attempt to parse this: ' + v );
            }
        });
 
        // конвертация внешних ссылок во внутренние
        var r,
            replacements = [];// {what, to}
        while (r = re.exec(new_text)) {
            var article, lang, wiki,
                url = r[1],
                alias = r[2];
            try {
                url = new URL(url);
            } catch (exc) {
                continue;// не ссылка. почему-то
            }
            if (url.search || url.hash || !wikiaRe.test(url.hostname)) continue;// левая ссылка, не правая
            lang = url.pathname.split('/wiki/');
            // деление не прошло - ещё одна левая ссылка
            if (lang.length < 2) continue;
            // статья нужна в читабельном виде. вроде бы
            article = decodeURIComponent(lang.slice(1).join('/wiki/'));
            lang = lang[0];
            wiki = url.hostname.replace(wikiaRe, '');
            wiki = wiki.split('.').filter(Boolean);
            if (wiki.length > 2) continue;// снова какая-то фигня вместо адреса
            if (wiki.length === 1) {
                wiki = wiki[0];
            } else {
                lang = lang || wiki[0];
                wiki = wiki[1];
            }
            lang = lang.replace('\/', '');// -детская болезнь
 
            // здесь все компоненты уже готовы
            url = '[[w:c:' + (lang ? lang + '.' : '') +
                wiki + ':' + article +// (url.hash || '') +
                (alias ? '|' + alias.replace(' ', '') : '') + ']]';
            // запомнить для замены
            replacements.push({what: r[0], to: url});
        }
 
        // собственно замена        
        replacements.forEach(function(rep) {
            new_text = new_text.replace(rep.what, rep.to);
        });
 
 
        /*
        var refs = /<ref(\sname=".+">|>)\[http(?:s)?:\/\/(\S+)\.wikia\.com\/wiki\/тема:(\d+)\s([^<\/]*)\]<\/ref>/gi;
        new_text = new_text.replace( refs, '<ref$1[[w:c:$2:Тема:$3|$4]]</ref>' );
 
        var contribs = /<ref(\sname=".+">|>)\[http(?:s)?:\/\/(\S+)\.wikia\.com\/wiki\/(?:служебная|special):contributions\/([^\s?]+)\s([^<\/]*)\]<\/ref>/gi;
        new_text = new_text.replace( contribs, '<ref$1[[w:c:$2:Special:Contributions/$3|$4]]</ref>' );
        */
 
        editor.setContent( new_text );
    }// $button_click
 
}( mediaWiki, jQuery );