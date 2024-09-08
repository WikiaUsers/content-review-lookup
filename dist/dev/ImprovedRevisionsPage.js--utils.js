/**
 * @param {string} page
 * @param {number} revId
 */
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

/**
 * @param {Function} loopFn
 * @param {(returnValue: any) => bool} conditionFn
 * @param {any} [initialValue]
 */
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

/**
 * @typedef Diff
 * @property {number} lineno
 * @property {'deletion'|'addition'} type
 * @property {string} content
 * @param {number} revId - is added later
 */

/**
 * @typedef Diffs
 * @property {Object<number, Diff>} left
 * @property {Object<number, Diff>} right
 */

/**
 * @typedef Lines
 * @property {Object<number, Diffs[]>} left
 * @property {Object<number, Diffs[]>} right
 */

/**
 * @param {string} page
 * @param {number} revId
 * @param {Lines} lines
 */
function processRevisions(page, revId, lines) {
	return asyncDoWhile(function(resolve, revs, i) {
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
	  });
	}, function(rev) {
		return typeof rev.fromrevid !== 'undefined';
	}, []);
}

module.exports = {
	getRevisions: getRevisions,
	asyncDoWhile: asyncDoWhile,
	processRevisions: processRevisions,
};