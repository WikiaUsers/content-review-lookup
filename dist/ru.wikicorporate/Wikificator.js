mw.loader.using('jquery.client', () => {

    const clientProfile = $.client.profile();
    const hotkey = clientProfile.platform === 'mac' ? 'Ctrl+Shift+W' : 'Ctrl+Alt+W';
    
    window.wfPlugins = window.wfPlugins || [];
    window.wfPluginsT = window.wfPluginsT || [];

    const tagsToHideRegex = /<(nowiki|pre|source|syntaxhighlight|templatedata|code|kbd|tt|graph|hiero|math|timeline|chem|score|categorytree|imagemap|inputbox|mapframe|maplink)( [^>]+)?>[\s\S]+?<\/\1>/gi;

    window.Wikify = (inputOrText) => {
        'use strict';

        let text, $input;
        
        if (typeof inputOrText === 'string') {
            text = inputOrText;
        } else {
            const isInput = inputOrText && ((inputOrText.nodeType && inputOrText.value !== undefined) || (inputOrText.prop && inputOrText.prop('nodeType')));
            $input = $(isInput ? inputOrText : '#wpTextbox1');
        }

        let txt = '';
        const hidden = [];
        const winScroll = document.documentElement.scrollTop;
        let caretPosition;

        const r = (r1, r2) => { txt = txt.replace(r1, r2); };
        const hide = (re) => { r(re, (s) => `\x01${hidden.push(s)}\x02`); };

        const hideTemplates = () => {
            hide(/\{\{([^{]\{?)+?\}\}/g);
            let pos = 0, left, right, tpl;
            const stack = [];
            
            while (true) {
                left = txt.indexOf('{{', pos);
                right = txt.indexOf('}}', pos);
                
                if (left === -1 && right === -1 && !stack.length) break;
                
                if (left !== -1 && (left < right || right === -1)) {
                    stack.push(left);
                    pos = left + 2;
                } else {
                    left = stack.pop();
                    if (left === undefined) {
                        if (right === -1) {
                            pos += 2;
                            continue;
                        } else {
                            left = 0;
                        }
                    }
                    if (right === -1) right = txt.length;
                    
                    right += 2;
                    tpl = txt.substring(left, right);
                    txt = `${txt.substring(0, left)}\x01${hidden.push(tpl)}\x02${txt.substr(right)}`;
                    pos = right - tpl.length;
                }
            }
        };

        const processLink = (link, left, right) => {
            left = left.replace(/[ _\u00A0]+/g, ' ').trim();
            if (/^(?:Категория|Файл) ?:/.test(left)) {
                return `[[${left}|${right}]]`;
            }
            
            right = right.replace(/ {2,}/g, ' ').trim();
            const inLink = right.substr(0, left.length);
            const afterLink = right.substr(left.length);
            const uniLeft = left.substr(0, 1).toUpperCase() + left.substr(1);
            const uniRight = (right.substr(0, 1).toUpperCase() + right.substr(1)).replace(/[_\u00A0]/g, ' ');
            
            if (uniRight.indexOf(uniLeft) === 0 && /^[a-zа-яё]*$/.test(afterLink)) {
                return `[[${inLink}]]${afterLink}`;
            }
            return `[[${left}|${right}]]`;
        };

        const processText = () => {
            const u = '\u00A0'; 

            hide(tagsToHideRegex);
            
            r(/\{\{\s*ref-(\w+)\s*/g, '{{ref|$1');
            r(/\{\{\^(\d)\}\}\{\{\^(\d)\}\}(?:\{\{\^(\d)\}\})?(?:\{\{\^(\d)\}\})?(?:\{\{\^(\d)\}\})?(?:\{\{\^(\d)\}\})?(?:\{\{\^(\d)\}\})?(?:\{\{\^(\d)\}\})?(?:\{\{\^(\d)\}\})?/g, '{{sup|$1$2$3$4$5$6$7$8$9}}');
            r(/[^\S\n\r]+(\n|\r)/g, '$1');
            r(/(^|[А-Яа-я])\u00eb([а-я]|$)/g, '$1ё$2');
            r(/(^|[А-Яа-я])\u00cb([а-я]|$)/g, '$1Ё$2');
            r(/\{\{\s*(?:шаблон|[шt]|template):([\s\S]+?)\}\}/gi, '{{$1}}');
            r(/\{\{(?:подст:|subst:)?(?:[Уу]дар(?:ение)?|')\}\}/g, '\u0301');
            r(/\s+\{\{([·•*])\}\}/g, '{{$1}}');
            r(/(\{\{\s*)(?:reflist|список примечаний)(\s*[\|\}])/ig, '$1примечания$2');
            r(/(\{\{\s*)примечания(\s*\|\s*)[4-9](\s*[\|\}])/ig, '$1примечания$2узкие$3');
            r(/(\{\{\s*)примечания\s*\|\s*height=[0-9]*(\s*[\|\}])/ig, '$1примечания$2');
            r(/[\u00A0 ]+(\{\{\s*([Rr]ef-[a-z\-]+?|[Ee]n icon|[Cc]hecked|[Vv]|[Пп]роверено)\}\})/g, '$1');
            r(/<[\/\\]?(hr|br)( [^\/\\>]+?)?? *[\/\\]?>/gi, '<$1$2>');
            
            r(/(\| *Координаты[ _А-ЯЁа-яё]*= *)(\d+(?:[.,]\d+)?)[,/] ?(\d+(?:[.,]\d+)?(?=\s))/g,
                (s, m1, m2, m3) => `${m1}${+parseFloat(m2.replace(',', '.')).toFixed(4)}/${+parseFloat(m3.replace(',', '.')).toFixed(4)}`
            );
            
            r(/<noinclude>\s*(\{\{[dD]ocpage\}\})\s*<\/noinclude>/g, '$1');
            r(/(\| *(?:[сСcCsS]|pp?|страницы\d?|pages\d?|seite\d?|alleseiten|листы\d?|том|volume|band|выпуск|issue|heft|номер|столбцы\d?|columns\d?|kolonnen\d?|серия год) *= *)(\d+)[\u00A0 ]?(?:-{1,3}|—) ?(\d+)/g, '$1$2—$3');
            r(/(\| *год *= *)(\d{4})[\u00A0 ]?(?:-{1,3}|—) ?(\d{4})/g, '$1$2—$3');
            r(/(\[\[[^\{\]|\n]+){{!}}([^\{\]|\n]+\]\])/g, '$1|$2');
            
            if (txt.includes('{{НП')) {
                r(/ *\| *(?:CoordAddon|ЯндексКарта)[^\|\}]+\n/g, '');
                r(/ *\| *размер карты (?:страны|региона|района) *= *[^\|\}]+\n/g, '');
            }
            
            window.wfPluginsT.forEach(plugin => plugin(txt, r));

            hideTemplates();
            hide(/^[ \t].*/mg);
            hide(/((?:https?|ftp|news|nntp|telnet|irc|gopher):\/\/|mailto:)[^\s\[\]<>"]+ ?/gi);
            hide(/^#(redirect|перенапр(авление)?)/i);
            hide(/<gallery( [^>]+)?>[\s\S]+?<\/gallery>/gi); 

            txt = `\n${txt}\n`;

            r(/(\[\[:?)(категория|к|category|модуль|module|шаблон|[шt]|template|file|файл|image|изображение):( *)/ig, (match, prefix, ns, spaces) => {
                const lowerNs = ns.toLowerCase();
                let correctNs = 'Файл';
                if (/^(категория|к|category)$/.test(lowerNs)) correctNs = 'Категория';
                else if (/^(модуль|module)$/.test(lowerNs)) correctNs = 'Модуль';
                else if (/^(шаблон|[шt]|template)$/.test(lowerNs)) correctNs = 'Шаблон';
                return `${prefix}${correctNs}:${spaces}`;
            });

            r(/(\(|\s)(\[\[[12]?\d{3}\]\])[\u00A0 ]?(-{1,3}|–|—) ?(\[\[[12]?\d{3}\]\])(\W)/g, '$1$2—$4$5');
            r(/(\[\[[12]?\d{3}\]\]) ?(гг?\.)/g, `$1${u}$2`);
            r(/(\(|\s)(\[\[[IVX]{1,5}\]\])[\u00A0 ]?(-{1,3}|–|—) ?(\[\[[IVX]{1,5}\]\])(\W)/g, '$1$2—$4$5');
            r(/(\[\[[IVX]{1,5}\]\]) ?(вв?\.)/g, `$1${u}$2`);
            r(/(\d)\s(год)/g, `$1${u}$2`);
            r(/\[\[(\d+)\]\]\sгод/g, `[[$1${u}год]]`);
            r(/\[\[(\d+)\sгод\|\1\]\]\sгод/g, `[[$1${u}год]]`);
            r(/\[\[(\d+)\sгод\|\1\sгод([а-я]{0,3})\]\]/g, `[[$1${u}год]]$2`);
            r(/\[\[((\d+)(?: (?:год )?в [\wa-яёА-ЯЁ ]+\|\2)?)\]\][\u00A0 ](год[а-яё]*)/g, `[[$1${u}$3]]`);
            r(/([XVI])\s(век)/g, `$1${u}$2`);
            r(/\[\[([XVI]+)\]\]\sвек/g, `[[$1${u}век]]`);
            r(/\[\[([XVI]+)\sвек\|\1\]\]\sвек/g, `[[$1${u}век]]`);
            r(/\[\[([XVI]+)\sвек\|\1\sвек([а-я]{0,3})\]\]/g, `[[$1${u}век]]$2`);
            r(/\[\[(([XVI]+) век\|\2)\]\][\u00A0 ]век/g, `[[$2${u}век]]`);
            
            r(/(\[\[[^|[\]]*)[\u00AD\u200E\u200F]+([^\[\]]*\]\])/g, '$1$2');
            r(/\[\[ *([^|[\]]+?) *\| *('''''|'''|'')([^'|[\]]*)\2 *]]/g, '$2[[$1|$3]]$2');
            r(/\[\[ *([^|[\]]+?) *\| *«([^»|[\]]*)» *\]\]/g, '«[[$1|$2]]»');
            r(/\[\[ *([^|[\]]+?) *\| *„([^“|[\]]*)“ *\]\]/g, '„[[$1|$2]]“');
            r(/\[\[ *([^|[\]]+?) *\| *"([^"|[\]]*)" *\]\]/g, '"[[$1|$2]]"');
            r(/\[\[\s*([^\]\|]+?)\s*]]/g, '[[$1]]');
            r(/\[\[([^|[\]\n]+)\|([^|[\]\n]+)\]\]/g, processLink);
            r(/\[\[ *([^|[\]]+)([^|\[\]()]+?) *\| *\1 *\]\]\2/g, '[[$1$2]]');
            r(/\[\[ *(?!Файл:|Категория:)([a-zA-Zа-яёА-ЯЁ\u00A0-\u00FF %!\"$&'()*,\-—.\/0-9:;=?\\@\^_`’~]+) *\| *([^\|\[\]]+) *\]\]([a-zа-яё]+)/g, '[[$1|$2$3]]');
            
            hide(/\[\[[^\]|]+/g);

            r(/<<(\S.+\S)>>/g, '"$1"');
            r(/(su[pb]>)-(\d)/g, '$1−$2');
            r(/<(b|strong)>(.*?)<\/(b|strong)>/gi, "'''$2'''");
            r(/<(i|em)>(.*?)<\/(i|em)>/gi, "''$2''");
            r(/^<hr ?\/?>/gim, '----');
            r(/[\u00A0 \t]*<ref(?:\s+name="")?(\s|>)/gi, '<ref$1');
            r(/(\n== *[a-zа-я\s\.:]+ *==\n+)<references(?: +responsive *= *"")? *\/>/ig, '$1{{примечания}}');
            
            hide(/<[a-z][^>]*?>/gi);
            hide(/^(\{\||\|\-).*/mg);
            hide(/(^\||^!|!!|\|\|) *[a-z]+=[^|]+\|(?!\|)/mgi);
            hide(/\| +/g);

            r(/[ \t\u00A0]{2,}/g, ' ');

            if (mw.config.get('wgNamespaceNumber') !== 10) {
                r(/&(#x[0-9a-f]{2,4}|#[0-9]{3,4}|[0-9a-z]{2,8});/gi, (s) => {
                    const t = document.createElement('textarea');
                    t.innerHTML = s;
                    const c = t.value;
                    if ((c.length === 1 && c.charCodeAt(0) > 127) || s === '&#x20;') {
                        return c;
                    }
                    return s;
                });
            }

            r(/\(tm\)/gi, '™');
            r(/\.\.\./g, '…');
            r(/(^|[^+])\+-(?!\+|-)/g, '$1±');
            r(/~=/g, '≈');
            r(/((?:^|[\s"])\d+(?:[\.,]\d+)?\s*)[xх](\s*\d+(?:[\.,]\d+)?)\s*([мm]{1,2}(?:[\s"\.,;?!]|$))/g, `$1×$2${u}$3`);
            r(/\s+×\s+/g, `${u}×${u}`);
            r(/([\wа-яА-ЯёЁ])'(?=[\wа-яА-ЯёЁ])/g, '$1’');
            r(/№№/g, '№');
            
            r(/\^2([^\d\}])/g, '{{^2}}$1');
            r(/\^3([^\d\}])/g, '{{^3}}$1');
            r(/\sкв\.\s*([кмдсн]?м(?:км)?)([\s.,;:)])/g, `${u}$1{{^2}}$2`);
            r(/\sкуб\.\s*([кмдсн]?м(?:км)?)([\s.,;:)])/g, `${u}$1{{^3}}$2`);
            r(/\s([кмдсн])?м²/g, `${u}{{$1м2}}`);
            r(/\sмкм²/g, `${u}{{мкм2}}`);
            r(/\s([кмдсн])?м³/g, `${u}{{$1м3}}`);
            r(/\sмкм³/g, `${u}{{мкм3}}`);
            r(/\s([кмдсн]?м(?:км)?)\{\{\^([23])\}\}([\s.,;:)])/g, `${u}{{$1$2}}$3`);
            
            r(/½/g, '{{1/2}}');
            r(/¼/g, '{{1/4}}');
            r(/¾/g, '{{3/4}}');
            
            r(/^(=+)[ \t\f\v]*(.*?)[ \t\f\v]*=+$/gm, '$1 $2 $1');
            r(/([^\r\n])(\r?\n==.+==\r?\n)/g, '$1\n$2');
            
            r(/^(={2,})(.*?)\1[ \t]*\r?\n+(?=(={2,}).*?\3[ \t]*$)/gm, (match, lvl1, text1, lvl2) => {
                return (lvl1.length === lvl2.length) ? `${lvl1}${text1}${lvl1}\n\n` : `${lvl1}${text1}${lvl1}\n`;
            });

            r(/(==.+==)[\r\n]{2,}(?!=)/g, '$1\n');

            r(/^== (см(\.?|отр(и|ите|еть))|see) ?(также|ещ[её]|also|more) ==$/gmi, '== См. также ==');
            r(/^== сноски ==$/gmi, '== Примечания ==');
            r(/^== внешние\sссылки ==$/gmi, '== Ссылки ==');
            r(/^== (?:(.+[^.])\.|(.+):) ==$/gm, '== $1$2 ==');
            r(/^== '''(?!.*'''.*''')(.+)''' ==$/gm, '== $1 ==');

            r(/[«»“”„]/g, '"');
            r(/–/g, '-');
            r(/(\s)-{1,3} /g, '$1— ');
            r(/(\d)--(\d)/g, '$1—$2');
            r(/(\s)-(\d)/g, '$1−$2');

            r(/(Boeing|Боинг(?:[ауеио][мвх]?и?))?(\(|\s)([12]?\d{3})[\u00A0 ]?(?:-{1,3}|—) ?([12]?\d{3})(?![\wА-ЯЁа-яё]|-[^ех]|-[ех][\wА-ЯЁа-яё])/g,
                (s, m1, m2, m3, m4) => {
                    if ((m3[0] === '7' && m3[2] === '7') &&
                        (m1 || (m4 < m3 && (m4[2] === '0' || m4 === '138' || m4 === '227')) ||
                        (m3 === '707' && m4 === '820') ||
                        (m3 === '737' && (m4 === '800' || m4 === '900')))
                    ) {
                        return s;
                    }
                    return `${m1 || ''}${m2}${m3}—${m4}`;
                }
            );

            r(/([12]?\d{3}) ?(гг?\.)/g, `$1${u}$2`);
            r(/(\(|\s)([IVX]{1,5})[\u00A0 ]?(-{1,3}|—) ?([IVX]{1,5})(?![\w\-])/g, '$1$2—$4');
            r(/([IVX]{1,5}) ?(вв?\.)/g, `$1${u}$2`);

            r(/([тТ])\.\s?е\./g, '$1о есть');
            r(/([тТ])\.\s?к\./g, '$1ак как');
            r(/([вВ])\sт\.\s?ч\./g, '$1 том числе');
            r(/([иИ])\sт\.\s?д\./g, `$1${u}т.${u}д.`);
            r(/([иИ])\sт\.\s?п\./g, `$1${u}т.${u}п.`);
            r(/([тТ])\.\s?н\./g, `$1.${u}н.`);
            r(/([иИ])\.\s?о\./g, `$1.${u}о.`);
            r(/с\.\s?ш\./g, `с.${u}ш.`);
            r(/ю\.\s?ш\./g, `ю.${u}ш.`);
            r(/в\.\s?д\./g, `в.${u}д.`);
            r(/з\.\s?д\./g, `з.${u}д.`);
            r(/л\.\s?с\./g, `л.${u}с.`);
            r(/а\.\s?е\.\s?м\./g, `а.${u}е.${u}м.`);
            r(/а\.\s?е\./g, `а.${u}е.`);
            r(/мм\sрт\.\s?ст\./g, `мм${u}рт.${u}ст.`);
            r(/н\.\s?э(\.|(?=\s))/g, `н.${u}э.`);
            r(/([дД])([о.])\s?н\.\s?э\./g, `$1о${u}н.${u}э.`);
            r(/(\d)[\u00A0 ]?(млн|млрд|трлн|[дсмнк]?м|мкм|[км]г)\.?(?=[,;.]| "?[а-яё\-]{2,}|\s*\|)/g, `$1${u}$2`);
            r(/(\d)[\u00A0 ](тыс)([^\.А-Яа-яЁё])/g, `$1${u}$2.$3`);
            r(/(\d)\s(тыс\.)/g, `$1${u}$2`);
            r(/ISBN:\s?(?=[\d\-]{8,17})/, 'ISBN ');

            r(/^([#*:]+)[\u00A0 \t\f\v]*(?!\{\|)([^\u00A0 \t\f\v*#:;])/gm, '$1 $2');
            r(/(\S)[\u00A0 \t](-{1,3}|—)[\u00A0 \t](\S)/g, `$1${u}— $3`);
            r(/(^|[^\wА-яЁё\.])([А-ЯЁ][а-яё]+) ([А-ЯЁ]\.) ?([А-ЯЁ]\.)(?! ?[А-ЯЁ][а-яё\.])/g, `$1$2${u}$3${u}$4`);
            r(/(^|[^\wА-яЁё\.])([А-ЯЁ]\.) ?([А-ЯЁ]\.) ?(?=[А-ЯЁ][а-яё]+)/g, `$1$2${u}$3${u}`);
            r(/([а-яё]"?\)?[\.\?!:])((?:\x01\d+\x02\|)?(?:[A-QS-ZА-ЯЁ]|R(?!u\b)))/g, '$1 $2');
            r(/([)"a-zа-яё\]²³])\s*([,:])([\[(a-zа-яё])/g, '$1$2 $3');
            r(/([)a-zа-яё\]²³])\s*([,:])"/g, '$1$2 "');
            r(/([)"a-zа-яё\]²³])[ \u00A0\t]([,;])\s([\[("a-zа-яё])/g, '$1$2 $3');
            r(/([^%\/\wА-Яа-яЁё"]\d+?(?:[\.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, `$1${u}$2`);
            r(/(\d) ([%‰])(?=-[А-Яа-яЁё])/g, '$1$2');
            r(/([№§])(\s*)(\d)/g, `$1${u}$3`);
            r(/\( +/g, '(');
            r(/ +\)/g, ')');

            r(/([\s\d=≈≠≤≥<>—("'|])([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °\^*]| [°\^*])(C|F))(?=[\s"').,;!?|\x01])/gm, `$1$2${u}°$5`);
            r(/(\s\d+)\.(\d+[\u00A0 ]*[%‰°×])/gi, '$1,$2');
            r(/(\d) (?=\d{3}\b)/g, `$1${u}`);

            window.wfPlugins.forEach(plugin => plugin(txt, r));

            for (let i = 1; i <= 2; i++) {
                r(/([\s\x02!|#'"\/([{;+\-])"([^"]*)([^\s"([{|])"([^a-zа-яё])/ig, '$1«$2$3»$4');
            }
            while (/«[^»]*«/.test(txt)) {
                r(/«([^»]*)«([^»]*)»/g, '«$1„$2“');
            }
            
            r(/('''''|'''|'')(\s)?([«»„“])(\s)?\1/g, '$2$3$4');
            r(/([«„])('''''|'''|'')([^'\n]*?)\2([»“])/g, '$2$1$3$4$2');
            r(/([«„])('''''|'''|'')([^'\n]*?)([»“])\2/g, '$2$1$3$4$2');
            r(/('''''|'''|'')([«„])([^'\n]*?)\1([»“])/g, '$1$2$3$4$1');

            const unhide = (s, num) => hidden[num - 1];
            while (txt.match(/\x01\d+\x02/)) {
                r(/\x01(\d+)\x02/g, unhide);
            }

            txt = txt.substr(1, txt.length - 2);
        };

        const processAllText = () => {
            txt = $input ? $input.textSelection('getContents') : text;
            processText();
            if ($input) {
                r(/^[\n\r]+/, '');
                $input.textSelection('setContents', txt);
                if (caretPosition) {
                    $input.textSelection('setSelection', {
                        start: Math.min(caretPosition[0], txt.length)
                    });
                }
            } else {
                text = txt;
            }
            if (window.auto_comment && window.insertSummary && !document.editform.wpSection.value) {
                window.insertSummary('Викификатор');
            }
        };

        if ($input && $input.length) {
            $input.focus();
            caretPosition = $input.textSelection('getCaretPosition', { startAndEnd: true });
            
            if (caretPosition) {
                const $CodeMirrorVscrollbar = $('.CodeMirror-vscrollbar');
                const textScroll = ($CodeMirrorVscrollbar.length ? $CodeMirrorVscrollbar : $input).scrollTop();
                    
                if (caretPosition[0] === caretPosition[1]) {
                    processAllText();
                } else {
                    txt = $input.textSelection('getSelection');
                    processText();
                    $input.textSelection('encapsulateSelection', { replace: true, peri: txt });
                    $input.textSelection('setSelection', {
                        start: caretPosition[0],
                        end: caretPosition[0] + txt.length
                    });
                }
                
                ($CodeMirrorVscrollbar.length ? $CodeMirrorVscrollbar : $input).scrollTop(textScroll);
            } else {
                processAllText();
            }
        } else {
            processAllText();
            return text;
        }

        document.documentElement.scrollTop = winScroll;
    };

    const registerWikificatorTool = () => {
        const addClassicToolbarTool = () => {
            const group = 'insert';
            
            const svgIconString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20" fill="#202122"><path d="M120 32c-48.6 0-88 39.4-88 88l0 168c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-168c0-48.6-39.4-88-88-88l-16 0zm40 128l-64 0 0-40c0-13.3 10.7-24 24-24l16 0c13.3 0 24 10.7 24 24l0 40zM304 32c-17.7 0-32 14.3-32 32l0 224c0 17.7 14.3 32 32 32l72 0c48.6 0 88-39.4 88-88 0-23.6-9.3-45-24.4-60.8 10.3-14.4 16.4-32.1 16.4-51.2 0-48.6-39.4-88-88-88l-64 0zm64 112l-32 0 0-48 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24zM336 256l0-48 40 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-40 0zm233 84c11-13.8 8.8-33.9-5-45s-33.9-8.8-45 5l-105.7 132.1-38.7-38.7c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c6.4 6.4 15.3 9.8 24.4 9.3s17.5-4.9 23.2-12L569 340z"/></svg>';
            const svgDataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgIconString)}`;

            $('#wpTextbox1').wikiEditor('addToToolbar', {
                section: 'main',
                group: group,
                tools: {
                    wikificator: {
                        label: `Викификатор — автоматический обработчик текста (${hotkey})`,
                        type: 'button',
                        icon: svgDataURI,
                        action: {
                            type: 'callback',
                            execute: window.Wikify
                        }
                    }
                }
            });
        };

        if (mw.loader.getState('ext.wikiEditor') === 'ready') {
            addClassicToolbarTool();
        } else {
            mw.hook('wikiEditor.toolbarReady').add(addClassicToolbarTool);
        }
    };

    mw.loader.using(['mediawiki.util', 'user.options']).then(registerWikificatorTool);

    $('#editform').on('keydown', (e) => {
        if (e.ctrlKey && !e.metaKey && 
            (clientProfile.platform === 'mac' ? (e.shiftKey && !e.altKey) : (!e.shiftKey && e.altKey)) && 
            e.keyCode === 87
        ) {
            window.Wikify();
        }
    });

});