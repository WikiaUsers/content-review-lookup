mw.loader.using(['mediawiki.util', 'jquery.tablesorter']).then(function() {
 	window.dev = window.dev || {};
  if (
      mw.config.get('wgPageName') !== 'MediaWiki:ImportJS' ||
      window.dev.importJSPage
  ) {
      return;
  }
  window.dev.importJSPage = true;
  
	var thead, headerRow, tbody;
	console.info('ImportJS');
 	var el = mw.util.$content.get(0).querySelector('pre');
	var scripts = el.textContent.split('\n');
	var table = Object.assign(document.createElement('table'), {
		className: 'wikitable sortable'
	});
	table.append(thead = document.createElement('thead'));
	thead.append(headerRow = document.createElement('tr'));
	headerRow.append(Object.assign(document.createElement('th'), {
	  textContent: '#',
	}));
	headerRow.append(Object.assign(document.createElement('th'), {
	  textContent: 'Code',
	}));
	headerRow.append(Object.assign(document.createElement('th'), {
	  textContent: 'Docs',
	}));
	headerRow.append(Object.assign(document.createElement('th'), {
	  textContent: 'Source',
	}));/*
	  headerRow.append(Object.assign(document.createElement('th'), {
	  textContent: 'Status',
	}));*/
	table.append(tbody = document.createElement('tbody'));
	for(var i in scripts) {
	  	var row, codeCell, docsCell;
	    script = scripts[i];
	    if (script.trim() === "") {
	        // handle empty lines
	        //$li.text(script)
	      	continue;
	    } else if (script.trim().startsWith('//')) {
	        // handle inline comment
	        //$li.text(script)
	      	continue;
	    } else if(/^dev:/.test(script)) {
	        pageName = /dev:(.+)\.js/.exec(script)[1];
	        codePage = 'w:c:dev:MediaWiki:' + pageName + '.js';
	      	if (pageName.endsWith('/code')) {
	          pageName = pageName.slice(0, -5);
	        }
	      	docsPage = 'w:c:dev:' + pageName;
	    }
	    else {
	      	pageName = script;
	        codePage = 'MediaWiki:' + script;
	      	docsPage = script;
	    }
	    tbody.append(row = document.createElement('tr'));
	  	row.append(Object.assign(document.createElement('td'), {
	      textContent: i,
	    }));
	  	row.append(codeCell = document.createElement('td'));
	  	codeCell.append(Object.assign(document.createElement('a'), {
	      href: '/wiki/' + codePage,
	      textContent: pageName.replace('_', ' '),
	    }));
	  	row.append(docsCell = document.createElement('td'));
	  	docsCell.append(Object.assign(document.createElement('a'), {
	      href: '/wiki/' + docsPage,
	      textContent: pageName.replace('_', ' '),
	    }));
	  	row.append(Object.assign(document.createElement('td'), {
	      textContent: script.startsWith('dev:') ? 'DEV wiki' : 'local',
	    }));
	}
	el.replaceWith(table);
	$(table).tablesorter();
});