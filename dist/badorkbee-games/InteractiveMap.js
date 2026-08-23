/* ===== Interactive Map ===== */
$(function () {
  'use strict';

  /* ---- Sanitisation helpers ---- */
  var COLOR_RE = /^(#[0-9a-fA-F]{3,8}|rgba?\([\s\d.,%]+\)|hsla?\([\s\d.,%\/]+\)|[a-z]{3,24})$/i;
  var LABEL_HEX_RE = /^(?:#[0-9a-fA-F]{3,4}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8})$/;
  var LABEL_RGB_RE = /^rgba?\(\s*[+-]?(?:\d+(?:\.\d+)?|\.\d+)%?\s*,\s*[+-]?(?:\d+(?:\.\d+)?|\.\d+)%?\s*,\s*[+-]?(?:\d+(?:\.\d+)?|\.\d+)%?(?:\s*,\s*(?:[+-]?(?:\d+(?:\.\d+)?|\.\d+)%?))?\s*\)$/i;
  var LABEL_HSL_RE = /^hsla?\(\s*[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:deg|grad|rad|turn)?\s*,\s*[+-]?(?:\d+(?:\.\d+)?|\.\d+)%\s*,\s*[+-]?(?:\d+(?:\.\d+)?|\.\d+)%(?:\s*,\s*(?:[+-]?(?:\d+(?:\.\d+)?|\.\d+)%?))?\s*\)$/i;
  var LABEL_NAMED_COLORS = { transparent:1, black:1, white:1, red:1, green:1, blue:1, yellow:1, gray:1, grey:1, orange:1, purple:1, pink:1, brown:1, cyan:1, magenta:1 };
  var SHAPES = { circle: 1, square: 1, diamond: 1, triangle: 1 };

  function sanColor(s, fb) { return COLOR_RE.test((s || '').trim()) ? s.trim() : (fb || '#888'); }
  function sanShape(s) { return SHAPES[s] ? s : 'circle'; }
  function sanDash(s) { return s === 'dotted' || s === 'dashed' ? s : 'solid'; }
  function sanNum(v, fb, min, max) {
    var n = Number(v);
    if (!Number.isFinite(n)) return fb;
    if (typeof min === 'number' && n < min) n = min;
    if (typeof max === 'number' && n > max) n = max;
    return n;
  }
  function sanFandomImageUrl(s) {
    var t = (s || '').trim();
    if (!t || /[\s"'\\;]/.test(t)) return '';
    try {
      var u = new URL(t);
      if (u.protocol !== 'https:' || u.hostname.toLowerCase() !== 'static.wikia.nocookie.net') return '';
      if (u.username || u.password || u.port) return '';
      return u.href;
    } catch (_e) {
      return '';
    }
  }
  function sanFandomImageCss(s) {
    var t = (s || '').trim();
    if (!/^url\(/i.test(t) || t.charAt(t.length - 1) !== ')') return '';
    var inner = t.slice(t.indexOf('(') + 1, -1).trim();
    var first = inner.charAt(0), last = inner.charAt(inner.length - 1);
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) inner = inner.slice(1, -1);
    else if (first === '"' || first === "'" || last === '"' || last === "'") return '';
    var url = sanFandomImageUrl(inner);
    return url ? 'url("' + url + '")' : '';
  }
  function sanLabelBg(s) {
    if (!s) return '';
    var t = s.trim();
    if (LABEL_HEX_RE.test(t) || LABEL_RGB_RE.test(t) || LABEL_HSL_RE.test(t) || LABEL_NAMED_COLORS[t.toLowerCase()]) return t;
    return sanFandomImageCss(t);
  }
  function sanShadow(s) {
    var v = { 'default':1, outline:1, heavy:1, none:1 };
    return v[s] ? s : 'default';
  }

  function split(s, maxLen) {
    var t = typeof s === 'string' ? s : '';
    if (typeof maxLen === 'number' && t.length > maxLen) t = t.slice(0, maxLen);
    return t.split('^');
  }

  function applyTextShadow(el, mode) {
    if (mode === 'outline') el.style.textShadow = '-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000';
    else if (mode === 'heavy') el.style.textShadow = '0 1px 3px rgba(0,0,0,.9),0 0 8px rgba(0,0,0,.7),0 0 2px #000';
    else if (mode === 'none') el.style.textShadow = 'none';
  }

  function curvePath(pts) {
    if (pts.length < 3) {
      return 'M ' + pts.map(function(p) { return p[0] + ' ' + p[1]; }).join(' L ');
    }
    var d = 'M' + pts[0][0] + ',' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)];
      var p1 = pts[i];
      var p2 = pts[i + 1];
      var p3 = pts[Math.min(pts.length - 1, i + 2)];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6;
      var c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6;
      var c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ' C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + p2[0] + ',' + p2[1];
    }
    return d;
  }

  function sampleCurve(pts) {
    if (pts.length < 3) return pts;
    var n = 20, result = [[pts[0][0], pts[0][1]]];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)];
      var p1 = pts[i];
      var p2 = pts[i + 1];
      var p3 = pts[Math.min(pts.length - 1, i + 2)];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6;
      var c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6;
      var c2y = p2[1] - (p3[1] - p1[1]) / 6;
      for (var t = 1; t <= n; t++) {
        var s = t / n, u = 1 - s;
        result.push([
          u*u*u*p1[0] + 3*u*u*s*c1x + 3*u*s*s*c2x + s*s*s*p2[0],
          u*u*u*p1[1] + 3*u*u*s*c1y + 3*u*s*s*c2y + s*s*s*p2[1]
        ]);
      }
    }
    return result;
  }

  function ptAlong(pts, t) {
    var total = 0, segs = [], i, dx, dy, len;
    for (i = 0; i < pts.length - 1; i++) {
      dx = pts[i+1][0] - pts[i][0]; dy = pts[i+1][1] - pts[i][1];
      len = Math.sqrt(dx*dx + dy*dy);
      segs.push({ l: len, dx: dx, dy: dy });
      total += len;
    }
    var target = Math.max(0, Math.min(1, t)) * total, acc = 0;
    for (i = 0; i < segs.length; i++) {
      if (acc + segs[i].l >= target || i === segs.length - 1) {
        var f = segs[i].l > 0 ? (target - acc) / segs[i].l : 0;
        return { x: pts[i][0] + f*segs[i].dx, y: pts[i][1] + f*segs[i].dy, a: Math.atan2(segs[i].dy, segs[i].dx) };
      }
      acc += segs[i].l;
    }
    return { x: pts[0][0], y: pts[0][1], a: 0 };
  }

  function dashArray(style, sw, dashScale) {
    var ds = (+dashScale > 0) ? +dashScale : 1;
    if (style === 'dotted') return (sw * ds) + ' ' + (sw * 1.5 * ds);
    if (style === 'dashed') return (sw * 3 * ds) + ' ' + (sw * 2 * ds);
    return '';
  }

  document.querySelectorAll('.imap-overlay').forEach(function (ov) {
    var w  = sanNum(ov.dataset.imapW, 800, 1, 100000);
    var h  = sanNum(ov.dataset.imapH, 600, 1, 100000);
    var ps = sanNum(ov.dataset.imapPs, 14, 1, 1000);
    var pw = sanNum(ov.dataset.imapPw, 5, 0.1, 1000);
    var scale = Math.max(1, Math.max(w, h) / 1000);
    var labelbg   = sanLabelBg(ov.dataset.imapLabelbg || '');
    var labelwrap = sanNum(ov.dataset.imapLabelwrap, 0, 0, 10000);
    var tsMode    = sanShadow(ov.dataset.imapTextshadow || '');
    var container = ov.closest('.imap-container');

    ov.querySelectorAll('.imap-point').forEach(function (el) {
      var d = split(el.dataset.p, 20000);
      var x = sanNum(d[0], 0, -1000000, 1000000);
      var y = sanNum(d[1], 0, -1000000, 1000000);
      var label = d[2] || '';
      var desc  = d[3] || label;
      var color = sanColor(d[4], '#e94560');
      var shape = sanShape(d[5]);
      var sz    = sanNum(d[6], ps, 1, 1000);
      el.style.position = 'absolute';
      el.style.left = (x / w * 100) + '%';
      el.style.top = (y / h * 100) + '%';
      el.style.transform = 'translate(-50%,-50%)';
      el.style.cursor = 'pointer';
      el.style.zIndex = '2';

      /* Build point DOM without parsing user strings as markup. */
      var dot = document.createElement('span');
      dot.className = 'imap-dot imap-sh-' + shape;
      dot.style.background = color;
      dot.style.width = sz + 'px';
      dot.style.height = sz + 'px';

      var plbl = document.createElement('span');
      plbl.className = 'imap-plabel';
      plbl.style.top = (sz + 4) + 'px';
      applyTextShadow(plbl, tsMode);
      if (labelwrap) {
        plbl.style.maxWidth = labelwrap + 'px';
        plbl.style.whiteSpace = 'normal';
        plbl.style.textAlign = 'center';
        plbl.style.wordBreak = 'break-word';
      }
      if (labelbg) {
        plbl.style.background = labelbg;
        plbl.style.padding = '2px 6px';
        plbl.style.borderRadius = '3px';
      }
      plbl.textContent = label;

      var tip = document.createElement('span');
      tip.className = 'imap-tooltip';
      tip.textContent = desc;

      el.textContent = '';
      el.appendChild(dot);
      el.appendChild(plbl);
      el.appendChild(tip);
    });

    var NS  = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('class', 'imap-paths-svg');
    svg.setAttribute('preserveAspectRatio', 'none');
    var any = false;

    ov.querySelectorAll('.imap-route').forEach(function (el) {
      var d      = split(el.dataset.r, 100000);
      var coord  = d[0] || '', color = sanColor(d[1], '#4ecdc4');
      var sw     = sanNum(d[2], pw, 0.1, 1000);
      var annos  = d[4] || '';
      var curveFlag = !(d[5] === '0');
      var dashStyle = sanDash(d[6]);
      var borderColor = d[7] ? sanColor(d[7], '') : '';
      var borderWidth = sanNum(d[8], 2, 0, 1000);
      var routeDashScale = sanNum(d[10], 1, 0.1, 1000);
      var pts = coord.split(';').slice(0, 2000).map(function (p) {
        var c = p.split(',');
        return [sanNum(c[0], NaN, -1000000, 1000000), sanNum(c[1], NaN, -1000000, 1000000)];
      }).filter(function (p) { return Number.isFinite(p[0]) && Number.isFinite(p[1]); });
      if (pts.length < 2) return;

      var swS = sw * scale;
      var pathStr = curveFlag ? curvePath(pts) : 'M ' + pts.map(function (p) {
        return p[0] + ' ' + p[1];
      }).join(' L ');
      if (borderColor) {
        var bPath = document.createElementNS(NS, 'path');
        bPath.setAttribute('d', pathStr);
        bPath.setAttribute('stroke', borderColor);
        bPath.setAttribute('stroke-width', swS + borderWidth * 2 * scale);
        bPath.setAttribute('fill', 'none');
        bPath.setAttribute('stroke-linecap', 'round');
        bPath.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(bPath);
      }
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', pathStr);
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', swS);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      var da = dashArray(dashStyle, swS, routeDashScale);
      if (da) path.setAttribute('stroke-dasharray', da);
      svg.appendChild(path);
      any = true;

      if (!annos) return;
      var effectivePts = curveFlag ? sampleCurve(pts) : pts;
      annos.split('!').forEach(function (a) {
        if (!a) return;
        var p2   = a.split(':');
        var text = p2[0];
        var t    = sanNum(p2[1], 0.5, 0, 1);
        var off  = sanNum(p2[2], 0, -1000000, 1000000);
        var pt   = ptAlong(effectivePts, t);
        var perp = pt.a + Math.PI / 2;
        var ax = pt.x + off * Math.cos(perp);
        var ay = pt.y + off * Math.sin(perp);
        var deg = pt.a * 180 / Math.PI;
        if (deg > 90 || deg < -90) deg += 180;
        var span = document.createElement('span');
        span.className = 'imap-path-anno';
        span.textContent = text;
        span.style.left = (ax / w * 100) + '%';
        span.style.top  = (ay / h * 100) + '%';
        span.style.transform = 'translate(-50%,-50%) rotate(' + deg + 'deg)';
        applyTextShadow(span, tsMode);
        if (labelbg) { span.style.background = labelbg; span.style.padding = '2px 6px'; span.style.borderRadius = '3px'; }
        ov.appendChild(span);
      });
    });
    if (any) ov.insertBefore(svg, ov.firstChild);

    ov.querySelectorAll('.imap-free-anno').forEach(function (el) {
      var d = split(el.dataset.a, 20000);
      var x = sanNum(d[0], 0, -1000000, 1000000);
      var y = sanNum(d[1], 0, -1000000, 1000000);
      var text = d[2] || '';
      var span = document.createElement('span');
      span.className = 'imap-free-anno-text';
      span.textContent = text;
      span.style.left = (x / w * 100) + '%';
      span.style.top  = (y / h * 100) + '%';
      applyTextShadow(span, tsMode);
      if (labelbg) { span.style.background = labelbg; span.style.padding = '2px 6px'; span.style.borderRadius = '3px'; }
      ov.appendChild(span);
    });

    if (!container) return;
    container.querySelectorAll('.imap-li').forEach(function (el) {
      var d     = split(el.dataset.l, 20000);
      var color = sanColor(d[0], '#fff'), label = d[1] || '';
      var shape = d[2] || 'circle';
      var dashStyle = sanDash(d[3]);

      /* Build swatch safely via DOM */
      el.textContent = '';
      if (shape === 'line') {
        var svgEl = document.createElementNS(NS, 'svg');
        svgEl.setAttribute('width', '18'); svgEl.setAttribute('height', '8');
        svgEl.style.flexShrink = '0';
        svgEl.style.overflow = 'visible';
        var line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', '0'); line.setAttribute('y1', '4');
        line.setAttribute('x2', '18'); line.setAttribute('y2', '4');
        line.setAttribute('stroke', color); line.setAttribute('stroke-width', '3');
        line.setAttribute('stroke-linecap', 'round');
        if (dashStyle === 'dotted') line.setAttribute('stroke-dasharray', '3 4.5');
        else if (dashStyle === 'dashed') line.setAttribute('stroke-dasharray', '9 6');
        svgEl.appendChild(line);
        el.appendChild(svgEl);
      } else {
        var sw2 = document.createElement('span');
        sw2.className = 'imap-swatch imap-swatch-' + sanShape(shape);
        sw2.style.background = color;
        el.appendChild(sw2);
      }
      var lspan = document.createElement('span');
      lspan.textContent = label;
      el.appendChild(lspan);
    });
  });
});