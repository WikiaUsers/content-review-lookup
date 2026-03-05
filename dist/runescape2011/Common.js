/* ══════════════════════════════════════════════════
   BESTIARY CALCULATOR — JS
   ══════════════════════════════════════════════════ */
$(function () {
    var $table = $('table.bestiary');
    if (!$table.length) return;

    // No thead/tbody — header row has class "bestiary-head"
    // Data rows have data-name attribute
    var $headerRow = $table.find('tr.bestiary-head');
    var $rows      = $table.find('tr[data-name]');

    // ── Column definitions ──────────────────────────
    // nth = 1-based column index in the table
    var columns = [
        { id: 'col-combat',  label: 'Combat Lvl',  icon: '⚔️',  nth: 4  },
        { id: 'col-hp',      label: 'HP',           icon: '❤️',  nth: 5  },
        { id: 'col-atk',     label: 'Atk',          icon: '🗡️',  nth: 6  },
        { id: 'col-str',     label: 'Str',          icon: '💪',  nth: 7  },
        { id: 'col-def',     label: 'Def',          icon: '🛡️',  nth: 8  },
        { id: 'col-mage',    label: 'Mage',         icon: '✨',  nth: 9  },
        { id: 'col-range',   label: 'Rng',          icon: '🏹',  nth: 10 },
        { id: 'col-maxhit',  label: 'Max Hit',      icon: '🎯',  nth: 11 },
        { id: 'col-weak',    label: 'Weakness',     icon: '⚠️',  nth: 12 },
        { id: 'col-style',   label: 'Attack Style', icon: '🥊',  nth: 13 },
        { id: 'col-agg',     label: 'Aggressive',   icon: '😡',  nth: 14 },
        { id: 'col-poi',     label: 'Poison',       icon: '☠️',  nth: 15 },
        { id: 'col-slaylvl', label: 'Slayer Lvl',   icon: '💀',  nth: 16 },
        { id: 'col-slayxp',  label: 'Slayer XP',    icon: '⭐',  nth: 17 },
        { id: 'col-xp',      label: 'Combat XP',    icon: '📈',  nth: 18 },
    ];

    var hiddenCols = {};

    // ── Inject icons into header th elements ────────
    // tablesorter clones the header row and hides the original,
    // so we run twice: immediately + after tablesorter initialises.
    function injectIcons() {
        $table.find('th').each(function (i) {
            var col = columns[i - 3]; // skip image, monster, members
            var $th = $(this);
            if ($th.find('.sort-icon').length) return; // avoid double-inject
            var txt = $th.text().trim();
            if (col) {
                $th.html(col.icon + ' ' + txt + ' <span class="sort-icon"></span>');
            } else {
                $th.html(txt + ' <span class="sort-icon"></span>');
            }
        });
    }
    injectIcons();
    setTimeout(injectIcons, 300);

    // ── Build filter panel ──────────────────────────
    var $filterPanel = $('<div class="bestiary-filters"></div>');
    $filterPanel.append('<div class="bestiary-filters-legend">Filters</div>');

    var $topRow = $('<div class="bf-top-row"></div>');

    $topRow.append(
        $('<div class="bf-group"></div>').append(
            $('<label for="bf-search">Search by name</label>'),
            $('<input type="text" id="bf-search" placeholder="e.g. Dragon, Goblin\u2026">')
        )
    );

    $topRow.append(
        $('<div class="bf-group"></div>').append(
            $('<label>Combat level range</label>'),
            $('<div class="bf-range-row"></div>').append(
                $('<input type="number" id="bf-from" value="1" min="1" max="702">'),
                $('<span>&ndash;</span>'),
                $('<input type="number" id="bf-to" value="702" min="1" max="702">')
            )
        )
    );

    $topRow.append(
        $('<div class="bf-group"></div>').append(
            $('<label for="bf-mems">Members</label>'),
            $('<select id="bf-mems"></select>').append(
                $('<option value="all">All</option>'),
                $('<option value="mem">Members</option>'),
                $('<option value="f2p">Free-to-play</option>')
            )
        )
    );

    $topRow.append(
        $('<div class="bf-group"></div>').append(
            $('<label for="bf-weak">Weakness</label>'),
            $('<select id="bf-weak"></select>').append(
                $('<option value="all">Any</option>'),
                $('<option value="slash">Slash</option>'),
                $('<option value="stab">Stab</option>'),
                $('<option value="crush">Crush</option>'),
                $('<option value="magic">Magic</option>'),
                $('<option value="ranged">Ranged</option>')
            )
        )
    );

    $topRow.append(
        $('<div class="bf-group"></div>').append(
            $('<label for="bf-smaster">Slayer Master</label>'),
            $('<select id="bf-smaster"></select>').append(
                $('<option value="all">Any</option>'),
                $('<option value="turael">Turael</option>'),
                $('<option value="mazchna">Mazchna</option>'),
                $('<option value="vannaka">Vannaka</option>'),
                $('<option value="chaeldar">Chaeldar</option>'),
                $('<option value="sumona">Sumona</option>'),
                $('<option value="duradel">Duradel</option>'),
                $('<option value="kuradal">Kuradal</option>')
            )
        )
    );

    $filterPanel.append($topRow);

    var $bottomRow = $('<div class="bf-bottom-row"></div>');
    $bottomRow.append(
        $('<div class="bf-flags-group"></div>').append(
            $('<span>Flags</span>'),
            $('<div class="bf-check"></div>').append(
                $('<label></label>').append($('<input type="checkbox" id="bf-agg">'), ' Aggressive only'),
                $('<label></label>').append($('<input type="checkbox" id="bf-poi">'), ' Poisonous only'),
                $('<label></label>').append($('<input type="checkbox" id="bf-slay">'), ' Has Slayer task')
            )
        )
    );
    $bottomRow.append(
        $('<div class="bf-buttons"></div>').append(
            $('<button class="bf-btn" id="bf-go">Search</button>'),
            $('<button class="bf-reset" id="bf-reset">Reset</button>')
        )
    );
    $filterPanel.append($bottomRow);

    // ── Column toggle bar ───────────────────────────
    var $colBar = $('<div class="bestiary-col-toggles"></div>').append(
        $('<span class="bct-label">Show columns:</span>')
    );
    $.each(columns, function (i, col) {
        $colBar.append(
            $('<button class="bct-btn active"></button>')
                .attr('data-col', col.id)
                .text(col.label)
        );
    });

    // ── Stats bar ───────────────────────────────────
    var $stats = $('<div class="bestiary-stats" id="bf-count"></div>');

    // ── Inject title + panels above the table ───────
    var $wrap = $table.closest('.bestiary-wrap');

    if (!$('.bestiary-page-title').length) {
        $wrap.before(
            $('<div></div>').append(
                $('<div class="bestiary-page-title">Bestiary Calculator</div>'),
                $('<div class="bestiary-page-subtitle">Browse and filter monsters from 2011 RuneScape. Click column headers to sort.</div>')
            )
        );
    }

    $wrap.before($filterPanel).before($colBar).before($stats);

    // ── Colour combat level cells on load ───────────
    $rows.each(function () {
        var $td = $(this).find('td.b-combat');
        var n   = parseInt($td.text(), 10);
        $td.removeClass('b-lvl-1 b-lvl-2 b-lvl-3 b-lvl-4');
        if      (n <= 50)  $td.addClass('b-lvl-1');
        else if (n <= 100) $td.addClass('b-lvl-2');
        else if (n <= 200) $td.addClass('b-lvl-3');
        else               $td.addClass('b-lvl-4');
    });

    // ── Column visibility ───────────────────────────
    function applyColVisibility() {
        $.each(columns, function (i, col) {
            var hide = !!hiddenCols[col.id];
            $headerRow.find('th:nth-child(' + col.nth + ')').toggle(!hide);
            $rows.find('td:nth-child(' + col.nth + ')').toggle(!hide);
        });
    }

    $(document).on('click', '.bct-btn', function () {
        var $btn = $(this);
        var col  = $btn.data('col');
        hiddenCols[col] = !hiddenCols[col];
        $btn.toggleClass('active', !hiddenCols[col]);
        applyColVisibility();
    });

    // ── Sorting ─────────────────────────────────────
    var sortCol = null, sortDir = 1;

    $headerRow.find('th').on('click', function () {
        var $th = $(this);
        var idx = $th.index() + 1;

        if (sortCol === idx) {
            sortDir *= -1;
        } else {
            sortCol = idx;
            sortDir = 1;
        }

        $headerRow.find('th').removeClass('sorted-asc sorted-desc');
        $th.addClass(sortDir === 1 ? 'sorted-asc' : 'sorted-desc');

        var $sorted = $rows.sort(function (a, b) {
            var aVal = $(a).find('td:nth-child(' + idx + ')').text().trim();
            var bVal = $(b).find('td:nth-child(' + idx + ')').text().trim();
            var aNum = parseFloat(aVal);
            var bNum = parseFloat(bVal);
            if (!isNaN(aNum) && !isNaN(bNum)) return (aNum - bNum) * sortDir;
            return aVal.localeCompare(bVal) * sortDir;
        });

        // Re-append sorted rows after the header row
        $headerRow.after($sorted);
    });

    // ── Filter ──────────────────────────────────────
    function applyFilter() {
        var search  = ($('#bf-search').val()   || '').toLowerCase();
        var lvlFrom = parseInt($('#bf-from').val())   || 1;
        var lvlTo   = parseInt($('#bf-to').val())     || 999;
        var mems    = $('#bf-mems').val()    || 'all';
        var weak    = ($('#bf-weak').val()   || 'all').toLowerCase();
        var smaster = ($('#bf-smaster').val() || 'all').toLowerCase();
        var chkAgg  = $('#bf-agg').prop('checked');
        var chkPoi  = $('#bf-poi').prop('checked');
        var chkSlay = $('#bf-slay').prop('checked');
        var shown   = 0;

        $rows.each(function () {
            var $r   = $(this);
            var name = ($r.data('name')     || '').toLowerCase();
            var lvl  = parseInt($r.data('combat'), 10) || 0;
            var mem  = $r.data('mem')       === 'yes';
            var wk   = ($r.data('weak')     || '').toLowerCase();
            var agg  = $r.data('agg')       === 'yes';
            var poi  = $r.data('poi')       === 'yes';
            var slay = $r.data('hasslay')   === 'yes';
            var sm   = ($r.data('smaster')  || '').toLowerCase();

            var ok = true;
            if (search && name.indexOf(search) === -1)          ok = false;
            if (lvl < lvlFrom || lvl > lvlTo)                   ok = false;
            if (mems === 'mem' && !mem)                          ok = false;
            if (mems === 'f2p' &&  mem)                          ok = false;
            if (weak !== 'all' && wk.indexOf(weak) === -1)      ok = false;
            if (smaster !== 'all' && sm.indexOf(smaster) === -1) ok = false;
            if (chkAgg  && !agg)                                 ok = false;
            if (chkPoi  && !poi)                                 ok = false;
            if (chkSlay && !slay)                                ok = false;

            $r.toggle(ok);
            if (ok) shown++;
        });

        $('#bf-count').html('Showing <b>' + shown + '</b> of <b>' + $rows.length + '</b> monsters');
    }

    // ── Events ──────────────────────────────────────
    $('#bf-search').on('input keyup', applyFilter);
    $('#bf-from, #bf-to').on('change input', applyFilter);
    $('#bf-mems, #bf-weak, #bf-smaster').on('change', applyFilter);
    $('#bf-agg, #bf-poi, #bf-slay').on('change', applyFilter);
    $('#bf-go').on('click', applyFilter);
    $('#bf-reset').on('click', function () {
        $('#bf-search').val('');
        $('#bf-from').val(1);
        $('#bf-to').val(702);
        $('#bf-mems').val('all');
        $('#bf-weak').val('all');
        $('#bf-smaster').val('all');
        $('#bf-agg, #bf-poi, #bf-slay').prop('checked', false);
        applyFilter();
    });

    applyFilter();
    applyColVisibility();
});