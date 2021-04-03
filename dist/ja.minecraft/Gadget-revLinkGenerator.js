$(function () {
    'use strict';
    var action = mw.config.get('wgAction');

    if (action !== 'edit' && action !== 'submit') return;

    var $summaryWrapper = $('#wpSummaryLabel').find('.oo-ui-fieldLayout-field');
    var $summary        = $summaryWrapper.find('#wpSummary');
    var $rlg;
    var defaultFormat   = '[[:en:Special:PermanentLink/$1|en:$1]]';
    var lsFormat        = localStorage.getItem('gadget-rlg-format');
    var clsActive       = 'rlg-active';

    var i18n = {
        text       : {
            revisionID        : '版ID',
            insLink           : '生成',
            format            : '生成形式',
            formatNote        : '（$1が版ID）',
            reset             : 'リセット',
            getFromEnglish    : '版IDを英語版ページから取得',
            getID             : '取得',
            getting           : '取得中…',
            insCurrentPagename: '現在のページ名',
            closePanel        : '閉じる',
            errorCouldntGet   : '取得できませんでした'
        },
        placeholder: {
            enterRevisionID     : '版IDを入力',
            enterFormat         : '生成形式を入力',
            enterEnglishPagename: 'ページ名を入力'
        },
        title      : {
            insLink           : '入力した版IDを生成形式のとおり、要約欄での現在のカーソル位置に出力します。',
            format            : 'ここに入力している形式で版IDが出力されます。\n空欄の場合は、版IDのみが出力されます。',
            resetFormat       : '形式をデフォルトにリセットします。',
            getID             : '入力した英語版のページから版IDを取得します。',
            insCurrentPagename: '現在のページ名を入力欄に補完します。\n英語版の言語間リンクがある場合は、そちらを使用します。'
        }
    };

    var html = [
        '<div id="rlg-body">',
        '<div class="rlg-item-wrapper">',
        '<div class="rlg-item revision">',
        '<form action="javascript:void(0)">',
        '<label for="revisionID">',
        i18n.text.revisionID,
        '</label>',
        '<input type="text" name="revisionID" ',
        'placeholder="' + i18n.placeholder.enterRevisionID + '" required>',
        '<div class="rlg-actions">',
        '<button class="mw-ui-button mw-ui-progressive" name="insLink" ',
        'title="' + i18n.title.insLink + '">',
        i18n.text.insLink,
        '</button>',
        '</div>',
        '</form>',
        '</div>',
        '<div class="rlg-item format">',
        '<form action="javascript:void(0)">',
        '<label for="format">',
        i18n.text.format,
        '<span class="rlg-small">',
        i18n.text.formatNote,
        '</span>',
        '</label>',
        '<textarea name="format" rows="2" ',
        'placeholder="' + i18n.placeholder.enterFormat + '" ',
        'title="' + i18n.title.format + '">',
        lsFormat ? lsFormat : defaultFormat,
        '</textarea>',
        '<div class="rlg-actions">',
        '<button class="mw-ui-button mw-ui-progressive" name="resetFormat" ',
        'title="' + i18n.title.resetFormat + '">',
        i18n.text.reset,
        '</button>',
        '</div>',
        '</form>',
        '</div>',
        '<div class="rlg-item actions-area"></div>',
        '</div>',
        '<hr>',
        '<div class="rlg-item-wrapper">',
        '<div class="rlg-item english">',
        '<form action="javascript:void(0)">',
        '<label for="englishPage">',
        i18n.text.getFromEnglish,
        '</label>',
        '<input type="text" name="englishPage" ',
        'placeholder="' + i18n.placeholder.enterEnglishPagename + '" required>',
        '<div class="rlg-actions">',
        '<button class="mw-ui-button mw-ui-progressive" name="getID" ',
        'title="' + i18n.title.getID + '">',
        i18n.text.getID,
        '</button>',
        '<button class="mw-ui-button mw-ui-progressive" type="button" name="insCurrentPagename" ',
        'title="' + i18n.title.insCurrentPagename + '">',
        i18n.text.insCurrentPagename,
        '</button>',
        '<button class="mw-ui-button mw-ui-quite" type="button" name="closePanel">',
        i18n.text.closePanel,
        '</button>',
        '</div>',
        '</form>',
        '</div>',
        '<div class="rlg-error error">',
        i18n.text.errorCouldntGet,
        '</div>',
        '<div class="rlg-item actions-area"></div>',
        '</div>',
        '</div>'
    ].join('');

    $summaryWrapper.append(html);
    $rlg = $('#rlg-body');

    // Panel actions
    // Show panel when focused the summary
    $summary.on('focus', showPanelWhenFocused);
    // Hide panel when the close button is clicked
    $rlg.find('button[name="closePanel"]').on('click', hidePanelWhenCloseIsClicked);
    // Hide panel when clicked anywhere except for the summary or the panel
    $(document).on('mousedown', hidePanelWhenClickedAnywhere);
    // Insert permanent link string to current cursor position on the summary
    $rlg.find('button[name="insLink"]').on('click', insPermanentLink);
    // Reset the format to default
    $rlg.find('button[name="resetFormat"]').on('click', resetFormat);
    // Get ID from the specified English page using ajax and insert it into the revision field
    $rlg.find('button[name="getID"]').on('click', getRevisionIDFromEnglish);
    // Insert current pagename to the English pagename field
    $rlg.find('button[name="insCurrentPagename"]').on('click', insCurrentPagename);

    // Allows input that only number or modifier key
    var allowKeycode = [8, 46];

    $rlg.find('input[name="revisionID"]').on('keypress', function (e) {
        var key = e.keyCode;
        var str = String.fromCharCode(key);

        if (!(
            /[0-9]/.test(str) ||
            (37 <= key && key <= 40) ||
            !allowKeycode.indexOf(key)
        )) {
            return false;
        }
    });

    function showPanelWhenFocused() {
        if ($rlg.hasClass(clsActive)) return;

        $rlg.addClass(clsActive);
    }

    function hidePanelWhenCloseIsClicked() {
        $rlg.removeClass(clsActive);
    }

    function hidePanelWhenClickedAnywhere(e) {
        var $this = $(e.target);

        if (
            !$this.closest($rlg).length &&
            !$this.is($summary) &&
            $rlg.hasClass(clsActive)
        ) {
            $rlg.removeClass(clsActive);
        }
    }

    function insPermanentLink() {
        var elemID     = $rlg.find('input[name="revisionID"]').val();
        var elemFormat = $rlg.find('textarea[name="format"]').val();

        if (!elemID) return;

        // Save format string to localstorage
        localStorage.setItem('gadget-rlg-format', elemFormat);

        // RegExp replace. If the format field is empty, only insert a id
        var result    = !elemFormat ? elemID : elemID.replace(new RegExp('(' + elemID + ')'), elemFormat);
        var cursorPos = $summary.get(0).selectionStart;

        $summary.val(function (_, v) {
            return v.substring(0, cursorPos) + result + v.substring(cursorPos);
        });

        // After insertion, focus to the summary field and set cursor position to end of inserted string
        var newCursorPos = cursorPos + result.length;

        $summary.focus().get(0).setSelectionRange(newCursorPos, newCursorPos);
    }

    function resetFormat() {
        var $format = $rlg.find('textarea[name="format"]');

        $format.val(defaultFormat);
    }

    var iwPromise; // Acquired json data for interwiki
    function getRevisionIDFromEnglish() {
        var $getBtn        = $rlg.find('button[name="getID"]');
        var elemEnPagename = $rlg.find('input[name="englishPage"]').val();

        // Start
        $getBtn.text(i18n.text.getting);

        if (iwPromise) {
            iwPromise
                .then(resolve, rejected)
                // End
                .then(function () {
                    $getBtn.text(i18n.text.getID);
                });
        } else {
            rejected();
            $getBtn.text(i18n.text.getID);
        }

        function resolve(data) {
            var articleID = data.query.pageids[0];
            var pagename;
            // If acquired English page does not exist, use current pagename for ID acquisition
            if (articleID === '-1') {
                rejected();

                return;
            }

            // Return if English pagename field is empty
            if (!elemEnPagename) return;

            pagename = data.query.pages[articleID];
            // If acquired json hasn't interwiki data, use current pagename
            if (!('langlinks' in pagename)) {
                rejected();

                return;
            }

            pagename = pagename.langlinks[0]['*'];

            // If acquired English page does not match the current English
            // pagename field, use current pagename for ID acquisition
            if (
                elemEnPagename &&
                elemEnPagename !== pagename
            ) {
                rejected();

                return;
            }

            _getRevisionIdJSON(pagename);
        }

        function rejected() {
            if (!elemEnPagename) return;

            _getRevisionIdJSON(elemEnPagename);
        }
    }

    function insCurrentPagename() {
        var $enPagename     = $rlg.find('input[name="englishPage"]');
        var $insBtn         = $rlg.find('button[name="insCurrentPagename"]');
        var currentPagename = mw.config.get('wgPageName');
        var enPagename;
        iwPromise           = getEnInterwiki();

        // Start
        $insBtn.text(i18n.text.getting);

        iwPromise
            .then(resolve, rejected)
            // End
            .then(function () {
                $insBtn.text(i18n.text.insCurrentPagename);
            });

        function getEnInterwiki() {
            var api = new mw.Api();

            return api.get({
                action      : 'query',
                format      : 'json',
                prop        : 'langlinks',
                indexpageids: '1',
                titles      : currentPagename,
                lllang      : 'en'
            });
        }

        function resolve(data) {
            var articleID = data.query.pageids[0];
            if (articleID === '-1') {
                rejected();

                return;
            }

            enPagename = data.query.pages[articleID];
            if (!('langlinks' in enPagename)) {
                rejected();

                return;
            }

            $enPagename.val(enPagename.langlinks[0]['*']);
        }

        function rejected() {
            var namespace = mw.config.get('wgCanonicalNamespace');
            var title     = mw.config.get('wgTitle');
            enPagename    = (namespace ? namespace + ':' : '') + title;
            $enPagename.val(enPagename);
        }
    }

    function _getRevisionIdJSON(pagename) {
        var api = 'https://minecraft.fandom.com/api.php';

        return $.getJSON(api, {
            origin      : '*',
            action      : 'query',
            format      : 'json',
            prop        : 'revisions',
            indexpageids: '1',
            titles      : pagename,
            rvprop      : 'ids'
        })
                .then(function (data) {
                    var articleID = data.query.pageids[0];
                    if (articleID === '-1') {
                        // Show error message w/ animation
                        $rlg.find('.rlg-error').addClass(clsActive);
                        setTimeout(function () {
                            $rlg.find('.rlg-error').removeClass(clsActive);
                        }, 3000);
                        return;
                    }

                    var revisionID = data.query.pages[articleID].revisions[0].revid;
                    $rlg.find('input[name="revisionID"]').val(revisionID);
                });
    }
});