/* ============================================================
   FRISE SERPENT — Wiki Vae Victis  v3.0
   Coller dans : MediaWiki:Common.js
   ============================================================ */

(function () {
    'use strict';

    /* ════════════════════════════════════════
       CONFIGURATION
    ════════════════════════════════════════ */
    var CFG = {
        wikiName:   'Vae Victis',
        storageKey: 'vv_visited',
        countKey:   'vv_visits',
        discord:    'https://discord.com/api/webhooks/1509662700261740845/iprvHgbGm1dTtDnrJ0beL-f2kNEj4L2n1Q1Zo82ZIAdprajtYAMTwnnJQehNO0mIpBiS',
    };

    /* ── Visite ── */
    var alreadyVisited = localStorage.getItem(CFG.storageKey);
    var visitCount     = (parseInt(localStorage.getItem(CFG.countKey), 10) || 0) + 1;
    localStorage.setItem(CFG.storageKey, '1');
    localStorage.setItem(CFG.countKey, String(visitCount));

    /* ── Admin ── */
    function isAdmin() {
        try { return (mw.config.get('wgUserGroups') || []).indexOf('sysop') !== -1; }
        catch (e) { return false; }
    }

    function onReady(fn) {
        document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);
    }

    /* ════════════════════════════════════════
       ÉTAPES — NOUVELLE VISITE
    ════════════════════════════════════════ */
    var STEPS_NEW = [
        {
            icon: '🎮', bg: '#5865F2', fg: '#ffffff',
            label: 'Étape 1', title: 'Rejoins le Discord',
            desc: 'La communauté vit sur Discord — c\'est là que tout se passe ! ' +
                  '<a href="https://discord.gg/usPf63PR7j" class="wf-a" target="_blank">💬 Rejoindre le serveur Vae Victis</a>',
        },
        {
            icon: '📖', bg: '#EDE9FE', fg: '#7C3AED',
            label: 'Étape 2', title: 'Lis le contexte',
            desc: 'Découvre l\'univers dans lequel se déroule Vae Victis avant de te lancer. ' +
                  '<a href="https://vae-victis.fandom.com/fr/wiki/Univers_de_Vae" class="wf-a" target="_blank">→ Lire l\'univers de Vae</a>',
        },
        {
            icon: '⚡', bg: '#FEF3C7', fg: '#B45309',
            label: 'Étape 3', title: 'Découvre les Divinités',
            desc: 'Les divinités sont au cœur de l\'histoire et du roleplay. Prends le temps de les connaître. ' +
                  '<a href="https://vae-victis.fandom.com/fr/wiki/Divinité" class="wf-a" target="_blank">→ Lire les Divinités</a>',
        },
        {
            icon: '⚔️', bg: '#CCFBF1', fg: '#0F766E',
            label: 'Étape 4', title: 'Comprends le RP et ses mécaniques',
            desc: 'Comment fonctionne le roleplay sur Vae Victis ? Toutes les règles et mécaniques sont ici. ' +
                  '<a href="https://vae-victis.fandom.com/fr/wiki/Roleplay" class="wf-a" target="_blank">→ Lire le Roleplay</a>',
        },
        {
            icon: '🌟', bg: '#DCFCE7', fg: '#15803D',
            label: 'Étape 5', title: 'Fais ta réservation !',
            desc: 'Tu es prêt·e à rejoindre l\'aventure ? Fais ta réservation et prépare-toi à entrer dans l\'univers de Vae Victis !',
        },
    ];

    /* ════════════════════════════════════════
       ÉTAPES — VISITEUR DE RETOUR
    ════════════════════════════════════════ */
    function STEPS_BACK(n) {
        return [
            {
                icon: '🎉', bg: '#FEF3C7', fg: '#B45309',
                label: 'Visite n°' + n, title: 'Heureux de te revoir !',
                desc: 'Tu connais déjà les bases. Voici ce que tu peux faire aujourd\'hui pour la communauté.',
            },
            {
                icon: '📰', bg: '#EDE9FE', fg: '#7C3AED',
                label: 'À découvrir', title: 'Nouveaux articles',
                desc: 'Consulte les <a href="/wiki/Special:NewPages" class="wf-a">pages récemment créées</a>.',
            },
            {
                icon: '🛠️', bg: '#CCFBF1', fg: '#0F766E',
                label: 'Contribuer', title: 'Pages à améliorer',
                desc: 'Aide avec les <a href="/wiki/Special:WantedPages" class="wf-a">pages demandées</a>.',
            },
            {
                icon: '💬', bg: '#DBEAFE', fg: '#1D4ED8',
                label: 'Communauté', title: 'Discussions en cours',
                desc: 'Des projets actifs sur les <a href="/wiki/Special:Forum" class="wf-a">forums</a>. Ton avis compte !',
            },
        ];
    }

    /* ════════════════════════════════════════
       HTML DE LA FRISE
    ════════════════════════════════════════ */
    function buildFrise(steps, heading, type) {
        var badge = type === 'new'
            ? '<span class="wf-badge wf-bnew">Nouvelle visite</span>'
            : '<span class="wf-badge wf-bret">Visiteur régulier</span>';

        var rows = steps.map(function (s, i) {
            var side   = (i % 2 === 0) ? 'L' : 'R';
            var isLast = (i === steps.length - 1);
            return (
                '<div class="wf-step wf-' + side + (isLast ? ' wf-last' : '') + '">' +
                    '<div class="wf-dot" style="background:' + s.bg + ';color:' + s.fg + '">' + s.icon + '</div>' +
                    '<div class="wf-cnt">' +
                        '<div class="wf-lbl">' + s.label + '</div>' +
                        '<p class="wf-ttl">' + s.title + '</p>' +
                        '<p class="wf-dsc">' + s.desc + '</p>' +
                    '</div>' +
                '</div>'
            );
        }).join('');

        /* Footer : champ pseudo (frise new) ou simple bouton masquer (retour) */
        var footer;
        if (type === 'new') {
            footer =
                '<label class="wf-pseudo-lbl" for="wf-pseudo">💬 Ton pseudo Discord</label>' +
                '<input id="wf-pseudo" class="wf-pseudo-inp" type="text" placeholder="ex : Arthendis#1234" autocomplete="off" />' +
                '<p class="wf-pseudo-hint">Entre ton pseudo pour déverrouiller</p>' +
                '<button class="wf-done" id="wf-btn" disabled>✅ J\'ai tout lu !</button>';
        } else {
            footer = '<button class="wf-msk" id="wf-msk-btn">✕ Masquer</button>';
        }

        return (
            '<div class="wf-box">' +
                '<h2 class="wf-h2">' + heading + badge + '</h2>' +
                '<div class="wf-snake">' + rows + '</div>' +
                '<div class="wf-foot">' + footer + '</div>' +
            '</div>'
        );
    }

    /* ════════════════════════════════════════
       LOGIQUE FOOTER : déverrouillage + Discord
    ════════════════════════════════════════ */
    function initFooter(el) {
        /* Bouton Masquer (frise retour) */
        var mskBtn = el.querySelector('#wf-msk-btn');
        if (mskBtn) {
            mskBtn.addEventListener('click', function () {
                document.getElementById('wiki-frise').style.display = 'none';
            });
        }

        var btn   = el.querySelector('#wf-btn');
        var input = el.querySelector('#wf-pseudo');
        if (!btn || !input) return;

        /* Déverrouille quand un pseudo est saisi */
        input.addEventListener('input', function () {
            btn.disabled = (this.value.trim() === '');
        });

        /* Clic sur "J'ai tout lu" */
        btn.addEventListener('click', function () {
            var pseudo = input.value.trim() || 'Inconnu';
            var wiki   = 'Anonyme';
            try { wiki = mw.config.get('wgUserName') || 'Anonyme'; } catch (e) {}

            /* Envoi Discord si webhook configuré */
            if (CFG.discord) {
                fetch(CFG.discord, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: CFG.wikiName + ' · Wiki Bot',
                        embeds: [{
                            title: '✨ Nouveau visiteur a lu la frise',
                            color: 6431832,
                            fields: [
                                { name: '💬 Pseudo Discord', value: pseudo,                             inline: true  },
                                { name: '👤 Compte Fandom',  value: wiki,                               inline: true  },
                                { name: '🕐 Heure',          value: new Date().toLocaleString('fr-FR'), inline: true  },
                                { name: '🔗 Page',           value: window.location.href,               inline: false },
                            ],
                            footer:    { text: CFG.wikiName + ' · Frise visiteur' },
                            timestamp: new Date().toISOString(),
                        }]
                    })
                }).catch(function () {});
            }

            /* Masque le champ, affiche la confirmation */
            input.style.display = 'none';
            el.querySelector('.wf-pseudo-lbl').style.display  = 'none';
            el.querySelector('.wf-pseudo-hint').style.display = 'none';
            btn.textContent = '✅ Merci ' + pseudo + ' !';
            btn.disabled    = true;
        });
    }

    /* ════════════════════════════════════════
       MODE ADMIN
    ════════════════════════════════════════ */
    function renderAdmin(el) {
        var isNew = true;

        function render() {
            el.innerHTML = isNew
                ? buildFrise(STEPS_NEW, 'Bienvenue sur ' + CFG.wikiName + ' !', 'new')
                : buildFrise(STEPS_BACK(42), 'Bon retour sur ' + CFG.wikiName + ' !', 'back');

            el.querySelector('.wf-box').insertAdjacentHTML('afterbegin',
                '<div class="wf-adminbar">' +
                    '<span>🛡️ <strong>Mode admin</strong> — prévisualisation</span>' +
                    '<button class="wf-ab' + (isNew  ? ' wf-ab-on' : '') + '" id="wf-an">Nouvelle visite</button>' +
                    '<button class="wf-ab' + (!isNew ? ' wf-ab-on' : '') + '" id="wf-ar">Visiteur de retour</button>' +
                    '<em class="wf-admn">non visible des visiteurs</em>' +
                '</div>'
            );

            el.querySelector('#wf-an').onclick = function () { isNew = true;  render(); };
            el.querySelector('#wf-ar').onclick = function () { isNew = false; render(); };
            initFooter(el);
            schedSnake(el);
        }

        render();
    }

    /* ════════════════════════════════════════
       SVG SERPENT
    ════════════════════════════════════════ */
    function schedSnake(container) {
        setTimeout(function () {
            drawSnake(container.querySelector('.wf-snake'));
        }, 150);
    }

    function drawSnake(el) {
        if (!el) return;
        var old = el.querySelector('.wf-svgl');
        if (old) old.parentNode.removeChild(old);

        var dots = el.querySelectorAll('.wf-dot');
        if (dots.length < 2) return;

        var cr = el.getBoundingClientRect();
        var W  = cr.width;
        if (W < 10) return;

        var pts = [];
        for (var k = 0; k < dots.length; k++) {
            var dr = dots[k].getBoundingClientRect();
            pts.push({
                x: dr.left - cr.left + dr.width  / 2,
                y: dr.top  - cr.top  + dr.height / 2,
            });
        }

        var d = 'M ' + f(pts[0].x) + ' ' + f(pts[0].y);
        for (var i = 0; i < pts.length - 1; i++) {
            var p  = pts[i];
            var q  = pts[i + 1];
            var R  = Math.min(24, (q.y - p.y) / 3);
            var goRight = (i % 2 === 0);

            if (goRight) {
                d += ' H '  + f(W - R);
                d += ' Q '  + f(W) + ' ' + f(p.y) + ' ' + f(W) + ' ' + f(p.y + R);
                d += ' V '  + f(q.y - R);
                d += ' Q '  + f(W) + ' ' + f(q.y) + ' ' + f(W - R) + ' ' + f(q.y);
                d += ' H '  + f(q.x);
            } else {
                d += ' H '  + f(R);
                d += ' Q 0 ' + f(p.y) + ' 0 ' + f(p.y + R);
                d += ' V '  + f(q.y - R);
                d += ' Q 0 ' + f(q.y) + ' ' + f(R) + ' ' + f(q.y);
                d += ' H '  + f(q.x);
            }
        }

        var ns   = 'http://www.w3.org/2000/svg';
        var svg  = document.createElementNS(ns, 'svg');
        svg.setAttribute('class',  'wf-svgl');
        svg.setAttribute('height', String(cr.height));
        svg.setAttribute('width',  '100%');
        svg.style.cssText = 'position:absolute;top:0;left:0;overflow:visible;pointer-events:none;';

        var path = document.createElementNS(ns, 'path');
        path.setAttribute('d',               d);
        path.setAttribute('fill',            'none');
        path.setAttribute('stroke',          '#d1d5db');
        path.setAttribute('stroke-width',    '2');
        path.setAttribute('stroke-linecap',  'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);

        el.style.position = 'relative';
        el.insertBefore(svg, el.firstChild);
    }

    function f(n) { return n.toFixed(1); }

    window.addEventListener('resize', function () {
        var el = document.getElementById('wiki-frise');
        if (el) drawSnake(el.querySelector('.wf-snake'));
    });

    /* ════════════════════════════════════════
       CSS
    ════════════════════════════════════════ */
    function injectCSS() {
        if (document.getElementById('wf-css')) return;
        var s = document.createElement('style');
        s.id  = 'wf-css';
        s.textContent = [
            '.wf-box{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
            'background:#fff;border:1px solid #e5e7eb;border-radius:14px;',
            'padding:20px 24px;margin:16px 0 24px;max-width:720px;}',
            '.wf-h2{font-size:17px;font-weight:600;color:#111827;margin:0 0 24px;line-height:1.4;}',
            '.wf-badge{display:inline-block;font-size:11px;font-weight:500;',
            'padding:2px 10px;border-radius:999px;margin-left:8px;vertical-align:middle;}',
            '.wf-bnew{background:#DCFCE7;color:#15803D;}',
            '.wf-bret{background:#FEF3C7;color:#B45309;}',
            /* Admin */
            '.wf-adminbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;',
            'background:#fef9c3;border:1px solid #fde68a;border-radius:8px;',
            'padding:8px 12px;font-size:13px;color:#92400e;margin-bottom:16px;}',
            '.wf-admn{font-size:12px;opacity:.6;font-style:italic;}',
            '.wf-ab{padding:4px 12px;border-radius:6px;border:1px solid #d97706;',
            'background:transparent;color:#92400e;font-size:12px;cursor:pointer;}',
            '.wf-ab-on{background:#fde68a;font-weight:600;}',
            /* Serpent */
            '.wf-snake{padding:8px 0;}',
            '.wf-step{display:flex;align-items:flex-start;gap:14px;',
            'margin-bottom:44px;position:relative;z-index:1;}',
            '.wf-step:last-child{margin-bottom:0;}',
            '.wf-L{flex-direction:row;}',
            '.wf-R{flex-direction:row-reverse;}',
            '.wf-dot{width:40px;height:40px;border-radius:50%;',
            'display:flex;align-items:center;justify-content:center;',
            'font-size:20px;flex-shrink:0;position:relative;z-index:2;',
            'box-shadow:0 0 0 3px #fff;}',
            '.wf-cnt{flex:1;padding-top:3px;min-width:0;}',
            '.wf-R .wf-cnt{text-align:right;}',
            '.wf-lbl{font-size:10px;font-weight:600;letter-spacing:.07em;',
            'text-transform:uppercase;color:#9ca3af;margin-bottom:2px;}',
            '.wf-ttl{font-size:15px;font-weight:600;color:#111827;margin:0 0 4px;}',
            '.wf-dsc{font-size:13px;color:#4b5563;margin:0;line-height:1.6;}',
            '.wf-a{color:#4f46e5;text-decoration:underline;}',
            '.wf-a:hover{color:#3730a3;}',
            /* Footer */
            '.wf-foot{margin-top:24px;text-align:center;}',
            /* Champ pseudo */
            '.wf-pseudo-lbl{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;}',
            '.wf-pseudo-inp{display:block;width:100%;max-width:320px;margin:0 auto 6px;',
            'padding:9px 14px;border:1.5px solid #d1d5db;border-radius:8px;',
            'font-size:14px;color:#111827;outline:none;box-sizing:border-box;',
            'transition:border-color .15s;}',
            '.wf-pseudo-inp:focus{border-color:#6366f1;}',
            '.wf-pseudo-hint{font-size:12px;color:#9ca3af;margin:0 0 14px;}',
            /* Boutons */
            '.wf-done{background:#6366f1;color:#fff;border:none;border-radius:8px;',
            'padding:9px 28px;font-size:14px;font-weight:600;cursor:pointer;',
            'transition:background .15s;}',
            '.wf-done:hover:not(:disabled){background:#4f46e5;}',
            '.wf-done:disabled{background:#c7d2fe;color:#818cf8;cursor:not-allowed;}',
            '.wf-msk{background:none;border:1px solid #d1d5db;border-radius:6px;',
            'padding:5px 14px;font-size:12px;color:#6b7280;cursor:pointer;}',
            '.wf-msk:hover{background:#f9fafb;}',
        ].join('');
        document.head.appendChild(s);
    }

    /* ════════════════════════════════════════
       INIT
    ════════════════════════════════════════ */
    onReady(function () {
        var el = document.getElementById('wiki-frise');
        if (!el) return;

        injectCSS();

        if (isAdmin()) {
            renderAdmin(el);
        } else if (!alreadyVisited) {
            el.innerHTML = buildFrise(STEPS_NEW, 'Bienvenue sur ' + CFG.wikiName + ' !', 'new');
            schedSnake(el);
            initFooter(el);
        } else {
            el.innerHTML = buildFrise(STEPS_BACK(visitCount), 'Bon retour sur ' + CFG.wikiName + ' !', 'back');
            schedSnake(el);
            initFooter(el);
        }
    });

})();