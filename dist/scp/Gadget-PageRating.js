mw.loader.using(['mediawiki.api'], function() {
	if(mw.config.get('wgNamespaceNumber') == 0 || mw.config.get('wgNamespaceNumber') == 4) {
		$('#p-views').append(`<div id="ratingparent" style="position: absolute;background:#ababab; z-index:3;top:106px;right:40px; height:40px; width:190px; padding:5px; text-align:center; vertical-align:center; color:black; font-size:12px; font-family:Georgia; border-radius:5px;;">
		<big>
		<span style="float:left"><span style="opacity:0">_</span>Rating: <span id="total">0</span></span>
		<span style="float:right"><span id="upvoteparent" style="color:green"></span> || <span id="downvoteparent" style="color:red"></span><span style="opacity:0">_</span></span>
		</big>
		</div>`);
		$('body').append`<style>
		#upvote {background:#8c8c8c !important;color:green !important;border:solid #8c8c8c 1px !important;border-radius:5px !important;cursor:pointer;}
		#downvote {background:#8c8c8c !important;color:red !important;border:solid #8c8c8c 1px !important; border-radius:5px !important;cursor:pointer;}
		[disabled] {cursor:not-allowed !important;}
		#content {margin-top:5%;}
		</style>`;
	}
    function getPageRatingJsonPages(cb, sroffset = 0, allPages = []) {
        let api = new mw.Api();
        let params = {
            action: 'query',
            list: 'search',
            srsearch: 'pageRating.json',
            srnamespace: 2,
            srlimit: 500,
            sroffset: sroffset,
            format: 'json'
        };

        api.get(params).done(function(data) {
            let pages = data.query.search;
            allPages = allPages.concat(pages.map(page => page.title));

            if (data.continue && data.continue.sroffset) {
                getPageRatingJsonPages(cb, data.continue.sroffset, allPages);
            } else {
                cb(allPages);
            }
        }).fail(function() {
            console.error('API call failed to fetch search results.');
            cb([]);
        });
    }

    function fetchUserRatings(username, cb) {
        let userPage = 'User:' + username + '/pageRating.json';
        let api = new mw.Api();
        api.get({
            action: 'query',
            prop: 'revisions',
            titles: userPage,
            rvprop: 'content',
            format: 'json'
        }).done(function(data) {
            let pages = data.query.pages;
            let pageId = Object.keys(pages)[0];
            let pageObj = pages[pageId];
            let exists = !(pageObj.missing);
            let content = '';
            if (pageObj && Array.isArray(pageObj.revisions) && pageObj.revisions.length > 0 && pageObj.revisions[0]['*']) {
                content = pageObj.revisions[0]['*'];
            }
            let isEmpty = content.trim() === '';
            let jsonStart = content.indexOf('{');
            let jsonEnd = content.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                try {
                    let jsonString = content.substring(jsonStart, jsonEnd + 1);
                    cb(JSON.parse(jsonString), exists, isEmpty);
                } catch (e) {
                    console.error('Error parsing user ratings:', e, content);
                    cb(null, exists, isEmpty);
                }
            } else {
                cb(null, exists, isEmpty);
            }
        }).fail(function() {
            cb(null, false, true);
        });
    }

    function fetchPageContent(pageName) {
        let api = new mw.Api();
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: pageName,
            rvprop: 'content',
            format: 'json'
        }).then(function(data) {
            let pages = data.query.pages;
            let pageId = Object.keys(pages)[0];
            return (pages[pageId] && pages[pageId].revisions && pages[pageId].revisions[0]['*']) || '';
        });
    }

    function waitForElement(selector, cb, timeout) {
        timeout = timeout || 3000;
        let start = Date.now();
        (function check() {
            let el = document.querySelector(selector);
            if (el) return cb(el);
            if (Date.now() - start > timeout) return cb(null);
            setTimeout(check, 50);
        })();
    }

    function core() {
        getPageRatingJsonPages(function(pagenames) {
            if (pagenames.length === 0) {
                console.log('No .json files found.');
                return;
            }
            
            let contentPromises = pagenames.map(name => fetchPageContent(name));

            Promise.all(contentPromises).then(function(contents) {
                let Page = mw.config.get('wgPageName');
                let upvotes = 0, downvotes = 0;
                const pageJsonRegex = /{[\s\S]*}/;
                for (const content of contents) {
                    const match = pageJsonRegex.exec(content);
                    if (match) {
                        try {
                            const json = JSON.parse(match[0]);
                            if (Array.isArray(json.upvoted) && json.upvoted.includes(Page)) { upvotes++; }
                            if (Array.isArray(json.downvoted) && json.downvoted.includes(Page)) { downvotes++; }
                        } catch (e) {
                            console.error('Error parsing content:', e, content);
                        }
                    }
                }
                let score = upvotes - downvotes;
                waitForElement('#upvoteparent', function(upvoteParent) {
                    if (!upvoteParent) return;
                    waitForElement('#downvoteparent', function(downvoteParent) {
                        if (!downvoteParent) return;
                        waitForElement('#total', function(totalEl) {
                            if (!totalEl) return;
                            let oldUp = document.querySelector('#upvote');
                            if (oldUp) oldUp.parentNode.removeChild(oldUp);
                            let oldDown = document.querySelector('#downvote');
                            if (oldDown) oldDown.parentNode.removeChild(oldDown);
                            let upVote = document.createElement('button');
                            upVote.setAttribute('voting', '');
                            upVote.id = 'upvote';
                            upVote.innerHTML = '+';
                            let downVote = document.createElement('button');
                            downVote.setAttribute('voting', '');
                            downVote.id = 'downvote';
                            downVote.innerHTML = '-';
                            upvoteParent.appendChild(upVote);
                            downvoteParent.appendChild(downVote);
                            totalEl.innerHTML = score;
                            let username = mw.config.get('wgUserName');
                            let userUpvoted = false;
                            let userDownvoted = false;
                            function onRatingsLoaded(userRatings, exists, isEmpty) {
                                if (!exists || isEmpty) {
                                    const initialContent = {
                                        upvoted: [],
                                        downvoted: []
                                    };
                                    const fileText = JSON.stringify(initialContent, null, 4);
                                    new mw.Api().postWithToken('csrf', {
                                        action: 'edit',
                                        title: 'User:' + username + '/pageRating.json',
                                        text: fileText,
                                        summary: '',
                                        format: 'json'
                                    }).done(function() {
                                        fetchUserRatings(username, onRatingsLoaded);
                                    });
                                    return;
                                }
                                if (userRatings) {
                                    if (Array.isArray(userRatings.upvoted) && userRatings.upvoted.includes(Page)) {
                                        userUpvoted = true;
                                    }
                                    if (Array.isArray(userRatings.downvoted) && userRatings.downvoted.includes(Page)) {
                                        userDownvoted = true;
                                    }
                                }
                                downVote.disabled = userDownvoted;
                                upVote.disabled = userUpvoted;
                                if (!userUpvoted && !userDownvoted) {
                                    upVote.disabled = false;
                                    downVote.disabled = false;
                                }
                                function upvoting(username, pageName) {
                                    fetchUserRatings(username, function(userRatings) {
                                        userRatings = userRatings || { upvoted: [], downvoted: [] };
                                        if (!userRatings.upvoted.includes(pageName)) {
                                            userRatings.upvoted.push(pageName);
                                        }
                                        upVote.disabled = true;
                                        downVote.disabled = false;
                                        userRatings.downvoted = userRatings.downvoted.filter(p => p !== pageName);
                                        const fileText = JSON.stringify(userRatings, null, 4);
                                        new mw.Api().postWithToken('csrf', {
                                            action: 'edit',
                                            title: 'User:' + username + '/pageRating.json',
                                            text: fileText,
                                            summary: 'Upvoted page: ' + pageName,
                                            format: 'json'
                                        }).done(function() {
                                            score += 1;
                                            totalEl.innerHTML = score;
                                            upVote.disabled = true;
                                            downVote.disabled = false;
                                        });
                                    });
                                    setInterval(console.log('interval done'), 5000);
                                }
                                function downvoting(username, pageName) {
                                    fetchUserRatings(username, function(userRatings) {
                                        userRatings = userRatings || { upvoted: [], downvoted: [] };
                                        if (!userRatings.downvoted.includes(pageName)) {
                                            userRatings.downvoted.push(pageName);
                                        }
                                        downVote.disabled = true;
                                        upVote.disabled = false;
                                        userRatings.upvoted = userRatings.upvoted.filter(p => p !== pageName);
                                        const fileText = JSON.stringify(userRatings, null, 4);
                                        new mw.Api().postWithToken('csrf', {
                                            action: 'edit',
                                            title: 'User:' + username + '/pageRating.json',
                                            text: fileText,
                                            summary: 'Downvoted page: ' + pageName,
                                            format: 'json'
                                        }).done(function() {
                                            score -= 1;
                                            totalEl.innerHTML = score;
                                            downVote.disabled = true;
                                            upVote.disabled = false;
                                        });
                                    });
                                    setInterval(console.log('interval done'), 5000);
                                }
                                upVote.addEventListener('click', function() {
                                    upvoting(username, Page);
                                });
                                downVote.addEventListener('click', function() {
                                    downvoting(username, Page);
                                });
                            }
                            if (username) {
                                fetchUserRatings(username, onRatingsLoaded);
                            }
                        });
                    });
                });
            }).catch(function(error) {
                console.error('One of the fetch requests failed:', error);
            });
        });
    }

    core();
    console.log('main-rating.js loaded');
});