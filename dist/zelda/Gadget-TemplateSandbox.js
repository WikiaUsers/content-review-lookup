/*
* Forked from https://en.wikipedia.org/wiki/User:Jackmcbarn/advancedtemplatesandbox.js 
*
Enables TemplateSandbox on all pages, and allows previewing with a template other than the current page being edited (e.g. preview as Template:Foo when actually editing Template:Foo/sandbox)
To use, add the following line to [[Special:MyPage/common.js]]:
importScript('User:Jackmcbarn/advancedtemplatesandbox.js'); // Linkback: [[User:Jackmcbarn/advancedtemplatesandbox.js]]
The linkback allows easier tracking of who uses this script.

Known issues:
This hardcodes contents of messages, rather than fetching them.
The span is left as a span, rather than being changed to a fieldset.
Tab indexes assume that we're the first thing after "Show changes". If we're not (or if any other code does this trick), tab order will be wrong. Also, it relies on non-integer tab indexes working.
*/

if($('#wpTemplateSandboxPage').attr('type') == 'hidden') {
	$('#templatesandbox-editform').prepend('<legend>Preview page with this template</legend>');
	$('#wpTemplateSandboxPage').before('<span class="mw-templatesandbox-page" id="wpTemplateSandboxPageLabel"><label for="wpTemplateSandboxPage">Page title:</label></span> ').after('<input id="wpTemplateSandboxPreview" name="wpTemplateSandboxPreview" tabindex="' + (+($('#wpDiff').attr('tabIndex')) + 0.75) + '" value="Show preview" type="submit" />').replaceWith($('#wpTemplateSandboxPage').clone().attr({type: 'text', tabindex: +($('#wpDiff').attr('tabIndex')) + 0.5, size: 60, spellcheck: true, 'data-mw-searchsuggest': '{"wrapAsLink":false}'}).addClass('mw-searchInput'));
}
if($('#wpTemplateSandboxTemplate').attr('type') == 'hidden') {
	$('#wpTemplateSandboxTemplate').before('<span class="mw-templatesandbox-template" id="wpTemplateSandboxTemplateLabel"><label for="wpTemplateSandboxTemplate">Template name:</label></span> ').after('<br />').replaceWith($('#wpTemplateSandboxTemplate').clone().attr({type: 'text', tabindex: +($('#wpDiff').attr('tabIndex')) + 0.25, size: 60, spellcheck: true}));
}

// Addition for Zelda Wiki - set a sensible default page to preview for Templates and Modules
(function() {
	function getExists(pages) {
		return mw.loader.using('mediawiki.api')
			.then(function () {
				return new mw.Api().get({
					action: "query",
					titles: pages,
				})
			})
			.then(function(result) {
				return Object.values(result.query.pages)
					.sort(function (a,b) {
						return pages.indexOf(a.title) - pages.indexOf(b.title)
					})
					.map(function (page) { 
						return page.missing !== "" 
					})
			})
	}
	function getDefaultPreviewPage() {
		const deferred = $.Deferred()
		const namespace = mw.config.get('wgCanonicalNamespace')
		const title = mw.config.get('wgTitle')
		const pageName = mw.config.get('wgPageName')
		const templateDoc = 'Template:' + title
		const moduleDoc = 'Module:' + title + '/Documentation'
		if (pageName.endsWith('/Data')) {
			return deferred.resolve(pageName)
		}
		if (namespace === 'Template') {
			return deferred.resolve(templateDoc)
		}
		if (namespace === 'Module') {
			return getExists([moduleDoc, templateDoc])
				.then(function(exists) {
					const moduleDocExists = exists[0]
					const templateDocExists = exists[1]
					if (templateDocExists) {
						return templateDoc;
					}
					if (moduleDocExists) {
						return moduleDoc;
					}
				})
		}
		return deferred.resolve(null)
	}
	const previewPageInput = $('input[name="wpTemplateSandboxPage"]');
	if (previewPageInput && !previewPageInput.val()) {
		getDefaultPreviewPage().then(function(page) {
			page && previewPageInput.val(page)
		})
	}
})()