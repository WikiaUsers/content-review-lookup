mw.loader.using(['mediawiki.api'], function () {
    mw.hook('wikipage.content').add(function () {

        /* ════════════════════════════════════════════
           SPOTLIGHT — sadece Cutiesalvia sayfasında
        ════════════════════════════════════════════ */
      if (document.getElementById('cdd-spotlight-page')) {
    setTimeout(function () {
        var overlayDiv = document.createElement('div');
        overlayDiv.style.position      = 'fixed';
        overlayDiv.style.top           = '0';
        overlayDiv.style.left          = '0';
        overlayDiv.style.right         = '0';
        overlayDiv.style.bottom        = '0';
        overlayDiv.style.pointerEvents = 'none';
        overlayDiv.style.zIndex        = '2147483647';
        overlayDiv.style.background    = 'rgba(0,0,0,0.97)';
        document.body.appendChild(overlayDiv);

        document.addEventListener('mousemove', function (e) {
            overlayDiv.style.background =
                'radial-gradient(circle 150px at ' + e.clientX + 'px ' + e.clientY + 'px, ' +
                'transparent 0%, transparent 30%, rgba(0,0,0,0.97) 100%)';
        });
    }, 500);
}

        /* ════════════════════════════════════════════
           THROW IMAGE — click triggered
        ════════════════════════════════════════════ */
        document.querySelectorAll('[data-throw-image]').forEach(function (card) {
            card.addEventListener('click', function (e) {
                e.preventDefault();

                var imgName = card.getAttribute('data-throw-image');
                var target  = card.getAttribute('data-throw-link');

                new mw.Api().get({
                    action: 'query',
                    titles: 'File:' + imgName,
                    prop: 'imageinfo',
                    iiprop: 'url',
                    format: 'json'
                }).done(function (data) {
                    var pages = data.query.pages;
                    var page  = pages[Object.keys(pages)[0]];
                    if (!page.imageinfo) { window.location.href = target; return; }
                    var imgSrc = page.imageinfo[0].url;

                    var overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000000;z-index:99999;display:flex;justify-content:center;align-items:center;overflow:hidden;';

                    var img = document.createElement('img');
                    img.src = imgSrc;
                    img.style.cssText = 'width:30px;height:30px;object-fit:contain;transition:width 0.9s cubic-bezier(0.22,1,0.36,1),height 0.9s cubic-bezier(0.22,1,0.36,1);';

                    overlay.appendChild(img);
                    document.body.appendChild(overlay);

                    setTimeout(function () {
                        img.style.width  = '100vw';
                        img.style.height = '100vh';
                    }, 80);

                    setTimeout(function () {
                        overlay.style.transition = 'opacity 0.5s ease';
                        overlay.style.opacity    = '0';
                        setTimeout(function () {
                            overlay.remove();
                            window.location.href = target;
                        }, 500);
                    }, 1300);
                });
            });
        });

        /* ════════════════════════════════════════════
           SHARED DATA — Apps & Categories
        ════════════════════════════════════════════ */
        var appData = {
            'Roblox': {
                icon: '⬡',
                categories: ['Characters', 'Games', 'Lore', 'Events', 'Locations', 'Objects', 'Missions']
            },
            'Minecraft': {
                icon: '⬡',
                categories: ['Characters', 'Games', 'Lore', 'Events', 'Locations', 'Objects', 'Missions']
            }
        };

        /* ════════════════════════════════════════════
           BUILD CREATOR
        ════════════════════════════════════════════ */
        function buildCreator(container, lockedApp, lockedCat, idSuffix) {
            var sfx = idSuffix || '';
            var html = '';
            html += '<div class="cdd-creator-box">';
            html += '<div class="cdd-creator-title">▶ CREATE NEW PAGE';
            if (lockedApp && lockedCat) {
                html += ' <span style="font-size:11px;color:#009900;letter-spacing:1px;">— ' + lockedApp + ' / ' + lockedCat + '</span>';
            }
            html += '</div>';

            if (!lockedApp) {
                html += '<div class="cdd-creator-row">';
                html += '<label class="cdd-label" for="cdd-app' + sfx + '">[ APP ]</label>';
                html += '<select id="cdd-app' + sfx + '" class="cdd-select">';
                html += '<option value="">-- Select App --</option>';
                Object.keys(appData).forEach(function (app) {
                    html += '<option value="' + app + '">' + appData[app].icon + ' ' + app + '</option>';
                });
                html += '</select>';
                html += '</div>';
            }

            if (!lockedCat) {
                html += '<div class="cdd-creator-row">';
                html += '<label class="cdd-label" for="cdd-cat' + sfx + '">[ CATEGORY ]</label>';
                html += '<select id="cdd-cat' + sfx + '" class="cdd-select"' + (!lockedApp ? ' disabled' : '') + '>';
                if (!lockedApp) {
                    html += '<option value="">-- Select App First --</option>';
                } else {
                    html += '<option value="">-- Select Category --</option>';
                    appData[lockedApp].categories.forEach(function (cat) {
                        html += '<option value="' + cat + '">[ ' + cat.toUpperCase() + ' ]</option>';
                    });
                }
                html += '</select>';
                html += '</div>';
            }

            html += '<div class="cdd-creator-row">';
            html += '<label class="cdd-label" for="cdd-title' + sfx + '">[ PAGE NAME ]</label>';
            html += '<input type="text" id="cdd-title' + sfx + '" class="cdd-input" placeholder="Enter page name..." />';
            html += '</div>';

            html += '<div class="cdd-creator-row">';
            html += '<button id="cdd-btn' + sfx + '" class="cdd-btn" disabled>INITIALIZE PAGE &gt;&gt;</button>';
            html += '</div>';

            html += '<div id="cdd-status' + sfx + '" class="cdd-status"></div>';
            html += '</div>';

            container.innerHTML = html;

            var appSel   = document.getElementById('cdd-app' + sfx);
            var catSel   = document.getElementById('cdd-cat' + sfx);
            var titleIn  = document.getElementById('cdd-title' + sfx);
            var btn      = document.getElementById('cdd-btn' + sfx);
            var statusEl = document.getElementById('cdd-status' + sfx);

            function getApp()   { return lockedApp || (appSel  ? appSel.value.trim()  : ''); }
            function getCat()   { return lockedCat || (catSel  ? catSel.value.trim()  : ''); }
            function getTitle() { return titleIn ? titleIn.value.trim() : ''; }

            function setStatus(msg, type) {
                statusEl.textContent = msg;
                statusEl.className = 'cdd-status' + (type ? ' cdd-status--' + type : '');
            }

            function checkReady() {
                btn.disabled = !(getApp() && getCat() && getTitle());
            }

            if (appSel) {
                appSel.addEventListener('change', function () {
                    if (!catSel) return;
                    var sel = this.value;
                    catSel.innerHTML = '';
                    if (!sel) {
                        catSel.innerHTML = '<option value="">-- Select App First --</option>';
                        catSel.disabled = true;
                    } else {
                        var def = document.createElement('option');
                        def.value = ''; def.textContent = '-- Select Category --';
                        catSel.appendChild(def);
                        appData[sel].categories.forEach(function (cat) {
                            var o = document.createElement('option');
                            o.value = cat;
                            o.textContent = '[ ' + cat.toUpperCase() + ' ]';
                            catSel.appendChild(o);
                        });
                        catSel.disabled = false;
                    }
                    checkReady();
                });
            }

            if (catSel)  catSel.addEventListener('change', checkReady);
            if (titleIn) titleIn.addEventListener('input',  checkReady);

            btn.addEventListener('click', function () {
                var app   = getApp();
                var cat   = getCat();
                var title = getTitle();

                if (!app || !cat || !title) {
                    setStatus('⚠ All fields are required.', 'error');
                    return;
                }

                var fullTitle = app + ' ' + cat + '/' + title;
                var preload   = 'Template:' + app + '_' + cat + '_page';

                var url = mw.util.getUrl(fullTitle, {
                    action:  'edit',
                    preload: preload,
                    summary: 'New page | App: ' + app + ' | Category: ' + cat
                });

                setStatus('▶ Redirecting to editor...', 'success');
                setTimeout(function () { window.location.href = url; }, 500);
            });

            if (titleIn) {
                titleIn.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' && !btn.disabled) btn.click();
                });
            }
        }

        /* ════════════════════════════════════════════
           MAIN PAGE WIDGET
        ════════════════════════════════════════════ */
        var mainCreator = document.getElementById('cdd-page-creator');
        if (mainCreator) {
            buildCreator(mainCreator, null, null, '-main');
        }

        /* ════════════════════════════════════════════
           CATEGORY PAGE AUTO-INJECTION
        ════════════════════════════════════════════ */
        if (mw.config.get('wgNamespaceNumber') !== 14) return;

        var pageName    = mw.config.get('wgTitle');
        var detectedApp = null;
        var detectedCat = null;

        Object.keys(appData).forEach(function (app) {
            appData[app].categories.forEach(function (cat) {
                if (pageName === app + ' ' + cat) {
                    detectedApp = app;
                    detectedCat = cat;
                }
            });
            if (pageName === app) {
                detectedApp = app;
            }
        });

        if (!detectedApp) return;

        var wrapper = document.createElement('div');
        wrapper.id = 'cdd-cat-creator';
        wrapper.style.cssText = 'background:#000000;border:1px solid #00FF00;padding:14px;margin-bottom:16px;font-family:Courier New,Courier,monospace;';

        var contentArea =
            document.querySelector('.mw-parser-output') ||
            document.querySelector('#mw-content-text')  ||
            document.querySelector('.page-content');

        if (!contentArea) return;
        contentArea.insertBefore(wrapper, contentArea.firstChild);

        buildCreator(wrapper, detectedApp, detectedCat || null, '-cat');
    });
});