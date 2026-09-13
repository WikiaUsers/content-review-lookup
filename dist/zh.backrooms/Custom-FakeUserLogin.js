// 伪登录界面
// 这是一个假的用户登录框，仅仅用于页面的演出效果，这意味着这个用户登陆框不会记录用户的任何密码或用户名信息，也不会对用户的信息安全造成任何威胁。使用这些代码的页面创建者会在当页自定义一个假的用户名和密码。如果用户不想，这个假的用户登录框不会泄露用户的任何真实信息。
// This is a fake user login form, only used for the page's visual effect. It means that this login box won't record any user's password or username information, nor will it pose any threat to user information security. The page creator using this code can customize a fake username and password on the page. If users don't want to, this fake login Form won't leak any real information about them.
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
//This is a fake user login form, only used for the page's visual effect. It means that this login box won't record any user's password or username information, nor will it pose any threat to user information security. The page creator using this code can customize a fake username and password on the page. If users don't want to, this fake login Form won't leak any real information about them.
//This has NOTHING to do with Fandom Login Forms.