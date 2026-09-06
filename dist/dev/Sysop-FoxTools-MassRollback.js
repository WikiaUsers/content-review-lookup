/**
 * +------------------------------------------------------------------------------+
 * |    === ⚠️ PERHATIAN ⚠️ ===                                                   |
 * |    Mengubah halaman ini dapat mempengaruhi banyak pengguna.                  |
 * |    Harap diskusi di [[Pembicaraan Wikipedia:FoxTools]] sebelum menyunting.   |
 * +------------------------------------------------------------------------------+
 *
 * This is Vukova's Sysop FoxTools, anti-vandalism mobile script for Administrators.
 * Visit [[WP:SFT]] for more information.
 */

// ––– Sysop FoxTools MassRollback Start –––
// <nowiki>

function notiOK(msg){ mw.notify ? mw.notify(msg, { type: 'success' }) : alert(msg); }
function notiERR(msg){ mw.notify ? mw.notify(msg, { type: 'error' }) : alert('❌ ' + msg); }
function notiWARN(msg){ mw.notify ? mw.notify(msg, { type: 'warn' }) : alert('⚠️ ' + msg); }
const SysopFoxTools = '[[WP:SFT|🦊 Sysop FoxTools]]';

$(document).ready(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions') {
        return;
    }

    if ($('#rollback-box').length === 0) {
        var $rollbackBox = $(`
            <div id="rollback-box" class="mw-htmlform-ooui-wrapper oo-ui-layout oo-ui-panelLayout oo-ui-panelLayout-padded oo-ui-panelLayout-framed">
                <form id="rollback-form" class="mw-htmlform mw-htmlform-ooui oo-ui-layout oo-ui-formLayout">
                    <fieldset class="oo-ui-layout oo-ui-labelElement oo-ui-fieldsetLayout mw-collapsibleFieldsetLayout mw-collapsible mw-made-collapsible">
                        <legend role="button" class="oo-ui-fieldsetLayout-header mw-collapsible-toggle mw-collapsible-toggle-expanded" aria-expanded="true" tabindex="0">
                            <span class="oo-ui-iconElement-icon oo-ui-iconElement-noIcon"></span>
                            <span class="oo-ui-labelElement-label">↩️ Mass Rollback – Sysop FoxTools</span>
                            <span class="oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement-icon oo-ui-icon-expand oo-ui-iconElement oo-ui-labelElement-invisible oo-ui-iconWidget">Lihat</span>
                            <span class="oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement-icon oo-ui-icon-collapse oo-ui-iconElement oo-ui-labelElement-invisible oo-ui-iconWidget">Tutup</span>
                        </legend>
                        <div class="oo-ui-fieldsetLayout-group mw-collapsible-content" style="display: block;">
                            <div class="oo-ui-widget oo-ui-widget-enabled">
                                <label for="rollback-reason" class="oo-ui-labelElement-label">Alasan untuk mengembalikan semua suntingan (opsional):</label>
                                <select id="rollback-reason" class="oo-ui-inputWidget-input oo-ui-dropdownWidget">
                                    <option value="">-- Pilih alasan --</option>
                                    <option value="Uji coba">Uji coba</option>
                                    <option value="Vandalisme">Vandalisme</option>
                                    <option value="Spam">Spam</option>
                                    <option value="Mengembalikan">Mengembalikan</option>
                                </select>
                                <input type="text" id="rollback-summary" placeholder="Alasan custom (opsional)" class="oo-ui-inputWidget-input oo-ui-textInputWidget-input" style="margin-top: 10px; padding: 5px; width: 100%;"/>
                            </div>
                            <div class="oo-ui-widget oo-ui-widget-enabled mw-htmlform-submit-buttons">
                                <button id="rollback-selected-button" class="oo-ui-inputWidget-input oo-ui-buttonElement-button oo-ui-buttonElement-framed oo-ui-flaggedElement-progressive" style="padding: 5px 10px; background-color: #007bff; color: #fff; border: none; cursor: pointer; border-radius: 4px;">Kembalikan suntingan yang dipilih</button>
                                <button id="rollback-all-button" class="oo-ui-inputWidget-input oo-ui-buttonElement-button oo-ui-buttonElement-framed oo-ui-flaggedElement-destructive" style="padding: 5px 10px; background-color: #ff4136; color: #fff; border: none; cursor: pointer; border-radius: 4px;">Kembalikan semua suntingan</button>
                                <button id="cancel-rollback" class="oo-ui-inputWidget-input oo-ui-buttonElement-button oo-ui-buttonElement-framed" style="padding: 5px 10px; background-color: #aaa; color: #fff; border: none; cursor: pointer; border-radius: 4px;">Batalkan</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        `);

        $('#mw-content-text').prepend($rollbackBox);

        $('#rollback-reason').change(function () {
            var selectedReason = $(this).val();
            var currentSummary = $('#rollback-summary').val();
            if (!currentSummary) {
                $('#rollback-summary').val(selectedReason);
            }
        });

        $('#rollback-box .mw-collapsible-toggle').click(function () {
            var $content = $(this).closest('fieldset').find('.mw-collapsible-content');
            var isExpanded = $(this).attr('aria-expanded') === 'true';

            if (isExpanded) {
                $content.slideUp();
                $(this).attr('aria-expanded', 'false');
                $(this).find('.oo-ui-icon-collapse').hide();
                $(this).find('.oo-ui-icon-expand').show();
            } else {
                $content.slideDown();
                $(this).attr('aria-expanded', 'true');
                $(this).find('.oo-ui-icon-expand').hide();
                $(this).find('.oo-ui-icon-collapse').show();
            }
        });

        function rollbackPage(pageTitle, revisions, summary) {
            if (!revisions.length) return Promise.resolve();
            var latest = revisions[0];
            var parentBeforeUser = revisions[revisions.length - 1].parentid;

            var formattedSummary = `Mengembalikan suntingan [[Istimewa:Kontribusi/${latest.user}|${latest.user}]] secara massal` +
                (summary ? `: ${summary}` : '') + ` (${SysopFoxTools})`;

            var api = new mw.Api();
            return api.postWithToken('csrf', {
                action: 'edit',
                title: pageTitle,
                undo: latest.revid,
                undoafter: parentBeforeUser,
                summary: formattedSummary,
                tags: ['FoxTools', 'MassRollback']
            });
        }

        $('#rollback-selected-button').click(function () {
            var summary = $('#rollback-summary').val();
            var selectedPages = {};

            $('input[type="checkbox"].rollback-checkbox:checked').each(function () {
                var page = $(this).data('title');
                if (!selectedPages[page]) selectedPages[page] = [];
                selectedPages[page].push({
                    revid: $(this).data('revid'),
                    parentid: $(this).data('parentid'),
                    user: mw.config.get('wgRelevantUserName')
                });
            });

            if (!Object.keys(selectedPages).length) {
                notiWARN(`Tidak ada suntingan yang ditandai untuk dikembalikan.`);
                return;
            }

            var promises = Object.keys(selectedPages).map(function (page) {
                var revs = selectedPages[page].sort((a, b) => b.revid - a.revid);
                return rollbackPage(page, revs, summary);
            });

            Promise.all(promises).then(() => {
                notiOK(`🟢 Suntingan yang dipilih telah dikembalikan.`);
                location.reload();
            }).catch(error => {
                console.error('Rollback error:', error);
                alert('Terjadi kesalahan saat rollback.');
            });
        });

        $('#rollback-all-button').click(function () {
            var userName = mw.config.get('wgRelevantUserName');
            var summary = $('#rollback-summary').val();
            var api = new mw.Api();

            api.get({
                action: 'query',
                list: 'usercontribs',
                ucuser: userName,
                uclimit: 'max',
                ucprop: 'ids|title',
                format: 'json'
            }).done(function (data) {
                var contribsByPage = {};

                data.query.usercontribs.forEach(c => {
                    if (!contribsByPage[c.title]) contribsByPage[c.title] = [];
                    contribsByPage[c.title].push({
                        revid: c.revid,
                        parentid: c.parentid,
                        user: userName
                    });
                });

                var promises = Object.keys(contribsByPage).map(page => {
                    var revs = contribsByPage[page].sort((a, b) => b.revid - a.revid);
                    return rollbackPage(page, revs, summary);
                });

                Promise.all(promises).then(() => {
                    notiOK(`🟢 Semua suntingan telah dikembalikan.`);
                    location.reload();
                }).catch(error => {
                    console.error('Rollback all error:', error);
                    notiERR('Terjadi kesalahan saat rollback semua.');
                });
            }).fail(error => {
                console.error('Error fetching contributions:', error);
                notiERR('Gagal mengambil kontribusi user.');
            });
        });

        $('#cancel-rollback').click(function () {
            $('#rollback-box').hide();
        });

        $('li[data-mw-revid]').each(function () {
            var $this = $(this);
            var revid = $this.data('mw-revid');
            var parentid = $this.data('mw-prev-revid');
            var title = $this.find('.mw-contributions-title').text();

            var $checkbox = $('<input type="checkbox" class="rollback-checkbox" style="margin-right: 5px;">')
                .data('revid', revid)
                .data('parentid', parentid)
                .data('title', title);

            $this.prepend($checkbox);
        });
    }
});

// </nowiki>
// ––– Sysop FoxTools MassRollback End –––