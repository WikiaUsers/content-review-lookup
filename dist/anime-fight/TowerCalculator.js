$(function() {
    var container = $('.tower-calculator');
    if (!container.length) return;
    var html = '';
    html += '<div style="width:100%;max-width:420px;padding:20px;border:2px solid #ffe066;background:#fff;border-radius:12px;box-shadow:0 0 10px rgba(0,0,0,0.15);margin:20px auto;font-family:Arial;text-align:center;">';
    html += '<div style="font-size:22px;font-weight:bold;margin-bottom:10px;">Tower HP Calculator</div>';
    html += '<input type="number" id="waveInput" placeholder="Enter wave number" style="width:100%;padding:10px;font-size:16px;border:1px solid #ccc;border-radius:8px;margin-bottom:15px;">';
    html += '<button id="calcWave" style="width:100%;padding:10px;font-size:18px;background:#ffe066;border:none;border-radius:8px;cursor:pointer;">Calculate</button>';
    html += '<div id="towerResults" style="margin-top:20px;font-size:16px;"></div>';
    html += '<div style="margin-top:15px;font-size:13px;color:#666;">Values are approximate and not 100% exact.</div>';
    html += '</div>';
    container.html(html);

    function calc(w) {
        var base = 8702.25500935239;
        var mul = 2.32085411230381;
        var t1 = Math.round(base * Math.pow(mul, w - 1));
        var t2 = Math.round(t1 * 1.6666666667);
        var t3 = Math.round(t1 * 2.3333333333);
        var t4 = Math.round(t1 * 8);
        var t5 = Math.round(t1 * 23.3333333333);
        return {t1,t2,t3,t4,t5};
    }

    $('#calcWave').on('click', function() {
        var wave = parseInt($('#waveInput').val());
        if (!wave || wave < 1) {
            $('#towerResults').html('<span style="color:red;">Enter a valid wave.</span>');
            return;
        }
        var r = calc(wave);
        var out = '';
        out += '<div><b>Wave ' + wave + '</b></div>';
        out += '<div>Tier 1: ' + r.t1.toLocaleString() + '</div>';
        out += '<div>Tier 2: ' + r.t2.toLocaleString() + '</div>';
        out += '<div>Tier 3: ' + r.t3.toLocaleString() + '</div>';
        out += '<div>Tier 4: ' + r.t4.toLocaleString() + '</div>';
        out += '<div>Tier 5: ' + r.t5.toLocaleString() + '</div>';
        $('#towerResults').html(out);
    });
});