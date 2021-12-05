/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

 /*Chọn chế độ sửa đổi theo cookie khi bấm liên kết đỏ.*/
mw.hook("wikipage.content").add(function () {
	if (mw.cookie.get("VEE", "") === "wikitext") {
		$(".noarticletext, .searchresults h2").find("a").each(function (idx, elt) {
			var uri = new mw.Uri(elt.href);
			if ("veaction" in uri.query) {
				uri.query.action = uri.query.veaction;
				elt.href = uri.toString();
			}
		});
	}
});