var Version = (function(major, minor, hotfix) {
	version = function Version(major, minor, hotfix) {
		this.major = major || 0;
		this.minor = minor || 0;
		this.hotfix = hotfix || 0;
		return this;
	}
	version.prototype.toString = function() {
		return Object.values(this).join('.');
	}
	return version;
})();

mustacheTemplates = [{
	id: 'mustache-home-text',
	href: 'MediaWiki:Mustache-home-text',
	v: new Version(1,3,5)
}]

for(i in mustacheTemplates) {
	console.log(mustacheTemplates[i].v.toString())
}