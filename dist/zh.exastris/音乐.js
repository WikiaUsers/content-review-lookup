/* ===来自星尘 OST=== */
(function () {
  'use strict';

  var MIN_BAR_W = 2;
  var MAX_BAR_W = 4;
  var GAP_RATIO = 0.25;

  function getNumBars(wf) {
    var w = (wf && wf.clientWidth) || 600;
    var target = Math.round(w / 3);
    var minBars = Math.floor(w / MAX_BAR_W);
    var maxBars = Math.floor(w / MIN_BAR_W);
    return Math.max(minBars, Math.min(maxBars, target));
  }
  var peaksCache = {};
  var activeId = null;
  var activeAudio = null;
  var isDragging = false;
  var dragMoved = false;
  var dragStartX = 0;
  var nowPlayingEl = document.getElementById('nowPlaying');

  function fmt(t) {
    if (!t || isNaN(t)) return '00:00';
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  // ---- 去掉 mw 依赖 ----
  function getAudioUrl(file) {
    return 'https://exastris.fandom.com/zh/wiki/Special:FilePath/' + encodeURIComponent(file);
  }

  function setNowPlaying(text) {
    if (nowPlayingEl) nowPlayingEl.textContent = text;
  }

  function playerRowHTML(id, cn, artist) {
    return ''
      + '<tr class="player-row" id="player-' + mw.html.escape(id) + '">'
      +   '<td colspan="4">'
      +     '<div class="player-wrap" id="wrap-' + mw.html.escape(id) + '">'
      +       '<div class="whyp-player">'
      +         '<div class="whyp-head">'
      +           '<button class="whyp-btn whyp-play"  id="btn-play-'  + mw.html.escape(id) + '" title="播放/暂停">▶</button>'
      +           '<div class="whyp-meta">'
      +             '<div class="whyp-title">' + mw.html.escape(cn) + '</div>'
      +             '<div class="whyp-sub">' + mw.html.escape(artist) + ' · 来自星尘 OST</div>'
      +           '</div>'
      +         '</div>'
      +         '<div class="whyp-waveform" id="waveform-' + mw.html.escape(id) + '">'
      +           '<canvas id="canvas-' + mw.html.escape(id) + '"></canvas>'
      +           '<div class="whyp-progress" id="progress-' + mw.html.escape(id) + '"></div>'
      +           '<div class="whyp-playhead" id="playhead-' + mw.html.escape(id) + '"></div>'
      +           '<div class="whyp-hover-line" id="hoverLine-' + mw.html.escape(id) + '"></div>'
      +           '<div class="whyp-hover-time" id="hoverTime-' + mw.html.escape(id) + '"></div>'
      +         '</div>'
      +         '<div class="whyp-time">'
      +           '<span id="curTime-' + mw.html.escape(id) + '">00:00</span>'
      +           '<span id="durTime-' + mw.html.escape(id) + '">--:--</span>'
      +         '</div>'
      +         '<div class="whyp-status" id="status-' + mw.html.escape(id) + '">正在生成波形图</div>'
      +         '<audio id="audio-' + mw.html.escape(id) + '" preload="metadata" crossorigin="anonymous"></audio>'
      +       '</div>'
      +     '</div>'
      +   '</td>'
      + '</tr>';
  }

  function roundedFill(ctx, x, y, w, h, r) {
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); return; }
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  }

  var PEAKS_RES = 800;
  function computePeaks(id, url) {
    if (peaksCache[id]) return Promise.resolve(peaksCache[id]);
    var statusEl = document.getElementById('status-' + id);
    return fetch(url)
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); })
      .then(function (buf) {
        var AC = window.AudioContext || window.webkitAudioContext;
        return new AC().decodeAudioData(buf);
      })
      .then(function (audioBuf) {
        var data = audioBuf.getChannelData(0);
        var block = Math.max(1, Math.floor(data.length / PEAKS_RES));
        var peaks = new Float32Array(PEAKS_RES);
        var maxGlobal = 0;
        for (var i = 0; i < PEAKS_RES; i++) {
          var mx = 0, start = i * block;
          for (var j = 0; j < block; j++) {
            var v = Math.abs(data[start + j]);
            if (v > mx) mx = v;
          }
          peaks[i] = mx;
          if (mx > maxGlobal) maxGlobal = mx;
        }
        for (var k = 0; k < PEAKS_RES; k++) peaks[k] /= (maxGlobal || 1);
        peaksCache[id] = peaks;
        if (statusEl) statusEl.textContent = '✓ 波形已生成';
        return peaks;
      })
      .catch(function () {
        if (statusEl) statusEl.innerHTML = '<span class="file-error">无对应音频文件</span>';
        var wf = document.getElementById('waveform-' + id);
        if (wf) wf.style.display = 'none';
        return null;
      });
  }

  function drawWaveform(id) {
    var canvas = document.getElementById('canvas-' + id);
    var wf = document.getElementById('waveform-' + id);
    var audio = document.getElementById('audio-' + id);
    if (!canvas || !wf || !audio || !peaksCache[id]) return;

    var dpr = window.devicePixelRatio || 1;
    var w = wf.clientWidth, h = wf.clientHeight;
    if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.style.width = w + 'px'; }
    if (canvas.height !== h * dpr) { canvas.height = h * dpr; canvas.style.height = h + 'px'; }
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var srcPeaks = peaksCache[id];
    var dur = audio.duration || 0;
    var cur = audio.currentTime || 0;
    var playedPct = dur > 0 ? cur / dur : 0;
    var NUM_BARS = getNumBars(wf);
    var peaks = new Float32Array(NUM_BARS);
    for (var bi = 0; bi < NUM_BARS; bi++) {
      var srcIdx = Math.floor(bi / NUM_BARS * PEAKS_RES);
      peaks[bi] = srcPeaks[Math.min(srcIdx, PEAKS_RES - 1)];
    }
    var playedBars = playedPct * NUM_BARS;
    var barW = w / NUM_BARS;
    if (barW > MAX_BAR_W) barW = MAX_BAR_W;

    for (var i = 0; i < NUM_BARS; i++) {
      var v = peaks[i];
      var barH = Math.max(2, v * h * 0.9);
      var x = i * barW + barW * 0.15;
      var y = (h - barH) / 2;
      ctx.fillStyle = i < playedBars ? 'rgba(79,110,247,0.9)' : 'rgba(0,0,0,0.12)';
      roundedFill(ctx, x, y, barW * 0.7, barH, Math.min(2, barW * 0.35));
    }

    if (playedBars > 0 && playedBars < NUM_BARS) {
      var sepX = playedBars * barW;
      ctx.save();
      ctx.shadowColor = 'rgba(79,110,247,0.6)';
      ctx.shadowBlur = 6;
      ctx.fillStyle = 'rgba(79,110,247,0.9)';
      ctx.fillRect(sepX - 0.5, h * 0.05, 1.5, h * 0.9);
      ctx.restore();
    }

    var prog = document.getElementById('progress-' + id);
    if (prog) prog.style.width = (playedPct * 100).toFixed(2) + '%';
    var ph = document.getElementById('playhead-' + id);
    if (ph) ph.style.left = (playedPct * 100).toFixed(2) + '%';
  }

  function waveformTimeFromEvent(wf, evt) {
    var rect = wf.getBoundingClientRect();
    var x = (evt.touches ? evt.touches[0].clientX : evt.clientX) - rect.left;
    var pct = Math.max(0, Math.min(1, x / rect.width));
    var audio = wf._audio;
    return { pct: pct, time: pct * (audio.duration || 0) };
  }

  function initPlayer(id) {
    var audio = document.getElementById('audio-' + id);
    if (!audio || audio.dataset.inited) return;
    audio.dataset.inited = '1';

    var wf = document.getElementById('waveform-' + id);
    wf._audio = audio;

    var btnPlay = document.getElementById('btn-play-' + id);
    var curTime = document.getElementById('curTime-' + id);
    var durTime = document.getElementById('durTime-' + id);

    computePeaks(id, audio.src).then(function () { drawWaveform(id); });

    function togglePlay() {
      if (audio.paused) {
        var p = audio.play();
        if (p && p.catch) p.catch(function () {});
      } else {
        audio.pause();
      }
    }
    btnPlay.addEventListener('click', togglePlay);

    function onWavePointerDown(evt) {
      if (!audio.duration) return;
      isDragging = true; dragMoved = false; dragStartX = evt.clientX || (evt.touches && evt.touches[0].clientX) || 0;
      audio.pause();
      var t = waveformTimeFromEvent(wf, evt);
      audio.currentTime = t.time;
      drawWaveform(id);
    }
    function onWavePointerMove(evt) {
      if (!isDragging) {
        var rect = wf.getBoundingClientRect();
        var cx = (evt.touches && evt.touches[0]) ? evt.touches[0].clientX : evt.clientX;
        var x = cx - rect.left;
        var pct = Math.max(0, Math.min(1, x / rect.width));
        var hl = document.getElementById('hoverLine-' + id);
        var ht = document.getElementById('hoverTime-' + id);
        if (hl) { hl.style.left = x + 'px'; hl.style.opacity = '1'; }
        if (ht) { ht.style.left = x + 'px'; ht.style.opacity = '1'; ht.textContent = fmt(pct * (audio.duration || 0)); }
        return;
      }
      var cx2 = evt.clientX || (evt.touches && evt.touches[0].clientX) || 0;
      if (Math.abs(cx2 - dragStartX) > 3) dragMoved = true;
      var t = waveformTimeFromEvent(wf, evt);
      audio.currentTime = t.time;
      drawWaveform(id);
    }
    function onWavePointerUp(evt) {
      if (!isDragging) return;
      isDragging = false;
    }

    wf.addEventListener('mousedown', onWavePointerDown);
    window.addEventListener('mousemove', onWavePointerMove);
    window.addEventListener('mouseup', onWavePointerUp);
    wf.addEventListener('touchstart', onWavePointerDown, { passive: true });
    wf.addEventListener('touchmove',  onWavePointerMove,  { passive: true });
    wf.addEventListener('touchend',   onWavePointerUp);

    wf.addEventListener('mouseleave', function () {
      var hl = document.getElementById('hoverLine-' + id);
      var ht = document.getElementById('hoverTime-' + id);
      if (hl) hl.style.opacity = '0';
      if (ht) ht.style.opacity = '0';
    });

    function updateDuration() {
      if (audio.duration && isFinite(audio.duration)) {
        durTime.textContent = fmt(audio.duration);
      }
    }
    audio.addEventListener('loadedmetadata', function () {
      updateDuration();
      drawWaveform(id);
    });
    if (audio.readyState >= 2) {
      updateDuration();
      drawWaveform(id);
    }

    audio.addEventListener('timeupdate', function () {
      curTime.textContent = fmt(audio.currentTime);
      drawWaveform(id);
    });
    audio.addEventListener('play', function () {
      btnPlay.textContent = '❚❚';
    });
    audio.addEventListener('pause', function () {
      btnPlay.textContent = '▶';
    });
    audio.addEventListener('ended', function () {
      btnPlay.textContent = '▶';
      audio.currentTime = 0;
      drawWaveform(id);
    });
  }

  function expandPlayer(id, file) {
    var rowBtn = document.querySelector('.play-btn[data-id="' + id + '"]');
    var url = getAudioUrl(file);

    if (activeId && activeId !== id) collapsePlayer(activeId);

    var row = document.getElementById('row-' + id);
    var playerTr = document.getElementById('player-' + id);
    if (!playerTr) {
      var cn = row.querySelector('.song .cn').textContent;
      var artist = row.querySelector('.artist').textContent;
      row.insertAdjacentHTML('afterend', playerRowHTML(id, cn, artist));
      var audio = document.getElementById('audio-' + id);
      audio.src = url;
    }
    document.getElementById('player-' + id).classList.add('open');

    fetch(url, { method: 'HEAD' })
      .then(function (r) {
        if (!r.ok) throw new Error('not found');
        initPlayer(id);
        var audio = document.getElementById('audio-' + id);
        if (audio && !audio.src) audio.src = url;
      })
      .catch(function () {
        if (rowBtn) { rowBtn.classList.add('disabled'); rowBtn.textContent = '✕'; }
        var statusEl = document.getElementById('status-' + id);
        if (statusEl) statusEl.innerHTML = '<span class="file-error">无对应音频文件（' + mw.html.escape(file) + '）</span>';
        var wf = document.getElementById('waveform-' + id);
        if (wf) wf.style.display = 'none';
      });

    activeId = id;
    activeAudio = document.getElementById('audio-' + id);
    if (rowBtn) { rowBtn.classList.add('active'); rowBtn.textContent = '▼'; }
    setNowPlaying('正在播放：第 ' + id + ' 首 · ' + row.querySelector('.song .cn').textContent);
  }

  function collapsePlayer(id) {
    var playerTr = document.getElementById('player-' + id);
    if (playerTr) playerTr.classList.remove('open');
    var rowBtn = document.querySelector('.play-btn[data-id="' + id + '"]');
    if (rowBtn) { rowBtn.classList.remove('active'); rowBtn.textContent = '▶'; }
    var audio = document.getElementById('audio-' + id);
    if (audio) audio.pause();
    if (activeId === id) { activeId = null; activeAudio = null; }
    setNowPlaying('▶ 点击播放按钮可试听');
  }

  function boot() {
    var rowBtns = document.querySelectorAll('.play-btn');
    rowBtns.forEach(function (btn) {
      var id = btn.dataset.id;
      var file = btn.dataset.file;
      if (!id || !file) return;
      var url = getAudioUrl(file);

      fetch(url, { method: 'HEAD' })
        .then(function (r) { if (!r.ok) throw new Error('not found'); })
        .catch(function () {
          btn.classList.add('disabled');
          btn.textContent = '✕';
          btn.title = '无对应音频文件（' + file + '）';
        });

      btn.addEventListener('click', function () {
        if (btn.classList.contains('disabled')) return;
        if (activeId === id) {
          collapsePlayer(id);
        } else {
          expandPlayer(id, file);
        }
      });
    });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(boot);
})();