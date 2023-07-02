+function (config) {
    // adds localization to new categories @user:fngplg, 2018
    var mwc = mw.config.get(['wgAction', 'wgContentLanguage', 'wgNamespaceNumber']);
    if (config.loaded || mwc.wgNamespaceNumber !== 14 || mwc.wgAction !== 'view' || mwc.wgContentLanguage === 'en') return;
    config.loaded = true;
    var langs = {
        // language list - start
        'be': 'АБВГДЕЁЖЗІЙКЛМНОПРСТУЎФХЦЧШЫЬЭЮЯ',
        'en': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'el': 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
        'gv': 'ABCÇDEFGHIJKLMNOPQRSTUVWY',
        'pl': 'AĄBCĆDEĘFGHIJKLŁMNOÓPRSŚTUWYŻŹ',
        'ru': 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
        'tr': 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ',
        'uk': 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ',
        // language list - stop
    };
    var alphabet = config.alphabet || langs[mwc.wgContentLanguage] || [],
        $list = $('<ul>', {class: 'cat-local-list category-page__alphabet-shortcuts category-page__alphabet-shortcuts-' + mwc.wgContentLanguage}),
        $target = $('.category-page__alphabet-shortcuts');
    if (!$target.length) {
        mw.log('newCatLocal: no target found');
        return;
    }
    if (!alphabet.length) {
        // gather all available characters and make an alphabet
        var syms;
        try {
            //some browsers are ie
            syms = new Set($('#mw-content-text').text().toUpperCase()
                .replace(/[\d\s\w\.’'\[\](){}⟨⟩<>:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥]*/gm, '')
            );
        } catch (ex) {
            mw.log('newCatLocal: new Set() is not supported');
        }
        if (!syms) return;
        syms.forEach(function(v){alphabet.push(v)});// set is too weird to [].slice it
        alphabet = alphabet.sort();
    } else {
        alphabet = alphabet.split('');
    }// if !alphabet.length (auto)
    if (!alphabet || !alphabet.length) return;
    alphabet.forEach(function(v) {
        var $a = $('<a>', {
                href: '#',
                text: v,
            }),
            $item = $('<li>', {
                class: 'cat-local-item category-page__alphabet-shortcut'
            });
        $item.append($a);
        $list.append($item);
    });
    $target.append($list);
    $('body').on('click', '.cat-local-item a', function(e) {
        e.preventDefault();
        window.location.search = 'from=' + this.innerText;
    });
}(window.newCatLocal = window.newCatLocal || {});