/**
 * Author: 0.Phixley ([[User:0.Phixley]])
 * Inspired by: https://support.fandom.com/hc/en-us/community/posts/42345362186775-Allow-wiki-administrators-to-pin-a-discussion-board-post
 * This script allows the page creator, as well as admins and moderators, to pin comments in the comment list. Other users will also see the pinned comment first.
 * The document is still being written.
 */

$.getScript('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:I18n-js/code.js&only=scripts')
    .done(() => {
        window.dev.i18n.loadMessages('ArticleCommentPin', {
            cacheVersion: 1
        }).done(i18n => {
            $(() => {
                if (mw.config.get('wgNamespaceNumber') !== 0 ||
                    window.__articleCommentPinInitialized) return;
                window.__articleCommentPinInitialized = true;
                const msg = key => i18n.msg(key).plain();
                const defaults = {
                    marker: 'ArticleCommentPins',
                    root: '#articleComments',
                    list: '#articleComments > div > div.CommentList_comment-list__SA8FA',
                    header: '.CommentList_comment-list-header__0D9Gj',
                    comment: '[data-testid="article-comments__comment"][data-thread-id]',
                    menu: 'ul.ActionDropdown_list__NLhpP',
                    item: '.ActionItem_action-item__dll5i',
                    loadMore: '#articleComments > div > div.CommentList_comment-list__SA8FA > button',
                    allowedGroups: ['sysop', 'content-moderator'],
                    loadTimeout: 10000,
                    loadDebounce: 300,
                    loadCooldown: 500
                };
                window.articleCommentPin = window.articleCommentPin || {};
                Object.keys(defaults).forEach(key => {
                    if (typeof window.articleCommentPin[key] === 'undefined') {
                        window.articleCommentPin[key] = defaults[key];
                    }
                });
                const config = window.articleCommentPin;
                const api = new mw.Api();
                const groups = mw.config.get('wgUserGroups') || [];
                let canPin = config.allowedGroups.some(group => groups.includes(group));
                const checkPageCreator = () => {
                    if (canPin) return Promise.resolve(true);
                    const userName = mw.config.get('wgUserName');
                    if (!userName) return Promise.resolve(false);
                    return api.get({
                        action: 'query',
                        prop: 'revisions',
                        titles: mw.config.get('wgPageName'),
                        rvprop: 'user',
                        rvdir: 'newer',
                        rvlimit: 1,
                        formatversion: 2
                    }).then(response => {
                        const page = response.query.pages[0];
                        const revision = page && page.revisions && page.revisions[0];
                        return !!(revision && revision.user === userName);
                    }).catch(() => false);
                };
                const indicatorSelector = '[data-pin-indicator="true"]';
                const placeholderSelector = '[data-pin-placeholder="true"]';
                const actionSelector = '[data-pin-action="true"]';
                let cachedRoot = null;
                let cachedList = null;
                const state = {
                    pin: null,
                    observer: null,
                    waitObserver: null,
                    loading: false,
                    loadCancel: null,
                    loadTask: null,
                    saving: false,
                    restoring: false,
                    moving: false,
                    initialized: false,
                    rootObserver: null,
                    observedRoot: null,
                    updating: false
                };
                const notify = (message, type = 'info') =>
                    mw.notify(message, { type });
                const getRoot = () => {
                    if (!cachedRoot || !cachedRoot.isConnected) {
                        cachedRoot = document.querySelector(config.root);
                        cachedList = null;
                    }
                    return cachedRoot;
                };
                const getList = () => {
                    const root = getRoot();
                    if (!root) {
                        cachedList = null;
                        return null;
                    }
                    if (cachedList && cachedList.isConnected && root.contains(cachedList)) {
                        return cachedList;
                    }
                    cachedList = document.querySelector(config.list);
                    if (cachedList && !root.contains(cachedList)) cachedList = null;
                    return cachedList;
                };
                const createPinIcon = (filled, type) => {
                    return $(window.dev.wds.icon(`pin${type}`))
                        .addClass('wds-icon ActionItem_icon__ipdtI')
                        .attr('data-pin-icon', 'true')
                        .css('fill', filled ? 'var(--theme-success-color)' : '');
                };
                const getComment = id => {
                    const comments = document.querySelectorAll(config.comment);
                    for (let i = 0; i < comments.length; i++) {
                        if (comments[i].dataset.threadId === id) return $(comments[i]);
                    }
                    return $();
                };
                const getComments = () => {
                    const list = getList();
                    if (!list) return [];
                    const comments = [];
                    for (let i = 0; i < list.children.length; i++) {
                        const child = list.children[i];
                        if (child.matches(config.comment)) comments.push(child);
                    }
                    return comments;
                };
                const getCommentCount = () =>
                    document.querySelectorAll(config.comment).length;
                const showPinPlaceholder = () => {
                    const list = getList();
                    if (!list || $(placeholderSelector).length) return;
                    const $placeholder = $(`
                        <div data-pin-placeholder="true"
                            style="display:flex;align-items:center;gap:8px;
                                padding:14px 16px;margin:8px 0;
                                border:1px solid var(--theme-border-color);
                                border-radius:4px;background:var(--theme-page-background-color);
                                color:var(--theme-text-color);font-size:14px;">
                            <span data-pin-placeholder-icon="true"></span>
                            <span data-pin-placeholder-text="true"></span>
                        </div>
                    `);
                    $placeholder.find('[data-pin-placeholder-icon]').append(createPinIcon(true, ''));
                    $placeholder.find('[data-pin-placeholder-text]').text(msg('loading'));
                    const firstComment = list.querySelector(config.comment);
                    if (firstComment) $placeholder.insertBefore(firstComment);
                    else $(list).prepend($placeholder);
                };
                const removePinPlaceholder = () => {
                    $(placeholderSelector).remove();
                };
                const parsePin = content => {
                    const match = content.match(
                        new RegExp(`<!--\\s*${config.marker}:\\s*([\\s\\S]*?)\\s*-->`)
                    );
                    if (!match) return null;
                    try {
                        const data = JSON.parse(match[1]);
                        if (Array.isArray(data)) {
                            return data.length && typeof data[0] === 'string'
                                ? { id: data[0], previousId: null, nextId: null, index: null }
                                : null;
                        }
                        return data && typeof data.id === 'string'
                            ? {
                                id: data.id,
                                previousId: typeof data.previousId === 'string' ? data.previousId : null,
                                nextId: typeof data.nextId === 'string' ? data.nextId : null,
                                index: Number.isInteger(data.index) ? data.index : null
                            }
                            : null;
                    } catch (error) {
                        return null;
                    }
                };
                const readPage = () => api.get({
                    action: 'query',
                    prop: 'revisions',
                    titles: mw.config.get('wgPageName'),
                    rvprop: 'content|timestamp',
                    rvslots: 'main',
                    curtimestamp: 1,
                    formatversion: 2
                }).then(data => {
                    const page = data.query && data.query.pages && data.query.pages[0];
                    const revision = page && page.revisions && page.revisions[0];
                    const slot = revision && revision.slots && revision.slots.main;
                    const content = slot && typeof slot.content === 'string'
                        ? slot.content
                        : revision && typeof revision['*'] === 'string'
                            ? revision['*']
                            : null;
                    if (!revision || content === null) {
                        return $.Deferred().reject(
                            new Error(msg('read-revision-error'))
                        ).promise();
                    }
                    return {
                        content,
                        timestamp: revision.timestamp,
                        starttimestamp: data.curtimestamp
                    };
                });
                const savePin = pin => readPage().then(page => {
                    const pattern = new RegExp(
                        `<!--\\s*${config.marker}:\\s*[\\s\\S]*?-->`
                    );
                    const marker = pin
                        ? `<!-- ${config.marker}: ${JSON.stringify(pin)} -->`
                        : '';
                    const content = pattern.test(page.content)
                        ? page.content.replace(pattern, marker)
                        : marker
                            ? `${page.content.replace(/\s*$/, '')}\n\n${marker}\n`
                            : page.content;
                    if (content === page.content) return $.Deferred().resolve().promise();
                    return api.postWithToken('csrf', {
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        text: content,
                        summary: msg(pin ? 'edit-pin' : 'edit-unpin'),
                        basetimestamp: page.timestamp,
                        starttimestamp: page.starttimestamp
                    }).then(result => {
                        if (!result.edit || result.edit.result !== 'Success') {
                            return $.Deferred().reject(
                                new Error(msg('save-error'))
                            ).promise();
                        }
                    });
                });
                const getContext = comment => {
                    const list = getList();
                    if (!list || comment.parentElement !== list) {
                        return { previousId: null, nextId: null, index: null };
                    }
                    const comments = getComments();
                    const index = comments.indexOf(comment);
                    return {
                        previousId: index > 0 ? comments[index - 1].dataset.threadId : null,
                        nextId: index >= 0 && index < comments.length - 1
                            ? comments[index + 1].dataset.threadId
                            : null,
                        index: index >= 0 ? index : null
                    };
                };
                const updateIndicator = () => {
                    const indicators = document.querySelectorAll(
                        `${config.comment} ${indicatorSelector}`
                    );
                    $(indicators).closest(config.comment).contents().filter(function () {
                        return this.nodeType === 3 &&
                            $.trim(this.nodeValue) === '[object Object]';
                    }).remove();
                    if (!state.pin) {
                        $(indicators).remove();
                        $(config.comment).contents().filter(function () {
                            return this.nodeType === 3 &&
                                $.trim(this.nodeValue) === '[object Object]';
                        }).remove();
                        return;
                    }
                    $(indicators).each(function () {
                        if ($(this).closest(config.comment).attr('data-thread-id') !== state.pin.id) {
                            $(this).remove();
                        }
                    });
                    const $comment = getComment(state.pin.id);
                    if (!$comment.length || $comment.find(indicatorSelector).length) return;
                    const $indicator = $(`
                        <div data-pin-indicator="true"
                            style="border-bottom:1px solid var(--theme-border-color);
                                display:flex;align-items:center;font-size:14px;
                                padding:10px 5px 7px;margin:0 10px;white-space:pre"
                            title="">
                            <span></span>
                        </div>
                    `);
                    $indicator.attr('title', msg('pinned-title'));
                    $indicator.find('span').text(msg('pinned'));
                    $indicator.prepend(createPinIcon(true, '-small')
                        .css({ 'height': '20px', 'width': '20px', 'transform': 'rotate(45deg)' }));
                    $comment.prepend($indicator);
                };
                const updateMenus = () => {
                    $(getRoot() || document).find(actionSelector).each(function () {
                        const $item = $(this);
                        const id = this.dataset.pinId;
                        const pinned = !!state.pin && state.pin.id === id;
                        const disabled = state.saving || state.restoring ||
                            (!!state.pin && !pinned);
                        const $label = $item.find('[data-pin-label]').first();
                        const $icon = $item.find('[data-pin-icon]').first();
                        const label = msg(pinned ? 'unpin' : 'pin');
                        const ariaDisabled = String(disabled);
                        const tabindex = disabled ? '-1' : '0';
                        const opacity = disabled ? '0.45' : '';
                        const cursor = disabled ? 'not-allowed' : '';
                        if ($label.text() !== label) $label.text(label);
                        if ($icon.length && $item.data('pin-filled') !== pinned) {
                            $icon.replaceWith(createPinIcon(pinned, ''));
                            $item.data('pin-filled', pinned);
                        }
                        if ($item.attr('aria-disabled') !== ariaDisabled) {
                            $item.attr('aria-disabled', ariaDisabled);
                        }
                        if ($item.attr('tabindex') !== tabindex) {
                            $item.attr('tabindex', tabindex);
                        }
                        if (this.style.opacity !== opacity) $item.css('opacity', opacity);
                        if (this.style.cursor !== cursor) $item.css('cursor', cursor);
                    });
                };
                const addMenuItems = () => {
                    if (!canPin) return;
                    $(getRoot() || document).find(config.menu).each(function () {
                        const $menu = $(this);
                        const $comment = $menu.closest(config.comment);
                        const id = $comment.attr('data-thread-id');
                        if (!id || $menu.find(actionSelector).length) return;
                        const pinned = !!state.pin && state.pin.id === id;
                        const $item = $(`
                            <li class="ActionItem_action-item__dll5i"
                                tabindex="0" role="menuitem" data-pin-action="true">
                                <span data-pin-label="true"></span>
                            </li>
                        `);
                        $item.attr('data-pin-id', id);
                        $item.prepend(createPinIcon(pinned, ''));
                        $item.find('[data-pin-label]').text(msg(pinned ? 'unpin' : 'pin'));
                        $item.data('pin-filled', pinned);
                        $menu.prepend($item);
                    });
                    updateMenus();
                };
                const reorderPinned = () => {
                    updateIndicator();
                    if (!state.pin || state.moving || state.loading || state.restoring) return;
                    const $comment = getComment(state.pin.id);
                    const list = getList();
                    if (!$comment.length || !list) return;
                    const comment = $comment[0];
                    if (comment.parentElement !== list) return;
                    const firstComment = list.querySelector(config.comment);
                    if (!firstComment || firstComment === comment) return;
                    state.moving = true;
                    try {
                        $comment.insertBefore(firstComment);
                    } finally {
                        state.moving = false;
                    }
                    updateIndicator();
                };
                const loadUntil = (predicate, onFound, onUnavailable) => {
                    if (state.loadTask) return;
                    const task = {
                        observer: null,
                        timeout: null,
                        debounce: null,
                        stopped: false,
                        previousCount: 0,
                        waitingForButton: false
                    };
                    state.loadTask = task;
                    const stop = () => {
                        if (task.stopped) return;
                        task.stopped = true;
                        if (task.observer) task.observer.disconnect();
                        clearTimeout(task.timeout);
                        clearTimeout(task.debounce);
                        if (state.loadTask === task) state.loadTask = null;
                    };
                    const finishFound = () => {
                        stop();
                        onFound();
                    };
                    const finishUnavailable = () => {
                        stop();
                        onUnavailable();
                    };
                    const check = () => {
                        if (task.stopped) return;
                        if (predicate()) return finishFound();
                        const button = document.querySelector(config.loadMore);
                        if (!button) return finishUnavailable();
                        clearTimeout(task.timeout);
                        task.timeout = setTimeout(() => {
                            if (predicate()) finishFound();
                            else finishUnavailable();
                        }, config.loadTimeout);
                        if (button.disabled) {
                            task.waitingForButton = true;
                            return;
                        }
                        task.waitingForButton = false;
                        task.previousCount = getCommentCount();
                        button.click();
                    };
                    task.observer = new MutationObserver(() => {
                        if (task.stopped) return;
                        if (predicate()) return finishFound();
                        const count = getCommentCount();
                        const button = document.querySelector(config.loadMore);
                        if (!button) return finishUnavailable();
                        if (count > task.previousCount) {
                            clearTimeout(task.debounce);
                            task.debounce = setTimeout(() => {
                                if (task.stopped) return;
                                if (predicate()) finishFound();
                                else check();
                            }, config.loadDebounce);
                            return;
                        }
                        if (task.waitingForButton && !button.disabled) {
                            clearTimeout(task.debounce);
                            task.debounce = setTimeout(check, 0);
                        }
                    });
                    task.observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['disabled', 'class', 'aria-busy']
                    });
                    check();
                };
                const loadPinned = () => {
                    if (state.loading || !state.pin || !getRoot()) return;
                    state.loading = true;
                    let observer = null;
                    let timer = null;
                    let debounce = null;
                    let finished = false;
                    let batchCount = 0;
                    let clicking = false;
                    let firstBatch = true;
                    let sawDisabled = false;
                    let waitingForButton = false;
                    const finish = found => {
                        if (finished) return;
                        finished = true;
                        if (found) {
                            removePinPlaceholder();
                        } else {
                            const $placeholder = $(placeholderSelector);
                            $placeholder.find('[data-pin-placeholder-text]')
                                .text(msg('not-found'));
                            $placeholder.find('[data-pin-placeholder-icon]')
                                .empty()
                                .append(createPinIcon(false, ''));
                        }
                        if (observer) observer.disconnect();
                        clearTimeout(timer);
                        clearTimeout(debounce);
                        state.loading = false;
                        state.loadCancel = null;
                        if (found && state.pin) {
                            const $comment = getComment(state.pin.id);
                            if ($comment.length && state.pin.index === null) {
                                state.pin = Object.assign(
                                    {},
                                    state.pin,
                                    getContext($comment[0])
                                );
                            }
                            reorderPinned();
                        } else {
                            updateIndicator();
                        }
                        addMenuItems();
                        updateMenus();
                    };
                    const runBatch = () => {
                        if (finished) return;
                        if (!state.pin) return finish(false);
                        if (getComment(state.pin.id).length) return finish(true);
                        const $button = $(config.loadMore).first();
                        if (!$button.length) {
                            waitingForButton = true;
                            return;
                        }
                        if ($button.prop('disabled')) {
                            waitingForButton = true;
                            return;
                        }
                        waitingForButton = false;
                        clicking = true;
                        sawDisabled = false;
                        batchCount = getCommentCount();
                        clearTimeout(timer);
                        timer = setTimeout(() => finish(false), config.loadTimeout);
                        $button.trigger('click');
                    };
                    observer = new MutationObserver(() => {
                        if (finished) return;
                        if (!state.pin) return finish(false);
                        if (getComment(state.pin.id).length) return finish(true);
                        const count = getCommentCount();
                        const $button = $(config.loadMore).first();
                        const disabled = $button.length && $button.prop('disabled');
                        if (clicking && disabled) sawDisabled = true;
                        if (count > batchCount) {
                            batchCount = count;
                            addMenuItems();
                            clearTimeout(timer);
                            timer = setTimeout(() => finish(false), config.loadTimeout);
                            clearTimeout(debounce);
                            debounce = setTimeout(() => {
                                if (finished) return;
                                if (!state.pin) return finish(false);
                                if (getComment(state.pin.id).length) return finish(true);
                                if (firstBatch) {
                                    firstBatch = false;
                                    showPinPlaceholder();
                                }
                                debounce = setTimeout(() => {
                                    if (finished) return;
                                    if (!state.pin) return finish(false);
                                    if (getComment(state.pin.id).length) return finish(true);
                                    clicking = false;
                                    runBatch();
                                }, config.loadCooldown);
                            }, config.loadDebounce);
                            return;
                        }
                        if (waitingForButton && $button.length && !disabled) {
                            runBatch();
                            return;
                        }
                        if (clicking && sawDisabled && $button.length && !disabled) {
                            finish(false);
                        }
                    });
                    state.loadCancel = () => finish(false);
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['disabled', 'class', 'aria-busy']
                    });
                    runBatch();
                };
                const restorePosition = (pin, callback) => {
                    const place = () => {
                        const $comment = getComment(pin.id);
                        const list = getList();
                        if (!$comment.length || !list) return false;
                        const $list = $(list);
                        const $next = pin.nextId
                            ? getComment(pin.nextId).filter(function () {
                                return this.parentElement === list;
                            }).first()
                            : $();
                        const $previous = pin.previousId
                            ? getComment(pin.previousId).filter(function () {
                                return this.parentElement === list;
                            }).first()
                            : $();
                        if ($next.length) {
                            $comment.insertBefore($next);
                            return true;
                        }
                        if ($previous.length) {
                            $comment.insertAfter($previous);
                            return true;
                        }
                        const $comments = $list.children(config.comment).not($comment);
                        if (Number.isInteger(pin.index) && $comments.length >= pin.index) {
                            const $anchor = $comments.eq(pin.index);
                            if ($anchor.length) {
                                $comment.insertBefore($anchor);
                            } else {
                                const $button = $list.children('button').first();
                                if ($button.length) $comment.insertBefore($button);
                                else $comment.appendTo($list);
                            }
                            return true;
                        }
                        return false;
                    };
                    if (place()) {
                        callback(true);
                        return;
                    }
                    const list = getList();
                    const comment = getComment(pin.id)[0];
                    if (!list || !comment) {
                        callback(false);
                        return;
                    }
                    loadUntil(
                        place,
                        () => callback(true),
                        () => {
                            const currentList = getList();
                            if (currentList && comment.parentElement !== currentList) {
                                currentList.append(comment);
                            }
                            callback(false);
                        }
                    );
                };
                const syncDOM = () => {
                    if (state.updating) return;
                    state.updating = true;
                    try {
                        addMenuItems();
                        updateIndicator();
                        reorderPinned();
                    } finally {
                        state.updating = false;
                    }
                };
                const observe = () => {
                    const root = getRoot();
                    if (!root || state.observedRoot === root) return;
                    if (state.observer) state.observer.disconnect();
                    state.observedRoot = root;
                    state.observer = new MutationObserver(records => {
                        const list = getList();
                        const pinnedComment = state.pin ? getComment(state.pin.id)[0] : null;
                        const pinnedWasRemoved = records.some(record =>
                            record.target === list &&
                            Array.prototype.indexOf.call(record.removedNodes, pinnedComment) !== -1
                        );
                        const pinnedWasAdded = records.some(record =>
                            record.target === list &&
                            Array.prototype.indexOf.call(record.addedNodes, pinnedComment) !== -1
                        );
                        const onlyPinnedMove = pinnedComment &&
                            pinnedWasRemoved &&
                            pinnedWasAdded &&
                            records.every(record => {
                                if (record.target !== list) return false;
                                const added = record.addedNodes;
                                const removed = record.removedNodes;
                                if (!added.length && !removed.length) return false;
                                for (let i = 0; i < added.length; i++) {
                                    if (added[i] !== pinnedComment) return false;
                                }
                                for (let i = 0; i < removed.length; i++) {
                                    if (removed[i] !== pinnedComment) return false;
                                }
                                return true;
                            });
                        if (onlyPinnedMove) return;
                        const relevant = records.some(record => {
                            const target = record.target;
                            const $target = $(target);
                            if ($target.closest(`${actionSelector}, ${indicatorSelector}`).length) {
                                return false;
                            }
                            const added = record.addedNodes;
                            const removed = record.removedNodes;
                            if (!added.length && !removed.length) return false;
                            if (list && target === list) {
                                for (let i = 0; i < added.length; i++) {
                                    const node = added[i];
                                    if (node.nodeType === 1 &&
                                        node.matches(config.comment) &&
                                        node !== pinnedComment) return true;
                                }
                                for (let i = 0; i < removed.length; i++) {
                                    const node = removed[i];
                                    if (node.nodeType === 1 &&
                                        node.matches(config.comment) &&
                                        node !== pinnedComment) return true;
                                }
                                return false;
                            }
                            if ($target.closest(config.menu).length) {
                                const changed = [].slice.call(added).concat([].slice.call(removed));
                                return changed.some(node =>
                                    node.nodeType !== 1 || !$(node).is(actionSelector)
                                );
                            }
                            const changed = [].slice.call(added).concat([].slice.call(removed));
                            return changed.some(node => {
                                if (node.nodeType !== 1) return false;
                                const $node = $(node);
                                if ($node.is(`${actionSelector}, ${indicatorSelector}`)) return false;
                                return $node.is(config.menu) || $node.find(config.menu).length > 0;
                            });
                        });
                        if (relevant) syncDOM();
                    });
                    state.observer.observe(root, {
                        childList: true,
                        subtree: true
                    });
                    addMenuItems();
                };
                const watchRoot = () => {
                    if (state.rootObserver) return;
                    const containsRoot = node => {
                        if (node.nodeType !== 1) return false;
                        return $(node).is(config.root) || $(node).find(config.root).length > 0;
                    };
                    state.rootObserver = new MutationObserver(records => {
                        const changed = records.some(record =>
                            Array.prototype.some.call(record.addedNodes, containsRoot) ||
                            Array.prototype.some.call(record.removedNodes, containsRoot)
                        );
                        if (!changed) return;
                        cachedRoot = null;
                        cachedList = null;
                        const root = getRoot();
                        if (root === state.observedRoot) return;
                        if (state.loadCancel) state.loadCancel();
                        if (state.observer) {
                            state.observer.disconnect();
                            state.observer = null;
                        }
                        state.observedRoot = null;
                        if (!root) return;
                        observe();
                        if (state.pin) loadPinned();
                    });
                    state.rootObserver.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                };
                const init = () => {
                    if (state.initialized || !getRoot()) return;
                    state.initialized = true;
                    if (state.waitObserver) {
                        state.waitObserver.disconnect();
                        state.waitObserver = null;
                    }
                    observe();
                    watchRoot();
                    readPage().done(page => {
                        state.pin = parsePin(page.content);
                        updateIndicator();
                        addMenuItems();
                        updateMenus();
                        if (state.pin) {
                            reorderPinned();
                            loadPinned();
                        }
                    }).fail(() => {
                        notify(msg('read-error'), 'error');
                    });
                };
                const start = () => {
                    const startInit = () => {
                        checkPageCreator().then(result => {
                            canPin = canPin || result;
                            init();
                        });
                    };
                    if (getRoot()) {
                        startInit();
                        return;
                    }
                    if (state.waitObserver) return;
                    state.waitObserver = new MutationObserver(() => {
                        if (getRoot()) {
                            state.waitObserver.disconnect();
                            state.waitObserver = null;
                            startInit();
                        }
                    });
                    state.waitObserver.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                };
                $(document).on('click.articleCommentPin', actionSelector, function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!canPin || state.saving || state.restoring) return;
                    const id = this.dataset.pinId;
                    if (!id) return;
                    const pinned = !!state.pin && state.pin.id === id;
                    if (state.pin && !pinned) return;
                    state.saving = true;
                    updateMenus();
                    if (pinned) {
                        const oldPin = state.pin;
                        savePin(null).done(() => {
                            state.pin = null;
                            updateIndicator();
                            updateMenus();
                            state.restoring = true;
                            updateMenus();
                            restorePosition(oldPin, restored => {
                                state.restoring = false;
                                updateMenus();
                                notify(
                                    msg(restored ? 'unpin-restored' : 'unpin-not-restored'),
                                    restored ? 'success' : 'warn'
                                );
                            });
                        }).fail(() => {
                            notify(msg('unpin-error'), 'error');
                        }).always(() => {
                            state.saving = false;
                            updateMenus();
                        });
                        return;
                    }
                    const comment = getComment(id)[0];
                    if (!comment) {
                        state.saving = false;
                        updateMenus();
                        return;
                    }
                    const pin = Object.assign({
                        id,
                        previousId: null,
                        nextId: null,
                        index: null
                    }, getContext(comment));
                    savePin(pin).done(() => {
                        state.pin = pin;
                        updateIndicator();
                        addMenuItems();
                        reorderPinned();
                        updateMenus();
                        notify(msg('pin-success'), 'success');
                    }).fail(() => {
                        notify(msg('pin-error'), 'error');
                    }).always(() => {
                        state.saving = false;
                        updateMenus();
                    });
                });
                mw.hook('wikipage.content').add(start);
                start();
            });
        });
    })
    .fail(error => {
        console.error('ArticleCommentPin: failed to load I18n-js.', error);
    });

// [[w:c:dev:WDSIcons]]
importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });