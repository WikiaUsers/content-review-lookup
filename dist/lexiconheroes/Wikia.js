/* mark all category edits from the category section of ?action=view as minor */
 
if (mw.config.get("wgAction") == "view") {
$("body").mousedown(function(e) {
	window.e = e;
	if (
		$(e.target).is($("button#CategorySelectSave")) &&
		$("nav#WikiaArticleCategories > .container > ul > li.category.new").length > 0
	) {
		e.preventDefault();
		$(e.target).attr("disabled","disabled");
		var a = $("nav#WikiaArticleCategories").data("categorySelect").getData(".new"),
			b = [],
			c = [];
			fn = {
				closeCategorySection: function() {
					$("nav#WikiaArticleCategories").removeClass("editMode").trigger("reset").find(".category.new").remove();
					$(c.join("")).insertBefore("nav#WikiaArticleCategories ul.categories");
				},
				alertSaveError: function() {
					alert("There was a problem saving the new categories. Please try again, or refresh, try again later come back later or add this category through the editor, if you're still getting this error.");
				}
			};
		for (i = 0; i < a.length; i++) {
			if ((a[i].name + a[i].sortKey).search(/\[\]\|#/) == -1) {
				b.push("[[Category:" +
					a[i].name +
					(
						a[i].name != a[i].sortkey && a[i].sortkey.length > 0 ?
						"|" + a[i].sortkey :
						""
					) +
					"]]"
				);
				c.push(
					'<li class="category normal" data-name="' + encodeURIComponent(a[i].name) +
					'" data-namespace="" data-outertag="" data-sortkey="" data-type="normal"><span class="name"><a href="/wiki/Category:' +
					encodeURIComponent(a[i].name) + '" title="Category:Ex" class="newcategory">' + a[i].name + '</a></span></li>'
				);
				if (i + 1 == a.length) {
					if (b.length > 0) {
						$.ajax({
							url: "/api.php?format=json&action=edit&title=" + encodeURIComponent(mw.config.get("wgPageName")) + "&section=new&text=" + encodeURIComponent(b.join("\n")) + "&minor&token=" + encodeURIComponent(mw.user.tokens.get("editToken")),
							type: 'POST',
							success: function(data) {
								if (data && data.edit && data.edit.result == "Success") {
									fn.closeCategorySection();
								} else {
									fn.alertSaveError();
								}
							},
							error: function(xhr) {
								fn.alertSaveError();
							}
						});
					} else {
						fn.closeCategorySection();
					}
				}
			}
		}
	}
});
}