mw.hook('wikipage.content').add(function ($content) {
	var parserOutput = $content.children('.mw-parser-output');
	var hasHeaders =
	    parserOutput.find('.mw-headline')
	        .not('#mw-toc-heading')
	        .filter(function () {
	            var p = $(this).parent();
	            return p.is('h2,h3,h4,h5,h6');
	        }).length > 0;
	
	if (!hasHeaders) return;
	
	if ($content.data('collapsibleHeadersRan')) return;
	$content.data('collapsibleHeadersRan', true);

    var $parseroutput = $content.children('.mw-parser-output');
    var sections = [];
    var observedWidth = null;

    var configEl = document.querySelector('.collapsible-headers') || document.documentElement;
    var styles = getComputedStyle(configEl);

    function getProp(prop, fallback) {
        var val = styles.getPropertyValue(prop).trim();
        return val || fallback;
    }

    function getDurationMs(value) {
        var num = parseFloat(value);
        if (isNaN(num)) return 0;
        return value.indexOf('ms') !== -1 ? num : num * 1000;
    }

    function setToggleContent(toggle, content) {
        if (content.indexOf('<') !== -1) toggle.html(content);
        else toggle.text(content);
    }

    function getHeaderLevel(header) {
        return parseInt(header.prop('tagName').substring(1));
    }

    function getBlockHeight(block) {
        var inner = block.inner;
        var rect = inner.getBoundingClientRect();
        var maxBottom = rect.top;
        var found = false;

        $(inner).children(':visible').each(function () {
            var cs = getComputedStyle(this);
            if (cs.float !== 'none') return;
            if (cs.position === 'absolute') return;
            var tag = this.tagName;
            if (tag === 'IMG' || tag === 'FIGURE') return;
            if (this.classList.contains('thumb') || this.classList.contains('image')) return;
            var r = this.getBoundingClientRect();
            if (r.height > 0) {
                found = true;
                maxBottom = Math.max(maxBottom, r.bottom);
            }
        });

        $(inner).find('.mw-collapsible.mw-made-collapsible.mw-collapsed > .mw-collapsible-toggle')
            .each(function () {
                var r = this.getBoundingClientRect();
                if (r.height > 0) {
                    found = true;
                    maxBottom = Math.max(maxBottom, r.bottom);
                }
            });

        if (found) {
            return Math.ceil(maxBottom - rect.top);
        }

        return 0;
    }

    function getHashTarget() {
        var hash = window.location.hash;
        if (!hash) return null;
        var id = hash.slice(1);
        try { id = decodeURIComponent(id); } catch (e) {}
        return document.getElementById(id) || document.getElementsByName(id)[0] || null;
    }

    var refreshScheduled = false;

    function scheduleRefresh() {
	    if (refreshScheduled) return;
	
	    if (sections.some(s => s.isAnimating)) {
	        requestAnimationFrame(scheduleRefresh);
	        return;
	    }
	
	    refreshScheduled = true;
	    requestAnimationFrame(function () {
	        refreshScheduled = false;
	        refreshExpandedHeights();
	    });
	}

    function refreshExpandedHeights() {
        var expanded = sections.filter(s => !s.isCollapsed() && !s.isAnimating);
        expanded.forEach(s => s.prepareForMeasure());
        expanded.slice().sort((a, b) => b.level - a.level).forEach(s => {
            s.setExpandedHeight();
        });
    }

    var defaultArrow =
        '<svg class="wds-icon wds-icon-small" aria-hidden="true" focusable="false">' +
        '<use xlink:href="#wds-icons-menu-control-small"></use>' +
        '</svg>';

    var color = getProp('--ch-color', 'var(--theme-page-text-color)');
    var arrow = getProp('--ch-arrow', defaultArrow);
    var arrowRotation = getProp('--ch-arrow-rotation', '180deg');
    var duration = getProp('--ch-animation-duration', '0s');
    var easing = getProp('--ch-easing-style', 'linear');
    var collapseAll = getProp('--ch-collapse-all', 'true');
    var collapseAllContent = getProp('--ch-collapse-all-content', defaultArrow);
    var collapseAllTooltip = getProp('--ch-collapse-all-tooltip', 'Expand/collapse all');

    if (!window.CollapsibleHeadersCSSLoaded) {
        window.CollapsibleHeadersCSSLoaded = true;
        mw.util.addCSS([
            '.ch-toggle{cursor:pointer;user-select:none;display:inline-block;margin-left:auto;align-self:center;}',
            '.ch-outer-wrapper{width:100%;overflow:visible;pointer-events:none;}',
            '.ch-outer-wrapper.ch-is-hidden{overflow:hidden;}',
            '.ch-collapse-all{font-size:var(--ch-collapse-all-size,18px);line-height:1;}',
            '.ch-inner-wrapper a {pointer-events:auto;}',
            '.ch-header-clickable{cursor:pointer;pointer-events:all;display:flex;overflow-x:hidden;}',
            '.ch-inner-wrapper .mw-collapsible-toggle{pointer-events:all;}'
        ].join(''));
    }

    var headlines = $parseroutput.find('.mw-headline')
        .not('#mw-toc-heading')
        .get()
        .sort(function (a, b) {
            var A = $(a).parent(), B = $(b).parent();
            var al = getHeaderLevel(A), bl = getHeaderLevel(B);
            if (al !== bl) return bl - al;
            if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return -1;
        });

    $(headlines).each(function () {
        var headline = $(this);
        var header = headline.parent();
        if (!header.is('h2,h3,h4,h5,h6')) return;
        if (header.data('chProcessed')) return;

        var customEl = headline.find('.ch-custom')[0];
        var custom = customEl ? customEl.dataset : {};
        if (custom.chCollapse === 'false') return;

        var headerColor = custom.chColor || color;
        var headerArrow = custom.chArrow || arrow;
        var headerArrowRotation = custom.chArrowRotation || arrowRotation;
        var headerDuration = custom.chAnimationDuration || duration;
        var headerEasing = custom.chEasingStyle || easing;
        var headerDurationMs = getDurationMs(headerDuration);
        var startCollapsed = custom.chStartCollapsed === 'true';

        var level = getHeaderLevel(header);

        var contentEls = [];
        var next = header[0].nextSibling;

        while (next) {
            if (next.nodeType === 1 && next.matches('h2,h3,h4,h5,h6')) {
                var nl = getHeaderLevel($(next));
                if (nl <= level) break;
            }

            if (next.nodeType === 3) {
                if (!next.textContent.trim()) {
                    next = next.nextSibling;
                    continue;
                }
                contentEls.push(next);
                next = next.nextSibling;
                continue;
            }

            if (next.nodeType === 1) {
                contentEls.push(next);
            }

            next = next.nextSibling;
        }

        if (!contentEls.length) return;

        var inner = document.createElement('div');
        inner.className = 'ch-inner-wrapper';
        var outer = document.createElement('div');
        outer.className = 'ch-outer-wrapper';

        var parent = contentEls[0].parentNode;
        parent.insertBefore(outer, contentEls[0]);
        contentEls.forEach(function (el) { inner.appendChild(el); });
        outer.appendChild(inner);

        var block = { outer: outer, inner: inner };

        function setHidden(x) { outer.classList.toggle('ch-is-hidden', x); }
        function showBlock() { outer.style.display = ''; }
        function hideBlock() { outer.style.display = 'none'; }

        function prepareForMeasure() {
            showBlock();
            setHidden(false);
            outer.style.height = '';
            inner.style.transform = 'translateY(0)';
        }

        function setExpandedHeight() {
            outer.style.height = getBlockHeight(block) + 'px';
            inner.style.transform = 'translateY(0)';
        }

        var section = {
            header: header[0],
            headline: headline[0],
            level: level,
            block: block,
            isAnimating: false,
            prepareForMeasure: prepareForMeasure,
            setExpandedHeight: setExpandedHeight,
            isCollapsed: function () { return toggle.data('collapsed') === true; },
            contains: function (t) {
                return this.header === t || this.headline === t || this.header.contains(t) || outer.contains(t) || inner.contains(t);
            },
            expand: function (instant) {
                if (!this.isCollapsed()) return;

                showBlock();
                this.isAnimating = true;

                if (headerDurationMs === 0) {
                    outer.style.transition = 'none';
                    inner.style.transition = 'none';
                } else {
                    outer.style.transition = 'height ' + headerDuration + ' ' + headerEasing;
                    inner.style.transition = 'transform ' + headerDuration + ' ' + headerEasing;
                }

                var h = getBlockHeight(block);

                outer.style.height = h + 'px';
                outer.offsetHeight;

                setHidden(true);

                inner.style.transform = 'translateY(0px)';

                toggle.css('transform', '');
                toggle.attr('aria-expanded', 'true');
                toggle.data('collapsed', false);

                if (instant || headerDurationMs === 0) {
                    setHidden(false);
                    this.isAnimating = false;
                    scheduleRefresh();
                    return;
                }

                var self = this;

                setTimeout(function () {
                    setHidden(false);
                    self.isAnimating = false;
                    scheduleRefresh();
                }, headerDurationMs);
            },
            collapse: function (instant) {
                if (this.isCollapsed()) return;

                this.isAnimating = true;

                if (headerDurationMs === 0) {
                    outer.style.transition = 'none';
                    inner.style.transition = 'none';
                } else {
                    outer.style.transition = 'height ' + headerDuration + ' ' + headerEasing;
                    inner.style.transition = 'transform ' + headerDuration + ' ' + headerEasing;
                }

                var h = getBlockHeight(block);

                outer.offsetHeight;

                setHidden(true);

                outer.style.height = '0px';
                inner.style.transform = 'translateY(-' + h + 'px)';

                toggle.css('transform', 'rotate(' + headerArrowRotation + ')');
                toggle.attr('aria-expanded', 'false');
                toggle.data('collapsed', true);

                if (instant || headerDurationMs === 0) {
                    hideBlock();
                    this.isAnimating = false;
                    scheduleRefresh();
                    return;
                }

                var self = this;

                function onEnd(e) {
                    if (e.propertyName !== 'height') return;

                    outer.removeEventListener('transitionend', onEnd);

                    hideBlock();
                    self.isAnimating = false;
                    scheduleRefresh();
                }

                outer.addEventListener('transitionend', onEnd);
            },
            toggle: function (instant) {
                if (this.isAnimating) return;
                if (this.isCollapsed()) this.expand(instant);
                else this.collapse(instant);
            }
        };

        var toggle = $('<span>')
            .addClass('ch-toggle')
            .attr('role', 'button')
            .attr('tabindex', '0')
            .attr('aria-expanded', startCollapsed ? 'false' : 'true')
            .css({
                color: headerColor,
                transition: headerDurationMs === 0 ? 'none' : 'transform ' + headerDuration + ' ' + headerEasing
            })
            .on('click keydown', function (e) {
                if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
                if (e.type === 'keydown') e.preventDefault();
                section.toggle(false);
            })
            .data('collapsed', false);

        setToggleContent(toggle, headerArrow);
        header.append(toggle);
        header.data('chProcessed', true);

        if (startCollapsed) {
            var h = getBlockHeight(block);
            outer.style.height = '0px';
            inner.style.transform = 'translateY(-' + h + 'px)';
            hideBlock();
            toggle.css('transform', 'rotate(' + headerArrowRotation + ')');
            toggle.attr('aria-expanded', 'false');
            toggle.data('collapsed', true);
        } else {
            setExpandedHeight();
            setHidden(false);
        }

        header[0].classList.add('ch-header-clickable');

        header[0].addEventListener('pointerdown', function (e) {
            header[0]._chDownX = e.clientX;
            header[0]._chDownY = e.clientY;
        });

        header[0].addEventListener('pointerup', function (e) {
            if (Math.abs(e.clientX - header[0]._chDownX) > 5) return;
            if (Math.abs(e.clientY - header[0]._chDownY) > 5) return;
            if (e.button !== 0) return;
            if (e.target.closest('.ch-toggle')) return;
            if (e.target.closest('.mw-editsection')) return;
            if (e.target.closest('.toc-link')) return;
            if (header[0].closest('.portable-infobox')) return;
            if (header[0].closest('.right-rail-wrapper')) return;
            if (section.isAnimating) return;
            section.toggle(false);
        });

        sections.push(section);

        var mo = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];
                if (m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length)) {
                    scheduleRefresh();
                    return;
                }
                if (m.type === 'attributes') {
                    if (m.attributeName === 'style' || m.attributeName === 'class') {
                        scheduleRefresh();
                        return;
                    }
                }
            }
        });
        mo.observe(inner, { childList: true, subtree: true, attributes: true });

        if (window.ResizeObserver) {
            var lastHeight = inner.getBoundingClientRect().height;
            var ro = new ResizeObserver(function (entries) {
                var entry = entries[0];
                var h = entry.contentRect.height;
                if (Math.abs(h - lastHeight) > 0.5) {
                    lastHeight = h;
                    scheduleRefresh();
                }
            });
            ro.observe(inner);
        }

        inner.querySelectorAll('img').forEach(function (img) {
            if (!img.complete) {
                img.addEventListener('load', scheduleRefresh, { once: true });
                img.addEventListener('error', scheduleRefresh, { once: true });
            }
        });
    });

    function getAllCollapsibleSections() {
        return sections.filter(function (s) {
            return s.header && s.header.querySelector('.ch-toggle');
        });
    }

    function getVisibleCollapsibleSections() {
        return getAllCollapsibleSections().filter(function (s) {
            return $(s.header).is(':visible');
        });
    }

    function openSectionsForHash() {
        var target = getHashTarget();
        if (!target) return;
        sections
            .filter(function (s) { return s.contains(target); })
            .sort(function (a, b) { return a.level - b.level; })
            .forEach(function (s) { s.expand(true); });
        setTimeout(function () { target.scrollIntoView(); }, 0);
    }

    function toggleAllHeaders() {
        var visible = getVisibleCollapsibleSections();
        if (!visible.length) return;

        var total = visible.length;
        var collapsedCount = visible.filter(function (s) { return s.isCollapsed(); }).length;
        var shouldExpand = collapsedCount / total >= 0.5;

        var all = getAllCollapsibleSections();
        all.forEach(function (s) {
            if (shouldExpand) {
                if (s.isCollapsed()) s.expand(false);
            } else {
                if (!s.isCollapsed()) s.collapse(false);
            }
        });

        scheduleRefresh();
    }

    function addCollapseAllButton() {
        if (!sections.length) return;
        if (collapseAll === 'false' || window.CollapsibleHeadersCollapseAllLoaded) return;
        var sideTools = document.querySelector('.page-side-tools');
        if (!sideTools) return;
        window.CollapsibleHeadersCollapseAllLoaded = true;
        var button = $('<button>')
            .addClass('page-side-tool ch-collapse-all')
            .attr('type', 'button')
            .attr('name', 'collapsible-headers-toggle-all')
            .attr('aria-label', collapseAllTooltip)
            .attr('data-wds-tooltip', collapseAllTooltip)
            .attr('data-wds-tooltip-position', 'right')
            .attr('data-tooltip-attached', '1')
            .on('click', toggleAllHeaders);
        setToggleContent(button, collapseAllContent);
        $(sideTools).append(button);
    }

    function observeResizableContainer() {
        var target =
            document.querySelector('.resizable-container') ||
            document.querySelector('.page-content') ||
            document.querySelector('.main-container') ||
            document.querySelector('.page__main') ||
            $parseroutput[0];

        if (!target || !window.ResizeObserver || window.CollapsibleHeadersResizeObserverLoaded) return;
        window.CollapsibleHeadersResizeObserverLoaded = true;

        var lastWidth = target.getBoundingClientRect().width;

        var observer = new ResizeObserver(function (entries) {
            var entry = entries[0];
            var width = entry.contentRect.width;
            if (Math.abs(width - lastWidth) < 0.1) return;
            lastWidth = width;
            scheduleRefresh();
        });

        observer.observe(target);
    }

    openSectionsForHash();
    addCollapseAllButton();
    observeResizableContainer();
    $(window).on('hashchange', openSectionsForHash);
});