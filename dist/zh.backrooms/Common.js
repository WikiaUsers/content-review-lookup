// Fandom Compass图标
(function () {
    const img = $('<img/>').css({ 'height': '70px', 'position': 'relative', 'top': '20px', 'user-select': 'none' }).attr({ title: '本站点已是Fandom Compass计划的成员之一。' });
    $('.fandom-community-header__community-name-wrapper').append($('<a/>').addClass('compass-wiki-badge').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(img));
    const changesrc = () => img.attr('src', $('body').attr('data-theme') == 'dark' ? 'https://static.wikia.nocookie.net/backrooms/images/c/ca/Fandom_Compass_dark.png/revision/latest?cb=20250412193710&format=original&path-prefix=zh' : 'https://static.wikia.nocookie.net/backrooms/images/1/18/Fandom_Compass_light.png/revision/latest?cb=20250412193642&format=original&path-prefix=zh');
    changesrc();
    new MutationObserver(changesrc).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
})();

// 遥控音频
(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0].getElementsByClassName("mw-file-element")[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    // [[Template:CSS]]
    $("span.import-css").each(function () {
        var css = mw.util.addCSS($(this).attr("data-css"));
        $(css.ownerNode).addClass("import-css")
            .attr("data-css-hash", $(this).attr("data-css-hash"))
            .attr("data-from", $(this).attr("data-from"))
            .attr("data-trigger", $(this).attr("data-trigger"));
        var trigger = $(this).attr("data-trigger");
        var triggerOpened = false;
        if (trigger != "none") {
            css.disabled = true;
            $(".csstrigger-" + trigger).click(function () {
                css.disabled = !css.disabled;
                triggerOpened = true;
            });
        }
        // 页顶CSS控件
        $(".css-toggler").click(function () {
            if ((trigger != "none" && triggerOpened) || (trigger == "none")) css.disabled = !css.disabled;
        });
    });

    // 页顶音频控件
    $(".audio-toggler").click(function () {
        $("audio").get().forEach(function (audio) { if (audio.paused || audio.ended) { audio.play(); } else { audio.pause(); } });
    });

    // [[Template:Button Audio]]
    $(".t-audio").each(function () {
        var toggle = $(this).attr("data-toggle");
        if (!toggle) return;
        $(".t-audio-toggle-" + toggle).click(function () {
            var audio = $(".t-audio-toggle-" + toggle + " audio")[0];
            if (!audio) return;
            if (audio.paused || audio.ended) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });

    // [[Template:SitenoticeTab]]
    $(".sitenotice-tab-container").each(function () {
        var container = $(this);
        function switchTab(offset) {
            return function () {
                var tabs = container.children(".sitenotice-tab").toArray();
                var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
                var count = tabs.length;
                if (no < 1) no = count;
                else if (no > count) no = 1;
                for (var i = 0; i < count; i++)
                    tabs[i].style.display = (i + 1 == no ? null : "none");
                container.find(".sitenotice-tab-no")[0].innerText = no;
            };
        }
        container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
        container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
    });
});

// JS脚本联立
$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-ImportScripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts }); // importArticles仅接受MediaWiki命名空间
    }
});

// CSS预览
(function () {
    var page = mw.config.get('wgPageName') || '';
    var model = mw.config.get('wgPageContentModel');
    if (!page || model !== 'css') return;
    var rawUrl = mw.util.getUrl(page, { action: 'raw', ctype: 'text/css' });
    fetch(rawUrl, { credentials: 'same-origin' })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        })
        .then(function (cssText) {
            if (!cssText) return;
            var style = document.createElement('style');
            style.type = 'text/css';
            style.setAttribute('data-injected-from', page);
            style.appendChild(document.createTextNode(cssText));
            document.head.appendChild(style);
        })
        .catch(function (err) {
            console.error('加载CSS源失败: ', page, err);
        });
}());

// [[Template:BMP]]
$(document).ready(function () {
    mw.hook('wikipage.content').add(function ($content) {
        // 为每个播放器创建独立的控制器
        $content.find('.player-container').each(function () {
            const $player = $(this);
            const playerState = {
                isPlaying: false,
                isDragging: false,
                progress: $player.find('.progress'),
                playBtn: $player.find('.play-btn'),
                audio: new Audio($player.data('audio-src')),
                volumeControl: $player.find('.volume-control'),
                volumeContainer: $player.find('.volume-slider-container'),
                volumeFill: $player.find('.volume-slider-fill'),
                volumeThumb: $player.find('.volume-slider-thumb'),
                volumeIcon: $player.find('.volume-icon')
            };
            // 设置专辑封面
            const albumArt = $player.find('.album-art');
            albumArt.css('background-image', `url(${$player.data('album-art')})`);
            // 播放/暂停控制
            playerState.playBtn.on('click', function () {
                if (playerState.isPlaying) {
                    playerState.audio.pause();
                    playerState.isPlaying = false;
                    $(this).text('▶');
                } else {
                    playerState.audio.play();
                    playerState.isPlaying = true;
                    $(this).text('⏸');
                }
            });
            // 进度更新
            $(playerState.audio).on('timeupdate', function () {
                const percentage = (this.currentTime / this.duration) * 100;
                playerState.progress.css('width', percentage + '%');
            });
            // 进度条点击
            $player.find('.progress-bar').on('click', function (e) {
                const percent = e.offsetX / $(this).width();
                playerState.audio.currentTime = percent * playerState.audio.duration;
            });
            // 音量控制函数
            function updateVolume(e) {
                const rect = playerState.volumeContainer[0].getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

                playerState.volumeFill.css('transform', `scaleX(${percentage / 100})`);
                playerState.volumeThumb.css('right', `${100 - percentage}%`);
                playerState.audio.volume = percentage / 100;
                updateVolumeIcon(percentage);
            }
            // 音量拖动事件
            playerState.volumeContainer.on('mousedown', function (e) {
                playerState.isDragging = true;
                updateVolume(e);
            });
            $(document).on('mousemove', function (e) {
                if (playerState.isDragging) {
                    updateVolume(e);
                }
            });
            $(document).on('mouseup', function () {
                playerState.isDragging = false;
            });
            // 更新音量图标
            function updateVolumeIcon(value) {
                if (value == 0) {
                    playerState.volumeIcon.text('🔇');
                } else if (value < 50) {
                    playerState.volumeIcon.text('🔉');
                } else {
                    playerState.volumeIcon.text('🔊');
                }
            }
            // 音量图标双击事件
            playerState.volumeIcon.on('dblclick', function () {
                if (playerState.audio.volume > 0) {
                    playerState.audio.volume = 0;
                    playerState.volumeFill.css('transform', 'scaleX(0)');
                    playerState.volumeThumb.css('right', '100%');
                    playerState.volumeIcon.text('🔇');
                } else {
                    playerState.audio.volume = 1;
                    playerState.volumeFill.css('transform', 'scaleX(1)');
                    playerState.volumeThumb.css('right', '0%');
                    playerState.volumeIcon.text('🔊');
                }
            });
        });
    });
});

// 伪登录界面
// 这是一个假的用户登录框，仅仅用于页面的演出效果，这意味着这个用户登陆框不会记录用户的任何密码或用户名信息，也不会对用户的信息安全造成任何威胁。使用这些代码的页面创建者会在当页自定义一个假的用户名和密码。如果用户不想，这个假的用户登录框不会泄露用户的任何真实信息。
// This is a fake user login From, only used for the page's visual effect. It means that this login box won't record any user's password or username information, nor will it pose any threat to user information security. The page creator using this code can customize a fake username and password on the page. If users don't want to, this fake login Form won't leak any real information about them.
// This has NOTHING to do with Fandom Login Forms.
mw.loader.using(['mediawiki.util']).then(function () {
    var THEME_KEYS = {
        bg: '--fl-bg',
        panel: '--fl-panel',
        accent: '--fl-accent',
        text: '--fl-text',
        muted: '--fl-muted',
        danger: '--fl-danger',
        border: '--fl-border',
        radius: '--fl-radius',
        font: '--fl-font',
        titleSize: '--fl-title-size',
        width: '--fl-width',
        pad: '--fl-pad',
        inputBg: '--fl-input-bg',
        inputBorder: '--fl-input-border',
        buttonText: '--fl-button-text'
    };

    function addStyles() {
        if (document.getElementById('fandom-login-gate-style')) return;
        var style = document.createElement('style');
        style.id = 'fandom-login-gate-style';
        style.textContent = [
            '.fandom-login-gate{',
            '  --fl-bg:#1a1f2e;',
            '  --fl-panel:#243044;',
            '  --fl-accent:#5b9fd4;',
            '  --fl-text:#e8eef5;',
            '  --fl-muted:#9aa8bc;',
            '  --fl-danger:#e07070;',
            '  --fl-border:1px solid #3a4a63;',
            '  --fl-radius:0;',
            '  --fl-font:Georgia,"Noto Serif SC",serif;',
            '  --fl-title-size:1.35em;',
            '  --fl-width:420px;',
            '  --fl-pad:1.5em 1.4em 1.3em;',
            '  --fl-input-bg:var(--fl-panel);',
            '  --fl-input-border:1px solid #4a5d7a;',
            '  --fl-button-text:#0f1724;',
            '  max-width:var(--fl-width);',
            '  margin:1.5em auto;',
            '  font-family:var(--fl-font);',
            '}',
            '.fandom-login-panel{',
            '  background:linear-gradient(160deg,color-mix(in srgb,var(--fl-panel) 85%,white),var(--fl-bg));',
            '  border:var(--fl-border);',
            '  border-radius:var(--fl-radius);',
            '  padding:var(--fl-pad);',
            '  color:var(--fl-text);',
            '}',
            '.fandom-login-title{font-size:var(--fl-title-size);letter-spacing:.04em;margin-bottom:1em;text-align:center}',
            '.fandom-login-form label{display:block;font-size:.85em;color:var(--fl-muted);margin:.75em 0 .35em}',
            '.fandom-login-form input{',
            '  width:100%;box-sizing:border-box;',
            '  background:var(--fl-input-bg);',
            '  border:var(--fl-input-border);',
            '  border-radius:var(--fl-radius);',
            '  color:var(--fl-text);',
            '  padding:.55em .7em;outline:none;',
            '  font-family:inherit;',
            '}',
            '.fandom-login-form input:focus{border-color:var(--fl-accent)}',
            '.fandom-login-form button{',
            '  display:block;width:100%;margin-top:1.1em;padding:.65em;',
            '  background:var(--fl-accent);border:0;',
            '  border-radius:var(--fl-radius);',
            '  color:var(--fl-button-text);font-weight:700;cursor:pointer;',
            '  font-family:inherit;',
            '}',
            '.fandom-login-form button:hover{filter:brightness(1.08)}',
            '.fandom-login-error{color:var(--fl-danger);text-align:center;margin:.8em 0 0;font-size:.9em}',
            '.fl-expect-user,.fl-expect-pass,.fl-theme{display:none!important}',
            '.fandom-login-gate:not(.is-unlocked) .fandom-login-secret{display:none!important}',
            '.fandom-login-gate.is-unlocked .fandom-login-panel{display:none!important}',
            '.fandom-login-gate.is-unlocked .fandom-login-secret{display:block!important}'
        ].join('');
        document.head.appendChild(style);
    }

    function readCred($gate, name) {
        var $node = $gate.find('.fl-expect-' + name).first();
        if ($node.length) return $.trim($node.text());
        return String($gate.attr('data-' + name) || '');
    }

    function applyTheme($gate) {
        var el = $gate.get(0);
        if (!el) return;
        Object.keys(THEME_KEYS).forEach(function (key) {
            var raw = $gate.attr('data-fl-' + key.toLowerCase()) || $gate.attr('data-fl-' + key);
            if (raw) el.style.setProperty(THEME_KEYS[key], raw);
        });
        var themeText = $.trim($gate.find('.fl-theme').first().text() || '');
        if (themeText) {
            themeText.split(/[;\n]/).forEach(function (pair) {
                var m = $.trim(pair).match(/^([a-zA-Z]+)\s*:\s*(.+)$/);
                if (!m) return;
                var key = m[1];
                var val = $.trim(m[2]);
                var map = {
                    bg: 'bg', panel: 'panel', accent: 'accent', text: 'text', muted: 'muted',
                    danger: 'danger', border: 'border', radius: 'radius', font: 'font',
                    width: 'width', pad: 'pad',
                    titlesize: 'titleSize', 'title-size': 'titleSize', titleSize: 'titleSize',
                    inputbg: 'inputBg', 'input-bg': 'inputBg', inputBg: 'inputBg',
                    inputborder: 'inputBorder', 'input-border': 'inputBorder', inputBorder: 'inputBorder',
                    buttontext: 'buttonText', 'button-text': 'buttonText', buttonText: 'buttonText'
                };
                var normalized = map[key] || map[key.toLowerCase()];
                if (normalized && THEME_KEYS[normalized]) {
                    el.style.setProperty(THEME_KEYS[normalized], val);
                }
            });
        }
    }

    function bindGates($root) {
        addStyles();
        $root.find('.fandom-login-gate').addBack('.fandom-login-gate').each(function () {
            var $gate = $(this);
            if (!$gate.hasClass('fandom-login-gate') || $gate.data('bound')) return;
            $gate.data('bound', true);
            applyTheme($gate);
            var user = readCred($gate, 'user');
            var pass = readCred($gate, 'pass');
            var $form = $gate.find('.fandom-login-form');
            var $error = $gate.find('.fandom-login-error');

            $form.empty().append(
                $('<label>').text('用户名').append(
                    $('<input type="text" class="fl-user" autocomplete="off" spellcheck="false">')
                ),
                $('<label>').text('密码').append(
                    $('<input type="password" class="fl-pass" autocomplete="off">')
                ),
                $('<button>', { type: 'button', 'class': 'fl-submit', text: '解锁' })
            );

            function tryUnlock() {
                if ($form.find('.fl-user').val() === user && $form.find('.fl-pass').val() === pass) {
                    $error.hide();
                    $gate.addClass('is-unlocked');
                } else {
                    $error.show();
                }
            }
            $form.on('click', '.fl-submit', tryUnlock);
            $form.on('keydown', 'input', function (e) {
                if (e.key === 'Enter') tryUnlock();
            });
        });
    }

    mw.hook('wikipage.content').add(bindGates);
    bindGates($(document));
});
//67890
//这是一个假的用户登录框，仅仅用于页面的演出效果，这意味着这个用户登陆框不会记录用户的任何密码或用户名信息，也不会对用户的信息安全造成任何威胁。使用这些代码的页面创建者会在当页自定义一个假的用户名和密码。如果用户不想，这个假的用户登录框不会泄露用户的任何真实信息。
//This is a fake user login From, only used for the page's visual effect. It means that this login box won't record any user's password or username information, nor will it pose any threat to user information security. The page creator using this code can customize a fake username and password on the page. If users don't want to, this fake login Form won't leak any real information about them.
//This has NOTHING to do with Fandom Login Forms.