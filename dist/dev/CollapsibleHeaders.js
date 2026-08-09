mw.hook('wikipage.content').add(function ($content) {
    var parserOutput = $content.children('.mw-parser-output');
    var hasHeaders = parserOutput.find('.mw-headline')
        .not('#mw-toc-heading')
        .filter(function () {
            var p = $(this).parent();
            return p.is('h1,h2,h3,h4,h5,h6');
        }).length > 0;

    if (!hasHeaders) return;
    if ($content.data('collapsibleHeadersRan')) return;

    $content.data('collapsibleHeadersRan', true);

    var $parseroutput = $content.children('.mw-parser-output');
    var sections = [];
    var observedWidth = null;
    var refreshScheduled = false;

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

    var fileExtensionPattern = /\.(svg|png|jpe?g|gif|webp|bmp|ico)$/i;
    var trustedImageHosts = ['static.wikia.nocookie.net'];

    function isTrustedImageUrl(value) {
        try {
            var parsed = new URL(value);
            return parsed.protocol === 'https:' && trustedImageHosts.indexOf(parsed.hostname) !== -1;
        } catch (e) {
            return false;
        }
    }

    function resolveFileUrl(fileName) {
        var cleanName = fileName.replace(/^(File|Image):/i, '').trim();

        if (window.mw && mw.util && typeof mw.util.getUrl === 'function') {
            return mw.util.getUrl('Special:FilePath/' + cleanName);
        }

        return null;
    }

    function setToggleContent(target, content) {
        var trimmed = content.trim();

        if (isTrustedImageUrl(trimmed)) {
            target.empty().append($('<img>').attr('src', trimmed).attr('alt', '').css({ width: '1em', height: '1em', 'object-fit': 'contain' }));
            return;
        }

        if (fileExtensionPattern.test(trimmed)) {
            var url = resolveFileUrl(trimmed);

            if (url) {
                target.empty().append($('<img>').attr('src', url).attr('alt', '').css({ width: '1em', height: '1em', 'object-fit': 'contain' }));
                return;
            }
        }

        if (content === defaultArrow) {
            target.html(content);
            return;
        }

        target.text(content);
    }

    function getHeaderLevel(header) {
        return parseInt(header.prop('tagName').substring(1));
    }

    function isInteractiveTarget(target, boundary) {
        var el = target.closest([
            'a',
            'button',
            'input',
            'select',
            'textarea',
            'summary',
            '[role="button"]',
            '[role="link"]',
            '.mw-editsection',
            '.section-edit-link',
            '.chevron-wrapper'
        ].join(','));

        if (!el) return false;
        if (boundary && el === boundary) return false;

        return true;
    }

    function getBlockHeight(block) {
        var inner = block.inner;
        var rect = inner.getBoundingClientRect();
        var maxBottom = rect.top;
        var found = false;

        $(inner).children(':visible').each(function () {
            var cs = getComputedStyle(this);

            if (cs.position === 'absolute') return;

            var r = this.getBoundingClientRect();

            if (r.height > 0) {
                found = true;
                maxBottom = Math.max(maxBottom, r.bottom + (parseFloat(cs.marginBottom) || 0));
            }
        });

        $(inner).find('.mw-collapsible.mw-made-collapsible.mw-collapsed > .mw-collapsible-toggle').each(function () {
            var r = this.getBoundingClientRect();

            if (r.height > 0) {
                found = true;
                maxBottom = Math.max(maxBottom, r.bottom);
            }
        });

        if (!found) return 0;

        var paddingBottom = parseFloat(getComputedStyle(inner).paddingBottom) || 0;

        return Math.ceil(maxBottom - rect.top + paddingBottom);
    }

    function getHashTarget() {
        var hash = window.location.hash;
        if (!hash) return null;

        var id = hash.slice(1);

        try {
            id = decodeURIComponent(id);
        } catch (e) {}

        return document.getElementById(id) || document.getElementsByName(id)[0] || null;
    }

    function refreshExpandedHeights() {
        var expanded = sections.filter(function (section) {
            return !section.isCollapsed() && !section.isAnimating;
        });

        expanded.forEach(function (section) {
            section.prepareForMeasure();
        });

        expanded
            .slice()
            .sort(function (a, b) {
                return b.level - a.level;
            })
            .forEach(function (section) {
                section.setExpandedHeight();
            });
    }

    function scheduleRefresh() {
        if (refreshScheduled) return;

        if (sections.some(function (section) {
            return section.isAnimating;
        })) {
            requestAnimationFrame(scheduleRefresh);
            return;
        }

        refreshScheduled = true;

        requestAnimationFrame(function () {
            refreshScheduled = false;
            refreshExpandedHeights();
        });
    }

    function syncAncestorsWhileAnimating(section) {
        var ancestors = sections.filter(function (s) {
            return s !== section && s.block.inner.contains(section.header);
        });

        if (!ancestors.length) return;

        var syncIntervalMs = 150;
        var lastUpdate = 0;

        function step(now) {
            if (!section.isAnimating) {
                ancestors.forEach(function (ancestor) {
                    ancestor.block.outer.style.overflow = '';
                });
                return;
            }

            if (now - lastUpdate >= syncIntervalMs) {
                lastUpdate = now;

                ancestors.forEach(function (ancestor) {
                    if (ancestor.isAnimating || ancestor.isCollapsed()) return;

                    ancestor.block.outer.style.transition = 'none';
                    ancestor.block.outer.style.overflow = 'hidden';
                    ancestor.block.outer.style.height = getBlockHeight(ancestor.block) + 'px';
                });
            }

            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    var defaultArrow =
        '<svg class="wds-icon wds-icon-small chevron" width="12" height="12" aria-hidden="true" focusable="false">' +
        '<use xlink:href="#wds-icons-menu-control-small"></use>' +
        '</svg>';

    var color = getProp('--ch-color', 'rgb(230, 230, 230)');
    var arrow = getProp('--ch-arrow', defaultArrow);
    var arrowStartRotation = getProp('--ch-arrow-start-rotation', '180deg');
    var arrowRotationEnd = getProp('--ch-arrow-rotation-end', getProp('--ch-arrow-rotation', '0deg'));
    var arrowDuration = getProp('--ch-arrow-animation-duration', '.25s');
    var arrowEasing = getProp('--ch-arrow-easing-style', 'ease-in-out');
    var duration = getProp('--ch-animation-duration', '0s');
    var easing = getProp('--ch-easing-style', 'linear');
    var collapseAll = getProp('--ch-collapse-all', 'true');
    var collapseAllContent = getProp('--ch-collapse-all-content', '◇');
    var collapseAllTooltip = getProp('--ch-collapse-all-tooltip', 'Expand/collapse all');

    if (!window.CollapsibleHeadersCSSLoaded) {
        window.CollapsibleHeadersCSSLoaded = true;

        mw.util.addCSS([
            '.ch-header-clickable,.ch-header-static{align-items:center;display:flex;overflow-x:hidden;pointer-events:all;}',
            '.ch-header-clickable{cursor:pointer;}',
            '.ch-header-clickable .section-header-label,.ch-header-static .section-header-label{flex:1;min-width:0;}',
            '.ch-header-clickable .section-header-label{cursor:pointer;}',
            '.ch-header-clickable .section-edit-link,.ch-header-static .section-edit-link{align-items:center;color:var(--theme-link-color);display:flex;height:44px;padding:9px 13px;}',
            '.ch-header-static .section-edit-link{padding:9px 6px 9px 13px;}',
            '.ch-header-clickable .vertical-separator{border-left:1px solid var(--theme-border-color);height:26px;width:1px;}',
            '.ch-header-clickable .chevron-wrapper{align-items:center;background:#0000;border:none;color:var(--ch-color,rgb(230,230,230));cursor:pointer;display:flex;font-size:inherit;height:44px;outline-color:#0000;overflow:hidden;padding:9px 6px 9px 13px;user-select:none;}',
            '.ch-header-clickable .chevron-wrapper svg{color:currentColor;fill:currentColor;}',
            '.ch-header-clickable .ch-toggle-icon{display:inline-flex;transform-origin:center;transition:transform var(--ch-arrow-animation-duration,.25s) var(--ch-arrow-easing-style,ease-in-out);}',
            '.ch-header-clickable .chevron{pointer-events:none;}',
            '.ch-outer-wrapper{width:100%;overflow:visible;pointer-events:none;}',
            '.ch-outer-wrapper.ch-is-hidden{overflow:hidden;}',
            '.ch-collapse-all{font-family:var(--ch-collapse-all-font-family,inherit);font-size:var(--ch-collapse-all-size,18px);line-height:1;}',
            '.ch-inner-wrapper{pointer-events:auto;padding:1px 0;}',
            '.ch-inner-wrapper .tabber,.ch-inner-wrapper .tabbernav,.ch-inner-wrapper .tabbertab,.ch-inner-wrapper .wds-tabs,.ch-inner-wrapper .wds-tabs__tab,.ch-inner-wrapper .wds-tabs__tab-label,.ch-inner-wrapper .wds-tab__content{pointer-events:auto;}'
        ].join(''));
    }

    function buildMobileStyleHeader(header, headline, toggle, sectionId) {
        var oldEditSection = header[0].querySelector('.mw-editsection');
        var oldEditLink = oldEditSection ? oldEditSection.querySelector('a') : null;
        var editLink = oldEditLink ? oldEditLink.cloneNode(true) : null;

        if (oldEditSection) {
            oldEditSection.remove();
        }

        var label = document.createElement('div');
        label.className = 'section-header-label';

        label.appendChild(headline[0]);

        header[0].insertBefore(label, header[0].firstChild);

        if (editLink) {
            editLink.classList.add('section-edit-link');
            editLink.classList.remove('mw-editsection-visualeditor');
            editLink.innerHTML =
                '<svg class="wds-icon wds-icon-small" width="12" height="12" aria-hidden="true" focusable="false">' +
                '<use xlink:href="#wds-icons-pencil-small"></use>' +
                '</svg>';

            header[0].appendChild(editLink);

            var separator = document.createElement('div');
            separator.className = 'vertical-separator';
            header[0].appendChild(separator);
        }

        header[0].appendChild(toggle[0]);

        header
            .addClass('ch-header-clickable')
            .attr('role', 'button')
            .attr('aria-controls', sectionId)
            .attr('aria-pressed', 'false');
    }

    function buildStaticHeader(header, headline) {
        var oldEditSection = header[0].querySelector('.mw-editsection');
        var oldEditLink = oldEditSection ? oldEditSection.querySelector('a') : null;
        var editLink = oldEditLink ? oldEditLink.cloneNode(true) : null;

        if (oldEditSection) {
            oldEditSection.remove();
        }

        var label = document.createElement('div');
        label.className = 'section-header-label';

        label.appendChild(headline[0]);

        header[0].insertBefore(label, header[0].firstChild);

        if (editLink) {
            editLink.classList.add('section-edit-link');
            editLink.classList.remove('mw-editsection-visualeditor');
            editLink.innerHTML =
                '<svg class="wds-icon wds-icon-small" width="12" height="12" aria-hidden="true" focusable="false">' +
                '<use xlink:href="#wds-icons-pencil-small"></use>' +
                '</svg>';

            header[0].appendChild(editLink);
        }

        header.addClass('ch-header-static');
    }

    var headlines = $parseroutput.find('.mw-headline')
        .not('#mw-toc-heading')
        .get()
        .sort(function (a, b) {
            var A = $(a).parent();
            var B = $(b).parent();
            var al = getHeaderLevel(A);
            var bl = getHeaderLevel(B);

            if (al !== bl) return bl - al;

            if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return -1;
        });

    $(headlines).each(function () {
        var headline = $(this);
        var header = headline.parent();

        if (!header.is('h1,h2,h3,h4,h5,h6')) return;
        if (header.data('chProcessed')) return;

        var customEl = headline.find('.ch-custom')[0];
        var custom = customEl ? customEl.dataset : {};

        if (custom.chCollapse === 'false') {
            buildStaticHeader(header, headline);
            header.data('chProcessed', true);
            return;
        }

        var headerColor = custom.chColor || color;
        var headerArrow = custom.chArrow || arrow;
        var headerArrowStartRotation = custom.chArrowStartRotation || arrowStartRotation;
        var headerArrowRotationEnd = custom.chArrowRotationEnd || custom.chArrowRotation || arrowRotationEnd;
        var headerDuration = custom.chAnimationDuration || duration;
        var headerEasing = custom.chEasingStyle || easing;
        var headerArrowDuration = custom.chArrowAnimationDuration || custom.chAnimationDuration || arrowDuration;
        var headerArrowEasing = custom.chArrowEasingStyle || custom.chEasingStyle || arrowEasing;
        var headerDurationMs = getDurationMs(headerDuration);
        var startCollapsed = custom.chStartCollapsed === 'true';

        var level = getHeaderLevel(header);
        var contentEls = [];
        var next = header[0].nextSibling;

        while (next) {
            if (next.nodeType === 1 && next.matches('h1,h2,h3,h4,h5,h6')) {
                var nl = getHeaderLevel($(next));
                if (nl <= level) break;
            }

            if (next.nodeType === 1 && next.classList.contains('section-stop')) {
                break;
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

        if (!contentEls.length) {
            buildStaticHeader(header, headline);
            header.data('chProcessed', true);
            return;
        }

        var inner = document.createElement('div');
        inner.className = 'ch-inner-wrapper';

        var outer = document.createElement('div');
        outer.className = 'ch-outer-wrapper';

        var sectionId = (headline.attr('id') || ('ch-section-' + sections.length)) + '-collapsible-section';

        outer.id = sectionId;

        var parent = contentEls[0].parentNode;

        parent.insertBefore(outer, contentEls[0]);

        contentEls.forEach(function (el) {
            inner.appendChild(el);
        });

        outer.appendChild(inner);

        var block = {
            outer: outer,
            inner: inner
        };

        var isCollapsedFlag = false;

        function setHidden(hidden) {
            outer.classList.toggle('ch-is-hidden', hidden);
        }

        function showBlock() {
            outer.style.display = '';
        }

        function hideBlock() {
            outer.style.display = 'none';
        }

        function prepareForMeasure() {
            showBlock();
            setHidden(false);
            outer.style.height = '';
        }

        function setExpandedHeight() {
            outer.style.height = getBlockHeight(block) + 'px';
        }

        function setExpandedState(expanded) {
            header
                .toggleClass('open-section', expanded)
                .toggleClass('collapsed', !expanded)
                .attr('aria-expanded', expanded ? 'true' : 'false')
                .attr('aria-pressed', expanded ? 'false' : 'true');

            toggle
                .attr('aria-expanded', expanded ? 'true' : 'false')
                .attr('aria-pressed', expanded ? 'false' : 'true')
                .attr('aria-label', expanded ? 'Collapse' : 'Expand');

            toggleIcon.css('transform', 'rotate(' + (expanded ? headerArrowRotationEnd : headerArrowStartRotation) + ')');
            isCollapsedFlag = !expanded;
        }

        var section = {
            header: header[0],
            headline: headline[0],
            level: level,
            block: block,
            isAnimating: false,
            prepareForMeasure: prepareForMeasure,
            setExpandedHeight: setExpandedHeight,
            isCollapsed: function () {
                return isCollapsedFlag;
            },
            contains: function (target) {
                return (
                    this.header === target ||
                    this.headline === target ||
                    this.header.contains(target) ||
                    outer.contains(target) ||
                    inner.contains(target)
                );
            },
            expand: function (instant) {
                if (!this.isCollapsed()) return;

                showBlock();
                this.isAnimating = true;
                syncAncestorsWhileAnimating(this);

                if (instant || headerDurationMs === 0) {
                    outer.style.transition = 'none';
                } else {
                    outer.style.transition = 'height ' + headerDuration + ' ' + headerEasing;
                }

                var h = getBlockHeight(block);

                outer.style.height = h + 'px';
                outer.offsetHeight;

                setHidden(true);
                setExpandedState(true);

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
                syncAncestorsWhileAnimating(this);

                if (instant || headerDurationMs === 0) {
                    outer.style.transition = 'none';
                } else {
                    outer.style.transition = 'height ' + headerDuration + ' ' + headerEasing;
                }

                outer.offsetHeight;
                setHidden(true);

                outer.style.height = '0px';
                setExpandedState(false);

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

                if (this.isCollapsed()) {
                    this.expand(instant);
                } else {
                    this.collapse(instant);
                }
            }
        };

        var toggle = $('<button>')
            .addClass('chevron-wrapper')
            .attr('type', 'button')
            .attr('aria-controls', sectionId)
            .attr('aria-expanded', startCollapsed ? 'false' : 'true')
            .attr('aria-pressed', startCollapsed ? 'true' : 'false')
            .css({
                color: headerColor
            })
            .on('click keydown', function (e) {
                if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
                if (e.type === 'keydown') e.preventDefault();

                e.stopPropagation();
                section.toggle(false);
            });

        var toggleIcon = $('<span>')
            .addClass('ch-toggle-icon')
            .css({
                transition: 'transform ' + headerArrowDuration + ' ' + headerArrowEasing
            });

        setToggleContent(toggleIcon, headerArrow);
        toggle.append(toggleIcon);

        buildMobileStyleHeader(header, headline, toggle, sectionId);
        header.data('chProcessed', true);

        var label = header[0].querySelector('.section-header-label');

        if (startCollapsed) {
            outer.style.height = '0px';

            setHidden(true);
            hideBlock();
            setExpandedState(false);
        } else {
            setExpandedHeight();
            setHidden(false);
            setExpandedState(true);
        }

        if (label) {
            header[0].addEventListener('click', function (e) {
                if (isInteractiveTarget(e.target, header[0])) return;
                if (header[0].closest('.portable-infobox')) return;
                if (header[0].closest('.right-rail-wrapper')) return;
                if (section.isAnimating) return;
                section.toggle(false);
            });
        }

        sections.push(section);

        var mo = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];

                if (m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length)) {
                    scheduleRefresh();
                    return;
                }

                if (m.type === 'attributes' && (m.attributeName === 'style' || m.attributeName === 'class')) {
                    scheduleRefresh();
                    return;
                }
            }
        });

        mo.observe(inner, {
            childList: true,
            subtree: true,
            attributes: true
        });

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
        return sections.filter(function (section) {
            return section.header && section.header.querySelector('.chevron-wrapper');
        });
    }

    function getVisibleCollapsibleSections() {
        return getAllCollapsibleSections().filter(function (section) {
            return $(section.header).is(':visible');
        });
    }

    function openSectionsForHash() {
        var target = getHashTarget();
        if (!target) return;

        sections
            .filter(function (section) {
                return section.contains(target);
            })
            .sort(function (a, b) {
                return a.level - b.level;
            })
            .forEach(function (section) {
                section.expand(true);
            });

        setTimeout(function () {
            target.scrollIntoView();
        }, 0);
    }

    function openHashLinkBeforeJump(e) {
        var link = e.target.closest('a[href*="#"]');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href) return;

        var hashIndex = href.indexOf('#');
        if (hashIndex === -1) return;

        var path = href.slice(0, hashIndex);
        var currentPath = location.pathname + location.search;

        if (path && path !== location.pathname && path !== currentPath && path !== location.href.split('#')[0]) return;

        var id = href.slice(hashIndex + 1);
        if (!id) return;

        try {
            id = decodeURIComponent(id);
        } catch (err) {}

        var target = document.getElementById(id) || document.getElementsByName(id)[0];
        if (!target) return;

        sections
            .filter(function (section) {
                return section.contains(target);
            })
            .sort(function (a, b) {
                return a.level - b.level;
            })
            .forEach(function (section) {
                section.expand(true);
            });
    }

    function toggleAllHeaders() {
        var visible = getVisibleCollapsibleSections();
        if (!visible.length) return;

        var total = visible.length;
        var collapsedCount = visible.filter(function (section) {
            return section.isCollapsed();
        }).length;
        var shouldExpand = collapsedCount / total >= 0.5;

        getAllCollapsibleSections().forEach(function (section) {
            if (shouldExpand) {
                if (section.isCollapsed()) section.expand(true);
            } else {
                if (!section.isCollapsed()) section.collapse(true);
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
            .attr('title', collapseAllTooltip)
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
        observedWidth = target.getBoundingClientRect().width;

        var observer = new ResizeObserver(function (entries) {
            var entry = entries[0];
            var width = entry.contentRect.width;

            if (Math.abs(width - observedWidth) < 0.1) return;

            observedWidth = width;
            scheduleRefresh();
        });

        observer.observe(target);
    }

    document.addEventListener('click', openHashLinkBeforeJump, true);

    openSectionsForHash();
    addCollapseAllButton();
    observeResizableContainer();

    $(window).on('hashchange', openSectionsForHash);
});