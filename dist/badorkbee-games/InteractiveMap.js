/* ===== Interactive Map ===== */
$(function () {
  'use strict';

  function split(s) { return (s || '').split('^'); }

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

  document.querySelectorAll('.imap-overlay').forEach(function (ov) {
    var w  = +ov.dataset.imapW  || 800;
    var h  = +ov.dataset.imapH  || 600;
    var ps = +ov.dataset.imapPs || 14;
    var pw = +ov.dataset.imapPw || 5;
    var scale = Math.max(1, Math.max(w, h) / 1000);
    var labelbg   = ov.dataset.imapLabelbg   || '';
    var labelwrap = +ov.dataset.imapLabelwrap || 0;
    var container = ov.closest('.imap-container');

    ov.querySelectorAll('.imap-point').forEach(function (el) {
      var d = split(el.dataset.p);
      var x = +d[0], y = +d[1], label = d[2] || '';
      var desc  = d[3] || label;
      var color = d[4] || '#e94560';
      var shape = d[5] || 'circle';
      var sz    = +(d[6] || ps);
      el.style.cssText =
        'position:absolute;left:' + (x/w*100) + '%;top:' + (y/h*100) + '%;'
        + 'transform:translate(-50%,-50%);cursor:pointer;z-index:2;';
      var plabelStyle = 'top:' + (sz + 4) + 'px;';
      if (labelbg)   plabelStyle += 'background:' + labelbg + ';padding:2px 6px;border-radius:3px;';
      if (labelwrap) plabelStyle += 'max-width:' + labelwrap + 'px;white-space:normal;text-align:center;word-break:break-word;';
      el.innerHTML =
        '<span class="imap-dot imap-sh-' + shape
          + '" style="background:' + color
          + ';width:' + sz + 'px;height:' + sz + 'px;"></span>'
        + '<span class="imap-plabel" style="' + plabelStyle + '">' + label + '</span>'
        + '<span class="imap-tooltip">' + desc + '</span>';
    });

    var NS  = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('class', 'imap-paths-svg');
    svg.setAttribute('preserveAspectRatio', 'none');
    var any = false;

    ov.querySelectorAll('.imap-route').forEach(function (el) {
      var d      = split(el.dataset.r);
      var coord  = d[0], color = d[1] || '#4ecdc4';
      var sw     = +d[2] || pw;
      var annos  = d[4] || '';
      var curveFlag = !(d[5] === '0');
      var dashStyle = d[6] || 'solid';
      var borderColor = d[7] || '';
      var borderWidth = +(d[8] || 2);
      var pts    = coord.split(';').map(function (p) {
        var c = p.split(','); return [+c[0], +c[1]];
      });
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
      if (dashStyle === 'dotted') path.setAttribute('stroke-dasharray', swS + ' ' + (swS * 1.5));
      else if (dashStyle === 'dashed') path.setAttribute('stroke-dasharray', (swS * 3) + ' ' + (swS * 2));
      svg.appendChild(path);
      any = true;

      if (!annos) return;
      var effectivePts = curveFlag ? sampleCurve(pts) : pts;
      annos.split('!').forEach(function (a) {
        if (!a) return;
        var p2   = a.split(':');
        var text = p2[0];
        var t    = parseFloat(p2[1]) || 0.5;
        var off  = parseFloat(p2[2]) || 0;
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
        if (labelbg) { span.style.background = labelbg; span.style.padding = '2px 6px'; span.style.borderRadius = '3px'; }
        ov.appendChild(span);
      });
    });
    if (any) ov.insertBefore(svg, ov.firstChild);

    ov.querySelectorAll('.imap-free-anno').forEach(function (el) {
      var d = split(el.dataset.a);
      var x = +d[0], y = +d[1], text = d[2] || '';
      var span = document.createElement('span');
      span.className = 'imap-free-anno-text';
      span.textContent = text;
      span.style.left = (x / w * 100) + '%';
      span.style.top  = (y / h * 100) + '%';
      if (labelbg) { span.style.background = labelbg; span.style.padding = '2px 6px'; span.style.borderRadius = '3px'; }
      ov.appendChild(span);
    });

    if (!container) return;
    container.querySelectorAll('.imap-li').forEach(function (el) {
      var d     = split(el.dataset.l);
      var color = d[0] || '#fff', label = d[1] || '';
      var shape = d[2] || 'circle';
      var dashStyle = d[3] || 'solid';
      var swatchHtml;
      if (shape === 'line') {
        var dashAttr = '';
        if (dashStyle === 'dotted') dashAttr = 'stroke-dasharray="3 4.5"';
        else if (dashStyle === 'dashed') dashAttr = 'stroke-dasharray="9 6"';
        swatchHtml = '<svg width="18" height="8" style="flex-shrink:0;overflow:visible">'
          + '<line x1="0" y1="4" x2="18" y2="4" stroke="' + color + '" stroke-width="3" stroke-linecap="round" ' + dashAttr + '></line>'
          + '</svg>';
      } else {
        swatchHtml = '<span class="imap-swatch imap-swatch-' + shape + '" style="background:' + color + ';"></span>';
      }
      el.innerHTML = swatchHtml + '<span>' + label + '</span>';
    });
  });
});