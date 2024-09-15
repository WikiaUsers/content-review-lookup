Promise.all([
	mw.loader.using([ 'mediawiki.util' ]),
	new Promise(function(resolve, reject) {
		return mw.hook('wikipage.content').add(resolve);
	}),
]).then(function() {
  if (mw.config.get('wgNamespaceNumber') !== 1200 || mw.util.getParamValue('threadId') === null) {
    return;
  } // we are on a thread page
  
  importArticle({
    type: "style",
    article: "u:dev:MediaWiki:ThreadInfo.css",
  });
  
  var NumberMap = (function () {
	  function NumberMap(entries) {
	    this.entries = new Map(entries);
	  }
	
	  NumberMap.prototype.increment = function(key, initialValue) {
	    if (!this.entries.has(key) && typeof initialValue === 'undefined') {
	      throw new Error('Non-existant keys cannot be incremented');
	    }
	    var currentValue = this.entries.has(key) ? this.entries.get(key) : initialValue;
	    this.entries.set(key, ++currentValue);
	    return this;
	  };
	
	    NumberMap.prototype.decrement = function(key, initialValue) {
	      if (!this.entries.has(key) && typeof initialValue === 'undefined') {
	        throw new Error('Non-existant keys cannot be decremented');
	      }
	      var currentValue = this.entries.has(key) ? this.entries.get(key) : initialValue;
	      return this.entries.set(key, --currentValue);
	    };
	    
	    NumberMap.prototype.map = function(callback, thisArg) {
	      var next;
	      var entries = this.entries.entries();
	      while(!(next = entries.next()).done) {
	        this.entries.set(next.value[0], callback.call(
	          typeof thisArg === 'undefined' ? undefined : thisArg,
	          next.value[1],
	          next.value[0],
	          this.entries
	        ));
	      }
	      return this;
	    };
	    
	    NumberMap.prototype.reduce = function(callback, initialValue, thisArg) {
	      var next;
	      var entries = this.entries.entries();
	      while(!(next = entries.next()).done) {
	        initialValue = callback.call(
	          typeof thisArg === 'undefined' ? undefined : thisArg,
	          initialValue,
	          next.value[1],
	          next.value[0],
	          this
	        );
	      }
	      return initialValue;
	    };
	    
	    NumberMap.prototype.toSorted = function(callback) {
	      var entries = Array.from(this.entries.entries());
	      return Object.fromEntries(entries.sort(callback));
	    };
	
	  return NumberMap;
	}());
  
  var urlParams = new URLSearchParams({
  	controller: 'MessageWall',
    method: 'getThread',
    format: 'json',
    wallOwnerId: mw.config.get('profileUserId'),
    threadId: mw.util.getParamValue('threadId'),
    responseGroup: 'full',
  });

	fetch(mw.util.wikiScript('wikia') + '?' + urlParams.toString()).then(function(res) {
    return res.json();
  }).then(function(json) {
    var lang = mw.config.get('wgContentLanguage');
    var dateTimeFormatter = new Intl.DateTimeFormat(lang, {
      dateStyle: 'medium',
      timeStyle: 'medium',
    });
    var dateFormatter = new Intl.DateTimeFormat(lang, {
      dateStyle: 'medium',
    });
    var listFormatter = new Intl.ListFormat(lang, {
      style: 'short',
      type: 'conjunction',
    });
    document.title = json.title + ' | ' + document.title;
    var createdAt = json.creationDate.epochSecond * 1000;
    var lastReplyAt = json._embedded['doc:posts'][0].creationDate.epochSecond * 1000;
    var duration = calculateDuration(lastReplyAt - createdAt);
    var receipient = mw.config.get('profileUserName');
    var groupedByDay = json._embedded['doc:posts'].reduce(function(carry, post) {
      var date = dateFormatter.format(new Date(post.creationDate.epochSecond * 1000));
      return carry.increment(date, 0);
    }, new NumberMap()).toSorted(function(a, b) {
      return b[1] - a[1];
    }, {});
    var popularDaysEl = document.createElement('ul');
    popularDaysEl.className = 'rail-module-sub-list__grid';
    popularDaysEl.append.apply(popularDaysEl, Object.entries(groupedByDay).slice(0,4).map(function(entry) {
      var keyEl, valueEl, dayLink;
      var li = document.createElement('li');
      li.append(
        keyEl = document.createElement('strong'),
        valueEl = Object.assign(document.createElement('span'), {
          textContent: entry[1] + ' posts',
        })
      );
      keyEl.append(dayLink = Object.assign(document.createElement('a'), {
          textContent: entry[0],
      }));
      dayLink.addEventListener('click', function(evt) {
        var idx = json._embedded['doc:posts'].length - json._embedded['doc:posts'].findLastIndex(function(post) {
          return dateFormatter.format(new Date(post.creationDate.epochSecond * 1000)) === entry[0];
        })/* - 1*/;
        document.querySelector('.Reply:nth-of-type(' + idx + ')').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      });
      return li;
    }));
    var groupedByPoster = json._embedded['doc:posts'].reduce(function(carry, post) {
      return carry.increment(post.createdBy.name, 0);
    }, new NumberMap()).toSorted(function(a, b) {
      return b[1] - a[1];
    }, {});
    var topPostersEl = document.createElement('ul');
    topPostersEl.className = 'rail-module-sub-list__grid';
    topPostersEl.append.apply(topPostersEl, Object.entries(groupedByPoster).slice(0,4).map(function(entry) {
      var valueEl, keyEl;
      var li = document.createElement('li');
      li.append(
        keyEl = document.createElement('strong'),
        valueEl = Object.assign(document.createElement('span'), {
          textContent: entry[1] + ' posts',
        })
      );
      keyEl.append(Object.assign(document.createElement('a'), {
        	href: mw.util.getUrl('User:' + entry[0]),
          textContent: entry[0],
      }));
      return li;
    }));

    addRailModule(
      document.querySelector('.sticky-modules-wrapper'),
      'message-wall-thread-info',
      'Thread info',
      [{
        label: 'Created by',
        value: Object.assign(document.createElement('a'), {
          href: mw.util.getUrl('User:' + json.createdBy.name),
          textContent: json.createdBy.name,
        }),
      }, {
        label: 'Receipient',
        value: Object.assign(document.createElement('a'), {
          href: mw.util.getUrl('User:' + receipient),
          textContent: receipient,
        }),
      }, {
        label: 'Created at',
        value: dateTimeFormatter.format(new Date(createdAt)),
      }, {
        label: 'Last reply at',
        value: dateTimeFormatter.format(new Date(lastReplyAt)),
      }, {
        label: 'Duration',
        value: listFormatter.format(duration.map(function(entry) {
        	return entry.value + ' ' + entry.unit;
        })),
      }, {
        label: 'Post count',
        value: json.postCount,
      }, {
        label: 'Popular days',
        value: popularDaysEl,
      }, {
        label: 'Top posters',
        value: topPostersEl,
      }]
    );
  });
  
  function addRailModule(parent, moduleName, moduleTitle, entries) {
    var railModule;
    var list;
    parent.prepend(railModule = Object.assign(document.createElement('section'), {
      id: moduleName,
      className: [
        'rail-module',
        moduleName + '-module',
      ].join(' '),
    }));
    railModule.append(Object.assign(document.createElement('h2'), {
      className: 'rail-module__header has-icon',
      textContent: moduleTitle,
    }), list = Object.assign(document.createElement('ul'), {
      className: [
        'rail-module__list',
        'is-condensed-list',
      ].join(' '),
    }));
    
    entries.forEach(function(entry) {
      var li;
      list.append(li = document.createElement('li'));
      li.append(
      	Object.assign(document.createElement('strong'), {
          textContent: entry.label + ':',
        }),
        document.createTextNode(' '),
        typeof entry.value === 'string' ? document.createTextNode(entry.value) : entry.value
      );
    });
  }
  
  function calculateDuration(duration) {
    var months, days, hours;
    var millisecondsPerDay = 86400000;
    var millisecondsPerHour = 3600000;
    var millisecondsPerMonth = 2592000000; // assuming 30 days
    if ((months = duration / millisecondsPerMonth) >= 1) {
      var roundMonths = Math.floor(months);
      return [
        { value: roundMonths, unit: 'months' },
        { value: Math.ceil((duration - (roundMonths * millisecondsPerMonth)) / millisecondsPerDay), unit: 'days' }
      ];
    } else if ((days = duration / millisecondsPerDay) >= 1) {
      return [{ value: Math.ceil(days), unit: 'days' }];
    } else if ((hours = duration / millisecondsPerHour) >= 1) {
      return [{ value: Math.ceil(hours), unit: 'hours' }];
    }
  }
});