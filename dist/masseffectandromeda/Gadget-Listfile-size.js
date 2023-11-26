mw.loader.using("mediawiki.api").then(function() {
	$dimensions = {};
	if (mw.config.get("wgPageName") !== "Special:ListFiles") return;
	$("#mw-content-text table.listfiles th").eq(3).after("<th>Dimensions</th>");
	$("#mw-content-text table.listfiles td.TablePager_col_img_name").each(function() {
		filename = $(this).find("a:first-child").text();
		$dimensions["File:"+filename] = $(this).parent().find("td.TablePager_col_img_size").after("<td></td>").next();
		a = new mw.Api();
		a.get({action:"query",titles:"File:"+filename,prop:"imageinfo",iiprop:"size"}).then(function(data) {
			width = 0;
			height = 0;
			title = "";
			for (p in data.query.pages) {
				width = data.query.pages[p].imageinfo[0].width;
				height = data.query.pages[p].imageinfo[0].height;
				title = data.query.pages[p].title;
			}
			$dimensions[title].html(width + " x " + height);
		});
	});
});