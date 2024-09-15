mw.loader.using([ 'mediawiki.api', 'mediawiki.user' ]).then(function() {
	window.dev = window.dev || {};
	if (window.dev.interwikiGadget) return;
	window.dev.interwikiGadget = true;
	
	var activatedGadgets = Object.entries(mw.user.options.values).filter(function(entry) {
	  return entry[0].startsWith('gadget-');
	}).filter(function(gadget) {
	  var gadgetName = gadget[0].slice(7);
	  var gadgetState = mw.loader.getState('ext.gadget.' + gadgetName);
	  return +gadget[1] === 1 && gadgetState !== 'error';
	}).map(function(gadget) {
	  return gadget[0].slice(7);
	});
	
	(new mw.Api()).get({
	  action: 'parse',
	  formatversion: 2,
	  page: 'MediaWiki:Gadgets-definition',
	  prop: 'wikitext'
	}).then(function(res) {
	  var gadgets = res.parse.wikitext.split(/\n/).filter(function(line) {
	    return line.startsWith('*');
	  }).reduce(function(carry, line) {
	    var matches = line.match(/^\*\s?(?<gadgetName>[^\[\|\s]+)\s?(?<options>\[(.*?)\])?\s?\|(?<resources>.*)$/);
	    var resources = matches.groups.resources.split('|').filter(function(resource) {
	      return resource.startsWith('u:') || resource.startsWith('w:c:');
	    });
	    if (resources.length) {
	      carry[matches.groups.gadgetName] = resources;
	    }
	    return carry;
	  }, {});
	  
	  var articles = activatedGadgets.reduce(function(carry, activatedGadget) {
      return carry.concat(gadgets[activatedGadgets]);
	  }, []);
	
		if (articles.length) {
		  importArticles({
		    articles: articles,
		  });
		}
	});
});