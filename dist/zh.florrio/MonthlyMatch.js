/* ===== 二创月赛投票区 - 标题 + 投票系统 ===== */
(function () {
    'use strict';

    if (mw.config.get('wgPageName') !== '二/2026.7二创月赛') return;

    var DATA_PAGE = '二/2026.7二创月赛/投票数据';
    var userName = mw.config.get('wgUserName') || '';
    var isLoggedIn = !mw.user.isAnon();
    var api = new mw.Api();

    // ========== 投票开放日期：2026年7月20日 00:00 ==========
    var VOTE_OPEN_DATE = new Date('2026-07-20T00:00:00');
    var now = new Date();
    var votingOpen = now >= VOTE_OPEN_DATE;

    // ========== 每人最多票数 ==========
    var MAX_VOTES = 2;

    mw.hook('wikipage.content').add(function ($content) {
        var contentArea = document.querySelector('.mw-parser-output');
        if (!contentArea) return;

        contentArea.innerHTML = '';

        // ========== 1. 渲染标题 ==========
        var wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'center';
        wrapper.style.padding = '40px 0 20px 0';

        var heading = document.createElement('h1');
        heading.textContent = '2026.7二创月赛投票区';
        heading.style.fontSize = '48px';
        heading.style.fontWeight = 'bold';
        heading.style.textAlign = 'center';
        heading.style.margin = '0';
        heading.style.background = 'linear-gradient(135deg, #ff2400, #ff7b00, #ffe600, #00e676, #2979ff, #d500f9)';
        heading.style.WebkitBackgroundClip = 'text';
        heading.style.WebkitTextFillColor = 'transparent';
        heading.style.backgroundClip = 'text';
        heading.style.color = 'transparent';

        wrapper.appendChild(heading);
        contentArea.appendChild(wrapper);

        // ========== 2. 投票容器 ==========
        var voteContainer = document.createElement('div');
        voteContainer.id = 'vote-system-container';
        voteContainer.style.maxWidth = '700px';
        voteContainer.style.margin = '0 auto';
        voteContainer.style.padding = '20px';
        contentArea.appendChild(voteContainer);

        voteContainer.innerHTML = '<p style="text-align:center;color:#888;">加载投票数据中...</p>';

        loadVoteData(function (data) {
            renderVoteSystem(voteContainer, data);
        });
    });

    function loadVoteData(callback) {
    api.get({
        action: 'query',
        prop: 'revisions',
        rvprop: 'content|timestamp',
        titles: DATA_PAGE,
        format: 'json'
    }).then(function (response) {
        var pages = response.query.pages;
        var pageId = Object.keys(pages)[0];   // ← 已加 [0]

        if (parseInt(pageId) < 0 || !pages[pageId].revisions) {
            callback({ data: { polls: [], userVotes: {} }, timestamp: null });
            return;
        }

        var revision = pages[pageId].revisions[0];  // ← 已加 [0]
        var content = revision['*'] || '{}';
        var timestamp = revision.timestamp;
        var data;

        try {
            data = JSON.parse(content);
        } catch (e) {
            data = { polls: [], userVotes: {} };
        }

        if (!data.polls) data.polls = [];
        if (!data.userVotes) data.userVotes = {};

        callback({ data: data, timestamp: timestamp });
    }).fail(function () {
        callback({ data: { polls: [], userVotes: {} }, timestamp: null });
    });
}

    function saveVoteData(data, basetimestamp, summary, callback) {
        var params = {
            action: 'edit',
            title: DATA_PAGE,
            text: JSON.stringify(data, null, 2),
            summary: summary,
            format: 'json'
        };

        if (basetimestamp) {
            params.basetimestamp = basetimestamp;
        }

        api.postWithEditToken(params).then(function (response) {
            if (response.edit && response.edit.result === 'Success') {
                callback({ success: true, newTimestamp: response.edit.newtimestamp });
            } else {
                callback({ success: false, error: '编辑失败' });
            }
        }).fail(function (errorCode, error) {
            if (errorCode === 'editconflict') {
                callback({ success: false, error: 'conflict' });
            } else {
                callback({ success: false, error: errorCode });
            }
        });
    }

    function renderVoteSystem(container, voteState) {
        var data = voteState.data;
        var timestamp = voteState.timestamp;
        var polls = data.polls;
        var userVotes = data.userVotes;

        // 用户已投的票数（数组）
        var myVotes = userVotes[userName] || [];
        var myVoteCount = myVotes.length;
        var remainingVotes = MAX_VOTES - myVoteCount;

        container.innerHTML = '';

        // ========== 投票未开放提示 ==========
        if (!votingOpen) {
            var noticeBanner = document.createElement('div');
            noticeBanner.style.cssText = 'text-align:center;padding:16px 20px;background:#fff7e6;border:2px solid #ffc53d;border-radius:10px;margin-bottom:20px;';
            noticeBanner.innerHTML = '<span style="font-size:18px;">⏳</span> <strong style="color:#d48806;font-size:15px;">投票将于7月20日开放</strong><br><span style="color:#8c6d1f;font-size:13px;">当前阶段仅支持创建投票项，暂不能投票</span>';
            container.appendChild(noticeBanner);
        }

        if (!isLoggedIn) {
            var loginTip = document.createElement('div');
            loginTip.style.cssText = 'text-align:center;padding:30px;background:#fff3cd;border-radius:8px;margin-bottom:20px;';
            loginTip.innerHTML = '<p style="font-size:16px;color:#856404;margin:0;">请先<a href="/zh/wiki/Special:UserLogin" style="color:#d4380d;font-weight:bold;">登录</a>后再参与投票</p>';
            container.appendChild(loginTip);
        }

        // ========== 剩余票数提示 ==========
        if (isLoggedIn && votingOpen) {
            var voteInfo = document.createElement('div');
            voteInfo.style.cssText = 'text-align:center;padding:12px 20px;background:#e6f7ff;border:1px solid #91d5ff;border-radius:8px;margin-bottom:20px;';
            voteInfo.innerHTML = '<span style="font-size:15px;">🎫 您共有 <strong style="color:#1890ff;font-size:18px;">' + MAX_VOTES + '</strong> 票，剩余 <strong style="color:#f5222d;font-size:18px;">' + remainingVotes + '</strong> 票</span>';
            container.appendChild(voteInfo);
        }

        if (isLoggedIn) {
            var createSection = document.createElement('div');
            createSection.style.cssText = 'background:#f0f5ff;border:1px solid #adc6ff;border-radius:10px;padding:20px;margin-bottom:24px;';

            var createTitle = document.createElement('h3');
            createTitle.textContent = '创建新投票项';
            createTitle.style.cssText = 'margin:0 0 12px 0;font-size:18px;color:#1d39c4;';

            var inputRow = document.createElement('div');
            inputRow.style.cssText = 'display:flex;gap:10px;';

            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = '输入投票项名称...';
            input.id = 'new-poll-input';
            input.style.cssText = 'flex:1;padding:10px 14px;border:1px solid #d9d9d9;border-radius:6px;font-size:14px;outline:none;';
            input.maxLength = 100;

            var createBtn = document.createElement('button');
            createBtn.textContent = '创建';
            createBtn.style.cssText = 'padding:10px 24px;background:#1d39c4;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;font-weight:bold;';
            createBtn.onmouseover = function () { this.style.background = '#122b8c'; };
            createBtn.onmouseout = function () { this.style.background = '#1d39c4'; };

            createBtn.onclick = function () {
                var title = input.value.trim();
                if (!title) {
                    alert('请输入投票项名称');
                    return;
                }
                if (title.length > 100) {
                    alert('投票项名称不能超过100个字符');
                    return;
                }
                createBtn.disabled = true;
                createBtn.textContent = '创建中...';

                var newPoll = {
                    id: 'poll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                    title: title,
                    creator: userName,
                    createdAt: new Date().toISOString().slice(0, 10),
                    voteCount: 0
                };

                data.polls.push(newPoll);

                saveVoteData(data, timestamp, '创建投票项：' + title, function (result) {
                    if (result.success) {
                        input.value = '';
                        voteState.timestamp = result.newTimestamp;
                        renderVoteSystem(container, voteState);
                    } else {
                        data.polls.pop();
                        alert('创建失败：' + (result.error || '未知错误'));
                        createBtn.disabled = false;
                        createBtn.textContent = '创建';
                    }
                });
            };

            inputRow.appendChild(input);
            inputRow.appendChild(createBtn);
            createSection.appendChild(createTitle);
            createSection.appendChild(inputRow);
            container.appendChild(createSection);
        }

        if (polls.length === 0) {
            var emptyMsg = document.createElement('p');
            emptyMsg.textContent = '暂无投票项，快来创建第一个吧！';
            emptyMsg.style.cssText = 'text-align:center;color:#999;padding:40px 0;font-size:15px;';
            container.appendChild(emptyMsg);
        } else {
            var sortedPolls = polls.slice().sort(function (a, b) {
                return b.voteCount - a.voteCount;
            });

            var listContainer = document.createElement('div');
            listContainer.style.cssText = 'display:flex;flex-direction:column;gap:12px;';

            for (var i = 0; i < sortedPolls.length; i++) {
                var poll = sortedPolls[i];
                var card = createPollCard(poll, i + 1, myVotes, remainingVotes, voteState, container);
                listContainer.appendChild(card);
            }

            container.appendChild(listContainer);
        }

        var stats = document.createElement('p');
        var totalVotes = 0;
        for (var j = 0; j < polls.length; j++) {
            totalVotes += polls[j].voteCount;
        }
        stats.textContent = '共 ' + polls.length + ' 个投票项 | ' + totalVotes + ' 人已投票';
        stats.style.cssText = 'text-align:center;color:#888;font-size:13px;margin-top:24px;';
        container.appendChild(stats);
    }

    function createPollCard(poll, rank, myVotes, remainingVotes, voteState, container) {
        // 该用户对此项投了几票
        var myVotesForThis = 0;
        for (var v = 0; v < myVotes.length; v++) {
            if (myVotes[v] === poll.id) {
                myVotesForThis++;
            }
        }

        var canVote = isLoggedIn && remainingVotes > 0 && votingOpen;

        var card = document.createElement('div');
        card.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:#fff;border:1px solid #e8e8e8;border-radius:10px;transition:box-shadow 0.2s;';
        if (myVotesForThis > 0) {
            card.style.borderColor = '#52c41a';
            card.style.background = '#f6ffed';
        }
        card.onmouseover = function () { this.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; };
        card.onmouseout = function () { this.style.boxShadow = 'none'; };

        var left = document.createElement('div');
        left.style.cssText = 'display:flex;align-items:center;gap:16px;flex:1;min-width:0;';

        var rankBadge = document.createElement('span');
        rankBadge.textContent = rank;
        rankBadge.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;font-weight:bold;font-size:14px;flex-shrink:0;';
        if (rank === 1) {
            rankBadge.style.background = '#fff1b8';
            rankBadge.style.color = '#d48806';
        } else if (rank === 2) {
            rankBadge.style.background = '#f0f0f0';
            rankBadge.style.color = '#8c8c8c';
        } else if (rank === 3) {
            rankBadge.style.background = '#fff2e8';
            rankBadge.style.color = '#d46b08';
        } else {
            rankBadge.style.background = '#fafafa';
            rankBadge.style.color = '#bfbfbf';
        }

        var info = document.createElement('div');
        info.style.minWidth = '0';

        var titleEl = document.createElement('div');
        titleEl.textContent = poll.title;
        titleEl.style.cssText = 'font-size:16px;font-weight:bold;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';

        var meta = document.createElement('div');
        meta.textContent = '由 ' + poll.creator + ' 创建';
        meta.style.cssText = 'font-size:12px;color:#999;margin-top:4px;';

        // 如果用户对此项投了多票，显示提示
        if (myVotesForThis > 0) {
            var myVoteInfo = document.createElement('span');
            myVoteInfo.textContent = '（你投了 ' + myVotesForThis + ' 票）';
            myVoteInfo.style.cssText = 'font-size:12px;color:#52c41a;margin-left:4px;';
            meta.appendChild(myVoteInfo);
        }

        info.appendChild(titleEl);
        info.appendChild(meta);
        left.appendChild(rankBadge);
        left.appendChild(info);

        // ========== 右侧：醒目的票数 + 操作按钮 ==========
        var right = document.createElement('div');
        right.style.cssText = 'display:flex;align-items:center;gap:16px;flex-shrink:0;';

        // 票数显示（醒目大号）
        var voteCountEl = document.createElement('div');
        voteCountEl.style.cssText = 'text-align:center;min-width:50px;';

        var voteNum = document.createElement('div');
        voteNum.textContent = poll.voteCount || 0;
        voteNum.style.cssText = 'font-size:28px;font-weight:900;color:#d4380d;line-height:1.2;';

        var voteLabel = document.createElement('div');
        voteLabel.textContent = '票';
        voteLabel.style.cssText = 'font-size:12px;color:#999;margin-top:2px;';

        voteCountEl.appendChild(voteNum);
        voteCountEl.appendChild(voteLabel);

        // 操作按钮
        var actionEl = document.createElement('div');
        actionEl.style.flexShrink = '0';

        if (canVote) {
            var voteBtn = document.createElement('button');
            voteBtn.textContent = '投票（剩' + remainingVotes + '票）';
            voteBtn.style.cssText = 'padding:8px 20px;background:#d4380d;color:#fff;border:none;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;';
            voteBtn.onmouseover = function () { this.style.background = '#a82d0a'; };
            voteBtn.onmouseout = function () { this.style.background = '#d4380d'; };

            voteBtn.onclick = function () {
                voteBtn.disabled = true;
                voteBtn.textContent = '投票中...';

                loadVoteData(function (fresh) {
                    var freshData = fresh.data;
                    var freshTimestamp = fresh.timestamp;

                    // 重新计算剩余票数
                    var freshMyVotes = freshData.userVotes[userName] || [];
                    if (freshMyVotes.length >= MAX_VOTES) {
                        alert('您的 ' + MAX_VOTES + ' 票已用完！');
                        renderVoteSystem(container, fresh);
                        return;
                    }

                    var targetPoll = null;
                    for (var k = 0; k < freshData.polls.length; k++) {
                        if (freshData.polls[k].id === poll.id) {
                            targetPoll = freshData.polls[k];
                            break;
                        }
                    }

                    if (!targetPoll) {
                        alert('该投票项已被删除');
                        renderVoteSystem(container, fresh);
                        return;
                    }

                    // 添加投票记录
                    if (!freshData.userVotes[userName]) {
                        freshData.userVotes[userName] = [];
                    }
                    freshData.userVotes[userName].push(poll.id);
                    targetPoll.voteCount = (targetPoll.voteCount || 0) + 1;

                    saveVoteData(freshData, freshTimestamp, '投票：' + userName + ' 投给 ' + poll.title, function (result) {
                        if (result.success) {
                            voteState.data = freshData;
                            voteState.timestamp = result.newTimestamp;
                            renderVoteSystem(container, voteState);
                        } else {
                            alert('投票失败：' + (result.error || '未知错误，请稍后重试'));
                            voteBtn.disabled = false;
                            voteBtn.textContent = '投票（剩' + remainingVotes + '票）';
                        }
                    });
                });
            };

            actionEl.appendChild(voteBtn);
        } else if (!isLoggedIn) {
            var loginLink = document.createElement('a');
            loginLink.href = '/zh/wiki/Special:UserLogin';
            loginLink.textContent = '登录后投票';
            loginLink.style.cssText = 'display:inline-block;padding:8px 16px;background:#f0f0f0;color:#666;border-radius:20px;font-size:13px;text-decoration:none;';
            actionEl.appendChild(loginLink);
        } else if (!votingOpen) {
            var waitBadge = document.createElement('span');
            waitBadge.textContent = '7.20开放投票';
            waitBadge.style.cssText = 'display:inline-block;padding:6px 16px;background:#fff7e6;color:#d48806;border:1px solid #ffc53d;border-radius:20px;font-size:13px;font-weight:bold;cursor:default;';
            actionEl.appendChild(waitBadge);
        } else if (remainingVotes <= 0) {
            var usedUpBadge = document.createElement('span');
            usedUpBadge.textContent = '票已用完';
            usedUpBadge.style.cssText = 'display:inline-block;padding:6px 16px;background:#f5f5f5;color:#bbb;border-radius:20px;font-size:13px;cursor:not-allowed;';
            actionEl.appendChild(usedUpBadge);
        }

        right.appendChild(voteCountEl);
        right.appendChild(actionEl);
        card.appendChild(left);
        card.appendChild(right);
        return card;
    }

})();