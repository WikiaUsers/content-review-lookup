(function () {
    var DATA = {
        '自机': [
            { n: '雁', e: 'Yan', f: '雁 侧.png', p: '雁' },
            { n: '薇³', e: 'Vi³', f: '薇³ 侧.png', p: '薇³' },
            { n: '锰', e: 'Manganese', f: '锰 侧.png', p: '锰' },
            { n: '零²', e: 'Zero²', f: '零² 侧.png', p: '零²' },
            { n: '德特伦特', e: 'Deterrent', f: '徳特伦特 测.png', p: '德特伦特' },
            { n: '克拉特', e: 'Krate', f: '克拉特_侧_自制.png', p: '克拉特' },
            { n: '罗意', e: 'Roy', f: '罗意.png', p: '罗意' }
        ],
        'BOSS': [
            { n: '赫', e: 'Hearth', f: '赫侧.png', p: '赫' },
            { n: '椋', e: 'Starling', f: '椋侧.png', p: '椋' },
            { n: '莱', e: 'Lam', f: '莱侧.png', p: '莱' },
            { n: '星', e: 'Astero', f: '星侧.png', p: '星' }
        ],
        'NPC': [
            { n: '帕尔·林德', e: 'Bohr Lindor', f: '帕尔林德侧.png', p: '帕尔·林德' },
            { n: '¹十', e: '¹Ish', f: null, p: '¹十' },
            { n: '厄⁶', e: 'Ep⁶', f: null, p: '厄⁶' }
        ]
    };

    var cats = Object.keys(DATA);
    var cat = cats[0], idx = 0;

    function img(r) { return r.f ? '/zh/wiki/Special:FilePath/' + encodeURIComponent(r.f) : null; }
    function url(r) { return '/zh/wiki/' + encodeURIComponent(r.p); }

    function render() {
        var c = document.getElementById('roleCarouselApp');
        if (!c) return;
        var roles = DATA[cat], total = roles.length;
        var tabs = cats.map(function (k) { return '<span class="ct' + (k === cat ? ' on' : '') + '" data-k="' + k + '">' + k + '</span>'; }).join('');
        var cards = '';
        for (var i = -2; i <= 2; i++) {
            var r = roles[(idx + i + total) % total], active = (i === 0);
            var im = img(r), av = im ? '<img src="' + im + '">' : '<b>' + r.n[0] + '</b>';
            var nb = active
                ? '<div><b>' + r.n + '</b><br><small>' + (r.e || '') + '</small></div>'
                : '<div><small>' + r.n + '</small></div>';
            var u = url(r);
            cards += '<a class="rc' + (active ? ' on' : '') + '" href="' + u + '" target="_blank"><div class="av">' + av + '</div>' + nb + '</a>';
        }
        c.innerHTML = '<div class="cts">' + tabs + '</div>' +
            '<div class="ctr"><button class="lb">‹</button><div class="trk">' + cards + '</div><button class="rb">›</button></div>';

        c.querySelectorAll('.ct').forEach(function (t) { t.onclick = function () { cat = this.dataset.k; idx = 0; render(); }; });
        c.querySelector('.lb').onclick = function () { idx = (idx - 1 + total) % total; render(); };
        c.querySelector('.rb').onclick = function () { idx = (idx + 1) % total; render(); };
    }

    if (!document.getElementById('rcss')) {
        var s = document.createElement('style');
        s.id = 'rcss';
        s.textContent = `
            #roleCarouselApp {
                background: transparent;
                border-radius: 0;
                padding: 0;
                font-family: system-ui, sans-serif;
                text-align: center;
                width: 100%;
            }
            #roleCarouselApp .cts {
                margin-bottom: 12px;
                display: flex;
                justify-content: center;
                gap: 6px;
            }
            #roleCarouselApp .ct {
                padding: 4px 14px;
                border-radius: 20px;
                background: rgba(39,53,186,0.06);
                border: 1px solid rgba(39,53,186,0.15);
                color: #2735BA;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                transition: 0.3s;
            }
            #roleCarouselApp .ct.on {
                background: rgba(39,53,186,0.15);
                border-color: #2735BA;
                color: #2735BA;
                font-weight: 700;
                box-shadow: 0 0 12px rgba(39,53,186,0.1);
            }
            #roleCarouselApp .ctr {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }
            #roleCarouselApp .trk {
                display: flex;
                align-items: center;
                gap: 6px;
                justify-content: center;
            }
            #roleCarouselApp .rc {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                padding: 8px 6px;
                border-radius: 14px;
                background: rgba(255,255,255,0.03);
                text-decoration: none !important;
                color: #2735BA;
                min-width: 68px;
                border: 2px solid transparent;
                transition: 0.3s;
                cursor: pointer;
            }
            #roleCarouselApp .rc:hover {
                background: rgba(39,53,186,0.05);
                transform: translateY(-3px);
            }
            #roleCarouselApp .rc.on {
                background: rgba(39,53,186,0.10);
                border-color: #2735BA;
                box-shadow: 0 0 18px rgba(39,53,186,0.12);
                transform: scale(1.06);
            }
            #roleCarouselApp .rc b {
                color: #2735BA;
                font-weight: 600;
            }
            #roleCarouselApp .rc small {
                color: rgba(39,53,186,0.6);
                font-size: 10px;
            }
            #roleCarouselApp .av {
                width: 50px;
                height: 56px;
                border-radius: 50%;
                overflow: hidden;
                margin-bottom: 3px;
                background: rgba(39,53,186,0.04);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            #roleCarouselApp .av img {
                width: 44px;
                height: 52px;
                object-fit: contain;
            }
            #roleCarouselApp .av b {
                font-size: 20px;
                color: rgba(39,53,186,0.3);
            }
            #roleCarouselApp .lb, #roleCarouselApp .rb {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(39,53,186,0.15);
                color: #2735BA;
                font-size: 24px;
                width: 34px;
                height: 40px;
                border-radius: 10px;
                cursor: pointer;
                transition: 0.3s;
            }
            #roleCarouselApp .lb:hover, #roleCarouselApp .rb:hover {
                background: rgba(39,53,186,0.08);
                border-color: #2735BA;
                color: #2735BA;
            }
        `;
        document.head.appendChild(s);
    }

    function go() { render(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
    else go();
    if (window.mw && window.mw.hook) {
        window.mw.hook('wikipage.content').add(function ($c) {
            if (!$c || !$c.find || $c.find('#roleCarouselApp').length === 0) go();
        });
    }
})();