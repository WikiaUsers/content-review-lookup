/* ===== 二创月赛投票区 - 标题 + 投票系统 (深度安全修复版) ===== */

(function () {
    'use strict';
	
    // 修复1：只注册一次 Hook，避免多次执行导致页面卡死
    mw.hook('wikipage.content').add(function ($content) {
        if (mw.config.get('wgPageName') !== '二/2026.7二创月赛') return;

        var DATA_PAGE = '二/2026.7二创月赛/投票数据';
        var userName = mw.config.get('wgUserName') || '';
        var isLoggedIn = !mw.user.isAnon();
        var api = new mw.Api();

        var VOTE_OPEN_DATE = new Date('2026-07-20T00:00:00');
        var now = new Date();
        var votingOpen = now >= VOTE_OPEN_DATE;

        var MAX_VOTES = 2;

        var contentArea = document.querySelector('.mw-parser-output');
        if (!contentArea) return;

        // 修复2：防止 Hook 重复触发导致重复渲染
        if (document.getElementById('vote-system-container')) return;

        contentArea.innerHTML = '';

        // ========== 1. 渲染标题 ==========
        var wrapper = document.createElement('div');
        wrapper.style.cssText = 'display:flex;justify-content:center;align-items:center;padding:40px 0 20px 0;';

        var heading = document.createElement('h1');
        heading.textContent = '2026.7二创月赛投票区';
        heading.style.cssText = 'font-size:48px;font-weight:bold;text-align:center;margin:0;background:linear-gradient(135deg, #ff2400, #ff7b00, #ffe600, #00e676, #2979ff, #d500f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;';

        wrapper.appendChild(heading);
        contentArea.appendChild(wrapper);

        // ========== 2. 投票容器 ==========
        var voteContainer = document.createElement('div');
        voteContainer.id = 'vote-system-container';
        voteContainer.style.cssText = 'max-width:700px;margin:0 auto;padding:20px;';
        contentArea.appendChild(voteContainer);

        voteContainer.innerHTML = '加载投票数据中...';

        loadVoteData(function (data) {
            renderVoteSystem(voteContainer, data);
        });

        // 修复3：安全转义函数，防止 XSS 和 JSON 注入
        function escapeHtml(str) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }

        function loadVoteData(callback) {
            api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content|timestamp',
                titles: DATA_PAGE,
                format: 'json'
            }).then(function (response) {
                var pages = response.query && response.query.pages;
                if (!pages) {
                    callback({ data: { polls: [], userVotes: {} }, timestamp: null });
                    return;
                }

                var pageId = Object.keys(pages)[0];

                // 修复4：健壮性校验，防止 API 返回异常数据导致白屏
                if (parseInt(pageId) < 0 || !pages[pageId].revisions || !pages[pageId].revisions.length) {
                    callback({ data: { polls: [], userVotes: {} }, timestamp: null });
                    return;
                }

                var revision = pages[pageId].revisions[0];
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
                text: JSON.stringify(data, null, 2), // 使用 stringify 彻底杜绝 JSON 结构破坏
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
            }).fail(function (errorCode) {
                if (errorCode === 'editconflict') {
                    callback({ success: false, error: 'conflict' });
                } else {
                    callback({ success: false, error: errorCode });
                }
            });
        }

        function renderVoteSystem(container, voteState) {
            var data = voteState.data;
            var polls = data.polls;
            var userVotes = data.userVotes;

            var myVotes = userVotes[userName] || [];
            var myVoteCount = myVotes.length;
            var remainingVotes = MAX_VOTES - myVoteCount;

            container.innerHTML = '';

            if (!votingOpen) {
                var noticeBanner = document.createElement('div');
                noticeBanner.style.cssText = 'text-align:center;padding:16px 20px;background:#fff7e6;border:2px solid #ffc53d;border-radius:10px;margin-bottom:20px;';
                noticeBanner.textContent = '⏳ 投票将于7月20日开放，当前阶段仅支持创建投票项，暂不能投票';
                container.appendChild(noticeBanner);
            }

            if (!isLoggedIn) {
                var loginTip = document.createElement('div');
                loginTip.style.cssText = 'text-align:center;padding:30px;background:#fff3cd;border-radius:8px;margin-bottom:20px;';
                loginTip.textContent = '请先登录后再参与投票';
                container.appendChild(loginTip);
            }

            if (isLoggedIn && votingOpen) {
                var voteInfo = document.createElement('div');
                voteInfo.style.cssText = 'text-align:center;padding:12px 20px;background:#e6f7ff;border:1px solid #91d5ff;border-radius:8px;margin-bottom:20px;';
                voteInfo.textContent = '🎫 您共有 ' + MAX_VOTES + ' 票，剩余 ' + remainingVotes + ' 票';
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
                createBtn.style.cssText = 'padding:10px 24px;background:#1d39c4;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;font-weight:bold;transition:background 0.2s;';
                createBtn.onmouseover = function () { this.style.background = '#122b8c'; };
                createBtn.onmouseout = function () { this.style.background = '#1d39c4'; };

                createBtn.onclick = function () {
                    var rawTitle = input.value.trim();
                    if (!rawTitle) {
                        alert('请输入投票项名称');
                        return;
                    }
                    
                    // 修复5：拦截包含 <script 等危险标签的输入，防止 XSS
                    if (/<script[\s>]/i.test(rawTitle)) {
                        alert('输入内容包含不允许的标签');
                        return;
                    }

                    var title = escapeHtml(rawTitle); // 安全转义
                    
                    createBtn.disabled = true;
                    createBtn.textContent = '创建中...';
                    createBtn.onmouseover = null;
                    createBtn.onmouseout = null;

                    // 修复6：创建前先拉取最新数据，防止覆盖他人创建的投票项
                    loadVoteData(function (fresh) {
                        var freshData = fresh.data;
                        var freshTimestamp = fresh.timestamp;

                        var newPoll = {
                            id: 'poll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                            title: title,
                            creator: userName,
                            createdAt: new Date().toISOString().slice(0, 10),
                            voteCount: 0
                        };

                        freshData.polls.push(newPoll);

                        saveVoteData(freshData, freshTimestamp, '创建投票项：' + title, function (result) {
                            if (result.success) {
                                input.value = '';
                                voteState.data = freshData;
                                voteState.timestamp = result.newTimestamp;
                                renderVoteSystem(container, voteState);
                            } else {
                                alert('创建失败：' + (result.error === 'conflict' ? '遇到编辑冲突，请重试' : (result.error || '未知错误')));
                                createBtn.disabled = false;
                                createBtn.textContent = '创建';
                                createBtn.onmouseover = function () { this.style.background = '#122b8c'; };
                                createBtn.onmouseout = function () { this.style.background = '#1d39c4'; };
                            }
                        });
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
                totalVotes += (polls[j].voteCount || 0);
            }
            stats.textContent = '共 ' + polls.length + ' 个投票项 | ' + totalVotes + ' 人已投票';
            stats.style.cssText = 'text-align:center;color:#888;font-size:13px;margin-top:24px;';
            container.appendChild(stats);
        }

        function createPollCard(poll, rank, myVotes, remainingVotes, voteState, container) {
            var myVotesForThis = 0;
            for (var v = 0; v < myVotes.length; v++) {
                if (myVotes[v] === poll.id) {
                    myVotesForThis++;
                }
            }

            var canVote = isLoggedIn && remainingVotes > 0 && votingOpen;
            var alreadyVotedThis = myVotesForThis > 0;

            var card = document.createElement('div');
            card.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:#fff;border:1px solid #e8e8e8;border-radius:10px;transition:box-shadow 0.2s;';
            if (alreadyVotedThis) {
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
                rankBadge.style.cssText += 'background:#fff1b8;color:#d48806;';
            } else if (rank === 2) {
                rankBadge.style.cssText += 'background:#f0f0f0;color:#8c8c8c;';
            } else if (rank === 3) {
                rankBadge.style.cssText += 'background:#fff2e8;color:#d46b08;';
            } else {
                rankBadge.style.cssText += 'background:#fafafa;color:#bfbfbf;';
            }

            var info = document.createElement('div');
            info.style.minWidth = '0';

            var titleEl = document.createElement('div');
            titleEl.textContent = poll.title; // textContent 天生防 XSS，配合输入时的转义双保险
            titleEl.style.cssText = 'font-size:16px;font-weight:bold;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';

            var meta = document.createElement('div');
            meta.textContent = '由 ' + poll.creator + ' 创建';
            meta.style.cssText = 'font-size:12px;color:#999;margin-top:4px;';

            if (alreadyVotedThis) {
                var myVoteInfo = document.createElement('span');
                myVoteInfo.textContent = '（你已投过）';
                myVoteInfo.style.cssText = 'font-size:12px;color:#52c41a;margin-left:4px;';
                meta.appendChild(myVoteInfo);
            }

            info.appendChild(titleEl);
            info.appendChild(meta);
            left.appendChild(rankBadge);
            left.appendChild(info);

            var right = document.createElement('div');
            right.style.cssText = 'display:flex;align-items:center;gap:16px;flex-shrink:0;';

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

            var actionEl = document.createElement('div');
            actionEl.style.flexShrink = '0';

            if (canVote && !alreadyVotedThis) {
                var voteBtn = document.createElement('button');
                voteBtn.textContent = '投票（剩' + remainingVotes + '票）';
                voteBtn.style.cssText = 'padding:8px 20px;background:#d4380d;color:#fff;border:none;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;transition:background 0.2s;';
                voteBtn.onmouseover = function () { this.style.background = '#a82d0a'; };
                voteBtn.onmouseout = function () { this.style.background = '#d4380d'; };

                voteBtn.onclick = function () {
                    // 修复7：点击后立即禁用按钮并移除交互，防止连击导致重复投票
                    voteBtn.disabled = true;
                    voteBtn.textContent = '投票中...';
                    voteBtn.onmouseover = null;
                    voteBtn.onmouseout = null;

                    loadVoteData(function (fresh) {
                        var freshData = fresh.data;
                        var freshTimestamp = fresh.timestamp;

                        var freshMyVotes = freshData.userVotes[userName] || [];
                        
                        // 修复8：增加对同一选项重复投票的拦截
                        if (freshMyVotes.indexOf(poll.id) !== -1) {
                            alert('您已经投过该选项了！');
                            renderVoteSystem(container, fresh);
                            return;
                        }

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
                                alert('投票失败：' + (result.error === 'conflict' ? '遇到编辑冲突，请重试' : (result.error || '未知错误')));
                                voteBtn.disabled = false;
                                voteBtn.textContent = '投票（剩' + remainingVotes + '票）';
                                voteBtn.onmouseover = function () { this.style.background = '#a82d0a'; };
                                voteBtn.onmouseout = function () { this.style.background = '#d4380d'; };
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
            } else if (alreadyVotedThis) {
                var votedBadge = document.createElement('span');
                votedBadge.textContent = '已投票';
                votedBadge.style.cssText = 'display:inline-block;padding:6px 16px;background:#f6ffed;color:#52c41a;border:1px solid #b7eb8f;border-radius:20px;font-size:13px;font-weight:bold;cursor:default;';
                actionEl.appendChild(votedBadge);
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
    });
})();