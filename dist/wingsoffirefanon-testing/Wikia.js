(function () {
	const username = mw.config.get("wgUserName");
	if (!username) return;

	const buildBlogLink = function buildLink(span) {
		const link = document.createElement("a");
		link.href = "/wiki/User blog:" + username;
		link.title = span.textContent;
		link.textContent = span.textContent;

		return link;
	};

	mw.hook("wikipage.content").add(function ($content) {
		const blogLinks = $content.find(".user-blog-link");

		for (var i = 0; i < blogLinks.length; i++) {
			blogLinks[i].replaceWith(buildBlogLink(blogLinks[i]));
		}
	});
})();