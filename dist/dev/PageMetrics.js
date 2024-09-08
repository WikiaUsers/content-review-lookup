mw.loader.using(['mediawiki.util']).then(function () {
	window.dev = window.dev || {};
	window.dev.pageMetrics = true;

	var queryPagesData = {
	    Uncategorizedpages: { pages: [] },
	    Fewestrevisions: { pages: [], textMsg: 'nrevisions', linkMsgText: '<a href="' + mw.util.getUrl(fandomContext.page.pageName, { action: 'history' }) + '">$1</a>' },
	    Lonelypages: { pages: [], descriptionMsg: 'lonelypagestext' },
	    Longpages: { pages: [], text: 'nbytes' },
	    Deadendpages: { pages: [], descriptionMsg: 'deadendpagestext' },
	    Mostcategories: { pages: [], textMsg: 'ncategories', linkMsgText: '<a href="' + mw.util.getUrl(fandomContext.page.pageName) + '#collapsible-content-categories">$1</a>' },
	    //Mostimages: { pages: [] },
	    Mostinterwikis: { pages: [] },
	    Mostlinked: { pages: [], textMsg: 'nlinks' },
	    Mostrevisions: { pages: [], textMsg: 'nrevisions', linkMsgText: '<a href="' + mw.util.getUrl(fandomContext.page.pageName, { action: 'history' }) + '">$1</a>' },
	    Shortpages: { pages: [], textMsg: 'Nbytes' },
	    Ancientpages: { pages: [], prop: 'timestamp' },
	};
	
	var promises = [];
	function aggregateData(pageName) {
	  for (var specialPage in queryPagesData) {
	    promises.push(fetchData(specialPage));
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
	    var queryPageData = queryPagesData[specialPage].pages;
	    var pageMetric = queryPageData.find(function(metric) {
	      return metric.title === pageName;
	    });
	    if (typeof pageMetric !== 'undefined') {
	      pageMetrics[specialPage] = pageMetric;
	    }
	  }
	  if (Object.keys(pageMetrics).length) {
	    var subtitle, mbox, ul;
	    document.getElementById('firstHeading').after(subtitle = Object.assign(document.createElement('div'), {
	      className: 'page-header__subtitle',
	    }));
	    subtitle.append(mbox = Object.assign(document.createElement('div'), {
	      className: 'page-mw-message-box-info mw-page-metrics mw-message-box',
	    }));
	    mbox.append(Object.assign(document.createElement('p'), {
	      textContent: 'The page qualifies for the following:',
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
	    new mw.Api().loadMessagesIfMissing(msgToLoad).then(renderMetrics.bind(this, pageName, pageMetrics));
	}
	  
	function renderMetrics(pageName, pageMetrics) {
	    for(var specialPage in pageMetrics) {
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
	
	aggregateData((new mw.Title(fandomContext.page.pageName)).getNameText());
});