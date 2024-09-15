(function() {
  mw.loader.using(['mediawiki.util', 'mw.config']).then(function() {
	  //if (!fandomContext.page.pageName.endsWith('.schema.json')) {
	  if (!mw.config.get('wgPageName').endsWith('.schema.json')) {
	    return;
	  }
  
  function createTable(rows, parent) {    
  	var thead, tableHeaderRow, tbody;
  	var table = Object.assign(document.createElement('table'), {
      className: 'wikitable mw-json-schema-doc-params sortable jquery-tablesorter',
    });
  	table.append(thead = document.createElement('thead'));
  	table.append(tbody = document.createElement('tbody'));
  	thead.append(tableHeaderRow = document.createElement('tr'));
    tableHeaderRow.append(Object.assign(document.createElement('th'), {
      textContent: 'Parameter',
      colSpan: 2,
    }));
  	[ 'Beschreibung', 'Typ', 'Status' ].forEach(function(column) {
      tableHeaderRow.append(Object.assign(document.createElement('th'), {
        textContent: column,
      }));
    });
    
    for (var key in rows.properties) {
        var tableBodyRow, parameterNameCell, parameterDescriptionCell;
        var value = rows.properties[key]; // @TODO
       	tbody.append(tableBodyRow = document.createElement('tr'));
        tableBodyRow.append(Object.assign(document.createElement('th'), {
          textContent: value.title,
        }),
        parameterNameCell = document.createElement('td'),
        parameterDescriptionCell = document.createElement('td'), Object.assign(document.createElement('td'), {
          textContent: value.type,
        }), Object.assign(document.createElement('td'), {
          textContent: typeof rows.required !== 'undefined' && rows.required.includes(key) ? 'erforderlich' : 'optional', // @TODO
        }));
        parameterNameCell.append(Object.assign(document.createElement('code'), {
          textContent: key,
        }));
      	parameterDescriptionCell.append(Object.assign(document.createElement('p'), {
          textContent: value.description,
        }));
      	var dl;
      	if (value.type === 'string' && typeof value.format !== 'undefined') {
          parameterDescriptionCell.append(dl = document.createElement('dl'));
          dl.append(Object.assign(document.createElement('dt'), {
            textContent: 'Format',
          }), Object.assign(document.createElement('dd'), {
            textContent: value.format,
          }));
          if (value.format === 'regex' && typeof value.pattern !== 'undefined') {
						var patternPropEl;
            dl.append(Object.assign(document.createElement('dt'), {
              textContent: 'Pattern',
            }), patternPropEl = document.createElement('dd'));
            patternPropEl.append(Object.assign(document.createElement('code'), {
              textContent: value.pattern,
            }));
          }
        } else if (value.type === 'number' && (typeof value.minimum !== 'undefined' || typeof value.maximum !== 'undefined' || typeof value.exclusiveMinimum !== 'undefined' || typeof value.exclusiveMaximum !== 'undefined')) {
          parameterDescriptionCell.append(dl = document.createElement('dl'));
      		[ 'minimum', 'maximum', 'exclusiveMininum', 'exclusiveMaximum' ].forEach(function(prop) {
            if (typeof value[prop] !== 'undefined') {
              dl.append(Object.assign(document.createElement('dt'), {
                textContent: prop,
              }), Object.assign(document.createElement('dd'), {
                textContent: value[prop],
              }));
            }
          });
        } else if (value.type === 'array' && typeof value.items.$ref !== 'undefined' && value.items.$ref.startsWith('#/definitions/') && typeof parent.definitions[value.items.$ref.replace('#/definitions/', '')] !== 'undefined') {
          parameterDescriptionCell.append(createTable(parent.definitions[value.items.$ref.replace('#/definitions/', '')], parent));
        } else if (typeof value.enum !== 'undefined') {
          var possibleValueEl;
          parameterDescriptionCell.append(dl = document.createElement('dl'));
          dl.append(Object.assign(document.createElement('dt'), {
            textContent: 'Possible values',
          }), possibleValueEl = document.createElement('dd'));
          value.enum.forEach(function(entry) {
            possibleValueEl.append(Object.assign(document.createElement('code'), {
              textContent: entry,
            }));
        	});
        }
      	if (typeof value.default !== 'undefined') {
          //if (typeof dl === 'undefined') {
          	parameterDescriptionCell.append(dl = document.createElement('dl'));
          //}
          var defaultValueEl;
          dl.append(Object.assign(document.createElement('dt'), {
            textContent: 'Autowert',
          }), defaultValueEl = document.createElement('dd'));
          defaultValueEl.append(Object.assign(document.createElement('code'), {
            textContent: value.default,
          }));
        }
	}
    
    return table;
  }
  	
  	(new mw.Api()).get({
      page: fandomContext.page.pageName,
      action: 'parse',
      formatversion: 2,
      disablelimitreport: true,
      wrapoutputclass: '',
      prop: 'wikitext',
    }).then(function(res) {
      return JSON.parse(res.parse.wikitext);
    }).then(function(json) {
    	mw.util.$content.get(0).replaceChildren(createTable(json.definitions.episode, json)); // @TODO
    });
  });
})();