// Referenced [[:en:MediaWiki:Gadget-PageRating.js]] made by [[User:Pexy0]]
// [[User:0.Phixley]] edited
// From Backrooms Wiki Fandom ZH

mw.hook('wikipage.content').add(function () {
    if (mw.config.get('wgNamespaceNumber') !== 0) return;
    if (!mw.config.get('wgUserName')) return;
    if ($('.page-rating').length) return;
    const api = new mw.Api();
    const page = mw.config.get('wgTitle');
    const pageKey = ' ' + page;
    const ratingsPage = 'SCP基金会中文_Wiki:Ratings.json';
    const username = mw.config.get('wgUserName');
    const groups = mw.config.get('wgUserGroups') || [];
    const canCreateByGroup = groups.includes('sysop') || groups.includes('content-moderator');
    let globalUp = {}, globalDown = {};
    const rawUrl = title => `${mw.config.get('wgScript')}?title=${encodeURIComponent(title)}&action=raw`;
    const sort = obj => Object.fromEntries(Object.entries(obj).sort((a, b) => b[1].length - a[1].length));
    function getUsers(list) { return Array.isArray(list) ? list : []; }
    function saveRatings(summary) {
        return api.postWithEditToken({
            action: 'edit',
            format: 'json',
            title: ratingsPage,
            text: JSON.stringify({
                globalUp: sort(globalUp),
                globalDown: sort(globalDown)
            }, null, '\t'),
            summary: summary,
            watchlist: 'unwatch'
        }).then(result => {
            if (result.edit && result.edit.result === 'Success') return true;
            console.error('[页面评分]编辑失败:', result);
            return false;
        }).catch(error => {
            console.error('[页面评分]API错误:', error);
            return false;
        });
    }
    function renderRating() {
        const upList = getUsers(globalUp[pageKey]);
        const downList = getUsers(globalDown[pageKey]);
        $('.page-header__meta').append(`
            <div class="page-rating">
                评分:
                <span class="rating-up">${upList.length}</span>
                <span class="rating-down">${downList.length}</span>
            </div>
        `);
        updateVoteState();
        $('.page-rating span').on('click', function () {
            if ($('.page-rating').hasClass('busy')) return;
            $('.page-rating').addClass('busy');
            const isUp = $(this).hasClass('rating-up');
            const upList = getUsers(globalUp[pageKey]);
            const downList = getUsers(globalDown[pageKey]);
            const hasUp = upList.includes(username);
            const hasDown = downList.includes(username);
            if (isUp && hasUp) {
                globalUp[pageKey] = upList.filter(user => user !== username);
                if (!globalUp[pageKey].length) globalUp[pageKey] = [];
            } else if (!isUp && hasDown) {
                globalDown[pageKey] = downList.filter(user => user !== username);
                if (!globalDown[pageKey].length) globalDown[pageKey] = [];
            } else if (isUp) {
                globalDown[pageKey] = downList.filter(user => user !== username);
                globalUp[pageKey] = upList.includes(username) ? upList : [...upList, username];
            } else {
                globalUp[pageKey] = upList.filter(user => user !== username);
                globalDown[pageKey] = downList.includes(username) ? downList : [...downList, username];
            }
            saveRatings(`页面评分: 更新“[[${page}]]”的评分`).then(success => {
                $('.page-rating').removeClass('busy');
                if (success) updateVoteState();
            });
        });
    }
    function updateVoteState() {
        const upList = getUsers(globalUp[pageKey]);
        const downList = getUsers(globalDown[pageKey]);
        $('.rating-up').toggleClass('voted', upList.includes(username));
        $('.rating-down').toggleClass('voted', downList.includes(username));
        $('.rating-up').text(upList.length);
        $('.rating-down').text(downList.length);
    }
    function createRating() {
        $('.page-rating-create').addClass('busy');
        globalUp[pageKey] = [];
        globalDown[pageKey] = [];
        saveRatings(`页面评分: 为“[[${page}]]”开启评分`).then(success => {
            if (success) {
                $('.page-rating-create').remove();
                renderRating();
            }
        });
    }
    function checkCreator() {
        return api.get({
            action: 'query',
            format: 'json',
            prop: 'revisions',
            titles: page,
            rvlimit: 1,
            rvdir: 'newer',
            rvprop: 'user'
        }).then(data => {
            const pages = data.query.pages;
            const first = Object.values(pages)[0];
            if (!first || !first.revisions || !first.revisions[0]) return false;
            const creator = first.revisions[0].user;
            return creator === username;
        }).catch(() => false);
    }
    function renderCreateButton() {
        $('.page-header__meta').append(`
            <div class="page-rating-create">
                评分:
                <button>开启评分</button>
            </div>
        `);
        $('.page-rating-create button').on('click', createRating);
    }
    fetch(rawUrl(ratingsPage))
        .then(response => response.ok ? response.json() : {})
        .catch(() => ({}))
        .then(data => {
            globalUp = data.globalUp && typeof data.globalUp === 'object' ? data.globalUp : {};
            globalDown = data.globalDown && typeof data.globalDown === 'object' ? data.globalDown : {};
            if (Object.prototype.hasOwnProperty.call(globalUp, pageKey) || Object.prototype.hasOwnProperty.call(globalDown, pageKey)) {
                if (!globalUp[pageKey]) globalUp[pageKey] = [];
                if (!globalDown[pageKey]) globalDown[pageKey] = [];
                renderRating();
                return;
            }
            if (canCreateByGroup) {
                renderCreateButton();
                return;
            }
            checkCreator().then(isCreator => { if (isCreator) renderCreateButton(); });
        });
});