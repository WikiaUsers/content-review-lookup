//adds simple filter to special:wantedpages
$(function() {
    var urlVars = new URLSearchParams(location.search);
    var mwc = mw.config.get(['wgUserLanguage', 'wgFormattedNamespaces', 'wgCanonicalSpecialPageName']);
    if (mwc.wgCanonicalSpecialPageName !== 'Wantedpages' || $('.wp-filter').length) return;
    var r = /^([^:]+):/,
    	r2 = /\d*/;
    var activeFilter = [];
    var strings = {
        // language list - start
        en: {
            label: 'Filter',
            title: 'Invert filter behavior',
            all: 'All',
            nsmain: 'Main'//main namespace name. virtually non-translatable
        },
        be: {
            label: 'Фільтр',
            title: 'Звярнуць паводзіны фільтра',
            all: 'Усе'
        },
        el: {
            label: 'Φίλτρο',
            title: 'Αντιστροφή συμπεριφοράς φίλτρου',
            all: 'Όλες',
            nsmain: 'Βασικό'
        },
        es: {
            label: "Filtrar",
            title: "Invertir comportamiento del filtro",
            all: "Todo",
            nsmain: "Principal"
        },
        fr: {
            label: "Filtrer",
            title: "Inverser le comportement du filtre",
            all: "Tous",
            nsmain: "Principal"
        },
        ja: {
            label: 'フィルタ',
            title: 'フィルタを反転する',
            all: '全部',
            nsmain: 'メイン'
        },
        ko: {
            label: '필터',
            title: '필터 반전',
            all: '모두',
            nsmain: '일반'
        },
        pl: {
            label: "Filtr",
            title: "Odwróć filtr",
            all: "Wszystkie",
            nsmain: "Główna"
        },
        ru: {
            label: 'Фильтр',
            title: 'Обратить поведение фильтра',
            all: 'Все',
        },
        tr: {
            label: 'Fitre',
            title: 'Filtre davranışını ters çevir',
            all: 'Tümü',
            nsmain: 'Ana'
        },
        uk: {
            label: 'Фільтр',
            title: 'Звернути поведінку фільтра',
            all: 'Все'
        },
        // language list - stop
    };
    var styles = '.wp-filter{float:right}\
        .wp-list{height:200px}\
        .wp-checkbox{vertical-align:top}\
        .wp-label{padding-right:5px;vertical-align:top;cursor:pointer;font-weight:bold}\
        .wp-checkbox:checked+.wp-label{filter:invert(200%)}';

    function onChange (e) {
        var state = $('.wp-checkbox').prop('checked');
        $('.special li').css('display', state ? 'none' : 'list-item');
        activeFilter = [];
        $.each(e.target.selectedOptions, function() {
            var $this = this;
            $('.special li[data-ns="' + $this.value + '"]').css('display', state ? 'list-item' : 'none');
            activeFilter.push($this.value || '');
            // 'all' has its own behavior
            if ($this.value === 'all') {
            	$('.special li[data-ns]').css('display', state ? 'list-item' : 'none');
            	return false;// stop enumeration, cuz it was all
            }
        });//each selected option
        window.sessionStorage.wpFilter = JSON.stringify(activeFilter);
    }//onChange
    
    mw.util.addCSS(styles);
    strings = $.extend(true, {}, strings.en, strings[mwc.wgUserLanguage], strings[urlVars.get('uselang')]);
    
    //add ns data
    $('.special li').each(function() {
        var $this = $(this);
        var $link = $this.find('a, span.new').first();// non-existing cats will be de-linked by the engine; use .new to detect a cat
        var $link2 = $this.find('a').last();
        var links = r2.exec($link2.text()) || '';
        var ns = r.exec($link.text().trim()) || '';
        // add link count
        $this.closest('li').attr('data-links', links);
        if (ns instanceof Array) ns = ns[1];
        if (Object.values(mwc.wgFormattedNamespaces).indexOf(ns) > -1) {
            $this.closest('li').attr('data-ns', ns);
        } else {
            $this.closest('li').attr('data-ns', '');//bind unknown to main
        }
    });
    var $wpfilter = $('<div>', {
        class: 'wp-filter',
        style: 'float:right;'
    });
    var $chkbox = $('<input>', {
        type: 'checkbox',
        class: 'wp-checkbox',
        id: 'wp-checkbox',
        title: strings.title
    });
    var $label = $('<label>', {
        class: 'wp-label',
        "for": 'wp-checkbox',
        text: strings.label,
        title: strings.title,
    });
    var $list = $('<select>', {
        class: 'wp-list',
        multiple: 1,
    });
    $wpfilter.append($chkbox).append($label).append($list);
    $list.append($('<option>', {
        value: 'all',
        text: strings.all
    }));
    
    //fill ns list
    // the sorted one
    Object.values(mwc.wgFormattedNamespaces).sort(function(p, n) {return p > n ? 1 : -1}).forEach(function(v) {
        $list.append($('<option>', {
            value: v,
            text: v || strings.nsmain
        }));
    });//each ns
    
    $('.mw-spcontent').prepend($wpfilter);
    
    //set initial state
    if (window.sessionStorage.wpInvertor && window.sessionStorage.wpInvertor !== 'undefined') {
        $chkbox.get(0).checked = true;
    }
    if (window.sessionStorage.wpFilter) {
        activeFilter = JSON.parse(window.sessionStorage.wpFilter);
    } else {
        activeFilter.push('all');
    }
    $chkbox.on('change', function(e) {
        window.sessionStorage.wpInvertor = this.checked || '';
        var fakee = {target: {selectedOptions: []}};
        $.each(activeFilter, function(i, v) {
            var item = $list.find('[value="' + v + '"]').get(0);
            if (item) item.selected = 'selected';
            fakee.target.selectedOptions.push(item);
        });
        onChange(fakee);
    });//on checkbox
    $chkbox.trigger('change');
    
    $list.on('change', onChange);//on change
});