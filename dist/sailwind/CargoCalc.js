/* Sailwind Cargo Calculator — mounts on any page containing <div id="cargo-calc-mount"></div> */
(function () {
    var mount = document.getElementById('cargo-calc-mount');
    if (!mount) return;

    var SHIPS = {
        'Cog':    { rec: 700,   max: 1000  },
        'Dhow':   { rec: 800,   max: 1350  },
        'Kakam':  { rec: 700,   max: 1000  },
        'Sanbuq': { rec: 4000,  max: 8000  },
        'Junk':   { rec: 4000,  max: 8000  },
        'Brig':   { rec: 10000, max: 17000 },
        'Jong':   { rec: 10000, max: 20000 },
    };

    var CARGO = {
        'Bananas': 16, 'Beer': 68, 'Books': 160, 'Cheese': 15, 'Coconuts': 50,
        'Copper': 260, 'Dates': 4.6, 'Eel': 21.2, 'Gems': 80, 'Gold': 400,
        'Goods': 80, 'Grain': 100, 'Iron': 380, 'Lamb': 21, 'Medicine': 40,
        'North Fish': 21, 'Pork': 21, 'Rum': 68, 'Salmon': 23, 'Sausages': 29,
        'Seafood': 80, 'Silk': 60, 'Spices': 40, 'Sunspot Fish': 21, 'Tea': 50,
        'Tuna': 29, 'Water': 68, 'Wine': 68
    };

    var cargoKeys = Object.keys(CARGO).sort();
    var rid = 0;

    var cargoOpts = cargoKeys.map(function (k) {
        return '<option value="' + CARGO[k] + '">' + k + ' (' + CARGO[k] + ' lb)</option>';
    }).join('');

    var shipOpts = '<option value="">— select a ship —</option>' +
        Object.keys(SHIPS).map(function (s) {
            return '<option value="' + s + '">' + s + '</option>';
        }).join('');

    mount.innerHTML =
        '<div class="scc">' +
            '<h2>Ship Cargo Weight Capacity Calculator</h2>' +
            '<div class="sec">' +
                '<div class="row">' +
                    '<label>Current ship</label>' +
                    '<select id="scc-ship">' + shipOpts + '</select>' +
                '</div>' +
                '<div class="caps" id="scc-caps" style="display:none">' +
                    '<span><span class="dot dot-r"></span>Recommended: <strong id="scc-rec">—</strong> lb</span>' +
                    '<span><span class="dot dot-m"></span>Max: <strong id="scc-max">—</strong> lb</span>' +
                '</div>' +
                '<div class="note" id="scc-note" style="display:none">' +
                    'Remember to account for the weight of onboard furniture, supplies, and any added shipyard customizations, these count toward your cargo limit and are not included in this calculation.' +
                '</div>' +
            '</div>' +
            '<div class="sec">' +
                '<div class="sec-title">Cargo manifest</div>' +
                '<div id="scc-list"></div>' +
                '<button class="add" id="scc-add">+ Add cargo</button>' +
            '</div>' +
            '<div class="sec" id="scc-res" style="display:none">' +
                '<div class="bar" id="scc-bar"></div>' +
                '<div class="tw" id="scc-tw"></div>' +
            '</div>' +
            '<div class="disclaimer">* Results may vary from in-game. This calculator is a guide only, do not treat outputs as exact or guaranteed figures.</div>' +
        '</div>';

    function addRow() {
        rid++;
        var d = document.createElement('div');
        d.className = 'crow';
        d.id = 'sccr' + rid;
        var id = rid;
        d.innerHTML =
            '<select>' + cargoOpts + '</select>' +
            '<input type="number" value="1" min="0" step="1" style="width:70px">' +
            ' <span class="units-lbl">units</span>' +
            '<button class="rm" title="Remove">\u00d7</button>';
        d.querySelector('select').addEventListener('change', calc);
        d.querySelector('input').addEventListener('input', calc);
        d.querySelector('.rm').addEventListener('click', function () {
            d.parentNode.removeChild(d);
            calc();
        });
        document.getElementById('scc-list').appendChild(d);
        calc();
    }

    function calc() {
        var rows = document.querySelectorAll('#scc-list .crow');
        var total = 0;
        rows.forEach(function (r) {
            var w = parseFloat(r.querySelector('select').value) || 0;
            var q = parseFloat(r.querySelector('input').value) || 0;
            total += w * q;
        });

        var shipName = document.getElementById('scc-ship').value;
        var ship = SHIPS[shipName];
        var rs = document.getElementById('scc-res');

        if (rows.length === 0) { rs.style.display = 'none'; return; }
        rs.style.display = 'block';

        var t = total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 });

        function badge(label, cap, tot) {
            if (!cap) {
                return '<div class="badge safe" style="border-color:#fcde7e"><div class="bl">' + label + '</div><div class="bv">' + t + ' lb</div><div class="bs">No ship selected</div></div>';
            }
            var ok = tot <= cap;
            var pct = ((tot / cap) * 100).toFixed(0);
            var cls = ok ? 'safe' : 'over';
            var icon = ok ? 'Safe' : 'Overloaded';
            return '<div class="badge ' + cls + '"><div class="bl">' + label + ' (' + cap.toLocaleString() + ' lb)</div><div class="bv">' + t + ' lb</div><div class="bs">' + icon + ' — ' + pct + '%</div></div>';
        }

        if (ship) {
            document.getElementById('scc-bar').innerHTML = badge('Recommended', ship.rec, total) + badge('Max capacity', ship.max, total);
        } else {
            document.getElementById('scc-bar').innerHTML = badge('Total weight', null, total);
        }
        document.getElementById('scc-tw').textContent = 'Total cargo weight: ' + t + ' lb';
    }

    document.getElementById('scc-ship').addEventListener('change', function () {
        var s = SHIPS[this.value];
        var caps = document.getElementById('scc-caps');
        var note = document.getElementById('scc-note');
        if (s) {
            document.getElementById('scc-rec').textContent = s.rec.toLocaleString();
            document.getElementById('scc-max').textContent = s.max.toLocaleString();
            caps.style.display = 'flex';
            note.style.display = 'block';
        } else {
            caps.style.display = 'none';
            note.style.display = 'none';
        }
        calc();
    });

    document.getElementById('scc-add').addEventListener('click', addRow);

    addRow();
}());