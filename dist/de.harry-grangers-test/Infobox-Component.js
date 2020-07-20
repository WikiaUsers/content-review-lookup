class Infobox extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Element functionality written in here
	$.get(mw.util.wikiScript('api'),{
		action: 'query',
		prop: 'revisions',
		rvprop: 'content',
		titles: 'MediaWiki:Custom-Infobox-Template',
		format: 'json',
		indexpageids: true
    },applyTemplate.bind(this));
  }
}

function applyTemplate(res) {
    let template = $.parseHTML(res.query.pages[res.query.pageids[0]].revisions[0]['*'])[0].content;
    let shadow = this.attachShadow({mode: 'closed'});
    shadow.appendChild(template.cloneNode(true));
}
customElements.define('wiki-infobox', Infobox);
mw.util.$content.append('<wiki-infobox />');