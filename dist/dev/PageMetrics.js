mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.Title', 'mediawiki.user']).then(function () {
	window.dev = window.dev || {};
	window.dev.pageMetrics = true;
	var pageName = mw.config.get('wgPageName');

	var queryPagesData = {
	    Uncategorizedpages: { pages: [] },
	    Fewestrevisions: { pages: [], textMsg: 'nrevisions', linkMsgText: '<a href="' + mw.util.getUrl(pageName, { action: 'history' }) + '">$1</a>' },
	    Lonelypages: { pages: [], descriptionMsg: 'lonelypagestext' },
	    Longpages: { pages: [], text: 'nbytes' },
	    Deadendpages: { pages: [], descriptionMsg: 'deadendpagestext' },
	    Mostcategories: { pages: [], textMsg: 'ncategories', linkMsgText: '<a href="' + mw.util.getUrl(pageName) + '#collapsible-content-categories">$1</a>' },
	    //Mostimages: { pages: [] },
	    Mostinterwikis: { pages: [] },
	    Mostlinked: { pages: [], textMsg: 'nlinks' },
	    Mostrevisions: { pages: [], textMsg: 'nrevisions', linkMsgText: '<a href="' + mw.util.getUrl(pageName, { action: 'history' }) + '">$1</a>' },
	    Shortpages: { pages: [], textMsg: 'Nbytes' },
	    Ancientpages: { pages: [], prop: 'timestamp' },
	};
	
	var promises = [];
	function aggregateData(pageName, config) {
    if (config !== null && config.has('excludeUserGroups') && config.get('excludeUserGroups').includes('anon') && mw.user.isAnon()) {
      return;
    } else if (config !== null && config.has('excludeUserGroups')) {
      var excludeUserGroups = config.get('excludeUserGroups');
      for (var i in excludeUserGroups) {
        if (mw.config.get('wgUserGroups').includes(excludeUserGroups[i])) {
          return;
        }
      }
    }
    if (config !== null && config.has('includeUserGroups')) {
      var includeUserGroups = config.get('includeUserGroups');
      var groupIntersection = includeUserGroups.filter(function(group) {
      	return mw.config.get('wgUserGroups').includes(group); 
      });
      if (!groupIntersection.length) {
        return;
      }
    }
    
	  for (var specialPage in queryPagesData) {
	    if (queryPagesData.hasOwnProperty(specialPage)) promises.push(fetchData(specialPage));
	  }
	  Promise.all(promises).then(processData.bind(this, pageName)).catch(function(err) {
	    console.error('all went wrong', err);
	  });
	}
	
	function fetchData(specialPage, qpoffset) {
	  	var params = {
	      action: 'query',
	      list: 'querypage',
	      qppage: specialPage,
	      qplimit: 500,
	    };
	  	if (typeof qpoffset !== 'undefined') {
	      params.qpoffset = qpoffset;
	    }
	    return (new mw.Api()).get(params).then(storeData.bind(this, specialPage)).catch(function(err) {
	      console.error(specialPage, err);
	    });
	}
	
	function storeData(specialPage, res) {
	  queryPagesData[specialPage].pages = queryPagesData[specialPage].pages.concat(res.query.querypage.results);
	  if (typeof res.continue !== 'undefined') {
	    promises.push(fetchData(specialPage, res.continue.qpoffset));
	  }
	}
	
	function processData(pageName) {
	  var pageMetrics = {};
	  for (var specialPage in queryPagesData) {
	  	if (!queryPagesData.hasOwnProperty(specialPage)) continue;
	    var queryPageData = queryPagesData[specialPage].pages;
	    var pageMetric = queryPageData.find(function(metric) {
	      return metric.title === pageName;
	    });
	    if (typeof pageMetric !== 'undefined') {
	      pageMetrics[specialPage] = pageMetric;
	    }
	  }
	  if (Object.keys(pageMetrics).length) {
	    var subtitle, mbox, ul, summaryEl;
	    document.getElementById('firstHeading').after(subtitle = Object.assign(document.createElement('div'), {
	      className: 'page-header__subtitle',
	    }));
      var metricsToggleState = localStorage.getItem('page-metrics-toggle-state');
      if (metricsToggleState === null) {
        metricsToggleState = 'open';
      }
	    subtitle.append(mbox = Object.assign(document.createElement('details'), {
	      className: 'page-mw-message-box-info mw-page-metrics mw-message-box',
        open: metricsToggleState === 'open',
	    }));
      mbox.addEventListener("toggle", function() {
        localStorage.setItem('page-metrics-toggle-state', event.newState);
      });
	    mbox.append(summaryEl = document.createElement('summary'), Object.assign(document.createElement('p'), {
	      textContent: 'The page qualifies for the following:',
	    }));
      summaryEl.append(Object.assign(document.createElement('strong'), {
        textContent: 'PageMetrics',
      }));
	    mbox.append(ul = document.createElement('ul'));
	    var msgToLoad = Object.keys(pageMetrics).reduce(function(carry, specialPage) {
	      carry.push(specialPage);
	      
	      if (typeof queryPagesData[specialPage].textMsg !== 'undefined') {
	        carry.push(queryPagesData[specialPage].textMsg);
	      }
	      
	      if (typeof queryPagesData[specialPage].descriptionMsg !== 'undefined') {
	        carry.push(queryPagesData[specialPage].descriptionMsg);
	      }
	      
	      if (typeof queryPagesData[specialPage].linkMsgText !== 'undefined') {
	          mw.messages.set(specialPage + '-link', queryPagesData[specialPage].linkMsgText);
	      }
	      
	      return carry;
	    }, []);
	    new mw.Api().loadMessagesIfMissing(msgToLoad).then(renderMetrics.bind(this, pageName, pageMetrics, ul));
	}
	  
	function renderMetrics(pageName, pageMetrics, ul) {
	    for(var specialPage in pageMetrics) {
	      if (!pageMetrics.hasOwnProperty(specialPage)) continue;
	      var li, link;
	      var pageMetric = pageMetrics[specialPage];
	      ul.append(li = document.createElement('li'));
	      li.append(link = Object.assign(document.createElement('a'), {
	        href: mw.util.getUrl('Special:' + specialPage),
	      }));
	      link.append(Object.assign(document.createElement('strong'), {
	        textContent: mw.message(specialPage).plain(),
	      }));
	      var metricValueProp = 'value';
	      if (typeof queryPagesData[specialPage].prop !== 'undefined') {
	        metricValueProp = queryPagesData[specialPage].prop;
	      }
	      var metricValue = pageMetric[metricValueProp];
	      if (typeof queryPagesData[specialPage].textMsg !== 'undefined') {
	      	metricValue = mw.message(queryPagesData[specialPage].textMsg, pageMetric.value).text();
	      }
	      if (typeof queryPagesData[specialPage].linkMsgText !== 'undefined') {
	        li.append(Object.assign(document.createElement('span'), {
	          innerHTML: ': ' + mw.message(specialPage + '-link', pageMetric.value).text(),
	        }));
	      } else {
	        li.append(Object.assign(document.createTextNode(': ' + metricValue)));
	      }
	      if (typeof queryPagesData[specialPage].descriptionMsg !== 'undefined') {
	      	li.append(Object.assign(document.createTextNode(' (' + mw.message(queryPagesData[specialPage].descriptionMsg, pageName).text() + ')')));
	      }
	    }
	  }
	}
	
	function fetchConfigJson(pageName) {
		(new mw.Api()).get({
	      action: 'parse',
	      page: pageName,
	      prop: 'wikitext',
	      formatversion: 2,
	    }).then(function(res) {
				aggregateData((new mw.Title(fandomContext.page.pageName)).getNameText(), new Map(Object.entries(JSON.parse(res.parse.wikitext))));
	    }).catch(function() {
				aggregateData((new mw.Title(fandomContext.page.pageName)).getNameText(), null);
	    });
	}
  
  if (typeof window.dev.pageMetricsConfig !== 'undefined') {
    var config = window.dev.pageMetricsConfig;
    if (!(config instanceof Map)) {
      config = new Map(Object.entries(config));
    }
    if (config.has('configPage')) {
    	fetchConfigJson(config.get('configPage'));
    } else {
		aggregateData((new mw.Title(fandomContext.page.pageName)).getNameText(), config);
    }
  } else {
    fetchConfigJson('MediaWiki:Custom-Page-Metrics-Config.json');
  }
});