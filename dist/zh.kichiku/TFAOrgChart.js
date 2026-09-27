/* MediaWiki:TFAOrgChart.js
 *
 * Icons: Lucide expand (ISC), x (MIT, derived from Feather).
 * Copyright (c) 2026 Lucide Icons and Contributors.
 * Copyright (c) 2013-present Cole Bemis.
 *
 * ISC License:
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * MIT License:
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
(function () {
  'use strict';

  if (window.tfaOrgChartLoaded) {
    return;
  }
  window.tfaOrgChartLoaded = true;

  var sequence = 0;
  var activeDialog = null;
  var iconPaths = {
    expand: [
      'm15 15 6 6', 'm15 9 6-6', 'M21 16v5h-5', 'M21 8V3h-5',
      'M3 16v5h5', 'm3 21 6-6', 'M3 8V3h5', 'M9 9 3 3'
    ],
    close: ['M18 6 6 18', 'm6 6 12 12']
  };

  function element(tag, className, text) {
    var node = document.createElement(tag);
    node.className = className;
    if (text) {
      node.textContent = text;
    }
    return node;
  }

  function icon(name) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    var attrs = {
      'class': 'tfa-org-icon',
      'viewBox': '0 0 24 24',
      'fill': 'none',
      'stroke': 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true',
      'focusable': 'false'
    };
    Object.keys(attrs).forEach(function (key) {
      svg.setAttribute(key, attrs[key]);
    });
    iconPaths[name].forEach(function (path) {
      var node = document.createElementNS(ns, 'path');
      node.setAttribute('d', path);
      svg.appendChild(node);
    });
    return svg;
  }

  function backgroundOf(node) {
    while (node && node.nodeType === 1) {
      var color = window.getComputedStyle(node).backgroundColor;
      if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') {
        return color;
      }
      node = node.parentElement;
    }
    return '#ffffff';
  }

  function mount(root) {
    if (root.dataset.tfaOrgReady || !window.HTMLDialogElement ||
        !HTMLDialogElement.prototype.showModal) {
      return;
    }
    var stage = root.querySelector('.tfa-org-stage');
    var board = root.querySelector('.tfa-org-board');
    var actions = root.querySelector('.tfa-org-actions');
    if (!stage || !board || !actions) {
      return;
    }
    root.dataset.tfaOrgReady = 'true';

    var queued = false;
    var savedBodyStyle;
    var pointerOutside = false;
    var tooltipHome = null;
    var tooltipObserver = null;
    var heading = root.querySelector('.tfa-org-heading');
    var title = heading ? heading.textContent : 'TFA组织架构';
    var openButton = element('button', 'tfa-org-button');
    openButton.type = 'button';
    openButton.title = '按原尺寸查看组织架构';
    openButton.setAttribute('aria-haspopup', 'dialog');
    openButton.appendChild(icon('expand'));
    openButton.appendChild(element('span', '', '原尺寸查看'));
    actions.appendChild(openButton);

    var dialog = element('dialog', 'tfa-org-dialog');
    // Fixed tooltips may extend beyond the window; the chart viewport still scrolls.
    dialog.style.overflow = 'visible';
    var header = element('div', 'tfa-org-dialog-header');
    var caption = element('div', 'tfa-org-dialog-title', title);
    caption.id = 'tfa-org-dialog-title-' + (++sequence);
    dialog.setAttribute('aria-labelledby', caption.id);
    dialog.setAttribute('aria-modal', 'true');
    var size = element('span', 'tfa-org-dialog-size');
    caption.appendChild(size);
    var closeButton = element('button', 'tfa-org-button tfa-org-close');
    closeButton.type = 'button';
    closeButton.title = '关闭';
    closeButton.setAttribute('aria-label', '关闭原尺寸窗口');
    closeButton.autofocus = true;
    closeButton.appendChild(icon('close'));
    header.appendChild(caption);
    header.appendChild(closeButton);
    var viewport = element('div', 'tfa-org-dialog-scroll');
    viewport.style.overscrollBehavior = 'contain';
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', '原尺寸组织架构，可横纵滚动');
    dialog.appendChild(header);
    dialog.appendChild(viewport);
    // Keep the dialog under the parser output so TemplateStyles still applies.
    root.appendChild(dialog);

    function hideTooltip() {
      if (!tooltipHome) {
        return;
      }
      var engine = window.tooltips;
      var position = engine && engine.lastKnownMousePos || [0, 0];
      if (engine && engine.handlers && typeof engine.handlers.mouseOut === 'function') {
        engine.handlers.mouseOut.call(board, {
          pageX: position[0],
          pageY: position[1]
        });
      }
      tooltipHome.wrapper.style.display = 'none';
    }

    function attachTooltip() {
      var wrapper = document.getElementById('tooltip-wrapper');
      if (!wrapper || tooltipHome) {
        return;
      }
      var marker = document.createComment('TFA tooltip return position');
      wrapper.parentNode.insertBefore(marker, wrapper);
      tooltipHome = { wrapper: wrapper, marker: marker };
      hideTooltip();
      // The site uses viewport-fixed coordinates. Keep its wrapper outside the
      // scrolling board, but inside the modal's top-layer subtree.
      dialog.appendChild(wrapper);
    }

    function connectTooltip() {
      attachTooltip();
      // ImportJS may initialize Tooltips after the reader opens this window.
      tooltipObserver = new MutationObserver(attachTooltip);
      tooltipObserver.observe(document.body, { childList: true });
    }

    function releaseTooltip() {
      if (tooltipObserver) {
        tooltipObserver.disconnect();
        tooltipObserver = null;
      }
      if (!tooltipHome) {
        return;
      }
      try {
        hideTooltip();
      } finally {
        var wrapper = tooltipHome.wrapper;
        var marker = tooltipHome.marker;
        if (marker.parentNode) {
          marker.parentNode.replaceChild(wrapper, marker);
        } else {
          document.body.appendChild(wrapper);
        }
        tooltipHome = null;
      }
    }

    viewport.addEventListener('scroll', hideTooltip, { passive: true });

    function fit() {
      queued = false;
      if (!root.isConnected || dialog.open || !stage.clientWidth) {
        return;
      }
      var width = board.offsetWidth;
      var height = board.offsetHeight;
      if (!width || !height) {
        return;
      }
      var scale = Math.min(1, stage.clientWidth / width);
      stage.style.height = Math.ceil(height * scale) + 'px';
      board.style.transform = 'scale(' + scale + ')';
      root.classList.add('tfa-org-fit');
    }

    function queueFit() {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(fit);
      }
    }

    function restore() {
      if (!savedBodyStyle) {
        return;
      }
      releaseTooltip();
      stage.appendChild(board);
      ['overflow', 'padding-right'].forEach(function (property) {
        var saved = savedBodyStyle[property];
        if (saved.value) {
          document.body.style.setProperty(property, saved.value, saved.priority);
        } else {
          document.body.style.removeProperty(property);
        }
      });
      savedBodyStyle = null;
      if (activeDialog === dialog) {
        activeDialog = null;
      }
      fit();
      openButton.focus({ preventScroll: true });
    }

    openButton.addEventListener('click', function () {
      if (activeDialog || savedBodyStyle) {
        return;
      }
      dialog.style.backgroundColor = backgroundOf(root);
      dialog.style.color = window.getComputedStyle(root).color;
      size.textContent = '100% · ' + board.offsetWidth + 'px';
      savedBodyStyle = {};
      ['overflow', 'padding-right'].forEach(function (property) {
        savedBodyStyle[property] = {
          value: document.body.style.getPropertyValue(property),
          priority: document.body.style.getPropertyPriority(property)
        };
      });
      var gutter = window.innerWidth - document.documentElement.clientWidth;
      var padding = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      if (gutter > 0) {
        document.body.style.paddingRight = (padding + gutter) + 'px';
      }
      document.body.style.overflow = 'hidden';
      // Move the existing card nodes, preserving their links and event handlers.
      viewport.appendChild(board);
      board.style.transform = 'none';
      try {
        dialog.showModal();
        activeDialog = dialog;
        connectTooltip();
        viewport.scrollTop = 0;
        viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
      } catch (error) {
        restore();
      }
    });

    closeButton.addEventListener('click', function () {
      dialog.close();
    });
    dialog.addEventListener('close', restore);
    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.stopPropagation();
      }
    });

    function outside(event) {
      var rect = dialog.getBoundingClientRect();
      return event.target === dialog &&
        (event.clientX < rect.left || event.clientX > rect.right ||
         event.clientY < rect.top || event.clientY > rect.bottom);
    }
    dialog.addEventListener('pointerdown', function (event) {
      pointerOutside = outside(event);
    });
    dialog.addEventListener('click', function (event) {
      if (pointerOutside && outside(event)) {
        dialog.close();
      }
      pointerOutside = false;
    });

    if (window.ResizeObserver) {
      var observer = new ResizeObserver(queueFit);
      observer.observe(stage);
      observer.observe(board);
    } else {
      window.addEventListener('resize', queueFit);
    }
    board.addEventListener('load', queueFit, true);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(queueFit);
    }
    fit();
  }

  function scan(content) {
    var node = content && content.jquery ? content[0] : content;
    node = node || document;
    if (node.matches && node.matches('.tfa-org')) {
      mount(node);
    }
    if (node.querySelectorAll) {
      Array.prototype.forEach.call(node.querySelectorAll('.tfa-org'), mount);
    }
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(scan);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scan(document); });
  } else {
    scan(document);
  }
}());