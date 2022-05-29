(function($, wikificator) {
    // add wikify button
    // src: https://ru.wikipedia.org/wiki/MediaWiki:Gadget-wikificator.js
    // @2018.08.14
    // ported by user:fngplg
    // <nowiki>
    var urlVars = new URLSearchParams(location.search);
    var p = {},
        hidden = [],
        circuitbreaker = 0,// break init() loop (site-wide hook(lng1) + user hook(lng2))
        lang = mw.config.get( 'wgContentLanguage' );// use rules by content;
            
    p.isUcp = parseFloat( mw.config.get( 'wgVersion' ) ) > 1.19;
    p.debug = mw.config.get( 'debug' ) || urlVars.get('debug1');// ucp have problems with debug mode, so...
    // these ((())) are made for reasons
    if ((( wikificator && wikificator.loaded === true ) || 
	    ( !wikificator.forced && (
	    	!$( '#wpSave' ).length// totally unsaveable pages
	    	|| 
	    	$.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) === -1
	    ) ) ) ) 
	{
	    // we need more stopping power here, i guess
	    wikificator.loaded = true;
	    return;
	}// if loaded
    wikificator.loaded = true;
    p.loaded = true;

    function processLink( link, left, right ) {
        var rlink1 = p.cache[ lang ].processLink1 || ( p.cache[ lang ].processLink1 = new RegExp( '^(?:' + p.t.category + '|' + p.t.file + ') ?:' ) ),
            rlink2 = p.cache[ lang ].processLink2 || ( p.cache[ lang ].processLink2 = new RegExp( '^[' + p.t.rlcl  + ']*$' ) );

        left = $.trim( left.replace( /[ _\u00A0]+/g, ' ' ) );
        if ( left.match( rlink1 ) ) {
            return '[[' + left + '|' + right + ']]';
        }
        right = $.trim( right.replace( / {2,}/g, ' ' ) );
        var inLink = right.substr( 0, left.length );
        var afterLink = right.substr( left.length );
        var uniLeft = left.substr( 0, 1 ).toUpperCase() + left.substr( 1 );
        var uniRight = ( right.substr( 0, 1 ).toUpperCase() + right.substr( 1 ) ).replace( /[_\u00A0]/g, ' ' );
        if ( uniRight.indexOf( uniLeft ) === 0 && afterLink.match( rlink2 ) ) {
            return '[[' + inLink + ']]' + afterLink;
        } else {
            return '[[' + left + '|' + right + ']]';
        }
    }
    function unhide( s, num ) {
        p.log( 'unhide',  { num: num, s: s } );
        return hidden[ num - 1 ];
    }

    // preliminary set some vals
    p.translations = {
        ru: {
            u00A0: '\u00A0',
            u0301: '\u0301',
        },
        en: {
            u00A0: '\u00A0',
            u0301: '\u0301',
        },
        be: {
            u00A0: '\u00A0',
            u0301: '\u0301',
        },
        uk: {
            u00A0: '\u00A0',
            u0301: '\u0301',
        },
    };
    p.translations = {
        // language list - start
        qqq: {
            category: 'category (ns:14) namespace localized name',
            file: 'file (ns:6) namespace localized name',
            wikificator: 'app name',
            wikificatorx: 'app full name',
            wmfulltext: 'full page processed warning',
            wmtalkpage: 'select message warning',
            // technical part starts below this line
            hidetags: 'comma-separated list: tags to ignore',
            rhide: ['array of regexp: hidder rules'],
            rlcl: 'regexp: low-cased letters (en+local)',
            rr: ['array of regexp: replacement rules'],
            // r*: [stages]; stage: [{reg: pattern, exp: replacement, m: mode}]
            u00A0: '\\u00A0 symbol (nbsp)',// non-breaking space
            u0301: '\\u0301 symbol (idk)',// no idea
        },//qqq
        qqx: {
            category: '<wikificator-category>',
            file: '<wikificator-file>',
            wikificator: '<wikificator-wikificator>',
            wikificatorx: '<wikificator-wikificatorx>',
            wmfulltext: '<wikificator-wmfulltext>',
            wmtalkpage: '<wikificator-wmtalkpage>',
            // technical part starts below this line
            hidetags: '',
            rhide: [],
            rlcl: /\0/,
            rr: [],
            u00A0: '\\u00A0',
            u0301: '\\u0301',
        },//qqx
        ru: {
            category: 'Категория',
            file: 'Файл',
            wikificator: 'Викификатор',
            wikificatorx: 'Викификатор — автоматический обработчик текста',
            wmfulltext: 'Викификатор обработает ВЕСЬ текст на этой странице. Продолжить?',
            wmtalkpage: 'Викификатор не обрабатывает страницы обсуждения целиком.\n\nВыделите ваше сообщение — обработано будет только оно',
            // technical part starts below this line
            hidetags: 'nowiki,pre,source,syntaxhighlight,templatedata,code,kbd,tt,graph,hiero,math,timeline,chem,score,categorytree,inputbox,mapframe,maplink',
            rhide: {
                    stage1: [
                        {
                            reg: '^[ \\t].*',
                            m: 'mg',
                        },{
                            reg: '(https?|ftp|news|nntp|telnet|irc|gopher):\\/\\/[^\\s\\[\\]<>"]+ ?',
                            m: 'gi',
                        },{
                            reg: '^#(redirect|перенапр(авление)?)',
                            m: 'i',
                        },
                    ],
                    stage2: [
                        {
                            reg: '\\[\\[[^\\]|]+',
                            m: 'g',// only link part
                        },
                    ],
                    stage3: [
                        {
                            reg: '<[a-z][^>]*?>',
                            m: 'gi',
                        },{
                            reg: '^(\\{\\||\\|\\-).*',
                            m: 'mg',// table/row def
                        },{
                            reg: '(^\\||^!|!!|\\|\\|) *[a-z]+=[^|]+\\|(?!\\|)',
                            m: 'mgi',// cell style
                        },{
                            reg: '\\| +',
                            m: 'g',// formatted cell
                        },
                    ],
            },// regexps for hide()
            rlcl: '[a-zа-яё]',
            rr: {
                stage1: [
                    {
                        reg: '\\{\\{(?:подст|subst):(?:[уУ]дар(?:ение)?|\')\\}\\}',
                        m: 'g',
                        exp: ( p.translations.ru || p.translations.ru ).u0301,
                    },{
                        reg: '( |\\n|\\r)+\\{\\{(·|•|\\*)\\}\\}',
                        m: 'g', // before {{·/•/*}}, usually in templates
                        exp: '{{$2}}',
                    },{
                        reg: '\\{\\{\\s*[Шш]аблон:([\\s\\S]+?)\\}\\}',
                        m: 'g',
                        exp: '{{$1}}',
                    },{
                        reg: '(\\{\\{\\s*)(?:reflist|список примечаний)(\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1примечания$2',
                    },{
                        reg: '(\\{\\{\\s*)примечания(\\s*\\|\\s*)[4-9](\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1примечания$2узкие$3',
                    },{
                        reg: '(\\{\\{\\s*)примечания\\s*\\|\\s*height=[0-9]*(\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1примечания$2',
                    },{
                        reg: '[\\u00A0 ]+(\\{\\{\\s*([Rr]ef-[a-z\\-]+?|[Ee]n icon|[Cc]hecked|[Vv]|[Пп]роверено)\\}\\})',
                        m: 'g',
                        exp: '$1',
                    },{
                        reg: '<[\\/\\\\]?(hr|br)( [^\\/\\\\>]+?)? ?[\\/\\\\]?>',
                        m: 'gi',
                        exp: '<$1$2>',
                    },{
                        reg: '(\\| *Координаты (?:истока|устья) *= *)(\\d+(?:\\.\\d+)?)[,/] ?(\\d+(?:\\.\\d+)?(?=\\s))',
                        m: 'g',
                        exp: function ( s, m1, m2, m3 ) {
                            return m1 + ( +parseFloat( m2 ).toFixed( 4 ) ) + '/' + ( +parseFloat( m3 ).toFixed( 4 ) );
                        },
                    },{
                        reg: '<noinclude>\\s*(\\{\\{[dD]ocpage\\}\\})\\s*<\\/noinclude>',
                        m: 'g',
                        exp: '$1',
                    },{
                        reg: '(\\| *(?:pp?|S|s|с|c|страницы\\d?|pages\\d?|seite\\d?|alleseiten|листы\\d?|том|volume|band|выпуск|issue|heft|номер|столбцы\\d?|columns\\d?|kolonnen\\d?|серия год) *= *)(\\d+)[\\u00A0 ]?(?:-{1,3}|—) ?(\\d+)',
                        m: 'g',
                        exp: '$1$2—$3',
                    },{
                        reg: '(\\| *год *= *)(\\d{4})[\\u00A0 ]?(?:-{1,3}|—) ?(\\d{4})',
                        m: 'g',
                        exp: '$1$2—$3',
                    },{
                        reg: '(\\[\\[[^\\{\\]|\\n]+){{!}}([^\\{\\]|\\n]+\\]\\])',
                        m: 'g',
                        exp: '$1|$2',
                    },
                ],
                stage2: [
                    {
                        reg: ' +(\\n|\\r)',
                        m: 'g',
                        exp: '$1',// spaces at EOL
                    },
                ],
                stage3: [
                    {
                        // LINKS
                        reg: '(\\[\\[:?)(category|категория):( *)',
                        m: 'ig',
                        exp: '$1Категория:'
                    },{
                        reg: '(\\[\\[:?)(module|модуль):( *)',
                        m: 'ig',
                        exp: '$1Модуль:',
                    },{
                        reg: '(\\[\\[:?)(template|шаблон):( *)',
                        m: 'ig',
                        exp: '$1Шаблон:',
                    },{
                        reg: '(\\[\\[:?)(image|изображение|file|файл):( *)',
                        m: 'ig',
                        exp: '$1Файл:',
                    },{
                        // Linked years, centuries and ranges
                        reg: '(\\(|\\s)(\\[\\[[12]?\\d{3}\\]\\])[\\u00A0 ]?(-{1,3}|–|—) ?(\\[\\[[12]?\\d{3}\\]\\])(\\W)',
                        m: 'g',
                        exp: '$1$2—$4$5',
                    },{
                        reg: '(\\[\\[[12]?\\d{3}\\]\\]) ?(гг?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\(|\\s)(\\[\\[[IVX]{1,5}\\]\\])[\\u00A0 ]?(-{1,3}|–|—) ?(\\[\\[[IVX]{1,5}\\]\\])(\\W)',
                        m: 'g',
                        exp: '$1$2—$4$5',
                    },{
                        reg: '(\\[\\[[IVX]{1,5}\\]\\]) ?(вв?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '\\[\\[(\\d+)\\]\\]\\sгод',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.ru || p.translations.ru ).u00A0 + 'год]]',
                    },{
                        reg: '\\[\\[(\\d+)\\sгод\\|\\1\\]\\]\\sгод',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.ru || p.translations.ru ).u00A0 + 'год]]',
                    },{
                        reg: '\\[\\[(\\d+)\\sгод\\|\\1\\sгод([а-я]{0,3})\\]\\]',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.ru || p.translations.ru ).u00A0 + 'год]]$2',
                    },{
                        reg: '\\[\\[((\\d+)(?: (?:год )?в [\\wa-яёА-ЯЁ ]+\\|\\2)?)\\]\\][\\u00A0 ](год[а-яё]*)',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$3]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\]\\]\\sвек',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.ru || p.translations.ru ).u00A0 + 'век]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\sвек\\|\\1\\]\\]\\sвек',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.ru || p.translations.ru ).u00A0 + 'век]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\sвек\\|\\1\\sвек([а-я]{0,3})\\]\\]',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.ru || p.translations.ru ).u00A0 + 'век]]$2',
                    },{
                        reg: '\\[\\[(([XVI]+) век\\|\\2)\\]\\][\\u00A0 ]век',
                        m: 'g',
                        exp: '[[$2' + ( p.translations.ru || p.translations.ru ).u00A0 + 'век]]',
                    },{
                        // Nice links
                        reg: '(\\[\\[[^|[\\]]*)[\\u00AD\\u200E\\u200F]+([^\\[\\]]*\\]\\])',
                        m: 'g',
                        exp: '$1$2',// Soft Hyphen & DirMark
                    },{
                        reg: '\\[\\[ *([^|[\\]]+?) *\\| *(\'\'\'\'\'\\|\'\'\'|\'\')([^\'|[\\]]*)\\2 *]]',
                        m: 'g',
                        exp: '$2[[$1|$3]]$2',// move fomatting out of link text
                    },{
                        reg: '\\[\\[([^|[\\]\\n]+)\\|([^|[\\]\\n]+)\\]\\]',
                        m: 'g',
                        exp: processLink,// link shortening
                    },{
                        reg: '\\[\\[ *([^|[\\]]+)([^|\\[\\]()]+?) *\\| *\\1 *\\]\\]\\2',
                        m: 'g',
                        exp: '[[$1$2]]',// text repetition after link
                    },{
                        reg: '\\[\\[ *(?!Файл:|Категория:)([a-zA-Zа-яёА-ЯЁ\\u00A0-\\u00FF %!\\"$&\'()*,\\-—.\\/0-9:;=?\\\\@\\^_`’~]+) *\\| *([^\\|\\[\\]]+) *\\]\\]([a-zа-яё]+)',
                        m: 'g',
                        exp: '[[$1|$2$3]]',// "
                    },
                ],
                stage4: [
                    {
                        // TAGS
                        reg: '<<(\\S.+\\S)>>',
                        m: 'g',
                        exp: '"$1"',// << >>
                    },{
                        reg: '(su[pb]>)-(\\d)',
                        m: 'g',
                        exp: '$1−$2',// ->minus
                    },{
                        reg: '<(b|strong)>(.*?)<\\/(b|strong)>',
                        m: 'gi',
                        exp: "'''$2'''",
                    },{
                        reg: '<(i|em)>(.*?)<\\/(i|em)>',
                        m: 'gi',
                        exp: "''$2''",
                    },{
                        reg: '^<hr ?\\/?>',
                        m: 'gim',
                        exp: '----',
                    },{
                        reg: '[\\u00A0 \\t]*<ref(?:\\s+name="")?(\\s|>)',
                        m: 'gi',
                        exp: '<ref$1',
                    },{
                        reg: '(\\n== *[a-zа-я\\s\\.:]+ *==\\n+)<references *\\/>',
                        m: 'ig',
                        exp: '$1{' + '{примечания}}',
                    },
                ],
                stage5: [
                    {
                        reg:'[ \\t\\u00A0]+',
                        m: 'g',
                        exp: ' ',// double spaces
                    },
                ],
                stage6: [
                    {
                        reg: ' &(#x[0-9a-f]{2,4}|#[0-9]{3,4}|[0-9a-z]{2,8});',
                        m: 'gi',
                        exp: 
                            function ( s ) {
                                var t = document.createElement( 'textarea' );
                                t.innerHTML = s;
                                var c = t.value;
                                if ( c.length === 1 && c.charCodeAt( 0 ) > 127 || s === '&#x20;' ) {
                                    return c;
                                }
                                return s;
                            },
                    },
                ],
                stage7: [
                    {
                        reg: '\\(tm\\)',
                        m: 'gi',
                        exp: '™',
                    },{
                        reg: '\\.\\.\\.',
                        m: 'g',
                        exp: '…',
                    },{
                        reg: '(^|[^+])\\+-(?!\\+|-)',
                        m: 'g',
                        exp: '$1±',
                    },{
                        reg: '~=',
                        m: 'g',
                        exp: '≈',
                    },{
                        reg: '\\^2(\\D)',
                        m: 'g',
                        exp: '²$1',
                    },{
                        reg: '\\^3(\\D)',
                        m: 'g',
                        exp: '³$1',
                    },{
                        reg: '(\\s)кв\\.\\s*(дм|см|мм|мкм|нм|км|м)(\\s)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2²$3',
                    },{
                        reg: '(\\s)куб\\.\\s*(дм|см|мм|мкм|нм|км|м)(\\s)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2³$3',
                    },{
                        reg: '((?:^|[\\s"])\\d+(?:[\\.,]\\d+)?)\\s*[xх]\\s*(\\d+(?:[\\.,]\\d+)?)\\s*([мm]{1,2}(?:[\\s"\\.,;?!]|$))',
                        m: 'g',
                        exp: '$1×$2' + ( p.translations.ru || p.translations.ru ).u00A0 + '$3',
                    },{
                        reg: '\\s+×\\s+',
                        m: 'g',
                        exp: ( p.translations.ru || p.translations.ru ).u00A0 + '×' + ( p.translations.ru || p.translations.ru ).u00A0,
                    },{
                        reg: '([\\wа-яА-ЯёЁ])\'(?=[\\wа-яА-ЯёЁ])',
                        m: 'g',
                        exp: '$1’',// '
                    },{
                        reg: '№№',
                        m: 'g',
                        exp: '№',
                    },{
                        // Headings
                        reg: '^(=+)[ \\t\\f\\v]*(.*?)[ \\t\\f\\v]*=+$',
                        m: 'gm',
                        exp: '$1 $2 $1',// add spaces inside
                    },{
                        reg: '([^\\r\\n])(\\r?\\n==.+==\\r?\\n)',
                        m: 'g',
                        exp: '$1\n$2',// add empty line before
                    },{
                        reg: '(==.+==)[\\r\\n]{2,}(?!=)',
                        m: 'g',
                        exp: '$1\n',// remove empty line after
                    },{
                        reg: '^== см(\\.?|отри|отрите) ?также ==$',
                        m: 'gmi',
                        exp: '== См. также ==',
                    },{
                        reg: '^== сноски ==$',
                        m: 'gmi',
                        exp: '== Примечания ==',
                    },{
                        reg: '^== внешние\\sссылки ==$',
                        m: 'gmi',
                        exp: '== Ссылки ==',
                    },{
                        reg: '^== (?:(.+[^.])\\.|(.+):) ==$',
                        m: 'gm',
                        exp: '== $1$2 ==',
                    },{
                        reg: "^== '''(?!.*'''.*''')(.+)''' ==$",
                        m: 'gm',
                        exp: '== $1 ==',
                    },{
                        reg: '«|»|“|”|„',
                        m: 'g',
                        exp: '"',// temp
                    },{
                        // Hyphens and en dashes to pretty dashes
                        reg: '–',
                        m: 'g',
                        exp: '-',// &ndash; -> hyphen
                    },{
                        reg: '(\\s)-{1,3} ',
                        m: 'g',
                        exp: '$1— ',// hyphen -> &mdash;
                    },{
                        reg: '(\\d)--(\\d)',
                        m: 'g',
                        exp: '$1—$2',// -> &mdash;
                    },{
                        reg: '(\\s)-(\\d)',
                        m: 'g',
                        exp: '$1−$2',// hyphen -> minus
                    },{
                        // Year and century ranges
                        reg: '(\\(|\\s)([12]?\\d{3})[\\u00A0 ]?(-{1,3}|—) ?([12]?\\d{3})(?![\\wА-ЯЁа-яё]|-[^ех]|-[ех][\\wА-ЯЁа-яё])',
                        m: 'g',
                        exp: '$1$2—$4',
                    },{
                        reg: '([12]?\\d{3}) ?(гг?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\(|\\s)([IVX]{1,5})[\\u00A0 ]?(-{1,3}|—) ?([IVX]{1,5})(?![\\w\\-])',
                        m: 'g',
                        exp: '$1$2—$4',
                    },{
                        reg: '([IVX]{1,5}) ?(вв?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru).u00A0 + '$2',
                    },{
                        // Reductions
                        reg: '(Т|т)\\.\\s?е\\.',
                        m: 'g',
                        exp: '$1о есть',
                    },{
                        reg: '(Т|т)\\.\\s?к\\.',
                        m: 'g',
                        exp: '$1ак как',
                    },{
                        reg: '(В|в)\\sт\\. ?ч\\.',
                        m: 'g',
                        exp: '$1 том числе',
                    },{
                        reg: '(И|и)\\sт\\.\\s?д\\.',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + 'т.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'д.',
                    },{
                        reg: '(И|и)\\sт\\.\\s?п\\.',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + 'т.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'п.',
                    },{
                        reg: '(Т|т)\\.\\s?н\\.',
                        m: 'g',
                        exp: '$1.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'н.',
                    },{
                        reg: '(И|и)\\.\\s?о\\.',
                        m: 'g',
                        exp: '$1.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'о.',
                    },{
                        reg: 'с\\.\\s?ш\\.',
                        m: 'g',
                        exp: 'с.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'ш.',
                    },{
                        reg: 'ю\\.\\s?ш\\.',
                        m: 'g',
                        exp: 'ю.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'ш.',
                    },{
                        reg: 'в\\.\\s?д\\.',
                        m: 'g',
                        exp: 'в.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'д.',
                    },{
                        reg: 'з\\.\\s?д\\.',
                        m: 'g',
                        exp: 'з.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'д.',
                    },{
                        reg: 'л\\.\\s?с\\.',
                        m: 'g',
                        exp: 'л.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'с.',
                    },{
                        reg: 'а\\.\\s?е\\.\\s?м\\.',
                        m: 'g',
                        exp: 'а.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'е.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'м.',
                    },{
                        reg: 'а\\.\\s?е\\.',
                        m: 'g',
                        exp: 'а.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'е.',
                    },{
                        reg: 'мм\\sрт\\.\\s?ст\\.',
                        m: 'g',
                        exp: 'мм' + ( p.translations.ru || p.translations.ru ).u00A0 + 'рт.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'ст.',
                    },{
                        reg: 'н\\.\\s?э(\\.|(?=\\s))',
                        m: 'g',
                        exp: 'н.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'э.',
                    },{
                        reg: '(Д|д)(о|\\.)\\sн\\.\\s?э\\.',
                        m: 'g',
                        exp: '$1о' + ( p.translations.ru || p.translations.ru ).u00A0 + 'н.' + ( p.translations.ru || p.translations.ru ).u00A0 + 'э.',
                    },{
                        reg: '(\\d)[\\u00A0 ]?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]г)\\.?(?=[,;.]| "?[а-яё\\-])',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\d)[\\u00A0 ](тыс)([^\\.А-Яа-яЁё])',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2.$3',
                    },{
                        reg: 'ISBN:\\s?(?=[\\d\\-]{8,17})',
                        m: '',
                        exp: 'ISBN ',
                    },{
                        // Insert/delete spaces
                        reg: '^([#*:]+)[ \\t\\f\\v]*(?!\\{\\|)([^ \\t\\f\\v*#:;])',
                        m: 'gm',
                        exp: '$1 $2',// space after #*: unless before table
                    },{
                        reg: '(\\S)[\\u00A0 \\t](-{1,3}|—)[\\u00A0 \\t](\\S)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '— $3',
                    },{
                        reg: '([А-ЯЁ]\\.) ?([А-ЯЁ]\\.) ?([А-ЯЁ][а-яё])',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2' + ( p.translations.ru || p.translations.ru ).u00A0 + '$3',
                    },{
                        reg: '([А-ЯЁ]\\.)([А-ЯЁ]\\.)',
                        m: 'g',
                        exp: '$1 $2',
                    },{
                        reg: '([а-яё]"?\\)?[\\.\\?!:])((?:\\x01\\d+\\x02\\|)?(?:[A-QS-ZА-ЯЁ]|R(?!u\\b)))',
                        m: 'g',
                        exp: '$1 $2',// "word. Word"; don't change in cases like "Газета.Ru"
                    },{
                        reg: '([)"a-zа-яё\\]²³])\\s*([,:])([\\[(a-zа-яё])',
                        m: 'g',
                        exp: '$1$2 $3',// "word, word", "word: word"; except ":"
                    },{
                        reg: '([)a-zа-яё\\]²³])\\s*([,:])"',
                        m: 'g',
                        exp: '$1$2 "',
                    },{
                        reg: '([)"a-zа-яё\\]²³])[ \\u00A0\\t]([,;])\\s([\\[("a-zа-яё])',
                        m: 'g',
                        exp: '$1$2 $3',
                    },{
                        reg: '([^%\\/\\wА-Яа-яЁё]\\d+?(?:[\\.,]\\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$2',//5 %
                    },{
                        reg: '(\\d) ([%‰])(?=-[А-Яа-яЁё])',
                        m: 'g',
                        exp: '$1$2',//5%-й
                    },{
                        reg: '([№§])(\\s*)(\\d)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru ).u00A0 + '$3',
                    },{
                        // inside ()
                        reg: '\\( +',
                        m: 'g',
                        exp: '(',
                    },{
                        reg: ' +\\)',
                        m: 'g',
                        exp: ')',
                    },{
                        // Temperature
                        reg: '([\\s\\d=≈≠≤≥<>—("\'|])([+±−\\-]?\\d+?(?:[.,]\\d+?)?)(([ °\\^*]| [°\\^*])(C|F))(?=[\\s"\').,;!?|\\x01])',
                        m: 'gm',
                        exp: '$1$2' + ( p.translations.ru || p.translations.ru ).u00A0 + '°$5',// '
                    },{
                        // Dot → comma in numbers
                        reg: '(\\s\\d+)\\.(\\d+[\\u00A0 ]*[%‰°×])',
                        m: 'gi',
                        exp: '$1,$2',
                    },
                ],
                stage8: [
                    {
                        reg: '([\\s\\x02!|#\'"\\/([{;+\\-])"([^"]*)([^\\s"([{|])"([^a-zа-яё])',
                        m: 'ig',
                        exp: '$1«$2$3»$4',// "
                    },
                ],
                stage9: [
                    {
                        reg: '«([^»]*)«([^»]*)»',
                        m: 'g',
                        exp: '«$1„$2“',
                    },
                ],
                stage10: [
                    {
                      reg: '\\x01(\\d+)\\x02',
                      m: 'g',
                      exp: unhide,
                    },
                ],
            },// regexps for r()
            u00A0: ( p.translations.ru || p.translations.ru ).u00A0,
            u0301: ( p.translations.ru || p.translations.ru ).u0301,
        },//ru
        en: {
            category: 'Category',
            file: 'File',
            wikificator: 'Wikificator',
            wikificatorx: 'Wikificator — automated text processor',
            wmfulltext: 'Wikificator will process entire article\'s text. Do you want to proceed?',
            wmtalkpage: 'Wikificator will not work on entire talk page.\n\nSelect your message to process.',
            // technical part starts below this line
            hidetags: 'nowiki,pre,source,syntaxhighlight,templatedata,code,kbd,tt,graph,hiero,math,timeline,chem,score,categorytree,inputbox,mapframe,maplink',
            //rhide derived from ru
            rlcl: '[a-zа-яё]',
            rr: {
                stage1: [
                    {
                        reg: '\\{\\{(?:подст|subst):(?:[уУ]дар(?:ение)?|\')\\}\\}',
                        m: 'g',
                        exp: ( p.translations.en || p.translations.ru ).u0301,
                    },{
                        reg: '( |\\n|\\r)+\\{\\{(·|•|\\*)\\}\\}',
                        m: 'g', // before {{·/•/*}}, usually in templates
                        exp: '{{$2}}',
                    },{
                        reg: '\\{\\{\\s*[Tt]emplate:([\\s\\S]+?)\\}\\}',
                        m: 'g',
                        exp: '{{$1}}',
                    },{
                        reg: '(\\{\\{\\s*)(?:reflist|список примечаний)(\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1references$2',
                    },/*{
                        reg: '(\\{\\{\\s*)references(\\s*\\|\\s*)[4-9](\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1примечания$2узкие$3',
                    },*/{
                        reg: '(\\{\\{\\s*)references\\s*\\|\\s*height=[0-9]*(\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1references$2',
                    },{
                        reg: '[\\u00A0 ]+(\\{\\{\\s*([Rr]ef-[a-z\\-]+?|[Ee]n icon|[Cc]hecked|[Vv]|[Пп]роверено)\\}\\})',
                        m: 'g',
                        exp: '$1',
                    },{
                        reg: '<[\\/\\\\]?(hr|br)( [^\\/\\\\>]+?)? ?[\\/\\\\]?>',
                        m: 'gi',
                        exp: '<$1$2>',
                    },/*{
                        reg: '(\\| *Координаты (?:истока|устья) *= *)(\\d+(?:\\.\\d+)?)[,/] ?(\\d+(?:\\.\\d+)?(?=\\s))',
                        m: 'g',
                        exp: function ( s, m1, m2, m3 ) {
                            return m1 + ( +parseFloat( m2 ).toFixed( 4 )) + '/' + ( +parseFloat( m3 ).toFixed( 4 ) );
                        },
                    },*/{
                        reg: '<noinclude>\\s*(\\{\\{[dD]ocpage\\}\\})\\s*<\\/noinclude>',
                        m: 'g',
                        exp: '$1',
                    },{
                        reg: '(\\| *(?:pp?|S|s|с|c|страницы\\d?|pages\\d?|seite\\d?|alleseiten|листы\\d?|том|volume|band|выпуск|issue|heft|номер|столбцы\\d?|columns\\d?|kolonnen\\d?|серия год) *= *)(\\d+)[\\u00A0 ]?(?:-{1,3}|—) ?(\\d+)',
                        m: 'g',
                        exp: '$1$2—$3',
                    },{
                        reg: '(\\| *year *= *)(\\d{4})[\\u00A0 ]?(?:-{1,3}|—) ?(\\d{4})',
                        m: 'g',
                        exp: '$1$2—$3',
                    },{
                        reg: '(\\[\\[[^\\{\\]|\\n]+){{!}}([^\\{\\]|\\n]+\\]\\])',
                        m: 'g',
                        exp: '$1|$2',
                    },
                ],
                stage2: [
                    {
                        reg: ' +(\\n|\\r)',
                        m: 'g',
                        exp: '$1',// spaces at EOL
                    },
                ],
                stage3: [
                    {
                        // Linked years, centuries and ranges
                        reg: '(\\(|\\s)(\\[\\[[12]?\\d{3}\\]\\])[\\u00A0 ]?(-{1,3}|–|—) ?(\\[\\[[12]?\\d{3}\\]\\])(\\W)',
                        m: 'g',
                        exp: '$1$2—$4$5',
                    },{
                        reg: '(\\[\\[[12]?\\d{3}\\]\\]) ?(гг?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.en || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\(|\\s)(\\[\\[[IVX]{1,5}\\]\\])[\\u00A0 ]?(-{1,3}|–|—) ?(\\[\\[[IVX]{1,5}\\]\\])(\\W)',
                        m: 'g',
                        exp: '$1$2—$4$5',
                    },{
                        reg: '(\\[\\[[IVX]{1,5}\\]\\]) ?(вв?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.en || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '\\[\\[(\\d+)\\]\\]\\sгод',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.en || p.translations.ru ).u00A0 + 'год]]',
                    },{
                        reg: '\\[\\[(\\d+)\\sгод\\|\\1\\]\\]\\sгод',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.en || p.translations.ru ).u00A0 + 'год]]',
                    },{
                        reg: '\\[\\[(\\d+)\\sгод\\|\\1\\sгод([а-я]{0,3})\\]\\]',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.en || p.translations.ru ).u00A0 + 'год]]$2',
                    },{
                        reg: '\\[\\[((\\d+)(?: (?:год )?в [\\wa-яёА-ЯЁ ]+\\|\\2)?)\\]\\][\\u00A0 ](год[а-яё]*)',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.en || p.translations.ru ).u00A0 + '$3]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\]\\]\\sвек',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.en || p.translations.ru ).u00A0 + 'век]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\sвек\\|\\1\\]\\]\\sвек',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.en || p.translations.ru ).u00A0 + 'век]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\sвек\\|\\1\\sвек([а-я]{0,3})\\]\\]',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.en || p.translations.ru ).u00A0 + 'век]]$2',
                    },{
                        reg: '\\[\\[(([XVI]+) век\\|\\2)\\]\\][\\u00A0 ]век',
                        m: 'g',
                        exp: '[[$2' + ( p.translations.en || p.translations.ru ).u00A0 + 'век]]',
                    },{
                        // Nice links
                        reg: '(\\[\\[[^|[\\]]*)[\\u00AD\\u200E\\u200F]+([^\\[\\]]*\\]\\])',
                        m: 'g',
                        exp: '$1$2',// Soft Hyphen & DirMark
                    },{
                        reg: '\\[\\[ *([^|[\\]]+?) *\\| *(\'\'\'\'\'\\|\'\'\'|\'\')([^\'|[\\]]*)\\2 *]]',
                        m: 'g',
                        exp: '$2[[$1|$3]]$2',// move fomatting out of link text
                    },{
                        reg: '\\[\\[([^|[\\]\\n]+)\\|([^|[\\]\\n]+)\\]\\]',
                        m: 'g',
                        exp: processLink,// link shortening
                    },{
                        reg: '\\[\\[ *([^|[\\]]+)([^|\\[\\]()]+?) *\\| *\\1 *\\]\\]\\2',
                        m: 'g',
                        exp: '[[$1$2]]',// text repetition after link
                    },/*{
                        reg: '\\[\\[ *(?!File:|Category:)([a-zA-Z\\u00A0-\\u00FF %!\\"$&\'()*,\\-—.\\/0-9:;=?\\\\@\\^_`’~]+) *\\| *([^\\|\\[\\]]+) *\\]\\]([a-z]+)',
                        m: 'g',
                        exp: '[[$1|$2$3]]',// "
                    }*/
                ],
                stage4: [
                    {
                        // TAGS
                        reg: '<<(\\S.+\\S)>>',
                        m: 'g',
                        exp: '"$1"',// << >>
                    },{
                        reg: '(su[pb]>)-(\\d)',
                        m: 'g',
                        exp: '$1−$2',// ->minus
                    },{
                        reg: '<(b|strong)>(.*?)<\\/(b|strong)>',
                        m: 'gi',
                        exp: "'''$2'''",
                    },{
                        reg: '<(i|em)>(.*?)<\\/(i|em)>',
                        m: 'gi',
                        exp: "''$2''",
                    },{
                        reg: '^<hr ?\\/?>',
                        m: 'gim',
                        exp: '----',
                    },{
                        reg: '[\\u00A0 \\t]*<ref(?:\\s+name="")?(\\s|>)',
                        m: 'gi',
                        exp: '<ref$1',
                    },{
                        reg: '(\\n== *[a-z\\s\\.:]+ *==\\n+)<references *\\/>',
                        m: 'ig',
                        exp: '$1{' + '{references}}',
                    },
                ],
                stage5: [
                    {
                        reg:'[ \\t\\u00A0]+',
                        m: 'g',
                        exp: ' ',// double spaces
                    },
                ],
                stage6: [
                    {
                        reg: ' &(#x[0-9a-f]{2,4}|#[0-9]{3,4}|[0-9a-z]{2,8});',
                        m: 'gi',
                        exp: 
                            function ( s ) {
                                var t = document.createElement( 'textarea' );
                                t.innerHTML = s;
                                var c = t.value;
                                if ( c.length === 1 && c.charCodeAt( 0 ) > 127 || s === '&#x20;' ) {
                                    return c;
                                }
                                return s;
                            },
                    },
                ],
                stage7: [
                    {
                        reg: '\\(tm\\)',
                        m: 'gi',
                        exp: '™',
                    },{
                        reg: '\\.\\.\\.',
                        m: 'g',
                        exp: '…',
                    },{
                        reg: '(^|[^+])\\+-(?!\\+|-)',
                        m: 'g',
                        exp: '$1±',
                    },{
                        reg: '~=',
                        m: 'g',
                        exp: '≈',
                    },{
                        reg: '\\^2(\\D)',
                        m: 'g',
                        exp: '²$1',
                    },{
                        reg: '\\^3(\\D)',
                        m: 'g',
                        exp: '³$1',
                    },/*{
                        reg: '(\\s)кв\\.\\s*(дм|см|мм|мкм|нм|км|м)(\\s)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru).u00A0 + '$2²$3',
                    },{
                        reg: '(\\s)куб\\.\\s*(дм|см|мм|мкм|нм|км|м)(\\s)',
                        m: 'g',
                        exp: '$1' + ( p.translations.ru || p.translations.ru).u00A0 + '$2³$3',
                    },*/{
                        reg: '((?:^|[\\s"])\\d+(?:[\\.,]\\d+)?)\\s*[xх]\\s*(\\d+(?:[\\.,]\\d+)?)\\s*([мm]{1,2}(?:[\\s"\\.,;?!]|$))',
                        m: 'g',
                        exp: '$1×$2' + ( p.translations.en || p.translations.ru ).u00A0 + '$3',
                    },{
                        reg: '\\s+×\\s+',
                        m: 'g',
                        exp: ( p.translations.en || p.translations.ru ).u00A0 + '×' + ( p.translations.en || p.translations.ru ).u00A0,
                    },{
                        // Headings
                        reg: '^(=+)[ \\t\\f\\v]*(.*?)[ \\t\\f\\v]*=+$',
                        m: 'gm',
                        exp: '$1 $2 $1',// add spaces inside
                    },{
                        reg: '([^\\r\\n])(\\r?\\n==.+==\\r?\\n)',
                        m: 'g',
                        exp: '$1\n$2',// add empty line before
                    },{
                        reg: '(==.+==)[\\r\\n]{2,}(?!=)',
                        m: 'g',
                        exp: '$1\n',// remove empty line after
                    },/*{
                        reg: '^== см(\\.?|отри|отрите) ?также ==$',
                        m: 'gmi',
                        exp: '== См. также ==',
                    },{
                        reg: '^== сноски ==$',
                        m: 'gmi',
                        exp: '== Примечания ==',
                    },*/{
                        reg: '^== external\\slinks ==$',
                        m: 'gmi',
                        exp: '== Links ==',
                    },{
                        reg: '^== (?:(.+[^.])\\.|(.+):) ==$',
                        m: 'gm',
                        exp: '== $1$2 ==',
                    },{
                        reg: "^== '''(?!.*'''.*''')(.+)''' ==$",
                        m: 'gm',
                        exp: '== $1 ==',
                    },{
                        reg: '«|»|“|”|„',
                        m: 'g',
                        exp: '"',// temp
                    },{
                        // Hyphens and en dashes to pretty dashes
                        reg: '–',
                        m: 'g',
                        exp: '-',// &ndash; -> hyphen
                    },{
                        reg: '(\\s)-{1,3} ',
                        m: 'g',
                        exp: '$1— ',// hyphen -> &mdash;
                    },{
                        reg: '(\\d)--(\\d)',
                        m: 'g',
                        exp: '$1—$2',// -> &mdash;
                    },{
                        reg: '(\\s)-(\\d)',
                        m: 'g',
                        exp: '$1−$2',// hyphen -> minus
                    },{
                        // Year and century ranges
                        reg: '(\\(|\\s)([12]?\\d{3})[\\u00A0 ]?(-{1,3}|—) ?([12]?\\d{3})(?![\\wА-ЯЁа-яё]|-[^ех]|-[ех][\\wА-ЯЁа-яё])',
                        m: 'g',
                        exp: '$1$2—$4',
                    },{
                        reg: '([12]?\\d{3}) ?(гг?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.en || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\(|\\s)([IVX]{1,5})[\\u00A0 ]?(-{1,3}|—) ?([IVX]{1,5})(?![\\w\\-])',
                        m: 'g',
                        exp: '$1$2—$4',
                    },{
                        reg: '([IVX]{1,5}) ?(вв?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.en || p.translations.ru ).u00A0 + '$2',
                    },{
                        // Reductions
                        reg: '(Т|т)\\.\\s?е\\.',
                        m: 'g',
                        exp: '$1о есть',
                    },{
                        reg: 'ISBN:\\s?(?=[\\d\\-]{8,17})',
                        m: '',
                        exp: 'ISBN ',
                    },{
                        // Insert/delete spaces
                        reg: '^([#*:]+)[ \\t\\f\\v]*(?!\\{\\|)([^ \\t\\f\\v*#:;])',
                        m: 'gm',
                        exp: '$1 $2',// space after #*: unless before table
                    },{
                        reg: '(\\S)[\\u00A0 \\t](-{1,3}|—)[\\u00A0 \\t](\\S)',
                        m: 'g',
                        exp: '$1' + ( p.translations.en || p.translations.ru ).u00A0 + '— $3',
                    },{
                        reg: '([A-Z]\\.) ?([A-Z]\\.) ?([A-Z][a-z])',
                        m: 'g',
                        exp: '$1' + ( p.translations.en || p.translations.ru ).u00A0 + '$2' + ( p.translations.en || p.translations.ru ).u00A0 + '$3',
                    },{
                        reg: '([A-Z]\\.)([A-Z]\\.)',
                        m: 'g',
                        exp: '$1 $2',
                    },{
                        reg: '([a-z]"?\\)?[\\.\\?!:])((?:\\x01\\d+\\x02\\|)?(?:[A-QS-Z]|R(?!u\\b)))',
                        m: 'g',
                        exp: '$1 $2',// "word. Word"; don't change in cases like "Газета.Ru"
                    },{
                        reg: '([)"a-z\\]²³])\\s*([,:])([\\[(a-z])',
                        m: 'g',
                        exp: '$1$2 $3',// "word, word", "word: word"; except ":"
                    },{
                        reg: '([)a-z\\]²³])\\s*([,:])"',
                        m: 'g',
                        exp: '$1$2 "',
                    },{
                        reg: '([)"a-z\\]²³])[ \\u00A0\\t]([,;])\\s([\\[("a-z])',
                        m: 'g',
                        exp: '$1$2 $3',
                    },{
                        reg: '([^%\\/\\wA-Za-z]\\d+?(?:[\\.,]\\d+?)?) ?([%‰])(?!-[A-Za-z])',
                        m: 'g',
                        exp: '$1' + ( p.translations.en || p.translations.ru ).u00A0 + '$2',//5 %
                    },{
                        reg: '(\\d) ([%‰])(?=-[A-Za-z])',
                        m: 'g',
                        exp: '$1$2',//5%-th
                    },{
                        reg: '([№§])(\\s*)(\\d)',
                        m: 'g',
                        exp: '$1' + ( p.translations.en || p.translations.ru ).u00A0 + '$3',
                    },{
                        // inside ()
                        reg: '\\( +',
                        m: 'g',
                        exp: '(',
                    },{
                        reg: ' +\\)',
                        m: 'g',
                        exp: ')',
                    },{
                        // Temperature
                        reg: '([\\s\\d=≈≠≤≥<>—("\'|])([+±−\\-]?\\d+?(?:[.,]\\d+?)?)(([ °\\^*]| [°\\^*])(C|F))(?=[\\s"\').,;!?|\\x01])',
                        m: 'gm',
                        exp: '$1$2' + ( p.translations.en || p.translations.ru ).u00A0 + '°$5',// '
                    },{
                        // Dot → comma in numbers
                        reg: '(\\s\\d+)\\.(\\d+[\\u00A0 ]*[%‰°×])',
                        m: 'gi',
                        exp: '$1,$2',
                    },
                ],
                stage8: [
                    {
                        reg: '([\\s\\x02!|#\'"\\/([{;+\\-])"([^"]*)([^\\s"([{|])"([^a-z])',
                        m: 'ig',
                        exp: '$1«$2$3»$4',// "
                    },
                ],
                stage9: [
                    {
                        reg: '«([^»]*)«([^»]*)»',
                        m: 'g',
                        exp: '«$1„$2“',
                    },
                ],
                stage10: [
                    {
                      reg: '\\x01(\\d+)\\x02',
                      m: 'g',
                      exp: unhide,
                    },
                ],
            },// regexps for r()
            u00A0: ( p.translations.en || p.translations.ru ).u00A0,
            u0301: ( p.translations.en || p.translations.ru ).u0301,
        },//en
        uk: {
            category: 'Категорія',
            file: 'Файл',
            wikificator: 'Вікіфікатор',
            wikificatorx: 'Вікіфікатор — автоматичний обробник тексту',
            wmfulltext: 'Вікіфікатор обробить ВЕСЬ текст на цій сторінці. Продовжити?',
            wmtalkpage: 'Вікіфікатор не обробляє сторінки обговорення цілком.\n\nВиділіть ваше повідомлення — оброблено буде тільки воно',
            // technical part starts below this line
            hidetags: 'nowiki,pre,source,syntaxhighlight,templatedata,code,kbd,tt,graph,hiero,math,timeline,chem,score,categorytree,inputbox,mapframe,maplink',
            rhide: {
                    stage1: [
                        {
                            reg: '^[ \\t].*',
                            m: 'mg',
                        },{
                            reg: '(https?|ftp|news|nntp|telnet|irc|gopher):\\/\\/[^\\s\\[\\]<>"]+ ?',
                            m: 'gi',
                        },{
                            reg: '^#(redirect|перенапр(авлення)?)',
                            m: 'i',
                        },
                    ],
                    stage2: [
                        {
                            reg: '\\[\\[[^\\]|]+',
                            m: 'g',// only link part
                        },
                    ],
                    stage3: [
                        {
                            reg: '<[a-z][^>]*?>',
                            m: 'gi',
                        },{
                            reg: '^(\\{\\||\\|\\-).*',
                            m: 'mg',// table/row def
                        },{
                            reg: '(^\\||^!|!!|\\|\\|) *[a-z]+=[^|]+\\|(?!\\|)',
                            m: 'mgi',// cell style
                        },{
                            reg: '\\| +',
                            m: 'g',// formatted cell
                        },
                    ],
            },// regexps for hide()
            rlcl: '[a-zа-яе]',
            rr: {
                stage1: [
                    {
                        reg: '\\{\\{(?:подст|subst):(?:[нН]а(?:голос)?|\')\\}\\}',
                        m: 'g',
                        exp: ( p.translations.uk || p.translations.ru ).u0301,
                    },{
                        reg: '( |\\n|\\r)+\\{\\{(·|•|\\*)\\}\\}',
                        m: 'g', // before {{·/•/*}}, usually in templates
                        exp: '{{$2}}',
                    },{
                        reg: '\\{\\{\\s*[Шш]аблон:([\\s\\S]+?)\\}\\}',
                        m: 'g',
                        exp: '{{$1}}',
                    },{
                        reg: '(\\{\\{\\s*)(?:reflist|список приміток)(\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1примітка$2',
                    },{
                        reg: '(\\{\\{\\s*)примітка(\\s*\\|\\s*)[4-9](\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1примітка$2вузькі$3',
                    },{
                        reg: '(\\{\\{\\s*)примітка\\s*\\|\\s*height=[0-9]*(\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1примітка$2',
                    },{
                        reg: '[\\u00A0 ]+(\\{\\{\\s*([Rr]ef-[a-z\\-]+?|[Ee]n icon|[Cc]hecked|[Vv]|[Пп]еревірено)\\}\\})',
                        m: 'g',
                        exp: '$1',
                    },{
                        reg: '<[\\/\\\\]?(hr|br)( [^\\/\\\\>]+?)? ?[\\/\\\\]?>',
                        m: 'gi',
                        exp: '<$1$2>',
                    },{
                        reg: '(\\| *Координати (?:витоку|гирла) *= *)(\\d+(?:\\.\\d+)?)[,/] ?(\\d+(?:\\.\\d+)?(?=\\s))',
                        m: 'g',
                        exp: function ( s, m1, m2, m3 ) {
                            return m1 + ( +parseFloat( m2 ).toFixed( 4 ) ) + '/' + ( +parseFloat( m3 ).toFixed( 4 ) );
                        },
                    },{
                        reg: '<noinclude>\\s*(\\{\\{[dD]ocpage\\}\\})\\s*<\\/noinclude>',
                        m: 'g',
                        exp: '$1',
                    },{
                        reg: '(\\| *(?:pp?|S|s|с|c|сторінки\\d?|pages\\d?|seite\\d?|alleseiten|листи\\d?|том|volume|band|випуск|issue|heft|номер|стовпці\\d?|columns\\d?|kolonnen\\d?|серія рік) *= *)(\\d+)[\\u00A0 ]?(?:-{1,3}|—) ?(\\d+)',
                        m: 'g',
                        exp: '$1$2—$3',
                    },{
                        reg: '(\\| *рік *= *)(\\d{4})[\\u00A0 ]?(?:-{1,3}|—) ?(\\d{4})',
                        m: 'g',
                        exp: '$1$2—$3',
                    },{
                        reg: '(\\[\\[[^\\{\\]|\\n]+){{!}}([^\\{\\]|\\n]+\\]\\])',
                        m: 'g',
                        exp: '$1|$2',
                    },
                ],
                stage2: [
                    {
                        reg: ' +(\\n|\\r)',
                        m: 'g',
                        exp: '$1',// spaces at EOL
                    },
                ],
                stage3: [
                    {
                        // LINKS
                        reg: '(\\[\\[:?)(category|категорія):( *)',
                        m: 'ig',
                        exp: '$1Категорія:'
                    },{
                        reg: '(\\[\\[:?)(module|модуль):( *)',
                        m: 'ig',
                        exp: '$1Модуль:',
                    },{
                        reg: '(\\[\\[:?)(template|шаблон):( *)',
                        m: 'ig',
                        exp: '$1Шаблон:',
                    },{
                        reg: '(\\[\\[:?)(image|зображення|file|файл):( *)',
                        m: 'ig',
                        exp: '$1Файл:',
                    },{
                        // Linked years, centuries and ranges
                        reg: '(\\(|\\s)(\\[\\[[12]?\\d{3}\\]\\])[\\u00A0 ]?(-{1,3}|–|—) ?(\\[\\[[12]?\\d{3}\\]\\])(\\W)',
                        m: 'g',
                        exp: '$1$2—$4$5',
                    },{
                        reg: '(\\[\\[[12]?\\d{3}\\]\\]) ?(рр?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\(|\\s)(\\[\\[[IVX]{1,5}\\]\\])[\\u00A0 ]?(-{1,3}|–|—) ?(\\[\\[[IVX]{1,5}\\]\\])(\\W)',
                        m: 'g',
                        exp: '$1$2—$4$5',
                    },{
                        reg: '(\\[\\[[IVX]{1,5}\\]\\]) ?(ст?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '\\[\\[(\\d+)\\]\\]\\sрік',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.uk || p.translations.ru ).u00A0 + 'рік]]',
                    },{
                        reg: '\\[\\[(\\d+)\\sрік\\|\\1\\]\\]\\sрік',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.uk || p.translations.ru ).u00A0 + 'рік]]',
                    },{
                        reg: '\\[\\[(\\d+)\\sрік\\|\\1\\sрік([а-я]{0,3})\\]\\]',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.uk || p.translations.ru ).u00A0 + 'рік]]$2',
                    },{
                        reg: '\\[\\[((\\d+)(?: (?:рік )?в [\\wa-яеА-ЯЕ ]+\\|\\2)?)\\]\\][\\u00A0 ](рік[а-яе]*)',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$3]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\]\\]\\sстоліття',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.uk || p.translations.ru ).u00A0 + 'століття]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\sстоліття\\|\\1\\]\\]\\sстоліття',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.uk || p.translations.ru ).u00A0 + 'століття]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\sстоліття\\|\\1\\sстоліття([а-я]{0,3})\\]\\]',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.uk || p.translations.ru ).u00A0 + 'століття]]$2',
                    },{
                        reg: '\\[\\[(([XVI]+) століття\\|\\2)\\]\\][\\u00A0 ]століття',
                        m: 'g',
                        exp: '[[$2' + ( p.translations.uk || p.translations.ru ).u00A0 + 'століття]]',
                    },{
                        // Nice links
                        reg: '(\\[\\[[^|[\\]]*)[\\u00AD\\u200E\\u200F]+([^\\[\\]]*\\]\\])',
                        m: 'g',
                        exp: '$1$2',// Soft Hyphen & DirMark
                    },{
                        reg: '\\[\\[ *([^|[\\]]+?) *\\| *(\'\'\'\'\'\\|\'\'\'|\'\')([^\'|[\\]]*)\\2 *]]',
                        m: 'g',
                        exp: '$2[[$1|$3]]$2',// move fomatting out of link text
                    },{
                        reg: '\\[\\[([^|[\\]\\n]+)\\|([^|[\\]\\n]+)\\]\\]',
                        m: 'g',
                        exp: processLink,// link shortening
                    },{
                        reg: '\\[\\[ *([^|[\\]]+)([^|\\[\\]()]+?) *\\| *\\1 *\\]\\]\\2',
                        m: 'g',
                        exp: '[[$1$2]]',// text repetition after link
                    },{
                        reg: '\\[\\[ *(?!Файл:|Категорія:)([a-zA-Zа-яеА-ЯЕ\\u00A0-\\u00FF %!\\"$&\'()*,\\-—.\\/0-9:;=?\\\\@\\^_`’~]+) *\\| *([^\\|\\[\\]]+) *\\]\\]([a-zа-яе]+)',
                        m: 'g',
                        exp: '[[$1|$2$3]]',// "
                    },
                ],
                stage4: [
                    {
                        // TAGS
                        reg: '<<(\\S.+\\S)>>',
                        m: 'g',
                        exp: '"$1"',// << >>
                    },{
                        reg: '(su[pb]>)-(\\d)',
                        m: 'g',
                        exp: '$1−$2',// ->minus
                    },{
                        reg: '<(b|strong)>(.*?)<\\/(b|strong)>',
                        m: 'gi',
                        exp: "'''$2'''",
                    },{
                        reg: '<(i|em)>(.*?)<\\/(i|em)>',
                        m: 'gi',
                        exp: "''$2''",
                    },{
                        reg: '^<hr ?\\/?>',
                        m: 'gim',
                        exp: '----',
                    },{
                        reg: '[\\u00A0 \\t]*<ref(?:\\s+name="")?(\\s|>)',
                        m: 'gi',
                        exp: '<ref$1',
                    },{
                        reg: '(\\n== *[a-zа-я\\s\\.:]+ *==\\n+)<references *\\/>',
                        m: 'ig',
                        exp: '$1{' + '{примітки}}',
                    },
                ],
                stage5: [
                    {
                        reg:'[ \\t\\u00A0]+',
                        m: 'g',
                        exp: ' ',// double spaces
                    },
                ],
                stage6: [
                    {
                        reg: ' &(#x[0-9a-f]{2,4}|#[0-9]{3,4}|[0-9a-z]{2,8});',
                        m: 'gi',
                        exp: 
                            function ( s ) {
                                var t = document.createElement( 'textarea' );
                                t.innerHTML = s;
                                var c = t.value;
                                if ( c.length === 1 && c.charCodeAt( 0 ) > 127 || s === '&#x20;' ) {
                                    return c;
                                }
                                return s;
                            },
                    },
                ],
                stage7: [
                    {
                        reg: '\\(tm\\)',
                        m: 'gi',
                        exp: '™',
                    },{
                        reg: '\\.\\.\\.',
                        m: 'g',
                        exp: '…',
                    },{
                        reg: '(^|[^+])\\+-(?!\\+|-)',
                        m: 'g',
                        exp: '$1±',
                    },{
                        reg: '~=',
                        m: 'g',
                        exp: '≈',
                    },{
                        reg: '\\^2(\\D)',
                        m: 'g',
                        exp: '²$1',
                    },{
                        reg: '\\^3(\\D)',
                        m: 'g',
                        exp: '³$1',
                    },{
                        reg: '(\\s)кв\\.\\s*(дм|см|мм|мкм|нм|км|м)(\\s)',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2²$3',
                    },{
                        reg: '(\\s)куб\\.\\s*(дм|см|мм|мкм|нм|км|м)(\\s)',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2³$3',
                    },{
                        reg: '((?:^|[\\s"])\\d+(?:[\\.,]\\d+)?)\\s*[xх]\\s*(\\d+(?:[\\.,]\\d+)?)\\s*([мm]{1,2}(?:[\\s"\\.,;?!]|$))',
                        m: 'g',
                        exp: '$1×$2' + ( p.translations.uk || p.translations.ru ).u00A0 + '$3',
                    },{
                        reg: '\\s+×\\s+',
                        m: 'g',
                        exp: ( p.translations.uk || p.translations.ru ).u00A0 + '×' + ( p.translations.uk || p.translations.ru ).u00A0,
                    },{
                        reg: '([\\wа-яА-ЯеЕ])\'(?=[\\wа-яА-ЯеЕ])',
                        m: 'g',
                        exp: '$1’',// '
                    },{
                        reg: '№№',
                        m: 'g',
                        exp: '№',
                    },{
                        // Headings
                        reg: '^(=+)[ \\t\\f\\v]*(.*?)[ \\t\\f\\v]*=+$',
                        m: 'gm',
                        exp: '$1 $2 $1',// add spaces inside
                    },{
                        reg: '([^\\r\\n])(\\r?\\n==.+==\\r?\\n)',
                        m: 'g',
                        exp: '$1\n$2',// add empty line before
                    },{
                        reg: '(==.+==)[\\r\\n]{2,}(?!=)',
                        m: 'g',
                        exp: '$1\n',// remove empty line after
                    },{
                        reg: '^== див(\\.?|ись|іться) ?також ==$',
                        m: 'gmi',
                        exp: '== Див. також ==',
                    },{
                        reg: '^== виноски ==$',
                        m: 'gmi',
                        exp: '== Примітки ==',
                    },{
                        reg: '^== зовнішні\\sпосилання ==$',
                        m: 'gmi',
                        exp: '== Посилання ==',
                    },{
                        reg: '^== (?:(.+[^.])\\.|(.+):) ==$',
                        m: 'gm',
                        exp: '== $1$2 ==',
                    },{
                        reg: "^== '''(?!.*'''.*''')(.+)''' ==$",
                        m: 'gm',
                        exp: '== $1 ==',
                    },{
                        reg: '«|»|“|”|„',
                        m: 'g',
                        exp: '"',// temp
                    },{
                        // Hyphens and en dashes to pretty dashes
                        reg: '–',
                        m: 'g',
                        exp: '-',// &ndash; -> hyphen
                    },{
                        reg: '(\\s)-{1,3} ',
                        m: 'g',
                        exp: '$1— ',// hyphen -> &mdash;
                    },{
                        reg: '(\\d)--(\\d)',
                        m: 'g',
                        exp: '$1—$2',// -> &mdash;
                    },{
                        reg: '(\\s)-(\\d)',
                        m: 'g',
                        exp: '$1−$2',// hyphen -> minus
                    },{
                        // Year and century ranges
                        reg: '(\\(|\\s)([12]?\\d{3})[\\u00A0 ]?(-{1,3}|—) ?([12]?\\d{3})(?![\\wА-ЯЕа-яе]|-[^ех]|-[ех][\\wА-ЯЕа-яе])',
                        m: 'g',
                        exp: '$1$2—$4',
                    },{
                        reg: '([12]?\\d{3}) ?(рр?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\(|\\s)([IVX]{1,5})[\\u00A0 ]?(-{1,3}|—) ?([IVX]{1,5})(?![\\w\\-])',
                        m: 'g',
                        exp: '$1$2—$4',
                    },{
                        reg: '([IVX]{1,5}) ?(ст?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(Т|т)\\.\\s?к\\.',
                        m: 'g',
                        exp: 'оскільки',
                    },{
                        reg: '(В|в)\\sт\\. ?ч\\.',
                        m: 'g',
                        exp: '$1 тому числі',
                    },{// omit the dot, if in the middle of the sentence
                        reg: '(І|і)\\sт\\.\\s?д\\.(?=\\s?[^\\wА-ЯҐЄІЇ\\n<]{2})',
                        m: 'g',
                        exp: 'тощо',
                    },{// add the full stop dot for any other cases
                        reg: '(І|і)\\sт\\.\\s?д\\.',
                        m: 'g',
                        exp: 'тощо.',
                    },{
                        reg: '(І|і)\\sт\\.\\s?п\\.',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + 'т.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'п.',
                    },{
                        reg: '(Т|т)\\.\\s?з\\.',
                        m: 'g',
                        exp: '$1.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'з.',
                    },{
                        reg: '(В|в)\\.\\s?о\\.',
                        m: 'g',
                        exp: '$1.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'о.',
                    },{
                        reg: 'пн\\.\\s?ш\\.',
                        m: 'g',
                        exp: 'пн.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'ш.',
                    },{
                        reg: 'пд\\.\\s?ш\\.',
                        m: 'g',
                        exp: 'пд.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'ш.',
                    },{
                        reg: 'сх\\.\\s?д\\.',
                        m: 'g',
                        exp: 'сх.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'д.',
                    },{
                        reg: 'зх\\.\\s?д\\.',
                        m: 'g',
                        exp: 'зх.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'д.',
                    },{
                        reg: 'к\\.\\s?с\\.',
                        m: 'g',
                        exp: 'к.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'с.',
                    },{
                        reg: 'а\\.\\s?о\\.\\s?м\\.',
                        m: 'g',
                        exp: 'а.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'о.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'м.',
                    },{
                        reg: 'а\\.\\s?о\\.',
                        m: 'g',
                        exp: 'а.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'о.',
                    },{
                        reg: 'мм\\sрт\\.\\s?ст\\.',
                        m: 'g',
                        exp: 'мм' + ( p.translations.uk || p.translations.ru ).u00A0 + 'рт.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'ст.',
                    },{
                        reg: 'н\\.\\s?е(\\.|(?=\\s))',
                        m: 'g',
                        exp: 'н.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'е.',
                    },{
                        reg: '(Д|д)(о|\\.)\\sн\\.\\s?е\\.',
                        m: 'g',
                        exp: '$1о' + ( p.translations.uk || p.translations.ru ).u00A0 + 'н.' + ( p.translations.uk || p.translations.ru ).u00A0 + 'е.',
                    },{
                        reg: '(\\d)[\\u00A0 ]?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]г)\\.?(?=[,;.]| "?[а-яе\\-])',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\d)[\\u00A0 ](тис)([^\\.А-Яа-яЕе])',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2.$3',
                    },{
                        reg: 'ISBN:\\s?(?=[\\d\\-]{8,17})',
                        m: '',
                        exp: 'ISBN ',
                    },{
                        // Insert/delete spaces
                        reg: '^([#*:]+)[ \\t\\f\\v]*(?!\\{\\|)([^ \\t\\f\\v*#:;])',
                        m: 'gm',
                        exp: '$1 $2',// space after #*: unless before table
                    },{
                        reg: '(\\S)[\\u00A0 \\t](-{1,3}|—)[\\u00A0 \\t](\\S)',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '— $3',
                    },{
                        reg: '([А-ЯЕ]\\.) ?([А-ЯЕ]\\.) ?([А-ЯЕ][а-яе])',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2' + ( p.translations.uk || p.translations.ru ).u00A0 + '$3',
                    },{
                        reg: '([А-ЯЕ]\\.)([А-ЯЕ]\\.)',
                        m: 'g',
                        exp: '$1 $2',
                    },{
                        reg: '([а-яе]"?\\)?[\\.\\?!:])((?:\\x01\\d+\\x02\\|)?(?:[A-QS-ZА-ЯЕ]|R(?!u\\b)))',
                        m: 'g',
                        exp: '$1 $2',// "word. Word"; don't change in cases like "Газета.Ru"
                    },{
                        reg: '([)"a-zа-яе\\]²³])\\s*([,:])([\\[(a-zа-яе])',
                        m: 'g',
                        exp: '$1$2 $3',// "word, word", "word: word"; except ":"
                    },{
                        reg: '([)a-zа-яе\\]²³])\\s*([,:])"',
                        m: 'g',
                        exp: '$1$2 "',
                    },{
                        reg: '([)"a-zа-яе\\]²³])[ \\u00A0\\t]([,;])\\s([\\[("a-zа-яе])',
                        m: 'g',
                        exp: '$1$2 $3',
                    },{
                        reg: '([^%\\/\\wА-Яа-яЕе]\\d+?(?:[\\.,]\\d+?)?) ?([%‰])(?!-[А-Яа-яЕе])',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$2',//5 %
                    },{
                        reg: '(\\d) ([%‰])(?=-[А-Яа-яЕе])',
                        m: 'g',
                        exp: '$1$2',//5%-й
                    },{
                        reg: '([№§])(\\s*)(\\d)',
                        m: 'g',
                        exp: '$1' + ( p.translations.uk || p.translations.ru ).u00A0 + '$3',
                    },{
                        // inside ()
                        reg: '\\( +',
                        m: 'g',
                        exp: '(',
                    },{
                        reg: ' +\\)',
                        m: 'g',
                        exp: ')',
                    },{
                        // Temperature
                        reg: '([\\s\\d=≈≠≤≥<>—("\'|])([+±−\\-]?\\d+?(?:[.,]\\d+?)?)(([ °\\^*]| [°\\^*])(C|F))(?=[\\s"\').,;!?|\\x01])',
                        m: 'gm',
                        exp: '$1$2' + ( p.translations.uk || p.translations.ru ).u00A0 + '°$5',// '
                    },{
                        // Dot → comma in numbers
                        reg: '(\\s\\d+)\\.(\\d+[\\u00A0 ]*[%‰°×])',
                        m: 'gi',
                        exp: '$1,$2',
                    },
                ],
                stage8: [
                    {
                        reg: '([\\s\\x02!|#\'"\\/([{;+\\-])"([^"]*)([^\\s"([{|])"([^a-zа-яё])',
                        m: 'ig',
                        exp: '$1«$2$3»$4',// "
                    },
                ],
                stage9: [
                    {
                        reg: '«([^»]*)«([^»]*)»',
                        m: 'g',
                        exp: '«$1„$2“',
                    },
                ],
                stage10: [
                    {
                      reg: '\\x01(\\d+)\\x02',
                      m: 'g',
                      exp: unhide,
                    },
                ],
            },// regexps for r()
            u00A0: ( p.translations.uk || p.translations.ru ).u00A0,
            u0301: ( p.translations.uk || p.translations.ru ).u0301,
        },//uk
        be: {
            category: 'Катэгорыя',
            file: 'Файл',
            wikificator: 'Вікіфікатар',
            wikificatorx: 'Вікіфікатар — аўтаматычны апрацоўнік тэксту',
            wmfulltext: 'Вікіфікатар апрацуе ЎВЕСЬ тэкст на гэтай старонцы. Прадоўжыць?',
            wmtalkpage: 'Вікіфікатар не апрацоўвае старонкі абмеркавання цаліком.\n\nВылучыце ваша паведамленне — апрацавана будзе толькі яно',
            // technical part starts below this line
            hidetags: 'nowiki,pre,source,syntaxhighlight,templatedata,code,kbd,tt,graph,hiero,math,timeline,chem,score,categorytree,inputbox,mapframe,maplink',
            rhide: {
                    stage1: [
                        {
                            reg: '^[ \\t].*',
                            m: 'mg',
                        },{
                            reg: '(https?|ftp|news|nntp|telnet|irc|gopher):\\/\\/[^\\s\\[\\]<>"]+ ?',
                            m: 'gi',
                        },{
                            reg: '^#(redirect|перанакір(аванне)?)',
                            m: 'i',
                        },
                    ],
                    stage2: [
                        {
                            reg: '\\[\\[[^\\]|]+',
                            m: 'g',// only link part
                        },
                    ],
                    stage3: [
                        {
                            reg: '<[a-z][^>]*?>',
                            m: 'gi',
                        },{
                            reg: '^(\\{\\||\\|\\-).*',
                            m: 'mg',// table/row def
                        },{
                            reg: '(^\\||^!|!!|\\|\\|) *[a-z]+=[^|]+\\|(?!\\|)',
                            m: 'mgi',// cell style
                        },{
                            reg: '\\| +',
                            m: 'g',// formatted cell
                        },
                    ],
            },// regexps for hide()
            rlcl: '[a-zа-яё]',
            rr: {
                stage1: [
                    {
                        reg: '\\{\\{(?:подст|subst):(?:[нН]а(?:ціск)?|\')\\}\\}',
                        m: 'g',
                        exp: ( p.translations.be || p.translations.ru ).u0301,
                    },{
                        reg: '( |\\n|\\r)+\\{\\{(·|•|\\*)\\}\\}',
                        m: 'g', // before {{·/•/*}}, usually in templates
                        exp: '{{$2}}',
                    },{
                        reg: '\\{\\{\\s*[Шш]аблон:([\\s\\S]+?)\\}\\}',
                        m: 'g',
                        exp: '{{$1}}',
                    },{
                        reg: '(\\{\\{\\s*)(?:reflist|спіс нататак)(\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1нататкі$2',
                    },{
                        reg: '(\\{\\{\\s*)нататкі(\\s*\\|\\s*)[4-9](\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1нататкі$2вузкія$3',
                    },{
                        reg: '(\\{\\{\\s*)нататкі\\s*\\|\\s*height=[0-9]*(\\s*[\\|\\}])',
                        m: 'ig',
                        exp: '$1нататкі$2',
                    },{
                        reg: '[\\u00A0 ]+(\\{\\{\\s*([Rr]ef-[a-z\\-]+?|[Ee]n icon|[Cc]hecked|[Vv]|[Пп]раверана)\\}\\})',
                        m: 'g',
                        exp: '$1',
                    },{
                        reg: '<[\\/\\\\]?(hr|br)( [^\\/\\\\>]+?)? ?[\\/\\\\]?>',
                        m: 'gi',
                        exp: '<$1$2>',
                    },{
                        reg: '(\\| *Каардынаты (?:вытоку|утокі) *= *)(\\d+(?:\\.\\d+)?)[,/] ?(\\d+(?:\\.\\d+)?(?=\\s))',
                        m: 'g',
                        exp: function ( s, m1, m2, m3 ) {
                            return m1 + ( +parseFloat( m2 ).toFixed( 4 ) ) + '/' + ( +parseFloat( m3 ).toFixed( 4 ) );
                        },
                    },{
                        reg: '<noinclude>\\s*(\\{\\{[dD]ocpage\\}\\})\\s*<\\/noinclude>',
                        m: 'g',
                        exp: '$1',
                    },{
                        reg: '(\\| *(?:pp?|S|s|с|c|старонкі\\d?|pages\\d?|seite\\d?|alleseiten|лісты\\d?|тым|volume|band|выпуск|issue|heft|нумар|калонкі\\d?|columns\\d?|kolonnen\\d?|серыя год) *= *)(\\d+)[\\u00A0 ]?(?:-{1,3}|—) ?(\\d+)',
                        m: 'g',
                        exp: '$1$2—$3',
                    },{
                        reg: '(\\| *год *= *)(\\d{4})[\\u00A0 ]?(?:-{1,3}|—) ?(\\d{4})',
                        m: 'g',
                        exp: '$1$2—$3',
                    },{
                        reg: '(\\[\\[[^\\{\\]|\\n]+){{!}}([^\\{\\]|\\n]+\\]\\])',
                        m: 'g',
                        exp: '$1|$2',
                    },
                ],
                stage2: [
                    {
                        reg: ' +(\\n|\\r)',
                        m: 'g',
                        exp: '$1',// spaces at EOL
                    },
                ],
                stage3: [
                    {
                        // LINKS
                        reg: '(\\[\\[:?)(category|катэгорыя):( *)',
                        m: 'ig',
                        exp: '$1Катэгорыя:'
                    },{
                        reg: '(\\[\\[:?)(module|модуль):( *)',
                        m: 'ig',
                        exp: '$1Модуль:',
                    },{
                        reg: '(\\[\\[:?)(template|шаблон):( *)',
                        m: 'ig',
                        exp: '$1Шаблон:',
                    },{
                        reg: '(\\[\\[:?)(image|выява|file|файл):( *)',
                        m: 'ig',
                        exp: '$1Выява:',
                    },{
                        // Linked years, centuries and ranges
                        reg: '(\\(|\\s)(\\[\\[[12]?\\d{3}\\]\\])[\\u00A0 ]?(-{1,3}|–|—) ?(\\[\\[[12]?\\d{3}\\]\\])(\\W)',
                        m: 'g',
                        exp: '$1$2—$4$5',
                    },{
                        reg: '(\\[\\[[12]?\\d{3}\\]\\]) ?(гг?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\(|\\s)(\\[\\[[IVX]{1,5}\\]\\])[\\u00A0 ]?(-{1,3}|–|—) ?(\\[\\[[IVX]{1,5}\\]\\])(\\W)',
                        m: 'g',
                        exp: '$1$2—$4$5',
                    },{
                        reg: '(\\[\\[[IVX]{1,5}\\]\\]) ?(стст?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '\\[\\[(\\d+)\\]\\]\\sгод',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.be || p.translations.ru ).u00A0 + 'год]]',
                    },{
                        reg: '\\[\\[(\\d+)\\sгод\\|\\1\\]\\]\\sгод',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.be || p.translations.ru ).u00A0 + 'год]]',
                    },{
                        reg: '\\[\\[(\\d+)\\sгод\\|\\1\\sгод([а-я]{0,3})\\]\\]',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.be || p.translations.ru ).u00A0 + 'год]]$2',
                    },{
                        reg: '\\[\\[((\\d+)(?: (?:год )?в [\\wa-яёА-ЯЁ ]+\\|\\2)?)\\]\\][\\u00A0 ](год[а-яё]*)',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$3]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\]\\]\\sстагоддзе',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.be || p.translations.ru ).u00A0 + 'стагоддзе]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\sстагоддзе\\|\\1\\]\\]\\sстагоддзе',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.be || p.translations.ru ).u00A0 + 'стагоддзе]]',
                    },{
                        reg: '\\[\\[([XVI]+)\\sстагоддзе\\|\\1\\sстагоддзе([а-я]{0,3})\\]\\]',
                        m: 'g',
                        exp: '[[$1' + ( p.translations.be || p.translations.ru ).u00A0 + 'стагоддзе]]$2',
                    },{
                        reg: '\\[\\[(([XVI]+) стагоддзе\\|\\2)\\]\\][\\u00A0 ]стагоддзе',
                        m: 'g',
                        exp: '[[$2' + ( p.translations.be || p.translations.ru ).u00A0 + 'стагоддзе]]',
                    },{
                        // Nice links
                        reg: '(\\[\\[[^|[\\]]*)[\\u00AD\\u200E\\u200F]+([^\\[\\]]*\\]\\])',
                        m: 'g',
                        exp: '$1$2',// Soft Hyphen & DirMark
                    },{
                        reg: '\\[\\[ *([^|[\\]]+?) *\\| *(\'\'\'\'\'\\|\'\'\'|\'\')([^\'|[\\]]*)\\2 *]]',
                        m: 'g',
                        exp: '$2[[$1|$3]]$2',// move fomatting out of link text
                    },{
                        reg: '\\[\\[([^|[\\]\\n]+)\\|([^|[\\]\\n]+)\\]\\]',
                        m: 'g',
                        exp: processLink,// link shortening
                    },{
                        reg: '\\[\\[ *([^|[\\]]+)([^|\\[\\]()]+?) *\\| *\\1 *\\]\\]\\2',
                        m: 'g',
                        exp: '[[$1$2]]',// text repetition after link
                    },{
                        reg: '\\[\\[ *(?!Выява:|Катэгорыя:)([a-zA-Zа-яёА-ЯЁ\\u00A0-\\u00FF %!\\"$&\'()*,\\-—.\\/0-9:;=?\\\\@\\^_`’~]+) *\\| *([^\\|\\[\\]]+) *\\]\\]([a-zа-яё]+)',
                        m: 'g',
                        exp: '[[$1|$2$3]]',// "
                    },
                ],
                stage4: [
                    {
                        // TAGS
                        reg: '<<(\\S.+\\S)>>',
                        m: 'g',
                        exp: '"$1"',// << >>
                    },{
                        reg: '(su[pb]>)-(\\d)',
                        m: 'g',
                        exp: '$1−$2',// ->minus
                    },{
                        reg: '<(b|strong)>(.*?)<\\/(b|strong)>',
                        m: 'gi',
                        exp: "'''$2'''",
                    },{
                        reg: '<(i|em)>(.*?)<\\/(i|em)>',
                        m: 'gi',
                        exp: "''$2''",
                    },{
                        reg: '^<hr ?\\/?>',
                        m: 'gim',
                        exp: '----',
                    },{
                        reg: '[\\u00A0 \\t]*<ref(?:\\s+name="")?(\\s|>)',
                        m: 'gi',
                        exp: '<ref$1',
                    },{
                        reg: '(\\n== *[a-zа-я\\s\\.:]+ *==\\n+)<references *\\/>',
                        m: 'ig',
                        exp: '$1{' + '{нататкі}}',
                    },
                ],
                stage5: [
                    {
                        reg:'[ \\t\\u00A0]+',
                        m: 'g',
                        exp: ' ',// double spaces
                    },
                ],
                stage6: [
                    {
                        reg: ' &(#x[0-9a-f]{2,4}|#[0-9]{3,4}|[0-9a-z]{2,8});',
                        m: 'gi',
                        exp: 
                            function ( s ) {
                                var t = document.createElement( 'textarea' );
                                t.innerHTML = s;
                                var c = t.value;
                                if ( c.length === 1 && c.charCodeAt( 0 ) > 127 || s === '&#x20;' ) {
                                    return c;
                                }
                                return s;
                            },
                    },
                ],
                stage7: [
                    {
                        reg: '\\(tm\\)',
                        m: 'gi',
                        exp: '™',
                    },{
                        reg: '\\.\\.\\.',
                        m: 'g',
                        exp: '…',
                    },{
                        reg: '(^|[^+])\\+-(?!\\+|-)',
                        m: 'g',
                        exp: '$1±',
                    },{
                        reg: '~=',
                        m: 'g',
                        exp: '≈',
                    },{
                        reg: '\\^2(\\D)',
                        m: 'g',
                        exp: '²$1',
                    },{
                        reg: '\\^3(\\D)',
                        m: 'g',
                        exp: '³$1',
                    },{
                        reg: '(\\s)кв\\.\\s*(дм|см|мм|мкм|нм|км|м)(\\s)',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2²$3',
                    },{
                        reg: '(\\s)куб\\.\\s*(дм|см|мм|мкм|нм|км|м)(\\s)',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2³$3',
                    },{
                        reg: '((?:^|[\\s"])\\d+(?:[\\.,]\\d+)?)\\s*[xх]\\s*(\\d+(?:[\\.,]\\d+)?)\\s*([мm]{1,2}(?:[\\s"\\.,;?!]|$))',
                        m: 'g',
                        exp: '$1×$2' + ( p.translations.be || p.translations.ru ).u00A0 + '$3',
                    },{
                        reg: '\\s+×\\s+',
                        m: 'g',
                        exp: ( p.translations.be || p.translations.ru ).u00A0 + '×' + ( p.translations.be || p.translations.ru ).u00A0,
                    },{
                        reg: '([\\wа-яА-ЯёЁ])\'(?=[\\wа-яА-ЯёЁ])',
                        m: 'g',
                        exp: '$1’',// '
                    },{
                        reg: '№№',
                        m: 'g',
                        exp: '№',
                    },{
                        // Headings
                        reg: '^(=+)[ \\t\\f\\v]*(.*?)[ \\t\\f\\v]*=+$',
                        m: 'gm',
                        exp: '$1 $2 $1',// add spaces inside
                    },{
                        reg: '([^\\r\\n])(\\r?\\n==.+==\\r?\\n)',
                        m: 'g',
                        exp: '$1\n$2',// add empty line before
                    },{
                        reg: '(==.+==)[\\r\\n]{2,}(?!=)',
                        m: 'g',
                        exp: '$1\n',// remove empty line after
                    },{
                        reg: '^== гл(\\.?|ядзі|ядзіце) ?таксама ==$',
                        m: 'gmi',
                        exp: '== Гл. таксама ==',
                    },{
                        reg: '^== зноскі ==$',
                        m: 'gmi',
                        exp: '== Нататкі ==',
                    },{
                        reg: '^== вонкавыя\\sспасылкі ==$',
                        m: 'gmi',
                        exp: '== Спасылкі ==',
                    },{
                        reg: '^== (?:(.+[^.])\\.|(.+):) ==$',
                        m: 'gm',
                        exp: '== $1$2 ==',
                    },{
                        reg: "^== '''(?!.*'''.*''')(.+)''' ==$",
                        m: 'gm',
                        exp: '== $1 ==',
                    },{
                        reg: '«|»|“|”|„',
                        m: 'g',
                        exp: '"',// temp
                    },{
                        // Hyphens and en dashes to pretty dashes
                        reg: '–',
                        m: 'g',
                        exp: '-',// &ndash; -> hyphen
                    },{
                        reg: '(\\s)-{1,3} ',
                        m: 'g',
                        exp: '$1— ',// hyphen -> &mdash;
                    },{
                        reg: '(\\d)--(\\d)',
                        m: 'g',
                        exp: '$1—$2',// -> &mdash;
                    },{
                        reg: '(\\s)-(\\d)',
                        m: 'g',
                        exp: '$1−$2',// hyphen -> minus
                    },{
                        // Year and century ranges
                        reg: '(\\(|\\s)([12]?\\d{3})[\\u00A0 ]?(-{1,3}|—) ?([12]?\\d{3})(?![\\wА-ЯЁа-яё]|-[^ех]|-[ех][\\wА-ЯЁа-яё])',
                        m: 'g',
                        exp: '$1$2—$4',
                    },{
                        reg: '([12]?\\d{3}) ?(гг?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\(|\\s)([IVX]{1,5})[\\u00A0 ]?(-{1,3}|—) ?([IVX]{1,5})(?![\\w\\-])',
                        m: 'g',
                        exp: '$1$2—$4',
                    },{
                        reg: '([IVX]{1,5}) ?(стст?\\.)',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2',
                    },{
                        // Reductions
                        reg: '(Г|г)\\.\\s?з\\.',
                        m: 'g',
                        exp: '$1эта значыць',
                    },{
                        reg: '(Т|т)\\.\\s?к\\.',
                        m: 'g',
                        exp: 'бо',
                    },{
                        reg: '(У|у)\\sт\\. ?л\\.',
                        m: 'g',
                        exp: '$1 тым ліку',
                    },{
                        reg: '(І|і)\\sг\\.\\s?д\\.',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + 'г.' + ( p.translations.be || p.translations.ru ).u00A0 + 'д.',
                    },{
                        reg: '(І|і)\\sт\\.\\s?п\\.',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0+ 'да' + 'т.' + ( p.translations.be || p.translations.ru ).u00A0 + 'п.',
                    },{
                        reg: '(Т|т)\\.\\s?зв\\.',
                        m: 'g',
                        exp: '$1.' + ( p.translations.be || p.translations.ru ).u00A0 + 'зв.',
                    },{
                        reg: '(В|в)\\.\\s?а\\.',
                        m: 'g',
                        exp: '$1.' + ( p.translations.be || p.translations.ru ).u00A0 + 'а.',
                    },{
                        reg: 'пн\\.\\s?ш\\.',
                        m: 'g',
                        exp: 'пн.' + ( p.translations.be || p.translations.ru ).u00A0 + 'ш.',
                    },{
                        reg: 'пд\\.\\s?ш\\.',
                        m: 'g',
                        exp: 'пд.' + ( p.translations.be || p.translations.ru ).u00A0 + 'ш.',
                    },{
                        reg: 'у\\.\\s?д\\.',
                        m: 'g',
                        exp: 'у.' + ( p.translations.be || p.translations.ru ).u00A0 + 'д.',
                    },{
                        reg: 'з\\.\\s?д\\.',
                        m: 'g',
                        exp: 'з.' + ( p.translations.be || p.translations.ru ).u00A0 + 'д.',
                    },{
                        reg: 'к\\.\\s?с\\.',
                        m: 'g',
                        exp: 'к.' + ( p.translations.be || p.translations.ru ).u00A0 + 'с.',
                    },{
                        reg: 'а\\.\\s?а\\.\\s?м\\.',
                        m: 'g',
                        exp: 'а.' + ( p.translations.be || p.translations.ru ).u00A0 + 'а.' + ( p.translations.be || p.translations.ru ).u00A0 + 'м.',
                    },{
                        reg: 'а\\.\\s?а\\.',
                        m: 'g',
                        exp: 'а.' + ( p.translations.be || p.translations.ru ).u00A0 + 'а.',
                    },{
                        reg: 'мм\\sрт\\.\\s?сл\\.',
                        m: 'g',
                        exp: 'мм' + ( p.translations.be || p.translations.ru ).u00A0 + 'рт.' + ( p.translations.be || p.translations.ru ).u00A0 + 'сл.',
                    },{
                        reg: 'н\\.\\s?э(\\.|(?=\\s))',
                        m: 'g',
                        exp: 'н.' + ( p.translations.be || p.translations.ru ).u00A0 + 'э.',
                    },{
                        reg: '(Д|д)(а|\\.)\\sн\\.\\s?э\\.',
                        m: 'g',
                        exp: '$1а' + ( p.translations.be || p.translations.ru ).u00A0 + 'н.' + ( p.translations.be || p.translations.ru ).u00A0 + 'э.',
                    },{
                        reg: '(\\d)[\\u00A0 ]?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]г)\\.?(?=[,;.]| "?[а-яё\\-])',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2',
                    },{
                        reg: '(\\d)[\\u00A0 ](тыс)([^\\.А-Яа-яЁё])',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2.$3',
                    },{
                        reg: 'ISBN:\\s?(?=[\\d\\-]{8,17})',
                        m: '',
                        exp: 'ISBN ',
                    },{
                        // Insert/delete spaces
                        reg: '^([#*:]+)[ \\t\\f\\v]*(?!\\{\\|)([^ \\t\\f\\v*#:;])',
                        m: 'gm',
                        exp: '$1 $2',// space after #*: unless before table
                    },{
                        reg: '(\\S)[\\u00A0 \\t](-{1,3}|—)[\\u00A0 \\t](\\S)',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '— $3',
                    },{
                        reg: '([А-ЯЁ]\\.) ?([А-ЯЁ]\\.) ?([А-ЯЁ][а-яё])',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2' + ( p.translations.be || p.translations.ru ).u00A0 + '$3',
                    },{
                        reg: '([А-ЯЁ]\\.)([А-ЯЁ]\\.)',
                        m: 'g',
                        exp: '$1 $2',
                    },{
                        reg: '([а-яё]"?\\)?[\\.\\?!:])((?:\\x01\\d+\\x02\\|)?(?:[A-QS-ZА-ЯЁ]|R(?!u\\b)))',
                        m: 'g',
                        exp: '$1 $2',// "word. Word"; don't change in cases like "Газета.Ru"
                    },{
                        reg: '([)"a-zа-яё\\]²³])\\s*([,:])([\\[(a-zа-яё])',
                        m: 'g',
                        exp: '$1$2 $3',// "word, word", "word: word"; except ":"
                    },{
                        reg: '([)a-zа-яё\\]²³])\\s*([,:])"',
                        m: 'g',
                        exp: '$1$2 "',
                    },{
                        reg: '([)"a-zа-яё\\]²³])[ \\u00A0\\t]([,;])\\s([\\[("a-zа-яё])',
                        m: 'g',
                        exp: '$1$2 $3',
                    },{
                        reg: '([^%\\/\\wА-Яа-яЁё]\\d+?(?:[\\.,]\\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$2',//5 %
                    },{
                        reg: '(\\d) ([%‰])(?=-[А-Яа-яЁё])',
                        m: 'g',
                        exp: '$1$2',//5%-ы
                    },{
                        reg: '([№§])(\\s*)(\\d)',
                        m: 'g',
                        exp: '$1' + ( p.translations.be || p.translations.ru ).u00A0 + '$3',
                    },{
                        // inside ()
                        reg: '\\( +',
                        m: 'g',
                        exp: '(',
                    },{
                        reg: ' +\\)',
                        m: 'g',
                        exp: ')',
                    },{
                        // Temperature
                        reg: '([\\s\\d=≈≠≤≥<>—("\'|])([+±−\\-]?\\d+?(?:[.,]\\d+?)?)(([ °\\^*]| [°\\^*])(C|F))(?=[\\s"\').,;!?|\\x01])',
                        m: 'gm',
                        exp: '$1$2' + ( p.translations.be || p.translations.ru ).u00A0 + '°$5',// '
                    },{
                        // Dot → comma in numbers
                        reg: '(\\s\\d+)\\.(\\d+[\\u00A0 ]*[%‰°×])',
                        m: 'gi',
                        exp: '$1,$2',
                    },
                ],
                stage8: [
                    {
                        reg: '([\\s\\x02!|#\'"\\/([{;+\\-])"([^"]*)([^\\s"([{|])"([^a-zа-яё])',
                        m: 'ig',
                        exp: '$1«$2$3»$4',// "
                    },
                ],
                stage9: [
                    {
                        reg: '«([^»]*)«([^»]*)»',
                        m: 'g',
                        exp: '«$1„$2“',
                    },
                ],
                stage10: [
                    {
                      reg: '\\x01(\\d+)\\x02',
                      m: 'g',
                      exp: unhide,
                    },
                ],
            },// regexps for r()
            u00A0: ( p.translations.be || p.translations.ru ).u00A0,
            u0301: ( p.translations.be || p.translations.ru ).u0301,
        },//be
        // language list - stop
    };// translations
    
    p.cache = {};

    p.getLang = function () {
        return lang;
    };// getLang
    
    function setLang ( language ) {
        // too cool to be global
        if ( language === lang ) return;
        // () = current lang
        language = language || lang;
        lang = language;
        if ( p[ language ] ) {
            p.t = $.extend( {}, p[ language ] );
            return;
        }
        p.t = $.extend( {}, p.translations.qqx, p.translations.ru, p.translations[ language ] || p.translations.en );
        p[ language ] = $.extend( {}, p.t );// store lang
        p.cache[ language ] = {
            tags: [],
        };
    }// setLang
    
    //set default lang
    setLang();

    var wmFullText = p.t.wmfulltext,
        wmTalkPage = p.t.wmtalkpage;
    window.wfPlugins = window.wfPlugins || [];
    window.wfPluginsT = window.wfPluginsT || [];
    window.wikificator = p;
    
    p.log = function log () {
        if ( !p.debug ) return;
        var a = [].slice.call( arguments );
        a.unshift( 'wikify' );
        console.log.apply( this, a );
    };// log

    p.isVeActive = function isVeActive () {
        return p.isUcp && window.ve && ve.init && ve.init.target && ve.init.target.active;
    };// isVeActive
    
    p.isOldVeActive = function isOldVeActive () {
        // new ve doesn't have data().origtext
        var wikiEditor = $('#wpTextbox1').wikiEditor ? $('#wpTextbox1').wikiEditor() : null,
            weData = wikiEditor ? wikiEditor.data() : null;
        return weData && weData.hasOwnProperty('origtext');
    };// isOldVeActive

    p.activateSourceMode = function activateSourceMode () {
        // returns $.Deferred that resolved with ve surface
        var promise = $.Deferred();

        function asmHelper () {
            mw.hook( 've.wikitextInteractive' ).remove( asmHelper );
            p.surface = ve.init.target.getSurface();
            //p.createVEWikificatorTool();
            promise.resolve( p.surface );
        }// asmHelper
        
        if ( p.isVeActive() ) {
            if ( p.surface.getMode() === 'source' ) {
                // refresh surface data. just in case
                p.surface = ve.init.target.getSurface();
                promise.resolve( p.surface );
            } else {
                // activate source mode
                mw.hook( 've.wikitextInteractive' ).add( asmHelper );
                ve.init.target.editSource();
            }
        } else {
            promise.reject();
        }
        return promise.promise();
    };// activateSourceMode
    
    p.setContents = function ( t ) {
        if ( !p.isVeActive() ) return;
        var dm = p.surface.getModel(),
            fragment = dm.getLinearFragment( 
                new ve.Range( 1, dm.getDocument().getLength() ) 
            );
        fragment.insertContent( t );
    };// setContents

    // Function takes an input or text as an argument. If it is absent, it uses $( '#wpTextbox1' )
    // as an input.
    p.wikify = function wikify ( inputOrText ) {
        'use strict';

        var $input, text, caretPosition, textScroll,
            txt = '',
            winScroll = document.documentElement.scrollTop,
            $CodeMirrorVscrollbar = $( '.CodeMirror-vscrollbar' );
        
        hidden = [];
        // Check what's in the first parameter
        if ( typeof inputOrText === 'string' ) {
            text = inputOrText;
        } else {
            $input = $( ( inputOrText &&
                    ( ( inputOrText.nodeType && inputOrText.value !== undefined ) || // node
                        ( inputOrText.prop && inputOrText.prop( 'nodeType' ) ) // jQuery object
                    )
                ) ?
                inputOrText :
                '#wpTextbox1'
            );
            
            // if new ve
            if ( p.isVeActive() ) {
                text = p.surface.model.documentModel.data.getSourceText().trim();
            } else if ( p.isOldVeActive() ) {
                text = $input.val();
            } else {                
                text = $input.val();
            }
        }
        p.log( 'input', { i: $input, t: text } );


        // FUNCTIONS

        function r( r1, r2 ) {
            txt = txt.replace( r1, r2 );
        }

        function hide( re ) {
            r( re, function ( s ) {
                return '\x01' + hidden.push( s ) + '\x02';
            } );
        }

        function hideTag( tag ) {
            var rtag = p.cache[ lang ].tags[ tag ];
            if ( !rtag) {
                rtag = new RegExp( '<' + tag + '( [^>]+)?>[\\s\\S]+?<\\/' + tag + '>', 'gi' );
                p.cache[ lang ].tags[ tag ] = rtag;
            }
            hide( rtag );
        }

        function hideTags( tags ) {
            if ( !tags) return;
            if ( typeof( tags ) === 'string' ) tags = tags.split( ',' );
            if ( !tags.forEach ) return;
            p.log( 'hidetags', tags );
            tags.forEach(function( v ) {
                hideTag( v.trim() );
            });
        }
        
        function router( fn, obj, stage ) {
            // r/hide calls dispatcher
            // fn: method (r/hide); obj: rr/rhide; stage: 'stagex'
            p.log( 'rtr', fn.name, stage, obj[ stage ]);
            if ( obj[ stage ] && obj[ stage ].length ) {
                obj[ stage ].forEach(function( v ) {
                    fn( v.reg, v.exp );
                });
            }
        }

        function hideTemplates() {
            hide( /\{\{([^{]\{?)+?\}\}/g );
            var pos = 0,
                stack = [],
                tpl,
                left,
                right;
            while ( true ) {
                left = txt.indexOf( '{{', pos );
                right = txt.indexOf( '}}', pos );
                if ( left === -1 && right === -1 && !stack.length ) {
                    break;
                }
                if ( left !== -1 && ( left < right || right === -1 ) ) {
                    stack.push( left );
                    pos = left + 2;
                } else {
                    left = stack.pop();
                    if ( typeof left === 'undefined' ) {
                        if ( right === -1 ) {
                            pos += 2;
                            continue;
                        } else {
                            left = 0;
                        }
                    }
                    if ( right === -1 ) {
                        right = txt.length;
                    }
                    right += 2;
                    tpl = txt.substring( left, right );
                    txt = txt.substring( 0, left ) +
                        '\x01' + hidden.push( tpl ) + '\x02' +
                        txt.substr( right );
                    pos = right - tpl.length;
                }
            }
        }
        
        function processText() {
            p.log( 'processText', { text: txt } );
            var i,
                u = p.t.u00A0;//'\u00A0'; // non-breaking space
            if ( mw.config.get( 'wgNamespaceNumber' ) % 2 || mw.config.get( 'wgNamespaceNumber' ) === 4 ) { // is talk page
                var sigs = txt.match( /\d\d:\d\d, \d\d? \S{3,8} 20\d\d \(UTC\)/g );
                if ( sigs && sigs.length > 1 ) {
                    alert( p.t.wmtalkpage );
                    return;
                }
            }

            hideTags(p.t.hidetags);

            //rr stage 1
            router(r, p.t.rr, 'stage1');
            for ( i in window.wfPluginsT ) {
                if ( window.wfPluginsT.hasOwnProperty( i ) ) {
                    window.wfPluginsT[i]( txt, r );
                }
            }

            hideTemplates();
            //rhide stage 1
            router( hide, p.t.rhide, 'stage1' );

            //keep untranslated
            hideTag( 'gallery' );

            //rr stage 2
            router( r, p.t.rr, 'stage2' );// spaces at EOL
            txt = '\n' + txt + '\n';


            //rr stage 3
            // LINKS
            router( r, p.t.rr, 'stage3' );

            //rhide stage 2
            router( hide, p.t.rhide, 'stage2' );// only link part

            //rr stage 4
            // TAGS
            router( r, p.t.rr, 'stage4' );

            //rhide stage 3
            router( hide, p.t.rhide, 'stage3' );

            //rr stage 5
            router( r, p.t.rr, 'stage5' );// double spaces

            // Entities etc. → Unicode chars
            if ( mw.config.get( 'wgNamespaceNumber' ) !== 10 ) {
                //rr stage 6
                router( r, p.t.rr, 'stage6' );
            }

            //rr stage 7
            // Headings
            // Hyphens and en dashes to pretty dashes
            // Year and century ranges
            // Reductions
            // Insert/delete spaces
            // Temperature
            // Dot → comma in numbers
            router( r, p.t.rr, 'stage7' );

            // Plugins
            for ( i in window.wfPlugins ) {
                if ( window.wfPlugins.hasOwnProperty( i ) ) {
                    window.wfPlugins[ i ]( txt, r );
                }
            }

            // "" → «»
            for ( i = 1; i <= 2; i++ ) {
                //rr stage 8
                router( r, p.t.rr, 'stage8' );// "
            }
            while ( /«[^»]*«/.test( txt ) ) {
                //rr stage 9
                router( r, p.t.rr, 'stage9' );
            }

            while ( txt.match( /\x01\d+\x02/ ) ) {
                //rr stage 10
                router( r, p.t.rr, 'stage10' );
            }

            txt = txt.substr( 1, txt.length - 2 ); // compensation for "txt = '\n' + txt + '\n';"
        }

        function setContents ( txt ) {
            p.log( 'setContents', p.isUcp, { txt: txt } );
            var start, end;
            if ( !txt ) return;
            if ( p.isUcp ) {
                // is new ve
                if ( p.isVeActive() ) {
                    var dm = p.surface.getModel(),
                        fragment = dm.getLinearFragment(
                            new ve.Range( 1, dm.getDocument().getLength() )
                        );
                    //fragment.insertHtml( txt );
                    fragment.insertContent( txt );
                } else {
                    // old ve
                    $input = $( '#wpTextbox1' );
                    if ( $input.selectionStart !== undefined ) {
                        start = $input.selectionStart;
                        end = $input.selectionEnd;
                        $input.val( $input.val().slice( 0, start ) + txt + $input.val().slice( end ) );
                    } else {
                        $input.val( txt );
                    }
                }
            } else {
                $input = $( '#wpTextbox1' );
                if ( $input.selectionStart !== undefined ) {
                    start = $input.selectionStart;
                    end = $input.selectionEnd;
                    $input.val( $input.val().slice( 0, start ) + txt + $input.val().slice( end ) );
                } else {
                    $input.val( txt );
                }
            }
        }// setContents

        function processAllText() {
            if ( p.isUcp ) {
                txt = text;
                // old ve
                if ( p.isOldVeActive() ) {//(ve && ve.init && !ve.init.target) {
                    $input = $( '#wpTextbox1' );
                    txt = $input.length ?
                        $input.textSelection( 'getContents' ) ||
                        $input.val() :
                        text;
                } else {
                    // 2017 wikitext editor adds an empty line to the end with every text replacement
                    // Remove the .trim when [[phab:T198010]] is fixed.
                    //txt = p.surface.model.documentModel.data.getSourceText().trim();
                    $input = $( '#wpTextbox1' );
                    txt = $input.length ?
                        $input.textSelection( 'getContents' ) ||
                        p.surface.model.documentModel.data.getSourceText().trim() :
                        text;
                }
            } else {
                txt = $input.length ?
                    $input.textSelection( 'getContents' ) ||
                    $input.val() :
                    text;
            }
            p.log( 'processAllText', p.isUcp, { txt: txt } );
            if ( txt && txt.length ) {
                p.log( 'processAllText.pt' );
                processText();
            }
            if ( $input && $input.length ) {
                p.log( 'input&input.len', p.isVeActive(), p.isOldVeActive() );
                //txt = $input.text();
                /*
                if ( p.isVeActive() ) {
                    // 2017 wikitext editor adds an empty line to the end with every text replacement
                    // Remove the .trim when [[phab:T198010]] is fixed.
                    txt = p.surface.mode.documentModel.data.getSourceText().trim();
                }
                // here is no "else" intentionally. might be fixed later, when ucp will work
                if ( p.isOldVeActive ) {
                    txt = $input.val();
                }*/
                r( /^[\n\r]+/, '' );
                // 2017 wikitext editor adds an empty line to the end with every text replacement
                // Remove the following block when [[phab:T198010]] is fixed.
                if ( p.isVeActive() ) {
                    r( /[\n\r]+$/, '' );
                }
                //$input.textSelection( 'setContents', txt );
                setContents( txt );
                if ( caretPosition ) {
                    $input.textSelection( 'setSelection', {
                        start: caretPosition[ 0 ] > txt.length ? txt.length : caretPosition[ 0 ]
                    } );
                }
            } else {
                text = txt;
                setContents( txt );
            }
            if ( window.auto_comment &&
                //window.insertSummary &&
                //!document.editform.wpSection.value
                !window.wpSummary.value
            ) {
                //window.insertSummary( 'викификатор' );
                window.wpSummary.value = p.t.wikificator;
            }
        }


        // MAIN CODE

        p.log( 'input', $input );
        if ( $input && $input.length ) {
            $input.focus();
            
            caretPosition = $input.textSelection( 'getCaretPosition', { startAndEnd: true } );
            if ( caretPosition ) {
                textScroll = ( $CodeMirrorVscrollbar.length ? $CodeMirrorVscrollbar : $input )
                    .scrollTop();
                if ( caretPosition[ 0 ] === caretPosition[ 1 ] ) {
                    processAllText();
                } else {
                    txt = $input.textSelection( 'getSelection' );
                    processText();
                    //p.log('processText result', txt);
                    // replaceSelection doesn't work with MediaWiki 1.30 in case this gadget is loaded
                    // from other wiki
                    $input.textSelection( 'encapsulateSelection', {
                        replace: true,
                        peri: txt
                    } );
                    // In CodeMirror, the selection isn't preserved, so we do it explicitly
                    $input.textSelection( 'setSelection', {
                        start: caretPosition[ 0 ],
                        end: caretPosition[ 0 ] + txt.length
                    } );
                }
                ( $CodeMirrorVscrollbar.length ? $CodeMirrorVscrollbar : $input )
                    .scrollTop( textScroll );
            // If something went wrong
            } else if ( confirm( p.t.wmfulltext ) ) {
                processAllText();
            }
        } else {
            processAllText();
            return text;
        }

        // scroll back, for 2017 wikitext editor, IE, Opera
        document.documentElement.scrollTop = winScroll;
    };// wikify


    /* Toolbar buttons */

    p.addOldToolbarButton = function () {
        var $toolbar = $( '#gadget-toolbar' );
        if ( !$toolbar.length ) {
            $toolbar = $( '#toolbar' );
        }
        $( '<div>' )
            .addClass( 'mw-toolbar-editbutton' )
            .attr( 'alt', p.t.wikificator )
            .attr( 'title', p.t.wikificatorx )
            .css( {
                'width': '69px',
                'backgroundImage': 'url(https://upload.wikimedia.org/wikipedia/commons/3/38/Button_wikify.png)'
            } )
            .appendTo( $toolbar )
            .on( 'click', p.click );
    };

    p.addNewToolbarButton = function () {
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
            'section': 'main',
            'group': 'insert',//mw.config.get( 'wgServerName' ) === 'ru.wikipedia.org' ? 'gadgets' : 'insert',
            'tools': {
                'wikif': {
                    label: p.t.wikificatorx,
                    type: 'button',
                    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Wikify-toolbutton.png',
                    action: {
                        type: 'callback',
                        execute: p.click
                    }
                }
            }
        } );

        mw.hook( 'wikieditor.toolbar.wikificator' ).fire();
    };

/*
    // add toolbar button
    if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ) {
        mw.loader.using( [ 'user.options', 'jquery.textSelection' ], function () {
            if ( mw.user.options.get( 'usebetatoolbar' ) === 1 ) {
                $.when(
                    mw.loader.using( 'ext.wikiEditor' ),
                    $.ready
                ).then( function () {
                    //if ( mw.config.get( 'wgServerName' ) === 'ru.wikipedia.org' ) {
                        //mw.hook( 'wikieditor.toolbar.gadgetsgroup' ).add( p.addNewToolbarButton );
                    //} else {
                        p.addNewToolbarButton();
                    //}
                } );
            } else {
                mw.loader.using( 'mediawiki.toolbar', function () {
                    $( p.addOldToolbarButton );
                });
            }
        } );
    }
*/
    
    /* VisualEditor code */

    p.createVEWikificatorTool = function () {
        // Create and register a command
        function WikifyCommand() {
            WikifyCommand.parent.call( this, 'wikificator' );
        }
        OO.inheritClass( WikifyCommand, ve.ui.Command );

        // Forbid the command from being executed in the visual mode
        WikifyCommand.prototype.isExecutable = function () {
            var surface = ve.init.target.getSurface();
            p.surface = surface;
            return surface && surface.getMode() === 'source';
        };

        WikifyCommand.prototype.execute = function ( surface ) {
            // p.wikify();
            var t = p.wikify( surface.getModel().getHtml().trim() );
            setContents( t );
            return true;
        };

        if ( ve.ui.wikitextCommandRegistry ) {
            ve.ui.wikitextCommandRegistry.register( new WikifyCommand() );
        }

        // Create and register a tool
        function WikificatorTool() {
            WikificatorTool.parent.apply( this, arguments );
        }
        OO.inheritClass( WikificatorTool, ve.ui.Tool );

        WikificatorTool.static.name = 'wikificator';
        WikificatorTool.static.group = 'gadgets';
        WikificatorTool.static.title = p.t.wikificator;
        WikificatorTool.static.icon = 'wikify';
        WikificatorTool.static.commandName = 'wikificator';
        WikificatorTool.static.autoAddToCatchall = false;
        WikificatorTool.static.deactivateOnSelect = false;

        WikificatorTool.prototype.onUpdateState = function () {
            WikificatorTool.parent.prototype.onUpdateState.apply( this, arguments );
            this.setActive( false );
        };

        ve.ui.toolFactory.register( WikificatorTool );

        ve.init.mw.DesktopArticleTarget.static.actionGroups[ 1 ].include.push( 'wikificator' );
    };// createVEWikificatorTool

    p.click = function ( e ) {
        if ( p.isUcp ) {
            // is old ve
            if ( p.isOldVeActive() ) {
                var t = p.wikify( $( '#wpTextbox1' ) );
                //setContents( t );
            } else {
                if ( !p.isVeActive() ) return;
                // 2017 wikitext editor adds an empty line to the end with every text replacement
                // Remove the .trim when [[phab:T198010]] is fixed.
                //var t = p.wikify( p.surface.model.documentModel.data.getSourceText().trim() );
                var t = p.wikify( $( '#wpTextbox1' ) );
                /* check for source mode done by createVEWikificatorTool
                p.surface = surface;
                if ( !p.surface || p.surface.getMode() !== 'source' ) {
                    p.activateSourceMode().done( function ( surface ) {
                        // 2017 wikitext editor adds an empty line to the end with every text replacement
                        // Remove the .trim when [[phab:T198010]] is fixed.
                        p.surface = surface;
                        var t = p.wikify( surface.model.documentModel.data.getSourceText().trim() );
                        //p.setContents ( t );
                        //p.wikify();
                    });
                } else {
                    p.wikify();
                }
                */
            }// if old ve
        } else {
            p.wikify();
        }
    };// click

    p.init = function ( language ) {
        p.log( 'init', language, lang );
        circuitbreaker++;
        if ( circuitbreaker > 10 ) {
            p.log( 'too much inits. bye', circuitbreaker );
            p.init = function() {
                mw.hook( 'wikificator.ready' ).remove();
                p.log( 'circuit breaker activated. reload the page to continue init spamming' );
                return;
            };
        }
        // language forcing tool
        // is it current lang
        if ( language === lang ) {
            return;
        }
        language = language || lang;
        // are we already here
        if ( $( '#wikify-' + language ).length ) return;

        // select new lang
        setLang( language );
        // prepare regexps
        function rmap( v ) {
            // convert to regexp
            if ( v.reg instanceof RegExp ) return v;
            v.reg = new RegExp( v.reg, v.m );
            return v;
        }
        function rcreate( obj ) {
            // create regexps for obj
            for ( var stage in obj ) {
                if ( !obj[ stage ].length ) continue;
                obj[ stage ] = obj[ stage ].map( rmap );
            }
        }
        
        // create regexps
        rcreate( p.t.rr );
        rcreate( p.t.rhide );

        // add multiple buttons (per-lang)? onclick('#id-'+lang)
        $( '.wikify' ).remove();
        var $button = $( '<li>', {
            id: 'wikify-' + language,
            class: 'wikify wikify-' + language,
            title: p.t.wikificator
        } );
        $button.append( $( '<img>', {
            src: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Wikify-toolbutton.png'
        } ) );
        $( '#WikiaBarWrapper .toolbar .tools' ).append( $button );
        //$button.on('click', p.click);
        // will fire on each init
        mw.hook( 'wikificator.ready' ).fire( p );
    };// init
    
    $('body').on( 'click', '.wikify', p.click );
    //p.init();
    if ( p.isUcp ) {
        //'ve.wikitextInteractive': source
        // try to set old ve button
        mw.loader.using( 'ext.wikiEditor' ).then( function () {
            try {
                p.log( 'trying to add old ve button');
                p.addNewToolbarButton();
            } catch ( ex ) {
                p.log( 'old ve button error', ex );
            }
            p.init();
        } );
        // w8 4 new ve
        mw.hook( 've.activationComplete' ).add( function () {
            p.surface = ve.init.target.getSurface();
            p.createVEWikificatorTool();
            p.init();
        });
    } else {
        p.init();
    }

} )( jQuery, window.wikificator = ( window.wikificator || {} ) );
// </nowiki>