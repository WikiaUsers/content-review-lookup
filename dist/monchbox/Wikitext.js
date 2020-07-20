window.Wikitext = function(wikitext) {
	if(this == window.Wikitext) {return new Wikitext(wikitext);}
	Wikitext.Container.apply(wikitext);
}

Wikitext.hooks = {
	'\n=': function() {},
	'\n ': function() {},
	'\n:': function() {},
	'\n*': function() {},
	'\n#': function() {},
	'[[': function() {},
	'{{': function() {},
	'}}': function() {},
	'<': function() {},
	'[http': function() {},
	'http://': function() {},
	'https://': function() {},
	'[irc://': function() {},
	'irc://': function() {},
	'[ftp://': function() {},
	'ftp://': function() {}
};

Wikitext.parse = function(wikitext) {
	var doc = new Wikitext.Container(); //the top level thing. Possibly use 'this' instead and make this a prototype function
	var tree = [doc]; //parse tree. Every element in this should be a container
	ref = 0;
	var indexes = {};
	for(var i in Wikitext.hooks) {
		var index = wikitext.indexOf(i);
		if(index != -1) {indexes[index] = i;}
	}
	while(true) {
		index = Math.min.apply(Math, Object.keys(indexes));
		var text = wikitext.substring(ref, index);
		Wikitext.hooks[indexes[index]](wikitext, index, tree);
		//ref = something higher
		var hook = indexes[index];
		delete indexes[index];
		index = wikitext.indexOf(hook, ref);
		if(index != -1) {indexes[index] = hook;}
		for(var i in indexes) {
			if(i < ref) {
				index = wikitext.indexOf(indexes[i], ref);
				if(index != -1) {indexes[index] = indexes[i];}
				delete indexes[i];
			}
		}
	}
}

Wikitext.LocalLink = function() {
	this.namespace = '';
	this.title = '';
	this.display = '';
}

Wikitext.InterwikiLink = function() {
	this.prefix = '';
	Wikitext.LocalLink.apply(this);
}

Wikitext.ExternalLink = function() {
	this.url = '';
	this.display = '';
}

Wikitext.Container = function(wikitext) {
	this.parent = null;
	this.wikitext = '';
	this.contents = [];
	this.text = [];
	this.subsections = [];
	this.headers = [];
	this.templates = [];
	this.links = [];
	this.categories = [];
	this.tables = [];
	this.tags = [];
}