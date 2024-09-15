mw.loader.using(['mediawiki.util', 'mediawiki.Title']).then(function () {
	window.dev = window.dev || {};

	var config = mw.config.get([ 'wgPageName', 'wgCanonicalNamespace' ]);
	var title = new mw.Title(config.wgPageName, config.wgCanonicalNamespace);
	var parts = title.getMain().split('/');
	if (title.getNamespaceId() !== -1 || parts[0] !== 'Blame') {
		return;
	}
	window.dev.blame = true;
	
	importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:Blame.css'
    });

	var page = parts[1];

	function htmlDiffToObject(htmlString) {
		var wrapped = '<table class="diff"><tbody>' + htmlString + '</tbody></table>';
		var doc = (new DOMParser()).parseFromString(wrapped, "text/html");
		var table = doc.querySelectorAll('table > tbody > tr');
		var rows = Array.from(table);
		var startLineLeft = 0;
		var startLineRight = 0;
		var lastElementChild = 0;
		var diffs = [];
		for (var i in rows) {
			if (!rows.hasOwnProperty(i)) continue;
			var row = rows[i];
			var diff = {};
			startLineLeft++;
			startLineRight++;
			if (row.firstElementChild.classList.contains('diff-lineno')) {
				startLineLeft = +row.firstElementChild.textContent.match(/[A-Za-z]+ (\d+):/)[1] - 1;
				startLineRight = +row.lastElementChild.textContent.match(/[A-Za-z]+ (\d+):/)[1] - 1;
			}
			var offset = 1;
			if (+row.firstElementChild.colSpan === 2) {
				offset = 0;
			}
			if (row.firstElementChild.classList.contains('diff-marker') && row.firstElementChild.textContent.trim() !== '') {
				diff.left = {
					lineno: startLineLeft,
					type: row.firstElementChild.textContent === '−' ? 'deletion' : 'addition',
					content: row.children[1].firstElementChild.textContent.trim(),
				};
			}
			if (row.children[offset + 1].classList.contains('diff-marker') && row.children[offset + 1].textContent.trim() !== '') {
				diff.right = {
					lineno: startLineRight,
					type: row.children[offset + 1].textContent === '−' ? 'deletion' : 'addition',
				};
				var contentEl = row.children[offset + 2].firstElementChild;
				if (contentEl !== null) {
					diff.right.content = contentEl.textContent.trim();
				}
			}
			if (typeof diff.left !== 'undefined' || typeof diff.right !== 'undefined') {
				diffs.push(diff);
			}
		}
		return diffs;
	}
	
	var avatars = new Map();
	function getUserAvatar(userId) {
		return new Promise(function(resolve, reject) {
			if (avatars.has(userId)) {
				return resolve(avatars.get(userId));
			}
			
			var queryParams = new URLSearchParams({
				controller: 'UserProfile',
				method: 'getUserData',
				format: 'json',
				userId: userId,
			});
			return fetch(mw.util.wikiScript('wikia') + '?' + queryParams.toString()).then(function(res) {
				return res.json();
			}).then(function(json) {
				avatars.set(userId, json.userData.avatar);
				return json.userData.avatar;
			}).then(resolve).catch(reject);
		});
	}

	function renderDiff(content, revs, lines) {
		var tableHeadRow;
		var table = Object.assign(document.createElement('table'), {
			className: 'mw-blame-diff-table',
		});
		var thead = document.createElement('thead');
		thead.append(tableHeadRow = document.createElement('tr'));
		[ '#', 'User', 'Revision', 'Left change type', 'Left content', 'Right change type', 'Right content' ].forEach(function(label) {
			tableHeadRow.append(Object.assign(document.createElement('th'), {
				textContent: label,
			}));
		});
		var tbody = document.createElement('tbody');
		table.append(thead, tbody);
		var userRow, lineNoRow, revRow, leftContentRow, rightContentRow;
		for (var i in content.slice(1)) {
			//var line = lines[i]
    		if (i === 0) continue;
			var row, username, userId;
			tbody.append(row = document.createElement('tr'));
			var foundRev = revs.find(function (rev) {
				if (typeof lines.left[i] !== 'undefined' && rev.torevid === lines.left[i].revId) {
					return true;
				} else if (typeof lines.right[i] !== 'undefined' && rev.torevid === lines.right[i].revId) {
					return true;
				}
				return false;
			});
			if (typeof foundRev !== 'undefined') {
				console.log('foundRev', foundRev);
				username = foundRev.touser;
				userId = foundRev.touserid;
			}
			var lineNoEl = Object.assign(document.createElement('a'), {
				href: '#' + i,
				textContent: '#' + i,
			});
			row.append(lineNoRow = document.createElement('td'));
			lineNoRow.append(lineNoEl);
			row.append(userRow = document.createElement('td'));
			if (typeof username !== 'undefined') {
				console.log('username not undefined', username);
				var userEl = Object.assign(document.createElement('a'), {
					href: mw.util.getUrl('User:' + username),
				});
				userEl.append(document.createTextNode(username));
				getUserAvatar(userId).then(function(userEl, avatarUrl) {
					userEl.prepend(Object.assign(document.createElement('img'), {
						className: 'mw-blame-user-avatar',
						src: avatarUrl,
					}));
				}.bind(this, userEl));
				userRow.append(userEl);
			}
			var rowRevId;
			if (typeof lines.left[i] !== 'undefined' && typeof lines.left[i].revId !== 'undefined') {
				rowRevId = lines.left[i].revId;
			} else if (typeof lines.right[i] !== 'undefined' && typeof lines.right[i].revId !== 'undefined') {
				rowRevId = lines.right[i].revId;
			}
			console.log('rowRevId', rowRevId, lines.left[i], lines.right[i]);
			row.append(revRow = document.createElement('td'));
			if (typeof rowRevId !== 'undefined') {
				var revEl = Object.assign(document.createElement('a'), {
					textContent: rowRevId,
					href: mw.util.getUrl('Special:Diff/' + rowRevId),
				});
				revRow.append(revEl);
			}
			var leftType, rightType, leftContent, rightContent;
			if (typeof lines.left[i] !== 'undefined') {
				if (typeof lines.left[i].left !== 'undefined') {
					leftType = lines.left[i].left.type;
					leftContent = lines.left[i].left.content;
				} else {
					leftType = lines.left[i].type;
					leftContent = lines.left[i].content;
				}
			}
			if (typeof lines.right[i] !== 'undefined') {
				if (typeof lines.right[i].right !== 'undefined') {
					rightType = lines.right[i].right.type;
					rightContent = lines.right[i].right.content;
				} else {
					rightType = lines.right[i].type;
					rightContent = lines.right[i].content;
				}
			}
			var leftBorder, rightBorder;
			if (leftType === 'addition') {
				leftBorder = '3px solid #D70022';
			} else if (leftType === 'deletion') {
				leftBorder = '3px solid #12BC00';
			}
			if (rightType === 'addition') {
				rightBorder = '3px solid #D70022';
			} else if (rightType === 'deletion') {
				rightBorder = '3px solid #12BC00';
			}
			console.log('blame knows no borders', leftBorder, rightBorder);
			if ((leftType === 'addition' && rightType === 'deletion') || (leftType === 'deletion' && rightType === 'addition')) {
				leftType += ' (modification)';
				rightType += ' (modification)';
			}
			row.append(Object.assign(document.createElement('td'), {
				textContent: leftType,
			}));
			var leftContentEl = Object.assign(document.createElement('pre'), {
				textContent: leftContent,
			});
			leftContentEl.style.border = leftBorder;
			row.append(leftContentRow = document.createElement('td'));
			leftContentRow.append(leftContentEl);
			row.append(Object.assign(document.createElement('td'), {
				textContent: rightType,
			}));
			var rightContentEl = Object.assign(document.createElement('pre'), {
				textContent: rightContent,
			});
			rightContentEl.style.border = rightBorder;
			row.append(rightContentRow = document.createElement('td'));
			rightContentRow.append(rightContentEl);
		}
		document.querySelector('.page-header__title').textContent = document.title = 'Blame of page "' + page + '"';
		mw.util.addPortletLink(
		  'p-associated-pages',
		  mw.util.getUrl(page),
		  '← Return to page',
		  'ca-nstab-main',
		  page,
		  'c'
		);
		mw.util.$content.get(0).replaceChildren(table);
	}

	var revId = null;
	var firstRevId;
	var revs = [];
	var lines = {
		left: {},
		right: {}
	};

	function getRevisions(page, revId) {
		var props = ['diff', 'ids', 'user'];
		var urlParams = new URLSearchParams({
			action: 'compare',
			fromtitle: page,
			totitle: page,
			torelative: 'prev',
			prop: props.join('|'),
			format: 'json',
		});
		if (revId !== null) {
			urlParams.append('fromrev', revId);
		}
		var url = mw.util.wikiScript('api') + '?' + urlParams.toString();
		return new Promise(function (resolve, reject) {
			return fetch(url).then(function (res) {
				return res.json();
			}).then(function (json) {
				return json.compare;
			}).then(resolve)
			.catch(reject);
		});
	}
	/*var fn = function (page, revId, resolve) {
			return getRevisions(page, revId).then(function (rev) {
				if (revId === null) {
					firstRevId = rev.torevid;
				}
				revId = rev.fromrevid;
				diffs = htmlDiffToObject(rev['*']);
				for (var i in diffs) {
					var diff = diffs[i];
					if (typeof diff.left !== 'undefined' && typeof lines.left[diff.left.lineno] === 'undefined') {
						lines.left[diff.left.lineno] = diff;
						lines.left[diff.left.lineno].revId = rev.torevid;
					}
					if (typeof diff.right !== 'undefined' && typeof lines.right[diff.right.lineno] === 'undefined') {
						lines.right[diff.right.lineno] = diff;
						lines.right[diff.right.lineno].revId = rev.torevid;
					}
				}
				revs.push(rev);

				if (typeof rev.fromrevid !== 'undefined') {
					return fn(page, revId, resolve);
				} else {
					return resolve(lines);
				}
			});
		}
		(new Promise(function (resolve, reject) {
			return fn(page, revId, resolve);
		})).then(function (lines) {
			//console.log('lines 3', lines)
		});*//*
		var promises = [];
		
		do {
		  var promise = new Promise(function(resolve, reject) {
		  	getRevisions(page, revId).then(function(rev) {
			    if (revId === null) {us
			      firstRevId = rev.torevid;
			    }
			    revId = rev.fromrevid;
			    diffs = htmlDiffToObject(rev['*']);
			    for (var i in diffs) {
			      var diff = diffs[i];
			      if (typeof diff.left !== 'undefined' && typeof lines.left[diff.left.lineno] === 'undefined') {
			        lines.left[diff.left.lineno] = diff;
			        lines.left[diff.left.lineno].revId = rev.torevid;
			      }
			      if (typeof diff.right !== 'undefined' && typeof lines.right[diff.right.lineno] === 'undefined') {
			        lines.right[diff.right.lineno] = diff;
			        lines.right[diff.right.lineno].revId = rev.torevid;
			      }
			    }
			    revs.push(rev);
			  	resolve(rev, diffs);
		  	});
		  });*/
		  /*promise.then(function(entry, orig) {
		    return 'a'
		  });*//*
		  promises.push(promise);
		} while(typeof rev.fromrevid !== 'undefined');
		
		Promise.all(promises).then((p, q) => console.log('all done', p, q))*/
		
		function asyncDoWhile(loopFn, conditionFn, initialValue) {
		  var i = 0;
		  console.log('start do');
		  return new Promise(function(resolveAll, rejectAll) {
		    console.log('start outer promise');
		    var promiseFn = function(i, resolve, reject) {
		      console.log('start inner promise');
		      return loopFn(resolve, initialValue, i).then(function(returnValue) {
		        console.log('loopFn.then', returnValue);
		        if (conditionFn(returnValue)) {
		          console.log('rec');
		          promiseFn(i + 1, resolve, reject);
		        } else {
		          console.log('done');
		          return resolveAll(initialValue);
		        }
		      });
		    };
		    return new Promise(promiseFn.bind(this, i));
		  });
		}
		
		asyncDoWhile(function(resolve, revs, i) {
		  console.log('custom loop fn', revs, i);
		  return new Promise(function(res, rej) {
		  	getRevisions(page, revId).then(function(rev) {
			    if (revId === null) {
			      firstRevId = rev.torevid;
			    }
			    revId = rev.fromrevid;
			    diffs = htmlDiffToObject(rev['*']);
			    for (var i in diffs) {
			      var diff = diffs[i];
			      if (typeof diff.left !== 'undefined' && typeof lines.left[diff.left.lineno] === 'undefined') {
			        lines.left[diff.left.lineno] = diff;
			        lines.left[diff.left.lineno].revId = rev.torevid;
			      }
			      if (typeof diff.right !== 'undefined' && typeof lines.right[diff.right.lineno] === 'undefined') {
			        lines.right[diff.right.lineno] = diff;
			        lines.right[diff.right.lineno].revId = rev.torevid;
			      }
			    }
			    revs.push(rev);
        		resolve(rev, diffs);
			  	res(rev, diffs);
		  	});
		  	/*res(setTimeout(function() {
			    returnValue = Math.random() * 10;
			    initialValue.push(returnValue);
			    return resolve(returnValue);
			  }, Math.random() * 10));*/
		  });
		}, function(rev) {
			return typeof rev.fromrevid !== 'undefined';
		}, []).then(function(revs) {
			console.log('all done', revs);
			
			var searchParams = new URLSearchParams({
				action: 'query',
				prop: 'revisions',
				titles: page,
				rvlimit: 1,
				rvslots: 'main',
				formatversion: 2,
				rvprop: 'content',
				format: 'json',
			});
			fetch(mw.util.wikiScript('api') + '?' + searchParams.toString()).then(function (res) {
				return res.json();
			}).then(function (json) {
				var content = json.query.pages[0].revisions[0].slots.main.content.split(/\n/);
		
				for (var i in content) {
					var line = content[i];
					if (typeof lines.left[+i + 1] === 'undefined') {
						lines.left[+i + 1] = {
							type: 'unchanged',
							content: line
						};
					}
					if (typeof lines.right[+i + 1] === 'undefined') {
						lines.right[+i + 1] = {
							type: 'unchanged',
							content: line
						};
					}
				}
		
				renderDiff(content, revs, lines);
			});
		});
});